import { useLocation } from 'react-router-dom';
import { SeverityBadge, StatusBadge, Timeline, EscalationTracker } from '../../components/common/UIComponents';
import { Eye, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLiveContextData } from '../../context/LiveContext';

export default function UpdateIncidentStatus() {
  const { incidents: INCIDENTS } = useLiveContextData();

  const location = useLocation();
  const { t } = useLanguage();
  const selectedId = location.state?.incidentId || 'INC-2024-001';
  const incident = INCIDENTS.find(i => i.id === selectedId);
  const isSuccessful = incident && (incident.level === 'collector' || incident.level === 'state' || incident.status === 'Resolved');

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><Eye size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('View Incident Details', 'சம்பவ விவரங்களைக் காண்க')}</div>
          <div className="page-subtitle">{t('Review incident information and timeline', 'சம்பவத் தகவல் மற்றும் காலவரிசையை மதிப்பாய்வு செய்யவும்')}</div>
        </div>
      </div>

      {isSuccessful && (
        <div className="success-banner-anim">
          <div className="success-icon-pulse"><Sparkles size={24} /></div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--severity-low)', marginBottom: '4px' }}>{t('Mission Escalated Successfully!', 'பணி வெற்றிகரமாக மேம்படுத்தப்பட்டது!')}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{t('All required authorities have been notified and are taking action.', 'தேவையான அனைத்து அதிகாரிகளுக்கும் தெரிவிக்கப்பட்டு நடவடிக்கை எடுக்கப்பட்டு வருகிறது.')}</div>
          </div>
        </div>
      )}

      {incident && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="card-header"><div className="card-title">{t('Escalation Tracker', 'மேம்படுத்தல் கண்காணிப்பகம்')}</div></div>
          <div className="card-body" style={{ padding: '24px 32px' }}>
            <EscalationTracker currentLevel={incident.level} incident={incident} />
          </div>
        </div>
      )}

      <div className="grid-2">
        <div>
          {incident ? (
            <div className="card" style={{ marginBottom: '16px' }}>
              <div className="card-header">
                <div className="card-title">{incident.title}</div>
                <SeverityBadge severity={incident.severity} />
              </div>
              <div className="card-body">
                <div style={{ marginBottom: '10px' }}>
                  <StatusBadge status={incident.status} />
                  <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>{[incident.village, incident.taluk, incident.district].filter(Boolean).join(', ')}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{incident.description}</p>
              </div>
            </div>
          ) : (
            <div className="card"><div className="card-body">{t('Incident not found.', 'சம்பவம் காணப்படவில்லை.')}</div></div>
          )}
        </div>

        {/* Timeline */}
        <div className="card">
          <div className="card-header"><div className="card-title"><Calendar size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> {t('Incident Timeline', 'சம்பவ காலவரிசை')}</div></div>
          <div className="card-body">
            {incident && <Timeline events={incident.updates || []} />}
          </div>
        </div>
      </div>
    </div>
  );
}
