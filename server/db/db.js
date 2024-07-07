const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    ()=>{
        console.log('DB Connected...')
}
).catch((error)=>console.log(error))