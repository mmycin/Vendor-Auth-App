# WebAPI Project Analysis Report

## 1. Project Overview
The **WebAPI** project is a RESTful API built with **.NET 8.0**. It serves as the backend for a vendor/user management system, likely for a marketplace or service booking platform.

**Key Technologies:**
-   **Framework**: ASP.NET Core 8.0
-   **Database**: SQL Server (accessed via Entity Framework Core 8.0)
-   **Authentication**: JWT (JSON Web Tokens) and Google Sign-In
-   **Documentation**: Swagger / OpenAPI
-   **ORM**: Entity Framework Co're

## 2. Architecture & Configuration
The project follows a standard ASP.NET Core Web API structure but uses the modern "Minimal API" style `Program.cs` for configuration instead of a separate `Startup.cs`.

### `Program.cs` Highlights
-   **Database**: Configures `ApiDbContext` with a SQL Server connection string (`LocalConnection` or `CloudConnection`).
-   **Authentication**: Sets up JWT Bearer authentication with validation for Issuer, Audience, and Lifetime.
-   **Swagger**: Enabled for development environment.
-   **Static Files**: Configured to serve images from `wwwroot/images`.
-   **Middleware Pipeline**: HTTPS Redirection -> Authentication -> Authorization -> Static Files -> Controllers.

## 3. Controllers Analysis (`WebAPI/WebApi/Controllers`)

The API logic is distributed across 6 main controllers. Most controllers interact directly with the `ApiDbContext`, indicating a simpler architecture without a dedicated Repository/Service layer for data access.

### 3.1. `UsersController.cs`
Handles user identity, registration, and profile management.
-   **Endpoints**:
    -   `POST /api/Users/register`: Registers a new user with hashed password (PBKDF2).
    -   `POST /api/Users/login`: Authenticates user and issues a JWT token.
    -   `POST /api/Users/google-login`: Authenticates via Google ID Token and issues a JWT token (creates user if not exists).
    -   `GET /api/Users`: Lists all users.
    -   `GET /api/Users/{id}`: Gets a specific user profile.
    -   `PUT /api/Users/{id}`: Updates user profile (including optional password change).
    -   `DELETE /api/Users/{id}`: Deletes a user.
-   **Key Logic**: Password hashing using `Rfc2898DeriveBytes`, JWT generation with Claims (Id, Name, Email, Role).

### 3.2. `VendorsController.cs`
Manages vendor profiles and search functionality.
-   **Endpoints**:
    -   `GET /api/vendors/{id}`: Gets vendor details.
    -   `GET /api/vendors/byUser/{userId}`: Finds the vendor profile associated with a specific user ID.
    -   `POST /api/vendors/byUser/{userId}`: Creates a vendor profile for a user.
    -   `PUT /api/vendors/{id}`: Updates vendor details.
    -   `GET /api/vendors/searchall`: Advanced search for vendors.
        -   **Filters**: City, Search Text (matches name, contact, cuisine, etc.), Offers (active dates), Favorites.
    -   `POST /api/vendors/favorite`: Adds a vendor to user's favorites.
    -   `DELETE /api/vendors/favorite`: Removes a vendor from favorites.
-   **Key Logic**: Complex search query building with multiple optional filters.

### 3.3. `MessagesController.cs`
Handles in-app messaging between users (and vendors).
-   **Endpoints**:
    -   `POST /api/messages/send`: Sends a message.
    -   `GET /api/messages/chat-users/{userId}`: Retrieves a list of unique users/vendors the current user has exchanged messages with.
    -   `GET /api/messages/conversation/{userId}/{otherUserId}`: Retrieves the full chat history between two users, sorted by time.
-   **Key Logic**: LINQ joins to fetch user/vendor details for the chat list.

### 3.4. `NotificationsController.cs`
Provides a feed of relevant events and reviews for a user.
-   **Endpoints**:
    -   `GET /api/notifications/{userId}`: Aggregates data from `Events`, `Vendors`, and `Reviews`.
-   **Key Logic**: Returns a list of events associated with the user, including vendor details and any reviews left for those events.

### 3.5. `ReviewsController.cs`
Manages reviews and ratings for events/vendors.
-   **Endpoints**:
    -   `GET /api/reviews/event/{eventId}`: Gets the review for a specific event.
    -   `POST /api/reviews`: Creates or updates a review.
-   **Key Logic**: Ensures one review per event. If a review exists, it updates it; otherwise, it creates a new one.

### 3.6. `EnumController.cs`
A helper controller for frontend UI.
-   **Endpoints**:
    -   `GET /api/Enum/{enumName}`: Returns a list of values and display names for a given C# Enum type.
-   **Key Logic**: Uses reflection (via `EnumHelper`) to expose server-side enums to the client.

## 4. Data Models & Database
Based on controller usage, the `ApiDbContext` includes at least the following `DbSet`s:
-   `Users`
-   `Vendors`
-   `Messages`
-   `Events`
-   `Reviews`
-   `FavoriteVendors`

## 5. Observations & Recommendations
-   **Direct Context Usage**: Controllers inject `ApiDbContext` directly. For larger applications, consider introducing a Service or Repository layer to decouple logic from data access.
-   **Security**: Password hashing and JWT are implemented correctly. Google Login integration is a good feature.
-   **Search**: The `searchall` endpoint in `VendorsController` performs text searching in memory or database (depending on EF translation). For high volume, full-text search (like ElasticSearch or SQL Full-Text Search) might be needed.
-   **Validation**: Basic validation exists (e.g., checking nulls, duplicates), but could be enhanced with FluentValidation or DataAnnotations on DTOs.
