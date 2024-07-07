const userSchema = require('../models/users_model');
const jwt = require('jsonwebtoken');



//1. To add new users with basic validation to store valid info in db...
const userPost = async (req, res) => {

    try {
        const { fname, username, email, mobile, password } = req.body;

        const exist = await userSchema.findOne({ email });
        //---(OR)--- we can as unique one to check ("either mobile/email...")
        const existMobile = await userSchema.findOne({ mobile });

        if (exist) {
            return res.status(400).send('user is already Found with Email Id')
        }
        else if (existMobile) {
            return res.status(400).send('Mobile Number is already Used');
        }
        else if (email.slice(-10) !== '@gmail.com') {
            return res.status(400).send('Validation Error. Please Enter valid Email');
        }
        //IND COUNTRY MOBILE NUMBERS STARTS WITH (9,8,7)...
        else if (mobile.charAt(0) !== '9' && mobile.charAt(0) !== '8' && mobile.charAt(0) !== '7') {
            return res.status(400).send('Validation Error. Please Enter valid Mobile No IND-STD (starts with 9/8/7)');
        }
        // let role='guest';

        let newuser = new userSchema({
            fname, username, email, mobile, password
        });
        newuser.save();
        return res.status(201).send('User Registered Successfully. Please login...');

    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}






//1. To add new users with basic validation to store valid info in db...
const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        const exist = await userSchema.findOne({ email });


        if (!exist) {
            return res.status(400).send('User Not Exist. Please Register its free')
        }
        else if (exist.password !== password) {
            return res.status(400).send('Password is Incorrect');
        }


        let payload = {
            user: {
                id: exist.id
            }
        }

        jwt.sign(payload,'myPassword', { expiresIn: 360000000 },
            (err, token) => {
                if (err) throw err;
                return res.status(200).json({ token, role:exist.role, msg:'Login Success' });
            })






    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}





//2.users data to GET/FETCHING...


const usersList = async (req, res) => {

    try {
        const userList = await userSchema.find();
        return res.status(200).json(userList);
    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}



//---------------------FETCH USER AS PER ID USER.......


const userAsPerId = async (req, res) => {

    try {
        const userListId = await userSchema.findOne({_id:req.params.id});
        return res.status(200).json([userListId]);
    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}







//3. To Update users with basic validation to store valid info in db...
const userUpdate = async (req, res) => {

    try {
        const { fname, username, email, mobile, password } = req.body;


        if (mobile.length !== 10) {
            return res.status(400).send('Please Enter valid Mobile number')
        }
        else if (email.slice(-10) !== '@gmail.com') {
            return res.status(400).send('Validation Error. Please Enter valid Email');
        }
        //IND COUNTRY MOBILE NUMBERS STARTS WITH (9,8,7)...
        else if (mobile.charAt(0) !== '9' && mobile.charAt(0) !== '8' && mobile.charAt(0) !== '7') {
            return res.status(400).send('Validation Error. Please Enter valid Mobile No IND-STD (starts with 9/8/7)');
        }


        let updateUser = await userSchema.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send('User updated Successfully');

    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}




//4. DELETE users data from List...


const userDelete = async (req, res) => {

    try {
        const userList = await userSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send("user deleted successfully");
    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}





module.exports = { userPost, usersList, userAsPerId, userUpdate, userDelete, userLogin };