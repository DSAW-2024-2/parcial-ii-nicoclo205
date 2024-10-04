const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
require('dotenv').config();

const loginRouter = require('./routes/login');
const weatherRouter = require('./routes/weather');

app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); 

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
        return res.sendStatus(500); 
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
}

app.use('/login', loginRouter);
app.use('/weather', authenticateToken, weatherRouter); 

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});