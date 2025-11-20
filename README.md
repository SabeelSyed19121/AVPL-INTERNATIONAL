Task Manager with Role-Based Access (MERN + SQLite)

A full-stack Task Management System built using:

React + Vite (frontend)
Node.js + Express (backend)
SQLite (database)
JWT Authentication
Role-Based Access Control (RBAC)

This project is developed for AVPL International Assignment, demonstrating complete MERN-Stack fundamentals including authentication, authorization, REST APIs, protected routes, and admin workflow.

Features
User Features

1.Register and Login
2.Create tasks
3.Edit tasks
4.Delete tasks
5.View only their own tasks

Admin Features

1.View all users' tasks
2.Delete any task
3.Role-based access using JWT
4.Promote user to admin (SQLite)

Tech Stack
Frontend

React 18
Vite
Axios
React Router
Custom CSS (Minimal Apple-like design)

Backend

Node.js
Express.js
SQLite3
JWT Authentication

bcryptjs (password hashing)

Project Structure
AVPL-INTERNATIONAL/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── database.sqlite
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json

Installation & Setup
Clone the Repository
git clone https://github.com/SabeelSyed19121/AVPL-INTERNATIONAL.git

Backend Setup
cd backend
npm install

Create .env file:
JWT_SECRET=your_secret_key_here
PORT=5000

Run Backend
npm run dev


Backend runs at:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


App runs at:

http://localhost:5173

Making First User Admin

Open SQLite:

cd backend
sqlite3 database.sqlite


Run SQL:

UPDATE users SET role='admin' WHERE id=1;


Exit:

.exit


Now the first user becomes Admin.

API Endpoints
Auth
Method	Endpoint	              Description
POST	/api/auth/register	    Register new user
POST	/api/auth/login	        Login user

Tasks

Method	 Endpoint	           Description
GET	   /api/tasks	     Get user's tasks or all tasks (admin)
POST	 /api/tasks	     Create task
PUT	   /api/tasks/:id	 Update task
DELETE	/api/tasks/:id	Delete task
UI Theme (Clean Minimal)

White background
Soft shadows

Rounded cards

Smooth modern UI

Consistent spacing

The CSS is implemented in frontend/src/index.css.
