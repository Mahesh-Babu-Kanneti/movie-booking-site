import Header from './Header';
import './components.css';
import '../App.css';
import { useParams ,useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



//Icons...
import { FaArrowRight } from "react-icons/fa";





const base_url = 'https://movie-booking-site-backend.onrender.com';



function Moviepreview() {

    const [movies, setMovies] = useState([]);
    const id = useParams();

    const bookTicket = useNavigate(); 
    const userLogin = useNavigate(); 

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


    let filterMovie = movies.filter(li => li._id === id.id);




    return (
        <>
            <Header />
            <div>
                <center>
                    {filterMovie.map(list =>
                        <div key={list._id}>
                            <Card className="bg-dark text-white" style={{ width: 'auto', margin: 'auto auto auto auto'}} >
                                <Card.Img src={list.image} alt="Card image" style={{ height: "636px", borderRadius: '0px' }} />
                                
                                <Card.ImgOverlay style={{ textAlign: 'left',margin:'auto auto auto 25px' }}>
                                    <br /><br />
                                    <Card.Title style={{fontSize:'80px'}}>{list.title}</Card.Title>
                                    <Card.Text style={{ fontSize: '14px', textAlign: 'left', margin: 'auto auto auto auto' }}>
                                        {list.description}
                                    </Card.Text>
                                    <br/>
                                    <Card.Text style={{ color: '#0d6efd' }}>By:  {list.director}</Card.Text>
                                    <i> {list.duration}</i>
                                    <Button variant="warning" style={{ fontWeight: 'bold', borderRadius: '0px', float: 'right', padding: "25px", position: 'relative', top: "300px" }} onClick={()=>{if(!localStorage.getItem('token')){userLogin('/user/login')}else{bookTicket('/user/ticketbooking')}}}> BOOK NOW  &nbsp; <FaArrowRight /></Button>
                                </Card.ImgOverlay>
                            </Card>
                        </div>)}
                </center>
            </div>
        </>
    );
}

export default Moviepreview;
