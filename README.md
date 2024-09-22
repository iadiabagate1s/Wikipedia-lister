# Legal Ease Application Documentation

## Overview

The Legal Ease project consists of a backend (`legal-ease-core`) built with Node.js, Express, Sequelize, and a frontend (`legal-ease-ui`) built with React. The two services are designed to work together but can also be run individually. This documentation will guide you through setting up the project using Docker Compose or running the services manually using npm.

## Prerequisites

- Docker and Docker Compose installed (if using Docker Compose)
- Node.js (v16 or later) and npm installed (if running manually)

---

## 1. Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

---

## 2. Using Docker Compose (Recommended)

The easiest way to launch the entire application (both frontend and backend) is by using Docker Compose.

### Steps

1. Navigate to the root directory of the project.

2. Create `.env` files:
   - For the backend (`legal-ease-core/.env`):

     ```plaintext
     MYSQL_ROOT_PASSWORD=your_root_password
     MYSQL_DATABASE=legalEase
     MYSQL_USER=your_mysql_user
     MYSQL_PASSWORD=your_mysql_password
     ```

   - For the frontend (`legal-ease-ui/.env`):

     ```plaintext
     REACT_APP_BASE_SERVER_URL=http://localhost:5001/api/
     ```

3. Run Docker Compose to build and start the services:

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build and run the backend on port `5001`
   - Build and run the frontend on port `3000`
   - Set up a MySQL database
   - Automatically run the seed script to create initial data in the database (including a default user with the following credentials):

     - Email: `test@example.com`
     - Password: `password` (hashed using Argon2)

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5001/api](http://localhost:5001/api)

5. To stop the application, run:

   ```bash
   docker-compose down
   ```

---

## 3. Running Services Individually (Manual Method)

If you'd prefer to run the backend and frontend manually, follow these steps.

### Backend (Node.js/Express)

1. Navigate to the backend directory:

   ```bash
   cd legal-ease-core
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the `.env` file inside `legal-ease-core`:

   ```plaintext
   MYSQL_ROOT_PASSWORD=your_root_password
   MYSQL_DATABASE=legalEase
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   ```

4. Seed the database:

   When running the backend for the first time, seed the database by running:

   ```bash
   npm run seed
   ```

   This will create the initial user with the following credentials:

   - Email: `test@example.com`
   - Password: `password`

   You can run this seed command anytime to reset the database with initial data.

5. Start the backend:

   ```bash
   npm start
   ```

   This will run the backend on port `5001`.

### Frontend (React)

1. Navigate to the frontend directory:

   ```bash
   cd legal-ease-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the `.env` file inside `legal-ease-ui`:

   ```plaintext
   REACT_APP_BASE_SERVER_URL=http://localhost:5001/api/
   ```

4. Start the frontend:

   ```bash
   npm start
   ```

   This will run the frontend on port `3000`.

---

## 4. Running Tests

Both the backend and frontend have their own set of tests.

### Backend Tests

1. Navigate to the backend directory:

   ```bash
   cd legal-ease-core
   ```

2. Run the tests:

   ```bash
   npm test
   ```

### Frontend Tests

1. Navigate to the frontend directory:

   ```bash
   cd legal-ease-ui
   ```

2. Run the tests:

   ```bash
   npm test
   ```

---

## 5. Database Management

The application uses MySQL as the database. When using Docker Compose, the database is set up automatically. You can access MySQL via port `3307`.

- Database name: `legalEase`
- Port: `3307`
- MySQL root credentials: Defined in your `.env` file

---

## 6. Seeding the Database on Deploy

On the first deployment, the backend automatically seeds the database with essential data, including a default user with the following credentials:

- Email: `test@example.com`
- Password: `password` (hashed with Argon2)

### Re-running the Seed

If you ever need to reset the database or reseed it with the default user, you can run the following command in the `legal-ease-core` directory:

```bash
npm run seed
```

---

## 7. Rebuilding Docker Containers

If you've made changes to the `Dockerfile` or dependencies and need to rebuild the containers, use:

```bash
docker-compose up --build
```

---

## 8. Troubleshooting

- Docker containers not starting: Ensure that your `.env` files are correctly set up and that Docker is running.
- Port conflicts: If you encounter port conflicts, change the ports in the `docker-compose.yml` file or your `.env` files.
