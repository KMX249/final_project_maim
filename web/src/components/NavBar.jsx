import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav>
      <div className='container' style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <Link to='/'>EventX Studio</Link>
          {token && <>
            <Link to='/' style={{marginLeft:12}}>Events</Link>
            <Link to='/mytickets' style={{marginLeft:12}}>My Tickets</Link>
            {user && user.role === 'admin' && <Link to='/admin' style={{marginLeft:12}}>Admin</Link>}
          </>}
        </div>
        <div>
          {token ? (
            <>
              <span style={{marginRight:8}}>Hi, {user && user.name}</span>
              <button onClick={logout} className='button'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register' style={{marginLeft:12}}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
