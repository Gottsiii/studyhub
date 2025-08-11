import { Request, Response } from 'express';
import { pool } from '../../db/pool';

export async function list(req: Request, res: Response) {
  const userId = (req as any).user.sub;
  const { rows } = await pool.query('SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC', [userId]);
  res.json(rows);
}

export async function create(req: Request, res: Response) {
  const userId = (req as any).user.sub;
  const { title } = req.body as { title?: string };
  if (!title) return res.status(400).json({ error: 'title required' });
  const { rows } = await pool.query(
    'INSERT INTO tasks(user_id,title) VALUES($1,$2) RETURNING *',
    [userId, title]
  );
  res.status(201).json(rows[0]);
}

export async function update(req: Request, res: Response) {
  const userId = (req as any).user.sub;
  const id = Number(req.params.id);
  const { title, done } = req.body as { title?: string; done?: boolean };

  const { rows } = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         done  = COALESCE($2, done)
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title ?? null, typeof done === 'boolean' ? done : null, id, userId]
  );

  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
}

export async function remove(req: Request, res: Response) {
  const userId = (req as any).user.sub;
  const id = Number(req.params.id);
  await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [id, userId]);
  res.status(204).end();
}
