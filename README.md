# 🐼 Taman Petualangan Ceria Cetta TK

Aplikasi Game Edukasi Interaktif PWA (Progressive Web App) untuk Anak Usia Dini (PAUD & TK). Dirancang khusus agar anak tidak mudah bosan dengan audio ramah anak, efek animasi interaktif, tombol 3D empuk (*squishy*), gelembung sabun interaktif, dan 10 wahana petualangan belajar lengkap!

---

## 🌟 Fitur Utama

1. **10 Wahana Petualangan Seru**:
   - 🅰️ **Taman Huruf A-Z**: Pengenalan huruf, fonik, dan nama benda.
   - 📖 **Istana Suku Kata (Metode SAS)**: Membaca suku kata bertahap dari level 1 hingga level 10.
   - 🔢 **Pasar Angka & Berhitung**: Belajar menghitung buah dan logika penambahan sederhana.
   - 🎨 **Pelangi Warna-Warni**: Mengenal warna dasar dan pencampuran warna.
   - 🔺 **Dunia Bentuk Ajaib**: Belajar lingkaran, segitiga, persegi, bintang, dan bentuk geometris lainnya.
   - 🦁 **Kebun Binatang Sahabat**: Tebak suara, ciri-ciri, dan habitat hewan.
   - 🍎 **Dapur Sehat (Makan Apa?)**: Memilah makanan sehat vs tidak sehat, sayur dan buah.
   - 🕌 **Taman Bintang Islam Ceria**: Rukun Islam, rukun iman, doa harian, dan adab anak sholeh.
   - 🚗 **Garasi Kendaraan Cilik**: Mengenal transportasi darat, laut, dan udara.
   - 🌤️ **Menara Langit & Alam**: Belajar cuaca, benda langit, dan siklus siang malam.

2. **⚔️ Arena Adu Pintar (VS Bot Kiko)**:
   - Mode duel turn-based 5 ronde melawan bot ceria (Kiko si Monyet).
   - Animasi HP bar, bintang perolehan, dan podium selebrasi juara.

3. **🎈 Anti-Boredom & Audio Interaktif**:
   - **Interactive Soap Bubbles**: Gelembung sabun beterbangan yang bisa dipecahkan dengan sentuhan jari kapan saja (*POP!*).
   - **Dual Audio Engine**: Menggabungkan SpeechSynthesis bahasa Indonesia dengan Web Audio API sintetis untuk efek bunyi pop, chimes, fanfar kemenangan, dan nada ceria.
   - **Anti-Frustrasi**: Tidak ada sistem hukuman yang menakutkan, jika keliru maskot memberi petunjuk ceria.

4. **📱 Progressive Web App (PWA) & Offline Mode**:
   - Berjalan langsung di peramban (Chrome, Safari, Edge) tanpa perlu install software berat.
   - Dapat di-install ke layar beranda (Home Screen) smartphone atau tablet Android & iOS seperti aplikasi native.
   - Dilengkapi **Service Worker (`sw.js`)** untuk menyimpan aset di perangkat sehingga bisa dimainkan **100% tanpa internet** (offline) setelah dibuka pertama kali.

---

## 🚀 Cara Menjalankan & Deploy

### A. Deploy ke Vercel (Gratis & Cepat dalam 1 Menit)
1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **"Add New..."** ➔ **"Project"**.
3. Pilih repositori **`solidkita-cloud/game-cetta-tk`** dari daftar GitHub Anda, lalu klik **"Import"**.
4. Biarkan pengaturan default (Framework Preset: *Other*, Root Directory: `./`).
5. Klik **"Deploy"**.
6. Dalam hitungan detik, game sudah aktif di URL publik (contoh: `https://game-cetta-tk.vercel.app`).

### B. Cara Install di HP / Tablet (PWA)
1. Buka link Vercel di Google Chrome (Android) atau Safari (iOS/iPad).
2. **Android**: Tekan tombol **"Pasang Aplikasi di HP"** di layar utama, atau klik menu titik tiga di pojok kanan atas Chrome ➔ pilih **"Tambahkan ke Layar Utama" / "Install app"**.
3. **iPhone / iPad**: Tekan tombol Share (ikon kotak panah ke atas) di Safari ➔ pilih **"Add to Home Screen"**.
4. Ikon **Pandi 🐼** akan muncul di layar HP Anda dan bisa dibuka kapan saja layaknya aplikasi dari Google Play Store / App Store!

---

## 📂 Struktur File

```
GAME CETTA TK/
├── index.html                  # Halaman utama game & viewport mobile/tablet
├── manifest.json               # Konfigurasi PWA (ikon, nama, warna tema)
├── sw.js                       # Service worker untuk offline caching
├── css/
│   ├── style.css               # Tampilan UI anak, grid wahana, modal
│   └── animations.css          # Animasi squish, bounce, confetti, gelembung
├── js/
│   ├── data.js                 # Database 560+ soal & materi edukasi
│   ├── audio.js                # Synthesizer Web Audio API & TTS Indonesia
│   ├── state.js                # State management, progress & bintang
│   ├── stages.js               # Logic permainan 10 wahana
│   ├── arena.js                # Logic arena vs Bot Kiko
│   └── app.js                  # Navigasi scene, popup, dan interaksi
└── icons/
    ├── icon-192.png            # PWA Icon 192x192
    └── icon-512.png            # PWA Icon 512x512
```

---

Dibuat dengan ❤️ untuk keceriaan dan pendidikan putra-putri tercinta!
