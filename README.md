# Web Desa Ciputat 🌾

Website Company Profile terintegrasi dengan CMS (Admin Panel) untuk Desa Ciputat. Website ini dikembangkan untuk memberikan informasi terkait berita desa, potensi UMKM, galeri kegiatan, serta profil pemerintahan desa.

## 🚀 Fitur Utama
- **Landing Page Modern**: Menampilkan profil desa, statistik penduduk, sambutan kepala desa, dan potensi unggulan.
- **Berita Desa**: Sistem manajemen artikel untuk mempublikasikan kegiatan dan pengumuman desa.
- **Katalog UMKM**: Direktori produk dan layanan unggulan masyarakat desa.
- **Galeri Kegiatan**: Album visual untuk dokumentasi pemerintahan dan kegiatan desa.
- **Admin Panel (CMS)**: Halaman khusus Admin untuk mengelola (CRUD - Create, Read, Update, Delete) Berita, UMKM, dan Galeri tanpa perlu menyentuh kode.

## 🛠️ Teknologi yang Digunakan
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Ikon:** [Lucide React](https://lucide.dev/)
- **Animasi Notifikasi:** [SweetAlert2](https://sweetalert2.github.io/)
- **Penyimpanan Gambar:** [Cloudinary](https://cloudinary.com/) (Gratis, dikelola melalui API Upload)
- **Penyimpanan Data (Lokal):** File `.json` (`news.json`, `umkm.json`, `gallery.json`) yang dimanipulasi melalui *Next.js API Routes*.

## 📂 Struktur Proyek
- `src/app/`: Berisi semua halaman publik (Beranda, Berita, UMKM, Galeri).
- `src/app/admin/`: Berisi semua halaman Dashboard Admin (Sistem Login, Tabel Data, Form CRUD).
- `src/app/api/`: Endpoint jalur belakang untuk memanipulasi file `.json`.
- `src/data/`: Tempat penyimpanan database lokal berbasis JSON.
- `src/components/`: Kumpulan komponen UI yang dapat digunakan berulang (Cards, Navbar, Footer, dll).

## ⚙️ Panduan Menjalankan di Komputer (Local)

1. **Pastikan Node.js sudah terinstal** (Minimal versi 18+).
2. **Buka terminal** di dalam folder proyek ini.
3. Jalankan perintah instalasi modul (jika belum):
   ```bash
   npm install
   ```
4. Jalankan *server* dalam mode pengembangan:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` di *browser* Anda untuk melihat website pengunjung.
6. Buka `http://localhost:3000/admin` untuk mengakses Panel Admin.
   *(Gunakan kredensial Firebase yang telah didaftarkan untuk masuk ke Admin).*

## ⚠️ Peringatan Penting Saat Melakukan Update Konten (BACA SEBELUM DEPLOY)

Website ini menggunakan sistem penyimpanan **JSON API Lokal**. Artinya, setiap kali Anda menambah, mengedit, atau menghapus Berita/UMKM/Galeri dari Panel Admin, sistem akan langsung menulis ulang file `news.json`, `umkm.json`, atau `gallery.json` di dalam folder proyek komputer Anda.

**ATURAN KERJA:**
1. **Selalu masukkan konten melalui komputer lokal Anda** (saat menjalankan `npm run dev`).
2. Jangan pernah mencoba menambah konten (berita/galeri) melalui halaman Admin saat website sudah *online* (misalnya setelah di-upload ke Vercel). Server seperti Vercel bersifat **Read-Only (Tidak bisa menyimpan file)**. Tambahan data Anda tidak akan tersimpan secara permanen jika dilakukan di web Vercel.
3. **Alur Kerja Pembaruan Konten:**
   - Tambah/Edit/Hapus data melalui `http://localhost:3000/admin` di komputer lokal Anda.
   - Cek hasil tampilannya di *browser* komputer Anda.
   - Jika sudah rapi, simpan kodenya ke GitHub (`git add .`, `git commit`, `git push`).
   - Vercel akan secara otomatis menarik pembaruan file `.json` tersebut dan memperbarui konten website yang sedang *online*.

## 👥 Pengembang
Dikembangkan sebagai program kerja pengabdian (KKN).
