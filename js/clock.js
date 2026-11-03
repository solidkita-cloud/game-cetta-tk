// =========================================================
// JS/CLOCK.JS - WAHANA JAM DINDING KUKUK CETTA
// Learn to read analog clock hours connected to daily routines.
// Procedural Generation (Never Repeats) + Cuckoo Bird Surprise!
// =========================================================

var clockState = {
  mode: 'tebak', // 'tebak' or 'putar'
  currentQuestion: null,
  recentHours: [],
  isProcessing: false,
  freeHour: 7
};

var ROUTINE_HOURS = {
  6: { hour: 6, label: '06.00 Pagi', title: 'Bangun Pagi & Mandi Segar', desc: 'Matahari terbit, Cetta bangun dan merapikan kasur!', emoji: '🌅' },
  7: { hour: 7, label: '07.00 Pagi', title: 'Berangkat ke Sekolah TK', desc: 'Pakai seragam rapi dan tas sekolah, pamit pada Ibu!', emoji: '🎒' },
  8: { hour: 8, label: '08.00 Pagi', title: 'Belajar & Menyanyi di Kelas', desc: 'Bernyanyi dan mengenal huruf bersama Bu Guru!', emoji: '✏️' },
  9: { hour: 9, label: '09.00 Pagi', title: 'Senam Ceria di Halaman', desc: 'Gerakkan badan agar sehat dan bugar bersama teman!', emoji: '🤸' },
  10: { hour: 10, label: '10.00 Pagi', title: 'Makan Bekal Buah Sehat', desc: 'Cuci tangan dulu, lalu nikmati bekal dari rumah!', emoji: '🥪' },
  11: { hour: 11, label: '11.00 Siang', title: 'Mendengarkan Dongeng Ceria', desc: 'Bu Guru membacakan kisah hewan yang bijaksana!', emoji: '📖' },
  12: { hour: 12, label: '12.00 Siang', title: 'Makan Siang & Siap Pulang', desc: 'Makan nasi sayur hangat bersama keluarga!', emoji: '🍽️' },
  1: { hour: 1, label: '01.00 Siang', title: 'Tidur Siang Nyenyak', desc: 'Istirahat sejenak agar tubuh kembali segar!', emoji: '😴' },
  4: { hour: 4, label: '04.00 Sore', title: 'Main Sepeda di Taman', desc: 'Sore hari yang sejuk, gowes sepeda bersama teman!', emoji: '🚲' },
  5: { hour: 5, label: '05.00 Sore', title: 'Mandi Sore & Siram Bunga', desc: 'Mandi wangi pakai sabun dan siram kebun!', emoji: '🚿' },
  77: { hour: 7, label: '07.00 Malam', title: 'Belajar & Mengaji Malam', desc: 'Membaca doa dan mengulang pelajaran sekolah!', emoji: '📚' },
  88: { hour: 8, label: '08.00 Malam', title: 'Tidur Malam Nyenyak', desc: 'Bintang bersinar di langit, selamat tidur Cetta!', emoji: '🌙' }
};

var AVAILABLE_HOURS = [6, 7, 8, 9, 10, 11, 12, 1, 4, 5];

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openClockStudio() {
  goToScene('clock');
  setMascotSpeech("Tik-tok-tik-tok! Selamat datang di Jam Dinding Kukuk! Ayo belajar membaca jam ya! ⏰🐥");
  speakNatural("Selamat datang di Jam Dinding Cetta! Ayo kita belajar membaca jam!");
  clockState.recentHours = [];
  generateNewClockProblem();
}

function exitClockToMap() {
  goToScene('map');
}

function switchClockMode(newMode) {
  playTonePop();
  clockState.mode = newMode;
  if (newMode === 'tebak') {
    generateNewClockProblem();
  } else {
    renderClockStage();
  }
}

