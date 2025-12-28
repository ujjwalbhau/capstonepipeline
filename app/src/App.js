/*import React, { useState, useEffect } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [subs, setSubs] = useState([]);
//  const api = process.env.REACT_APP_BACKEND_URL || 'http://backend:3000';
const api = '/api'
  
useEffect(() => {
  fetch(`${api}/submissions`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setSubs(data);
      } else {
        console.error("API did not return an array:", data);
        setSubs([]); // Prevent crash
      }
    })
    .catch((err) => console.error(err));
}, []);

  async function submit(e) {
    e.preventDefault();
    await fetch(`${api}/submit`, {
      method:'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(form)
    });
    setForm({ name:'', email:'', message:''});
    const r = await fetch(`${api}/submissions`);
    setSubs(await r.json());
  }

  return (
    <div style={{padding: '1rem', fontFamily: 'sans-serif'}}>
      <h1>Submit</h1>
      <form onSubmit={submit}>
        <div><input required placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
        <div><input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
        <div><textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} /></div>
        <button type="submit">Send</button>
      </form>

      <h2>Recent submissions</h2>
      <ul>
        {subs.map(s => <li key={s.id}>{s.name} ({s.email})</li>)}
      </ul>
    </div>
  );
}
*/

import React, { useState, useEffect } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [subs, setSubs] = useState([]);


  const api = '/api';

  useEffect(() => {
    fetch(`${api}/submissions`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSubs(data);
        } else {
          console.error("API did not return an array:", data);
          setSubs([]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  async function submit(e) {
    e.preventDefault();

    await fetch(`${api}/submit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ name: '', email: '', message: '' });

    const r = await fetch(`${api}/submissions`);
    setSubs(await r.json());
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Submit</h1>
      <form onSubmit={submit}>
        <div><input required placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div><input required placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div><textarea placeholder="Message" value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })} /></div>
        <button type="submit">Send</button>
      </form>

      <h2>Recent submissions</h2>
      <ul>
        {subs.map(s => <li key={s.id}>{s.name} ({s.email})</li>)}
      </ul>
    </div>
  );
}
