import { DISTRICTS, RESOURCES } from '../src/data/mockData.js';
import axios from 'axios';

const API_BASE = 'http://localhost:8081/api/v1/reference';

async function seedData() {
    console.log("Starting data seed process...");

    try {
        // Seed Districts
        const districtsList = Object.keys(DISTRICTS).map(dName => ({
            name: dName,
            taluksJson: JSON.stringify(DISTRICTS[dName])
        }));
        
        console.log(`Seeding ${districtsList.length} districts...`);
        await axios.post(`${API_BASE}/districts`, districtsList);
        console.log("Districts seeded successfully.");

        // Seed Resources
        const resourcesList = RESOURCES.map(res => ({
            id: res.id,
            name: res.name,
            type: res.type,
            location: res.taluk,
            status: res.available > 0 ? 'Available' : 'Deployed',
            assignedTo: res.assignedTo || null
        }));
        
        console.log(`Seeding ${resourcesList.length} resources...`);
        await axios.post(`${API_BASE}/resources`, resourcesList);
        console.log("Resources seeded successfully.");

        console.log("Data seeding complete!");
    } catch (err) {
        console.error("Error during seeding:", err.response ? err.response.data : err.message);
    }
}

seedData();
