import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumeza.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/tentang-kami',
          '/layanan',
          '/portfolio',
          '/produk',
          '/blog',
          '/kontak',
        ],
        disallow: [
          '/api',
          '/admin',
          '/.next',
          '/private',
        ],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
