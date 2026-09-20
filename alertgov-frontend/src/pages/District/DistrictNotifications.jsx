import { useState } from 'react';
import { Bell, Clock, CheckCircle, Trash2, AlertTriangle, ShieldAlert, Info, Send } from 'lucide-react';
import { useLiveContextData } from '../../context/LiveContext';
import { NotificationService } from '../../api';

export default function DistrictNotifications() {
  const { notifications: NOTIFICATIONS } = useLiveContextData();

  const [filter, setFilter] = useState('all');
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [newNotif, setNewNotif] = useState({ message: '', type: 'info', targetRole: 'ALL' });
  const [sending, setSending] = useState(false);

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

  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (!newNotif.message) return;
    setSending(true);
    
    const res = await NotificationService.sendNotification(newNotif);
    
    if (res.success) {
      alert("Notification sent successfully!");
      setNotifs([{
        id: `N-${Date.now()}`,
        message: newNotif.message,
        type: newNotif.type,
        time: new Date().toLocaleTimeString(),
        read: true
      }, ...notifs]);
      setNewNotif({ message: '', type: 'info', targetRole: 'ALL' });
    } else {
      alert("Failed to send notification.");
    }
    
    setSending(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <div className="page-title"><Bell size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> District EOC Notifications</div>
          <div className="page-subtitle">Alerts, updates, and system messages</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setNotifs(ns => ns.map(n => ({ ...n, read: true })))}><CheckCircle size={14} /> Mark all read</button>
          <button className="btn btn-ghost btn-sm text-danger" onClick={() => setNotifs([])}><Trash2 size={14} /> Clear all</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header"><span className="card-title">Send Custom Notification</span></div>
        <div className="card-body" style={{ padding: '20px' }}>
          <form onSubmit={handleSendNotification} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Enter notification message..." 
                className="form-input" 
                value={newNotif.message} 
                onChange={e => setNewNotif({...newNotif, message: e.target.value})} 
                required 
              />
              <div style={{ display: 'flex', gap: '15px' }}>
                <select className="form-select" value={newNotif.type} onChange={e => setNewNotif({...newNotif, type: e.target.value})}>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                  <option value="success">Success</option>
                </select>
                <select className="form-select" value={newNotif.targetRole} onChange={e => setNewNotif({...newNotif, targetRole: e.target.value})}>
                  <option value="ALL">All Roles</option>
                  <option value="TALUK">Taluk Officers</option>
                  <option value="VILLAGE">Village Admins</option>
                  <option value="COLLECTOR">Collectors</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={sending} style={{ height: '42px' }}>
              <Send size={16} /> {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
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
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No notifications found.</div>
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
                    Mark read
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
