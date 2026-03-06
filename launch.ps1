#!/usr/bin/env pwsh
# launch.ps1
# Script all-in-one untuk push + deploy sekaligus
# Gunakan: .\launch.ps1

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║    🎉 LUMEZA WEBSITE - LAUNCH AUTOMATION SCRIPT 🎉         ║" -ForegroundColor Magenta
Write-Host "║                                                            ║" -ForegroundColor Magenta
Write-Host "║  Proses: Clean → Build → Git Push → Vercel Deploy         ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

# Fungsi untuk display header
function Show-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkCyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkCyan
    Write-Host ""
}

# STEP 1: Hentikan server
Show-Section "STEP 1: Stop Running Server"
Write-Host "🛑 Menghentikan Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "✅ Semua Node.js processes dihentikan" -ForegroundColor Green

# STEP 2: Clean cache
Show-Section "STEP 2: Clean Cache & Temporary Files"
Write-Host "🧹 Membersihkan .next directory..." -ForegroundColor Yellow
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "🧹 Membersihkan .turbo directory..." -ForegroundColor Yellow
Remove-Item -Path ".turbo" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "🧹 Membersihkan lock files..." -ForegroundColor Yellow
Remove-Item -Path ".next\dev\lock" -Force -ErrorAction SilentlyContinue

Write-Host "✅ Cache dibersihkan" -ForegroundColor Green

# STEP 3: Generate Prisma
Show-Section "STEP 3: Generate Prisma Client"
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prisma generate gagal" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma client generated" -ForegroundColor Green

# STEP 4: Seed database (jika diperlukan)
Show-Section "STEP 4: Verify Database"
Write-Host "🌱 Mengecek database..." -ForegroundColor Yellow
if (Test-Path "prisma\dev.db") {
    Write-Host "✅ Database sudah ada" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database tidak ditemukan, menjalankan seed..." -ForegroundColor Yellow
    npm run prisma:seed
}

# STEP 5: Test build
Show-Section "STEP 5: Production Build Test"
Write-Host "🏗️  Melakukan production build..." -ForegroundColor Yellow
Write-Host "   (Ini akan memakan waktu 1-2 menit)" -ForegroundColor Gray
Write-Host ""

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Build gagal! Perbaiki error di atas terlebih dahulu." -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Tips:" -ForegroundColor Yellow
    Write-Host "   • Jalankan: npx tsc --noEmit" -ForegroundColor Gray
    Write-Host "   • Cek TypeScript errors" -ForegroundColor Gray
    exit 1
}
Write-Host ""
Write-Host "✅ Production build berhasil" -ForegroundColor Green

# STEP 6: Confirmation
Show-Section "STEP 6: Launch Confirmation"
Write-Host "📋 Langkah selanjutnya:" -ForegroundColor Cyan
Write-Host "   1. ✅ Build verifikasi berhasil" -ForegroundColor Green
Write-Host "   2. ⏳ Push code ke GitHub" -ForegroundColor Gray
Write-Host "   3. ⏳ Deploy ke Vercel production" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "🚀 Lanjutkan push & deploy ke production? (y/N)"
if ($confirm -ne 'y') {
    Write-Host "❌ Launch dibatalkan. Build artifact tetap ada di .next/" -ForegroundColor Yellow
    exit 0
}

# STEP 7: Git push
Show-Section "STEP 7: Push ke GitHub"
Write-Host "📤 Menjalankan git automation script..." -ForegroundColor Yellow
& ".\git-automate.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git push gagal" -ForegroundColor Red
    exit 1
}

# STEP 8: Vercel deploy
Show-Section "STEP 8: Deploy ke Vercel"
Write-Host "🚀 Menjalankan Vercel deployment script..." -ForegroundColor Yellow
& ".\vercel-deploy.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vercel deploy gagal" -ForegroundColor Red
    exit 1
}

# FINAL: Success
Show-Section "🎉 LAUNCH COMPLETE!"
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "║  ✅ Website Lumeza sudah live di Vercel!                   ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "║  📊 Next Steps:                                            ║" -ForegroundColor Green
Write-Host "║   1. Cek https://vercel.com/dashboard                      ║" -ForegroundColor Green
Write-Host "║   2. Update Environment Variables di Vercel                ║" -ForegroundColor Green
Write-Host "║      (RESEND_API_KEY, EMAIL settings)                      ║" -ForegroundColor Green
Write-Host "║   3. Test: Buka URL Vercel Anda di browser                 ║" -ForegroundColor Green
Write-Host "║   4. Konfigurasi custom domain (opsional)                  ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "📚 Dokumentasi helpful:" -ForegroundColor Cyan
Write-Host "   • LAUNCH-GUIDE.md - Panduan lengkap pre-launch" -ForegroundColor Gray
Write-Host "   • VERCEL-DEPLOYMENT-GUIDE.md - Setup Vercel detail" -ForegroundColor Gray
Write-Host "   • FINAL-CHECKLIST.md - Checklist akhir sebelum launch" -ForegroundColor Gray
Write-Host ""

Write-Host "⏰ Waktu eksekusi script: $(Get-Date)" -ForegroundColor Gray
Write-Host ""
