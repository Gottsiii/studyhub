import { useEffect, useState } from 'react';
import { api, authHeader } from '../services/api';
import WeatherWidget from '../components/WeatherWidget';

type Task = { id:number; title:string; done:boolean };

export default function Dashboard({ onLogout }:{ onLogout:()=>void }){
  const [tasks,setTasks]=useState<Task[]>([]);
  const [title,setTitle]=useState('');

  const load = async()=>{ const r=await api.get('/api/tasks',authHeader()); setTasks(r.data); };
  const add  = async()=>{ if(!title.trim()) return; await api.post('/api/tasks',{title},authHeader()); setTitle(''); load(); };
  const toggle=async(t:Task)=>{ await api.put(`/api/tasks/${t.id}`,{done:!t.done},authHeader()); load(); };
  const del   =async(t:Task)=>{ await api.delete(`/api/tasks/${t.id}`,authHeader()); load(); };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="container">
      <header className="header">
        <h2 className="h2">Dashboard</h2>
        <div className="right">
          <button className="btn logout" onClick={onLogout}>Salir</button>
        </div>
      </header>

      <div className="row">
        <input className="input" placeholder="Nueva tarea" value={title} onChange={e=>setTitle(e.target.value)} />
        <button className="btn" onClick={add}>Agregar</button>
      </div>

      <ul className="list">
        {tasks.map(t=>(
          <li key={t.id} className="item">
            <input type="checkbox" className="checkbox" checked={t.done} onChange={()=>toggle(t)} />
            <span className={`title ${t.done?'done':''}`}>{t.title}</span>
            <button className="iconbtn" onClick={()=>del(t)}>🗑️</button>
          </li>
        ))}
      </ul>

      <div className="card">
        <WeatherWidget/>
      </div>

      <small className="muted">StudyHub · producción</small>
    </div>
  );
}

