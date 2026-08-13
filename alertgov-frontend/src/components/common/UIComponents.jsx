import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, Clock, Info, ShieldAlert, XCircle, 
  Flame, Droplets, Wind, Zap, Plus, ChevronRight, Activity, Cpu, Bot, Ambulance, Shield,
  Home, Building, Globe, Check, MapPin, Sparkles
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './UIComponents.css'; 

// AI Daily Brief Banner
export const AIBriefBanner = ({ type, location, activeCount = 0, criticalCount = 0, customText, tags }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  const dateStr = time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  const hour = time.getHours();
  let greetingEn = 'Good Evening';
  if (hour < 12) greetingEn = 'Good Morning';
  else if (hour < 16) greetingEn = 'Good Afternoon';

  // Determine Title based on role type
  let title = `${greetingEn}, ${location || 'User'}!`;
  if (type === 'veo') {
    title = `${greetingEn}, VEO Sir!`;
  } else if (type === 'taluk') {
    title = `${greetingEn}, Tahsildar Sir!`;
  } else if (type === 'collector') {
    title = `${greetingEn}, Collector Sir!`;
  } else if (type === 'district') {
    title = `${greetingEn}, Officers!`;
  } else if (type === 'state') {
    title = `${greetingEn}, Chief Secretary!`;
  }

  return (
    <div className="ai-brief-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ai-brief-header" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <ShieldAlert size={14} /> AI DAILY BRIEF
        </div>
        <div className="ai-brief-title" style={{ display: 'flex', alignItems: 'center' }}>
          {title}
        </div>
        <div className="ai-brief-text">
          {customText || (
            <>You have <strong>{activeCount} active incidents</strong> today · <strong>{criticalCount} critical</strong> escalated · Weather alert: Heavy rainfall expected by 3 PM</>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="ai-brief-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {tags.map((t, i) => (
              <span key={i} className="ai-brief-tag">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div style={{ zIndex: 1, background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', color: 'white', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1, marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {timeStr}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.9 }}>
          {dateStr}
        </div>
      </div>
    </div>
  );
};

// Stat Card (flat with bottom accent)
export const StatCard = ({ label, value, color = 'primary', icon, change }) => (
  <div className={`stat-card border-${color}`}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
      <div className={`stat-icon-wrapper bg-${color}-alpha`}>
        {icon}
      </div>
    </div>
    {change && (
      <div className={`stat-change text-${color}`}>
        <Activity size={12} style={{ display: 'inline', marginRight: '4px' }} />
        {change}
      </div>
    )}
  </div>
);

// Card container
export const Card = ({ title, children, action, className = '', style = {} }) => (
  <div className={`card ${className}`} style={style}>
    {title && (
      <div className="card-header">
        <div className="card-title">{title}</div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="card-body">
      {children}
    </div>
  </div>
);

// Severity Badge
export const SeverityBadge = ({ severity }) => {
  const colorMap = {
    'Low': 'green', 'Medium': 'orange', 'High': 'orange', 'Severe': 'red', 'Extremely Severe': 'red'
  };
  const c = colorMap[severity] || 'gray';
  return (
    <span className={`badge badge-${c}`}>
      <AlertTriangle size={11} /> {severity}
    </span>
  );
};

// Status Badge
export const StatusBadge = ({ status }) => (
  <span className="badge badge-gray">
    <Clock size={11} /> {status}
  </span>
);

// Category Badge
export const CategoryBadge = ({ category }) => {
  const getIcon = () => {
    if(category?.includes('Fire')) return <Flame size={11}/>;
    if(category?.includes('Flood')) return <Droplets size={11}/>;
    if(category?.includes('Cyclone')) return <Wind size={11}/>;
    return <AlertTriangle size={11}/>;
  };
  return (
    <span className="badge badge-blue">
      {getIcon()} {category}
    </span>
  );
};

// AI Panel
export const AIPanel = ({ title = "AI Analysis", summary, recommendation, loading = false, confidence = null, action = null }) => {
  const data = [
    { name: 'Confidence', value: confidence || 0 },
    { name: 'Remaining', value: 100 - (confidence || 0) },
  ];
  const isPending = !summary && !loading;
  
  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className={`ai-icon-container ${loading ? 'ai-scanning' : ''}`}>
            <Cpu size={16} color="var(--primary)" />
          </div>
          <span style={{ fontWeight: 800, letterSpacing: '0.5px' }}>{title.toUpperCase()}</span>
        </div>
        {!loading && !isPending && <div className="ai-badge">AI Confirmed</div>}
        {isPending && <div className="ai-badge" style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>Pending Analysis</div>}
      </div>
      
      <div className="ai-panel-body" style={{ display: 'flex', gap: '20px' }}>
        {loading ? (
          <div className="ai-loading-state" style={{ width: '100%' }}>
            <div className="scan-line"></div>
            <p>Processing data streams...</p>
          </div>
        ) : isPending ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '13px', padding: '10px 0' }}>
            AI analysis has not yet been generated for this incident.
          </div>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '12px' }}>{summary}</p>
              {recommendation && (
                <div className="ai-recommendation" style={{ marginBottom: action ? '16px' : '0' }}>
                  <span className="rec-label"><Zap size={12} /> RECOMMENDATION:</span> {recommendation}
                </div>
              )}
              {action && <div>{action}</div>}
            </div>
            {confidence !== null && (
              <div style={{ width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={45}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={10}
                      >
                        <Cell key="cell-0" fill="var(--primary)" />
                        <Cell key="cell-1" fill="var(--border)" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '18px', color: 'var(--primary)'
                  }}>
                    {confidence}%
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>CONFIDENCE</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Escalation Tracker
export const EscalationTracker = ({ currentLevel, incident }) => {
  const levels = ['village', 'taluk', 'district', 'collector', 'state'];
  
  const getLevelInfo = (level) => {
    switch(level) {
      case 'village': return { title: 'Village EOC', icon: <Home size={18} /> };
      case 'taluk': return { title: 'Taluk Office', icon: <Building size={18} /> };
      case 'district': return { title: 'District EOC', icon: <MapPin size={18} /> };
      case 'collector': return { title: "Collector", icon: <Shield size={18} /> };
      case 'state': return { title: 'State Admin', icon: <Globe size={18} /> };
      default: return { title: level, icon: <Info size={18} /> };
    }
  };

  const currentIndex = levels.indexOf(currentLevel);

  return (
    <div className="escalation-tracker" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 0', position: 'relative' }}>
      {/* Background Line */}
      <div style={{ position: 'absolute', top: '34px', left: '10%', right: '10%', height: '8px', background: 'var(--border)', zIndex: 0, borderRadius: '4px' }}>
        {/* Progress Fill */}
        <div style={{ width: `${currentIndex > 0 ? (currentIndex / (levels.length - 1)) * 100 : 0}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px', transition: 'width 0.5s ease-in-out' }}></div>
      </div>
      
      {levels.map((lvl, idx) => {
        const isFullyDone = incident?.status === 'Resolved' || incident?.status === 'Approved for Broadcast';
        const isCompleted = isFullyDone ? idx <= currentIndex : idx < currentIndex;
        const isActive = !isFullyDone && idx === currentIndex;
        const info = getLevelInfo(lvl);
        
        let timestamp = incident?.date || incident?.reportedAt;
        if (isCompleted && idx > 0 && timestamp) {
            timestamp = new Date(new Date(timestamp).getTime() + idx * 3600000).toISOString();
        }

        return (
          <div key={lvl} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%', position: 'relative' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              background: isCompleted ? 'var(--primary)' : (isActive ? 'var(--bg-card)' : 'var(--bg-card)'), 
              border: `3px solid ${isCompleted ? 'var(--primary)' : (isActive ? 'var(--primary)' : 'var(--border)')}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isCompleted ? 'white' : 'transparent',
              marginBottom: '12px',
              transition: 'all 0.3s ease',
              boxShadow: isCompleted ? '0 0 10px rgba(59, 130, 246, 0.5)' : (isActive ? '0 0 10px rgba(59, 130, 246, 0.8)' : 'none')
            }}>
              {isCompleted ? <Check size={16} strokeWidth={3} /> : (isActive ? <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} className="pulse"></div> : <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--border)' }}></div>)}
            </div>
            
            <div style={{ color: isCompleted || isActive ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '8px' }}>
              {info.icon}
            </div>
            
            <div style={{ fontSize: '12px', fontWeight: 600, color: isActive ? 'var(--primary)' : 'var(--text-primary)', textAlign: 'center' }}>
              {info.title}
            </div>
            
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'JetBrains Mono, monospace' }}>
              {isCompleted && timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (isActive ? 'In Progress' : 'Pending')}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isCompleted && timestamp ? new Date(timestamp).toLocaleDateString([], { day: '2-digit', month: 'short' }) : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Timeline Component
export const Timeline = ({ events }) => (
  <div className="timeline-container">
    {!events || events.length === 0 ? (
      <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        No field updates have been posted for this incident yet.
      </div>
    ) : (
      events.map((ev, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-time">{new Date(ev.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="timeline-title">{ev.title}</div>
            {ev.desc && <div className="timeline-desc">{ev.desc}</div>}
          </div>
        </div>
      ))
    )}
  </div>
);

// Alert Banner
export const AlertBanner = ({ type = 'info', children, icon }) => {
  const colors = {
    info: 'var(--primary)', success: 'var(--severity-low)',
    warning: 'var(--severity-high)', critical: 'var(--severity-extreme)'
  };
  const bg = colors[type];
  return (
    <div style={{ 
      display: 'flex', gap: '12px', alignItems: 'center', 
      padding: '16px 20px', borderRadius: 'var(--radius-md)', 
      background: `${bg}10`, border: `1px solid ${bg}30`,
      color: bg, marginBottom: '20px'
    }}>
      <div style={{ fontSize: '20px' }}>{icon || <Info size={20} />}</div>
      <div style={{ fontSize: '14px', lineHeight: 1.5, fontWeight: 500 }}>{children}</div>
    </div>
  );
};

// Department Update
export const DeptUpdate = ({ icon, dept, time, message }) => {
  let RenderIcon = <AlertTriangle size={18} />;
  let color = 'var(--severity-low)';
  
  if (icon === 'fire') { RenderIcon = <Flame size={18} />; color = 'var(--severity-high)'; }
  else if (icon === 'police') { RenderIcon = <Shield size={18} />; color = 'var(--primary)'; }
  else if (icon === 'medical') { RenderIcon = <Ambulance size={18} />; color = 'var(--severity-medium)'; }

  return (
    <div style={{ display: 'flex', gap: '12px', padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ color }}>{RenderIcon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{dept}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{time}</span>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{message}</div>
      </div>
    </div>
  );
};

// Modal
export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><XCircle size={18} /></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
