import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/UIComponents';
import { MapPin, Search } from 'lucide-react';
import { useLiveContextData } from '../../context/LiveContext';

export default function DistrictStatus() {
  const { districts: DISTRICTS, incidents: INCIDENTS } = useLiveContextData();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const districtsArray = Object.keys(DISTRICTS || {}).map(k => {
    const dIncidents = INCIDENTS.filter(i => i.district === k && i.status !== 'Draft' && i.status !== 'Resolved');
    return { 
      id: k, 
      name: k, 
      taluks: DISTRICTS[k],
      activeIncidents: dIncidents.length,
      criticalIncidents: dIncidents.filter(i => ['High', 'Severe', 'Extremely Severe'].includes(i.severity)).length
    };
  });

  const filteredDistricts = districtsArray.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="page-title"><MapPin size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Tamil Nadu Districts</div>
          <div className="page-subtitle">Select a district to view Collector and Taluk hierarchy</div>
        </div>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '320px' }}>
          <div style={{ position: 'absolute', left: 16, top: 12, color: '#3A1F75' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search districts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '12px 16px 12px 42px', 
              width: '100%', 
              borderRadius: '8px', 
              border: '1px solid #e5e7eb', 
              background: '#ffffff',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onFocus={(e) => e.target.style.border = '1px solid #5E72EB'}
            onBlur={(e) => e.target.style.border = '1px solid #e5e7eb'}
          />
        </div>
      </div>
      
      {/* Grid Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px',
        padding: '24px 0',
        background: '#f3f4f6',
        borderRadius: '16px',
        marginTop: '20px',
        padding: '24px'
      }}>
        {filteredDistricts.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: '#6b7280', fontSize: '16px' }}>
            No districts found matching "{searchTerm}"
          </div>
        ) : (
          filteredDistricts.map(d => (
            <div 
              key={d.id} 
              style={{ 
                background: '#ffffff', 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #f3f4f6',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => navigate(`/state/monitor/${d.name}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                const title = e.currentTarget.querySelector('h3');
                if (title) title.style.color = '#5E72EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                const title = e.currentTarget.querySelector('h3');
                if (title) title.style.color = '#3A1F75';
              }}
            >
              {/* Top Visual Section */}
              <div style={{ 
                width: '100%', 
                aspectRatio: '4/3', 
                backgroundColor: '#e2e8f0',
                backgroundImage: `url('/images/districts/${encodeURIComponent(d.name.replace(/\s+/g, ''))}.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
              </div>

              {/* Bottom Data Section */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#3A1F75',
                  margin: 0,
                  transition: 'color 0.2s ease'
                }}>
                  {d.name}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Total Taluks:</span>
                    <strong style={{ color: '#111827' }}>{d.taluks?.length || 0}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Active Incidents:</span>
                    <strong style={{ color: d.activeIncidents > 0 ? '#ef4444' : '#111827' }}>
                      {d.activeIncidents}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Critical Alerts:</span>
                    <strong style={{ color: d.criticalIncidents > 0 ? '#dc2626' : '#111827' }}>
                      {d.criticalIncidents}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
