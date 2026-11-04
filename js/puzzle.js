// =========================================================
// JS/PUZZLE.JS - PUZZLE POTONGAN GAMBAR CERIA (4-PIECE JIGSAW)
// Visual Spatial Logic, Hand-Eye Coordination for Preschoolers
// =========================================================

var PUZZLE_GALLERY = [
  {
    id: 'pandi',
    title: 'Pandi si Panda Ceria',
    icon: '🐼',
    themeColor: '#4CAF50',
    pieces: [
      { id: 0, pos: 'Kiri Atas', label: 'Telinga Kiri & Bambu', icon: '🎋🐼', symbol: '1' },
      { id: 1, pos: 'Kanan Atas', label: 'Telinga Kanan & Bintang', icon: '🐼⭐', symbol: '2' },
      { id: 2, pos: 'Kiri Bawah', label: 'Tangan Kiri & Kaus Hijau', icon: '🐾👕', symbol: '3' },
      { id: 3, pos: 'Kanan Bawah', label: 'Kaki & Bunga Ceria', icon: '🌸🐾', symbol: '4' }
    ]
  },
  {
    id: 'kiko',
    title: 'Kiko si Rintik & Pelangi',
    icon: '🌧️',
    themeColor: '#0288D1',
    pieces: [
      { id: 0, pos: 'Kiri Atas', label: 'Awan Putih Senyum', icon: '☁️💧', symbol: '1' },
      { id: 1, pos: 'Kanan Atas', label: 'Lengkung Pelangi', icon: '🌈✨', symbol: '2' },
      { id: 2, pos: 'Kiri Bawah', label: 'Rintik Kiko Bahagia', icon: '💧🌱', symbol: '3' },
      { id: 3, pos: 'Kanan Bawah', label: 'Bunga Segar Mekar', icon: '🌷🍀', symbol: '4' }
    ]
  },
  {
    id: 'bus',
    title: 'Bus Petualangan Cetta',
    icon: '🚌',
    themeColor: '#FF9800',
    pieces: [
      { id: 0, pos: 'Kiri Atas', label: 'Kaca Belakang Bus', icon: '🚌🪟', symbol: '1' },
      { id: 1, pos: 'Kanan Atas', label: 'Supir Pandi & Lampu', icon: '🐼🚨', symbol: '2' },
      { id: 2, pos: 'Kiri Bawah', label: 'Roda Belakang & Jalan', icon: '🛞🛣️', symbol: '3' },
      { id: 3, pos: 'Kanan Bawah', label: 'Roda Depan & Bumper', icon: '🛣️🛞', symbol: '4' }
    ]
  },
  {
    id: 'kelinci',
    title: 'Kelinci di Kebun Bunga',
    icon: '🐰',
    themeColor: '#8E24AA',
    pieces: [
      { id: 0, pos: 'Kiri Atas', label: 'Telinga Panjang Pink', icon: '🐰🥕', symbol: '1' },
      { id: 1, pos: 'Kanan Atas', label: 'Kupu-Kupu & Matahari', icon: '🦋☀️', symbol: '2' },
      { id: 2, pos: 'Kiri Bawah', label: 'Kebun Wortel Segar', icon: '🥕🌱', symbol: '3' },
      { id: 3, pos: 'Kanan Bawah', label: 'Kaki Gemoy & Bunga', icon: '🌻🐾', symbol: '4' }
    ]
  }
];

var puzzleState = {
  currentPuzzleIdx: 0,
  placedPieces: [false, false, false, false],
  selectedTrayPiece: null,
  isCompleted: false
};

function openPuzzleStudio() {
  goToScene('puzzle');
  setMascotSpeech("Ayo susun potongan puzzle ceria! Pasangkan 4 keping puzzle sampai gambarnya utuh! 🧩✨");
  speakNatural("Ayo susun potongan puzzle sampai utuh!");
  puzzleState.currentPuzzleIdx = 0;
  loadActivePuzzle();
}

function exitPuzzleToMap() {
  goToScene('map');
}

function selectPuzzleTheme(idx) {
  playTonePop();
  puzzleState.currentPuzzleIdx = idx;
  loadActivePuzzle();
}

function loadActivePuzzle() {
  puzzleState.placedPieces = [false, false, false, false];
  puzzleState.selectedTrayPiece = null;
  puzzleState.isCompleted = false;
  renderPuzzleStage();
}

