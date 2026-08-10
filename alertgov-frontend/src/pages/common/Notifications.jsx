import { useState } from 'react';
import { Bell, Clock, CheckCircle, Trash2, AlertTriangle, ShieldAlert, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLiveContextData } from '../../context/LiveContext';

export default function Notifications() {
  const { notifications: NOTIFICATIONS } = useLiveContextData();

  const { user } = useAuth();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const filtered = notifs.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'critical') return n.type === 'critical';
    return true;
  });

  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <ShieldAlert size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} />;
      case 'warning': return <AlertTriangle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} />;
      case 'success': return <CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} />;
      case 'info': return <Info size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} />;
      default: return <Bell size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} />;
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <div className="page-title"><Bell size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {t('Notifications', 'அறிவிப்புகள்')}</div>
          <div className="page-subtitle">{t('Alerts, updates, and system messages for', 'எச்சரிக்கைகள், புதுப்பிப்புகள் மற்றும் கணினி செய்திகள்:')} {user?.title}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setNotifs(ns => ns.map(n => ({ ...n, read: true })))}><CheckCircle size={14} /> {t('Mark all read', 'அனைத்தையும் படித்ததாக குறி')}</button>
          <button className="btn btn-ghost btn-sm text-danger" onClick={() => setNotifs([])}><Trash2 size={14} /> {t('Clear all', 'அனைத்தையும் அழி')}</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ background: 'var(--bg-muted)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['all', 'unread', 'critical'].map(f => (
              <button
                key={f}
                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                style={{ textTransform: 'capitalize' }}
                onClick={() => setFilter(f)}
              >
                {t(f, f === 'all' ? 'அனைத்தும்' : f === 'unread' ? 'படிக்காதவை' : 'தீவிரமானவை')}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>{t('No notifications found.', 'எந்த அறிவிப்புகளும் கிடைக்கவில்லை.')}</div>
          ) : (
            filtered.map(n => (
              <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`} style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '20px' }}>{getIcon(n.type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: n.read ? 500 : 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {n.message}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {n.time}
                  </div>
                </div>
                {!n.read && (
                  <button className="btn btn-ghost btn-sm" onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                    {t('Mark read', 'படித்ததாக குறி')}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
