// =========================================================
// JS/PRINT-SHEET.JS - LEMBAR MEWARNAI SIAP CETAK (OFFLINE WORKSHEET)
// High-contrast clean black & white outlines for real crayons & paper!
// Supports instant 1-click window.print() and PNG download for WhatsApp/Printing.
// =========================================================

var COLORING_SHEETS = [
  {
    id: 'kiko',
    title: 'Kiko si Rintik Hujan & Awan',
    icon: '🌧️',
    svg: `
      <svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFF;">
        <!-- Header text on worksheet -->
        <text x="250" y="32" font-family="'Comic Sans MS', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#000">Kiko si Rintik Hujan & Awan Ceria</text>
        
        <!-- Big Smiling Cloud -->
        <path d="M 120 180 A 45 45 0 0 1 180 130 A 65 65 0 0 1 310 130 A 45 45 0 0 1 380 180 A 45 45 0 0 1 340 240 L 140 240 A 45 45 0 0 1 120 180 Z" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Cloud Eyes & Smile -->
        <circle cx="210" cy="180" r="8" fill="#000" />
        <circle cx="280" cy="180" r="8" fill="#000" />
        <path d="M 230 205 Q 245 225 260 205" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" />
        
        <!-- Friendly Sun in Corner -->
        <circle cx="420" cy="70" r="35" fill="none" stroke="#000" stroke-width="5" />
        <line x1="420" y1="20" x2="420" y2="5" stroke="#000" stroke-width="5" stroke-linecap="round" />
        <line x1="470" y1="70" x2="485" y2="70" stroke="#000" stroke-width="5" stroke-linecap="round" />
        <line x1="455" y1="35" x2="468" y2="22" stroke="#000" stroke-width="5" stroke-linecap="round" />
        <line x1="385" y1="35" x2="372" y2="22" stroke="#000" stroke-width="5" stroke-linecap="round" />

        <!-- Raindrops with Smiling Faces -->
        <!-- Drop 1 -->
        <path d="M 160 270 C 140 310 180 310 160 270 Z" fill="none" stroke="#000" stroke-width="5" />
        <circle cx="157" cy="295" r="3" fill="#000" />
        <circle cx="163" cy="295" r="3" fill="#000" />
        
        <!-- Drop 2 (Kiko in center) -->
        <path d="M 245 270 C 215 330 275 330 245 270 Z" fill="none" stroke="#000" stroke-width="6" />
        <circle cx="238" cy="308" r="4" fill="#000" />
        <circle cx="252" cy="308" r="4" fill="#000" />
        <path d="M 241 318 Q 245 324 249 318" fill="none" stroke="#000" stroke-width="3" />

        <!-- Drop 3 -->
        <path d="M 330 270 C 310 310 350 310 330 270 Z" fill="none" stroke="#000" stroke-width="5" />
        <circle cx="327" cy="295" r="3" fill="#000" />
        <circle cx="333" cy="295" r="3" fill="#000" />

        <!-- Ground Meadow with Flowers -->
        <line x1="30" y1="440" x2="470" y2="440" stroke="#000" stroke-width="6" stroke-linecap="round" />
        
        <!-- Flower 1 -->
        <line x1="120" y1="440" x2="120" y2="390" stroke="#000" stroke-width="5" />
        <circle cx="120" cy="380" r="14" fill="none" stroke="#000" stroke-width="4" />
        <path d="M 120 355 C 105 375 135 375 120 355 Z" fill="none" stroke="#000" stroke-width="4" />
        <path d="M 95 380 C 115 365 115 395 95 380 Z" fill="none" stroke="#000" stroke-width="4" />
        <path d="M 145 380 C 125 365 125 395 145 380 Z" fill="none" stroke="#000" stroke-width="4" />
        <path d="M 120 405 C 105 385 135 385 120 405 Z" fill="none" stroke="#000" stroke-width="4" />

        <!-- Flower 2 (Sunflower) -->
        <line x1="370" y1="440" x2="370" y2="370" stroke="#000" stroke-width="5" />
        <circle cx="370" cy="350" r="22" fill="none" stroke="#000" stroke-width="5" />
        <circle cx="370" cy="350" r="12" fill="none" stroke="#000" stroke-width="2" stroke-dasharray="3,3" />

        <!-- Child Worksheet info line -->
        <text x="50" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Nama Anak: ____________________</text>
        <text x="320" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Kelas: _________</text>
      </svg>
    `
  },
  {
    id: 'bus',
    title: 'Bus Petualangan Cetta & Pandi',
    icon: '🚌',
    svg: `
      <svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFF;">
        <text x="250" y="32" font-family="'Comic Sans MS', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#000">Bus Sekolah Cetta & Sahabat</text>
        
        <!-- Bus Body -->
        <rect x="70" y="160" width="360" height="170" rx="30" fill="none" stroke="#000" stroke-width="6" />
        
        <!-- Bus Front Windshield -->
        <rect x="330" y="180" width="80" height="70" rx="12" fill="none" stroke="#000" stroke-width="5" />
        <!-- Middle Window (Pandi Panda Face) -->
        <rect x="210" y="180" width="95" height="70" rx="12" fill="none" stroke="#000" stroke-width="5" />
        <!-- Panda Ears & Face inside Window -->
        <circle cx="240" cy="210" r="12" fill="none" stroke="#000" stroke-width="3" />
        <circle cx="275" cy="210" r="12" fill="none" stroke="#000" stroke-width="3" />
        <circle cx="257" cy="225" r="24" fill="none" stroke="#000" stroke-width="3" />
        <circle cx="249" cy="220" r="4" fill="#000" />
        <circle cx="265" cy="220" r="4" fill="#000" />
        <path d="M 252 235 Q 257 242 262 235" fill="none" stroke="#000" stroke-width="3" />

        <!-- Rear Window -->
        <rect x="95" y="180" width="95" height="70" rx="12" fill="none" stroke="#000" stroke-width="5" />

        <!-- Wheels -->
        <circle cx="150" cy="330" r="42" fill="none" stroke="#000" stroke-width="7" />
        <circle cx="150" cy="330" r="20" fill="none" stroke="#000" stroke-width="4" />
        
        <circle cx="350" cy="330" r="42" fill="none" stroke="#000" stroke-width="7" />
        <circle cx="350" cy="330" r="20" fill="none" stroke="#000" stroke-width="4" />

        <!-- Headlight & Bumpers -->
        <path d="M 430 270 Q 445 285 430 300" fill="none" stroke="#000" stroke-width="5" />
        
        <!-- Road Line -->
        <line x1="30" y1="372" x2="470" y2="372" stroke="#000" stroke-width="6" stroke-linecap="round" />
        <line x1="100" y1="410" x2="160" y2="410" stroke="#000" stroke-width="5" stroke-linecap="round" />
        <line x1="220" y1="410" x2="280" y2="410" stroke="#000" stroke-width="5" stroke-linecap="round" />
        <line x1="340" y1="410" x2="400" y2="410" stroke="#000" stroke-width="5" stroke-linecap="round" />

        <!-- Child Worksheet info line -->
        <text x="50" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Nama Anak: ____________________</text>
        <text x="320" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Kelas: _________</text>
      </svg>
    `
  },
  {
    id: 'kelinci',
    title: 'Kelinci Gemoy & Kebun Wortel',
    icon: '🐰',
    svg: `
      <svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFF;">
        <text x="250" y="32" font-family="'Comic Sans MS', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#000">Kelinci Gemoy di Kebun Wortel</text>
        
        <!-- Bunny Ears -->
        <ellipse cx="215" cy="110" rx="20" ry="60" fill="none" stroke="#000" stroke-width="6" />
        <ellipse cx="215" cy="115" rx="10" ry="40" fill="none" stroke="#000" stroke-width="3" />
        <ellipse cx="285" cy="110" rx="20" ry="60" fill="none" stroke="#000" stroke-width="6" />
        <ellipse cx="285" cy="115" rx="10" ry="40" fill="none" stroke="#000" stroke-width="3" />

        <!-- Bunny Head -->
        <circle cx="250" cy="200" r="65" fill="none" stroke="#000" stroke-width="6" />
        <!-- Eyes -->
        <circle cx="225" cy="190" r="8" fill="#000" />
        <circle cx="275" cy="190" r="8" fill="#000" />
        <!-- Nose & Whiskers -->
        <polygon points="250,205 242,216 258,216" fill="#000" />
        <path d="M 250 216 L 250 226 Q 242 235 235 226" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
        <path d="M 250 226 Q 258 235 265 226" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
        <!-- Whiskers -->
        <line x1="210" y1="210" x2="160" y2="205" stroke="#000" stroke-width="4" stroke-linecap="round" />
        <line x1="210" y1="222" x2="165" y2="228" stroke="#000" stroke-width="4" stroke-linecap="round" />
        <line x1="290" y1="210" x2="340" y2="205" stroke="#000" stroke-width="4" stroke-linecap="round" />
        <line x1="290" y1="222" x2="335" y2="228" stroke="#000" stroke-width="4" stroke-linecap="round" />

        <!-- Bunny Body & Paws -->
        <ellipse cx="250" cy="315" rx="75" ry="65" fill="none" stroke="#000" stroke-width="6" />
        
        <!-- Big Carrot in Paws -->
        <polygon points="250,345 285,270 235,260" fill="none" stroke="#000" stroke-width="5" stroke-linejoin="round" />
        <line x1="248" y1="285" x2="265" y2="280" stroke="#000" stroke-width="3" />
        <line x1="252" y1="305" x2="270" y2="300" stroke="#000" stroke-width="3" />
        <!-- Carrot Leaves -->
        <path d="M 260 260 C 270 240 290 250 265 265" fill="none" stroke="#000" stroke-width="4" />
        <path d="M 255 260 C 255 235 240 240 250 262" fill="none" stroke="#000" stroke-width="4" />

        <!-- Ground Meadow -->
        <line x1="40" y1="390" x2="460" y2="390" stroke="#000" stroke-width="6" stroke-linecap="round" />

        <!-- Child Worksheet info line -->
        <text x="50" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Nama Anak: ____________________</text>
        <text x="320" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Kelas: _________</text>
      </svg>
    `
  },
  {
    id: 'kiki',
    title: 'Kiki Monster Gigi Sehat & Kinclong',
    icon: '🦷',
    svg: `
      <svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFF;">
        <text x="250" y="32" font-family="'Comic Sans MS', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#000">Kiki si Monster Bergigi Bersih</text>
        
        <!-- Monster Horns -->
        <path d="M 170 140 C 150 90 190 70 200 130" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" />
        <path d="M 330 140 C 350 90 310 70 300 130" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" />

        <!-- Monster Round Body -->
        <circle cx="250" cy="250" r="130" fill="none" stroke="#000" stroke-width="7" />

        <!-- Friendly Big Eyes -->
        <circle cx="205" cy="190" r="26" fill="none" stroke="#000" stroke-width="5" />
        <circle cx="205" cy="190" r="10" fill="#000" />
        <circle cx="295" cy="190" r="26" fill="none" stroke="#000" stroke-width="5" />
        <circle cx="295" cy="190" r="10" fill="#000" />

        <!-- Giant Open Smiling Mouth with Big Sparkling Teeth -->
        <path d="M 170 270 Q 250 350 330 270 Z" fill="none" stroke="#000" stroke-width="6" stroke-linejoin="round" />
        
        <!-- 4 Top Teeth -->
        <rect x="195" y="270" width="22" height="24" rx="4" fill="none" stroke="#000" stroke-width="4" />
        <rect x="222" y="270" width="22" height="24" rx="4" fill="none" stroke="#000" stroke-width="4" />
        <rect x="256" y="270" width="22" height="24" rx="4" fill="none" stroke="#000" stroke-width="4" />
        <rect x="283" y="270" width="22" height="24" rx="4" fill="none" stroke="#000" stroke-width="4" />

        <!-- Giant Toothbrush across bottom -->
        <rect x="90" y="395" width="320" height="25" rx="10" fill="none" stroke="#000" stroke-width="5" />
        <rect x="340" y="370" width="70" height="25" rx="6" fill="none" stroke="#000" stroke-width="4" />
        <!-- Bristles -->
        <line x1="355" y1="370" x2="355" y2="350" stroke="#000" stroke-width="4" />
        <line x1="370" y1="370" x2="370" y2="350" stroke="#000" stroke-width="4" />
        <line x1="385" y1="370" x2="385" y2="350" stroke="#000" stroke-width="4" />
        <line x1="400" y1="370" x2="400" y2="350" stroke="#000" stroke-width="4" />

        <!-- Sparkle Stars -->
        <path d="M 140 180 Q 150 180 150 170 Q 150 180 160 180 Q 150 180 150 190 Q 150 180 140 180 Z" fill="#000" />
        <path d="M 350 200 Q 360 200 360 190 Q 360 200 370 200 Q 360 200 360 210 Q 360 200 350 200 Z" fill="#000" />

        <!-- Child Worksheet info line -->
        <text x="50" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Nama Anak: ____________________</text>
        <text x="320" y="480" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#000">Kelas: _________</text>
      </svg>
    `
  }
];

