'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Product } from '@/lib/types/product'

interface DownloadModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

interface DownloadFormData {
  email: string
}

export function DownloadModal({ product, isOpen, onClose }: DownloadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DownloadFormData>()

  const onSubmit = async (data: DownloadFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/download/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          email: data.email,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        toast.success('Link download telah dikirim ke email Anda!')
        reset()
      } else {
        toast.error(result.error || 'Terjadi kesalahan')
      }
    } catch (error) {
      console.error('Download request error:', error)
      toast.error('Terjadi kesalahan saat memproses permintaan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false)
      reset()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isSuccess ? 'Email Terkirim!' : 'Download Produk'}
            </h2>
            <p className="text-gray-600">
              {isSuccess
                ? `Link download untuk "${product.name}" telah dikirim ke email Anda.`
                : `Masukkan email Anda untuk mendapatkan link download "${product.name}".`
              }
            </p>
          </div>

          {isSuccess ? (
            /* Success State */
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <p className="font-semibold text-green-900">
                      Cek Email Anda
                    </p>
                    <p className="text-sm text-green-700">
                      Link download akan expired dalam 24 jam
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email Anda
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email wajib diisi',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Format email tidak valid',
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="nama@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  🔒 Link download akan dikirim ke email Anda dan berlaku selama 24 jam.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Link Download'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}