import axios from 'axios';

// Create an Axios instance pointing to the Spring Boot backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create an Axios instance pointing to the new Java AI Service via API Gateway
export const aiApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatically attach the JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Incident Service API Methods
export const IncidentService = {
  // Create a new incident
  createIncident: async (incidentData) => {
    const response = await api.post('/api/v1/incidents', incidentData);
    return response.data;
  },

  // Get all incidents globally (for Collector)
  getAllIncidents: async () => {
    const response = await api.get('/api/v1/incidents');
    return response.data;
  },

  // Get incidents by specific Taluk (for Taluk Dashboard)
  getIncidentsByTaluk: async (talukName) => {
    const response = await api.get(`/api/v1/incidents/taluk/${talukName}`);
    return response.data;
  },

  // Update incident status (e.g., Approve / Escalate)
  updateIncidentStatus: async (id, status, level) => {
    const response = await api.put(`/api/v1/incidents/${id}/status`, { status, level });
    return response.data;
  }
};

export const ReferenceDataService = {
  getDistricts: async () => {
    const response = await api.get('/api/v1/reference/districts');
    return response.data;
  },
  getResources: async () => {
    const response = await api.get('/api/v1/reference/resources');
    return response.data;
  }
};

export const AnalyticsService = {
  getDashboardStats: async () => {
    const response = await api.get('/api/v1/analytics/dashboard');
    return response.data;
  }
};

export const NotificationService = {
  getNotifications: async (userId) => {
    const response = await api.get(`/api/v1/notifications/user/${userId}`);
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.put(`/api/v1/notifications/${id}/read`);
    return response.data;
  }
};

export default api;
