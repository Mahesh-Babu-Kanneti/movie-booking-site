const mongoose = require('mongoose');



const bookings = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
    },
    seatnumber: {
        type: String,
        required: true,
    },
    accprice: {
        type: Number,
        required: true,
    },
    totalprice: {
        type: Number,
        required: true,
    },
    bookedtime: {
        type: String,
        required: true,
    },
    bookeddate: {
        type: String,
        required: true,
    },
    bookstatus: {
        type: Boolean,
        required:true,
        default:false,
    }

})




module.exports = mongoose.model('bookings', bookings);