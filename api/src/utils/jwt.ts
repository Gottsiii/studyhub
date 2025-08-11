import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export function signJWT(payload: object, expiresIn: string | number = '7d') {
  // Tipado relajado para evitar conflictos de overload en jsonwebtoken v9
  return jwt.sign(payload as any, config.jwtSecret as any, { expiresIn } as any);
}

export function verifyJWT(token: string) {
  return jwt.verify(token, config.jwtSecret as any) as jwt.JwtPayload;
}
