# 🔐 Password Manager

A full-stack MERN password manager with user authentication, encrypted credential storage, and a built-in password generator.

> 🚧 **Personal project — actively in development.** Expect some bugs and rough edges while things get ironed out.

---

## ✨ Features

- **Authentication** — Register and login with JWT-based auth stored in session cookies
- **Protected Routes** — All dashboard routes require a valid session
- **Login Card Management** — Create, view, edit, and delete stored login credentials
- **Password Generator** — Generate passwords with configurable criteria:
  - Custom length
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters
- **Global State** — Managed with Zustand
- **Encrypted Storage** — Passwords stored encrypted in MongoDB

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React (Vite), Zustand               |
| Backend   | Node.js, Express.js, Nodemon        |
| Database  | MongoDB, Mongoose                   |
| Auth      | JWT, Session Cookies                |
| Encryption| AES (via `ENC_SECRET_KEY`)          |

---

## 📁 Project Structure

```
password-manager/
├── frontend/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level page components
│   │   ├── helper/            # Utility/helper functions
│   │   └── store/             # Zustand global state
│   └── .env
│
├── backend/                   # Express backend
│   ├── server.js              # Entry point
│   └── src/
│       ├── controllers/       # Route handler logic
│       ├── db/                # MongoDB connection
│       ├── helper/            # Utility/helper functions
│       ├── middlewares/       # Auth & other middleware
│       ├── models/            # Mongoose schemas (User, LoginCard)
│       └── routes/            # Express route definitions
│   └── .env
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend — `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Backend — `backend/.env`

```env
MONGO_URI=mongodb://localhost:27017
PORT=5000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
ENC_SECRET_KEY=your_encryption_key_here
```

> ⚠️ Never commit `.env` files. Add them to `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repository

```bash
git clone https://github.com/aka-Kush/password-manager.git
cd password-manager
```

### 2. Install dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Set up environment variables

Create `.env` files in both `frontend/` and `backend/` as shown in the [Environment Variables](#️-environment-variables) section above.

### 4. Start the development servers

**Frontend** (runs on `http://localhost:5173`):
```bash
cd frontend
npm run dev
```

**Backend** (runs on `http://localhost:5000`):
```bash
cd backend
npm run start
```

> Run both simultaneously in separate terminals.

---

## 🗄️ Database Models

### User

| Field    | Type   | Constraints                     |
|----------|--------|---------------------------------|
| name     | String | Required, trimmed               |
| email    | String | Required, unique                |
| password | String | Required, min 8 chars (hashed)  |

### LoginCard

| Field    | Type     | Constraints                        |
|----------|----------|------------------------------------|
| user     | ObjectId | Ref to `User`, required            |
| name     | String   | Required, trimmed                  |
| username | String   | Required, trimmed                  |
| password | String   | Required, trimmed (encrypted)      |

---

## 🔑 API Overview

### Auth Routes — `/api/auth`

| Method | Endpoint    | Controller     | Description               | Auth Required |
|--------|-------------|----------------|---------------------------|---------------|
| POST   | `/register` | `registerUser` | Register a new user       | ❌            |
| POST   | `/login`    | `loginUser`    | Login and set JWT cookie  | ❌            |
| POST   | `/logout`   | `logoutUser`   | Clear session cookie      | ✅            |

### Protected Routes — `/api/protected`

| Method | Endpoint      | Controller    | Description                     | Auth Required |
|--------|---------------|---------------|---------------------------------|---------------|
| GET    | `/`           | `dashboard`   | Get current authenticated user  | ✅            |
| GET    | `/logins`     | `fetchLogins` | Fetch all login cards for user  | ✅            |
| POST   | `/login`      | `addLogin`    | Create a new login card         | ✅            |
| DELETE | `/delete/:id` | `deleteLogin` | Delete a login card by ID       | ✅            |
| PUT    | `/edit/:id`   | `editLogin`   | Update a login card by ID       | ✅            |

> All protected routes are guarded by JWT middleware in `src/middlewares/`.

---

## 🔒 Security

- User passwords are **hashed** before storage (bcrypt recommended)
- Login card passwords are **encrypted** using `ENC_SECRET_KEY`
- Auth is handled via **JWT stored in HTTP-only session cookies**
- All card routes are **protected** — users can only access their own data
- Input validation is enforced on both frontend and backend

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
