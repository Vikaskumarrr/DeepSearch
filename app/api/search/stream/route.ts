import { NextRequest } from 'next/server'
import { portiaAI } from '@/lib/portia-ai'
import { webSearch } from '@/lib/web-search'
import { prisma } from '@/lib/db/prisma'
import { SearchRequest } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json()
    const { query, conversationId } = body

    if (!query || query.trim().length === 0) {
      return new Response('Query is required', { status: 400 })
    }

    // Debug: Log environment variables (remove in production)
    console.log('Environment check:')
    console.log('- PORTIA_API_KEY exists:', !!process.env.PORTIA_API_KEY)
    console.log('- PORTIA_API_KEY length:', process.env.PORTIA_API_KEY?.length || 0)

    // Step 1: Processing query directly with AI (no search)
    console.log('Step 1: Processing query directly with AI (no search):', query)

            // Step 2: Generate PARALLEL AI response using ALL providers simultaneously
        let aiResponse
        try {
          console.log('Step 2: Generating PARALLEL AI response with ALL providers')
          aiResponse = await portiaAI.generateComprehensiveResponse(query, []) // Empty array = no search results
          console.log('✅ PARALLEL AI response generated successfully')
        } catch (aiError) {
          console.error('❌ PARALLEL AI processing error:', aiError)
          console.log('🔄 Falling back to enhanced mock response')
          aiResponse = portiaAI.generateEnhancedMockResponse(query, '')
        }

    // Step 3: Stream the AI response
    console.log('Step 3: Streaming AI response to client')
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Stream the AI response content
          const words = aiResponse.content.split(' ')
          
          for (const word of words) {
            await new Promise(resolve => setTimeout(resolve, 30)) // Smooth streaming
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: word + ' ' })}\n\n`))
          }
          
          // Send sources if available
          if (aiResponse.sources && aiResponse.sources.length > 0) {
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ sources: aiResponse.sources, done: true })}\n\n`))
          } else {
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ sources: [], done: true })}\n\n`))
          }
          
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Streaming search API error:', error)
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