var activeSheetIndex = 0;

function openPrintSheetsModal() {
  playTonePop();
  var m = document.getElementById('modal-print-sheets');
  if (m) m.classList.add('modal-active');
  renderPrintSheetModal();
  setMascotSpeech("Wah! Ada lembar gambar yang siap dicetak di kertas HVS untuk diwarnai krayon asli! 🖨️🖍️");
  speakNatural("Ini lembar mewarnai untuk dicetak di kertas asli dan diwarnai krayon!");
}

function closePrintSheetsModal() {
  playTonePop();
  var m = document.getElementById('modal-print-sheets');
  if (m) m.classList.remove('modal-active');
}

function selectColoringSheet(idx) {
  playTonePop();
  activeSheetIndex = idx;
  renderPrintSheetModal();
}

function renderPrintSheetModal() {
  var sheet = COLORING_SHEETS[activeSheetIndex];
  var previewBox = document.getElementById('print-sheet-preview-box');
  var tabsBox = document.getElementById('print-sheet-tabs-box');

  if (tabsBox) {
    tabsBox.innerHTML = COLORING_SHEETS.map(function(s, i) {
      return `
        <button class="squish-btn btn-pill" 
                style="font-size:12px; padding:6px 14px; font-weight:800; white-space:nowrap; background:${i === activeSheetIndex ? '#FF6F00' : '#FFF'}; color:${i === activeSheetIndex ? '#FFF' : '#424242'}; border:1.5px solid ${i === activeSheetIndex ? '#E65100' : '#E0E0E0'};"
                onclick="selectColoringSheet(${i})">
          ${s.icon} ${s.title.split(' ')[0]}
        </button>
      `;
    }).join('');
  }

  if (previewBox) {
    previewBox.innerHTML = sheet.svg;
  }

  // Update hidden print target paper
  var printPaper = document.getElementById('print-target-paper');
  if (printPaper) {
    printPaper.innerHTML = sheet.svg;
  }
}

