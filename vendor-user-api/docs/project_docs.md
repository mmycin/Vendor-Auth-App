# Vendor User API Documentation

## Overview
This project is a migration of the .NET WebAPI to PHP Laravel. It uses SQLite as the database and JWT for authentication.

## Setup
1. Run `composer install`
2. Copy `.env.example` to `.env`
3. Run `php artisan key:generate`
4. Run `php artisan jwt:secret`
5. Run `php artisan migrate`

## Authentication
The API uses JWT authentication. Include the token in the `Authorization` header as `Bearer <token>`.

## Endpoints
See `openapi.yaml` and `API_TESTING_GUIDE.md` for full API specification.

### Authentication
- `POST /api/Users/login`
- `POST /api/Users/register`
- `GET /api/me` (auth required)

### Users (Auth Required)
- `GET /api/Users`
- `GET /api/Users/{id}`
- `PUT /api/Users/{id}`
- `DELETE /api/Users/{id}`

### Vendors
- `GET /api/Vendors/searchall`
- `GET /api/Vendors/{id}`
- `GET /api/Vendors/byUser/{userId}`
- `POST /api/Vendors/byUser/{userId}` (auth required)
- `PUT /api/Vendors/{id}` (auth required)
- `DELETE /api/Vendors/{id}` (auth required)
- `POST /api/Vendors/favorite` (auth required)
- `DELETE /api/Vendors/favorite` (auth required)

### Events (Auth Required)
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/{id}`
- `PUT /api/events/{id}`
- `DELETE /api/events/{id}`
- `GET /api/events/user/{userId}`
- `GET /api/events/vendor/{vendorId}`

### Messages (Auth Required)
- `POST /api/messages/send`
- `GET /api/messages/chat-users/{userId}`
- `GET /api/messages/conversation/{userId}/{otherUserId}`

### Reviews
- `GET /api/reviews/event/{eventId}`
- `POST /api/reviews` (auth required)

### Notifications (Auth Required)
- `GET /api/notifications/{userId}`

**Total: 31 endpoints**
