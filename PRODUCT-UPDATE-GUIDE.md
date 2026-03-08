# 🛠️ Panduan Update Produk Lumeza Website

## 📋 Daftar Script yang Tersedia

### 1. `update-product.js` - Update Produk Tunggal
Script sederhana untuk update satu produk berdasarkan slug.

### 2. `update-products.js` - Update Produk Advanced
Script lengkap dengan berbagai fitur update.

### 3. `add-product.js` - Tambah Produk Baru
Script untuk menambah produk baru ke database.

---

## 🚀 Cara Menggunakan Script Update

### A. Update Produk Tunggal

```bash
# Syntax
node update-product.js <slug>

# Contoh
node update-product.js business-line-icons
```

**Script ini akan:**
- Menampilkan data produk saat ini
- Update views dan downloads secara random
- Menampilkan hasil update

---

### B. Update Produk Advanced

```bash
# 1. Lihat semua produk
node update-products.js list

# 2. Update produk spesifik
node update-products.js update <slug> [field1=value1] [field2=value2]

# 3. Update massal berdasarkan tipe
node update-products.js bulk-update <type> <field> <value>

# 4. Tambah views ke produk
node update-products.js add-views <slug> <count>
```

#### Contoh Penggunaan:

```bash
# Lihat semua produk
node update-products.js list

# Update nama dan harga produk
node update-products.js update business-line-icons name="Business Icons Pro" price=199000

# Update harga semua icon menjadi 199rb
node update-products.js bulk-update icon price 199000

# Tambah 50 views ke produk tertentu
node update-products.js add-views business-line-icons 50
```

---

### C. Tambah Produk Baru

```bash
# Edit file add-product.js terlebih dahulu
# Ubah data di object newProduct

# Kemudian jalankan
node add-product.js
```

---

## 📝 Field yang Bisa Diupdate

| Field | Tipe | Contoh |
|-------|------|--------|
| `name` | string | `"New Product Name"` |
| `description` | string | `"Product description..."` |
| `price` | number | `199000` |
| `salePrice` | number/null | `149000` atau `null` |
| `images` | JSON string | `'["url1.jpg","url2.jpg"]'` |
| `fileUrl` | string | `"https://download.com/file.zip"` |
| `tags` | JSON string | `'["tag1","tag2"]'` |
| `downloads` | number | `1234` |
| `views` | number | `5678` |

---

## 🎯 Contoh Update Lengkap

### Update Nama dan Deskripsi:
```bash
node update-products.js update business-line-icons \
  name="Premium Business Icons Pack" \
  description="High-quality business icons for professional use"
```

### Update Harga dengan Diskon:
```bash
node update-products.js update social-media-line-icons \
  price=159000 \
  salePrice=119000
```

### Update Gambar Produk:
```bash
node update-products.js update weather-line-icons \
  images='["https://new-image.com/1.jpg","https://new-image.com/2.jpg"]'
```

### Tambah Views (Simulasi Popularitas):
```bash
node update-products.js add-views ui-glyph-icons 250
```

---

## 🔍 Cara Cek Produk Saat Ini

### Menggunakan Script:
```bash
node check-products.js
```

### Menggunakan Prisma Studio:
```bash
npx prisma studio
```
Buka browser ke `http://localhost:5555`

---

## ⚠️ Tips Penting

1. **Backup Database** sebelum update besar:
   ```bash
   cp prisma/dev.db prisma/dev.db.backup
   ```

2. **Slug harus unik** - pastikan slug belum digunakan produk lain

3. **Harga dalam Rupiah** - tanpa titik atau koma (149000 = Rp149.000)

4. **JSON Fields** - gunakan format string untuk `images` dan `tags`:
   ```javascript
   images: '["url1.jpg","url2.jpg"]'
   tags: '["business","professional"]'
   ```

5. **Test di Local** dulu sebelum deploy ke production

---

## 🚀 Deploy Update ke Vercel

Setelah update produk:

1. **Commit perubahan:**
   ```bash
   git add .
   git commit -m "Update product data: [nama produk]"
   git push
   ```

2. **Vercel akan auto-deploy**

3. **Cek website live** untuk memastikan update berhasil

---

## 📞 Butuh Bantuan?

Jika ada kesulitan:
1. Cek error message di terminal
2. Pastikan database connection OK
3. Verify slug produk ada di database
4. Cek format data sesuai tipe field

**Happy updating! 🎉**