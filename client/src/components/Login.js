import '../App.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft } from "react-icons/fa";



const base_url = 'https://movie-booking-site-backend.onrender.com';



function Login() {

    const navigate = useNavigate();
    
    const [userLogin,setUserlogin] = React.useState({
        email:'',
        password:''
    });

    const changeHandler = (e) =>{
        setUserlogin({...userLogin,[e.target.name]:e.target.value});
    }


    const submitHandler = async (e) =>{
        e.preventDefault();

        
        //BASIC VALIDATIOn for registration of USERS...

        if(email==="" || password===""){
            alert('Please Enter Valid Details');
            return false;
        }
        else if(email.slice(-10)!=="@gmail.com"){
            alert('Please Enter Valid Email');
            return false;
        }

        // console.log(userLogin);


            //POST LOGIN DETAILS FOR USERS...

            let response = await axios.post(`${base_url}`+`/user/login`,userLogin,{
                headers:{
                     method:'POST',
                    'Content-Type':'application/json'
                }
            }).then(
                res=>{localStorage.setItem('token',res.data.token);localStorage.setItem('role',res.data.role);alert(res.data.msg)}
            ).catch(error=>alert(error.response.data))


        setUserlogin({
            email:'',
            password:''
        })
    }


    const {email, password} = userLogin;




    React.useEffect(()=>{

        let token = localStorage.getItem('token')
        if(token){
            navigate('/');
        }

    })



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }, borderRadius:"10px",bgcolor: 'aliceblue', height: '500px', width: 'auto', marginTop: '50px'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div >
                        <center>
                             <br/>  <FaArrowLeft style={{float:'left',marginLeft:'20px'}}/>  <br/>
                            <h1 >Login</h1>
                            <TextField
                                required
                                label="Enter Your Email"
                                style={{marginTop:"40px",width:'350px'}}
                                onChange={changeHandler}
                                name="email"
                                value={email}
                                type="email"
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

                            <Button variant="primary" style={{width:"350px",height:'50px'}} onClick={(e)=>submitHandler(e)}>LOGIN</Button>
                            <br/><br/>
                                      ---------- OR ----------
                            <br/><br/>  
                               Don't have an account? <a href="/user/registration" style={{textDecoration:"none"}}> Register </a>    
                        </center>
                    </div>
                </Box>
            </Container>
        </React.Fragment>
    );
}






export default Login;
