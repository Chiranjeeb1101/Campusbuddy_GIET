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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const subjectId = formData.get('subjectId') as string
    const type = formData.get('type') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')

    if (!file || !title || !subjectId || !type) {
      throw new Error('Missing required fields')
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      throw new Error('User profile not found')
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `resources/${fileName}`

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('resources')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data: urlData } = supabaseClient.storage
      .from('resources')
      .getPublicUrl(filePath)

    // Calculate file size
    const fileSize = file.size < 1024 * 1024 
      ? `${Math.round(file.size / 1024)} KB`
      : `${Math.round(file.size / (1024 * 1024) * 10) / 10} MB`

    // Insert resource record
    const { data: resource, error: insertError } = await supabaseClient
      .from('resources')
      .insert({
        title,
        description,
        subject_id: subjectId,
        type,
        file_url: urlData.publicUrl,
        file_size: fileSize,
        uploaded_by: profile.id,
        tags
      })
      .select()
      .single()

    if (insertError) {
      // Clean up uploaded file if database insert fails
      await supabaseClient.storage
        .from('resources')
        .remove([filePath])
      
      throw insertError
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        resource: resource
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in upload-resource function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to upload resource',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})