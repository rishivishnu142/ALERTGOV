import { useEffect, useMemo } from 'react';
import { Card } from '../../components/common/UIComponents';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, BarChart2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLiveContextData } from '../../context/LiveContext';

export default function TalukReports() {
  const { analytics: ANALYTICS_DATA, incidents, refreshData } = useLiveContextData();

  useEffect(() => {
    if (refreshData) refreshData();
  }, []);

  const categoryData = useMemo(() => {
    const cMap = { 'Fire': '#f97316', 'Flood': '#0ea5e9', 'Medical': '#ec4899', 'Earthquake': '#8b5cf6', 'Critical': '#ef4444', 'Flooding': '#0ea5e9', 'Building Collapse': '#8b5cf6', 'Cyclone': '#06b6d4' };
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

  const severityData = useMemo(() => {
    const sMap = { 'Low': '#22c55e', 'Medium': '#eab308', 'High': '#f97316', 'Severe': '#ef4444', 'Extremely Severe': '#dc2626' };
    const counts = { 'Low': 0, 'Medium': 0, 'High': 0, 'Severe': 0, 'Extremely Severe': 0 };
    (incidents || []).forEach(inc => {
      const sev = inc.severity || 'Medium';
      if (counts[sev] !== undefined) counts[sev]++;
      else counts[sev] = 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k], color: sMap[k] || '#3b82f6' }));
  }, [incidents, ANALYTICS_DATA]);

  const dailyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
    (incidents || []).forEach(inc => {
      try {
        const d = inc.reportedAt || inc.date ? new Date(inc.reportedAt || inc.date) : new Date();
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
        if (counts[dayName] !== undefined) counts[dayName]++;
      } catch(e) {}
    });
    return days.map(d => ({ day: d, incidents: counts[d] }));
  }, [incidents, ANALYTICS_DATA]);

  const handleExport = () => {
    // Use real incidents from state! If empty, provide a fallback mock so UI doesn't break.
    const availableIncidents = incidents && incidents.length > 0 ? incidents : [
      { id: 'INC-2026-015', type: 'Warehouse Fire', reporterId: 'Rajesh Kumar', timestamp: '09:20 AM' }
    ];

    Swal.fire({
      title: 'Export PDF Report',
      html: `
        <div style="text-align: left; display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px; display: block;">Select Date *</label>
            <input type="date" id="swal-date" class="form-input" style="width: 100%; box-sizing: border-box;">
          </div>
          
          <div id="incident-selection-container" style="display: none;">
            <label style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px; display: block;">Select Incident *</label>
            <select id="swal-incident-select" class="form-input" style="width: 100%; box-sizing: border-box;">
              <option value="">-- Choose Incident --</option>
            </select>
          </div>

          <div id="incident-details" style="display: none; background: var(--bg-muted); padding: 12px; border-radius: 6px; font-size: 12px; border: 1px solid var(--border);">
             <!-- Details shown here -->
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Generate Report',
      confirmButtonColor: 'var(--primary)',
      didOpen: () => {
        const dateInput = document.getElementById('swal-date');
        const incidentContainer = document.getElementById('incident-selection-container');
        const incidentSelect = document.getElementById('swal-incident-select');
        const detailsContainer = document.getElementById('incident-details');

        dateInput.addEventListener('change', (e) => {
          if (e.target.value) {
            incidentContainer.style.display = 'block';
            incidentSelect.innerHTML = '<option value="">-- Choose Incident --</option>' + 
              availableIncidents.map(inc => {
                const dateStr = inc.date || inc.reportedAt;
                const time = dateStr ? new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const name = inc.title || inc.category || 'Incident';
                return `<option value="${inc.id}">${time ? time + ' - ' : ''}${name} (${inc.id})</option>`;
              }).join('');
            detailsContainer.style.display = 'none';
          } else {
            incidentContainer.style.display = 'none';
            detailsContainer.style.display = 'none';
          }
        });

        incidentSelect.addEventListener('change', (e) => {
          const selected = availableIncidents.find(inc => inc.id === e.target.value);
          if (selected) {
            detailsContainer.style.display = 'block';
            const reporter = selected.reportedBy || selected.reporterId || selected.veo || 'Unknown';
            const dateStr = selected.date || selected.reportedAt;
            const timeStr = dateStr ? new Date(dateStr).toLocaleString() : new Date().toLocaleString();
            detailsContainer.innerHTML = `
              <div style="margin-bottom: 4px;"><strong>Reported By:</strong> ${reporter}</div>
              <div style="margin-bottom: 4px;"><strong>Time:</strong> ${timeStr}</div>
              <div style="color: var(--primary); font-weight: 600; margin-top: 8px;">✓ Ready to generate report</div>
            `;
            incidentSelect.dataset.veo = reporter;
            incidentSelect.dataset.name = selected.title || selected.category || selected.name;
            incidentSelect.dataset.time = timeStr;
          } else {
            detailsContainer.style.display = 'none';
          }
        });
      },
      preConfirm: () => {
        const date = document.getElementById('swal-date').value;
        const incidentSelect = document.getElementById('swal-incident-select');
        const incidentId = incidentSelect.value;
        
        if (!date || !incidentId) {
          Swal.showValidationMessage('Please select a date and an incident');
          return false;
        }

        const incident = incidentSelect.dataset.name + ' (' + incidentId + ')';
        const veo = incidentSelect.dataset.veo;
        const time = incidentSelect.dataset.time;

        const selected = availableIncidents.find(inc => inc.id === incidentId);
        if (selected) {
          localStorage.setItem('latestIncident', JSON.stringify(selected));
        }

        return { incident, veo, date, time };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const params = new URLSearchParams(result.value);
        window.open('/taluk/print-report?' + params.toString(), '_blank');
      }
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><BarChart2 size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Taluk Reports & Analytics</div>
          <div className="page-subtitle">Performance and incident statistics for the current month</div>
        </div>
        <button className="btn btn-primary" onClick={handleExport}>
          <Download size={14} /> Export PDF Report
        </button>
      </div>

      <div className="grid-2">
        <Card title="Incidents by Category">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%" cy="50%"
                  innerRadius={65} outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={3}
                  cornerRadius={6}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: 'var(--border)', strokeWidth: 1 }}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Incidents`, 'Count']} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Incidents by Severity">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} 
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Incident Volume (Last 7 Days)" className="span-2" style={{ gridColumn: '1 / -1' }}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 20 }}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--primary-light)" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="incidents" fill="url(#colorIncidents)" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
