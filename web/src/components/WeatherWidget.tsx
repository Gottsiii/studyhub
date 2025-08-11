import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [tip, setTip] = useState('Mantén el ritmo: ¡una tarea a la vez!');

  useEffect(() => {
    // Servicio externo sin clave: https://api.adviceslip.com/advice
    fetch('https://api.adviceslip.com/advice', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setTip(d?.slip?.advice || tip))
      .catch(() => { /* silencioso */ });
  }, []);

  return (
    <div style={{marginTop:24,padding:12,border:'1px solid #ddd',borderRadius:8}}>
      <strong>Motivación del día</strong>
      <div>{tip}</div>
    </div>
  );
}
