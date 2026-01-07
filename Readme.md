# Shortify Project

Shortify is a URL shortening platform with user authentication, dashboard, and
analytics.

## Folder Structure

- `/backend`: Node.js + Express API + PostgreSQl and Prisma
- `/frontend`: Next.js frontend

## Setup Overview

1. Clone the repo:

   ```bash
   git clone https://github.com/tarekmonowar/TechNext.git

   ```

2. Follow detailed setup in `/backend/README.md` and `/frontend/README.md`

# 1. Install Frontend

### (i) Make Sure you have this inside .env.local in root

```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   NEXTAUTH_SECRET=f2a3d7e8c5f4b6d9a1c2e3f4b5a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4
   NEXTAUTH_URL=http://localhost:3000

```

### (ii) after clone run this in terminal

```bash
   cd frontend
   npm install
   npm run dev
```

# 1. Install Backend

### (i) Make Sure you have this inside .env in root

```bash

PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EXPRESS_SESSION_SECRET=express-session-tm-shortify-backend-xyz
JWT_ACCESS_SECRET=tmonoware-shortify-secret-xyz
JWT_ACCESS_EXPIRES=2d
BCRYPT_SALT_ROUND=10

```

### (ii) after clone run this in terminal

```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   npm run dev
```

## Tech Stack

- Frontend: React, Next.js, TailwindCSS, ShadCN UI
- Backend: Node.js, Express, PostgreSQL
- Authentication: NextAuth
- API: REST

# For more details please follow /frontend/Readme.md and backend/Readme.md file
