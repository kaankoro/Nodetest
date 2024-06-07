const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    description: String,
    videoPath: String,
    createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
