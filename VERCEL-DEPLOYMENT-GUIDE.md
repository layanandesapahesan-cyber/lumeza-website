# 🚀 LUMEZA CREATIVE STUDIO - VERCEL DEPLOYMENT GUIDE

**Goal:** Deploy Lumeza Creative Studio to production on Vercel  
**Estimated Time:** 20-30 minutes  
**Difficulty:** Easy  

---

## ⚠️ BEFORE YOU START

Make sure you have:
- [ ] GitHub account (to push code)
- [ ] Vercel account (free tier is fine)
- [ ] All tests passing (read LAUNCH-REPORT.md)
- [ ] Production build confirmed working (npm start)
- [ ] Domain name ready (optional, can use vercel.app subdomain)

---

## 🔧 STEP 1: PREPARE GITHUB REPOSITORY (5 minutes)

### 1.1 Create .gitignore (ensure sensitive files are ignored)

Verify file exists in project root:
```
node_modules/
.next/
.env.local
.env.production.local
.env.development.local
.env.test.local
```

### 1.2 Verify .env.local is NOT committed

```powershell
# Check if .env.local is in git
git ls-files | findstr ".env.local"

# If output shows .env.local, remove it
git rm --cached .env.local
git commit -m "Remove .env.local from git tracking"
```

### 1.3 Commit all your changes

```powershell
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Lumeza Creative Studio - Final production build ready for deployment"

# Push to GitHub
git push origin main
```

**Expected output:**
```
Your branch is up to date with 'origin/main'.
```

---

## 📊 STEP 2: CREATE VERCEL PROJECT (10 minutes)

### 2.1 Go to Vercel Dashboard

1. Open https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**

### 2.2 Select GitHub Repository

1. Click **"Continue with GitHub"**
2. Authorize Vercel to access your GitHub account
3. Search for **"lumeza-website"** repository
4. Click to select it

### 2.3 Configure Project Settings

1. **Project name:** `lumeza-creative-studio` (or your preferred name)
2. **Root Directory:** Leave as `./` (root)
3. **Framework Preset:** Should auto-detect as **Next.js** ✓
4. **Build Command:** `npm run build` ✓
5. **Install Command:** `npm install` ✓
6. **Output Directory:** `.next` ✓
7. **Development Command:** `npm run dev` ✓

### 2.4 Add Environment Variables

This is **CRITICAL** - your app won't work without these!

Click on **"Environment Variables"** and add:

```
NAME:  DATABASE_URL
VALUE: file:./prisma/dev.db
```

```
NAME:  RESEND_API_KEY  
VALUE: re_xxxxxxxxxxxxx  (Get from https://resend.com/api-keys)
```

```
NAME:  NEXT_PUBLIC_FROM_EMAIL
VALUE: noreply@lumeza.com
```

```
NAME:  NEXT_PUBLIC_BASE_URL
VALUE: https://your-domain.com  (or will be vercel URL)
```

```
NAME:  NEXT_PUBLIC_API_URL
VALUE: https://your-domain.com/api
```

```
NAME:  CONTACT_FORM_RECIPIENT_EMAIL
VALUE: hello@lumeza.com
```

**Optional - Analytics:**
```
NAME:  NEXT_PUBLIC_GA_ID
VALUE: G-XXXXXXXXXX  (Get from Google Analytics)
```

### 2.5 Review & Deploy

1. Review all settings
2. Click **"Deploy"** button
3. Wait for deployment to complete (5-10 minutes)

**Status page will show:**
```
✓ Building...
✓ Compiling...  
✓ Generating static pages...
✓ Finalizing...
✓ Deployment ready [your-project].vercel.app
```

---

## ✅ STEP 3: VERIFY DEPLOYMENT (5 minutes)

### 3.1 Check Deployment Status

1. Once "Deployment ready" appears, click on your project name
2. You should see a URL like: `https://lumeza-xxx.vercel.app`
3. Click on the URL to open your live site

### 3.2 Test Main Pages

In your browser, visit:

