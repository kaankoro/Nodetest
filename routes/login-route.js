const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

// Define a route handler for GET requests to the login page
router.get('/', (req, res) => {
    // Render the 'login' template using the main layout
    res.render('login', { layout: 'layout', title: 'Login' });
});

// Handle POST requests to the login page
router.post('/', async (req, res) => {
    const { email, psw } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(psw, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
