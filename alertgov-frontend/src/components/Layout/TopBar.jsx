
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, Search, MapPin, Calendar, LayoutDashboard, FilePlus, List, UploadCloud, 
  RefreshCw, Map, BarChart2, ShieldAlert, FileText, CheckSquare, Navigation, 
  Radio, Brain, LogOut, Shield, Inbox, Satellite, AlertCircle, ClipboardList, 
  Route, Users, ChevronDown, AlertTriangle 
} from 'lucide-react';
import { officerDirectory } from '../../data/officerDirectory';
import { useLiveContextData } from '../../context/LiveContext';

const ROLE_LABELS = {
  village: 'Village EOC',
  taluk: 'Taluk Office',
  district: 'District EOC',
  collector: "Collector's Office",
  state: 'State Admin',
};

const ROLE_LABELS_TA = {
  village: 'கிராம அவசரகால மையம்',
  taluk: 'தாலுகா அலுவலகம்',
  district: 'மாவட்ட அவசரகால மையம்',
  collector: 'ஆட்சியர் அலுவலகம்',
  state: 'மாநில நிர்வாகம்',
};

export default function TopBar() {
  const { incidents: INCIDENTS } = useLiveContextData();

  const { user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  // Badge counts
  const queueCount = INCIDENTS.filter(i => i.status === 'Taluk Verified').length;
  const pendingTaluk = INCIDENTS.filter(i => i.status === 'Waiting for Taluk').length;

  const menuMap = {
    village: [
      { path: '/village',                  label: t('Dashboard', 'டாஷ்போர்டு'),        icon: <LayoutDashboard size={16} /> },
      { path: '/village/create-incident',  label: t('Create Incident', 'சம்பவத்தை உருவாக்கு'),  icon: <FilePlus size={16} /> },
      { path: '/village/active-incidents', label: t('Active Incidents', 'செயலில் உள்ள சம்பவங்கள்'), icon: <List size={16} /> },
    ],
    taluk: [
      { path: '/taluk',                  label: t('Dashboard', 'டாஷ்போர்டு'),              icon: <LayoutDashboard size={16} /> },
      { path: '/taluk/verification',     label: t('Incident Verification', 'சம்பவ சரிபார்ப்பு'),  icon: <CheckSquare size={16} />, badge: pendingTaluk },
      { path: '/taluk/active-incidents', label: t('Active Incidents', 'செயலில் உள்ள சம்பவங்கள்'),       icon: <List size={16} /> },
      { path: '/taluk/reports',          label: t('Reports', 'அறிக்கைகள்'),                icon: <BarChart2 size={16} /> },
    ],
    district: [
      { path: '/district',                   label: t('Dashboard', 'டாஷ்போர்டு'),          icon: <LayoutDashboard size={16} /> },
      { path: '/district/approval-queue',    label: t('Queue', 'வரிசை'),              icon: <Inbox size={16} />, badge: queueCount },
      { path: '/district/active-emergencies',label: t('Active', 'செயலில்'),             icon: <ShieldAlert size={16} /> },
      { path: '/district/resource-command',  label: t('Resources', 'வளங்கள்'),          icon: <Navigation size={16} /> },
      { path: '/district/broadcast-center',   label: t('Broadcasts', 'ஒளிபரப்புகள்'),         icon: <Radio size={16} /> },
      { path: '/district/analytics',         label: t('Analytics', 'பகுப்பாய்வு'),          icon: <BarChart2 size={16} /> },
    ],
    collector: [
      { path: '/collector',                   label: t('Dashboard', 'டாஷ்போர்டு'),           icon: <LayoutDashboard size={16} /> },
      { path: '/collector/situation-map',     label: t('Map', 'வரைபடம்'),                 icon: <Map size={16} /> },
      { path: '/collector/ai-reports',        label: t('AI Report', 'செயற்கை நுண்ணறிவு அறிக்கை'),           icon: <FileText size={16} /> },
      { path: '/collector/broadcast-approval',label: t('Broadcast', 'ஒளிபரப்பு'),           icon: <Radio size={16} /> },
    ],
    state: [
      { path: '/state',           label: t('Dashboard', 'டாஷ்போர்டு'),          icon: <LayoutDashboard size={16} /> },
      { path: '/state/districts', label: t('Districts', 'மாவட்டங்கள்'),          icon: <MapPin size={16} /> },
      { path: '/state/prediction',label: t('AI Prediction', 'செயற்கை நுண்ணறிவு கணிப்பு'),      icon: <Brain size={16} /> },
    ],
  };

  const links = menuMap[user?.role?.toLowerCase()] || [];
  const initials = user?.name?.substring(0, 2).toUpperCase() || '??';

  return (
    <div className="topbar">
      {/* Left: Brand */}
      <div className="topbar-brand" style={{ flexShrink: 0, paddingRight: '16px' }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" alt="TN Emblem" style={{ width: '40px', height: 'auto', objectFit: 'contain' }} />
        <div className="topbar-brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="topbar-brand-name" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>
            {t('Tamil Nadu Disaster Management Authority', 'தமிழ்நாடு பேரிடர் மேலாண்மை ஆணையம்')}
          </div>
          <div className="topbar-brand-sub" style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            ALERTGOV AI — {t(ROLE_LABELS[user?.role?.toLowerCase()]?.toUpperCase() || 'DASHBOARD', ROLE_LABELS_TA[user?.role?.toLowerCase()] || 'டாஷ்போர்டு')}
          </div>
        </div>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="topbar-nav">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.split('/').length === 2}
            className={({ isActive }) => `topnav-item${isActive ? ' active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge > 0 && <span className="topnav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Right: User actions & status */}
      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        {/* Language Toggle */}
        <button
          className="btn btn-ghost topbar-icon-btn"
          onClick={() => changeLanguage(language === 'en' ? 'ta' : 'en')}
          title={language === 'en' ? 'தமிழில் மாற்றவும்' : 'Switch to English'}
          style={{ padding: '0 8px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-color)', borderRadius: '16px', height: '28px' }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800 }}>{language === 'en' ? 'அ/A' : 'A/அ'}</span>
        </button>

        {/* Bell / Advisories */}
        <button
          className="btn btn-ghost topbar-icon-btn"
          onClick={() => navigate(user?.role === 'collector' ? '/collector/state-advisories' : `/${user?.role}/notifications`)}
          title={user?.role === 'collector' ? "State Advisories" : "Notifications"}
        >
          {user?.role === 'collector' ? <AlertTriangle size={18} color="var(--text-primary)" /> : <Bell size={18} color="var(--text-primary)" />}
          <span className="topbar-notification-dot" />
        </button>

        {/* User Profile */}
        <div className="topbar-user-profile" onClick={() => navigate(`/${user?.role?.toLowerCase()}/profile`)}>
          <div className="topbar-avatar">{user?.name ? user.name.substring(0,2).toUpperCase() : (officerDirectory[user?.username]?.title ? 'OF' : (user?.username ? 'OF' : '??'))}</div>
          <div className="topbar-user-info" style={{ paddingRight: '4px' }}>
            <span className="topbar-user-name" style={{ fontSize: '13px' }}>{user?.name || (user?.username ? `Officer ${user.username}` : 'Unknown')}</span>
            <span className="topbar-user-id" style={{ fontSize: '10px' }}>{user?.id || user?.username}</span>
          </div>
        </div>
          
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderLeft: '1px solid #E0E0E0', paddingLeft: '8px' }}>
          <button 
            className="btn bg-primary-alpha"
            style={{ padding: '4px 8px', border: 'none', borderRadius: 'var(--radius-sm)', height: '28px' }}
            onClick={(e) => { e.stopPropagation(); navigate(`/${user?.role}/users`); }}
            title={t('Manage Users', 'பயனர்களை நிர்வகி')}
          >
            <Users size={14} />
            <span style={{ fontSize: '12px' }}>{t('Manage Users', 'பயனர்களை நிர்வகி')}</span>
          </button>

          <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={(e) => { e.stopPropagation(); handleLogout(); }} title="Logout">
            <LogOut size={16} color="var(--text-muted)" />
          </button>
        </div>
      </div>
    </div>
  );
}
