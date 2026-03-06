# =====================================================
# LUMEZA WEBSITE - VERCEL REDEPLOY AUTOMATION SCRIPT
# =====================================================
# Script ini mengotomatisasi proses redeploy ke Vercel
# dengan verifikasi git, environment variables, dan monitoring
# =====================================================

$ErrorActionPreference = "Continue"
$WarningPreference = "SilentlyContinue"

# Warna output
$GREEN = @{ForegroundColor = "Green"}
$RED = @{ForegroundColor = "Red"}
$YELLOW = @{ForegroundColor = "Yellow"}
$BLUE = @{ForegroundColor = "Cyan"}
$RESET = @{ForegroundColor = "White"}

# Header
Write-Host "`n" 
Write-Host "╔════════════════════════════════════════════════════╗" @BLUE
Write-Host "║  ✨ LUMEZA WEBSITE - VERCEL REDEPLOY AUTOMATION ✨  ║" @BLUE
Write-Host "╚════════════════════════════════════════════════════╝" @BLUE
Write-Host ""

# =====================================================
# STEP 1: Verifikasi Git dan Push
# =====================================================
Write-Host "📝 STEP 1: VERIFIKASI GIT & PUSH" @BLUE
Write-Host "─────────────────────────────────" @BLUE

$projectPath = "c:\Users\Meiliastudio\lumeza-website"
Set-Location $projectPath

Write-Host "`n🔍 Cek status repository..." @YELLOW
$gitStatus = git status --porcelain
$gitBranch = git rev-parse --abbrev-ref HEAD

Write-Host "📍 Branch: $gitBranch"

if ($gitStatus) {
    Write-Host "⚠️  Ada perubahan yang belum di-commit:" @YELLOW
    $gitStatus | ForEach-Object { Write-Host "   $_" }
    Write-Host ""
    
    $response = Read-Host "Commit dan push sekarang? (y/n)"
    if ($response -eq "y") {
        Write-Host "`n📦 Menambahkan file..." @YELLOW
        git add .
        
        $commitMsg = Read-Host "📝 Masukkan commit message (default: 'Final fix: redeploy to Vercel')"
        if ([string]::IsNullOrWhiteSpace($commitMsg)) {
            $commitMsg = "Final fix: redeploy to Vercel"
        }
        
        Write-Host "`n💬 Commit dengan message: '$commitMsg'" @YELLOW
        git commit -m "$commitMsg"
        
        Write-Host "`n🚀 Push ke GitHub..." @YELLOW
        git push origin main
        Write-Host "✅ Push berhasil!" @GREEN
    }
} else {
    Write-Host "✅ Repository sudah clean, tidak ada perubahan" @GREEN
    Write-Host "✅ Branch main sudah up to date" @GREEN
}

# =====================================================
# STEP 2: Verifikasi File Konfigurasi
# =====================================================
Write-Host "`n📋 STEP 2: VERIFIKASI FILE KONFIGURASI" @BLUE
Write-Host "─────────────────────────────────────────" @BLUE

$configFiles = @(
    "vercel.json",
    ".env.example",
    "package.json",
    "next.config.js"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" @GREEN
    } else {
        Write-Host "❌ $file - TIDAK DITEMUKAN!" @RED
    }
}

# =====================================================
# STEP 3: TypeScript Type Check
# =====================================================
Write-Host "`n🔨 STEP 3: VERIFIKASI TYPESCRIPT COMPILATION" @BLUE
Write-Host "──────────────────────────────────────────────" @BLUE

Write-Host "Menjalankan type check..." @YELLOW
$typeCheckResult = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript compilation: PASSED (0 errors)" @GREEN
} else {
    Write-Host "❌ TypeScript compilation: FAILED" @RED
    Write-Host "Error details:" @RED
    Write-Host $typeCheckResult
    Write-Host ""
    Write-Host "⚠️  JANGAN lanjut ke Vercel dengan TypeScript error!" @YELLOW
    Read-Host "Tekan Enter untuk exit"
    exit 1
}

# =====================================================
# STEP 4: Environment Variables Checklist
# =====================================================
Write-Host "`n⚙️  STEP 4: ENVIRONMENT VARIABLES CHECKLIST" @BLUE
Write-Host "──────────────────────────────────────────────" @BLUE

$envVars = @(
    @{name = "DATABASE_URL"; required = $true; example = "file:./prisma/dev.db"},
    @{name = "RESEND_API_KEY"; required = $true; example = "re_xxxxxxxxxxxxxxxx"},
    @{name = "NEXT_PUBLIC_FROM_EMAIL"; required = $true; example = "noreply@lumeza.com"},
    @{name = "NEXT_PUBLIC_BASE_URL"; required = $false; example = "https://lumeza-website.vercel.app"},
    @{name = "NEXT_PUBLIC_API_URL"; required = $false; example = "https://lumeza-website.vercel.app/api"},
    @{name = "NEXT_PUBLIC_CONTACT_EMAIL"; required = $true; example = "hello@lumeza.com"},
    @{name = "CONTACT_FORM_RECIPIENT_EMAIL"; required = $true; example = "hello@lumeza.com"}
)

