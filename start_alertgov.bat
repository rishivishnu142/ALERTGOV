@echo off
setlocal enabledelayedexpansion

echo ====================================================
echo         STARTING ALERT 4.0 GOVERNMENT SYSTEM        
echo ====================================================

set JAVA_EXE="C:\Program Files\Java\jdk-17\bin\java.exe"
set ROOT_DIR=e:\My works IT\ALERT 4.0 GOVERNMENT
set BACKEND=%ROOT_DIR%\alertgov-backend
set AI_DIR=%ROOT_DIR%\alertgov-ai
set FRONTEND=%ROOT_DIR%\alertgov-frontend
set LOGS=%ROOT_DIR%\service-logs

if not exist "%LOGS%" mkdir "%LOGS%"

echo [1/4] Starting Python FastAPI AI Service (Port 8000)...
start "alertgov-ai" /b "%AI_DIR%\venv\Scripts\python.exe" -m uvicorn main:app --host 0.0.0.0 --port 8000 > "%LOGS%\ai-python.log" 2>&1

echo [2/4] Starting Eureka Discovery Server (Port 8761)...
start "discovery-server" /b %JAVA_EXE% -Xms64m -Xmx256m -jar "%BACKEND%\discovery-server\target\discovery-server-1.0.0-SNAPSHOT.jar" > "%LOGS%\discovery-server.log" 2>&1

echo Waiting 10 seconds for Eureka Discovery Server...
timeout /t 10 /nobreak >nul

echo [3/4] Starting Spring Boot Microservices...

echo   - auth-service (Port 8082)...
start "auth-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\auth-service\target\auth-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\auth-service.log" 2>&1

echo   - user-service (Port 8083)...
start "user-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\user-service\target\user-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\user-service.log" 2>&1

echo   - incident-service (Port 8084)...
start "incident-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\incident-service\target\incident-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\incident-service.log" 2>&1

echo   - alert-service (Port 8085)...
start "alert-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\alert-service\target\alert-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\alert-service.log" 2>&1

echo   - approval-service (Port 8086)...
start "approval-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\approval-service\target\approval-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\approval-service.log" 2>&1

echo   - notification-service (Port 8087)...
start "notification-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\notification-service\target\notification-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\notification-service.log" 2>&1

echo   - analytics-service (Port 8088)...
start "analytics-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\analytics-service\target\analytics-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\analytics-service.log" 2>&1

echo   - ai-service (Port 8089)...
start "ai-service" /b %JAVA_EXE% -Xms96m -Xmx320m -jar "%BACKEND%\ai-service\target\ai-service-1.0.0-SNAPSHOT.jar" > "%LOGS%\ai-service.log" 2>&1

echo Waiting 8 seconds before launching API Gateway...
timeout /t 8 /nobreak >nul

echo   - api-gateway (Port 8081)...
start "api-gateway" /b %JAVA_EXE% -Xms64m -Xmx256m -jar "%BACKEND%\api-gateway\target\api-gateway-1.0.0-SNAPSHOT.jar" > "%LOGS%\api-gateway.log" 2>&1

echo [4/4] Starting Frontend Vite (Port 5173)...
cd /d "%FRONTEND%"
start "frontend" /b npx.cmd vite --host 0.0.0.0 --port 5173 > "%LOGS%\frontend.log" 2>&1

echo.
echo All AlertGov components have been started!
