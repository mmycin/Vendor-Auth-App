# Vendor & Customer Portal

A modern, full-stack web application built with Next.js 16 and Laravel, featuring dual-dashboard functionality for vendors and customers with role-based access control, JWT authentication, and a premium glassmorphic UI.

## 🚀 Features

### Authentication & Authorization
- **JWT-based authentication** with Laravel backend
- **Dual login system** - users can log in as customer or vendor via checkbox
- **Role-based route protection** - vendors can access both dashboards, customers only customer dashboard
- **Automatic token refresh** and validation
- **Secure logout** with smooth preloader animation

### User Dashboards
- **Customer Dashboard** - Browse vendors, manage events, view favorites
- **Vendor Dashboard** - Manage business, track revenue, handle customer requests
- **Dynamic theme switching** - Pink gradient for vendors, purple for customers
- **Seamless role switching** - Vendors can toggle between dashboards

### UI/UX
- **Premium glassmorphic design** with backdrop blur effects
- **Gradient color schemes** matching dashboard roles
- **Responsive layout** - Mobile-first design with Tailwind CSS
- **Smooth animations** - Loading states, transitions, hover effects
- **Toast notifications** - Using `notifier-mycin` for user feedback

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: notifier-mycin
- **Validation**: Zod

### Backend
- **Framework**: Laravel 11
- **Authentication**: JWT (tymon/jwt-auth)
- **Database**: MySQL/PostgreSQL
- **API**: RESTful architecture

## 📁 Project Structure

```
Vendor-Auth-App/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/
│   │   │   ├── customer/         # Customer dashboard
│   │   │   └── vendor/           # Vendor dashboard
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/               # Reusable components
│   │   ├── Footer.tsx            # Premium footer with links
│   │   ├── Preloader.tsx         # Loading spinner
│   │   ├── ProtectedRoute.tsx    # Route guard component
│   │   └── ThemeWrapper.tsx      # Dynamic theme provider
│   ├── context/
│   │   └── AuthContext.tsx       # Authentication state management
│   ├── lib/
│   │   ├── api.ts                # API endpoint definitions
│   │   ├── api-client.ts         # Axios instance with interceptors
│   │   ├── db.ts                 # JSON file utilities (Next.js API)
│   │   └── jwt.ts                # JWT decode/validation utilities
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── validator/                # Zod validation schemas
└── public/
    └── data/                     # JSON data files (Next.js API mode)
        ├── users.json
        └── vendors.json

vendor-user-api/                  # Laravel Backend
├── app/
│   ├── Http/Controllers/
│   │   ├── AuthController.php    # Login, register, logout, me
│   │   ├── UserController.php
│   │   └── VendorController.php
│   └── Models/
│       ├── User.php
│       └── Vendor.php
├── routes/
│   └── api.php                   # API routes
└── database/
    └── migrations/               # Database schema
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PHP 8.2+
- Composer
- MySQL/PostgreSQL

### Frontend Setup

```bash
cd Vendor-Auth-App

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Backend Setup (Laravel)

```bash
cd vendor-user-api

# Install dependencies
composer install

# Set up environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vendor_api
DB_USERNAME=root
DB_PASSWORD=

# Run migrations
php artisan migrate

# Generate JWT secret
php artisan jwt:secret

# Start server
php artisan serve
```

The API will be available at `http://localhost:8000`

## 🔐 Authentication Flow

1. **Login**: User enters credentials and selects "Login as vendor" checkbox
2. **Token Generation**: Laravel generates JWT with user data and vendor status
3. **Token Storage**: Frontend stores token in localStorage
4. **Route Protection**: `ProtectedRoute` component validates authentication
5. **Dashboard Access**: User is redirected based on checkbox selection
6. **Auto-refresh**: Token is validated on page load via `/me` endpoint

## 🎨 Theme System

The application uses a dynamic theme system via `ThemeWrapper.tsx`:

- **Vendor Dashboard**: `from-slate-900 via-pink-900 to-slate-900`
- **Customer Dashboard**: `from-slate-900 via-purple-900 to-slate-900`
- **Login/Other Pages**: `from-slate-900 via-slate-800 to-slate-900`

The footer automatically matches the page background for seamless blending.

## 📡 API Endpoints

### Authentication
- `POST /api/Users/login` - User login
- `POST /api/Users/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user (with vendor relationship)

### Users
- `GET /api/Users` - List all users
- `GET /api/Users/{id}` - Get user by ID
- `PUT /api/Users/{id}` - Update user
- `DELETE /api/Users/{id}` - Delete user

### Vendors
- `GET /api/Vendors` - List all vendors
- `GET /api/Vendors/{id}` - Get vendor by ID
- `GET /api/Vendors/byUser/{userId}` - Get vendor by user ID
- `POST /api/Vendors` - Create vendor
- `PUT /api/Vendors/{id}` - Update vendor
- `DELETE /api/Vendors/{id}` - Delete vendor

## 🔒 Route Protection

Routes are protected using the `ProtectedRoute` component:

```tsx
<ProtectedRoute allowedRoles={['Vendor']}>
  {/* Vendor-only content */}
</ProtectedRoute>
```

**Access Rules:**
- Unauthenticated users → Redirected to `/login`
- Vendors → Can access both vendor and customer dashboards
- Customers → Can only access customer dashboard

## 🧪 Testing

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

## 📝 Key Components

### AuthContext
Manages global authentication state, provides login/logout functions, and tracks vendor status.

### ProtectedRoute
Guards routes based on authentication and role, shows loading spinner during auth check.

### ThemeWrapper
Applies route-specific background gradients and renders the footer.

### Preloader
Displays during logout with animated spinner and message.

## 🚧 Development Notes

- **Hydration Fix**: Dashboard pages use `mounted` state to prevent SSR mismatches
- **Async Logout**: Logout function returns Promise to ensure preloader displays before redirect
- **Token Validation**: JWT is decoded client-side for quick auth checks, validated server-side via `/me`
- **Vendor Detection**: Checked via `user.isVendor`, `user.vendor`, or `user.role === 'Vendor'`

## 📦 Build & Deploy

```bash
# Build frontend
npm run build
npm start

# Build backend (Laravel)
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Authors

- Development Team

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support, please contact the development team.
