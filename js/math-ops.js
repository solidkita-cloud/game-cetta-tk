// =========================================================
// JS/MATH-OPS.JS - DAPUR MATEMATIKA TAMBAH & KURANG KONKRET
// Procedural Dynamic Generation (Infinite Non-Repeating Problems)
// Real Visual Objects: Fruit Baskets & Monster Snack Crunch
// =========================================================

var mathOpsState = {
  mode: 'tambah', // 'tambah' or 'kurang'
  currentQuestion: null,
  recentHistory: [], // Stores last 5 equations to avoid repetition
  isProcessing: false,
  tappedCount: 0
};

var MATH_FRUITS = [
  { name: 'Apel', emoji: '🍎', soundWord: 'apel' },
  { name: 'Stroberi', emoji: '🍓', soundWord: 'stroberi' },
  { name: 'Jeruk', emoji: '🍊', soundWord: 'jeruk' },
  { name: 'Pisang', emoji: '🍌', soundWord: 'pisang' },
  { name: 'Wortel', emoji: '🥕', soundWord: 'wortel' }
];

var MATH_SNACKS = [
  { name: 'Donat Manis', emoji: '🍩', soundWord: 'donat' },
  { name: 'Kue Cupcake', emoji: '🧁', soundWord: 'kue' },
  { name: 'Biskuit Cokelat', emoji: '🍪', soundWord: 'biskuit' },
  { name: 'Potongan Pizza', emoji: '🍕', soundWord: 'pizza' }
];

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openMathOpsStudio() {
  goToScene('math-ops');
  setMascotSpeech("Selamat datang di Dapur Matematika! Yuk berhitung tambah dan kurang bersama Pandi! ➕➖🍎");
  speakNatural("Selamat datang di Dapur Matematika Cetta! Ayo kita berhitung bersama!");
  mathOpsState.recentHistory = [];
  generateNewMathProblem();
}

function exitMathOpsToMap() {
  goToScene('map');
}

function switchMathMode(newMode) {
  playTonePop();
  mathOpsState.mode = newMode;
  generateNewMathProblem();
}

// ---------------------------------------------------------
// Dynamic Procedural Problem Generator (Never Repeats Statically)
// ---------------------------------------------------------
function generateNewMathProblem() {
  mathOpsState.isProcessing = false;
  mathOpsState.tappedCount = 0;

  var q = null;
  var attempts = 0;

  // Generate while ensuring it hasn't appeared recently
  while (attempts < 20) {
    attempts++;
    if (mathOpsState.mode === 'tambah') {
      var a = Math.floor(Math.random() * 5) + 1; // 1..5
      var b = Math.floor(Math.random() * 5) + 1; // 1..5
      // Max total sum for kindergarten is 10
      if (a + b > 10) b = 10 - a;
      if (b <= 0) b = 1;

      var key = 'add_' + a + '_' + b;
      if (mathOpsState.recentHistory.indexOf(key) === -1) {
        var fruit = MATH_FRUITS[Math.floor(Math.random() * MATH_FRUITS.length)];
        q = {
          type: 'tambah',
          a: a,
          b: b,
          ans: a + b,
          item: fruit,
          key: key
        };
        break;
      }
    } else {
      // Kurang (Subtraction)
      var total = Math.floor(Math.random() * 6) + 3; // 3..8
      var eaten = Math.floor(Math.random() * (total - 1)) + 1; // 1..(total-1)
      var key = 'sub_' + total + '_' + eaten;

      if (mathOpsState.recentHistory.indexOf(key) === -1) {
        var snack = MATH_SNACKS[Math.floor(Math.random() * MATH_SNACKS.length)];
        q = {
          type: 'kurang',
          total: total,
          eaten: eaten,
          ans: total - eaten,
          item: snack,
          key: key
        };
        break;
      }
    }
  }

  // Fallback if loop exceeded
  if (!q) {
    var f = MATH_FRUITS[0];
    q = { type: 'tambah', a: 2, b: 3, ans: 5, item: f, key: 'add_2_3' };
  }

  // Push to history buffer (keep last 5)
  mathOpsState.recentHistory.push(q.key);
  if (mathOpsState.recentHistory.length > 5) mathOpsState.recentHistory.shift();

  // Generate 4 randomized options (1 correct, 3 realistic distractors)
  var opts = [q.ans];
  while (opts.length < 4) {
    var offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
    var candidate = q.ans + offset;
    if (candidate > 0 && candidate <= 12 && opts.indexOf(candidate) === -1) {
      opts.push(candidate);
    }
  }
  // Shuffle options
  opts.sort(function() { return Math.random() - 0.5; });
  q.options = opts;

  mathOpsState.currentQuestion = q;
  renderMathOpsStage();
}

