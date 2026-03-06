import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Product Image'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface Props {
  params: {
    type: string
    slug: string
  }
}

async function getProductData(slug: string) {
  try {
    const { prisma: prismaPromise } = await import('@/lib/prisma')
    const prisma = await prismaPromise
    const product = await prisma.product.findUnique({
      where: { slug },
    })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function Image({ params }: Props) {
  const product = await getProductData(params.slug)

  const title = product?.name || 'Lumeza Product'
  const description = product?.description || 'Discover amazing creative assets'
  const price = product?.price ? `Rp${product.price.toLocaleString('id-ID')}` : 'Contact us'

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '30px',
            maxWidth: '1000px',
            zIndex: 1,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
              }}
            />
            LUMEZA
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              lineHeight: '1.2',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 28,
              opacity: 0.9,
              maxWidth: '900px',
              lineHeight: '1.4',
            }}
          >
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </div>

          {/* Footer Info */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '40px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: 24,
            }}
          >
            <span>{params.type.toUpperCase()}</span>
            <span>{price}</span>
            <span>lumeza.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
