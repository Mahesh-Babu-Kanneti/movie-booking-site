const {Router} = require('express');
const bookingRouter = Router();

//AUTHENTICATIOn & AUTHORIZATION...
const auth = require('../middleware/auth');
const restrict = require('../middleware/authorize');

//users controllers...
const bookingsController = require('../controllers/bookings_controller');





//All bookingS Routes...

    //1. NEW bookingS POSTING...
bookingRouter.post('/booking/post',auth, bookingsController.bookingPost);

    //2.AVAILABLE bookingS LIST GET/FETCH...
bookingRouter.get('/bookings/list', auth, bookingsController.bookingsList);

    //2.bookingSS UPDATE...
bookingRouter.put('/booking/update/:id',auth,restrict, bookingsController.bookingUpdate);


    //4.DELETE bookingS FROM LIST...
bookingRouter.delete('/booking/delete/:id',auth,restrict, bookingsController.bookingDelete);












module.exports = bookingRouter;