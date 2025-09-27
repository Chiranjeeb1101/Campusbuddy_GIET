import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db, nextId, UserRecord } from './db.js';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export interface JwtPayload {
  userId: number;
  email: string;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function authMiddleware(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = auth.substring('Bearer '.length);
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function findUserByEmail(email: string) {
  return db.data.users.find(u => u.email === email) || null;
}

export function createUser(name: string, email: string, password: string) {
  const password_hash = bcrypt.hashSync(password, 10);
  const user: UserRecord = {
    id: nextId(),
    name,
    email,
    password_hash,
    created_at: new Date().toISOString(),
  };
  db.data.users.push(user);
  db.write();
  return { id: user.id, name: user.name, email: user.email };
}

export function verifyUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  const ok = bcrypt.compareSync(password, user.password_hash);
  return ok ? user : null;
}
