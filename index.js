const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.json());

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

app.use('/login', require('./routes/login'));
app.use('/weather', require('./routes/weather'));

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
    });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    });
