@echo off
echo ==============================================
echo   STARTING REAL ESTATE CRM 
echo ==============================================

:: Ensure Node.js is in PATH for this session just in case
set PATH=%PATH%;C:\Program Files\nodejs

echo [1/2] Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo [2/2] Starting Frontend Server (Vite) on port 5173...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo Servers are launching in separate windows!
echo Once the Frontend terminal says "ready", the browser will open automatically.
timeout /t 5 /nobreak
start http://localhost:5173/


pause
