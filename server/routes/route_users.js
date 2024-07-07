const {Router} = require('express');
const router = Router();

//AUTHENTICATIOn...
const auth = require('../middleware/auth');

//users controllers...
const userController = require('../controllers/users_controller');






//LOGIN ROUTES...
        // 1.User LOgin.....
router.post('/user/login', userController.userLogin);






//All users USERS Routes...

    //1. NEW userS POSTING...
router.post('/user/registration', userController.userPost);

    //2.userS LIST GET/FETCH...
router.get('/users/list', auth, userController.usersList);

    //2.user GET/FETCH AS PER ID...
router.get('/user/list/:id', auth, userController.userAsPerId);

    //3.userS UPDATE...
router.put('/user/update/:id',auth, userController.userUpdate);


    //4.DELETE userS FROM LIST...
router.delete('/user/delete/:id',auth, userController.userDelete);












module.exports = router;