function renderPuzzleStage() {
  var container = document.getElementById('puzzle-stage-container');
  if (!container) return;

  var p = PUZZLE_GALLERY[puzzleState.currentPuzzleIdx];

  var html = `
    <!-- Puzzle Theme Selector Tabs -->
    <div style="display:flex; gap:8px; overflow-x:auto; padding:2px 2px 10px; scrollbar-width:none;">
      ${PUZZLE_GALLERY.map(function(item, idx) {
        var isSel = (idx === puzzleState.currentPuzzleIdx);
        return `
          <button class="squish-btn btn-pill" 
                  style="font-size:12px; padding:6px 14px; font-weight:800; white-space:nowrap; background:${isSel ? item.themeColor : '#FFF'}; color:${isSel ? '#FFF' : '#333'}; border:1.5px solid ${item.themeColor};"
                  onclick="selectPuzzleTheme(${idx})">
            ${item.icon} ${item.title.split(' ')[0]}
          </button>
        `;
      }).join('')}
    </div>

    <!-- Instructions / Progress Header -->
    <div style="background:#FFFFFF; border-radius:18px; padding:8px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2.5px solid ${p.themeColor}; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:12px; font-weight:800; color:${p.themeColor}; text-transform:uppercase;">
          Puzzle 4 Keping
        </div>
        <div style="font-size:15px; font-weight:900; color:#37474F;">
          ${p.title}
        </div>
      </div>
      <div style="font-size:13px; font-weight:900; background:#ECEFF1; color:#37474F; padding:4px 12px; border-radius:12px;">
        🧩 ${puzzleState.placedPieces.filter(Boolean).length} / 4 Terpasang
      </div>
    </div>

    <!-- The 2x2 Target Jigsaw Board -->
    <div id="puzzle-board" 
         style="width:260px; height:260px; margin:0 auto 14px; background:#ECEFF1; border-radius:24px; border:4px dashed ${p.themeColor}; padding:6px; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:6px; box-shadow:0 8px 20px rgba(0,0,0,0.08); position:relative;">
      ${[0, 1, 2, 3].map(function(slotIdx) {
        var isPlaced = puzzleState.placedPieces[slotIdx];
        var pieceData = p.pieces[slotIdx];
        return `
          <div id="puzzle-slot-${slotIdx}" 
               class="puzzle-slot ${isPlaced ? 'slot-placed' : ''}" 
               style="background:${isPlaced ? '#FFFFFF' : 'rgba(255,255,255,0.45)'}; border-radius:16px; border:2px solid ${isPlaced ? p.themeColor : '#CFD8DC'}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative; overflow:hidden;"
               onclick="tapPuzzleSlot(${slotIdx})">
            
            ${isPlaced ? `
              <div style="font-size:38px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15));" class="anim-squish">
                ${pieceData.icon}
              </div>
              <div style="font-size:10px; font-weight:800; color:${p.themeColor}; margin-top:2px;">
                ${pieceData.pos}
              </div>
            ` : `
              <div style="font-size:24px; opacity:0.35;">🧩</div>
              <div style="font-size:10px; font-weight:700; color:#9E9E9E; margin-top:2px;">
                ${pieceData.pos}
              </div>
            `}
          </div>
        `;
      }).join('')}
    </div>

    <!-- Bottom Piece Tray / Available Pieces -->
    <div style="background:#FFFFFF; border-radius:20px; padding:12px; border:2px solid #E0E0E0; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
      <div style="font-size:12px; font-weight:800; color:#546E7A; margin-bottom:8px; text-align:center;">
        ${puzzleState.isCompleted ? '✨ HOREE! PUZZLE SELESAI SEMPURNA! ✨' : 'Sentuh potongan di bawah untuk memasang ke kotak: 👇'}
      </div>

      <div style="display:flex; justify-content:center; gap:8px;">
        ${[0, 1, 2, 3].map(function(idx) {
          var isPlaced = puzzleState.placedPieces[idx];
          var pieceData = p.pieces[idx];
          return `
            <div id="tray-piece-${idx}" 
                 class="squish-btn tray-piece-card ${isPlaced ? 'tray-piece-used' : ''}" 
                 style="flex:1; max-width:68px; height:68px; background:${isPlaced ? '#ECEFF1' : '#FFF9C4'}; border-radius:14px; border:2px solid ${isPlaced ? '#CFD8DC' : '#FBC02D'}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:${isPlaced ? 'default' : 'pointer'}; opacity:${isPlaced ? '0.35' : '1'};"
                 onclick="${isPlaced ? '' : `tapTrayPiece(${idx})`}">
              <div style="font-size:26px;">${pieceData.icon}</div>
              <div style="font-size:10px; font-weight:800; color:#E65100;">${pieceData.symbol}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Tap Interactions (Touch-Friendly Snap)
// ---------------------------------------------------------
function tapTrayPiece(pieceIdx) {
  playTonePop();
  // Automatically place this piece into its matching slot with delightful animation!
  placePieceIntoSlot(pieceIdx);
}

function tapPuzzleSlot(slotIdx) {
  if (puzzleState.placedPieces[slotIdx]) return;
  // If slot tapped and piece not yet placed, place it!
  playTonePop();
  placePieceIntoSlot(slotIdx);
}

function placePieceIntoSlot(idx) {
  if (puzzleState.placedPieces[idx]) return;

  puzzleState.placedPieces[idx] = true;
  playToneChime();

  // Re-render
  renderPuzzleStage();

  // Check if all 4 pieces placed
  var allPlaced = puzzleState.placedPieces.every(Boolean);
  if (allPlaced && !puzzleState.isCompleted) {
    puzzleState.isCompleted = true;
    triggerPuzzleCompleted();
  }
}

function triggerPuzzleCompleted() {
  playToneFanfare();
  if (typeof addProfileStars === 'function') addProfileStars(2);
  if (typeof addGameStars === 'function') addGameStars(2);

  var p = PUZZLE_GALLERY[puzzleState.currentPuzzleIdx];
  setMascotSpeech("HEBAT! Gambar " + p.title + " sudah tersusun rapi! Kamu dapat +2 Bintang! 🧩⭐🎉");
  speakNatural("Hebat sekali! Gambarnya sudah tersusun rapi!");

  var board = document.getElementById('puzzle-board');
  if (board) {
    board.style.border = '4px solid #4CAF50';
    board.style.boxShadow = '0 0 24px rgba(76, 175, 80, 0.6)';
  }

  if (typeof triggerConfetti === 'function') triggerConfetti();
}
