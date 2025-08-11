import { useEffect, useState } from 'react';
import { api, authHeader } from '../services/api';
import WeatherWidget from '../components/WeatherWidget';
type Task = { id:number; title:string; done:boolean };
export default function Dashboard({ onLogout }:{ onLogout:()=>void }){
  const [tasks,setTasks]=useState<Task[]>([]);
  const [title,setTitle]=useState('');
  const load=async()=>{ const r=await api.get('/api/tasks',authHeader()); setTasks(r.data); };
  const add=async()=>{ if(!title) return; await api.post('/api/tasks',{title},authHeader()); setTitle(''); load(); };
  const toggle=async(t:Task)=>{ await api.put(`/api/tasks/${t.id}`,{done:!t.done},authHeader()); load(); };
  const del=async(t:Task)=>{ await api.delete(`/api/tasks/${t.id}`,authHeader()); load(); };
  useEffect(()=>{ load(); },[]);
  return (<div style={{maxWidth:600,margin:'32px auto',padding:16}}>
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h2>Dashboard</h2><button onClick={onLogout}>Salir</button>
    </header>
    <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:8,marginTop:16}}>
      <input placeholder="Nueva tarea" value={title} onChange={e=>setTitle(e.target.value)}/>
      <button onClick={add}>Agregar</button>
    </div>
    <ul>{tasks.map(t=>(<li key={t.id} style={{display:'flex',gap:8,alignItems:'center'}}>
      <input type="checkbox" checked={t.done} onChange={()=>toggle(t)}/>
      <span style={{textDecoration:t.done?'line-through':'none'}}>{t.title}</span>
      <button onClick={()=>del(t)}>🗑️</button>
    </li>))}</ul>
    <WeatherWidget/>
  </div>);
}
