import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { IncidentService, ReferenceDataService, AnalyticsService, NotificationService } from '../api';

const LiveContext = createContext();

export function LiveProvider({ children }) {
  const [tick, setTick] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [districts, setDistricts] = useState({});
  const [resources, setResources] = useState({ fireTrucks: [], policeUnits: [] });
  const [analytics, setAnalytics] = useState({
    activeIncidents: 0, criticalAlerts: 0, resourcesDeployed: 0, peopleAtRisk: 0,
    dailyTrends: [], districtBreakdown: [], severityBreakdown: [],
    incidentsByType: [], incidentsBySeverity: [], incidentsByDay: [],
    responseTime: [
      { month: 'Jan', avg: 25 }, { month: 'Feb', avg: 22 }, { month: 'Mar', avg: 18 },
      { month: 'Apr', avg: 15 }, { month: 'May', avg: 12 }, { month: 'Jun', avg: 14 }
    ],
    broadcastByMonth: [
      { month: 'Jan', broadcasts: 12 }, { month: 'Feb', broadcasts: 15 }, { month: 'Mar', broadcasts: 8 },
      { month: 'Apr', broadcasts: 24 }, { month: 'May', broadcasts: 32 }, { month: 'Jun', broadcasts: 45 }
    ]
  });
  const [notifications, setNotifications] = useState([]);
  const [weather, setWeather] = useState({ temperature: 28, condition: 'Cloudy', humidity: 78, windSpeed: 14, rainfall: 12 });
  const [approvals, setApprovals] = useState([]);
  
  const { user } = useAuth();

  useEffect(() => {
    // Initial fetch of reference data
    const fetchReferenceData = async () => {
      try {
        const dists = await ReferenceDataService.getDistricts();
        const distObj = {};
        dists.forEach(d => {
            try { distObj[d.name] = JSON.parse(d.taluksJson); } catch (e) { distObj[d.name] = []; }
        });
        setDistricts(distObj);

        const res = await ReferenceDataService.getResources();
        setResources(res);
      } catch (err) {
        console.error("Error fetching reference data:", err);
      }
    };
    fetchReferenceData();
  }, []);

  useEffect(() => {
    // Polling for incidents, analytics, notifications
    const fetchLiveData = async () => {
      try {
        if (!user) return;
        
        // 1. Fetch Incidents
        const data = await IncidentService.getAllIncidents();
        let filtered = data;
        if (user.role === 'district' && user.district) filtered = data.filter(inc => inc.district === user.district);
        if (user.role === 'taluk' && user.taluk) filtered = data.filter(inc => inc.taluk === user.taluk && inc.district === user.district);
        if (user.role === 'village' && user.village) filtered = data.filter(inc => (inc.village === user.village && inc.taluk === user.taluk) || inc.reportedBy === user.id);
        setIncidents(prev => {
          return filtered.map(newInc => {
            const existingInc = prev.find(i => i.id === newInc.id);
            if (existingInc && existingInc.resources) {
              return { ...newInc, resources: existingInc.resources };
            }
            return newInc;
          });
        });
        
        // 2. Fetch Analytics
        if (['state', 'collector', 'district', 'taluk'].includes(user.role)) {
          const stats = await AnalyticsService.getDashboardStats();
          
          // Compute breakdown from filtered incidents for this user's scope
          const typeMap = {};
          const sevMap = {};
          const dayMap = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
          
          filtered.forEach(inc => {
            const cat = inc.category || 'Other';
            typeMap[cat] = (typeMap[cat] || 0) + 1;
            const sev = inc.severity || 'Medium';
            sevMap[sev] = (sevMap[sev] || 0) + 1;
            try {
              const dateStr = inc.reportedAt || inc.date;
              const d = dateStr ? new Date(dateStr) : new Date();
              const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
              if (dayMap[dayName] !== undefined) dayMap[dayName]++;
            } catch(e) {}
          });

          const cMap = { 'Fire': '#f97316', 'Flood': '#0ea5e9', 'Medical': '#ec4899', 'Earthquake': '#8b5cf6', 'Critical': '#ef4444', 'Severe': '#ef4444', 'High': '#f97316', 'Medium': '#eab308', 'Low': '#22c55e' };
          
          setAnalytics(prev => ({
            ...prev,
            activeIncidents: filtered.filter(i => i.status !== 'Resolved').length || stats.activeIncidents || 0,
            criticalAlerts: filtered.filter(i => ['High', 'Severe', 'Extremely Severe', 'Critical'].includes(i.severity)).length || stats.criticalIncidents || 0,
            totalIncidents: filtered.length || stats.totalIncidents || 0,
            resolvedIncidents: filtered.filter(i => i.status === 'Resolved').length || stats.resolvedIncidents || 0,
            incidentsByType: Object.keys(typeMap).map(k => ({ name: k, value: typeMap[k], color: cMap[k] || '#94a3b8' })),
            incidentsBySeverity: Object.keys(sevMap).map(k => ({ name: k, value: sevMap[k], color: cMap[k] || '#94a3b8' })),
            incidentsByDay: Object.keys(dayMap).map(k => ({ day: k, incidents: dayMap[k] }))
          }));
        }
        
        // 3. Fetch Notifications
        const notifs = await NotificationService.getNotifications(user.role);
        setNotifications(notifs);
        
      } catch (err) {
        console.error("Error fetching live data:", err);
      }
    };
    
    fetchLiveData();
    
    // Expose fetch function globally so components can trigger immediate refresh
    window.__triggerLiveRefresh = fetchLiveData;

    const interval = setInterval(() => {
      fetchLiveData();
      setTick(t => t + 1);
    }, 10000); // 10 seconds polling

    return () => clearInterval(interval);
  }, [user]);

  return (
    <LiveContext.Provider value={{ 
        tick, 
        incidents, 
        districts, 
        resources, 
        analytics, 
        notifications, 
        weather, 
        approvals,
        refreshData: () => { if (window.__triggerLiveRefresh) window.__triggerLiveRefresh(); }
    }}>
      {children}
    </LiveContext.Provider>
  );
}

export const useLiveContextData = () => {
  const context = useContext(LiveContext);
  if (!context) throw new Error("useLiveContextData must be used within LiveProvider");
  return context;
};

// Kept for backward compatibility while refactoring
export const useLive = () => {
  const context = useContext(LiveContext);
  return context ? context.tick : 0;
};

export const useIncidents = () => {
  const { incidents } = useLiveContextData();
  return incidents;
};
