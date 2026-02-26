import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, sessionId, subject } = await req.json()

    // Get Gemini API key from environment
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Prepare the prompt with academic context
    const academicPrompt = `You are an AI academic assistant for college students. You specialize in helping with academic doubts and questions. 
    
Context: The student is asking about ${subject || 'general academic topics'}.

Student Question: ${message}

Please provide a helpful, accurate, and educational response. If the question is about a specific subject, provide detailed explanations with examples where appropriate. If you need more context, ask clarifying questions.

Keep your response concise but comprehensive, and always encourage learning.`

    // Try Gemini models with fallback
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']
    let geminiResponse: Response | null = null
    let geminiData: any = null

    for (const model of models) {
      try {
        geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: academicPrompt
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              },
            }),
          }
        )

        if (geminiResponse.ok) {
          geminiData = await geminiResponse.json()
          console.log(`Successfully used model: ${model}`)
          break
        }
      } catch (err) {
        console.log(`Model ${model} failed, trying next...`)
        continue
      }
    }

    if (!geminiData) {
      throw new Error('All Gemini models failed. Please check your API key.')
    }

    const aiResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
                      "I'm sorry, I couldn't generate a response. Please try rephrasing your question."

    // Return the AI response
    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        sessionId: sessionId 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in gemini-chat function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})