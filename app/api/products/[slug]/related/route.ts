import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  slug: string
}

// Tambahkan interface untuk RelatedProduct
interface RelatedProduct {
  id: string
  slug: string
  name: string
  category: string
  price: number
  salePrice: number | null
  images: string
  type: string
  downloads: number
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { prisma: prismaPromise } = await import('@/lib/prisma')
    const prisma = await prismaPromise
    const { slug } = await params

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product slug is required',
        },
        { status: 400 }
      )
    }

    // Get the current product
    const currentProduct = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        type: true,
        tags: true,
      },
    })

    if (!currentProduct) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      )
    }

    // Find related products - same type or similar tags
    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          {
            id: {
              not: currentProduct.id,
            },
          },
          {
            OR: [
              {
                type: currentProduct.type,
              },
              // Match by tags in the future if needed
            ],
          },
        ],
      },
      select: {
        id: true,
        slug: true,
        name: true,
        category: true,
        price: true,
        salePrice: true,
        images: true,
        type: true,
        downloads: true,
      },
      take: 4,
      orderBy: {
        downloads: 'desc',
      },
    })

    // Parse JSON fields - FIXED: added type for product parameter
    const parsedRelatedProducts = relatedProducts.map((product: RelatedProduct) => ({
      ...product,
      images: JSON.parse(product.images),
    }))

    return NextResponse.json(
      {
        success: true,
        data: {
          products: parsedRelatedProducts,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching related products:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch related products',
      },
      { status: 500 }
    )
  }
}