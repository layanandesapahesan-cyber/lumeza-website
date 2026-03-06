'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/lib/types/product'
import { ImageGallery } from '@/components/products/ImageGallery'
import { ProductInfo } from '@/components/products/ProductInfo'
import { ProductTabs } from '@/components/products/ProductTabs'
import { RelatedProducts } from '@/components/products/RelatedProducts'

interface ProductDetailContentProps {
  slug: string
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right column - Info */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="mt-12 space-y-4">
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${slug}`)

        if (response.status === 404) {
          setError('Produk tidak ditemukan')
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }

        const data = await response.json()
        if (data.success && data.data) {
          setProduct(data.data)
        } else {
          setError('Data produk tidak valid')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(
          err instanceof Error ? err.message : 'Gagal memuat produk'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {error === 'Produk tidak ditemukan'
              ? '404 - Produk Tidak Ditemukan'
              : 'Terjadi Kesalahan'}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Kembali
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-2">
            <ImageGallery
              images={product.images}
              productType={product.type}
              productName={product.name}
            />
          </div>

          {/* Right Column - Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts productSlug={product.slug} />
        </div>
      </div>
    </div>
  )
}
