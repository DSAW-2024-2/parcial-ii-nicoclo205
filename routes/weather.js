const express = require('express');
const router = express.Router();
const weatherRouter = require('./routes/weather');

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

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.status(500).json({message: error.message}));
});

module.exports = router;