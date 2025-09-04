import React, { useState } from 'react'
import { createEvent } from '../api'
import { useNavigate } from 'react-router-dom'


export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(100);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await createEvent({
        title,
        description: desc,
        price: Number(price),
        capacity: Number(capacity),
        dateStart,
        dateEnd
      });
      navigate('/admin');
    } catch (err) {
      setErr(err.error || JSON.stringify(err));
    }
  }

  return (
    <div className='container'>
      <div className='card' style={{ maxWidth: 600 }}>
        <h3>Create Event</h3>
        <form onSubmit={submit}>
          <div className='form-row'>
            <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className='form-row'>
            <textarea placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div className='form-row'>
            <input placeholder='Price' type='number' value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className='form-row'>
            <input placeholder='Capacity' type='number' value={capacity} onChange={e => setCapacity(e.target.value)} />
          </div>
          <div className='form-row'>
            <label>Start Date & Time</label>
            <input type='datetime-local' value={dateStart} onChange={e => setDateStart(e.target.value)} />
          </div>
          <div className='form-row'>
            <label>End Date & Time</label>
            <input type='datetime-local' value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
          </div>
          <button className='button'>Create</button>
          {err && <div style={{ marginTop: 8 }}><small className='err'>{err}</small></div>}
        </form>
      </div>
    </div>
  );
}
