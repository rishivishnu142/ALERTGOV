
import { useAuth } from '../../context/AuthContext';
import { useLive, useIncidents } from '../../context/LiveContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldAlert, Clock, Truck, AlertTriangle, Users, ArrowRight, Activity, MapPin, CheckCircle, ChevronRight, Zap, Cpu, Radio, FileText, Inbox, ClipboardList, Flame } from 'lucide-react';
import { useLiveContextData } from '../../context/LiveContext';

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

const SevBadge = ({ severity }) => {
  const map = {
    'Low': { bg: 'var(--severity-low-bg)', c: 'var(--severity-low)' },
    'Medium': { bg: 'var(--severity-medium-bg)', c: 'var(--severity-medium)' },
    'High': { bg: 'var(--severity-high-bg)', c: 'var(--severity-high)' },
    'Severe': { bg: 'var(--severity-severe-bg)', c: 'var(--severity-severe)' },
    'Extremely Severe': { bg: 'var(--severity-extreme-bg)', c: 'var(--severity-extreme)' },
  };
  const s = map[severity] || map['Low'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: s.bg, color: s.c,
      padding: '4px 12px', borderRadius: 999,
      fontSize: 11, fontWeight: 700,
    }}>
      <AlertTriangle size={10} /> {severity}
    </span>
  );
};

