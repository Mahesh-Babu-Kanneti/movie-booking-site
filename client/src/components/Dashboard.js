import '../App.css';
import './components.css';
import jwt from 'jwt-decode';
import {useState, useEffect} from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Table from 'react-bootstrap/Table';
import Button1 from 'react-bootstrap/Button';

//Icons...
import { FaArrowRight } from "react-icons/fa";
import avatar from '../avatar.png';
import adminAvatar from './Admin/admin-avatar.png';





const pages = ['Home', 'Movies', 'Contact'];

const base_url = 'http://localhost:8081';


function Dashboard() {
    const logout = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    const [user, setUser] = React.useState([]);


    React.useEffect(() => {
        let token = localStorage.getItem('token');

        // if (!token) {
        //     logout('/user/login')
        // }



        //GET DECODED ID OF USER....

        let userToken = localStorage.getItem('token');

        let decodedId = jwt(userToken);
        localStorage.setItem('id',decodedId.user.id);

        let userId = localStorage.getItem('id');



        //GET LIST OF USERS...

        const fetchedUser = async () => {
            let response = await axios.get(`${base_url}`+`/user/list/`+`${userId}`, {
                headers: {
                    method: 'GET',
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('token')
                }
            }).then(
                res =>setUser(res.data)
            ).catch(error => alert(error.response.data))
        }





        fetchedUser();
    }, [])




                //LOGOUT USER...

        let logoutUsers = useNavigate();

    const logoutUser = () => {
        
        if(localStorage.getItem('token')){
            let removeToken = localStorage.removeItem('token');
            let removeUserid = localStorage.removeItem('id');
            let removeRole = localStorage.removeItem('role');
            // return logoutUsers('/user/login')
            alert("Logout success")
            return  logoutUsers('/')
        }

    }









    const [userUpdatefname,setUserupdatefname] = useState('');
    const [userUpdateusername,setUserupdateusername] = useState('');
    const [userUpdateemail,setUserupdateemail] = useState('');
    const [userUpdatemobile,setUserupdatemobile] = useState('');
    const [userUpdatepassword,setUserupdatepassword] = useState('');







    const updateHandler = async (e,id) => {
        e.preventDefault();


        let body = {
            fname: userUpdatefname || user[0].fname,
            username: userUpdateusername || user[0].username,
            email: userUpdateemail || user[0].email,
            mobile:userUpdatemobile || user[0].mobile,
            password: userUpdatepassword || user[0].password
        }


        //UPDATE REGISTERED DETAILS FOR USERS...                  

        let response = await axios.put(`${base_url}`+`/user/update/`+`${id}`,body, {
            headers: {
                method: 'PUT',
                'x-token':localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(
            res => alert(res.data)
        ).catch(error => alert(error.response.data))



    }




    //DELETE API CALL FOR REMOVE USERS PROFILE PERMANtLY...

// const deleteUser = async(e,id)=>{

//     if(window.confirm('Do you want to delete your account permanently?')){
//         let response = await axios.delete(`${base_url}`+`/user/delete/`+`${id}`, {
//             headers: {
//                 method: 'DELETE',
//                 'x-token':localStorage.getItem('token'),
//                 'Content-Type': 'application/json'
//             }
//         }).then(
//             res => alert(res.data)
//         ).catch(error => alert(error.response.data))


//         logoutUser();

//     }

//     return false;

   

// }                

      



 

 const dashboard = useNavigate();
 const dashboard1 = useNavigate();

 const membersDashboard = () =>{

    if(localStorage.getItem('role') === "admin"){
        return dashboard1('/admin/dashboard');
    }
    else{
        return dashboard('/user/dashboard')
    }
       



 }

 const userHome = useNavigate();
 const userMovies = useNavigate();
 const userContact = useNavigate();






 //USERS BOOKINGS......

 const [userBookings,setUserbookings] = useState([]);

    useEffect(()=>{

        let userBooks = axios.get(`${base_url}`+`/bookings/list`,{
            headers:{
                method:'GET',
                'Content-Type':'application/json',
                'x-token':localStorage.getItem('token')
            }
        }).then(res=>setUserbookings(res.data)).catch(error=>console.log(error.response.data))


    },[])




    var userID = localStorage.getItem('id');




    return (
        <>
            <AppBar position="static" sx={{ bgcolor: 'black', boxShadow: '-0.5px 0.5px 2px grey' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {/* T-Booking */}
                            <img src={"../logo.png"} style={{ height: "50px", width: "120px" }} alt='#' />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                    <MenuItem onClick={handleCloseNavMenu} id='home-button'>
                                        <Typography textAlign="center" onClick={()=>userHome('/')}> HOME </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={()=>userMovies('/user/movies')}> MOVIES </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu} id='contact-button'>
                                        <Typography textAlign="center" onClick={()=>userContact('/')}> CONTACT </Typography>
                                    </MenuItem>
                                
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {/* T-Booking */}
                            <img src={"../logo.png"} style={{ height: "50px", width: "120px" }} alt="#" />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* {pages.map((page) => ( */}
                                <Button
                                    id='home-button'
                                    onClick={()=>userHome('/')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    HOME
                                </Button>
                                <Button
                                    onClick={()=>userMovies('/user/movies')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    MOVIES
                                </Button>
                                <Button
                                    onClick={()=>userContact('/')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    id='contact-button'
                                >
                                    CONTACT
                                </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={localStorage.getItem('role')==='guest'?avatar : adminAvatar} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={logout}> Profile </Typography>
                                </MenuItem> */}
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={membersDashboard}> Dashboard </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={logoutUser}> Logout </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>




            {/*-------- MY DASHBOARD ---------- */}

            <div style={{ width: 'auto', height: 'auto', padding: '50px' }}>
                <h1 style={{ color: 'white', textAlign: 'center' }}> MY DASHBOARD </h1>
                <br />
                <Table striped bordered hover variant="dark" style={{fontSize:'14px'}}>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Seat Numbers</th>
                            <th>Price Per Seat</th>
                            <th>Total Price</th>
                            <th>Booked Time</th>
                            <th>Booked Date</th>
                            <th>Booked Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userBookings.map((list,index)=>
                          userID === list.userid?
                        <tr key={list._id}>
                            <td>{index+1}</td>
                            <td>{list.seatnumber}</td>
                            <td>{list.accprice}</td>
                            <td>{list.totalprice}</td>
                            <td>{list.bookedtime}</td>
                            <td>{list.bookeddate}</td>
                            <td>{list.bookstatus ? "Booked" : null}</td>
                        </tr>
                           : <div style={{color:'red'}}> No Bookings </div>

                        )}


                    </tbody>
                </Table>

            </div>



            <br/><br/><br/>






                                  {/*-------- PROFILE ---------- */}

            <div style={{ marginTop: '50px', width: 'auto', height: 'auto', padding: '50px' }}>
                <h1 style={{ color: 'white', textAlign: 'center' }}> MY PROFILE </h1>
                <br />
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }, borderRadius:"10px",bgcolor: 'aliceblue', height: '620px', width: '50%', margin: '50px auto 50px auto'
                    }}
                    noValidate
                    autoComplete="off"
                >
                <center>
                  <div style={{background:'aliceblue',borderRadius:'10px'}}>

                  {user.map((li,index)=><div key={li._id}> 
                    <br />
                    <TextField
                        required
                        label="Enter Your Fullname"
                        style={{ marginTop: "10px", width: '350px' }}
                        type="text"
                        name="fullname"
                        defaultValue={li.fname}
                        onChange={(e)=>setUserupdatefname(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        label="Enter Your Username"
                        style={{ width: '350px' }}
                        type="text"
                        name="username"
                        defaultValue={li.username}
                        onChange={(e)=>setUserupdateusername(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        label="Enter Your Email"
                        style={{ width: '350px' }}
                        name="email"
                        defaultValue={li.email}
                        type="email"
                        onChange={(e)=>setUserupdateemail(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        label="Enter Your Mobile"
                        type='number'
                        style={{ width: '350px' }}
                        name="mobile"
                        defaultValue={li.mobile}
                        onChange={(e)=>setUserupdatemobile(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        
                        label="Enter Your Password"
                        style={{ width: '350px'}}
                        type="text"
                        name="password"
                        defaultValue={li.password}
                        onChange={(e)=>setUserupdatepassword(e.target.value)}
                    />
                    <br /><br />

                    <Button1 variant="primary" style={{ width: "350px", height: '50px' }} onClick={(e)=>updateHandler(e,li._id)}> Update Profile </Button1>
                    <br />
                    <br />
                    </div>)}
                    </div>
                </center>
</Box>

        {/* <span style={{color:'aliceblue'}}> Do You want Delete Account? &nbsp;&nbsp; <Button variant="danger" style={{background:'red',color:'aliceblue'}} onClick={(e)=>deleteUser(e,user[0]._id)}> Delete Profile </Button> </span> */}
            </div>






        </>
    );
}
export default Dashboard;