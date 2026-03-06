# 📋 AUTOMATION SCRIPTS - REFERENCE

## 📁 Files Created

```
lumeza-website/
├── git-automate.ps1          ← Git workflow automation
├── vercel-deploy.ps1          ← Vercel deployment automation
├── launch.ps1                 ← All-in-one automation (MAIN)
├── reset-db.ps1              ← Database reset tool
│
└── 📚 Documentation:
    ├── QUICK-START.md         ← Start here! (5 min read)
    ├── AUTOMATION-GUIDE.md    ← Full documentation
    ├── AUTOMATION-REFERENCE.md ← This file
    │
    └── (Also available):
        ├── LAUNCH-GUIDE.md
        ├── LAUNCH-REPORT.md
        ├── VERCEL-DEPLOYMENT-GUIDE.md
        ├── FINAL-CHECKLIST.md
        └── LAUNCH-COMMANDS.md
```

---

## 🎯 Script Summary

### 1. **launch.ps1** ⭐ START HERE
**Status**: ✅ Ready to use  
**Complexity**: Easy (fully automated)  
**Time**: 10-15 minutes

```powershell
.\launch.ps1
```

**What it does** (in order):
1. Stop running Node servers
2. Clean .next, .turbo, lock files
3. Generate Prisma client
4. Verify/create database
5. Build production version
6. Ask for confirmation
7. Push to GitHub (runs git-automate.ps1)
8. Deploy to Vercel (runs vercel-deploy.ps1)

**Best for**: First-time launch or regular updates

**Output**:
```
✅ Clean build completed
✅ Code pushed to GitHub  
✅ Website deployed to Vercel
✅ Live URL displayed
```

---

### 2. **git-automate.ps1** 📦 GIT
**Status**: ✅ Ready to use  
**Complexity**: Easy (interactive)  
**Time**: 2-5 minutes

```powershell
.\git-automate.ps1
```

**What it does**:
1. Initialize git (if not already)
2. Ask for commit message
3. Show status of changes
4. Stage all files (`git add .`)
5. Create commit with message
6. Add remote origin (if needed)
7. Switch to `main` branch
8. Push to GitHub

**Best for**: 
- Just pushing code to GitHub
- Skip Vercel deployment
- Testing git workflow

**Prompts**:
- "📝 Masukkan commit message" → Type message or press Enter
- "🔗 Masukkan URL GitHub" → Paste https://github.com/user/repo.git

---

### 3. **vercel-deploy.ps1** 🚀 DEPLOYMENT
**Status**: ✅ Ready to use  
**Complexity**: Medium (requires Vercel account)  
**Time**: 5-10 minutes

```powershell
.\vercel-deploy.ps1
```

**What it does**:
1. Check/install Vercel CLI
2. Verify Vercel login
3. Link project to Vercel
4. Show environment variables needed
5. Deploy to production (`vercel --prod`)
6. Show deployment info

**Best for**:
- Deploying to Vercel only
- Redeploying after git push
- Testing Vercel integration

