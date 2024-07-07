import '../App.css';
import axios from 'axios'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft } from "react-icons/fa";




const base_url = 'https://movie-booking-site-backend.onrender.com';




function Signup() {

    const [userRegister,setUserregister] = React.useState({
        fullname:'',
        username:'',
        email:'',
        mobile:'',
        password:''
    });

    const changeHandler = (e) =>{
        setUserregister({...userRegister,[e.target.name]:e.target.value});
    }


    const submitHandler = async (e) =>{
        e.preventDefault();


        //BASIC VALIDATIOn for registration of USERS...

        if(fullname==="" || username==="" || email==="" || mobile==="" || password===""){
            alert('Please Enter Valid Details');
            return false;
        }
        else if(mobile.length !==10){
            alert('Please Enter Valid Mobile');
            return false;
        }
        else if(email.slice(-10)!=="@gmail.com"){
            alert('Please Enter Valid Email');
            return false;
        }
        // console.log(userRegister);

                    //POST REGISTRATION DETAILS FOR USERS...

                    let payload = {
                        fname:fullname,
                        username:username,
                        email:email,
                        mobile:mobile,
                        password:password
                    }

             let response = await axios.post(`${base_url}`+`/user/registration`,payload,{
                headers:{
                     method:'POST',
                    'Content-Type':'application/json'
                }
             }).then(
                    res=>alert(res.data)
              ).catch(error=>alert(error.response.data))


        setUserregister({
            fullname:'',
            username:'',
            email:'',
            mobile:'',
            password:''
        })
    }


    const {fullname,username, email, mobile, password} = userRegister;

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }, borderRadius:"10px",bgcolor: 'aliceblue', height: '620px', width: 'auto', marginTop: '50px'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <center>
                             <br/>  <FaArrowLeft style={{float:'left',marginLeft:'20px'}}/>  
                                         <h2> Registration </h2>
                            <i> Use your email to create new account. it's free. </i>
                            <TextField
                                required
                                label="Enter Your Fullname"
                                style={{marginTop:"20px",width:'350px'}}
                                type="text"
                                onChange={changeHandler}
                                name="fullname"
                                value={fullname}
                            />
                            <br/>
                            <TextField
                                required
                                label="Enter Your Username"
                                style={{width:'350px'}}
                                type="text"
                                onChange={changeHandler}
                                name="username"
                                value={username}
                            />
                            <br/>
                            <TextField
                                required
                                label="Enter Your Email"
                                style={{width:'350px'}}
                                onChange={changeHandler}
                                name="email"
                                value={email}
                                type="email"
                            />
                            <br/>
                            <TextField
                                required
                                label="Enter Your Mobile"
                                type='number'
                                style={{width:'350px'}}
                                onChange={changeHandler}
                                name="mobile"
                                value={mobile}
                            />
                            <br/>
                            <TextField
                                required
                                label="Enter Your Password"
                                style={{width:'350px'}}
                                type="password"
                                onChange={changeHandler}
                                name="password"
                                value={password}
                            />
                            <br/><br/>

                            <Button variant="primary" style={{width:"350px",height:'50px'}} onClick={(e)=>submitHandler(e)}> REGISTER </Button>
                            <br/>
                            <br/>
                               Do you have an account? <a href="/user/login" style={{textDecoration:"none"}}> Login </a>    
                        </center>
                    </div>
                </Box>
            </Container>
        </React.Fragment>
    );
}






export default Signup;
