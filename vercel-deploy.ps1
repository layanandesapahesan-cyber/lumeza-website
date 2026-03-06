#!/usr/bin/env pwsh
# vercel-deploy.ps1
# Script otomatis untuk deploy ke Vercel
# Gunakan: .\vercel-deploy.ps1

Write-Host "🚀 LUMEZA VERCEL DEPLOYMENT" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# 1. Cek apakah Vercel CLI sudah terinstall
Write-Host "🔍 Mengecek Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "📦 Vercel CLI belum terinstall. Menginstal..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Gagal menginstall Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI terinstall" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI sudah terinstall" -ForegroundColor Green
}
Write-Host ""

# 2. Cek apakah sudah login
Write-Host "🔑 Mengecek Vercel login..." -ForegroundColor Yellow
$loginStatus = vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Belum login ke Vercel. Silahkan login..." -ForegroundColor Red
    Write-Host ""
    vercel login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Login gagal" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Login sebagai: $loginStatus" -ForegroundColor Green
}
Write-Host ""

# 3. Link ke project (atau buat baru)
Write-Host "🔗 Mengecek link ke project..." -ForegroundColor Yellow
if (-not (Test-Path ".vercel")) {
    Write-Host "📦 Menautkan project ke Vercel..." -ForegroundColor Yellow
    Write-Host "   (Pilih 'Y' untuk membuat project baru atau link ke existing)" -ForegroundColor Gray
    Write-Host ""
    vercel link --yes
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Project link tidak berhasil, lanjut dengan deploy..." -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Project sudah terhubung dengan Vercel" -ForegroundColor Green
}
Write-Host ""

# 4. Set environment variables
Write-Host "🔧 Mengecek environment variables..." -ForegroundColor Yellow
Write-Host "   Environment variables yang akan di-set di Vercel:" -ForegroundColor Gray

$envVars = @{
    "DATABASE_URL" = "file:./prisma/dev.db"
}

Write-Host ""
foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    $displayValue = if ($value.StartsWith("re_")) { $value.Substring(0, 10) + "..." } else { $value }
    Write-Host "   • $key = $displayValue" -ForegroundColor Gray
}
Write-Host ""

Write-Host "⚠️  CATATAN PENTING:" -ForegroundColor Yellow
Write-Host "   Untuk production, update environment variables di Vercel Dashboard:" -ForegroundColor Gray
Write-Host "   1. Buka https://vercel.com/dashboard" -ForegroundColor Gray
Write-Host "   2. Pilih project 'lumeza-website'" -ForegroundColor Gray
Write-Host "   3. Settings → Environment Variables" -ForegroundColor Gray
Write-Host "   4. Tambahkan:" -ForegroundColor Gray
Write-Host "      • RESEND_API_KEY = (your-api-key)" -ForegroundColor Gray
Write-Host "      • NEXT_PUBLIC_FROM_EMAIL = noreply@lumeza.com" -ForegroundColor Gray
Write-Host "      • NEXT_PUBLIC_CONTACT_EMAIL = hello@lumeza.com" -ForegroundColor Gray
Write-Host "      • CONTACT_FORM_RECIPIENT_EMAIL = hello@lumeza.com" -ForegroundColor Gray
Write-Host ""

# 5. Deploy ke production
Write-Host "📤 Siap untuk deploy ke Vercel production..." -ForegroundColor Yellow
$confirm = Read-Host "   Lanjutkan deploy? (y/N)"
if ($confirm -ne 'y') {
    Write-Host "❌ Deploy dibatalkan" -ForegroundColor Red
    exit 0
}
Write-Host ""

Write-Host "🚀 Deploying ke Vercel production..." -ForegroundColor Yellow
Write-Host "   (Ini mungkin memakan waktu beberapa menit)" -ForegroundColor Gray
Write-Host ""

vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SELESAI! Website ter-deploy ke Vercel!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Informasi Deployment:" -ForegroundColor Cyan
    Write-Host "   🌐 Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host "   📋 Project: lumeza-website" -ForegroundColor Cyan
    Write-Host "   ⚙️  Settings: Environment Variables harus di-update secara manual" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deploy ke Vercel gagal" -ForegroundColor Red
    Write-Host "   Cek error di atas atau coba lagi" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
