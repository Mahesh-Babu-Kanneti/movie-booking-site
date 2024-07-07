const bookingSchema = require('../models/bookings_model');
const adminSchema = require('../models/users_model');
const jwt = require('jsonwebtoken');



   //1. To add new bookings with basic validation to store valid info in db...
const bookingPost = async(req,res)=>{

    try{
        const {userid , seatnumber, accprice,totalprice,bookedtime,bookeddate, bookstatus} = req.body;


        let newbooking = new bookingSchema({
            userid , seatnumber, accprice,totalprice,bookedtime,bookeddate, bookstatus
        });
        newbooking.save();
        return res.status(201).send('You have booked Successfully. Please check your dashboard');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







//2.bookings data to GET/FETCHING...


const bookingsList = async(req,res)=>{

    try{
        const bookingList = await bookingSchema.find();
        return res.status(200).json(bookingList);
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







 //3. To Update bookings with basic validation to store valid info in db...
 const bookingUpdate = async(req,res)=>{

    try{
        const {userid , seatnumber, accprice,totalprice,bookedtime,bookeddate, bookstatus} = req.body;


        let updatebooking = await bookingSchema.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send('Your booking done SuccessFully. please check your dashboard');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}




//4. DELETE bookings data from List...


const bookingDelete = async(req,res)=>{

    try{
        const bookingList = await bookingSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send("booking deleted successfully");
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}





module.exports = { bookingPost, bookingsList, bookingUpdate, bookingDelete};