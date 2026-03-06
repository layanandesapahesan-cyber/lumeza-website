# 📧 Email Service Setup (Resend)

## Setup Resend untuk Email Download Links

### 1. Daftar Akun Resend
1. Kunjungi [resend.com](https://resend.com)
2. Daftar akun baru (gratis untuk 3,000 email/bulan)
3. Verifikasi email Anda

### 2. Dapatkan API Key
1. Login ke dashboard Resend
2. Pergi ke **API Keys** section
3. Klik **Create API Key**
4. Beri nama (contoh: "Lumeza Download Links")
5. Copy API key yang dihasilkan

### 3. Konfigurasi Environment Variables
Update file `.env.local` dengan API key Anda:

```env
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Verifikasi Domain (Production)
Untuk production, Anda perlu verifikasi domain:

1. Di dashboard Resend, pergi ke **Domains**
2. Klik **Add Domain**
3. Masukkan domain Anda (contoh: lumeza.com)
4. Ikuti instruksi untuk verifikasi DNS records
5. Setelah terverifikasi, update `NEXT_PUBLIC_FROM_EMAIL` ke `noreply@yourdomain.com`

### 5. Test Email Service
1. Jalankan development server: `npm run dev`
2. Kunjungi: `http://localhost:3000/test-email`
3. Masukkan email Anda dan klik "Kirim Email Test"
4. Cek inbox email Anda untuk link download

## 📧 Template Email

Email download menggunakan template HTML yang responsive dengan:
- ✅ Design modern dan profesional
- ✅ Link download yang jelas
- ✅ Informasi expiration (24 jam)
- ✅ Instruksi penggunaan
- ✅ Branding Lumeza Creative Studio

## 🔧 Troubleshooting

### Email Tidak Terkirim
1. **Cek API Key**: Pastikan `RESEND_API_KEY` benar
2. **Cek Console**: Lihat error di terminal development server
3. **Cek Quota**: Pastikan belum melebihi limit 3,000 email/bulan

### Link Download Tidak Bekerja
1. **Cek BASE_URL**: Pastikan `NEXT_PUBLIC_BASE_URL` sesuai environment
2. **Cek Token**: Token download mungkin sudah expired (24 jam)
3. **Cek Database**: Pastikan download record tersimpan

### Email Masuk ke Spam
1. **Verifikasi Domain**: Setup domain verification di Resend
2. **Content**: Pastikan email content tidak terlalu promotional
3. **Rate Limiting**: Jangan kirim email terlalu banyak sekaligus

## 📊 Monitoring

Monitor email delivery di dashboard Resend:
- **Sent**: Email berhasil dikirim
- **Delivered**: Email sampai ke inbox
- **Opened**: Email dibuka user
- **Clicked**: Link diklik user

## 🚀 Production Deployment

Sebelum deploy ke production:

1. ✅ Setup domain verification
2. ✅ Update `NEXT_PUBLIC_BASE_URL` ke domain production
3. ✅ Update `NEXT_PUBLIC_FROM_EMAIL` ke email domain Anda
4. ✅ Test email service di production
5. ✅ Monitor email metrics

## 💡 Tips

- **Rate Limiting**: Resend punya limit 10 email/detik
- **Bounce Handling**: Monitor email yang bounce
- **Analytics**: Gunakan Resend analytics untuk tracking
- **Backup**: Selalu ada fallback jika email service down