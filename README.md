# PetPals Management System - MERN Stack

A full-stack pet management system built with MongoDB, Express, React, and Node.js.

## Project Structure

```
mernpjt/
├── backend/          # Backend API (Node.js + Express + MongoDB)
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── .env          # Environment variables
│   └── server.js     # Express server
├── frontend/         # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   └── App.jsx      # Main app component
│   └── package.json
└── package.json      # Root package.json
```

## Prerequisites

- Node.js (v22.12+ recommended)
- MongoDB (running on localhost:27017)
- npm or yarn

## Installation

### Option 1: Quick Start (Recommended)
```bash
# Run the batch file
start-dev.bat
```

### Option 2: Manual Setup

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Start Backend Server**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5001

4. **Start Frontend Server** (in new terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

## Environment Variables

Backend `.env` file:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/mernpjt
NODE_ENV=development
```

## API Endpoints

### Pets
- GET `/api/pets` - Get all pets
- POST `/api/pets` - Create new pet
- DELETE `/api/pets/:id` - Delete pet

### Appointments
- GET `/api/appointments` - Get all appointments
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

### Medical History
- GET `/api/medical-history` - Get all records
- POST `/api/medical-history` - Create record
- DELETE `/api/medical-history/:id` - Delete record

## Features

- Pet registration and management
- Appointment scheduling
- Medical history tracking
- Dashboard with statistics
- Reports generation
- Search functionality
- Dark mode support

## Tech Stack

**Frontend:**
- React 19
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Database Connection

The application connects to MongoDB at `mongodb://localhost:27017/mernpjt`. Make sure MongoDB is running before starting the servers.

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running
2. **Port Already in Use**: Change ports in `.env` (backend) or `vite.config.js` (frontend)
3. **CORS Error**: Backend CORS is configured for `http://localhost:5173`