Write-Host "`n📋 Required Environment Variables:` n" @YELLOW

$allVarsOk = $true
foreach ($var in $envVars) {
    $value = Get-Content .env.local -ErrorAction SilentlyContinue | Select-String "^$($var.name)=" 
    $status = if ($value) { "✅" } else { "❌" }
    $required = if ($var.required) { "[REQUIRED]" } else { "[OPTIONAL]" }
    
    Write-Host "$status $($var.name) $required"
    Write-Host "   Example: $($var.example)"
    
    if ($var.required -and -not $value) {
        $allVarsOk = $false
    }
}

if (-not $allVarsOk) {
    Write-Host "`n⚠️  Ada variabel yang hilang atau belum diatur!" @RED
    Write-Host "Pastikan semua variabel sudah di-set sebelum redeploy ke Vercel" @YELLOW
}

# =====================================================
# STEP 5: Build Test (Optional)
# =====================================================
Write-Host "`n🏗️  STEP 5: TEST PRODUCTION BUILD" @BLUE
Write-Host "──────────────────────────────────" @BLUE

$buildTest = Read-Host "Jalankan production build test? (y/n)"
if ($buildTest -eq "y") {
    Write-Host "`n🔨 Building production bundle..." @YELLOW
    npm run build 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build test: SUCCESS" @GREEN
    } else {
        Write-Host "❌ Build test: FAILED" @RED
        Write-Host "Cek error di atas dan perbaiki sebelum deploy!" @YELLOW
        Read-Host "Tekan Enter untuk exit"
        exit 1
    }
}

# =====================================================
# STEP 6: Summary dan Next Steps
# =====================================================
Write-Host "`n📋 SUMMARY & NEXT STEPS" @BLUE
Write-Host "───────────────────────────" @BLUE

Write-Host @"
✅ Kode dan konfigurasi sudah siap!

📌 LANGKAH SELANJUTNYA:

1️⃣  BUKA VERCEL DASHBOARD
   🔗 https://vercel.com/layanandesapahesan-cyber/lumeza-website

2️⃣  NAVIGASI KE SETTINGS → ENVIRONMENT VARIABLES
   Pastikan semua 7 variabel sudah diconfigure:
   
   ✓ DATABASE_URL
   ✓ RESEND_API_KEY
   ✓ NEXT_PUBLIC_FROM_EMAIL
   ✓ NEXT_PUBLIC_BASE_URL
   ✓ NEXT_PUBLIC_API_URL
   ✓ NEXT_PUBLIC_CONTACT_EMAIL
   ✓ CONTACT_FORM_RECIPIENT_EMAIL

3️⃣  TRIGGER REDEPLOY
   a) Klik tab "Deployments"
   b) Klik ... (tiga titik) pada deployment terakhir
   c) Pilih "Redeploy"
   d) Pastikan "Use existing Build Cache" TIDAK dicentang
   e) Klik "Redeploy"

4️⃣  MONITOR BUILD PROGRESS
   Status akan berubah:
   🔵 Queued    → Menunggu
   🔵 Building  → Sedang build (2-5 menit)
   🟢 Ready     → BERHASIL! ✨
   🔴 Failed    → Gagal, cek log

5️⃣  VERIFIKASI WEBSITE LIVE
   🌐 https://lumeza-website.vercel.app
   
   Test endpoints:
   - GET /api/products?limit=1
   - GET /api/diag (cek database connection)

📞 TROUBLESHOOTING
   Jika deployment gagal:
   1. Cek error log di Vercel dashboard
   2. Lihat VERCEL-TROUBLESHOOTING.md di project
   3. Pastikan semua env vars sudah set
   4. Cek TypeScript errors: npm run build

" @GREEN

Write-Host "`n" @RESET

# =====================================================
# STEP 7: Buka Dashboard
# =====================================================
$openDash = Read-Host "Buka Vercel dashboard sekarang? (y/n)"
if ($openDash -eq "y") {
    Write-Host "🌐 Membuka https://vercel.com/layanandesapahesan-cyber/lumeza-website..." @YELLOW
    Start-Process "https://vercel.com/layanandesapahesan-cyber/lumeza-website"
    Start-Sleep -Seconds 2
}

Write-Host "`n✨ Script selesai! Lanjutkan dengan langkah-langkah di atas." @GREEN
Write-Host ""
