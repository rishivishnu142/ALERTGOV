# Check AlertGov Services Health
$ports = @(
    @{ Name = 'Ollama Local AI Engine'; Port = 11434; Url = 'http://localhost:11434/' },
    @{ Name = 'Python FastAPI AI Service'; Port = 8000; Url = 'http://localhost:8000/' },
    @{ Name = 'Eureka Discovery Server'; Port = 8761; Url = 'http://localhost:8761/' },
    @{ Name = 'API Gateway'; Port = 8081; Url = 'http://localhost:8081/' },
    @{ Name = 'Auth Service'; Port = 8082; Url = 'http://localhost:8082/' },
    @{ Name = 'User Service'; Port = 8083; Url = 'http://localhost:8083/' },
    @{ Name = 'Incident Service'; Port = 8084; Url = 'http://localhost:8084/' },
    @{ Name = 'Alert Service'; Port = 8085; Url = 'http://localhost:8085/' },
    @{ Name = 'Approval Service'; Port = 8086; Url = 'http://localhost:8086/' },
    @{ Name = 'Notification Service'; Port = 8087; Url = 'http://localhost:8087/' },
    @{ Name = 'Analytics Service'; Port = 8088; Url = 'http://localhost:8088/' },
    @{ Name = 'AI Java Service'; Port = 8089; Url = 'http://localhost:8089/' },
    @{ Name = 'Frontend (Vite React)'; Port = 5173; Url = 'http://localhost:5173/' }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "              ALERT 4.0 SYSTEM HEALTH STATUS              " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

foreach ($p in $ports) {
    $portNum = $p.Port
    $name = $p.Name
    $url = $p.Url
    
    $conns = Get-NetTCPConnection -LocalPort $portNum -State Listen -ErrorAction SilentlyContinue
    if ($conns) {
        $statusStr = "TCP ONLINE"
        try {
            $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3 -ErrorAction SilentlyContinue
            if ($resp) {
                $statusStr = "HTTP " + $resp.StatusCode
            }
        } catch {
            if ($_.Exception.Response) {
                $statusStr = "HTTP " + [int]$_.Exception.Response.StatusCode
            }
        }
        Write-Host ("  [ONLINE]  Port {0,-5} | {1,-12} | {2}" -f $portNum, $statusStr, $name) -ForegroundColor Green
    } else {
        Write-Host ("  [OFFLINE] Port {0,-5} | {1,-12} | {2}" -f $portNum, "NO LISTENER", $name) -ForegroundColor Red
    }
}
Write-Host "==========================================================" -ForegroundColor Cyan
