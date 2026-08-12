import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { IncidentService } from '../../api';
import { CheckSquare, AlertTriangle, ArrowRight, Clock, Shield, MapPin, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AIBriefBanner } from '../../components/common/UIComponents';

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
  const c = severity === 'Low' ? 'green' : severity === 'Medium' ? 'orange' : 'red';
  return <span className={`badge badge-${c}`}><AlertTriangle size={10} /> {severity}</span>;
};

export default function TalukDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  
  useEffect(() => {
    if (!user?.taluk) return;
    const fetchIncidents = async () => {
      try {
        const data = await IncidentService.getIncidentsByTaluk(user.taluk);
        setIncidents(data);
      } catch(e) {
        console.error('Failed to fetch incidents', e);
      }
    };
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000); // Poll every 5s for real-time feel
    return () => clearInterval(interval);
  }, [user]);

  const pending = incidents.filter(i => i.status === 'Waiting for Taluk');
  const verified = incidents.filter(i => i.status === 'Waiting for Collector' || i.status === 'Resolved');
  const critical = pending.filter(i => ['Severe', 'Extremely Severe'].includes(i.severity));

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">{t('Taluk Command Center', 'தாலுகா கட்டளை மையம்')}</div>
          <div className="page-subtitle">{user?.taluk} {t('Taluk', 'தாலுகா')}, {user?.district} {t('District', 'மாவட்டம்')}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/taluk/verification')}>
            <CheckSquare size={14} /> {t('Verify Queue', 'வரிசையை சரிபார்க்கவும்')}
            {pending.length > 0 && <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '1px 7px', fontSize: 10, fontWeight: 800 }}>{pending.length}</span>}
          </button>
        </div>
      </div>

      <AIBriefBanner 
        type="taluk" 
        location={user?.taluk || 'Taluk'} 
        activeCount={pending.length + verified.length} 
        criticalCount={critical.length}
        tags={[
          <><AlertTriangle size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> {critical.length} {t('Critical Pending', 'முக்கிய நிலுவையில் உள்ளது')}</>,
          <><Clock size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> {pending.length} {t('To Verify', 'சரிபார்க்க')}</>
        ]}
      />

      {/* Gradient Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <GradientCard gradient={pending.length > 0 ? 'var(--gradient-5)' : 'var(--gradient-4)'}
          icon={<Clock size={20} />} label={t('Pending Verification', 'சரிபார்ப்பு நிலுவையில் உள்ளது')} value={pending.length}
          sub={pending.length > 0 ? t('Needs your action', 'உங்கள் நடவடிக்கை தேவை') : t('All verified!', 'அனைத்தும் சரிபார்க்கப்பட்டது!')} />
        <GradientCard gradient="var(--gradient-success)" icon={<CheckSquare size={20} />}
          label={t('Verified Today', 'இன்று சரிபார்க்கப்பட்டது')} value={verified.length} sub={t('Forwarded to District', 'மாவட்டத்திற்கு அனுப்பப்பட்டது')} />
        <GradientCard gradient={critical.length > 0 ? 'var(--gradient-danger)' : 'var(--gradient-4)'}
          icon={<AlertTriangle size={20} />} label={t('Critical Unverified', 'முக்கிய சரிபார்க்கப்படாதவை')} value={critical.length}
          sub={critical.length > 0 ? t('Urgent attention', 'அவசர கவனம் தேவை') : t('None pending', 'எதுவும் நிலுவையில் இல்லை')} />
      </div>

      {/* Main Grid */}
      <div className="grid-2">
        {/* Verification Queue */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: pending.length > 0 ? 'var(--severity-medium)' : 'var(--severity-low)' }} className="pulse" />
              <span className="card-title">{t('Priority Verification Queue', 'முன்னுரிமை சரிபார்ப்பு வரிசை')}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/taluk/verification')}>{t('View All', 'அனைத்தையும் காண்க')}</button>
          </div>
          <div>
            {pending.length === 0 ? (
              <div style={{ padding: 36, textAlign: 'center' }}>
                <Shield size={32} color="var(--severity-low)" style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--severity-low)' }}>{t('Queue is empty!', 'வரிசை காலியாக உள்ளது!')}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{t('Great job — all incidents verified.', 'சிறந்த வேலை — அனைத்து சம்பவங்களும் சரிபார்க்கப்பட்டன.')}</div>
              </div>
            ) : pending.map(inc => (
              <div key={inc.id} className="list-row">
                <div className="list-row-icon" style={{ background: 'var(--severity-medium-bg)', color: 'var(--severity-medium)' }}>
                  <Clock size={18} />
                </div>
                <div className="list-row-content">
                  <div className="list-row-title">{inc.title}</div>
                  <div className="list-row-meta">
                    <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 11 }}>{inc.id}</span>
                    <span><MapPin size={10} style={{ display: 'inline', marginRight: 2 }} />{inc.village}</span>
                  </div>
                </div>
                <SevBadge severity={t(inc.severity, inc.severity)} />
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/taluk/verification')}>
                  {t('Verify', 'சரிபார்க்கவும்')} <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Verified */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Recently Verified', 'சமீபத்தில் சரிபார்க்கப்பட்டது')}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/taluk/reports')}>{t('Reports', 'அறிக்கைகள்')}</button>
          </div>
          <div>
            {verified.length === 0 ? (
              <div style={{ padding: 36, textAlign: 'center', color: 'var(--text-muted)' }}>{t('No verified incidents yet.', 'சரிபார்க்கப்பட்ட சம்பவங்கள் ஏதுமில்லை.')}</div>
            ) : verified.slice(0, 5).map(inc => (
              <div key={inc.id} className="list-row">
                <div className="list-row-icon" style={{ background: 'var(--severity-low-bg)', color: 'var(--severity-low)' }}>
                  <CheckSquare size={18} />
                </div>
                <div className="list-row-content">
                  <div className="list-row-title">{inc.title}</div>
                  <div className="list-row-meta">
                    <span className="font-mono" style={{ fontSize: 11 }}>{inc.id}</span>
                    <span>{t('Verified recently', 'சமீபத்தில் சரிபார்க்கப்பட்டது')}</span>
                  </div>
                </div>
                <span className="badge badge-green">{t('Verified', 'சரிபார்க்கப்பட்டது')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
