import 'dotenv/config';
import app from './app';
import { ensureDb } from './db/pool';
const PORT = process.env.PORT || 8080;
ensureDb().then(()=>{
  app.listen(PORT, ()=>console.log(`API listening on http://localhost:${PORT}`));
}).catch(err=>{ console.error('Failed to init DB', err); process.exit(1); });
