# Shortify Project

Shortify is a URL shortening platform with user authentication, dashboard, and
analytics.

# 1. Setup Overview

### (i) Clone the repo:

```bash
git clone https://github.com/tarekmonowar/TechNext.git

```

### (ii) Make Sure you have this inside .env in root

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

### (iii) after clone run this in terminal

```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   npm run dev
```

# 2. Api Overview

Base URL: `/api/v1`

## User API

`POST /user/register` Create a new user account  
**Result:** User registered successfully

`POST /user/login` Login with email and password  
**Result:** Authenticated user session created

`POST /user/logout` Logout current user  
**Result:** User logged out successfully

`GET /user/profile` Get logged-in user profile  
**Auth:** User / Admin  
**Result:** User profile data returned

`PUT /user/profile` Update logged-in user profile  
**Auth:** User / Admin  
**Result:** User profile updated successfully

`GET /user/allUsers` Get all users  
**Auth:** Admin only  
**Result:** List of all users returned

`POST /url` Create a short URL  
**Auth:** User / Admin  
**Result:** Short URL created successfully

`/url` Get logged-in user URLs  
**Auth:** User / Admin  
**Result:** User URLs returned

`DELETE /url/:id` Delete a short URL  
**Auth:** User / Admin  
**Result:** URL deleted successfully

` GET /url/allUrls` Get all URLs  
**Auth:** Admin only  
**Result:** List of all URLs returned

`GET /:shortCode` Redirect to original URL  
**Result:** Redirects to original long URL

# Tech stack

Express.js , TypesScripe , PostgreSQL, Prisma
