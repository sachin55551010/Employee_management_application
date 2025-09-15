# 🧑‍💼 Employee Management System

A full-stack Employee Management System built with MERN stack (MongoDB, Express.js, React.js, Node.js, socket.io). This app allows admins to create, update, view, and manage employee data efficiently.

---

## 🚀 Features

- Add, edit, and delete employee records
- Assign roles and departments
- View employee statistics and profiles
- Search, filter, and sort employee data
- Responsive and user-friendly UI
- Authenticated access for admins
- Can see live changes made by user or admin

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Node.js, Express.js, JWT, MongoDB
- **Database:** MongoDB Atlas / local MongoDB
- **State Management:** Zustand

---

## 🔧 Setup Instructions

### 1. Clone the repo
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

3. Configure Environment Variables
Create a .env file in the backend directory:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

4. Start the development server
Backend
cd backend
npm run dev

Frontend
cd ../frontend
npm run dev


