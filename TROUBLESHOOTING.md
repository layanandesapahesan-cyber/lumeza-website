# 🔧 TROUBLESHOOTING & RECOVERY GUIDE

## 🆘 Quick Help

### Need help fast?
1. **Script won't run?** → See: [Execution Policy Issues](#execution-policy-issues)
2. **Build fails?** → See: [Build Errors](#build-errors)
3. **Git error?** → See: [Git Issues](#git-issues)
4. **Database problem?** → See: [Database Issues](#database-issues)
5. **Vercel error?** → See: [Vercel Issues](#vercel-issues)

---

## 🔴 CRITICAL ISSUES

### Issue: Build Fails Immediately

**Signs:**
- Red text in console
- `npm run build` fails
- Script exits with error

**Diagnosis:**
```powershell
# Check TypeScript errors
npx tsc --noEmit

# Output will show line numbers and errors
```

**Solution:**
```powershell
# Option 1: Auto-fix TypeScript errors
npx tsc --noEmit     # See what errors
# Fix them manually in code

# Option 2: Check individual files
npx tsc app/page.tsx  # Check specific file

# Option 3: Force rebuild
Remove-Item -Path ".next" -Recurse -Force
npm run build
```

**Common TypeScript errors:**

| Error | Fix |
|-------|-----|
| `'Unknown type'` | Check import statements |
| `Type mismatch` | Check function parameters |
| `Cannot find module` | `npm install` missing package |
| `Prisma type error` | `npx prisma generate` |

---

### Issue: Cannot Connect to Database

**Signs:**
- "SQLITE_CANTOPEN" error
- "Database is locked"
- API returns 500 error for products

**Solutions:**

```powershell
# Step 1: Stop all Node processes
Get-Process -Name "node" | Stop-Process -Force

# Step 2: Check if database file exists
Test-Path "prisma\dev.db"    # Should be True

# Step 3: Reset database
.\reset-db.ps1

# Step 4: Verify database
npx prisma studio           # Should open browser with data viewer
```

**If error persists:**
```powershell
# Nuclear option (lose all local data!)
Remove-Item -Path "prisma\dev.db" -Force
Remove-Item -Path "prisma\dev.db-journal" -Force
npx prisma db seed
```

---

### Issue: Port 3000 Not Available

**Signs:**
- "Error: listen EADDRINUSE"
- "Address already in use at port 3000"

**Solution:**
```powershell
# Option 1: Kill Node processes
Get-Process -Name "node" | Stop-Process -Force
Start-Sleep -Seconds 2

# Option 2: Find what's using port 3000
$process = netstat -ano | findstr :3000
$pid = $process.Split(' ')[-1]
taskkill /PID $pid /F

# Option 3: Use different port
npm run dev -- -p 3001    # Use port 3001 instead
```

---

## 🟡 EXECUTION POLICY ISSUES

### Issue: "Script Execution Disabled"

**Error Message:**
```
cannot be loaded because running scripts is disabled on this system
```

**Solution:**
```powershell
# For current PowerShell only (temporary)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# For current user (permanent)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# For all users (requires admin)
Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy RemoteSigned
```

**Then try again:**
```powershell
.\launch.ps1
```

---

### Issue: "File not found" or "script.ps1 not found"

**Solution:**
```powershell
# Check current directory
Get-Location

# Should show: C:\Users\Meiliastudio\lumeza-website

# If not, navigate there:
cd c:\Users\Meiliastudio\lumeza-website

# Verify script exists
Get-Item launch.ps1    # Should show file info

# Then run
.\launch.ps1
```

---

## 🟡 BUILD ERRORS

### Issue: "Module not found"

**Error:**
```
Error: Cannot find module '@something/package'
```

**Solution:**
```powershell
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# Or specific package
npm install @prisma/adapter-better-sqlite3

# Then rebuild
npm run build
```

---

### Issue: "Prisma Client Out of Date"

**Error:**
```
@prisma/client was initialized with an outdated lock file
```

**Solution:**
```powershell
# Generate Prisma client
npx prisma generate

# Clear cache and rebuild
Remove-Item -Path ".next" -Recurse -Force
npm run build
```

---

### Issue: Next.js Compilation Error

**Error:**
```
SyntaxError or parsing error
```

**Solution:**
```powershell
# Check for syntax errors
npx tsc --noEmit

# Look for .ts files with red squiggles in editor
# Fix them, then:
npm run build
```

---

## 🟡 GIT ISSUES

### Issue: "Git not installed"

**Error:**
```
'git' is not recognized as an internal or external command
```

**Solution:**
1. Download from: https://git-scm.com/download/win
2. Run installer default options
3. Close and reopen PowerShell
4. Verify: `git --version`

---

### Issue: "Not a git repository"

**Error:**
```
fatal: not a git repository (or any of the parent directories)
```

**Solution:**
```powershell
# Initialize git
git init

# Configure git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Verify
git config --global user.name

# Try again
.\git-automate.ps1
```

---

### Issue: "Origin does not appear to be a git repository"

**Error:**
```
fatal: 'origin' does not appear to be a 'git' repository
```

**Causes:**
- Remote not added
- Wrong URL
- Network issue

**Solution:**
```powershell
# Check remote
git remote -v    # Should show origin URL

# If empty, add it
git remote add origin https://github.com/username/lumeza-website.git

# If exists but wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/username/lumeza-website.git

# Try push again
git push -u origin main
```

---

### Issue: "Permission denied" or "Authentication failed"

**Error:**
```
Permission denied (publickey)
fatal: Could not read from remote repository
```

**Solutions:**

```powershell
# Option 1: Use HTTPS instead of SSH (easier)
git remote set-url origin https://github.com/username/lumeza-website.git

# Option 2: Generate GitHub token (for HTTPS)
# 1. https://github.com/settings/tokens
# 2. Create classic token with 'repo' scope
# 3. Use token as password when prompted

# Option 3: Setup SSH (advanced)
# See: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

---

### Issue: "Nothing to commit"

**Error:**
```
nothing to commit, working tree clean
```

**Cause:** No changes since last commit

**Solution:**
```powershell
# Make some changes first
# Edit a file, save it

# Then commit
git add .
git commit -m "Your message"
git push origin main
```

---

## 🟡 VERCEL ISSUES

### Issue: "Vercel CLI not found"

**Error:**
```
vercel: The term 'vercel' is not recognized
```

**Solution:**
```powershell
# Install Vercel globally
npm install -g vercel

# Verify
vercel --version

# Or let script install automatically
.\vercel-deploy.ps1
```

---

### Issue: "Not logged in to Vercel"

**Error:**
```
Error: Authentication Error - check your credentials
```

**Solution:**
```powershell
# Login to Vercel
vercel login

# Follow instructions:
# 1. Browser opens
# 2. Authorize access
# 3. Copy code back to terminal
# 4. Paste when prompted

# Verify login
vercel whoami    # Should show your username
```

---

### Issue: "Project not linked"

**Error:**
```
Error: Couldn't read a project from '/path'
```

**Solution:**
```powershell
# Link project to Vercel
vercel link

# Follow prompts:
# 1. Setup new project? → y
# 2. Project name → lumeza-website
# 3. Confirm settings → y

# Or let script do it
.\vercel-deploy.ps1
```

---

### Issue: "Environment variables not set"

**Error at runtime:**
```
RESEND_API_KEY is undefined
Contact form not sending emails
```

**Solution:**
```
1. Open https://vercel.com/dashboard
2. Select project: lumeza-website
3. Settings → Environment Variables
4. Add:
   RESEND_API_KEY = (your-key)
   NEXT_PUBLIC_FROM_EMAIL = noreply@lumeza.com
   NEXT_PUBLIC_CONTACT_EMAIL = hello@lumeza.com
   CONTACT_FORM_RECIPIENT_EMAIL = hello@lumeza.com
5. Redeploy: vercel --prod
```

---

### Issue: "Build fails on Vercel"

**Error:**
- Deploy fails in Vercel
- Works locally with `npm run build`

**Solution:**

```
1. Check Vercel build logs:
   https://vercel.com/dashboard → Project → Deployments
2. Look for error messages
3. Common causes:
   a) Missing env vars → Set in dashboard
   b) Different Node version → Check vercel.json
   c) Build script error → Test locally: npm run build
4. Fix locally, then:
   git add .
   git commit -m "Fix build"
   git push origin main
   Vercel auto-redeploys
```

---

### Issue: "Deployment stuck or slow"

**Solution:**
```powershell
# Wait 5-10 minutes (normal for first deploy)

# Or cancel and retry
vercel --prod

# Check Vercel status
# https://status.vercel.com
```

---

## 🟡 DATABASE ISSUES

### Issue: "Database Error" on Production

**Error:**
- Website works locally
- Shows error on Vercel
- Database cannot connect

**Cause:** Vercel doesn't have persistent file storage

**Solution:**

Option 1: Use SQLite on GitHub (simple, 48h limit):
```env
# .env.local
DATABASE_URL=file:./prisma/dev.db
```

Option 2: Use hosted database (recommended):
- Neon: https://neon.tech
- Supabase: https://supabase.com
- PlanetScale: https://planetscale.com

```env
# Get connection string from provider
DATABASE_URL=postgresql://user:pass@host/db
```

---

### Issue: "Prisma migration fails"

**Error:**
```
Prisma migration error or schema validation failed
```

**Solution:**
```powershell
# Reset migrations
Remove-Item -Path "prisma\migrations" -Recurse -Force

# Reset database
Remove-Item -Path "prisma\dev.db" -Force

# Recreate
npx prisma migrate dev --name init

# Seed
npm run prisma:seed
```

---

## 🟢 RECOVERY PROCEDURES

### Stuck Mid-Deployment? Nuclear Reset

```powershell
# Stop everything
Get-Process -Name "node" | Stop-Process -Force

# Clean build cache
Remove-Item -Path ".next" -Recurse -Force
Remove-Item -Path ".turbo" -Recurse -Force
Remove-Item -Path "node_modules\.prisma" -Recurse -Force

# Regenerate
npx prisma generate

# Try again
.\launch.ps1
```

---

### Website Not Updating After Deploy

```powershell
# Force rebuild on Vercel
vercel --prod --force

# Or redeploy through dashboard:
# 1. https://vercel.com/dashboard
# 2. Select last deployment
# 3. Click "Redeploy"
```

---

### Restore from GitHub

```powershell
# If you messed up local files
git checkout -- .

# If you committed bad code
git reset --hard origin/main
```

---

## 📊 Debugging Commands

### See All Errors:
```powershell
# TypeScript errors
npx tsc --noEmit

# Next.js build
npm run build 2>&1

# Database check
npx prisma db execute --stdin < /dev/null
```

### Check Status:
```powershell
# Git
git status
git log --oneline | head -5

# Node
Get-Process -Name "node"

# Ports
netstat -ano | findstr :3000

# Database
Test-Path "prisma\dev.db"
npx prisma studio
```

### View Logs:
```powershell
# Vercel deployment logs
vercel logs

# Build output
cat .vercel/output/logs
```

---

## 🎓 When to Use Each Recovery Method

| Problem | Level | Solution |
|---------|-------|----------|
| Script won't start | Low | Set execution policy |
| Git not configured | Low | Configure git |
| Code changes not pushed | Low | `git push origin main` |
| Build fails locally | Medium | Fix TypeScript, rebuild |
| Database won't start | Medium | `.\reset-db.ps1` |
| Vercel deploy fails | Medium | Fix locally, retest |
| Website stuck | High | Full reset + redeploy |
| Nothing works | Critical | Contact support |

---

## 📞 Getting More Help

### For Script Issues:
1. Read **AUTOMATION-GUIDE.md**
2. Check this file (you're here!)
3. Review script comments (in .ps1 files)

### For Next.js Issues:
- Docs: https://nextjs.org/docs
- Troubleshooting: https://nextjs.org/docs/messages/index

### For Prisma Issues:
- Docs: https://www.prisma.io/docs
- Studio: `npx prisma studio`

### For Vercel Issues:
- Status: https://status.vercel.com
- Support: https://vercel.com/support
- Docs: https://vercel.com/docs

### For Git Issues:
- Git Docs: https://git-scm.com/doc
- GitHub Help: https://docs.github.com

---

## ✅ Verification Checklist

Before declaring success, verify:

```powershell
# 1. Build works
npm run build    # Check: Exit code 0

# 2. Database has data
npx prisma studio    # Check: Products visible

# 3. Git push successful
git log --oneline -1    # Check: Your commit shows

# 4. Vercel deployed
vercel --list    # Check: Project listed

# 5. Website accessible
# Open Vercel URL in browser
# Check: Homepage loads
```

---

## 🎉 Success Signs

You'll see these when everything works:

```
✅ npm run build → "Compiled successfully"
✅ .\git-automate.ps1 → "ter-push ke GitHub"
✅ .\vercel-deploy.ps1 → "ter-deploy ke Vercel"
✅ Website loads in browser
✅ Contact form sends email
✅ API returns products
```

---

**Last Updated**: March 6, 2026  
**For**: Lumeza Creative Studio Website

🆘 **Still stuck?** Check AUTOMATION-GUIDE.md or try a full reset with `.\launch.ps1`
