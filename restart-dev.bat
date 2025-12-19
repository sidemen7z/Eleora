@echo off
echo ========================================
echo   Eleora React App - Quick Restart
echo ========================================
echo.

echo [1/3] Stopping any running servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/3] Clearing cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo Cache cleared!
) else (
    echo No cache to clear.
)

echo [3/3] Starting development server...
echo.
echo ========================================
echo   Server starting...
echo   Browser will open automatically
echo   Press Ctrl+C to stop the server
echo ========================================
echo.

npm start
