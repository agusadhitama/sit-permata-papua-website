# 🕌 SIT Permata Papua - Website Sekolah

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vanilla](https://img.shields.io/badge/Vanilla_JS-No_Framework-green?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-1B6B3A?style=for-the-badge)](https://agusadhitama.github.io/sit-permata-papua-website)

**Website resmi Sekolah Islam Terpadu Permata Papua, Timika, Papua Tengah**

*Memadukan keunggulan akademis, pendidikan karakter Islami, dan kekayaan budaya Papua.*

</div>

---

## 📸 Preview

| Beranda | Pendaftaran | Galeri | Portal Nilai |
|---------|-------------|--------|--------------|
| Hero section + Program + Berita | Multi-step form 4 langkah | Masonry grid + Lightbox | Login + Dashboard raport |

---

## ✨ Fitur Utama

### 🏠 Beranda
- Hero section dengan animasi pulse dan statistik sekolah
- Ticker berita berjalan (animasi CSS)
- Grid 6 program unggulan (Tahfizh, Sains, Seni Papua, Teknologi, Olahraga, Karakter)
- Section berita terkini dengan layout asimetris
- Empat Pilar nilai sekolah (Iman, Ilmu, Akhlak, Kebangsaan)
- Footer lengkap dengan kontak dan navigasi

### 📋 Pendaftaran Online
- Form multi-step 4 tahap dengan progress indicator
  - **Step 1** Data siswa (nama, TTL, jenis kelamin, jenjang SD/SMP)
  - **Step 2** Data orang tua/wali (nama, kontak, alamat)
  - **Step 3** Upload dokumen (drag & drop + validasi)
  - **Step 4** Review semua data sebelum submit
- Validasi input per step sebelum lanjut
- Halaman sukses dengan nomor registrasi otomatis

### 🖼️ Galeri Kegiatan
- 12 item dokumentasi kegiatan sekolah
- Layout masonry responsif (3 kolom → 2 → 1)
- Filter by kategori: Prestasi, Kegiatan Islami, Seni Budaya, Akademik, Olahraga
- Lightbox detail saat foto diklik
- Animasi hover overlay dengan judul & kategori
- Tutup lightbox dengan tombol atau tekan `Escape`

### 🎓 Portal Nilai Siswa
- Login dengan NIS + password
- Dashboard dengan 4 kartu ringkasan:
  - Rata-rata nilai, Peringkat kelas, Kehadiran, Hafalan Al-Qur'an
- Tabel raport lengkap per mata pelajaran dengan predikat warna
- Switch Semester 1 ↔ Semester 2
- Progress bar performa per bidang studi
- Grid progress hafalan surah (status: hafal / sedang hafal / belum)

### 🎨 UI / UX
- **Custom cursor** titik emas + cincin hijau animasi
- **Toast notifikasi** muncul di sudut kanan bawah
- **Scroll reveal** elemen muncul saat di-scroll
- **Ticker berjalan** info terbaru bergerak otomatis
- **SPA (Single Page Application)** navigasi tanpa reload
- **Fully responsive** mobile, tablet, desktop
- **Custom scrollbar** styling

---

## 🗂️ Struktur File

```
sit-permata-papua/
│
├── index.html      # Semua halaman (SPA) Beranda, Daftar, Galeri, Portal
├── style.css       # Semua styling (1.382 baris)
├── script.js       # Logika navigasi, form, galeri, portal (464 baris)
└── README.md       # Dokumentasi ini
```

---

## 🌐 Live Demo

> **[https://agusadhitama.github.io/sit-permata-papua-website](https://agusadhitama.github.io/sit-permata-papua-website)**

---

## 🚀 Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/agusadhitama/sit-permata-papua-website.git
cd sit-permata-papua-website
```

### 2. Buka langsung di browser

Karena project ini murni HTML/CSS/JS tanpa dependency, cukup buka:

```
index.html → klik dua kali di file explorer
```

Atau gunakan Live Server di VS Code:

```
1. Install ekstensi "Live Server" di VS Code
2. Klik kanan index.html → "Open with Live Server"
```

> ⚠️ Pastikan ketiga file (`index.html`, `style.css`, `script.js`) berada **dalam satu folder yang sama**.

---

## 🔐 Akun Demo Portal Siswa

| NIS | Password | Nama | Kelas |
|-----|----------|------|-------|
| `2024001` | `permata2024` | Agus Satria Adhitama | Kelas 9A SMP |
| `2024002` | `papua123` | Siti Rahmawati Abubakar | Kelas 7B SMP |

---

## 🛠️ Teknologi

| Teknologi | Keterangan |
|-----------|------------|
| **HTML5** | Struktur halaman & SPA routing |
| **CSS3** | Animasi, layout grid/flexbox, custom properties |
| **Vanilla JavaScript** | Navigasi, form logic, galeri, portal |
| **Google Fonts** | Playfair Display + Plus Jakarta Sans |
| **IntersectionObserver API** | Scroll reveal animation |

Tidak ada framework, tidak ada library eksternal **100% Vanilla Web**.

---

## 🎨 Palet Warna

| Nama | Hex | Keterangan |
|------|-----|------------|
| Hijau Islam | `#1B6B3A` | Warna utama - identitas Islami |
| Hijau Mid | `#2D9C57` | Aksen tombol & hover |
| Emas | `#C9951A` | Aksen premium -  keunggulan |
| Emas Muda | `#F0C040` | Highlight & teks aksen |
| Merah Papua | `#C0392B` | Identitas Papua |
| Gelap | `#111C14` | Background dark sections |
| Krem | `#FDF6E9` | Background utama |

---

## 📱 Responsif

| Breakpoint | Layout |
|------------|--------|
| `> 900px` | Full desktop 3 kolom, semua fitur tampil |
| `≤ 900px` | Tablet 2 kolom, navbar tersembunyi |
| `≤ 560px` | Mobile 1 kolom, layout stacked |

---

## 📄 Halaman & Navigasi

```
index.html
│
├── #home      → Beranda
├── #daftar    → Pendaftaran Online
├── #galeri    → Galeri Kegiatan
└── #portal    → Portal Nilai Siswa
```

Navigasi antar halaman menggunakan sistem SPA sederhana dengan `data-page` attribute - tanpa reload browser.

---

## 🙏 Tentang Sekolah

**Sekolah Islam Terpadu Permata Papua** berdiri di Timika, Kabupaten Mimika, Papua Tengah. Sekolah ini menyelenggarakan jenjang **SD dan SMP** dengan kurikulum terintegrasi yang memadukan:

- Kurikulum nasional Kemendikbud
- Program Tahfizh Al-Qur'an
- Pendidikan karakter berbasis nilai-nilai Islam
- Pelestarian seni dan budaya lokal Papua

---

## 👨‍💻 Developer

Dibuat dengan ❤️ oleh alumni SIT Permata Papua yang bangga lahir dan besar di Timika, Papua.

---

<div align="center">

**🕌 SIT Permata Papua · Timika, Papua Tengah · Indonesia 🇮🇩**

*"Mendidik generasi Islami yang cerdas, berkarakter, dan bangga menjadi bagian dari Bumi Papua."*

</div>
