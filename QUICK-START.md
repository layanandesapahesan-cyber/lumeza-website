# 🚀 QUICK START - AUTOMATION SCRIPTS

## ⚡ Fastest Way to Deploy

### 1️⃣ First Time Setup (5 minutes)

```powershell
# Open PowerShell as Administrator
# Navigate to project folder
cd c:\Users\Meiliastudio\lumeza-website

# Set execution policy (one-time)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Setup git config
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2️⃣ Create GitHub Repository
1. Go to https://github.com/new
2. Name: **lumeza-website**
3. Choose Private or Public
4. Create Repository
5. **Don't** initialize with README

### 3️⃣ Launch Everything! 🎉

```powershell
.\launch.ps1
```

**What to answer:**
- Build successful? → **Continue**
- Commit message? → **Press Enter** (or custom message)
- GitHub URL? → **Paste https://github.com/username/lumeza-website.git**
- Vercel already linked? → **Follow prompts**
- Deploy to production? → **y** then **Enter**

**⏱️ Total time: 10-15 minutes**

---

## 📊 What Happens in `.\launch.ps1`

```
✅ Stops running servers
✅ Cleans temporary files
✅ Generates Prisma client
✅ Verifies database
✅ Builds production version
↓
You confirm...
↓
✅ Pushes code to GitHub
✅ Deploys to Vercel
✅ Shows live URL
```

---

## 🎯 Individual Scripts

### Only Push to GitHub

```powershell
.\git-automate.ps1
```

### Only Deploy to Vercel

```powershell
.\vercel-deploy.ps1
```

### Reset Database (if broken)

```powershell
.\reset-db.ps1
```

---

## ✅ After Deploy

### 1. Check Vercel Dashboard
- URL: https://vercel.com/dashboard
- Project: lumeza-website
- Look for green "Production" deployment

### 2. Set Environment Variables

Go to Vercel Dashboard → Settings → Environment Variables

Add these:
```
RESEND_API_KEY = (get from https://resend.com)
NEXT_PUBLIC_FROM_EMAIL = noreply@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL = hello@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL = hello@lumeza.com
```

### 3. Test Website
- Click "Visit" in Vercel dashboard
- Or open: https://your-vercel-url.vercel.app
- Test contact form
- Check API: /api/products

---

## 🔧 Fix Common Issues

### Error: "script execution disabled"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Error: "not a git repository"
```powershell
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Port 3000 already in use
```powershell
Get-Process -Name "node" | Stop-Process -Force
```

### Database corrupt
```powershell
.\reset-db.ps1
```

---

## 📚 More Help

- **AUTOMATION-GUIDE.md** - Full documentation
- **LAUNCH-GUIDE.md** - Pre-launch checklist
- **VERCEL-DEPLOYMENT-GUIDE.md** - Vercel setup details

---

## 🎓 Command Cheat Sheet

```powershell
# Development
npm run dev                    # Start dev server

# Full deploy
.\launch.ps1

# Individual steps
.\git-automate.ps1           # Git push only
.\vercel-deploy.ps1          # Vercel deploy only
.\reset-db.ps1              # Reset database

# Testing
npm run build                # Test production build
npx tsc --noEmit            # Check for TypeScript errors
npx prisma studio          # View database
```

---

**Ready to deploy? Run:** `.\launch.ps1` 🚀

---

*Guide created for: Lumeza Creative Studio Website*
*Last updated: March 6, 2026*
