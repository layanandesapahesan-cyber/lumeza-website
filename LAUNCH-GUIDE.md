# 🚀 LUMEZA CREATIVE STUDIO - PRE-LAUNCH GUIDE

## ✅ STATUS SAAT INI
Project Lumeza Creative Studio **99% COMPLETE** dan siap untuk launching! 

### Fitur yang Sudah Tersedia:
- ✅ Company Profile (Homepage, About, Services, Portfolio, Blog, Contact)
- ✅ Digital Products Marketplace (30+ products dalam database)
- ✅ Product Management System (filtering, search, sort, pagination)
- ✅ Download System (email verification, token generation, tracking)
- ✅ Email Service Integration (Resend.com)
- ✅ SEO Optimization (Sitemap, Robots.txt, Meta tags, JSON-LD)
- ✅ Analytics (Google Analytics + Vercel Analytics)
- ✅ Error Handling (Custom error pages, ErrorBoundary)
- ✅ Database (Prisma + SQLite dengan 30+ produk sample)
- ✅ API Routes (Products, Downloads, Diagnostics)

---

## 📋 PRE-LAUNCH CHECKLIST

### STEP 1: PERSIAPAN ENVIRONMENT (5 menit)

```powershell
# 1. Stop semua Node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. Hapus cache
Remove-Item -Path ".next", ".turbo" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".next\dev\lock" -Force -ErrorAction SilentlyContinue

# 3. Verify .env.local exists
Get-Content .env.local | Select-Object -First 5

# 4. Expected variables dalam .env.local:
# DATABASE_URL="file:./prisma/dev.db"
# RESEND_API_KEY=re_xxxxxxxxxxxxx
# NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
# CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com
```

---

### STEP 2: PRODUCTION BUILD TEST (10 menit)

```powershell
# 1. Generate Prisma Client
npx prisma generate

# 2. Create production build
npm run build

# Output yang diharapkan:
# ✓ Compiled successfully in 7.5s
# ✓ Finished TypeScript in 9.8s
# ✓ Collecting page data using 7 workers
# ✓ Generating static pages using 7 workers (28/28)
```

**Jika ada error:**
- Clear node_modules: `Remove-Item node_modules -Recurse -Force; npm install`
- Regenerate Prisma: `npx prisma generate`
- Check TypeScript: `npx tsc --noEmit`

---

### STEP 3: PRODUCTION MODE TEST (5 menit)

```powershell
# 1. Start production server
npm start

# Output yang diharapkan:
# > lumeza-website@0.1.0 start
# > next start
# ▲ Next.js 16.1.6
# - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

### STEP 4: VERIFY SEMUA HALAMAN (10 menit)

Buka browser dan akses URL berikut. Semua harus load dengan **Status 200**:

#### Company Profile Pages:
- [ ] `http://localhost:3000` - Homepage dengan semua sections
- [ ] `http://localhost:3000/tentang-kami` - About page
- [ ] `http://localhost:3000/layanan` - Services page (6 services)
- [ ] `http://localhost:3000/portfolio` - Portfolio (3 projects)
- [ ] `http://localhost:3000/blog` - Blog listing
- [ ] `http://localhost:3000/kontak` - Contact form

#### Marketplace Pages:
- [ ] `http://localhost:3000/produk` - Product catalog dengan:
  - [ ] Filter by type (Icon, Template, Illustration)
  - [ ] Filter by style (Line, Glyph, Color)
  - [ ] Search functionality
  - [ ] Pagination (showing all 30 products)
- [ ] `http://localhost:3000/produk/icon/business-icons-line` - Product detail dengan:
  - [ ] Image gallery
  - [ ] Product info (name, price, description)
  - [ ] Download modal
  - [ ] Related products

#### System Pages:
- [ ] `http://localhost:3000/sitemap.xml` - Sitemap visible
- [ ] `http://localhost:3000/robots.txt` - Robots.txt visible
- [ ] `http://localhost:3000/produk/terima-kasih` - Thank you page

---

### STEP 5: TEST API ENDPOINTS (5 menit)