// ---------------------------------------------------------
// Render Dynamic UI
// ---------------------------------------------------------
function renderMathOpsStage() {
  var container = document.getElementById('math-ops-stage-container');
  if (!container) return;

  var q = mathOpsState.currentQuestion;
  if (!q) return;

  var isAdd = (q.type === 'tambah');

  var html = `
    <!-- Mode Switcher Tabs -->
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:10px;">
      <button class="squish-btn math-tab-btn ${isAdd ? 'tab-active' : ''}" onclick="switchMathMode('tambah')">
        ➕ Tambah Buah (Gabung)
      </button>
      <button class="squish-btn math-tab-btn ${!isAdd ? 'tab-active' : ''}" onclick="switchMathMode('kurang')">
        ➖ Kurang Kue (Nyam Dimakan)
      </button>
    </div>

    <!-- Question Prompt Card -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2px solid ${isAdd ? '#FFE082' : '#FFCDD2'}; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:12px; font-weight:800; color:${isAdd ? '#E65100' : '#C2185B'}; text-transform:uppercase;">
          ${isAdd ? 'Penjumlahan Buah Segar' : 'Pengurangan Kue Lezat'}
        </div>
        <div style="font-size:16px; font-weight:900; color:#37474F;">
          ${isAdd ? `${q.a} ${q.item.name} ditambah ${q.b} ${q.item.name}` : `Ada ${q.total} ${q.item.name}, dimakan ${q.eaten}`}
        </div>
      </div>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 12px; background:#FFF3E0; color:#E65100; border:1.5px solid #FFB74D; font-weight:800;" onclick="readMathQuestionAloud()">
        🔊 Suara
      </button>
    </div>

    <!-- Visual Interactive Concrete Stage -->
    <div style="background:linear-gradient(180deg, #FFF9C4, #FFF176); border-radius:24px; padding:16px 12px; border:3px solid #FBC02D; box-shadow:0 6px 18px rgba(0,0,0,0.08); margin-bottom:14px; position:relative; overflow:hidden;">
      ${isAdd ? renderAdditionVisualHtml(q) : renderSubtractionVisualHtml(q)}
    </div>

    <!-- Big Friendly Equation Bar -->
    <div style="background:#FFFFFF; border-radius:16px; padding:10px 16px; margin-bottom:14px; border:2px solid #E0E0E0; text-align:center; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
      <div style="font-size:24px; font-weight:900; color:#2E7D32; letter-spacing:2px;">
        ${isAdd ? `${q.a} ➕ ${q.b} = ❓` : `${q.total} ➖ ${q.eaten} = ❓`}
      </div>
      <div style="font-size:12px; color:#757575; font-weight:600; margin-top:2px;">
        Sentuh buahnya untuk menghitung, lalu pilih angka jawaban di bawah! 👇
      </div>
    </div>

    <!-- Shuffled Options Grid (4 Buttons) -->
    <div class="options-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
      ${q.options.map(function(opt) {
        return `
          <button class="squish-btn option-btn" 
                  style="font-size:26px; font-weight:900; padding:14px 0; border-radius:18px;" 
                  onclick="handleMathOpsAnswer(this, ${opt})">
            ${opt}
          </button>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
  speakMathPrompt();
}

