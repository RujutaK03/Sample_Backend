const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    moviePoster: {
        filename: { type: String },
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    duration: {
        hours: { type: Number },
        minutes: { type: Number },
    },
    castImages: [{
        name: { type: String },
        filename: { type: String },
    }],
    directorImages: [{
        name: { type: String },
        filename: { type: String },
    }],
    genre: [{
        type: String,
        required: true,
    }],
    language: [{
        type: String,
        required: true,
    }]
});

module.exports = mongoose.model('movies', movieSchema);