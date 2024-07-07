const mongoose = require('mongoose');



const users = new mongoose.Schema({
    role:{
        type: String,
        required: true,
        default:"guest",
    },
    fname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})




module.exports = mongoose.model('users', users);