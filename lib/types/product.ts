export interface Product {
  id: string
  slug: string
  name: string
  description: string
  type: 'icon' | 'template' | 'illustration'
  style?: 'line' | 'glyph' | 'color'
  category: string
  price: number
  salePrice?: number
  images: string[]
  fileUrl: string
  tags: string[]
  downloads: number
  views: number
  createdAt: string
}

export interface ProductsResponse {
  success: boolean
  data: {
    products: Product[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
    filters: any
  }
}

export interface ProductQueryParams {
  page?: number
  limit?: number
  type?: 'icon' | 'template' | 'illustration'
  style?: 'line' | 'glyph' | 'color'
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'trending'
}
