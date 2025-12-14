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
Setup the users table in your PostgreSQL database using the following SQL commands:

```sql
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    prodi VARCHAR(255) NOT NULL,
    fakultas VARCHAR(255) NOT NULL,
    nim VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```
Setup the reports table in your postgreSQL database using the following SQL commands:

```sql
CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(255),
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'menunggu',
    is_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    pict_path TEXT,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
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
