'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Oops! Ada Kesalahan
          </h1>

          {/* Error Message */}
          <p className="text-gray-600 text-center mb-6">
            {error?.message ||
              'Terjadi kesalahan yang tidak terduga. Silakan coba lagi atau hubungi tim support kami.'}
          </p>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === 'development' && error?.digest && (
            <div className="bg-gray-100 rounded p-3 mb-6 text-xs text-gray-700 break-words">
              Error ID: {error.digest}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Coba Lagi
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Beranda
            </button>
          </div>

          {/* Support Link */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Butuh bantuan?{' '}
              <a
                href="/kontak"
                className="text-indigo-600 hover:underline font-medium"
              >
                Hubungi kami
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
