import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  slug: string
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

    // Find product by slug
    const product = await prisma.product.findUnique({
      where: { slug },
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
        fileUrl: true,
        tags: true,
        downloads: true,
        views: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      )
    }

    // Increment views asynchronously (non-blocking)
    prisma.product
      .update({
        where: { slug },
        data: { views: { increment: 1 } },
      })
      .catch((error) => {
        console.error('Error incrementing views:', error)
      })

    // Parse JSON fields
    const parsedProduct = {
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      tags: product.tags ? JSON.parse(product.tags) : [],
    }

    return NextResponse.json(
      {
        success: true,
        data: parsedProduct,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    )
  }
}
