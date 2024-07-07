
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


//Import components...
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Movieslist from './components/Movieslist';
import Moviespreview from './components/Moviepreview';
import Ticketbooking from './components/Ticketbooking';

//ADMIN ROUTES..
import Admindashboard from './components/Admin/Admindashboard';

import Adminusers from './components/Admin/Adminusers';
import Adminmovies from './components/Admin/Adminmovies';
import Adminbookings from './components/Admin/Adminbookings';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/user/login' element={<Login/>} />
          <Route path='/user/registration' element={<Signup/>} />
          <Route path='/user/dashboard' element={<Dashboard/>} />
          <Route path='/user/movies' element={<Movieslist/>} />
          <Route path='/user/movie/preview/:id' element={<Moviespreview/>} />
          <Route path='/user/ticketbooking' element={<Ticketbooking/>} />

                    {/* ADMIN ROUTES */}
          <Route path='/admin/dashboard' element={<Admindashboard/>} />
          <Route path='/admin/dashboard/users' element={<Adminusers/>} />
          <Route path='/admin/dashboard/movies' element={<Adminmovies/>} />
          <Route path='/admin/dashboard/bookings' element={<Adminbookings/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
