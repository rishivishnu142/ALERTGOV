const axios = require('axios');

async function clearIncidents() {
    try {
        console.log("Sending request to clear all incidents...");
        // API Gateway port is 8081
        const response = await axios.delete('http://localhost:8081/api/v1/incidents/clear-all');
        console.log(`Success! Status code: ${response.status}`);
    } catch (err) {
        console.error("Failed to clear incidents:", err.message);
        if (err.response) {
            console.error(err.response.data);
        }
    }
}

clearIncidents();
