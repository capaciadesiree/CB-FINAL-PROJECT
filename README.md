# 📌 Mondit - Finance Tracker App

A **full-stack finance tracker** that helps users manage their income and expenses efficiently. Built with **MERN Stack** and **Passport.js** for authentication.

## 🚀 **Features**

✅ Secure authentication with **Passport.js**

✅ Add, edit, and delete transactions in real-time

✅ Image with **charts,** **transaction history** and **total summary boxes**

✅ **Automated calculations** for total income, total expenses, and remaining savings

✅ Transaction filtering by **date and category**

✅ **Optimized and User-friendly UI** for **web browsers**

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

![Image Preview](https://i.imgur.com/6Rt1HxG.png)

![Image Preview](https://imgur.com/byuwA8Y.png)

### 2️⃣ Dashboard

![Image Preview](https://imgur.com/NoeVuQC.png)

### 3️⃣ Add Transaction

![Image Preview](https://imgur.com/95AjpBb.png)

![Image Preview](https://imgur.com/Oa0xltj.png)

### 4️⃣ Transaction History

![Image Preview](https://imgur.com/MmEKXIy.png)

---

## 📥 **Installation & Setup**

### **1️⃣ Clone the Repository**

```
git clone https://github.com/capaciadesiree/CB-FINAL-PROJECT.git
cd CB-FINAL-PROJECT
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

4️⃣ Edit or delete transactions in **TxnList** (Transaction List) component

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