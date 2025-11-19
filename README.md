# FixMyUnesa
FixMyUnesa is a university complaint reporting website inspired by FixMyStreet.
This project uses Golang for the backend and React + JavaScript for the frontend.

## Backend Setup
Run the following command to install the necessary Go modules in the backend directory:

```bash
go mod tidy
```
Run the application using this command:

```bash
go run main.go
```
Setup .env file based on the provided .env.example file.

## Database Setup
Before running the application, please setup your PostgreSQL database with the following schema:
Setup the users table in your PostgreSQL database using the following SQL commands:

```sql
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);
```
## Frontend Setup
run the following command to install the necessary Node.js packages in the frontend directory:

```bash
npm install
```
Run the application using:

```bash
npm run dev
```
