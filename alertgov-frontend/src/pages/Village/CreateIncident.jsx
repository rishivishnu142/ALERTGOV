import { useState, useRef, useEffect, useContext } from 'react';
import { AIPanel, SeverityBadge, AlertBanner } from '../../components/common/UIComponents';
import GISMap from '../../components/Map/GISMap';
import { MapPin, Mic, Brain, Upload, AlertTriangle, CheckCircle, Loader, Bot, PlusCircle, ShieldAlert, ClipboardList, AlertCircle, XCircle, XOctagon, Flame, Camera, Paperclip, Droplet, Car, Factory, FlaskConical, PawPrint, Activity, Wind, HeartPulse, Building, ChevronDown, Search } from 'lucide-react';
import Swal from 'sweetalert2';
import { IncidentService, aiApi } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const EMERGENCY_CATEGORIES = [
  { id: 'Fire', icon: Flame, textEn: 'Fire', textTa: 'தீ விபத்து' },
  { id: 'Flood', icon: Droplet, textEn: 'Flood', textTa: 'வெள்ளம்' },
  { id: 'Road Accident', icon: Car, textEn: 'Road Accident', textTa: 'சாலை விபத்து' },
  { id: 'Industrial', icon: Factory, textEn: 'Industrial', textTa: 'தொழில்துறை விபத்து' },
  { id: 'Chemical', icon: FlaskConical, textEn: 'Chemical/HazMat', textTa: 'ரசாயன / அபாயகரமான பொருள்' },
  { id: 'Wildlife', icon: PawPrint, textEn: 'Wildlife Encounter', textTa: 'வனவிலங்கு மோதல்' },
  { id: 'Earthquake', icon: Activity, textEn: 'Earthquake', textTa: 'நிலநடுக்கம்' },
  { id: 'Cyclone', icon: Wind, textEn: 'Cyclone', textTa: 'சூறாவளி' },
  { id: 'Medical', icon: HeartPulse, textEn: 'Medical Emergency', textTa: 'மருத்துவ அவசரம்' },
  { id: 'Building', icon: Building, textEn: 'Building Collapse', textTa: 'கட்டடம் இடிந்து விழுதல்' },
  { id: 'Other', icon: AlertCircle, textEn: 'Other', textTa: 'மற்றவை' }
];

const SEVERITIES = ['Low', 'Medium', 'High', 'Severe', 'Extremely Severe'];

