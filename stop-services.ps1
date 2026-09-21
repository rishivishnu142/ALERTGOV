# AlertGov 4.0 - Stop Script for All Running Services
Write-Host "Stopping AlertGov Services..." -ForegroundColor Yellow

$ports = @(8000, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088, 8089, 8761, 5173)
foreach ($p in $ports) {
    $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($conns) {
        foreach ($c in $conns) {
            $procId = $c.OwningProcess
            if ($procId -gt 0) {
                Write-Host "Stopping process PID $procId on port $p..." -ForegroundColor Gray
                Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
            }
        }
    }
}
Write-Host "All AlertGov services stopped." -ForegroundColor Green
