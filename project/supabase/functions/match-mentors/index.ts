import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { subjectId, yearPreference, expertiseLevel } = await req.json()

    // Build the query to find matching mentors
    let query = supabaseClient
      .from('profiles')
      .select(`
        *,
        mentor_subjects!inner(
          expertise_level,
          subjects(name, code)
        )
      `)
      .eq('is_available_as_mentor', true)
      .eq('mentor_subjects.subject_id', subjectId)

    // Add year preference filter if specified
    if (yearPreference) {
      query = query.gte('year_of_study', yearPreference)
    }

    // Add expertise level filter if specified
    if (expertiseLevel) {
      query = query.gte('mentor_subjects.expertise_level', expertiseLevel)
    }

    // Order by rating and response time
    query = query.order('rating', { ascending: false })
                 .order('response_time_minutes', { ascending: true })

    const { data: mentors, error } = await query

    if (error) {
      throw error
    }

    // Calculate match scores based on various factors
    const scoredMentors = mentors.map(mentor => {
      let score = 0
      
      // Rating score (0-50 points)
      score += (mentor.rating / 5) * 50
      
      // Response time score (0-30 points, faster = better)
      const maxResponseTime = 240 // 4 hours
      score += Math.max(0, (maxResponseTime - mentor.response_time_minutes) / maxResponseTime) * 30
      
      // Experience score (0-20 points)
      score += Math.min(mentor.students_helped / 100, 1) * 20
      
      return {
        ...mentor,
        matchScore: Math.round(score)
      }
    })

    // Sort by match score
    scoredMentors.sort((a, b) => b.matchScore - a.matchScore)

    return new Response(
      JSON.stringify({ mentors: scoredMentors }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in match-mentors function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to match mentors',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})