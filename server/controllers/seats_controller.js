const seatSchema = require('../models/seats_model');
const adminSchema = require('../models/users_model');
const jwt = require('jsonwebtoken');



   //1. To add new seats with basic validation to store valid info in db...
const seatPost = async(req,res)=>{

    try{
        const {seat , price, empty,selected} = req.body;

        const exist = await seatSchema.findOne({seat});


        if(exist){
            return res.status(400).send('seat Name is already Found');
        }


        let newseat = new seatSchema({
            seat , price, empty,selected
        });
        newseat.save();
        return res.status(201).send('New seat Added Successfully');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







//2.seats data to GET/FETCHING...


const seatsList = async(req,res)=>{

    try{
        const seatList = await seatSchema.find();
        return res.status(200).json(seatList);
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







 //3. To Update seats with basic validation to store valid info in db...
 const seatUpdate = async(req,res)=>{

    try{
        const {seat , price, empty,selected} = req.body;

        // const seatExist = await seatSchema.findOne({title});
        
        // if(title===seatExist.title){
        //     return res.status(400).send('seat Name is already Upto Date')
        // }


        let updateseat = await seatSchema.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send('Seat Booking Updated SuccessFully');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}




//4. DELETE seats data from List...


const seatDelete = async(req,res)=>{

    try{
        const seatList = await seatSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send("seat deleted successfully");
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}





module.exports = { seatPost, seatsList, seatUpdate, seatDelete};