import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { IncidentService, ReferenceDataService, AnalyticsService, NotificationService } from '../api';

const LiveContext = createContext();

export function LiveProvider({ children }) {
  const [tick, setTick] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [districts, setDistricts] = useState({});
  const [resources, setResources] = useState([]);
  const [analytics, setAnalytics] = useState({
    activeIncidents: 0, criticalAlerts: 0, resourcesDeployed: 0, peopleAtRisk: 0,
    dailyTrends: [], districtBreakdown: [], severityBreakdown: []
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
        if (user.role === 'village' && user.village) filtered = data.filter(inc => inc.village === user.village && inc.taluk === user.taluk);
        setIncidents(filtered);
        
        // 2. Fetch Analytics
        if (user.role === 'state' || user.role === 'collector') {
          const stats = await AnalyticsService.getDashboardStats();
          setAnalytics(prev => ({
            ...prev,
            activeIncidents: stats.activeIncidents || 0,
            criticalAlerts: stats.criticalIncidents || 0,
            totalIncidents: stats.totalIncidents || 0,
            resolvedIncidents: stats.resolvedIncidents || 0
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
        approvals 
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
