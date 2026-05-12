
# finance-tracker
>>>>>>> cfd3c5e649b1c7100665413bf6ddc7559e030d9d
# Finance Tracker

A full-stack personal finance and budget tracking application with:
- User authentication and secure login
- Income and expense management
- Budget creation and progress tracking
- Category management
- Dashboard summary and visual insights

## Project structure

- `backend/` - Express API, MongoDB integration, authentication, CRUD endpoints for transactions, categories, budgets, and dashboard summary
- `frontend/` - React + Vite + Tailwind UI, dashboard, auth pages, transaction/category/budget management

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
JWT_SECRET=your-secret
```

Run backend:

```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Backend API

Base URL: `http://localhost:5000/api`

- `POST /auth/register`
- `POST /auth/login`
- `GET /transactions`
- `POST /transactions`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /budgets`
- `POST /budgets`
- `PUT /budgets/:id`
- `DELETE /budgets/:id`
- `GET /dashboard/summary`

## Notes

- Ensure MongoDB is running locally before starting the backend.
- Login is required for protected endpoints.

