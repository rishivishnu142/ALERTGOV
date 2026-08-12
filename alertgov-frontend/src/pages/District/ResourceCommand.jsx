import { useState } from 'react';
import { useIncidents, useLiveContextData } from '../../context/LiveContext';
import { Card, SeverityBadge, StatusBadge } from '../../components/common/UIComponents';
import GISMap from '../../components/Map/GISMap';
import { Truck, Plus, Navigation, Ambulance, Shield, Helicopter, ArrowRight, MapPin, CheckCircle, Flame, Waves, Bird, HeartPulse, Mountain, Wind, Home } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const CATEGORY_ICON_MAP = {
  Fire:      { icon: Flame,     color: '#DC2626', bg: '#FEE2E2' },
  Flood:     { icon: Waves,     color: '#2563EB', bg: '#DBEAFE' },
  Wildlife:  { icon: Bird,      color: '#059669', bg: '#D1FAE5' },
  Medical:   { icon: HeartPulse,color: '#DB2777', bg: '#FCE7F3' },
  Earthquake:{ icon: Mountain,  color: '#92400E', bg: '#FEF3C7' },
  Cyclone:   { icon: Wind,      color: '#6D28D9', bg: '#EDE9FE' },
  Landslide: { icon: Mountain,  color: '#78350F', bg: '#FEF3C7' },
};