```
Homepage:        https://lumeza-xxx.vercel.app
Products:        https://lumeza-xxx.vercel.app/produk
About:           https://lumeza-xxx.vercel.app/tentang-kami  
Services:        https://lumeza-xxx.vercel.app/layanan
Contact:         https://lumeza-xxx.vercel.app/kontak
Product Detail:  https://lumeza-xxx.vercel.app/produk/icon/business-icons-line
```

All should return **200 status**.

### 3.3 Test APIs

In browser or PowerShell:

```powershell
$BaseUrl = "https://lumeza-xxx.vercel.app"

# Test API
Invoke-WebRequest "$BaseUrl/api/products?limit=1" | Select-Object -ExpandProperty StatusCode

# Should return: 200
```

### 3.4 Test Download Feature

1. Visit product page
2. Click "Download Sekarang"
3. Enter email
4. Submit - should see success message
5. Check email inbox for download link

---

## 🌐 STEP 4: SETUP CUSTOM DOMAIN (Optional, 10 minutes)

### 4.1 Add Domain to Vercel

1. In Vercel project settings → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain: `lumeza.com`
4. Choose DNS provider option

### 4.2 Configure DNS

Vercel will give you two options:

**Option A: Use Vercel's Nameservers (Recommended)**
1. Copy the nameservers from Vercel
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update DNS to point to Vercel's nameservers
4. Wait 24-48 hours for propagation

**Option B: Add DNS Records**
1. Get CNAME/A records from Vercel
2. Add them to your domain registrar
3. Wait for propagation

### 4.3 Verify Domain

Once DNS propagates:
1. Vercel will auto-verify
2. You'll see ✓ in Domains section
3. Your site is live at custom domain

---

## 📧 STEP 5: SETUP EMAIL SERVICE (If not done)

### 5.1 Create Resend Account

1. Go to https://resend.com
2. Sign up with email
3. Verify email address
4. Go to **Settings** → **API Keys**
5. Copy your API key: `re_xxxxxxxxxxxxx`

### 5.2 Verify Sending Domain

1. In Resend dashboard: **Domains**
2. Click **"Add Domain"**
3. Enter: `noreply@lumeza.com` or your domain
4. Resend gives you DNS records
5. Add to your domain registrar
6. Verify in Resend

### 5.3 Update Vercel Environment Variable

In Vercel project settings:
1. Edit `RESEND_API_KEY`
2. Paste your API key
3. Save and redeploy (Vercel auto-redeploys)

---

## 🔍 STEP 6: MONITORING & VERIFICATION (Ongoing)

### 6.1 Enable Vercel Analytics

1. In Vercel project: **Settings** → **Analytics**
2. Click **"Enable Analytics"**
3. You can now see:
   - Page views
   - Response time
   - Core Web Vitals
   - Error rates

### 6.2 Setup Google Analytics (Optional)

1. Go to https://analytics.google.com
2. Create new property for your domain
3. Get Measurement ID: `G-XXXXXXXXXX`
4. Add to Vercel env var: `NEXT_PUBLIC_GA_ID`
5. Redeploy

### 6.3 Monitor Errors

In Vercel project: **Monitoring** → **Functions**
- Check for API errors
- Monitor server response times
- View error logs

### 6.4 Check Logs

In Vercel project: **Deployments**
- Click latest deployment
- View build logs
- Check runtime logs

---

## 🛡️ STEP 7: SECURITY CHECKLIST

Before going fully public, verify:

```
[ ] Environment variables are ALL in Vercel (not in code)
[ ] RESEND_API_KEY is hidden (masked in env vars)
[ ] DATABASE_URL is correct
[ ] HTTPS is enabled (automatic on vercel.app)
[ ] CORS is configured (if needed)
[ ] API rate limiting considered
[ ] Error messages don't expose sensitive info
[ ] Admin routes are protected (if any)
[ ] Database backups are set up
```

---

## 📈 STEP 8: POST-DEPLOYMENT TASKS

### Immediate (Same day)
- [ ] Test all features on production
- [ ] Share with team for final review
- [ ] Monitor error logs
- [ ] Test on different browsers
- [ ] Test on mobile devices

### Day 1-3
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor analytics
- [ ] Check Core Web Vitals
- [ ] Monitor email delivery

