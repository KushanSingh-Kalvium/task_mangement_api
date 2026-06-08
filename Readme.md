# Task Management System

## Overview

A full-stack Task Management System built as part of the Backend Developer Internship Assignment.

The application provides:

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (USER / ADMIN)
* Task CRUD Operations
* Swagger API Documentation
* PostgreSQL Database Integration
* React Frontend

---

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT
* bcrypt
* Zod
* Swagger

### Frontend

* React.js
* Axios
* React Router DOM

---

## Features

### Authentication

* User Registration
* User Login
* Password Hashing
* JWT Authentication

### Authorization

* User Role
* Admin Role
* Protected Routes

### Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task

### Validation

* Request Validation using Zod

### Documentation

* Swagger API Documentation

---

## Screenshots

### Register Page

![Register Page](./screenshots/Register.png)

### Login Page

![Login Page](./screenshots/Login.png)

### Dashboard

![Dashboard](./screenshots/Dashboard.png)

### Swagger Documentation

![Swagger Documentation](./screenshots/SwaggerDocs.png)

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend:

```env
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

---

## API Documentation

Swagger:

http://localhost:5000/api-docs

---

## Folder Structure

backend/
frontend/

---

## Author

Kushan Singh
