const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

// Define a route handler for GET requests to the root URL ('/home')
router.get('/', (req, res) => {
    // Render the 'home' template using the main layout
    res.render('sign-up', { layout: 'layout', title: 'Sign Up' });
});

router.post('/', async (req, res) => {
    const { email, psw, 'psw-repeat': pswRepeat } = req.body;
    console.log(req.body)
  
    if (psw !== pswRepeat) {
      return res.status(400).send('Passwords do not match');
    }
  
    try {
      const hashedPassword = await bcrypt.hash(psw, 10);
  
      const newUser = new User({
        email: email,
        password: hashedPassword
      });
  
      await newUser.save();
      res.redirect('/home');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;