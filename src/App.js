import { useEffect } from "react";


const CLIENT_ID =process.env.REACT_APP_CLIENT_ID
const DOMAIN = process.env.REACT_APP_DOMAIN;
const REDIRECT_URI = "http://localhost:3000";

function App() {

  // console.log("CLIENT_ID:", CLIENT_ID);
  // console.log("DOMAIN:", DOMAIN);

  const login = () => {
    window.location.href =
      `${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=code&scope=openid+email+phone&redirect_uri=${REDIRECT_URI}`;
  };

  const getToken = async (code) => {
    const res = await fetch(`${DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&client_id=${CLIENT_ID}&code=${code}&redirect_uri=${REDIRECT_URI}`
    });

    const data = await res.json();
    console.log("FULL RESPONSE:", data);
    console.log("TOKEN:", data.access_token);

    // access_token → meant for backend API calls (authorization)
    // id_token → contains user info like email (used in frontend UI)

    // Both are JWTs, but only access_token should be sent to backend (best practice)
    // id_token works here because Spring only checks signature, not token type

    localStorage.setItem("token", data.id_token); // Storing Tokens in localStorage is vulnerable to XSS attack
  };

  const callAPI = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
    console.log("No token yet");
    return;
  }

    const res = await fetch("http://localhost:8080/api/test", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.text();
    console.log(data);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getToken(code);
      window.history.replaceState({}, document.title, "/");
    }
   }, []);

  return (
    <div>
      <h2>oAuth With Amazon Cognito Test</h2>
      <button onClick={login}>Login(From Authorization Server: Amazon Cognito)</button>
      <button onClick={callAPI}>Call API(Access Resource Server)</button>
    </div>
  );
}

export default App;
