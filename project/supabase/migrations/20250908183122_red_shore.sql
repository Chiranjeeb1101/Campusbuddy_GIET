/*
  # CampusBuddy Initial Database Schema

  1. New Tables
    - `profiles` - User profiles with academic information
    - `subjects` - Available subjects/courses
    - `mentors` - Mentor profiles and availability
    - `mentor_subjects` - Many-to-many relationship between mentors and subjects
    - `resources` - Academic resources shared by users
    - `resource_downloads` - Track resource downloads
    - `chat_sessions` - AI chat sessions
    - `chat_messages` - Individual messages in chat sessions
    - `mentor_requests` - Connection requests between students and mentors
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access based on user roles and ownership

  3. Features
    - User profiles with academic details
    - Mentor matching system
    - Resource sharing with ratings
    - AI chat history
    - Notification system
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'mentor', 'admin');
CREATE TYPE resource_type AS ENUM ('notes', 'assignment', 'project', 'lab', 'reference');
CREATE TYPE request_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');
CREATE TYPE notification_type AS ENUM ('mentor_request', 'resource_shared', 'chat_response', 'system');

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  year_of_study integer CHECK (year_of_study >= 1 AND year_of_study <= 4),
  branch text NOT NULL,
  bio text,
  role user_role DEFAULT 'student',
  is_available_as_mentor boolean DEFAULT false,
  response_time_minutes integer DEFAULT 60,
  rating numeric(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  total_ratings integer DEFAULT 0,
  students_helped integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  code text,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Mentor subjects (many-to-many)
CREATE TABLE IF NOT EXISTS mentor_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  expertise_level integer CHECK (expertise_level >= 1 AND expertise_level <= 5) DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  UNIQUE(mentor_id, subject_id)
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid REFERENCES subjects(id),
  type resource_type NOT NULL,
  file_url text,
  file_size text,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  downloads integer DEFAULT 0,
  views integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  total_ratings integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resource downloads tracking
CREATE TABLE IF NOT EXISTS resource_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  downloaded_at timestamptz DEFAULT now(),
  UNIQUE(resource_id, user_id)
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text,
  subject_id uuid REFERENCES subjects(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_user boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Mentor requests
CREATE TABLE IF NOT EXISTS mentor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  mentor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id),
  message text,
  status request_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, mentor_id, subject_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text,
  data jsonb DEFAULT '{}',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Subjects policies (read-only for most users)
CREATE POLICY "Anyone can read subjects"
  ON subjects FOR SELECT
  TO authenticated
  USING (true);

-- Mentor subjects policies
CREATE POLICY "Anyone can read mentor subjects"
  ON mentor_subjects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Mentors can manage their subjects"
  ON mentor_subjects FOR ALL
  TO authenticated
  USING (mentor_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Resources policies
CREATE POLICY "Anyone can read resources"
  ON resources FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (uploaded_by IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Resource downloads policies
CREATE POLICY "Users can read own downloads"
  ON resource_downloads FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own downloads"
  ON resource_downloads FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Chat sessions policies
CREATE POLICY "Users can manage own chat sessions"
  ON chat_sessions FOR ALL
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Chat messages policies
CREATE POLICY "Users can read messages from own sessions"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (session_id IN (
    SELECT id FROM chat_sessions 
    WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  ));

CREATE POLICY "Users can insert messages to own sessions"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (session_id IN (
    SELECT id FROM chat_sessions 
    WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  ));

-- Mentor requests policies
CREATE POLICY "Users can read own mentor requests"
  ON mentor_requests FOR SELECT
  TO authenticated
  USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
    mentor_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Students can create mentor requests"
  ON mentor_requests FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Mentors can update requests to them"
  ON mentor_requests FOR UPDATE
  TO authenticated
  USING (mentor_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Insert sample subjects
INSERT INTO subjects (name, code, description, category) VALUES
('Computer Science', 'CS', 'Programming, algorithms, data structures', 'Engineering'),
('Database Systems', 'DBMS', 'Database design, SQL, normalization', 'Engineering'),
('Data Structures', 'DS', 'Arrays, trees, graphs, algorithms', 'Engineering'),
('Machine Learning', 'ML', 'AI, neural networks, data science', 'Engineering'),
('Web Development', 'WD', 'HTML, CSS, JavaScript, frameworks', 'Engineering'),
('Mathematics', 'MATH', 'Calculus, algebra, statistics', 'Science'),
('Physics', 'PHY', 'Mechanics, thermodynamics, optics', 'Science'),
('Software Engineering', 'SE', 'SDLC, testing, project management', 'Engineering'),
('Operating Systems', 'OS', 'Process management, memory, file systems', 'Engineering'),
('Computer Networks', 'CN', 'TCP/IP, routing, network security', 'Engineering');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_mentor_subjects_mentor_id ON mentor_subjects(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_subjects_subject_id ON mentor_subjects(subject_id);
CREATE INDEX IF NOT EXISTS idx_resources_subject_id ON resources(subject_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_uploaded_by ON resources(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_student_id ON mentor_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_mentor_id ON mentor_requests(mentor_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentor_requests_updated_at BEFORE UPDATE ON mentor_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();