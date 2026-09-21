# AlertGov 4.0 - Daemon Runner for all services
$ErrorActionPreference = "Continue"

$JAVA = "C:\Program Files\Java\jdk-17\bin\java.exe"
$ROOT = "e:\My works IT\ALERT 4.0 GOVERNMENT"
$AI_PY = "$ROOT\alertgov-ai\venv\Scripts\python.exe"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "     ALERT 4.0 GOVERNMENT - FULL CLUSTER DAEMON           " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Start Python AI
Write-Host "[1/4] Starting FastAPI Python AI Service..." -ForegroundColor Yellow
$pAI = Start-Process -FilePath $AI_PY -ArgumentList @("-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000") -WorkingDirectory "$ROOT\alertgov-ai" -PassThru

# 2. Start Discovery Server
Write-Host "[2/4] Starting Eureka Discovery Server (Port 8761)..." -ForegroundColor Yellow
$pEureka = Start-Process -FilePath $JAVA -ArgumentList @("-Xms64m", "-Xmx256m", "-jar", "$ROOT\alertgov-backend\discovery-server\target\discovery-server-1.0.0-SNAPSHOT.jar") -WorkingDirectory "$ROOT\alertgov-backend\discovery-server" -PassThru

# Wait for Eureka to be up
Write-Host "Waiting 12 seconds for Eureka..." -ForegroundColor Gray
Start-Sleep -Seconds 12

# 3. Start Microservices
$services = @(
    @{ Name = "auth-service"; Port = 8082; Jar = "$ROOT\alertgov-backend\auth-service\target\auth-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\auth-service" },
    @{ Name = "user-service"; Port = 8083; Jar = "$ROOT\alertgov-backend\user-service\target\user-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\user-service" },
    @{ Name = "incident-service"; Port = 8084; Jar = "$ROOT\alertgov-backend\incident-service\target\incident-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\incident-service" },
    @{ Name = "alert-service"; Port = 8085; Jar = "$ROOT\alertgov-backend\alert-service\target\alert-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\alert-service" },
    @{ Name = "approval-service"; Port = 8086; Jar = "$ROOT\alertgov-backend\approval-service\target\approval-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\approval-service" },
    @{ Name = "notification-service"; Port = 8087; Jar = "$ROOT\alertgov-backend\notification-service\target\notification-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\notification-service" },
    @{ Name = "analytics-service"; Port = 8088; Jar = "$ROOT\alertgov-backend\analytics-service\target\analytics-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\analytics-service" },
    @{ Name = "ai-service"; Port = 8089; Jar = "$ROOT\alertgov-backend\ai-service\target\ai-service-1.0.0-SNAPSHOT.jar"; Dir = "$ROOT\alertgov-backend\ai-service" }
)

$procs = @($pAI, $pEureka)

Write-Host "[3/4] Starting Microservices..." -ForegroundColor Yellow
foreach ($s in $services) {
    Write-Host "  -> Starting $($s.Name)..." -ForegroundColor Gray
    $p = Start-Process -FilePath $JAVA -ArgumentList @("-Xms96m", "-Xmx320m", "-jar", $s.Jar) -WorkingDirectory $s.Dir -PassThru
    $procs += $p
}

# Start API Gateway
Write-Host "  -> Starting api-gateway (Port 8081)..." -ForegroundColor Gray
$pGateway = Start-Process -FilePath $JAVA -ArgumentList @("-Xms64m", "-Xmx256m", "-jar", "$ROOT\alertgov-backend\api-gateway\target\api-gateway-1.0.0-SNAPSHOT.jar") -WorkingDirectory "$ROOT\alertgov-backend\api-gateway" -PassThru
$procs += $pGateway

# 4. Start Frontend
Write-Host "[4/4] Starting Frontend Vite (Port 5173)..." -ForegroundColor Yellow
$pFrontend = Start-Process -FilePath "npx.cmd" -ArgumentList @("vite", "--host", "0.0.0.0", "--port", "5173") -WorkingDirectory "$ROOT\alertgov-frontend" -PassThru
$procs += $pFrontend

Write-Host "`nAll AlertGov components launched! Daemon is monitoring processes..." -ForegroundColor Green

# Monitor loop keeping the script running indefinitely
while ($true) {
    Start-Sleep -Seconds 30
}
