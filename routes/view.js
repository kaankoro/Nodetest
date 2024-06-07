const express = require('express');
const Video = require('../models/video-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().lean();
        res.render('view', { layout: 'layout', title: 'View Videos', videos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
