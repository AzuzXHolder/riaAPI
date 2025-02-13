// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const PASTEBIN_URL = 'https://pastebin.com/raw/KryNxeiR';

// Function to fetch latest data from Pastebin
async function fetchSoftwareData() {
    try {
        const response = await axios.get(PASTEBIN_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Main endpoint that returns all data
app.get('/api/software', async (req, res) => {
    const data = await fetchSoftwareData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to fetch software data' });
    }
    res.json(data);
});

// Endpoint for just version
app.get('/api/version', async (req, res) => {
    const data = await fetchSoftwareData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to fetch version data' });
    }
    res.json({ version: data.SoftwareVersion });
});

// Endpoint for changelog
app.get('/api/changelog', async (req, res) => {
    const data = await fetchSoftwareData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to fetch changelog data' });
    }
    res.json({ changelog: data.Changelog });
});

// Endpoint for status
app.get('/api/status', async (req, res) => {
    const data = await fetchSoftwareData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to fetch status data' });
    }
    res.json({ status: data.Status });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
