# Vendor User API - Complete Documentation

## Overview
This is a Laravel-based REST API for managing users, vendors, events, messages, reviews, and notifications. The API uses JWT (JSON Web Token) for stateless authentication and SQLite as the database.

## Base URL
```
http://127.0.0.1:8000/api
```

## Authentication
The API uses JWT Bearer token authentication. Include the token in the `Authorization` header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens expire after **1 hour** (3600 seconds).

---

## Quick Start

### 1. Start the Server
```bash
cd vendor-user-api
php artisan serve
```

### 2. Register a User
```bash
curl -X POST http://127.0.0.1:8000/api/Users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Customer"
  }'
```

### 3. Login
```bash
curl -X POST http://127.0.0.1:8000/api/Users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

---

## API Endpoints Summary

### Authentication (6 endpoints)
- `POST /api/Users/register` - Register new user
- `POST /api/Users/login` - Login and get JWT token
- `POST /api/Users/google-login` - Google OAuth login (placeholder)
- `GET /api/me` - Get current user info 🔒
- `POST /api/refresh` - Refresh JWT token 🔒
- `POST /api/logout` - Logout 🔒

### Users (4 endpoints) 🔒
- `GET /api/Users` - Get all users
- `GET /api/Users/{id}` - Get user by ID
- `PUT /api/Users/{id}` - Update user
- `DELETE /api/Users/{id}` - Delete user

### Vendors (8 endpoints)
- `GET /api/Vendors/{id}` - Get vendor by ID
- `GET /api/Vendors/byUser/{userId}` - Get vendor by user ID
- `POST /api/Vendors/byUser/{userId}` - Create vendor profile 🔒
- `PUT /api/Vendors/{id}` - Update vendor 🔒
- `DELETE /api/Vendors/{id}` - Delete vendor 🔒
- `GET /api/Vendors/searchall` - Search vendors
- `POST /api/Vendors/favorite` - Add favorite vendor 🔒
- `DELETE /api/Vendors/favorite` - Remove favorite vendor 🔒

### Events (7 endpoints) 🔒
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `GET /api/events/user/{userId}` - Get user's events
- `GET /api/events/vendor/{vendorId}` - Get vendor's events
- `POST /api/events` - Create event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Messages (3 endpoints) 🔒
- `POST /api/messages/send` - Send message
- `GET /api/messages/chat-users/{userId}` - Get chat users
- `GET /api/messages/conversation/{userId}/{otherUserId}` - Get conversation

### Reviews (2 endpoints)
- `GET /api/reviews/event/{eventId}` - Get review for event
- `POST /api/reviews` - Save/update review 🔒

### Notifications (1 endpoint) 🔒
- `GET /api/notifications/{userId}` - Get user notifications

**Total: 31 endpoints**  
🔒 = Requires authentication

---

## Data Models

### User
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "role": "Customer",
  "area": "Downtown",
  "created_at": "2025-11-25T20:32:37.000000Z",
  "updated_at": "2025-11-25T20:32:37.000000Z"
}
```

### Vendor
```json
{
  "id": 1,
  "user_id": 1,
  "businessName": "Catering Co",
  "contactName": "Jane Smith",
  "businessPhone": "555-1234",
  "businessEmail": "info@cateringco.com",
  "businessAddress": "789 Business Ave",
  "serviceArea": "Toronto",
  "serviceType": "Catering",
  "cuisineStyle": "Italian",
  "description": "Premium catering services",
  "website": "https://cateringco.com",
  "instagram": "@cateringco",
  "facebook": "cateringco",
  "linkedin": null,
  "ratingAverage": 4.5,
  "reviewCount": 10,
  "created_at": "2025-11-25T20:52:36.000000Z",
  "updated_at": "2025-11-25T20:52:36.000000Z"
}
```

### Event
```json
{
  "id": 1,
  "user_id": 1,
  "vendor_id": 1,
  "eventType": "Wedding",
  "eventDate": "2025-12-25",
  "description": "Christmas wedding celebration",
  "dietaryRestrictions": "Vegetarian options needed",
  "budgetMin": 5000,
  "budgetMax": 10000,
  "created_at": "2025-11-25T21:00:00.000000Z",
  "updated_at": "2025-11-25T21:00:00.000000Z"
}
```

---

## Common Response Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Successful deletion/update with no response body |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Authenticated but not authorized for this action |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation error |
| 500 | Internal Server Error | Server error |

---

## Error Response Format

```json
{
  "message": "Error description",
  "errors": {
    "field": ["Validation error message"]
  }
}
```

---

## Testing

### Run Tests
```bash
php artisan test
```

### HTTP Test Files
Test files are located in `tests/rest/`:
- `customer_register.http` - User registration
- `get_me.http` - Get current user
- `update_vendor.http` - Update vendor
- `search_vendors.http` - Search vendors
- `events.http` - Event CRUD operations

---

## Database

### Current: SQLite
Database file: `database/database.sqlite`

### Migrations
```bash
# Run migrations
php artisan migrate

# Fresh migration (drops all tables)
php artisan migrate:fresh

# Rollback
php artisan migrate:rollback
```

### Tables
- `users` - User accounts
- `vendors` - Vendor profiles
- `events` - Event bookings
- `messages` - Chat messages
- `reviews` - Vendor reviews
- `favorite_vendors` - User favorites

---

## Development

### Generate JWT Secret
```bash
php artisan jwt:secret
```

### Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### View Routes
```bash
php artisan route:list
```

---

## Security Notes

1. **JWT Tokens**: Tokens expire after 1 hour
2. **Password Hashing**: Uses bcrypt
3. **Authorization**: Users can only access/modify their own resources
4. **Validation**: All inputs are validated before processing
5. **CORS**: Configure in `config/cors.php` for production

---

## Future Enhancements

- [ ] Switch from SQLite to MySQL
- [ ] Implement Google OAuth
- [ ] Add file upload for vendor images
- [ ] Implement real-time messaging with WebSockets
- [ ] Add email notifications
- [ ] Implement rate limiting
- [ ] Add API versioning
- [ ] Create admin dashboard

---

## Support

For issues or questions, refer to:
- [API Testing Guide](API_TESTING_GUIDE.md)
- [OpenAPI Specification](openapi.yaml)
- [Laravel Documentation](https://laravel.com/docs)
