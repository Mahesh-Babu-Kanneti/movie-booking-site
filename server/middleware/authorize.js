const userSchema = require('../models/users_model')


//AUTHORIZATION FOR ADMIN ACCESS...
const adminAccess = async (req, res, next) => {

    try {

        const exist = await userSchema.findOne({_id: req.user.id });

        // console.log(exist.role)

        if(exist._id == req.user.id && exist.role === "admin"){
            next();
        }
        else{

            return res.status(403).send('You dont have admin Access. Please contact admin... ');
        }


    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Admin Error...')
    }

}














module.exports = adminAccess;








//2ND TYPE OF METHOD....

// module.exports = function (req, res, next) {

//     try {
//         let adminToken = req.header('role');

//         if (adminToken === "admin") {
//             next();
//         }
//         else {
//             return res.status(403).send('You dont have admin Access. Please contact admin... ');
//         }

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send('Admin Error...')
//     }
// }



