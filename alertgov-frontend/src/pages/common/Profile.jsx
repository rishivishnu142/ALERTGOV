import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { User, Phone, MapPin, Shield, Key, Briefcase, PhoneCall, Edit2, Save, X } from 'lucide-react';
import { UserService } from '../../api';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.username) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    const data = await UserService.getProfile(user.username);
    if (data) {
      setProfile(data);
      setEditForm(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const res = await UserService.updateProfile({
      username: user.username,
      ...editForm
    });
    if (res.success) {
      setProfile(res.data);
      setIsEditing(false);
    } else {
      alert("Error updating profile");
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading Profile...</div>;

  const displayData = profile || user || {};

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">{t('My Profile', 'எனது சுயவிவரம்')}</div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--primary)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
            <Edit2 size={16} /> Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#e2e8f0', color: '#1e293b', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
              <X size={16} /> Cancel
            </button>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--severity-low)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div style={{ maxWidth: '550px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-header"><div className="card-title">{t('Officer Information', 'அதிகாரி தகவல்')}</div></div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" alt="TN Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isEditing ? (
                    <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ padding: '4px', fontSize: '18px' }} />
                  ) : (displayData.name || `Officer ${displayData.username}`)}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 700, marginBottom: '4px' }}>
                  {isEditing ? (
                    <input type="text" value={editForm.designation || ''} onChange={e => setEditForm({...editForm, designation: e.target.value})} style={{ padding: '4px' }} placeholder="Designation" />
                  ) : (displayData.designation || displayData.role || 'Officer')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('Government of Tamil Nadu', 'தமிழ்நாடு அரசு')}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Briefcase size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Department', 'துறை')}</span>
                {isEditing ? (
                  <input type="text" value={editForm.department || ''} onChange={e => setEditForm({...editForm, department: e.target.value})} />
                ) : (<span>{displayData.department || 'Revenue & Disaster Management'}</span>)}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Shield size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Officer ID', 'அதிகாரி எண்')}</span>
                <span className="font-mono text-primary" style={{ fontWeight: 600 }}>{displayData.username}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <MapPin size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Jurisdiction', 'அதிகார எல்லை')}</span>
                {isEditing ? (
                  <input type="text" value={editForm.district || ''} onChange={e => setEditForm({...editForm, district: e.target.value})} placeholder="District" />
                ) : (<span>{displayData.district || 'Tamil Nadu'}</span>)}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Phone size={16} color="var(--text-muted)" />
                <span style={{ width: '110px', fontWeight: 600 }}>{t('Phone', 'தொலைபேசி')}</span>
                {isEditing ? (
                  <input type="text" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                ) : (<span>{displayData.phone || '+91 98765 43210'}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
