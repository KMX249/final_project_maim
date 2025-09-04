
import React, { useEffect, useState } from 'react';
import { listEvents, analyticsSummary, getEvent } from '../api';
const API_BASE = (import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : 'http://localhost:8080/api';
import { Link, useNavigate } from 'react-router-dom';
import AnalyticsCharts from '../components/AnalyticsCharts';

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    analyticsSummary()
      .then(setSummary)
      .catch((err) => {
        setMsg('Failed to load analytics: ' + (err?.error || err?.message || JSON.stringify(err)));
        setSummary(null);
        console.error('AdminDashboard analytics error:', err);
      });
    listEvents()
      .then(setEvents)
      .catch((err) => {
        setMsg('Failed to load events: ' + (err?.error || err?.message || JSON.stringify(err)));
        setEvents([]);
        console.error('AdminDashboard events error:', err);
      });
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this event?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      setEvents(events.filter(ev => ev._id !== id));
    } catch (err) {
      alert('Error deleting event');
    }
    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {msg && <div style={{color:'#c00', marginBottom:12}}>{msg}</div>}
      {summary ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="card">
              <h4 className="font-semibold">Events</h4>
              <p>{summary.totalEvents}</p>
            </div>
            <div className="card">
              <h4 className="font-semibold">Tickets Sold</h4>
              <p>{summary.ticketsSold}</p>
            </div>
            <div className="card">
              <h4 className="font-semibold">Revenue</h4>
              <p>${summary.revenue}</p>
            </div>
          </div>
          {/* Analytics Charts for attendee insights */}
          {summary.attendeeInsights && (
            <AnalyticsCharts insights={summary.attendeeInsights} />
          )}
        </>
      ) : !msg && <p>Loading...</p>}
      <div className="mb-4"><Link to='/admin/create'><button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Create event</button></Link></div>
      <h3 className="text-xl font-bold mb-2">All Events</h3>
      <div>
        {events.map(ev => (
          <div key={ev._id} className='card' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <h3>{ev.title}</h3>
              <p>{new Date(ev.dateStart).toLocaleString()}</p>
            </div>
            <div>
              <button className='button' style={{marginRight:8}} onClick={() => navigate(`/admin/edit/${ev._id}`)}>Edit</button>
              <button className='button' style={{marginRight:8, background:'#0b69ff', color:'#fff'}} onClick={() => navigate(`/admin/tickets/${ev._id}`)}>Tickets</button>
              <button className='button' style={{background:'#c00'}} disabled={loading} onClick={() => handleDelete(ev._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
