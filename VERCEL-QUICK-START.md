# 🚀 VERCEL REDEPLOY - QUICK START (5 MENIT)

**⏱️ Waktu estimasi**: 5 menit  
**🎯 Target**: https://lumeza-website.vercel.app  

---

## ✅ Checklist Cepat (Baca dulu!)

Pastikan SEMUA ini sudah done:

- [x] Repository: https://github.com/layanandesapahesan-cyber/lumeza-website
- [x] Commit terakhir: 1140cbc (TypeScript fix)
- [x] TypeScript check locally: `npx tsc --noEmit` → 0 errors ✅
- [x] Build test locally: `npm run build` → SUCCESS ✅
- [x] Kode sudah push ke GitHub main branch

---

## 🔥 LANGKAH 1: Jalankan Script Otomatis (2 menit)

```powershell
cd C:\Users\Meiliastudio\lumeza-website
.\redeploy-vercel.ps1
```

**Script akan melakukan:**
- ✅ Cek git status
- ✅ Push code ke GitHub (jika ada changes)
- ✅ Verifikasi TypeScript
- ✅ Tampilkan env vars checklist
- ✅ Buka Vercel dashboard otomatis

---

## 🌐 LANGKAH 2: Set Environment Variables (2 menit)

Ketika script buka https://vercel.com/layanandesapahesan-cyber/lumeza-website:

### 1️⃣ Klik **Settings** → **Environment Variables**

### 2️⃣ Tambahkan 7 Variables:

Copy-paste satu per satu:

#### Variable 1: DATABASE_URL
```
Key   : DATABASE_URL
Value : file:./prisma/dev.db
```
Pilih: ✅ Production, ✅ Preview, ✅ Development → **Save**

#### Variable 2: RESEND_API_KEY ⚠️ PENTING!
```
Key   : RESEND_API_KEY
Value : re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Ambil dari https://resend.com/api-keys)  
Pilih: ✅ Production → **Save**

#### Variable 3: NEXT_PUBLIC_FROM_EMAIL
```
Key   : NEXT_PUBLIC_FROM_EMAIL
Value : noreply@lumeza.com
```
Pilih: ✅ Production, ✅ Preview, ✅ Development → **Save**

#### Variable 4: NEXT_PUBLIC_BASE_URL
```
Key   : NEXT_PUBLIC_BASE_URL
Value : https://lumeza-website.vercel.app
```
Pilih: ✅ Production, ✅ Preview → **Save**

#### Variable 5: NEXT_PUBLIC_API_URL
```
Key   : NEXT_PUBLIC_API_URL
Value : https://lumeza-website.vercel.app/api
```
Pilih: ✅ Production, ✅ Preview → **Save**

#### Variable 6: NEXT_PUBLIC_CONTACT_EMAIL
```
Key   : NEXT_PUBLIC_CONTACT_EMAIL
Value : hello@lumeza.com
```
Pilih: ✅ Production, ✅ Preview, ✅ Development → **Save**

#### Variable 7: CONTACT_FORM_RECIPIENT_EMAIL
```
Key   : CONTACT_FORM_RECIPIENT_EMAIL
Value : hello@lumeza.com
```
Pilih: ✅ Production, ✅ Preview, ✅ Development → **Save**

✅ **Selesai set semua 7 variables!**

---

## ⚡ LANGKAH 3: Redeploy (1 menit)

Masih di Vercel dashboard:

1. **Klik tab `Deployments`**

2. **Cari deployment terakhir** (di paling atas)

3. **Klik ... (tiga titik)** di sebelah deployment

4. **Pilih `Redeploy`**

5. **Pop-up muncul:**
   - ❌ Uncheck: "Use existing Build Cache"
   - ✅ Click: "Redeploy"

**Tunggu build selesai** (2-5 menit):
```
🔵 Queued   → Menunggu...
🔵 Building → Lagi build...
🟢 Ready    → BERHASIL! ✨
```

---

## ✅ VERIFIKASI WEBSITE LIVE (1 menit)

Ketika status jadi 🟢 **Ready**:

### Test 1: Homepage
```
Open: https://lumeza-website.vercel.app
Expect: Page loads, no error
```

### Test 2: API
```powershell
Invoke-WebRequest -Uri "https://lumeza-website.vercel.app/api/diag" |`
Select-Object -ExpandProperty Content
# Should show: database connection status
```

### Test 3: Produk
```
Open: https://lumeza-website.vercel.app/produk
Expect: Product list shows
```

---

## ❌ Jika Ada Error?

### Error: "Build failed"
1. Buka Vercel Deployments tab
2. Klik deployment yang failed
3. Lihat error message
4. Refer to: `VERCEL-TROUBLESHOOTING.md`

### Error: 404 Not Found
- Tunggu 2-3 menit (DNS propagation)
- Refresh page
- Hard refresh: Ctrl+Shift+R

### Error: Database/API
- Verify semua 7 env vars sudah set
- Check DATABASE_URL di env vars

### Masih error?

Run troubleshooting lengkap:
```powershell
# 1. Check git
git status
git log -1

# 2. Check build again
npm run build

# 3. Check TypeScript
npx tsc --noEmit

# 4. Read docs
cat VERCEL-TROUBLESHOOTING.md
```

---

## 🎯 SUCCESS INDICATORS

Ketika semua ini true = ✅ **BERHASIL**:

- [x] Vercel dashboard: Status 🟢 Ready
- [x] https://lumeza-website.vercel.app → loads (HTTP 200)
- [x] /api/diag → returns JSON
- [x] /produk → shows products
- [x] No error di browser console
- [x] Contact form visible
- [x] Images load correctly

---

## 📊 Reference

| Something | Status |
|-----------|--------|
| Code | ✅ TypeScript: 0 errors |
| Build | ✅ Local build: SUCCESS |
| Git | ✅ All pushed |
| Vercel | 🟢 Ready to deploy |
| Env Vars | ⚠️ Need to set (Step 2) |
| Website | 🔄 Deploying (Step 3) |

---

## 💡 Pro Tips

### Tip 1: Monitor Build Real-Time
```
Buka Vercel Deployments tab di browser
Refresh setiap 10 detik untuk lihat progress
```

### Tip 2: Share Deployment Link
```
Setelah 🟢 Ready:
Bagikan: https://lumeza-website.vercel.app
```

### Tip 3: View Build Logs
```
Click deployment → Klik "View Function Logs"
Useful untuk debug jika ada error
```

### Tip 4: Rollback Jika Perlu
```
Klik deployment sebelumnya → Click "Redeploy"
Instant rollback ke versi sebelumnya
```

---

## 🎉 Selesai!

Total waktu: **~5 menit**

✨ Website Anda sekarang LIVE di:
### https://lumeza-website.vercel.app

---

## 📞 Need Help?

- **Env vars error**: Lihat step 2 di atas
- **Build error**: Buka `VERCEL-TROUBLESHOOTING.md`
- **Full checklist**: Lihat `VERCEL-PRELAUNCH-CHECKLIST.md`
- **Automation script**: Run `.\redeploy-vercel.ps1`

Happy deployment! 🚀
