import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

export const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Incident Service API Methods
export const IncidentService = {
  createIncident: async (incidentData) => {
    try {
      const response = await api.post('/api/v1/incidents', incidentData);
      return { success: true, incident: response.data };
    } catch (error) {
      console.error("Error creating incident", error);
      return { success: false, error: error.message };
    }
  },

  getAllIncidents: async () => {
    try {
      const response = await api.get(`/api/v1/incidents?_t=${new Date().getTime()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching incidents", error);
      return [];
    }
  },

  getIncidentsByTaluk: async (talukName) => {
    try {
      const response = await api.get(`/api/v1/incidents/taluk/${talukName}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching taluk incidents", error);
      return [];
    }
  },

  getIncidentImage: async (id) => {
    try {
      const response = await api.get(`/api/v1/incidents/${id}/image`);
      return response.data;
    } catch (error) {
      console.error("Error fetching incident image", error);
      return null;
    }
  },

  updateIncidentStatus: async (id, status, level) => {
    try {
      const response = await api.put(`/api/v1/incidents/${id}/status`, { status, level });
      return { success: true, incident: response.data };
    } catch (error) {
      console.error("Error updating status", error);
      return { success: false, error: error.message };
    }
  }
};

export const ReferenceDataService = {
  getDistricts: async () => {
    try {
      const response = await api.get('/api/v1/reference/districts');
      return response.data;
    } catch (error) {
      console.error("Error fetching districts", error);
      return [];
    }
  },
  getResources: async () => {
    // Keep mock data for resources as requested
    return {
      fireTrucks: [
        { id: 'FT-01', vehicleNo: 'TN-38-F-1011', station: 'Coimbatore Central', status: 'Available' },
        { id: 'FT-02', vehicleNo: 'TN-38-F-1022', station: 'Peelamedu', status: 'Available' },
        { id: 'FT-03', vehicleNo: 'TN-38-F-1033', station: 'Ganapathy', status: 'Available' }
      ],
      policeUnits: [
        { id: 'PU-01', vehicleNo: 'TN-38-P-2011', station: 'RS Puram', status: 'Available' },
        { id: 'PU-02', vehicleNo: 'TN-38-P-2022', station: 'Race Course', status: 'Available' }
      ],
      ambulances: [
        { id: 'AMB-01', vehicleNo: 'TN-38-A-3011', station: 'GH Coimbatore', status: 'Available' }
      ],
      rescueTeams: [
        { id: 'NDRF-01', vehicleNo: 'TN-38-R-4011', station: 'Arakkonam Unit', status: 'Available' }
      ]
    };
  }
};

export const AnalyticsService = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/api/v1/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics", error);
      // Return empty default state if error occurs so it doesn't break the UI completely, but no mock data
      return {
        activeIncidents: 0,
        criticalIncidents: 0,
        totalIncidents: 0,
        resolvedIncidents: 0,
        incidentsByType: [],
        incidentsBySeverity: [],
        incidentsByDay: []
      };
    }
  }
};

export const NotificationService = {
  getNotifications: async (userId) => {
    try {
      const response = await api.get(`/api/v1/notifications/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications", error);
      return [];
    }
  },
  markAsRead: async (id) => {
    try {
      const response = await api.put(`/api/v1/notifications/${id}/read`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error marking notification as read", error);
      return { success: false, error: error.message };
    }
  }
};

export const ApprovalService = {
  getPendingApprovals: async () => {
    try {
      const response = await api.get('/api/v1/approvals/pending');
      return response.data;
    } catch (error) {
      console.error("Error fetching pending approvals", error);
      return [];
    }
  },
  updateApprovalStatus: async (id, status, comments) => {
    try {
      const response = await api.put(`/api/v1/approvals/${id}`, { status, comments });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating approval", error);
      return { success: false, error: error.message };
    }
  },
  createApproval: async (data) => {
    try {
      const response = await api.post('/api/v1/approvals', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error creating approval", error);
      return { success: false, error: error.message };
    }
  }
};

export const WeatherService = {
  getWeatherAdvisory: async () => {
    try {
      const response = await aiApi.get('/ai/weather-advisory');
      return response.data;
    } catch (error) {
      console.error("Error fetching weather advisory", error);
      return null;
    }
  }
};

export default api;
