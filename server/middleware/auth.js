const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){

    try{
        let token = req.header('x-token');

        if(!token){
            return res.status(401).send('Token Not Found');
        }

        let decoded = jwt.verify(token, 'myPassword');
        req.user = decoded.user;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Authentication Error...')
    }
}






// const restricted = (role) =>{
//     return (req,res,next)=>{
//         if(req.user.role !== role)  return res.status(403).send('Forbidden Error...')
//         next();

//     }
// }

// module.exports = restricted;