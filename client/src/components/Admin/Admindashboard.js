import Header from '../Header';
import '../components.css';
import './Admindashboard.css';
import '../../App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



//Icons...
import { FaOutdent, FaStackOverflow, FaUsers, FaYoutube, FaCalendarCheck, FaRegSun } from "react-icons/fa";
import avatar from './admin-avatar.png'

//-----
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button1 from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';





const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Dashboard', 'Logout'];




function AdminDashboard() {


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


    // const [movies, setMovies] = useState([]);


    // useEffect(() => {
    //     fetchedMovies();

    // }, [])


    // const fetchedMovies = async () => {
    //     let response = await axios.get('http://localhost:8081/movies/list', {
    //         headers: {
    //             method: 'GET',
    //             'Content-Type': 'application/json',
    //             'x-token': localStorage.getItem('token')
    //         }
    //     }).then(
    //         res => setMovies(res.data)
    //     ).catch(error => console.log(error))
    // }

    const expand = () => {
        let x = document.getElementById('menu');
        let y = document.getElementById('logo');
        let z1 = document.getElementById('p1');
        let z2 = document.getElementById('p2');
        let z3 = document.getElementById('p3');
        let z4 = document.getElementById('p4');
        let z5 = document.getElementById('p5');


        x.style.width = '14%';

        y.style.padding = '18px';
        y.style.fontSize = '18px';

        z1.style.display = 'inline';
        z2.style.display = 'inline';
        z3.style.display = 'inline';
        z4.style.display = 'inline';
        z5.style.display = 'inline';

        setActive(true)

    }

    const closed = () =>{
        let x = document.getElementById('menu');
        let y = document.getElementById('logo');
        x.style.width = '5%';

        y.style.fontSize = '10px';
        y.style.padding = '25px 15px';

        let z1 = document.getElementById('p1');
        let z2 = document.getElementById('p2');
        let z3 = document.getElementById('p3');
        let z4 = document.getElementById('p4');
        let z5 = document.getElementById('p5');

        z1.style.display = 'none';
        z2.style.display = 'none';
        z3.style.display = 'none';
        z4.style.display = 'none';
        z5.style.display = 'none';


        setActive(false);
    }

    const [active,setActive] = useState(false);



    const handleOpenUserSettings = () =>{
            var x=document.getElementById('settings');
            var y= x.style.display;

            if(y==='block'){
               x.style.display="none";
            }
            else{
                x.style.display="block";
            }

    }


    //SIDEBAR-NAV-ITEMS-DASHBOARD...

    // const [sidebar,setSidebar] = useState([
    //     {
    //         id:1,
    //         name:'Dashboard',
    //         path:'/admin/dashboard',
    //         icon:<FaStackOverflow/>
    //     },
    //     {
    //         id:2,
    //         name:'Users',
    //         path:'/admin/dashboard/users',
    //         icon:<FaUsers/>
    //     },
    //     {
    //         id:3,
    //         name:'Movies',
    //         path:'/admin/dashboard/movies',
    //         icon:<FaYoutube/>
    //     },
    //     {
    //         id:4,
    //         name:'Bookings',
    //         path:'/admin/dashboard/bookings',
    //         icon:<FaCalendarCheck/>
    //     },
    //     {
    //         id:5,
    //         name:'Settings',
    //         path:'/admin/dashboard',
    //         icon:<FaRegSun/>
    //     }
    // ])


    return (
        <>
            {/* <Header /> */}
            <div style={{ display: 'flex' }}>
                {/* <center>
                    <br/>
                    <h1 style={{color:'aliceblue'}}> ADMIN DASHBOARD Feature is 'COMING SOON!' </h1>
                </center> */}
                <div className="sidebar-section" id='menu'>
                    <div className='logo' id='logo'> L O G O </div>

                    <ul>
                        {/* <li><a> <FaStackOverflow style={{fontSize:'20px',margin:'-5px 0px 0px 0px'}}/> &nbsp; Dashboard </a></li>
                        <li><a> <FaUsers style={{fontSize:'20px',margin:'-5px 0px 0px 0px'}}/> &nbsp; Users</a></li>
                        <li><a> <FaYoutube style={{fontSize:'20px',margin:'-5px 0px 0px 0px'}}/> &nbsp; Movies</a></li>
                        <li><a><FaCalendarCheck style={{fontSize:'20px',margin:'-5px 0px 0px 0px'}}/> &nbsp; Bookings</a></li>
                        <li><a> <FaRegSun style={{fontSize:'20px',margin:'-5px 0px 0px 0px'}}/> &nbsp; Settings</a></li> */}
                        <a href='/admin/dashboard' className='active'> <li> <FaStackOverflow style={{ fontSize: '20px', margin: '-5px 0px 0px 0px' }} /> &nbsp; <p id="p1"> Dashboard </p> </li></a>
                        <a href='/admin/dashboard/users'><li> <FaUsers style={{ fontSize: '20px', margin: '-5px 0px 0px 0px' }} /> &nbsp; <p id="p2"> Users </p> </li> </a>
                        <a href='/admin/dashboard/movies'><li> <FaYoutube style={{ fontSize: '20px', margin: '-5px 0px 0px 0px' }} /> &nbsp; <p id="p3"> Movies </p> </li></a>
                        <a href='/admin/dashboard/bookings'><li><FaCalendarCheck style={{ fontSize: '20px', margin: '-5px 0px 0px 0px' }} /> &nbsp; <p id="p4"> Bookings </p> </li></a>
                        <a href='/admin/dashboard'><li> <FaRegSun style={{ fontSize: '20px', margin: '-5px 0px 0px 0px' }} /> &nbsp; <p id="p5"> Settings </p> </li></a>
                    </ul>
                </div>
                <div style={{ background: 'aliceblue', width: '100%' }}>
                    {/* <span> <FaOutdent onClick={expand} /> BODY</span> */}

                    {/* BODY SECTION */}

                    <AppBar position="static" style={{background:'black !important'}}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                {active ? 
                                <FaOutdent style={{fontSize:'20px',marginRight:'10px'}} onClick={closed} id='home-btn'/>
                                    :
                                <FaOutdent style={{fontSize:'20px',marginRight:'10px',transform:"scaleX(-1)"}} onClick={expand} id='home-btn'/>
                                }
                                <Typography
                                 className='home'
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 'lighter',
                                        // letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Home
                                </Typography>


                                {/* RESPONSIVE */}

                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                          <MenuIcon /> &nbsp; <span style={{fontSize:'16px'}}> Home </span>
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
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
        
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href="#"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'none' },
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                </Box>

                                <Box sx={{ flexGrow: 0 }} >
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserSettings} sx={{ p: 0 }}>
                                            <Avatar alt="Avatar" src={avatar} />
                                        </IconButton>
                                    </Tooltip>
                                    <div id="settings">
                                        <ul>
                                            <a href="#p"><li>Profile</li></a>
                                            <a href="#d"><li>Dashboard</li></a>
                                            <a href="#l"><li>Logout</li></a>
                                        </ul>
                                    </div>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>


                    {/* ------------------- */}
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;