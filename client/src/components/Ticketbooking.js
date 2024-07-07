import seatIcon from '../seat.png'
import Header from './Header';
import './components.css';
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import jsPDF from 'jspdf';
import {useNavigate} from 'react-router-dom';






const base_url = "https://movie-booking-site-backend.onrender.com";




function Ticketbooking() {

    const loginNavigate = useNavigate();
    // const [movies, setMovies] = useState([]);


    // useEffect(() => {
    //     fetchedMovies();

    // }, [])


    // const fetchedMovies = async () => {
    //     let response = await axios.get(`${base_url}`+'/movies/list', {
    //         headers: {
    //             method: 'GET',
    //             'Content-Type': 'application/json',
    //             'x-token': localStorage.getItem('token')
    //         }
    //     }).then(
    //         res => setMovies(res.data)
    //     ).catch(error => console.log(error))
    // }







    const [total, setTotal] = useState(0)



    const [row1, setRow1] = useState([
        // { seat: 'A', price: 100, empty: true, selected: false},
        // { seat: 'B', price: 100, empty: false, selected: false},
        // { seat: 'C', price: 100, empty: true, selected: false },
        // { seat: 'D', price: 100, empty: false, selected: false},
        // { seat: 'E', price: 100, empty: true, selected: false},
        // { seat: 'F', price: 100, empty: true, selected: false},
        // { seat: 'G', price: 100, empty: true, selected: false},
        // { seat: 'H', price: 100, empty: false, selected: false},
        // { seat: 'I', price: 100, empty: true, selected: false},
        // { seat: 'J', price: 100, empty: false, selected: false},
        // { seat: 'K', price: 100, empty: true, selected: false},
        // { seat: 'L', price: 100, empty: true, selected: false}
    ])




    useEffect(()=>{

        let fetchedSeats = axios.get(`${base_url}`+'/seats/list',{
            headers:{
                method:'GET',
                'Content-Type':'application/json',
                'x-token':localStorage.getItem('token')
            }
        }).then(
            res=>setRow1(res.data)
        )
    },[])





    const onselectedRow1 = (index) => {
        let tempRow = [];

        tempRow = row1;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true;
                    // console.log('remove')
                }
                else {
                    item.selected = true;
                    item.empty = false;
                    // console.log(item.price, 'price')
                }
            }
        })

        let tempSeats = [];

        tempRow.map(item => {
            tempSeats.push(item)
        })
        setRow1(tempSeats);

    }




    //----Final bookings...

    const [dates, setDates] = useState('')
    const [times, setTimes] = useState('')

    var finalbook = [];


    let filterArray = row1.filter(obj => obj.selected == true)


    if (filterArray) {
        //1.TOTAL PRICE...
        let priceTotal = filterArray.map(li => li.price)
        let totalPrice = priceTotal.reduce((a, b) => a + b, 0)
        // console.log(totalPrice,"hjg")

        //2.SEAT NUMBERS...
        let seatNumber = filterArray.map(li => li.seat)
        // console.log(seatNumber+",","seatNUmber")

        let userID = localStorage.getItem('id');

        finalbook.push({ userId:userID,seatNo: seatNumber + "", totalCost: totalPrice , bookDate: dates, bookTime: times  });
        // console.log({ seatNo: seatNumber + "", totalCost: totalPrice, bookDate: dates, bookTime: times }, "OBJECT")

    }







