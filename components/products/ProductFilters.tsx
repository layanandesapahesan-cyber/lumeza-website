'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductQueryParams } from '@/lib/types/product'

interface ProductFiltersProps {
  onFilterChange: (params: ProductQueryParams) => Promise<void>
  selectedType?: string
}

const PRODUCT_TYPES = [
  { value: 'icon', label: 'Icon' },
  { value: 'template', label: 'Template' },
  { value: 'illustration', label: 'Illustration' },
]

const STYLE_OPTIONS = [
  { value: 'line', label: 'Line' },
  { value: 'glyph', label: 'Glyph' },
  { value: 'color', label: 'Color' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi' },
  { value: 'popular', label: 'Paling Populer' },
  { value: 'trending', label: 'Trending' },
]

export function ProductFilters({
  onFilterChange,
  selectedType,
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [types, setTypes] = useState<string[]>(
    selectedType ? [selectedType] : []
  )
  const [style, setStyle] = useState<'line' | 'glyph' | 'color' | ''>(
    (searchParams.get('style') as 'line' | 'glyph' | 'color') || ''
  )
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params: ProductQueryParams = {
        page: 1,
        search: search || undefined,
        type: types.length > 0 ? (types[0] as any) : undefined,
        style: style || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        sort: (sort as any) || 'newest',
      }

      onFilterChange(params)

      // Update URL
      const newParams = new URLSearchParams()
      if (search) newParams.set('search', search)
      if (types.length > 0) newParams.set('type', types[0])
      if (style) newParams.set('style', style)
      if (minPrice) newParams.set('minPrice', minPrice)
      if (maxPrice) newParams.set('maxPrice', maxPrice)
      if (sort && sort !== 'newest') newParams.set('sort', sort)

      router.push(`?${newParams.toString()}`, { scroll: false })
    }, 300)

    return () => clearTimeout(timer)
  }, [search, types, style, minPrice, maxPrice, sort, onFilterChange, router])

  const handleTypeChange = (value: string) => {
    if (types.includes(value)) {
      const newTypes = types.filter((t) => t !== value)
      setTypes(newTypes)
      // Reset style when type changes
      setStyle('')
    } else {
      setTypes([value])
      // Reset style when type changes
      setStyle('')
    }
  }

  const handleReset = () => {
    setSearch('')
    setTypes([])
    setStyle('')
    setMinPrice('')
    setMaxPrice('')
    setSort('newest')
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filter</h2>
        {(search || types.length > 0 || style || minPrice || maxPrice) && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Pencarian
        </label>
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Tipe Produk
        </label>
        <div className="space-y-2">
          {PRODUCT_TYPES.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={types.includes(type.value)}
                onChange={() => handleTypeChange(type.value)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Style Filter - Only show if icon type is selected */}
      {types.includes('icon') && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Gaya Icon
          </label>
          <div className="space-y-2">
            {STYLE_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="style"
                  value={option.value}
                  checked={style === option.value}
                  onChange={(e) => setStyle(e.target.value as 'line' | 'glyph' | 'color' | '')}
                  className="w-4 h-4 border-gray-300 text-blue-600"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Rentang Harga
        </label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Harga minimum"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="number"
            placeholder="Harga maksimum"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Urutkan Berdasarkan
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
