import React, { useEffect, useState } from 'react';
import { myTickets } from '../api';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    myTickets()
      .then(setTickets)
      .catch((err) => {
        setMsg('Failed to load tickets: ' + (err?.error || err?.message || JSON.stringify(err)));
        setTickets([]);
        console.error('MyTickets error:', err);
      });
    // also load any recently created tickets saved locally (from EventDetails)
    const saved = JSON.parse(localStorage.getItem('latestTickets') || '[]');
    if (saved.length) setTickets(prev => [...saved, ...prev]);
  }, []);

  return (
    <div className='container'>
      <h2>My Tickets</h2>
      {msg && <div style={{color:'#c00', marginBottom:12}}>{msg}</div>}
      {tickets.length === 0 && !msg && <div>No tickets found.</div>}
      {tickets.map(t => (
        <div key={t._id || t.ticketId} className='card'>
          <h4>{(t.eventId && t.eventId.title) || 'Event'}</h4>
          <p>Seat: {t.seatNumber || '-'}  |  Status: {t.status}</p>
          {/* Show QR code as image if available, else show fallback and diagnostics */}
          {t.qr && <img src={t.qr} className='qr' alt='QR' />}
          {t.qrPayload && t.qrPayload.startsWith('data:image') && <img src={t.qrPayload} className='qr' alt='QR' />}
          {!(t.qr || (t.qrPayload && t.qrPayload.startsWith('data:image'))) && (
            <div style={{ color: '#888', fontSize: 12 }}>
              QR code not available<br />
              <small>Debug: {JSON.stringify(t.qrPayload)}</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
