import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Map, BarChart2, Brain, Inbox, Activity, ChevronRight, AlertTriangle, MapPin, Users, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GISMap from '../../components/Map/GISMap';
import { useLiveContextData } from '../../context/LiveContext';
import { AIBriefBanner } from '../../components/common/UIComponents';
import { IncidentService } from '../../api';

const GradientCard = ({ gradient, label, value, sub }) => {
  let color = 'primary';
  if (gradient.includes('gradient-5') || gradient.includes('gradient-warning')) color = 'warning';
  else if (gradient.includes('gradient-success') || gradient.includes('gradient-4')) color = 'success';
  else if (gradient.includes('gradient-danger') || gradient.includes('gradient-2')) color = 'danger';
  
  return (
    <div className={`stat-card border-${color}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className={`stat-sub ${color === 'danger' ? 'text-danger' : ''}`}>{sub}</div>}
    </div>
  );
};

export default function StateDashboard() {
  const { incidents: INCIDENTS, districts: DISTRICTS, refreshData } = useLiveContextData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const data = await IncidentService.getIncidentStats();
    if (data) setStats(data);
  };

  const handleClearAll = async () => {
    if (window.confirm("CRITICAL WARNING: This will delete ALL incident data across the entire state database. Are you absolutely sure?")) {
      const res = await IncidentService.clearAllIncidents();
      if (res.success) {
        alert("All incidents cleared.");
        refreshData();
        fetchStats();
      } else {
        alert("Error clearing incidents.");
      }
    }
  };

  const activeList = INCIDENTS.filter(i => i.status !== 'Draft' && i.status !== 'Resolved');
  const totalActive = activeList.length;
  const totalCritical = activeList.filter(i => ['High', 'Severe', 'Extremely Severe'].includes(i.severity)).length;
  const alertedDistricts = new Set(activeList.map(i => i.district || 'Coimbatore')).size;

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">State Command Center</div>
          <div className="page-subtitle">Chief Secretary Dashboard · Tamil Nadu</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/state/prediction')}>
            <Brain size={14} /> AI Prediction
          </button>
          <button className="btn btn-secondary btn-sm" onClick={async () => {
            const { AnalyticsService } = await import('../../api');
            const res = await AnalyticsService.takeSnapshot();
            if (res.success) alert("Analytics snapshot taken successfully!");
            else alert("Error taking snapshot");
          }}>
            <BarChart2 size={14} /> Take Snapshot
          </button>
          <button className="btn btn-ghost btn-sm" style={{ color: 'red', border: '1px solid red' }} onClick={handleClearAll}>
            <Trash2 size={14} /> Clear DB
          </button>
        </div>
      </div>

      <AIBriefBanner 
        type="state" 
        location="Tamil Nadu" 
        activeCount={totalActive} 
        criticalCount={totalCritical}
        tags={[
          <><AlertTriangle size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> {totalCritical} Critical Active</>,
          <><ShieldAlert size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> {alertedDistricts} Districts Alerted</>
        ]}
      />

      {/* Gradient Stats */}
      <div className="stat-grid">
        <GradientCard gradient="var(--gradient-5)" icon={<ShieldAlert size={20} />}
          label="Districts Alerted" value={alertedDistricts} sub={`of ${Object.keys(DISTRICTS).length || 38} total`} />
        <GradientCard gradient="var(--gradient-danger)" icon={<AlertTriangle size={20} />}
          label="Critical Incidents" value={stats?.critical || totalCritical} sub="Across all districts" />
        <GradientCard gradient="var(--gradient-6)" icon={<Users size={20} />}
          label="Total All-Time" value={stats?.total || INCIDENTS.length} sub="Incidents Logged" />
        <GradientCard gradient="var(--gradient-1)" icon={<Activity size={20} />}
          label="Resolved" value={stats?.resolved || INCIDENTS.filter(i=>i.status==='Resolved').length} sub="Successfully Closed" />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Embedded State Map */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">State Heatmap</span>
            </div>
            <div style={{ padding: 0 }}>
              <GISMap center={[11.1271, 78.6569]} zoom={6} height={400} incidents={INCIDENTS} />
            </div>
          </div>

          {/* Collector Escalations */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Escalations from Collectors</span>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/state/requests')}>Manage <ChevronRight size={12} /></button>
            </div>
            <div style={{ padding: 36, textAlign: 'center' }}>
              <Inbox size={36} color="var(--text-muted)" style={{ marginBottom: 10, opacity: 0.4 }} />
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>No pending state-level requests or fund allocations.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
