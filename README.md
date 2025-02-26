### 📌 Mondit - Finance Tracker App

A **full-stack finance tracker** that helps users manage their income and expenses efficiently. Built with **MERN Stack** and **Passport.js** for authentication.

## 🚀 **Features**

✅ Secure authentication with **Passport.js**

✅ Add, edit, and delete transactions in real-time

✅ Dashboard with **charts,** **transaction history** and **total summary boxes**

✅ **Automated calculations** for total income, total expenses, and remaining savings

✅ Transaction filtering by **date and category**

✅ Optimized for **desktop and web browsers**

✅ **User-friendly UI** for web browsers

✅ **Light / Dark mode** interface

## 🛠 **Tech Stack**

| **Category** | **Technology** |
| --- | --- |
| Frontend | React, Styled-Components, MUI |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js (Session-based) |
| Hosting | Netlify (Frontend), Railway (Backend) |

## 📷 **Screenshots**

### 1️⃣ Sign-up & Login page

![image.png](attachment:ec760acd-759c-4fb7-8ea8-8c69ca157236:image.png)

![image.png](attachment:09b72348-4ca0-4305-8a9a-fae9679dddaa:image.png)

### 2️⃣ Dashboard

![image.png](attachment:c14e1eed-63f1-4bfe-ba64-b04cc9654404:image.png)

### 3️⃣ Add Transaction

![image.png](attachment:ef866564-be1d-460d-823d-7506dbbe5d67:image.png)

![image.png](attachment:faaf9b45-1693-4d4c-b0dd-140fbc88e8b0:image.png)

### 4️⃣ Transaction History

![image.png](attachment:7abd5a73-7949-4422-b0ab-b0357f02bfb6:image.png)

---

## 📥 **Installation & Setup**

### **1️⃣ Clone the Repository**

```
git clone https://github.com/capaciadesiree/CB-FINAL-PROJECT.git
cd finance-tracker
```

### **2️⃣ Install Dependencies**

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

### **3️⃣ Set Up Environment Variables**

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

### **4️⃣ Start the App**

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

1️⃣ Register/Login to your account

2️⃣ Add **income** or **expense** transactions

3️⃣ View summary in the **dashboard**

4️⃣ Edit or delete transactions in **TxnList** (Transaction List) ****component

---

## 📡 **API Endpoints (Private Use Only)**

🚨 *These endpoints are used internally by the app and require authentication.*

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| `POST` | `/api/signup`
`/api/login`
`/api/add-income
 /api/add-expense` | Add a new transaction | ✅ Yes |
| `GET` | `/api/user`
`/api/get-income
 /api/get-expense` | Get all transactions | ✅ Yes |
| `PUT` | `/api/edit-income/:_id`
`/api/edit-expense/:_id` | Update a transaction | ✅ Yes |
| `DELETE` | `/api/delete-income/:_id`
`/api/delete-expense/:_id` | Delete a transaction | ✅ Yes |

🔒 **All endpoints require authentication via session-based login with Passport.js.** Unauthorized requests will be rejected.

---

## 🎯 **Future Enhancements**

- 🔹 Advanced filtering (by category, amount, tags)
- 🔹 Multi-user budgeting feature
- 🔹 Export transactions to CSV/PDF
- 🔹 Active status on transaction list

---

## 📜 **License**

MIT License - Feel free to use and improve this project!