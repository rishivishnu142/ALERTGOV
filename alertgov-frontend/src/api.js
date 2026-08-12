import axios from 'axios';

// Mock Data Store
const mockData = {
  incidents: [],
  notifications: [],
  analytics: {
    activeIncidents: 0,
    criticalIncidents: 0,
    totalIncidents: 0,
    resolvedIncidents: 0,
    incidentsByType: [
      { name: 'Fire', value: 0, color: '#f97316' },
      { name: 'Flood', value: 0, color: '#0ea5e9' },
      { name: 'Medical', value: 0, color: '#ec4899' }
    ],
    incidentsBySeverity: [
      { name: 'Critical', value: 0, color: '#ef4444' },
      { name: 'High', value: 0, color: '#f97316' },
      { name: 'Medium', value: 0, color: '#eab308' }
    ],
    incidentsByDay: [
      { day: 'Mon', incidents: 0 },
      { day: 'Tue', incidents: 0 },
      { day: 'Wed', incidents: 0 },
      { day: 'Thu', incidents: 0 },
      { day: 'Fri', incidents: 0 },
      { day: 'Sat', incidents: 0 },
      { day: 'Sun', incidents: 0 }
    ]
  },
  districts: [
    { name: 'Ariyalur', taluksJson: '["Ariyalur", "Sendurai", "Udayarpalayam"]' },
    { name: 'Chengalpattu', taluksJson: '["Chengalpattu", "Cheyyur", "Madurantakam", "Pallavaram", "Tambaram", "Tiruporur", "Vandalur"]' },
    { name: 'Chennai', taluksJson: '["Alandur", "Ambattur", "Aminjikarai", "Ayanavaram", "Egmore", "Guindy", "Madhavaram", "Madhuravoyal", "Mambalam", "Mylapore", "Perambur", "Purasawalkam", "Sholinganallur", "Tondiarpet", "Velachery", "Tiruvottiyur"]' },
    { name: 'Coimbatore', taluksJson: '["Anaimalai", "Annur", "Coimbatore North", "Coimbatore South", "Kinathukadavu", "Madukkarai", "Mettupalayam", "Perur", "Pollachi", "Sulur", "Valparai"]' },
    { name: 'Cuddalore', taluksJson: '["Bhuvanagiri", "Chidambaram", "Cuddalore", "Kattumannarkoil", "Kurinjipadi", "Panruti", "Srimushnam", "Tittakudi", "Veppur", "Vriddhachalam"]' },
    { name: 'Dharmapuri', taluksJson: '["Dharmapuri", "Harur", "Karimangalam", "Nallampalli", "Palacode", "Pappireddipatti", "Pennagaram"]' },
    { name: 'Dindigul', taluksJson: '["Atthur", "Dindigul", "Gujiliyamparai", "Kodaikanal", "Natham", "Nilakottai", "Oddanchatram", "Palani", "Vedasandur"]' },
    { name: 'Erode', taluksJson: '["Anthiyur", "Bhavani", "Erode", "Gobichettipalayam", "Kodumudi", "Modakkurichi", "Nambiyur", "Perundurai", "Sathyamangalam", "Thalavadi"]' },
    { name: 'Kallakurichi', taluksJson: '["Chinnasalem", "Kallakurichi", "Kalvarayan Hills", "Sankarapuram", "Tirukkoyilur", "Ulundurpet"]' },
    { name: 'Kanchipuram', taluksJson: '["Kanchipuram", "Kundrathur", "Sriperumbudur", "Uthiramerur", "Walajabad"]' },
    { name: 'Kanyakumari', taluksJson: '["Agastheeswaram", "Kalkulam", "Killiyur", "Thiruvattar", "Thovalai", "Vilavancode"]' },
    { name: 'Karur', taluksJson: '["Aravakurichi", "Kadavur", "Karur", "Krishnarayapuram", "Kulithalai", "Manmangalam", "Pugalur"]' },
    { name: 'Krishnagiri', taluksJson: '["Anchetty", "Bargur", "Denkanikottai", "Hosur", "Krishnagiri", "Pochampalli", "Shoolagiri", "Uthangarai"]' },
    { name: 'Madurai', taluksJson: '["Kalligudi", "Madurai East", "Madurai North", "Madurai South", "Madurai West", "Melur", "Peraiyur", "Thirumangalam", "Thiruparankundram", "Usilampatti", "Vadipatti"]' },
    { name: 'Mayiladuthurai', taluksJson: '["Kuthalam", "Mayiladuthurai", "Sirkazhi", "Tharangambadi"]' },
    { name: 'Nagapattinam', taluksJson: '["Kilvelur", "Nagapattinam", "Thirukuvalai", "Vedaranyam"]' },
    { name: 'Namakkal', taluksJson: '["Kolli Hills", "Kumarapalayam", "Mohanur", "Namakkal", "Paramathi Velur", "Rasipuram", "Senthamangalam", "Tiruchengode"]' },
    { name: 'Nilgiris', taluksJson: '["Coonoor", "Gudalur", "Kotagiri", "Kundah", "Pandalur", "Udhagamandalam"]' },
    { name: 'Perambalur', taluksJson: '["Alathur", "Kunnam", "Perambalur", "Veppanthattai"]' },
    { name: 'Pudukkottai', taluksJson: '["Alangudi", "Aranthangi", "Avadaiyarkoil", "Gandarvakottai", "Iluppur", "Karambakkudi", "Kulathur", "Manamelkudi", "Ponnamaravathi", "Pudukkottai", "Thirumayam", "Viralimalai"]' },
    { name: 'Ramanathapuram', taluksJson: '["Kadaladi", "Kamuthi", "Kezhakarai", "Mudukulathur", "Paramakudi", "Rajasingamangalam", "Ramanathapuram", "Rameswaram", "Tiruvadanai"]' },
    { name: 'Ranipet', taluksJson: '["Arakkonam", "Arcot", "Kalavai", "Nemili", "Sholingur", "Walajah"]' },
    { name: 'Salem', taluksJson: '["Attur", "Edappadi", "Gangavalli", "Kadaiyampatti", "Mettur", "Omalur", "Pethanaickenpalayam", "Salem", "Salem South", "Salem West", "Sankari", "Vazhapadi", "Yercaud"]' },
    { name: 'Sivaganga', taluksJson: '["Devakottai", "Ilayangudi", "Kalaiyarkoil", "Karaikudi", "Manamadurai", "Singampunari", "Sivaganga", "Thirupuvanam", "Tirupathur"]' },
    { name: 'Tenkasi', taluksJson: '["Alangulam", "Kadayanallur", "Sankarankovil", "Shenkottai", "Sivagiri", "Tenkasi", "Thiruvengadam", "V.K.Pudur"]' },
    { name: 'Thanjavur', taluksJson: '["Boothalur", "Kumbakonam", "Orathanadu", "Papanasam", "Pattukkottai", "Peravurani", "Thanjavur", "Thiruvaiyaru", "Thiruvidaimarudur"]' },
    { name: 'Theni', taluksJson: '["Andipatti", "Bodinayakanur", "Periyakulam", "Theni", "Uthamapalayam"]' },
    { name: 'Thoothukudi', taluksJson: '["Eral", "Ettayapuram", "Kayathar", "Kovilpatti", "Ottapidaram", "Sathankulam", "Srivaikundam", "Thoothukudi", "Tiruchendur", "Vilathikulam"]' },
    { name: 'Tiruchirappalli', taluksJson: '["Lalgudi", "Manachanallur", "Manapparai", "Marungapuri", "Musiri", "Srirangam", "Thottiyam", "Thuraiyur", "Tiruchirappalli East", "Tiruchirappalli West", "Tiruverumbur"]' },
    { name: 'Tirunelveli', taluksJson: '["Ambasamudram", "Cheranmahadevi", "Manur", "Nanguneri", "Palayamkottai", "Radhapuram", "Tirunelveli", "Thisayanvilai"]' },
    { name: 'Tirupathur', taluksJson: '["Ambur", "Natrampalli", "Tirupathur", "Vaniyambadi"]' },
    { name: 'Tiruppur', taluksJson: '["Avinashi", "Dharapuram", "Kangeyam", "Madathukulam", "Palladam", "Tiruppur North", "Tiruppur South", "Udumalaipettai", "Uthukuli"]' },
    { name: 'Tiruvallur', taluksJson: '["Avadi", "Gummidipoondi", "Pallipattu", "Ponneri", "Poonamallee", "R.K. Pet", "Tiruvallur", "Tiruttani", "Uthukkottai"]' },
    { name: 'Tiruvannamalai', taluksJson: '["Arni", "Chengam", "Chetpet", "Cheyyar", "Jamunamarathur", "Kalasapakkam", "Kilpennathur", "Polur", "Thandarampattu", "Tiruvannamalai", "Vandavasi", "Vembakkam"]' },
    { name: 'Tiruvarur', taluksJson: '["Kodavasal", "Koothanallur", "Mannargudi", "Nannilam", "Needamangalam", "Thiruthuraipoondi", "Tiruvarur", "Valangaiman"]' },
    { name: 'Vellore', taluksJson: '["Anaicut", "Gudiyatham", "Katpadi", "K.V.Kuppam", "Pernambut", "Vellore"]' },
    { name: 'Viluppuram', taluksJson: '["Gingee", "Kandachipuram", "Marakkanam", "Melmalaiyanur", "Thiruvennainallur", "Tindivanam", "Vanur", "Vikkiravandi", "Viluppuram"]' },
    { name: 'Virudhunagar', taluksJson: '["Aruppukkottai", "Kariapatti", "Rajapalayam", "Sathur", "Sivakasi", "Srivilliputhur", "Tiruchuli", "Vembakottai", "Virudhunagar", "Watrap"]' }
  ],
  resources: {
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
  }
};

// Create an Axios instance (for completeness, though not used in mock)
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
  getDistricts: async () => mockData.districts,
  getResources: async () => mockData.resources
};

export const AnalyticsService = {
  getDashboardStats: async () => mockData.analytics
};

export const NotificationService = {
  getNotifications: async (userId) => {
    // For this mock, returning all role-based notifications
    return mockData.notifications.filter(n => n.userId === userId || n.userId === 'taluk');
  },
  markAsRead: async (id) => {
    const notif = mockData.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
    return { success: true };
  }
};

export default api;