// ---------------------------------------------------------
// Native 1-Click Print (Triggers browser/system print dialog)
// ---------------------------------------------------------
function triggerPrintActiveSheet() {
  playToneChime();
  var sheet = COLORING_SHEETS[activeSheetIndex];
  
  // Make sure print target is populated
  var printPaper = document.getElementById('print-target-paper');
  if (printPaper) {
    printPaper.innerHTML = sheet.svg;
  }

  setMascotSpeech("Membuka jendela cetak printer... Siapkan kertas HVS dan krayon ya! 🖨️📄✨");
  setTimeout(function() {
    window.print();
  }, 250);
}

// ---------------------------------------------------------
// Download Image as PNG (Offscreen Canvas Renderer)
// ---------------------------------------------------------
function downloadSheetAsPng() {
  playToneChime();
  var sheet = COLORING_SHEETS[activeSheetIndex];
  
  var svgData = sheet.svg.trim();
  var img = new Image();
  var svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  var url = URL.createObjectURL(svgBlob);

  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1200, 1200);
    ctx.drawImage(img, 0, 0, 1200, 1200);

    URL.revokeObjectURL(url);
    var pngUrl = canvas.toDataURL('image/png');

    var link = document.createElement('a');
    link.download = 'Mewarnai-Cetta-' + sheet.id + '.png';
    link.href = pngUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMascotSpeech("Gambar berhasil diunduh ke galeri! Siap dicetak atau dikirim via WhatsApp! 📲🎉");
    speakNatural("Gambar berhasil diunduh ke galerimu!");
  };
  img.src = url;
}

// ---------------------------------------------------------
// Open Sheet into Tracing Studio (Digital Coloring Fallback)
// ---------------------------------------------------------
function openSheetInTracingStudio() {
  closePrintSheetsModal();
  startTracingStudio('bebas');
  setMascotSpeech("Ayo warnai sketsa ini sesukamu dengan kuas pelangi di Studio Coretan! 🎨✨");
  speakNatural("Ayo warnai sesukamu di Studio Coretan!");
}
