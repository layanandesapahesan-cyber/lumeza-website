# 📚 QUICK REFERENCE GUIDE

**For:** Daily operations & quick problem solving  
**Updated:** March 8, 2026

---

## 🎯 Quick Start

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Setup database
npm run prisma:seed

# 3. Start development
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Production Deployment
```bash
# Build Check
npm run build

# If successful, push to GitHub (Vercel auto-deploys)
git add .
git commit -m "Update: Production changes"
git push origin main
```

---

## 🛠️ Common Commands

### Development
```bash
npm run dev                 # Start dev server on port 3000
npm run build              # Build for production
npm start                  # Run production build
npm run lint               # Check code quality
```

### Database
```bash
npm run prisma:seed        # Seed with sample products
npm run prisma:migrate     # Run database migrations
npm run prisma:generate    # Regenerate Prisma client
```

### Product Management
```bash
# List all products
node update-products.js list

# Update a product field
node update-products.js update business-line-icons price=299000

# Bulk update all products of a type
node update-products.js bulk-update icon price=199000

# Add views to a product (for analytics)
node update-products.js add-views business-line-icons 100

# Create new product
node add-product.js  (then edit the script)
```

---

## 📁 File Structure Quick Map

```
lumeza-website/
│
├── app/                           # All pages and API routes
│   ├── (auth)/                   # Auth layout group
│   ├── (marketing)/              # Marketing pages layout
│   ├── api/                      # API endpoints
│   │   ├── products/             # Product endpoints
│   │   ├── contact/              # Contact form
│   │   ├── download/             # Download handler
│   │   └── robots, sitemap/      # SEO endpoints
│   ├── blog/                     # Blog page
│   ├── kontak/                   # Contact page
│   ├── layanan/                  # Services pages
│   ├── portfolio/                # Portfolio pages
│   ├── produk/                   # Products pages
│   ├── tentang-kami/             # About page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/                    # Reusable React components
│   ├── ui/                       # UI components (buttons, cards, etc)
│   └── sections/                 # Page sections
│
├── lib/                          # Utilities & helpers
│   ├── prisma.ts                 # Database client
│   ├── resend.ts                 # Email client
│   └── utils.ts                  # Helper functions
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed script
│   └── dev.db                    # SQLite database file
│
├── styles/                       # CSS files
│   └── globals.css               # Global styles
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
├── vercel.json                   # Vercel deployment config
├── tailwind.config.js            # Tailwind CSS config
└── postcss.config.js             # PostCSS config
```

---

## 🔧 Configuration Files

### next.config.js
- Image optimization settings
- Security headers
- Cache settings
- Redirects and rewrites
```javascript
// Add new image domain?
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'newdomain.com' }
  ]
}

// Add new redirect?
async redirects() {
  return [
    { source: '/old', destination: '/new', permanent: true }
  ]
}
```

### vercel.json
- Environment variables reference
- Build configuration
- Function timeout settings
- Deployment regions
```json
{
  "buildCommand": "npm run build",
  "env": {
    "DATABASE_URL": "@DATABASE_URL",
    "RESEND_API_KEY": "@RESEND_API_KEY"
  }
}
```

### .env & .env.local
```bash
# .env.example - THIS IS IN GIT (template)
DATABASE_URL=file:./prisma/dev.db
RESEND_API_KEY=re_your_key_here

# .env.local - NOT IN GIT (your actual secrets)
# Copy from .env.example and fill in real values
```

---

## 📝 Product Information

### Product Fields
```javascript
{
  slug: "business-line-icons",      // Unique identifier
  name: "Business Line Icons",      // Display name
  description: "Professional icons", // Long description
  type: "icon" | "template" | "illustration",
  style: "minimal" | "colorful",    // Can be null
  category: "Business",             // Category
  price: 299000,                    // Price in Rupiah
  salePrice: null,                  // Discount price (null = no sale)
  images: "[JSON array]",           // JSON string of image URLs
  downloads: 5678,                  // Download count
  views: 8901,                      // View count
  tags: "[JSON array]",             // JSON of tags
  fileUrl: "https://...",          // Download file link
}
```

### Current Products (Sample)
```
30 products seeded:
- 10 Icons (business, creative, nature themes)
- 10 Templates (business cards, flyers, brochures)
- 10 Illustrations (concept art, nature, abstract)

All at various price points: 99,000 - 499,000 IDR
```

### Manage Products
```bash
# View product structure
node update-products.js list | head -20

# Edit in database directly (advanced)
# Use Prisma Studio
npx prisma studio
```

---

## 🌐 API Endpoints

### Public API (No Auth Required)

#### Get All Products
```bash
GET /api/products
?limit=10&page=1&type=icon&category=Business&sort=popular&search=line
```
Response:
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "total": 30,
      "page": 1,
      "limit": 10,
      "pages": 3
    }
  }
}
```

#### Get Single Product
```bash
GET /api/products/business-line-icons
```

#### Get Related Products
```bash
GET /api/products/[slug]/related
```

#### Contact Form
```bash
POST /api/contact
Body: { name, email, subject, message }
```

#### Request Download
```bash
POST /api/download/request
Body: { productSlug, userEmail }
Returns: { downloadToken, expiresIn }
```

#### Download File
```bash
GET /api/download/[token]
```

---

## 🐛 Common Issues & Fixes

### Issue: "npm run dev" fails

**Solution:**
```bash
# Clear cache
rm -r .next
rm -r node_modules

# Reinstall
npm install

# Retart
npm run dev
```

### Issue: Database not found

**Solution:**
```bash
# Reseed database
npm run prisma:seed

