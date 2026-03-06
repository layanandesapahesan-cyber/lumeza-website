import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test without any imports
    return NextResponse.json({
      success: true,
      message: 'API is working without imports',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Test API failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}