import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, bookTicket } from '../api';

export default function EventDetails() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [msg, setMsg] = useState('');
  const gridSize = 10; // 10x10 grid

  useEffect(() => {
    if (!id) {
      setMsg('No event ID provided in URL.');
      setEv(null);
      return;
    }
    getEvent(id)
      .then(data => {
        setEv(data);
        setMsg('');
      })
      .catch((err) => {
        setMsg('Failed to load event: ' + (err?.error || err?.message || JSON.stringify(err)));
        setEv(null);
        console.error('EventDetails error:', err);
      });
  }, [id]);

  function toggleSeat(seat) {
    setSelectedSeats(seats => seats.includes(seat)
      ? seats.filter(s => s !== seat)
      : [...seats, seat]
    );
  }

  async function buy() {
    setMsg('');
    if (selectedSeats.length === 0) {
      setMsg('Please select at least one seat.');
      return;
    }
    try {
      // Simulated payment step
      if (!window.confirm(`Pay $${ev.price * selectedSeats.length} for ${selectedSeats.length} ticket(s)?`)) return;
      const res = await bookTicket(id, selectedSeats.length);
      const saved = JSON.parse(localStorage.getItem('latestTickets') || '[]');
      localStorage.setItem('latestTickets', JSON.stringify([...saved, ...res.tickets]));
      setMsg('Booked! Check My Tickets.');
      setSelectedSeats([]);
    } catch (err) {
      setMsg(err.error || 'Error booking');
    }
  }

  if (!ev) return <div className='container'>{msg || 'Loading...'}<br /><small>Check console for details.</small></div>;
  return (
    <div className='container'>
      <h1 style={{ color: 'white', background: '#222', padding: '8px' }}>EventDetails Mounted!</h1>
      <div className='card'>
        <h2>{ev.title || 'No title'}</h2>
        <p>{ev.description || 'No description'}</p>
        <p>When: {ev.dateStart ? new Date(ev.dateStart).toLocaleString() : 'No date'}</p>
  <p>Price: ${ev.price ?? 'N/A'}</p>
  <p>Seats available: {ev.seatsAvailable ?? 'N/A'}</p>
  <p>Popularity: {ev.popularity ?? 0} tickets booked</p>
        <div style={{margin:'16px 0'}}>
          <h4>Select your seat(s):</h4>
          <div style={{display:'grid', gridTemplateColumns:`repeat(${gridSize}, 1fr)`, gap:4, maxWidth:320}}>
            {[...Array(gridSize*gridSize)].map((_,i) => {
              const seatNum = i+1;
              const selected = selectedSeats.includes(seatNum);
              return (
                <button
                  key={seatNum}
                  type='button'
                  style={{
                    background: selected ? '#0b69ff' : '#eee',
                    color: selected ? 'white' : '#222',
                    border: '1px solid #bbb',
                    borderRadius: 4,
                    padding: '6px',
                    cursor: 'pointer',
                    fontWeight: selected ? 'bold' : 'normal',
                  }}
                  onClick={() => toggleSeat(seatNum)}
                >
                  {seatNum}
                </button>
              );
            })}
          </div>
          <div style={{marginTop:8}}>
            Selected: {selectedSeats.length ? selectedSeats.join(', ') : 'None'}
          </div>
        </div>
        <button className='button' onClick={buy} disabled={selectedSeats.length === 0}>
          Book {selectedSeats.length ? `(${selectedSeats.length} seat${selectedSeats.length>1?'s':''})` : ''}
        </button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
