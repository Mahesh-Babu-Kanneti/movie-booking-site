const {Router} = require('express');
const seatRouter = Router();

//AUTHENTICATIOn & AUTHORIZATION...
const auth = require('../middleware/auth');
const restrict = require('../middleware/authorize');

//users controllers...
const seatsController = require('../controllers/seats_controller');





//All seatS Routes...

    //1. NEW SEATS POSTING...
seatRouter.post('/seat/post',auth, seatsController.seatPost);

    //2.AVAILABLE SEATS LIST GET/FETCH...
seatRouter.get('/seats/list', auth, seatsController.seatsList);

    //2.SEATSS UPDATE...
seatRouter.put('/seat/update/:id',auth, seatsController.seatUpdate);


    //4.DELETE SEATS FROM LIST...
seatRouter.delete('/seat/delete/:id',auth,restrict, seatsController.seatDelete);












module.exports = seatRouter;