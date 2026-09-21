const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

const ROOT = 'e:\\My works IT\\ALERT 4.0 GOVERNMENT';
const LOGS_DIR = path.join(ROOT, 'service-logs');
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const JAVA = '"C:\\Program Files\\Java\\jdk-17\\bin\\java.exe"';
const PYTHON = `"${path.join(ROOT, 'alertgov-ai', 'venv', 'Scripts', 'python.exe')}"`;

function startService(name, cmd, args, cwd) {
  const logFile = path.join(LOGS_DIR, `${name}.log`);
  const out = fs.openSync(logFile, 'a');
  console.log(`[STARTING] ${name}...`);
  const child = spawn(cmd, args, {
    cwd,
    stdio: ['ignore', out, out],
    detached: true,
    windowsHide: true,
    shell: true
  });
  child.unref();
  return child;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkPort(port, host = '127.0.0.1') {
  return new Promise(resolve => {
    const socket = new net.Socket();
    socket.setTimeout(1500);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function waitForPort(port, name, maxRetries = 25) {
  process.stdout.write(`Waiting for ${name} on port ${port}...`);
  for (let i = 0; i < maxRetries; i++) {
    const isUp = await checkPort(port);
    if (isUp) {
      console.log(` [READY]`);
      return true;
    }
    await wait(1500);
    process.stdout.write('.');
  }
  console.log(` [TIMEOUT]`);
  return false;
}

async function main() {
  console.log('========================================================');
  console.log('       ALERT 4.0 GOVERNMENT - SYSTEM LAUNCHER           ');
  console.log('========================================================');

  // 1. Python AI Service
  startService('alertgov-ai', PYTHON, ['-m', 'uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], path.join(ROOT, 'alertgov-ai'));

  // 2. Discovery Server
  const discoveryJar = `"${path.join(ROOT, 'alertgov-backend', 'discovery-server', 'target', 'discovery-server-1.0.0-SNAPSHOT.jar')}"`;
  startService('discovery-server', JAVA, [
    '-Xms64m', '-Xmx256m', '-jar', discoveryJar
  ], path.join(ROOT, 'alertgov-backend', 'discovery-server'));

  await waitForPort(8761, 'Eureka Discovery Server', 25);

  // 3. Spring Boot Microservices
  const services = [
    { name: 'auth-service', port: 8082 },
    { name: 'user-service', port: 8083 },
    { name: 'incident-service', port: 8084 },
    { name: 'alert-service', port: 8085 },
    { name: 'approval-service', port: 8086 },
    { name: 'notification-service', port: 8087 },
    { name: 'analytics-service', port: 8088 },
    { name: 'ai-service', port: 8089 },
  ];

  for (const svc of services) {
    const jarPath = `"${path.join(ROOT, 'alertgov-backend', svc.name, 'target', `${svc.name}-1.0.0-SNAPSHOT.jar`)}"`;
    startService(svc.name, JAVA, [
      '-Xms96m', '-Xmx320m', '-jar', jarPath
    ], path.join(ROOT, 'alertgov-backend', svc.name));
  }

  // 4. API Gateway
  const gatewayJar = `"${path.join(ROOT, 'alertgov-backend', 'api-gateway', 'target', 'api-gateway-1.0.0-SNAPSHOT.jar')}"`;
  startService('api-gateway', JAVA, [
    '-Xms64m', '-Xmx256m', '-jar', gatewayJar
  ], path.join(ROOT, 'alertgov-backend', 'api-gateway'));

  // 5. Frontend
  startService('frontend', 'npx.cmd', ['vite', '--host', '0.0.0.0', '--port', '5173'], path.join(ROOT, 'alertgov-frontend'));

  console.log('\nWaiting 20 seconds for microservices initialization...');
  await wait(20000);

  const allServices = [
    { name: 'Ollama Engine', port: 11434 },
    { name: 'Python FastAPI AI', port: 8000 },
    { name: 'Eureka Discovery', port: 8761 },
    { name: 'API Gateway', port: 8081 },
    { name: 'Auth Service', port: 8082 },
    { name: 'User Service', port: 8083 },
    { name: 'Incident Service', port: 8084 },
    { name: 'Alert Service', port: 8085 },
    { name: 'Approval Service', port: 8086 },
    { name: 'Notification Service', port: 8087 },
    { name: 'Analytics Service', port: 8088 },
    { name: 'AI Java Service', port: 8089 },
    { name: 'Frontend (Vite)', port: 5173 }
  ];

  console.log('\n================ STATUS AUDIT ================');
  for (const s of allServices) {
    const up = await checkPort(s.port);
    console.log(`  ${up ? '✔ [ONLINE]' : '❌ [STARTING/OFFLINE]'} Port ${String(s.port).padEnd(6)} : ${s.name}`);
  }
  console.log('==============================================\n');

  console.log('Daemon monitoring active. Press Ctrl+C or stop-services to terminate.');
  while (true) {
    await wait(60000);
  }
}

main().catch(console.error);
