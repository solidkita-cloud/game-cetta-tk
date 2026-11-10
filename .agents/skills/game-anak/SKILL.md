---
name: game-anak
description: Panduan merancang dan membangun game untuk anak-anak (usia prasekolah sampai SD) yang aman, mendidik, menyenangkan, dan ringan di perangkat Android kelas menengah ke bawah: desain ramah anak, mekanik permainan tanpa tekanan, privasi dan keselamatan anak, tanpa pola manipulatif, aksesibilitas, serta implementasi teknis (Rust dengan Bevy/macroquad, WASM, atau engine lain). Gunakan skill ini setiap kali pengguna menyebut game anak, game edukasi, permainan anak, aplikasi belajar anak, PAUD, TK, SD, mini game, game loop untuk anak, kontrol orang tua, atau ingin membuat game yang aman untuk anak, meskipun tidak menyebut kata "skill".
---

# Game Anak

Tujuan: game yang **aman, jelas, dan menyenangkan** bagi anak, serta tidak membuat orang tua khawatir. Anak bukan pengguna dewasa yang lebih kecil: kemampuan membaca, motorik, perhatian, dan daya tahan terhadap frustrasi berbeda, dan mereka tidak bisa menilai risiko seperti pembelian, iklan, atau orang asing.

Untuk bagian teknis (game loop, ECS, performa, state), rujuk `rust-sistem-desain-natural` (bagian D dan E). Untuk gaya visual, ikuti prinsip bagian A skill itu, dengan penyesuaian ramah anak di bawah.

---

## 1. Prinsip Utama

1. **Keselamatan anak di atas segalanya** (privasi, konten, interaksi, uang). Bila ada konflik dengan pendapatan atau metrik, keselamatan menang.
2. **Tanpa pola manipulatif.** Tidak ada hitung mundur yang menekan, hukuman karena tidak bermain, rasa bersalah ("karaktermu sedih"), kotak undian berbayar, atau tombol keluar yang disamarkan.
3. **Bermain tanpa tekanan.** Gagal berarti mencoba lagi, bukan kalah. Tidak ada layar "Game Over" yang menakutkan atau mengejek.
4. **Nilai yang jelas.** Tentukan satu atau dua tujuan belajar/perkembangan per game (misalnya mengenal angka 1-10, huruf, warna, empati, motorik halus) dan rancang mekaniknya agar tujuan itu *menjadi permainannya*, bukan kuis yang ditempelkan.
5. **Bisa dimainkan tanpa membaca.** Instruksi lewat suara, animasi contoh, dan ikon; teks hanya pendukung.
6. **Ringan dan tangguh.** Berjalan mulus di ponsel Android kelas bawah, tanpa internet, dan tidak rusak bila dilempar, dipencet banyak jari, atau ditinggal di tengah permainan.

---

## 2. Rentang Usia

Tentukan usia sasaran sejak awal; keputusan desain berbeda tiap rentang. Contoh panduan umum (uji dengan anak nyata):

| Usia | Kemampuan umum | Implikasi desain |
|---|---|---|
| 2-3 | Sentuh/geser sederhana, perhatian sangat singkat | Satu aksi per layar, respons instan, suara dan gerak besar, tanpa kalah |
| 4-5 | Mengenal bentuk/warna/angka dasar, seret-lepas | Instruksi suara, tingkat kesulitan naik pelan, pujian konsisten |
| 6-8 | Mulai membaca sederhana, aturan 2-3 langkah | Teks pendek, tujuan bertahap, pilihan terbatas |
| 9-12 | Strategi sederhana, ingin tantangan | Tingkat lanjut, kemajuan terlihat, tetap tanpa tekanan sosial berbahaya |

---

## 3. Keselamatan, Privasi, dan Kepatuhan

