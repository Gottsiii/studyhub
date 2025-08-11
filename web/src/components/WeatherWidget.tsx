import { useState, useEffect } from 'react';

export default function WeatherWidget(){
  const [tip, setTip] = useState('Mantén el ritmo: ¡una tarea a la vez!');

  useEffect(() => {
    const city = 'Panama City';
    const key = import.meta.env.VITE_OPENWEATHER_KEY as string | undefined;
    if (!key) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric&lang=es`)
      .then(r => r.json())
      .then(d => {
        if (!d?.main?.temp || !d?.weather?.[0]?.description) return;
        setTip(`Clima en ${city}: ${Math.round(d.main.temp)}°C, ${d.weather[0].description}`);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{marginTop:24,padding:12,border:'1px solid #ddd',borderRadius:8}}>
      <strong>Motivación del día</strong>
      <div>{tip}</div>
    </div>
  );
}
