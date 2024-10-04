const express = require('express');
const router = express.Router();
const weatherRouter = require('./routes/weather');

app.use(express.json());
app.use('/weather', weatherRouter);