import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeverityBadge, StatusBadge, CategoryBadge } from '../../components/common/UIComponents';
import { Search, Filter, MapPin, Clock, Eye, ClipboardList, Download, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLiveContextData } from '../../context/LiveContext';

export default function ActiveIncidents() {
  const { incidents: INCIDENTS } = useLiveContextData();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filtered = INCIDENTS.filter(i =>
    (filter === 'All' || i.severity === filter || i.status === filter) &&
    (i.title.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><ClipboardList size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Incident Registry & Management', 'சம்பவ பதிவேடு மற்றும் மேலாண்மை')}</div>
          <div className="page-subtitle">{t('Comprehensive registry of all reported incidents and their current statuses', 'அறிக்கையிடப்பட்ட அனைத்து சம்பவங்கள் மற்றும் அவற்றின் தற்போதைய நிலைகளின் விரிவான பதிவேடு')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/village/export-pdf')}>
            <FileText size={14} style={{ marginRight: '6px' }} /> {t('Export PDF', 'PDF ஏற்றுமதி')}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => alert(t('Exporting to CSV...', 'CSV க்கு ஏற்றுமதி செய்கிறது...'))}>
            <Download size={14} style={{ marginRight: '6px' }} /> {t('Export CSV', 'CSV ஏற்றுமதி')}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '16px', flexWrap: 'wrap' }}>
        {/* Search */}
        <div className="search-bar" style={{ flex: 1, minWidth: '300px', margin: 0 }}>
          <Search size={14} color="var(--text-muted)" />
          <input placeholder={t('Search by incident ID, title, location...', 'சம்பவ எண், தலைப்பு, இடம் மூலம் தேடவும்...')} value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Filter size={14} color="var(--text-muted)" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{t('Filter:', 'வடிகட்டி:')}</span>
          {['All', 'High', 'Severe', 'Extremely Severe'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(f)}>
              {f === 'All' ? t('All', 'அனைத்தும்') : f === 'High' ? t('High', 'உயர்') : f === 'Severe' ? t('Severe', 'தீவிரமானது') : t('Extremely Severe', 'மிகவும் தீவிரமானது')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('Incident ID', 'சம்பவ எண்')}</th>
                <th>{t('Title', 'தலைப்பு')}</th>
                <th>{t('Category', 'வகை')}</th>
                <th>{t('Severity', 'தீவிரம்')}</th>
                <th>{t('Status', 'நிலை')}</th>
                <th>{t('Location', 'இடம்')}</th>
                <th>{t('Reported At', 'அறிக்கையிடப்பட்டது')}</th>
                <th>{t('Actions', 'நடவடிக்கைகள்')}</th>
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
                      <MapPin size={10} /> {inc.village || inc.taluk || inc.district}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      <Clock size={10} /> {new Date(inc.date || inc.reportedAt || new Date()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/village/update-status', { state: { incidentId: inc.id } })}>
                      <Eye size={13} /> {t('View', 'காண்க')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
