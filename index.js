const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.json());
app.use('/login', require('./routes/login'));
app.use('/weather', require('./routes/weather'));

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
    });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    });
