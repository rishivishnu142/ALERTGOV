import os
import subprocess

def generate_er_svg():
    width = 2500
    height = 1450
    
    entities = {
        "RESOURCES": {
            "label": "RESOURCES",
            "cx": 480, "cy": 180, "w": 160, "h": 52,
            "attrs": [
                ("resourceId", True, False, 330, 100),
                ("resourceType", False, False, 480, 85),
                ("allocatedDistrict", False, True, 630, 100),
                ("quantity", False, False, 320, 180),
                ("officerContact", False, False, 320, 255),
                ("status", False, False, 480, 270),
            ]
        },
        "DISTRICTS": {
            "label": "DISTRICTS",
            "cx": 1050, "cy": 180, "w": 160, "h": 52,
            "attrs": [
                ("districtId", True, False, 900, 95),
                ("districtName", False, False, 1050, 80),
                ("headquarters", False, False, 1200, 95),
                ("zoneCode", False, False, 920, 265),
                ("stateCode", False, False, 1050, 275),
            ]
        },
        "TALUKS": {
            "label": "TALUKS",
            "cx": 1600, "cy": 180, "w": 150, "h": 52,
            "attrs": [
                ("talukId", True, False, 1470, 95),
                ("talukName", False, False, 1600, 80),
                ("districtId", False, True, 1730, 95),
                ("tahsildarName", False, False, 1600, 270),
            ]
        },
        "VILLAGES": {
            "label": "VILLAGES",
            "cx": 2120, "cy": 180, "w": 150, "h": 52,
            "attrs": [
                ("villageId", True, False, 1990, 95),
                ("villageName", False, False, 2120, 80),
                ("talukId", False, True, 2250, 95),
                ("riskZone", False, False, 2010, 270),
                ("population", False, False, 2180, 270),
            ]
        },
        "USERS": {
            "label": "USERS",
            "cx": 380, "cy": 560, "w": 150, "h": 52,
            "attrs": [
                ("userId", True, False, 180, 460),
                ("username", False, False, 180, 525),
                ("password", False, False, 180, 590),
                ("role", False, False, 180, 655),
                ("department", False, False, 310, 420),
                ("phoneNumber", False, False, 440, 420),
                ("email", False, False, 310, 695),
                ("jurisdictionId", False, True, 450, 695),
            ]
        },
        "INCIDENTS": {
            "label": "INCIDENTS",
            "cx": 1050, "cy": 720, "w": 180, "h": 56,
            "attrs": [
                ("incidentId", True, False, 840, 595),
                ("title", False, False, 970, 575),
                ("category", False, False, 1110, 575),
                ("severity", False, False, 1240, 595),
                ("status", False, False, 820, 675),
                ("reportedBy", False, True, 820, 745),
                ("reportedAt", False, False, 840, 820),
                ("gpsLatitude", False, False, 1250, 675),
                ("gpsLongitude", False, False, 1250, 745),
                ("description", False, False, 1250, 820),
            ]
        },
        "APPROVAL_WORKFLOWS": {
            "label": "APPROVAL_WORKFLOWS",
            "cx": 1680, "cy": 720, "w": 210, "h": 56,
            "attrs": [
                ("approvalId", True, False, 1510, 590),
                ("incidentId", False, True, 1660, 575),
                ("assignedCollectorId", False, True, 1820, 590),
                ("status", False, False, 1510, 845),
                ("comments", False, False, 1660, 860),
                ("createdAt", False, False, 1800, 845),
                ("reviewedAt", False, False, 1930, 790),
            ]
        },
        "ALERTS": {
            "label": "ALERTS",
            "cx": 2180, "cy": 720, "w": 150, "h": 52,
            "attrs": [
                ("alertId", True, False, 2030, 600),
                ("incidentId", False, True, 2160, 585),
                ("senderId", False, True, 2290, 600),
                ("title", False, False, 2370, 675),
                ("severity", False, False, 2370, 745),
                ("targetDistrict", False, False, 2030, 835),
                ("targetTaluk", False, False, 2160, 850),
                ("validUntil", False, False, 2290, 835),
            ]
        },
        "NOTIFICATIONS": {
            "label": "NOTIFICATIONS",
            "cx": 2180, "cy": 380, "w": 180, "h": 52,
            "attrs": [
                ("notificationId", True, False, 2020, 275),
                ("alertId", False, True, 2160, 260),
                ("channelType", False, False, 2300, 275),
                ("recipientRole", False, False, 2370, 350),
                ("deliveryStatus", False, False, 2370, 415),
                ("sentAt", False, False, 2180, 465),
            ]
        },
        "TRANSLATIONS": {
            "label": "TRANSLATIONS",
            "cx": 2180, "cy": 1160, "w": 180, "h": 52,
            "attrs": [
                ("translationId", True, False, 2010, 1065),
                ("alertId", False, True, 2160, 1050),
                ("languageCode", False, False, 2310, 1065),
                ("tamilText", False, False, 2010, 1255),
                ("englishText", False, False, 2160, 1270),
                ("audioUrl", False, False, 2310, 1255),
            ]
        },
        "INCIDENT_MEDIA": {
            "label": "INCIDENT_MEDIA",
            "cx": 1050, "cy": 1220, "w": 190, "h": 52,
            "attrs": [
                ("mediaId", True, False, 870, 1135),
                ("incidentId", False, True, 1020, 1120),
                ("fileType", False, False, 1170, 1135),
                ("storageUrl", False, False, 870, 1315),
                ("capturedAt", False, False, 1020, 1330),
                ("fileSizeBytes", False, False, 1170, 1315),
            ]
        },
        "AI_PREDICTIONS": {
            "label": "AI_PREDICTIONS",
            "cx": 480, "cy": 1120, "w": 180, "h": 52,
            "attrs": [
                ("predictionId", True, False, 300, 1035),
                ("incidentId", False, True, 450, 1020),
                ("predictedSeverity", False, False, 600, 1035),
                ("spreadRadiusKm", False, False, 300, 1215),
                ("recommendations", False, False, 450, 1230),
                ("generatedAt", False, False, 600, 1215),
                ("confidenceScore", False, False, 280, 1125),
            ]
        }
    }
    
    relationships = [
        {"name": "Deploys", "x": 765, "y": 180, "e1": "DISTRICTS", "c1": "1", "e2": "RESOURCES", "c2": "N"},
        {"name": "Contains_T", "x": 1325, "y": 180, "e1": "DISTRICTS", "c1": "1", "e2": "TALUKS", "c2": "N"},
        {"name": "Contains_V", "x": 1860, "y": 180, "e1": "TALUKS", "c1": "1", "e2": "VILLAGES", "c2": "N"},
        {"name": "Assigned_To", "x": 715, "y": 370, "e1": "USERS", "c1": "N", "e2": "DISTRICTS", "c2": "1"},
        {"name": "Reports", "x": 715, "y": 640, "e1": "USERS", "c1": "1", "e2": "INCIDENTS", "c2": "N"},
        {"name": "Reviews", "x": 1050, "y": 450, "e1": "USERS", "c1": "1", "e2": "APPROVAL_WORKFLOWS", "c2": "N", "curved": True},
        {"name": "Governs", "x": 1365, "y": 720, "e1": "INCIDENTS", "c1": "1", "e2": "APPROVAL_WORKFLOWS", "c2": "1"},
        {"name": "Triggers", "x": 1930, "y": 720, "e1": "APPROVAL_WORKFLOWS", "c1": "1", "e2": "ALERTS", "c2": "1"},
        {"name": "Contains_M", "x": 1050, "y": 970, "e1": "INCIDENTS", "c1": "1", "e2": "INCIDENT_MEDIA", "c2": "N"},
        {"name": "Analyzes", "x": 765, "y": 920, "e1": "INCIDENTS", "c1": "1", "e2": "AI_PREDICTIONS", "c2": "1"},
        {"name": "Dispatches", "x": 2180, "y": 550, "e1": "ALERTS", "c1": "1", "e2": "NOTIFICATIONS", "c2": "N"},
        {"name": "Localizes", "x": 2180, "y": 940, "e1": "ALERTS", "c1": "1", "e2": "TRANSLATIONS", "c2": "N"},
    ]

    svg_lines = []
    svg_lines.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" style="background-color: #ffffff; font-family: Segoe UI, -apple-system, BlinkMacSystemFont, Arial, sans-serif;">')
    
    svg_lines.append('''
    <defs>
      <filter id="shadow" x="-8%" y="-8%" width="116%" height="116%">
        <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="0.12" />
      </filter>
      <style>
        .title-text { font-size: 28px; font-weight: 800; fill: #0f172a; letter-spacing: 0.5px; }
        .subtitle-text { font-size: 14.5px; font-weight: 500; fill: #475569; }
        
        .entity-box { fill: #ffffff; stroke: #1e3a8a; stroke-width: 2.8; }
        .entity-title { font-size: 15px; font-weight: 800; fill: #1e3a8a; text-anchor: middle; dominant-baseline: middle; letter-spacing: 0.6px; }
        
        .rel-diamond { fill: #ffffff; stroke: #047857; stroke-width: 2.4; }
        .rel-title { font-size: 12.5px; font-weight: 700; fill: #047857; text-anchor: middle; dominant-baseline: middle; }
        
        .attr-oval { fill: #ffffff; stroke: #475569; stroke-width: 1.5; }
        .attr-oval-pk { fill: #eff6ff; stroke: #1d4ed8; stroke-width: 2.2; }
        .attr-text { font-size: 12px; font-weight: 500; fill: #334155; text-anchor: middle; dominant-baseline: middle; }
        .attr-text-pk { font-size: 12px; font-weight: 800; fill: #1e3a8a; text-anchor: middle; dominant-baseline: middle; text-decoration: underline; }
        .attr-text-fk { font-size: 12px; font-style: italic; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
        
        .conn-line { stroke: #64748b; stroke-width: 1.4; }
        .rel-line { stroke: #047857; stroke-width: 2.2; }
        
        .card-badge { fill: #ffffff; stroke: #f43f5e; stroke-width: 1.2; rx: 4; }
        .card-text { font-size: 12.5px; font-weight: 800; fill: #e11d48; text-anchor: middle; dominant-baseline: middle; }
        
        .legend-card { fill: #f8fafc; stroke: #cbd5e1; stroke-width: 1.8; rx: 8; }
      </style>
    </defs>
    ''')
    
    # Document Header
    svg_lines.append(f'''
    <!-- Document Header -->
    <g transform="translate(60, 55)">
      <text x="0" y="0" class="title-text">ALERT 4.0 GOVERNMENT — ENTITY RELATIONSHIP (ER) DIAGRAM</text>
      <text x="0" y="24" class="subtitle-text">Tamil Nadu Disaster Management Authority (TNDMA) | SIH25_097 | Complete 5-Tier Command &amp; Emergency Relational Schema</text>
    </g>
    ''')

    # Legend in bottom left
    svg_lines.append(f'''
    <!-- Legend -->
    <g transform="translate(60, 1310)">
      <rect width="530" height="95" class="legend-card" filter="url(#shadow)" />
      <text x="18" y="22" font-size="12px" font-weight="800" fill="#0f172a">ER DIAGRAM NOTATION KEY (CHEN NOTATION)</text>
      
      <!-- Entity Sample -->
      <rect x="18" y="38" width="80" height="24" class="entity-box" rx="3" />
      <text x="58" y="50" class="entity-title" font-size="10px">ENTITY</text>
      <text x="106" y="51" font-size="11px" font-weight="500" fill="#475569">Entity / Table</text>

      <!-- Relationship Sample -->
      <polygon points="215,50 238,38 261,50 238,62" class="rel-diamond" />
      <text x="238" y="50" class="rel-title" font-size="9px">REL</text>
      <text x="272" y="51" font-size="11px" font-weight="500" fill="#475569">Relationship</text>

      <!-- PK Sample -->
      <ellipse cx="60" cy="78" rx="42" ry="11" class="attr-oval-pk" />
      <text x="60" y="78" class="attr-text-pk" font-size="10px">primary_key</text>
      <text x="108" y="79" font-size="11px" font-weight="500" fill="#475569">Primary Key</text>

      <!-- Attribute Sample -->
      <ellipse cx="238" cy="78" rx="36" ry="11" class="attr-oval" />
      <text x="238" y="78" class="attr-text" font-size="10px">attribute</text>
      <text x="280" y="79" font-size="11px" font-weight="500" fill="#475569">Attribute</text>

      <!-- Cardinality Sample -->
      <rect x="380" y="40" width="34" height="20" class="card-badge" />
      <text x="397" y="50" class="card-text">1 : N</text>
      <text x="424" y="51" font-size="11px" font-weight="500" fill="#475569">Cardinality</text>
    </g>
    ''')

    # Draw Relationship Lines
    for rel in relationships:
        e1 = entities[rel["e1"]]
        e2 = entities[rel["e2"]]
        rx, ry = rel["x"], rel["y"]
        
        if rel.get("curved"):
            # Curved path for USERS -> Reviews -> APPROVAL_WORKFLOWS
            svg_lines.append(f'<path d="M {e1["cx"]} {e1["cy"]} Q {rx} {ry} {rx} {ry}" class="rel-line" fill="none" />')
            svg_lines.append(f'<path d="M {rx} {ry} Q {rx} {ry} {e2["cx"]} {e2["cy"]}" class="rel-line" fill="none" />')
        else:
            svg_lines.append(f'<line x1="{e1["cx"]}" y1="{e1["cy"]}" x2="{rx}" y2="{ry}" class="rel-line" />')
            svg_lines.append(f'<line x1="{rx}" y1="{ry}" x2="{e2["cx"]}" y2="{e2["cy"]}" class="rel-line" />')
        
        # Cardinality Badges
        c1_x = e1["cx"] + (rx - e1["cx"]) * 0.32
        c1_y = e1["cy"] + (ry - e1["cy"]) * 0.32
        c2_x = e2["cx"] + (rx - e2["cx"]) * 0.32
        c2_y = e2["cy"] + (ry - e2["cy"]) * 0.32
        
        svg_lines.append(f'<rect x="{c1_x-12}" y="{c1_y-11}" width="24" height="22" class="card-badge" />')
        svg_lines.append(f'<text x="{c1_x}" y="{c1_y}" class="card-text">{rel["c1"]}</text>')
        
        svg_lines.append(f'<rect x="{c2_x-12}" y="{c2_y-11}" width="24" height="22" class="card-badge" />')
        svg_lines.append(f'<text x="{c2_x}" y="{c2_y}" class="card-text">{rel["c2"]}</text>')

    # Draw Diamonds
    for rel in relationships:
        rx, ry = rel["x"], rel["y"]
        dw, dh = 52, 28
        pts = f"{rx},{ry-dh} {rx+dw},{ry} {rx},{ry+dh} {rx-dw},{ry}"
        svg_lines.append(f'<polygon points="{pts}" class="rel-diamond" filter="url(#shadow)" />')
        svg_lines.append(f'<text x="{rx}" y="{ry}" class="rel-title">{rel["name"]}</text>')

    # Draw Entity Attributes & Boxes
    for e_id, ent in entities.items():
        ecx, ecy = ent["cx"], ent["cy"]
        ew, eh = ent["w"], ent["h"]
        
        # Attributes
        for attr_name, is_pk, is_fk, ax, ay in ent["attrs"]:
            svg_lines.append(f'<line x1="{ecx}" y1="{ecy}" x2="{ax}" y2="{ay}" class="conn-line" />')
            
            text_len = len(attr_name)
            ow = max(44, text_len * 4.9 + 12)
            oh = 15
            
            oval_class = "attr-oval-pk" if is_pk else "attr-oval"
            text_class = "attr-text-pk" if is_pk else ("attr-text-fk" if is_fk else "attr-text")
            
            svg_lines.append(f'<ellipse cx="{ax}" cy="{ay}" rx="{ow}" ry="{oh}" class="{oval_class}" filter="url(#shadow)" />')
            svg_lines.append(f'<text x="{ax}" y="{ay}" class="{text_class}">{attr_name}</text>')

        # Entity Box
        bx = ecx - ew / 2
        by = ecy - eh / 2
        svg_lines.append(f'<rect x="{bx}" y="{by}" width="{ew}" height="{eh}" class="entity-box" rx="6" filter="url(#shadow)" />')
        svg_lines.append(f'<text x="{ecx}" y="{ecy}" class="entity-title">{ent["label"]}</text>')

    svg_lines.append('</svg>')
    return '\n'.join(svg_lines)

