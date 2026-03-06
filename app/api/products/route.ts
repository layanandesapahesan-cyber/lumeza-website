import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma' // Import moved inside function

export async function GET(request: NextRequest) {
  try {
    console.log('API called with URL:', request.url)
    const { prisma: prismaPromise } = await import('@/lib/prisma')
    const prisma = await prismaPromise
    const { searchParams } = new URL(request.url)

    // Extract query parameters
    const type = searchParams.get('type')
    const style = searchParams.get('style')
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'newest'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));

    console.log('Parsed params:', { type, style, category, minPrice, maxPrice, search, sort, page, limit })

    // Build dynamic where clause
    const where: Record<string, unknown> = {}

    if (type) {
      where.type = type
    }

    if (style) {
      where.style = style
    }

    if (category) {
      where.category = category
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) {
        ;(where.price as Record<string, unknown>).gte = parseFloat(minPrice)
      }
      if (maxPrice) {
        ;(where.price as Record<string, unknown>).lte = parseFloat(maxPrice)
      }
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
      ]
    }

    // Determine order by clause
    let orderBy: Record<string, string> = {}
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'popular':
        orderBy = { downloads: 'desc' }
        break
      case 'trending':
        orderBy = { views: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    // Get total count
    const total = await prisma.product.count({ where })

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        type: true,
        style: true,
        category: true,
        price: true,
        salePrice: true,
        images: true,
        downloads: true,
        views: true,
        createdAt: true,
      },
    })

    // Parse JSON fields (images, tags)
    const parsedProducts = products.map((product) => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
    }))

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      {
        success: true,
        data: {
          products: parsedProducts,
          pagination: {
            total,
            page,
            limit,
            totalPages,
          },
          filters: {
            type: type || null,
            style: style || null,
            category: category || null,
            minPrice: minPrice ? parseFloat(minPrice) : null,
            maxPrice: maxPrice ? parseFloat(maxPrice) : null,
            search: search || null,
            sort,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}
