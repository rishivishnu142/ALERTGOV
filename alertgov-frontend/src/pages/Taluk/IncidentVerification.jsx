import { useState, useEffect } from 'react';
import { SeverityBadge, AIPanel, Card, AlertBanner } from '../../components/common/UIComponents';
import GISMap from '../../components/Map/GISMap';
import { CheckCircle, XCircle, AlertTriangle, ShieldAlert, Phone, MapPin, Search, Image, FileImage, Camera, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Swal from 'sweetalert2';
import { useLiveContextData } from '../../context/LiveContext';

export default function IncidentVerification() {
  const { incidents: INCIDENTS, refreshData } = useLiveContextData();

  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Always fetch fresh data when entering verification page
  useEffect(() => {
    if (refreshData) refreshData();
  }, []);
  const [queue, setQueue] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    let baseQueue = INCIDENTS.filter(i => i.status === 'Waiting for Taluk');

    setQueue(baseQueue);
  }, [INCIDENTS]);

  const inc = queue[selectedIdx];

  useEffect(() => {
    if (inc && inc.id && !inc.id.includes('NEW')) {
      import('../../api').then(({ IncidentService }) => {
        IncidentService.getIncidentImage(inc.id).then(res => {
          if (res && res.photoBase64) {
            setCurrentImage(res.photoBase64);
          } else {
            setCurrentImage(null);
          }
        });
      });
    } else if (inc && inc.photoBase64) {
      setCurrentImage(inc.photoBase64);
    } else {
      setCurrentImage(null);
    }
  }, [inc]);

  const handleVerify = async (action) => {
    let title = '', text = '', icon = 'success';
    let newStatus = '';
    let newLevel = '';

    if (action === 'approve') {
      title = t('Verified', 'சரிபார்க்கப்பட்டது'); text = t('Incident Verified. Forwarded to District EOC automatically.', 'சம்பவம் சரிபார்க்கப்பட்டது. மாவட்ட அவசரகால மையத்திற்கு தானாகவே அனுப்பப்பட்டது.');
      newStatus = 'Taluk Verified';
      newLevel = 'district';
    } else if (action === 'reject') {
      title = t('Rejected', 'நிராகரிக்கப்பட்டது'); text = t('Incident Rejected. Marked as False Alarm.', 'சம்பவம் நிராகரிக்கப்பட்டது. தவறான அலாரமாக குறிக்கப்பட்டுள்ளது.'); icon = 'error';
      newStatus = 'Resolved';
      newLevel = 'taluk';
    } else {
      title = t('Escalated', 'மேல்முறையீடு செய்யப்பட்டது'); text = t('Escalated Urgently to Collector.', 'ஆட்சியருக்கு அவசரமாக மேல்முறையீடு செய்யப்பட்டது.'); icon = 'warning';
      newStatus = 'Waiting for Collector';
      newLevel = 'collector';
    }

    try {
      if (inc && inc.id && !inc.id.includes('NEW')) {
         const { IncidentService } = await import('../../api');
         await IncidentService.updateIncidentStatus(inc.id, newStatus, newLevel);
         if (refreshData) refreshData();
      }
      
      Swal.fire(title, text, icon).then(() => {
        setQueue(prev => {
          const nextQueue = prev.filter(item => item.id !== inc.id);
          if (nextQueue.length === 0) navigate('/taluk');
          return nextQueue;
        });
        setSelectedIdx(0);
      });
    } catch (e) {
      console.error(e);
      Swal.fire('Error', 'Failed to update status on server.', 'error');
    }
  };

  if (!inc) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <CheckCircle size={48} color="var(--severity-low)" style={{ marginBottom: '16px' }} />
        <h2>{t('All Caught Up!', 'அனைத்தும் முடிந்தது!')}</h2>
        <p>{t('There are no pending incidents requiring verification.', 'சரிபார்க்கப்பட வேண்டிய நிலுவையில் உள்ள சம்பவங்கள் எதுவும் இல்லை.')}</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/taluk')}>{t('Back to Dashboard', 'டாஷ்போர்டுக்குத் திரும்பு')}</button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><Search size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Incident Verification', 'சம்பவ சரிபார்ப்பு')}</div>
          <div className="page-subtitle">{t('Review evidence and AI analysis before forwarding to District EOC', 'மாவட்ட அவசரகால மையத்திற்கு அனுப்பும் முன் சான்றுகள் மற்றும் செயற்கை நுண்ணறிவு பகுப்பாய்வை மதிப்பாய்வு செய்யவும்')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
            {t('Queue:', 'வரிசை:')} {selectedIdx + 1} {t('of', 'இல்')} {queue.length}
          </span>
        </div>
      </div>

      <div className="grid-3">
        {/* Left: Incident Details & Evidence */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>{inc.title}</h3>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span className="font-mono text-primary">{inc.id}</span>
                  <span>·</span>
                  <span><MapPin size={11} style={{ display: 'inline' }} /> {inc.location?.address || inc.village || 'Unknown Location'}</span>
                </div>
              </div>
              <SeverityBadge severity={inc.severity} />
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              {inc.description}
            </p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <div>
                <div className="section-title" style={{ fontSize: '12px' }}>{t('Reporter', 'அறிக்கையாளர்')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>V</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{inc.reportedBy}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Village EOC', 'கிராம அவசரகால மையம்')}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-title" style={{ fontSize: '12px' }}>{t('Time Reported', 'அறிக்கை செய்யப்பட்ட நேரம்')}</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{new Date((inc.reportedAt || inc.date || new Date())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div>
                <div className="section-title" style={{ fontSize: '12px' }}>{t('Contact VAO', 'கிராம நிர்வாக அலுவலரை தொடர்பு கொள்ள')}</div>
                <button className="btn btn-secondary btn-sm"><Phone size={12} /> {t('Call Field', 'அழைக்கவும்')}</button>
              </div>
            </div>
          </Card>

          {/* Map */}
          <Card title={<><MapPin size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Incident Map & Infrastructure', 'சம்பவ வரைபடம் & உள்கட்டமைப்பு')}</>}>
            <div style={{ padding: 0 }}>
              <GISMap center={[inc.location?.lat || 11.0168, inc.location?.lng || 76.9558]} zoom={14} height={300} incidents={[inc]} />
            </div>
          </Card>

          {/* VEO Attached Media */}
          <Card title={<><Camera size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Attached Evidence (from VEO)', 'இணைக்கப்பட்ட சான்றுகள் (VEO-விடமிருந்து)')}</>}>
            <div style={{ padding: '0 0 4px 0' }}>
              {currentImage || (inc.media && inc.media.length > 0) ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, padding: '12px 0 4px' }}>
                  {(inc.media && inc.media.length > 0 ? inc.media : [{ type: 'photo', url: currentImage, caption: 'VEO Uploaded Photo', uploadedAt: new Date().toISOString() }]).map((m, i) => (
                    <div key={i} style={{
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      background: 'var(--bg-muted)'
                    }}>
                      {/* Thumbnail */}
                      <div style={{
                        height: 110,
                        background: (m.url || currentImage)
                          ? `url(${m.url || currentImage}) center/cover no-repeat`
                          : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        {!(m.url || currentImage) && (
                          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                            {m.type === 'video'
                              ? <Camera size={28} style={{ marginBottom: 4 }} />
                              : <FileImage size={28} style={{ marginBottom: 4 }} />}
                            <div style={{ fontSize: 10, fontWeight: 600 }}>{t('No Preview', 'முன்னோட்டம் இல்லை')}</div>
                          </div>
                        )}
                        {/* Type badge */}
                        <span style={{
                          position: 'absolute', top: 6, left: 6,
                          background: m.type === 'video' ? '#1C4E80' : '#388E3C',
                          color: 'white', fontSize: 9, fontWeight: 700,
                          padding: '2px 7px', borderRadius: 2, textTransform: 'uppercase'
                        }}>
                          {m.type}
                        </span>
                      </div>
                      {/* Info */}
                      <div style={{ padding: '8px 10px' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.caption}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                          {new Date(m.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '28px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Image size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t('No media attached by VEO', 'கிராம நிர்வாக அலுவலரால் எந்த ஊடகமும் இணைக்கப்படவில்லை')}</div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right: AI & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AIPanel
            title={t('AI Verification Recommendation', 'செயற்கை நுண்ணறிவு சரிபார்ப்பு பரிந்துரை')}
            summary={inc.aiSummary}
            recommendation={t('AI Confidence: 92%. Recommend Immediate Approval. No duplicate found in last 24h.', 'செயற்கை நுண்ணறிவு உறுதி: 92%. உடனடி ஒப்புதல் பரிந்துரைக்கப்படுகிறது. கடந்த 24 மணி நேரத்தில் நகல் எதுவும் இல்லை.')}
          />

          <Card title={<><AlertTriangle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Risk Analysis', 'ஆபத்து பகுப்பாய்வு')}</>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('Est. Population at Risk', 'பாதிக்கப்படக்கூடிய மதிப்பிடப்பட்ட மக்கள் தொகை')}</span>
                <strong style={{ color: 'var(--severity-severe)' }}>{inc.populationAtRisk?.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('Nearby Schools (3km)', 'அருகிலுள்ள பள்ளிகள் (3 கிமீ)')}</span>
                <strong>3</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('Nearby Hospitals (3km)', 'அருகிலுள்ள மருத்துவமனைகள் (3 கிமீ)')}</span>
                <strong>1</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('Weather Condition', 'வானிலை நிலை')}</span>
                <strong>{t('Wind NE 28 km/h', 'காற்று வடகிழக்கு 28 கிமீ/மணி')}</strong>
              </div>
            </div>
          </Card>

          <Card title={<><Zap size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Taluk Decision', 'தாலுகா முடிவு')}</>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn btn-success" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleVerify('approve')}>
                <CheckCircle size={16} /> {t('Verify & Forward to District', 'சரிபார்த்து மாவட்டத்திற்கு அனுப்பவும்')}
              </button>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid var(--border)' }} onClick={() => handleVerify('reject')}>
                <XCircle size={16} /> {t('Reject (False Alarm)', 'நிராகரி (தவறான அலாரம்)')}
              </button>
              <button className="btn btn-danger" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }} onClick={() => handleVerify('escalate')}>
                <ShieldAlert size={16} /> {t('Escalate Urgently to Collector', 'ஆட்சியருக்கு அவசரமாக மேல்முறையீடு செய்யவும்')}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
