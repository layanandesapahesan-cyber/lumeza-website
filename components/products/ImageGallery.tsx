'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  productType: 'icon' | 'template' | 'illustration'
  productName: string
}

export function ImageGallery({
  images,
  productType,
  productName,
}: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || '/placeholder.jpg')
  const [iconSize, setIconSize] = useState<number>(48)
  const [isZoomed, setIsZoomed] = useState(false)

  const iconSizes = [16, 24, 32, 48, 64]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={mainImage}
          alt={productName}
          fill
          className={`object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          priority
        />

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
            <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
              🔍 Zoom
            </span>
          </div>
        )}
      </div>

      {/* Icon Size Selector - Only for icons */}
      {productType === 'icon' && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Ukuran Preview
          </p>
          <div className="flex gap-2">
            {iconSizes.map((size) => (
              <button
                key={size}
                onClick={() => setIconSize(size)}
                className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
                  iconSize === size
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>

          {/* Icon Size Preview */}
          <div className="mt-4 p-4 bg-gray-50 rounded flex items-center justify-center">
            <div style={{ width: iconSize, height: iconSize, position: 'relative' }}>
              <Image
                src={mainImage}
                alt={`${productName} ${iconSize}px`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(image)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                mainImage === image
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