# Or reset completely
rm prisma/dev.db
npm run prisma:seed
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check all errors
npx tsc --noEmit

# Fix auto-fixable errors
npx prisma generate
```

### Issue: Prisma client issues

**Solution:**
```bash
# Regenerate client
npm run prisma:generate

# Clear cache
rm node_modules/.prisma

# Reinstall
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill existing process
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell):
Get-Process -Name node | Stop-Process -Force
```

### Issue: Build fails on Vercel

**Check:**
1. All environment variables are set in Vercel
2. DATABASE_URL is correct
3. No `.env.local` in git (check `.gitignore`)
4. All dependencies are in `package.json`

**Fix:**
```bash
# Push changes
git add .
git commit -m "Fix: Vercel build"
git push

# Vercel auto-redeploys
# If not, manually redeploy in Vercel dashboard
```

---

## 🔐 Environment Variables

### Development (.env.local)
```bash
DATABASE_URL=file:./prisma/dev.db
RESEND_API_KEY=re_test_key
NEXT_PUBLIC_FROM_EMAIL=test@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@lumeza.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production (Vercel Settings)
Set in Vercel Dashboard → Project Settings → Environment Variables
```bash
DATABASE_URL=file:./prisma/prod.db
RESEND_API_KEY=re_actual_key
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX (optional)
```

⚠️ **Never commit `.env.local` or real API keys**

---

## 📊 Utilities & Helpers

### Database Access (lib/prisma.ts)
```typescript
// Async client (for scripts)
import { prisma } from './lib/prisma';
const products = await prisma.product.findMany();

// Server component
import { prisma } from '@/lib/prisma';
const product = await prisma.product.findUnique({
  where: { slug: 'business-line-icons' }
});
```

### Email Service (lib/resend.ts)
```typescript
import { getResendClient } from '@/lib/resend';

const resend = getResendClient();
await resend.emails.send({
  from: process.env.NEXT_PUBLIC_FROM_EMAIL,
  to: email,
  subject: 'Subject',
  html: '<p>Content</p>'
});
```

---

## 📈 Monitoring & Analytics

### View Vercel Logs

1. Go to Vercel Dashboard
2. Select Project
3. **Deployments** → Click deployment → **Logs**

### Check API Performance

```bash
# Using curl
time curl https://yourdomain.com/api/products

# Response time should be < 500ms
```

### Database Size
```bash
# Check SQLite file size
ls -lh prisma/dev.db

# If > 1GB, consider migrating to PostgreSQL
```

---

## 🚀 Deployment Checklist

Before pushing to production:

```bash
# 1. Test locally
npm run dev
# Visit http://localhost:3000
# Test all main features

# 2. Build for production
npm run build
# Should complete with "successfully"

# 3. Check for TypeScript errors
npx tsc --noEmit
# Should show "0 errors"

# 4. Verify no secrets in code
grep -r "RESEND\|DATABASE\|API_KEY" app/
# Should find no actual values, only env calls

# 5. Check git status
git status
# Should NOT show .env.local

# 6. Commit and push
git add .
git commit -m "Production release: v0.1.0"
git push origin main

# 7. Vercel auto-deploys
# Monitor: https://vercel.com/dashboard
```

---

## 📚 Documentation Map

| Document | Purpose | For |
|----------|---------|-----|
| README.md | Main overview & getting started | Everyone |
| QUICK-REFERENCE.md | This file - daily operations | Developers |
| PRODUCTION-READY-CHECKLIST.md | Pre-launch verification | Before going public |
| DEPLOYMENT-INSTRUCTIONS.md | Step-by-step deployment | DevOps / launching |
| PRODUCT-UPDATE-GUIDE.md | Managing products | Content team |
| START-HERE-ANALYSIS-SUMMARY.md | Project analysis summary | Project managers |
| PROFESSIONAL-READINESS-ANALYSIS.md | Detailed gap analysis | Planning roadmap |
| PUBLIC-LAUNCH-ACTION-PLAN.md | 2-week launch plan | Implementation |
| RECOMMENDED-STRUCTURE.md | File organization guide | Architects |

---

## 🆘 Need Help?

### Check These First
1. QUICK-REFERENCE.md (this file) - Issues & fixes
2. PRODUCTION-READY-CHECKLIST.md - Pre-launch checklist  
3. Vercel Logs - Error details
4. Next.js Docs - https://nextjs.org/docs

### Contact
- Vercel Support: https://vercel.com/support
- Next.js Community: https://github.com/vercel/next.js/discussions

---

## ⚡ Pro Tips

### Speed Up Development
```bash
# Use npm ci instead of npm install (faster)
npm ci

# Skip build check during dev
npm run dev -- --no-turbopack
```

### Debug Issues
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check environment variables loaded
console.log(process.env.DATABASE_URL)

# Access Prisma Studio (visual database editor)
npx prisma studio --port 5556
```

### Optimize Performance
```bash
# Update dependencies (carefully)
npm update

# Audit for security vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

---

## 🎓 Learning Resources

### Next.js
- Official Docs: https://nextjs.org/docs
- Learn Page: https://nextjs.org/learn
- Examples: https://github.com/vercel/next.js/tree/canary/examples

### Prisma
- Official Docs: https://www.prisma.io/docs
- Prisma Studio: Visual database editor
- Community: https://www.prisma.io/community

### Vercel
- Docs: https://vercel.com/docs
- Deployment: https://vercel.com/docs/deployments
- Analytics: https://vercel.com/analytics

---

*Last Updated: March 8, 2026*  
*For Issues: Check logs first, then PRO TIPS section*
