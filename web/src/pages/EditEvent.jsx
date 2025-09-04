import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent } from '../api';
const API_BASE = (import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : 'http://localhost:8080/api';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    getEvent(id).then(setEvent).catch(() => setErr('Failed to load event'));
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await fetch(`${API_BASE}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      navigate('/admin');
    } catch (err) {
      setErr('Error updating event');
    }
  }

  if (!event) return <div className='container'>Loading...</div>;
  return (
    <div className='container'>
      <div className='card' style={{maxWidth:600}}>
        <h3>Edit Event</h3>
        <form onSubmit={submit}>
          <div className='form-row'>
            <input placeholder='Title' value={event.title} onChange={e=>setEvent(ev=>({...ev, title: e.target.value}))} />
          </div>
          <div className='form-row'>
            <textarea placeholder='Description' value={event.description} onChange={e=>setEvent(ev=>({...ev, description: e.target.value}))} />
          </div>
          <div className='form-row'>
            <input placeholder='Price' type='number' value={event.price} onChange={e=>setEvent(ev=>({...ev, price: e.target.value}))} />
          </div>
          <div className='form-row'>
            <input placeholder='Capacity' type='number' value={event.capacity} onChange={e=>setEvent(ev=>({...ev, capacity: e.target.value}))} />
          </div>
          <div className='form-row'>
            <label>Start Date & Time</label>
            <input type='datetime-local' value={event.dateStart ? event.dateStart.slice(0,16) : ''} onChange={e=>setEvent(ev=>({...ev, dateStart: e.target.value}))} />
          </div>
          <div className='form-row'>
            <label>End Date & Time</label>
            <input type='datetime-local' value={event.dateEnd ? event.dateEnd.slice(0,16) : ''} onChange={e=>setEvent(ev=>({...ev, dateEnd: e.target.value}))} />
          </div>
          <button className='button'>Save</button>
          {err && <div style={{marginTop:8}}><small className='err'>{err}</small></div>}
        </form>
      </div>
    </div>
  );
}