**Requirements**:
- Vercel account (https://vercel.com)
- GitHub repository already created
- No Vercel project linked yet (or will ask)

**Notes**:
- First time: Will ask to login to Vercel
- Environment variables must be set in Vercel dashboard manually
- Script shows which variables to set

---

### 4. **reset-db.ps1** 🔄 UTILITY
**Status**: ✅ Ready to use  
**Complexity**: Easy (destructive!)  
**Time**: 1-2 minutes

```powershell
.\reset-db.ps1
```

**⚠️ WARNING**: Deletes all local database data!

**What it does**:
1. Stop running servers
2. Delete `prisma/dev.db`
3. Clear Prisma cache
4. Generate Prisma client
5. Run database migrations
6. Seed with sample data

**Best for**:
- Database corrupt/cannot connect
- Prisma schema changes
- Fresh start with sample data
- Testing data reset

**Confirmation**: "Yakin reset database? (y/N)" → Answer `y`

**Note**: Only affects LOCAL database, not Vercel production

---

## 🚀 Usage Scenarios

### Scenario 1: First-Time Launch
```powershell
# Deploy website for the first time
.\launch.ps1
```

### Scenario 2: Regular Updates
```powershell
# After making changes locally
npm run dev      # Test locally
.\launch.ps1     # Build, push, deploy
```

### Scenario 3: Only GitHub Update (no Vercel)
```powershell
# Push to GitHub but don't deploy
npm run build     # Verify build works
.\git-automate.ps1
```

### Scenario 4: Only Vercel Update (code already in GitHub)
```powershell
.\vercel-deploy.ps1
```

### Scenario 5: Database Issues
```powershell
# Database not responding
.\reset-db.ps1

# Or continue with development
npm run dev
```

---

## 📊 Execution Flow

### launch.ps1 Complete Flow:

```
START
  ↓
┌─────────────────────────┐
│ 1. Stop Servers         │
│ 2. Clean Cache          │
│ 3. Prisma Generate      │
│ 4. Verify Database      │
│ 5. Build Production     │
└─────────────────────────┘
  ↓
┌─────────────────────────┐
│   Build Success Test    │
│   ✅ or ❌              │
└─────────────────────────┘
  ↓
  IF FAILED → EXIT 1
  IF SUCCESS → Continue
  ↓
┌─────────────────────────┐
│  User Confirmation      │
│  "Lanjutkan deploy?"    │
└─────────────────────────┘
  ↓
  IF NO → EXIT 0
  IF YES → Continue
  ↓
┌─────────────────────────┐
│ Git Automation:         │
│ • Add files             │
│ • Commit                │
│ • Push to GitHub        │
└─────────────────────────┘
  ↓
  IF FAILED → EXIT 1
  IF SUCCESS → Continue
  ↓
┌─────────────────────────┐
│ Vercel Deploy:          │
│ • Check CLI             │
│ • Verify login          │
│ • Deploy --prod         │
└─────────────────────────┘
  ↓
  IF FAILED → EXIT 1
  IF SUCCESS → Continue
  ↓
┌─────────────────────────┐
│ ✅ DEPLOYMENT SUCCESS! │
│ URL: ...                │
└─────────────────────────┘
  ↓
END
```

---

## ⚙️ Technical Details

### Environment Variables

#### Local Development (`.env.local`):
```env
DATABASE_URL=file:./prisma/dev.db
```

#### Vercel Production (via Dashboard):
```env
DATABASE_URL=file:./prisma/prod.db
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@lumeza.com
CONTACT_FORM_RECIPIENT_EMAIL=hello@lumeza.com
```

---

### Git Workflow

**Branches**:
- `main` - production branch (pushed by script)
- Development on `main` directly (simple workflow)

**Commit Convention**:
- Default: "Update website Lumeza - [timestamp]"
- Custom: Input via prompt

**Remote**:
- `origin` - GitHub repository
- Auto-added if doesn't exist

---

### Vercel Configuration

**Files affected**:
- `.vercel/` - Project metadata (created by script)
- `vercel.json` - Build configuration (auto-detected)

**Deployment**:
- Production: `vercel --prod`
- Preview: `vercel` (not used)

---

## 🎓 Learning Path

### For Beginners:
1. Read: **QUICK-START.md** (5 min)
2. Read: **AUTOMATION-GUIDE.md** → Setup section
3. Run: `.\launch.ps1`
4. Done! Website is live

### For Intermediate:
1. Understand each script individually
2. Run scripts separately to learn flow
3. Read: **AUTOMATION-GUIDE.md** → Full guide

### For Advanced:
1. Modify scripts for custom workflows
2. Add error handling
3. Integrate with CI/CD (future)

---

## 🔧 Customization

### Modify Commit Message:
Edit `git-automate.ps1`, line ~20:
```powershell
$commitMessage = "Your custom message"
```

### Change Deployment Branch:
Edit `git-automate.ps1`, line ~60:
```powershell
git branch -M main    # Change 'main' to 'master' if preferred
```

### Skip Confirmation:
Edit `launch.ps1`, remove confirmation prompt (line ~52)

---

## 📞 Support Reference

| Issue | Solution |
|-------|----------|
| Scripts won't run | `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| Git not found | `git --version` to verify, install from git-scm.com |
| Vercel not found | Script auto-installs, or `npm install -g vercel` |
| Build fails | `npx tsc --noEmit` to check errors |
| Database error | `.\reset-db.ps1` |
| Port 3000 in use | `Get-Process node \| Stop-Process -Force` |
| Git push fails | Check internet, try again or use `git push -u origin main` |
| Vercel deploy fails | Check environment variables, see Vercel logs |

---

## 🎯 Exit Codes

```
0 = Success
1 = Error occurred
```

**For automation/CI/CD:**
```powershell
.\launch.ps1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment successful!"
} else {
    Write-Host "❌ Deployment failed!"
}
```

---

## 📈 Performance Tips

**Faster builds**:
- Use `npm ci` instead of `npm install` (faster)
- Clear node_modules cache: `npm cache clean --force`
- Update Node.js to latest LTS

**Faster deployment**:
- Optimize images (use Next.js Image)
- Enable Vercel caching
- Monitor bundle size

---

## 🔐 Security Notes

**Never commit**:
- `.env` or `.env.local` files
- API keys or secrets
- Credentials

**Always use**:
- Environment variables for secrets
- `.gitignore` to exclude sensitive files
- Vercel dashboard for production secrets

---

## 📚 Related Files

All in same directory:

| File | Purpose |
|------|---------|
| **git-automate.ps1** | Git automation |
| **vercel-deploy.ps1** | Vercel deployment |
| **launch.ps1** | Full automation |
| **reset-db.ps1** | Database reset |
| **QUICK-START.md** | Quick reference |
| **AUTOMATION-GUIDE.md** | Full documentation |
| **AUTOMATION-REFERENCE.md** | This file |
| **LAUNCH-GUIDE.md** | Pre-launch guide |
| **VERCEL-DEPLOYMENT-GUIDE.md** | Vercel details |
| **FINAL-CHECKLIST.md** | Final checklist |

---

## ✅ Checklist Before Deployment

- [ ] Scripts downloaded and in project root
- [ ] Git configured (`git config --global user.name`)
- [ ] GitHub repository created
- [ ] Vercel account created
- [ ] Commit message ready
- [ ] Internet connection stable
- [ ] No other processes on port 3000
- [ ] Read QUICK-START.md
- [ ] Ready to deploy!

---

**Status**: ✅ All scripts ready for production  
**Last Updated**: March 6, 2026  
**Project**: Lumeza Creative Studio Website

🚀 **Ready to launch?** → `.\launch.ps1`
