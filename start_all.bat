@echo off
echo =========================================
echo Starting Backend and Frontend Servers
echo =========================================

:: Start backend (Laravel) in a new console window
start "Backend" cmd /k "cd backend && call start.bat"

:: Start frontend (React) in a new console window
start "Frontend" cmd /k "cd frontend && call start.bat"

