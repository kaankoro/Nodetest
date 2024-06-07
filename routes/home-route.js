const express = require('express');
const router = express.Router();

// Define a route handler for GET requests to the root URL ('/home')
router.get('/', (req, res) => {
    // Render the 'home' template using the main layout
    res.render('home', { layout: 'layout', title: 'Home Page' });
});

module.exports = router;
