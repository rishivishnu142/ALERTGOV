const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateProjectSummaryPDF() {
  console.log('Generating ALERT 4.0 GOVERNMENT Overall Project Summary Document...');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ALERT 4.0 GOVERNMENT - Overall Project Summary</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 12mm 14mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    color: #1e293b;
    line-height: 1.45;
    font-size: 8.8pt;
    background: #ffffff;
    margin: 0;
    padding: 0;
  }

  /* Page container */
  .page {
    width: 100%;
    height: 270mm;
    position: relative;
    page-break-after: always;
    break-after: page;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .page-last {
    width: 100%;
    height: 270mm;
    position: relative;
    page-break-after: avoid;
    break-after: avoid;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  /* Running Header & Footer */
  .page-header-bar {
    border-bottom: 2px solid #1e3a5f;
    padding-bottom: 4px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.8pt;
    color: #475569;
    font-weight: 600;
  }

  .page-header-bar .logo-title {
    color: #1e3a5f;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  .page-footer-bar {
    margin-top: auto;
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.6pt;
    color: #64748b;
  }

  /* Typography */
  h1, h2, h3, h4, h5 {
    color: #0f172a;
    margin: 0 0 6px 0;
    font-weight: 700;
  }

  h1 { font-size: 18pt; color: #1e3a5f; line-height: 1.2; }
  h2 { font-size: 12.5pt; color: #1e3a5f; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-top: 6px; }
  h3 { font-size: 10pt; color: #0369a1; margin-top: 5px; margin-bottom: 4px; }
  h4 { font-size: 9pt; color: #334155; margin-top: 4px; }

  p {
    margin: 0 0 6px 0;
    color: #334155;
    text-align: justify;
  }

  code {
    font-family: Consolas, monospace;
    font-size: 8pt;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    color: #0f172a;
    border: 1px solid #e2e8f0;
  }

  /* Cover Design */
  .cover-container {
    height: 265mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0369a1 100%);
    color: #ffffff;
    padding: 35px 30px;
    border-radius: 8px;
  }

  .cover-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #f8fafc;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 8.5pt;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .cover-main {
    margin-top: 25px;
  }

  .cover-title {
    font-size: 26pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .cover-subtitle {
    font-size: 12.5pt;
    color: #bae6fd;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 20px;
    max-width: 90%;
  }

  .cover-divider {
    width: 80px;
    height: 4px;
    background: #38bdf8;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .cover-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 8px;
    padding: 16px;
  }

  .cover-grid-item {
    font-size: 8.5pt;
  }

  .cover-grid-item .label {
    color: #94a3b8;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .cover-grid-item .value {
    color: #ffffff;
    font-weight: 600;
  }

  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 15px;
    font-size: 8pt;
    color: #cbd5e1;
  }

  /* Cards & Boxes */
  .card-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 8px;
  }

  .card-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 8px;
  }

  .card-grid-5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    margin-bottom: 8px;
  }

  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px 10px;
  }

  .card-blue {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-left: 3.5px solid #0284c7;
  }

  .card-emerald {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-left: 3.5px solid #16a34a;
  }

  .card-amber {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-left: 3.5px solid #d97706;
  }

  .card-purple {
    background: #faf5ff;
    border: 1px solid #e9d5ff;
    border-left: 3.5px solid #9333ea;
  }

  .card-rose {
    background: #fff1f2;
    border: 1px solid #fecdd3;
    border-left: 3.5px solid #e11d48;
  }

  .card-title {
    font-weight: 700;
    font-size: 8.8pt;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 12px;
    font-size: 7.2pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .badge-primary { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
  .badge-success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
  .badge-warning { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
  .badge-danger { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
  .badge-purple { background: #f3e8ff; color: #6b21a8; border: 1px solid #d8b4fe; }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 5px 0 8px 0;
    font-size: 8pt;
  }

  th, td {
    padding: 4.5px 7px;
    text-align: left;
    border: 1px solid #cbd5e1;
  }

  th {
    background: #1e3a5f;
    color: #ffffff;
    font-weight: 600;
    font-size: 8pt;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  /* Lists */
  ul, ol {
    margin: 0 0 6px 0;
    padding-left: 18px;
  }

  li {
    margin-bottom: 2.5px;
    color: #334155;
  }

  /* Microservice Box */
  .service-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    padding: 6px 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }

  .service-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 2px;
  }

  .service-name {
    font-weight: 700;
    font-size: 8.6pt;
    color: #0f172a;
  }

  .service-port {
    font-family: Consolas, monospace;
    font-size: 7.2pt;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    color: #475569;
    font-weight: 600;
  }

  .service-desc {
    font-size: 7.6pt;
    color: #475569;
    line-height: 1.35;
  }

  /* Architecture diagram */
  .arch-diagram {
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    padding: 8px;
    margin: 6px 0 10px 0;
  }

  .arch-layer {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 5px 8px;
    margin-bottom: 5px;
  }

  .arch-layer-title {
    font-size: 7.4pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #0284c7;
    margin-bottom: 3px;
  }

  .arch-layer-items {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .arch-chip {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 2px 7px;
    font-size: 7.4pt;
    font-weight: 600;
    color: #1e293b;
  }

  .highlight-metric {
    font-size: 15pt;
    font-weight: 800;
    color: #1e3a5f;
    line-height: 1;
    margin-bottom: 2px;
  }

  .metric-sub {
    font-size: 7pt;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
  }

  .timeline-container {
    position: relative;
    padding-left: 16px;
    border-left: 2px solid #0284c7;
    margin: 5px 0 8px 4px;
  }

  .timeline-step {
    position: relative;
    margin-bottom: 6px;
  }

  .timeline-step::before {
    content: '';
    position: absolute;
    left: -21px;
    top: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0284c7;
    border: 2px solid #ffffff;
  }

  .timeline-title {
    font-size: 8.3pt;
    font-weight: 700;
    color: #0f172a;
  }

  .timeline-desc {
    font-size: 7.6pt;
    color: #475569;
  }
</style>
</head>
<body>

<!-- ========================================================================= -->
<!-- PAGE 1: COVER PAGE                                                        -->
<!-- ========================================================================= -->
<div class="page">
  <div class="cover-container">
    <div>
      <div class="cover-badge">Government of Tamil Nadu &bull; State Disaster Management Authority</div>
      <div class="cover-main">
        <div class="cover-title">ALERT 4.0 GOVERNMENT</div>
        <div class="cover-subtitle">Next-Generation AI-Integrated Disaster Management, Incident Escalation & Multi-Tier Emergency Command System</div>
        <div class="cover-divider"></div>
        <p style="color: #e2e8f0; font-size: 9.3pt; line-height: 1.55; max-width: 95%;">
          A comprehensive enterprise-grade platform unifying grassroots emergency reporting, real-time AI triage, 5-tier governmental hierarchy, GIS spatial intelligence, dual-validation broadcast alerting, and polyglot persistence across all 38 districts of Tamil Nadu.
        </p>
      </div>
    </div>

    <div>
      <div class="cover-grid">
        <div class="cover-grid-item">
          <div class="label">Project Title</div>
          <div class="value">ALERT 4.0 GOVERNMENT (Full Stack Java & AI)</div>
        </div>
        <div class="cover-grid-item">
          <div class="label">Version & Release</div>
          <div class="value">v4.0.0 Enterprise Production Ready</div>
        </div>
        <div class="cover-grid-item">
          <div class="label">Target Administrative Scope</div>
          <div class="value">38 Districts &bull; 310+ Taluks &bull; SDMA Headquarters</div>
        </div>
        <div class="cover-grid-item">
          <div class="label">Core Architecture</div>
          <div class="value">Spring Cloud Microservices + FastAPI Llama-3 AI</div>
        </div>
        <div class="cover-grid-item">
          <div class="label">Database Systems</div>
          <div class="value">Oracle Database XE (ACID Core) + MongoDB Atlas (Media)</div>
        </div>
        <div class="cover-grid-item">
          <div class="label">Frontend & Spatial GIS</div>
          <div class="value">React 19 + Leaflet GIS + Recharts Analytics + Vanilla CSS</div>
        </div>
      </div>

      <div class="cover-footer">
        <div><strong>Confidential &bull; For Government & Academic Review</strong></div>
        <div>Generated: September 2026 &bull; SDMA Tamil Nadu</div>
      </div>
    </div>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 2: EXECUTIVE SUMMARY & PROBLEM STATEMENT                             -->
<!-- ========================================================================= -->
<div class="page">
  <div class="page-header-bar">
    <span class="logo-title">ALERT 4.0 GOVERNMENT</span>
    <span>Executive Summary & System Objectives</span>
    <span>Page 2</span>
  </div>

  <h2>1. Executive Summary</h2>
  <p>
    <strong>ALERT 4.0 GOVERNMENT</strong> is an advanced, mission-critical incident management and emergency escalation platform engineered to modernize disaster response for the Government of Tamil Nadu. In high-stakes emergency situations—including cyclones, urban flash floods, hazardous industrial chemical leaks, severe structural fires, and critical infrastructure collapses—traditional multi-tier government reporting suffers from communication bottlenecks, delayed field verifications, unstandardized priority categorizations, and fragmented resource coordination.
  </p>
  <p>
    ALERT 4.0 bridges the critical time gap between grassroots disaster reporting and executive district-level mobilization. By implementing a <strong>5-tier hierarchical governance model</strong> backed by <strong>autonomous Llama-3 Artificial Intelligence</strong>, the system provides automated incident severity scoring, duplicate/spam filtering, real-time meteorological weather advisory synthesis, bilingual English/Tamil operational interfaces, and sovereign digital authorization for emergency cell broadcasts.
  </p>

  <div class="card-grid-3" style="margin: 8px 0;">
    <div class="card card-blue">
      <div class="highlight-metric">&lt; 30s</div>
      <div class="metric-sub">Grassroots-to-Taluk Alert Dispatch</div>
      <p style="font-size: 7.4pt; margin-top: 3px; color: #475569;">Instant escalation from village operators to taluk officers with GPS geotags.</p>
    </div>
    <div class="card card-emerald">
      <div class="highlight-metric">100%</div>
      <div class="metric-sub">Sovereign 2-Person Broadcast Rule</div>
      <p style="font-size: 7.4pt; margin-top: 3px; color: #475569;">No public emergency sirens or cell broadcasts without District Collector digital approval.</p>
    </div>
    <div class="card card-purple">
      <div class="highlight-metric">38 / 38</div>
      <div class="metric-sub">Tamil Nadu Districts Covered</div>
      <p style="font-size: 7.4pt; margin-top: 3px; color: #475569;">Real-time district status matrix, live resource counts, and SDMA state dashboard.</p>
    </div>
  </div>

  <h2>2. Problem Statement & Legacy Inefficiencies</h2>
  <table style="margin-top: 4px;">
    <thead>
      <tr>
        <th style="width: 25%;">Domain</th>
        <th style="width: 37%;">Legacy / Manual Disaster Workflow</th>
        <th style="width: 38%;">ALERT 4.0 Modernized Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Field Incident Reporting</strong></td>
        <td>Manual phone calls or fragmented messaging groups with no verified GPS coordinates or evidence validation.</td>
        <td><strong>Single-screen digital incident submission</strong> with GPS autodetection, voice dictation, and MongoDB media uploads.</td>
      </tr>
      <tr>
        <td><strong>Triage & Severity Classification</strong></td>
        <td>Subjective operator judgement leading to missed critical alerts and priority misallocations.</td>
        <td><strong>Autonomous Llama-3 AI risk scoring</strong> (<code>Low</code> to <code>Extremely Severe</code>), spam detection, and instant advisory extraction.</td>
      </tr>
      <tr>
        <td><strong>Administrative Escalation</strong></td>
        <td>Linear paper/telephonic escalation taking hours to reach executive decision-makers.</td>
        <td><strong>Automated multi-tier workflow engine</strong> linking Village Operators &rarr; Taluk Officers &rarr; District EOC &rarr; District Collector.</td>
      </tr>
      <tr>
        <td><strong>Emergency Broadcast Authorization</strong></td>
        <td>Unverified or delayed siren dispatch prone to public panic or unauthorized broadcast triggers.</td>
        <td><strong>Strict 2-person rule:</strong> EOC drafts radio/siren broadcast &rarr; Collector digitally signs and activates.</td>
      </tr>
      <tr>
        <td><strong>Spatial & Resource Tracking</strong></td>
        <td>Static paper maps with delayed situational awareness of available fire engines, police, and ambulances.</td>
        <td><strong>Interactive Leaflet GIS map</strong> with live incident markers, cluster zones, district status cards, and live resource counts.</td>
      </tr>
    </tbody>
  </table>

  <h2>3. Key System Objectives</h2>
  <ul>
    <li><strong>Sub-Minute Incident Triage:</strong> Enable Village Emergency Operators (VEOs) to report emergencies with accurate GPS locations and media in under 45 seconds.</li>
    <li><strong>AI-Assisted Verification:</strong> Provide Taluk Officers with instant AI deduplication checks and concise formal incident log summaries.</li>
    <li><strong>Integrated Resource Command:</strong> Empower District EOCs to dispatch Fire &amp; Rescue, Police, Medical Teams, and NDRF units based on real-time asset availability.</li>
    <li><strong>Zero-Panic Sovereign Broadcasts:</strong> Provide District Collectors with high-impact executive decision dashboards to authorize targeted multi-channel emergency alerts.</li>
    <li><strong>State-Wide Macro Analytics:</strong> Offer the State Disaster Management Authority (SDMA) full visibility across all 38 districts with automated weather forecasting integration.</li>
  </ul>

  <div class="page-footer-bar">
    <span>ALERT 4.0 GOVERNMENT &bull; Project Summary</span>
    <span>Confidential — Official Government Documentation</span>
    <span>Page 2</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 3: 5-TIER HIERARCHICAL GOVERNANCE MODEL                              -->
<!-- ========================================================================= -->
<div class="page">
  <div class="page-header-bar">
    <span class="logo-title">ALERT 4.0 GOVERNMENT</span>
    <span>5-Tier Hierarchical Governance & Roles</span>
    <span>Page 3</span>
  </div>

  <h2>4. 5-Tier Hierarchical Governance Model</h2>
  <p>
    ALERT 4.0 enforces strict Role-Based Access Control (RBAC) reflecting the administrative structure of the Tamil Nadu Revenue and Disaster Management Department. Each tier has dedicated user interfaces, specialized operational capabilities, and defined escalation boundaries.
  </p>

  <div class="card-grid-5" style="margin: 6px 0 10px 0;">
    <div class="card card-blue" style="text-align: center; padding: 5px 3px;">
      <div class="badge badge-primary">Tier 1</div>
      <div style="font-weight: 800; font-size: 8pt; color: #0369a1; margin-top: 2px;">Village VEO</div>
      <div style="font-size: 7pt; color: #475569;">Grassroots Field Capture</div>
    </div>
    <div class="card card-emerald" style="text-align: center; padding: 5px 3px;">
      <div class="badge badge-success">Tier 2</div>
      <div style="font-weight: 800; font-size: 8pt; color: #15803d; margin-top: 2px;">Taluk Officer</div>
      <div style="font-size: 7pt; color: #475569;">Verification & Triage</div>
    </div>
    <div class="card card-amber" style="text-align: center; padding: 5px 3px;">
      <div class="badge badge-warning">Tier 3</div>
      <div style="font-weight: 800; font-size: 8pt; color: #b45309; margin-top: 2px;">District EOC</div>
      <div style="font-size: 7pt; color: #475569;">Operations & Dispatch</div>
    </div>
    <div class="card card-rose" style="text-align: center; padding: 5px 3px;">
      <div class="badge badge-danger">Tier 4</div>
      <div style="font-weight: 800; font-size: 8pt; color: #b91c1c; margin-top: 2px;">District Collector</div>
      <div style="font-size: 7pt; color: #475569;">Executive Sign-Off</div>
    </div>
    <div class="card card-purple" style="text-align: center; padding: 5px 3px;">
      <div class="badge badge-purple">Tier 5</div>
      <div style="font-weight: 800; font-size: 8pt; color: #6b21a8; margin-top: 2px;">State SDMA</div>
      <div style="font-size: 7pt; color: #475569;">Macro State Oversight</div>
    </div>
  </div>

  <table style="margin-bottom: 6px;">
    <thead>
      <tr>
        <th style="width: 14%;">Tier & Role</th>
        <th style="width: 22%;">Primary Focus & Responsibilities</th>
        <th style="width: 32%;">Key Dashboard Modules & Tools</th>
        <th style="width: 32%;">Data Access & Security Boundaries</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tier 1:<br>Village Emergency Operator (VEO)</strong></td>
        <td>Grassroots incident reporting, real-time photographic evidence capture, GPS geo-tagging, initial severity suggestion, local status updates.</td>
        <td>
          &bull; Incident Submission Wizard<br>
          &bull; Voice-to-Text Input (English/Tamil)<br>
          &bull; Active Local Incidents Feed<br>
          &bull; Media Upload & PDF Receipt Export
        </td>
        <td>Scoped strictly to assigned Village/Panchayat. Read/Write access to local reports; no authority to broadcast or resolve taluk-level escalations.</td>
      </tr>
      <tr>
        <td><strong>Tier 2:<br>Taluk Disaster Officer</strong></td>
        <td>Verification queue management, AI recommendation review, duplicate detection, ground validation dispatch, taluk incident escalation.</td>
        <td>
          &bull; Verification Workbench<br>
          &bull; AI Duplicate/Spam Analysis Panel<br>
          &bull; Taluk GIS Incident Heatmap<br>
          &bull; Recharts Monthly Incident Analytics
        </td>
        <td>Scoped to assigned Taluk (spanning 15-30 villages). Can escalate incidents to District EOC or reject fraudulent reports.</td>
      </tr>
      <tr>
        <td><strong>Tier 3:<br>District EOC Command</strong></td>
        <td>24/7 multi-incident monitoring, emergency resource dispatch (Fire, Police, NDRF), draft broadcast creation, district health index tracking.</td>
        <td>
          &bull; Real-time Operations Dashboard<br>
          &bull; Resource Command (Vehicle/Team Dispatch)<br>
          &bull; Broadcast Center (Radio/Siren Formulator)<br>
          &bull; Incident Timeline & SLA Monitor
        </td>
        <td>Scoped to entire District. Can mobilize district resources and submit broadcast requests to District Collector.</td>
      </tr>
      <tr>
        <td><strong>Tier 4:<br>District Collector (Executive)</strong></td>
        <td>Supreme executive authority, critical incident authorization, emergency cell broadcast approval, evacuation orders, state advisory coordination.</td>
        <td>
          &bull; Executive War Room Dashboard<br>
          &bull; Digital Broadcast Approval Queue<br>
          &bull; District Situation Map (High Risk Zones)<br>
          &bull; Official Order PDF Generator & AI Insights
        </td>
        <td>Unrestricted administrative authority across district. Sole authority capable of converting <code>PENDING</code> broadcasts to <code>LIVE</code> public alerts.</td>
      </tr>
      <tr>
        <td><strong>Tier 5:<br>State Disaster Authority (SDMA)</strong></td>
        <td>State-wide disaster oversight across all 38 districts, macro disaster prediction, inter-district resource reallocation, statewide alerts.</td>
        <td>
          &bull; 38-District State Matrix Dashboard<br>
          &bull; AI Disaster Prediction Engine<br>
          &bull; Live Weather Advisory (Open-Meteo)<br>
          &bull; State Resource Allocation Command
        </td>
        <td>Full read/write telemetry across all 38 districts of Tamil Nadu. Authority to declare state-level disaster emergencies.</td>
      </tr>
    </tbody>
  </table>

  <h3>Cross-Tier Operational SLAs</h3>
  <div class="card-grid-2">
    <div class="card">
      <div class="card-title" style="color: #0369a1;">Field Verification SLA</div>
      <p style="font-size: 7.6pt; margin: 0;"><strong>Critical / Severe Incidents:</strong> Taluk verification mandated within <strong>15 minutes</strong>. Automatic escalation to District EOC if unacknowledged within 20 minutes.</p>
    </div>
    <div class="card">
      <div class="card-title" style="color: #b91c1c;">Broadcast Approval SLA</div>
      <p style="font-size: 7.6pt; margin: 0;"><strong>Emergency Cell Broadcasts:</strong> Collector authorization turn-around target of <strong>under 3 minutes</strong> with instant push notifications and fallback SMS alerts.</p>
    </div>
  </div>

  <div class="page-footer-bar">
    <span>ALERT 4.0 GOVERNMENT &bull; Project Summary</span>
    <span>Confidential — Official Government Documentation</span>
    <span>Page 3</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 4: TECHNICAL ARCHITECTURE & MICROSERVICES                            -->
<!-- ========================================================================= -->
<div class="page">
  <div class="page-header-bar">
    <span class="logo-title">ALERT 4.0 GOVERNMENT</span>
    <span>Technical Architecture & Microservices Blueprint</span>
    <span>Page 4</span>
  </div>

  <h2>5. Technical Architecture & Microservices Blueprint</h2>
  <p>
    ALERT 4.0 utilizes a decoupled, cloud-native <strong>Microservices Architecture</strong> built on Java Spring Boot 3.x and Spring Cloud. The backend ecosystem leverages Netflix Eureka for dynamic service registry, Spring Cloud Config for centralized configurations, and Spring Cloud Gateway for centralized routing, SSL termination, and JWT security filtering.
  </p>

  <div class="arch-diagram">
    <div class="arch-layer" style="background: #f0f9ff; border-color: #bae6fd;">
      <div class="arch-layer-title">Client Layer (React 19 SPA + GIS + Leaflet)</div>
      <div class="arch-layer-items">
        <div class="arch-chip">Village Portal</div>
        <div class="arch-chip">Taluk Workbench</div>
        <div class="arch-chip">District EOC Console</div>
        <div class="arch-chip">Collector War Room</div>
        <div class="arch-chip">SDMA State Monitor</div>
      </div>
    </div>

    <div class="arch-layer" style="background: #e0f2fe; border-color: #7dd3fc;">
      <div class="arch-layer-title">API Gateway & Discovery Layer (Port 8081 & 8761)</div>
      <div class="arch-layer-items">
        <div class="arch-chip">Spring Cloud Gateway (8081)</div>
        <div class="arch-chip">Eureka Discovery Server (8761)</div>
        <div class="arch-chip">Spring Cloud Config Server (8888)</div>
        <div class="arch-chip">JWT Security & CORS Filter</div>
      </div>
    </div>

    <div class="arch-layer" style="background: #f8fafc; border-color: #cbd5e1;">
      <div class="arch-layer-title">Core Backend Microservices (Spring Boot 3.x)</div>
      <div class="arch-layer-items">
        <div class="arch-chip">Auth Service (8082)</div>
        <div class="arch-chip">User & Ref Service (8083)</div>
        <div class="arch-chip">Incident Service (8084)</div>
        <div class="arch-chip">Alert Service (8085)</div>
        <div class="arch-chip">Approval Service (8086)</div>
        <div class="arch-chip">Notification Service (8087)</div>
        <div class="arch-chip">Analytics Service (8088)</div>
        <div class="arch-chip">AI Bridge Service (8089)</div>
      </div>
    </div>

    <div class="arch-layer" style="background: #fdf4ff; border-color: #f0abfc;">
      <div class="arch-layer-title">AI & Intelligence Subsystem</div>
      <div class="arch-layer-items">
        <div class="arch-chip">FastAPI AI Microservice (8000)</div>
        <div class="arch-chip">Ollama LLM (Llama 3 8B) (11434)</div>
        <div class="arch-chip">Open-Meteo Meteorological API</div>
      </div>
    </div>

    <div class="arch-layer" style="background: #fefce8; border-color: #fde047;">
      <div class="arch-layer-title">Polyglot Persistence Layer</div>
      <div class="arch-layer-items">
        <div class="arch-chip">Oracle Database XE (1521/1522) - ACID Relational Store</div>
        <div class="arch-chip">MongoDB Atlas (27017) - Incident Media & Binary Attachments</div>
      </div>
    </div>
  </div>

  <h2>6. Microservices Catalog & Responsibilities</h2>
  <div class="card-grid-2">
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">1. Auth Service</span>
        <span class="service-port">PORT 8082</span>
      </div>
      <div class="service-desc">Issues signed cryptographic JWT tokens, handles login authentication with BCrypt hashing, enforces role-based permissions, and manages officer credential validations.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">2. User & Reference Service</span>
        <span class="service-port">PORT 8083</span>
      </div>
      <div class="service-desc">Maintains user profiles, administrative catalogs of all 38 Tamil Nadu districts, taluk mappings, emergency contact rosters, and departmental officer registries.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">3. Incident Service</span>
        <span class="service-port">PORT 8084</span>
      </div>
      <div class="service-desc">Manages the end-to-end incident lifecycle state machine (<code>REPORTED</code> &rarr; <code>TALUK_VERIFIED</code> &rarr; <code>DISTRICT_APPROVED</code> &rarr; <code>RESOLVED</code>), dual-writes relational data to Oracle and images to MongoDB.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">4. Alert & Broadcast Service</span>
        <span class="service-port">PORT 8085</span>
      </div>
      <div class="service-desc">Orchestrates emergency cell broadcasts, simulated public warning sirens, radio scripts, and geo-targeted citizen push alerts across impacted taluks.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">5. Approval Service</span>
        <span class="service-port">PORT 8086</span>
      </div>
      <div class="service-desc">Enforces sovereign Collector broadcast approval workflows, generates immutable digital audit logs, and validates status transitions before broadcasts go live.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">6. Notification Service</span>
        <span class="service-port">PORT 8087</span>
      </div>
      <div class="service-desc">Dispatches real-time internal alerts to Taluk Officers, District EOCs, and Collectors upon incident status changes or escalation triggers.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">7. Analytics Service</span>
        <span class="service-port">PORT 8088</span>
      </div>
      <div class="service-desc">Aggregates historical incident data, calculates mean time to response (MTTR), compiles monthly district health indexes, and generates exportable charts.</div>
    </div>
    <div class="service-card">
      <div class="service-header">
        <span class="service-name">8. AI Bridge & Python Service</span>
        <span class="service-port">PORT 8089 / 8000</span>
      </div>
      <div class="service-desc">Integrates Java backend with Python FastAPI + Ollama (Llama 3) for automated severity extraction, bilingual processing, spam detection, and weather prediction.</div>
    </div>
  </div>

  <div class="page-footer-bar">
    <span>ALERT 4.0 GOVERNMENT &bull; Project Summary</span>
    <span>Confidential — Official Government Documentation</span>
    <span>Page 4</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 5: AI SUBSYSTEM, POLYGLOT DATABASE & SECURITY                        -->
<!-- ========================================================================= -->
<div class="page">
  <div class="page-header-bar">
    <span class="logo-title">ALERT 4.0 GOVERNMENT</span>
    <span>AI Subsystem, Polyglot Database & Security</span>
    <span>Page 5</span>
  </div>

  <h2>7. Artificial Intelligence Subsystem (AlertGov AI)</h2>
  <p>
    The AI subsystem operates as an autonomous cognitive intelligence layer designed to assist non-technical rural operators and speed up administrative triage. Running locally via <strong>FastAPI and Ollama Llama 3</strong>, it ensures total data privacy with zero exposure of sensitive disaster logs to external cloud APIs.
  </p>

  <div class="card-grid-2" style="margin-bottom: 6px;">
    <div class="card card-purple">
      <div class="card-title" style="color: #6b21a8;">Incident Risk Scoring & Categorization</div>
      <p style="font-size: 7.7pt;">
        Parses raw operator text inputs into formal structured JSON. Assigns standardized risk severity (<code>Low</code>, <code>Medium</code>, <code>High</code>, <code>Severe</code>, <code>Extremely Severe</code>), suggests immediate tactical response teams, and generates concise two-sentence summaries for official dispatch logs.
      </p>
    </div>
    <div class="card card-blue">
      <div class="card-title" style="color: #0369a1;">Automated Weather Advisory Engine</div>
      <p style="font-size: 7.7pt;">
        Polls real-time meteorological metrics (temperature, precipitation sum, max wind speed) via Open-Meteo API. Formulates preventative advisories for coastal and riverbank districts (e.g. Heavy Rain Warning, Dam Opening Alert, Cyclone Caution).
      </p>
    </div>
  </div>

  <div class="card-grid-2" style="margin-bottom: 8px;">
    <div class="card card-emerald">
      <div class="card-title" style="color: #15803d;">Bilingual NLP (English & Tamil)</div>
      <p style="font-size: 7.7pt;">
        Full dual-language prompt support. Operators in rural Tamil Nadu can describe incidents in native Tamil (தமிழ் script), and the AI accurately parses and formats official English/Tamil summaries.
      </p>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="color: #d97706;">High-Availability Fallback Mode</div>
      <p style="font-size: 7.7pt;">
        If the local LLM instance is offline or compiling, a deterministic heuristic NLP parser automatically takes over, extracting categories, locations, and urgency to prevent system lockups.
      </p>
    </div>
  </div>

  <h2>8. Polyglot Database Architecture</h2>
  <p>
    ALERT 4.0 implements a dual-database architecture ensuring maximum transactional integrity for administrative decisions while optimizing the storage and streaming of high-resolution photographic evidence.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Database Engine</th>
        <th style="width: 35%;">Managed Entities & Schemas</th>
        <th style="width: 40%;">Architectural Rationale & Benefits</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Oracle Database XE<br>(Relational Core)</strong></td>
        <td>
          &bull; <code>USERS</code>, <code>ROLES</code>, <code>USER_ROLES</code><br>
          &bull; <code>DISTRICTS</code>, <code>TALUKS</code><br>
          &bull; <code>INCIDENTS</code> (metadata, GPS, status)<br>
          &bull; <code>APPROVAL_REQUESTS</code><br>
          &bull; <code>ALERT_BROADCASTS</code>, <code>RESOURCES</code>
        </td>
        <td>
          &bull; <strong>Full ACID Compliance:</strong> Prevents race conditions during simultaneous Collector approvals.<br>
          &bull; <strong>Referential Integrity:</strong> Strict foreign key cascades across districts, taluks, and users.<br>
          &bull; <strong>Government Standard:</strong> Established compliance standard for public sector deployments.
        </td>
      </tr>
      <tr>
        <td><strong>MongoDB Atlas<br>(Document Core)</strong></td>
        <td>
          &bull; <code>incident_media</code> (Base64/Binary images)<br>
          &bull; <code>disaster_evidence_blobs</code><br>
          &bull; <code>unstructured_sensor_telemetry</code><br>
          &bull; <code>ai_prediction_cache</code>
        </td>
        <td>
          &bull; <strong>High Throughput:</strong> Fast binary streaming of multi-megabyte field photos.<br>
          &bull; <strong>Zero Relational Bloat:</strong> Keeps Oracle DB lightweight and blazing fast for transactional queries.<br>
          &bull; <strong>Dynamic Schema:</strong> Easily stores varying metadata from diverse IoT devices.
        </td>
      </tr>
    </tbody>
  </table>

  <h2>9. Security, RBAC & Governance</h2>
  <ul>
    <li><strong>Stateless JWT Authentication:</strong> HMAC-SHA256 signed JSON Web Tokens containing user identity, role, district scope, and expiration timestamps.</li>
    <li><strong>Cryptographic Password Protection:</strong> BCrypt password hashing with adaptive work factor salts.</li>
    <li><strong>Zero-Trust API Gateway:</strong> Every inbound request through Port 8081 is validated against role policies before forwarding to internal microservices.</li>
    <li><strong>Dual-Validation Authorization:</strong> Prevents unilateral emergency broadcasts. EOC operators can only create draft broadcast requests; only the District Collector can authorize execution.</li>
    <li><strong>Immutable Audit Trails:</strong> Every status update, approval decision, and broadcast dispatch is stamped with officer ID, timestamp, and IP address.</li>
  </ul>

  <div class="page-footer-bar">
    <span>ALERT 4.0 GOVERNMENT &bull; Project Summary</span>
    <span>Confidential — Official Government Documentation</span>
    <span>Page 5</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 6: INCIDENT WORKFLOW, DEPLOYMENT & DELIVERABLES                      -->
<!-- ========================================================================= -->
<div class="page-last">
  <div class="page-header-bar">
    <span class="logo-title">ALERT 4.0 GOVERNMENT</span>
    <span>Lifecycle Workflow, Deployment & Deliverables</span>
    <span>Page 6</span>
  </div>

  <h2>10. End-to-End Incident Lifecycle & Escalation Workflow</h2>
  <div class="timeline-container">
    <div class="timeline-step">
      <div class="timeline-title">Step 1: Grassroots Incident Capture (Village VEO)</div>
      <div class="timeline-desc">VEO inputs incident details, uploads geotagged photo, and records voice prompt. Oracle records metadata; MongoDB stores photo. Incident status initialized to <code>REPORTED</code>.</div>
    </div>
    <div class="timeline-step">
      <div class="timeline-title">Step 2: AI Risk Assessment & Taluk Verification (Taluk Officer)</div>
      <div class="timeline-desc">AI evaluates severity and flags duplicates. Taluk officer verifies evidence, assigns local response team, and escalates to <code>TALUK_VERIFIED</code>.</div>
    </div>
    <div class="timeline-step">
      <div class="timeline-title">Step 3: District EOC Triage & Broadcast Request (District Command)</div>
      <div class="timeline-desc">District EOC tracks incident on live GIS map, dispatches Fire/NDRF resources, formulates emergency broadcast script, and submits approval request to Collector. Status: <code>DISTRICT_PENDING</code>.</div>
    </div>
    <div class="timeline-step">
      <div class="timeline-title">Step 4: Collector Authorization & Cell Broadcast (District Collector)</div>
      <div class="timeline-desc">Collector reviews incident severity in War Room. Upon approval, status changes to <code>LIVE_BROADCAST</code>, triggering public sirens and localized SMS/radio broadcasts.</div>
    </div>
    <div class="timeline-step">
      <div class="timeline-title">Step 5: Incident Resolution & Post-Mortem Analytics (All Tiers)</div>
      <div class="timeline-desc">Field responders mitigate disaster. Incident marked <code>RESOLVED</code>. Analytics service compiles response time metrics and updates SDMA state health score.</div>
    </div>
  </div>

  <h2>11. Deployment Architecture & Docker Orchestration</h2>
  <p>
    The entire system is orchestrated via <strong>Docker Compose</strong> for single-command deployment in on-premises government data centers or state cloud infrastructure (TNeGA Cloud).
  </p>
  <div class="card-grid-3">
    <div class="card">
      <div class="card-title" style="color: #0369a1;">Container Stack</div>
      <p style="font-size: 7.4pt; margin: 0;">12 microservices + Oracle XE + MongoDB + Ollama AI + Nginx Frontend bundled in <code>docker-compose.yml</code>.</p>
    </div>
    <div class="card">
      <div class="card-title" style="color: #15803d;">Network Isolation</div>
      <p style="font-size: 7.4pt; margin: 0;">Internal bridge networks ensure backend databases (Oracle/Mongo) are shielded from direct public exposure.</p>
    </div>
    <div class="card">
      <div class="card-title" style="color: #6b21a8;">Zero-Downtime Design</div>
      <p style="font-size: 7.4pt; margin: 0;">Eureka service registry and health checks enable graceful container restarts and rolling service upgrades.</p>
    </div>
  </div>

  <h2>12. Comprehensive Project Deliverables Inventory</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Deliverable Artifact</th>
        <th style="width: 35%;">Format & File Location</th>
        <th style="width: 40%;">Description & Content Scope</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Project Overall Summary</strong></td>
        <td><code>ALERT_4.0_GOVERNMENT_Overall_Project_Summary.pdf</code></td>
        <td>Executive summary, 5-tier governance, microservices architecture, AI subsystem, database design, and workflow specifications.</td>
      </tr>
      <tr>
        <td><strong>System Requirements Spec (SRS)</strong></td>
        <td><code>ALERTGOV_Final_SRS_30Pages.pdf</code></td>
        <td>Comprehensive 30-page IEEE 830 compliant System Requirements Specification with functional &amp; non-functional requirements.</td>
      </tr>
      <tr>
        <td><strong>Architecture Documentation</strong></td>
        <td><code>Architecture_Documentation.pdf</code></td>
        <td>Deep-dive technical document detailing microservices, Spring Cloud Gateway routes, Eureka registry, and security topology.</td>
      </tr>
      <tr>
        <td><strong>Database Documentation</strong></td>
        <td><code>Database_Documentation.pdf</code> / <code>.md</code></td>
        <td>Complete Oracle XE relational schema definitions, table DDLs, indexes, foreign keys, and MongoDB document schemas.</td>
      </tr>
      <tr>
        <td><strong>REST API Documentation</strong></td>
        <td><code>API_Documentation.pdf</code> / Postman JSON</td>
        <td>All microservice REST endpoints, request/response payloads, authentication headers, and status error codes.</td>
      </tr>
      <tr>
        <td><strong>Role-Based Login Credentials</strong></td>
        <td><code>AlertGov_Login_Credentials.pdf</code></td>
        <td>Pre-configured officer test credentials spanning all 5 administrative tiers (VEO, Taluk, EOC, Collector, SDMA).</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer-bar">
    <span>ALERT 4.0 GOVERNMENT &bull; Project Summary</span>
    <span>Confidential — Official Government Documentation</span>
    <span>Page 6</span>
  </div>
</div>

</body>
</html>`;

  // Write temporary HTML
  const tempHtmlPath = path.resolve(__dirname, 'temp_project_summary.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);

  console.log('Launching headless browser via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const outputPdfPath = path.resolve('../ALERT_4.0_GOVERNMENT_Overall_Project_Summary.pdf');
  
  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  await browser.close();
  console.log('SUCCESS: ALERT 4.0 GOVERNMENT Overall Project Summary PDF generated at: ' + outputPdfPath);
}

generateProjectSummaryPDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
