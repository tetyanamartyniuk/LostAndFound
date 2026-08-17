# 🚀 Lost and Found website

> A full-stack web application designed to help people reunite with their lost belongings. It provides a secure platform for users to post found items, search for lost goods, and communicate directly to facilitate returns.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)

---

## ✨ Features

-- **🔐 Secure Authentication & Access Control** — Robust login using JWT (Access and Refresh tokens) with a clear separation of roles between regular users and administrators.

-- **🔍 Advanced Search & Filtering** — Easily find items by name and apply flexible filters based on status (lost/found), city, category, and date.

--**📸 Comprehensive Listing Management** — Registered users can create posts, upload multiple photos simultaneously for detailed visual descriptions, and delete their own listings.

--**💬 Direct Communication** — Built-in capability for authenticated users to directly message the listing owner to arrange the return of an item.

--**🛡️ Moderation System (Admin Panel)** — A dedicated dashboard for administrators to manage categories and seamlessly approve or reject new item submissions.

--**⚡ Curated Public Feed** — The main feed displays only moderator-approved listings, ensuring high-quality, spam-free content for all visitors.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, TypeScript, React
- **Backend:** Node.js, Express, Zod
- **Database & ORM:** PostgreSQL, TypeORM

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v18 or higher)
- **Git**
- **PostgreSQL** (running locally or via Docker)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tetyanamartyniuk/LostAndFound
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a .env file in your backend directory and configure your database and JWT secrets:

   ```bash
   # Server Configuration
   PORT=8080

   # Database (TypeORM / PostgreSQL)

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_db_password
    DB_NAME=lost_and_found

    # Authentication

    ACCESS_TOKEN_SECRET=your_access_secret_key
    REFRESH_TOKEN_SECRET=your_refresh_secret_key

   ```

   Make sure your PostgreSQL server is running and create an empty database matching the DB_NAME name in your .env file.

---

## 💻 Usage

1. **Start the backend server:**

```bash
npm run dev
```

2. **Start the frontend server:**
   (Open a new terminal window)

```bash
cd frontend
npm run dev
```

3. **Access the application:** Open `http://localhost:5173` in your web browser.
