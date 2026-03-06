# 🔧 VERCEL DEPLOYMENT FIX GUIDE

**Status**: Error "nodeVersion invalid" saat deployment  
**Solusi**: Hapus properti nodeVersion dari vercel.json  
**Date**: March 6, 2026

---

## ❌ MASALAH

```
Invalid request: should NOT have additional property nodeVersion. 
Please remove it.
```

**Penyebab**: File vercel.json memiliki properti `nodeVersion` yang tidak dikenali Vercel.

---

## ✅ SOLUSI

### OPSI 1: OTOMATIS (Recommended) ⚡

Run script yang sudah saya buat:

```powershell
cd C:\Users\Meiliastudio\lumeza-website
.\fix-vercel-config.ps1
```

Script akan:
- ✅ Backup file vercel.json asli
- ✅ Hapus properti nodeVersion
- ✅ Validasi JSON
- ✅ Prompt untuk commit & push otomatis

---

### OPSI 2: MANUAL

**Step 1: Edit vercel.json**
```powershell
# Open in VS Code atau text editor
code vercel.json
```

**Step 2: Cari dan hapus baris ini:**
```json
"nodeVersion": "18.x",
```

**Sebelum**:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "nodeVersion": "18.x",  << HAPUS BARIS INI
  "env": { ... }
}
```

**Sesudah**:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": { ... }
}
```

**Step 3: Save & Close**

---

## 📤 COMMIT & PUSH

Setelah fix vercel.json:

```powershell
# Check status
git status

# Stage the change
git add vercel.json

# Commit
git commit -m "Fix: remove invalid nodeVersion from vercel.json"

# Push to GitHub
git push origin main
```

Expected output:
```
To https://github.com/layanandesapahesan-cyber/lumeza-website.git
   1140cbc..abcd123  main -> main
```

---

## 🚀 REDEPLOY DI VERCEL

Setelah push ke GitHub:

1. **Buka Vercel Dashboard**:
   ```
   https://vercel.com/layanandesapahesan-cyber/lumeza-website
   ```

2. **Klik**: Deployments tab

3. **Tunggu**: Vercel akan auto-detect push dan mulai build

   **Atau** trigger manual:
   - Klik: ... (tiga titik) pada latest deployment
   - Pilih: Redeploy
   - Uncheck: "Use existing Build Cache"
   - Klik: Redeploy

4. **Monitor**: Status akan berubah dari Queued → Building → Ready (2-5 menit)

5. **Verify**: Ketika hijau (Ready), visit https://lumeza-website.vercel.app

---

## ✔️ VERIFIKASI SUKSES

Deployment berhasil ketika:

- ✅ Status di Vercel: **🟢 Ready** (hijau)
- ✅ https://lumeza-website.vercel.app → loads (HTTP 200)
- ✅ /api/products → returns JSON
- ✅ /api/diag → shows database status
- ✅ No error di browser console

---

## 🛠️ VERCEL.JSON YANG BENAR

File vercel.json yang valid untuk Next.js (TANPA nodeVersion):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@DATABASE_URL",
    "RESEND_API_KEY": "@RESEND_API_KEY",
    "NEXT_PUBLIC_FROM_EMAIL": "@NEXT_PUBLIC_FROM_EMAIL",
    "NEXT_PUBLIC_BASE_URL": "@NEXT_PUBLIC_BASE_URL",
    "NEXT_PUBLIC_API_URL": "@NEXT_PUBLIC_API_URL",
    "NEXT_PUBLIC_GA_ID": "@NEXT_PUBLIC_GA_ID",
    "NEXT_PUBLIC_CONTACT_EMAIL": "@NEXT_PUBLIC_CONTACT_EMAIL"
  },
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "regions": ["sin1"],
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "outputDirectory": ".next",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=10, stale-while-revalidate=59"
        }
      ]
    }
  ]
}
```

**Key Points**:
- ❌ NO `nodeVersion` property
- ✅ All other configs intact
- ✅ Valid JSON format
- ✅ Next.js framework specified

---

## ⚠️ TROUBLESHOOTING

### Error: "JSON parsing error"
- Check file has valid closing brace `}`
- Remove trailing commas before `}`
- Use JSON validator: https://jsonlint.com

### Error: "DATABASE_URL not found"
- Verify env variables set in Vercel Settings
- All 7 variables must be configured
- See: VERCEL-QUICK-START.md

### Build still fails after fix
1. Check Vercel build logs (Deployments tab)
2. Run local build test: `npm run build`
3. Check TypeScript: `npx tsc --noEmit`
4. See: VERCEL-TROUBLESHOOTING.md

---

## 📋 ENVIRONMENT VARIABLES REQUIRED

These 7 variables MUST be in Vercel Settings:

```
1. DATABASE_URL = file:./prisma/dev.db
2. RESEND_API_KEY = re_xxxxx (from https://resend.com)
3. NEXT_PUBLIC_FROM_EMAIL = noreply@lumeza.com
4. NEXT_PUBLIC_BASE_URL = https://lumeza-website.vercel.app
5. NEXT_PUBLIC_API_URL = https://lumeza-website.vercel.app/api
6. NEXT_PUBLIC_CONTACT_EMAIL = hello@lumeza.com
7. NEXT_PUBLIC_GA_ID = (optional)
```

**Add them** in Vercel Settings → Environment Variables

---

## 🎯 QUICK DEPLOY PROCESS

```powershell
# 1. Run fix script
.\fix-vercel-config.ps1

# 2. When prompted, answer 'y' to commit & push
# Script handles it automatically

# 3. Wait 30 seconds for webhook to trigger
# Vercel auto-detects push

# 4. Visit dashboard
start https://vercel.com/layanandesapahesan-cyber/lumeza-website

# 5. Monitor build (2-5 minutes)
# Status: Queued → Building → Ready

# 6. Test website
start https://lumeza-website.vercel.app
```

---

## ✨ SUCCESS!

Once deployment is 🟢 **Ready**, your website is live! 🎉

- Frontend: https://lumeza-website.vercel.app
- API: https://lumeza-website.vercel.app/api
- Diagnostics: https://lumeza-website.vercel.app/api/diag

**Next steps**:
- Test all pages
- Check API endpoints
- Test contact form
- Monitor error logs

---

**Need help?** Check:
- VERCEL-QUICK-START.md (deployment guide)
- VERCEL-TROUBLESHOOTING.md (common errors)
- VERCEL-PRELAUNCH-CHECKLIST.md (full verification)