### Week 1
- [ ] Monitor user traffic
- [ ] Check product downloads
- [ ] Review user feedback
- [ ] Monitor error rates
- [ ] Test all forms

### Month 1
- [ ] Review analytics data
- [ ] Optimize based on user behavior
- [ ] Update products/content
- [ ] Plan new features
- [ ] Security audit

---

## 🆘 TROUBLESHOOTING DEPLOYMENT

### Deployment Fails

**Check buildlog in Vercel:**
```
1. Go to project → Deployments
2. Click failed deployment
3. Scroll to see error
4. Common causes:
   - Missing environment variable
   - TypeScript error
   - Environment variable format wrong
   - Node version mismatch
```

**Fix and retry:**
```powershell
# 1. Fix local
npm run build  # Test locally first

# 2. Commit and push
git add .
git commit -m "Fix deployment error"
git push origin main

# 3. Vercel auto-redeploys from git push
# Or manually click "Redeploy" in Vercel
```

### Site Returns 404

**Possible causes:**
- Project configuration wrong
- Build output directory wrong
- Environment variables missing

**Fix:**
1. Check Vercel settings → Build & Output settings
2. Ensure Output Directory: `.next`
3. Redeploy

### Email Not Working

**Debug:**
```powershell
# 1. Check RESEND_API_KEY in Vercel env var
# 2. Verify domain in Resend dashboard
# 3. Check Resend email logs

# 4. Test with curl
curl -X POST https://api.resend.com/emails `
  -H "Authorization: Bearer re_xxxxxxxxxxxxx" `
  -d '{"from":"noreply@lumeza.com","to":"test@example.com","subject":"Test","html":"<h1>Test</h1>"}'
```

### Database Error

**Check:**
1. DATABASE_URL is correct in Vercel
2. SQLite database exists at path
3. Run migrate: `npx prisma db push`

**To reset database on Vercel:**
```powershell
# Delete and recreate via SSH:
# This requires Vercel Pro plan and SSH access
# For SQLite, database is part of your repo
```

For better database experience in production, consider migrating to:
- PostgreSQL (recommended)
- MySQL
- MongoDB

---

## 🎯 SUCCESS INDICATORS

Your deployment is **successful** if:

✅ Homepage loads in browser  
✅ Products page shows 30+ items  
✅ API endpoints return 200 status  
✅ Download form works  
✅ Contact form works  
✅ Email verification emails send  
✅ No error messages in console  
✅ Analytics data appears  
✅ Custom domain resolves (if set up)  
✅ HTTPS shows green lock icon  

---

## 📞 SUPPORT RESOURCES

### Official Documentation
- **Next.js:** https://nextjs.org/docs
- **Vercel:** https://vercel.com/docs
- **Prisma:** https://www.prisma.io/docs
- **Resend:** https://resend.com/docs

### Useful Commands

```powershell
# Check deployment status
git log --oneline -5

# View Vercel logs locally
vercel logs [project-name]

# Deploy preview (creates test URL before merging)
# Just open PR instead of pushing to main

# Manual deployment (if needed)
vercel --prod
```

---

## 🎊 CONGRATULATIONS!

Your Lumeza Creative Studio is now:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Automatically backed up
- ✅ Using global CDN
- ✅ HTTPS secured
- ✅ Auto-scaling
- ✅ Monitoring errors

**Your Vercel URL:** `https://[your-project].vercel.app`  
**Custom Domain:** `https://lumeza.com` (if set up)  

---

## 🔄 FUTURE MAINTENANCE

### Regular Updates
```powershell
# Update packages monthly
npm update

# Check for vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

### Adding Features
```powershell
# Create branch for new feature
git checkout -b feature/new-feature

# Make changes and commit
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request for review
# Vercel auto-creates preview deployment

# Once approved, merge to main
# Vercel auto-deploys to production
```

### Monitoring Checklist (Weekly)
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Review Core Web Vitals
- [ ] Check analytics
- [ ] Test key features
- [ ] Monitor email delivery

---

**Last Updated:** March 6, 2026  
**Status:** Deployment Guide Complete  
**Ready to Deploy:** YES ✅

**Next Step:** Follow the 8 steps above to deploy to Vercel!

Good luck! 🚀
