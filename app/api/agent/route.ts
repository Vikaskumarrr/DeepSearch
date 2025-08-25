import { NextRequest, NextResponse } from 'next/server'
import { PortiaAIClient } from '@/lib/portia-ai'

export async function POST(request: NextRequest) {
  try {
    const { emails, task, action } = await request.json()
    
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Emails array is required and must contain at least one email' },
        { status: 400 }
      )
    }

    if (!task || typeof task !== 'string') {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      )
    }

    console.log('🤖 Agent request received:', { 
      emailCount: emails.length, 
      task, 
      action: action || 'process' 
    })

    // Initialize PortiaAI client
    const portiaAI = new PortiaAIClient()

    let result: string

    // Process based on action type
    switch (action) {
      case 'summarize':
        console.log('📝 Generating email summary...')
        result = await portiaAI.processEmailContent(emails, task)
        break
        
      case 'podcast':
        console.log('🎙️ Generating podcast script...')
        result = await portiaAI.processEmailContent(emails, `Create a podcast script based on: ${task}`)
        break
        
      case 'ai-news':
        console.log('🤖 Generating AI news summary...')
        result = await portiaAI.processEmailContent(emails, `Summarize AI-related content from: ${task}`)
        break
        
      default:
        console.log('🔄 Processing emails with general analysis...')
        result = await portiaAI.processEmailContent(emails, task)
    }

    console.log('✅ Agent processing completed successfully')

    return NextResponse.json({
      success: true,
      result,
      metadata: {
        emailsProcessed: emails.length,
        task,
        action: action || 'process',
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Agent processing error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process agent request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Agent API - Use POST with emails, task, and action parameters',
    availableActions: [
      'summarize - Generate email summaries',
      'podcast - Create podcast scripts',
      'ai-news - Generate AI news summaries',
      'process - General email analysis'
    ],
    exampleRequest: {
      emails: ['email1 content', 'email2 content'],
      task: 'Summarize the key points from these emails',
      action: 'summarize'
    }
  })
}
