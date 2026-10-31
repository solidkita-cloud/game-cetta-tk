// =========================================================
// JS/MUSIC.JS - STUDIO MUSIK XILOFON PELANGI
// Interactive 8-Key Xylophone, Guided Indonesian Kids Songs,
// Percussion Pads, and Audio-Visual Feedback
// =========================================================

var XYLOPHONE_KEYS = [
  { num: 1, note: 'Do', freq: 261.63, color: '#FF5252', darkColor: '#D32F2F', height: 180, label: '1 - Do' },
  { num: 2, note: 'Re', freq: 293.66, color: '#FF9800', darkColor: '#F57C00', height: 170, label: '2 - Re' },
  { num: 3, note: 'Mi', freq: 329.63, color: '#FFD600', darkColor: '#FBC02D', height: 160, label: '3 - Mi' },
  { num: 4, note: 'Fa', freq: 349.23, color: '#4CAF50', darkColor: '#388E3C', height: 150, label: '4 - Fa' },
  { num: 5, note: 'Sol', freq: 392.00, color: '#00BCD4', darkColor: '#0097A7', height: 140, label: '5 - Sol' },
  { num: 6, note: 'La', freq: 440.00, color: '#3F51B5', darkColor: '#303F9F', height: 130, label: '6 - La' },
  { num: 7, note: 'Si', freq: 493.88, color: '#9C27B0', darkColor: '#7B1FA2', height: 120, label: '7 - Si' },
  { num: 8, note: "Do'", freq: 523.25, color: '#E91E63', darkColor: '#C2185B', height: 110, label: "8 - Do'" }
];

