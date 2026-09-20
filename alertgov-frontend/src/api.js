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

export const AuthService = {
  register: async (userData) => {
    try {
      const response = await api.post('/api/v1/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error registering user", error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

export const UserService = {
  getProfile: async (username) => {
    try {
      const response = await api.get(`/api/v1/users/profile/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile", error);
      return null;
    }
  },
  updateProfile: async (profileData) => {
    try {
      const response = await api.post('/api/v1/users/profile', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating profile", error);
      return { success: false, error: error.message };
    }
  }
};

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

  getIncident: async (id) => {
    try {
      const response = await api.get(`/api/v1/incidents/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching incident", error);
      return null;
    }
  },

  getIncidentStats: async () => {
    try {
      const response = await api.get('/api/v1/incidents/stats');
      return response.data;
    } catch (error) {
      console.error("Error fetching stats", error);
      return null;
    }
  },

  clearAllIncidents: async () => {
    try {
      const response = await api.delete('/api/v1/incidents/clear-all');
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error clearing incidents", error);
      return { success: false, error: error.message };
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
    try {
      const response = await api.get('/api/v1/reference/resources');
      return response.data;
    } catch (error) {
      console.error("Error fetching resources", error);
      return {
        fireTrucks: [],
        policeUnits: [],
        ambulances: [],
        rescueTeams: []
      };
    }
  },
  addResource: async (resourceData) => {
    try {
      const response = await api.post('/api/v1/reference/resources', resourceData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error adding resource", error);
      return { success: false, error: error.message };
    }
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
  },
  takeSnapshot: async () => {
    try {
      const response = await api.post('/api/v1/analytics/snapshot');
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error taking snapshot", error);
      return { success: false, error: error.message };
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
  },
  sendNotification: async (notificationData) => {
    try {
      const response = await api.post('/api/v1/notifications', notificationData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error sending notification", error);
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
  },
  getCollectorApprovals: async (collectorId) => {
    try {
      const response = await api.get(`/api/v1/approvals/collector/${collectorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching collector approvals", error);
      return [];
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
  },
  getPrediction: async (incidentId) => {
    try {
      const response = await api.get(`/api/v1/ai/prediction/${incidentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching AI prediction", error);
      return null;
    }
  }
};

export const AlertService = {
  broadcastAlert: async (alertData) => {
    try {
      const response = await api.post('/api/v1/alerts', alertData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error broadcasting alert", error);
      return { success: false, error: error.message };
    }
  }
};

export default api;
