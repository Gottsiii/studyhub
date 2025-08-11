import { useState } from 'react';
import { api } from '../services/api';
export default function Login({ onLogin }: { onLogin:(t:string)=>void }){
  const [email,setEmail]=useState('demo@example.com');
  const [password,setPassword]=useState('demo1234');
  const submit=async(e:any)=>{ e.preventDefault();
    try{ const r=await api.post('/api/auth/login',{email,password}); onLogin(r.data.token); }
    catch{ await api.post('/api/auth/register',{email,password}); const r=await api.post('/api/auth/login',{email,password}); onLogin(r.data.token); }
  };
  return (<form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:320,margin:'64px auto'}}>
    <h1>StudyHub</h1>
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
    <button type="submit">Entrar</button>
  </form>);
}
