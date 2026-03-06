# 🎉 LUMEZA AUTOMATION SCRIPTS GUIDE

## 📋 Daftar Isi
1. [Overview](#overview)
2. [Script Descriptions](#script-descriptions)
3. [Setup Instructions](#setup-instructions)
4. [Cara Menggunakan](#cara-menggunakan)
5. [Troubleshooting](#troubleshooting)
6. [Post-Launch Tips](#post-launch-tips)

---

## Overview

Dirancang untuk **mengotomasi seluruh proses** dari development hingga production deployment:

```
🖥️  Local Development
    ↓
📦 Build & Test Production
    ↓
📤 Push ke GitHub
    ↓
🚀 Deploy ke Vercel Production
    ↓
✅ Live on Vercel
```

### 4 Script yang Tersedia:

| Script | Fungsi | Waktu |
|--------|--------|-------|
| **git-automate.ps1** | Push ke GitHub otomatis | ~2-5 min |
| **vercel-deploy.ps1** | Deploy ke Vercel otomatis | ~3-5 min |
| **launch.ps1** | All-in-one (build + git + deploy) | ~10-15 min |
| **reset-db.ps1** | Reset database untuk dev | ~1 min |

---

## Script Descriptions

### 1. **git-automate.ps1** 📦
**Fungsi**: Mengelola git workflow

```powershell
.\git-automate.ps1
```

**Apa yang dilakukan:**
- ✅ Inisialisasi git repository (jika belum ada)
- ✅ Menambahkan all files ke staging
- ✅ Membuat commit dengan message custom
- ✅ Menambahkan remote origin (jika belum ada)
- ✅ Push ke branch `main` di GitHub

**Output:**
```
✅ Git status
✅ Perubahan di-stage
✅ Commit dibuat
✅ Push ke GitHub berhasil
```

---

### 2. **vercel-deploy.ps1** 🚀
**Fungsi**: Deploy ke Vercel production

```powershell
.\vercel-deploy.ps1
```

**Apa yang dilakukan:**
- ✅ Cek Vercel CLI (install jika perlu)
- ✅ Verifikasi login ke Vercel
- ✅ Link project dengan Vercel (jika belum)
- ✅ Deploy ke production (`--prod`)
- ✅ Informasi environment variables yang harus di-setup

**Output:**
```
✅ Vercel CLI ready
✅ Login verified
✅ Project linked
✅ Deploy berhasil
✅ URL production ditampilkan
```

---

### 3. **launch.ps1** 🎉
**Fungsi**: All-in-one automation (RECOMMENDED!)

```powershell
.\launch.ps1
```

**Workflow lengkap:**

1. **Stop Server** - Hentikan semua Node.js processes
2. **Clean Cache** - Hapus .next, .turbo, lock files
3. **Prisma Generate** - Update Prisma client
4. **Verify Database** - Cek database ada/buat baru
5. **Production Build** - Test build production (`npm run build`)
6. **Confirmation** - Confirm sebelum lanjut
7. **Git Push** - Menjalankan git-automate.ps1
8. **Vercel Deploy** - Menjalankan vercel-deploy.ps1

**Durasi**: ~10-15 menit tergantung ukuran project

---

### 4. **reset-db.ps1** 🔄
**Fungsi**: Reset database untuk development

```powershell
.\reset-db.ps1
```

**⚠️ PERHATIAN**: Ini akan menghapus semua data lokal!

**Apa yang dilakukan:**
- ✅ Hentikan running server
- ✅ Hapus file `prisma/dev.db`
- ✅ Clear Prisma cache
- ✅ Jalankan Prisma generate
- ✅ Jalankan Prisma migrate
- ✅ Seed database dengan sample data

**Kapan digunakan:**
- Database rusak / corrupt
- Ada perubahan schema Prisma
- Ingin fresh start dengan sample data
- Database tidak mau connect

---

## Setup Instructions

### Prasyarat:
```bash
# Verifikasi instalasi
git --version          # Git harus sudah installed
node --version         # Node.js v18+
npm --version          # npm v9+
npx --version          # Harus ada (included npm)
```

### Step 1: GitHub Repository
```bash
# Create repository di GitHub:
# 1. Buka https://github.com/new
# 2. Nama: lumeza-website
# 3. Description: Lumeza Creative Studio Website
# 4. Private atau Public (as you wish)
# 5. Jangan initialize dengan README
# 6. Create repository
```

### Step 2: Konfigurasi Git Lokal
```powershell
# Set user.name dan user.email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

### Step 3: Vercel Account
```bash
# 1. Buat akun di https://vercel.com
# 2. Download/setup Vercel CLI akan otomatis di launch.ps1
# 3. Saat pertama kali jalankan vercel-deploy.ps1, akan diminta login
```

### Step 4: Environment Variables

#### Local Development (`.env.local`):
```env
DATABASE_URL=file:./prisma/dev.db
```

#### Vercel Production (Set via Dashboard atau script):
```env
DATABASE_URL=file:./prisma/prod.db   # atau hosted database URL
RESEND_API_KEY=re_xxxxxxxxxxxxx      # Get from resend.com
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com
```

👉 **Untuk mendapatkan Resend API Key:**
1. Buka https://resend.com
2. Sign up atau login
3. Settings → API Keys
4. Generate new key
5. Copy key tadi
6. Simpan di Vercel dashboard

---

## Cara Menggunakan

### Option 1: Full Launch (RECOMMENDED) ⭐

Ini yang paling mudah! Automatic dari build hingga deploy:

```powershell
cd c:\Users\Meiliastudio\lumeza-website

# Set execution policy (hanya sekali)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Jalankan launch script
.\launch.ps1
```

**Interaksi user:**
```
1. Build test produksi → Automatic
2. Konfirmasi lanjut? → Jawab: y
3. Commit message → Enter commit message atau tekan Enter
4. Repository URL → Paste URL GitHub Anda (jika pertama kali)
5. Vercel login → Follow instructions (jika belum login)
6. Confirm deploy? → Jawab: y
```

**Timeline:**
- Build: 1-2 menit
- Git push: 30 detik
- Vercel deploy: 3-5 menit
- **Total: ~10-15 menit**

---

### Option 2: Step-by-Step Manual

Jika ingin kontrol lebih:

```powershell
# Step 1: Build production
npm run build

# Step 2: Push ke GitHub
.\git-automate.ps1

# Step 3: Deploy ke Vercel
.\vercel-deploy.ps1
```

---

### Option 3: Hanya Git Push (tanpa Vercel)

```powershell
.\git-automate.ps1
```

---

### Option 4: Hanya Vercel Deploy

```powershell
.\vercel-deploy.ps1
```

---

### Option 5: Reset Database (Development)

```powershell
.\reset-db.ps1
```

---

## Troubleshooting

### ❌ Error: "cannot be loaded because script execution disabled"

**Masalah**: PowerShell execution policy tidak mengizinkan script

**Solusi**:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

### ❌ Error: "git: fatal: not a git repository"

**Masalah**: Git belum diinisialisasi

**Solusi**:
```powershell
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

---

### ❌ Error: "fatal: 'origin' does not appear to be a 'git' repository"

**Masalah**: Remote origin belum ditambahkan

**Solusi**:
```powershell
# Option 1: Script akan tanya otomatis
.\git-automate.ps1

# Option 2: Manual
git remote add origin https://github.com/username/lumeza-website.git
git push -u origin main
```

---

### ❌ Error: "npm ERR! code EACCES" atau permission denied

**Masalah**: Permission issue saat npm install

**Solusi**:
```powershell
# Jalankan PowerShell sebagai Administrator
# Klik kanan PowerShell → Run as Administrator

# Kemudian jalankan ulang script
.\launch.ps1
```

---

### ❌ Error: "Vercel CLI not found"

**Masalah**: Vercel belum terinstall

**Solusi**:
```powershell
npm install -g vercel

# Verify
vercel --version

# Atau biarkan script install otomatis
.\vercel-deploy.ps1
```

---

### ❌ Error: "Build failed" atau TypeScript errors

**Masalah**: Ada error di code

**Solusi**:
```powershell
# Check TypeScript errors
npx tsc --noEmit

# Fix errors yang terdeteksi
# Kemudian coba lagi:
npm run build
.\launch.ps1
```

---

### ❌ Error: "Database is locked" / "SQLITE_CANTOPEN"

**Masalah**: Database corrupt atau diakses process lain

**Solusi**:
```powershell
# Option 1: Reset database
.\reset-db.ps1

# Option 2: Manual
Get-Process -Name "node" | Stop-Process -Force
Remove-Item -Path "prisma\dev.db" -Force
npx prisma db seed

# Kemudian:
npm run dev
```

---

### ❌ Error: "Port 3000 already in use"

**Masalah**: Ada process lain yang menggunakan port 3000

**Solusi**:
```powershell
# Hentikan semua Node processes
Get-Process -Name "node" | Stop-Process -Force

# Atau specify port berbeda:
npm run dev -- -p 3001
```

---

### ❌ Error: "Vercel login required"

**Masalah**: Belum login ke Vercel

**Solusi**:
```powershell
vercel login

# Edit vercel-deploy.ps1 jika perlu info lebih
# Ikuti instruksi interactive
```

---

### ⚠️ Warning: "Prisma Client out of date"

**Masalah**: Prisma client perlu update

**Solusi**:
```powershell
npx prisma generate

# Kemudian lanjut:
npm run build
.\launch.ps1
```

---

## Post-Launch Tips

### ✅ After Deploy Success

```
1. ✅ Vercel deployment selesai
2. 🌐 Buka URL Vercel di browser
3. ⚙️  Set environment variables di Vercel dashboard
4. 🧪 Test semua functionality
5. 📊 Monitor error logs
```

### 📊 Setup Monitoring

**Vercel Dashboard:**
```
1. https://vercel.com/dashboard
2. Pilih project: lumeza-website
3. Monitoring:
   - Deployments (history)
   - Analytics (traffic)
   - Error logs
   - Edge Config
```

---

### 🔐 Environment Variables Setup (IMPORTANT!)

**Di Vercel Dashboard:**
1. Settings → Environment Variables
2. Tambahkan:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL = noreply@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL = hello@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL = hello@lumeza.com
```

⚠️ **JANGAN share API keys di GitHub!**

---

### 🎯 Custom Domain Setup (Optional)

**Jika punya custom domain (lumeza.com):**

1. Buka Vercel Dashboard
2. Settings → Domains
3. Add custom domain → lumeza.com
4. Update DNS di registrar:
   - Pointing domain ke Vercel nameservers
   - ATAU CNAME ke Vercel

**DNS Update examples:**
- Namecheap: Domain → Nameservers → Vercel nameservers
- GoDaddy: DNS Management → Update CNAME
- Cloudflare: Add CNAME record

⏱️ DNS propagation: 5 menit - 48 jam

---

### 🧪 Testing Checklist

```powershell
# Test homepage
Invoke-WebRequest http://lumeza.vercel.app | Select-Object StatusCode
# Expected: 200

# Test API
Invoke-WebRequest http://lumeza.vercel.app/api/products?limit=2 | Select-Object StatusCode
# Expected: 200

# Test contact form
# Manual: Buka https://lumeza.vercel.app/kontak
# Isi form dan submit
# Check email masuk
```

---

### 📧 Email Configuration

**Test email delivery:**
```
1. Di website, go to: /kontak
2. Isi form:
   - Nama: Test
   - Email: your-email@domain.com
   - Pesan: Test email
3. Submit
4. Check inbox (tunggu 1-2 menit)
5. Verify email diterima
```

**Jika email tidak terkirim:**
- Check RESEND_API_KEY di Vercel env vars
- Check email address di CONTACT_FORM_RECIPIENT_EMAIL
- See Vercel logs untuk error details

---

### 📈 Performance Monitoring

**Gunakan Vercel Analytics:**
1. Dashboard → Insights
2. Monitor:
   - Page load time
   - Core Web Vitals
   - Traffic patterns
   - API response times

---

### 🔄 Update & Maintenance

**Untuk update website:**

```powershell
# 1. Edit files locally
# 2. Test dengan: npm run dev
# 3. Jalankan:
.\launch.ps1

# Atau manual:
npm run build
.\git-automate.ps1
.\vercel-deploy.ps1
```

---

### 📋 Common Next.js Commands

```powershell
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build           # Build untuk production
npm start               # Start production server

# Database
npm run prisma:seed    # Seed database
npx prisma studio     # Buka Prisma UI

# Testing
npm run build          # Test production build
npx tsc --noEmit      # Check TypeScript errors

# Maintenance
npm audit              # Cek vulnerability
npm audit fix          # Fix auto-fixable
npm update             # Update packages
```

---

### 🚨 If Something Goes Wrong

**Step-by-step recovery:**

```powershell
# 1. Stop server
Get-Process -Name "node" | Stop-Process -Force

# 2. Check errors
npx tsc --noEmit

# 3. Clean and rebuild
Remove-Item -Path ".next" -Recurse -Force
npm run build

# 4. Database issue? Reset
.\reset-db.ps1

# 5. Try launch again
.\launch.ps1
```

---

### 💡 Optimization Tips

1. **Image optimization**: Gunakan Next.js Image component
2. **Code splitting**: Automatic dengan Next.js
3. **Database**: Prisma caching sudah disetup
4. **API routes**: Vercel serverless automatic
5. **Monitoring**: Aktifkan Vercel Analytics

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Full launch | `.\launch.ps1` |
| Only git push | `.\git-automate.ps1` |
| Only Vercel deploy | `.\vercel-deploy.ps1` |
| Reset database | `.\reset-db.ps1` |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Check TS errors | `npx tsc --noEmit` |
| Prisma studio | `npx prisma studio` |

---

## 📚 Related Documentation

- **LAUNCH-GUIDE.md** - Panduan pre-launch lengkap
- **VERCEL-DEPLOYMENT-GUIDE.md** - Setup Vercel detail
- **FINAL-CHECKLIST.md** - Checklist final sebelum launch
- **LAUNCH-COMMANDS.md** - Copy-paste ready commands

---

## 🎉 Selamat!

Website Lumeza Anda sudah siap untuk production! 

**Enjoy your deployment!** 🚀

---

*Last updated: March 6, 2026*
*Created for: Lumeza Creative Studio Website*
