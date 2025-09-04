import { useRef } from 'react';
import React, { useEffect, useState } from 'react';
import { listEvents } from '../api';
import { Link } from 'react-router-dom';

const CATEGORY_OPTIONS = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'active', label: 'Active' },
  { key: 'closed', label: 'Closed' }
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState(['upcoming']);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  async function fetch() {
    try {
      const data = await listEvents(q);
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { fetch(); }, []);

  // Filter events by selected categories
  const now = Date.now();
  let filteredEvents = events.filter(ev => {
    const start = new Date(ev.dateStart).getTime();
    const end = ev.dateEnd ? new Date(ev.dateEnd).getTime() : null;
    let match = false;
    if (filters.includes('upcoming')) match = match || (start > now && ev.status === 'published');
    if (filters.includes('active')) match = match || (start <= now && (!end || end > now) && ev.status === 'published');
    if (filters.includes('closed')) match = match || ((end && end <= now) || ev.status === 'closed');
    return match;
  });

  // Sorting logic
  filteredEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'name') {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      else return b.title.localeCompare(a.title);
    }
    if (sortBy === 'popularity') {
      if (sortOrder === 'asc') return (a.popularity ?? 0) - (b.popularity ?? 0);
      else return (b.popularity ?? 0) - (a.popularity ?? 0);
    }
    if (sortBy === 'price') {
      if (sortOrder === 'asc') return (a.price ?? 0) - (b.price ?? 0);
      else return (b.price ?? 0) - (a.price ?? 0);
    }
    return 0;
  });

  // Notifications for upcoming events (starting within 24 hours)
  const upcomingSoon = events.filter(ev => {
    const start = new Date(ev.dateStart).getTime();
    return ev.status === 'published' && start > now && start < now + 24*60*60*1000;
  });

  function handleFilterChange(cat) {
    setFilters(f => f.includes(cat) ? f.filter(x => x !== cat) : [...f, cat]);
  }

  return (
    <div className='container'>
      {/* Notification banner for upcoming events */}
      {upcomingSoon.length > 0 && (
        <div className='notification-banner' style={{background:'#ffe066', color:'#222', padding:'12px', borderRadius:8, marginBottom:16}}>
          <strong>Upcoming Events Starting Soon:</strong>
          <ul style={{margin:'8px 0 0 0', paddingLeft:20}}>
            {upcomingSoon.map(ev => (
              <li key={ev._id}>
                <Link to={`/events/${ev._id}`} style={{color:'#0b69ff', textDecoration:'underline'}}>{ev.title}</Link>
                {' '}at {new Date(ev.dateStart).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{display:'flex', gap:12, marginBottom:12}}>
        <input placeholder='Search' value={q} onChange={e => setQ(e.target.value)} style={{flex:1}} />
        <button className='button' onClick={async () => { const d = await listEvents(q); setEvents(d); }}>Search</button>
      </div>
      <div style={{display:'flex', gap:16, marginBottom:16}}>
        {CATEGORY_OPTIONS.map(opt => (
          <label key={opt.key} style={{display:'flex', alignItems:'center', gap:4}}>
            <input
              type='checkbox'
              checked={filters.includes(opt.key)}
              onChange={() => handleFilterChange(opt.key)}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <div style={{display:'flex', gap:12, marginBottom:16, alignItems:'center'}}>
        <label>Sort by:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value='name'>Name</option>
          <option value='popularity'>Popularity</option>
          <option value='price'>Price</option>
        </select>
        <button className='button' style={{padding:'2px 8px'}} onClick={()=>setSortOrder(o=>o==='asc'?'desc':'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      {filteredEvents.length === 0 && <p>No events found.</p>}
      {filteredEvents.map(ev => (
        <div key={ev._id} className='card'>
          <h3>{ev.title} <small> - ${ev.price}</small></h3>
          <p>{ev.description}</p>
          <p>{new Date(ev.dateStart).toLocaleString()}</p>
          <p>Status: {ev.status}</p>
          <p>Popularity: {ev.popularity ?? 0}</p>
          <Link to={`/events/${ev._id}`}><button className='button'>View</button></Link>
        </div>
      ))}
    </div>
  );
}
