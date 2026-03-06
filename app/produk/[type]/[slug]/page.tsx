import { Suspense } from 'react'
import { ProductDetailContent } from '@/components/products/ProductDetailContent'

export const metadata = {
  title: 'Detail Produk | Lumeza Marketplace',
  description: 'Lihat detail lengkap produk digital pilihan Anda',
}

interface ProductDetailPageProps {
  params: Promise<{
    type: string
    slug: string
  }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Memuat produk...</div>
        </div>
      }
    >
      <ProductDetailContent slug={slug} />
    </Suspense>
  )
}
