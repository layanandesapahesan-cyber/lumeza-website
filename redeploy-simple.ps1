# LUMEZA WEBSITE - VERCEL REDEPLOY SIMPLE SCRIPT
# Automated deployment to Vercel

$projectPath = "c:\Users\Meiliastudio\lumeza-website"
Set-Location $projectPath

Write-Host "`n"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LUMEZA WEBSITE - VERCEL REDEPLOY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# STEP 1: Git Status Check
Write-Host "[1/6] CHECKING GIT STATUS..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
$gitBranch = git rev-parse --abbrev-ref HEAD

Write-Host "Current branch: $gitBranch" -ForegroundColor Green

if ($gitStatus) {
    Write-Host "Found uncommitted changes:" -ForegroundColor Yellow
    $gitStatus | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    
    $response = Read-Host "Commit and push changes? (y/n)"
    if ($response -eq "y") {
        Write-Host "Adding files..." -ForegroundColor Yellow
        git add .
        
        $commitMsg = Read-Host "Enter commit message (default: 'Final: ready for Vercel')"
        if ([string]::IsNullOrWhiteSpace($commitMsg)) {
            $commitMsg = "Final: ready for Vercel"
        }
        
        Write-Host "Committing: $commitMsg" -ForegroundColor Yellow
        git commit -m "$commitMsg"
        
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        git push origin main
        Write-Host "Pushed successfully!" -ForegroundColor Green
    }
} else {
    Write-Host "Clean repository - nothing to commit" -ForegroundColor Green
}

Write-Host ""

# STEP 2: TypeScript Check
Write-Host "[2/6] CHECKING TYPESCRIPT..." -ForegroundColor Yellow
$typeCheckResult = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "TypeScript check: PASSED (0 errors)" -ForegroundColor Green
} else {
    Write-Host "TypeScript check: FAILED" -ForegroundColor Red
    Write-Host "Please fix TypeScript errors before deploying!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# STEP 3: Config Files Check
Write-Host "[3/6] VERIFYING CONFIG FILES..." -ForegroundColor Yellow
$configFiles = @("vercel.json", ".env.example", "package.json", "next.config.js")
foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
    }
}

Write-Host ""

# STEP 4: Environment Variables Checklist
Write-Host "[4/6] ENVIRONMENT VARIABLES NEEDED..." -ForegroundColor Yellow
Write-Host ""
Write-Host "You need to set these 7 variables in Vercel Settings:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. DATABASE_URL" -ForegroundColor White
Write-Host "   Value: file:./prisma/dev.db" -ForegroundColor Gray
Write-Host ""
Write-Host "2. RESEND_API_KEY (IMPORTANT!)" -ForegroundColor White
Write-Host "   Value: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" -ForegroundColor Gray
Write-Host "   Get from: https://resend.com/api-keys" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. NEXT_PUBLIC_FROM_EMAIL" -ForegroundColor White
Write-Host "   Value: noreply@lumeza.com" -ForegroundColor Gray
Write-Host ""
Write-Host "4. NEXT_PUBLIC_BASE_URL" -ForegroundColor White
Write-Host "   Value: https://lumeza-website.vercel.app" -ForegroundColor Gray
Write-Host ""
Write-Host "5. NEXT_PUBLIC_API_URL" -ForegroundColor White
Write-Host "   Value: https://lumeza-website.vercel.app/api" -ForegroundColor Gray
Write-Host ""
Write-Host "6. NEXT_PUBLIC_CONTACT_EMAIL" -ForegroundColor White
Write-Host "   Value: hello@lumeza.com" -ForegroundColor Gray
Write-Host ""
Write-Host "7. CONTACT_FORM_RECIPIENT_EMAIL" -ForegroundColor White
Write-Host "   Value: hello@lumeza.com" -ForegroundColor Gray
Write-Host ""

Write-Host ""

# STEP 5: Open Vercel Dashboard
Write-Host "[5/6] OPENING VERCEL DASHBOARD..." -ForegroundColor Yellow
$openDash = Read-Host "Open Vercel dashboard now? (y/n)"
if ($openDash -eq "y") {
    Write-Host "Opening dashboard..." -ForegroundColor Cyan
    Start-Process "https://vercel.com/layanandesapahesan-cyber/lumeza-website"
    Start-Sleep -Seconds 2
}

Write-Host ""

# STEP 6: Summary
Write-Host "[6/6] DEPLOYMENT STEPS..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next actions in Vercel dashboard:" -ForegroundColor Cyan
Write-Host ""
Write-Host "A) Set Environment Variables:" -ForegroundColor White
Write-Host "   1. Go to: Settings > Environment Variables" -ForegroundColor Gray
Write-Host "   2. Add all 7 variables from above" -ForegroundColor Gray
Write-Host "   3. Select: Production, Preview, Development" -ForegroundColor Gray
Write-Host "   4. Save each variable" -ForegroundColor Gray
Write-Host ""
Write-Host "B) Trigger Redeploy:" -ForegroundColor White
Write-Host "   1. Go to: Deployments tab" -ForegroundColor Gray
Write-Host "   2. Click: ... (three dots) on latest deployment" -ForegroundColor Gray
Write-Host "   3. Select: Redeploy" -ForegroundColor Gray
Write-Host "   4. Uncheck: 'Use existing Build Cache'" -ForegroundColor Gray
Write-Host "   5. Click: Redeploy" -ForegroundColor Gray
Write-Host ""
Write-Host "C) Monitor Build:" -ForegroundColor White
Write-Host "   - Status will show: Queued -> Building -> Ready" -ForegroundColor Gray
Write-Host "   - Wait 2-5 minutes for build" -ForegroundColor Gray
Write-Host ""
Write-Host "D) Verify Website:" -ForegroundColor White
Write-Host "   - When status shows Ready (green)" -ForegroundColor Gray
Write-Host "   - Visit: https://lumeza-website.vercel.app" -ForegroundColor Gray
Write-Host "   - Check: /api/diag for database status" -ForegroundColor Gray
Write-Host ""

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  READY FOR DEPLOYMENT!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Questions? See these files:" -ForegroundColor Yellow
Write-Host "  - VERCEL-QUICK-START.md (5 minute guide)" -ForegroundColor Gray
Write-Host "  - VERCEL-TROUBLESHOOTING.md (if errors)" -ForegroundColor Gray
Write-Host "  - VERCEL-PRELAUNCH-CHECKLIST.md (full checklist)" -ForegroundColor Gray
Write-Host ""
