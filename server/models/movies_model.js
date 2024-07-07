const mongoose = require('mongoose');



const movies = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    }
})




module.exports = mongoose.model('movies', movies);