import { useState } from 'react';
import { SeverityBadge, StatusBadge, CategoryBadge, Timeline, Modal, AIPanel } from '../../components/common/UIComponents';
import { Search, Eye, MapPin, Clock, ClipboardList } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLiveContextData } from '../../context/LiveContext';

export default function TalukActiveIncidents() {
  const { incidents: INCIDENTS } = useLiveContextData();

  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  // In a real app, this would filter by the user's taluk. Using all mocked incidents for demo.
  const filtered = INCIDENTS.filter(i =>
    (filter === 'All' || i.severity === filter || i.status === filter) &&
    (i.title.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><ClipboardList size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Active Incidents — Taluk', 'செயலில் உள்ள சம்பவங்கள் — தாலுகா')}</div>
          <div className="page-subtitle">{t('Monitor ongoing emergencies in your jurisdiction', 'உங்கள் அதிகார வரம்பில் நடக்கும் அவசரநிலைகளை கண்காணிக்கவும்')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Waiting for Taluk', 'District Coordinated'].map(f => {
            const fLabel = f === 'All' ? t('All', 'அனைத்தும்') : f === 'Waiting for Taluk' ? t('Waiting for Taluk', 'தாலுகாவிற்காக காத்திருக்கிறது') : t('District Coordinated', 'மாவட்டம் ஒருங்கிணைக்கப்பட்டது');
            return (
              <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(f)}>{fLabel}</button>
            )
          })}
        </div>
      </div>

      <div className="search-bar" style={{ marginBottom: '16px', maxWidth: '100%' }}>
        <Search size={14} color="var(--text-muted)" />
        <input placeholder={t('Search incidents...', 'சம்பவங்களைத் தேடுக...')} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('ID', 'அடையாளம்')}</th>
                <th>{t('Title', 'தலைப்பு')}</th>
                <th>{t('Category', 'வகை')}</th>
                <th>{t('Severity', 'தீவிரம்')}</th>
                <th>{t('Status', 'நிலை')}</th>
                <th>{t('Location', 'இடம்')}</th>
                <th>{t('Reported At', 'அறிக்கை நேரம்')}</th>
                <th>{t('Actions', 'செயல்கள்')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inc => (
                <tr key={inc.id}>
                  <td><span className="font-mono text-primary" style={{ fontSize: '12px', fontWeight: 600 }}>{inc.id}</span></td>
                  <td><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{inc.title}</span></td>
                  <td><CategoryBadge category={inc.category} /></td>
                  <td><SeverityBadge severity={inc.severity} /></td>
                  <td><StatusBadge status={inc.status} /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <MapPin size={10} /> {inc.location.address.split(',')[0]}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      <Clock size={10} /> {new Date(inc.reportedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelected(inc)}>
                      <Eye size={13} /> {t('View', 'காண்க')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <SeverityBadge severity={selected.severity} />
              <StatusBadge status={selected.status} />
              <CategoryBadge category={selected.category} />
            </div>
            <AIPanel summary={selected.aiSummary} />
            <div className="section-title">{t('Timeline', 'காலவரிசை')}</div>
            <Timeline events={selected.timeline} />
          </div>
        )}
      </Modal>
    </div>
  );
}
