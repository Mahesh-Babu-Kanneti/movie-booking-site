import '../App.css';
import './components.css';
import { useNavigate } from 'react-router-dom';
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
import Carousel from 'react-bootstrap/Carousel';

//Icons...
import { FaArrowRight } from "react-icons/fa";
import avatar from '../avatar.png';
import adminAvatar from './Admin/admin-avatar.png';









function Home() {

    const navigateLogout = useNavigate();
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


    React.useEffect(() => {
        let token = localStorage.getItem('token');

        // if (!token) {
        //     navigateLogout('/user/login')
        // }
    })


    const logout = () => {
        if (localStorage.getItem('role')) {
            let removeToken = localStorage.removeItem('token');
            let removeId = localStorage.removeItem('id');
            let removeRole = localStorage.removeItem('role');
            alert("Logout success")
             return  navigateLogout('/')
        }

    }


    const dashboard = useNavigate();

    //DASHBOARD...MEMBERS
    const membersDashboard = () => {
        if (localStorage.getItem('role') === "admin") {
            return dashboard('/admin/dashboard');
        }
        else {
            return dashboard('/user/dashboard')
        }


    }


    const userHome = useNavigate();


    return (
        <>
            <AppBar position="static" sx={{ bgcolor: 'black' }}>
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
                            <img src={"../logo.png"} style={{ height: "50px", width: "120px" }} alt='#' onClick={()=>userHome('/')}/>
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
                                    <Typography textAlign="center" onClick={() => userHome('/')}> HOME </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => userHome('/user/movies')}> MOVIES </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu} id='contact-button'>
                                    <Typography textAlign="center" onClick={() => userHome('/')}> CONTACT </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
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

                            <img src={"../logo.png"} style={{ height: "50px", width: "120px" }} alt="#" onClick={()=>userHome('/')}/>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                onClick={() => userHome('/')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                id='home-button'
                            >
                                HOME
                            </Button>
                            <Button
                                onClick={() => userHome('/user/movies')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                MOVIES
                            </Button>
                            <Button
                                onClick={() => userHome('/')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                id='contact-button'
                            >
                                CONTACT
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={localStorage.getItem('role')==='admin'? adminAvatar : avatar} />
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
                                {localStorage.getItem('token') ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={membersDashboard}> Dashboard </Typography>
                                </MenuItem>
                                 : 
                                 <MenuItem onClick={handleCloseUserMenu}>
                                 <Typography textAlign="center" onClick={()=>userHome('/user/login')}> Login </Typography>
                                 </MenuItem>
                                }
                                {localStorage.getItem('token') ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={logout}> Logout </Typography>
                                </MenuItem>
                                :
                                null
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>






                                                      {/* Banner Section... */}

            <Carousel>
                <Carousel.Item className="banner-section" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1)), url(https://images.hungama.com/c/1/fb1/14c/65999368/65999368_1280x800.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <Carousel.Caption className='banner-caption'>
                        <h3>Tom and Jerry</h3>
                        <p style={{ textAlign: 'left', fontSize: '14px' }}>A chaotic battle ensues between Jerry Mouse, who has taken refuge in the Royal Gate Hotel, and Tom Cat, who is hired to drive him away before the day of a big wedding arrives.</p>
                        <strong style={{ color: '#007bff' }}> By: Tim Story </strong><br />
                        <i>1h 41m</i><br />
                        <a href="#" className="banner-book-link"> BOOK TICKETS NOW  <FaArrowRight /> </a>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="banner-section" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1)), url(https://wallpaperaccess.com/full/13453.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <Carousel.Caption className='banner-caption'>
                        <h3>Avengers: Infinity War</h3>
                        <p style={{ textAlign: 'left', fontSize: '14px' }}> The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe. </p>
                        <strong style={{ color: '#007bff' }}> By: Anthony RussoJoe Russo </strong><br />
                        <i>2h 29m</i><br />
                        <a href="#" className="banner-book-link"> BOOK TICKETS NOW  <FaArrowRight /> </a>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="banner-section" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1)), url(https://images3.alphacoders.com/255/255247.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <Carousel.Caption className='banner-caption'>
                        <h3> The Amazing Spider-Man </h3>
                        <p style={{ textAlign: 'left', fontSize: '14px' }}> After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to save the city from the machinations of a mysterious reptilian foe. </p>
                        <strong style={{ color: '#007bff' }}> By: Marc Webb </strong><br />
                        <i>2h 16m</i><br /><br />
                        <a href="#" className="banner-book-link"> BOOK TICKETS NOW  <FaArrowRight /> </a>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>





        </>
    );
}
export default Home;