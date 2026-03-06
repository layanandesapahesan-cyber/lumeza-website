'use client'

import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function TestEmailPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTestEmail = async () => {
    if (!email) {
      toast.error('Masukkan email terlebih dahulu')
      return
    }

    setIsLoading(true)

    try {
      // Test dengan produk pertama dari database
      const response = await fetch('/api/download/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: '1', // ID produk pertama
          email: email,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Email berhasil dikirim! Cek inbox Anda.')
        setEmail('')
      } else {
        toast.error(result.error || 'Gagal mengirim email')
      }
    } catch (error) {
      console.error('Test email error:', error)
      toast.error('Terjadi kesalahan saat mengirim email')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          🧪 Test Email Service
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Test
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleTestEmail}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Mengirim...
              </>
            ) : (
              '📧 Kirim Email Test'
            )}
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Cara Testing:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Masukkan email Anda</li>
            <li>2. Klik "Kirim Email Test"</li>
            <li>3. Cek inbox email Anda</li>
            <li>4. Klik link download yang dikirim</li>
          </ol>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>⚠️ Pastikan RESEND_API_KEY sudah diatur di .env.local</p>
          <p>📧 Email akan dikirim dari: {process.env.NEXT_PUBLIC_FROM_EMAIL || 'noreply@lumeza.com'}</p>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  )
}