import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// For demo purposes, we'll use mock data if no real credentials
const isDemo = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  user_id: string
  email: string
  full_name: string
  avatar_url?: string
  year_of_study: number
  branch: string
  bio?: string
  role: 'student' | 'mentor' | 'admin'
  is_available_as_mentor: boolean
  response_time_minutes: number
  rating: number
  total_ratings: number
  students_helped: number
  created_at: string
  updated_at: string
}

export interface Subject {
  id: string
  name: string
  code?: string
  description?: string
  category?: string
  created_at: string
}

export interface Resource {
  id: string
  title: string
  description?: string
  subject_id: string
  type: 'notes' | 'assignment' | 'project' | 'lab' | 'reference'
  file_url?: string
  file_size?: string
  uploaded_by: string
  downloads: number
  views: number
  rating: number
  total_ratings: number
  tags: string[]
  is_verified: boolean
  created_at: string
  updated_at: string
  subjects?: Subject
  profiles?: Profile
}

export interface ChatSession {
  id: string
  user_id: string
  title?: string
  subject_id?: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  content: string
  is_user: boolean
  created_at: string
}

export interface MentorRequest {
  id: string
  student_id: string
  mentor_id: string
  subject_id?: string
  message?: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  created_at: string
  updated_at: string
}

// Auth helpers
export const signUp = async (email: string, password: string, userData: {
  full_name: string
  year_of_study: number
  branch: string
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Profile helpers
export const createProfile = async (profileData: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single()
  
  return { data, error }
}

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Subject helpers
export const getSubjects = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('name')
  
  return { data, error }
}

// Resource helpers
export const getResources = async (filters?: {
  subject_id?: string
  type?: string
  search?: string
}) => {
  let query = supabase
    .from('resources')
    .select(`
      *,
      subjects(name, code),
      profiles(full_name)
    `)
    .order('created_at', { ascending: false })

  if (filters?.subject_id) {
    query = query.eq('subject_id', filters.subject_id)
  }

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
  return { data, error }
}

export const downloadResource = async (resourceId: string) => {
  // Increment download count
  const { error: updateError } = await supabase.rpc('increment_downloads', {
    resource_id: resourceId
  })

  if (updateError) {
    console.error('Error updating download count:', updateError)
  }

  // Record download for user
  const { data: user } = await supabase.auth.getUser()
  if (user.user) {
    const { data: profile } = await getProfile(user.user.id)
    if (profile) {
      await supabase
        .from('resource_downloads')
        .insert({
          resource_id: resourceId,
          user_id: profile.id
        })
    }
  }
}

// Chat helpers
export const createChatSession = async (subjectId?: string) => {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('Not authenticated')

  const { data: profile } = await getProfile(user.user.id)
  if (!profile) throw new Error('Profile not found')

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      user_id: profile.id,
      subject_id: subjectId
    })
    .select()
    .single()

  return { data, error }
}

export const getChatMessages = async (sessionId: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at')

  return { data, error }
}

export const addChatMessage = async (sessionId: string, content: string, isUser: boolean) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      content,
      is_user: isUser
    })
    .select()
    .single()

  return { data, error }
}

// Mentor helpers
export const getMentors = async (filters?: {
  subject_id?: string
  year_preference?: number
}) => {
  let query = supabase
    .from('profiles')
    .select(`
      *,
      mentor_subjects!inner(
        expertise_level,
        subjects(name, code)
      )
    `)
    .eq('is_available_as_mentor', true)

  if (filters?.subject_id) {
    query = query.eq('mentor_subjects.subject_id', filters.subject_id)
  }

  if (filters?.year_preference) {
    query = query.gte('year_of_study', filters.year_preference)
  }

  query = query.order('rating', { ascending: false })

  const { data, error } = await query
  return { data, error }
}

export const createMentorRequest = async (mentorId: string, subjectId?: string, message?: string) => {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('Not authenticated')

  const { data: profile } = await getProfile(user.user.id)
  if (!profile) throw new Error('Profile not found')

  const { data, error } = await supabase
    .from('mentor_requests')
    .insert({
      student_id: profile.id,
      mentor_id: mentorId,
      subject_id: subjectId,
      message
    })
    .select()
    .single()

  return { data, error }
}