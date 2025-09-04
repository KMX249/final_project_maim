import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await login(email,password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } catch (err) {
      setErr(err.error || JSON.stringify(err));
    }
  }

  return (
    <div className='container'>
      <div className='card' style={{maxWidth:420, margin:'20px auto'}}>
        <h3>Login</h3>
        <form onSubmit={submit}>
          <div className='form-row'>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
          </div>
          <div className='form-row'>
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
          </div>
          <button className='button'>Login</button>
          {err && <div style={{marginTop:8}}><small className='err'>{err}</small></div>}
        </form>
      </div>
    </div>
  )
}
