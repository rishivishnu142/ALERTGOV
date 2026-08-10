import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FilePlus, Clock, Radio, ShieldAlert, AlertTriangle, Eye, MapPin, CloudRain, Thermometer, Wind, XCircle, CloudLightning, FileText, CloudSun, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export default function VillageDashboard() {
  const { incidents: INCIDENTS } = useLiveContextData();

  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  const activeIncidents = INCIDENTS.filter(i => i.status !== 'Resolved');
  const criticalCount = INCIDENTS.filter(i => ['Severe', 'Extremely Severe'].includes(i.severity)).length;

  return (
    <div className="animate-in">
      {/* AI Banner */}
      <div className="ai-brief-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="ai-brief-header">
            <ShieldAlert size={14} /> {t('AI DAILY BRIEF', 'செயற்கை நுண்ணறிவு தினசரி சுருக்கம்')}
          </div>
          <div className="ai-brief-title" style={{ display: 'flex', alignItems: 'center' }}>
            {t('Good Afternoon', 'மதிய வணக்கம்')}, {user?.name?.split(' ')[0]}!
          </div>
          <div className="ai-brief-text">
            {language === 'ta' ? (
              <>இன்று <strong>{activeIncidents.length} செயலில் உள்ள சம்பவங்கள்</strong> உள்ளன · <strong>{criticalCount} தீவிர சம்பவங்கள்</strong> ஆட்சியருக்கு உயர்த்தப்பட்டுள்ளன · வானிலை எச்சரிக்கை: பிற்பகல் 3 மணிக்குள் கடுமையான மழை எதிர்பார்க்கப்படுகிறது</>
            ) : (
              <>You have <strong>{activeIncidents.length} active incidents</strong> today · <strong>{criticalCount} critical</strong> escalated to Collector · Weather alert: Heavy rainfall expected by 3 PM</>
            )}
          </div>
          <div className="ai-brief-tags">
            <span className="ai-brief-tag"><XCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> INC-2024-001 — {t('Extremely Severe', 'மிகவும் தீவிரமானது')}</span>
            <span className="ai-brief-tag"><CloudLightning size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Weather Alert Active', 'வானிலை எச்சரிக்கை செயலில் உள்ளது')}</span>
            <span className="ai-brief-tag"><FileText size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 2 {t('Pending Updates', 'நிலுவையிலுள்ள புதுப்பிப்புகள்')}</span>
          </div>
        </div>

        <div style={{ zIndex: 1, background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', color: 'white', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1, marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {timeStr}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.9 }}>
            {dateStr}
          </div>
        </div>
      </div>

      {/* Gradient Stats */}
      <div className="stat-grid">
        <GradientCard gradient="var(--gradient-6)" icon={<FilePlus size={20} />} label={t('My Incidents Today', 'இன்றைய எனது சம்பவங்கள்')} value="4" sub={t("2 new this session", "இந்த அமர்வில் 2 புதியவை")} />
        <GradientCard gradient="var(--gradient-5)" icon={<Clock size={20} />} label={t('Awaiting Verification', 'சரிபார்ப்புக்கு காத்திருக்கிறது')} value="1" sub={t("Sent to Taluk", "தாலுகாவிற்கு அனுப்பப்பட்டது")} />
        <GradientCard gradient="var(--gradient-success)" icon={<Radio size={20} />} label={t('Broadcast Completed', 'ஒளிபரப்பு முடிந்தது')} value="1" sub="INC-2024-003" />
        <GradientCard gradient="var(--gradient-danger)" icon={<ShieldAlert size={20} />} label={t('Critical / SOS', 'தீவிரமான / அவசரம்')} value={criticalCount} sub={t("Needs attention", "கவனம் தேவை")} />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Left Column (Table + Alerts) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Active Incidents Table */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">{t('Urgent & Recent Incidents', 'அவசர மற்றும் சமீபத்திய சம்பவங்கள்')}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/village/active-incidents')}>{t('View All', 'அனைத்தையும் காண்க')}</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
              <thead>
                <tr>
                  <th>{t('ID', 'எண்')}</th>
                  <th>{t('Title', 'தலைப்பு')}</th>
                  <th>{t('Severity', 'தீவிரம்')}</th>
                  <th>{t('Status', 'நிலை')}</th>
                  <th>{t('Action', 'நடவடிக்கை')}</th>
                </tr>
              </thead>
              <tbody>
                {activeIncidents.slice(0, 3).map(inc => (
                  <tr key={inc.id}>
                    <td><span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 12 }}>{inc.id}</span></td>
                    <td style={{ fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inc.title}</td>
                    <td>
                      <span className={`badge badge-${inc.severity === 'Low' ? 'green' : inc.severity === 'Medium' ? 'orange' : 'red'}`}>
                        <AlertTriangle size={10} /> {inc.severity}
                      </span>
                    </td>
                    <td><span className={`badge ${
                      inc.status === 'Broadcast Completed' ? 'badge-green' :
                      inc.status === 'District Coordinated' ? 'badge-blue' :
                      inc.status === 'Waiting for Collector' || inc.status === 'Taluk Verified' ? 'badge-orange' :
                      inc.status === 'Waiting for Taluk' ? 'badge-purple' :
                      'badge-gray'
                    }`}><Clock size={10} /> {inc.status}</span></td>
                    <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate('/village/update-status', { state: { incidentId: inc.id } })}>
                        <Eye size={12} /> {t('View', 'காண்க')}
                      </button>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/village/upload-media', { state: { incidentId: inc.id } })}>
                        <UploadCloud size={12} /> {t('Upload', 'பதிவேற்று')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts Widget */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><Radio size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /> {t('System Alerts & Broadcasts', 'கணினி எச்சரிக்கைகள் & ஒளிபரப்புகள்')}</span>
          </div>
          <div style={{ padding: '0' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--severity-high)' }}><CloudLightning size={18} /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{t('Severe Weather Warning', 'கடுமையான வானிலை எச்சரிக்கை')}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('Heavy rainfall expected in Anaimalai and surrounding areas by 15:00 HRS. Please alert low-lying wards.', 'ஆனைமலை மற்றும் சுற்றியுள்ள பகுதிகளில் 15:00 மணிக்குள் கடுமையான மழை எதிர்பார்க்கப்படுகிறது. தாழ்வான பகுதிகளை எச்சரிக்கவும்.')}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>{t('Issued by State DMA', 'மாநில பேரிடர் மேலாண்மை ஆணையத்தால் வழங்கப்பட்டது')} · 1 hr ago</div>
              </div>
            </div>
            <div style={{ padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)' }}><Radio size={18} /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{t('Community Broadcast Successful', 'சமூக ஒளிபரப்பு வெற்றிகரமானது')}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('Flood warning SMS sent to 1,240 registered residents in Ward 4 & 5.', 'வார்டு 4 & 5 இல் பதிவு செய்யப்பட்ட 1,240 குடியிருப்பாளர்களுக்கு வெள்ள எச்சரிக்கை குறுஞ்செய்தி அனுப்பப்பட்டது.')}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>{t('System Auto-Broadcast', 'கணினி தானியங்கி ஒளிபரப்பு')} · 3 hrs ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Quick Actions</span>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/village/create-incident')}>
                <FilePlus size={16} /> Report New Incident
              </button>
              <button className="btn btn-danger" style={{ width: '100%', justifyContent: 'center' }}>
                <AlertTriangle size={16} /> Trigger SOS Alert
              </button>
            </div>
          </div>

          {/* Weather Card */}
          <div className="card" style={{ background: 'var(--gradient-3)', border: 'none' }}>
            <div style={{ padding: 22, color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
                Weather & Environment
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                <div style={{ fontSize: 40 }}><CloudSun size={40} /></div>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>31°C</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{user?.village || 'Anaimalai'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: 0.85 }}><CloudRain size={13} /> 65%</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: 0.85 }}><Wind size={13} /> 14 km/h</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: 0.85 }}><Thermometer size={13} /> 28°C feel</div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <div className="card-header">
              <span className="card-title"><MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />Your Location</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{user?.village || 'Anaimalai'}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.taluk} Taluk, {user?.district} District</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Jurisdiction: 12 wards · 3,200 households</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
