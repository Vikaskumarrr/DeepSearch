import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    const envStatus = {
      portia: !!process.env.PORTIA_API_KEY,
      openRouter: !!process.env.OPENROUTER_API_KEY,
      gemini: !!process.env.GOOGLE_GEMINI_API_KEY,
      googleSearch: !!(process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_SEARCH_ENGINE_ID)
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: envStatus,
      message: 'DeepSearch is running successfully!'
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
