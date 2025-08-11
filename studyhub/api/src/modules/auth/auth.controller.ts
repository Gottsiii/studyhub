import { Request, Response } from 'express';
import { pool } from '../../db/pool';
import bcrypt from 'bcryptjs';
import { signJWT } from '../../utils/jwt';
export async function register(req:Request,res:Response){
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error:'email and password required' });
  const hash = await bcrypt.hash(password,10);
  try{
    const { rows } = await pool.query(
      'INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id,email,created_at',
      [email, hash]
    );
    const user = rows[0];
    const token = signJWT({ sub: user.id, email: user.email });
    res.json({ token, user });
  }catch(e:any){
    if(e.code === '23505') return res.status(409).json({ error:'Email already exists' });
    throw e;
  }
}
export async function login(req:Request,res:Response){
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
  const user = rows[0];
  if(!user) return res.status(401).json({ error:'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if(!ok) return res.status(401).json({ error:'Invalid credentials' });
  const token = signJWT({ sub: user.id, email: user.email });
  res.json({ token, user:{ id:user.id, email:user.email, created_at:user.created_at } });
}
export async function me(_req:Request,res:Response){ res.json({ ok:true }); }
