import Link from 'next/link'

export const metadata = {
  title: 'Terima Kasih | Lumeza Marketplace',
  description: 'Link download telah dikirim ke email Anda',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8 text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Download Link Terkirim!
          </h1>
          <p className="text-gray-600 text-lg">
            Cek email Anda untuk mendapatkan file
          </p>
        </div>

        {/* Email Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <span className="text-2xl mr-2">📧</span>
            <span className="font-semibold text-blue-900">Email Sudah Dikirim</span>
          </div>
          <p className="text-sm text-blue-800 mb-4">
            Link download aman dan siap digunakan. Pastikan untuk cek folder spam jika tidak menemukan email.
          </p>

          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-2">⏰ Link Berlaku:</h4>
            <p className="text-2xl font-bold text-blue-600">24 Jam</p>
            <p className="text-xs text-gray-600 mt-1">Dari sekarang</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
            <span className="text-lg mr-2">📋</span>
            Cara Menggunakan Link Download:
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              <span>Buka email dari <strong>Lumeza Creative Studio</strong></span>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              <span>Klik tombol <strong>"Download Sekarang"</strong></span>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <span>Simpan file ke komputer Anda</span>
            </div>
            <div className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
              <span>File siap digunakan!</span>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <span className="text-lg mr-2">🆘</span>
            <span className="font-semibold text-yellow-900">Butuh Bantuan?</span>
          </div>
          <p className="text-sm text-yellow-800">
            Jika tidak menerima email dalam 5 menit, hubungi{' '}
            <a href="mailto:support@lumeza.com" className="font-semibold underline">
              support@lumeza.com
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/produk"
            className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🛍️ Jelajahi Produk Lain
          </Link>

          <Link
            href="/"
            className="block w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition-colors"
          >
            🏠 Kembali ke Beranda
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-500">
          <p>© 2024 Lumeza Creative Studio</p>
          <p className="mt-1">Terima kasih telah memilih produk kami! 🚀</p>
        </div>
      </div>
    </div>
  )
}