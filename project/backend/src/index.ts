import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db, nextId, AlumniRecord, EventRecord, MentorshipRecord, DonationRecord, CareerRecord } from './db.js';
import { authMiddleware, createUser, signToken, verifyUser } from './auth.js';
import { z } from 'zod';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth
const RegisterBody = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });
app.post('/auth/register', async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { name, email, password } = parsed.data;
  const existing = db.data.users.find(u => u.email === email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });
  const user = createUser(name, email, password);
  const token = signToken({ userId: user.id, email: user.email });
  return res.json({ token, user });
});

const LoginBody = z.object({ email: z.string().email(), password: z.string().min(6) });
app.post('/auth/login', (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { email, password } = parsed.data;
  const user = verifyUser(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken({ userId: user.id, email: user.email });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/auth/me', authMiddleware, (req, res) => {
  // @ts-ignore
  const userId = req.user!.userId;
  const user = db.data.users.find(u => u.id === userId);
  return res.json({ user: user ? { id: user.id, name: user.name, email: user.email, created_at: user.created_at } : null });
});

// Alumni
app.get('/alumni', (_req, res) => {
  res.json(db.data.alumni);
});

app.post('/alumni', authMiddleware, (req, res) => {
  const Body = z.object({ name: z.string(), batch: z.string().optional(), role: z.string().optional(), company: z.string().optional(), location: z.string().optional() });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  // @ts-ignore
  const userId = req.user!.userId;
  const record: AlumniRecord = { id: nextId(), user_id: userId, ...parsed.data };
  db.data.alumni.push(record);
  db.write();
  res.json(record);
});

// Events
app.get('/events', (_req, res) => {
  const rows = [...db.data.events].sort((a, b) => b.date.localeCompare(a.date));
  res.json(rows);
});

app.post('/events', authMiddleware, (req, res) => {
  const Body = z.object({ title: z.string(), date: z.string(), location: z.string().optional(), type: z.string().optional() });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const record: EventRecord = { id: nextId(), ...parsed.data };
  db.data.events.push(record);
  db.write();
  res.json(record);
});

// Mentorship
app.get('/mentorship', (_req, res) => {
  res.json(db.data.mentorship);
});

app.post('/mentorship', authMiddleware, (req, res) => {
  const Body = z.object({ mentor_name: z.string(), expertise: z.string().optional(), availability: z.string().optional() });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const record: MentorshipRecord = { id: nextId(), ...parsed.data };
  db.data.mentorship.push(record);
  db.write();
  res.json(record);
});

// Donations
app.get('/donations', authMiddleware, (_req, res) => {
  res.json(db.data.donations);
});

app.post('/donations', authMiddleware, (req, res) => {
  const Body = z.object({ amount: z.number().int().positive(), label: z.string().optional() });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  // @ts-ignore
  const userId = req.user!.userId;
  const record: DonationRecord = { id: nextId(), donor_user_id: userId, created_at: new Date().toISOString(), ...parsed.data };
  db.data.donations.push(record);
  db.write();
  res.json(record);
});

// Careers
app.get('/careers', (_req, res) => {
  res.json(db.data.careers);
});

app.post('/careers', authMiddleware, (req, res) => {
  const Body = z.object({ title: z.string(), company: z.string().optional(), location: z.string().optional(), type: z.string().optional(), referral: z.boolean().optional() });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const record: CareerRecord = { id: nextId(), ...parsed.data };
  db.data.careers.push(record);
  db.write();
  res.json(record);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
