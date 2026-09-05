# Meer Divine Art — E-Commerce Platform (React Frontend + Node.js Backend + Admin Studio)

This repository contains the complete production-ready code for **Meer Divine Art**, an e-commerce platform for handcrafted Islamic Arabic calligraphy, wall art, and personalized frames.

---

## Technical Stack Overview

### 1. Customer-Facing Frontend (`client/`)
- **Framework**: React 19, TypeScript, Vite 8, TanStack Router, TanStack Query
- **Styling**: Tailwind CSS v4, custom brand palette (`gold #E1A140`, `deep brown #532200`, `sand #EFCFA0`, `burnt #914110`, `ivory #FAF7F2`)
- **Typography**: Cormorant Garamond (Display) & Manrope (Body)

### 2. Admin Dashboard Studio (`client/src/routes/admin`)
- **Framework**: React 19, TypeScript, Recharts Analytics, Sonner Toast Notifications
- **Features**: Single-Admin JWT authentication, product catalog CRUD with Cloudinary multi-image selector, category management, order fulfillment tracker, sales charts.

### 3. Production Node.js REST API (`server/`)
- **Runtime**: Node.js & Express.js (ES modules)
- **Database**: MongoDB with Mongoose schemas & indexes
- **Image Cloud**: Cloudinary SDK (Direct HTTPS multi-image uploads)
- **Security**: Helmet security headers, CORS origin protection, express-rate-limit rate limiting, bcryptjs password hashing, JWT authorization.

---

## Directory Structure

```
.
├── client/                   # React Frontend Workspace
│   ├── public/               # Public assets
│   ├── src/
│   │   ├── components/       # UI components, Header, Footer, AdminLayout
│   │   ├── routes/           # Customer & Admin pages
│   │   ├── services/         # REST API Client
│   │   └── styles.css        # Tailwind v4 theme & tokens
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json         # TypeScript configuration
├── server/                   # Express Backend Workspace
│   ├── config/               # db.js, cloudinary.js
│   ├── controllers/          # auth, product, category, order, admin controllers
│   ├── middleware/           # auth, error, upload, validation middlewares
│   ├── models/               # Admin, Product, Category, Order, Review schemas
│   ├── routes/               # API routes
│   ├── scripts/              # seedAdmin.js, seedCatalog.js
│   ├── .env                  # Development environment variables (git ignored)
│   ├── .env.example          # Production env placeholders
│   ├── package.json          # Server dependencies
│   └── server.js             # Server entry point
├── package.json              # Root workspace package.json
├── .gitignore                # Root git ignore rules
├── AGENTS.md                 # Lovable project sync file
├── README.md                 # Setup and deployment instructions
└── API_DOCUMENTATION.md      # Detailed REST API endpoints spec
```

---

## Quick Start Development

### 1. Environment Setup

Open `server/.env` (or copy from `server/.env.example`) and configure backend parameters:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/meer_divine_art
JWT_SECRET=meer_divine_art_jwt_secret_key_2026_super_secure
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@meerdivineart.com
ADMIN_PASSWORD=AdminPassword123!
CLIENT_URL=http://localhost:5173
```

### 2. Install Dependencies

Install root, client, and server dependencies:
```bash
npm run install:all
```

### 3. Seed Database & Run Services

Seed admin credentials and sample catalog into MongoDB:
```bash
# Seed backend database
npm run seed-admin --prefix server
npm run seed-catalog --prefix server

# Run backend API server
npm run dev:server

# Run frontend React application (in another terminal, or concurrently)
npm run dev:client
```

---

## Single Admin Login Credentials

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@meerdivineart.com` (or value set in `ADMIN_EMAIL`)
- **Password**: `AdminPassword123!` (or value set in `ADMIN_PASSWORD`)

---

## Deployment Instructions

1. **MongoDB Atlas**: Create a free or dedicated cluster on MongoDB Atlas, copy connection string to `MONGODB_URI` in `server/.env`.
2. **Cloudinary**: Create a Cloudinary account, add credentials to `CLOUDINARY_*` environment variables.
3. **Deploy Server**: Deploy `server/` to Render, Railway, Vercel, or AWS Node environment.
4. **Deploy Frontend**: Deploy `client/` application to Vercel or Netlify setting `VITE_API_URL` to the deployed backend server URL.
