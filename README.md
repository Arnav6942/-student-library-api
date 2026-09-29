# Student Library API

REST API for the college library: books, members and loans.

## Setup

```
npm install
cp .env.example .env   # then set JWT_SECRET
npm start
```

## Endpoints

| Method | Path | Who | Description |
|---|---|---|---|
| POST | `/auth/register` | anyone | Create a member account |
| POST | `/auth/login` | anyone | Get a login token |
| GET | `/books` | anyone | List all books |
| GET | `/books/:id` | anyone | Get one book |
| POST | `/books` | admin | Add a book |
