import GISMap from '../../components/Map/GISMap';
import { Card } from '../../components/common/UIComponents';
import { Map } from 'lucide-react';
import { useLiveContextData } from '../../context/LiveContext';

export default function DistrictSituationMap() {
  const { incidents: INCIDENTS } = useLiveContextData();

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><Map size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> District Situation Map</div>
          <div className="page-subtitle">Executive overview of all district operations</div>
        </div>
      </div>
      <Card>
        <div style={{ padding: 0 }}>
          <GISMap
            center={[10.95, 76.95]}
            zoom={11}
            height={600}
            incidents={INCIDENTS}
            showRadius={true}
            radiusKm={3}
          />
        </div>
      </Card>
    </div>
  );
}
