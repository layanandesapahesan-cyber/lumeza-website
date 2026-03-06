'use client'

import { useState } from 'react'
import { Product } from '@/lib/types/product'

interface ProductTabsProps {
  product: Product
}

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

const DUMMY_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Ahmad Wijaya',
    rating: 5,
    comment:
      'Icon pack ini sangat bagus dan lengkap. Cocok banget untuk proyek web saya. Recommend!',
    date: '2024-02-15',
  },
  {
    id: '2',
    author: 'Siti Nurhaliza',
    rating: 4,
    comment:
      'Kualitas bagus, hanya saja ingin ada lebih banyak variasi warna. Tapi overall puas.',
    date: '2024-02-10',
  },
  {
    id: '3',
    author: 'Budi Santoso',
    rating: 5,
    comment:
      'Profesional dan mudah digunakan. Dokumentasi lengkap. Terima kasih!',
    date: '2024-02-05',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-lg">
          {i < rating ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  )
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>(
    'description'
  )

  const tabs = [
    { id: 'description', label: 'Deskripsi', icon: '📝' },
    { id: 'details', label: 'Detail Teknis', icon: '⚙️' },
    { id: 'reviews', label: 'Review', icon: '⭐' },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <div className="whitespace-pre-wrap text-base leading-relaxed">
              {product.description || 'Tidak ada deskripsi tersedia'}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                🎨 <span className="font-semibold">Tips Penggunaan:</span> File
                dapat diedit dan disesuaikan dengan kebutuhan proyek Anda. Pastikan
                untuk membaca dokumentasi yang disertakan.
              </p>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Jenis Produk
                </p>
                <p className="text-gray-900 capitalize">{product.type}</p>
              </div>

              {product.style && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Gaya
                  </p>
                  <p className="text-gray-900 capitalize">{product.style}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Kategori
                </p>
                <p className="text-gray-900">{product.category}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Tanggal Dibuat
                </p>
                <p className="text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-600 mb-3">
                  Tag
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-3">
                Format File
              </p>
              <p className="text-gray-900">
                {product.type === 'icon'
                  ? 'SVG, PNG, PDF'
                  : product.type === 'template'
                    ? 'PSD, Figma, Adobe XD'
                    : 'PNG, PSD, Illustrator'}
              </p>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Average Rating */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.7</p>
                  <StarRating rating={5} />
                  <p className="text-sm text-gray-600 mt-1">
                    Berdasarkan {DUMMY_REVIEWS.length} review
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4 mt-6">
              {DUMMY_REVIEWS.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.author}
                      </p>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review CTA */}
            <button className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              ✍️ Tulis Review Anda
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
