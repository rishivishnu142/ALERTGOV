const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @page {
    size: A4;
    margin: 20mm 15mm 20mm 15mm;
    @top-right {
      content: "SRS | ALERT 4.0 GOVERNMENT | Full Stack Java (AI-Integrated)";
      font-size: 8pt;
      color: #64748b;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    @bottom-center {
      content: "Page " counter(page) " | Confidential — For Training Use Only | Karpagam College of Engineering";
      font-size: 8pt;
      color: #64748b;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  }

  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    font-size: 9.5pt;
    background: #ffffff;
    margin: 0;
    padding: 0;
  }

  .header-rule {
    border-bottom: 2px solid #0284c7;
    margin-bottom: 12px;
    padding-bottom: 4px;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: #64748b;
  }

  .page-footer {
    border-top: 1px solid #cbd5e1;
    margin-top: 20px;
    padding-top: 6px;
    font-size: 8pt;
    color: #64748b;
    text-align: center;
  }

  .page-break {
    page-break-before: always;
    break-before: page;
  }

  h1.doc-title {
    font-size: 20pt;
    font-weight: 800;
    color: #1e3a8a;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 20px;
    margin-bottom: 8px;
  }

  .doc-subtitle {
    font-size: 12pt;
    font-weight: 600;
    color: #0369a1;
    text-align: center;
    margin-bottom: 20px;
  }

  .section-header {
    background: #1e3a8a;
    color: #ffffff;
    padding: 6px 12px;
    font-size: 11pt;
    font-weight: 700;
    border-radius: 4px;
    margin-top: 16px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 11pt;
    font-weight: 700;
    color: #1e3a8a;
    border-bottom: 1.5px solid #0284c7;
    padding-bottom: 3px;
    margin-top: 14px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 10pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 10px;
    margin-bottom: 4px;
  }

  p {
    margin-top: 0;
    margin-bottom: 8px;
    text-align: justify;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 8px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 3px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
    margin-bottom: 12px;
    font-size: 8.5pt;
  }

  th, td {
    border: 1px solid #cbd5e1;
    padding: 5px 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #1e3a8a;
    color: #ffffff;
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  .table-highlight th {
    background: #0284c7;
  }

  .meta-table th {
    background: #1e3a8a;
    color: #ffffff;
    width: 25%;
  }

  .meta-table td {
    background: #f1f5f9;
  }

  .badge {
    display: inline-block;
    padding: 1px 6px;
    font-size: 7.5pt;
    font-weight: 700;
    border-radius: 3px;
  }
  .badge-blue { background: #e0f2fe; color: #0369a1; }
  .badge-green { background: #dcfce7; color: #15803d; }
  .badge-red { background: #fee2e2; color: #b91c1c; }
  .badge-orange { background: #ffedd5; color: #c2410c; }

  .notice-box {
    background: #fef9c3;
    border-left: 4px solid #ca8a04;
    padding: 6px 10px;
    font-size: 8.5pt;
    margin-bottom: 10px;
    color: #854d0e;
  }

  .code-block {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px 8px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 8pt;
    color: #0f172a;
    white-space: pre-wrap;
    margin-bottom: 8px;
  }

  .arch-box {
    border: 1.5px solid #0284c7;
    background: #f0f9ff;
    padding: 8px 12px;
    border-radius: 6px;
    text-align: center;
    font-weight: 700;
    font-size: 9pt;
    margin: 4px 0;
    color: #0369a1;
  }

  .arch-arrow {
    text-align: center;
    color: #0284c7;
    font-size: 10pt;
    font-weight: 900;
    margin: 2px 0;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER PAGE -->
<div class="header-rule">
  <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
  <span>Full Stack Java (AI-Integrated) Training Programme</span>
</div>

<h1 class="doc-title">SYSTEM REQUIREMENTS SPECIFICATION</h1>
<div class="doc-subtitle">Full Stack Java (AI-Integrated) Training Programme</div>

<table class="meta-table" style="margin-top: 25px;">
  <tr>
    <th>Project Title</th>
    <td><strong>ALERT 4.0 GOVERNMENT: AI-Integrated Multi-Tier Disaster Management & Emergency Instruction System</strong></td>
  </tr>
  <tr>
    <th>SIH Problem Statement ID</th>
    <td><strong>SIH25_097</strong></td>
  </tr>
  <tr>
    <th>Ministry / Organisation</th>
    <td><strong>Ministry of Home Affairs / Tamil Nadu Disaster Management Authority (TNDMA) / Governance</strong></td>
  </tr>
  <tr>
    <th>Domain Category</th>
    <td><strong>Disaster Communication / Governance & Smart Emergency Response</strong></td>
  </tr>
  <tr>
    <th>Team Name</th>
    <td><strong>Cognitive Crew</strong></td>
  </tr>
  <tr>
    <th>Team Members</th>
    <td>
      1. <strong>Farah Hamna M</strong><br>
      2. <strong>Rishikesh V</strong><br>
      3. <strong>Shruthin K</strong>
    </td>
  </tr>
  <tr>
    <th>Institution</th>
    <td><strong>Karpagam College of Engineering</strong></td>
  </tr>
  <tr>
    <th>Project Type</th>
    <td><strong>Software only (Multi-Service Distributed Cloud Web Platform)</strong></td>
  </tr>
  <tr>
    <th>Version</th>
    <td><strong>v2.0 (Final Implemented Version)</strong></td>
  </tr>
  <tr>
    <th>Date</th>
    <td><strong>20.09.2026</strong></td>
  </tr>
  <tr>
    <th>Faculty Mentors</th>
    <td><strong>Dr. Arul Antran Vijay S / Dr. Jothi Prakash V / Mr. Jegathesh P / Mr. Navaneetha Krishnan M / Dr. Castro S.</strong></td>
  </tr>
</table>

<div class="notice-box" style="margin-top: 30px;">
  <strong>Document Status:</strong> This SRS document outlines the finalized requirements and system specifications for ALERT 4.0 GOVERNMENT post-implementation. Reviewed at Internal Review (Day 22) and final industry evaluation.
</div>

<!-- PAGE 2: DOCUMENT REVISION HISTORY -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>Document Revision History</span>
</div>

<div class="section-header">DOCUMENT REVISION HISTORY</div>

<table>
  <thead>
    <tr>
      <th style="width: 12%;">Version</th>
      <th style="width: 16%;">Date</th>
      <th style="width: 16%;">Author</th>
      <th>Description of Changes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>v1.0</strong></td>
      <td>10.06.2026</td>
      <td>Cognitive Crew</td>
      <td>Initial draft — SRS requirements skeleton and preliminary problem statement breakdown completed.</td>
    </tr>
    <tr>
      <td><strong>v1.1</strong></td>
      <td>15.07.2026</td>
      <td>Cognitive Crew</td>
      <td>Internal Review feedback incorporated — Architecture expanded to 11 Spring Boot microservices, Oracle Database XE relational schema, MongoDB multimedia storage, and Spring Cloud Gateway configuration.</td>
    </tr>
    <tr>
      <td><strong>v2.0</strong></td>
      <td>20.09.2026</td>
      <td>Cognitive Crew</td>
      <td><strong>Final Implemented Version:</strong> Integrated bilingual React 19 Frontend with GIS interactive maps, Ollama (Llama 3) local AI inference microservice, Open-Meteo weather API with Resilience4j circuit breakers, end-to-end multi-tier incident verification pipeline (Village &rarr; Taluk &rarr; District &rarr; Collector &rarr; State), and dynamic analytics reporting.</td>
    </tr>
  </tbody>
</table>

<!-- SECTION 1: INTRODUCTION -->
<div class="section-header" style="margin-top: 25px;">1. INTRODUCTION</div>

<h2>1.1 Purpose</h2>
<p>
This System Requirements Specification (SRS) document details the functional and non-functional requirements for the <strong>ALERT 4.0 GOVERNMENT (AlertGov AI)</strong> platform, developed for Smart India Hackathon 2025 under Problem Statement <strong>[SIH25_097]</strong>. The document serves as the complete technical baseline and specification for developers, evaluators, faculty mentors, and disaster management stakeholders. It covers the full architectural design, data schemas, API contracts, AI pipelines, and operational protocols of the system.
</p>

<h2>1.2 Scope</h2>
<p><strong>System Name:</strong> ALERT 4.0 GOVERNMENT (AlertGov AI)</p>
<p><strong>What the system does:</strong></p>
<p>
ALERT 4.0 GOVERNMENT is an intelligent, multi-tier disaster management and emergency instruction system purpose-built for the Tamil Nadu Disaster Management Authority (TNDMA). It replaces fragmented manual reporting with a unified 5-tier operational hierarchy:
</p>
<ul>
  <li><strong>Village EOC (VEO):</strong> Field officers report ground-level incidents with exact GPS coordinates, severity classification, and photographic media evidence.</li>
  <li><strong>Taluk Command Center (Tahsildar):</strong> Provides a priority verification queue where reported emergencies are reviewed, augmented with AI risk assessments, and forwarded to the District EOC, rejected as false alarms, or escalated immediately to the Collector.</li>
  <li><strong>District EOC (DEC):</strong> Monitors live district-wide GIS maps, coordinates emergency response units, dispatches bilingual broadcasts, and tracks resolution progress.</li>
  <li><strong>District Collector:</strong> Reviews critical escalations, authorizes district-wide emergency broadcasts, and monitors AI daily situational briefs.</li>
  <li><strong>State Command Center (SDMA):</strong> Maintains state-wide visibility over all 38 districts of Tamil Nadu, allocates state emergency resources (fire brigades, NDRF, medical units), and issues statewide alerts.</li>
  <li><strong>AI Intelligence Layer:</strong> Leverages a Python FastAPI microservice integrated with local LLMs (Ollama Llama 3) to deliver automated risk severity evaluation, spam/duplicate checks, and bilingual (English & Tamil) emergency recommendations. It incorporates Open-Meteo meteorological data with Resilience4j circuit breakers to provide real-time weather advisories.</li>
</ul>

<h2>1.3 Definitions, Acronyms & Abbreviations</h2>
<table>
  <thead>
    <tr>
      <th style="width: 20%;">Term / Acronym</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>SRS</strong></td><td>System Requirements Specification — this document</td></tr>
    <tr><td><strong>SIH</strong></td><td>Smart India Hackathon 2025</td></tr>
    <tr><td><strong>TNDMA / NDMA</strong></td><td>Tamil Nadu Disaster Management Authority / National Disaster Management Authority</td></tr>
    <tr><td><strong>VEO / DEC / SDMA</strong></td><td>Village Emergency Operations / District EOC / State Disaster Management Authority</td></tr>
    <tr><td><strong>API / REST</strong></td><td>Application Programming Interface / Representational State Transfer over HTTP</td></tr>
    <tr><td><strong>JWT</strong></td><td>JSON Web Token — Used for stateless authentication and Role-Based Access Control (RBAC)</td></tr>
    <tr><td><strong>AI / LLM</strong></td><td>Artificial Intelligence / Large Language Model (Ollama Llama 3 for local bilingual reasoning)</td></tr>
    <tr><td><strong>CRUD</strong></td><td>Create, Read, Update, Delete — Fundamental data operations across persistence layers</td></tr>
    <tr><td><strong>Eureka</strong></td><td>Netflix Eureka Discovery Server for microservice registration and dynamic routing</td></tr>
    <tr><td><strong>FastAPI</strong></td><td>High-performance Python framework serving AI inference endpoints on port 8000</td></tr>
    <tr><td><strong>GIS</strong></td><td>Geographic Information System — Leaflet.js interactive maps with custom marker layers</td></tr>
    <tr><td><strong>Resilience4j</strong></td><td>Fault tolerance library providing CircuitBreaker & TimeLimiter for external weather services</td></tr>
    <tr><td><strong>Oracle XE / MongoDB</strong></td><td>Oracle Database XE 11g/21c (Relational) + MongoDB Atlas/GridFS (Multimedia & Attachments)</td></tr>
  </tbody>
</table>

<!-- PAGE 3: REFERENCES & DOCUMENT OVERVIEW -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>References & Document Overview</span>
</div>

<h2>1.4 References</h2>
<ul>
  <li>IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications</li>
  <li>Smart India Hackathon 2025 Problem Statement — [SIH25_097]: AI-Based Local Language Emergency Instruction Generator</li>
  <li>Spring Boot 3.2.4 & Spring Cloud 2023.0.1 Reference Documentation: <a href="https://docs.spring.io/spring-boot/">https://docs.spring.io/spring-boot/</a></li>
  <li>React 19 & Vite 8 Documentation: <a href="https://react.dev/">https://react.dev/</a></li>
  <li>FastAPI Python Framework: <a href="https://fastapi.tiangolo.com/">https://fastapi.tiangolo.com/</a></li>
  <li>Ollama Local LLM Architecture: <a href="https://ollama.ai/">https://ollama.ai/</a></li>
  <li>Tamil Nadu Disaster Management Authority (TNDMA) Standard Operating Procedures: <a href="https://tndma.tn.gov.in/">https://tndma.tn.gov.in/</a></li>
  <li>National Disaster Management Authority (NDMA) Guidelines: <a href="https://ndma.gov.in/">https://ndma.gov.in/</a></li>
</ul>

<h2>1.5 Document Overview</h2>
<p>
This document is organized into 14 distinct sections:
<strong>Section 2</strong> provides an overall product perspective, user personas, and operating constraints.
<strong>Section 3</strong> defines the 5-layer system architecture, 11 Spring Boot microservices, technology stack, and end-to-end data flow.
<strong>Section 4</strong> specifies user, software, and communication interfaces.
<strong>Section 5</strong> details complete functional requirements in Use Case table format across all microservices.
<strong>Section 6</strong> defines the AI/ML module specifications for LLM disaster analysis and meteorological circuit breakers.
<strong>Section 7</strong> specifies measurable Non-Functional Requirements (Performance, Security, Usability).
<strong>Section 8</strong> documents the dual-database design (Oracle XE relational schemas + MongoDB document structures).
<strong>Section 9</strong> provides the API design overview and endpoints catalog.
<strong>Section 10</strong> covers DevOps and Docker container deployment configurations.
<strong>Section 11</strong> presents the 8-week milestone execution timeline.
<strong>Section 12</strong> assigns team roles and responsibilities.
<strong>Section 13</strong> details the risk register and mitigations.
<strong>Section 14</strong> contains appendix items including domain glossaries and sample API payloads.
</p>

<!-- SECTION 2: OVERALL DESCRIPTION -->
<div class="section-header">2. OVERALL DESCRIPTION</div>

<h2>2.1 Product Perspective</h2>
<p>
ALERT 4.0 GOVERNMENT is an enterprise-grade, microservice-based disaster response and local language emergency instruction system. It addresses SIH Problem Statement <strong>SIH25_097</strong> by eliminating the critical communication bottleneck between ground-level disaster observers, administrative approval authorities, and the general public.
</p>
<p>
Rather than relying on generic bulk messages, ALERT 4.0 provides a structured, multi-tier operational pipeline:
</p>
<ul>
  <li><strong>Field-to-State Integration:</strong> Interlinks Village EOCs, Taluk Tahsildars, District EOCs, District Collectors, and the State Command Center through unified REST endpoints governed by Spring Cloud Gateway and Eureka Service Discovery.</li>
  <li><strong>Automated AI Incident Analysis:</strong> Analyzes raw disaster reports using local LLMs (Ollama Llama 3) to compute severity scores, generate formal administrative summaries, and produce actionable recommendations in English and Tamil (தமிழ்).</li>
  <li><strong>Live Weather Threat Monitoring:</strong> Incorporates live meteorological telemetry (temperature, precipitation, wind speed) from Open-Meteo with Resilience4j circuit breakers to automatically raise heat wave, heavy rainfall, or cyclone alerts.</li>
  <li><strong>Targeted Dissemination & Broadcast Approvals:</strong> Ensures that public emergency warnings undergo appropriate administrative scrutiny (Collector approval for high-risk zones) before broadcasting via SMS, WhatsApp, and in-app feeds.</li>
</ul>

<h2>2.2 Product Functions — Feature Summary</h2>
<table>
  <thead>
    <tr>
      <th style="width: 6%;">#</th>
      <th style="width: 25%;">Feature Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1</strong></td>
      <td><strong>Village Field Incident Reporting</strong></td>
      <td>Allows VEO officers to submit disaster incidents with title, category (Flood, Fire, Medical, etc.), severity, GPS location, and photo evidence.</td>
    </tr>
    <tr>
      <td><strong>2</strong></td>
      <td><strong>AI Risk & Severity Evaluation</strong></td>
      <td>Invokes Ollama LLM to analyze disaster text, detect spam/duplicates, assign formal severity, and generate bilingual Tamil/English response advice.</td>
    </tr>
    <tr>
      <td><strong>3</strong></td>
      <td><strong>Taluk Verification Queue</strong></td>
      <td>Enables Tahsildars to review incoming village incidents, verify evidence, inspect AI recommendations, and forward to District or escalate to Collector.</td>
    </tr>
    <tr>
      <td><strong>4</strong></td>
      <td><strong>District Interactive GIS Mapping</strong></td>
      <td>Displays real-time Leaflet.js map with incident coordinates, affected radius, emergency shelters, schools, and hospitals across the district.</td>
    </tr>
    <tr>
      <td><strong>5</strong></td>
      <td><strong>Emergency Broadcast Workflow</strong></td>
      <td>Enables District EOC to draft targeted emergency alerts and submit them for multi-level administrative approval before dispatch.</td>
    </tr>
    <tr>
      <td><strong>6</strong></td>
      <td><strong>District Collector Approval Hub</strong></td>
      <td>Provides Collectors with executive approval controls to authorize, modify, or reject high-impact disaster broadcasts and resource deployments.</td>
    </tr>
    <tr>
      <td><strong>7</strong></td>
      <td><strong>Live Weather Advisory Engine</strong></td>
      <td>Integrates Open-Meteo API with Resilience4j circuit breakers to monitor precipitation, temperature, and wind speed for automated weather warnings.</td>
    </tr>
    <tr>
      <td><strong>8</strong></td>
      <td><strong>Bilingual Localization (EN & TA)</strong></td>
      <td>Full native dual-language support (English and Tamil தமிழ்) across all dashboards, forms, alert messages, and exported reports.</td>
    </tr>
    <tr>
      <td><strong>9</strong></td>
      <td><strong>State 38-District Command Center</strong></td>
      <td>Provides State SDMA officers with state-wide situational awareness, district status matrices, aggregate incident KPIs, and state emergency advisories.</td>
    </tr>
    <tr>
      <td><strong>10</strong></td>
      <td><strong>State Resource Management</strong></td>
      <td>Tracks and deploys critical emergency resources (Fire Trucks, Police Units, Rescue Boats, Medical Ambulances) across affected districts.</td>
    </tr>
    <tr>
      <td><strong>11</strong></td>
      <td><strong>Real-Time Analytics & Charts</strong></td>
      <td>Renders dynamic Recharts visualizations (Incident by Category, Severity Breakdown, Response Time Trends, 7-Day Volume) on Taluk & District portals.</td>
    </tr>
    <tr>
      <td><strong>12</strong></td>
      <td><strong>Official PDF Report Generation</strong></td>
      <td>Generates downloadable, government-formatted PDF incident verification sheets and district analytics executive reports.</td>
    </tr>
  </tbody>
</table>

<!-- PAGE 4: USER CLASSES & OPERATING ENVIRONMENT -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>User Classes & Operating Environment</span>
</div>

<h2>2.3 User Classes and Characteristics</h2>
<table>
  <thead>
    <tr>
      <th style="width: 18%;">User Role</th>
      <th style="width: 25%;">Description</th>
      <th style="width: 12%;">Technical Skill</th>
      <th style="width: 30%;">Primary Actions</th>
      <th>Access Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Village Officer (VEO)</strong></td>
      <td>Ground-level field officer stationed at village/panchayat emergency posts.</td>
      <td>Low–Med</td>
      <td>Create incidents, capture GPS coordinates, upload photo evidence, view local alerts.</td>
      <td><span class="badge badge-blue">Village Level</span></td>
    </tr>
    <tr>
      <td><strong>Taluk Officer (Tahsildar)</strong></td>
      <td>Administrative head of taluk jurisdiction responsible for initial verification.</td>
      <td>Medium</td>
      <td>Verify incidents, review AI risk insights, forward to District, reject false alarms, escalate urgent cases.</td>
      <td><span class="badge badge-green">Taluk Level</span></td>
    </tr>
    <tr>
      <td><strong>District EOC Officer (DEC)</strong></td>
      <td>District emergency controller managing district-wide disaster operations.</td>
      <td>Medium</td>
      <td>Monitor GIS maps, coordinate resources, draft emergency broadcasts, track analytics.</td>
      <td><span class="badge badge-orange">District Level</span></td>
    </tr>
    <tr>
      <td><strong>District Collector</strong></td>
      <td>Chief administrative authority of the district with final decision-making power.</td>
      <td>Medium</td>
      <td>Authorize emergency broadcasts, review critical escalations, review executive AI briefs.</td>
      <td><span class="badge badge-red">Collector Approval</span></td>
    </tr>
    <tr>
      <td><strong>State Admin (SDMA)</strong></td>
      <td>State Disaster Management Authority managing statewide emergency readiness.</td>
      <td>High</td>
      <td>Statewide 38-district monitoring, resource allocation, statewide alerts, user administration.</td>
      <td><span class="badge badge-red">State Full Admin</span></td>
    </tr>
    <tr>
      <td><strong>AI Processing Engine</strong></td>
      <td>Autonomous system microservice running local Ollama LLM and weather monitors.</td>
      <td>System</td>
      <td>Text analysis, risk scoring, Tamil translation, weather threshold evaluation.</td>
      <td><span class="badge badge-blue">Service Level</span></td>
    </tr>
  </tbody>
</table>

<h2>2.4 Operating Environment</h2>
<table>
  <tbody>
    <tr>
      <th style="width: 25%;">Server / Cloud</th>
      <td>Docker Containers (11 Spring Boot Microservices + 1 Python FastAPI Service + Oracle XE + MongoDB)</td>
    </tr>
    <tr>
      <th>Operating System</th>
      <td>Ubuntu 22.04 LTS (Production Server) / Windows 11 & macOS (Development Environments)</td>
    </tr>
    <tr>
      <th>Backend Runtime</th>
      <td>Java 17 LTS / Spring Boot 3.2.4 & Spring Cloud 2023.0.1 (Maven Multi-Module Build)</td>
    </tr>
    <tr>
      <th>Frontend Runtime</th>
      <td>React 19 / Vite 8 / Node.js 24 / Vanilla CSS Custom Design System</td>
    </tr>
    <tr>
      <th>Relational Database</th>
      <td>Oracle Database XE 11g / 21c (Port 1521 / Service XE) with Spring Data JPA & HikariCP</td>
    </tr>
    <tr>
      <th>Document / Media DB</th>
      <td>MongoDB 6.0+ / MongoDB Atlas (Port 27017) for incident attachments and photographic evidence</td>
    </tr>
    <tr>
      <th>AI/ML Runtime</th>
      <td>Python 3.13 / FastAPI / Ollama Runtime (Llama 3 8B model) / Requests / Pydantic / Uvicorn</td>
    </tr>
    <tr>
      <th>Client Browser</th>
      <td>Google Chrome 100+, Mozilla Firefox 100+, Apple Safari 15+, Microsoft Edge (Responsive viewport &ge; 375px)</td>
    </tr>
    <tr>
      <th>Network & Protocols</th>
      <td>HTTPS (TLS 1.3), REST APIs via Spring Cloud Gateway (Port 8081), Eureka Heartbeats (Port 8761)</td>
    </tr>
  </tbody>
</table>

<h2>2.5 Design and Implementation Constraints</h2>
<ul>
  <li><strong>Microservice Architecture:</strong> All core domain services must be independent Spring Boot 3.2.4 microservices communicating via REST and registered to Netflix Eureka.</li>
  <li><strong>Stateless Security:</strong> Authentication must utilize JWT (JSON Web Tokens) with BCrypt password hashing (strength factor 10) and Role-Based Access Control (RBAC).</li>
  <li><strong>Local Privacy-Preserving AI:</strong> AI inference must run on local infrastructure via Ollama (Llama 3) without sending citizen data to external proprietary cloud LLMs.</li>
  <li><strong>Fault-Tolerant Integrations:</strong> External weather integrations must be wrapped in Resilience4j CircuitBreakers with predefined fallback advisories.</li>
  <li><strong>Dual Persistence Design:</strong> Structured transactional data (users, alerts, approvals) must reside in Oracle XE, while high-volume multimedia evidence is stored in MongoDB.</li>
</ul>

<h2>2.6 Assumptions and Dependencies</h2>
<p><strong>Assumptions:</strong></p>
<ul>
  <li>Officers have network access via mobile data or broadband in taluk/district headquarters.</li>
  <li>GPS location coordinates provided by field officers are accurate within 10 meters.</li>
  <li>Ollama service is hosted and running locally with the Llama 3 model pulled.</li>
</ul>
<p><strong>Dependencies:</strong></p>
<ul>
  <li><strong>Open-Meteo API:</strong> Free meteorological REST API for live Tamil Nadu temperature, rain, and wind parameters.</li>
  <li><strong>Leaflet.js & OpenStreetMap:</strong> Open-source mapping tiles for GIS visualization without licensing fees.</li>
  <li><strong>Oracle JDBC Driver (ojdbc11):</strong> Enterprise relational driver for Oracle XE transactions.</li>
</ul>

<!-- PAGE 5: SYSTEM ARCHITECTURE -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>System Architecture & Microservices Breakdown</span>
</div>

<div class="section-header">3. SYSTEM ARCHITECTURE</div>

<h2>3.1 High-Level Architecture Description</h2>
<p>
The ALERT 4.0 GOVERNMENT system employs a layered, cloud-native microservices architecture designed for high availability, fault tolerance, and clear domain separation.
</p>

<div class="arch-box">[ CLIENT LAYER ] React 19 SPA (Vite 8) &bull; Bilingual UI (EN / TA) &bull; Leaflet GIS Maps &bull; Recharts Analytics</div>
<div class="arch-arrow">&darr; REST / HTTPS</div>
<div class="arch-box" style="background: #e0e7ff; border-color: #4f46e5; color: #4338ca;">[ GATEWAY LAYER ] Spring Cloud Gateway (Port 8081) &bull; JWT Validation &bull; CORS Filters &bull; Dynamic Load-Balanced Routing (lb://)</div>
<div class="arch-arrow">&darr; Service Discovery & Registration</div>
<div class="arch-box" style="background: #fef3c7; border-color: #d97706; color: #b45309;">[ DISCOVERY & CONFIG ] Netflix Eureka Server (Port 8761) &bull; Spring Cloud Config Server (Port 8888)</div>
<div class="arch-arrow">&darr; Microservice Domain Layer</div>
<div class="arch-box" style="background: #ecfdf5; border-color: #059669; color: #047857;">
  [ CORE SERVICE LAYER ]<br>
  auth-service (8082) &bull; user-service (8083) &bull; incident-service (8084) &bull; alert-service (8085)<br>
  approval-service (8086) &bull; notification-service (8087) &bull; analytics-service (8088) &bull; ai-service (8089)
</div>
<div class="arch-arrow">&darr; AI Inference & Persistence</div>
<div class="arch-box" style="background: #fae8ff; border-color: #a855f7; color: #7e22ce;">
  [ AI & DATA LAYER ]<br>
  Python FastAPI AI Service (Port 8000 + Ollama Llama 3) &bull; Oracle Database XE (Port 1521) &bull; MongoDB (Port 27017)
</div>

<h2>3.2 Microservices Breakdown</h2>
<table>
  <thead>
    <tr>
      <th style="width: 5%;">#</th>
      <th style="width: 22%;">Microservice Name</th>
      <th style="width: 8%;">Port</th>
      <th style="width: 15%;">Database</th>
      <th>Responsibility & Core Capabilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><strong>api-gateway</strong></td>
      <td>8081</td>
      <td>—</td>
      <td>Central reverse proxy; handles CORS, route predicates, and load-balanced forwarding (<code>lb://</code>) to registered services.</td>
    </tr>
    <tr>
      <td>2</td>
      <td><strong>discovery-server</strong></td>
      <td>8761</td>
      <td>—</td>
      <td>Netflix Eureka Service Registry; tracks heartbeat, health status, and dynamic instances of all backend services.</td>
    </tr>
    <tr>
      <td>3</td>
      <td><strong>config-server</strong></td>
      <td>8888</td>
      <td>—</td>
      <td>Centralized configuration management service for microservice properties.</td>
    </tr>
    <tr>
      <td>4</td>
      <td><strong>auth-service</strong></td>
      <td>8082</td>
      <td>Oracle XE</td>
      <td>User authentication, BCrypt password hashing, JWT token issuance, token verification, and role resolution.</td>
    </tr>
    <tr>
      <td>5</td>
      <td><strong>user-service</strong></td>
      <td>8083</td>
      <td>Oracle XE</td>
      <td>Employee profile management, role assignment, and district/taluk geographical reference data serving.</td>
    </tr>
    <tr>
      <td>6</td>
      <td><strong>incident-service</strong></td>
      <td>8084</td>
      <td>Oracle XE + MongoDB</td>
      <td>Full incident lifecycle (create, update status, verify), geospatial tagging, and Base64 photographic media storage in MongoDB.</td>
    </tr>
    <tr>
      <td>7</td>
      <td><strong>alert-service</strong></td>
      <td>8085</td>
      <td>Oracle XE</td>
      <td>Emergency alert generation, severity tagging, geographic zone targeting, and bilingual translation caching.</td>
    </tr>
    <tr>
      <td>8</td>
      <td><strong>approval-service</strong></td>
      <td>8086</td>
      <td>Oracle XE</td>
      <td>Multi-tier approval workflows (VEO &rarr; Taluk &rarr; District &rarr; Collector), decision tracking, and audit history.</td>
    </tr>
    <tr>
      <td>9</td>
      <td><strong>notification-service</strong></td>
      <td>8087</td>
      <td>Oracle XE</td>
      <td>Officer and citizen notifications, in-app notification inbox, and multi-channel dispatch logging.</td>
    </tr>
    <tr>
      <td>10</td>
      <td><strong>analytics-service</strong></td>
      <td>8088</td>
      <td>Oracle XE</td>
      <td>Aggregated incident volume, severity statistics, response time metrics, and monthly snapshot generation.</td>
    </tr>
    <tr>
      <td>11</td>
      <td><strong>ai-service</strong></td>
      <td>8089</td>
      <td>Oracle XE</td>
      <td>Spring Boot AI proxy with Resilience4j CircuitBreakers for live weather advisories (Open-Meteo) and prediction caching.</td>
    </tr>
    <tr>
      <td>12</td>
      <td><strong>alertgov-ai (FastAPI)</strong></td>
      <td>8000</td>
      <td>—</td>
      <td>Python FastAPI AI microservice hosting Ollama (Llama 3) for disaster risk scoring and bilingual Tamil/English summaries.</td>
    </tr>
  </tbody>
</table>

<!-- PAGE 6: TECH STACK & DATA FLOW -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>Technology Stack & End-to-End Data Flow</span>
</div>

<h2>3.3 Technology Stack</h2>
<table>
  <thead>
    <tr>
      <th style="width: 22%;">Layer</th>
      <th style="width: 33%;">Technology</th>
      <th>Purpose in ALERT 4.0 GOVERNMENT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend Framework</strong></td>
      <td>React 19 + Vite 8 + React Router 7</td>
      <td>High-performance Single Page Application with instantaneous role-based routing.</td>
    </tr>
    <tr>
      <td><strong>Styling & Design System</strong></td>
      <td>Vanilla CSS (Custom Tokenized Theme)</td>
      <td>Government-branded sleek theme with accessible contrast and smooth micro-animations.</td>
    </tr>
    <tr>
      <td><strong>GIS & Mapping</strong></td>
      <td>Leaflet.js + React-Leaflet + OpenStreetMap</td>
      <td>Interactive maps showing incident pins, danger radii, and nearby relief centers.</td>
    </tr>
    <tr>
      <td><strong>Data Visualization</strong></td>
      <td>Recharts 3.9</td>
      <td>Dynamic bar charts, area charts, and pie charts for incident analytics.</td>
    </tr>
    <tr>
      <td><strong>Backend Framework</strong></td>
      <td>Java 17 LTS / Spring Boot 3.2.4</td>
      <td>Enterprise-grade microservices with Spring Data JPA and Hibernate.</td>
    </tr>
    <tr>
      <td><strong>Cloud & Discovery</strong></td>
      <td>Spring Cloud 2023.0.1 (Gateway + Eureka)</td>
      <td>Reverse proxy routing, client load balancing, and service registry.</td>
    </tr>
    <tr>
      <td><strong>Fault Tolerance</strong></td>
      <td>Resilience4j CircuitBreaker & TimeLimiter</td>
      <td>Protects backend from third-party API outages with automated fallback responses.</td>
    </tr>
    <tr>
      <td><strong>Relational Database</strong></td>
      <td>Oracle Database XE 11g / 21c</td>
      <td>Primary transactional persistence for users, incidents, alerts, and approvals.</td>
    </tr>
    <tr>
      <td><strong>Document Database</strong></td>
      <td>MongoDB 6.0+ (Atlas / Local)</td>
      <td>High-capacity binary media storage for disaster photographs and evidence logs.</td>
    </tr>
    <tr>
      <td><strong>AI / ML Service</strong></td>
      <td>Python 3.13 + FastAPI + Ollama (Llama 3)</td>
      <td>Local LLM inference serving JSON risk evaluations in English and Tamil.</td>
    </tr>
    <tr>
      <td><strong>Containerization</strong></td>
      <td>Docker & Docker Compose</td>
      <td>Multi-container orchestration for local development and unified server deployment.</td>
    </tr>
  </tbody>
</table>

<h2>3.4 Hardware Component Specification</h2>
<p><strong>Status:</strong> <em>Not Applicable (Software-Only Enterprise Platform).</em> ALERT 4.0 GOVERNMENT is a software-based distributed platform accessible via web browsers on standard desktop and mobile devices.</p>

<h2>3.5 Data Flow Description</h2>
<table>
  <thead>
    <tr>
      <th style="width: 8%;">Step</th>
      <th>End-to-End Data Flow Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1</strong></td>
      <td><strong>Incident Submission:</strong> Village Officer (VEO) captures disaster details (photo, GPS, category) in React UI. Axios dispatches a <code>POST /api/v1/incidents</code> request containing multipart/JSON data to Spring Cloud Gateway (Port 8081).</td>
    </tr>
    <tr>
      <td><strong>2</strong></td>
      <td><strong>Gateway Routing & Auth:</strong> API Gateway verifies the JWT bearer token, checks VEO role permissions, and routes the request to <code>incident-service</code> via Eureka load balancing (<code>lb://incident-service</code>).</td>
    </tr>
    <tr>
      <td><strong>3</strong></td>
      <td><strong>Dual Persistence & Notification:</strong> <code>incident-service</code> stores structured metadata in Oracle XE (<code>INCIDENT_REPORTS</code>) and uploads image data to MongoDB (<code>INCIDENT_MEDIA</code>). It then triggers a notification via <code>notification-service</code> to the assigned Taluk Tahsildar.</td>
    </tr>
    <tr>
      <td><strong>4</strong></td>
      <td><strong>AI Risk Evaluation:</strong> When the Taluk Tahsildar opens the incident in the Verification Queue, <code>ai-service</code> calls the Python FastAPI endpoint (<code>POST http://localhost:8000/ai/predict-risk</code>). Ollama (Llama 3) performs NLP risk scoring and returns structured English & Tamil recommendations.</td>
    </tr>
    <tr>
      <td><strong>5</strong></td>
      <td><strong>Taluk Verification & Forwarding:</strong> Tahsildar clicks "Verify & Forward to District". <code>incident-service</code> updates the incident status to <code>Taluk Verified</code> (or <code>Waiting for Collector</code> if escalated). <code>LiveContext</code> triggers real-time state synchronization across all connected dashboards.</td>
    </tr>
    <tr>
      <td><strong>6</strong></td>
      <td><strong>District GIS Visualization & Broadcast Draft:</strong> District EOC Officer views the verified incident plotted on the Leaflet GIS map and drafts a targeted emergency broadcast via <code>POST /api/v1/alerts</code>.</td>
    </tr>
    <tr>
      <td><strong>7</strong></td>
      <td><strong>Collector Approval & Multichannel Dispatch:</strong> District Collector reviews the broadcast request in the Collector Portal and clicks "Authorize". <code>approval-service</code> updates workflow state to <code>APPROVED</code>, and <code>notification-service</code> dispatches alerts across public feeds and SMS/WhatsApp channels.</td>
    </tr>
    <tr>
      <td><strong>8</strong></td>
      <td><strong>State Aggregation & Live Analytics:</strong> State Command Center receives updated KPIs, updating the 38-district readiness matrix, resource deployment registries, and analytical charts in real-time.</td>
    </tr>
  </tbody>
</table>

<!-- PAGE 7: EXTERNAL INTERFACES & FUNCTIONAL REQUIREMENTS -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>External Interfaces & Functional Requirements</span>
</div>

<div class="section-header">4. EXTERNAL INTERFACE REQUIREMENTS</div>

<h2>4.1 User Interfaces</h2>
<table>
  <thead>
    <tr>
      <th style="width: 5%;">#</th>
      <th style="width: 25%;">Screen / Page</th>
      <th style="width: 15%;">User Role</th>
      <th>Description & Key UI Elements</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><strong>Login & Role Switcher</strong></td>
      <td>All Roles</td>
      <td>Secure authentication form with username/password, quick-login role selector buttons for fast testing, and JWT token storage in <code>localStorage</code>.</td>
    </tr>
    <tr>
      <td>2</td>
      <td><strong>Village Field Reporting</strong></td>
      <td>VEO</td>
      <td>Incident creation form with category picker, severity selector, live geolocation capture, photo upload preview, and active village incident feed.</td>
    </tr>
    <tr>
      <td>3</td>
      <td><strong>Taluk Command Center</strong></td>
      <td>Tahsildar</td>
      <td>AI daily brief banner, KPI summary cards (Pending, Verified Today, Critical), priority verification queue, and recently verified incident table.</td>
    </tr>
    <tr>
      <td>4</td>
      <td><strong>Taluk Incident Verification</strong></td>
      <td>Tahsildar</td>
      <td>Split-view screen: Left panel displays incident description, reporter details, and interactive Leaflet map; Right panel displays Ollama AI risk analysis and decision action buttons (Verify & Forward, Reject, Escalate).</td>
    </tr>
    <tr>
      <td>5</td>
      <td><strong>District EOC Dashboard</strong></td>
      <td>DEC Officer</td>
      <td>District emergency overview, interactive Leaflet GIS incident map with infrastructure markers, active alert counters, and broadcast quick-actions.</td>
    </tr>
    <tr>
      <td>6</td>
      <td><strong>District Alert Broadcast</strong></td>
      <td>DEC Officer</td>
      <td>Emergency alert composer with zone/taluk targeting, bilingual Tamil/English translation preview, channel selectors, and submission to Collector queue.</td>
    </tr>
    <tr>
      <td>7</td>
      <td><strong>District Collector Portal</strong></td>
      <td>District Collector</td>
      <td>Executive briefing banner, pending broadcast approval queue with one-click authorization, critical escalation tracker, and district readiness index.</td>
    </tr>
    <tr>
      <td>8</td>
      <td><strong>State 38-District Monitor</strong></td>
      <td>State Admin / SDMA</td>
      <td>State-wide emergency dashboard showing all 38 Tamil Nadu districts, aggregate incident numbers, active alerts, and district readiness status.</td>
    </tr>
    <tr>
      <td>9</td>
      <td><strong>State Resource Management</strong></td>
      <td>State Admin</td>
      <td>Interactive allocation portal tracking fire trucks, police squads, rescue boats, and medical ambulances across disaster zones.</td>
    </tr>
    <tr>
      <td>10</td>
      <td><strong>Taluk & District Analytics</strong></td>
      <td>Tahsildar / DEC</td>
      <td>Dynamic Recharts analytics: Incidents by Category (Pie Chart), Severity Distribution (Bar Chart), Response Times (Area Chart), and official PDF export.</td>
    </tr>
  </tbody>
</table>

<h2>4.3 Software Interfaces — Third-Party APIs</h2>
<table>
  <thead>
    <tr>
      <th style="width: 22%;">API / Service</th>
      <th style="width: 20%;">Provider</th>
      <th style="width: 18%;">Auth Method</th>
      <th>Purpose in ALERT 4.0 GOVERNMENT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ollama LLM API</strong></td>
      <td>Local Ollama Server (Port 11434)</td>
      <td>None (Localhost)</td>
      <td>Executes Llama 3 8B model inference for disaster classification, spam checks, and bilingual text synthesis.</td>
    </tr>
    <tr>
      <td><strong>Open-Meteo Weather API</strong></td>
      <td>Open-Meteo Global Meteorological</td>
      <td>None required</td>
      <td>Supplies live temperature, precipitation, and wind speeds for Tamil Nadu districts with Resilience4j fallback.</td>
    </tr>
    <tr>
      <td><strong>Leaflet / OpenStreetMap</strong></td>
      <td>OpenStreetMap Foundation</td>
      <td>None required</td>
      <td>Interactive raster tile maps for GIS visualization and infrastructure mapping.</td>
    </tr>
    <tr>
      <td><strong>MongoDB Atlas Cloud</strong></td>
      <td>MongoDB Inc.</td>
      <td>URI Connection String</td>
      <td>High-speed cloud document persistence for incident media attachments and photographic evidence.</td>
    </tr>
  </tbody>
</table>

<div class="section-header" style="margin-top: 25px;">5. FUNCTIONAL REQUIREMENTS</div>

<h3>5.1 Core Service Functional Requirements</h3>

<table>
  <tr>
    <th style="width: 20%;">FR ID</th>
    <td><strong>FR-AUTH-001</strong></td>
    <th style="width: 20%;">FR Name</th>
    <td><strong>User Authentication & Role-Based Token Generation</strong></td>
  </tr>
  <tr>
    <th>Actor(s)</th>
    <td colspan="3">All Administrative Users (VEO, Tahsildar, DEC, Collector, State Admin)</td>
  </tr>
  <tr>
    <th>Description</th>
    <td colspan="3">The system shall authenticate user credentials against Oracle Database XE using BCrypt hashing and issue a signed, stateless JWT token containing user identity, role, district, and taluk claims.</td>
  </tr>
  <tr>
    <th>Pre-condition</th>
    <td colspan="3">User account exists in <code>AUTH_USERS</code> table; <code>auth-service</code> is operational.</td>
  </tr>
  <tr>
    <th>Main Flow</th>
    <td colspan="3">1. User submits username and password. 2. Gateway forwards request to <code>auth-service</code>. 3. <code>auth-service</code> verifies BCrypt hash. 4. Generates 24-hour signed JWT. 5. Returns token and user metadata.</td>
  </tr>
  <tr>
    <th>Alternate Flow</th>
    <td colspan="3">AF1: Invalid credentials &rarr; Return HTTP 401 Unauthorized with descriptive error message.</td>
  </tr>
  <tr>
    <th>Post-condition</th>
    <td colspan="3">User is authenticated; JWT stored in client <code>localStorage</code>; user routed to role dashboard.</td>
  </tr>
</table>

<table>
  <tr>
    <th style="width: 20%;">FR ID</th>
    <td><strong>FR-INC-001</strong></td>
    <th style="width: 20%;">FR Name</th>
    <td><strong>Field Incident Reporting with Geolocation & Evidence</strong></td>
  </tr>
  <tr>
    <th>Actor(s)</th>
    <td colspan="3">Village Emergency Officer (VEO)</td>
  </tr>
  <tr>
    <th>Description</th>
    <td colspan="3">The system shall allow VEO officers to submit disaster incidents with title, category, initial severity, GPS coordinates, village/taluk tags, and photographic media evidence.</td>
  </tr>
  <tr>
    <th>Pre-condition</th>
    <td colspan="3">VEO officer is authenticated with valid JWT token.</td>
  </tr>
  <tr>
    <th>Main Flow</th>
    <td colspan="3">1. VEO fills incident form. 2. Attaches ground photo. 3. Submits to <code>incident-service</code>. 4. Metadata stored in Oracle XE; photo stored in MongoDB. 5. Incident status set to <code>Waiting for Taluk</code>.</td>
  </tr>
  <tr>
    <th>Alternate Flow</th>
    <td colspan="3">AF1: Image payload exceeds 50MB &rarr; Return HTTP 413 Payload Too Large error.</td>
  </tr>
  <tr>
    <th>Post-condition</th>
    <td colspan="3">Incident record created; notification dispatched to Taluk Tahsildar verification queue.</td>
  </tr>
</table>

<table>
  <tr>
    <th style="width: 20%;">FR ID</th>
    <td><strong>FR-VER-001</strong></td>
    <th style="width: 20%;">FR Name</th>
    <td><strong>Taluk Incident Verification & AI Risk Review</strong></td>
  </tr>
  <tr>
    <th>Actor(s)</th>
    <td colspan="3">Taluk Tahsildar</td>
  </tr>
  <tr>
    <th>Description</th>
    <td colspan="3">The system shall display incoming village incidents in a verification queue, execute AI risk analysis, and enable the Tahsildar to verify, reject, or urgently escalate to the Collector.</td>
  </tr>
  <tr>
    <th>Pre-condition</th>
    <td colspan="3">Incident exists with status <code>Waiting for Taluk</code>.</td>
  </tr>
  <tr>
    <th>Main Flow</th>
    <td colspan="3">1. Tahsildar selects incident. 2. System fetches AI prediction from <code>ai-service</code>. 3. Displays risk summary and GIS map. 4. Tahsildar clicks "Verify & Forward to District". 5. Status updated to <code>Taluk Verified</code>.</td>
  </tr>
  <tr>
    <th>Alternate Flow</th>
    <td colspan="3">AF1: Marked as False Alarm &rarr; Status updated to <code>Resolved</code>. AF2: Urgent Escalation &rarr; Status set to <code>Waiting for Collector</code>.</td>
  </tr>
  <tr>
    <th>Post-condition</th>
    <td colspan="3">Incident forwarded to District EOC / Collector; dashboards synchronized in real-time.</td>
  </tr>
</table>

<!-- PAGE 8: AI MODULE SPECIFICATION & NFRs -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>AI/ML Module Specification & Non-Functional Requirements</span>
</div>

<div class="section-header">6. AI / ML MODULE SPECIFICATION</div>

<h2>6.1 AI Module 1 — Local LLM Disaster Risk & Bilingual Recommendation Engine</h2>
<table>
  <tbody>
    <tr>
      <th style="width: 25%;">Module Name</th>
      <td><strong>Ollama Llama 3 Disaster Risk & Bilingual Instruction Generator</strong></td>
    </tr>
    <tr>
      <th>AI Phase</th>
      <td>Phase 1 (Plan) &rarr; Phase 2 (Prototype) &rarr; Phase 3 (Build) &rarr; Phase 4 (Integrate) &rarr; Phase 5 (Deploy) &rarr; Phase 6 (Present) [Completed]</td>
    </tr>
    <tr>
      <th>Problem AI Solves</th>
      <td>Eliminates manual delays and subjective bias in classifying disaster severity; generates concise formal incident summaries and citizen-friendly emergency instructions in English and Tamil (தமிழ்).</td>
    </tr>
    <tr>
      <th>Input Data</th>
      <td>JSON Payload: <code>{ "prompt": "Major flooding reported near KCE College campus...", "language": "en" | "ta", "model": "llama3" }</code></td>
    </tr>
    <tr>
      <th>Output / Prediction</th>
      <td>Structured JSON containing severity classification (<code>Low</code>, <code>Medium</code>, <code>High</code>, <code>Severe</code>, <code>Extremely Severe</code>), spam detection flag, duplicate check, formal description, and actionable response recommendations.</td>
    </tr>
    <tr>
      <th>Algorithm / Model</th>
      <td>Ollama runtime with Meta Llama 3 (8B Parameter) quantized instruction model + rule-based NLP fallback heuristics.</td>
    </tr>
    <tr>
      <th>Implementation</th>
      <td>Python 3.13 + FastAPI microservice (<code>alertgov-ai</code>) with CORS middleware and structured Pydantic response models.</td>
    </tr>
    <tr>
      <th>Integration Point</th>
      <td><code>POST http://localhost:8000/ai/predict-risk</code> &rarr; Invoked by Spring Boot <code>ai-service</code> (Port 8089) via <code>RestTemplate</code>.</td>
    </tr>
    <tr>
      <th>Fallback Mechanism</th>
      <td>If Ollama is offline or takes &gt; 5 seconds, the FastAPI service activates built-in heuristic pattern matching to assign severity and fallback advisory without breaking the UI workflow.</td>
    </tr>
    <tr>
      <th>Ethical Design</th>
      <td><strong>Human-in-the-Loop:</strong> AI assessments are advisory. Officers (Tahsildars/Collectors) retain final authority to modify or override severity ratings before publishing.</td>
    </tr>
  </tbody>
</table>

<h2>6.2 AI Module 2 — Resilience4j Live Meteorological Threat Advisory Engine</h2>
<table>
  <tbody>
    <tr>
      <th style="width: 25%;">Module Name</th>
      <td><strong>Resilience4j Automated Meteorological Threat Assessment Engine</strong></td>
    </tr>
    <tr>
      <th>Problem AI Solves</th>
      <td>Continuously analyzes live atmospheric parameters to proactively alert administrators of impending extreme weather events (heatwaves, torrential rainfall, cyclones).</td>
    </tr>
    <tr>
      <th>Input Data</th>
      <td>Live REST telemetry from Open-Meteo: latitude 13.0827, longitude 80.2707 (temperature_2m, precipitation, wind_speed_10m).</td>
    </tr>
    <tr>
      <th>Output / Prediction</th>
      <td>Warning classification (<code>Normal</code>, <code>Heat Wave / Orange Alert</code>, <code>Heavy Rain / Red Alert</code>, <code>High Winds / Cyclone Alert</code>), target district scope, confidence score (96%), and advisory messages.</td>
    </tr>
    <tr>
      <th>Resilience & CircuitBreaker</th>
      <td>Wrapped in Resilience4j <code>@CircuitBreaker(name = "weatherService", fallbackMethod = "weatherAdvisoryFallback")</code> with 3-second TimeLimiter.</td>
    </tr>
  </tbody>
</table>

<div class="section-header" style="margin-top: 25px;">7. NON-FUNCTIONAL REQUIREMENTS</div>

<table>
  <thead>
    <tr>
      <th style="width: 14%;">NFR ID</th>
      <th style="width: 16%;">Category</th>
      <th style="width: 20%;">NFR Name</th>
      <th>Measurable Requirement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>NFR-PERF-001</strong></td>
      <td>Performance</td>
      <td>API Response Time</td>
      <td>All Spring Boot REST endpoints must respond within &lt; 500ms for standard database queries under normal load.</td>
    </tr>
    <tr>
      <td><strong>NFR-PERF-002</strong></td>
      <td>Performance</td>
      <td>AI Inference Speed</td>
      <td>Local Ollama AI predictions must complete within &lt; 3.5 seconds. Rule-based fallbacks execute in &lt; 50ms.</td>
    </tr>
    <tr>
      <td><strong>NFR-PERF-003</strong></td>
      <td>Performance</td>
      <td>Dashboard Rendering</td>
      <td>React 19 dashboards with Leaflet maps and Recharts must fully render in &lt; 1.5 seconds.</td>
    </tr>
    <tr>
      <td><strong>NFR-SEC-001</strong></td>
      <td>Security</td>
      <td>Stateless Authentication</td>
      <td>All non-public endpoints require a signed JWT token in the <code>Authorization: Bearer</code> header. Tokens expire in 24 hours.</td>
    </tr>
    <tr>
      <td><strong>NFR-SEC-002</strong></td>
      <td>Security</td>
      <td>Password Encryption</td>
      <td>All user passwords are encrypted using BCrypt with minimum cost factor 10. No plaintext passwords stored.</td>
    </tr>
    <tr>
      <td><strong>NFR-REL-001</strong></td>
      <td>Reliability</td>
      <td>Circuit Breaker Protection</td>
      <td>External API failures must not crash backend services; Resilience4j fallback triggers in &lt; 3s.</td>
    </tr>
    <tr>
      <td><strong>NFR-USE-001</strong></td>
      <td>Usability</td>
      <td>Bilingual Accessibility</td>
      <td>Complete interface localization in English and Tamil (தமிழ்) with instantaneous client-side language toggle.</td>
    </tr>
    <tr>
      <td><strong>NFR-SCAL-001</strong></td>
      <td>Scalability</td>
      <td>Containerized Replicas</td>
      <td>Microservice architecture supports horizontal scaling of any service independently via Docker Compose.</td>
    </tr>
  </tbody>
</table>

<!-- PAGE 9: DATABASE DESIGN -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>Database Design & Schema Catalog</span>
</div>

<div class="section-header">8. DATABASE DESIGN</div>

<h2>8.1 Entity-Relationship Overview</h2>
<p>
ALERT 4.0 GOVERNMENT utilizes a hybrid multi-database architecture:
<strong>Oracle Database XE 11g/21c</strong> serves as the primary ACID-compliant relational store for users, incident reports, alert broadcasts, approval workflows, and analytics.
<strong>MongoDB 6.0+</strong> serves as the high-capacity document store for multimedia photographic evidence and file attachments.
</p>

<h2>8.2 Primary Entity Schemas (Oracle Database XE & MongoDB)</h2>

<table>
  <thead>
    <tr><th colspan="5">ENTITY: AUTH_USERS | Service: auth-service | Database: Oracle Database XE</th></tr>
    <tr>
      <th style="width: 20%;">Column Name</th>
      <th style="width: 20%;">Data Type</th>
      <th style="width: 15%;">Constraints</th>
      <th style="width: 10%;">Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>ID</code></td><td>BIGINT / NUMBER(19)</td><td>NOT NULL, AUTO_INC</td><td>PK</td><td>Unique user account ID</td></tr>
    <tr><td><code>USERNAME</code></td><td>VARCHAR2(100)</td><td>NOT NULL, UNIQUE</td><td>UK</td><td>Officer login username (e.g. VEO-COIMBATORESOUTH-1)</td></tr>
    <tr><td><code>PASSWORD</code></td><td>VARCHAR2(255)</td><td>NOT NULL</td><td>—</td><td>BCrypt-hashed password string</td></tr>
    <tr><td><code>ROLE</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>village, taluk, district, collector, state</td></tr>
    <tr><td><code>DISTRICT</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Assigned administrative district</td></tr>
    <tr><td><code>TALUK</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Assigned administrative taluk</td></tr>
    <tr><td><code>VILLAGE</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Assigned village post</td></tr>
  </tbody>
</table>

<table>
  <thead>
    <tr><th colspan="5">ENTITY: INCIDENT_REPORTS | Service: incident-service | Database: Oracle Database XE</th></tr>
    <tr>
      <th style="width: 20%;">Column Name</th>
      <th style="width: 20%;">Data Type</th>
      <th style="width: 15%;">Constraints</th>
      <th style="width: 10%;">Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>ID</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>PK</td><td>UUID string identifier for the incident</td></tr>
    <tr><td><code>TITLE</code></td><td>VARCHAR2(255)</td><td>NOT NULL</td><td>—</td><td>Short summary title of the emergency</td></tr>
    <tr><td><code>DESCRIPTION</code></td><td>CLOB / VARCHAR2(4000)</td><td>NULLABLE</td><td>—</td><td>Detailed situational field notes</td></tr>
    <tr><td><code>CATEGORY</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Flood, Fire, Medical, Building Collapse, etc.</td></tr>
    <tr><td><code>SEVERITY</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Low, Medium, High, Severe, Extremely Severe</td></tr>
    <tr><td><code>STATUS</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Waiting for Taluk, Taluk Verified, Waiting for Collector, Resolved</td></tr>
    <tr><td><code>DISTRICT</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>District location</td></tr>
    <tr><td><code>TALUK</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Taluk jurisdiction</td></tr>
    <tr><td><code>VILLAGE</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Village location</td></tr>
    <tr><td><code>REPORTED_BY</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Username of reporting VEO officer</td></tr>
    <tr><td><code>REPORTED_AT</code></td><td>TIMESTAMP</td><td>NOT NULL</td><td>—</td><td>Date and timestamp of submission</td></tr>
  </tbody>
</table>

<table>
  <thead>
    <tr><th colspan="5">ENTITY: INCIDENT_MEDIA | Service: incident-service | Database: MongoDB</th></tr>
    <tr>
      <th style="width: 20%;">Field Name</th>
      <th style="width: 20%;">BSON Type</th>
      <th style="width: 15%;">Constraints</th>
      <th style="width: 10%;">Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>_id</code></td><td>ObjectId</td><td>PRIMARY KEY</td><td>PK</td><td>Unique MongoDB document identifier</td></tr>
    <tr><td><code>incidentId</code></td><td>String</td><td>NOT NULL, INDEX</td><td>FK</td><td>References Oracle <code>INCIDENT_REPORTS.ID</code></td></tr>
    <tr><td><code>photoBase64</code></td><td>String / Binary</td><td>NOT NULL</td><td>—</td><td>Full photographic media evidence in Base64 encoding</td></tr>
    <tr><td><code>uploadedAt</code></td><td>Date</td><td>NOT NULL</td><td>—</td><td>Timestamp of upload</td></tr>
  </tbody>
</table>

<table>
  <thead>
    <tr><th colspan="5">ENTITY: APPROVAL_WORKFLOWS | Service: approval-service | Database: Oracle Database XE</th></tr>
    <tr>
      <th style="width: 20%;">Column Name</th>
      <th style="width: 20%;">Data Type</th>
      <th style="width: 15%;">Constraints</th>
      <th style="width: 10%;">Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>ID</code></td><td>BIGINT / NUMBER(19)</td><td>NOT NULL, AUTO_INC</td><td>PK</td><td>Unique workflow ID</td></tr>
    <tr><td><code>INCIDENT_ID</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Incident associated with approval request</td></tr>
    <tr><td><code>APPROVAL_LEVEL</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>TALUK, DISTRICT, COLLECTOR</td></tr>
    <tr><td><code>STATUS</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>PENDING, APPROVED, REJECTED, ESCALATED</td></tr>
    <tr><td><code>APPROVER_NAME</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Name of reviewing authority</td></tr>
    <tr><td><code>DECISION_TIME</code></td><td>TIMESTAMP</td><td>NULLABLE</td><td>—</td><td>Timestamp of action</td></tr>
  </tbody>
</table>

<!-- PAGE 10: API DESIGN OVERVIEW & DEVOPS -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>API Design Overview & Deployment Plan</span>
</div>

<div class="section-header">9. API DESIGN OVERVIEW</div>

<h2>9.1 Core REST Endpoints Catalog</h2>
<table>
  <thead>
    <tr>
      <th style="width: 10%;">Service</th>
      <th style="width: 8%;">Method</th>
      <th style="width: 32%;">Endpoint</th>
      <th style="width: 12%;">Auth Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Auth</strong></td>
      <td><code>POST</code></td>
      <td><code>/api/v1/auth/login</code></td>
      <td>No</td>
      <td>Authenticates credentials; returns signed JWT and user metadata.</td>
    </tr>
    <tr>
      <td><strong>Auth</strong></td>
      <td><code>POST</code></td>
      <td><code>/api/v1/auth/register</code></td>
      <td>No / Admin</td>
      <td>Registers a new administrative or field officer.</td>
    </tr>
    <tr>
      <td><strong>Incidents</strong></td>
      <td><code>GET</code></td>
      <td><code>/api/v1/incidents</code></td>
      <td>Yes</td>
      <td>Fetches all active disaster incident reports.</td>
    </tr>
    <tr>
      <td><strong>Incidents</strong></td>
      <td><code>POST</code></td>
      <td><code>/api/v1/incidents</code></td>
      <td>Yes</td>
      <td>Creates a new ground incident report with metadata & media.</td>
    </tr>
    <tr>
      <td><strong>Incidents</strong></td>
      <td><code>PUT</code></td>
      <td><code>/api/v1/incidents/{id}/status</code></td>
      <td>Yes</td>
      <td>Updates incident status (e.g. Taluk Verified, Waiting for Collector).</td>
    </tr>
    <tr>
      <td><strong>Incidents</strong></td>
      <td><code>GET</code></td>
      <td><code>/api/v1/incidents/{id}/image</code></td>
      <td>Yes</td>
      <td>Retrieves Base64 photographic evidence from MongoDB.</td>
    </tr>
    <tr>
      <td><strong>Alerts</strong></td>
      <td><code>GET</code></td>
      <td><code>/api/v1/alerts</code></td>
      <td>Yes</td>
      <td>Retrieves active emergency broadcasts and advisories.</td>
    </tr>
    <tr>
      <td><strong>Alerts</strong></td>
      <td><code>POST</code></td>
      <td><code>/api/v1/alerts</code></td>
      <td>Yes</td>
      <td>Creates a new targeted public alert broadcast.</td>
    </tr>
    <tr>
      <td><strong>Approvals</strong></td>
      <td><code>GET</code></td>
      <td><code>/api/v1/approvals/pending</code></td>
      <td>Yes</td>
      <td>Retrieves pending approval queue for Collector/District review.</td>
    </tr>
    <tr>
      <td><strong>Approvals</strong></td>
      <td><code>POST</code></td>
      <td><code>/api/v1/approvals/action</code></td>
      <td>Yes</td>
      <td>Submits approve/reject/escalate decision on a broadcast.</td>
    </tr>
    <tr>
      <td><strong>AI Service</strong></td>
      <td><code>GET</code></td>
      <td><code>/api/v1/ai/weather-advisory</code></td>
      <td>Yes</td>
      <td>Returns Open-Meteo live meteorological threat analysis via Resilience4j.</td>
    </tr>
    <tr>
      <td><strong>FastAPI AI</strong></td>
      <td><code>POST</code></td>
      <td><code>http://localhost:8000/ai/predict-risk</code></td>
      <td>Internal</td>
      <td>Executes Ollama LLM inference for risk scoring and bilingual advice.</td>
    </tr>
  </tbody>
</table>

<div class="section-header" style="margin-top: 25px;">10. DEVOPS & DEPLOYMENT PLAN</div>

<h2>10.1 Docker Container Multi-Service Configuration</h2>
<table>
  <thead>
    <tr>
      <th style="width: 20%;">Container</th>
      <th style="width: 25%;">Image / Context</th>
      <th style="width: 15%;">Port Mapping</th>
      <th style="width: 20%;">Depends On</th>
      <th>Key Environment Variables</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>oracle-db</code></td>
      <td><code>gvenzl/oracle-xe:slim-faststart</code></td>
      <td>1522:1521</td>
      <td>—</td>
      <td><code>ORACLE_PASSWORD=admin</code></td>
    </tr>
    <tr>
      <td><code>local-mongo</code></td>
      <td><code>mongo:latest</code></td>
      <td>27017:27017</td>
      <td>—</td>
      <td><code>volumes: mongo_data:/data/db</code></td>
    </tr>
    <tr>
      <td><code>discovery-server</code></td>
      <td><code>./discovery-server</code></td>
      <td>8761:8761</td>
      <td>—</td>
      <td><code>EUREKA_CLIENT_REGISTERWITHEUREKA=false</code></td>
    </tr>
    <tr>
      <td><code>api-gateway</code></td>
      <td><code>./api-gateway</code></td>
      <td>8081:8081</td>
      <td><code>discovery-server</code></td>
      <td><code>EUREKA_CLIENT_SERVICEURL_DEFAULTZONE</code></td>
    </tr>
    <tr>
      <td><code>auth-service</code></td>
      <td><code>./auth-service</code></td>
      <td>8082:8082</td>
      <td><code>discovery-server, oracle-db</code></td>
      <td><code>SPRING_DATASOURCE_URL=jdbc:oracle:thin:...</code></td>
    </tr>
    <tr>
      <td><code>incident-service</code></td>
      <td><code>./incident-service</code></td>
      <td>8084:8084</td>
      <td><code>discovery-server, oracle-db</code></td>
      <td><code>SPRING_DATA_MONGODB_URI</code></td>
    </tr>
    <tr>
      <td><code>alertgov-ai</code></td>
      <td><code>./alertgov-ai</code></td>
      <td>8000:8000</td>
      <td><code>ollama</code></td>
      <td><code>OLLAMA_URL=http://ollama:11434/api/generate</code></td>
    </tr>
    <tr>
      <td><code>ollama</code></td>
      <td><code>ollama/ollama</code></td>
      <td>11434:11434</td>
      <td>—</td>
      <td><code>volumes: ollama_data:/root/.ollama</code></td>
    </tr>
    <tr>
      <td><code>frontend</code></td>
      <td><code>./alertgov-frontend</code></td>
      <td>5173:80</td>
      <td><code>api-gateway</code></td>
      <td><code>VITE_API_URL=http://localhost:8081</code></td>
    </tr>
  </tbody>
</table>

<!-- PAGE 11: TIMELINE & ROLES -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>Milestones & Team Role Assignment</span>
</div>

<div class="section-header">11. PROJECT TIMELINE & MILESTONES</div>

<table>
  <thead>
    <tr>
      <th style="width: 10%;">Week</th>
      <th style="width: 20%;">Phase</th>
      <th>Deliverables & Key Accomplishments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1</strong></td>
      <td>Foundation</td>
      <td>&#9989; SRS Document finalized | &#9989; Git repository & branching established | &#9989; Docker & Eureka discovery server set up | &#9989; Oracle XE & MongoDB schemas initialized.</td>
    </tr>
    <tr>
      <td><strong>2</strong></td>
      <td>Core Backend</td>
      <td>&#9989; <code>auth-service</code> (JWT, BCrypt) complete | &#9989; <code>user-service</code> complete | &#9989; <code>incident-service</code> CRUD developed | &#9989; Spring Security filter chain verified.</td>
    </tr>
    <tr>
      <td><strong>3</strong></td>
      <td>Full Backend</td>
      <td>&#9989; <code>alert-service</code> & <code>approval-service</code> complete | &#9989; <code>notification-service</code> complete | &#9989; Postman Collection covering all endpoints created | &#9989; Eureka load-balanced routing tested.</td>
    </tr>
    <tr>
      <td><strong>4</strong></td>
      <td>AI & Weather Module</td>
      <td>&#9989; Python FastAPI service built | &#9989; Ollama Llama 3 bilingual inference connected | &#9989; Open-Meteo weather API with Resilience4j circuit breakers implemented in <code>ai-service</code>.</td>
    </tr>
    <tr>
      <td><strong>5</strong></td>
      <td>Frontend Complete</td>
      <td>&#9989; React 19 + Vite bilingual portal built | &#9989; Leaflet.js interactive GIS mapping integrated | &#9989; Recharts analytics dashboard developed | &#9989; Multi-tier role portals connected.</td>
    </tr>
    <tr>
      <td><strong>6</strong></td>
      <td>Integration & Testing</td>
      <td>&#9989; Full end-to-end verification pipeline (Village &rarr; Taluk &rarr; District &rarr; Collector &rarr; State) passing | &#9989; Docker Compose multi-container cluster validated | &#9989; Load tested under 50+ concurrent queries.</td>
    </tr>
    <tr>
      <td><strong>7</strong></td>
      <td>Polish & Documentation</td>
      <td>&#9989; Fixed dashboard live sync and analytics chart rendering | &#9989; Official PDF reporting integrated | &#9989; API Documentation & architecture docs created | &#9989; Internal Review demo successfully presented.</td>
    </tr>
    <tr>
      <td><strong>8</strong></td>
      <td>Final Submission</td>
      <td>&#9989; Final SRS v2.0 published | &#9989; Git repo tagged v2.0 release | &#9989; Live demonstration & presentation slide deck finalized for SIH submission.</td>
    </tr>
  </tbody>
</table>

<div class="section-header" style="margin-top: 25px;">12. TEAM COMPOSITION & ROLE ASSIGNMENT</div>

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Member Name</th>
      <th style="width: 12%;">Branch</th>
      <th style="width: 10%;">Year</th>
      <th>Key Responsibilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Farah Hamna M</strong></td>
      <td>IT</td>
      <td>III</td>
      <td>Frontend Architecture (React 19, Leaflet GIS Maps, Recharts, Bilingual UI), UI/UX Design, and Component Integration.</td>
    </tr>
    <tr>
      <td><strong>Rishikesh V</strong></td>
      <td>IT</td>
      <td>III</td>
      <td>Backend Microservices Lead (Spring Boot 3.2.4, Spring Cloud Gateway, Eureka Discovery, JWT Security, Oracle XE & MongoDB persistence), DevOps & Docker Compose.</td>
    </tr>
    <tr>
      <td><strong>Shruthin K</strong></td>
      <td>IT</td>
      <td>III</td>
      <td>AI/ML Integration (Python FastAPI, Ollama Llama 3 bilingual reasoning, Resilience4j Open-Meteo weather circuit breakers), Testing & API Documentation.</td>
    </tr>
  </tbody>
</table>

<h3>Ownership Matrix</h3>
<table>
  <thead>
    <tr>
      <th style="width: 30%;">Component</th>
      <th style="width: 23%;">Primary Owner</th>
      <th style="width: 23%;">Secondary Owner</th>
      <th>Support</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Eureka & API Gateway</td><td>Rishikesh V</td><td>Farah Hamna M</td><td>Shruthin K</td></tr>
    <tr><td>Core Microservices (Auth, Incident, Alert)</td><td>Rishikesh V</td><td>Shruthin K</td><td>Farah Hamna M</td></tr>
    <tr><td>Approval & Notification Services</td><td>Rishikesh V</td><td>Farah Hamna M</td><td>Shruthin K</td></tr>
    <tr><td>AI Microservice & Weather Service</td><td>Shruthin K</td><td>Rishikesh V</td><td>Farah Hamna M</td></tr>
    <tr><td>React 19 Frontend & GIS Maps</td><td>Farah Hamna M</td><td>Rishikesh V</td><td>Shruthin K</td></tr>
    <tr><td>Database Schemas (Oracle XE + Mongo)</td><td>Rishikesh V</td><td>Farah Hamna M</td><td>Shruthin K</td></tr>
    <tr><td>DevOps & Docker Deployment</td><td>Rishikesh V</td><td>Shruthin K</td><td>Farah Hamna M</td></tr>
    <tr><td>SRS Documentation & Evaluation</td><td>All Members</td><td>All Members</td><td>All Members</td></tr>
  </tbody>
</table>

<!-- PAGE 12: RISK REGISTER & APPENDIX -->
<div class="page-break"></div>
<div class="header-rule">
  <span>SRS | ALERT 4.0 GOVERNMENT</span>
  <span>Risk Register & Appendix</span>
</div>

<div class="section-header">13. RISK REGISTER</div>

<table>
  <thead>
    <tr>
      <th style="width: 8%;">ID</th>
      <th style="width: 35%;">Risk Description</th>
      <th style="width: 8%;">Prob.</th>
      <th style="width: 8%;">Impact</th>
      <th>Mitigation Strategy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>R01</strong></td>
      <td>Ollama local LLM inference latency exceeds 5 seconds during high-load disasters</td>
      <td>Medium</td>
      <td>High</td>
      <td>Implemented rule-based fallback heuristic analysis in FastAPI that immediately supplies valid severity ratings and advice if LLM timeout occurs.</td>
    </tr>
    <tr>
      <td><strong>R02</strong></td>
      <td>Open-Meteo external weather API outage or rate-limiting</td>
      <td>Medium</td>
      <td>High</td>
      <td>Wrapped endpoint in Resilience4j CircuitBreaker with automated fallback to default Tamil Nadu seasonal advisory data.</td>
    </tr>
    <tr>
      <td><strong>R03</strong></td>
      <td>Oracle Database XE connection pool exhaustion under multi-service startup</td>
      <td>Medium</td>
      <td>High</td>
      <td>Tuned HikariCP connection pool limits (<code>maximum-pool-size=3</code>) across microservices to maintain lightweight concurrent connection footprint.</td>
    </tr>
    <tr>
      <td><strong>R04</strong></td>
      <td>Large photographic evidence uploads overloading database performance</td>
      <td>Medium</td>
      <td>Medium</td>
      <td>Decoupled persistence: metadata stored in Oracle XE, while binary Base64 images are stored in dedicated MongoDB document collections.</td>
    </tr>
    <tr>
      <td><strong>R05</strong></td>
      <td>Unauthorized alert dissemination causing public panic</td>
      <td>Low</td>
      <td>Critical</td>
      <td>Enforced strict multi-level approval workflow; broadcast alerts cannot be published without District Collector authorization.</td>
    </tr>
    <tr>
      <td><strong>R06</strong></td>
      <td>Loss of internet connectivity in remote disaster zones</td>
      <td>Medium</td>
      <td>Medium</td>
      <td>Client-side local storage caching in React frontend allows offline draft capture with automatic sync upon reconnection.</td>
    </tr>
    <tr>
      <td><strong>R07</strong></td>
      <td>Accidental data exposure or credential leaks</td>
      <td>Low</td>
      <td>High</td>
      <td>Stateless JWT token verification on all protected endpoints; BCrypt password hashing; zero secrets committed to Git repositories.</td>
    </tr>
    <tr>
      <td><strong>R08</strong></td>
      <td>Inaccurate or unverified disaster reports submitted from field</td>
      <td>Medium</td>
      <td>High</td>
      <td>Mandatory Tahsildar verification step in Taluk Command Center before incidents can escalate to District EOC.</td>
    </tr>
  </tbody>
</table>

<div class="section-header" style="margin-top: 25px;">14. APPENDIX</div>

<h2>14.1 API Request-Response Samples</h2>

<p><strong>1. Incident Submission (<code>POST /api/v1/incidents</code>)</strong></p>
<div class="code-block">Request Body:
{
  "title": "Severe Waterlogging on Avinashi Road",
  "category": "Flood",
  "severity": "High",
  "district": "Coimbatore",
  "taluk": "Coimbatore South",
  "village": "Peelamedu",
  "description": "Underpass submerged in 4ft water. Traffic halted.",
  "reportedBy": "VEO-COIMBATORESOUTH-1"
}

Response Body (HTTP 200 OK):
{
  "id": "7a89f214-3c4b-4890-a982-1928374650ab",
  "title": "Severe Waterlogging on Avinashi Road",
  "status": "Waiting for Taluk",
  "category": "Flood",
  "severity": "High",
  "reportedAt": "2026-09-20T19:30:00.000Z"
}</div>

<p><strong>2. AI Risk Prediction (<code>POST /ai/predict-risk</code>)</strong></p>
<div class="code-block">Request Body:
{
  "prompt": "Severe waterlogging on Avinashi road underpass 4ft water",
  "language": "en",
  "model": "llama3"
}

Response Body (HTTP 200 OK):
{
  "response": "Analysis complete",
  "data": {
    "severity": "High",
    "spam_check": false,
    "duplicate_check": false,
    "concise_description": "Critical waterlogging reported at Avinashi Road underpass blocking transit.",
    "recommendation": "Deploy emergency pumping units and divert arterial traffic immediately."
  }
}</div>

<div style="margin-top: 35px; border-top: 2px solid #1e3a8a; padding-top: 12px; text-align: center;">
  <strong style="color: #1e3a8a; font-size: 11pt;">END OF SRS DOCUMENT — Version 2.0 (Final Implemented Release)</strong><br>
  <span style="font-size: 9pt; color: #64748b;">ALERT 4.0 GOVERNMENT | Full Stack Java (AI-Integrated) Training Programme | Karpagam College of Engineering</span>
</div>

</body>
</html>`;

  fs.writeFileSync('temp_srs.html', htmlContent);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.resolve('../ALERTGOV_Final_SRS_Document.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully at: ' + pdfPath);
}

generatePDF().catch(console.error);
