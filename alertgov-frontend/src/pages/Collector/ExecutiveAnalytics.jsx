import { Card } from '../../components/common/UIComponents';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Download, BarChart2 } from 'lucide-react';
import { useLiveContextData } from '../../context/LiveContext';

export default function ExecutiveAnalytics() {
  const { analytics: ANALYTICS_DATA } = useLiveContextData();

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><BarChart2 size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Executive Analytics</div>
          <div className="page-subtitle">High-level insights into district emergency response</div>
        </div>
        <button className="btn btn-primary btn-sm"><Download size={14} /> Download Exec Report</button>
      </div>
      <div className="grid-2">
        <Card title="Average Response Time (mins)" style={{ gridColumn: 'span 2' }}>
          <div style={{ height: 300 }}>
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
      </div>
    </div>
  );
}
