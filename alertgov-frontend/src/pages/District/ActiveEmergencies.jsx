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
  ).sort((a, b) => new Date(b.reportedAt || b.date) - new Date(a.reportedAt || a.date)), [allIncidents]);
  
  const selected = activeList.find(i => i.id === selectedId) || activeList[0];

  if (!allIncidents || allIncidents.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <ShieldAlert size={48} color="var(--severity-low)" style={{ marginBottom: '16px' }} />
        <h2>{t('No Active Emergencies', 'செயலில் உள்ள அவசரநிலைகள் இல்லை')}</h2>
        <p>{t('There are currently no active emergencies in your jurisdiction.', 'தற்போது உங்கள் அதிகார வரம்பில் எந்த அவசரநிலைகளும் இல்லை.')}</p>
      </div>
    );
  }

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

      <div style={{ display: 'flex', height: 'calc(100vh - 180px)', gap: '16px', marginTop: '16px' }}>
        {/* Side Panel (List) */}
        <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', paddingRight: '8px' }}>
          {activeList.map(inc => (
            <div
              key={inc.id}
              className={`incident-card severity-${inc.severity.toLowerCase().replace(' ', '-')}`}
              style={{
                borderColor: selectedId === inc.id ? 'var(--primary)' : 'var(--border)',
                background: selectedId === inc.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedId(inc.id)}
            >
              <div className="incident-card-title">{inc.title}</div>
              <div className="incident-card-meta" style={{ marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="font-mono text-primary" style={{ fontWeight: 600 }}>#{inc.id.split('-')[0].toUpperCase()}</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span>{t(inc.taluk, inc.taluk)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SeverityBadge severity={inc.severity} />
                <StatusBadge status={inc.status} />
              </div>
              {selectedId === inc.id && (
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={(e) => { e.stopPropagation(); navigate(`/district/resource-command?incId=${inc.id}&flow=true`); }}
                  >
                    <Truck size={12} style={{marginRight:'4px'}}/> {t('Deploy Resources', 'வளங்களை பயன்படுத்து')}
                  </button>
                </div>
              )}
            </div>
          ))}
          {activeList.length === 0 && <p className="text-muted">{t('No active emergencies right now.', 'தற்போது அவசரநிலைகள் எதுவும் இல்லை.')}</p>}
        </div>

        {/* Map Panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            height: 'calc(100vh - 200px)',
          }}>
            <GISMap
              center={selected?.location ? [selected.location.lat, selected.location.lng] : [11.0168, 76.9558]}
              zoom={selected ? 14 : 11}
              height="calc(100vh - 200px)"
              incidents={activeList}
              resources={activeList.flatMap(inc => inc.resources || [])}
              showRadius={true}
              radiusKm={selected?.affectedRadius || 2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
