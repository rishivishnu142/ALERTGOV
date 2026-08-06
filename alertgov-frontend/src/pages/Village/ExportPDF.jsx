import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INCIDENTS } from '../../data/mockData';
import { Download, ArrowLeft, FileText, Image as ImageIcon, MapPin } from 'lucide-react';
import { Modal, SeverityBadge, CategoryBadge } from '../../components/common/UIComponents';

export default function ExportPDF() {
  const navigate = useNavigate();
  const [showLangModal, setShowLangModal] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'ta'
  const [selectedIncident, setSelectedIncident] = useState(null);

  const activeIncidents = INCIDENTS.filter(i => i.status !== 'Resolved');

  const openModalForIncident = (inc) => {
    setSelectedIncident(inc);
    setShowLangModal(true);
  };

  const generatePDF = (lang) => {
    setLanguage(lang);
    setShowLangModal(false);
    
    // Slight delay to allow React to re-render the print layout with the selected language and incident
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Translations
  const t = {
    gov: language === 'ta' ? 'தமிழ்நாடு அரசு' : 'Government of Tamil Nadu',
    year: '2026',
    series: language === 'ta' ? 'கையெழுத்து பிரதி தொடர்' : 'MANUSCRIPT SERIES',
    dept: language === 'ta' ? 'வருவாய் மற்றும் பேரிடர் மேலாண்மை துறை' : 'REVENUE AND DISASTER MANAGEMENT DEPARTMENT',
    go: language === 'ta' ? 'அரசாணை (நிலை) எண்.142' : 'G.O.Ms.No.142',
    date: language === 'ta' ? `நாள் ${new Date().toLocaleDateString('ta-IN')}` : `Dated ${new Date().toLocaleDateString('en-IN')}`,
    abstract: language === 'ta' ? 'சுருக்கம்' : 'ABSTRACT',
    abstractDesc: language === 'ta' ? 'பேரிடர் மேலாண்மை - AlertGov AI மூலம் பகுப்பாய்வு செய்யப்பட்ட சம்பவம் - ஆணை வெளியிடப்படுகிறது.' : 'DISASTER MANAGEMENT - Incident analyzed and registered via AlertGov AI - Orders - Issued.',
    read: language === 'ta' ? 'படிக்கப்பட்டவை:-' : 'Read the following:-',
    read1: language === 'ta' ? '1. கிராம நிர்வாக அதிகாரிகளிடமிருந்து பெறப்பட்ட கள அறிக்கைகள் மற்றும் AlertGov AI பகுப்பாய்வு.' : '1. Field reports and AlertGov AI automated analysis received from Village Emergency Operators.',
    order: language === 'ta' ? 'ஆணை:' : 'ORDER:',
    orderDesc: language === 'ta' ? 'படிக்கப்பட்ட அறிக்கைகளின் அடிப்படையில், கீழ்கண்ட பேரிடர் சம்பவம் குறித்து விரிவான அறிக்கை சமர்ப்பிக்கப்படுகிறது.' : 'Based on the reports read above, the following detailed incident report has been registered and verified by AI.',
    
    // Table Labels
    tableTitle: language === 'ta' ? 'விரிவான சம்பவ பகுப்பாய்வு' : 'Detailed Incident Analysis',
    incidentId: language === 'ta' ? 'சம்பவ எண்' : 'Incident ID',
    dateTime: language === 'ta' ? 'நாள் மற்றும் நேரம்' : 'Date & Time of Report',
    titleDesc: language === 'ta' ? 'தலைப்பு மற்றும் விவரம்' : 'Title & Description',
    catSev: language === 'ta' ? 'வகை மற்றும் தீவிரம்' : 'Category & Severity',
    location: language === 'ta' ? 'சரியான இடம்' : 'Exact Location',
    population: language === 'ta' ? 'பாதிக்கப்படக்கூடிய மக்கள் தொகை' : 'Population at Risk',
    aiSummary: language === 'ta' ? 'செயற்கை நுண்ணறிவு மதிப்பீடு' : 'AI Assessment Summary',
    timeline: language === 'ta' ? 'கள காலக்கெடு (நடவடிக்கைகள்)' : 'Field Timeline (Actions)',
    annexure: language === 'ta' ? 'இணைப்பு (ஆதாரம்)' : 'Annexure (Evidence)',
    
    // Table content fallbacks
    notAssessed: language === 'ta' ? 'மதிப்பிடப்படவில்லை' : 'Not assessed',
    aiRecLabel: language === 'ta' ? 'பரிந்துரை:' : 'Recommendation:',
    noUpdates: language === 'ta' ? 'காலக்கெடு புதுப்பிப்புகள் எதுவும் இதுவரை பதிவு செய்யப்படவில்லை.' : 'No timeline updates recorded yet.',
    photoAttached: language === 'ta' ? 'புகைப்படம் இணைக்கப்பட்டுள்ளது' : 'Photo Attached',
    inAnnexure: language === 'ta' ? 'இணைப்பு-I இல்' : 'in Annexure-I',
    
    // Footer
    byOrder: language === 'ta' ? '(ஆளுநரின் ஆணைப்படி)' : '(BY ORDER OF THE GOVERNOR)',
    secretary: language === 'ta' ? 'அரசு முதன்மைச் செயலாளர்' : 'PRINCIPAL SECRETARY TO GOVERNMENT',
    to: language === 'ta' ? 'பெறுநர்' : 'To',
    collector: language === 'ta' ? 'மாவட்ட ஆட்சியர்' : 'The District Collector',
    district: language === 'ta' ? 'மாவட்டம்' : 'District',
    watermark: language === 'ta' ? '*** இந்த ஆவணம் AlertGov AI மூலம் தானியங்கியாக தொகுக்கப்பட்டு சரிபார்க்கப்பட்டது ***' : '*** This document was automatically compiled and verified by AlertGov AI ***'
  };

  return (
    <div className="animate-in">
      {/* --- PREVIEW UI (Hidden on Print) --- */}
      <div className="no-print">
        <div className="page-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '12px' }} onClick={() => navigate(-1)}>
              <ArrowLeft size={16} color="var(--primary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Back to Registry</span>
            </div>
            <div className="page-title"><FileText size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Export Incident Report</div>
            <div className="page-subtitle">Preview the data and download an official Government Order (G.O.) manuscript for a specific incident.</div>
          </div>
        </div>

        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeIncidents.map(inc => (
                  <tr key={inc.id}>
                    <td><span className="font-mono text-primary" style={{ fontSize: '12px', fontWeight: 600 }}>{inc.id}</span></td>
                    <td><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{inc.title}</span></td>
                    <td><CategoryBadge category={inc.category} /></td>
                    <td><SeverityBadge severity={inc.severity} /></td>
                    <td><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}><MapPin size={10} style={{ display: 'inline', marginRight: 4 }} />{[inc.village, inc.taluk].filter(Boolean).join(', ')}</span></td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => openModalForIncident(inc)}>
                        <Download size={14} style={{ marginRight: '6px' }}/> Generate PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Language Selection Modal */}
        <Modal open={showLangModal} onClose={() => setShowLangModal(false)} title="Select Report Language">
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>Choose the language for the official Government Order (G.O.) PDF for <strong>{selectedIncident?.id}</strong>.</p>
            <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center' }}>
              <button className="btn btn-secondary" style={{ padding: '12px 32px', fontSize: '16px', flex: 1 }} onClick={() => generatePDF('en')}>English</button>
              <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '16px', flex: 1 }} onClick={() => generatePDF('ta')}>தமிழ் (Tamil)</button>
            </div>
          </div>
        </Modal>
      </div>

      {/* --- PRINT ONLY LAYOUT (G.O. Manuscript Style) --- */}
      {selectedIncident && (
      <div className="print-only">
        <div className="go-manuscript">
          {/* Header */}
          <div className="go-header">
            <div className="go-left">
              <strong>{t.gov}</strong><br/>
              {t.year}
            </div>
            <div className="go-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" alt="TN Logo" />
            </div>
            <div className="go-right">
              <strong>{t.series}</strong>
            </div>
          </div>

          {/* Department & GO No */}
          <h2 className="go-dept">{t.dept}</h2>
          <h3 className="go-no">{t.go}, {t.date}.</h3>

          {/* Abstract */}
          <div className="go-abstract">
            <strong><u>{t.abstract}</u></strong>
            <p style={{ textIndent: '0' }}>{t.abstractDesc}</p>
          </div>

          <hr className="go-hr" />

          {/* Body */}
          <div className="go-body">
            <strong><u>{t.read}</u></strong>
            <p style={{ paddingLeft: '20px', marginTop: '10px' }}>{t.read1}</p>
            
            <div className="go-divider">-o0o-</div>

            <strong><u>{t.order}</u></strong>
            <p style={{ textIndent: '40px', marginTop: '10px' }}>{t.orderDesc}</p>
          </div>

          {/* Table */}
          <h4 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '12pt' }}><u>{t.tableTitle}</u></h4>
          <table className="go-table">
            <tbody>
              <tr>
                <td style={{ width: '30%', fontWeight: 'bold' }}>{t.incidentId}</td>
                <td>{selectedIncident.id}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.dateTime}</td>
                <td>{selectedIncident.updates && selectedIncident.updates.length > 0 ? selectedIncident.updates[selectedIncident.updates.length - 1].time : new Date().toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.titleDesc}</td>
                <td>
                  <strong>{selectedIncident.title}</strong><br/>
                  {selectedIncident.description}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.catSev}</td>
                <td>{selectedIncident.category} / <strong>{selectedIncident.severity}</strong></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.location}</td>
                <td>{[selectedIncident.village, selectedIncident.taluk, selectedIncident.district].filter(Boolean).join(', ')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.population}</td>
                <td>{selectedIncident.populationAtRisk ? selectedIncident.populationAtRisk.toLocaleString() : t.notAssessed}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.aiSummary}</td>
                <td style={{ color: '#0047AB' }}>
                  {selectedIncident.aiSummary}<br/>
                  <strong>{t.aiRecLabel}</strong> {selectedIncident.aiRecommendation}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.timeline}</td>
                <td>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {selectedIncident.updates && selectedIncident.updates.map((u, i) => (
                       <li key={i} style={{ marginBottom: '4px' }}>[{u.time}] - {u.text}</li>
                    ))}
                    {(!selectedIncident.updates || selectedIncident.updates.length === 0) && (
                       <li>{t.noUpdates}</li>
                    )}
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>{t.annexure}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', border: '1px dashed #999', padding: '10px', background: '#f9f9f9', width: '100px' }}>
                     <ImageIcon size={24} color="#666" style={{ marginBottom: '4px' }} />
                     <span style={{ fontSize: '8pt', color: '#666' }}>{t.photoAttached}<br/>{t.inAnnexure}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Signature */}
          <div className="go-signature">
            <p>{t.byOrder}</p>
            <br/><br/>
            <strong>{t.secretary}</strong>
            <p style={{ fontSize: '10pt', marginTop: '10px' }}>{t.to}<br/>{t.collector},<br/>{selectedIncident.district || 'Coimbatore'} {t.district}.</p>
          </div>
          
          <div className="ai-watermark">
             {t.watermark}
          </div>
        </div>
      </div>
      )}

      <style>{`
        .print-only { display: none; }
        
        @media print {
          body { background: white !important; margin: 0; padding: 0; }
          .no-print, .sidebar, .topbar { display: none !important; }
          .app-shell { display: block !important; grid-template-columns: 1fr !important; }
          .main-content { padding: 0 !important; overflow: visible !important; }
          .print-only { display: block !important; }
          
          @page { size: A4 portrait; margin: 15mm; }

          .go-manuscript {
            font-family: "Times New Roman", Times, serif;
            color: black;
            font-size: 13pt;
            line-height: 1.5;
            padding: 10px 20px;
          }
          .go-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }
          .go-header img { width: 90px; }
          .go-left, .go-right { text-align: center; width: 140px; font-size: 11pt; }
          .go-dept { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 10px; }
          .go-no { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 30px; }
          
          .go-abstract { margin-bottom: 15px; font-size: 11pt; text-align: center; }
          .go-abstract strong { display: block; margin-bottom: 10px; }
          
          .go-hr { border: 0; border-top: 1px solid black; margin: 20px 0; }
          
          .go-body { margin-bottom: 20px; }
          .go-body p { margin: 5px 0 0 0; }
          .go-divider { text-align: center; margin: 20px 0; font-size: 12pt; }
          
          .go-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 11pt;
          }
          .go-table th {
            background-color: #f0f0f0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .go-table th, .go-table td {
            border: 1px solid black;
            padding: 8px 10px;
            vertical-align: top;
          }
          .go-signature {
            text-align: right;
            margin-top: 30px;
            padding-right: 20px;
          }
          .ai-watermark {
            margin-top: 40px;
            text-align: center;
            font-size: 10pt;
            color: #666;
            font-style: italic;
            border-top: 1px dashed #ccc;
            padding-top: 10px;
          }
        }
      `}</style>
    </div>
  );
}