var KIDS_SONGS = {
  balonku: {
    id: 'balonku',
    title: 'Balonku Ada Lima',
    icon: '🎈',
    desc: 'Lagu ceria balon warna-warni',
    notes: [
      { num: 3, lyric: 'Ba-' }, { num: 4, lyric: 'lon-' }, { num: 5, lyric: 'ku ' },
      { num: 1, lyric: 'a-' }, { num: 5, lyric: 'da ' }, { num: 4, lyric: 'li-' }, { num: 3, lyric: 'ma...' },
      { num: 2, lyric: 'ru-' }, { num: 3, lyric: 'pa ' }, { num: 4, lyric: 'ru-' },
      { num: 2, lyric: 'pa ' }, { num: 5, lyric: 'war-' }, { num: 4, lyric: 'na-' }, { num: 3, lyric: 'nya...' },
      { num: 4, lyric: 'hi-' }, { num: 4, lyric: 'jau ' }, { num: 3, lyric: 'ku-' },
      { num: 3, lyric: 'ning ' }, { num: 2, lyric: 'ke-' }, { num: 2, lyric: 'la-' }, { num: 5, lyric: 'bu...' },
      { num: 6, lyric: 'me-' }, { num: 5, lyric: 'rah ' }, { num: 4, lyric: 'mu-' },
      { num: 3, lyric: 'da ' }, { num: 2, lyric: 'dan ' }, { num: 1, lyric: 'bi-' }, { num: 1, lyric: 'ru! 🎉' }
    ]
  },
  bintang: {
    id: 'bintang',
    title: 'Bintang Kecil',
    icon: '⭐',
    desc: 'Bintang tinggi di langit biru',
    notes: [
      { num: 1, lyric: 'Bin-' }, { num: 1, lyric: 'tang ' }, { num: 5, lyric: 'ke-' }, { num: 5, lyric: 'cil ' },
      { num: 6, lyric: 'di ' }, { num: 6, lyric: 'la-' }, { num: 5, lyric: 'ngit ' }, { num: 5, lyric: 'ting-' }, { num: 4, lyric: 'gi...' },
      { num: 3, lyric: 'a-' }, { num: 3, lyric: 'mat ' }, { num: 2, lyric: 'ba-' }, { num: 2, lyric: 'nyak ' },
      { num: 1, lyric: 'meng-' }, { num: 1, lyric: 'hi-' }, { num: 5, lyric: 'as ' }, { num: 4, lyric: 'ang-' }, { num: 3, lyric: 'ka-' }, { num: 2, lyric: 'sa...' },
      { num: 1, lyric: 'a-' }, { num: 1, lyric: 'ku ' }, { num: 5, lyric: 'in-' }, { num: 5, lyric: 'gin ' },
      { num: 6, lyric: 'ter-' }, { num: 6, lyric: 'bang ' }, { num: 5, lyric: 'dan ' }, { num: 4, lyric: 'me-' }, { num: 3, lyric: 'na-' }, { num: 2, lyric: 'ri...' },
      { num: 1, lyric: 'jauh ' }, { num: 5, lyric: 'ting-' }, { num: 3, lyric: 'gi ' },
      { num: 4, lyric: 'ke ' }, { num: 2, lyric: 'tem-' }, { num: 1, lyric: 'pat ' }, { num: 1, lyric: 'kau ' }, { num: 1, lyric: 'be-' }, { num: 1, lyric: 'ra-' }, { num: 1, lyric: 'da! ✨' }
    ]
  },
  pelangi: {
    id: 'pelangi',
    title: 'Pelangi-Pelangi',
    icon: '🌈',
    desc: 'Alangkah indah lukisan Tuhan',
    notes: [
      { num: 5, lyric: 'Pe-' }, { num: 3, lyric: 'la-' }, { num: 5, lyric: 'ngi ' },
      { num: 5, lyric: 'pe-' }, { num: 3, lyric: 'la-' }, { num: 5, lyric: 'ngi ' },
      { num: 6, lyric: 'a-' }, { num: 5, lyric: 'lang-' }, { num: 4, lyric: 'kah ' }, { num: 3, lyric: 'in-' }, { num: 2, lyric: 'dah-' }, { num: 1, lyric: 'mu...' },
      { num: 2, lyric: 'me-' }, { num: 3, lyric: 'rah ' }, { num: 4, lyric: 'ku-' }, { num: 2, lyric: 'ning ' },
      { num: 3, lyric: 'hi-' }, { num: 4, lyric: 'jau ' }, { num: 5, lyric: 'di ' }, { num: 6, lyric: 'la-' }, { num: 5, lyric: 'ngit ' }, { num: 4, lyric: 'bi-' }, { num: 3, lyric: 'ru...' },
      { num: 5, lyric: 'pe-' }, { num: 3, lyric: 'lu-' }, { num: 5, lyric: 'kis-' }, { num: 5, lyric: 'mu ' },
      { num: 6, lyric: 'a-' }, { num: 5, lyric: 'gung ' }, { num: 4, lyric: 'sia-' }, { num: 3, lyric: 'pa ' }, { num: 2, lyric: 'ge-' }, { num: 1, lyric: 'rang-' }, { num: 2, lyric: 'an...' },
      { num: 5, lyric: 'pe-' }, { num: 3, lyric: 'la-' }, { num: 5, lyric: 'ngi ' },
      { num: 6, lyric: 'cip-' }, { num: 5, lyric: 'ta-' }, { num: 4, lyric: 'an ' }, { num: 3, lyric: 'Tu-' }, { num: 2, lyric: 'han! 🌈' }
    ]
  },
  cicak: {
    id: 'cicak',
    title: 'Cicak di Dinding',
    icon: '🦎',
    desc: 'Diam-diam merayap, Hap!',
    notes: [
      { num: 5, lyric: 'Ci-' }, { num: 3, lyric: 'cak ' }, { num: 5, lyric: 'ci-' }, { num: 3, lyric: 'cak ' },
      { num: 6, lyric: 'di ' }, { num: 5, lyric: 'din-' }, { num: 4, lyric: 'ding...' },
      { num: 4, lyric: 'di-' }, { num: 2, lyric: 'am ' }, { num: 4, lyric: 'di-' }, { num: 2, lyric: 'am ' },
      { num: 5, lyric: 'me-' }, { num: 4, lyric: 'ra-' }, { num: 3, lyric: 'yap...' },
      { num: 5, lyric: 'da-' }, { num: 1, lyric: 'tang ' }, { num: 3, lyric: 'se-' }, { num: 2, lyric: 'e-' },
      { num: 4, lyric: 'kor ' }, { num: 3, lyric: 'nya-' }, { num: 2, lyric: 'muk...' },
      { num: 5, lyric: 'HAP! 💥 ' }, { num: 3, lyric: 'la-' }, { num: 2, lyric: 'lu ' },
      { num: 1, lyric: 'di-' }, { num: 1, lyric: 'tang-' }, { num: 1, lyric: 'kap! 🦎' }
    ]
  }
};