// ---------------------------------------------------------
// Procedural Random Clock Problem Generator
// ---------------------------------------------------------
function generateNewClockProblem() {
  clockState.isProcessing = false;

  var pool = AVAILABLE_HOURS.slice();
  // Filter out recently used hours
  var filtered = pool.filter(function(h) {
    return clockState.recentHours.indexOf(h) === -1;
  });
  if (filtered.length === 0) {
    clockState.recentHours = [];
    filtered = pool;
  }

  var targetHour = filtered[Math.floor(Math.random() * filtered.length)];
  clockState.recentHours.push(targetHour);
  if (clockState.recentHours.length > 4) clockState.recentHours.shift();

  var routine = ROUTINE_HOURS[targetHour] || ROUTINE_HOURS[7];

  // Generate 4 shuffled options
  var opts = [targetHour];
  while (opts.length < 4) {
    var cand = Math.floor(Math.random() * 12) + 1; // 1..12
    if (opts.indexOf(cand) === -1) {
      opts.push(cand);
    }
  }
  opts.sort(function() { return Math.random() - 0.5; });

  clockState.currentQuestion = {
    targetHour: targetHour,
    routine: routine,
    options: opts
  };

  renderClockStage();
}

// ---------------------------------------------------------
// Render Clock Stage UI
// ---------------------------------------------------------
function renderClockStage() {
  var container = document.getElementById('clock-stage-container');
  if (!container) return;

  var isTebak = (clockState.mode === 'tebak');
  var q = clockState.currentQuestion || { targetHour: 7, routine: ROUTINE_HOURS[7], options: [6, 7, 8, 9] };
  var displayHour = isTebak ? q.targetHour : clockState.freeHour;
  var routine = isTebak ? q.routine : (ROUTINE_HOURS[displayHour] || { label: 'Jam ' + displayHour + '.00', title: 'Waktu Bermain Ceria', desc: 'Ayo lihat jarum jamnya!', emoji: '✨' });

  var html = `
    <!-- Mode Tabs -->
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:10px;">
      <button class="squish-btn clock-tab-btn ${isTebak ? 'tab-active' : ''}" onclick="switchClockMode('tebak')">
        ⏰ Tebak Jam & Rutinitas
      </button>
      <button class="squish-btn clock-tab-btn ${!isTebak ? 'tab-active' : ''}" onclick="switchClockMode('putar')">
        🔄 Putar Jarum Bebas
      </button>
    </div>

    <!-- Routine Context Banner -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2.5px solid #C5CAE9; display:flex; align-items:center; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:36px;">${routine.emoji}</span>
        <div>
          <div style="font-size:12px; font-weight:800; color:#3F51B5; text-transform:uppercase;">
            ${routine.title}
          </div>
          <div style="font-size:14px; font-weight:700; color:#424242;">
            ${routine.desc}
          </div>
        </div>
      </div>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 12px; background:#E8EAF6; color:#283593; border:1.5px solid #9FA8DA; font-weight:800;" onclick="readClockQuestionAloud()">
        🔊 Suara
      </button>
    </div>

    <!-- The Cuckoo Clock Frame & SVG Dial -->
    <div style="background:linear-gradient(180deg, #8D6E63, #5D4037); border-radius:26px; padding:18px 12px 22px; border:4px solid #3E2723; box-shadow:0 8px 24px rgba(0,0,0,0.15); text-align:center; position:relative; overflow:hidden;">
      
      <!-- Cuckoo Bird Little Attic Door -->
      <div id="cuckoo-attic" style="display:inline-flex; align-items:center; justify-content:center; width:80px; height:44px; background:#4E342E; border-radius:14px 14px 0 0; border:2px solid #3E2723; margin-bottom:-4px; position:relative; z-index:3;">
        <div id="cuckoo-bird-pop" style="font-size:26px; transition:transform 0.3s ease; transform:scale(0);">
          🐥
        </div>
      </div>

      <!-- Analog Clock Face -->
      <div style="width:230px; height:230px; margin:0 auto; position:relative;">
        ${renderAnalogClockSvg(displayHour)}
      </div>

      <!-- Jarum Color Legend -->
      <div style="display:flex; justify-content:center; gap:16px; margin-top:12px; font-size:12px; font-weight:800; color:#FFF; text-shadow:0 1px 2px rgba(0,0,0,0.4);">
        <span style="display:flex; align-items:center; gap:4px;">
          <span style="display:inline-block; width:12px; height:12px; background:#E53935; border-radius:3px;"></span>
          Jarum Pendek: Jam
        </span>
        <span style="display:flex; align-items:center; gap:4px;">
          <span style="display:inline-block; width:12px; height:12px; background:#1E88E5; border-radius:3px;"></span>
          Jarum Panjang: Menit
        </span>
      </div>

    </div>

    <!-- Interactive Options or Adjuster Controls -->
    ${isTebak ? `
      <!-- Question Prompt -->
      <div style="text-align:center; margin:14px 0 8px; font-size:16px; font-weight:900; color:#283593;">
        Jarum jam di atas menunjuk pukul berapa ya? 👇
      </div>

      <!-- Shuffled 4 Choices Grid -->
      <div class="options-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        ${q.options.map(function(opt) {
          var label = (opt < 10 ? '0' : '') + opt + '.00';
          return `
            <button class="squish-btn option-btn" 
                    style="font-size:20px; font-weight:900; padding:12px 0; border-radius:18px;" 
                    onclick="handleClockAnswer(this, ${opt})">
              Jam ${label}
            </button>
          `;
        }).join('')}
      </div>
    ` : `
      <!-- Free Hour Dial Buttons -->
      <div style="text-align:center; margin:14px 0 8px; font-size:15px; font-weight:800; color:#283593;">
        Pilih angka untuk memutar jarum jam:
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function(h) {
          return `
            <button class="squish-btn btn-pill" 
                    style="font-size:14px; font-weight:900; padding:8px 14px; background:${h === clockState.freeHour ? '#3F51B5' : '#FFF'}; color:${h === clockState.freeHour ? '#FFF' : '#333'}; border:1.5px solid #3F51B5;"
                    onclick="setFreeClockHour(${h})">
              ${h}
            </button>
          `;
        }).join('')}
      </div>
    `}
  `;

  container.innerHTML = html;
  if (isTebak) speakClockPrompt();
}

