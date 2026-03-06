#!/usr/bin/env pwsh
# git-automate.ps1
# Script otomatis untuk push ke GitHub
# Gunakan: .\git-automate.ps1

Write-Host "🚀 LUMEZA GIT AUTOMATION" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# 1. Cek apakah sudah git repo
if (-not (Test-Path ".git")) {
    Write-Host "📦 Inisialisasi git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
    Write-Host ""
}

# 2. Tanyakan commit message
$commitMessage = Read-Host "📝 Masukkan commit message (Enter untuk default: 'Update website')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update website Lumeza - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

# 3. Git status
Write-Host ""
Write-Host "📋 Git Status:" -ForegroundColor Cyan
git status --short
Write-Host ""

# 4. Git add
Write-Host "📦 Menambahkan file ke staging..." -ForegroundColor Yellow
git add .
Write-Host "✅ Semua file ditambahkan ke staging" -ForegroundColor Green
Write-Host ""

# 5. Git commit
Write-Host "💾 Melakukan commit..." -ForegroundColor Yellow
git commit -m "$commitMessage"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit berhasil: $commitMessage" -ForegroundColor Green
} else {
    Write-Host "⚠️  Tidak ada perubahan untuk di-commit" -ForegroundColor Yellow
}
Write-Host ""

# 6. Cek apakah remote origin sudah ada
$remoteExists = git remote -v 2>$null | Select-String "origin"
if (-not $remoteExists) {
    Write-Host "🔗 Repository belum terhubung ke GitHub" -ForegroundColor Yellow
    $repoUrl = Read-Host "   Masukkan URL GitHub (https://github.com/username/repo.git)"
    git remote add origin $repoUrl
    Write-Host "✅ Remote origin ditambahkan" -ForegroundColor Green
}

# 7. Cek branch utama
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "📌 Mengganti branch ke 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✅ Branch sekarang: main" -ForegroundColor Green
}
Write-Host ""

# 8. Push ke GitHub
Write-Host "📤 Push ke GitHub..." -ForegroundColor Yellow
Write-Host "   Repository: $(git remote get-url origin)" -ForegroundColor Gray
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SELESAI! Website ter-push ke GitHub!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: $(git remote get-url origin)" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Error saat push. Cek koneksi internet atau credentials." -ForegroundColor Red
    exit 1
}

Write-Host ""
