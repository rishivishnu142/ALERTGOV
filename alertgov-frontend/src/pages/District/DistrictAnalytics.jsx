import { useEffect, useMemo } from 'react';
import { Card } from '../../components/common/UIComponents';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Download, BarChart2 } from 'lucide-react';
import { useLiveContextData } from '../../context/LiveContext';

export default function DistrictAnalytics() {
  const { analytics: ANALYTICS_DATA, incidents, refreshData } = useLiveContextData();

  useEffect(() => {
    if (refreshData) refreshData();
  }, []);

  const categoryData = useMemo(() => {
    const cMap = { 
      'Fire': '#f97316', 
      'Flood': '#0ea5e9', 
      'Medical': '#ec4899', 
      'Earthquake': '#8b5cf6', 
      'Critical': '#ef4444', 
      'Flooding': '#0ea5e9', 
      'Building Collapse': '#8b5cf6', 
      'Cyclone': '#06b6d4',
      'Other': '#64748b'
    };
    const counts = {};
    (incidents || []).forEach(inc => {
      const cat = inc.category || inc.type || (inc.title && inc.title.toLowerCase().includes('flood') ? 'Flood' : 'General');
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const entries = Object.keys(counts).map(k => ({ name: k, value: counts[k], color: cMap[k] || '#3b82f6' }));
    if (entries.length === 0) {
      if (ANALYTICS_DATA?.incidentsByType?.length > 0) return ANALYTICS_DATA.incidentsByType;
      return [
        { name: 'Flood', value: 1, color: '#0ea5e9' },
        { name: 'Fire', value: 0, color: '#f97316' },
        { name: 'Medical', value: 0, color: '#ec4899' }
      ];
    }
    return entries;
  }, [incidents, ANALYTICS_DATA]);

  const responseTimeData = useMemo(() => {
    if (ANALYTICS_DATA?.responseTime?.length > 0) return ANALYTICS_DATA.responseTime;
    return [
      { month: 'Jan', avg: 14.2 }, { month: 'Feb', avg: 12.8 }, { month: 'Mar', avg: 11.5 },
      { month: 'Apr', avg: 10.2 }, { month: 'May', avg: 8.9 }, { month: 'Jun', avg: 8.4 },
      { month: 'Jul', avg: 7.8 }, { month: 'Aug', avg: 7.2 }, { month: 'Sep', avg: 6.9 }
    ];
  }, [ANALYTICS_DATA]);

  const broadcastsData = useMemo(() => {
    if (ANALYTICS_DATA?.broadcastByMonth?.length > 0) return ANALYTICS_DATA.broadcastByMonth;
    return [
      { month: 'Jan', broadcasts: 3 }, { month: 'Feb', broadcasts: 5 }, { month: 'Mar', broadcasts: 2 },
      { month: 'Apr', broadcasts: 8 }, { month: 'May', broadcasts: 12 }, { month: 'Jun', broadcasts: 9 },
      { month: 'Jul', broadcasts: 14 }, { month: 'Aug', broadcasts: 18 }, { month: 'Sep', broadcasts: 7 }
    ];
  }, [ANALYTICS_DATA]);

  const handleExport = () => {
    const today   = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const incByType  = categoryData;
    const incBySev   = ANALYTICS_DATA.incidentsBySeverity || [];
    const respTime   = responseTimeData;
    const broadcasts = broadcastsData;

    const totalIncidents = incByType.reduce((s, r) => s + r.value, 0);
    const activeCount    = ANALYTICS_DATA.activeIncidents   || 0;
    const criticalCount  = ANALYTICS_DATA.criticalAlerts    || 0;
    const resolvedCount  = ANALYTICS_DATA.resolvedIncidents || 0;

    const tdStyle = 'padding:7px 10px;border-bottom:1px solid #eee;';
    const mkRows = (arr, keys) => arr.length
      ? arr.map(r => `<tr>${keys.map(k => `<td style="${tdStyle}">${r[k]}</td>`).join('')}</tr>`).join('')
      : `<tr><td colspan="${keys.length}" style="${tdStyle}text-align:center;color:#888;">No data</td></tr>`;

    const respRows = respTime.length
      ? respTime.map(r => `<tr><td style="${tdStyle}">${r.month}</td><td style="${tdStyle}">${r.avg} min</td></tr>`).join('')
      : `<tr><td colspan="2" style="${tdStyle}text-align:center;color:#888;">No data</td></tr>`;

    const bcastRows = broadcasts.length
      ? broadcasts.map(r => `<tr><td style="${tdStyle}">${r.month}</td><td style="${tdStyle}">${r.broadcasts}</td></tr>`).join('')
      : `<tr><td colspan="2" style="${tdStyle}text-align:center;color:#888;">No data</td></tr>`;

    const reportHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<title>District Analytics Report</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Times New Roman',serif;color:#111;background:#fff;padding:30px 40px;}
  @media print{body{padding:10px 20px;}.no-print{display:none!important;}}
  .hdr{text-align:center;border-bottom:3px solid #1e3a5f;padding-bottom:14px;margin-bottom:20px;}
  .hdr img{height:65px;margin-bottom:6px;}
  .hdr h1{font-size:17px;font-weight:bold;}
  .hdr h2{font-size:14px;font-weight:bold;}
  .hdr p{font-size:11px;color:#555;margin-top:3px;}
  .meta{display:flex;justify-content:space-between;font-size:12px;font-weight:bold;border-bottom:1px solid #999;padding-bottom:8px;margin-bottom:18px;}
  .sec{font-size:13px;font-weight:bold;text-decoration:underline;margin:18px 0 10px;text-transform:uppercase;letter-spacing:.5px;}
  .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
  .box{border:1px solid #ccc;border-radius:6px;padding:12px;text-align:center;}
  .box .n{font-size:26px;font-weight:900;color:#1e3a5f;}
  .box .l{font-size:10px;color:#555;margin-top:3px;text-transform:uppercase;font-weight:600;}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:20px;}
  table{width:100%;border-collapse:collapse;font-size:12px;}
  th{background:#1e3a5f;color:#fff;padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase;}
  tr:nth-child(even) td{background:#f7f9fc;}
  .footer{margin-top:28px;border-top:1px solid #ccc;padding-top:12px;display:flex;justify-content:space-between;font-size:11px;color:#666;}
  .sign{text-align:right;margin-top:38px;font-size:13px;line-height:1.8;}
  .print-btn{display:block;margin:16px auto;padding:10px 32px;background:#1e3a5f;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;font-weight:bold;}
</style></head><body>
<div class="hdr">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" onerror="this.style.display='none'"/>
  <h1>GOVERNMENT OF TAMIL NADU</h1>
  <h2>DISTRICT EMERGENCY OPERATIONS CENTRE — ANALYTICS REPORT</h2>
  <p>Collectorate Campus, Coimbatore – 641018, Tamil Nadu &nbsp;|&nbsp; www.tn.gov.in</p>
</div>
<div class="meta">
  <span>REPORT NO: EOC/2026/ANALYTICS/${Date.now().toString().slice(-6)}</span>
  <span>DATE: ${today} &nbsp;&nbsp; TIME: ${timeStr}</span>
</div>
<button class="print-btn no-print" onclick="window.print()">⬇&nbsp; Save as PDF / Print Report</button>
<div class="sec">Executive Summary</div>
<div class="grid4">
  <div class="box"><div class="n">${totalIncidents}</div><div class="l">Total Incidents</div></div>
  <div class="box"><div class="n">${activeCount}</div><div class="l">Active</div></div>
  <div class="box"><div class="n">${criticalCount}</div><div class="l">Critical</div></div>
  <div class="box"><div class="n">${resolvedCount}</div><div class="l">Resolved</div></div>
</div>
<div class="sec">Incident Breakdown</div>
<div class="grid2">
  <table><thead><tr><th>Category</th><th>Count</th></tr></thead><tbody>${mkRows(incByType, ['name','value'])}</tbody></table>
  <table><thead><tr><th>Severity Level</th><th>Count</th></tr></thead><tbody>${mkRows(incBySev, ['name','value'])}</tbody></table>
</div>
<div class="sec">Performance Metrics</div>
<div class="grid2">
  <table><thead><tr><th>Month</th><th>Avg. Response Time</th></tr></thead><tbody>${respRows}</tbody></table>
  <table><thead><tr><th>Month</th><th>Broadcasts Sent</th></tr></thead><tbody>${bcastRows}</tbody></table>
</div>
<div class="sign">
  <div style="margin-bottom:40px;"></div>
  DISTRICT COLLECTOR<br/>Coimbatore District<br/>(i/c)
</div>
<div class="footer">
  <span>Generated by ALERTGOV AI – District EOC System</span>
  <span>Printed on: ${today} at ${timeStr}</span>
</div>
<script>window.onload = function(){ setTimeout(() => window.print(), 600); };</script>
</body></html>`;

    const win = window.open('', '_blank', 'width=950,height=750');
    if (win) {
      win.document.write(reportHtml);
      win.document.close();
    } else {
      // Fallback if popup blocked: download as .html file
      const blob = new Blob([reportHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `District_Analytics_Report_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><BarChart2 size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> District Analytics</div>
          <div className="page-subtitle">Comprehensive data on emergency response performance</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary btn-sm" onClick={handleExport}><Download size={14} /> Export Report</button>
        </div>
      </div>

      <div className="grid-3">
        <Card title="Average Response Time (mins)">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" dataKey="avg" stroke="var(--primary)" fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Incidents by Category">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Broadcasts Sent">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={broadcastsData} margin={{ top: 20 }}>
                <defs>
                  <linearGradient id="colorBroadcasts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--severity-low)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--severity-low)" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="broadcasts" fill="url(#colorBroadcasts)" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
