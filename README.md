# Frontend - Secure Student Management System

A modern React + TypeScript based Student Management System with secure authentication, dual-layer encryption, protected routes, and complete CRUD operations.

---

## Tech Stack

* React.js
* TypeScript
* Axios
* CryptoJS
* CSS3

---

## Features

### Authentication & Security

* Secure Login System
* Protected Routes
* Session Handling using LocalStorage
* User-specific Edit/Delete Access
* Automatic Logout After Account Deletion

### Student Management

* Single Student Registration
* Multiple Student Registration
* Dynamic Student Forms
* Update Student Details
* Delete Own Account
* Student Dashboard

### Validation

* Mandatory Field Validation
* Duplicate Email Validation
* Database Email Validation
* Real-time Error Handling

### Encryption

* Frontend Level Encryption using AES
* Data encrypted before API transmission

### UI/UX

* Responsive Professional UI
* Success & Error Message Components
* Modern Dashboard Design

---

## Project Structure

src/
│
├── pages/
├── components/
├── utils/
├── css/
├── routes/
└── App.tsx

---

## Encryption Flow

### Level 1 (Frontend)

Student data is encrypted before sending to backend APIs.

### Level 2 (Backend)

Backend applies second encryption layer before storing into MongoDB.

---

## Screenshots

### Login Page

![Login](./screenshots/loginPage.png)

### Register Student

![Register](./screenshots/registerNewStudent.png)

### Multiple Student Registration

![multiRegister](./screenshots/multiStudentFunctionality.png)

### Multiple Student Form

![multiRegisterForm](./screenshots/multiStudentRegister.png)

### Student Dashboard

![Dashboard](./screenshots/studentList.png)

---

## Installation & Setup

### Install Dependencies

npm install

### Start Development Server

npm run dev

---

## Frontend URL

http://localhost:5173

---

## Key Functionalities

* Multiple Student Registration
* Login Authentication
* Protected Dashboard
* Own Account Edit/Delete Access
* Secure Logout
* Dynamic Form Management
* Encrypted API Communication

---

## Author

Prasad More