// ---------------------------------------------------------
// Pure SVG Analog Clock Face (Dynamic Angles)
// ---------------------------------------------------------
function renderAnalogClockSvg(hour) {
  var hourAngle = (hour % 12) * 30; // 30 deg per hour
  var minuteAngle = 0; // Exactly on 12 (00 minutes)

  // Generate 12 numbers placed around dial
  var numbersHtml = '';
  for (var i = 1; i <= 12; i++) {
    var rad = (i * 30 - 90) * Math.PI / 180;
    var x = 115 + 85 * Math.cos(rad);
    var y = 115 + 85 * Math.sin(rad) + 6; // adjust for text baseline
    numbersHtml += `
      <text x="${x}" y="${y}" font-family="'Comic Sans MS', sans-serif" font-size="16" font-weight="900" text-anchor="middle" fill="#37474F">
        ${i}
      </text>
    `;
  }

  return `
    <svg viewBox="0 0 230 230" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
      <!-- Outer Dial Shadow & Ring -->
      <circle cx="115" cy="115" r="110" fill="#FFFDE7" stroke="#FFB300" stroke-width="8" />
      <circle cx="115" cy="115" r="102" fill="none" stroke="#FFE082" stroke-width="2" />

      <!-- Tick Marks -->
      ${renderClockTicksSvg()}

      <!-- The 12 Numbers -->
      ${numbersHtml}

      <!-- Long Minute Hand (Blue, Points to 12) -->
      <g transform="rotate(${minuteAngle}, 115, 115)">
        <line x1="115" y1="115" x2="115" y2="35" stroke="#1E88E5" stroke-width="5" stroke-linecap="round" />
        <polygon points="115,28 111,38 119,38" fill="#1E88E5" />
      </g>

      <!-- Short Hour Hand (Red, Points to Target Hour) -->
      <g transform="rotate(${hourAngle}, 115, 115)">
        <line x1="115" y1="115" x2="115" y2="58" stroke="#E53935" stroke-width="8" stroke-linecap="round" />
        <polygon points="115,50 110,62 120,62" fill="#E53935" />
      </g>

      <!-- Center Gold Pivot Star Cap -->
      <circle cx="115" cy="115" r="10" fill="#FFC107" stroke="#FFA000" stroke-width="2" />
      <circle cx="115" cy="115" r="4" fill="#FFF" />
    </svg>
  `;
}

