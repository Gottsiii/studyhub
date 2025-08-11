import request from 'supertest';
import app from '../src/app';
describe('Auth routes', () => {
  it('GET /api/tasks without token -> 401', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
  });
});
