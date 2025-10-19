<!-- # Full-Stack Admin Panel

A mini admin panel built with a React/TypeScript frontend and a Node.js/Express/TypeScript backend. This project demonstrates user management, data visualization, Protocol Buffers integration, and cryptographic security.

---

## Features

### 1. **User Management (CRUD)**

- Create, update, delete, and list users.
- Each user has the following fields:
  - `id`
  - `email`
  - `role` (e.g., admin, user, etc.)
  - `status` (active/inactive)
  - `createdAt`

### 2. **User Graph**

- Displays a chart of users created per day over the last 7 days.

### 3. **Protobuf Integration**

- Backend exposes an endpoint `/users/export` that returns all users serialized in Protocol Buffer format.
- Frontend fetches this endpoint, decodes the protobuf data, and displays the user list in a table.

### 4. **Cryptographic Security**

- Backend:
  - Hashes user emails using SHA-384.
  - Digitally signs the hash with an RSA key pair.
- Frontend:
  - Verifies the signature received from the backend.
  - Only displays users with valid signatures.

---

## Tech Stack

### Backend

- **Node.js** with **Express** and **TypeScript**
- **SQLite** for data persistence
- **RSA key pair** for digital signatures
- **SHA-384** for email hashing

### Frontend

- **React** with **TypeScript**
- **Vite** for build tooling
- **Recharts** for data visualization
- **React-Toastify** for notifications
- **Protocol Buffers** for efficient data serialization
- **Web Crypto API** for signature verification

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Git** (for version control)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ``` -->

# Full-Stack Admin Panel

A full-stack **mini admin panel** built with **React + TypeScript (Frontend)** and **Node.js + Express + TypeScript (Backend)**.  
This project demonstrates **secure user management**, **cryptographic signing**, **data visualization**, **Protocol Buffers integration**, and **automated testing with CI/CD pipelines**.

---

## Overview

This project implements a secure full-stack application that allows administrators to manage users, visualize user statistics, and verify data integrity using cryptography.

It combines:

- **Modern frontend development** (React + Vite + TypeScript)
- **Robust backend architecture** (Express + SQLite + Protobuf)
- **Security principles** (RSA signatures, SHA-384 hashing)
- **Automated testing and CI/CD workflows**

---

## Features

### User Management (CRUD)

- Create, update, delete, and view users.
- Each user includes:
  - `id`
  - `email`
  - `role`
  - `status`
  - `createdAt`

### User Statistics

- Displays users created in the last 7 days using a visual line chart (Recharts).

### Cryptographic Security

- **Backend**:
  - Generates RSA public/private key pair.
  - Hashes emails using **SHA-384**.
  - Signs the hash using **RSASSA-PKCS1-v1_5**.
- **Frontend**:
  - Retrieves the public key.
  - Verifies each user’s signature before displaying.

### Protocol Buffers Integration

- `/api/users/export` returns all users serialized in **Protobuf format**.
- Frontend decodes `.proto` data to display in the UI.

### Integration Testing

- Comprehensive backend tests using **Jest** and **Supertest**.
- Verifies all critical API routes and database operations.

### Continuous Integration (CI/CD)

- GitHub Actions pipeline automates:
  - Installation of dependencies
  - Linting & building
  - Running backend integration tests

---

## Backend Setup

cd backend
`npm install`
`npm run dev`

## Frontend Setup

cd frontend
`npm install`
`npm run dev`

## Testing the Application(Backend Integration Tests)

#### Run all tests:

cd backend
`npm run test`

### Tools:

- `Jest`

- `Supertest`
