# Lumeza Creative Studio - Website

Website marketplace digital untuk Lumeza Creative Studio dengan sistem download produk digital seperti icons8, templates, dan ilustrasi.

## 🚀 Fitur Utama

- ✅ Company Profile (Beranda, Tentang, Layanan, Portfolio)
- ✅ Marketplace Produk Digital (Icons, Templates, Illustrations)
- ✅ Sistem Download dengan Email Verification
- ✅ Full SEO Optimization (Sitemap, Robots.txt, Meta tags, Schema)
- ✅ Google Analytics / Vercel Analytics Integration
- ✅ Error Boundaries & Loading States
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Performance Optimized (Image optimization, Caching)

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Git (untuk deployment ke Vercel)
- GitHub account (untuk connect ke Vercel)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite + Prisma ORM
- **Styling**: Tailwind CSS
- **Email**: Resend API
- **Hosting**: Vercel (recommended)
- **Analytics**: Google Analytics / Vercel Analytics

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/lumeza-website.git
cd lumeza-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` dan isi dengan template berikut:

```dotenv
# Database Configuration
DATABASE_URL="file:./prisma/dev.db"

# Resend Email Service (Get key dari https://resend.com)
RESEND_API_KEY=re_your_resend_api_key_here
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com

# Base URL (untuk development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Analytics - Google Analytics (Optional)
# NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX

# Email Configuration
NEXT_PUBLIC_CONTACT_EMAIL=hello@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Seed database dengan data contoh
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Akses http://localhost:3000 di browser Anda.

## 🧪 Testing

### Test API Endpoints

```bash
# List all products
curl "http://localhost:3000/api/products?limit=12&page=1"

# Get product detail
curl "http://localhost:3000/api/products/[slug]"

# Get related products
curl "http://localhost:3000/api/products/[slug]/related"

# Diagnostic endpoint
curl "http://localhost:3000/api/diag"
```

### Test SEO

```bash
# Check sitemap
curl "http://localhost:3000/sitemap.xml"

# Check robots.txt
curl "http://localhost:3000/robots.txt"
```

### Build for Production

```bash
# Test production build
npm run build
npm start
```

## 🚀 Deployment ke Vercel

### Option 1: Vercel Dashboard (Recommended)

#### Step 1: Push ke GitHub

```bash
git add .
git commit -m "Final touch - SEO optimization"
git push origin main
```

#### Step 2: Connect ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub account
3. Klik "New Project"
4. Select repository "lumeza-website"
5. Klik "Import"

#### Step 3: Configure Environment Variables

1. Di Vercel dashboard, buka project settings
2. Pergi ke "Environment Variables"
3. Tambahkan variables berikut:

```
DATABASE_URL=file:./prisma/dev.db
RESEND_API_KEY=re_xxxxxxxxxxxxx (dari https://resend.com)
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_CONTACT_EMAIL=hello@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX (optional - Google Analytics)
```

#### Step 4: Deploy

1. Klik "Deploy"
2. Tunggu hingga deployment selesai (biasanya 2-3 menit)
3. Akses domain default Vercel Anda

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

## 🔗 Setup Custom Domain

### 1. Di Vercel Dashboard

1. Pergi ke Project Settings → Domains
2. Klik "Add"
3. Masukkan domain Anda (misal: lumeza.com)

### 2. Update DNS Settings

Di registrar domain Anda, tambahkan CNAME record:

```
CNAME: lumeza.com → cname.vercel-dns.com
```

Atau jika menggunakan root domain (@), buat A record:

```
A: 76.76.19.132
```

> Note: Propagasi DNS bisa memakan waktu 24-48 jam

### 3. Setup SSL

Vercel otomatis setup SSL certificate (Let's Encrypt). Tunggu ~ 24 jam.

## 📊 Setup Analytics

### Google Analytics (Recommended untuk lebih detail)

1. Buka https://analytics.google.com
2. Buat property baru
3. Copy "Measurement ID" (G_XXXXXXXXXX)
4. Tambahkan ke environment variable:

```
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
```

5. Deploy ke Vercel

### Vercel Analytics (Simpler alternative)

1. Di Vercel dashboard, buka Project → Analytics
2. Enable Web Analytics
3. Data akan otomatis dikumpulkan

## 📧 Setup Email Service (Resend)

### 1. Create Resend Account

1. Buka https://resend.com
2. Sign up dengan email Anda
3. Verifikasi email

### 2. Setup Domain

1. Di Resend dashboard, pergi ke "Domains"
2. Klik "Add Domain"
3. Masukkan domain Anda (misal: lumeza.com)
4. Update DNS records sesuai instruksi Resend

### 3. Get API Key

1. Di Resend dashboard, pergi ke "API Keys"
2. Buat key baru
3. Copy key dan tambahkan ke env:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 4. Test Email

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_xxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@lumeza.com",
    "to": "test@example.com",
    "subject": "Hello World",
    "html": "<strong>It works!</strong>"
  }'
