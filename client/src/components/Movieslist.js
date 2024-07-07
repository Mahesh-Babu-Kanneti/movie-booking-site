import Header from './Header';
import './components.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


//Icons...
import { FaArrowRight } from "react-icons/fa";





const base_url = 'https://movie-booking-site-backend.onrender.com';



function Movieslist() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        fetchedMovies();

    }, [])


    const fetchedMovies = async () => {
        let response = await axios.get(`${base_url}`+`/movies/list`, {
            headers: {
                method: 'GET',
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token')
            }
        }).then(
            res => setMovies(res.data)
        ).catch(error => console.log(error.response.data))
    }


    const moviePreview = useNavigate();

    return (
        <>
            <Header />
            <div>
                <center>
                    {movies.map(list =>
                        <div key={list._id}>
                            <Card style={{ width: '50%', margin: '50px auto 25px auto' }} className='movie-card-div'>
                                <Card.Img variant="top" src={list.image} style={{height:"320px"}} />
                                <br/>
                                    <Card.Title> {list.title} </Card.Title>
                                    <Card.Text style={{fontSize:'14px',textAlign:'left', margin: 'auto auto auto 25px' }}>
                                           {list.description}
                                        <br/>
                                        <span style={{color:'#0d6efd'}}> By:  {list.director} </span>
                                        <br/>
                                        <i>  {list.duration} </i>
                                        <br/> <br/>
                                    </Card.Text>
                                    <Button variant="warning" style={{fontWeight:'bold',borderRadius:'0px'}} onClick={()=>moviePreview('/user/movie/preview/'+`${list._id}`)}> BOOK NOW  &nbsp; <FaArrowRight /></Button>
                              
                            </Card>
                        </div>)}
                </center>
            </div>
        </>
    );
}

export default Movieslist;