if __name__ == "__main__":
    svg_content = generate_er_svg()
    
    # Save SVG
    with open("AlertGov_ER_Diagram.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Saved AlertGov_ER_Diagram.svg")
    
    # Save HTML Wrapper
    html_page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ALERT 4.0 GOVERNMENT - ER Diagram</title>
<style>
  @page {{
    size: A3 landscape;
    margin: 0;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2500px;
    height: 1450px;
    overflow: hidden;
  }}
  svg {{
    width: 2500px;
    height: 1450px;
    display: block;
  }}
</style>
</head>
<body>
{svg_content}
</body>
</html>
"""
    with open("AlertGov_ER_Diagram.html", "w", encoding="utf-8") as f:
        f.write(html_page)
    print("Saved AlertGov_ER_Diagram.html")
    
    # Generate Ultra High-Res PNG (device-scale-factor=2 for ultra sharpness)
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    html_path = os.path.abspath("AlertGov_ER_Diagram.html")
    png_path = os.path.abspath("AlertGov_ER_Diagram.png")
    pdf_path = os.path.abspath("AlertGov_ER_Diagram.pdf")
    
    cmd_png = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--force-device-scale-factor=2",
        "--window-size=2500,1450",
        f"--screenshot={png_path}",
        f"file:///{html_path}"
    ]
    
    cmd_pdf = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        f"--print-to-pdf={pdf_path}",
        "--no-pdf-header-footer",
        f"file:///{html_path}"
    ]
    
    print("Generating ultra high-resolution PNG...")
    subprocess.run(cmd_png, capture_output=True)
    
    print("Generating landscape PDF...")
    subprocess.run(cmd_pdf, capture_output=True)
    
    print("Finished! PNG size:", os.path.getsize(png_path) if os.path.exists(png_path) else 0)
    print("Finished! PDF size:", os.path.getsize(pdf_path) if os.path.exists(pdf_path) else 0)
