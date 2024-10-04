const express = require('express');
const router = express.Router();

app.use(express.json());
app.use('/weather', weatherRouter);

router.get('/', async (req, res) => {
    try {
        const { latitude, longitude } = req.query; // Obtenemos latitud y longitud de la query string
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const APIurl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const response = await fetch(APIurl);
        const weatherData = await response.json();

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error });
    }
});

module.exports = router;