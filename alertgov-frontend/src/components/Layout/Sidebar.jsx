import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLiveContextData } from '../../context/LiveContext';
import {
  LayoutDashboard, FilePlus, List, UploadCloud, RefreshCw,
  Map, BarChart2, ShieldAlert, FileText, CheckSquare,
  Navigation, Radio, Brain, LogOut, Bell, Shield,
  Inbox, Satellite, AlertCircle, ClipboardList, Route, Users, AlertTriangle
} from 'lucide-react';

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

export default function Sidebar() {
  const { incidents: INCIDENTS } = useLiveContextData();

  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  // Badge counts
  const queueCount = INCIDENTS.filter(i => i.status === 'Taluk Verified').length;
  const pendingTaluk = INCIDENTS.filter(i => i.status === 'Waiting for Taluk').length;

  const menuMap = {
    village: [
      { section: t('Main', 'முதன்மை') },
      { path: '/village',                  label: t('Dashboard', 'டாஷ்போர்டு'),        icon: <LayoutDashboard size={18} /> },
      { path: '/village/create-incident',  label: t('Create Incident', 'சம்பவத்தை உருவாக்கு'),  icon: <FilePlus size={18} /> },
      { path: '/village/active-incidents', label: t('Active Incidents', 'செயலில் உள்ள சம்பவங்கள்'), icon: <List size={18} /> },
    ],
    taluk: [
      { section: t('Main', 'முதன்மை') },
      { path: '/taluk',                  label: t('Dashboard', 'டாஷ்போர்டு'),              icon: <LayoutDashboard size={18} /> },
      { path: '/taluk/verification',     label: t('Incident Verification', 'சம்பவ சரிபார்ப்பு'),  icon: <CheckSquare size={18} />, badge: pendingTaluk },
      { path: '/taluk/active-incidents', label: t('Active Incidents', 'செயலில் உள்ள சம்பவங்கள்'),       icon: <List size={18} /> },
      { path: '/taluk/reports',          label: t('Reports', 'அறிக்கைகள்'),                icon: <BarChart2 size={18} /> },
    ],
    district: [
      { section: t('Operations', 'செயல்பாடுகள்') },
      { path: '/district',                   label: t('EOC Dashboard', 'அவசரகால மைய டாஷ்போர்டு'),      icon: <LayoutDashboard size={18} /> },
      { path: '/district/approval-queue',    label: t('Incident Queue', 'சம்பவ வரிசை'),     icon: <Inbox size={18} />, badge: queueCount },
      { path: '/district/active-emergencies',label: t('Active Emergencies', 'செயலில் உள்ள அவசரநிலைகள்'), icon: <ShieldAlert size={18} /> },
      { section: t('Command', 'கட்டளை') },
      { path: '/district/map',               label: t('Live GIS Map', 'நேரடி GIS வரைபடம்'),       icon: <Satellite size={18} /> },
      { path: '/district/resource-command',  label: t('Resource Command', 'வள கட்டளை'),   icon: <Navigation size={18} /> },
      { path: '/district/broadcast-center',  label: t('Broadcast Center', 'ஒளிபரப்பு மையம்'),   icon: <Radio size={18} /> },
      { section: t('Intelligence', 'நுண்ணறிவு') },
      { path: '/district/analytics',         label: t('Analytics', 'பகுப்பாய்வு'),          icon: <BarChart2 size={18} /> },
      { path: '/district/timeline',          label: t('Reports', 'அறிக்கைகள்'),            icon: <FileText size={18} /> },
    ],
    collector: [
      { section: t('Executive', 'நிர்வாக') },
      { path: '/collector',                   label: t('Dashboard', 'டாஷ்போர்டு'),           icon: <LayoutDashboard size={18} /> },
      { path: '/collector/broadcast-approval',label: t('Broadcast Approval', 'ஒளிபரப்பு ஒப்புதல்'),  icon: <Radio size={18} /> },
      { section: t('Management', 'மேலாண்மை') },
      { path: '/collector/situation-map',     label: t('Operations Map', 'செயல்பாட்டு வரைபடம்'),      icon: <Map size={18} /> },
      { path: '/collector/official-orders',   label: t('Official Orders', 'அதிகாரப்பூர்வ உத்தரவுகள்'),     icon: <ClipboardList size={18} /> },
      { path: '/collector/ai-reports',        label: t('AI Reports', 'செயற்கை நுண்ணறிவு அறிக்கைகள்'),          icon: <Brain size={18} /> },
      { path: '/collector/state-advisories',  label: t('State Advisories', 'மாநில ஆலோசனைகள்'),    icon: <AlertTriangle size={18} /> },
    ],
    state: [
      { section: t('State Overview', 'மாநில கண்ணோட்டம்') },
      { path: '/state',           label: t('State Dashboard', 'மாநில டாஷ்போர்டு'),    icon: <LayoutDashboard size={18} /> },
      { path: '/state/districts', label: t('District Status', 'மாவட்ட நிலை'),    icon: <Users size={18} /> },
      { section: t('Actions', 'நடவடிக்கைகள்') },
      { path: '/state/analytics', label: t('Analytics', 'பகுப்பாய்வு'),          icon: <BarChart2 size={18} /> },
      { path: '/state/prediction',label: t('AI Prediction', 'செயற்கை நுண்ணறிவு கணிப்பு'),      icon: <Brain size={18} /> },
    ],
  };

  const links = menuMap[user?.role] || [];
  const initials = user?.name?.substring(0, 2).toUpperCase() || '??';

  return (
    <div className="sidebar">
      {/* Header / Brand */}
      <div className="sidebar-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" alt="TN Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', marginLeft: '-4px' }} />
        <div className="sidebar-brand">
          <div className="sidebar-brand-name">AlertGov</div>
          <div className="sidebar-brand-sub">{t(ROLE_LABELS[user?.role] || 'Dashboard', ROLE_LABELS_TA[user?.role] || 'டாஷ்போர்டு')}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {links.map((item, idx) => {
          if (item.section) {
            return <div key={`s-${idx}`} className="sidebar-section-label">{item.section}</div>;
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split('/').length === 2}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink
          to={`/${user?.role}/notifications`}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <Bell size={18} /> <span>{t('Notifications', 'அறிவிப்புகள்')}</span>
        </NavLink>

        <div className="sidebar-user" onClick={() => navigate(`/${user?.role}/profile`)}>
          <div className="user-avatar-sm">{initials}</div>
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.id}</div>
          </div>
          <LogOut size={16} color="var(--text-muted)" onClick={(e) => { e.stopPropagation(); handleLogout(); }} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
}
