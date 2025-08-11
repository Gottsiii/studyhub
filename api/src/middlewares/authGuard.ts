import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
export function authGuard(req:Request,res:Response,next:NextFunction){
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  try{ (req as any).user = verifyJWT(token); next(); }
  catch{ res.status(401).json({error:'Unauthorized'}); }
}
