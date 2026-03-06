import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { sendEmail, generateDownloadEmailHtml } from '@/lib/resend'

interface DownloadRequest {
  productId: string
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const { prisma: prismaPromise } = await import('@/lib/prisma')
    const prisma = await prismaPromise
    const body: DownloadRequest = await request.json()
    const { productId, email } = body

    // Validate input
    if (!productId || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID and email are required',
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, fileUrl: true },
    })

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      )
    }

    // Generate unique download token
    const downloadToken = randomBytes(32).toString('hex')

    // Set expiration to 24 hours from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    // Save download request to database
    await prisma.download.create({
      data: {
        productId,
        email,
        downloadToken,
        expiresAt,
      },
    })

    // Generate download URL
    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/download/${downloadToken}`

    // Send email with download link
    const emailHtml = generateDownloadEmailHtml(product.name, downloadUrl, '24 jam')
    const emailResult = await sendEmail({
      to: email,
      subject: `Link Download untuk ${product.name}`,
      html: emailHtml,
    })

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error)
      // Don't fail the request if email fails, but log it
      // In production, you might want to implement a retry mechanism
    }

    console.log('📧 Download email sent to:', email)

    return NextResponse.json(
      {
        success: true,
        message: 'Download link has been sent to your email',
        data: {
          email,
          expiresIn: '24 hours',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error creating download request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create download request',
      },
      { status: 500 }
    )
  }
}