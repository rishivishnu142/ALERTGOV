import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { User, Phone, MapPin, Shield, Key, Briefcase, PhoneCall } from 'lucide-react';
import { officerDirectory } from '../../data/officerDirectory';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <div className="page-title">{t('My Profile', 'எனது சுயவிவரம்')}</div>
        </div>
      </div>

      <div style={{ maxWidth: '550px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-header"><div className="card-title">{t('Officer Information', 'அதிகாரி தகவல்')}</div></div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" alt="TN Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>{user?.name || (officerDirectory[user?.username]?.title ? `Officer ${officerDirectory[user?.username].title.replace(' Operator', '').replace(' Taluk Officer', '')}` : (user?.username ? `Officer ${user.username}` : 'Unknown'))}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--severity-low-bg)', color: 'var(--severity-low)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, border: '1px solid var(--severity-low-border)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--severity-low)' }}></div>
                    {t('Online', 'ஆன்லைன்')}
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 700, marginBottom: '4px' }}>
                  {user?.title || officerDirectory[user?.username]?.title || (user?.role?.toLowerCase() === 'village' ? 'Village Executive Officer' : 
                   user?.role?.toLowerCase() === 'taluk' ? 'Taluk Disaster Manager' : 'Disaster Management Officer')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('Government of Tamil Nadu', 'தமிழ்நாடு அரசு')}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Briefcase size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Department', 'துறை')}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{t('Revenue & Disaster Management', 'வருவாய் மற்றும் பேரிடர் மேலாண்மை')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Shield size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Officer ID', 'அதிகாரி எண்')}</span>
                <span className="font-mono text-primary" style={{ fontWeight: 600 }}>{user?.id || user?.username}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <MapPin size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Jurisdiction', 'அதிகார எல்லை')}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                  {user?.village || user?.taluk || user?.district 
                    ? `${user?.village ? user.village + ', ' : ''}${user?.taluk ? user.taluk + ', ' : ''}${user?.district || ''}`
                    : (officerDirectory[user?.username]?.jurisdiction || (user?.username ? user.username.split('-')[1] || 'Tamil Nadu' : 'Tamil Nadu'))}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Phone size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Phone', 'தொலைபேசி')}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user?.phone || '+91 98765 43210'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <PhoneCall size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Emergency Contact', 'அவசர தொடர்பு')}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user?.emergencyContact || '+91 98765 11223'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
