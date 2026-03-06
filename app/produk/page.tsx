import { Suspense } from 'react'
import { ProductsPageContent } from '@/components/products/ProductsPageContent'

export const metadata = {
  title: 'Marketplace Produk Digital | Lumeza',
  description: 'Jelajahi koleksi icon, template, dan ilustrasi digital berkualitas tinggi',
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Marketplace Produk Digital
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Temukan ribuan icon, template, dan ilustrasi berkualitas tinggi
              untuk proyek desain Anda
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-500">Memuat produk...</div>
            </div>
          }
        >
          <ProductsPageContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
