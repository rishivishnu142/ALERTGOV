# AlertGov 4.0 - Startup Script for All Microservices, AI Service, and Frontend
$ErrorActionPreference = "Continue"

$JAVA_PATH = "C:\Program Files\Java\jdk-17\bin\java.exe"
$ROOT_DIR = "e:\My works IT\ALERT 4.0 GOVERNMENT"
$BACKEND_DIR = "$ROOT_DIR\alertgov-backend"
$AI_DIR = "$ROOT_DIR\alertgov-ai"
$FRONTEND_DIR = "$ROOT_DIR\alertgov-frontend"
$LOGS_DIR = "$ROOT_DIR\service-logs"

if (!(Test-Path $LOGS_DIR)) {
    New-Item -ItemType Directory -Path $LOGS_DIR -Force | Out-Null
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  ALERT 4.0 GOVERNMENT SYSTEM STARTUP" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# 1. Start Python AI Microservice (Port 8000)
Write-Host "[1/4] Starting AlertGov AI Service (FastAPI + Ollama on port 8000)..." -ForegroundColor Yellow
$aiPython = "$AI_DIR\venv\Scripts\python.exe"
Start-Process -FilePath $aiPython -ArgumentList @("-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000") -WorkingDirectory $AI_DIR -RedirectStandardOutput "$LOGS_DIR\ai-python.log" -RedirectStandardError "$LOGS_DIR\ai-python-err.log" -WindowStyle Hidden

# 2. Start Eureka Discovery Server (Port 8761)
Write-Host "[2/4] Starting Eureka Discovery Server (Port 8761)..." -ForegroundColor Yellow
$discoveryJar = "$BACKEND_DIR\discovery-server\target\discovery-server-1.0.0-SNAPSHOT.jar"
Start-Process -FilePath $JAVA_PATH -ArgumentList @("-Xms64m", "-Xmx256m", "-jar", $discoveryJar) -WorkingDirectory "$BACKEND_DIR\discovery-server" -RedirectStandardOutput "$LOGS_DIR\discovery-server.log" -RedirectStandardError "$LOGS_DIR\discovery-server-err.log" -WindowStyle Hidden

Write-Host "Waiting 10 seconds for Eureka Discovery Server to start..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# 3. Start Spring Boot Microservices
$services = @(
    @{ Name = "auth-service"; Port = 8082; Jar = "$BACKEND_DIR\auth-service\target\auth-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\auth-service" },
    @{ Name = "user-service"; Port = 8083; Jar = "$BACKEND_DIR\user-service\target\user-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\user-service" },
    @{ Name = "incident-service"; Port = 8084; Jar = "$BACKEND_DIR\incident-service\target\incident-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\incident-service" },
    @{ Name = "alert-service"; Port = 8085; Jar = "$BACKEND_DIR\alert-service\target\alert-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\alert-service" },
    @{ Name = "approval-service"; Port = 8086; Jar = "$BACKEND_DIR\approval-service\target\approval-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\approval-service" },
    @{ Name = "notification-service"; Port = 8087; Jar = "$BACKEND_DIR\notification-service\target\notification-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\notification-service" },
    @{ Name = "analytics-service"; Port = 8088; Jar = "$BACKEND_DIR\analytics-service\target\analytics-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\analytics-service" },
    @{ Name = "ai-service"; Port = 8089; Jar = "$BACKEND_DIR\ai-service\target\ai-service-1.0.0-SNAPSHOT.jar"; Dir = "$BACKEND_DIR\ai-service" }
)

Write-Host "[3/4] Starting Spring Boot Microservices..." -ForegroundColor Yellow
foreach ($svc in $services) {
    Write-Host "  -> Launching $($svc.Name) (Port $($svc.Port))..." -ForegroundColor Gray
    Start-Process -FilePath $JAVA_PATH -ArgumentList @("-Xms96m", "-Xmx320m", "-jar", $svc.Jar) -WorkingDirectory $svc.Dir -RedirectStandardOutput "$LOGS_DIR\$($svc.Name).log" -RedirectStandardError "$LOGS_DIR\$($svc.Name)-err.log" -WindowStyle Hidden
}

Write-Host "Waiting 8 seconds before starting API Gateway..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# Start API Gateway (Port 8081)
Write-Host "  -> Launching api-gateway (Port 8081)..." -ForegroundColor Gray
$gatewayJar = "$BACKEND_DIR\api-gateway\target\api-gateway-1.0.0-SNAPSHOT.jar"
Start-Process -FilePath $JAVA_PATH -ArgumentList @("-Xms64m", "-Xmx256m", "-jar", $gatewayJar) -WorkingDirectory "$BACKEND_DIR\api-gateway" -RedirectStandardOutput "$LOGS_DIR\api-gateway.log" -RedirectStandardError "$LOGS_DIR\api-gateway-err.log" -WindowStyle Hidden

# 4. Start Frontend (Port 5173)
Write-Host "[4/4] Starting Frontend Vite Dev Server (Port 5173)..." -ForegroundColor Yellow
Start-Process -FilePath "npx.cmd" -ArgumentList @("vite", "--host", "0.0.0.0", "--port", "5173") -WorkingDirectory $FRONTEND_DIR -RedirectStandardOutput "$LOGS_DIR\frontend.log" -RedirectStandardError "$LOGS_DIR\frontend-err.log" -WindowStyle Hidden

Write-Host "`nAll processes initiated. Checking health of ports in 15 seconds..." -ForegroundColor Cyan
Start-Sleep -Seconds 15

$checkPorts = @(
    @{ Name = "Ollama Local AI Engine"; Port = 11434 },
    @{ Name = "Python FastAPI AI Service"; Port = 8000 },
    @{ Name = "Eureka Discovery Server"; Port = 8761 },
    @{ Name = "API Gateway"; Port = 8081 },
    @{ Name = "Auth Service"; Port = 8082 },
    @{ Name = "User Service"; Port = 8083 },
    @{ Name = "Incident Service"; Port = 8084 },
    @{ Name = "Alert Service"; Port = 8085 },
    @{ Name = "Approval Service"; Port = 8086 },
    @{ Name = "Notification Service"; Port = 8087 },
    @{ Name = "Analytics Service"; Port = 8088 },
    @{ Name = "AI Java Service"; Port = 8089 },
    @{ Name = "Frontend (Vite React)"; Port = 5173 }
)

Write-Host "`n=== PORT HEALTH STATUS ===" -ForegroundColor Cyan
foreach ($cp in $checkPorts) {
    $c = Get-NetTCPConnection -LocalPort $cp.Port -State Listen -ErrorAction SilentlyContinue
    if ($c) {
        Write-Host " [ONLINE] $($cp.Name) (Port $($cp.Port))" -ForegroundColor Green
    } else {
        Write-Host " [STARTING/OFFLINE] $($cp.Name) (Port $($cp.Port))" -ForegroundColor Yellow
    }
}
Write-Host "==========================" -ForegroundColor Cyan

