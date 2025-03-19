# 📌 Mondit - Finance Tracker App

A **finance tracker web application** designed to help users efficiently manage their income and expenses.

Developed to explore user authentication, API integrations, full-stack app deployment, session management, and a dynamic system for data calculations. This project is a challenging and creative way that helped me deepen my understanding of both backend and frontend development.

https://github.com/user-attachments/assets/f8d57f1d-ea2e-4164-a52e-447e6d3b56b5

---

## 🚀 **Features**

✅ Secure authentication with **Passport.js**

✅ Add, edit, and delete transactions in real-time

✅ Dashboard with **charts,** **transaction history** and **total summary boxes**

✅ **Automated calculations** for total income, total expenses, and remaining savings

✅ Transaction filtering by **date and category**

✅ **Optimized and User-friendly UI** for **web browsers**

✅ **Light / Dark mode** interface

---

## 🛠 **Tech Stack**

- **Database:** MongoDB + Mongoose for flexible database management
- **Backend:** Node.js & Express for handling RESTful APIs and server-side logic
- **Frontend:** React for a dynamic, component-based UI
- **Authentication:** Passport.js for secure, session-based login
- **Styling:** Styled-Components & MUI for UI design
- **Testing:** Postman for API testing (GET, POST, PUT, DELETE requests)
- **Deployment:** Netlify for the frontend, Railway for the backend

---

## 📥 **Installation & Setup**

### **1. Clone the Repository**

```
git clone https://github.com/capaciadesiree/CB-FINAL-PROJECT.git
cd CB-FINAL-PROJECT
```

### **2. Install Dependencies**

### Backend:

```
cd backend
npm install
```

### Frontend:

```
cd frontend
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the **backend** directory and add:

```
# Server Port
PORT=3000

# Database Connection
MONGO_URI=your_mongodb_connection_string

# Session Authentication
SESSION_SECRET=your_secret_key

# Manually change NODE_ENV to development or production
NODE_ENV=production
```

Create a `.env` file in the **frontend** directory and add:

```
# API Base URL for Backend
REACT_APP_API_URL=your_backend_api_url
```

### **4. Start the App**

Run the backend:

```
cd backend
npm run dev
```

Run the frontend:

```
cd frontend
npm start
```

---

## 🔥 **Usage**

1. Register/Login to an account
2. Add **income** or **expense** transactions
3. Edit or delete transactions in your **Transaction List**
4. View summary of your finances in the **dashboard** and/or **Transaction History** page

---

## 📡 **API Endpoints (Private Use Only)**

🚨 *These endpoints are used internally by the app and require authentication.*

| Method   | Endpoint  | Description           | Authentication |
|----------|----------|----------------------|---------------|
| `POST`   | `/api/signup` <br> `/api/login` <br> `/api/add-income` <br> `/api/add-expense`  | Add a new account <br> Login to new account <br> Add a new transactions  | ✅ Yes |
| `GET`    | `/api/user` <br> `/api/get-income` <br> `/api/get-expense`  | Get user and transactions | ✅ Yes |
| `PUT`    | `/api/edit-income/:_id` <br> `/api/edit-expense/:_id` | Update a transaction by id | ✅ Yes |
| `DELETE` | `/api/delete-income/:_id` <br> `/api/delete-expense/:_id` | Delete a transaction by id | ✅ Yes |

🔒 **All endpoints require authentication via session-based login with Passport.js.** Unauthorized requests will be rejected.

---

## 🎯 **Future Enhancements**

- Advanced filtering (by category, amount, tags)
- Export transactions to CSV/PDF
- Active status on transaction list

---

## 📜 **License**

MIT License - Feel free to use and improve this project!