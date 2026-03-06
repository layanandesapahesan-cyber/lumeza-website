import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body as {
      name: string
      email: string
      subject: string
      message: string
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    if (name.length < 3 || message.length < 20) {
      return NextResponse.json(
        { error: 'Nama minimal 3 karakter dan pesan minimal 20 karakter' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email tidak valid' },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, just log the data
    console.log('New contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // In a real app, you would send an email here
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: process.env.CONTACT_EMAIL,
    //   from: process.env.SENDGRID_FROM_EMAIL,
    //   subject: `New Contact Form: ${subject}`,
    //   text: message,
    //   replyTo: email,
    // })

    return NextResponse.json(
      { message: 'Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim pesan' },
      { status: 500 }
    )
  }
}
