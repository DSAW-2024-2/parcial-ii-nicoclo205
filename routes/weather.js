const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { latitude, longitude } = req.query; 
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const APIurl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const response = await fetch(APIurl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
});

module.exports = router;