'use client'

import { useEffect, useState } from 'react'
import { useProducts } from '@/lib/hooks/useProducts'
import { ProductQueryParams } from '@/lib/types/product'
import { ProductFilters } from './ProductFilters'
import { ProductGrid } from './ProductGrid'

interface ProductsPageContentProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-gray-600">
        Halaman {page} dari {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          ← Sebelumnya
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Berikutnya →
        </button>
      </div>
    </div>
  )
}

export function ProductsPageContent({
  searchParams,
}: ProductsPageContentProps) {
  const { products, loading, error, pagination, fetchProducts } = useProducts()
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)

  // Extract search parameters
  const getSearchParams = () => {
    const type = searchParams.type as string | undefined
    const style = searchParams.style as string | undefined
    const category = searchParams.category as string | undefined
    const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice as string) : undefined
    const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice as string) : undefined
    const search = searchParams.search as string | undefined
    const sort = (searchParams.sort as string) || 'newest'
    const page = searchParams.page ? parseInt(searchParams.page as string) : 1

    return { type, style, category, minPrice, maxPrice, search, sort, page }
  }

  // Initial fetch
  useEffect(() => {
    if (!isInitialized) {
      const params = getSearchParams()
      setCurrentPage(params.page)
      fetchProducts({
        page: params.page || 1,
        limit: 12,
        type: params.type as any,
        style: params.style as any,
        category: params.category,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        search: params.search,
        sort: params.sort as any,
      })
      setIsInitialized(true)
    }
  }, [isInitialized, fetchProducts])

  const handleFilterChange = async (params: ProductQueryParams) => {
    setCurrentPage(1)
    await fetchProducts({
      ...params,
      page: 1,
      limit: 12,
    })
  }

  const handlePageChange = async (newPage: number) => {
    const params = getSearchParams()
    setCurrentPage(newPage)
    await fetchProducts({
      page: newPage,
      limit: 12,
      type: params.type as any,
      style: params.style as any,
      category: params.category,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      search: params.search,
      sort: params.sort as any,
    })
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isEmpty = !loading && products.length === 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar - Filters */}
      <div className="md:col-span-1">
        <ProductFilters
          onFilterChange={handleFilterChange}
          selectedType={getSearchParams().type}
        />
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">Terjadi kesalahan</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results info */}
        {!loading && !isEmpty && (
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              Menampilkan{' '}
              <span className="font-semibold">
                {(currentPage - 1) * 12 + 1} -{' '}
                {Math.min(currentPage * 12, pagination.total)}
              </span>{' '}
              dari <span className="font-semibold">{pagination.total}</span> produk
            </p>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          isEmpty={isEmpty}
        />

        {/* Pagination */}
        {!loading && !isEmpty && pagination.totalPages > 1 && (
          <PaginationControls
            page={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