export default function DistrictDashboard() {
  const { resources: RESOURCES, analytics: ANALYTICS_DATA } = useLiveContextData();

  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const myIncidents = useIncidents();

  const active = myIncidents.filter(i => i.status !== 'Resolved' && i.status !== 'Closed');
  const queue = myIncidents.filter(i => i.status === 'Taluk Verified' || i.status === 'Waiting for Collector');
  const critical = myIncidents.filter(i => ['Severe', 'Extremely Severe'].includes(i.severity));
  const liveOps = myIncidents.filter(i => ['Waiting for Collector', 'District Coordinated'].includes(i.status));
  const totalDeployed = Object.values(RESOURCES).flat().filter(r => r.status === 'Deployed' || r.status === 'En Route').length;
  const totalAtRisk = active.reduce((a, i) => a + (i.populationAtRisk || 0), 0);

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">{t('EOC Dashboard', 'அவசரகால மைய டாஷ்போர்டு')}</div>
          <div className="page-subtitle">{user?.district} {t('District · Emergency Operations Center', 'மாவட்டம் · அவசரகால செயல்பாட்டு மையம்')}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/district/analytics')}>
            <Activity size={14} /> {t('Analytics', 'பகுப்பாய்வு')}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/district/approval-queue')}>
            <Inbox size={14} /> {t('Action Queue', 'செயல்பாட்டு வரிசை')}
            {queue.length > 0 && <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '1px 7px', fontSize: 10, fontWeight: 800 }}>{queue.length}</span>}
          </button>
        </div>
      </div>

      {/* Gradient Stat Cards */}
      <div className="stat-grid">
        <GradientCard gradient="var(--gradient-1)" icon={<ShieldAlert size={20} />}
          label={t('Active Emergencies', 'செயலில் உள்ள அவசரநிலைகள்')} value={active.length} sub={t('Live incidents across district', 'மாவட்டம் முழுவதும் நேரடி சம்பவங்கள்')} />
        <GradientCard gradient="var(--gradient-5)" icon={<Clock size={20} />}
          label={t('Pending Queue', 'நிலுவையில் உள்ள வரிசை')} value={queue.length} sub={queue.length > 0 ? t('Requires coordination', 'ஒருங்கிணைப்பு தேவை') : t('All clear', 'அனைத்தும் சரி')} />
        <GradientCard gradient="var(--gradient-3)" icon={<Truck size={20} />}
          label={t('Resources Deployed', 'வளங்கள் பயன்படுத்தப்பட்டுள்ளன')} value={totalDeployed} sub={t('Units active in field', 'களத்தில் செயலில் உள்ள பிரிவுகள்')} />
        <GradientCard gradient="var(--gradient-4)" icon={<Users size={20} />}
          label={t('People at Risk', 'ஆபத்தில் உள்ள மக்கள்')} value={totalAtRisk.toLocaleString('en-IN')} sub={t(`Across ${active.length} incidents`, `${active.length} சம்பவங்களில்`)} />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 20 }}>

        {/* Left: Approval Queue + Live Emergencies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Approval Queue */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--severity-medium)' }} className="pulse" />
                <span className="card-title">{t('Action Required — Approval Queue', 'செயல் தேவை — ஒப்புதல் வரிசை')}</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/district/approval-queue')}>
                {t('View All', 'அனைத்தையும் காண்க')} <ChevronRight size={12} />
              </button>
            </div>
            <div>
              {queue.length === 0 ? (
                <div style={{ padding: '36px 22px', textAlign: 'center' }}>
                  <CheckCircle size={32} color="var(--severity-low)" style={{ marginBottom: 10 }} />
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{t('Queue is clear — no pending items', 'வரிசை தெளிவாக உள்ளது — நிலுவையில் உள்ள உருப்படிகள் இல்லை')}</div>
                </div>
              ) : queue.map(inc => (
                <div key={inc.id} className="list-row">
                  <div className="list-row-icon" style={{ background: 'var(--severity-medium-bg)', color: 'var(--severity-medium)' }}>
                    <ShieldAlert size={18} />
                  </div>
                  <div className="list-row-content">
                    <div className="list-row-title">{inc.title}</div>
                    <div className="list-row-meta">
                      <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 11 }}>{inc.id}</span>
                      <span><MapPin size={10} style={{ display: 'inline', marginRight: 2 }} />{inc.taluk}</span>
                    </div>
                  </div>
                  <SevBadge severity={t(inc.severity, inc.severity)} />
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/district/approval-queue')}>
                    {t('Coordinate', 'ஒருங்கிணைக்கவும்')} <ArrowRight size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Emergencies */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--severity-severe)' }} className="pulse" />
                <span className="card-title">{t('Live Active Emergencies', 'நேரடி செயலில் உள்ள அவசரநிலைகள்')}</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/district/active-emergencies')}>
                {t('Map View', 'வரைபடக் காட்சி')} <ChevronRight size={12} />
              </button>
            </div>
            <div>
              {liveOps.map(inc => (
                <div key={inc.id} className="list-row">
                  <div className="list-row-icon" style={{ background: 'var(--severity-severe-bg)', color: 'var(--severity-severe)' }}>
                    <AlertTriangle size={18} />
                  </div>
                  <div className="list-row-content">
                    <div className="list-row-title">{inc.title}</div>
                    <div className="list-row-meta">
                      <span className="font-mono" style={{ fontSize: 11 }}>{inc.id}</span>
                      <span className="badge badge-green" style={{ fontSize: 10 }}>{t(inc.status, inc.status)}</span>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigate('/district/resource-command')}>
                    <Truck size={12} /> {t('Resources', 'வளங்கள்')}
                  </button>
                </div>
              ))}
              {liveOps.length === 0 && (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>{t('No active live operations.', 'செயலில் நேரடி செயல்பாடுகள் எதுவும் இல்லை.')}</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* District Health Score */}
          <div className="card" style={{ background: 'var(--gradient-primary)', border: 'none' }}>
            <div style={{ padding: 24, color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: 1.2, opacity: 0.65, marginBottom: 14, textTransform: 'uppercase' }}>
                <Activity size={12} /> {t('District Health Score', 'மாவட்ட சுகாதார மதிப்பெண்')}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>74</div>
                <div style={{ fontSize: 16, opacity: 0.6 }}>/ 100</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', height: 8, borderRadius: 999, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ width: '74%', height: '100%', background: '#FCD34D', borderRadius: 999, transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.6 }}>
                {t('Status:', 'நிலை:')} <strong style={{ color: '#FCD34D' }}>{t('ELEVATED RISK', 'உயர்த்தப்பட்ட ஆபத்து')}</strong><br />
                {t('INC-2024-001 driving risk score down.', 'INC-2024-001 ஆபத்து மதிப்பெண்ணைக் குறைக்கிறது.')}
              </div>
            </div>
          </div>

          {/* Incident Summary Bar Chart */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">{t('Weekly Summary', 'வாராந்திர சுருக்கம்')}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{t('This week', 'இந்த வாரம்')}</span>
            </div>
            <div style={{ padding: 20 }}>
              <div className="mini-chart">
                {[
                  {day: 'Mon', incidents: 2}, {day: 'Tue', incidents: 4}, {day: 'Wed', incidents: 1},
                  {day: 'Thu', incidents: 8}, {day: 'Fri', incidents: 3}, {day: 'Sat', incidents: 5}, {day: 'Sun', incidents: 2}
                ].map((d, i) => (
                  <div key={d.day} className={`mini-chart-bar${i === 3 ? ' active' : ''}`}
                    style={{ height: `${(d.incidents / 8) * 100}%` }}
                    title={`${d.day}: ${d.incidents} incidents`} />
                ))}
              </div>
              <div className="mini-chart-labels">
                {[
                  {day: 'Mon', incidents: 2}, {day: 'Tue', incidents: 4}, {day: 'Wed', incidents: 1},
                  {day: 'Thu', incidents: 8}, {day: 'Fri', incidents: 3}, {day: 'Sat', incidents: 5}, {day: 'Sun', incidents: 2}
                ].map(d => <span key={d.day}>{d.day}</span>)}
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{t('Total', 'மொத்தம்')}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)' }}>
                    {25}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{t('Avg/Day', 'சராசரி/நாள்')}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--primary)' }}>
                    {3.6}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Removed Quick Actions */}
        </div>
      </div>

    </div>
  );
}
