Write-Host "Running TypeScript compilation check..." -ForegroundColor Cyan
npx tsc --noEmit --pretty
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ No TypeScript errors found!" -ForegroundColor Green
} else {
    Write-Host "❌ TypeScript errors detected!" -ForegroundColor Red
    exit 1
}