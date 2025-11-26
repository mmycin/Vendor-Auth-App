# API Testing Guide

## Base URL
```
http://127.0.0.1:8000/api
```

## Authentication Endpoints (No Auth Required)

### 1. Register User
```http
POST /api/Users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St",
  "role": "Customer",
  "area": "Downtown"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

### 2. Login
```http
POST /api/Users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    ...
  }
}
```

---

## Authentication Endpoints (Auth Required)

### 3. Get Current User
```http
GET /api/me
Authorization: Bearer {token}
```

### 4. Refresh Token
```http
POST /api/refresh
Authorization: Bearer {token}
```

### 5. Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

---

## User Endpoints (Auth Required)

### 6. Get All Users
```http
GET /api/Users
Authorization: Bearer {token}
```

### 7. Get User by ID
```http
GET /api/Users/{id}
Authorization: Bearer {token}
```

### 8. Update User
```http
PUT /api/Users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "John Updated",
  "phone": "9876543210",
  "address": "456 New St"
}
```

### 9. Delete User
```http
DELETE /api/Users/{id}
Authorization: Bearer {token}
```

---

## Vendor Endpoints

### 10. Get Vendor by ID (Public)
```http
GET /api/Vendors/{id}
```

### 11. Get Vendor by User ID (Public)
```http
GET /api/Vendors/byUser/{userId}
```

### 12. Create Vendor Profile (Auth Required)
```http
POST /api/Vendors/byUser/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
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
  "facebook": "cateringco"
}
```

### 13. Update Vendor (Auth Required)
```http
PUT /api/Vendors/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "businessName": "Updated Catering Co",
  "description": "New description"
}
```

### 14. Delete Vendor (Auth Required)
```http
DELETE /api/Vendors/{id}
Authorization: Bearer {token}
```

### 15. Search Vendors (Public)
```http
GET /api/Vendors/searchall?city=Toronto&searchText=catering&isOffer=true&isFavorite=false&userId=1
```

**Query Parameters:**
- `city` - Filter by service area
- `searchText` - Search in business name, description, etc.
- `isOffer` - Filter vendors with active offers
- `isFavorite` - Filter user's favorite vendors (requires userId)
- `userId` - User ID for favorite filtering

### 16. Add Favorite Vendor (Auth Required)
```http
POST /api/Vendors/favorite
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": 1,
  "vendorId": 5
}
```

### 17. Remove Favorite Vendor (Auth Required)
```http
DELETE /api/Vendors/favorite?userId=1&vendorId=5
Authorization: Bearer {token}
```

---

## Event Endpoints (Auth Required)

### 24. Get All Events
```http
GET /api/events
Authorization: Bearer {token}
```

### 25. Get User Events
```http
GET /api/events/user/{userId}
Authorization: Bearer {token}
```

### 26. Get Vendor Events
```http
GET /api/events/vendor/{vendorId}
Authorization: Bearer {token}
```

### 27. Get Single Event
```http
GET /api/events/{id}
Authorization: Bearer {token}
```

### 28. Create Event
```http
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "vendor_id": 1,
  "eventType": "Wedding",
  "eventDate": "2025-12-25",
  "description": "Christmas wedding celebration",
  "dietaryRestrictions": "Vegetarian options needed",
  "budgetMin": 5000,
  "budgetMax": 10000
}
```

### 29. Update Event
```http
PUT /api/events/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "eventDate": "2025-12-26",
  "description": "Updated wedding date",
  "budgetMax": 12000
}
```

### 30. Delete Event
```http
DELETE /api/events/{id}
Authorization: Bearer {token}
```

---

## Message Endpoints (Auth Required)

### 18. Send Message
```http
POST /api/messages/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "senderId": 1,
  "receiverId": 2,
  "message": "Hello, I'm interested in your services!"
}
```

### 19. Get Chat Users
```http
GET /api/messages/chat-users/{userId}
Authorization: Bearer {token}
```

### 20. Get Conversation
```http
GET /api/messages/conversation/{userId}/{otherUserId}
Authorization: Bearer {token}
```

---

## Review Endpoints

### 21. Get Review by Event ID (Public)
```http
GET /api/reviews/event/{eventId}
```

### 22. Save Review (Auth Required)
```http
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "eventId": 1,
  "rating": 4.5,
  "title": "Great service!",
  "comment": "The catering was excellent and professional."
}
```

---

## Notification Endpoints (Auth Required)

### 23. Get Notifications
```http
GET /api/notifications/{userId}
Authorization: Bearer {token}
```

---

## Testing Workflow Example

### Step 1: Register a User
```bash
curl -X POST http://127.0.0.1:8000/api/Users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "Customer"
  }'
```

### Step 2: Login
```bash
curl -X POST http://127.0.0.1:8000/api/Users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Save the token from the response!**

### Step 3: Create Vendor Profile
```bash
curl -X POST http://127.0.0.1:8000/api/Vendors/byUser/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "businessName": "My Catering Business",
    "serviceArea": "Toronto",
    "serviceType": "Catering"
  }'
```

### Step 4: Search Vendors (No Auth)
```bash
curl http://127.0.0.1:8000/api/Vendors/searchall?city=Toronto
```

---

## Using Postman

1. **Import Collection**: Create a new collection in Postman
2. **Set Environment Variable**: 
   - Variable: `token`
   - Value: (paste your JWT token after login)
3. **Add Authorization**: In requests that need auth, use:
   - Type: Bearer Token
   - Token: `{{token}}`

---

## Common Response Codes

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion/update)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (not authorized for this action)
- `404` - Not Found
- `422` - Validation Error
