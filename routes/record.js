const express = require('express');
const multer = require('multer');
const path = require('path');
const Video = require('../models/video-model');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('record', { layout: 'layout', title: 'Record Video' });
});

router.post('/', upload.single('video'), async (req, res) => {
    try {
        const { description } = req.body;
        const videoPath = path.join('/uploads', req.file.filename);

        const newVideo = new Video({ description, videoPath });
        await newVideo.save();

        res.redirect('/view');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
