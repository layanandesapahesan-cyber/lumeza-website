'use client'

import { useState, useCallback, useRef } from 'react'
import { Product, ProductsResponse, ProductQueryParams } from '@/lib/types/product'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  fetchProducts: (params: ProductQueryParams) => Promise<void>
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  })

  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchProductsImpl = useCallback(
    async (params: ProductQueryParams) => {
      try {
        // Cancel previous request if any
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController()

        setLoading(true)
        setError(null)

        // Build query string
        const queryParams = new URLSearchParams()
        if (params.page) queryParams.set('page', params.page.toString())
        if (params.limit) queryParams.set('limit', params.limit.toString())
        if (params.type) queryParams.set('type', params.type)
        if (params.style) queryParams.set('style', params.style)
        if (params.category) queryParams.set('category', params.category)
        if (params.minPrice) queryParams.set('minPrice', params.minPrice.toString())
        if (params.maxPrice) queryParams.set('maxPrice', params.maxPrice.toString())
        if (params.search) queryParams.set('search', params.search)
        if (params.sort) queryParams.set('sort', params.sort)

        const response = await fetch(`/api/products?${queryParams.toString()}`, {
          signal: abortControllerRef.current.signal,
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data: ProductsResponse = await response.json()

        if (data.success) {
          setProducts(data.data.products)
          setPagination(data.data.pagination)
        } else {
          setError('Failed to fetch products')
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch products')
          console.error('Error fetching products:', err)
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Debounced version for search
  const debouncedFetch = useRef(debounce(fetchProductsImpl, 500)).current

  const fetchProducts = useCallback(
    async (params: ProductQueryParams) => {
      // For search queries, use debounced version
      if (params.search !== undefined) {
        debouncedFetch(params)
      } else {
        // For other queries, execute immediately
        await fetchProductsImpl(params)
      }
    },
    [debouncedFetch, fetchProductsImpl]
  )

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
  }
}