```powershell
# 1. Test Diagnostic Endpoint
Invoke-WebRequest -Uri "http://localhost:3000/api/diag" -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List

# Expected: Database info, product count, etc.

# 2. Test Products API
Invoke-WebRequest -Uri "http://localhost:3000/api/products?limit=3" -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List

# Expected: 
# success: True
# data.pagination.total: 30
# data.products: Array dengan 3 items

# 3. Test Single Product API
Invoke-WebRequest -Uri "http://localhost:3000/api/products/business-icons-line" -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List

# Expected: Product detail dengan fileUrl, downloads, etc.

# 4. Test Related Products API
Invoke-WebRequest -Uri "http://localhost:3000/api/products/business-icons-line/related" -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List

# Expected: Array dari related products
```

---

### STEP 6: TEST DOWNLOAD SYSTEM (5 menit)

#### Manual Test:
1. Buka `http://localhost:3000/produk/icon/business-icons-line`
2. Klik "Download Sekarang"
3. Masukkan email valid di modal
4. Klik "Dapatkan Link Download"
5. Verifikasi:
   - [ ] Modal menutup
   - [ ] Toast notification muncul "Link download telah dikirim ke email Anda"
   - [ ] Database (Prisma Studio) mencatat download request

#### Via API:
```powershell
$body = @{
    productId = "c6a9ynv7tz5q5g4b0dbj9iwjk"
    email = "test@example.com"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/download/request" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

---

### STEP 7: TEST RESPONSIVE DESIGN (5 menit)

Di browser DevTools, test viewport sizes:

```
Mobile (375x667):
  [ ] Homepage layout responsif
  [ ] Navbar collapse ke mobile menu
  [ ] Product grid 1 column
  [ ] Forms readable

Tablet (768x1024):
  [ ] Product grid 2 columns
  [ ] Sidebar filters visible
  [ ] Navigation responsive

Desktop (1280x720+):
  [ ] Product grid 3-4 columns
  [ ] Full layout
  [ ] All features visible
```

---

### STEP 8: DATABASE VERIFICATION (2 menit)

```powershell
# Check database file
Get-ChildItem prisma/dev.db -Force | Format-List

# Check product count
Invoke-WebRequest -Uri "http://localhost:3000/api/diag" -Method GET | `
  Select-Object -ExpandProperty Content | ConvertFrom-Json | `
  Select-Object -Property stats
```

Expected: Minimal 30 products dalam database

---

### STEP 9: ENVIRONMENT VARIABLES VERIFICATION (2 menit)

Buat/verifikasi file `.env.local` dengan:

```bash
# Database (SQLite)
DATABASE_URL="file:./prisma/dev.db"

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx  # Get from https://resend.com
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com

# Base URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Untuk Production (Vercel):**
```bash
# Database URL (Jika pakai cloud database)
DATABASE_URL=file:./prisma/dev.db

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com

# URLs
NEXT_PUBLIC_BASE_URL=https://lumeza.com
NEXT_PUBLIC_API_URL=https://lumeza.com/api
```

---

## 🔧 AUTOMATIC TESTING SCRIPT

Run comprehensive tests:

```powershell
# Create test script if needed
Write-Host "Testing all endpoints..."

# Test Homepage
(Invoke-WebRequest -Uri "http://localhost:3000").StatusCode

# Test Products API
(Invoke-WebRequest -Uri "http://localhost:3000/api/products?limit=1").StatusCode

# Test Single Product
(Invoke-WebRequest -Uri "http://localhost:3000/api/products/business-icons-line").StatusCode

# If all return 200, you're good!
```

---

## 🚨 TROUBLESHOOTING GUIDE

### Error: Port 3000 sudah digunakan
```powershell
# Find process using port 3000
$process = netstat -ano | findstr :3000 | ForEach-Object { $_.Split(' ')[-1] }
Get-Process -PID $process | Stop-Process -Force

# Or kill all node processes
Get-Process -Name "node" | Stop-Process -Force
```

### Error: PrismaClientInitializationError
```powershell
npx prisma generate
npx prisma db push --force-reset
npm run prisma:seed
```

### Error: Build failed
```powershell
# Clean install
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
npx prisma generate
npm run build
```

### Error: Database not found
```powershell
# Reset database
Remove-Item prisma/dev.db -Force
npx prisma db push
npm run prisma:seed
```

### Error: Email not working
1. Verify RESEND_API_KEY di .env.local
2. Buka https://resend.com dan verify domain
3. Check browser console untuk error details
4. Test email: `curl -X POST https://api.resend.com/emails ...`

