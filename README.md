# Vendor & Customer Portal - Complete System Documentation

A comprehensive multi-platform vendor and customer management system featuring three interconnected applications: a .NET Core WebAPI, a Laravel REST API, and a Next.js frontend application.

---

## 📚 Table of Contents

- [System Overview](#system-overview)
- [Architecture](#architecture)
- [Components](#components)
  - [WebAPI (.NET Core)](#webapi-net-core)
  - [vendor-user-api (Laravel)](#vendor-user-api-laravel)
  - [Vendor-Auth-App (Next.js)](#vendor-auth-app-nextjs)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Deployment](#deployment)
- [Testing](#testing)

---

## 🎯 System Overview

This system provides a complete platform for managing vendor-customer relationships with the following capabilities:

### Core Features
- **Dual-role authentication** - Users can act as customers or vendors
- **Vendor management** - Business profiles, services, ratings
- **Event management** - Customer event requests and vendor bookings
- **Messaging system** - Direct communication between customers and vendors
- **Notification system** - Real-time updates for both parties
- **Review & rating system** - Customer feedback for vendors

### Use Cases
1. **Customers** can browse vendors, create events, send messages, and leave reviews
2. **Vendors** can manage their business profile, respond to events, communicate with customers, and track performance
3. **Administrators** can manage users, vendors, and system-wide settings

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │   Vendor-Auth-App (Next.js 16 + TypeScript)        │     │
│  │   - Customer Dashboard                              │     │
│  │   - Vendor Dashboard                                │     │
│  │   - Authentication UI                               │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │  WebAPI (.NET Core)  │  │ vendor-user-api      │         │
│  │  - ASP.NET Core 8    │  │ (Laravel 11)         │         │
│  │  - Entity Framework  │  │ - JWT Auth           │         │
│  │  - JWT Auth          │  │ - Eloquent ORM       │         │
│  └──────────────────────┘  └──────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Database Queries
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌────────────────────────────────────────────────────┐     │
│  │   MySQL / PostgreSQL Database                      │     │
│  │   - Users, Vendors, Events, Messages, Reviews      │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Components

### WebAPI (.NET Core)

**Location:** `d:/CodeDoc/vendor-api/WebAPI/`

A robust ASP.NET Core 8 Web API providing enterprise-grade backend services.

#### Key Features
- **Entity Framework Core** for database operations
- **JWT Authentication** with refresh tokens
- **RESTful API** design
- **Swagger/OpenAPI** documentation
- **CORS** configuration for frontend integration
- **Dependency Injection** architecture

#### Project Structure
```
WebAPI/
├── WebApi/
│   ├── Controllers/          # API endpoints
│   │   ├── AuthController.cs
│   │   ├── UsersController.cs
│   │   ├── VendorsController.cs
│   │   ├── EventsController.cs
│   │   ├── MessagesController.cs
│   │   └── NotificationsController.cs
│   ├── Models/               # Data models
│   │   ├── User.cs
│   │   ├── Vendor.cs
│   │   ├── Event.cs
│   │   ├── Message.cs
│   │   └── Notification.cs
│   ├── Data/                 # Database context
│   │   └── ApplicationDbContext.cs
│   ├── Services/             # Business logic
│   ├── DTOs/                 # Data transfer objects
│   └── Program.cs            # Application entry point
└── WebApi.sln                # Solution file
```

#### Technologies
- **Framework:** ASP.NET Core 8.0
- **ORM:** Entity Framework Core
- **Authentication:** JWT Bearer
- **Database:** SQL Server / PostgreSQL
- **API Documentation:** Swagger/Swashbuckle

#### Setup
```bash
cd WebAPI
dotnet restore
dotnet ef database update
dotnet run
```

API available at: `https://localhost:7000` or `http://localhost:5000`

---

### vendor-user-api (Laravel)

**Location:** `d:/CodeDoc/vendor-api/vendor-user-api/`

A Laravel 11 REST API providing flexible and rapid backend development.

#### Key Features
- **Eloquent ORM** for elegant database queries
- **JWT Authentication** via tymon/jwt-auth
- **API Resources** for response transformation
- **Form Request Validation**
- **Database Migrations & Seeders**
- **PHPUnit Testing**

#### Project Structure
```
vendor-user-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── UserController.php
│   │   │   ├── VendorController.php
│   │   │   ├── EventController.php
│   │   │   ├── MessageController.php
│   │   │   ├── NotificationController.php
│   │   │   └── ReviewController.php
│   │   ├── Requests/         # Form validation
│   │   └── Resources/        # API resources
│   ├── Models/
│   │   ├── User.php
│   │   ├── Vendor.php
│   │   ├── Event.php
│   │   ├── Message.php
│   │   ├── Notification.php
│   │   └── Review.php
│   └── Services/             # Business logic
├── database/
│   ├── migrations/           # Database schema
│   ├── seeders/              # Sample data
│   └── factories/            # Model factories
├── routes/
│   ├── api.php               # API routes
│   └── web.php
├── tests/                    # PHPUnit tests
├── docs/                     # API documentation
├── postman/                  # Postman collections
│   ├── WebTestingPostman.json
│   └── WebTestingRequestly.json
└── composer.json
```

#### Technologies
- **Framework:** Laravel 11
- **PHP Version:** 8.2+
- **Authentication:** JWT (tymon/jwt-auth)
- **Database:** MySQL / PostgreSQL
- **Testing:** PHPUnit
- **API Testing:** Postman collections included

#### Setup
```bash
cd vendor-user-api
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
php artisan serve
```

API available at: `http://localhost:8000`

#### Available Commands
```bash
composer setup      # Complete setup (install, env, key, migrate)
composer dev        # Start dev server with queue workers
composer test       # Run PHPUnit tests
```

---

### Vendor-Auth-App (Next.js)

**Location:** `d:/CodeDoc/vendor-api/Vendor-Auth-App/`

A modern, responsive Next.js 16 frontend with TypeScript and Tailwind CSS.

#### Key Features
- **Server & Client Components** with Next.js App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Context API** for state management
- **Axios** for HTTP requests
- **JWT Authentication** with automatic refresh
- **Route Protection** with role-based access
- **Responsive Design** - Mobile-first approach
- **Premium UI** - Glassmorphic design with gradients

#### Project Structure
```
Vendor-Auth-App/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── dashboard/
│   │   │   ├── customer/         # Customer dashboard
│   │   │   │   └── page.tsx
│   │   │   └── vendor/           # Vendor dashboard
│   │   │       └── page.tsx
│   │   ├── login/                # Login page
│   │   │   └── page.tsx
│   │   ├── register/             # Registration
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/               # Reusable components
│   │   ├── Footer.tsx            # App footer
│   │   ├── Preloader.tsx         # Loading spinner
│   │   ├── ProtectedRoute.tsx    # Auth guard
│   │   └── ThemeWrapper.tsx      # Theme provider
│   ├── context/
│   │   └── AuthContext.tsx       # Auth state management
│   ├── lib/
│   │   ├── api.ts                # API endpoints
│   │   ├── api-client.ts         # Axios instance
│   │   ├── db.ts                 # Local data utilities
│   │   └── jwt.ts                # JWT utilities
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── validator/                # Zod schemas
├── public/
│   └── data/                     # Local JSON storage
│       ├── users.json
│       └── vendors.json
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

#### Technologies
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios
- **Validation:** Zod
- **Notifications:** notifier-mycin
- **Fonts:** Geist Sans & Geist Mono

#### Setup
```bash
cd Vendor-Auth-App
npm install
cp .env.example .env.local
# Edit .env.local with API URL
npm run dev
```

Application available at: `http://localhost:3000`

#### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.4 | React framework |
| React | 19.2.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Axios | 1.13.2 | HTTP client |
| Zod | 4.1.13 | Validation |

### Backend - Laravel
| Technology | Version | Purpose |
|------------|---------|---------|
| Laravel | 11.x | PHP framework |
| PHP | 8.2+ | Language |
| JWT Auth | 2.x | Authentication |
| MySQL/PostgreSQL | - | Database |

### Backend - .NET
| Technology | Version | Purpose |
|------------|---------|---------|
| ASP.NET Core | 8.0 | Framework |
| C# | 12.0 | Language |
| Entity Framework | 8.0 | ORM |
| SQL Server | - | Database |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **PHP** 8.2+ and Composer
- **.NET SDK** 8.0+
- **MySQL** or **PostgreSQL**
- **Git**

### Quick Start (All Components)

1. **Clone the repository**
```bash
git clone <repository-url>
cd vendor-api
```

2. **Start Laravel API**
```bash
cd vendor-user-api
composer setup
php artisan serve
# API running on http://localhost:8000
```

3. **Start .NET API** (Optional - if using .NET backend)
```bash
cd ../WebAPI
dotnet restore
dotnet ef database update
dotnet run
# API running on https://localhost:7000
```

4. **Start Next.js Frontend**
```bash
cd ../Vendor-Auth-App
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api" > .env.local
npm run dev
# App running on http://localhost:3000
```

### Test Credentials

**Customer Account:**
```
Email: john.doe@example.com
Password: 123456
```

**Vendor Account:**
```
Email: contact@acme.com
Password: 123456
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/Users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "user@example.com",
    "role": "Customer",
    "isVendor": false
  }
}
```

#### Register
```http
POST /api/Users/register
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Get Current User
```http
GET /api/me
Authorization: Bearer {token}

Response:
{
  "id": 1,
  "fullName": "John Doe",
  "email": "user@example.com",
  "role": "Customer",
  "isVendor": false,
  "vendor": null
}
```

### Vendor Endpoints

```http
GET    /api/Vendors              # List all vendors
GET    /api/Vendors/{id}         # Get vendor by ID
GET    /api/Vendors/byUser/{userId}  # Get vendor by user ID
POST   /api/Vendors              # Create vendor
PUT    /api/Vendors/{id}         # Update vendor
DELETE /api/Vendors/{id}         # Delete vendor
GET    /api/Vendors/search?query={term}  # Search vendors
```

### Event Endpoints

```http
GET    /api/Events               # List all events
GET    /api/Events/{id}          # Get event by ID
GET    /api/Events/user/{userId} # Get user's events
GET    /api/Events/vendor/{vendorId}  # Get vendor's events
POST   /api/Events               # Create event
PUT    /api/Events/{id}          # Update event
DELETE /api/Events/{id}          # Delete event
```

### Message Endpoints

```http
GET    /api/Messages/chatusers   # Get chat users
GET    /api/Messages/conversation/{userId}  # Get conversation
POST   /api/Messages              # Send message
```

### Notification Endpoints

```http
GET    /api/Notifications        # Get all notifications
PUT    /api/Notifications/{id}   # Mark as read
```

### Review Endpoints

```http
GET    /api/Reviews/event/{eventId}  # Get event reviews
POST   /api/Reviews               # Create review
```

**Full API documentation available in:**
- Postman Collection: `vendor-user-api/postman/WebTestingPostman.json`
- Requestly Collection: `vendor-user-api/postman/WebTestingRequestly.json`

---

## 🗄️ Database Schema

### Core Tables

**users**
- id (PK)
- fullName
- email (unique)
- password
- phone
- address
- role (Customer/Vendor)
- area
- created_at, updated_at

**vendors**
- id (PK)
- userId (FK → users)
- businessName
- contactName
- businessPhone
- businessEmail
- businessAddress
- serviceArea
- serviceType
- description
- website, instagram, facebook, linkedin
- ratingAverage
- reviewCount
- created_at, updated_at

**events**
- id (PK)
- userId (FK → users)
- vendorId (FK → vendors, nullable)
- title
- description
- eventDate
- location
- budget
- status
- created_at, updated_at

**messages**
- id (PK)
- senderId (FK → users)
- receiverId (FK → users)
- content
- isRead
- created_at, updated_at

**notifications**
- id (PK)
- userId (FK → users)
- title
- message
- type
- isRead
- created_at, updated_at

**reviews**
- id (PK)
- userId (FK → users)
- vendorId (FK → vendors)
- eventId (FK → events)
- rating (1-5)
- comment
- created_at, updated_at

---

## 🔐 Authentication Flow

```
┌─────────┐                 ┌─────────┐                 ┌──────────┐
│ Client  │                 │   API   │                 │ Database │
└────┬────┘                 └────┬────┘                 └────┬─────┘
     │                           │                           │
     │ 1. POST /login            │                           │
     │ (email, password)         │                           │
     ├──────────────────────────>│                           │
     │                           │ 2. Verify credentials     │
     │                           ├──────────────────────────>│
     │                           │                           │
     │                           │ 3. User data + vendor     │
     │                           │<──────────────────────────┤
     │                           │                           │
     │                           │ 4. Generate JWT           │
     │                           │    (includes isVendor)    │
     │                           │                           │
     │ 5. Return token + user    │                           │
     │<──────────────────────────┤                           │
     │                           │                           │
     │ 6. Store token            │                           │
     │    in localStorage        │                           │
     │                           │                           │
     │ 7. GET /api/me            │                           │
     │ Authorization: Bearer {token}                         │
     ├──────────────────────────>│                           │
     │                           │ 8. Decode & validate JWT  │
     │                           │                           │
     │                           │ 9. Fetch user + vendor    │
     │                           ├──────────────────────────>│
     │                           │                           │
     │                           │ 10. User data             │
     │                           │<──────────────────────────┤
     │                           │                           │
     │ 11. Return user data      │                           │
     │<──────────────────────────┤                           │
     │                           │                           │
```

### JWT Token Structure
```json
{
  "nameid": "1",
  "unique_name": "John Doe",
  "email": "john@example.com",
  "role": "Customer",
  "isVendor": false,
  "exp": 1234567890,
  "iat": 1234567890,
  "iss": "http://localhost:8000/",
  "aud": "http://localhost:8000/"
}
```

---

## 🚢 Deployment

### Frontend (Next.js)

**Vercel (Recommended)**
```bash
cd Vendor-Auth-App
vercel deploy
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Backend (Laravel)

**Production Setup**
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

**Docker**
```dockerfile
FROM php:8.2-fpm
RUN docker-php-ext-install pdo pdo_mysql
COPY . /var/www
WORKDIR /var/www
RUN composer install --optimize-autoloader --no-dev
```

### Backend (.NET)

**Publish**
```bash
dotnet publish -c Release -o ./publish
```

**Docker**
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY publish/ .
EXPOSE 80
ENTRYPOINT ["dotnet", "WebApi.dll"]
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd Vendor-Auth-App
npm run test
npm run test:e2e  # Playwright E2E tests
```

### Laravel Tests
```bash
cd vendor-user-api
composer test
php artisan test --coverage
```

### .NET Tests
```bash
cd WebAPI
dotnet test
dotnet test --collect:"XPlat Code Coverage"
```

---

## 📝 Additional Documentation

- **Frontend README:** `Vendor-Auth-App/README.md`
- **Laravel README:** `vendor-user-api/README.md`
- **API Docs:** `vendor-user-api/docs/`
- **Postman Collections:** `vendor-user-api/postman/`
- **Database Schema:** `Database_Schema.md`
- **WebAPI Docs:** `WebAPI.md`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary and confidential.

---

## 👥 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team

---

## 🗺️ Roadmap

- [ ] Real-time messaging with WebSockets
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search and filtering
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Email notifications
- [ ] File upload for vendor portfolios
- [ ] Calendar integration for events

---

**Last Updated:** 2025-11-26
**Version:** 1.0.0
