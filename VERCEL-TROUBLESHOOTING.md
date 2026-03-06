# 🚨 VERCEL DEPLOYMENT TROUBLESHOOTING GUIDE

**Status**: DEPLOYMENT_NOT_FOUND
**Project**: Lumeza Creative Studio
**Repository**: https://github.com/layanandesapahesan-cyber/lumeza-website

---

## 📋 Daftar Isi
1. [Build Failures](#build-failures)
2. [TypeScript Errors](#typescript-errors)
3. [Environment Variables Issues](#environment-variables-issues)
4. [Database Connection Issues](#database-connection-issues)
5. [Common Runtime Errors](#common-runtime-errors)
6. [Deployment Status Issues](#deployment-status-issues)
7. [Performance & Monitoring](#performance--monitoring)

---

## 🔴 Build Failures

### Error: "Build failed with exit code 1"

#### Penyebab Umum:
1. TypeScript compilation error
2. Missing environment variables
3. Prisma adapter issue
4. Missing dependencies

#### Solusi:

```powershell
# 1. Cek TypeScript locally
npx tsc --noEmit

# 2. Clean build
rm -r .next
npm run build

# 3. Cek dependencies
npm install

# 4. Regenerate Prisma
npx prisma generate

# 5. Push ke Vercel
git add .
git commit -m "Fix: rebuild"
git push origin main
```

**Kunci**: Selalu jalankan `npm run build` di local SEBELUM push!

---

## ⚠️ TypeScript Errors

### Error: "Parameter 'error' implicitly has an 'any' type"

**Lokasi**: Biasanya di `.catch()` block

**Yang SALAH**:
```typescript
.catch((error) => {
  console.error('Error:', error)
})
```

**Yang BENAR**:
```typescript
.catch((error: unknown) => {
  console.log('Error incrementing views:', error)
})
```

#### File Yang Sudah Diperbaiki:
- ✅ `app/api/products/[slug]/route.ts` (Line 65)
- ✅ `app/api/products/route.ts`
- ✅ `app/api/products/[slug]/related/route.ts`
- ✅ `app/api/download/[token]/route.ts`
- ✅ `app/api/download/request/route.ts`
- ✅ `app/api/contact/route.ts`
- ✅ `app/api/diag/route.ts`

#### Jika Masih Ada Error:

```powershell
# Cari semua catch blocks
grep -r "\.catch" app/ --include="*.ts" --include="*.tsx"

# Pastikan semua sudah punya tipe
```

### Error: "Cannot find module or type definition"

```powershell
# Regenerate Prisma client
npx prisma generate

# Install missing packages
npm install

# Clear cache
rm -r node_modules
npm install
```

---

## ⚙️ Environment Variables Issues

### Error: "RESEND_API_KEY is not defined"

**Cek di Vercel Dashboard**:
1. Settings → Environment Variables
2. Pastikan semua variabel ada untuk production:

| Variable | Status | Notes |
|----------|--------|-------|
| DATABASE_URL | ✅ Required | `file:./prisma/dev.db` |
| RESEND_API_KEY | ✅ Required | Get from https://resend.com |
| NEXT_PUBLIC_FROM_EMAIL | ✅ Required | `noreply@lumeza.com` |
| NEXT_PUBLIC_BASE_URL | ⚠️ Optional | `https://lumeza-website.vercel.app` |
| NEXT_PUBLIC_API_URL | ⚠️ Optional | `https://lumeza-website.vercel.app/api` |
| NEXT_PUBLIC_CONTACT_EMAIL | ✅ Required | `hello@lumeza.com` |
| CONTACT_FORM_RECIPIENT_EMAIL | ✅ Required | `hello@lumeza.com` |

#### Solusi:
1. Buka https://vercel.com/layanandesapahesan-cyber/lumeza-website
2. Klik **Settings** tab
3. Pilih **Environment Variables**
4. Tambahkan masing-masing variable:
   - Key: `RESEND_API_KEY`
   - Value: `re_yourcompleterealkey...`
5. Pilih environments: **Production**, **Preview**, **Development**
6. Klik **Save**

#### Troubleshoot RESEND_API_KEY:
```powershell
# Cek format key
($env:RESEND_API_KEY -match "^re_[a-zA-Z0-9]+$") ? "Valid format" : "Invalid format"

# Key harus dimulai dengan "re_"
# Contoh: re_7m8oXBbNzPJcGlxPaUfP9xOf
```

### "BUILD_ENV_IS_IMMUTABLE" Error

Jangan embed credentials di code! Gunakan environment variables:

❌ **SALAH**:
```typescript
const apiKey = "re_hardcoded_key_12345"
```

✅ **BENAR**:
```typescript
const apiKey = process.env.RESEND_API_KEY // Dari env var
```

---

## 🗄️ Database Connection Issues

### Error: "Cannot find module 'better-sqlite3'"

**Penyebab**: Adapter Prisma tidak ter-install dengan benar

#### Solusi:

```powershell
# 1. Clean install Prisma & adapter
rm -r node_modules/@prisma
npm install @prisma/client @prisma/adapter-better-sqlite3

# 2. Regenerate Prisma client
npx prisma generate

# 3. Update Prisma schema jika perlu
# File: prisma/schema.prisma
# Pastikan datasource punya adapter:
#
# datasource db {
#   provider = "sqlite"
#   url      = env("DATABASE_URL")
#   directUrl = env("DIRECT_URL")
# }

# 4. Verify database file exists
ls -la prisma/dev.db
```

### Error: "ENOENT: no such file or directory, 'prisma/dev.db'"

Database file belum dibuat. Solusi:

```powershell
# Buat database dan seed data
npx prisma db push
npx prisma db seed

# Verify
ls -la prisma/dev.db
```

### Error: "Prisma schema file not found"

```powershell
# Regenerate
npx prisma generate

# atau reset dan setup ulang
npx prisma migrate reset (HATI-HATI: Hapus semua data!)
```

#### Connection String Issues:

**LOCAL** (development):
```
DATABASE_URL=file:./prisma/dev.db
```

**VERCEL** (production):
```
DATABASE_URL=file:./prisma/dev.db
```

✅ **CATATAN**: SQLite di Vercel terbatas, gunakan untuk testing saja!

---

## 🔧 Common Runtime Errors

### Error: "Cannot read property 'json' of undefined"

API response parsing error:

```typescript
// ❌ SALAH
const data = response.json()

// ✅ BENAR
const data = await response.json()
```

### Error: "fetch is not a function"

Gunakan built-in fetch (Next.js 13+):

```typescript
// Sudah built-in, jangan import dari node-fetch
const response = await fetch('/api/products')
```

### Error: "Prisma Client not initialized"

```typescript
// ❌ SALAH
import prisma from '@/lib/prisma'
const product = prisma.product.findUnique(...)

// ✅ BENAR (async required)
import prisma from '@/lib/prisma'
const product = await prisma.product.findUnique(...)
```

---

## 📊 Deployment Status Issues

### Error: "DEPLOYMENT_NOT_FOUND" (404)

**Penyebab**: 
- Project Vercel belum terhubung dengan GitHub
- Deployment belum pernah berhasil
- Konfigurasi deployment mungkin salah

#### Solusi Lengkap:

**STEP 1: Verifikasi GitHub Connection**
```
1. Buka: https://vercel.com/layanandesapahesan-cyber/lumeza-website
2. Klik Settings → Git
3. Pastikan:
   ✓ Repository: layanandesapahesan-cyber/lumeza-website
   ✓ Branch: main
   ✓ Production branch protection: ON
```

**STEP 2: Check Build & Deployment Settings**
```
Settings → General:
✓ Framework: Next.js
✓ Node Version: 18.x (atau 20.x)
✓ Build Command: npm run build ✓ Output Directory: .next
✓ Install Command: npm install
```

**STEP 3: Configure Environment Variables**
```
Settings → Environment Variables:
Pastikan SEMUA 7 variables sudah set untuk Production:

- DATABASE_URL = file:./prisma/dev.db
- RESEND_API_KEY = re_xxxxx...
- NEXT_PUBLIC_FROM_EMAIL = noreply@lumeza.com
- NEXT_PUBLIC_BASE_URL = https://lumeza-website.vercel.app
- NEXT_PUBLIC_API_URL = https://lumeza-website.vercel.app/api
- NEXT_PUBLIC_CONTACT_EMAIL = hello@lumeza.com
- CONTACT_FORM_RECIPIENT_EMAIL = hello@lumeza.com
```

**STEP 4: Push Code & Trigger Deployment**
```powershell
cd c:\Users\Meiliastudio\lumeza-website
git push origin main

# Vercel akan auto-detect push dan mulai build
# Monitor di: https://vercel.com/layanandesapahesan-cyber/lumeza-website/deployments
```

**STEP 5: Manual Redeploy (Jika Perlu)**
```
1. Buka Deployments tab
2. Klik ... (tiga titik) pada recent deployment
3. Pilih "Redeploy"
4. Uncheck "Use existing Build Cache"
5. Klik "Redeploy"
```

### Mencegah 404 Deployment Not Found di Masa Depan:

✅ Selalu push code sebelum expect deployment  
✅ Tunggu webhook GitHub trigger Vercel build  
✅ Monitor Deployments tab  
✅ Setup Slack/Email notifications di Vercel  

---

## 🚀 Performance & Monitoring

### Cara Monitoring Build di Vercel:

1. **Dashboard Realtime**:
   - Open: https://vercel.com/layanandesapahesan-cyber/lumeza-website
   - Klik tab "Deployments"
   - Lihat status current build

2. **Build Status Symbols**:
   ```
   🔵 Queued    → Menunggu di queue
   🔵 Building  → Sedang build (2-5 menit)
   🟢 Ready     → Deploy berhasil!
   🔴 Failed    → Ada error, klik untuk lihat log
   ```

3. **Lihat Build Log**:
   - Klik deployment yang failed
   - Klik "View Function Logs"
   - Cari error message

### Optimization untuk Build Time:

```powershell
# Cek dependency size
npm ls --depth=0

# Analyze build size
npm run build  # Tunggu selesai

# Output biasanya di akhir:
# ✓ Compiled successfully
# ✓ Linted successfully
# ✓ Compiled server and client successfully
```

---

## 📞 Checklist Sebelum Redeploy

Jalankan sebelum push final:

```powershell
# 1. Type check
npx tsc --noEmit

# 2. Build test
npm run build

# 3. Git status
git status

# 4. Git log (verify last commit)
git log -1

# 5. Check .env local
cat .env.local | grep -E "RESEND|DATABASE|EMAIL"
```

**Semua passing?** ✅ Siap deploy!

---

## 🎯 Quick Redeploy Command

```powershell
# One-liner untuk full redeploy
cd c:\Users\Meiliastudio\lumeza-website ; `
git add . ; `
git commit -m "Fix: redeploy to Vercel" ; `
git push origin main ; `
Write-Host "✅ Pushed! Check Vercel Deployments tab..." -ForegroundColor Green ; `
Start-Process "https://vercel.com/layanandesapahesan-cyber/lumeza-website/deployments"
```

---

## 📚 Helpful Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Resend Docs**: https://resend.com/docs
- **Project Repo**: https://github.com/layanandesapahesan-cyber/lumeza-website

---

**Last Updated**: March 6, 2026  
**Status**: All systems operational for redeploy  
**Next Action**: Run `redeploy-vercel.ps1`
