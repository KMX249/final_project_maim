
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyTickets from './pages/MyTickets';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import EventTicketsAdmin from './pages/EventTicketsAdmin';

function NotFound() {
  return (
    <div className='container'>
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
    </div>
  );
}

import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Listen for login/logout changes in same tab
  useEffect(() => {
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      origSetItem.apply(this, arguments);
      if (key === 'token') setToken(value);
    };
    return () => { localStorage.setItem = origSetItem; };
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={ token ? <Events /> : <Navigate to='/login'/> } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/events/:id' element={ token ? <EventDetails /> : <Navigate to='/login'/> } />
          <Route path='/mytickets' element={<MyTickets />} />
          <Route path='/admin' element={ token ? <AdminDashboard /> : <Navigate to='/login'/> } />
          <Route path='/admin/create' element={ token ? <CreateEvent /> : <Navigate to='/login'/> } />
          <Route path='/admin/edit/:id' element={ token ? <EditEvent /> : <Navigate to='/login'/> } />
          <Route path='/admin/tickets/:id' element={ token ? <EventTicketsAdmin /> : <Navigate to='/login'/> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
