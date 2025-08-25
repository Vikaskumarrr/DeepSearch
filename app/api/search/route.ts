import { NextRequest, NextResponse } from 'next/server'
import { portiaAI } from '@/lib/portia-ai'
import { webSearch } from '@/lib/web-search'
import { prisma } from '@/lib/db/prisma'
import { SearchRequest, SearchResponse, Source } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json()
    const { query, conversationId } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cachedResponse = await prisma.searchCache.findFirst({
      where: {
        query: query.toLowerCase().trim(),
        expiresAt: { gt: new Date() }
      }
    })

    if (cachedResponse) {
      return NextResponse.json(cachedResponse.response as unknown as SearchResponse)
    }

    // NEW FLOW: Skip Google search, go directly to AI processing
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

    // Generate related questions
    const relatedQuestions = [
      `What are the latest developments in ${query}?`,
      `How does ${query} compare to alternatives?`,
      `What are the benefits and challenges of ${query}?`,
      `How is ${query} evolving in the current market?`
    ]

    // Transform AI response sources to Source format
    const sources: Source[] = (aiResponse.sources || []).map((source: any) => ({
      url: typeof source === 'string' ? source : source.url,
      title: typeof source === 'string' ? 'Search Result' : (source.title || 'Search Result'),
      description: typeof source === 'string' ? 'Additional resource' : (source.description || 'Additional resource'),
      favicon: typeof source === 'string' ? undefined : source.favicon
    }))

    const response: SearchResponse = {
      answer: aiResponse.content,
      sources,
      relatedQuestions,
      conversationId
    }

    // Cache the response
    try {
      await prisma.searchCache.create({
        data: {
          query: query.toLowerCase().trim(),
          response: response as any,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        }
      })
    } catch (cacheError) {
      console.error('Cache error:', cacheError)
      // Continue even if caching fails
    }

    // Save to conversation if conversationId is provided
    if (conversationId) {
      try {
        await prisma.message.create({
          data: {
            conversationId,
            role: 'user',
            content: query
          }
        })

        await prisma.message.create({
          data: {
            conversationId,
            role: 'assistant',
            content: aiResponse.content,
            sources: sources as any
          }
        })
      } catch (dbError) {
        console.error('Database error:', dbError)
        // Continue even if database save fails
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
