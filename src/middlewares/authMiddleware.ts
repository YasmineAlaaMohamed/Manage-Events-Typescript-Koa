import { Context, Next } from 'koa'; 
import jwt, {sign } from 'jsonwebtoken';

import { verifyToken } from '../functions/create-token'; 
export async function authenticate(ctx: Context, next: Next) { 
  const token = ctx.request.headers.authorization?.split(' ')[1]; 
  if (!token) { ctx.throw(401, 'Unauthorized'); } try { 
    const decoded = jwt.verify(token, 'YYGGGGGGGGGGG'); ctx.state.user = decoded; 
  } 
    catch (error) { ctx.throw(401, 'Invalid token'); } await next(); 
  };