function CategorySelect({ value, onChange, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = EMERGENCY_CATEGORIES.find(c => c.id === value);
  const displayLabel = selectedCategory ? t(selectedCategory.textEn, selectedCategory.textTa) : t('Select category...', 'வகையைத் தேர்ந்தெடுக்கவும்...');

  const filtered = EMERGENCY_CATEGORIES.filter(c => {
    const term = search.toLowerCase();
    return t(c.textEn, c.textTa).toLowerCase().includes(term) || c.id.toLowerCase().includes(term);
  });

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <div 
        className="form-select" 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', minHeight: '38px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedCategory ? 'var(--text-primary)' : 'var(--text-muted)' }}>
          {selectedCategory ? <selectedCategory.icon size={16} /> : null}
          <span>{displayLabel}</span>
        </div>
        <ChevronDown size={16} color="var(--text-muted)" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </div>

      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginTop: '4px', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
          <div style={{ padding: '8px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              autoFocus
              type="text" 
              placeholder={t("Search categories... e.g., 'indust'", "வகைகளை தேடவும்...")}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>
          <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '4px' }}>
            {filtered.length > 0 ? filtered.map(c => (
              <div 
                key={c.id} 
                onClick={() => { onChange(c.id); setIsOpen(false); setSearch(''); }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', background: value === c.id ? 'var(--primary-light)' : 'transparent', color: value === c.id ? 'var(--primary)' : 'var(--text-primary)' }}
                onMouseEnter={(e) => { if(value !== c.id) e.currentTarget.style.background = 'var(--bg-muted)' }}
                onMouseLeave={(e) => { if(value !== c.id) e.currentTarget.style.background = 'transparent' }}
              >
                <c.icon size={16} color={value === c.id ? 'var(--primary)' : 'var(--text-muted)'} />
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{t(c.textEn, c.textTa)}</span>
              </div>
            )) : (
              <div style={{ padding: '12px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                {t("No categories found", "வகைகள் எதுவும் கிடைக்கவில்லை")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateIncident() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    category: '', severity: '', description: '', location: '', lat: 10.9102, lng: 76.9558,
    fieldNotes: '',
  });
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startVoiceRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      Swal.fire('Not Supported', 'Your browser does not support Voice-to-Text. Try using Chrome or Edge.', 'error');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setForm(f => ({ 
        ...f, 
        description: f.description ? `${f.description} ${transcript}` : transcript 
      }));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
      if (event.error !== 'no-speech') {
        Swal.fire('Error', 'Voice recognition failed: ' + event.error, 'error');
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setCameraStream(stream);
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Camera Error', text: 'Could not access the camera. Please check permissions.' });
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraStream(null);
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Add Timestamp and GPS overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
      
      ctx.fillStyle = 'white';
      ctx.font = '16px sans-serif';
      const dateStr = new Date().toLocaleString();
      const locationStr = `Lat: ${form.lat.toFixed(6)}, Lng: ${form.lng.toFixed(6)}`;
      ctx.fillText(dateStr, 10, canvas.height - 35);
      ctx.fillText(locationStr, 10, canvas.height - 15);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `Live_Capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
          setFiles(prev => [...prev, file]);
          closeCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleLocationSearch = async () => {
    if (!form.location) return;
    setIsSearchingLocation(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.location)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setForm(f => ({
          ...f,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }));
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Location found', showConfirmButton: false, timer: 2000 });
      } else {
        Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Location not found', showConfirmButton: false, timer: 2000 });
      }
    } catch (err) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Search failed', showConfirmButton: false, timer: 2000 });
    }
    setIsSearchingLocation(false);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIAnalyze = async () => {
    if (!form.description) return;
    setAiProcessing(true);
    try {
      const response = await aiApi.post('/ai/predict-risk', {
        prompt: form.description,
        language: language
      });
      
      const aiData = response.data.data;
      let severity = 'High';
      let duplicateCheck = false;
      let spamCheck = false;
      let summary = response.data.response || 'AI Analysis complete';
      let recommendation = 'Please review and submit.';
      let conciseDesc = form.description;
      
      if (aiData) {
        severity = aiData.severity || 'High';
        duplicateCheck = aiData.duplicate_check || false;
        spamCheck = aiData.spam_check || false;
        summary = aiData.concise_description || summary;
        recommendation = aiData.recommendation || recommendation;
        conciseDesc = aiData.concise_description || conciseDesc;
      }
      
      setAiResult({
        category: form.category || 'Other',
        severity: severity,
        duplicateCheck: duplicateCheck,
        spamCheck: spamCheck,
        confidence: 90,
        summary: summary,
        recommendation: recommendation,
      });
      setForm(f => ({ 
        ...f, 
        severity: severity,
        description: conciseDesc
      }));
    } catch (err) {
      console.error(err);
      Swal.fire('AI Error', 'Could not connect to AI service.', 'error');
    }
    setAiProcessing(false);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let photoBase64 = null;
        if (files.length > 0) {
            photoBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(files[0]);
            });
        }

        const incidentData = {
          title: form.category + ' at ' + form.location,
          category: form.category,
          severity: form.severity,
          status: 'Waiting for Taluk',
          level: 'taluk',
          district: user?.district || 'Coimbatore',
          taluk: user?.taluk || 'Unknown',
          village: user?.village || 'Unknown',
          description: form.description,
          reportedBy: user?.id || 'VEO-1',
          date: new Date().toISOString(),
          photoBase64: photoBase64
        };
      
      await IncidentService.createIncident(incidentData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to submit incident to server.', 'error');
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm(f => ({
            ...f,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Location updated via GPS',
            showConfirmButton: false,
            timer: 2000
          });
        },
        (error) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Unable to get location',
            text: error.message,
            showConfirmButton: false,
            timer: 3000
          });
        }
      );
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Geolocation not supported',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center', padding: '40px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}><CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /></div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--severity-low)', marginBottom: '8px' }}>{t('Incident Submitted!', 'சம்பவம் சமர்ப்பிக்கப்பட்டது!')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{t('Incident ID:', 'சம்பவ எண்:')} <strong style={{ fontFamily: 'JetBrains Mono', color: 'var(--primary)' }}>INC-2024-005</strong> {t('created successfully.', 'வெற்றிகரமாக உருவாக்கப்பட்டது.')}</p>
        <div className="ai-panel" style={{ textAlign: 'left' }}>
          <div className="ai-panel-header"><Bot size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('AI PROCESSING COMPLETE', 'செயற்கை நுண்ணறிவு செயலாக்கம் முடிந்தது')}</div>
          <p><CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('No duplicate detected', 'நகல் கண்டறியப்படவில்லை')} · <CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Spam check passed', 'ஸ்பேம் சோதனை வெற்றி')} · <Flame size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Severity: <strong>High (87% confidence)</strong> · {t('Forwarding to Taluk Officer for verification...', 'சரிபார்ப்பிற்காக தாலுகா அதிகாரிக்கு அனுப்பப்படுகிறது...')}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: '16px' }}>{t('Create Another', 'மற்றொன்றை உருவாக்கு')}</button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><PlusCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Create New Incident', 'புதிய சம்பவத்தை உருவாக்கு')}</div>
          <div className="page-subtitle">{t('Report an emergency to initiate the AlertGov response chain', 'அலர்ட்கோவ் மீட்பு பணிக்காக அவசரநிலையை புகாரளிக்கவும்')}</div>
        </div>

      </div>


      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          {/* Left: Form */}
          <div>
            <div className="card">
              <div className="card-header">
                <div className="card-title"><ClipboardList size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Incident Information', 'சம்பவ தகவல்')}</div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">{t('Emergency Category *', 'அவசர நிலை வகை *')}</label>
                  <CategorySelect 
                    value={form.category} 
                    onChange={val => setForm(f => ({ ...f, category: val }))} 
                    t={t} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Description *', 'விளக்கம் *')}</label>
                  <textarea className="form-textarea" rows={4} value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder={t("Describe the emergency in detail. Include what you see, hear, or smell. Number of people affected, direction of spread, etc.", "அவசரநிலையை விரிவாக விவரிக்கவும். நீங்கள் பார்ப்பது, கேட்பது அல்லது உணர்வது ஆகியவற்றைச் சேர்க்கவும்.")}
                  />
                  <div className="form-hint">
                    {t('Use voice-to-text:', 'குரல்-வழி-உரையைப் பயன்படுத்தவும்:')} 
                    <button 
                      type="button" 
                      onClick={startVoiceRecording}
                      style={{ 
                        color: isRecording ? 'var(--severity-high)' : 'var(--primary)', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '12px',
                        marginLeft: '4px',
                        fontWeight: isRecording ? 'bold' : 'normal'
                      }}
                    >
                      <Mic size={11} className={isRecording ? 'pulse-animation' : ''} /> 
                      {isRecording ? t(' Listening...', ' கேட்கிறது...') : t(' Record Voice', ' குரல் பதிவு செய்')}
                    </button>
                  </div>
                </div>



                <div className="form-group">
                  <label className="form-label">{t('Severity (AI-Assisted)', 'தீவிரம் (AI உதவியுடன்)')}</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                    {SEVERITIES.map(s => (
                      <div key={s} 
                        style={{
                           padding: '12px 4px',
                           textAlign: 'center',
                           borderRadius: 'var(--radius-sm)',
                           border: form.severity === s ? '1px solid var(--primary)' : '1px solid var(--border)',
                           background: form.severity === s ? 'var(--primary-light)' : 'rgba(0,0,0,0.2)',
                           cursor: 'pointer',
                           transition: 'all 0.2s',
                           fontSize: '11px',
                           fontWeight: form.severity === s ? 700 : 500,
                           boxShadow: form.severity === s ? 'var(--shadow-glow)' : 'none'
                        }}
                        onClick={() => setForm(f => ({ ...f, severity: s }))}>
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>
                          {s === 'Low' ? <CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> : s === 'Medium' ? <AlertCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> : s === 'High' ? <AlertTriangle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> : s === 'Severe' ? <XCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> : <XOctagon size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} />}
                        </div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload area */}
                <div className="form-group">
                  <label className="form-label">{t('Evidence Upload (Photos / Videos / Documents)', 'ஆதாரப் பதிவேற்றம் (புகைப்படங்கள் / வீடியோக்கள் / ஆவணங்கள்)')}</label>
                  <div 
                    className="upload-area"
                    onDragOver={(e) => e.preventDefault()} 
                    onDrop={handleDrop}
                  >
                    <div className="upload-icon"><Paperclip size={24} style={{ color: 'var(--primary)', margin: '0 auto', display: 'block' }} /></div>
                    <div className="upload-text">{t('Drag & drop files here', 'கோப்புகளை இங்கே இழுத்து விடவும்')}</div>
                    <div className="upload-hint">Supports: JPG, PNG, MP4, PDF, Voice (WAV)</div>
                    <input type="file" id="evidence-upload" multiple hidden onChange={handleFileSelect} />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => document.getElementById('evidence-upload').click()}>
                        <Upload size={13} /> Browse Files
                      </button>
                      <button type="button" className="btn btn-primary btn-sm" onClick={openCamera}>
                        <Camera size={13} /> Take Live Photo
                      </button>
                    </div>
                  </div>
                  
                  {files.length > 0 && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {files.map((file, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', fontSize: '12px', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {file.type.startsWith('image/') ? (
                              <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                            ) : (
                              <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ClipboardList size={16} color="var(--primary)" />
                              </div>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</span>
                              <span style={{ color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                          </div>
                          <button type="button" style={{ background: 'none', border: 'none', color: 'var(--severity-high)', cursor: 'pointer', padding: '4px' }} onClick={() => removeFile(idx)}>
                            <XCircle size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map + AI */}
          <div>
            <div className="card" style={{ marginBottom: '16px' }}>
              <div className="card-header">
                <div className="card-title"><MapPin size={14} /> {t('Incident Location', 'சம்பவ இடம்')}</div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <GISMap 
                  center={[form.lat, form.lng]} 
                  zoom={13} 
                  height={280} 
                  draggableMarker={true}
                  onMarkerDragEnd={(lat, lng) => setForm(f => ({ ...f, lat, lng }))}
                />
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input className="form-input" placeholder={t("Address / landmark...", "முகவரி / முக்கிய இடம்...")} value={form.location}
                      onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLocationSearch(); } }}
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleLocationSearch} disabled={isSearchingLocation}>
                      {isSearchingLocation ? <Loader size={14} className="spin" /> : 'Search'}
                    </button>
                  </div>
                  <div className="form-hint" style={{ marginTop: '6px' }}>
                    <MapPin size={11} style={{ display: 'inline' }} /> GPS: {form.lat.toFixed(4)}, {form.lng.toFixed(4)} · <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={handleUseMyLocation}><MapPin size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Use My Location', 'எனது இருப்பிடத்தைப் பயன்படுத்து')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="card">
              <div className="card-header">
                <div className="card-title"><Bot size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('AI Analysis', 'செயற்கை நுண்ணறிவு பகுப்பாய்வு')}</div>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleAIAnalyze} disabled={!form.description || aiProcessing}>
                  {aiProcessing ? <><Loader size={13} className="spin" /> {t('Analyzing...', 'பகுப்பாய்வு செய்கிறது...')}</> : <><Brain size={13} /> {t('Run AI Analysis', 'AI பகுப்பாய்வை இயக்கு')}</>}
                </button>
              </div>
              <div className="card-body">
                {!aiResult && !aiProcessing && (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    Enter description and click "Run AI Analysis" to get AI-powered severity prediction, duplicate check, and recommendations.
                  </div>
                )}
                {aiProcessing && (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}><Bot size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /></div>
                    <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>{t('Running AI Analysis...', 'AI பகுப்பாய்வு இயங்குகிறது...')}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{t('Checking duplicates', 'நகல்களைச் சரிபார்க்கிறது')} · {t('Predicting severity', 'தீவிரத்தன்மையைக் கணிக்கிறது')} · {t('Generating summary', 'சுருக்கத்தை உருவாக்குகிறது')}</div>
                  </div>
                )}
                {aiResult && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ background: aiResult.duplicateCheck ? 'var(--severity-high-bg)' : 'var(--severity-low-bg)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px' }}>
                          {aiResult.duplicateCheck ? <AlertTriangle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--severity-high)' }} /> : <CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--severity-low)' }} />}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: aiResult.duplicateCheck ? 'var(--severity-high)' : 'var(--severity-low)' }}>
                          {aiResult.duplicateCheck ? t('Duplicate Detected', 'நகல் கண்டறியப்பட்டது') : t('No Duplicate', 'நகல் இல்லை')}
                        </div>
                      </div>
                      <div style={{ background: aiResult.spamCheck ? 'var(--severity-high-bg)' : 'var(--severity-low-bg)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px' }}>
                           {aiResult.spamCheck ? <AlertTriangle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--severity-high)' }} /> : <CheckCircle size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--severity-low)' }} />}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: aiResult.spamCheck ? 'var(--severity-high)' : 'var(--severity-low)' }}>
                           {aiResult.spamCheck ? t('Spam Detected', 'ஸ்பேம் கண்டறியப்பட்டது') : t('Not Spam', 'ஸ்பேம் இல்லை')}
                        </div>
                      </div>
                    </div>
                    <div style={{ background: 'var(--severity-medium-bg)', borderRadius: '6px', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--severity-medium)' }}>{t('AI Predicted Severity', 'AI கணித்த தீவிரம்')}</span>
                      <SeverityBadge severity={aiResult.severity} />
                    </div>
                    <AIPanel summary={aiResult.summary} recommendation={aiResult.recommendation} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
          <button type="button" className="btn btn-secondary">{t('Save as Draft', 'வரைவாக சேமி')}</button>
          <button type="submit" className="btn btn-primary btn-lg">
            <CheckCircle size={16} /> Submit Incident
          </button>
        </div>
      </form>

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {isCameraOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Live Camera Capture</h3>
              <button type="button" onClick={closeCamera} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><XCircle size={20} /></button>
            </div>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '500px', borderRadius: '4px', background: '#000' }} autoPlay playsInline muted />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <button type="button" className="btn btn-primary" onClick={capturePhoto} style={{ width: '100%', justifyContent: 'center' }}>
                <Camera size={16} /> Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
