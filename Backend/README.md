# Authentication — /auth/register

This document describes the POST /auth/register endpoint used to register new users in the application.

## Endpoint

- **URL**: `/auth/register`
- **Method**: POST

## Request body (JSON)

The endpoint expects a JSON payload with the following properties:

- `firstname` (string) — required. Minimum 3 characters.
- `lastname` (string) — required. Minimum 3 characters.
- `email` (string) — required. Must be a valid email address.
- `password` (string) — required. Minimum 6 characters.

Example request:

```json
{
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "jane.doe@example.com",
  "password": "correcthorsebattery"
}
```

Notes:
- All fields are required. If any are missing the service will reject the request.
- `email` is unique for each user (database unique index). Duplicate emails will cause a database error.
- Passwords are hashed before they are stored.

## Validation

Validation is handled using `express-validator`:

- `email` — must pass `isEmail()` check.
- `firstname` / `lastname` — `isLength({ min: 3 })`.
- `password` — `isLength({ min: 6 })`.

If validation fails the endpoint returns a 400 and a list of errors.

## Responses

- **201 Created** — registration successful. Response contains an auth token and the created user object (user document returned by the DB; note the password field is not returned).

Example 201 response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "634e9b...",
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "jane.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

- **400 Bad Request** — validation failed; response contains an `errors` array produced by `express-validator`.

Example 400 response:

```json
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 char long", "param": "password", "location": "body" }
  ]
}
```

- **500 Internal Server Error** — unexpected server/database error. The server returns a generic message to the client and logs the original error.

Example 500 response:

```json
{
  "message": "Internal Server Error"
}
```

## Implementation notes

- Passwords are hashed using bcrypt prior to creating the user in the database.
- On successful registration a JWT is issued. The secret is read from `process.env.JWT_SECRET` and the token expires in 7 days.

---

## Authentication — /auth/login

This endpoint allows an existing user to log in and receive a JSON Web Token.

### Endpoint

- **URL**: `/auth/login`
- **Method**: POST

### Request body (JSON)

The login endpoint expects the following JSON payload:

- `email` (string) — required. Must be a valid email address.
- `password` (string) — required. Minimum 6 characters.

Example request:

```json
{
  "email": "jane.doe@example.com",
  "password": "correcthorsebattery"
}
```

### Validation

- `email` — validated with `isEmail()`.
- `password` — validated with `isLength({ min: 6 })`.

If validation fails the endpoint returns a 400 status and the `errors` array from `express-validator`.

### Responses

- **200 OK** — login successful. Returns an auth token and the user object (password is not included).

Example 200 response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "634e9b...",
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "jane.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

- **400 Bad Request** — validation errors (see examples above).

- **401 Unauthorized** — invalid credentials (either email not found or password mismatch). Example response:

```json
{ "message": "Invalid Credentials" }
```

- **500 Internal Server Error** — unexpected server/database error.

### Notes

- The server validates the credentials by looking up the user by email and comparing the supplied password with the stored hashed password.
- On success, a JWT is created and returned. Keep the token secure on the client and use it in Authorization headers for protected routes.

## Authentication — /auth/profile (protected)

Fetches the currently authenticated user's profile. This endpoint is protected and requires a valid token.

### Endpoint

- **URL**: `/auth/profile`
- **Method**: GET

### Authentication

The endpoint requires a valid JWT. The middleware accepts the token in either:

- A cookie named `token` (httpOnly), or
- An `Authorization` header: `Authorization: Bearer <token>`

If the token is missing or invalid the server returns 401 Unauthorized.

### Responses

- **200 OK** — returns the current user's public profile (password excluded).

Example 200 response:

```json
{
  "user": {
    "_id": "634e9b...",
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "jane.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

- **401 Unauthorized** — token missing or invalid.

## Authentication — /auth/logout (protected)

Clears the auth cookie and logs the user out of the session.

### Endpoint

- **URL**: `/auth/logout`
- **Method**: GET

### Authentication

This endpoint also requires a valid token (cookie `token` or `Authorization` header). If the token is missing or invalid, the server responds with 401.

### Responses

- **200 OK** — logout successful. Response:

```json
{ "message": "Logout successful" }
```

- **401 Unauthorized** — if no valid token was provided.


