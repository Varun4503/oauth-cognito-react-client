## Frontend (React OAuth Client)

This application implements the OAuth 2.0 Authorization Code Flow using AWS Cognito. It handles user authentication, token exchange, and communicates with a secured Spring Boot backend.

- Redirects users to Cognito Hosted UI for login
- Exchanges authorization code for JWT tokens (access_token, id_token)
- Stores tokens on client side
- Calls secured backend APIs using access token

Backend Repo: https://github.com/Varun4503/oauth-cognito-api
