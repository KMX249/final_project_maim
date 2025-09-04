import React, { useState } from 'react'
import { register } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const [location, setLocation] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    // Validate all fields
    if (!name || !email || !password || !age || !gender || !interests || !location) {
      setErr('Please fill in all fields.');
      return;
    }
    try {
      await register({
        name,
        email,
        password,
        profile: {
          age: age ? Number(age) : undefined,
          gender,
          interests: interests ? interests.split(',').map(i => i.trim()).filter(Boolean) : [],
          location,
        }
      });
      navigate('/login');
    } catch (err) {
      setErr(err.error || JSON.stringify(err));
    }
  }

  return (
    <div className='container'>
      <div className='card' style={{ maxWidth: 420, margin: '20px auto' }}>
        <h3>Register</h3>
        <form onSubmit={submit}>
          <div className='form-row'>
            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
          </div>
          <div className='form-row'>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
          </div>
          <div className='form-row'>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
          </div>
          <div className='form-row'>
            <input type='number' value={age} onChange={e => setAge(e.target.value)} placeholder='Age' min='0' />
          </div>
          <div className='form-row'>
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='form-row'>
            <input value={interests} onChange={e => setInterests(e.target.value)} placeholder='Interests (comma separated)' />
          </div>
          <div className='form-row'>
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder='Location' />
          </div>
          <button className='button'>Create account</button>
          {err && <div style={{ marginTop: 8 }}><small className='err'>{err}</small></div>}
        </form>
      </div>
    </div>
  );
}
