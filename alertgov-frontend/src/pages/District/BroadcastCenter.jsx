import { useState } from 'react';
import { useIncidents } from '../../context/LiveContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Radio, Send, Clock, CheckCircle, AlertTriangle, ArrowRight, Zap, FileText, Wifi, WifiOff } from 'lucide-react';

const STATUS_CONFIG = {
  'Waiting for Collector': { label: 'Pending Collector Approval', color: 'var(--severity-medium)', bg: 'var(--severity-medium-bg)', icon: <Clock size={14} /> },
  'District Coordinated':  { label: 'Broadcast Dispatched',       color: 'var(--severity-low)',    bg: 'var(--severity-low-bg)',    icon: <CheckCircle size={14} /> },
  'Resolved':              { label: 'Resolved',                   color: 'var(--text-muted)',       bg: 'var(--bg-muted)',           icon: <CheckCircle size={14} /> },
};

const CATEGORY_ICON = {
  Fire: '🔥', Flood: '🌊', Wildlife: '🐯', Medical: '🚑', Earthquake: '🏔️', Cyclone: '🌀',
};

export default function BroadcastCenter() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const allIncidents = useIncidents();

  // Broadcasts = incidents that have moved past the district queue (dispatched or waiting collector)
  const dispatched = allIncidents.filter(i =>
    ['Waiting for Collector', 'District Coordinated', 'Resolved'].includes(i.status)
  );

  // Pending new broadcast = Taluk Verified incidents (need action)
  const pending = allIncidents.filter(i => i.status === 'Taluk Verified');

  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? dispatched : dispatched.filter(i => i.status === filter);

  const totalDispatched = dispatched.filter(i => i.status === 'District Coordinated').length;
  const totalPending = dispatched.filter(i => i.status === 'Waiting for Collector').length;

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Radio size="1.2em" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {t('Broadcast Center', 'ஒளிபரப்பு மையம்')}
          </div>
          <div className="page-subtitle">
            {t('Track all issued alerts, cell broadcasts and radio dispatches for your district', 'உங்கள் மாவட்டத்தின் அனைத்து அவசர அறிவிப்புகளையும் கண்காணிக்கவும்')}
          </div>
        </div>
        {pending.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => navigate('/district/approval-queue')}
          >
            <Zap size={14} />
            {pending.length} {t('Pending Action', 'நிலுவையில் உள்ளது')}
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Stat Cards */}
      <div className="stat-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card border-primary">
          <div className="stat-label">{t('Total Broadcasts', 'மொத்த ஒளிபரப்புகள்')}</div>
          <div className="stat-value">{dispatched.length}</div>
          <div className="stat-sub">{t('All time', 'எல்லா நேரமும்')}</div>
        </div>
        <div className="stat-card border-success">
          <div className="stat-label">{t('Dispatched', 'அனுப்பப்பட்டது')}</div>
          <div className="stat-value">{totalDispatched}</div>
          <div className="stat-sub">{t('District coordinated', 'மாவட்டம் ஒருங்கிணைந்தது')}</div>
        </div>
        <div className="stat-card border-warning">
          <div className="stat-label">{t('Awaiting Collector', 'ஆட்சியர் ஒப்புதல் தேவை')}</div>
          <div className="stat-value">{totalPending}</div>
          <div className="stat-sub">{t('Forwarded for approval', 'ஒப்புதலுக்காக அனுப்பப்பட்டது')}</div>
        </div>
        <div className="stat-card border-danger">
          <div className="stat-label">{t('Pending Broadcast', 'நிலுவையில் உள்ள ஒளிபரப்பு')}</div>
          <div className="stat-value">{pending.length}</div>
          <div className="stat-sub">{t('Taluk verified, needs action', 'தாலுகா சரிபார்த்தது, செயல் தேவை')}</div>
        </div>
      </div>

      {/* Pending Actions Banner */}
      {pending.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.06) 100%)',
          border: '1px solid rgba(251,191,36,0.35)',
          borderRadius: 'var(--radius)',
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AlertTriangle size={18} color="var(--severity-medium)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--severity-medium)' }}>
                {pending.length} {t('incident(s) waiting for your broadcast action', 'சம்பவங்கள் உங்கள் ஒளிபரப்பு செயலுக்காக காத்திருக்கின்றன')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {pending.map(i => i.title || i.id).join(' • ')}
              </div>
            </div>
          </div>
          <button className="btn btn-warning btn-sm" onClick={() => navigate('/district/approval-queue')}>
            {t('Go to Queue', 'வரிசைக்கு செல்')} <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: t('All Broadcasts', 'அனைத்து') },
          { key: 'District Coordinated', label: t('Dispatched', 'அனுப்பப்பட்டது') },
          { key: 'Waiting for Collector', label: t('Awaiting Collector', 'ஆட்சியர் ஒப்புதல்') },
          { key: 'Resolved', label: t('Resolved', 'தீர்க்கப்பட்டது') },
        ].map(tab => (
          <button
            key={tab.key}
            className={`btn btn-sm ${filter === tab.key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Broadcast Log */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <WifiOff size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>{t('No broadcasts in this category', 'இந்த வகையில் ஒளிபரப்புகள் இல்லை')}</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>{t('Broadcasts will appear here once incidents are processed.', 'சம்பவங்கள் செயல்படுத்தப்பட்டதும் ஒளிபரப்புகள் இங்கே தோன்றும்.')}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((inc, idx) => {
            const cfg = STATUS_CONFIG[inc.status] || STATUS_CONFIG['Resolved'];
            const catEmoji = CATEGORY_ICON[inc.category] || '⚠️';
            const dateStr = inc.date
              ? new Date(inc.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
              : 'Unknown time';

            return (
              <div key={inc.id} className="card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  {/* Left Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: cfg.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 20, flexShrink: 0,
                  }}>
                    {catEmoji}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
                        {inc.title || `${inc.category} Incident`}
                      </span>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: cfg.bg, color: cfg.color,
                        padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      }}>
                        {cfg.icon} {t(cfg.label, cfg.label)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap', marginBottom: 6 }}>
                      <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 600 }}>{inc.id}</span>
                      <span>📍 {inc.taluk}, {inc.district}</span>
                      <span>🏘️ {inc.village}</span>
                      <span>🕐 {dateStr}</span>
                    </div>

                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {inc.description?.substring(0, 140)}{inc.description?.length > 140 ? '...' : ''}
                    </div>
                  </div>

                  {/* Right Action */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: inc.status === 'District Coordinated' ? 'var(--severity-low-bg)' : 'var(--bg-muted)',
                      color: inc.status === 'District Coordinated' ? 'var(--severity-low)' : 'var(--text-muted)',
                      padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                    }}>
                      {inc.status === 'District Coordinated' ? <Wifi size={11} /> : <Clock size={11} />}
                      {inc.status === 'District Coordinated' ? t('Live', 'நேரடி') : t('Queued', 'வரிசை')}
                    </span>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => navigate(`/district/alert-broadcast?incId=${inc.id}&flow=true`)}
                      style={{ fontSize: 11 }}
                    >
                      <FileText size={12} /> {t('View', 'காண்க')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {dispatched.length === 0 && pending.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Radio size={44} style={{ marginBottom: 14, opacity: 0.3 }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>{t('No Broadcasts Yet', 'இன்னும் ஒளிபரப்புகள் இல்லை')}</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            {t('When incidents are coordinated and broadcast, they will appear here as a log.',
              'சம்பவங்கள் ஒருங்கிணைக்கப்பட்டு ஒளிபரப்பப்படும்போது, அவை இங்கே பதிவாக தோன்றும்.')}
          </div>
        </div>
      )}
    </div>
  );
}
