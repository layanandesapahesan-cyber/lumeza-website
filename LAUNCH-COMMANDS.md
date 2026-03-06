# 🚀 LUMEZA LAUNCH - QUICK COMMANDS

Copy-paste these commands to launch your site in minutes!

---

## STEP 1: PREPARE ENVIRONMENT

```powershell
# Kill any running Node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean cache
Remove-Item -Path ".next", ".turbo" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".next\dev\lock" -Force -ErrorAction SilentlyContinue

# Generate Prisma
npx prisma generate

# Verify database
Get-ChildItem prisma/dev.db -Force
```

---

## STEP 2: TEST PRODUCTION BUILD

```powershell
# Create production build
npm run build

# This should output:
# ✓ Compiled successfully
# ✓ Finished TypeScript
# ✓ Generating static pages (28/28)
```

---

## STEP 3: RUN PRODUCTION SERVER

```powershell
# Start production server
npm start

# Server should start at http://localhost:3000
# Keep this terminal open!
```

---

## STEP 4: TEST IN ANOTHER TERMINAL (Optional)

```powershell
# Test homepage
Invoke-WebRequest "http://localhost:3000" | Select-Object -ExpandProperty StatusCode

# Test API
Invoke-WebRequest "http://localhost:3000/api/products?limit=1" | Select-Object -ExpandProperty StatusCode

# Both should return 200
```

---

## STEP 5: PUSH TO GITHUB

```powershell
# In a new terminal (keep npm start running)
git add .
git commit -m "Final pre-launch build - Lumeza Creative Studio ready for production"
git push origin main

# Verify it pushed
git status
# Should say: "Your branch is up to date with 'origin/main'."
```

---

## STEP 6: DEPLOY TO VERCEL (Manual)

### Option A: GitHub Push (Automatic)
```
1. Your git push already triggered Vercel
2. Go to https://vercel.com/dashboard
3. Watch your project deploy automatically
```

### Option B: Manual Deploy (If you have Vercel CLI)
```powershell
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Get your live URL
# It will be: https://[project-name].vercel.app
```

---

## STEP 7: SETUP ENVIRONMENT VARIABLES IN VERCEL

After deployment starts, go to:
```
https://vercel.com/dashboard
→ Select your project
→ Settings
→ Environment Variables
```

**Add these variables:**

```
NAME:  DATABASE_URL
VALUE: file:./prisma/dev.db
SCOPE: Production

NAME:  RESEND_API_KEY
VALUE: re_xxxxxxxxxxxxx
SCOPE: Production

NAME:  NEXT_PUBLIC_FROM_EMAIL
VALUE: noreply@lumeza.com
SCOPE: Production

NAME:  NEXT_PUBLIC_BASE_URL
VALUE: https://your-domain.com
SCOPE: Production

NAME:  NEXT_PUBLIC_API_URL
VALUE: https://your-domain.com/api
SCOPE: Production

NAME:  CONTACT_FORM_RECIPIENT_EMAIL
VALUE: hello@lumeza.com
SCOPE: Production
```

---

## STEP 8: REDEPLOY WITH ENV VARS

After adding env vars:
```
https://vercel.com/dashboard
→ Select your project  
→ Deployments
→ Click rightmost deployment
→ Click "Redeploy"
```

Wait for: **"Deployment ready"** ✓

---

## STEP 9: TEST PRODUCTION URL

Once Vercel shows "Deployment ready", test:

```powershell
# Get your Vercel URL (from Vercel dashboard)
$BaseUrl = "https://lumeza-xxx.vercel.app"

# Test homepage
Invoke-WebRequest "$BaseUrl" | Select-Object -ExpandProperty StatusCode

# Test products API
Invoke-WebRequest "$BaseUrl/api/products" | Select-Object -ExpandProperty StatusCode

# Test product detail
Invoke-WebRequest "$BaseUrl/produk/icon/business-icons-line" | Select-Object -ExpandProperty StatusCode

# All should return 200
```

---

## STEP 10: SETUP CUSTOM DOMAIN (Optional)

```
https://vercel.com/dashboard
→ Select your project
→ Settings
→ Domains
→ Add Domain
→ Enter: lumeza.com
→ Follow DNS instructions
→ Wait 24-48 hours for verification
```

---

## EMERGENCY: STOP LOCAL SERVER

If npm start is running and blocking things:

