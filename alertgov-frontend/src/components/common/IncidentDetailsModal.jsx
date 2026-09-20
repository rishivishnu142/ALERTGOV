import React, { useState, useEffect } from 'react';
import { IncidentService, WeatherService } from '../../api';
import { X, MapPin, Clock, AlertTriangle, ShieldAlert, Activity, FileText, Brain } from 'lucide-react';

export default function IncidentDetailsModal({ incidentId, onClose }) {
  const [incident, setIncident] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (incidentId) fetchData();
  }, [incidentId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await IncidentService.getIncident(incidentId);
      if (data) setIncident(data);
      
      const pred = await WeatherService.getPrediction(incidentId);
      if (pred) setPrediction(pred);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (!incidentId) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '8px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
          <h2 style={{ margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={24} color="var(--primary)" />
            Incident Details: {incident?.id || incidentId}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Loading Details...</div>
          ) : !incident ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Failed to load incident details.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>INCIDENT TYPE</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{incident.type}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>STATUS</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{incident.status} ({incident.level || 'VEO'})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', gridColumn: 'span 2' }}>
                  <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={14} /> LOCATION
                  </div>
                  <div style={{ fontSize: '16px' }}>{incident.village}, {incident.taluk}, {incident.district}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Coordinates: {incident.latitude}, {incident.longitude}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 style={{ fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Description</h3>
                <p style={{ lineHeight: '1.6' }}>{incident.description}</p>
              </div>

              {/* AI Prediction */}
              {prediction ? (
                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', color: '#0369a1', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Brain size={18} /> AI Analysis
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold' }}>SEVERITY</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: prediction.severity === 'High' ? 'red' : 'orange' }}>{prediction.severity}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold' }}>CONFIDENCE</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{(prediction.confidence * 100).toFixed(0)}%</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold' }}>ADVISORY</div>
                    <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{prediction.advisory}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold' }}>REQUIRED RESOURCES</div>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
                      {prediction.resourcesNeeded && prediction.resourcesNeeded.map(res => (
                        <span key={res} style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{res}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#64748b' }}>
                  No AI prediction available for this incident.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
