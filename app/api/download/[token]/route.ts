import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  token: string
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { prisma: prismaPromise } = await import('@/lib/prisma')
    const prisma = await prismaPromise
    const { token } = await params

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Download token is required',
        },
        { status: 400 }
      )
    }

    // Find download record by token
    const download = await prisma.download.findUnique({
      where: { downloadToken: token },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            fileUrl: true,
            downloads: true,
          },
        },
      },
    })

    if (!download) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid download token',
        },
        { status: 404 }
      )
    }

    // Check if token has expired
    const now = new Date()
    if (now > download.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Download link has expired',
        },
        { status: 410 } // Gone
      )
    }

    // Check if already downloaded
    if (download.downloaded) {
      return NextResponse.json(
        {
          success: false,
          error: 'This download link has already been used',
        },
        { status: 410 }
      )
    }

    // Mark as downloaded and increment product download count
    await prisma.$transaction([
      prisma.download.update({
        where: { id: download.id },
        data: { downloaded: true },
      }),
      prisma.product.update({
        where: { id: download.productId },
        data: { downloads: { increment: 1 } },
      }),
    ])

    // Redirect to file URL
    return NextResponse.redirect(download.product.fileUrl)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error processing download:', errorMessage)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process download',
      },
      { status: 500 }
    )
  }
}