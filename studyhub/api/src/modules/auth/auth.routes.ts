import { Router } from 'express';
import * as ctrl from './auth.controller';
const r = Router();
r.post('/register', ctrl.register);
r.post('/login', ctrl.login);
r.get('/me', ctrl.me);
export default r;
