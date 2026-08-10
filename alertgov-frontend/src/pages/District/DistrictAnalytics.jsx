import { Card } from '../../components/common/UIComponents';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Download, Filter, BarChart2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLiveContextData } from '../../context/LiveContext';

export default function DistrictAnalytics() {
  const { analytics: ANALYTICS_DATA } = useLiveContextData();

  const handleExport = () => {
    Swal.fire({
      title: 'Generating Report',
      html: 'Compiling district analytics into PDF format...',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire('Export Successful', 'District_Analytics_Report.pdf has been saved to your downloads.', 'success');
    });
  };
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><BarChart2 size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> District Analytics</div>
          <div className="page-subtitle">Comprehensive data on emergency response performance</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm"><Filter size={14} /> Filter</button>
          <button className="btn btn-primary btn-sm" onClick={handleExport}><Download size={14} /> Export Report</button>
        </div>
      </div>

      <div className="grid-3">
        <Card title="Average Response Time (mins)">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA.responseTime} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              <BarChart data={ANALYTICS_DATA.incidentsByType} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {ANALYTICS_DATA.incidentsByType.map((entry, index) => (
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
              <BarChart data={ANALYTICS_DATA.broadcastByMonth} margin={{ top: 20 }}>
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
