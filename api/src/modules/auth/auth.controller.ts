import { Request, Response } from 'express';
import { pool } from '../../db/pool';
import bcrypt from 'bcryptjs';
import { signJWT } from '../../utils/jwt';

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const hash = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      'INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id,email,created_at',
      [email, hash]
    );

    const user = rows[0];
    const token = signJWT({ sub: user.id, email: user.email });
    return res.json({ token, user });
  } catch (e: any) {
    // 23505 = unique_violation (email duplicado)
    if (e?.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Register error:', e);
    return res.status(500).json({ error: 'DB error' }); // <- no tiramos el proceso
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signJWT({ sub: user.id, email: user.email });
    return res.json({ token, user: { id: user.id, email: user.email, created_at: user.created_at } });
  } catch (e) {
    console.error('Login error:', e);
    return res.status(500).json({ error: 'DB error' });
  }
}

export async function me(_req: Request, res: Response) {
  return res.json({ ok: true });
}
