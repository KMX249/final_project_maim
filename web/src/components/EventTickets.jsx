import React, { useEffect, useState } from 'react';
const API_BASE = (import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : 'http://localhost:8080/api';

export default function EventTickets({ eventId }) {
  const [tickets, setTickets] = useState([]);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (!eventId) return;
    fetch(`${API_BASE}/admin/event-tickets/${eventId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setTickets(data);
        else setMsg(data.error || 'Failed to load tickets');
      })
      .catch(e => setMsg('Error loading tickets'));
  }, [eventId]);

  if (!eventId) return null;
  return (
    <div className='card' style={{marginTop:16}}>
      <h4>Tickets for Event</h4>
      {msg && <div style={{color:'#c00'}}>{msg}</div>}
      {tickets.length === 0 && !msg && <div>No tickets found.</div>}
      {tickets.length > 0 && (
        <table style={{width:'100%', fontSize:14}}>
          <thead>
            <tr>
              <th>User</th>
              <th>Seat</th>
              <th>Status</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t._id}>
                <td>{t.userId?.name || t.userId?.email || 'User'}</td>
                <td>{t.seatNumber}</td>
                <td>{t.status}</td>
                <td>{t.qrPayload && t.qrPayload.startsWith('data:image') ? <img src={t.qrPayload} alt='QR' style={{maxWidth:40}} /> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