//CONFIRM BOOKING FINAL SHOW.....

    const confirmBook = () =>{

        let token = localStorage.getItem('token')
        if(token && dates ===""){
            alert("Please Select Date")
        }
        else if(token && times ===""){
            alert("Please Select Time")
        }
        else{
            if(window.confirm("Are you confirm to book selected seats")){
                
                row1.map(lis=>{
                    if(lis.selected ==true){

                         //1.UPDATE THE SEAT AVAILABILITY....USERS

                         let payload = {
                            seat: lis.seat,
                            price: lis.price,
                            empty: false,
                            selected: false
                         }
                       

                         let updateSeat = axios.put(`${base_url}`+'/seat/update/'+`${lis._id}`,payload,{
                            headers:{
                                method:'PUT',
                                'Content-Type':'application/json',
                                'x-token': localStorage.getItem('token')
                            }
                         }).then(
                            res=>console.log(res.data)
                         ).catch(error=>console.log(error.response.data))

                         //---------------------
                        
                        lis.selected = false;
                        lis.empty = false;
                    }
                })

                setRow1(row1);











                    //2. API FOR BOOKING POST CALL....

                    // console.log(finalbook,"finalllllllllllllllllllllllllllllllll")



                    var seatnumber,totalprice,bookedtime,bookeddate;

                    for(let i=0;i<finalbook.length;i++){
                        seatnumber = finalbook[i].seatNo;
                        totalprice = finalbook[i].totalCost;
                        bookedtime = finalbook[i].bookTime;
                        bookeddate = finalbook[i].bookDate;
                    }


                    let body = {
                        userid: localStorage.getItem('id'),
                        seatnumber: seatnumber,
                        accprice:100,
                        totalprice: totalprice,
                        bookedtime:bookedtime,
                        bookeddate:bookeddate,
                        bookstatus:true
                    }

                    //CREATING AND PRINT USERS BOOKING DETAILS TEXT PDF USING JAVASCRIPT...

                    let pdf = new jsPDF('landscape','px','a4','false');

                    pdf.text(280,80,"TICKET PRINT",'center');
                    pdf.text(200,120,"SEAT NUMBER : ")
                    pdf.text(200,140,"TOTAL PRICE : ")
                    pdf.text(200,160,"BOOKED TIME : ")
                    pdf.text(200,180,"BOOKED DATE : ")

                    pdf.text(320,120,JSON.stringify(seatnumber),'left')
                    pdf.text(320,140,JSON.stringify(totalprice),'left')
                    pdf.text(320,160,JSON.stringify(bookedtime),'left')
                    pdf.text(320,180,JSON.stringify(bookeddate),'left')
                    pdf.text(300,250,"NOTE: ALSO CHECK BOOKINGS IN DASHBOARD",'center');
                    pdf.save('ticket.pdf');

                    //-----------------------PRINTING END SECTION--------------


                    let bookSeat = axios.post(`${base_url}`+'/booking/post',body,{
                        headers:{
                            method:'POST',
                            'Content-Type':'application/json',
                            'x-token': localStorage.getItem('token')
                        }
                     }).then(
                        res=>alert(res.data)
                     ).catch(error=>alert(error.response.data))




                    setTimes('');
                    setDates('');

                 }


                 else{
                    return false;
                 }





           }





    }




    return (
        <>
            <Header />
            <div>
                <div style={{width:'auto'}}>  
                    <span style={{borderRadius:'10px',color:'aliceblue',fontSize:'10px',height:'3px',width:'5px',background:'grey',padding:'5px',display:'inline',margin:'8px' ,position:'relative',top:'25px',left:'25px'}}> BOOKED </span>
                    <span style={{borderRadius:'10px',color:'black',fontSize:'10px',height:'3px',width:'5px',background:'aliceblue',padding:'5px',display:'inline',margin:'8px' ,position:'relative',top:'25px',left:'35px'}}> AVAILABLE </span>
                </div>

                <center>
                    <br /><br />

                                        {/* TIME AND DATE SECTION */}

                    <input type='date' onChange={(e) => setDates(e.target.value)} className='date' />

                    <input type='time' onChange={(e) => setTimes(e.target.value)} className='time' />


                    <br /><br /><br />


                                                {/* SEATS SECTION */}

                    <Container className="container-book" style={{ width: '25%' }}>

                        {row1.map((li, index) =>
                            <div key={li._id} style={{ display: 'inline-block' }}>
                                {
                                    li.empty == false && li.selected == true ? <img src={seatIcon}  style={{ margin: '10px', padding: '10px', borderRadius: '5px', height: '50px', width: '50px', backgroundColor: 'green' }} onClick={() => { if (li.selected == false && li.empty == false) { alert('already filled') } else { onselectedRow1(index) } }} /> : li.empty == true && li.selected == false ? (<img src={seatIcon}  style={{ margin: '10px', padding: '10px', borderRadius: '5px', height: '50px', width: '50px', backgroundColor: 'white' }} onClick={() => { if (li.selected == false && li.empty == false) { alert('already filled') } else { onselectedRow1(index) } }} />) : li.empty == false && li.selected == false ? (<img src={seatIcon} style={{ margin: '10px', padding: '10px', borderRadius: '5px', height: '50px', width: '50px', backgroundColor: 'grey' }} onClick={() => { if (li.selected == false && li.empty == false) { alert('already filled') } else { onselectedRow1(index) } }} />) : null
                                }
                            </div>
                        )}

                        <br /><br /><br />



                                           {/* SEATS DISPLAY SECTION WHILE SELECTING */}


                        {finalbook.map((book, index) =>
                            <div key={index}>
                                <span className='confirm-seat'> Seat Numbers : {book.seatNo} </span>
                                <span className='confirm-price'> Price : &nbsp;  {book.totalCost} </span>
                            </div>

                        )}


                    </Container>



                        {/* IF SELECT ATLEAST ONE SEAT ONLY CONFIRM BUTTON VISIBLE LOGIC SECTION */}


                    {filterArray.length !== 0 ?
                        <button className='confirm-book' onClick={confirmBook}> CONFIRM BOOK </button>
                        : null}
                </center>
            </div>
        </>
    );
}




export default Ticketbooking;
