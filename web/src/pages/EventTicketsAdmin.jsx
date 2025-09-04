import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const API_BASE = (import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : 'http://localhost:8080/api';

export default function EventTicketsAdmin() {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/tickets/admin/event-tickets/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setMsg('');
      })
      .catch((err) => {
        setMsg('Failed to load tickets: ' + (err?.error || err?.message || JSON.stringify(err)));
        setTickets([]);
        console.error('EventTicketsAdmin error:', err);
      });
  }, [id]);

  return (
    <div className='container'>
      <h2>Ticket Management</h2>
      {msg && <div style={{color:'#c00', marginBottom:12}}>{msg}</div>}
      {tickets.length === 0 && !msg && <div>No tickets found for this event.</div>}
      {tickets.map(t => (
        <div key={t._id} className='card' style={{marginBottom:12}}>
          <h4>User: {(t.userId && t.userId.name) || t.userId?.email || 'Unknown'}</h4>
          <p>Seat: {t.seatNumber || '-'} | Status: {t.status}</p>
          <p>Price Paid: ${t.pricePaid}</p>
          {t.qrPayload && t.qrPayload.startsWith('data:image') && <img src={t.qrPayload} className='qr' alt='QR' />}
          {!t.qrPayload && <span style={{color:'#888'}}>QR not generated</span>}
        </div>
      ))}
    </div>
  );
}
