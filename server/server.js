const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const router = require('./routes/route_users');

//ROUTES...
const movieRouter = require('./routes/route_movies');

const seatRouter = require('./routes/route_seats');

const bookingRouter = require('./routes/route_bookings');

//DB config...
const db = require('./db/db');


//middlewares...
app.use(express.json());
app.use(cors());
app.use(router);

app.use(movieRouter);

app.use(seatRouter);

app.use(bookingRouter);





app.listen(process.env.PORT ,()=>{
    console.log('Server is Running...')
})