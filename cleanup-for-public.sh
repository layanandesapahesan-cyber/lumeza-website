#!/bin/bash
# cleanup-for-public.sh
# Script untuk membersihkan project untuk production

echo "🧹 Lumeza Website - Cleanup for Public Launch"
echo "=============================================="
echo ""

# 1. Create .dev-scripts folder
echo "📁 Creating .dev-scripts folder..."
mkdir -p .dev-scripts

# 2. Move dev scripts
echo "📦 Moving development scripts..."
mv -f check-products.js .dev-scripts/ 2>/dev/null
mv -f check-types.ps1 .dev-scripts/ 2>/dev/null
mv -f test-db.js .dev-scripts/ 2>/dev/null
mv -f test.js .dev-scripts/ 2>/dev/null
mv -f fix-all.ps1 .dev-scripts/ 2>/dev/null
mv -f fix-vercel-config.ps1 .dev-scripts/ 2>/dev/null
mv -f git-automate.ps1 .dev-scripts/ 2>/dev/null
mv -f launch.ps1 .dev-scripts/ 2>/dev/null
mv -f redeploy-simple.ps1 .dev-scripts/ 2>/dev/null
mv -f redeploy-vercel.ps1 .dev-scripts/ 2>/dev/null
mv -f reset-db.ps1 .dev-scripts/ 2>/dev/null
mv -f vercel-deploy.ps1 .dev-scripts/ 2>/dev/null

echo "✅ Scripts moved to .dev-scripts/"
echo ""

# 3. Delete temporary markdown files
echo "🗑️  Deleting temporary documentation..."
rm -f ALL-FIXES-SUMMARY.md
rm -f AUTOMATION-GUIDE.md
rm -f AUTOMATION-REFERENCE.md
rm -f COMPLETE-FIX-REPORT.md
rm -f DEPLOYMENT.md
rm -f EMAIL_SETUP.md
rm -f FINAL-CHECKLIST.md
rm -f FINAL-SUMMARY.md
rm -f INDEX.md
rm -f LAUNCH-COMMANDS.md
rm -f LAUNCH-GUIDE.md
rm -f LAUNCH-REPORT.md
rm -f QUICK-START.md
rm -f QUICKSTART.sh
rm -f SETUP-COMPLETE.txt
rm -f TROUBLESHOOTING.md

rm -f VERCEL-CONFIG-FIX.md
rm -f VERCEL-DEPLOYMENT-FIX-COMPLETE.md
rm -f VERCEL-DEPLOYMENT-GUIDE.md
rm -f VERCEL-ENV-VARS.txt
rm -f VERCEL-ERRORS-SOLUTIONS.md
rm -f VERCEL-FIX-READ-ME-FIRST.md
rm -f VERCEL-FIX-STEP-BY-STEP.md
rm -f VERCEL-PRELAUNCH-CHECKLIST.md
rm -f VERCEL-QUICK-START.md
rm -f VERCEL-REDEPLOY-START-HERE.md
rm -f VERCEL-TROUBLESHOOTING.md

echo "✅ Temporary documentation deleted"
echo ""

# 4. Delete test/temp files
echo "🧹 Cleaning up test files..."
rm -f test.js
rm -f test-db.js
rm -f server.log
rm -f vercel.json.backup.*

echo "✅ Test files cleaned"
echo ""

# 5. Create .gitignore additions
echo "📝 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Dev scripts (moved to .dev-scripts/)
.dev-scripts/

# Temporary files
*.log
*.backup
.env.backup

# Development only
debug.env
.DS_Store
Thumbs.db
EOF

echo "✅ .gitignore updated"
echo ""

# 6. Summary
echo "🎉 Cleanup Complete!"
echo ""
echo "Summary of changes:"
echo "  ✅ Created: .dev-scripts/ folder"
echo "  ↪️  Moved: 12 development scripts"
echo "  🗑️  Deleted: 25 temporary documentation files"
echo "  🧹 Cleaned: Test and log files"
echo "  📝 Updated: .gitignore"
echo ""
echo "📋 Next steps:"
echo "  1. Commit cleanup: git add . && git commit -m 'chore: cleanup for public launch'"
echo "  2. Create legal pages (/app/legal/terms, /privacy)"
echo "  3. Setup cloud storage for product files (Cloudinary or S3)"
echo "  4. Replace placeholder images"
echo "  5. Setup monitoring (Sentry, Google Analytics)"
echo ""
echo "See PUBLIC-LAUNCH-ACTION-PLAN.md for detailed instructions"
echo ""