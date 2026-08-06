import GISMap from '../../components/Map/GISMap';
import { Card } from '../../components/common/UIComponents';
import { Map } from 'lucide-react';

export default function StateMap() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><Map size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> State Heatmap</div>
          <div className="page-subtitle">Cross-district risk and active disaster visualization</div>
        </div>
      </div>
      <Card>
        <div style={{ padding: 0 }}>
          <GISMap
            center={[11.1271, 78.6569]} // Center of TN
            zoom={7}
            height={600}
            incidents={[]} // In real app, load state level heatmap data
          />
        </div>
      </Card>
    </div>
  );
}
