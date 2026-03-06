import { Resend } from 'resend'

let resend: Resend | null = null

function getResendClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required')
    }
    resend = new Resend(apiKey)
  }
  return resend
}

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailData) {
  try {
    const resendClient = getResendClient()
    const fromEmail = from || process.env.NEXT_PUBLIC_FROM_EMAIL || 'noreply@lumeza.com'

    const result = await resendClient.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
    })

    console.log('Email sent successfully:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export function generateDownloadEmailHtml(productName: string, downloadUrl: string, expiresIn: string) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Link Download ${productName}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Download Siap!</h1>
          <p>Link download produk Anda sudah tersedia</p>
        </div>

        <div class="content">
          <h2>Halo!</h2>
          <p>Terima kasih telah memilih produk dari <strong>Lumeza Creative Studio</strong>.</p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3>📦 Produk: ${productName}</h3>
            <p>Silakan klik tombol di bawah untuk mengunduh file Anda:</p>
            <a href="${downloadUrl}" class="button">⬇️ Download Sekarang</a>
          </div>

          <div class="warning">
            <strong>⚠️ Penting:</strong>
            <ul>
              <li>Link download akan expired dalam <strong>${expiresIn}</strong></li>
              <li>Pastikan untuk menyimpan file setelah diunduh</li>
              <li>Jika ada masalah, hubungi support@lumeza.com</li>
            </ul>
          </div>

          <p>Jika tombol tidak berfungsi, copy dan paste link berikut ke browser Anda:</p>
          <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace;">
            ${downloadUrl}
          </p>

          <p>Terima kasih telah menggunakan layanan kami! 🚀</p>
          <p>Salam,<br><strong>Tim Lumeza Creative Studio</strong></p>
        </div>

        <div class="footer">
          <p>© 2024 Lumeza Creative Studio. All rights reserved.</p>
          <p>Jika Anda tidak meminta email ini, silakan abaikan.</p>
        </div>
      </div>
    </body>
    </html>
  `
}