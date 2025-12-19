@echo off
cd backend
start "Backend" cmd /k "npm start"
cd ..
start "Frontend" cmd /k "npm run dev"