```

## 🔍 SEO Checklist

- ✅ Sitemap.xml di `/sitemap.xml`
- ✅ robots.txt di `/robots.txt`
- ✅ Meta tags di setiap halaman
- ✅ Open Graph tags untuk social media
- ✅ JSON-LD schema untuk organization dan products
- ✅ Mobile responsive
- ✅ Page speed optimized
- ✅ Canonical URLs
- ✅ Alt text di semua images

## 📱 Mobile Responsive Check

### Chrome DevTools

1. Buka Chrome DevTools (F12)
2. Klik device toggle (Ctrl+Shift+M)
3. Test di berbagai ukuran:
   - iPhone 12: 390×844
   - iPad: 768×1024
   - Desktop: 1920×1080

### Online Tools

- https://responsivedesignchecker.com
- https://mobiletest.me
- https://browserstack.com

## ⚡ Performance Optimization Tips

### Image Optimization

- Gunakan Next.js `Image` component
- Lazy loading otomatis
- Multiple formats (WebP, AVIF)

### Caching Strategy

```typescript
// Next.config.js sudah configured dengan:
// - 1 year cache untuk images
// - 1 hour cache untuk API responses
// - 24 hours cache untuk sitemap & robots.txt
```

### Bundle Analysis

```bash
# Check bundle size
npm install @next/bundle-analyzer

# Analyze
ANALYZE=true npm run build
```

## 🐛 Troubleshooting

### Build Gagal di Vercel

**Error**: `PrismaClientInitializationError`

**Solution**:
```bash
# Di local, reinstall Prisma
npm install @prisma/client @prisma/adapter-better-sqlite3

# Regenerate Prisma
npx prisma generate

# Push ke repo
git add . && git commit -m "Fix Prisma" && git push
```

### Database Error di Vercel

**Problem**: Vercel filesystem bersifat ephemeral (file hilang setiap deploy)

**Solution 1**: Gunakan PostgreSQL atau MySQL

```bash
# Update .env.local dengan PostgreSQL URL
DATABASE_URL="postgresql://user:password@host:port/database"
```

**Solution 2**: Keep SQLite untuk development, upgrade later

Untuk production, gunakan PostgreSQL (recommended).

### Email Tidak Terkirim

**Check**:
1. Verify RESEND_API_KEY benar
2. Verify domain di Resend dashboard
3. Check email di spam folder
4. Test dengan direct API call

### Analytics Tidak Tercatat

**Check**:
1. GA_ID benar
2. Website sudah diverifikasi di Google Analytics
3. Tunggu 24 jam untuk data muncul
4. Check browser console untuk errors

### Sitemap/Robots Not Working

**Solution**:
```bash
# Clear build cache
rm -rf .next

# Rebuild
npm run build

# Deploy
git push
```

## 📞 Support & Contact

- Email: hello@lumeza.com
- Website: https://lumeza.com
- Instagram: @lumeza_studio

## 📄 License

Copyright © 2024 Lumeza Creative Studio. All rights reserved.

## 🎯 Pre-Launch Checklist

Sebelum launching, pastikan:

- [ ] Build tidak ada error: `npm run build`
- [ ] Semua pages accessible: check 200 status code
- [ ] API endpoints working: test dengan curl
- [ ] Database seeded: minimal 30 produk
- [ ] Images displayed: tidak ada broken links
- [ ] Forms working: contact form dan download modal
- [ ] Responsive: test di mobile, tablet, desktop
- [ ] SEO: sitemap.xml dan robots.txt available
- [ ] Analytics: terintegrasi dan mencatat events
- [ ] Environment variables: semua terisi di Vercel
- [ ] Custom domain: DNS sudah propagate
- [ ] Email: test dengan send email
- [ ] Performance: Google PageSpeed score > 80

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)
- [Resend Email](https://resend.com/docs)
- [Google Analytics](https://support.google.com/analytics)

---

**Happy coding! 🚀**

Untuk pertanyaan atau bantuan, hubungi tim development kami.
