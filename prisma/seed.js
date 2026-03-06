const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const products = [
  // Icons - Line style
  {
    slug: 'business-icons-line',
    name: 'Business Icons Line',
    description: 'Professional business icons in line style. Perfect for web and app design projects. Includes 100+ icons in SVG format.',
    type: 'icon',
    style: 'line',
    category: 'business',
    price: 15.99,
    salePrice: 9.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Business+Icons+Line+1',
      'https://via.placeholder.com/400x300?text=Business+Icons+Line+2',
    ]),
    fileUrl: 'https://example.com/downloads/business-icons-line.zip',
    tags: JSON.stringify(['icons', 'business', 'line', 'svg']),
  },
  {
    slug: 'social-media-icons-line',
    name: 'Social Media Icons Line',
    description: 'Icon pack with all popular social media platforms in line style. Fully customizable and scalable.',
    type: 'icon',
    style: 'line',
    category: 'social',
    price: 12.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Social+Media+Icons+1',
    ]),
    fileUrl: 'https://example.com/downloads/social-media-icons-line.zip',
    tags: JSON.stringify(['icons', 'social', 'line']),
  },
  {
    slug: 'weather-icons-line',
    name: 'Weather Icons Line',
    description: 'Complete weather icon set with 50+ icons. Great for weather apps and websites.',
    type: 'icon',
    style: 'line',
    category: 'nature',
    price: 9.99,
    salePrice: 4.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Weather+Icons+1',
    ]),
    fileUrl: 'https://example.com/downloads/weather-icons-line.zip',
    tags: JSON.stringify(['icons', 'weather', 'line']),
  },
  {
    slug: 'ecommerce-icons-line',
    name: 'E-commerce Icons Line',
    description: 'Shopping and e-commerce related icons in line style. 80+ icons for online stores.',
    type: 'icon',
    style: 'line',
    category: 'commerce',
    price: 14.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Ecommerce+Icons+1',
    ]),
    fileUrl: 'https://example.com/downloads/ecommerce-icons-line.zip',
    tags: JSON.stringify(['icons', 'ecommerce', 'line', 'shopping']),
  },

  // Icons - Glyph style
  {
    slug: 'business-icons-glyph',
    name: 'Business Icons Glyph',
    description: 'Professional business icons in glyph/solid style with rounded corners. Modern and clean design.',
    type: 'icon',
    style: 'glyph',
    category: 'business',
    price: 18.99,
    salePrice: 12.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Business+Glyph+1',
    ]),
    fileUrl: 'https://example.com/downloads/business-icons-glyph.zip',
    tags: JSON.stringify(['icons', 'business', 'glyph', 'solid']),
  },
  {
    slug: 'ui-icons-glyph',
    name: 'UI Icons Glyph',
    description: '120+ user interface icons in glyph style. Essential for app and web interface design.',
    type: 'icon',
    style: 'glyph',
    category: 'ui',
    price: 19.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=UI+Glyph+Icons+1',
    ]),
    fileUrl: 'https://example.com/downloads/ui-icons-glyph.zip',
    tags: JSON.stringify(['icons', 'ui', 'glyph', 'interface']),
  },
  {
    slug: 'lifestyle-icons-glyph',
    name: 'Lifestyle Icons Glyph',
    description: 'Lifestyle and daily activity icons in glyph style. 100+ icons for various use cases.',
    type: 'icon',
    style: 'glyph',
    category: 'lifestyle',
    price: 16.99,
    salePrice: 9.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Lifestyle+Glyph+1',
    ]),
    fileUrl: 'https://example.com/downloads/lifestyle-icons-glyph.zip',
    tags: JSON.stringify(['icons', 'lifestyle', 'glyph']),
  },

  // Icons - Color style
  {
    slug: 'emoji-icons-color',
    name: 'Emoji Icons Color',
    description: 'Colorful emoji-style icons with 3D effect. 150+ icons perfect for fun and playful designs.',
    type: 'icon',
    style: 'color',
    category: 'emoji',
    price: 24.99,
    salePrice: 17.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Emoji+Icons+Color+1',
    ]),
    fileUrl: 'https://example.com/downloads/emoji-icons-color.zip',
    tags: JSON.stringify(['icons', 'emoji', 'color', '3d', 'playful']),
  },
  {
    slug: 'animals-icons-color',
    name: 'Animals Icons Color',
    description: 'Cute and colorful animal icons. 200+ animals in various styles and poses.',
    type: 'icon',
    style: 'color',
    category: 'animals',
    price: 22.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Animals+Color+1',
    ]),
    fileUrl: 'https://example.com/downloads/animals-icons-color.zip',
    tags: JSON.stringify(['icons', 'animals', 'color', 'cute']),
  },

  // Templates
  {
    slug: 'startup-pitch-template',
    name: 'Startup Pitch Deck Template',
    description: 'Modern presentation template for startup pitch decks. Includes 30+ slides with professional design.',
    type: 'template',
    style: null,
    category: 'presentation',
    price: 39.99,
    salePrice: 29.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Startup+Pitch+Template+1',
      'https://via.placeholder.com/400x300?text=Startup+Pitch+Template+2',
    ]),
    fileUrl: 'https://example.com/downloads/startup-pitch-template.zip',
    tags: JSON.stringify(['template', 'presentation', 'startup', 'business']),
  },
  {
    slug: 'social-media-templates',
    name: 'Social Media Post Templates',
    description: 'Complete set of social media templates for Instagram, Facebook, Twitter, and LinkedIn posts. 50+ designs.',
    type: 'template',
    style: null,
    category: 'social',
    price: 49.99,
    salePrice: 34.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Social+Templates+1',
    ]),
    fileUrl: 'https://example.com/downloads/social-media-templates.zip',
    tags: JSON.stringify(['template', 'social', 'instagram', 'facebook']),
  },
  {
    slug: 'landing-page-template',
    name: 'Landing Page Website Template',
    description: 'Responsive landing page template with multiple sections. Perfect for marketing and product launches.',
    type: 'template',
    style: null,
    category: 'web',
    price: 59.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Landing+Page+1',
    ]),
    fileUrl: 'https://example.com/downloads/landing-page-template.zip',
    tags: JSON.stringify(['template', 'web', 'responsive', 'html', 'css']),
  },
  {
    slug: 'ebook-interior-template',
    name: 'E-book Interior Design Template',
    description: 'Professional e-book interior template with multiple page layouts and styles for various genres.',
    type: 'template',
    style: null,
    category: 'publishing',
    price: 29.99,
    salePrice: 19.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Ebook+Template+1',
    ]),
    fileUrl: 'https://example.com/downloads/ebook-interior-template.zip',
    tags: JSON.stringify(['template', 'ebook', 'publishing', 'layout']),
  },
  {
    slug: 'youtube-thumbnail-templates',
    name: 'YouTube Thumbnail Templates',
    description: '20+ YouTube thumbnail templates with proven click-through rates. All editable designs.',
    type: 'template',
    style: null,
    category: 'video',
    price: 19.99,
    salePrice: 9.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=YouTube+Thumbnail+1',
    ]),
    fileUrl: 'https://example.com/downloads/youtube-thumbnails.zip',
    tags: JSON.stringify(['template', 'youtube', 'video', 'thumbnail']),
  },
  {
    slug: 'business-card-templates',
    name: 'Business Card Design Templates',
    description: 'Modern business card templates in various styles. Fully customizable and print-ready.',
    type: 'template',
    style: null,
    category: 'print',
    price: 14.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Business+Card+1',
    ]),
    fileUrl: 'https://example.com/downloads/business-card-templates.zip',
    tags: JSON.stringify(['template', 'business', 'print', 'stationery']),
  },

  // Illustrations
  {
    slug: 'character-illustrations',
    name: 'Character Illustrations Pack',
    description: 'Set of 50+ cartoon character illustrations in cute and modern style. Perfect for kids and lifestyle designs.',
    type: 'illustration',
    style: null,
    category: 'character',
    price: 49.99,
    salePrice: 34.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Characters+1',
      'https://via.placeholder.com/400x300?text=Characters+2',
    ]),
    fileUrl: 'https://example.com/downloads/character-illustrations.zip',
    tags: JSON.stringify(['illustration', 'character', 'cartoon', 'cute']),
  },
  {
    slug: 'abstract-shapes-illustrations',
    name: 'Abstract Shapes Illustrations',
    description: 'Modern abstract shape illustrations and design elements. 100+ variations for creative projects.',
    type: 'illustration',
    style: null,
    category: 'abstract',
    price: 39.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Abstract+Shapes+1',
    ]),
    fileUrl: 'https://example.com/downloads/abstract-shapes.zip',
    tags: JSON.stringify(['illustration', 'abstract', 'shapes', 'modern']),
  },
  {
    slug: 'nature-scenes-illustrations',
    name: 'Nature Scenes Illustrations',
    description: 'Beautiful nature and landscape illustrations. Mountains, forests, beaches, and more. 80+ designs.',
    type: 'illustration',
    style: null,
    category: 'nature',
    price: 44.99,
    salePrice: 29.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Nature+Scenes+1',
    ]),
    fileUrl: 'https://example.com/downloads/nature-scenes.zip',
    tags: JSON.stringify(['illustration', 'nature', 'landscape', 'scenic']),
  },
  {
    slug: 'workplace-illustrations',
    name: 'Workplace Scenes Illustrations',
    description: 'Office, remote work, and workplace illustrations. 60+ scenes showing modern work environments.',
    type: 'illustration',
    style: null,
    category: 'workplace',
    price: 34.99,
    salePrice: 24.99,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Workplace+1',
    ]),
    fileUrl: 'https://example.com/downloads/workplace-illustrations.zip',
    tags: JSON.stringify(['illustration', 'workplace', 'office', 'business']),
  },
  {
    slug: 'technology-illustrations',
    name: 'Technology & IT Illustrations',
    description: 'Modern technology and IT-related illustrations. Developers, rockets, servers, and more. 70+ designs.',
    type: 'illustration',
    style: null,
    category: 'technology',
    price: 44.99,
    salePrice: null,
    images: JSON.stringify([
      'https://via.placeholder.com/400x300?text=Tech+Illustrations+1',
    ]),
    fileUrl: 'https://example.com/downloads/technology-illustrations.zip',
    tags: JSON.stringify(['illustration', 'technology', 'it', 'development']),
  },
]

async function main() {
  try {
    // Delete all existing products
    await prisma.product.deleteMany()

    // Seed new products
    for (const product of products) {
      await prisma.product.create({
        data: product,
      })
    }

    console.log(`✓ Seeded ${products.length} products successfully`)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