function renderClockTicksSvg() {
  var ticks = '';
  for (var i = 0; i < 60; i += 5) {
    var rad = i * 6 * Math.PI / 180;
    var x1 = 115 + 98 * Math.cos(rad);
    var y1 = 115 + 98 * Math.sin(rad);
    var x2 = 115 + 92 * Math.cos(rad);
    var y2 = 115 + 92 * Math.sin(rad);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />`;
  }
  return ticks;
}

// ---------------------------------------------------------
// Answer Checking & Audio Feedback
// ---------------------------------------------------------
function handleClockAnswer(btn, chosenHour) {
  if (clockState.isProcessing) return;
  var q = clockState.currentQuestion;
  if (!q) return;

  var isCorrect = (chosenHour === q.targetHour);

  if (isCorrect) {
    clockState.isProcessing = true;
    btn.classList.add('opt-correct');

    // Trigger Cuckoo Bird Pop Animation!
    triggerCuckooBirdSurprise(q.targetHour);

    if (typeof addProfileStars === 'function') addProfileStars(1);
    if (typeof addGameStars === 'function') addGameStars(1);

    var hourStr = (q.targetHour < 10 ? '0' : '') + q.targetHour + '.00';
    setMascotSpeech("BENAR SEKALI! Sekarang pukul " + hourStr + "! Burung kukuk bernyanyi gembira! ⏰🐥🎉");
    speakNatural("Benar sekali! Sekarang pukul " + q.targetHour + " tepat!");

    setTimeout(function() {
      generateNewClockProblem();
    }, 1800);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);

    setMascotSpeech("Perhatikan jarum pendek yang warna merah ya! Dia menunjuk angka berapa? 🔴");
    speakNatural("Lihat jarum pendek warna merah menunjuk angka berapa ya sayang?");
  }
}

// Cuckoo Bird Pop & Sweet Chirp Sound
function triggerCuckooBirdSurprise(hourCount) {
  var bird = document.getElementById('cuckoo-bird-pop');
  if (bird) {
    bird.style.transform = 'scale(1.4) translateY(-6px)';
  }

  // Synthesize sweet Cuckoo bird chimes (Kuk-kuk! Kuk-kuk!)
  playCuckooChime();

  setTimeout(function() {
    if (bird) bird.style.transform = 'scale(0)';
  }, 1600);
}

function playCuckooChime() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    
    // Kuk-kuk (High note then drop major third)
    var cuckooPitches = [
      { f: 659.25, t: 0 },    // E5 (Kuk)
      { f: 523.25, t: 0.16 }, // C5 (kuk)
      { f: 659.25, t: 0.45 }, // E5 (Kuk)
      { f: 523.25, t: 0.61 }  // C5 (kuk)
    ];

    cuckooPitches.forEach(function(p) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(p.f, ctx.currentTime + p.t);
      gain.gain.setValueAtTime(0.35, ctx.currentTime + p.t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + p.t + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + p.t);
      osc.stop(ctx.currentTime + p.t + 0.22);
    });
  } catch (e) {
    console.warn("Cuckoo audio error", e);
  }
}

function setFreeClockHour(h) {
  playTonePop();
  clockState.freeHour = h;
  renderClockStage();
  speakNatural("Pukul " + h + " tepat!");
}

function speakClockPrompt() {
  var q = clockState.currentQuestion;
  if (!q) return;
  speakNatural("Jarum jam menunjuk pukul berapa ya? " + q.routine.desc);
}

function readClockQuestionAloud() {
  speakClockPrompt();
}
