import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test 1: Check Prisma import
    const prismaModule = await import('@/lib/prisma')
    const prismaStatus = prismaModule ? 'OK' : 'MISSING'

    // Test 2: Check database
    let dbStatus = 'UNKNOWN'
    try {
      const prisma = await prismaModule.prisma
      const count = await prisma.product.count()
      dbStatus = `✅ Connected - ${count} products in database`
    } catch (dbError) {
      dbStatus = `❌ Error: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`
    }

    // Test 3: Check environment
    const dbUrl = process.env.DATABASE_URL ? `✅ Set (${process.env.DATABASE_URL.substring(0, 20)}...)` : '❌ Not set'

    return NextResponse.json(
      {
        status: 'DIAGNOSTIC',
        date: new Date().toISOString(),
        tests: {
          prismaImport: prismaStatus,
          database: dbStatus,
          DATABASE_URL: dbUrl,
          nodeEnv: process.env.NODE_ENV,
          platform: process.platform,
        },
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 'ERROR',
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
