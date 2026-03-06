# VERCEL CONFIG FIX SCRIPT
# Automatically fixes vercel.json by removing invalid nodeVersion property

$projectPath = "c:\Users\Meiliastudio\lumeza-website"
Set-Location $projectPath

Write-Host "`n"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VERCEL CONFIG FIX UTILITY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check current file
Write-Host "[1/4] Checking current vercel.json..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    $content = Get-Content "vercel.json" -Raw
    $json = $content | ConvertFrom-Json
    
    if ($json.PSObject.Properties.Name -contains "nodeVersion") {
        Write-Host "FOUND: nodeVersion property = '$($json.nodeVersion)'" -ForegroundColor Red
        Write-Host "This property is NOT valid in Vercel config!" -ForegroundColor Red
    } else {
        Write-Host "GOOD: No nodeVersion property found" -ForegroundColor Green
    }
} else {
    Write-Host "ERROR: vercel.json not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Create backup
Write-Host "[2/4] Creating backup..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "vercel.json.backup.$timestamp"
Copy-Item "vercel.json" -Destination $backupPath
Write-Host "Backup created: $backupPath" -ForegroundColor Green

Write-Host ""

# Step 3: Remove nodeVersion and save
Write-Host "[3/4] Fixing vercel.json..." -ForegroundColor Yellow

$json = Get-Content "vercel.json" -Raw | ConvertFrom-Json

# Remove nodeVersion if it exists
if ($json.PSObject.Properties.Name -contains "nodeVersion") {
    $json.PSObject.Properties.Remove("nodeVersion")
    Write-Host "Removed nodeVersion property" -ForegroundColor Green
} else {
    Write-Host "nodeVersion property not found (already clean)" -ForegroundColor Green
}

# Save fixed file
$fixedJson = $json | ConvertTo-Json -Depth 10 -Indent 2
Set-Content "vercel.json" -Value $fixedJson
Write-Host "File saved successfully" -ForegroundColor Green

Write-Host ""

# Step 4: Validate
Write-Host "[4/4] Validating fixed config..." -ForegroundColor Yellow
Try {
    $validJson = Get-Content "vercel.json" -Raw | ConvertFrom-Json
    Write-Host "JSON is valid" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Current configuration:" -ForegroundColor Cyan
    Write-Host "  framework: $($validJson.framework)"
    Write-Host "  buildCommand: $($validJson.buildCommand)"
    Write-Host "  outputDirectory: $($validJson.outputDirectory)"
    Write-Host "  regions: $($validJson.regions -join ', ')"
    Write-Host "  nodeVersion: (REMOVED)" -ForegroundColor Green
} Catch {
    Write-Host "ERROR: Invalid JSON!" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}

Write-Host ""

# Step 5: Git instructions
Write-Host "========================================" -ForegroundColor Green
Write-Host "  NEXT STEPS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Run these commands to commit and push:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  git add vercel.json" -ForegroundColor White
Write-Host "  git commit -m 'Fix: remove invalid nodeVersion from vercel.json'" -ForegroundColor White
Write-Host "  git push origin main" -ForegroundColor White
Write-Host ""
Write-Host "Then redeploy in Vercel dashboard!" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Do you want to commit and push now? (y/n)"
if ($confirm -eq "y") {
    Write-Host ""
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git add vercel.json
    git commit -m "Fix: remove invalid nodeVersion from vercel.json"
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host ""
    Write-Host "SUCCESS! Changes pushed to GitHub" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor Gray
    Write-Host "2. Find: lumeza-website project" -ForegroundColor Gray
    Write-Host "3. Click: Deployments tab" -ForegroundColor Gray
    Write-Host "4. Redeploy the latest commit" -ForegroundColor Gray
}

Write-Host ""
