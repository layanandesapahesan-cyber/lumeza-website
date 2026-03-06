'use client'

import { Product } from '@/lib/types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  isEmpty: boolean
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg overflow-hidden bg-white shadow-md animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full aspect-square bg-gray-200" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <div className="text-gray-400 mb-4 text-4xl">📭</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Tidak ada produk ditemukan
      </h3>
      <p className="text-gray-600">
        Coba ubah filter atau kata kunci pencarian Anda
      </p>
    </div>
  )
}

export function ProductGrid({
  products,
  loading,
  isEmpty,
}: ProductGridProps) {
  if (loading) {
    return <LoadingSkeleton />
  }

  if (isEmpty) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
