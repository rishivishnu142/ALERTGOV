import { useState, useMemo } from 'react';
import { useIncidents } from '../../context/LiveContext';
import GISMap from '../../components/Map/GISMap';
import { Card, SeverityBadge, StatusBadge, DeptUpdate, Timeline, AIPanel } from '../../components/common/UIComponents';
import { Truck, ShieldAlert, Search, Filter, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function ActiveEmergencies() {
  const navigate = useNavigate();
  const allIncidents = useIncidents();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');

  const activeList = useMemo(() => allIncidents.filter(i => 
    i.status !== 'Draft' && i.status !== 'Resolved'
  ), [allIncidents]);
  
  const selected = activeList.find(i => i.id === selectedId) || activeList[0];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><ShieldAlert size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Active Emergencies — District', 'செயலில் உள்ள அவசரநிலைகள் — மாவட்டம்')}</div>
          <div className="page-subtitle">{t('Live situational awareness of all ongoing emergencies', 'தொடரும் அனைத்து அவசரநிலைகளின் நேரடி விழிப்புணர்வு')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="search-bar" style={{ width: 250 }}>
            <Search size={14} color="var(--text-muted)" />
            <input placeholder={t('Search by ID, Village, Taluk...', 'ஐடி, கிராமம், தாலுகா மூலம் தேடுக...')} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-secondary btn-sm"><Filter size={14} /> {t('Filters', 'வடிப்பான்கள்')}</button>
        </div>
      </div>

      <div className="grid-3">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeList.map(inc => (
            <div
              key={inc.id}
              className={`incident-card severity-${inc.severity.toLowerCase().replace(' ', '-')}`}
              style={{
                borderColor: selectedId === inc.id ? 'var(--primary)' : 'var(--border)',
                background: selectedId === inc.id ? 'var(--primary-light)' : 'var(--bg-surface)'
              }}
              onClick={() => setSelectedId(inc.id)}
            >
              <div className="incident-card-title">{inc.title}</div>
              <div className="incident-card-meta" style={{ marginBottom: '8px' }}>
                <span className="font-mono text-primary">{inc.id}</span>
                <span>{t(inc.taluk, inc.taluk)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SeverityBadge severity={inc.severity} />
                <StatusBadge status={inc.status} />
              </div>
            </div>
          ))}
          {activeList.length === 0 && <p className="text-muted">{t('No active emergencies right now.', 'தற்போது அவசரநிலைகள் எதுவும் இல்லை.')}</p>}

          {selected && (
            <>
              <Card title={t("Resource Summary", "வளங்களின் சுருக்கம்")} action={<button className="btn btn-secondary btn-sm" onClick={() => navigate('/district/resource-command')}><Truck size={12}/> {t('Manage', 'நிர்வகி')}</button>}>
                {selected.resources?.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selected.resources.map(r => (
                      <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <span style={{ fontWeight: 600 }}>{r.type} <span className="font-mono text-muted">({r.vehicleNo})</span></span>
                        <span style={{ color: r.status === 'On Scene' ? 'var(--severity-low)' : 'var(--primary)' }}>{r.status} {r.eta > 0 ? `- ${t('ETA', 'எதிர்பார்க்கப்படும் நேரம்')} ${r.eta}m` : ''}</span>
                      </div>
                    ))}
                  </div>
                ) : <div className="text-muted text-sm">{t('No resources deployed yet.', 'வளங்கள் இன்னும் பயன்படுத்தப்படவில்லை.')}</div>}
              </Card>
              <AIPanel summary={selected.aiSummary} />
              <div className="section-title">{t('Timeline', 'காலவரிசை')}</div>
              <Timeline events={selected.timeline} />
            </>
          )}
        </div>

        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {selected && (
            <>
              <Card>
                <div style={{ padding: 0 }}>
                  <GISMap
                    center={[selected.location.lat, selected.location.lng]}
                    zoom={14}
                    height={400}
                    incidents={[selected]}
                    resources={selected.resources || []}
                    showRadius={true}
                    radiusKm={selected.affectedRadius || 2}
                  />
                </div>
              </Card>

              <Card title={t("Live Department Feed", "துறை செய்திகள்")}>
                <div style={{ padding: 0 }}>
                  {selected.departmentUpdates?.length > 0 ? (
                    selected.departmentUpdates.map((u, i) => (
                      <DeptUpdate key={i} icon={u.icon} dept={u.dept} time={u.time} message={u.message} />
                    ))
                  ) : <div className="text-muted text-sm p-3">{t('No updates received.', 'புதுப்பிப்புகள் எதுவும் பெறப்படவில்லை.')}</div>}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
