const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generate30PageSRS() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>System Requirements Specification - ALERT 4.0 GOVERNMENT</title>
<style>
  @page {
    size: A4 portrait;
    margin: 15mm 15mm 15mm 15mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #1e293b;
    line-height: 1.35;
    font-size: 8.8pt;
    background: #ffffff;
    margin: 0;
    padding: 0;
  }

  .page {
    width: 100%;
    height: 265mm;
    position: relative;
    page-break-after: always;
    break-after: page;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .page-last {
    width: 100%;
    height: 265mm;
    position: relative;
    page-break-after: avoid;
    break-after: avoid;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .page-header-line {
    border-bottom: 1.5px solid #1e3a5f;
    padding-bottom: 4px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    font-size: 7.5pt;
    color: #475569;
  }

  .page-footer-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    font-size: 7.5pt;
    color: #64748b;
  }

  h1.main-title {
    font-size: 20pt;
    font-weight: 800;
    color: #1e3a5f;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 18px;
    margin-bottom: 6px;
  }

  .sub-title {
    font-size: 11pt;
    font-weight: 700;
    color: #0284c7;
    text-align: center;
    margin-bottom: 18px;
  }

  .section-banner {
    background: #1e3a5f;
    color: #ffffff;
    padding: 5px 10px;
    font-size: 10pt;
    font-weight: 700;
    border-radius: 2px;
    margin-top: 6px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 10pt;
    font-weight: 700;
    color: #1e3a5f;
    border-bottom: 1.2px solid #0284c7;
    padding-bottom: 2px;
    margin-top: 8px;
    margin-bottom: 5px;
  }

  h3 {
    font-size: 9pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 6px;
    margin-bottom: 3px;
  }

  p {
    margin-top: 0;
    margin-bottom: 6px;
    text-align: justify;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 6px;
    padding-left: 18px;
  }

  li {
    margin-bottom: 2px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 4px;
    margin-bottom: 8px;
    font-size: 8pt;
  }

  th, td {
    border: 1px solid #94a3b8;
    padding: 4px 6px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #1e3a5f;
    color: #ffffff;
    font-weight: 700;
  }

  .th-sub {
    background: #0284c7;
    color: #ffffff;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  .meta-table th {
    background: #1e3a5f;
    color: #ffffff;
    width: 28%;
    font-size: 8.5pt;
  }

  .meta-table td {
    background: #f1f5f9;
    font-size: 8.5pt;
  }

  .instruction-box {
    background: #fef9c3;
    border-left: 3.5px solid #ca8a04;
    padding: 5px 8px;
    font-size: 7.8pt;
    margin-top: 4px;
    margin-bottom: 8px;
    color: #854d0e;
  }

  .code-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 5px 7px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 7.5pt;
    color: #0f172a;
    white-space: pre-wrap;
    margin-bottom: 6px;
  }

  .arch-box {
    border: 1.5px solid #0284c7;
    background: #f0f9ff;
    padding: 6px 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: 700;
    font-size: 8.2pt;
    margin: 3px 0;
    color: #0369a1;
  }

  .arch-arrow {
    text-align: center;
    color: #0284c7;
    font-size: 9pt;
    font-weight: 900;
    margin: 1px 0;
  }

  .badge {
    display: inline-block;
    padding: 1px 4px;
    font-size: 7pt;
    font-weight: 700;
    border-radius: 2px;
  }
  .badge-blue { background: #e0f2fe; color: #0369a1; }
  .badge-green { background: #dcfce7; color: #15803d; }
  .badge-red { background: #fee2e2; color: #b91c1c; }
  .badge-orange { background: #ffedd5; color: #c2410c; }
</style>
</head>
<body>

<!-- ==================== PAGE 1 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h1 class="main-title">SYSTEM REQUIREMENTS SPECIFICATION</h1>
  <div class="sub-title">Full Stack Java (AI-Integrated) Training Programme</div>

  <table class="meta-table" style="margin-top: 15px;">
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
      <td><strong>Software only (Distributed Microservices Cloud Platform)</strong></td>
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
      <th>Faculty Mentor</th>
      <td><strong>Dr. Arul Antran Vijay S / Dr. Jothi Prakash V / Mr. Jegathesh P / Mr. Navaneetha Krishnan M / Dr. Castro S.</strong></td>
    </tr>
  </table>

  <div class="instruction-box" style="margin-top: 25px;">
    This SRS document outlines the finalized requirements and system specifications for ALERT 4.0 GOVERNMENT post-implementation. Reviewed at the Internal Review (Day 22) and final industry evaluation.
  </div>

  <div class="page-footer-line">
    <span>Page 1 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 2 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">DOCUMENT REVISION HISTORY</div>

  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Version</th>
        <th style="width: 16%;">Date</th>
        <th style="width: 18%;">Author</th>
        <th>Description of Changes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>v1.0</strong></td>
        <td>10.06.2026</td>
        <td>Cognitive Crew</td>
        <td>Initial draft — SRS skeleton completed, domain model and preliminary SIH25_097 requirements mapped.</td>
      </tr>
      <tr>
        <td><strong>v1.1</strong></td>
        <td>15.07.2026</td>
        <td>Cognitive Crew</td>
        <td>Post Internal Review — Architecture expanded to 11 Spring Boot microservices, Oracle Database XE relational schemas, MongoDB multimedia storage, Spring Cloud Gateway, and Eureka discovery.</td>
      </tr>
      <tr>
        <td><strong>v2.0</strong></td>
        <td>20.09.2026</td>
        <td>Cognitive Crew</td>
        <td><strong>Final Implemented Release:</strong> Full integration of bilingual React 19 Frontend with Leaflet GIS maps, Ollama (Llama 3) local AI inference, Open-Meteo weather API with Resilience4j circuit breakers, 5-tier verification pipeline, and dynamic analytics.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 2 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 3 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">1. INTRODUCTION</div>

  <h2>1.1 Purpose</h2>
  <p>
    This System Requirements Specification (SRS) document describes the functional and non-functional requirements for the <strong>ALERT 4.0 GOVERNMENT (AlertGov AI)</strong> system, developed as part of the Smart India Hackathon 2025 submission under Problem Statement <strong>[SIH25_097]</strong>. It is prepared in accordance with IEEE Std 830-1998 and serves as the primary agreement between the development team, mentors, and disaster management stakeholders.
  </p>

  <h2>1.2 Scope</h2>
  <p><strong>System Name:</strong> ALERT 4.0 GOVERNMENT (AlertGov AI)</p>
  <p><strong>What the system does:</strong></p>
  <p>
    ALERT 4.0 GOVERNMENT is an artificial intelligence-integrated, multi-tier disaster management and local language emergency instruction platform designed for the Tamil Nadu Disaster Management Authority (TNDMA). It coordinates emergency response across 5 administrative tiers: Village EOCs (VEO field reporting with GPS coordinates and photographic media), Taluk Command Centers (Tahsildar incident verification queue), District EOCs (DEC interactive GIS mapping and broadcast authoring), District Collectors (executive broadcast approval and escalation governance), and the State Command Center (SDMA 38-district readiness monitoring and resource deployment). The platform integrates a local Ollama LLM (Llama 3) for automated disaster risk assessment and bilingual (English & Tamil தமிழ்) instruction synthesis, alongside Open-Meteo weather telemetry protected by Resilience4j circuit breakers.
  </p>

  <h2>1.3 Definitions, Acronyms & Abbreviations</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Term / Acronym</th>
        <th>Definition</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>SRS</strong></td><td>System Requirements Specification — this document</td></tr>
      <tr><td><strong>SIH</strong></td><td>Smart India Hackathon 2025</td></tr>
      <tr><td><strong>API / REST</strong></td><td>Application Programming Interface / Representational State Transfer architectural style for HTTP APIs</td></tr>
      <tr><td><strong>JWT</strong></td><td>JSON Web Token — used for stateless authentication and Role-Based Access Control (RBAC)</td></tr>
      <tr><td><strong>AI / LLM</strong></td><td>Artificial Intelligence / Large Language Model (Ollama Llama 3 for local bilingual reasoning)</td></tr>
      <tr><td><strong>CRUD</strong></td><td>Create, Read, Update, Delete — basic persistence data operations</td></tr>
      <tr><td><strong>CI/CD</strong></td><td>Continuous Integration / Continuous Deployment — automated build, test, and container release pipeline</td></tr>
      <tr><td><strong>FR / NFR</strong></td><td>Functional Requirement / Non-Functional Requirement</td></tr>
      <tr><td><strong>TTS</strong></td><td>Text-to-Speech — converts emergency alert text into regional voice announcements</td></tr>
      <tr><td><strong>ER</strong></td><td>Entity-Relationship (database design)</td></tr>
      <tr><td><strong>OTP</strong></td><td>One-Time Password — used for secure officer identity verification</td></tr>
      <tr><td><strong>RBAC</strong></td><td>Role-Based Access Control — restricts system views based on administrative jurisdiction</td></tr>
      <tr><td><strong>FastAPI</strong></td><td>Python asynchronous framework used for AI/ML local inference microservices</td></tr>
      <tr><td><strong>Ollama</strong></td><td>Local LLM runtime executing quantized Llama 3 models on edge infrastructure</td></tr>
      <tr><td><strong>Eureka</strong></td><td>Netflix Eureka service discovery server for dynamic microservice registry</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 3 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 4 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>1.4 References</h2>
  <ul>
    <li>IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications</li>
    <li>SIH 2025 Problem Statement — [SIH25_097]: AI-Based Local Language Emergency Instruction Generator (Ministry of Home Affairs)</li>
    <li>Spring Boot 3.2.4 Documentation: <a href="https://docs.spring.io/spring-boot/">https://docs.spring.io/spring-boot/</a></li>
    <li>Spring Cloud 2023.0.1 (Gateway & Eureka): <a href="https://spring.io/projects/spring-cloud">https://spring.io/projects/spring-cloud</a></li>
    <li>React 19 & Vite 8 Documentation: <a href="https://react.dev/">https://react.dev/</a></li>
    <li>FastAPI Documentation: <a href="https://fastapi.tiangolo.com/">https://fastapi.tiangolo.com/</a></li>
    <li>Ollama Local LLM Architecture: <a href="https://ollama.ai/">https://ollama.ai/</a></li>
    <li>Tamil Nadu Disaster Management Authority (TNDMA): <a href="https://tndma.tn.gov.in/">https://tndma.tn.gov.in/</a></li>
    <li>National Disaster Management Authority (NDMA): <a href="https://ndma.gov.in/">https://ndma.gov.in/</a></li>
  </ul>

  <h2>1.5 Document Overview</h2>
  <p>
    Section 2 provides an overall description of the product, including user classes and operating constraints. Section 3 details the layered cloud architecture, 11 Spring Boot microservices, technology stack, and end-to-end data flow. Sections 4 and 5 specify external interfaces and functional requirements in Use Case table format. Section 6 details AI/ML module specifications for LLM disaster analysis and meteorological circuit breakers. Sections 7 through 10 cover non-functional requirements, dual-database design (Oracle XE + MongoDB), API endpoint catalogs, and Docker deployment plans. Section 11 presents the project timeline milestones. Section 12 defines team ownership roles. Section 13 registers risks and mitigations. Section 14 contains the appendix.
  </p>

  <div class="page-footer-line">
    <span>Page 4 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 5 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">2. OVERALL DESCRIPTION</div>

  <h2>2.1 Product Perspective</h2>
  <p>
    ALERT 4.0 GOVERNMENT is a production-grade, standalone Artificial Intelligence-integrated emergency communication and disaster command system created in response to Smart India Hackathon 2025 problem statement <strong>"AI Based Local Language Emergency Instruction Generator (SIH25_097)"</strong>.
  </p>
  <p>
    The system addresses the acute need for rapid, multilingual, and localized disaster communication during floods, cyclones, industrial fires, earthquakes, and meteorological crises across Tamil Nadu. Rather than acting as a disjointed alert tool, ALERT 4.0 provides a full-stack, 5-tier command network interfacing directly with:
  </p>
  <ul>
    <li><strong>State Disaster Management Authority (SDMA):</strong> Statewide oversight across 38 districts and emergency asset logistics.</li>
    <li><strong>District Collectorates & Emergency Operation Centers (DEOC):</strong> Executive broadcast authorizations, GIS heatmaps, and shelter coordination.</li>
    <li><strong>Taluk Command Centers (Tahsildar):</strong> Ground verification queue, false-alarm filtering, and AI severity rating.</li>
    <li><strong>Village EOCs (VEO):</strong> Immediate field reporting with photo evidence, GPS geotagging, and emergency logging.</li>
    <li><strong>Public Channels:</strong> Citizen-friendly SMS, WhatsApp, voice announcements, and web emergency broadcasts in English and Tamil (தமிழ்).</li>
  </ul>

  <h2>2.2 Product Functions — Feature Summary (1 to 7)</h2>
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
        <td>1</td>
        <td><strong>Field Incident Reporting</strong></td>
        <td>Allows Village Officers (VEO) to submit ground emergencies with category, initial severity, GPS coordinates, and photo evidence.</td>
      </tr>
      <tr>
        <td>2</td>
        <td><strong>AI Risk & Severity Evaluation</strong></td>
        <td>Ollama (Llama 3) LLM analyzes disaster reports, checks spam/duplicates, computes severity ratings, and synthesizes bilingual actions.</td>
      </tr>
      <tr>
        <td>3</td>
        <td><strong>Taluk Incident Verification</strong></td>
        <td>Enables Tahsildars to review incoming village incidents, verify ground evidence, and forward to District, reject, or escalate to Collector.</td>
      </tr>
      <tr>
        <td>4</td>
        <td><strong>District Interactive GIS Mapping</strong></td>
        <td>Interactive Leaflet.js map plotting incident coordinates, affected radius zones, nearby hospitals, relief shelters, and schools.</td>
      </tr>
      <tr>
        <td>5</td>
        <td><strong>Emergency Alert Broadcasting</strong></td>
        <td>Allows District EOC officers to author targeted emergency broadcasts with bilingual translation preview and zone-level filters.</td>
      </tr>
      <tr>
        <td>6</td>
        <td><strong>Collector Executive Approval</strong></td>
        <td>Provides District Collectors with approval controls to authorize high-impact emergency broadcasts and review critical escalations.</td>
      </tr>
      <tr>
        <td>7</td>
        <td><strong>Live Weather Threat Advisory</strong></td>
        <td>Integrates Open-Meteo live meteorological telemetry with Resilience4j circuit breakers for automated weather threat detection.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 5 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 6 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>2.2 Product Functions — Feature Summary (8 to 12)</h2>
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
        <td>8</td>
        <td><strong>State 38-District Monitor</strong></td>
        <td>Displays real-time readiness status, active incidents, and emergency metrics across all 38 revenue districts of Tamil Nadu.</td>
      </tr>
      <tr>
        <td>9</td>
        <td><strong>State Resource Allocation</strong></td>
        <td>Tracks and coordinates deployment of emergency assets (Fire Trucks, Rescue Boats, Police Squads, Ambulances) to disaster zones.</td>
      </tr>
      <tr>
        <td>10</td>
        <td><strong>Dynamic Analytics & Charts</strong></td>
        <td>Renders live Recharts visualizations (Incident by Category, Severity Distribution, Response Time Trends, and 7-Day Volume).</td>
      </tr>
      <tr>
        <td>11</td>
        <td><strong>Bilingual Localization (EN / TA)</strong></td>
        <td>Seamless real-time translation between English and native Tamil (தமிழ்) across all UI dashboards, notifications, and reports.</td>
      </tr>
      <tr>
        <td>12</td>
        <td><strong>Official PDF Report Export</strong></td>
        <td>Generates downloadable, government-formatted PDF incident verification sheets and district analytics executive reports.</td>
      </tr>
    </tbody>
  </table>

  <h2>2.3 User Classes and Characteristics</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">User Role</th>
        <th style="width: 28%;">Description</th>
        <th style="width: 12%;">Technical Skill</th>
        <th style="width: 25%;">Primary Actions</th>
        <th>Access Level</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Village Officer (VEO)</strong></td>
        <td>Ground field officer at village post.</td>
        <td>Low–Med</td>
        <td>Report incident, upload photos, capture GPS.</td>
        <td><span class="badge badge-blue">Village Level</span></td>
      </tr>
      <tr>
        <td><strong>Taluk Tahsildar</strong></td>
        <td>Administrative head of taluk jurisdiction.</td>
        <td>Medium</td>
        <td>Verify queue, inspect AI analysis, forward/escalate.</td>
        <td><span class="badge badge-green">Taluk Level</span></td>
      </tr>
      <tr>
        <td><strong>District EOC (DEC)</strong></td>
        <td>District emergency controller.</td>
        <td>Medium</td>
        <td>GIS map monitor, draft broadcasts, track resources.</td>
        <td><span class="badge badge-orange">District Level</span></td>
      </tr>
      <tr>
        <td><strong>District Collector</strong></td>
        <td>Chief administrative district magistrate.</td>
        <td>Medium</td>
        <td>Authorize broadcasts, review critical escalations.</td>
        <td><span class="badge badge-red">Collector Approval</span></td>
      </tr>
      <tr>
        <td><strong>State Admin (SDMA)</strong></td>
        <td>State Disaster Management Authority.</td>
        <td>High</td>
        <td>38-district monitoring, resource deployment.</td>
        <td><span class="badge badge-red">State Full Admin</span></td>
      </tr>
      <tr>
        <td><strong>AI Processing Engine</strong></td>
        <td>System microservice (FastAPI + Ollama).</td>
        <td>System</td>
        <td>NLP risk scoring, spam check, weather alerts.</td>
        <td><span class="badge badge-blue">System Service</span></td>
      </tr>
    </tbody>
  </table>

  <h2>2.4 Operating Environment</h2>
  <table>
    <tbody>
      <tr><th style="width: 25%;">Server / Cloud</th><td>Docker Containers (11 Spring Boot Microservices + FastAPI AI + Oracle XE + MongoDB)</td></tr>
      <tr><th>Operating System</th><td>Ubuntu 22.04 LTS (Server) / Windows 11 & macOS (Developer Workstations)</td></tr>
      <tr><th>Backend Runtime</th><td>Java 17 LTS / Spring Boot 3.2.4 & Spring Cloud 2023.0.1</td></tr>
      <tr><th>Frontend Runtime</th><td>React 19 / Vite 8 / Node.js 24 (Build Environment)</td></tr>
      <tr><th>Databases</th><td>Oracle Database XE 11g/21c (Relational) + MongoDB 6.0+ (Document/Media)</td></tr>
      <tr><th>AI/ML Runtime</th><td>Python 3.13 / FastAPI / Ollama (Llama 3 8B) / Requests / Pydantic / Uvicorn</td></tr>
      <tr><th>Client Browser</th><td>Google Chrome 100+, Firefox 100+, Safari 15+, Edge (Responsive viewport &ge; 375px)</td></tr>
      <tr><th>Network</th><td>HTTPS (TLS 1.3), REST over HTTP, Eureka Discovery (Port 8761)</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 6 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 7 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>2.5 Design and Implementation Constraints</h2>
  <ul>
    <li>All backend microservices must be implemented in Java 17 using Spring Boot 3.2.4 and Spring Data JPA.</li>
    <li>All frontend interfaces must be built using React 19, Vite 8, React Router 7, and a vanilla CSS design system.</li>
    <li>Authentication and authorization must use stateless JWT (JSON Web Tokens) with BCrypt password hashing (cost factor 10).</li>
    <li>All services must be containerized using Docker and orchestratable via a unified <code>docker-compose.yml</code>.</li>
    <li>All AI/ML model inference must be encapsulated in a Python FastAPI microservice exposed on port 8000.</li>
    <li>The system must natively support bilingual disaster operations in English and Tamil (தமிழ்).</li>
    <li>External third-party weather integrations must be wrapped in Resilience4j CircuitBreakers with local fallback logic.</li>
    <li>Critical emergency alerts must require two-tier administrative verification and District Collector authorization.</li>
    <li>Relational transactional data must reside in Oracle Database XE, while photographic evidence is saved in MongoDB.</li>
    <li>The system must be fully deployable and demonstrable on local developer hardware for hackathon evaluation.</li>
  </ul>

  <h2>2.6 Assumptions and Dependencies</h2>
  <p><strong>Assumptions:</strong></p>
  <ul>
    <li>Village, Taluk, and District emergency officers have access to a desktop or mobile device with network connectivity.</li>
    <li>Field officers capture photographic evidence in standard web formats (JPEG/PNG) with active GPS sensors.</li>
    <li>The local Ollama server is running locally on port 11434 with the <code>llama3</code> model pulled into cache.</li>
    <li>Emergency alert data entered by authorized officers is verified by Tahsildars before public broadcast.</li>
  </ul>
  <p><strong>Dependencies:</strong></p>
  <ul>
    <li><strong>Open-Meteo API:</strong> Provides live meteorological data (temperature, precipitation, wind speed) for Tamil Nadu coordinates.</li>
    <li><strong>Ollama Runtime:</strong> Executes local Llama 3 LLM inference for text simplification, risk scoring, and Tamil script synthesis.</li>
    <li><strong>Leaflet.js & OpenStreetMap:</strong> Delivers interactive raster map tiles for GIS disaster tracking without API keys.</li>
    <li><strong>Oracle Database XE Driver (ojdbc11):</strong> Enables high-performance JDBC connectivity for relational transactions.</li>
    <li><strong>MongoDB Java Driver:</strong> Provides document persistence for large Base64 photographic evidence files.</li>
  </ul>

  <div class="page-footer-line">
    <span>Page 7 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 8 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">3. SYSTEM ARCHITECTURE</div>

  <h2>3.1 High-Level Architecture Description</h2>
  <div class="arch-box">[ PRESENTATION LAYER ] React 19 SPA &bull; Leaflet GIS Maps &bull; Recharts &bull; Bilingual UI (EN / TA)</div>
  <div class="arch-arrow">&darr; REST / HTTPS</div>
  <div class="arch-box" style="background:#e0e7ff; color:#4338ca; border-color:#4f46e5;">[ GATEWAY LAYER ] Spring Cloud Gateway (Port 8081) &bull; JWT Auth Filter &bull; CORS &bull; lb:// Routing</div>
  <div class="arch-arrow">&darr; Service Registration & Discovery</div>
  <div class="arch-box" style="background:#fef3c7; color:#b45309; border-color:#d97706;">[ SERVICE DISCOVERY & CONFIG ] Netflix Eureka (Port 8761) &bull; Spring Cloud Config (Port 8888)</div>
  <div class="arch-arrow">&darr; Inter-Service REST</div>
  <div class="arch-box" style="background:#ecfdf5; color:#047857; border-color:#059669;">
    [ CORE MICROSERVICES ] auth-service (8082) &bull; user-service (8083) &bull; incident-service (8084) &bull; alert-service (8085)<br>
    approval-service (8086) &bull; notification-service (8087) &bull; analytics-service (8088) &bull; ai-service (8089)
  </div>
  <div class="arch-arrow">&darr; AI Inference & Persistence</div>
  <div class="arch-box" style="background:#fae8ff; color:#7e22ce; border-color:#a855f7;">[ DATA & AI LAYER ] Python FastAPI AI (Port 8000 + Ollama) &bull; Oracle Database XE (1521) &bull; MongoDB (27017)</div>

  <h2>3.2 Microservices Breakdown (Services 1 to 8)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 22%;">Microservice Name</th>
        <th style="width: 8%;">Port</th>
        <th style="width: 15%;">Database</th>
        <th>Responsibility</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><strong>api-gateway</strong></td>
        <td>8081</td>
        <td>—</td>
        <td>Central gateway router, CORS configuration, JWT token filter, load-balanced dispatch.</td>
      </tr>
      <tr>
        <td>2</td>
        <td><strong>discovery-server</strong></td>
        <td>8761</td>
        <td>—</td>
        <td>Netflix Eureka Server for dynamic service registration and heartbeat health checks.</td>
      </tr>
      <tr>
        <td>3</td>
        <td><strong>config-server</strong></td>
        <td>8888</td>
        <td>—</td>
        <td>Spring Cloud centralized properties and configuration management server.</td>
      </tr>
      <tr>
        <td>4</td>
        <td><strong>auth-service</strong></td>
        <td>8082</td>
        <td>Oracle XE</td>
        <td>User registration, login, BCrypt password hashing, JWT issue, and token verification.</td>
      </tr>
      <tr>
        <td>5</td>
        <td><strong>user-service</strong></td>
        <td>8083</td>
        <td>Oracle XE</td>
        <td>Officer profile management, role assignment, and district/taluk geographical reference data.</td>
      </tr>
      <tr>
        <td>6</td>
        <td><strong>incident-service</strong></td>
        <td>8084</td>
        <td>Oracle XE + Mongo</td>
        <td>Full incident reporting lifecycle, verification updates, and photo media storage in MongoDB.</td>
      </tr>
      <tr>
        <td>7</td>
        <td><strong>alert-service</strong></td>
        <td>8085</td>
        <td>Oracle XE</td>
        <td>Emergency alert authoring, zone targeting, severity tagging, and bilingual translations.</td>
      </tr>
      <tr>
        <td>8</td>
        <td><strong>approval-service</strong></td>
        <td>8086</td>
        <td>Oracle XE</td>
        <td>Multi-tier approval workflows (Taluk &rarr; District &rarr; Collector), decision logging, and audit tracking.</td>
      </tr>
    </tbody>
  </table>

  <h2>3.3 Technology Stack (Frontend)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Layer</th>
        <th style="width: 30%;">Technology</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Frontend Framework</td><td>React 19 + Vite 8 + React Router 7</td><td>High-performance Single Page Application with dynamic role-based routing.</td></tr>
      <tr><td>GIS & Mapping</td><td>Leaflet.js + React-Leaflet</td><td>Interactive maps displaying incident pins, danger radii, and relief centers.</td></tr>
      <tr><td>Data Visualization</td><td>Recharts 3.9</td><td>Interactive pie charts, area charts, and bar charts for disaster metrics.</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 8 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 9 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>3.3 Technology Stack (Backend, Databases, AI, DevOps)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Layer</th>
        <th style="width: 30%;">Technology</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Backend Framework</td><td>Spring Boot 3.2.4 + Spring Data JPA</td><td>RESTful microservices with Hibernate ORM and HikariCP pooling.</td></tr>
      <tr><td>Authentication</td><td>Spring Security + JWT (jjwt 0.11.5)</td><td>Stateless Role-Based Access Control and Bearer token validation.</td></tr>
      <tr><td>Service Discovery</td><td>Netflix Eureka Server</td><td>Dynamic microservice registration, heartbeat monitoring, and discovery.</td></tr>
      <tr><td>API Gateway</td><td>Spring Cloud Gateway</td><td>Centralized reverse proxy, global CORS, and load-balanced routing.</td></tr>
      <tr><td>Relational DB</td><td>Oracle Database XE 11g / 21c</td><td>ACID-compliant storage for users, incident metadata, alerts, and approvals.</td></tr>
      <tr><td>Document DB</td><td>MongoDB 6.0+ / Atlas</td><td>High-capacity unstructured persistence for incident photos and evidence.</td></tr>
      <tr><td>AI/ML Runtime</td><td>Python 3.13 + FastAPI + Uvicorn</td><td>Asynchronous model serving REST API for Ollama LLM inference.</td></tr>
      <tr><td>AI Inference Engine</td><td>Ollama (Meta Llama 3 8B)</td><td>Local LLM disaster classification, spam detection, and Tamil synthesis.</td></tr>
      <tr><td>Fault Tolerance</td><td>Resilience4j CircuitBreaker & TimeLimiter</td><td>Protects AI weather endpoints with automated fallback responses.</td></tr>
      <tr><td>Build Tool</td><td>Apache Maven 3.9.6</td><td>Multi-module dependency management and build packaging.</td></tr>
      <tr><td>Containerization</td><td>Docker & Docker Compose</td><td>Unified multi-container deployment across environments.</td></tr>
    </tbody>
  </table>

  <h2>3.4 Hardware Component Specification</h2>
  <p><strong>Status:</strong> <em>Not Applicable (Software-Only Enterprise Web Platform).</em></p>

  <h2>3.5 Data Flow Description (Steps 1 to 4)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 8%;">Step</th>
        <th>Data Flow Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Village Officer (VEO) captures incident details (photo, GPS, category) in React UI. Axios dispatches a <code>POST /api/v1/incidents</code> multipart request to API Gateway (Port 8081).</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Spring Cloud Gateway validates JWT bearer token, checks VEO role permissions, and routes the request to <code>incident-service</code> via Eureka load balancing (<code>lb://incident-service</code>).</td>
      </tr>
      <tr>
        <td>3</td>
        <td><code>incident-service</code> stores structured metadata in Oracle XE (<code>INCIDENT_REPORTS</code>) and saves the Base64 photo in MongoDB (<code>INCIDENT_MEDIA</code>). It triggers a notification to the Taluk Tahsildar.</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Taluk Tahsildar opens the verification queue. <code>ai-service</code> invokes the Python FastAPI endpoint (<code>POST http://localhost:8000/ai/predict-risk</code>). Ollama Llama 3 executes risk scoring and returns structured bilingual recommendations.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 9 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 10 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>3.5 Data Flow Description (Steps 5 to 8)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 8%;">Step</th>
        <th>Data Flow Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>5</td>
        <td>Tahsildar reviews AI insights and clicks "Verify & Forward to District". <code>incident-service</code> updates the status in Oracle XE to <code>Taluk Verified</code>. <code>LiveContext</code> triggers real-time state synchronization across all connected dashboards.</td>
      </tr>
      <tr>
        <td>6</td>
        <td>District EOC Officer views the verified incident plotted on the Leaflet GIS interactive map, coordinates local response units, and drafts an emergency broadcast via <code>POST /api/v1/alerts</code>.</td>
      </tr>
      <tr>
        <td>7</td>
        <td>District Collector reviews the broadcast request in the Collector Portal and authorizes dissemination. <code>approval-service</code> records the approval, and <code>notification-service</code> dispatches alerts across public feeds.</td>
      </tr>
      <tr>
        <td>8</td>
        <td>State Command Center (SDMA) receives aggregated incident telemetry, updating the statewide 38-district readiness matrix, resource registries, and analytical charts in real-time.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 10 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 11 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">4. EXTERNAL INTERFACE REQUIREMENTS</div>

  <h2>4.1 User Interfaces (Screens 1 to 6)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 25%;">Screen / Page</th>
        <th style="width: 15%;">User Role</th>
        <th>Description & Key Elements</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><strong>Login & Quick Role Switcher</strong></td>
        <td>All Users</td>
        <td>Authentication form with username/password, quick-login role selector buttons for rapid evaluation, and JWT token storage in <code>localStorage</code>.</td>
      </tr>
      <tr>
        <td>2</td>
        <td><strong>Village Field Incident Reporting</strong></td>
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
        <td>Split-view layout: Left panel shows incident details, reporter info, and Leaflet map; Right panel displays Ollama AI risk analysis and decision action buttons (Verify, Reject, Escalate).</td>
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
    </tbody>
  </table>

  <h2>4.2 Hardware Interfaces</h2>
  <p><strong>Status:</strong> <em>Not Applicable (Software-Only System).</em></p>

  <h2>4.3 Software Interfaces — Third-Party APIs</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">API / Service</th>
        <th style="width: 18%;">Provider</th>
        <th style="width: 18%;">Auth Method</th>
        <th>Purpose in This Project</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Ollama LLM API</strong></td><td>Local Ollama Server</td><td>None (Localhost:11434)</td><td>Executes Llama 3 model inference for disaster classification, spam checks, and bilingual text synthesis.</td></tr>
      <tr><td><strong>Open-Meteo Weather API</strong></td><td>Open-Meteo</td><td>None required</td><td>Supplies live temperature, precipitation, and wind speeds for Tamil Nadu districts with Resilience4j fallback.</td></tr>
      <tr><td><strong>Leaflet / OpenStreetMap</strong></td><td>OSM Foundation</td><td>None required</td><td>Interactive raster tile maps for GIS visualization and infrastructure mapping.</td></tr>
      <tr><td><strong>MongoDB Atlas</strong></td><td>MongoDB Inc.</td><td>URI String</td><td>Cloud document persistence for incident media attachments and photographic evidence.</td></tr>
    </tbody>
  </table>

  <h2>4.4 Communication Interfaces</h2>
  <ul>
    <li>REST over HTTPS (TLS 1.3) — all client-server and inter-service communication.</li>
    <li>Netflix Eureka Client Protocol — service heartbeats and discovery lookups over HTTP.</li>
  </ul>

  <div class="page-footer-line">
    <span>Page 11 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 12 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>4.4 Communication Interfaces (Continued)</h2>
  <ul>
    <li>JWT in Authorization header (<code>Bearer &lt;token&gt;</code>) — stateless authentication across all protected microservice routes.</li>
    <li>JSON (application/json) — standard serialization format for all request bodies, responses, and AI payloads.</li>
    <li>Multipart/Form-Data — used for binary photo evidence uploads in <code>incident-service</code>.</li>
  </ul>

  <div class="page-footer-line">
    <span>Page 12 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 13 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">5. FUNCTIONAL REQUIREMENTS</div>

  <h2>5.1 Alert Management & Incident Service — Functional Requirements</h2>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-ALR-001</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Emergency Alert Creation & Bilingual Broadcast</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">District EOC Officer (DEC)</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall allow authorized DEC officers to draft emergency alert broadcasts by specifying disaster type, targeted district/taluks, severity level, title, and instructions in English and Tamil.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">The officer is authenticated with DEC role. The targeted administrative zones exist in Oracle XE.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Officer navigates to "Alert Broadcast" page. 2. Enters alert details (Category, Zone, Severity, Message). 3. System generates bilingual Tamil preview. 4. Officer reviews and submits for Collector approval. 5. Status set to <code>PENDING_APPROVAL</code>.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: Mandatory field missing &rarr; Display validation error and prevent submission. AF2: Invalid zone selected &rarr; Display "Selected zone does not exist."</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">Alert record created in Oracle XE; approval workflow item queued for District Collector.</td>
    </tr>
  </table>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-ALR-002</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Collector Broadcast Authorization</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">District Collector</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall allow District Collectors to review, authorize, modify, or reject pending emergency broadcast requests before public dissemination.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">Broadcast workflow item exists with status <code>PENDING_APPROVAL</code>.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Collector views pending approvals in Collector Portal. 2. Reviews broadcast content and affected zones. 3. Clicks "Authorize". 4. System updates status to <code>APPROVED</code> and triggers dissemination.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: Collector rejects alert &rarr; Status updated to <code>REJECTED</code> with rejection reason logged.</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">Alert is published across public feeds and notification channels.</td>
    </tr>
  </table>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-ALR-003</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Alert History & Audit Log Management</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">Emergency Officer, Administrator</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall maintain an immutable chronological history of all alerts created, verified, approved, rejected, and dispatched.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">Alert records exist in Oracle Database XE.</td>
    </tr>
  </table>

  <div class="page-footer-line">
    <span>Page 13 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 14 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <table>
    <tr>
      <th style="width: 20%;">Main Flow</th>
      <td colspan="3">1. User opens Alert History. 2. System retrieves stored alerts from <code>alert-service</code>. 3. System displays historical records with timestamp and approval status.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: No records found &rarr; Display "No alerts recorded for this period."</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">Historical alert audit information is rendered on the client dashboard.</td>
    </tr>
  </table>

  <h2>5.2 AI Processing Service — Functional Requirements</h2>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-AI-001</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>AI Risk & Severity Classification</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">Emergency Officer, Taluk Tahsildar</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall generate AI-based risk severity ratings and formal administrative summaries from raw field disaster notes using local Ollama LLMs.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">Incident description entered; <code>alertgov-ai</code> service operational on port 8000.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Incident opened in verification queue. 2. <code>ai-service</code> posts prompt to FastAPI. 3. Ollama Llama 3 analyzes text. 4. Returns JSON with severity, summary, and response advice. 5. Results rendered in Tahsildar UI.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: Ollama service timeout (&gt;5s) &rarr; Execute heuristic rule-based fallback and return standard disaster recommendation.</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">AI risk predictions stored in <code>AI_PREDICTIONS</code> table and displayed to officer.</td>
    </tr>
  </table>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-AI-002</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Spam & Duplicate Incident Detection</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">AI Processing Engine (System)</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall analyze incoming incident reports for duplicate reporting within the same geospatial cluster and flag potential spam or hoax submissions.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">Incident report received by <code>incident-service</code>.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Incident content evaluated by NLP classifier. 2. <code>spam_check</code> and <code>duplicate_check</code> boolean flags computed. 3. Flagged incidents marked for high-priority officer scrutiny.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: AI service unreachable &rarr; Default flags to <code>false</code> and prompt for manual verification.</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">Verification flags attached to incident metadata.</td>
    </tr>
  </table>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-AI-003</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Bilingual Tamil / English Synthesis</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">Emergency Officer</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall synthesize clear, citizen-friendly emergency instructions in native Tamil (தமிழ்) and English scripts.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">Target language parameter (<code>en</code> or <code>ta</code>) specified in request.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Officer triggers bilingual generation. 2. System prompts Ollama model with Tamil script constraints. 3. Generates concise Tamil instructions. 4. Displayed on alert broadcast form.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: Translation fails &rarr; Provide default pre-compiled bilingual template text.</td>
    </tr>
  </table>

  <div class="page-footer-line">
    <span>Page 14 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 15 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <table>
    <tr>
      <th style="width: 20%;">Post-condition</th>
      <td colspan="3">Bilingual emergency instruction cached and attached to broadcast record.</td>
    </tr>
  </table>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-AI-004</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Live Meteorological Weather Advisory & CircuitBreaker</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">AI Processing Engine, State/Collector Dashboard</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall query Open-Meteo API for real-time Tamil Nadu meteorological telemetry (temperature, rainfall, wind) and evaluate thresholds with Resilience4j circuit breaker protection.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3"><code>ai-service</code> operational; Open-Meteo endpoint accessible.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Dashboard requests <code>/api/v1/ai/weather-advisory</code>. 2. <code>ai-service</code> fetches Open-Meteo telemetry. 3. Evaluates weather thresholds (Rain &gt; 10mm &rarr; Red Alert; Wind &gt; 40km/h &rarr; Cyclone Alert). 4. Returns advisory.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: Open-Meteo fails or times out (&gt;3s) &rarr; Resilience4j triggers <code>weatherAdvisoryFallback()</code> returning seasonal Tamil Nadu weather advisory with 85% confidence score.</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">Weather alert rendered on State, Collector, and Taluk daily brief banners.</td>
    </tr>
  </table>

  <h2>5.3 Notification & Incident Verification — Functional Requirements</h2>

  <table>
    <tr>
      <th style="width: 20%;">FR ID</th>
      <td><strong>FR-INC-001</strong></td>
      <th style="width: 20%;">FR Name</th>
      <td><strong>Multi-Tier Incident Status Lifecycle Management</strong></td>
    </tr>
    <tr>
      <th>Actor(s)</th>
      <td colspan="3">Village Officer, Tahsildar, District EOC, Collector</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="3">The system shall manage the full incident lifecycle across states: <code>Waiting for Taluk</code> &rarr; <code>Taluk Verified</code> &rarr; <code>Waiting for Collector</code> &rarr; <code>Resolved</code> with instant WebSocket / LiveContext synchronization.</td>
    </tr>
    <tr>
      <th>Pre-condition</th>
      <td colspan="3">Incident exists in Oracle Database XE.</td>
    </tr>
    <tr>
      <th>Main Flow</th>
      <td colspan="3">1. Officer performs verification action in UI. 2. Calls <code>PUT /api/v1/incidents/{id}/status</code>. 3. <code>incident-service</code> updates status in Oracle XE. 4. Triggers <code>refreshData()</code> across frontend contexts.</td>
    </tr>
    <tr>
      <th>Alternate Flow</th>
      <td colspan="3">AF1: Database connectivity error &rarr; Return HTTP 500 and display rollback alert to user.</td>
    </tr>
    <tr>
      <th>Post-condition</th>
      <td colspan="3">Incident status updated; reflected immediately on Taluk Command Center, District GIS, and State Dashboard.</td>
    </tr>
  </table>

  <div class="page-footer-line">
    <span>Page 15 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 16 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">6. AI / ML MODULE SPECIFICATION</div>

  <h2>6.1 AI Module 1 — Local LLM Disaster Risk & Bilingual Instruction Generator</h2>
  <table>
    <tbody>
      <tr>
        <th style="width: 25%;">Module Name</th>
        <td><strong>Ollama Llama 3 Disaster Risk & Bilingual Instruction Generator</strong></td>
      </tr>
      <tr>
        <th>AI Phase</th>
        <td>Phase 1 (Plan) &rarr; Phase 2 (Prototype) &rarr; Phase 3 (Build) &rarr; Phase 4 (Integrate) &rarr; Phase 5 (Deploy) &rarr; Phase 6 (Present) [Complete]</td>
      </tr>
      <tr>
        <th>Problem AI Solves</th>
        <td>Automates incident classification and risk scoring from unstructured ground reports; generates formal summaries and citizen-friendly emergency instructions in English and Tamil (தமிழ்).</td>
      </tr>
      <tr>
        <th>Input Data</th>
        <td>JSON payload: <code>{ "prompt": "Flooding reported near KCE College campus...", "language": "en" | "ta", "model": "llama3" }</code></td>
      </tr>
      <tr>
        <th>Output / Prediction</th>
        <td>Structured JSON: <code>{ "severity": "High", "spam_check": false, "duplicate_check": false, "concise_description": "...", "recommendation": "..." }</code></td>
      </tr>
      <tr>
        <th>Algorithm / Model</th>
        <td>Meta Llama 3 (8B Parameter) instruction model executed on local Ollama runtime + rule-based NLP fallback engine.</td>
      </tr>
      <tr>
        <th>Training / Base Model</th>
        <td>Meta Llama 3 8B Instruct (Quantized GGUF 4-bit) specialized via system prompts for disaster triage.</td>
      </tr>
      <tr>
        <th>Implementation</th>
        <td>Python 3.13 + FastAPI + Uvicorn + Pydantic response models on port 8000.</td>
      </tr>
      <tr>
        <th>Integration Point</th>
        <td><code>POST http://localhost:8000/ai/predict-risk</code> &rarr; Invoked by Spring Boot <code>ai-service</code> (Port 8089) via <code>RestTemplate</code>.</td>
      </tr>
      <tr>
        <th>Expected Metric</th>
        <td>Severity classification accuracy &gt; 92% on disaster triage evaluation benchmark. Response latency &lt; 3.5 seconds.</td>
      </tr>
      <tr>
        <th>Fallback if AI fails</th>
        <td>If Ollama is offline or times out (&gt;5s), FastAPI executes built-in heuristic pattern matching to compute severity and fallback recommendations.</td>
      </tr>
      <tr>
        <th>AI Ethical Considerations</th>
        <td><strong>Human-in-the-Loop:</strong> AI assessments are advisory. Tahsildars and Collectors retain final authority to modify severity ratings.</td>
      </tr>
      <tr>
        <th>Sprint Target</th>
        <td>Week 3-4: Standalone prototype | Week 5-6: Backend service | Week 7: React UI integrated | Week 8: End-to-end verified.</td>
      </tr>
    </tbody>
  </table>

  <h2>6.2 AI Module 2 — Resilience4j Automated Meteorological Threat Assessment</h2>
  <table>
    <tbody>
      <tr>
        <th style="width: 25%;">Module Name</th>
        <td><strong>Resilience4j Automated Meteorological Threat Assessment Engine</strong></td>
      </tr>
      <tr>
        <th>AI Phase</th>
        <td>Phase 1 (Plan) &rarr; Phase 2 (Prototype) &rarr; Phase 3 (Build) &rarr; Phase 4 (Integrate) &rarr; Phase 5 (Deploy) &rarr; Phase 6 (Present) [Complete]</td>
      </tr>
      <tr>
        <th>Problem AI Solves</th>
        <td>Proactively detects emerging meteorological disasters (heatwaves, flash floods, cyclones) by analyzing live Open-Meteo atmospheric telemetry.</td>
      </tr>
      <tr>
        <th>Input Data</th>
        <td>Live REST telemetry from Open-Meteo: latitude 13.0827, longitude 80.2707 (temperature_2m, precipitation, wind_speed_10m).</td>
      </tr>
      <tr>
        <th>Output / Prediction</th>
        <td>JSON advisory: warning type (<code>Heavy Rain / Red Alert</code>, <code>High Winds / Cyclone Alert</code>, <code>Heat Wave / Orange Alert</code>), confidence score (96%), and action recommendation.</td>
      </tr>
      <tr>
        <th>Algorithm / Model</th>
        <td>Meteorological threshold rule engine with Resilience4j CircuitBreaker (sliding window size 10, failure threshold 50%).</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 16 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 17 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>6.2 AI Module 2 (Continued)</h2>
  <table>
    <tbody>
      <tr>
        <th style="width: 25%;">Implementation</th>
        <td>Spring Boot <code>ai-service</code> (Port 8089) utilizing <code>resilience4j-spring-boot3</code> and <code>RestTemplate</code>.</td>
      </tr>
      <tr>
        <th>Integration Point</th>
        <td><code>GET /api/v1/ai/weather-advisory</code> &rarr; Consumed by React <code>LiveContext</code> and rendered in State/Collector/Taluk daily brief banners.</td>
      </tr>
      <tr>
        <th>Expected Metric</th>
        <td>Telemetry fetch latency &lt; 800ms. 100% uptime through circuit breaker fallback.</td>
      </tr>
      <tr>
        <th>Fallback if AI fails</th>
        <td>If Open-Meteo API fails or times out (&gt;3s), Resilience4j automatically triggers <code>weatherAdvisoryFallback()</code> returning seasonal Tamil Nadu advisory.</td>
      </tr>
      <tr>
        <th>AI Ethical Considerations</th>
        <td>Thresholds are strictly calibrated to official Indian Meteorological Department (IMD) standards.</td>
      </tr>
      <tr>
        <th>Sprint Target</th>
        <td>Week 4: Weather API integration | Week 5: Circuit breaker implementation | Week 7: UI banner integration | Week 8: Production tested.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 17 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 18 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">7. NON-FUNCTIONAL REQUIREMENTS</div>

  <table>
    <thead>
      <tr>
        <th style="width: 14%;">NFR ID</th>
        <th style="width: 15%;">Category</th>
        <th style="width: 20%;">NFR Name</th>
        <th>Measurable Requirement</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>NFR-PERF-001</strong></td>
        <td>Performance</td>
        <td>API Response Time</td>
        <td>All Spring Boot REST API endpoints must return responses within &lt; 500ms for standard database queries under normal load (up to 100 concurrent officers).</td>
      </tr>
      <tr>
        <td><strong>NFR-PERF-002</strong></td>
        <td>Performance</td>
        <td>AI Inference Speed</td>
        <td>Local Ollama LLM risk predictions must complete within &lt; 3.5 seconds. Rule-based fallback inferences must complete in &lt; 50ms.</td>
      </tr>
      <tr>
        <td><strong>NFR-PERF-003</strong></td>
        <td>Performance</td>
        <td>Dashboard Load Time</td>
        <td>The React 19 dashboards with Leaflet GIS maps and Recharts must fully render in &lt; 1.5 seconds on standard broadband / 4G connections.</td>
      </tr>
      <tr>
        <td><strong>NFR-SEC-001</strong></td>
        <td>Security</td>
        <td>Stateless JWT Auth</td>
        <td>All non-public endpoints must require a signed JWT token in the <code>Authorization: Bearer</code> header. Tokens expire in 24 hours.</td>
      </tr>
      <tr>
        <td><strong>NFR-SEC-002</strong></td>
        <td>Security</td>
        <td>Password Storage</td>
        <td>All passwords must be hashed using BCrypt with minimum cost factor 10. Plaintext passwords must never be logged or stored.</td>
      </tr>
      <tr>
        <td><strong>NFR-SEC-003</strong></td>
        <td>Security</td>
        <td>Input Validation</td>
        <td>All user inputs must be validated server-side using Spring Validation (<code>@Valid</code>, <code>@NotNull</code>). SQL injection and XSS prevented via Hibernate ORM parameterization.</td>
      </tr>
      <tr>
        <td><strong>NFR-SEC-004</strong></td>
        <td>Security</td>
        <td>Data Encryption at Rest</td>
        <td>Sensitive user credentials and database records stored in Oracle Database XE and MongoDB must use AES-256 encrypted tablespaces.</td>
      </tr>
      <tr>
        <td><strong>NFR-SCAL-001</strong></td>
        <td>Scalability</td>
        <td>Concurrent Users</td>
        <td>The system must support a minimum of 100 concurrent emergency officers without performance degradation, scalable via Docker container replicas.</td>
      </tr>
      <tr>
        <td><strong>NFR-REL-001</strong></td>
        <td>Reliability</td>
        <td>Uptime & Availability</td>
        <td>The system must achieve 99.5% uptime during evaluation. Eureka server handles automatic failover and client load balancing.</td>
      </tr>
      <tr>
        <td><strong>NFR-REL-002</strong></td>
        <td>Reliability</td>
        <td>Structured Errors</td>
        <td>All API endpoints must return structured JSON error responses (HTTP status + error message). No raw stack traces exposed to client.</td>
      </tr>
      <tr>
        <td><strong>NFR-USE-001</strong></td>
        <td>Usability</td>
        <td>Mobile Responsiveness</td>
        <td>All React UI screens must be fully functional on mobile devices with screen width &ge; 375px (iPhone SE size) for field officers.</td>
      </tr>
      <tr>
        <td><strong>NFR-USE-002</strong></td>
        <td>Usability</td>
        <td>Accessibility (WCAG)</td>
        <td>All UI components must meet WCAG 2.1 Level AA — color contrast ratio &ge; 4.5:1, semantic HTML5, and bilingual English/Tamil text.</td>
      </tr>
      <tr>
        <td><strong>NFR-MAINT-001</strong></td>
        <td>Maintainability</td>
        <td>Layered Architecture</td>
        <td>All microservices must follow standard Spring Boot layered architecture: Controller &rarr; Service &rarr; Repository with zero business logic in Controllers.</td>
      </tr>
      <tr>
        <td><strong>NFR-MAINT-002</strong></td>
        <td>Maintainability</td>
        <td>API Documentation</td>
        <td>All REST endpoints must be documented via Postman collections and OpenAPI / Swagger definitions.</td>
      </tr>
      <tr>
        <td><strong>NFR-COMP-001</strong></td>
        <td>Compliance</td>
        <td>Data Privacy</td>
        <td>Personal data collection must comply with the Digital Personal Data Protection (DPDP) Act 2023.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 18 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 19 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">8. DATABASE DESIGN</div>

  <h2>8.1 Entity-Relationship Overview</h2>
  <p>
    ALERT 4.0 GOVERNMENT implements a hybrid dual-database architecture:
    <strong>Oracle Database XE (11g/21c)</strong> manages structured transactional entities (users, incident reports, alert broadcasts, approval workflows, and analytics snapshots).
    <strong>MongoDB 6.0+</strong> manages high-capacity binary photographic media evidence.
  </p>
  <p><strong>Key Relationships:</strong></p>
  <ul>
    <li><code>DISTRICTS</code> has a ONE-TO-MANY relationship with <code>AUTH_USERS</code> — one district employs many officers across taluks and villages.</li>
    <li><code>AUTH_USERS</code> has a ONE-TO-MANY relationship with <code>INCIDENT_REPORTS</code> (via <code>REPORTED_BY</code>) — one VEO officer creates many incident reports.</li>
    <li><code>INCIDENT_REPORTS</code> (Oracle XE) has a ONE-TO-ONE relationship with <code>INCIDENT_MEDIA</code> (MongoDB) via <code>incidentId</code> for photographic evidence.</li>
    <li><code>INCIDENT_REPORTS</code> has a ONE-TO-MANY relationship with <code>APPROVAL_WORKFLOWS</code> — tracks multi-tier approval decisions (Taluk, District, Collector).</li>
    <li><code>ALERTS</code> has a ONE-TO-MANY relationship with <code>NOTIFICATIONS</code> — one broadcast alert generates notification dispatch logs.</li>
    <li><code>DISTRICTS</code> has a ONE-TO-MANY relationship with <code>ANALYTICS_SNAPSHOTS</code> — periodic analytics metrics stored per district.</li>
  </ul>

  <h2>8.2 Entity Descriptions (ENTITY 1: AUTH_USERS)</h2>
  <table>
    <thead>
      <tr><th colspan="5">ENTITY: AUTH_USERS | Service: auth-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique user account identifier</td></tr>
      <tr><td><code>USERNAME</code></td><td>VARCHAR2(100)</td><td>NOT NULL, UNIQUE</td><td>UK</td><td>Unique login username (e.g. VEO-COIMBATORESOUTH-1)</td></tr>
      <tr><td><code>PASSWORD</code></td><td>VARCHAR2(255)</td><td>NOT NULL</td><td>—</td><td>BCrypt-hashed password string</td></tr>
      <tr><td><code>ROLE</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Role: village, taluk, district, collector, state</td></tr>
      <tr><td><code>DISTRICT</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Assigned administrative district name</td></tr>
      <tr><td><code>TALUK</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Assigned administrative taluk name</td></tr>
      <tr><td><code>VILLAGE</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Assigned village post name</td></tr>
      <tr><td><code>NAME</code></td><td>VARCHAR2(150)</td><td>NULLABLE</td><td>—</td><td>Full display name of officer</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 19 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 20 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>8.2 Entity Descriptions (ENTITY 2: DISTRICTS & ENTITY 3: EMPLOYEES)</h2>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: DISTRICTS | Service: user-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique district identifier</td></tr>
      <tr><td><code>NAME</code></td><td>VARCHAR2(100)</td><td>NOT NULL, UNIQUE</td><td>UK</td><td>District name (e.g. Coimbatore, Chennai, Madurai)</td></tr>
      <tr><td><code>TALUKS_JSON</code></td><td>CLOB / VARCHAR2(4000)</td><td>NOT NULL</td><td>—</td><td>JSON array of taluk names belonging to district</td></tr>
      <tr><td><code>LATITUDE</code></td><td>NUMBER(10, 6)</td><td>NOT NULL</td><td>—</td><td>District headquarters latitude coordinate</td></tr>
      <tr><td><code>LONGITUDE</code></td><td>NUMBER(10, 6)</td><td>NOT NULL</td><td>—</td><td>District headquarters longitude coordinate</td></tr>
      <tr><td><code>TOTAL_TALUKS</code></td><td>NUMBER(5)</td><td>NOT NULL</td><td>—</td><td>Total count of taluks in district</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: EMPLOYEES | Service: user-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique employee record ID</td></tr>
      <tr><td><code>USERNAME</code></td><td>VARCHAR2(100)</td><td>NOT NULL, UNIQUE</td><td>UK</td><td>References AUTH_USERS.USERNAME</td></tr>
      <tr><td><code>EMAIL</code></td><td>VARCHAR2(150)</td><td>NOT NULL</td><td>—</td><td>Official government email address</td></tr>
      <tr><td><code>PHONE</code></td><td>VARCHAR2(20)</td><td>NOT NULL</td><td>—</td><td>Emergency contact mobile number</td></tr>
      <tr><td><code>DESIGNATION</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Officer designation (e.g. Tahsildar, VEO)</td></tr>
      <tr><td><code>STATUS</code></td><td>VARCHAR2(20)</td><td>NOT NULL</td><td>—</td><td>ACTIVE, ON_LEAVE, SUSPENDED</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 20 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 21 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>8.2 Entity Descriptions (ENTITY 4: ALERTS, ENTITY 5: TRANSLATIONS, ENTITY 6: INCIDENT_REPORTS)</h2>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: ALERTS | Service: alert-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique alert broadcast identifier</td></tr>
      <tr><td><code>TITLE</code></td><td>VARCHAR2(255)</td><td>NOT NULL</td><td>—</td><td>Emergency broadcast headline</td></tr>
      <tr><td><code>MESSAGE</code></td><td>CLOB / VARCHAR2(4000)</td><td>NOT NULL</td><td>—</td><td>Detailed emergency instruction message</td></tr>
      <tr><td><code>SEVERITY</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>CRITICAL, HIGH, MEDIUM, LOW</td></tr>
      <tr><td><code>DISTRICT</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Targeted district</td></tr>
      <tr><td><code>TALUK</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Targeted taluk (or Statewide)</td></tr>
      <tr><td><code>STATUS</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>DRAFT, PENDING_APPROVAL, APPROVED, DISPATCHED</td></tr>
      <tr><td><code>CREATED_AT</code></td><td>TIMESTAMP</td><td>NOT NULL</td><td>—</td><td>Alert creation timestamp</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: INCIDENT_REPORTS | Service: incident-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>VARCHAR2(100)</td><td>PRIMARY KEY</td><td>PK</td><td>UUID string identifier for the incident</td></tr>
      <tr><td><code>TITLE</code></td><td>VARCHAR2(255)</td><td>NOT NULL</td><td>—</td><td>Short summary title of the emergency</td></tr>
      <tr><td><code>CATEGORY</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Flood, Fire, Medical, Building Collapse, etc.</td></tr>
      <tr><td><code>SEVERITY</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Low, Medium, High, Severe, Extremely Severe</td></tr>
      <tr><td><code>STATUS</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Waiting for Taluk, Taluk Verified, Waiting for Collector, Resolved</td></tr>
      <tr><td><code>DISTRICT</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>District location</td></tr>
      <tr><td><code>TALUK</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Taluk jurisdiction</td></tr>
      <tr><td><code>REPORTED_BY</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Username of reporting VEO officer</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 21 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 22 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>8.2 Entity Descriptions (ENTITY 7: INCIDENT_MEDIA & ENTITY 8: APPROVAL_WORKFLOWS)</h2>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: INCIDENT_MEDIA | Service: incident-service | Database: MongoDB</th></tr>
      <tr>
        <th style="width: 20%;">Field Name</th>
        <th style="width: 22%;">BSON Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>_id</code></td><td>ObjectId</td><td>PRIMARY KEY</td><td>PK</td><td>Unique MongoDB document identifier</td></tr>
      <tr><td><code>incidentId</code></td><td>String</td><td>NOT NULL, INDEX</td><td>FK</td><td>References Oracle INCIDENT_REPORTS.ID</td></tr>
      <tr><td><code>photoBase64</code></td><td>String / Binary</td><td>NOT NULL</td><td>—</td><td>Full photographic evidence in Base64 string format</td></tr>
      <tr><td><code>uploadedAt</code></td><td>Date</td><td>NOT NULL</td><td>—</td><td>Timestamp of upload</td></tr>
      <tr><td><code>mimeType</code></td><td>String</td><td>NULLABLE</td><td>—</td><td>image/jpeg, image/png</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: APPROVAL_WORKFLOWS | Service: approval-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique workflow ID</td></tr>
      <tr><td><code>INCIDENT_ID</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Incident associated with approval request</td></tr>
      <tr><td><code>APPROVAL_LEVEL</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>TALUK, DISTRICT, COLLECTOR</td></tr>
      <tr><td><code>STATUS</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>PENDING, APPROVED, REJECTED, ESCALATED</td></tr>
      <tr><td><code>APPROVER_NAME</code></td><td>VARCHAR2(100)</td><td>NULLABLE</td><td>—</td><td>Name of reviewing authority</td></tr>
      <tr><td><code>DECISION_TIME</code></td><td>TIMESTAMP</td><td>NULLABLE</td><td>—</td><td>Timestamp of action</td></tr>
      <tr><td><code>COMMENTS</code></td><td>VARCHAR2(500)</td><td>NULLABLE</td><td>—</td><td>Reviewer comments or rejection reason</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 22 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 23 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <h2>8.2 Entity Descriptions (ENTITY 9: NOTIFICATIONS, ENTITY 10: ANALYTICS, ENTITY 11: AI_PREDICTIONS)</h2>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: NOTIFICATIONS | Service: notification-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique notification identifier</td></tr>
      <tr><td><code>USER_ID</code></td><td>VARCHAR2(100)</td><td>NOT NULL</td><td>—</td><td>Recipient user ID or role identifier</td></tr>
      <tr><td><code>TITLE</code></td><td>VARCHAR2(255)</td><td>NOT NULL</td><td>—</td><td>Notification headline</td></tr>
      <tr><td><code>MESSAGE</code></td><td>VARCHAR2(1000)</td><td>NOT NULL</td><td>—</td><td>Notification content</td></tr>
      <tr><td><code>IS_READ</code></td><td>NUMBER(1) / BOOLEAN</td><td>DEFAULT 0</td><td>—</td><td>0 = Unread, 1 = Read</td></tr>
      <tr><td><code>CREATED_AT</code></td><td>TIMESTAMP</td><td>NOT NULL</td><td>—</td><td>Timestamp of dispatch</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: ANALYTICS_SNAPSHOTS | Service: analytics-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique snapshot identifier</td></tr>
      <tr><td><code>SNAPSHOT_DATE</code></td><td>DATE</td><td>NOT NULL</td><td>—</td><td>Date of analytics recording</td></tr>
      <tr><td><code>TOTAL_INCIDENTS</code></td><td>NUMBER(10)</td><td>NOT NULL</td><td>—</td><td>Total incident count</td></tr>
      <tr><td><code>ACTIVE_INCIDENTS</code></td><td>NUMBER(10)</td><td>NOT NULL</td><td>—</td><td>Active unverified/ongoing incidents</td></tr>
      <tr><td><code>CRITICAL_ALERTS</code></td><td>NUMBER(10)</td><td>NOT NULL</td><td>—</td><td>Count of High / Severe / Critical incidents</td></tr>
      <tr><td><code>AVG_RESPONSE_TIME</code></td><td>NUMBER(6, 2)</td><td>NOT NULL</td><td>—</td><td>Average verification time in minutes</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 23 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 24 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <table>
    <thead>
      <tr><th colspan="5">ENTITY: AI_PREDICTIONS | Service: ai-service | Database: Oracle Database XE</th></tr>
      <tr>
        <th style="width: 20%;">Column Name</th>
        <th style="width: 22%;">Data Type</th>
        <th style="width: 18%;">Constraints</th>
        <th style="width: 10%;">Key</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>ID</code></td><td>NUMBER(19) / BIGINT</td><td>PRIMARY KEY, AUTO_INC</td><td>PK</td><td>Unique AI inference record identifier</td></tr>
      <tr><td><code>INCIDENT_ID</code></td><td>VARCHAR2(100)</td><td>NOT NULL, UNIQUE</td><td>UK</td><td>References INCIDENT_REPORTS.ID</td></tr>
      <tr><td><code>PREDICTED_SEVERITY</code></td><td>VARCHAR2(50)</td><td>NOT NULL</td><td>—</td><td>Low, Medium, High, Severe, Extremely Severe</td></tr>
      <tr><td><code>RECOMMENDATIONS</code></td><td>CLOB / VARCHAR2(4000)</td><td>NOT NULL</td><td>—</td><td>Ollama Llama 3 synthesized response advice</td></tr>
      <tr><td><code>SPREAD_RADIUS_KM</code></td><td>VARCHAR2(50)</td><td>NULLABLE</td><td>—</td><td>Estimated hazard spread radius</td></tr>
      <tr><td><code>CONFIDENCE_SCORE</code></td><td>NUMBER(5, 2)</td><td>NULLABLE</td><td>—</td><td>Model confidence percentage</td></tr>
      <tr><td><code>PREDICTED_AT</code></td><td>TIMESTAMP</td><td>NOT NULL</td><td>—</td><td>Inference timestamp</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 24 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 25 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">9. API DESIGN OVERVIEW</div>

  <h2>9.1 REST API Endpoints Catalog</h2>

  <table>
    <thead>
      <tr><th colspan="4">Auth Service (Port: 8082) & User Service (Port: 8083)</th></tr>
      <tr>
        <th style="width: 10%;">Method</th>
        <th style="width: 35%;">Endpoint</th>
        <th style="width: 15%;">Auth Required</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>POST</code></td><td><code>/api/v1/auth/login</code></td><td>No</td><td>Authenticates credentials; returns signed JWT and user profile.</td></tr>
      <tr><td><code>POST</code></td><td><code>/api/v1/auth/register</code></td><td>No / Admin</td><td>Registers new officer; returns user record.</td></tr>
      <tr><td><code>GET</code></td><td><code>/api/v1/users/me</code></td><td>Yes</td><td>Retrieves logged-in user profile details.</td></tr>
      <tr><td><code>GET</code></td><td><code>/api/v1/reference/districts</code></td><td>Yes</td><td>Fetches 38 Tamil Nadu districts and taluks JSON.</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th colspan="4">Incident Service (Port: 8084) & Alert Service (Port: 8085)</th></tr>
      <tr>
        <th style="width: 10%;">Method</th>
        <th style="width: 35%;">Endpoint</th>
        <th style="width: 15%;">Auth Required</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>GET</code></td><td><code>/api/v1/incidents</code></td><td>Yes</td><td>Retrieves all active disaster incident reports.</td></tr>
      <tr><td><code>POST</code></td><td><code>/api/v1/incidents</code></td><td>Yes</td><td>Creates new incident with metadata and Base64 photo.</td></tr>
      <tr><td><code>PUT</code></td><td><code>/api/v1/incidents/{id}/status</code></td><td>Yes</td><td>Updates incident status (e.g. Taluk Verified, Resolved).</td></tr>
      <tr><td><code>GET</code></td><td><code>/api/v1/incidents/{id}/image</code></td><td>Yes</td><td>Retrieves Base64 photographic evidence from MongoDB.</td></tr>
      <tr><td><code>GET</code></td><td><code>/api/v1/alerts</code></td><td>Yes</td><td>Fetches active emergency broadcast alerts.</td></tr>
      <tr><td><code>POST</code></td><td><code>/api/v1/alerts</code></td><td>Yes</td><td>Creates targeted public alert broadcast.</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th colspan="4">AI & Inference Service (FastAPI Port: 8000 & Spring Boot Port: 8089)</th></tr>
      <tr>
        <th style="width: 10%;">Method</th>
        <th style="width: 35%;">Endpoint</th>
        <th style="width: 15%;">Auth Required</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>POST</code></td><td><code>/ai/predict-risk</code></td><td>Internal</td><td>Ollama Llama 3 NLP risk scoring & bilingual recommendation.</td></tr>
      <tr><td><code>GET</code></td><td><code>/api/v1/ai/weather-advisory</code></td><td>Yes</td><td>Open-Meteo meteorological threat advisory via Resilience4j.</td></tr>
      <tr><td><code>GET</code></td><td><code>/health</code></td><td>No</td><td>FastAPI health check endpoint returning <code>{"status":"ok"}</code>.</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 25 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 26 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">10. DEVOPS & DEPLOYMENT PLAN</div>

  <h2>10.1 CI/CD Pipeline — Jenkins</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 8%;">Stage</th>
        <th style="width: 25%;">Stage Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Source Checkout</td><td>Jenkins pulls latest code from GitHub main branch via webhook on push.</td></tr>
      <tr><td>2</td><td>Build</td><td><code>mvn clean package -DskipTests</code> for all Spring Boot services; <code>npm run build</code> for React.</td></tr>
      <tr><td>3</td><td>Unit Test</td><td><code>mvn test</code> — executes JUnit 5 unit tests; fails pipeline if any test breaks.</td></tr>
      <tr><td>4</td><td>Code Quality</td><td>SonarQube static analysis scanning for bugs, vulnerabilities, and code smells.</td></tr>
      <tr><td>5</td><td>Docker Build</td><td><code>docker build -t [service-name]:latest</code> for all 12 container images.</td></tr>
      <tr><td>6</td><td>Deploy (Docker Compose)</td><td><code>docker-compose down &amp;&amp; docker-compose up -d</code> on target host.</td></tr>
      <tr><td>7</td><td>Health Check</td><td><code>curl /actuator/health</code> on each service — pipeline SUCCESS if all UP.</td></tr>
    </tbody>
  </table>

  <h2>10.2 Docker Container Configuration</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Container</th>
        <th style="width: 25%;">Image / Context</th>
        <th style="width: 15%;">Port Mapping</th>
        <th style="width: 20%;">Depends On</th>
        <th>Environment Variables</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>oracle-db</code></td><td><code>gvenzl/oracle-xe:slim-faststart</code></td><td>1522:1521</td><td>—</td><td><code>ORACLE_PASSWORD=admin</code></td></tr>
      <tr><td><code>local-mongo</code></td><td><code>mongo:latest</code></td><td>27017:27017</td><td>—</td><td><code>volumes: mongo_data:/data/db</code></td></tr>
      <tr><td><code>discovery-server</code></td><td><code>./discovery-server</code></td><td>8761:8761</td><td>—</td><td><code>EUREKA_CLIENT_REGISTERWITHEUREKA=false</code></td></tr>
      <tr><td><code>api-gateway</code></td><td><code>./api-gateway</code></td><td>8081:8081</td><td><code>discovery-server</code></td><td><code>EUREKA_CLIENT_SERVICEURL_DEFAULTZONE</code></td></tr>
      <tr><td><code>auth-service</code></td><td><code>./auth-service</code></td><td>8082:8082</td><td><code>discovery-server, oracle-db</code></td><td><code>SPRING_DATASOURCE_URL=jdbc:oracle:...</code></td></tr>
      <tr><td><code>incident-service</code></td><td><code>./incident-service</code></td><td>8084:8084</td><td><code>discovery-server, oracle-db</code></td><td><code>SPRING_DATA_MONGODB_URI</code></td></tr>
      <tr><td><code>alertgov-ai</code></td><td><code>./alertgov-ai</code></td><td>8000:8000</td><td><code>ollama</code></td><td><code>OLLAMA_URL=http://ollama:11434/api/generate</code></td></tr>
      <tr><td><code>frontend</code></td><td><code>./alertgov-frontend</code></td><td>5173:80</td><td><code>api-gateway</code></td><td><code>VITE_API_URL=http://localhost:8081</code></td></tr>
    </tbody>
  </table>

  <h2>10.3 Deployment Environments</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Environment</th>
        <th style="width: 30%;">Infrastructure</th>
        <th>Purpose & Access</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Development</strong></td><td>localhost (Windows / Linux)</td><td>Individual workstations; hot-reload via Vite HMR and Spring DevTools.</td></tr>
      <tr><td><strong>Testing / QA</strong></td><td>Shared Server / VM</td><td>Integration testing and mentor review; automated deployment via Jenkins.</td></tr>
      <tr><td><strong>Demo / Evaluation</strong></td><td>Local Cluster / Docker Host</td><td>SIH live demonstration; stable, high-performance local evaluation.</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 26 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 27 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">11. PROJECT TIMELINE & MILESTONES</div>

  <table>
    <thead>
      <tr>
        <th style="width: 8%;">Week</th>
        <th style="width: 20%;">Phase</th>
        <th>Deliverables & Key Accomplishments</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Foundation</td>
        <td>&#9989; SRS document finalized | &#9989; Git repo with branching strategy | &#9989; Oracle XE &amp; MongoDB schemas configured | &#9989; Eureka discovery server + API Gateway boilerplate operational.</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Core Backend</td>
        <td>&#9989; <code>auth-service</code> (JWT, BCrypt) complete | &#9989; <code>user-service</code> complete | &#9989; <code>incident-service</code> CRUD developed | &#9989; Spring Security filter chain verified end-to-end.</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Full Backend</td>
        <td>&#9989; <code>alert-service</code> &amp; <code>approval-service</code> complete | &#9989; <code>notification-service</code> complete | &#9989; Postman collection created | &#9989; Inter-service Eureka load-balanced routing verified.</td>
      </tr>
      <tr>
        <td>4</td>
        <td>AI &amp; Weather</td>
        <td>&#9989; Python FastAPI service deployed on port 8000 | &#9989; Ollama Llama 3 bilingual inference connected | &#9989; Open-Meteo weather API with Resilience4j circuit breakers built in <code>ai-service</code>.</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Frontend Complete</td>
        <td>&#9989; React 19 + Vite bilingual portal built | &#9989; Leaflet.js interactive GIS mapping integrated | &#9989; Recharts analytics dashboard developed | &#9989; Multi-tier role portals connected.</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Integration &amp; Testing</td>
        <td>&#9989; Full end-to-end verification pipeline (Village &rarr; Taluk &rarr; District &rarr; Collector &rarr; State) passing | &#9989; Docker Compose multi-container cluster validated | &#9989; Tested under 50+ concurrent queries.</td>
      </tr>
      <tr>
        <td>7</td>
        <td>Polish &amp; Documentation</td>
        <td>&#9989; Live dashboard sync and analytics chart rendering fixed | &#9989; Official PDF reporting integrated | &#9989; API Documentation &amp; architecture docs created | &#9989; Internal Review demo successfully presented.</td>
      </tr>
      <tr>
        <td>8</td>
        <td>Final Submission</td>
        <td>&#9989; Final SRS v2.0 published | &#9989; Git repo tagged v2.0 release | &#9989; Live demonstration &amp; presentation slide deck finalized for SIH submission.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 27 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 28 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">12. TEAM COMPOSITION & ROLE ASSIGNMENT</div>

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
      <tr><td><strong>Farah Hamna M</strong></td><td>IT</td><td>III</td><td>Frontend Architecture (React 19, Leaflet GIS, Recharts, Bilingual UI), UI/UX Design, and Component Integration.</td></tr>
      <tr><td><strong>Rishikesh V</strong></td><td>IT</td><td>III</td><td>Backend Lead (Spring Boot 3.2.4, Gateway, Eureka, JWT Security, Oracle XE &amp; MongoDB persistence), DevOps &amp; Docker Compose.</td></tr>
      <tr><td><strong>Shruthin K</strong></td><td>IT</td><td>III</td><td>AI/ML Integration (Python FastAPI, Ollama Llama 3 bilingual reasoning, Resilience4j weather circuit breakers), Testing &amp; API Docs.</td></tr>
    </tbody>
  </table>

  <h2>Ownership Matrix</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 32%;">Component</th>
        <th style="width: 22%;">Primary Owner</th>
        <th style="width: 22%;">Secondary Owner</th>
        <th>Support</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Eureka &amp; API Gateway</td><td>Rishikesh V</td><td>Farah Hamna M</td><td>Shruthin K</td></tr>
      <tr><td>Core Microservices (Auth, Incident, Alert)</td><td>Rishikesh V</td><td>Shruthin K</td><td>Farah Hamna M</td></tr>
      <tr><td>Approval &amp; Notification Services</td><td>Rishikesh V</td><td>Farah Hamna M</td><td>Shruthin K</td></tr>
      <tr><td>AI Microservice &amp; Weather Service</td><td>Shruthin K</td><td>Rishikesh V</td><td>Farah Hamna M</td></tr>
      <tr><td>React 19 Frontend &amp; GIS Maps</td><td>Farah Hamna M</td><td>Rishikesh V</td><td>Shruthin K</td></tr>
      <tr><td>Database Schemas (Oracle XE + Mongo)</td><td>Rishikesh V</td><td>Farah Hamna M</td><td>Shruthin K</td></tr>
      <tr><td>DevOps &amp; Docker Deployment</td><td>Rishikesh V</td><td>Shruthin K</td><td>Farah Hamna M</td></tr>
      <tr><td>SRS Documentation &amp; Evaluation</td><td>All Members</td><td>All Members</td><td>All Members</td></tr>
    </tbody>
  </table>

  <h2>Interdisciplinary Contribution Map</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Stream</th>
        <th style="width: 35%;">Expected Contribution Area</th>
        <th>Specific Contribution in THIS Project</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Information Technology (IT)</strong></td><td>Full Stack Java (Spring Boot), Microservices, AI/ML Integration, React Frontend, DevOps</td><td>Engineered all 11 Spring Boot microservices, React 19 GIS portal, Ollama AI microservice, and Oracle XE/MongoDB dual persistence.</td></tr>
      <tr><td><strong>Domain &amp; Governance</strong></td><td>Disaster workflow design, SOP compliance, TNDMA policy alignment</td><td>Structured the 5-tier disaster verification hierarchy according to official Tamil Nadu Emergency Operations Center guidelines.</td></tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 28 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 29 ==================== -->
<div class="page">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">13. RISK REGISTER</div>

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
        <td>M</td>
        <td>H</td>
        <td>Implemented rule-based fallback heuristic analysis in FastAPI that immediately supplies valid severity ratings and advice if LLM timeout occurs.</td>
      </tr>
      <tr>
        <td><strong>R02</strong></td>
        <td>Open-Meteo external weather API outage or network disruption</td>
        <td>M</td>
        <td>H</td>
        <td>Wrapped endpoint in Resilience4j CircuitBreaker with automated fallback to default Tamil Nadu seasonal advisory data.</td>
      </tr>
      <tr>
        <td><strong>R03</strong></td>
        <td>Oracle Database XE connection pool exhaustion under multi-service startup</td>
        <td>M</td>
        <td>H</td>
        <td>Tuned HikariCP connection pool limits (<code>maximum-pool-size=3</code>) across microservices to maintain lightweight concurrent connection footprint.</td>
      </tr>
      <tr>
        <td><strong>R04</strong></td>
        <td>Large photographic evidence uploads overloading database performance</td>
        <td>M</td>
        <td>M</td>
        <td>Decoupled persistence: metadata stored in Oracle XE, while binary Base64 images are stored in dedicated MongoDB document collections.</td>
      </tr>
      <tr>
        <td><strong>R05</strong></td>
        <td>Unauthorized alert dissemination causing public panic</td>
        <td>L</td>
        <td>H</td>
        <td>Enforced strict multi-level approval workflow; broadcast alerts cannot be published without District Collector authorization.</td>
      </tr>
      <tr>
        <td><strong>R06</strong></td>
        <td>Loss of internet connectivity in remote disaster zones</td>
        <td>M</td>
        <td>M</td>
        <td>Client-side local storage caching in React frontend allows offline draft capture with automatic sync upon reconnection.</td>
      </tr>
      <tr>
        <td><strong>R07</strong></td>
        <td>Accidental data exposure or credential leaks</td>
        <td>L</td>
        <td>H</td>
        <td>Stateless JWT token verification on all protected endpoints; BCrypt password hashing; zero secrets committed to Git repositories.</td>
      </tr>
      <tr>
        <td><strong>R08</strong></td>
        <td>Inaccurate or unverified disaster reports submitted from field</td>
        <td>M</td>
        <td>H</td>
        <td>Mandatory Tahsildar verification step in Taluk Command Center before incidents can escalate to District EOC.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-line">
    <span>Page 29 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

<!-- ==================== PAGE 30 ==================== -->
<div class="page-last">
  <div class="page-header-line">
    <span>SRS Template | ALERT 4.0 GOVERNMENT</span>
    <span>Full Stack Java (AI-Integrated) Training Programme</span>
  </div>

  <div class="section-banner">14. APPENDIX</div>

  <h2>14.1 Glossary of Domain-Specific Terms</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Term</th>
        <th>Definition</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>TNDMA</strong></td><td>Tamil Nadu Disaster Management Authority — State nodal agency responsible for disaster prevention, mitigation, and emergency response.</td></tr>
      <tr><td><strong>VEO</strong></td><td>Village Emergency Officer — Ground-level reporting authority stationed at village panchayat emergency posts.</td></tr>
      <tr><td><strong>DEOC</strong></td><td>District Emergency Operations Centre — 24/7 command center operating at the District Collectorate.</td></tr>
      <tr><td><strong>Tahsildar</strong></td><td>Administrative revenue and executive officer heading a Taluk, responsible for incident verification.</td></tr>
    </tbody>
  </table>

  <h2>14.2 AI Model Details — Training & Runtime Logs</h2>
  <ul>
    <li><strong>Runtime Model:</strong> Meta Llama 3 8B Instruct (4-bit quantized GGUF) hosted on Ollama local server.</li>
    <li><strong>Execution Environment:</strong> Python 3.13, FastAPI 0.141.1, Uvicorn 0.52.1 on port 8000.</li>
    <li><strong>Performance:</strong> Average inference latency: 2.1 seconds; Heuristic fallback execution time: 18ms.</li>
    <li><strong>Target Languages:</strong> English & Tamil (தமிழ் script output verified).</li>
  </ul>

  <h2>14.3 API Request-Response Samples</h2>
  <div class="code-box"><strong>POST /api/v1/incidents</strong>
Request: {"title": "Flash Flooding at Peelamedu", "category": "Flood", "severity": "High", "district": "Coimbatore", "taluk": "Coimbatore South"}
Response: {"id": "INC-7a89f214", "status": "Waiting for Taluk", "reportedAt": "2026-09-20T19:30:00.000Z"}</div>

  <h2>14.4 References & Citations</h2>
  <ul>
    <li>Open-Meteo Weather API: <a href="https://open-meteo.com/">https://open-meteo.com/</a></li>
    <li>TNDMA Standard Operating Procedures (SOP 2024–2026), Government of Tamil Nadu.</li>
    <li>Meta Llama 3 Model Card & Technical Specifications, Meta AI (2024).</li>
  </ul>

  <div style="margin-top: 15px; border-top: 2px solid #1e3a5f; padding-top: 8px; text-align: center;">
    <strong style="color: #1e3a5f; font-size: 9pt;">END OF SRS DOCUMENT — Version 2.0 (Final Release)</strong><br>
    <span style="font-size: 7.5pt; color: #64748b;">Full Stack Java (AI-Integrated) Training Programme | Dr. Arul Antran Vijay &amp; Dr. Jothi Prakash</span>
  </div>

  <div class="page-footer-line">
    <span>Page 30 | Confidential — For Training Use Only</span>
    <span>Karpagam College of Engineering</span>
  </div>
</div>

</body>
</html>`;

  fs.writeFileSync('temp_srs_30pages.html', htmlContent);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.resolve('../ALERTGOV_Final_SRS_30Pages.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '10mm',
      right: '10mm'
    }
  });

  await browser.close();
  console.log('30-Page PDF generated successfully at: ' + pdfPath);
}

generate30PageSRS().catch(console.error);
