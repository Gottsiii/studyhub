import { useState } from 'react';
export default function WeatherWidget(){
  const [tip] = useState('Mantén el ritmo: ¡una tarea a la vez!');
  return (<div style={{marginTop:24,padding:12,border:'1px solid #ddd',borderRadius:8}}>
    <strong>Motivación del día</strong><div>{tip}</div>
  </div>);
}
