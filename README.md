# 🎨 Lumeza Creative Studio - Digital Marketplace

Website modern marketplace produk digital untuk Lumeza Creative Studio, dibangun dengan Next.js 16, React 18, TypeScript, Prisma ORM, dan Tailwind CSS.

## 🚀 Fitur Utama

### ✅ Website Company Profile
- **Responsive Design**: Website yang sempurna di semua ukuran layar
- **SEO Optimized**: Metadata yang tepat dan struktur HTML yang semantik
- **Performance**: Optimized images, code splitting, dan lazy loading
- **Interactive Components**: Navbar responsif, form kontak, dan animasi smooth

### ✅ Digital Marketplace (seperti Icons8)
- **Product Catalog**: Katalog produk dengan filtering & search
- **Product Detail Pages**: Halaman detail produk dengan gallery & tabs
- **Download System**: Sistem download dengan email verification
- **Email Service**: Integrasi Resend untuk pengiriman link download
- **Database**: Prisma ORM dengan SQLite untuk development
- **Type Safe**: Full TypeScript support

### 🔄 Fitur Dalam Pengembangan
- **Payment Gateway**: Integrasi Midtrans/Xendit untuk produk berbayar
- **User Authentication**: NextAuth.js untuk login & wishlist
- **Admin Dashboard**: CRUD management untuk produk
- **Analytics**: Google Analytics & performance monitoring

## �️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM v7.4.2 + SQLite (better-sqlite3)
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Email Service**: Resend
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Dependencies

### Core Dependencies
```json
{
  "next": "16.1.6",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "typescript": "^5.6.3",
  "tailwindcss": "^3.4.14",
  "@prisma/client": "^7.4.2",
  "prisma": "^7.4.2",
  "better-sqlite3": "^12.0.0"
}
```

### UI & Forms
```json
{
  "react-hook-form": "^7.53.2",
  "react-hot-toast": "^2.4.1",
  "lucide-react": "^0.468.0"
}
```

### Email Service
```json
{
  "resend": "^4.0.1"
}
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd lumeza-website
npm install
```

### 2. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed database with sample data
node prisma/seed-better-sqlite.js
```

### 3. Setup Email Service (Opsional)
```bash
# Copy environment file
cp .env.example .env.local

# Add your Resend API key
echo "RESEND_API_KEY=your_resend_api_key_here" >> .env.local
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma db push   # Push schema changes to database
npx prisma generate  # Generate Prisma client

# Testing
npm run test         # Run tests (if available)
```

## 🔧 Configuration

### Environment Variables (.env.local)
```env
# Database
DATABASE_URL="file:./dev.db"

# Email Service (Opsional)
RESEND_API_KEY=your_resend_api_key_here
```

### Database Schema
Database menggunakan Prisma ORM dengan SQLite untuk development. Schema terletak di `prisma/schema.prisma`.

### Email Setup
Untuk setup email service lengkap, lihat [EMAIL_SETUP.md](./EMAIL_SETUP.md).

## 🌐 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy!

### Manual Deployment
```bash
npm run build
npm run start
```

## 📱 Pages & Routes

### Company Profile
- `/` - Beranda
- `/tentang-kami` - Tentang Kami
- `/layanan` - Layanan
- `/portfolio` - Portfolio
- `/kontak` - Kontak

### Marketplace
- `/produk` - Katalog produk
- `/produk/[type]` - Katalog berdasarkan kategori
- `/produk/[type]/[slug]` - Detail produk
- `/produk/terima-kasih` - Halaman terima kasih

### Development
- `/test-email` - Test email service

## 🔍 API Routes

### Products API
- `GET /api/products` - List products dengan filtering
- `GET /api/products/[id]` - Detail product
- `GET /api/products/[id]/related` - Related products

### Download API
- `POST /api/download/request` - Request download link
- `GET /api/download/[token]` - Download file dengan token

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
npx prisma db push --force-reset
node prisma/seed-better-sqlite.js

# Check database file
ls -la prisma/dev.db
```

