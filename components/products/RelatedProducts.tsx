'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types/product'

interface RelatedProductsProps {
  productSlug: string
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function RelatedProductCard({ product }: { product: Product }) {
  const displayPrice = product.salePrice || product.price
  const firstImage = product.images[0] || '/placeholder.jpg'

  return (
    <Link href={`/produk/${product.type}/${product.slug}`}>
      <div className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
          <Image
            src={firstImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 mb-2">{product.category}</p>
          <p className="font-bold text-gray-900">
            {formatPrice(displayPrice)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export function RelatedProducts({ productSlug }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/products/${productSlug}/related`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch related products')
        }

        const data = await response.json()
        setProducts(data.data?.products || [])
      } catch (err) {
        console.error('Error fetching related products:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [productSlug])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Produk Serupa</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-48 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error || products.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Produk Serupa</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
