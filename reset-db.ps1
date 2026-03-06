#!/usr/bin/env pwsh
# reset-db.ps1
# Script reset database untuk development
# Gunakan: .\reset-db.ps1

Write-Host ""
Write-Host "🔄 RESET DATABASE LUMEZA" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️  PERINGATAN:" -ForegroundColor Red
Write-Host "   • Semua data di database lokal akan HILANG" -ForegroundColor Red
Write-Host "   • Tidak bisa di-undo!" -ForegroundColor Red
Write-Host "   • Data di Vercel production TIDAK akan terkena dampak" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Yakin ingin reset database? (y/N)"
if ($confirm -ne 'y') {
    Write-Host "❌ Reset dibatalkan" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkYellow
Write-Host ""

# Step 1: Stop server
Write-Host "🛑 Menghentikan server..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Step 2: Hapus database lokal
Write-Host "🗑️  Menghapus database lokal..." -ForegroundColor Yellow
$dbPath = "prisma\dev.db"
if (Test-Path $dbPath) {
    Remove-Item -Path $dbPath -Force
    Write-Host "✅ Database dihapus: $dbPath" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database tidak ditemukan" -ForegroundColor Yellow
}

# Step 3: Clean Prisma cache
Write-Host "🧹 Membersihkan Prisma cache..." -ForegroundColor Yellow
Remove-Item -Path "node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue

# Step 4: Generate Prisma
Write-Host "🔧 Generate Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prisma generate gagal" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma client generated" -ForegroundColor Green

# Step 5: Migrasi database
Write-Host "📦 Migrasi database..." -ForegroundColor Yellow
npx prisma migrate dev --name init --skip-seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Migrasi gagal" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database schema berhasil dibuat" -ForegroundColor Green

# Step 6: Seed database
Write-Host "🌱 Seed database dengan sample data..." -ForegroundColor Yellow
Write-Host "   (Ini akan memakan waktu beberapa detik)" -ForegroundColor Gray

npm run prisma:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Seed gagal" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ DATABASE BERHASIL DIRESET!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "📊 Database info:" -ForegroundColor Cyan
Write-Host "   📁 Location: prisma\dev.db" -ForegroundColor Gray
Write-Host "   📝 Status: Fresh & ready to use" -ForegroundColor Gray
Write-Host ""

Write-Host "🚀 Selanjutnya:" -ForegroundColor Cyan
Write-Host "   1. Jalankan: npm run dev" -ForegroundColor Gray
Write-Host "   2. Buka: http://localhost:3000" -ForegroundColor Gray
Write-Host "   3. Test API: http://localhost:3000/api/products" -ForegroundColor Gray
Write-Host ""

Write-Host "💡 Untuk melihat data:" -ForegroundColor Cyan
Write-Host "   Jalankan: npx prisma studio" -ForegroundColor Gray
Write-Host ""
