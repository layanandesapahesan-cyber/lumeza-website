import { Metadata } from 'next'

export interface MetadataParams {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
}

export function generateMetadata(params: MetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumeza.com'
  const title = params.title ? `${params.title} | Lumeza` : 'Lumeza - Transform Your Vision into Reality'
  const description =
    params.description ||
    'Lumeza Creative Studio menghadirkan solusi desain kreatif yang bermakna dan berdampak untuk mengembangkan brand Anda.'
  const image = params.image || `${baseUrl}/og-image.jpg`
  const url = params.url || baseUrl

  return {
    title,
    description,
    keywords: [
      'desain grafis',
      'ilustrasi',
      'icon',
      'desain website',
      'branding',
      'template digital',
      'creative studio',
      'lumeza',
    ],
    authors: [{ name: 'Lumeza Creative Studio' }],
    creator: 'Lumeza Creative Studio',
    publisher: 'Lumeza Creative Studio',
    abstract: description,
    openGraph: {
      type: (params.type || 'website') as any,
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Lumeza',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@lumeza_studio',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        'id-ID': url,
      },
    },
  }
}

export function generateProductSchema(product: {
  id: string
  name: string
  description: string
  price: number
  type: string
  slug: string
  rating?: number
  reviewCount?: number
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumeza.com'

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${baseUrl}/produk/${product.type}/${product.slug}`,
    image: `${baseUrl}/products/${product.id}/image.jpg`,
    sku: product.id,
    price: product.price,
    priceCurrency: 'IDR',
    availability: 'https://schema.org/InStock',
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
    brand: {
      '@type': 'Brand',
      name: 'Lumeza',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Lumeza Creative Studio',
    },
  }
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumeza.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lumeza Creative Studio',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'Lumeza Creative Studio menghadirkan solusi desain kreatif yang bermakna dan berdampak untuk mengembangkan brand Anda.',
    sameAs: [
      'https://www.facebook.com/lumeza',
      'https://www.instagram.com/lumeza',
      'https://www.twitter.com/lumeza',
      'https://www.linkedin.com/company/lumeza',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@lumeza.com',
      url: `${baseUrl}/kontak`,
    },
  }
}