```powershell
# Kill local server
Get-Process -Name "node" | Stop-Process -Force

# Or find and kill specific port
$process = netstat -ano | findstr :3000
$pid = $process.Split(' ')[-1]
taskkill /F /PID $pid
```

---

## EMERGENCY: RESET DATABASE

If data gets corrupted:

```powershell
# Backup first
Copy-Item prisma/dev.db prisma/dev.db.backup

# Reset database
npx prisma db push --force-reset

# Reseed with sample data
npm run prisma:seed

# Or manually reseed
npx prisma db seed
```

---

## PRODUCTION SERVER RESTART

If production server crashes:

```powershell
# Kill existing processes
Get-Process -Name "node" | Stop-Process -Force
Start-Sleep -Seconds 2

# Clean and restart
Remove-Item .next\dev\lock -Force -ErrorAction SilentlyContinue
npm start
```

---

## QUICK VERIFICATION CHECKLIST

```powershell
# All these should work:

# Check Node is installed
node --version

# Check npm is working
npm --version

# Check git is ready
git status

# Check build works
npm run build

# Check database exists
Get-ChildItem prisma/dev.db

# Check Prisma
npx prisma --version

# Check TypeScript
npx tsc --version
```

---

## USEFUL ONE-LINERS

```powershell
# Kill all node processes and clear cache
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force; Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item .next\dev\lock -Force -ErrorAction SilentlyContinue; npm start

# Full clean install
Remove-Item node_modules, package-lock.json -Recurse -Force -ErrorAction SilentlyContinue; npm install; npx prisma generate; npm run build

# Test all endpoints
$BaseUrl = "http://localhost:3000"; @("/", "/api/products", "/api/diag") | ForEach-Object { (Invoke-WebRequest "$BaseUrl$_").StatusCode }

# Push to git and exit
git add .; git commit -m "pre-launch"; git push origin main

# Monitor Vercel deployment
# (Just check dashboard at https://vercel.com/dashboard)
```

---

## ENVIRONMENT VARIABLES TEMPLATE

Save this as `.env.local` in project root:

```bash
# Database
DATABASE_URL="file:./prisma/dev.db"

# Email Service (Get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com

# URLs (Update for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

For production, change base URLs:
```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

---

## VERCEL CLI SETUP (Optional)

If you want to deploy via CLI instead of GitHub:

```powershell
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to project
vercel link

# Deploy to production
vercel --prod
```

---

## MONITORING AFTER LAUNCH

```powershell
# Check Vercel logs (requires CLI)
vercel logs --prod

# Check deployment history
vercel deployments

# Rebuild if needed
vercel rebuild

# View environment
vercel env list
```

---

## QUICK REFERENCE: PORTS

```
Local Development:   http://localhost:3000
Production Server:   http://localhost:3000 (npm start)
Prisma Studio:       npx prisma studio (opens at localhost:5555)
```

---

## QUICK REFERENCE: FILES

| File | Purpose |
|------|---------|
| LAUNCH-GUIDE.md | Detailed launch instructions |
| LAUNCH-REPORT.md | Verification report |
| VERCEL-DEPLOYMENT-GUIDE.md | Step-by-step Vercel guide |
| FINAL-CHECKLIST.md | Quick checklist |
| LAUNCH-COMMANDS.md | This file (quick commands) |

---

## SUPPORT CONTACTS

**If something breaks:**

1. Check documentation above
2. Review error in terminal/console
3. Check Vercel dashboard logs
4. Try the emergency reset commands above
5. Contact Vercel support if needed

**Vercel Help:**
- https://vercel.com/support
- https://vercel.com/docs

---

## 🎉 FINAL STATUS

✅ **Building:** npm run build  
✅ **Testing:** npm start  
✅ **Pushing:** git push origin main  
✅ **Deploying:** Vercel (automatic or manual)  
✅ **Live:** https://your-project.vercel.app  

**You're ready to launch!** 🚀

---

## 📝 NOTES

- Keep `.env.local` out of git (it's in .gitignore)
- Always test locally before pushing
- Environment variables in Vercel override .env files
- Deployment takes 5-10 minutes from git push
- Custom domain verification takes 24-48 hours
- Monitor your site after launch

---

**Created:** March 6, 2026  
**Status:** Ready for Production  
**Next Step:** Run Step 1 commands above!

Good luck! 🚀
