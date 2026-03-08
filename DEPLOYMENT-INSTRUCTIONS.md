# 🚀 DEPLOYMENT INSTRUCTIONS

**Status:** Production-Ready  
**Target:** Vercel Hosting  
**Estimated Time:** 15-20 minutes

---

## Prerequisites

Before deploying, ensure you have:
- [x] Vercel account (free tier available at vercel.com)
- [x] GitHub account with project pushed
- [x] Resend API key (for email service)
- [x] Domain name (optional, use vercel.app subdomain for free)

---

## Step 1: Prepare Your Repository

### 1.1 Verify Everything is Pushed to Git

```bash
# Check git status
git status

# Stage all changes
git add .

# Commit with clear message
git commit -m "Release: Production-ready version - cleaned and optimized for public launch"

# Push to GitHub
git push origin main
```

### 1.2 Verify No Sensitive Data

```bash
# Check that .env.local is NOT in git
git ls-files | grep .env

# Should only show .env and .env.example, NOT .env.local
```

---

## Step 2: Connect to Vercel

### 2.1 Login to Vercel

1. Go to https://vercel.com/login
2. Sign in with GitHub account
3. Authorize Vercel to access your repositories

### 2.2 Create New Project

1. Click **"New Project"** or **"Add New"** → **"Project"**
2. Select your `lumeza-website` repository
3. Click **"Import"**

---

## Step 3: Configure Project Settings

### 3.1 Project Configuration

When importing, you should see:

```
Project Name: lumeza-website
Framework: Next.js (should auto-detect)
Root Directory: ./ (default)
```

### 3.2 Environment Variables

Click **"Environment Variables"** and add all these variables:

```
Name: DATABASE_URL
Value: file:./prisma/prod.db
Scope: Production, Preview, Development

Name: RESEND_API_KEY
Value: re_xxxxxxxxxxxxx (your actual Resend API key)
Scope: Production, Preview, Development

Name: NEXT_PUBLIC_FROM_EMAIL
Value: noreply@lumeza.com
Scope: Production, Preview, Development

Name: NEXT_PUBLIC_CONTACT_EMAIL
Value: hello@lumeza.com (change to your actual contact email)
Scope: Production, Preview, Development

Name: NEXT_PUBLIC_BASE_URL
Value: https://yourtempvercelurl.vercel.app (will change with custom domain)
Scope: Production, Preview, Development

Name: NEXT_PUBLIC_API_URL
Value: https://yourtempvercelurl.vercel.app/api
Scope: Production, Preview, Development

Name: NEXT_PUBLIC_GA_ID (Optional)
Value: G_XXXXXXXXXX (your Google Analytics ID)
Scope: Production, Preview, Development
```

⚠️ **IMPORTANT:** Update `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_API_URL` after getting your Vercel URL.

---

## Step 4: Deploy

### 4.1 Start Deployment

1. Click **"Deploy"** button
2. Wait for build to complete (usually 3-5 minutes)
3. You'll see: ✓ Build succeeded
4. Note your Vercel URL (e.g., `lumeza-website.vercel.app`)

### 4.2 Update Environment Variables with Final URLs

After getting your Vercel URL:

1. Go to **Project Settings** → **Environment Variables**
2. Update these variables:

```
NEXT_PUBLIC_BASE_URL = https://lumeza-website.vercel.app
NEXT_PUBLIC_API_URL = https://lumeza-website.vercel.app/api
```

3. Click **"Save"**

### 4.3 Redeploy to Apply URL Changes

1. Go to **Deployments** tab
2. Find the most recent deployment
3. Click the **3-dot menu** → **Redeploy**
4. Confirm **"Redeploy"**

Wait 2-3 minutes for redeploy to complete.

---

## Step 5: Connect Custom Domain (Optional)

### 5.1 Add Domain to Vercel

1. Go to **Project Settings** → **Domains**
2. Enter your domain: `yourdomain.com`
3. Click **"Add"**
4. Vercel will show you DNS records to add

### 5.2 Update DNS Records

Go to your domain registrar (GoDaddy, Namecheap, etc.):

1. Find **DNS Settings** section
2. Add the records Vercel shows you:
   - Type: A/AAAA
   - Value: Vercel's IP addresses
3. Or configure CNAME if preferred

### 5.3 Wait for Propagation

DNS can take 24-48 hours to fully propagate.

Check status:
```bash
# In terminal
nslookup yourdomain.com

# Or use online tools:
# https://whatsmydns.net/
```

---

## Step 6: Verify Deployment

### 6.1 Test API Endpoints

```bash
# Replace YOUR_DOMAIN with your actual domain
curl https://YOUR_DOMAIN/api/products?limit=3

# Should return products JSON
```

### 6.2 Test the Website

1. Open https://YOUR_DOMAIN in browser
2. Check these pages work:
   - Home page
   - Products page
   - Product detail page
   - Contact form
   - Download functionality

### 6.3 Test Email

