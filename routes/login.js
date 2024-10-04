const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


const credentials = {
    email: 'admin@admin.com',
    password: 'admin'
}

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (email === credentials.email && password === credentials.password) {
        const user = { email: email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

    res.json({ accessToken: accessToken });
    
    }else{
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = router;