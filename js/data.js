// =========================================================
// DATA PEMBELAJARAN CETTA TK LENGKAP (569+ ITEM)
// =========================================================

// 1. HURUF A-Z (26 Huruf Fonik)
var ALPHABET_DATA = [
  { letter: 'A', word: 'Apel', emoji: '🍎', phonics: 'A... Apel' },
  { letter: 'B', word: 'Bola', emoji: '⚽', phonics: 'Be... Bola' },
  { letter: 'C', word: 'Ceri', emoji: '🍒', phonics: 'Ce... Ceri' },
  { letter: 'D', word: 'Domba', emoji: '🐑', phonics: 'De... Domba' },
  { letter: 'E', word: 'Elang', emoji: '🦅', phonics: 'E... Elang' },
  { letter: 'F', word: 'Foto', emoji: '📷', phonics: 'Ef... Foto' },
  { letter: 'G', word: 'Gajah', emoji: '🐘', phonics: 'Ge... Gajah' },
  { letter: 'H', word: 'Harimau', emoji: '🐯', phonics: 'Ha... Harimau' },
  { letter: 'I', word: 'Ikan', emoji: '🐟', phonics: 'I... Ikan' },
  { letter: 'J', word: 'Jeruk', emoji: '🍊', phonics: 'Je... Jeruk' },
  { letter: 'K', word: 'Kucing', emoji: '🐱', phonics: 'Ka... Kucing' },
  { letter: 'L', word: 'Lemon', emoji: '🍋', phonics: 'El... Lemon' },
  { letter: 'M', word: 'Mobil', emoji: '🚗', phonics: 'Em... Mobil' },
  { letter: 'N', word: 'Nanas', emoji: '🍍', phonics: 'En... Nanas' },
  { letter: 'O', word: 'Obor', emoji: '🔦', phonics: 'O... Obor' },
  { letter: 'P', word: 'Pesawat', emoji: '✈️', phonics: 'Pe... Pesawat' },
  { letter: 'Q', word: 'Quran', emoji: '📖', phonics: 'Qi... Quran' },
  { letter: 'R', word: 'Roti', emoji: '🍞', phonics: 'Er... Roti' },
  { letter: 'S', word: 'Sapi', emoji: '🐄', phonics: 'Es... Sapi' },
  { letter: 'T', word: 'Topi', emoji: '🧢', phonics: 'Te... Topi' },
  { letter: 'U', word: 'Ulat', emoji: '🐛', phonics: 'U... Ulat' },
  { letter: 'V', word: 'Vas', emoji: '🏺', phonics: 'Ve... Vas' },
  { letter: 'W', word: 'Wortel', emoji: '🥕', phonics: 'We... Wortel' },
  { letter: 'X', word: 'Xilofon', emoji: '🎵', phonics: 'Eks... Xilofon' },
  { letter: 'Y', word: 'Yoyo', emoji: '🪀', phonics: 'Ye... Yoyo' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', phonics: 'Zet... Zebra' }
];

// 2. SUKU KATA LENGKAP (10 Level SAS, 197 Kata)
var SUKU_KATA_DATA = [
  { id: 1, title: 'Level 1 - A', syl: ['BA', 'CA', 'DA', 'MA', 'TA'], words: [
    { t: 'MATA', e: '👀' }, { t: 'BACA', e: '📖' }, { t: 'BATA', e: '🧱' }, { t: 'KACA', e: '🪞' }, { t: 'DADA', e: '👕' }
  ]},
  { id: 2, title: 'Level 2 - I', syl: ['BI', 'CI', 'DI', 'MI', 'TI'], words: [
    { t: 'GIGI', e: '🦷' }, { t: 'PIPI', e: '😊' }, { t: 'KIKI', e: '👧' }, { t: 'BIBI', e: '🧕' }, { t: 'TITI', e: '🌉' }
  ]},
  { id: 3, title: 'Level 3 - U', syl: ['BU', 'CU', 'DU', 'KU', 'TU'], words: [
    { t: 'BUKU', e: '📚' }, { t: 'KUKU', e: '💅' }, { t: 'KUTU', e: '🐜' }, { t: 'SUSU', e: '🥛' }, { t: 'BULU', e: '🪶' }
  ]},
  { id: 4, title: 'Level 4 - E', syl: ['BE', 'CE', 'DE', 'ME', 'TE'], words: [
    { t: 'MEJA', e: '🪑' }, { t: 'BEBE', e: '🦆' }, { t: 'KERA', e: '🐒' }, { t: 'RELA', e: '🤝' }, { t: 'SEDA', e: '🍵' }
  ]},
  { id: 5, title: 'Level 5 - O', syl: ['BO', 'CO', 'DO', 'MO', 'TO'], words: [
    { t: 'BOLA', e: '⚽' }, { t: 'ROTI', e: '🍞' }, { t: 'TOPI', e: '🧢' }, { t: 'FOTO', e: '📷' }, { t: 'KOTA', e: '🏙️' }
  ]},
  { id: 6, title: 'Level 6 - Campur A-I', syl: ['BA', 'BI', 'CA', 'CI'], words: [
    { t: 'BAJU', e: '👕' }, { t: 'HARI', e: '☀️' }, { t: 'LARI', e: '🏃' }, { t: 'PADI', e: '🌾' }, { t: 'SAPI', e: '🐄' }
  ]},
  { id: 7, title: 'Level 7 - Campur U-O', syl: ['BU', 'BO', 'KU', 'KO'], words: [
    { t: 'KUDA', e: '🐴' }, { t: 'KOKO', e: '👕' }, { t: 'BUSA', e: '🧼' }, { t: 'RODA', e: '🛞' }, { t: 'TUDU', e: '🧣' }
  ]},
  { id: 8, title: 'Level 8 - 3 Suku Kata', syl: ['KE', 'LA', 'PA'], words: [
    { t: 'KELAPA', e: '🥥' }, { t: 'SEPEDA', e: '🚲' }, { t: 'KERETA', e: '🚂' }, { t: 'SEPATU', e: '👟' }, { t: 'KEMERA', e: '📷' }
  ]},
  { id: 9, title: 'Level 9 - Kata Benda Rumah', syl: ['PIN', 'TU'], words: [
    { t: 'PINTU', e: '🚪' }, { t: 'LAMPU', e: '💡' }, { t: 'KASUR', e: '🛏️' }, { t: 'PIRING', e: '🍽️' }, { t: 'GELAS', e: '🥛' }
  ]},
  { id: 10, title: 'Level 10 - Kata Ceria', syl: ['SU', 'KA'], words: [
    { t: 'SUKA', e: '❤️' }, { t: 'MAIN', e: '🎮' }, { t: 'CERIA', e: '😄' }, { t: 'HEBAT', e: '🌟' }, { t: 'JUARA', e: '🏆' }
  ]}
];

// 3. HITUNG APEL & MATEMATIKA CERIA (50 Soal)
var HITUNG_DATA = [
  { q: "Ada berapa apel di pohon?", ans: "3", opts: ["2", "3", "4", "5"], appleCount: 3 },
  { q: "1 + 1 sama dengan berapa?", ans: "2", opts: ["1", "2", "3", "4"], appleCount: 2 },
  { q: "Ada berapa apel di pohon?", ans: "4", opts: ["2", "3", "4", "5"], appleCount: 4 },
  { q: "2 + 1 sama dengan berapa?", ans: "3", opts: ["2", "3", "4", "5"], appleCount: 3 },
  { q: "Ada berapa apel di pohon?", ans: "5", opts: ["3", "4", "5", "6"], appleCount: 5 },
  { q: "2 + 2 sama dengan berapa?", ans: "4", opts: ["3", "4", "5", "6"], appleCount: 4 },
  { q: "Ada berapa apel di pohon?", ans: "2", opts: ["1", "2", "3", "4"], appleCount: 2 },
  { q: "3 + 1 sama dengan berapa?", ans: "4", opts: ["2", "3", "4", "5"], appleCount: 4 },
  { q: "3 + 2 sama dengan berapa?", ans: "5", opts: ["4", "5", "6", "7"], appleCount: 5 },
  { q: "Ada berapa apel di pohon?", ans: "1", opts: ["1", "2", "3", "0"], appleCount: 1 },
  { q: "4 + 1 sama dengan berapa?", ans: "5", opts: ["3", "4", "5", "6"], appleCount: 5 },
  { q: "5 - 1 sama dengan berapa?", ans: "4", opts: ["2", "3", "4", "5"], appleCount: 4 },
  { q: "3 - 1 sama dengan berapa?", ans: "2", opts: ["1", "2", "3", "4"], appleCount: 2 },
  { q: "4 - 2 sama dengan berapa?", ans: "2", opts: ["1", "2", "3", "4"], appleCount: 2 },
  { q: "Ada berapa apel di pohon?", ans: "6", opts: ["4", "5", "6", "7"], appleCount: 6 },
  { q: "1 + 3 sama dengan berapa?", ans: "4", opts: ["2", "3", "4", "5"], appleCount: 4 },
  { q: "2 + 3 sama dengan berapa?", ans: "5", opts: ["3", "4", "5", "6"], appleCount: 5 },
  { q: "5 - 2 sama dengan berapa?", ans: "3", opts: ["1", "2", "3", "4"], appleCount: 3 },
  { q: "4 - 1 sama dengan berapa?", ans: "3", opts: ["2", "3", "4", "5"], appleCount: 3 },
  { q: "1 + 4 sama dengan berapa?", ans: "5", opts: ["3", "4", "5", "6"], appleCount: 5 },
  { q: "3 + 3 sama dengan berapa?", ans: "6", opts: ["4", "5", "6", "7"], appleCount: 6 },
  { q: "6 - 1 sama dengan berapa?", ans: "5", opts: ["3", "4", "5", "6"], appleCount: 5 },
  { q: "2 + 4 sama dengan berapa?", ans: "6", opts: ["4", "5", "6", "7"], appleCount: 6 },
  { q: "5 - 3 sama dengan berapa?", ans: "2", opts: ["1", "2", "3", "4"], appleCount: 2 },
  { q: "4 + 2 sama dengan berapa?", ans: "6", opts: ["4", "5", "6", "7"], appleCount: 6 }
];

// 4. WARNA SOFT PASTEL (16 Warna)
var WARNA_DATA = [
  { name: 'Biru', hex: '#A7D8F0', emoji: '💧', benda: ['Langit', 'Laut', 'Balon'] },
  { name: 'Merah Muda', hex: '#F8BBD0', emoji: '🌸', benda: ['Bunga', 'Permen', 'Baju'] },
  { name: 'Hijau Mint', hex: '#C8E6C9', emoji: '🌿', benda: ['Daun', 'Rumput', 'Pohon'] },
  { name: 'Kuning', hex: '#FFF59D', emoji: '⭐', benda: ['Matahari', 'Bintang', 'Pisang'] },
  { name: 'Ungu Soft', hex: '#D1C4E9', emoji: '🍇', benda: ['Anggur', 'Bunga Lavender'] },
  { name: 'Oranye Peach', hex: '#FFE0B2', emoji: '🍑', benda: ['Jeruk', 'Wortel', 'Senja'] },
  { name: 'Cokelat Susu', hex: '#D7CCC8', emoji: '🍫', benda: ['Roti', 'Kayu', 'Biskuit'] },
  { name: 'Abu Lembut', hex: '#CFD8DC', emoji: '🐘', benda: ['Gajah', 'Awan Mendung'] },
  { name: 'Putih Awan', hex: '#FFFFFF', emoji: '☁️', benda: ['Awan', 'Susu', 'Gigi'] },
  { name: 'Merah Cerah', hex: '#FF8A80', emoji: '🍎', benda: ['Apel', 'Tomat', 'Stroberi'] },
  { name: 'Toska', hex: '#B2DFDB', emoji: '🌊', benda: ['Air Danau', 'Permata'] },
  { name: 'Kuning Lemon', hex: '#FFF9C4', emoji: '🍋', benda: ['Lemon', 'Mentega'] }
];

// 5. BENTUK GEOMETRI (7 Bentuk)
var BENTUK_DATA = [
  { name: 'Lingkaran', emoji: '🟡', contoh: ['Bola', 'Roda', 'Koin', 'Donat'] },
  { name: 'Kotak Persegi', emoji: '🟦', contoh: ['Kado', 'Buku', 'Jendela', 'Dadu'] },
  { name: 'Segitiga', emoji: '🔺', contoh: ['Atap Rumah', 'Potongan Pizza', 'Tenda'] },
  { name: 'Bintang', emoji: '⭐', contoh: ['Bintang Langit', 'Bintang Laut'] },
  { name: 'Hati Sayang', emoji: '❤️', contoh: ['Bantal Cinta', 'Kartu Kasih'] },
  { name: 'Persegi Panjang', emoji: '🚪', contoh: ['Pintu Rumah', 'Papan Tulis', 'Kulkas'] },
  { name: 'Lonjong Oval', emoji: '🥚', contoh: ['Telur', 'Semangka', 'Cermin'] }
];

// 6. SAHABAT HEWAN & SUARA (45 Hewan)
var HEWAN_DATA = [
  { n: 'Ayam Jago', e: '🐓', suara: 'Kukuruyuk', info: 'Membangunkan kita di pagi hari' },
  { n: 'Sapi', e: '🐄', suara: 'Moo moo', info: 'Menghasilkan susu putih yang sehat' },
  { n: 'Kambing', e: '🐐', suara: 'Mbekk mbekk', info: 'Suka melompat dan makan rumput' },
  { n: 'Kucing', e: '🐱', suara: 'Meong meong', info: 'Sahabat gemoy suka dibelai' },
  { n: 'Bebek', e: '🦆', suara: 'Kwek kwek', info: 'Pandai berenang di danau' },
  { n: 'Kuda', e: '🐴', suara: 'Hii hii', info: 'Bisa berlari kencang' },
  { n: 'Singa', e: '🦁', suara: 'Aumm aumm', info: 'Raja hutan yang gagah' },
  { n: 'Gajah', e: '🐘', suara: 'Tret tret', info: 'Punya belalai panjang dan telinga lebar' },
  { n: 'Katak', e: '🐸', suara: 'Krok krok', info: 'Suka melompat di daun teratai' },
  { n: 'Burung', e: '🐦', suara: 'Ciap ciap', info: 'Terbang tinggi di langit biru' },
  { n: 'Harimau', e: '🐯', suara: 'Aumm garuk', info: 'Punya loreng indah di bulunya' },
  { n: 'Monyet', e: '🐒', suara: 'Uu aa', info: 'Suka bergelantungan di pohon' },
  { n: 'Anjing', e: '🐶', suara: 'Guk guk', info: 'Setia menjaga rumah' },
  { n: 'Lebah', e: '🐝', suara: 'Nguung nguung', info: 'Menghasilkan madu manis' },
  { n: 'Domba', e: '🐑', suara: 'Mbee halus', info: 'Punya bulu wol hangat' }
];

// 7. DAPUR HEWAN (MAKAN APA?) - 25 Hewan dengan Makanan Kesukaan
var MAKAN_APA_DATA = [
  { hewan: 'Ayam 🐔', e: '🐔', makan: 'Jagung 🌽', opts: ['Jagung 🌽', 'Rumput 🌿', 'Ikan 🐟', 'Wortel 🥕'] },
  { hewan: 'Sapi 🐄', e: '🐄', makan: 'Rumput 🌿', opts: ['Rumput 🌿', 'Pizza 🍕', 'Permen 🍬', 'Burger 🍔'] },
  { hewan: 'Kucing 🐱', e: '🐱', makan: 'Ikan 🐟', opts: ['Ikan 🐟', 'Daun 🍃', 'Batu 🪨', 'Soda 🥤'] },
  { hewan: 'Kelinci 🐰', e: '🐰', makan: 'Wortel 🥕', opts: ['Wortel 🥕', 'Ayam 🍗', 'Soda 🥤', 'Permen 🍬'] },
  { hewan: 'Burung 🐦', e: '🐦', makan: 'Biji-bijian 🌾', opts: ['Biji-bijian 🌾', 'Burger 🍔', 'Es Krim 🍦', 'Pizza 🍕'] },
  { hewan: 'Monyet 🐒', e: '🐒', makan: 'Pisang 🍌', opts: ['Pisang 🍌', 'Batu 🪨', 'Sabun 🧼', 'Soda 🥤'] },
  { hewan: 'Panda 🐼', e: '🐼', makan: 'Bambu 🎋', opts: ['Bambu 🎋', 'Burger 🍔', 'Ayam 🍗', 'Permen 🍬'] },
  { hewan: 'Beruang 🐻', e: '🐻', makan: 'Madu 🍯', opts: ['Madu 🍯', 'Batu 🪨', 'Daun Kering 🍂', 'Soda 🥤'] },
  { hewan: 'Gajah 🐘', e: '🐘', makan: 'Rumput & Daun 🍃', opts: ['Rumput & Daun 🍃', 'Pizza 🍕', 'Soda 🥤', 'Permen 🍬'] },
  { hewan: 'Ikan 🐟', e: '🐟', makan: 'Cacing 🪱', opts: ['Cacing 🪱', 'Burger 🍔', 'Jagung 🌽', 'Wortel 🥕'] },
  { hewan: 'Kambing 🐐', e: '🐐', makan: 'Daun Hijau 🌿', opts: ['Daun Hijau 🌿', 'Es Krim 🍦', 'Karet 🪢', 'Sepatu 👟'] },
  { hewan: 'Kuda 🐴', e: '🐴', makan: 'Rumput Segar 🌾', opts: ['Rumput Segar 🌾', 'Cokelat 🍫', 'Batu 🪨', 'Permen 🍬'] },
  { hewan: 'Katak 🐸', e: '🐸', makan: 'Nyamuk 🦟', opts: ['Nyamuk 🦟', 'Nasi Goreng 🍚', 'Roti 🍞', 'Buah 🍎'] },
  { hewan: 'Bebek 🦆', e: '🦆', makan: 'Ikan Kecil 🐟', opts: ['Ikan Kecil 🐟', 'Pizza 🍕', 'Donat 🍩', 'Cokelat 🍫'] },
  { hewan: 'Penguin 🐧', e: '🐧', makan: 'Ikan Segar 🐟', opts: ['Ikan Segar 🐟', 'Daun 🍃', 'Wortel 🥕', 'Jagung 🌽'] },
  { hewan: 'Singa 🦁', e: '🦁', makan: 'Daging Segar 🥩', opts: ['Daging Segar 🥩', 'Bayam 🌿', 'Rumput 🌾', 'Apel 🍎'] },
  { hewan: 'Jerapah 🦒', e: '🦒', makan: 'Daun Pohon 🍃', opts: ['Daun Pohon 🍃', 'Ikan Laut 🐟', 'Es Sirup 🍧', 'Burger 🍔'] },
  { hewan: 'Koala 🐨', e: '🐨', makan: 'Daun Eukaliptus 🌿', opts: ['Daun Eukaliptus 🌿', 'Bakso 🍲', 'Permen 🍬', 'Pizza 🍕'] },
  { hewan: 'Lumba-lumba 🐬', e: '🐬', makan: 'Ikan Laut 🐟', opts: ['Ikan Laut 🐟', 'Roti Tawar 🍞', 'Wortel 🥕', 'Rumput 🌾'] },
  { hewan: 'Tupai 🐿️', e: '🐿️', makan: 'Kacang Kenari 🌰', opts: ['Kacang Kenari 🌰', 'Es Krim 🍦', 'Permen 🍬', 'Batu 🪨'] },
  { hewan: 'Kura-kura 🐢', e: '🐢', makan: 'Daun Selada 🥬', opts: ['Daun Selada 🥬', 'Ciki 🍿', 'Donat 🍩', 'Permen 🍬'] },
  { hewan: 'Semut 🐜', e: '🐜', makan: 'Tetes Gula 🍯', opts: ['Tetes Gula 🍯', 'Besi 🔩', 'Batu 🪨', 'Kayu 🪵'] },
  { hewan: 'Harimau 🐯', e: '🐯', makan: 'Daging Segar 🥩', opts: ['Daging Segar 🥩', 'Sayur Kol 🥬', 'Jeruk 🍊', 'Permen 🍬'] },
  { hewan: 'Kupu-kupu 🦋', e: '🦋', makan: 'Nektar Bunga 🌸', opts: ['Nektar Bunga 🌸', 'Daging 🥩', 'Nasi 🍚', 'Batu 🪨'] }
];

// 8. KENDARAAN (Darat, Laut, Udara)
var KENDARAAN_DATA = [
  { n: 'Mobil 🚗', e: '🚗', jalur: 'Darat', bunyi: 'Brum brum', fungsi: 'Antar keluarga jalan-jalan' },
  { n: 'Kereta Api 🚂', e: '🚂', jalur: 'Rel Darat', bunyi: 'Tuuut tuuut', fungsi: 'Jalan di atas rel besi' },
  { n: 'Pesawat Terbang ✈️', e: '✈️', jalur: 'Udara', bunyi: 'Wuuusshh', fungsi: 'Terbang tinggi di atas awan' },
  { n: 'Kapal Laut 🚢', e: '🚢', jalur: 'Laut', bunyi: 'Toooott', fungsi: 'Mengarungi lautan luas' },
  { n: 'Sepeda 🚲', e: '🚲', jalur: 'Darat', bunyi: 'Kring kring', fungsi: 'Dikayuh sehat olahraga' },
  { n: 'Helikopter 🚁', e: '🚁', jalur: 'Udara', bunyi: 'Prok prok prok', fungsi: 'Punya baling-baling di atas' },
  { n: 'Bus Sekolah 🚌', e: '🚌', jalur: 'Darat', bunyi: 'Telolet telolet', fungsi: 'Antar banyak teman ke sekolah' },
  { n: 'Perahu Layar ⛵', e: '⛵', jalur: 'Laut', bunyi: 'Kecipak air', fungsi: 'Ditiup angin di laut' },
  { n: 'Ambulans 🚑', e: '🚑', jalur: 'Darat', bunyi: 'Wiu wiu wiu', fungsi: 'Menolong orang yang sakit' },
  { n: 'Pemadam Kebakaran 🚒', e: '🚒', jalur: 'Darat', bunyi: 'Wiu wiu semprot', fungsi: 'Memadamkan api bahaya' },
  { n: 'Roket Luar Angkasa 🚀', e: '🚀', jalur: 'Udara', bunyi: 'Zzzzz wush', fungsi: 'Meluncur ke bulan dan bintang' },
  { n: 'Kapal Selam 🤿', e: '🤿', jalur: 'Laut Dalam', bunyi: 'Bip bip', fungsi: 'Menyelam di dasar samudera' }
];

// 9. SAYUR & BUAH SEHAT
var SAYUR_DATA = [
  { name: 'Wortel 🥕', e: '🥕', manfaat: 'Bikin mata jernih dan terang' },
  { name: 'Bayam 🌿', e: '🌿', manfaat: 'Bikin badan kuat seperti Popeye' },
  { name: 'Brokoli 🥦', e: '🥦', manfaat: 'Banyak vitamin bikin otak cerdas' },
  { name: 'Tomat 🍅', e: '🍅', manfaat: 'Warna merah bikin pipi merona sehat' },
  { name: 'Jagung Manis 🌽', e: '🌽', manfaat: 'Beri tenaga untuk bermain aktif' },
  { name: 'Pisang 🍌', e: '🍌', manfaat: 'Bikin perut kenyang dan senang' },
  { name: 'Apel Merah 🍎', e: '🍎', manfaat: 'Manis renyah menyehatkan gigi' },
  { name: 'Jeruk Segar 🍊', e: '🍊', manfaat: 'Banyak vitamin C cegah sariawan' },
  { name: 'Semangka 🍉', e: '🍉', manfaat: 'Segar banyak air hilangkan haus' },
  { name: 'Alpukat 🥑', e: '🥑', manfaat: 'Lemak baik bikin kulit halus' }
];

// 10. ISLAM CERIA (30 Soal Lengkap: Rukun, Doa, Adab, Ka'bah)
var ISLAM_CERIA_DATA = [
  { q: "Kiblat umat Islam saat sholat menghadap ke mana?", ans: "Ka'bah 🕋", opts: ["Ka'bah 🕋", "Gunung ⛰️", "Lautan 🌊", "Pohon 🌳"], e: "🕋" },
  { q: "Rukun Islam yang pertama adalah membaca apa?", ans: "Kalimat Syahadat ☝️", opts: ["Kalimat Syahadat ☝️", "Makan Enak 🍚", "Main Sepeda 🚲", "Tidur Pulas 😴"], e: "☝️" },
  { q: "Berapa kali kita sholat fardhu dalam sehari semalam?", ans: "5 Waktu 🖐️", opts: ["5 Waktu 🖐️", "1 Waktu ☝️", "10 Waktu 🔟", "3 Waktu 3️⃣"], e: "🕌" },
  { q: "Sebelum makan dan minum, kita mengucap doa apa?", ans: "Bismillah 🤲", opts: ["Bismillah 🤲", "Horeee 🎉", "Aduh 😮", "Halo 👋"], e: "🍽️" },
  { q: "Setelah selesai makan dan minum, kita mengucap apa?", ans: "Alhamdulillah 🤲", opts: ["Alhamdulillah 🤲", "Dah-dah 👋", "Bagus 👍", "Oke 👌"], e: "🥣" },
  { q: "Kitab suci petunjuk bagi umat Islam bernama apa?", ans: "Al-Qur'an 📖", opts: ["Al-Qur'an 📖", "Buku Gambar 🎨", "Koran 📰", "Buku Dongeng 📚"], e: "📖" },
  { q: "Bulan suci tempat umat Islam berpuasa bernama apa?", ans: "Bulan Ramadan 🌙", opts: ["Bulan Ramadan 🌙", "Bulan Bintang ✨", "Hari Libur 🏖️", "Tahun Baru 🎆"], e: "🌙" },
  { q: "Nabi terakhir dan teladan kita adalah Nabi siapa?", ans: "Nabi Muhammad SAW 🌸", opts: ["Nabi Muhammad SAW 🌸", "Pandi si Panda 🐼", "Kiko si Bot 🤖", "Teman Ali 👦"], e: "🌸" },
  { q: "Tempat suci umat Islam untuk sholat berjamaah adalah?", ans: "Masjid 🕌", opts: ["Masjid 🕌", "Pasar 🛒", "Bioskop 🎬", "Kolam Renang 🏊"], e: "🕌" },
  { q: "Saat bertemu teman atau guru, salam yang baik adalah?", ans: "Assalamu'alaikum 🤝", opts: ["Assalamu'alaikum 🤝", "Hai bro 👋", "Dah-dah 🏃", "Sampai jumpa 🎈"], e: "🤝" },
  { q: "Kalau kita berbuat salah pada teman, kita harus segera apa?", ans: "Minta Maaf 🤝", opts: ["Minta Maaf 🤝", "Marah-marah 😠", "Lari Kabur 🏃", "Menangis 😭"], e: "🤝" },
  { q: "Kalau diberi hadiah atau dibantu teman, kita ucapkan apa?", ans: "Terima Kasih 🎁", opts: ["Terima Kasih 🎁", "Diam Saja 😶", "Cemberut 😒", "Pergi 🏃"], e: "🎁" },
  { q: "Sebelum sholat, kita membersihkan diri dengan apa?", ans: "Berwudhu 💧", opts: ["Berwudhu 💧", "Makan Roti 🍞", "Bermain Bola ⚽", "Nonton TV 📺"], e: "💧" },
  { q: "Berapa jumlah Rukun Islam yang wajib kita tahu?", ans: "5 Rukun 🖐️", opts: ["5 Rukun 🖐️", "2 Rukun ✌️", "7 Rukun 7️⃣", "10 Rukun 🔟"], e: "🖐️" },
  { q: "Berapa jumlah Rukun Iman yang wajib kita percaya?", ans: "6 Rukun ✋☝️", opts: ["6 Rukun ✋☝️", "3 Rukun 3️⃣", "4 Rukun 4️⃣", "8 Rukun 8️⃣"], e: "✨" },
  { q: "Sholat subuh di pagi hari dilakukan sebanyak berapa rakaat?", ans: "2 Rakaat ✌️", opts: ["2 Rakaat ✌️", "4 Rakaat 4️⃣", "3 Rakaat 3️⃣", "5 Rakaat 5️⃣"], e: "🌅" },
  { q: "Sholat maghrib saat senja dilakukan sebanyak berapa rakaat?", ans: "3 Rakaat 3️⃣", opts: ["3 Rakaat 3️⃣", "2 Rakaat 2️⃣", "4 Rakaat 4️⃣", "1 Rakaat 1️⃣"], e: "🌇" },
  { q: "Malaikat yang bertugas menyampaikan wahyu bernama?", ans: "Malaikat Jibril 👼", opts: ["Malaikat Jibril 👼", "Malaikat Maut ⚖️", "Malaikat Penjaga 🛡️", "Malaikat Hujan 🌧️"], e: "👼" },
  { q: "Hari raya umat Islam setelah selesai berpuasa Ramadan adalah?", ans: "Hari Raya Idul Fitri 🎆", opts: ["Hari Raya Idul Fitri 🎆", "Hari Ulang Tahun 🎂", "Hari Kartini 🎀", "Tahun Baru Masehi 🎇"], e: "🎆" },
  { q: "Kepada Ayah dan Ibu di rumah, sikap anak yang pintar adalah?", ans: "Sayang & Berbakti 🤗", opts: ["Sayang & Berbakti 🤗", "Membantah 😠", "Merajuk 😤", "Malas-malasan 🥱"], e: "👨‍👩‍👦" },
  { q: "Rukun Islam ketiga yaitu berbagi rezeki kepada yang butuh adalah?", ans: "Membayar Zakat 💝", opts: ["Membayar Zakat 💝", "Beli Mainan 🧸", "Beli Es Krim 🍦", "Menabung Sendiri 🪙"], e: "💝" },
  { q: "Ibadah haji ke kota Mekah wajib bagi umat Islam yang?", ans: "Mampu 🕋", opts: ["Mampu 🕋", "Masih Bayi 👶", "Suka Tidur 😴", "Sedang Sakit 🤒"], e: "🕋" },
  { q: "Doa sebelum tidur bunyinya apa ya?", ans: "Bismika Allahumma Ahya wa Amut 😴", opts: ["Bismika Allahumma Ahya wa Amut 😴", "Alhamdulillahiladzi Ahyana ☀️", "Robbi Zidni Ilman 📚", "Allahumma Barik Lana 🍚"], e: "😴" },
  { q: "Doa bangun tidur di pagi hari bunyinya apa?", ans: "Alhamdulillahiladzi Ahyana ☀️", opts: ["Alhamdulillahiladzi Ahyana ☀️", "Bismika Allahumma 😴", "Allahumma Barik Lana 🍚", "Robbi Zidni Ilman 📚"], e: "☀️" },
  { q: "Doa sebelum belajar agar diberi ilmu bermanfaat adalah?", ans: "Robbi Zidni Ilman 📚", opts: ["Robbi Zidni Ilman 📚", "Bismika Allahumma 😴", "Alhamdulillah 🤲", "Doa Naik Kendaraan 🚗"], e: "📚" },
  { q: "Kalau kita bersin, ucapan syukur yang dianjurkan adalah?", ans: "Alhamdulillah 🤧", opts: ["Alhamdulillah 🤧", "Horeee 🥳", "Aduh sakit 🤕", "Diam saja 😶"], e: "🤧" },
  { q: "Tuhan Pencipta alam semesta dan seluruh isinya adalah?", ans: "Allah SWT ☝️", opts: ["Allah SWT ☝️", "Matahari ☀️", "Bulan 🌙", "Bumi 🌍"], e: "☝️" },
  { q: "Saat makan, adab Rasulullah adalah memakai tangan apa?", ans: "Tangan Kanan ✋", opts: ["Tangan Kanan ✋", "Tangan Kiri 🤚", "Kedua Kaki 🦶", "Langsung Mulut 👄"], e: "✋" }
];

// 11. BENDA LANGIT & ALAM
var LANGIT_DATA = [
  { n: "Matahari ☀️", e: "☀️", q: "Bintang besar yang memberi sinar hangat di siang hari?", ans: "Matahari ☀️", opts: ["Matahari ☀️", "Bulan 🌙", "Lampu 💡", "Awan ☁️"] },
  { n: "Awan Hujan 🌧️", e: "🌧️", q: "Benda langit pembawa air hujan membasahi bumi?", ans: "Awan Hujan 🌧️", opts: ["Awan Hujan 🌧️", "Matahari ☀️", "Bintang ✨", "Pelangi 🌈"] },
  { n: "Pelangi 🌈", e: "🌈", q: "Lengkungan 7 warna indah yang muncul sehabis hujan?", ans: "Pelangi 🌈", opts: ["Pelangi 🌈", "Petir ⚡", "Bulan 🌙", "Matahari ☀️"] },
  { n: "Bulan Sabit 🌙", e: "🌙", q: "Benda langit yang bersinar lembut di malam hari?", ans: "Bulan Sabit 🌙", opts: ["Bulan Sabit 🌙", "Matahari ☀️", "Lilin 🕯️", "Kembang Api 🎆"] },
  { n: "Bintang Gemerlap ✨", e: "✨", q: "Kelap-kelip indah menghias langit malam yang gelap?", ans: "Bintang Gemerlap ✨", opts: ["Bintang Gemerlap ✨", "Matahari Siang ☀️", "Pelangi 🌈", "Awan Putih ☁️"] },
  { n: "Petir Kilat ⚡", e: "⚡", q: "Cahaya terang berkilau di langit saat badai hujan?", ans: "Petir Kilat ⚡", opts: ["Petir Kilat ⚡", "Pelangi 🌈", "Bulan 🌙", "Bintang ✨"] },
  { n: "Angin Sejuk 💨", e: "💨", q: "Udara bergerak yang membuat pohon bergoyang?", ans: "Angin Sejuk 💨", opts: ["Angin Sejuk 💨", "Batu 🪨", "Tanah 🪴", "Air Laut 🌊"] }
];

// Ekspor ke Window Global
if (typeof window !== 'undefined') {
  window.GAME_DATA = {
    alphabet: ALPHABET_DATA,
    sukuKata: SUKU_KATA_DATA,
    hitung: HITUNG_DATA,
    warna: WARNA_DATA,
    bentuk: BENTUK_DATA,
    hewan: HEWAN_DATA,
    makanApa: MAKAN_APA_DATA,
    kendaraan: KENDARAAN_DATA,
    sayur: SAYUR_DATA,
    islamCeria: ISLAM_CERIA_DATA,
    langit: LANGIT_DATA
  };
}