function CategoryIcon({ category, size = 20 }) {
  const cfg = CATEGORY_ICON_MAP[category] || { icon: Flame, color: '#6B7280', bg: '#F3F4F6' };
  const IconComp = cfg.icon;
  return (
    <div style={{ width: size + 8, height: size + 8, borderRadius: 6, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <IconComp size={size} color={cfg.color} />
    </div>
  );
}

const STATUS_DOT = {
  'Waiting for Collector': { color: 'var(--severity-medium)', label: 'Awaiting Collector' },
  'District Coordinated':  { color: 'var(--severity-low)',    label: 'Coordinated' },
  'Taluk Verified':        { color: 'var(--primary)',          label: 'Taluk Verified' },
  'Reported':              { color: 'var(--text-muted)',       label: 'Reported' },
};

export default function ResourceCommand() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const flowIncId = searchParams.get('incId');
  const isFlow = searchParams.get('flow') === 'true';

  const { resources: RESOURCES } = useLiveContextData();
  const allIncidents = useIncidents();

  // Active incidents only (non-Resolved, non-Draft)
  const activeIncidents = allIncidents.filter(i =>
    i.status !== 'Resolved' && i.status !== 'Draft' && i.status !== 'Closed'
  );

  const [selectedId, setSelectedId] = useState(flowIncId || activeIncidents[0]?.id || null);
  const [renderTick, setRenderTick] = useState(0);

  const inc = activeIncidents.find(i => i.id === selectedId) || activeIncidents[0];

  const assigned = inc?.resources || [];
  const availableFire   = (RESOURCES?.fireTrucks  || []).filter(r => r.status === 'Available');
  const availablePolice = (RESOURCES?.policeUnits  || []).filter(r => r.status === 'Available');

  // Global stats
  const totalDeployed = allIncidents.flatMap(i => i.resources || []).length;

  // ── Assign handler ──────────────────────────────────────────────────────────
  const handleAssign = (unit, type) => {
    const personnel =
      type === 'Fire Truck' ? ['Ramesh Kumar', 'Arjun Singh', 'Mani', 'Velu', 'Kannan'] :
      type === 'Ambulance'  ? ['Dr. Priya', 'Dr. Ravi', 'Dr. Senthil'] :
                              ['SI Arjun', 'SI Kumar', 'Constable Vijay', 'Inspector Raj'];

    const optionsHtml = personnel.map(p => `<option value="${p}">${p}</option>`).join('');

    Swal.fire({
      title: `Deploy ${type}`,
      html: `
        <div style="text-align:left;margin-top:10px;">
          <p style="margin-bottom:16px;color:var(--text-muted);">
            <strong>Unit:</strong> <span class="font-mono" style="font-weight:bold;color:var(--primary);">${unit.vehicleNo}</span> (${unit.station})
          </p>
          <label style="font-size:12px;font-weight:700;margin-bottom:6px;display:block;text-transform:uppercase;">Assign Officer / Driver</label>
          <select id="personnel-select" style="width:100%;margin-bottom:16px;padding:10px;border-radius:6px;border:1px solid var(--border);background:var(--bg-surface);color:var(--text-primary);">
            ${optionsHtml}
          </select>
          <label style="font-size:12px;font-weight:700;margin-bottom:6px;display:block;text-transform:uppercase;">Estimated Time of Arrival (mins)</label>
          <input type="number" id="eta-input" style="width:100%;padding:10px;border-radius:6px;border:1px solid var(--border);background:var(--bg-surface);color:var(--text-primary);" value="${Math.floor(Math.random() * 10) + 5}" min="1" max="60" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm Deployment',
      confirmButtonColor: 'var(--primary)',
      cancelButtonText: 'Cancel',
      preConfirm: () => ({
        personnel: document.getElementById('personnel-select').value,
        eta: parseInt(document.getElementById('eta-input').value, 10),
      }),
    }).then(result => {
      if (result.isConfirmed) {
        unit.status = 'Deployed';
        if (!inc.resources) inc.resources = [];
        inc.resources.push({
          type,
          id: unit.id,
          vehicleNo: unit.vehicleNo,
          officer: result.value.personnel,
          status: 'En Route',
          eta: result.value.eta,
          lat: (inc.location?.lat || 11.0168) - (Math.random() * 0.05 + 0.02),
          lng: (inc.location?.lng || 76.9558) - (Math.random() * 0.05 + 0.02),
        });
        setRenderTick(t => t + 1);
        Swal.fire({ icon: 'success', title: 'Deployed!', html: `<b>${unit.vehicleNo}</b> is now en route with ${result.value.personnel}.`, timer: 2000, showConfirmButton: false });
      }
    });
  };

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (activeIncidents.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
        <CheckCircle size={52} color="var(--severity-low)" style={{ marginBottom: 16 }} />
        <h2>{t('No Active Incidents', 'செயலில் உள்ள சம்பவங்கள் இல்லை')}</h2>
        <p>{t('There are no incidents currently requiring resource deployment.', 'தற்போது வள பயன்பாடு தேவைப்படும் சம்பவங்கள் எதுவும் இல்லை.')}</p>
      </div>
    );
  }

  // ── Main Layout ─────────────────────────────────────────────────────────────
  return (
    <div className="animate-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Truck size="1.2em" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {t('Resource Command Center', 'வள கட்டளை மையம்')}
          </div>
          <div className="page-subtitle">
            {t('Select an incident to view and manage deployed units', 'பயன்படுத்தப்பட்ட அலகுகளை காண சம்பவத்தை தேர்ந்தெடுக்கவும்')}
          </div>
        </div>
        {/* Global Stats */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ textAlign: 'center', padding: '6px 16px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', minWidth: 80 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--primary)' }}>{totalDeployed}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('Deployed', 'பயன்படுத்தப்பட்டது')}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '6px 16px', background: '#FEE2E2', borderRadius: 'var(--radius-sm)', minWidth: 80 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#DC2626' }}>{availableFire.length}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase' }}>{t('Fire Trucks', 'தீ வாகனங்கள்')}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '6px 16px', background: '#DBEAFE', borderRadius: 'var(--radius-sm)', minWidth: 80 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#2563EB' }}>{availablePolice.length}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>{t('Police', 'போலீஸ்')}</div>
          </div>
        </div>
      </div>

      {/* Split Panel */}
      <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 185px)', marginTop: 16 }}>

        {/* ── LEFT: Incident List ────────────────────────────────────────────── */}
        {!isFlow && (
          <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', paddingRight: 6, flexShrink: 0 }}>
            {activeIncidents.map(i => {
              const statusCfg = STATUS_DOT[i.status] || { color: 'var(--text-muted)', label: i.status };
              const isSelected = i.id === inc?.id;
              const unitCount = (i.resources || []).length;

              return (
                <div
                  key={i.id}
                  onClick={() => setSelectedId(i.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius)',
                    border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                    background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 0 3px var(--primary-alpha)' : 'none',
                  }}
                >
                  {/* Title Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <CategoryIcon category={i.category} size={16} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {i.title || `${i.category} Incident`}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--primary)', fontFamily: 'monospace', fontWeight: 600 }}>
                        {i.id.split('-')[0]}…
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <MapPin size={11} />
                    <span style={{ fontWeight: 600 }}>{i.taluk}</span>
                    <span style={{ color: 'var(--text-muted)' }}>· {i.district}</span>
                  </div>

                  {/* Village */}
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Home size={10} />{i.village}
                  </div>

                  {/* Status + Severity + Units Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <SeverityBadge severity={i.severity} />
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                      background: `${statusCfg.color}22`, color: statusCfg.color,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusCfg.color, display: 'inline-block' }} />
                      {t(statusCfg.label, statusCfg.label)}
                    </span>
                    {unitCount > 0 && (
                      <span style={{
                        marginLeft: 'auto', fontSize: 10, fontWeight: 700, padding: '3px 8px',
                        borderRadius: 999, background: 'var(--bg-muted)', color: 'var(--text-muted)',
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                      }}>
                        <Truck size={9} /> {unitCount} unit{unitCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── RIGHT: Resource Detail + Map ──────────────────────────────────── */}
        {inc ? (
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>

            {/* Incident Header Card */}
            <div style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
              display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            }}>
              <CategoryIcon category={inc.category} size={22} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{inc.title || `${inc.category} Incident`}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)', alignItems: 'center' }}>
                  <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{inc.id}</span>
                  <span><MapPin size={11} style={{ display: 'inline', marginRight: 2 }} />{inc.taluk}, {inc.district}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Home size={11} />{inc.village}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <SeverityBadge severity={inc.severity} />
                <StatusBadge status={inc.status} />
              </div>
              {isFlow && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/district/alert-broadcast?incId=${inc.id}&flow=true`)}
                >
                  Next: Prepare Broadcast <ArrowRight size={15} style={{ marginLeft: 6 }} />
                </button>
              )}
            </div>

            {/* Map */}
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', height: 280, flexShrink: 0 }}>
              <GISMap
                center={[inc.location?.lat || 11.0168, inc.location?.lng || 76.9558]}
                zoom={13}
                height={280}
                incidents={[inc]}
                resources={assigned}
                showRadius={true}
                radiusKm={inc.affectedRadius || 2}
              />
            </div>

            {/* ── TWO COLUMN LAYOUT FOR UNITS ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, alignItems: 'start', paddingBottom: 24 }}>
              {/* Units Assigned */}
              <Card title={
              <span>
                <Truck size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                {t('Units Assigned', 'ஒதுக்கப்பட்ட அலகுகள்')}
                {assigned.length > 0 && (
                  <span style={{ marginLeft: 8, background: 'var(--primary)', color: 'white', borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                    {assigned.length}
                  </span>
                )}
              </span>
            }>
              {assigned.length > 0 ? (
                <div className="grid-2">
                  {assigned.map(r => (
                    <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: r.type === 'Fire Truck' ? '#FEE2E2' : r.type === 'Police' ? '#DBEAFE' : 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {r.type === 'Fire Truck'  ? <Truck     size={18} color="#DC2626" /> :
                         r.type === 'Ambulance'   ? <Ambulance size={18} color="#16A34A" /> :
                         r.type === 'Police'      ? <Shield    size={18} color="#2563EB" /> :
                                                    <Helicopter size={18} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                          {r.type} <span className="font-mono text-primary">{r.vehicleNo}</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                          {t('Officer', 'அதிகாரி')}: {r.officer}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span className={`badge badge-${r.status === 'On Scene' ? 'green' : 'blue'}`}>{r.status}</span>
                          {r.eta > 0 && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}><Navigation size={10} style={{ display: 'inline' }} /> {r.eta} min</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                  <Truck size={32} style={{ opacity: 0.25, marginBottom: 8 }} />
                  <div style={{ fontSize: 13 }}>{t('No units assigned yet.', 'இன்னும் அலகுகள் ஒதுக்கப்படவில்லை.')}</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>{t('Use the available units below to assign.', 'கீழே உள்ள கிடைக்கக்கூடிய அலகுகளை பயன்படுத்தவும்.')}</div>
                </div>
              )}
            </Card>

            {/* Available Units to Assign */}
            <Card title={t('Available Units — Deploy Now', 'கிடைக்கக்கூடிய அலகுகள் — இப்போது பயன்படுத்து')}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Flame size={13} />{t('Fire Department', 'தீ துறை')} ({availableFire.length} {t('available', 'கிடைக்கின்றன')})
                </div>
                {availableFire.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: '4px 0' }}>{t('No fire trucks available.', 'தீ வாகனங்கள் இல்லை.')}</div>
                )}
                {availableFire.map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: 6, fontSize: 12 }}>
                    <div>
                      <span style={{ fontWeight: 700 }}>{r.vehicleNo}</span>
                      <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>({r.station})</span>
                    </div>
                    <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', fontWeight: 700 }} onClick={() => handleAssign(r, 'Fire Truck')}>
                      <Plus size={13} /> {t('Deploy', 'அனுப்பு')}
                    </button>
                  </div>
                ))}

                <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Shield size={13} />{t('Police Department', 'காவல் துறை')} ({availablePolice.length} {t('available', 'கிடைக்கின்றன')})
                </div>
                {availablePolice.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: '4px 0' }}>{t('No police units available.', 'காவல் அலகுகள் இல்லை.')}</div>
                )}
                {availablePolice.map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: 6, fontSize: 12 }}>
                    <div>
                      <span style={{ fontWeight: 700 }}>{r.vehicleNo}</span>
                      <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>({r.station})</span>
                    </div>
                    <button className="btn btn-sm" style={{ background: '#DBEAFE', color: '#2563EB', border: 'none', fontWeight: 700 }} onClick={() => handleAssign(r, 'Police')}>
                      <Plus size={13} /> {t('Deploy', 'அனுப்பு')}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <Truck size={48} style={{ opacity: 0.2, marginBottom: 12 }} />
              <div style={{ fontSize: 15, fontWeight: 600 }}>{t('Select an incident from the left', 'இடதுபுறத்திலிருந்து ஒரு சம்பவத்தை தேர்ந்தெடுக்கவும்')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
