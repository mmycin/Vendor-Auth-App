# Swagger API Documentation

## Access the Interactive API Documentation

The API now includes interactive Swagger/OpenAPI documentation!

### 🌐 **Access Swagger UI:**
```
http://127.0.0.1:8000/api-docs
```

or simply visit:
```
http://127.0.0.1:8000/
```

### ✨ **Features:**
- **Interactive API Explorer** - Test all endpoints directly from the browser
- **Try It Out** - Execute API calls with real data
- **Authentication** - Click "Authorize" button and enter your JWT token
- **Request/Response Examples** - See example payloads for all endpoints
- **Schema Documentation** - View all data models
- **Filter Endpoints** - Search and filter by tags or endpoint names

### 🔐 **How to Use:**

1. **Start the server:**
   ```bash
   php artisan serve
   ```

2. **Open Swagger UI:**
   ```
   http://127.0.0.1:8000/api-docs
   ```

3. **Get a JWT Token:**
   - Expand the `Authentication` section
   - Click on `POST /Users/login`
   - Click "Try it out"
   - Enter credentials:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Click "Execute"
   - Copy the `token` from the response

4. **Authorize:**
   - Click the **"Authorize"** button at the top
   - Enter: `Bearer YOUR_TOKEN_HERE`
   - Click "Authorize"
   - Click "Close"

5. **Test Endpoints:**
   - Now you can test any protected endpoint!
   - Click "Try it out" on any endpoint
   - Modify the request body/parameters
   - Click "Execute"

### 📄 **OpenAPI Specification:**
The raw OpenAPI 3.0 specification is available at:
```
http://127.0.0.1:8000/swagger.yaml
```

### 📚 **Documentation Includes:**
- ✅ All 31 API endpoints
- ✅ Request/Response schemas
- ✅ Authentication details
- ✅ Data models (User, Vendor, Event)
- ✅ Error responses
- ✅ Query parameters
- ✅ Path parameters

### 🎯 **Quick Tips:**
- Use the **filter box** to search for specific endpoints
- Click on **tags** to collapse/expand sections
- The **"Authorize"** button persists your token across page refreshes
- **Response times** are displayed for each request
- Download the OpenAPI spec using the download button

Enjoy exploring the API! 🚀