var musicState = {
  currentMode: 'bebas', // 'bebas' or songId ('balonku', 'bintang', etc.)
  songNoteIndex: 0,
  isPlayingDemo: false,
  totalNotesPlayed: 0
};

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openMusicStudio() {
  goToScene('music');
  setMascotSpeech("Ayo main Xilofon Pelangi! Kamu bisa ikuti bintang atau main sesukamu! 🎵🌈");
  speakNatural("Ayo main Xilofon Pelangi! Tekan tuts warna-warni yang kamu suka ya!");
  renderXylophoneStage();
}

function exitMusicToMap() {
  goToScene('map');
}

// ---------------------------------------------------------
// Render Xylophone UI
// ---------------------------------------------------------
function renderXylophoneStage() {
  var container = document.getElementById('music-stage-container');
  if (!container) return;

  var currentSong = KIDS_SONGS[musicState.currentMode] || null;

  var html = `
    <!-- Song / Mode Selector Pills -->
    <div style="display:flex; gap:8px; overflow-x:auto; padding:6px 4px 10px; scrollbar-width:none; -webkit-overflow-scrolling:touch;">
      <button class="squish-btn music-mode-btn ${musicState.currentMode === 'bebas' ? 'mode-active' : ''}" 
              onclick="selectMusicMode('bebas')">
        🎨 Mode Bebas
      </button>
      <button class="squish-btn music-mode-btn ${musicState.currentMode === 'balonku' ? 'mode-active' : ''}" 
              onclick="selectMusicMode('balonku')">
        🎈 Balonku
      </button>
      <button class="squish-btn music-mode-btn ${musicState.currentMode === 'bintang' ? 'mode-active' : ''}" 
              onclick="selectMusicMode('bintang')">
        ⭐ Bintang Kecil
      </button>
      <button class="squish-btn music-mode-btn ${musicState.currentMode === 'pelangi' ? 'mode-active' : ''}" 
              onclick="selectMusicMode('pelangi')">
        🌈 Pelangi
      </button>
      <button class="squish-btn music-mode-btn ${musicState.currentMode === 'cicak' ? 'mode-active' : ''}" 
              onclick="selectMusicMode('cicak')">
        🦎 Cicak
      </button>
    </div>

    <!-- Interactive Song Lyric / Guidance Card -->
    <div id="music-guide-box" style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2px solid #FFE082; display:flex; align-items:center; justify-content:space-between; min-height:56px;">
      <div style="flex:1; text-align:left;">
        ${currentSong ? `
          <div style="font-size:11px; font-weight:800; color:#E65100; text-transform:uppercase; letter-spacing:0.5px;">
            ${currentSong.icon} ${currentSong.title} (Nada ${musicState.songNoteIndex + 1}/${currentSong.notes.length})
          </div>
          <div id="music-current-lyric" style="font-size:18px; font-weight:900; color:#2E7D32; margin-top:2px; transition:all 0.2s ease;">
            "${currentSong.notes[musicState.songNoteIndex].lyric}"
          </div>
        ` : `
          <div style="font-size:11px; font-weight:800; color:#7B1FA2; text-transform:uppercase;">
            🎶 Mode Bebas Ceria
          </div>
          <div id="music-current-lyric" style="font-size:15px; font-weight:800; color:#424242; margin-top:2px;">
            Sentuh nada pelangi dan buat melodimu sendiri! ✨
          </div>
        `}
      </div>
      
      ${currentSong ? `
        <button class="squish-btn btn-pill" style="background:#FFF8E1; border:1.5px solid #FFCA28; color:#E65100; font-size:12px; padding:6px 12px; font-weight:800;" onclick="listenSongDemo()">
          ▶️ Contoh Nada
        </button>
      ` : ''}
    </div>

    <!-- The 8-Key Xylophone Frame -->
    <div style="background:linear-gradient(180deg, #D7CCC8, #A1887F); border-radius:22px; padding:14px 10px; border:4px solid #6D4C41; box-shadow:0 8px 20px rgba(0,0,0,0.15); margin-bottom:14px; position:relative;">
      <!-- Screw Bar Accents -->
      <div style="position:absolute; top:28px; left:12px; right:12px; height:6px; background:#4E342E; border-radius:3px; opacity:0.3; z-index:1;"></div>
      <div style="position:absolute; bottom:28px; left:12px; right:12px; height:6px; background:#4E342E; border-radius:3px; opacity:0.3; z-index:1;"></div>

      <div style="display:flex; justify-content:space-between; align-items:flex-end; height:195px; position:relative; z-index:2; gap:6px;">
        ${XYLOPHONE_KEYS.map(function(k) {
          var isTarget = currentSong && (currentSong.notes[musicState.songNoteIndex].num === k.num);
          return `
            <div id="xylo-key-${k.num}" 
                 class="squish-btn xylo-bar ${isTarget ? 'xylo-target-glow' : ''}" 
                 style="flex:1; height:${k.height}px; background:linear-gradient(180deg, ${k.color}, ${k.darkColor}); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:10px 0; color:#FFF; box-shadow:0 6px 0 ${k.darkColor}, 0 8px 12px rgba(0,0,0,0.15); cursor:pointer; user-select:none; -webkit-user-select:none; touch-action:manipulation;"
                 onclick="tapXyloKey(${k.num})">
              
              <!-- Top Screw -->
              <div style="width:10px; height:10px; border-radius:50%; background:#FFF; opacity:0.75; box-shadow:inset 0 1px 2px rgba(0,0,0,0.3);"></div>
              
              <!-- Target Star Indicator -->
              ${isTarget ? '<div class="xylo-star-hint">⭐</div>' : '<div style="height:20px;"></div>'}
              
              <!-- Note Label -->
              <div style="text-align:center; line-height:1.1;">
                <div style="font-size:18px; font-weight:900; text-shadow:0 1px 2px rgba(0,0,0,0.3);">${k.num}</div>
                <div style="font-size:11px; font-weight:700; opacity:0.9;">${k.note}</div>
              </div>

              <!-- Bottom Screw -->
              <div style="width:10px; height:10px; border-radius:50%; background:#FFF; opacity:0.75; box-shadow:inset 0 1px 2px rgba(0,0,0,0.3);"></div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- 3 Percussion Accents for Fun Beat Making -->
    <div style="display:flex; gap:10px; justify-content:center; align-items:center;">
      <button class="squish-btn percussion-pad" style="background:#FFE0B2; border-color:#FF9800; color:#E65100;" onclick="tapPercussion('bass')">
        <span style="font-size:22px;">🥁</span>
        <span>Dug Bass</span>
      </button>
      <button class="squish-btn percussion-pad" style="background:#E1BEE7; border-color:#8E24AA; color:#4A148C;" onclick="tapPercussion('clap')">
        <span style="font-size:22px;">👏</span>
        <span>Tepuk</span>
      </button>
      <button class="squish-btn percussion-pad" style="background:#FFF9C4; border-color:#FBC02D; color:#F57F17;" onclick="tapPercussion('triangle')">
        <span style="font-size:22px;">🔔</span>
        <span>Ting!</span>
      </button>
    </div>
  `;

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Mode & Song Selection
// ---------------------------------------------------------
function selectMusicMode(modeId) {
  playTonePop();
  musicState.currentMode = modeId;
  musicState.songNoteIndex = 0;
  
  if (modeId === 'bebas') {
    setMascotSpeech("Mode Bebas! Ayo mainkan melodimu sesuka hati! 🎶✨");
  } else {
    var song = KIDS_SONGS[modeId];
    setMascotSpeech("Ayo main lagu " + song.title + "! Tekan tuts yang ada bintangnya ⭐ ya!");
    speakNatural("Tekan tuts yang ada bintangnya ya!");
  }
  
  renderXylophoneStage();
}

// ---------------------------------------------------------
// Tap Key Interaction
// ---------------------------------------------------------
function tapXyloKey(keyNum) {
  var keyData = XYLOPHONE_KEYS.find(function(k) { return k.num === keyNum; });
  if (!keyData) return;

  // 1. Play Synthesized Sound
  playXylophoneKey(keyData.freq);

  // 2. Physical Key Bounce Animation
  var el = document.getElementById('xylo-key-' + keyNum);
  if (el) {
    el.classList.add('xylo-key-pressed');
    setTimeout(function() {
      el.classList.remove('xylo-key-pressed');
    }, 150);
  }

  // 3. Spawn Floating Musical Note Particle
  spawnFloatingMusicNote(keyData.color, el);

  musicState.totalNotesPlayed++;

  // 4. Guided Song Logic
  if (musicState.currentMode !== 'bebas') {
    var song = KIDS_SONGS[musicState.currentMode];
    if (song) {
      var targetNote = song.notes[musicState.songNoteIndex];
      
      // If child hit the target note
      if (keyNum === targetNote.num) {
        musicState.songNoteIndex++;

        // Check if finished entire song
        if (musicState.songNoteIndex >= song.notes.length) {
          triggerSongCompleted(song);
          return;
        } else {
          // Re-render to highlight next note and lyric
          renderXylophoneStage();
        }
      }
    }
  }
}

// ---------------------------------------------------------
// Floating Note Particle Effect
// ---------------------------------------------------------
function spawnFloatingMusicNote(color, keyElement) {
  if (!keyElement) return;
  var rect = keyElement.getBoundingClientRect();
  var symbols = ['🎵', '🎶', '⭐', '✨'];
  var sym = symbols[Math.floor(Math.random() * symbols.length)];

  var note = document.createElement('div');
  note.className = 'floating-music-particle';
  note.textContent = sym;
  note.style.left = (rect.left + rect.width / 2 - 12) + 'px';
  note.style.top = (rect.top - 10) + 'px';
  note.style.color = color;

  document.body.appendChild(note);

  setTimeout(function() {
    if (note.parentNode) note.parentNode.removeChild(note);
  }, 1000);
}

// ---------------------------------------------------------
// Percussion Pad Tap
// ---------------------------------------------------------
function tapPercussion(type) {
  playPercussion(type);
  var padEl = event.currentTarget;
  if (padEl) {
    padEl.classList.add('percussion-pressed');
    setTimeout(function() { padEl.classList.remove('percussion-pressed'); }, 150);
  }
}

// ---------------------------------------------------------
// Listen Demo Melody (Plays 6 notes preview)
// ---------------------------------------------------------
function listenSongDemo() {
  var song = KIDS_SONGS[musicState.currentMode];
  if (!song || musicState.isPlayingDemo) return;
  
  musicState.isPlayingDemo = true;
  var demoNotes = song.notes.slice(0, 8); // preview first 8 notes

  demoNotes.forEach(function(item, idx) {
    setTimeout(function() {
      var k = XYLOPHONE_KEYS.find(function(x) { return x.num === item.num; });
      if (k) {
        playXylophoneKey(k.freq);
        var el = document.getElementById('xylo-key-' + k.num);
        if (el) {
          el.classList.add('xylo-key-pressed');
          setTimeout(function() { el.classList.remove('xylo-key-pressed'); }, 180);
        }
      }
      if (idx === demoNotes.length - 1) {
        musicState.isPlayingDemo = false;
      }
    }, idx * 360);
  });
}

// ---------------------------------------------------------
// Song Completed Celebration
// ---------------------------------------------------------
function triggerSongCompleted(song) {
  playToneFanfare();
  if (typeof addProfileStars === 'function') addProfileStars(2);
  if (typeof addGameStars === 'function') addGameStars(2);
  
  var mascotName = (window.gameState && window.gameState.selectedMascot === 'pandi') ? 'Pandi' : 'Miko';
  setMascotSpeech("HEBAT! Kamu berhasil memainkan lagu " + song.title + "! Dapat 2 Bintang! ⭐⭐🎉");
  speakNatural("Hebat sekali! Kamu berhasil memainkan lagu " + song.title + "!");

  // Trigger celebration modal
  var box = document.getElementById('music-guide-box');
  if (box) {
    box.innerHTML = `
      <div style="text-align:center; width:100%; padding:6px 0;">
        <div style="font-size:24px;">🎉 ⭐ 🎈 ⭐ 🌈</div>
        <div style="font-size:18px; font-weight:900; color:#2E7D32;">HEBAT! LAGU SELESAI!</div>
        <div style="font-size:13px; font-weight:700; color:#558B2F; margin-top:2px;">Kamu dapat +2 Bintang Musik!</div>
        <button class="squish-btn btn-primary btn-pill" style="margin-top:8px; font-size:13px; padding:6px 18px;" onclick="musicState.songNoteIndex=0; renderXylophoneStage();">
          Mainkan Lagi 🔄
        </button>
      </div>
    `;
  }

  // Trigger confetti if available
  if (typeof triggerConfetti === 'function') {
    triggerConfetti();
  }
}
