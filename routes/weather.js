const express = require('express');
const router = express.Router();
const weatherRouter = require('./routes/weather');
const APIurl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

app.use(express.json());
app.use('/weather', weatherRouter);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/', authenticateToken, (req, res) => {
    const {latitude, longitude} = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({message: 'latitude and longitude are required'});
    }

    fetch(APIurl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      return response.json();
    })
    .then(data => {
      res.json({ temperature: data.current.temperature_2m });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching weather data' });
    });
});

module.exports = router;