const mongoose = require('mongoose');



const seats = new mongoose.Schema({
    seat:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    empty: {
        type: Boolean,
        required: true,
        default: true,
    },
    selected: {
        type: Boolean,
        required: true,
        default:false,
    }
})




module.exports = mongoose.model('seats', seats);