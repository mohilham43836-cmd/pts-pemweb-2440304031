# UMKM Borneo Store Dashboard - Interactive Data Dashboard

## 1. Identitas Mahasiswa
* **Nama**: Moh Ilham
* **NIM**: 2440304031
* **Kelas**: Teknik Komputer 2026
* **Program Studi**: Teknik Komputer, Fakultas Teknik, Universitas Borneo Tarakan[cite: 1]

## 2. Nama Aplikasi dan Deskripsi Singkat
* **Nama Aplikasi**: UMKM Borneo Store Dashboard
* **Deskripsi**: Aplikasi *front-end* web interaktif berbasis REST API untuk mengelola, menganalisis, dan menampilkan direktori produk UMKM secara responsif. Dilengkapi dengan fitur pagination interaktif, form validasi data mitra, serta dukungan mode gelap (*Dark/Light Mode*) yang tersimpan secara lokal[cite: 2, 3, 4].

## 3. Perhitungan Variasi Soal Berdasarkan NIM
Tiga digit terakhir NIM **2440304031** adalah **031**:
* **$X = 0$** $\rightarrow$ Dataset: **Products** (Tema: Dashboard Produk / UMKM)[cite: 2]
* **$Y = 3$** $\rightarrow$ Fitur Utama: **Pagination + pilihan jumlah data per halaman**[cite: 3]
* **$Z = 1$** $\rightarrow$ Form & Validasi: **Email valid + konfirmasi email**[cite: 3]
* **Challenge ($C$)**: 
  * Rumus: $S = X + Y + Z \rightarrow 0 + 3 + 1 = 4$[cite: 3]
  * $C = S \text{ mod } 4 \rightarrow 4 \text{ mod } 4 = 0$[cite: 3]
  * Challenge: **Light/Dark Mode** (preferensi disimpan pada `localStorage`)[cite: 3]

## 4. Dataset / API yang Digunakan
* **Sumber API**: DummyJSON REST API[cite: 2]
* **Endpoint**: `https://dummyjson.com/products?limit=100`[cite: 2]

## 5. Fitur Utama dan Challenge
* **Analisis Data Otomatis**: Menghitung rata-rata harga produk, produk termahal, dan jumlah kategori secara dinamis menggunakan *JavaScript Array Methods*[cite: 5].
* **Pagination & Limit Control**: Membagi halaman data produk dan mengatur jumlah item yang tampil per halaman sesuai pilihan pengguna ($5, 10, 20$)[cite: 3].
* **Validasi Form Klien**: Memeriksa format penulisan email dan mencocokkan konfirmasi email secara *real-time* sebelum data dikirim[cite: 3].
* **Challenge (Light/Dark Mode)**: Tombol pengalih tema tampilan terang/gelap yang preferensinya disimpan menggunakan `localStorage`[cite: 3].

## 6. Cara Menjalankan Project
1. Pastikan perangkat Anda memiliki peramban web modern (Google Chrome, Edge, dll.).
2. Unduh atau *clone* repositori Git proyek ini.
3. Buka folder proyek melalui **Visual Studio Code**.
4. Jalankan file `index.html` menggunakan ekstensi **Live Server** atau buka langsung melalui browser Anda.
5. Pastikan perangkat terhubung ke internet agar data dari DummyJSON API dapat dimuat.

## 7. Screenshot Desktop dan Mobile
*(Letakkan file tangkapan layar antarmuka desktop dan mobile di dalam folder `assets/` dan tautkan di sini)*
* **Desktop View**: `assets/desktop-screenshot.png`
* **Mobile View**: `assets/mobile-screenshot.png`

## 8. Endpoint REST API
* `GET https://dummyjson.com/products?limit=100` — Mengambil keseluruhan data produk untuk kebutuhan render grid dan analisis statistik[cite: 2].

## 9. Jawaban 10 Pertanyaan Penjelasan Kode
1. **Alur data**: Halaman dibuka $\rightarrow$ pemanggilan fungsi `loadProducts()` $\rightarrow$ mengeksekusi `fetch()` ke server API $\rightarrow$ jika berhasil (`response.ok`), data diurai ke format JSON $\rightarrow$ fungsi `renderAnalytics()` dan `renderPaginatedProducts()` dijalankan untuk memanipulasi elemen DOM.
2. **`response.ok`**: Dibutuhkan karena fungsi `fetch()` hanya memicu blok `catch` pada kegagalan jaringan total. Jika server membalas dengan kode HTTP status error (seperti `404` atau `500`), proses fetch secara teknis dianggap berhasil, sehingga pengecekan `response.ok` memastikan kita dapat mendeteksi kesalahan HTTP tersebut[cite: 4].
3. **Mengubah JSON ke DOM**: Array objek produk diiterasi menggunakan metode perulangan `.forEach()`, lalu elemen HTML dibuat secara dinamis menggunakan `document.createElement('div')`, diisi dengan data teks/gambar dari properti JSON, dan disematkan ke dalam kontainer grid menggunakan `appendChild()`.
4. **Penanganan error**: Dikelola melalui blok `try...catch` serta pengecekan status jaringan, di mana pesan kegagalan yang ramah pengguna ditampilkan langsung pada elemen antarmuka `error-state`[cite: 4].
5. **Fitur NIM Y=3 (Pagination)**: Dikelola oleh fungsi `renderPaginatedProducts()` yang memotong data array menggunakan metode `.slice()` berdasarkan nomor halaman aktif serta batas jumlah item per halaman yang dipilih pada elemen `<select>`.
6. **Validasi NIM Z=1 (Email)**: Memeriksa keberadaan teks input, mencocokkan pola string dengan ekspresi regular (regex) email yang valid, serta membandingkan kesamaan nilai antara input email utama dan konfirmasi email sebelum form diizinkan berhasil diproses.
7. **`localStorage`**: Digunakan pada challenge untuk menyimpan status preferensi tema pengguna (`theme: dark` atau `theme: light`) sehingga pengaturan tetap bertahan meskipun halaman direfresh atau browser ditutup[cite: 3].
8. **Fungsi JavaScript Penting (Reduksi Harga)**:
   ```javascript
   const totalHarga = products.reduce((acc, curr) => acc + curr.price, 0);