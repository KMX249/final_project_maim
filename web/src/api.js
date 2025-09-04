const API_BASE = (import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : 'http://localhost:8080/api';

async function request(path, opts = {}) {
  const token = localStorage.getItem('token');
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function login(email, password) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function register(payload) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function listEvents(q='') {
  return request('/events?q=' + encodeURIComponent(q));
}

export async function getEvent(id) {
  return request('/events/' + id);
}

export async function createEvent(payload) {
  return request('/events', { method: 'POST', body: JSON.stringify(payload) });
}

export async function bookTicket(eventId, quantity=1) {
  return request('/tickets/book', { method: 'POST', body: JSON.stringify({ eventId, quantity }) });
}

export async function myTickets() {
  return request('/tickets/me');
}

export async function analyticsSummary() {
  return request('/analytics/summary');
}

export async function checkin(qrString) {
  return request('/checkin', { method: 'POST', body: JSON.stringify({ qrString }) });
}
