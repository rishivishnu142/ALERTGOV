import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function PrintReport() {
  const [searchParams] = useSearchParams();
  const incident = searchParams.get('incident') || 'INC-2026-NEW';
  const veo = searchParams.get('veo') || 'Village Emergency Operator';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const time = searchParams.get('time') || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [incidentData, setIncidentData] = useState(null);

  // Load from localStorage and trigger print dialog
  useEffect(() => {
    const stored = localStorage.getItem('latestIncident');
    if (stored) {
      try {
        setIncidentData(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing stored incident', e);
      }
    }
    
    // Slight delay to ensure images are loaded
    const timer = setTimeout(() => {
      window.print();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: '#e0e0e0', minHeight: '100vh', padding: '2rem 0', fontFamily: 'Arial, sans-serif' }}>
      <div className="a4-container">
        {/* Header / Left Column */}
        <div className="col-1">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" alt="TN Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <h3 style={{ fontSize: '13px', margin: '10px 0 2px 0' }}>GOVERNMENT OF TAMIL NADU</h3>
            <h4 style={{ fontSize: '11px', margin: '0 0 10px 0' }}>DEPARTMENT OF DISASTER MANAGEMENT</h4>
            <h2 style={{ fontSize: '14px', color: '#16A34A', margin: '0 0 4px 0' }}>ALERTGOV AI</h2>
            <h1 style={{ fontSize: '18px', color: '#16A34A', margin: '0 0 20px 0' }}>INCIDENT REPORT</h1>
          </div>

          <div style={{ fontSize: '10px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
            <strong>Reference No. : TAL/OML/{incidentData?.category ? incidentData.category.toUpperCase().substring(0,4) : 'GEN'}/2026/001</strong>
            <strong>Date : {date}</strong>
          </div>

          <div style={{ fontSize: '11px', lineHeight: '1.6' }}>
            <p><strong>From</strong><br/>Taluk Officer,<br/>Local Taluk,<br/>District.</p>
            <p style={{ marginTop: '20px' }}><strong>To</strong><br/>The District Collector,<br/>District Collectorate.</p>
            <p style={{ marginTop: '20px' }}>
              <strong>Subject:</strong> Submission of Incident Report regarding {incidentData?.category || 'Emergency'} at Local Village.
            </p>
            <p style={{ marginTop: '20px' }}>Respected Sir,</p>
            <p style={{ textIndent: '20px', textAlign: 'justify' }}>
              I hereby submit the incident report regarding the {incidentData?.category || 'Emergency'} that occurred on {date}. The report contains the details of the incident, actions taken by various departments, resource deployment, and recommendations for further action.
            </p>
          </div>

          <div style={{ marginTop: '40px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ width: '80px', height: '80px', border: '2px solid #2563EB', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2563EB', textAlign: 'center', fontSize: '9px', fontWeight: 'bold' }}>
              <span>TALUK OFFICE</span>
              <span>★ LOCAL ★</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p>Yours faithfully,</p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/John_Hancock_signature.svg" alt="Signature" style={{ width: '100px', margin: '10px 0' }} />
              <p>Taluk Officer.</p>
            </div>
          </div>
          
          <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '10px', paddingTop: '20px' }}>Page 1 of 3</div>
        </div>

        {/* Middle Column */}
        <div className="col-2">
          <h4 className="section-title">2. INCIDENT DETAILS</h4>
          <table className="info-table">
            <tbody>
              <tr><td><strong>Incident ID</strong></td><td>: {incident}</td></tr>
              <tr><td><strong>Type</strong></td><td>: {incidentData?.category || 'General'}</td></tr>
              <tr><td><strong>Date</strong></td><td>: {date}</td></tr>
              <tr><td><strong>Time</strong></td><td>: {time}</td></tr>
              <tr><td><strong>Village</strong></td><td>: Local Village</td></tr>
              <tr><td><strong>GPS Coordinates</strong></td><td>: {incidentData?.lat || '10.9102'}, {incidentData?.lng || '76.9558'}</td></tr>
              <tr><td><strong>Severity</strong></td><td>: {incidentData?.severity || 'High'}</td></tr>
              <tr><td><strong>Reported By</strong></td><td>: {veo}</td></tr>
            </tbody>
          </table>

          <h4 className="section-title" style={{ marginTop: '30px' }}>3. BACKGROUND</h4>
          <p style={{ fontSize: '11px', lineHeight: '1.6', textAlign: 'justify' }}>
            {incidentData?.description || 'The incident was first reported by the VEO after receiving emergency calls.'}
            <br/><br/>
            <strong>Field Notes:</strong> {incidentData?.fieldNotes || 'None'}
          </p>

          <h4 className="section-title" style={{ marginTop: '30px' }}>4. ACTIONS TAKEN</h4>
          <ul style={{ fontSize: '11px', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Incident registered in AlertGov AI system.</li>
            <li>Initial assessment conducted by Village EOC.</li>
            <li>Information forwarded to Taluk Office for verification.</li>
            <li>Collectorate notified through the AI automated pipeline.</li>
          </ul>

          <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '10px', paddingTop: '20px' }}>Page 2 of 3</div>
        </div>

        {/* Right Column */}
        <div className="col-3">
          <h4 className="section-title">5. AI ASSESSMENT</h4>
          <table className="info-table" style={{ marginBottom: '15px' }}>
            <tbody>
              <tr><td><strong>AI Severity Score</strong></td><td>: High (8.7/10)</td></tr>
              <tr><td><strong>AI Risk Level</strong></td><td>: {incidentData?.severity || 'High'}</td></tr>
            </tbody>
          </table>

          <h4 className="section-title" style={{ marginTop: '20px' }}>6. PHOTOGRAPHIC EVIDENCE</h4>
          <table className="info-table" style={{ border: 'none', marginBottom: '10px' }}>
            <tbody>
              <tr><td style={{ border: 'none', padding: '2px 5px' }}>Annexure I</td><td style={{ border: 'none', padding: '2px 5px' }}>: VEO Incident Photographs</td></tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              {incidentData?.photoBase64 ? (
                <img src={incidentData.photoBase64} alt="Evidence" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', border: '1px solid #94a3b8' }} />
              ) : (
                <div style={{ width: '100%', height: '120px', background: '#f3f4f6', border: '1px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '12px' }}>[ No Evidence Provided ]</div>
              )}
              <div style={{ fontSize: '9px', marginTop: '4px' }}>Photo 1: Live Capture from Village EOC</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '10px', paddingTop: '10px' }}>Page 3 of 3</div>
        </div>
      </div>

      <div className="a4-footer">
        <h3 style={{ textAlign: 'center', fontSize: '12px', margin: '0 0 15px 0', borderBottom: '1px solid #000', paddingBottom: '10px' }}>FOR OFFICE USE ONLY</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <div style={{ flex: 1, borderRight: '1px solid #000', paddingRight: '20px' }}>
            <h4 style={{ fontSize: '11px', textAlign: 'center', margin: '0 0 40px 0' }}>Received By<br/>District EOC</h4>
            <div style={{ fontSize: '11px' }}>
              <p>Date: ________________________</p>
              <p style={{ marginTop: '20px' }}>Signature: ___________________</p>
            </div>
          </div>

          <div style={{ flex: 2, padding: '0 20px', borderRight: '1px solid #000' }}>
            <h4 style={{ fontSize: '11px', textAlign: 'center', margin: '0 0 20px 0' }}>Remarks of Collector</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', marginBottom: '20px' }}>
              <label><input type="checkbox" /> Approved</label>
              <label><input type="checkbox" /> Need Clarification</label>
              <label><input type="checkbox" /> Rejected</label>
            </div>
            <div style={{ fontSize: '11px' }}>
              <p>Remarks: ___________________________________________________________</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <span>Date: ____________________</span>
                <span>Signature: ____________________</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, paddingLeft: '20px' }}>
            <h4 style={{ fontSize: '11px', textAlign: 'center', margin: '0 0 40px 0' }}>Collector<br/>Salem District</h4>
            <div style={{ fontSize: '11px' }}>
              <p>Date: ________________________</p>
              <p style={{ marginTop: '20px' }}>Signature: ___________________</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .a4-container, .a4-footer { box-shadow: none !important; border: none !important; margin: 0 !important; width: 100% !important; padding: 0 !important; }
        }
        
        .a4-container {
          width: 29.7cm;
          min-height: 21cm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          box-sizing: border-box;
        }

        .a4-footer {
          width: 29.7cm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-top: 2px solid #000;
          padding: 20px;
          box-sizing: border-box;
        }

        .col-1, .col-2, .col-3 {
          padding: 30px;
          display: flex;
          flex-direction: column;
        }

        .col-1 { border-right: 1px solid #ccc; }
        .col-2 { border-right: 1px solid #ccc; }

        .section-title {
          font-size: 13px;
          color: #16A34A;
          margin: 0 0 15px 0;
          font-weight: bold;
        }

        .info-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }
        .info-table td {
          padding: 6px 8px;
          border: 1px solid #ccc;
          vertical-align: top;
        }
        .info-table td:first-child {
          width: 40%;
          background: #f9f9f9;
        }
      `}</style>
    </div>
  );
}
