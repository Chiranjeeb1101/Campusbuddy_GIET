import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, Profile, getProfile, createProfile } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [demoUser, setDemoUser] = useState<User | null>(null)

  useEffect(() => {
    // For demo purposes, skip loading if no real Supabase connection
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl.includes('demo')) {
      setLoading(false)
      return
    }

    // Set loading to false after a short delay only as a fallback
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [])

  const loadProfile = async (userId: string) => {
    try {
      const { data: existingProfile, error } = await getProfile(userId)

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const user = await supabase.auth.getUser()
        if (user.data.user) {
          const { data: newProfile, error: createError } = await createProfile({
            user_id: userId,
            email: user.data.user.email!,
            full_name: user.data.user.user_metadata?.full_name || 'New User',
            year_of_study: user.data.user.user_metadata?.year_of_study || 1,
            branch: user.data.user.user_metadata?.branch || 'Computer Science',
            role: 'student'
          })

          if (createError) {
            console.error('Error creating profile:', createError)
          } else {
            setProfile(newProfile)
          }
        }
      } else if (existingProfile) {
        setProfile(existingProfile)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user: user || demoUser,
    profile,
    loading,
    isAuthenticated: !!user || !!demoUser,
    refreshProfile: () => user && loadProfile(user.id),
    setDemoUser
  }
}