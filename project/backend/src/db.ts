import { JSONFilePreset } from 'lowdb/node';

export interface UserRecord {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  created_at: string;
}

export interface AlumniRecord {
  id: number;
  name: string;
  batch?: string;
  role?: string;
  company?: string;
  location?: string;
  user_id?: number;
}

export interface EventRecord {
  id: number;
  title: string;
  date: string;
  location?: string;
  type?: string;
}

export interface MentorshipRecord {
  id: number;
  mentor_name: string;
  expertise?: string;
  availability?: string;
}

export interface DonationRecord {
  id: number;
  amount: number;
  label?: string;
  donor_user_id?: number;
  created_at: string;
}

export interface CareerRecord {
  id: number;
  title: string;
  company?: string;
  location?: string;
  type?: string;
  referral?: boolean;
}

export interface DbSchema {
  users: UserRecord[];
  alumni: AlumniRecord[];
  events: EventRecord[];
  mentorship: MentorshipRecord[];
  donations: DonationRecord[];
  careers: CareerRecord[];
  seq: number;
}

export const db = await JSONFilePreset<DbSchema>('campusbuddy.json', {
  users: [],
  alumni: [],
  events: [],
  mentorship: [],
  donations: [],
  careers: [],
  seq: 0,
});

export function nextId() {
  db.data.seq += 1;
  return db.data.seq;
}