function renderAdditionVisualHtml(q) {
  var basketA = '';
  for (var i = 1; i <= q.a; i++) {
    basketA += `<span class="interactive-fruit squish-btn" style="font-size:40px; cursor:pointer; user-select:none;" onclick="tapMathItem(this, ${i})">${q.item.emoji}</span>`;
  }

  var basketB = '';
  for (var j = 1; j <= q.b; j++) {
    basketB += `<span class="interactive-fruit squish-btn" style="font-size:40px; cursor:pointer; user-select:none;" onclick="tapMathItem(this, ${q.a + j})">${q.item.emoji}</span>`;
  }

  return `
    <div style="display:flex; align-items:center; justify-content:space-around; gap:8px;">
      <!-- Basket A -->
      <div style="flex:1; background:rgba(255,255,255,0.85); border-radius:18px; padding:12px 6px; border:2px dashed #F57F17; text-align:center;">
        <div style="font-size:12px; font-weight:800; color:#E65100; margin-bottom:4px;">Keranjang 1 (${q.a})</div>
        <div style="display:flex; justify-content:center; flex-wrap:wrap; gap:6px;">
          ${basketA}
        </div>
      </div>

      <!-- Plus Sign -->
      <div style="font-size:32px; font-weight:900; color:#E65100; animation:starBounce 0.8s infinite alternate ease-in-out;">
        ➕
      </div>

      <!-- Basket B -->
      <div style="flex:1; background:rgba(255,255,255,0.85); border-radius:18px; padding:12px 6px; border:2px dashed #F57F17; text-align:center;">
        <div style="font-size:12px; font-weight:800; color:#E65100; margin-bottom:4px;">Keranjang 2 (${q.b})</div>
        <div style="display:flex; justify-content:center; flex-wrap:wrap; gap:6px;">
          ${basketB}
        </div>
      </div>
    </div>
  `;
}

function renderSubtractionVisualHtml(q) {
  var plate = '';
  for (var i = 1; i <= q.total; i++) {
    var isEaten = (i <= q.eaten);
    plate += `
      <div id="snack-item-${i}" 
           class="squish-btn" 
           style="font-size:38px; cursor:pointer; position:relative; display:inline-block; transition:all 0.2s ease; ${isEaten ? 'opacity:0.35; filter:grayscale(0.8);' : ''}" 
           onclick="tapEatenSnack(${i})">
        ${q.item.emoji}
        ${isEaten ? '<span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:22px;">❌</span>' : ''}
      </div>
    `;
  }

  return `
    <div style="background:rgba(255,255,255,0.85); border-radius:20px; padding:14px 10px; border:2.5px solid #EF5350; text-align:center;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; padding:0 8px;">
        <span style="font-size:13px; font-weight:800; color:#C62828;">Piring Lezat: Awalnya ada ${q.total}</span>
        <span style="font-size:13px; font-weight:800; color:#D32F2F;">😋 Dimakan Pandi ${q.eaten}</span>
      </div>
      <div style="display:flex; justify-content:center; flex-wrap:wrap; gap:10px; padding:8px 0;">
        ${plate}
      </div>
      <div style="font-size:12px; font-weight:700; color:#757575; margin-top:4px;">
        Hitung donat yang belum dicoret ya! ✨
      </div>
    </div>
  `;
}

// ---------------------------------------------------------
// Touch / Tap Sounds
// ---------------------------------------------------------
function tapMathItem(el, count) {
  playTonePop();
  el.classList.add('anim-squish');
  setTimeout(function() { el.classList.remove('anim-squish'); }, 300);
  speakNatural(count.toString());
}

function tapEatenSnack(idx) {
  playToneCrunch();
  var el = document.getElementById('snack-item-' + idx);
  if (el) {
    el.classList.add('anim-munch');
    setTimeout(function() { el.classList.remove('anim-munch'); }, 400);
  }
}

function speakMathPrompt() {
  var q = mathOpsState.currentQuestion;
  if (!q) return;
  if (q.type === 'tambah') {
    speakNatural(q.a + " " + q.item.name + " ditambah " + q.b + " " + q.item.name + ", sama dengan berapa?");
  } else {
    speakNatural("Ada " + q.total + " " + q.item.name + ", dimakan " + q.eaten + ". Tersisa berapa?");
  }
}

function readMathQuestionAloud() {
  speakMathPrompt();
}

// ---------------------------------------------------------
// Answer Checking & Flow
// ---------------------------------------------------------
function handleMathOpsAnswer(btn, chosenVal) {
  if (mathOpsState.isProcessing) return;
  var q = mathOpsState.currentQuestion;
  if (!q) return;

  var isCorrect = (chosenVal === q.ans);

  if (isCorrect) {
    mathOpsState.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');

    if (typeof addProfileStars === 'function') addProfileStars(1);
    if (typeof addGameStars === 'function') addGameStars(1);

    setMascotSpeech("BENAR SEKALI! Jawabannya " + q.ans + "! Kamu anak pintar berhitung! ⭐🎉");
    speakNatural("Benar sekali! Hebat!");

    setTimeout(function() {
      generateNewMathProblem();
    }, 1400);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);

    setMascotSpeech("Yuk kita hitung lagi pelan-pelan bersama Pandi ya! Semangat! 🍎💪");
    speakNatural("Coba hitung lagi yuk sayang!");
  }
}
