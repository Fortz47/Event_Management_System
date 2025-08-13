# Event Management System

A backend-focused Node.js/Express application for managing events, participants, payments, and tickets.

## base URL

http://localhost:5000/

## Features

- User authentication (JWT)
- Event creation and management
- Ticketing system
- Payment integration (mock)
- Admin and user roles
- Redis caching

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MySQL
- Redis

### Installation

1. **Clone the repository:**

   ```bash
   git clone <[https://github.com/Fortz47/Event_Management_System](https://github.com/Fortz47/Event_Management_System)>
   cd Event_Management_System
   ```

**Note: This app was deveoped in Linux environment**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your secrets and DB config.
     `

4. **Start Redis and Mysql server:**

   ```bash
   redis-server
   sudo service mysql start
   ```

5. **Start the application:**
   ```bash
   npm run dev
   ```

### API Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/events` — List events (JWT required)
- `POST /api/payments/initialize` — Initialize payment (JWT required)
- ...and more!

### Project Structure

```
src/
  modules/
    Auth/
    Event/
    Payment/
    Ticket/
    User/
  configs/
  interfaces/
  middleware/
  schemas/
  utils/
  app.ts
  server.ts
```

### Development

- Use VS Code for best experience.
- All routes are prefixed with `/api/`.
- JWT authentication is required for most endpoints.

---

**Note:** This is a temporary README. Please refer to the full documentation for advanced usage and configuration options.
