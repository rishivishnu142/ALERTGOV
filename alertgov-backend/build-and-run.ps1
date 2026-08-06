$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"

# Build all 11 Spring Boot microservices locally first
Write-Host "Building microservices using Maven... This might take a few minutes." -ForegroundColor Cyan
./mvnw clean package -DskipTests

# Check if the build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Maven build failed! Please check the errors above." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Build successful! Packaging into Docker images and starting the cluster..." -ForegroundColor Green

# Spin up Docker Compose
docker-compose up -d --build

Write-Host "Docker containers are spinning up! Check your Docker Desktop dashboard to monitor the status." -ForegroundColor Yellow
Write-Host "You can access the Eureka dashboard at http://localhost:8761 to verify they are connected." -ForegroundColor Yellow
