import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { INCIDENTS } from '../../data/mockData';
import { Upload as UploadIcon, Image, FileText, Video, Mic, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UploadMedia() {
  const location = useLocation();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(location.state?.incidentId || 'INC-2024-001');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles.map(f => ({ name: f.name, size: f.size, type: f.type, status: 'pending' }))]);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setFiles(prev => prev.map(f => ({ ...f, status: 'uploaded' })));
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  const getIcon = (type) => {
    if (type.includes('image')) return <Image size={16} />;
    if (type.includes('video')) return <Video size={16} />;
    if (type.includes('audio')) return <Mic size={16} />;
    return <FileText size={16} />;
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <div className="page-title"><UploadIcon size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {t('Upload Media', 'ஊடகங்களைப் பதிவேற்று')}</div>
          <div className="page-subtitle">{t('Upload photos, videos, or documents to an existing incident', 'ஏற்கனவே உள்ள சம்பவத்தில் புகைப்படங்கள், வீடியோக்கள் அல்லது ஆவணங்களைப் பதிவேற்றவும்')}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">{t('Select Incident', 'சம்பவத்தைத் தேர்ந்தெடு')}</label>
            <select className="form-select" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
              {INCIDENTS.map(i => <option key={i.id} value={i.id}>{i.id} — {i.title}</option>)}
            </select>
          </div>

          <div
            className="upload-area"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            style={{ marginBottom: '24px', padding: '60px 24px' }}
          >
            <div className="upload-icon"><UploadIcon size={32} color="var(--primary)" /></div>
            <div className="upload-text">{t('Drag & drop files here or click to browse', 'கோப்புகளை இங்கே இழுத்து விடவும் அல்லது தேட கிளிக் செய்யவும்')}</div>
            <div className="upload-hint">{t('Supports: JPG, PNG, MP4, PDF, Voice (WAV) — Max 50MB per file', 'ஆதரவு: JPG, PNG, MP4, PDF, Voice (WAV) — அதிகபட்சம் ஒரு கோப்புக்கு 50MB')}</div>
          </div>

          {files.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div className="section-title">{t('Selected Files', 'தேர்ந்தெடுக்கப்பட்ட கோப்புகள்')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {files.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: 'var(--primary)' }}>{getIcon(f.type || 'image')}</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{(f.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>
                    {f.status === 'uploaded' ? <CheckCircle size={16} color="var(--severity-low)" /> :
                     f.status === 'uploading' ? <div className="spin" style={{ width: '16px', height: '16px', border: '2px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} /> :
                     <button className="btn btn-ghost btn-sm" onClick={() => setFiles(fs => fs.filter((_, idx) => idx !== i))}>✕</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {files.length > 0 && <button className="btn btn-secondary" onClick={() => setFiles([])}>{t('Clear All', 'அனைத்தையும் அழி')}</button>}
            <button className="btn btn-primary" onClick={handleUpload} disabled={files.length === 0 || uploading || success}>
              {uploading ? t('Uploading...', 'பதிவேற்றுகிறது...') : success ? t('Uploaded Successfully', 'வெற்றிகரமாக பதிவேற்றப்பட்டது') : t('Upload Files', 'கோப்புகளை பதிவேற்று')}
            </button>
          </div>
        </div>
      </div>
      <style>{`.spin { animation: spin 1s linear infinite; }`}</style>
    </div>
  );
}