- **Kumpulkan data sesedikit mungkin.** Idealnya tanpa akun, tanpa nama, tanpa lokasi, tanpa pengenal iklan. Kemajuan disimpan **lokal** di perangkat.
- **Tanpa iklan** yang dipersonalisasi, tanpa pelacak pihak ketiga, tanpa pustaka analitik yang mengirim pengenal perangkat. Jika perlu statistik, kumpulkan agregat anonim dan jelaskan kepada orang tua.
- **Tanpa obrolan atau interaksi dengan orang asing.** Bila ada fitur sosial, batasi ke pilihan yang sudah ditentukan (stiker/emoji terpilih), tanpa teks bebas, dan dengan kendali orang tua.
- **Gerbang orang tua (parental gate)** di depan hal-hal yang keluar dari permainan: pembelian, tautan luar, pengaturan, kebijakan privasi, tombol "nilai kami". Gunakan tantangan yang sulit bagi anak kecil tetapi mudah bagi dewasa (misalnya menahan tombol dengan instruksi, atau soal hitung acak), dan jangan membuatnya mudah ditebak.
- **Pembelian dalam aplikasi:** sebaiknya model bayar sekali (beli penuh) atau tanpa pembelian. Jika ada, hanya lewat gerbang orang tua, tanpa mata uang virtual yang mengaburkan harga, tanpa acak berbayar.
- **Konten:** tanpa kekerasan, ketakutan, bahasa kasar, stereotip, atau simbol yang tidak pantas. Tinjau semua aset (gambar, suara, teks) sebelum rilis.
- **Pemberitahuan (notifikasi):** hindari. Jika ada, hanya dikendalikan orang tua dan tidak bernada menekan.
- **Regulasi dan kebijakan toko aplikasi:** ketentuan pelindungan data anak dan kebijakan kategori anak di Google Play/App Store **dapat berubah dan berbeda antar-negara**. Jangan menulis aturan dari ingatan; verifikasi ke dokumen resmi terkini (kebijakan Google Play untuk keluarga/anak, App Store, dan aturan pelindungan data pribadi yang berlaku di Indonesia) dan sarankan pengguna berkonsultasi dengan ahli hukum untuk kepastian.
- Sediakan **kebijakan privasi** yang ditulis dengan bahasa sederhana untuk orang tua.

---

## 4. Desain Permainan

### Mekanik dan alur
- **Sesi pendek:** satu putaran 1-3 menit, mudah dihentikan kapan saja tanpa kehilangan kemajuan.
- **Umpan balik instan dan hangat:** setiap sentuhan menghasilkan respons (bunyi, gerak). Keberhasilan dirayakan; kesalahan ditanggapi lembut ("Coba lagi, ya!") dengan petunjuk, bukan buzzer.
- **Kesulitan adaptif yang tenang:** bila anak gagal beberapa kali, turunkan kesulitan atau tunjukkan petunjuk secara otomatis; bila terlalu mudah, naikkan pelan.
- **Pilihan terbatas:** beberapa pilihan besar per layar, bukan menu panjang.
- **Hadiah yang bermakna:** hadiah berupa hal kreatif atau lucu (stiker, dekorasi, hewan baru) yang diberikan karena usaha, bukan karena keberuntungan atau pembelian. Tidak ada rentetan harian yang menghukum bila terlewat.
- **Kendali:** sentuh/ketuk/seret besar dan toleran. Tidak membutuhkan gestur halus (cubit, putar presisi) untuk anak kecil. Terima sentuhan salah dan banyak jari tanpa error.
- **Cara keluar yang jelas** bagi anak (tombol "selesai/istirahat" yang ramah), dan jeda otomatis yang mengajak berhenti setelah waktu bermain tertentu, dengan opsi pengatur waktu oleh orang tua.

### Bahasa dan budaya
- Bahasa Indonesia yang sederhana dan hangat; pertimbangkan dukungan bahasa daerah dan konten yang akrab bagi anak Indonesia (makanan, hewan, permainan tradisional, lingkungan sekitar).
- Suara narasi dengan pengisi suara yang jelas dan ramah; hindari nada menggurui.
- Karakter yang beragam dan ramah, tanpa stereotip.

---

## 5. Desain Visual dan Audio

Ikuti desain anti-AI: tidak ada neon, glow, gradasi ungu-cyan, atau glassmorphism, dan tidak ada tema gelap otomatis. Untuk anak:

- **Warna cerah tapi hangat**, bukan menyilaukan: palet terbatas (3-5 warna utama) dengan kontras jelas antar objek penting dan latar. Hindari kombinasi yang melelahkan mata.
- **Gaya yang terasa dibuat tangan:** bentuk sederhana dengan garis tegas, tekstur kertas/krayon/guntingan, proporsi besar dan bulat yang ramah. Jangan memakai kumpulan gambar acak bergaya generik; jaga satu gaya yang konsisten.
- **Elemen interaktif besar:** target sentuh minimal sekitar 64 px (lebih besar untuk usia dini), jarak antar target lega, dan terlihat jelas mana yang bisa disentuh (bayangan lembut, gerakan kecil berulang).
- **Hierarki sederhana:** satu fokus per layar; kurangi dekorasi yang mengalihkan perhatian.
- **Aksesibilitas:** jangan hanya mengandalkan warna (tambah bentuk/ikon/pola), dukung buta warna, kurangi kilatan cepat dan gerak berkedip (risiko fotosensitif), sediakan pengatur volume dan opsi gerak berkurang.
- **Audio:** musik latar lembut dan dapat dimatikan; efek bunyi pendek dan menyenangkan; tidak ada suara tiba-tiba keras. Normalkan volume antar-aset dan batasi puncak keras.
- **Animasi:** halus dan bermakna (menunjukkan sebab-akibat), bukan efek berlebihan.

