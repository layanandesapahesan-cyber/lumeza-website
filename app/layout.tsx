import type { Metadata } from 'next'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import { generateOrganizationSchema } from '@/lib/seo'
import '@/styles/globals.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumeza.com'

export const metadata: Metadata = {
  title: 'Lumeza - Transform Your Vision into Reality',
  description: 'Lumeza Creative Studio menghadirkan solusi desain kreatif yang bermakna dan berdampak untuk mengembangkan brand Anda. Icons, ilustrasi, template digital, dan layanan desain profesional.',
  keywords: ['desain grafis', 'ilustrasi', 'icon', 'desain website', 'branding', 'template digital', 'creative studio'],
  authors: [{ name: 'Lumeza Creative Studio' }],
  creator: 'Lumeza Creative Studio',
  publisher: 'Lumeza Creative Studio',
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
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    title: 'Lumeza - Transform Your Vision into Reality',
    description: 'Lumeza Creative Studio menghadirkan solusi desain kreatif yang bermakna dan berdampak untuk mengembangkan brand Anda.',
    siteName: 'Lumeza',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Lumeza Creative Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumeza - Transform Your Vision into Reality',
    description: 'Lumeza Creative Studio menghadirkan solusi desain kreatif yang bermakna dan berdampak untuk mengembangkan brand Anda.',
    creator: '@lumeza_studio',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'id-ID': baseUrl,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="id">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Vercel Analytics - Optional alternative to Google Analytics */}
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID && (
          <Script
            src="/_vercel/insights/script.js"
            strategy="afterInteractive"
            data-endpoint="/_vercel/insights/event"
          />
        )}
      </head>
      <body className="bg-white">
        <ErrorBoundary>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster position="top-right" />
        </ErrorBoundary>
      </body>
    </html>
  )
}
