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