1. Go to Contact page (https://YOUR_DOMAIN/kontak)
2. Fill out form with test email
3. Submit
4. Check your email inbox for submission

---

## Step 7: Configure Additional Services

### 7.1 Google Analytics Setup (Optional)

1. Create Google Analytics account at https://analytics.google.com
2. Create property for your domain
3. Get your Measurement ID (`G_XXXXXXXXXX`)
4. Update Vercel environment variable:
   ```
   NEXT_PUBLIC_GA_ID = G_XXXXXXXXXX
   ```
5. Redeploy

### 7.2 Resend Email Configuration

When using custom domain, configure SPF/DKIM:

1. Log in to Resend: https://resend.com
2. Go to **Domains**
3. Add your domain
4. Follow setup wizard to add DNS records
5. Wait for verification (usually 10-15 minutes)

---

## Troubleshooting

### Build Fails

**Error:** Build fails on Vercel but works locally

**Solution:**
1. Check Vercel build logs: **Deployments** → Click failed build → **Logs**
2. Ensure all environment variables are set
3. Check that no `node_modules` or `.git` conflicts
4. Run `git push HEAD --force` and redeploy

### Database Connection Error

**Error:** `DATABASE_URL is not set`

**Solution:**
1. Go to **Project Settings** → **Environment Variables**
2. Verify `DATABASE_URL` is set correctly
3. Verify it's set for **Production** environment
4. Redeploy

### Email Not Sending

**Error:** Contact form doesn't send email

**Solution:**
1. Verify `RESEND_API_KEY` is set in environment variables
2. Verify it's a valid API key from Resend (starts with `re_`)
3. Check Resend account isn't rate-limited
4. Test with Resend dashboard to confirm API key works

### Custom Domain Issues

**Error:** Domain points to old deployment

**Solution:**
1. Remove domain from Vercel
2. Wait 5 minutes
3. Update DNS records
4. Re-add domain to Vercel
5. Wait 10-15 minutes for propagation

---

## Production Checklist

After deployment, verify:

- [ ] Website loads over HTTPS
- [ ] Homepage displays with correct styling
- [ ] Products show with images and prices
- [ ] Product filters work
- [ ] Contact form submits without errors
- [ ] Contact emails are received
- [ ] Download links work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Google Analytics tracking works (if configured)
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`

---

## Monitoring After Launch

### Set Up Error Tracking

In Vercel Dashboard:
1. Go to **Project Settings** → **Integrations**
2. Add error tracking service (Sentry is recommended)
3. Follow setup instructions

### Monitor Performance

1. Vercel Analytics: **Project** → **Analytics**
   - Check page load times
   - Monitor error rates
   - Track user activity

2. Google Analytics (if configured):
   - https://analytics.google.com
   - Check traffic sources
   - Monitor user behavior
   - Track conversions

### View Logs

For API issues:
1. **Deployments** → Click deployment
2. **Functions Logs** → View API call logs
3. Look for errors or slow responses

---

## Rollback Plan

If something goes wrong:

### Option 1: Redeploy Previous Version
1. Go to **Deployments**
2. Find previous working deployment
3. Click **3-dot menu** → **Promote to Production**

### Option 2: Deploy from Specific Commit
1. Go to **Deployments**
2. Click **"View in GitHub"**
3. Checkout previous commit: `git checkout <commit-hash>`
4. Push to git
5. Vercel auto-deploys (or click Redeploy)

---

## Scaling & Performance

### If Traffic Is High

Vercel automatically scales, but you can:

1. Enable **Edge Caching** in Vercel (paid plans)
2. Optimize images further
3. Add CDN (Vercel includes free CDN)
4. Consider upgrading Vercel plan if needed

### Monitor Database

SQLite works for small to medium sites. If you exceed limits:

1. Migrate to PostgreSQL (via Vercel Postgres)
2. Upgrade Vercel plan
3. Consider separate database service

---

## Keep Updated

### Regular Maintenance

Every week:
- [ ] Check Vercel analytics
- [ ] Look for error patterns
- [ ] Monitor email delivery

Every month:
- [ ] Update dependencies: `npm update`
- [ ] Review Google Analytics insights
- [ ] Test core functionality
- [ ] Backup database

Every quarter:
- [ ] Security audit
- [ ] Performance review
- [ ] Plan feature updates
- [ ] Review user feedback

---

## Need Help?

### Resources
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Resend Docs: https://resend.com/docs
- Prisma Docs: https://www.prisma.io/docs

### Contact Support
- Vercel Support: https://vercel.com/support
- Resend Support: https://resend.com/support

---

## Success! 🎉

Your Lumeza website is now live on the internet!

**Next Steps:**
1. Share your domain with friends and family
2. Monitor analytics for the first few days
3. Collect user feedback
4. Plan feature improvements
5. Consider adding authentication and payment processing (see PUBLIC-LAUNCH-ACTION-PLAN.md)

---

*Last Updated: March 8, 2026*
