const {Router} = require('express');
const movieRouter = Router();

//AUTHENTICATIOn & AUTHORIZATION...
const auth = require('../middleware/auth');
const restrict = require('../middleware/authorize');

//users controllers...
const moviesController = require('../controllers/movies_controller');





//All MOVIES Routes...

    //1. NEW userS POSTING...
movieRouter.post('/movie/post',auth, restrict, moviesController.moviePost);

    //2.userS LIST GET/FETCH...
movieRouter.get('/movies/list',  moviesController.moviesList);

    //2.userS UPDATE...
movieRouter.put('/movie/update/:id',auth,restrict, moviesController.movieUpdate);


    //4.DELETE userS FROM LIST...
movieRouter.delete('/movie/delete/:id',auth,restrict, moviesController.movieDelete);












module.exports = movieRouter;