### Email Service Issues
```bash
# Test email service
# Visit http://localhost:3000/test-email

# Check environment variables
echo $RESEND_API_KEY
```

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules
rm -rf node_modules
npm install
```

### Common Errors

#### Prisma Client Error
```
Error: @prisma/client did not initialize yet
```
**Solution**: Run `npx prisma generate`

#### SQLite Error
```
Error: SQLITE_CANTOPEN: unable to open database file
```
**Solution**: Check file permissions and database path

#### Email Service Error
```
Error: RESEND_API_KEY is required
```
**Solution**: Add `RESEND_API_KEY` to `.env.local`

## ❓ FAQ

### Q: Bagaimana cara menambah produk baru?
A: Edit file `prisma/seed-better-sqlite.js` dan tambahkan data produk, lalu jalankan `node prisma/seed-better-sqlite.js`

### Q: Bagaimana cara mengubah email template?
A: Edit fungsi `generateDownloadEmailHtml` di `lib/resend.ts`

### Q: Bagaimana cara menambah kategori produk baru?
A: Tambahkan kategori di `prisma/seed-better-sqlite.js` dan update schema jika perlu

### Q: Bagaimana cara testing download system?
A: 
1. Buka halaman produk
2. Klik "Download Gratis"
3. Masukkan email di modal
4. Cek email untuk link download
5. Klik link untuk download file

### Q: Bagaimana cara deploy ke production?
A: 
1. Setup database production (PostgreSQL/MySQL)
2. Update `DATABASE_URL` di environment variables
3. Run `npx prisma db push` untuk production
4. Deploy ke Vercel/Netlify

## 🎯 Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb config dengan custom rules
- **Prettier**: Code formatting
- **Components**: Functional components dengan hooks

### Database
- **Prisma**: Type-safe database access
- **Migrations**: Gunakan `prisma db push` untuk development
- **Seeding**: Sample data di `prisma/seed-better-sqlite.js`

### Email Service
- **Resend**: Transactional email service
- **Templates**: HTML templates untuk professional emails
- **Testing**: Test page di `/test-email`

### Performance
- **Images**: Next.js Image component dengan optimization
- **Code Splitting**: Automatic dengan Next.js
- **Caching**: ISR untuk static pages

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is private and proprietary to Lumeza Creative Studio.

## 📞 Support

Untuk pertanyaan atau dukungan:
- Email: support@lumeza.com
- WhatsApp: +62 xxx xxxx xxxx

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Font**: System fonts (Tailwind default)

## 📦 Installation

### Prerequisites
- Node.js 16+ dan npm/yarn/pnpm

### Setup

1. **Clone/Extract repository**
   ```bash
   cd lumeza-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) untuk melihat website.

## 🚀 Build untuk Production

```bash
npm run build
npm start
```

## 📄 Halaman-Halaman Utama

### 1. Beranda (`/`)
- Hero section dengan call-to-action
- Layanan dalam grid 6 item
- Proses kerja 5 langkah
- Tim kreatif showcase
- CTA section

### 2. Tentang Kami (`/tentang-kami`)
- Cerita & passion Lumeza
- Misi & visi
- Nilai-nilai perusahaan
- Statistik & achievements

### 3. Layanan (`/layanan`)
- List semua 6 layanan
- Detail layanan individual
- Related services
- Contact form untuk setiap layanan

### 4. Portfolio (`/portfolio`)
- Grid portfolio dengan filter
- Detail portfolio individual
- Project details dan results
- Related projects

### 5. Kontak (`/kontak`)
- Contact information
- Contact form
- Map/lokasi
- FAQ section
- Multiple contact methods

## 🎨 Customization

### Warna & Tema
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',    // Ubah warna primary
      secondary: '#ec4899',  // Ubah warna secondary
      accent: '#f59e0b',     // Ubah warna accent
    },
  },
}
```

### Konten Statis
Edit file di `lib/constants/`:
- `site.ts` - Info situs, contact, social media
- `services.ts` - Data layanan
- `team.ts` - Data tim
- `process.ts` - Data proses kerja

### Images & Assets
Letakkan image di folder `public/images/` dan reference dalam component dengan:
```jsx
import Image from 'next/image'
<Image src="/images/..." alt="..." />
```

## 📧 Contact Form Setup

Contact form saat ini log data ke console. Untuk mengirim email, integrate dengan service seperti:

- **SendGrid**: Set `SENDGRID_API_KEY` di `.env.local`
- **Resend**: Set `RESEND_API_KEY` di `.env.local`
- **Nodemailer**: Setup SMTP credentials

Edit `app/api/contact/route.ts` untuk mengaktifkan email sending.

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 SEO Best Practices

- ✅ Meta descriptions untuk setiap halaman
- ✅ Open Graph meta tags
- ✅ Semantic HTML
- ✅ Image optimization
- ✅ Sitemap (dapat ditambahkan)
- ✅ robots.txt (dapat ditambahkan)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Others (netlify, railway, etc.)
Pastikan environment variables sudah di-setup di platform hosting Anda.

## 📝 Environment Variables

```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Email Configuration (optional)
# SENDGRID_API_KEY=your_api_key
# RESEND_API_KEY=your_api_key
```

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
```bash
npm run dev -- -p 3001
```

### Module not found
Pastikan path alias di `tsconfig.json` sudah benar:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Tailwind CSS tidak bekerja
```bash
npm install -D tailwindcss postcss autoprefixer
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

© 2024 Lumeza Creative Studio. All rights reserved.

## 🤝 Support

Untuk pertanyaan atau support, hubungi tim Lumeza:
- Email: hello@lumeza.com
- Phone: +62 21 1234 5678
- WhatsApp: +62 811 2345 6789
