'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types/product'

interface ProductCardProps {
  product: Product
}

const TYPE_BADGE = {
  icon: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Icon' },
  template: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Template' },
  illustration: { bg: 'bg-green-100', text: 'text-green-700', label: 'Illustration' },
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function ProductCard({ product }: ProductCardProps) {
  const badgeConfig = TYPE_BADGE[product.type]
  const firstImage = product.images[0] || '/placeholder.jpg'
  const displayPrice = product.salePrice || product.price
  const originalPrice = product.salePrice ? product.price : null

  return (
    <Link href={`/produk/${product.type}/${product.slug}`}>
      <div className="h-full rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
          <Image
            src={firstImage}
            alt={product.name}
            fill
            className="object-cover"
            priority={false}
          />
          {/* Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeConfig.bg} ${badgeConfig.text}`}
            >
              {badgeConfig.label}
            </span>
          </div>

          {/* Sale Badge */}
          {product.salePrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              Sale
            </div>
          )}

          {/* Download Count */}
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
            📥 {product.downloads.toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-[140px]">
          {/* Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-xs text-gray-500 mb-3">{product.category}</p>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-900">
                {formatPrice(displayPrice)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