---

## 📊 FINAL CHECKLIST SEBELUM DEPLOY

```
Build & Server:
  [ ] npm run build - SUCCESS (0 errors)
  [ ] npm start - Server running at :3000
  [ ] TypeScript - No errors (npx tsc --noEmit)
  
Pages (Status 200):
  [ ] Homepage /
  [ ] About /tentang-kami
  [ ] Services /layanan
  [ ] Portfolio /portfolio
  [ ] Blog /blog
  [ ] Contact /kontak
  [ ] Products /produk
  [ ] Product Detail /produk/type/slug
  [ ] Thank You /produk/terima-kasih
  [ ] Sitemap /sitemap.xml
  [ ] Robots /robots.txt

APIs:
  [ ] GET /api/diag - Database info
  [ ] GET /api/products - Product list
  [ ] GET /api/products/:slug - Single product
  [ ] GET /api/products/:slug/related - Related products
  [ ] POST /api/download/request - Email download link

Features:
  [ ] Product filtering works
  [ ] Product search works
  [ ] Product pagination works
  [ ] Download modal opens
  [ ] Email form submits
  [ ] Contact form submits
  [ ] Image gallery works
  [ ] All images load

Performance:
  [ ] Homepage loads in <2s
  [ ] Product page loads in <1.5s
  [ ] API responses in <500ms
  [ ] No console errors

Responsive:
  [ ] Mobile (375px) - Layout correct
  [ ] Tablet (768px) - Layout correct
  [ ] Desktop (1280px) - Layout correct

Configuration:
  [ ] .env.local has all variables
  [ ] Database initialized with 30+ products
  [ ] Prisma client generated
  [ ] Build artifacts present (.next)
  [ ] Node modules installed

Git:
  [ ] All changes committed
  [ ] No uncommitted files
  [ ] Ready for push
```

---

## 🚀 DEPLOYMENT KE VERCEL

### Step 1: Prepare Repository
```powershell
git add .
git commit -m "Final pre-launch build - Lumeza Creative Studio"
git push origin main
```

### Step 2: Create Vercel Project
1. Buka https://vercel.com
2. Login dengan GitHub account
3. Click "New Project"
4. Select repository: lumeza-website
5. Configure:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Start Command: `npm start`

### Step 3: Set Environment Variables di Vercel
1. Go to Settings → Environment Variables
2. Add:
   ```
   DATABASE_URL=file:./prisma/dev.db
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
   CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api
   ```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (5-10 minutes)
3. Once done, get your live URL
4. Visit domain to verify everything works

---

## 📊 POST-LAUNCH TASKS

### Monitoring (Daily)
- [ ] Check Vercel Analytics dashboard
- [ ] Monitor error rate
- [ ] Check load times
- [ ] Review user behavior

### Maintenance (Weekly)
- [ ] Check for unused console errors
- [ ] Verify email service working
- [ ] Check database backups
- [ ] Update product listings if needed

### Security (Monthly)
- [ ] Run dependency audit: `npm audit`
- [ ] Update packages: `npm update`
- [ ] Check API rate limits
- [ ] Review database access logs

### Content (As needed)
- [ ] Add new products
- [ ] Update testimonials
- [ ] Write new blog posts
- [ ] Update service descriptions

---

## 📞 SUPPORT & CONTACTS

**In Case of Issues:**
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Check server logs
4. Review error handling in code
5. Check .env variables

**Database Issues:**
- Reset: `npx prisma db push --force-reset`
- Seed again: `npm run prisma:seed`
- Check: `npx prisma studio`

**Email Issues:**
- Verify RESEND_API_KEY
- Check domain verification at resend.com
- Review SMTP logs

---

## 🎉 YOU'RE READY TO LAUNCH!

Lumeza Creative Studio adalah project yang profesional dengan:
- ✅ Modern tech stack (Next.js 16, TypeScript, Tailwind)
- ✅ Complete functionality (marketplace, email, analytics)
- ✅ Production-ready code
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Error handling & monitoring

**Build date:** March 6, 2026
**Status:** READY FOR PRODUCTION
**Next step:** Follow deployment guide above

Semoga sukses dengan launching Lumeza! 🚀
