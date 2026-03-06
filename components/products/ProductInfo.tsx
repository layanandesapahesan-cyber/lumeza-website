'use client'

import { useState } from 'react'
import { Product } from '@/lib/types/product'
import { DownloadModal } from './DownloadModal'

interface ProductInfoProps {
  product: Product
}

const TYPE_BADGE = {
  icon: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Icon' },
  template: { bg: 'bg-green-100', text: 'text-green-700', label: 'Template' },
  illustration: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    label: 'Illustration',
  },
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [license, setLicense] = useState<'personal' | 'commercial'>('personal')
  const [showLicenseTooltip, setShowLicenseTooltip] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  const badgeConfig = TYPE_BADGE[product.type]
  const displayPrice = product.salePrice || product.price
  const originalPrice = product.salePrice ? product.price : null

  const handleDownloadClick = () => {
    setShowDownloadModal(true)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 space-y-6">
        {/* Badge */}
        <div>
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${badgeConfig.bg} ${badgeConfig.text}`}
          >
            {badgeConfig.label}
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600">{product.category}</p>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(displayPrice)}
            </span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* License Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-900">
              Jenis Lisensi
            </label>
            <button
              type="button"
              onMouseEnter={() => setShowLicenseTooltip(true)}
              onMouseLeave={() => setShowLicenseTooltip(false)}
              className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-400 rounded-full cursor-help"
            >
              ?
            </button>
            {showLicenseTooltip && (
              <div className="absolute mt-8 w-48 bg-gray-900 text-white text-xs rounded py-2 px-3 z-10 right-0">
                <p className="font-semibold mb-1">Lisensi Personal:</p>
                <p className="mb-2">Untuk penggunaan pribadi/proyek</p>
                <p className="font-semibold mb-1">Lisensi Komersial:</p>
                <p>Untuk produk/layanan yang dijual</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(['personal', 'commercial'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setLicense(type)}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${
                  license === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900 capitalize">
                  {type === 'personal' ? 'Personal' : 'Komersial'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {type === 'personal'
                    ? 'Penggunaan pribadi'
                    : 'Penggunaan komersial'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Diunduh</p>
            <p className="text-2xl font-bold text-gray-900">
              {product.downloads.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dilihat</p>
            <p className="text-2xl font-bold text-gray-900">
              {product.views.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            📥 Download Gratis
          </button>

          {product.price > 0 && (
            <button
              onClick={handleDownloadClick}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-lg border border-gray-300 transition-colors"
            >
              💳 Beli Sekarang (Coming Soon)
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>✓ Lisensi seumur hidup</p>
          <p>✓ Akses update gratis</p>
          <p>✓ Dukungan pelanggan 24/7</p>
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal
        product={product}
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  )
}
