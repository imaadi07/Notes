# 📝 MERN Notes App

A full-stack **MERN (MongoDB, Express, React, Node.js)** based Notes application that allows users to securely register, log in, and manage their notes. Built with scalability and maintainability in mind, with authentication using Google and modern frontend practices.

---

## 📦 Backend Setup

### 1. Navigate to the backend folder:
```bash
cd backend
npm install
```
### 2. Create a .env file inside the backend folder with all the content like: 
```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notesdb
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
```

### 3. To run the backend, use the following command: 
```bash
npm run dev
```

### 4. Navigate to the frontend folder and use the following command to start the application:
```bash
cd frontend
npm install
npm run dev
```

### The frontend will run on http://localhost:5173





