# Full-Stack Admin Panel

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
   ```
