import { useState, useEffect } from 'react';
import { ReferenceDataService } from '../../api';

export default function ResourceManagement() {
  const [resources, setResources] = useState({ fireTrucks: [], policeUnits: [], ambulances: [], rescueTeams: [] });
  const [loading, setLoading] = useState(true);
  const [newResource, setNewResource] = useState({ type: 'fireTrucks', id: '', vehicleNo: '', station: '', status: 'Available' });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const data = await ReferenceDataService.getResources();
    if (data) setResources(data);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await ReferenceDataService.addResource(newResource);
    if (res.success) {
      alert("Resource added successfully!");
      fetchResources();
      setNewResource({ type: 'fireTrucks', id: '', vehicleNo: '', station: '', status: 'Available' });
    } else {
      alert("Error adding resource: " + res.error);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading resources...</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Resource Management</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Add Form */}
        <div className="card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Add New Resource</h2>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
              <select 
                value={newResource.type} 
                onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="fireTrucks">Fire Truck</option>
                <option value="policeUnits">Police Unit</option>
                <option value="ambulances">Ambulance</option>
                <option value="rescueTeams">Rescue Team</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>ID</label>
              <input type="text" value={newResource.id} onChange={(e) => setNewResource({...newResource, id: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Vehicle No</label>
              <input type="text" value={newResource.vehicleNo} onChange={(e) => setNewResource({...newResource, vehicleNo: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Station</label>
              <input type="text" value={newResource.station} onChange={(e) => setNewResource({...newResource, station: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <button type="submit" style={{ padding: '10px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Resource</button>
          </form>
        </div>

        {/* View Resources */}
        <div className="card" style={{ padding: '20px', overflowY: 'auto', maxHeight: '600px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Current Resources</h2>
          
          {Object.entries(resources).map(([type, list]) => (
            <div key={type} style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize', color: 'var(--primary)', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>{type}</h3>
              {(!list || list.length === 0) ? <p>No {type} found.</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>ID</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Vehicle No</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Station</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map(r => (
                      <tr key={r.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{r.id}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{r.vehicleNo}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{r.station}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '12px', background: r.status === 'Available' ? '#e6ffe6' : '#fff0e6', color: r.status === 'Available' ? 'green' : 'orange' }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
