# Vendor User API

A REST API built with Laravel for managing vendors and users.

## Requirements

- PHP 8.2 or higher
- Composer
- Database (MySQL, PostgreSQL, SQLite, etc.)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vendor-user-api
```

2. Install dependencies and set up the project:
```bash
composer setup
```

This will:
- Install PHP dependencies
- Copy `.env.example` to `.env`
- Generate application key
- Run database migrations

3. Configure your `.env` file with your database credentials and other settings.

## Running the API

### Development Server

Start the development server with queue workers and logs:
```bash
composer dev
```

Or start just the API server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
```
GET /api/health
```

Returns the API status and current timestamp.

### User Authentication
```
GET /api/user
```

Returns the authenticated user's information. Requires authentication via Laravel Sanctum.

## Testing

Run the test suite:
```bash
composer test
```

## Project Structure

- `app/` - Application code (Models, Controllers, etc.)
- `routes/api.php` - API route definitions
- `database/` - Migrations, seeders, and factories
- `tests/` - Test files
- `config/` - Configuration files

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
