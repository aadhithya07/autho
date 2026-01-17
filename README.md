# Node.js Authentication API (MVC)

A backend authentication system with secure password hashing and JWT authorization.

## Features
- **MVC Architecture**: Organized into Models, Controllers, and Routes.
- **Secure Hashing**: Passwords stored using Bcrypt.
- **Protected Routes**: Profile access restricted via JWT middleware.

## API Endpoints
- `POST /api/register`: Creates a new user.
- `POST /api/login`: Verifies user and returns a Bearer Token.
- `GET /api/profile`: Returns user data (Requires Bearer Token).