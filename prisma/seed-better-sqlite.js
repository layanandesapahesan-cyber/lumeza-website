const Database = require('better-sqlite3');
const path = require('path');

const db = new Database('./prisma/dev.db');
db.pragma('journal_mode = WAL');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Enable foreign keys
db.pragma('foreign_keys = ON');

const products = [
  // ============================================
  // ICONS - LINE STYLE (4 produk)
  // ============================================
  {
    slug: 'business-line-icons',
    name: 'Business Line Icons Pack',
    description: '60+ professional line icons for business and corporate use. Perfect for dashboards, presentations, and business applications. Includes folder, chart, briefcase, document, settings, and more icons in clean line style.',
    type: 'icon',
    style: 'line',
    category: 'Business',
    price: 149000,
    salePrice: 99000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=1']),
    fileUrl: 'https://example.com/downloads/business-line-icons.zip',
    tags: JSON.stringify(['business', 'corporate', 'line', 'office', 'dashboard', 'professional']),
    downloads: 1234,
    views: 5678
  },
  {
    slug: 'social-media-line-icons',
    name: 'Social Media Line Icons Pack',
    description: 'Complete social media platform icons in elegant line style. Includes Facebook, Twitter, Instagram, TikTok, WhatsApp, LinkedIn, YouTube, and more. Fully scalable SVG format perfect for web and mobile applications.',
    type: 'icon',
    style: 'line',
    category: 'Social Media',
    price: 129000,
    salePrice: null,
    images: JSON.stringify(['https://picsum.photos/400/400?random=2']),
    fileUrl: 'https://example.com/downloads/social-media-line-icons.zip',
    tags: JSON.stringify(['social media', 'line', 'svg', 'platforms', 'communication']),
    downloads: 2156,
    views: 7890
  },
  {
    slug: 'weather-line-icons',
    name: 'Weather Line Icons Pack',
    description: '50+ beautifully designed weather condition icons in line style. Includes sun, cloud, rain, snow, storm, wind, and various weather states. Perfect for weather apps, websites, and meteorological applications.',
    type: 'icon',
    style: 'line',
    category: 'Weather',
    price: 99000,
    salePrice: 69000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=3']),
    fileUrl: 'https://example.com/downloads/weather-line-icons.zip',
    tags: JSON.stringify(['weather', 'line', 'nature', 'meteorology', 'forecast']),
    downloads: 1876,
    views: 6543
  },
  {
    slug: 'ecommerce-line-icons',
    name: 'E-commerce Line Icons Pack',
    description: '80+ shopping and e-commerce related icons in clean line style. Includes cart, tag, wallet, credit card, gift, delivery, package, and shopping-related icons. Essential for online stores and marketplace platforms.',
    type: 'icon',
    style: 'line',
    category: 'E-commerce',
    price: 159000,
    salePrice: null,
    images: JSON.stringify(['https://picsum.photos/400/400?random=4']),
    fileUrl: 'https://example.com/downloads/ecommerce-line-icons.zip',
    tags: JSON.stringify(['ecommerce', 'shopping', 'line', 'cart', 'payment', 'delivery']),
    downloads: 2341,
    views: 8765
  },

  // ============================================
  // ICONS - GLYPH STYLE (4 produk)
  // ============================================
  {
    slug: 'ui-glyph-icons',
    name: 'UI Glyph Icons Pack',
    description: '120+ essential user interface icons in modern glyph style. Includes home, search, user, bell, heart, menu, settings, and all common UI elements. Perfect for web and mobile app interfaces.',
    type: 'icon',
    style: 'glyph',
    category: 'UI/UX',
    price: 179000,
    salePrice: 125000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=5']),
    fileUrl: 'https://example.com/downloads/ui-glyph-icons.zip',
    tags: JSON.stringify(['ui', 'ux', 'glyph', 'interface', 'mobile', 'web']),
    downloads: 3456,
    views: 9876
  },
  {
    slug: 'file-management-glyph-icons',
    name: 'File Management Glyph Icons Pack',
    description: '70+ file and document management icons in solid glyph style. Includes file, folder, copy, paste, delete, upload, download, and various file type icons. Essential for file management applications.',
    type: 'icon',
    style: 'glyph',
    category: 'File Management',
    price: 139000,
    salePrice: null,
    images: JSON.stringify(['https://picsum.photos/400/400?random=6']),
    fileUrl: 'https://example.com/downloads/file-management-glyph-icons.zip',
    tags: JSON.stringify(['file', 'document', 'glyph', 'management', 'folder', 'storage']),
    downloads: 1987,
    views: 7234
  },
  {
    slug: 'communication-glyph-icons',
    name: 'Communication Glyph Icons Pack',
    description: '90+ communication and messaging icons in glyph style. Includes chat, message, call, email, notification, video call, and various communication-related icons. Perfect for messaging apps and social platforms.',
    type: 'icon',
    style: 'glyph',
    category: 'Communication',
    price: 169000,
    salePrice: 118000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=7']),
    fileUrl: 'https://example.com/downloads/communication-glyph-icons.zip',
    tags: JSON.stringify(['communication', 'glyph', 'chat', 'message', 'call', 'email']),
    downloads: 2765,
    views: 8456
  },
  {
    slug: 'media-glyph-icons',
    name: 'Media Glyph Icons Pack',
    description: '60+ media and entertainment icons in glyph style. Includes play, pause, stop, record, volume, music, video, camera, and various media control icons. Essential for media players and entertainment apps.',
    type: 'icon',
    style: 'glyph',
    category: 'Media',
    price: 149000,
    salePrice: null,
    images: JSON.stringify(['https://picsum.photos/400/400?random=8']),
    fileUrl: 'https://example.com/downloads/media-glyph-icons.zip',
    tags: JSON.stringify(['media', 'glyph', 'music', 'video', 'player', 'entertainment']),
    downloads: 2234,
    views: 7654
  },

  // ============================================
  // ICONS - COLOR STYLE (4 produk)
  // ============================================
  {
    slug: 'social-media-color-icons',
    name: 'Social Media Color Icons Pack',
    description: 'Complete social media platform icons with official brand colors. Includes Facebook blue, Instagram gradient, Twitter blue, TikTok black, YouTube red, and all major platforms. Perfect for branded applications.',
    type: 'icon',
    style: 'color',
    category: 'Social Media',
    price: 199000,
    salePrice: 139000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=9']),
    fileUrl: 'https://example.com/downloads/social-media-color-icons.zip',
    tags: JSON.stringify(['social media', 'color', 'brand', 'official', 'platforms']),
    downloads: 3123,
    views: 9876
  },
  {
    slug: 'food-drink-color-icons',
    name: 'Food & Drink Color Icons Pack',
    description: '100+ colorful food and beverage icons. Includes pizza, burger, coffee, tea, cake, ice cream, fruits, vegetables, and various delicious food items. Perfect for restaurant apps and food delivery platforms.',
    type: 'icon',
    style: 'color',
    category: 'Food & Drink',
    price: 189000,
    salePrice: null,
    images: JSON.stringify(['https://picsum.photos/400/400?random=10']),
    fileUrl: 'https://example.com/downloads/food-drink-color-icons.zip',
    tags: JSON.stringify(['food', 'drink', 'color', 'restaurant', 'delivery', 'delicious']),
    downloads: 2876,
    views: 8765
  },
  {
    slug: 'animals-color-icons',
    name: 'Animals Color Icons Pack',
    description: '150+ cute and colorful animal icons. Includes cat, dog, bird, fish, rabbit, lion, elephant, and various animals in playful poses. Perfect for kids apps, games, and educational content.',
    type: 'icon',
    style: 'color',
    category: 'Animals',
    price: 179000,
    salePrice: 125000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=11']),
    fileUrl: 'https://example.com/downloads/animals-color-icons.zip',
    tags: JSON.stringify(['animals', 'color', 'cute', 'kids', 'educational', 'playful']),
    downloads: 3456,
    views: 10987
  },
  {
    slug: 'emoji-color-icons',
    name: 'Emoji Color Icons Pack',
    description: '200+ colorful emoji-style icons with 3D effects. Includes smile, heart, star, fire, rocket, party, celebration, and various fun emoji icons. Perfect for messaging apps and playful interfaces.',
    type: 'icon',
    style: 'color',
    category: 'Emoji',
    price: 219000,
    salePrice: 153000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=12']),
    fileUrl: 'https://example.com/downloads/emoji-color-icons.zip',
    tags: JSON.stringify(['emoji', 'color', '3d', 'fun', 'playful', 'messaging']),
    downloads: 4123,
    views: 12345
  },

  // ============================================
  // TEMPLATES - PRESENTATION (3 produk)
  // ============================================
  {
    slug: 'startup-pitch-deck',
    name: 'Startup Pitch Deck Template',
    description: '10 modern slides for your startup pitch deck. Includes investor-ready layouts, charts, financial projections, team slides, and market analysis templates. Professional design with editable elements.',
    type: 'template',
    category: 'Presentation',
    price: 199000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=101']),
    fileUrl: 'https://example.com/downloads/startup-pitch-deck.zip',
    tags: JSON.stringify(['pitch deck', 'startup', 'presentation', 'investor', 'business plan']),
    downloads: 2345,
    views: 7890
  },
  {
    slug: 'corporate-business-presentation',
    name: 'Corporate Business Presentation Template',
    description: '15 professional slides for corporate presentations. Includes executive summaries, quarterly reports, strategy presentations, and business review templates. Clean and modern design suitable for board meetings.',
    type: 'template',
    category: 'Presentation',
    price: 249000,
    salePrice: 174000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=102']),
    fileUrl: 'https://example.com/downloads/corporate-business-presentation.zip',
    tags: JSON.stringify(['corporate', 'business', 'presentation', 'professional', 'board meeting']),
    downloads: 1876,
    views: 6543
  },
  {
    slug: 'creative-portfolio-presentation',
    name: 'Creative Portfolio Presentation Template',
    description: '12 artistic slides for creative professionals. Includes portfolio showcases, case studies, project presentations, and creative work displays. Perfect for designers, photographers, and creative agencies.',
    type: 'template',
    category: 'Presentation',
    price: 229000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=103']),
    fileUrl: 'https://example.com/downloads/creative-portfolio-presentation.zip',
    tags: JSON.stringify(['creative', 'portfolio', 'presentation', 'design', 'artistic']),
    downloads: 1987,
    views: 7234
  },

  // ============================================
  // TEMPLATES - SOCIAL MEDIA (3 produk)
  // ============================================
  {
    slug: 'instagram-story-templates',
    name: 'Instagram Story Templates Pack',
    description: '10 beautifully designed Instagram story templates. Includes product showcases, announcements, polls, questions, and interactive story designs. Fully customizable with brand colors and fonts.',
    type: 'template',
    category: 'Social Media',
    price: 149000,
    salePrice: 104000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=104']),
    fileUrl: 'https://example.com/downloads/instagram-story-templates.zip',
    tags: JSON.stringify(['instagram', 'story', 'social media', 'templates', 'interactive']),
    downloads: 3456,
    views: 10987
  },
  {
    slug: 'instagram-post-templates',
    name: 'Instagram Post Templates Pack',
    description: '12 professional Instagram post templates. Includes feed posts, carousel designs, product promotions, quotes, and lifestyle content templates. Optimized for engagement and brand consistency.',
    type: 'template',
    category: 'Social Media',
    price: 179000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=105']),
    fileUrl: 'https://example.com/downloads/instagram-post-templates.zip',
    tags: JSON.stringify(['instagram', 'post', 'feed', 'social media', 'carousel']),
    downloads: 2765,
    views: 9876
  },
  {
    slug: 'facebook-cover-templates',
    name: 'Facebook Cover Templates Pack',
    description: '6 stunning Facebook cover designs. Includes business covers, event promotions, brand showcases, and seasonal templates. High-resolution designs that work perfectly on all devices.',
    type: 'template',
    category: 'Social Media',
    price: 99000,
    salePrice: 69000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=106']),
    fileUrl: 'https://example.com/downloads/facebook-cover-templates.zip',
    tags: JSON.stringify(['facebook', 'cover', 'social media', 'business', 'brand']),
    downloads: 2234,
    views: 7654
  },

  // ============================================
  // TEMPLATES - MARKETING (3 produk)
  // ============================================
  {
    slug: 'email-newsletter-template',
    name: 'Email Newsletter Template',
    description: 'Responsive email newsletter template with multiple sections. Includes product showcases, blog posts, announcements, and promotional content layouts. Compatible with all major email clients.',
    type: 'template',
    category: 'Marketing',
    price: 199000,
    salePrice: 139000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=107']),
    fileUrl: 'https://example.com/downloads/email-newsletter-template.zip',
    tags: JSON.stringify(['email', 'newsletter', 'marketing', 'responsive', 'html']),
    downloads: 3123,
    views: 10987
  },
  {
    slug: 'landing-page-wireframe',
    name: 'Landing Page Wireframe Template',
    description: 'Complete landing page wireframe with hero section, features, testimonials, pricing, and CTA sections. Includes mobile and desktop layouts with conversion optimization elements.',
    type: 'template',
    category: 'Marketing',
    price: 299000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=108']),
    fileUrl: 'https://example.com/downloads/landing-page-wireframe.zip',
    tags: JSON.stringify(['landing page', 'wireframe', 'marketing', 'conversion', 'cta']),
    downloads: 1876,
    views: 6543
  },
  {
    slug: 'business-card-templates',
    name: 'Business Card Design Templates Pack',
    description: '10 professional business card templates in various styles. Includes modern, classic, creative, and minimalist designs. Print-ready with bleed marks and proper dimensions.',
    type: 'template',
    category: 'Marketing',
    price: 129000,
    salePrice: 90000,
    images: JSON.stringify(['https://picsum.photos/400/300?random=109']),
    fileUrl: 'https://example.com/downloads/business-card-templates.zip',
    tags: JSON.stringify(['business card', 'print', 'marketing', 'professional', 'stationery']),
    downloads: 3456,
    views: 12345
  },

  // ============================================
  // ILLUSTRATIONS - CHARACTERS (3 produk)
  // ============================================
  {
    slug: 'business-people-characters',
    name: 'Business People Characters Pack',
    description: '20 diverse character illustrations of professionals in various poses. Includes business people, executives, entrepreneurs, and office workers. Perfect for websites, presentations, and marketing materials.',
    type: 'illustration',
    category: 'Characters',
    price: 249000,
    salePrice: 174000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=201']),
    fileUrl: 'https://example.com/downloads/business-people-characters.zip',
    tags: JSON.stringify(['characters', 'people', 'business', 'professional', 'diverse']),
    downloads: 2345,
    views: 7890
  },
  {
    slug: 'student-education-characters',
    name: 'Student & Education Characters Pack',
    description: '25 character illustrations of students, teachers, and educational scenarios. Includes classroom scenes, study poses, graduation moments, and learning activities. Perfect for educational content and e-learning platforms.',
    type: 'illustration',
    category: 'Characters',
    price: 229000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=202']),
    fileUrl: 'https://example.com/downloads/student-education-characters.zip',
    tags: JSON.stringify(['characters', 'education', 'students', 'teachers', 'learning']),
    downloads: 1987,
    views: 7234
  },
  {
    slug: 'healthcare-worker-characters',
    name: 'Healthcare Worker Characters Pack',
    description: '18 professional healthcare character illustrations. Includes doctors, nurses, medical staff in various hospital and clinic scenarios. Perfect for healthcare websites, medical apps, and health-related content.',
    type: 'illustration',
    category: 'Characters',
    price: 239000,
    salePrice: 167000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=203']),
    fileUrl: 'https://example.com/downloads/healthcare-worker-characters.zip',
    tags: JSON.stringify(['characters', 'healthcare', 'medical', 'doctors', 'nurses']),
    downloads: 2765,
    views: 9876
  },

  // ============================================
  // ILLUSTRATIONS - ABSTRACT (3 produk)
  // ============================================
  {
    slug: 'geometric-abstract-shapes',
    name: 'Geometric Abstract Shapes Pack',
    description: '50+ geometric abstract shape illustrations. Includes circles, triangles, polygons, and complex geometric patterns. Perfect for modern design, backgrounds, and creative projects.',
    type: 'illustration',
    category: 'Abstract',
    price: 199000,
    salePrice: 139000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=204']),
    fileUrl: 'https://example.com/downloads/geometric-abstract-shapes.zip',
    tags: JSON.stringify(['abstract', 'geometric', 'shapes', 'modern', 'patterns']),
    downloads: 3123,
    views: 10987
  },
  {
    slug: 'fluid-organic-shapes',
    name: 'Fluid Organic Shapes Pack',
    description: '40+ fluid and organic shape illustrations. Includes flowing curves, organic blobs, and natural form patterns. Perfect for creative backgrounds, branding, and contemporary design projects.',
    type: 'illustration',
    category: 'Abstract',
    price: 219000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=205']),
    fileUrl: 'https://example.com/downloads/fluid-organic-shapes.zip',
    tags: JSON.stringify(['abstract', 'fluid', 'organic', 'shapes', 'curves', 'natural']),
    downloads: 1876,
    views: 6543
  },
  {
    slug: 'gradient-abstract-art',
    name: 'Gradient Abstract Art Pack',
    description: '35+ gradient abstract art illustrations. Includes colorful gradients, blend modes, and artistic abstract compositions. Perfect for modern websites, posters, and digital art projects.',
    type: 'illustration',
    category: 'Abstract',
    price: 249000,
    salePrice: 174000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=206']),
    fileUrl: 'https://example.com/downloads/gradient-abstract-art.zip',
    tags: JSON.stringify(['abstract', 'gradient', 'art', 'colorful', 'modern', 'digital']),
    downloads: 2234,
    views: 7654
  },

  // ============================================
  // ILLUSTRATIONS - NATURE (3 produk)
  // ============================================
  {
    slug: 'mountain-landscape-scenes',
    name: 'Mountain Landscape Scenes Pack',
    description: '15 beautiful mountain landscape illustrations. Includes various mountain ranges, peaks, valleys, and scenic mountain views. Perfect for travel websites, outdoor brands, and nature-themed content.',
    type: 'illustration',
    category: 'Nature',
    price: 279000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=207']),
    fileUrl: 'https://example.com/downloads/mountain-landscape-scenes.zip',
    tags: JSON.stringify(['nature', 'mountain', 'landscape', 'scenic', 'travel', 'outdoor']),
    downloads: 1987,
    views: 7234
  },
  {
    slug: 'forest-nature-scenes',
    name: 'Forest Nature Scenes Pack',
    description: '20+ forest and woodland illustrations. Includes dense forests, trees, woodland creatures, and forest landscapes. Perfect for environmental themes, nature apps, and eco-friendly branding.',
    type: 'illustration',
    category: 'Nature',
    price: 259000,
    salePrice: 181000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=208']),
    fileUrl: 'https://example.com/downloads/forest-nature-scenes.zip',
    tags: JSON.stringify(['nature', 'forest', 'trees', 'woodland', 'environment', 'eco']),
    downloads: 2765,
    views: 9876
  },
  {
    slug: 'beach-tropical-scenes',
    name: 'Beach Tropical Scenes Pack',
    description: '18 tropical beach and island illustrations. Includes palm trees, ocean waves, sandy beaches, and tropical paradise scenes. Perfect for travel, vacation, and summer-themed content.',
    type: 'illustration',
    category: 'Nature',
    price: 239000,
    images: JSON.stringify(['https://picsum.photos/400/400?random=209']),
    fileUrl: 'https://example.com/downloads/beach-tropical-scenes.zip',
    tags: JSON.stringify(['nature', 'beach', 'tropical', 'ocean', 'paradise', 'vacation']),
    downloads: 3456,
    views: 12345
  }
];

try {
  // Clear existing products
  db.exec('DELETE FROM Product');
  
  // Prepare insert statement - with all required fields including timestamps and stats
  const insert = db.prepare(`
    INSERT INTO Product (id, slug, name, description, type, style, category, price, salePrice, images, fileUrl, tags, downloads, views, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Function to generate CUID-like ID
  const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = 'c';
    for (let i = 0; i < 24; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  };

  // Insert all products in a transaction
  const insertMany = db.transaction((products) => {
    for (const product of products) {
      const now = new Date().toISOString();
      insert.run(
        generateId(),
        product.slug,
        product.name,
        product.description,
        product.type,
        product.style,
        product.category,
        product.price,
        product.salePrice,
        product.images,
        product.fileUrl,
        product.tags,
        product.downloads,
        product.views,
        now,
        now
      );
    }
  });

  insertMany(products);

  console.log(`✓ Seeded ${products.length} products successfully`);
} catch (error) {
  console.error('Error seeding database:', error.message);
  process.exit(1);
} finally {
  db.close();
}