---

## 6. Implementasi Teknis

### Pilihan teknologi (sesuaikan dengan proyek)
- **Rust:** `bevy` (ECS, fitur lengkap, lebih berat), `macroquad` (sederhana, cepat dibangun, cocok mini game 2D), `ggez` atau `fyrox` bila sesuai. Untuk web, kompilasi ke **WebAssembly** sehingga bisa dimainkan di peramban tanpa pemasangan.
- Engine lain (Godot, Unity) boleh bila tim lebih nyaman; prinsip skill ini tetap berlaku.
- Pilih yang **paling sederhana yang cukup** untuk game 2D anak; jangan memakai engine berat untuk mini game.

### Performa pada perangkat terbatas
- Targetkan 30-60 FPS stabil di Android kelas bawah. Ukur di perangkat nyata, bukan hanya emulator.
- Pakai **fixed timestep** untuk logika dan render terpisah; hindari alokasi per-frame; gunakan *object pool* untuk partikel/objek yang sering dibuat.
- Aset: atlas sprite, tekstur dikompres, resolusi sesuai kebutuhan, audio terkompresi (Ogg/Opus); muat bertahap dan lepaskan aset yang tidak dipakai.
- Ukuran unduhan kecil (banyak keluarga memakai kuota terbatas). Perhatikan juga konsumsi baterai dan panas.
- Tangani siklus hidup aplikasi: jeda saat masuk latar belakang, panggilan masuk, layar mati; lanjutkan tanpa rusak.

### Penyimpanan dan struktur
- Simpan kemajuan secara lokal dengan format versi (`versi_simpan`) agar pembaruan tidak merusak data lama. Tulis secara atomik (tulis ke berkas sementara lalu ganti) untuk mencegah data rusak saat aplikasi ditutup mendadak.
- Pisahkan: **logika permainan** (murni, mudah diuji), **tampilan**, **audio**, **data konten** (soal, level, teks) dalam berkas data sehingga konten dapat diubah tanpa mengubah kode dan mudah diterjemahkan.
- Mesin keadaan (state machine) yang eksplisit untuk alur layar: menu → bermain → jeda → selesai, supaya tidak ada keadaan rusak.
- Masukan: tangani multi-sentuh dengan wajar, abaikan sentuhan telapak, dan beri toleransi waktu/ruang pada ketukan.

---

## 7. Pengujian

- **Uji dengan anak nyata** pada usia sasaran, dengan izin dan kehadiran orang tua/wali, dalam suasana santai. Amati: apakah paham tanpa dijelaskan, di mana bingung atau frustrasi, apakah ingin bermain lagi. Catat dan perbaiki; jangan mengumpulkan data pribadi anak.
- **Uji pengguna orang tua:** apakah gerbang orang tua berfungsi, apakah pengaturan waktu dan suara mudah ditemukan, apakah kebijakan privasi bisa dipahami.
- **Teknis:** uji di beberapa perangkat Android kelas bawah/menengah, berbagai ukuran layar, orientasi, interupsi (telepon, notifikasi, kunci layar), dan tanpa koneksi internet.
- **Ketahanan:** sentuhan acak/menekan banyak jari, penutupan paksa saat menyimpan, penyimpanan penuh.
- **Daftar periksa keselamatan sebelum rilis:** tidak ada pelacak/iklan tersembunyi (periksa pustaka dan izin aplikasi), tidak ada tautan luar tanpa gerbang, tidak ada pembelian tanpa gerbang, semua konten telah ditinjau.
- **Aksesibilitas:** uji dalam skala abu-abu (apakah masih terbaca), volume mati (apakah masih bisa dimainkan dengan visual), dan gerak berkurang.

---

## 8. Alur Kerja Saat Memakai Skill Ini

1. Tanyakan atau tetapkan: usia sasaran, tujuan belajar utama, platform (Android/web/iOS), model bisnis (gratis, bayar sekali), dan stack.
2. Tulis satu paragraf **inti permainan**: apa yang dilakukan anak, apa yang dipelajari, dan seperti apa rasa "berhasil" tanpa tekanan.
3. Bangun **prototipe terkecil yang bisa dimainkan** (satu putaran) dan uji dengan anak sebelum menambah konten.
4. Jaga ketat daftar larangan (data, iklan, pembelian, interaksi asing) sepanjang pengembangan; periksa setiap pustaka baru terhadap daftar itu.
5. Sebelum selesai: jalankan daftar periksa keselamatan dan aksesibilitas, ukur performa di perangkat nyata, dan jelaskan keputusan penting serta hal yang perlu dikonfirmasi ke kebijakan toko aplikasi dan ahli hukum.
