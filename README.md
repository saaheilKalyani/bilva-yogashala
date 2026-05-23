# Bilva Yogashala

Full-stack yoga management website built with the MERN stack and glassmorphism design.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Mongoose
- **Auth**: JWT + bcryptjs
- **DB**: MongoDB

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

### Server
```bash
cd server
cp .env.example .env   # fill in your values
npm install
node seed.js           # seed DB with demo data
npm run dev
```

### Client
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App runs at http://localhost:5173 — API at http://localhost:5000

## Demo Credentials
| Role  | Email                | Password  |
|-------|----------------------|-----------|
| Admin | admin@bilva.com      | Admin@123 |
| User  | student@bilva.com    | User@123  |

## Branches
- Andheri West
- Goregaon West
- Thane West
