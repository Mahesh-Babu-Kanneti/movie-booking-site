const movieSchema = require('../models/movies_model');
const adminSchema = require('../models/users_model');
const jwt = require('jsonwebtoken');



   //1. To add new movies with basic validation to store valid info in db...
const moviePost = async(req,res)=>{

    try{
        const {title , description, director,duration, genre,image,language,releaseDate} = req.body;

        const exist = await movieSchema.findOne({title});


        if(exist){
            return res.status(400).send('Movie Name is already Found');
        }


        let newmovie = new movieSchema({
            title,description, director,duration, genre,image,language,releaseDate
        });
        newmovie.save();
        return res.status(201).send('New movie Added Successfully');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







//2.movies data to GET/FETCHING...


const moviesList = async(req,res)=>{

    try{
        const movieList = await movieSchema.find();
        return res.status(200).json(movieList);
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







 //3. To Update movies with basic validation to store valid info in db...
 const movieUpdate = async(req,res)=>{

    try{
        const {title , description, director,duration, genre,image,language,releaseDate} = req.body;

        const movieExist = await movieSchema.findOne({title});
        
        if(title===movieExist.title){
            return res.status(400).send('Movie Name is already Upto Date')
        }


        let updatemovie = await movieSchema.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send('Movie details updated Successfully');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}




//4. DELETE movies data from List...


const movieDelete = async(req,res)=>{

    try{
        const movieList = await movieSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send("Movie deleted successfully");
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}





module.exports = { moviePost, moviesList, movieUpdate, movieDelete};