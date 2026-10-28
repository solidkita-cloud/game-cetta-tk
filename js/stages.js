// =========================================================
// STAGES.JS - REAL FUNCTIONING GAME LOOPS FOR ALL 10 WAHANA
// Fully Shuffled Options, Anti-Repeat Question Pools & Safe Indices
// =========================================================

// Utility: Robust Fisher-Yates Shuffle
function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

var currentStageSession = {
  type: null,
  round: 1,
  totalRounds: 5,
  score: 0,
  isProcessing: false,
  questionPool: [],
  currentQuestion: null
};

// ---------------------------------------------------------
// Dispatcher: Start Wahana Session
// ---------------------------------------------------------
function startWahana(stageType, title) {
  playTonePop();
  currentStageSession.type = stageType;
  currentStageSession.round = 1;
  currentStageSession.totalRounds = 5;
  currentStageSession.score = 0;
  currentStageSession.isProcessing = false;

  // Build & shuffle a large pool of unique questions for this session
  currentStageSession.questionPool = buildQuestionPoolForStage(stageType);

  document.getElementById('play-title-display').textContent = title;
  goToScene('play');

  renderCurrentWahanaQuestion();

  // Voice greeting from teacher / mascot
  var mascotName = (window.gameState.selectedMascot === 'pandi' ? 'Pandi' : 'Miko');
  var welcomeText = "";
  if (window.gameState.role === 'bu_guru' || window.gameState.role === 'pak_guru') {
    var roleTitle = (window.gameState.role === 'bu_guru' ? 'Bu Guru ' : 'Pak Guru ') + window.gameState.playerName;
    welcomeText = roleTitle + ", " + mascotName + " mau belajar di " + title + "! Bimbing " + mascotName + " ya!";
  } else {
    welcomeText = "Ayo " + window.gameState.playerName + ", kita main di " + title + " bersama " + mascotName + "!";
  }
  setMascotSpeech(welcomeText);
}

// ---------------------------------------------------------
// Helper: Build Large Shuffled Question Pool
// ---------------------------------------------------------
function buildQuestionPoolForStage(type) {
  var rawList = [];
  if (type === 'islam') {
    rawList = window.GAME_DATA.islamCeria || [];
  } else if (type === 'makan') {
    rawList = window.GAME_DATA.makanApa || [];
  } else if (type === 'hitung') {
    rawList = window.GAME_DATA.hitung || [];
  } else if (type === 'hewan') {
    rawList = window.GAME_DATA.hewan || [];
  } else if (type === 'kendaraan') {
    rawList = window.GAME_DATA.kendaraan || [];
  } else if (type === 'sayur') {
    rawList = window.GAME_DATA.sayur || [];
  } else if (type === 'warna') {
    rawList = window.GAME_DATA.warna || [];
  } else if (type === 'bentuk') {
    rawList = window.GAME_DATA.bentuk || [];
  } else if (type === 'langit') {
    rawList = window.GAME_DATA.langit || [];
  } else if (type === 'huruf') {
    rawList = window.GAME_DATA.alphabet || [];
  } else if (type === 'suku') {
    var levels = window.GAME_DATA.sukuKata || [];
    levels.forEach(function(lvl) {
      if (lvl.words) {
        lvl.words.forEach(function(w) {
          rawList.push({ t: w.t, e: w.e, lvlTitle: lvl.title });
        });
      }
    });
  }
  return shuffleArray(rawList);
}

// ---------------------------------------------------------
// Master Render for Current Round
// ---------------------------------------------------------
function renderCurrentWahanaQuestion() {
  currentStageSession.isProcessing = false;
  var container = document.getElementById('play-arena-content');
  var type = currentStageSession.type;
  var round = currentStageSession.round;
  var total = currentStageSession.totalRounds;

  var progressHtml = '<div class="stage-progress-badge">Ronde ' + round + ' dari ' + total + ' ⭐</div>';

  if (type === 'huruf') {
    renderHurufRound(container, progressHtml);
  } else if (type === 'suku') {
    renderSukuRound(container, progressHtml);
  } else if (type === 'hitung') {
    renderHitungRound(container, progressHtml);
  } else if (type === 'warna') {
    renderWarnaRound(container, progressHtml);
  } else if (type === 'bentuk') {
    renderBentukRound(container, progressHtml);
  } else if (type === 'hewan') {
    renderHewanRound(container, progressHtml);
  } else if (type === 'makan') {
    renderMakanRound(container, progressHtml);
  } else if (type === 'kendaraan') {
    renderKendaraanRound(container, progressHtml);
  } else if (type === 'sayur') {
    renderSayurRound(container, progressHtml);
  } else if (type === 'islam') {
    renderIslamRound(container, progressHtml);
  } else if (type === 'langit') {
    renderLangitRound(container, progressHtml);
  } else {
    container.innerHTML = '<div style="font-size:24px;">Wahana Siap!</div>';
  }
}

// ---------------------------------------------------------
// 1. HURUF FONIK (Balon Melayang A-Z - Shuffled)
// ---------------------------------------------------------
function renderHurufRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var targetItem = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.alphabet[0];

  var allAlpha = window.GAME_DATA.alphabet;
  var distractors = [];
  while (distractors.length < 2) {
    var rand = allAlpha[Math.floor(Math.random() * allAlpha.length)];
    if (rand.letter !== targetItem.letter && distractors.indexOf(rand) === -1) {
      distractors.push(rand);
    }
  }

  // Shuffle positions (A, B, C position is random)
  var shuffledOptions = shuffleArray([targetItem, distractors[0], distractors[1]]);
  currentStageSession.currentQuestion = {
    target: targetItem,
    shuffledOpts: shuffledOptions
  };

  var balloonsHtml = shuffledOptions.map(function(opt, idx) {
    return `
      <div class="interactive-balloon" onclick="handleHurufAnswer(this, ${idx})"
           style="width:90px; height:110px; border-radius:50% 50% 50% 50% / 40% 40% 60% 60%; 
                  background:linear-gradient(135deg, #FF8A80, #FF5252); display:flex; flex-direction:column; 
                  align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:36px; 
                  box-shadow:var(--shadow-squish); cursor:pointer; position:relative; z-index:40;">
        <span>${opt.letter}</span>
        <span style="font-size:20px;">${opt.emoji}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; color:var(--text-dark); text-align:center;">
        Pecahkan Balon Huruf <span style="color:#D32F2F; font-size:26px;">${targetItem.letter}</span>!
      </div>
      <div style="font-size:15px; color:var(--text-muted);">"${targetItem.phonics}"</div>
      
      <div style="display:flex; justify-content:center; gap:16px; margin:20px 0;">
        ${balloonsHtml}
      </div>

      <button class="squish-btn btn-pill" style="background:#E1F5FE; color:#0288D1;" onclick="speakNatural('Pecahkan balon huruf ${targetItem.letter} untuk ${targetItem.word}!')">
        Dengar Bunyi Fonik 🔊
      </button>
    </div>
  `;

  speakNatural("Pecahkan balon huruf " + targetItem.letter + " untuk " + targetItem.word);
}

function handleHurufAnswer(el, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen.letter === q.target.letter);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playTonePop();
    playToneChime();
    el.style.animation = 'popOut 0.4s forwards';
    setMascotSpeech("Hebat! " + chosen.letter + " untuk " + chosen.word + "! 🌟");
    speakNatural("Hebat! " + chosen.letter + " untuk " + chosen.word + "!");
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    el.classList.add('anim-wiggle');
    setTimeout(function() { el.classList.remove('anim-wiggle'); }, 600);
    setMascotSpeech("Itu huruf " + chosen.letter + ", cari yang diminta ya sayang!");
    speakNatural("Itu huruf " + chosen.letter + ", yuk coba lagi!");
  }
}

// ---------------------------------------------------------
// 2. KERETA SUKU KATA (SAS 10 Level MATA BAJU KUKU)
// ---------------------------------------------------------
function renderSukuRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var targetWord = pool[(currentStageSession.round - 1) % pool.length] || { t: "MATA", e: "👀", lvlTitle: "Level 1 - A" };
  
  var syl1 = targetWord.t.slice(0, 2);
  var syl2 = targetWord.t.slice(2);

  currentStageSession.currentQuestion = {
    word: targetWord.t,
    syl1: syl1,
    syl2: syl2
  };

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
        <span style="font-size:14px; font-weight:800; color:#512DA8;">${targetWord.lvlTitle || 'Kereta Kata'}</span>
        <button class="squish-btn" style="padding:4px 12px; font-size:12px; background:#EDE7F6; color:#512DA8;" onclick="honkTrainAction()">Tuuut Tuuut! 🚂</button>
      </div>

      <div style="font-size:68px; filter:drop-shadow(0 6px 10px rgba(0,0,0,0.1));">${targetWord.e}</div>
      
      <div style="display:flex; align-items:center; gap:12px; margin:8px 0;" class="anim-train">
        <div class="squish-btn" style="padding:16px 24px; font-size:26px; background:#FFF; border:3px solid #7E57C2; color:#512DA8;" onclick="speakNatural('${syl1}')">
          ${syl1}
        </div>
        <div style="font-size:24px; font-weight:800; color:#7E57C2;">+</div>
        <div class="squish-btn" style="padding:16px 24px; font-size:26px; background:#FFF; border:3px solid #7E57C2; color:#512DA8;" onclick="speakNatural('${syl2}')">
          ${syl2}
        </div>
      </div>

      <button class="squish-btn btn-primary" style="font-size:20px; padding:14px 36px; background:linear-gradient(180deg,#7E57C2,#512DA8); border-color:#4527A0;" 
              onclick="handleSukuComplete()">
        Gabung & Baca: ${targetWord.t}! 🔊
      </button>
    </div>
  `;

  speakNatural(syl1 + " ditambah " + syl2 + ", dibaca apa ya?");
}

function honkTrainAction() {
  playToneWhistle();
  speakNatural("Tuuut tuuut! Kereta berangkat!");
}

function handleSukuComplete() {
  if (currentStageSession.isProcessing) return;
  currentStageSession.isProcessing = true;
  var q = currentStageSession.currentQuestion;
  playToneWhistle();
  playToneChime();
  setMascotSpeech(q.syl1 + " " + q.syl2 + " dibaca " + q.word + "! Pintar sekali! 🚂⭐");
  speakNatural(q.syl1 + " " + q.syl2 + " dibaca " + q.word + "! Pintar sekali!");
  setTimeout(advanceToNextRound, 1400);
}

// ---------------------------------------------------------
// 3. POHON BERHITUNG (50 Soal Konkret & Shuffled Options)
// ---------------------------------------------------------
function renderHitungRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var qItem = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.hitung[0];

  var appleCount = qItem.appleCount || 3;
  var applesHtml = '';
  for (var i = 1; i <= appleCount; i++) {
    applesHtml += `<span class="interactive-apple" style="font-size:36px; cursor:pointer;" onclick="tapApple(${i})">🍎</span>`;
  }

  // Shuffle options so the answer can appear anywhere!
  var shuffledOpts = shuffleArray(qItem.opts);
  currentStageSession.currentQuestion = {
    q: qItem.q,
    ans: qItem.ans,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(opt, idx) {
    return `<button class="option-btn" onclick="handleHitungAnswer(this, ${idx})">${opt}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      
      <!-- Apple Tree Box -->
      <div style="width:100%; height:110px; background:linear-gradient(180deg,#81C784,#4CAF50); border-radius:20px; 
                  position:relative; display:flex; align-items:center; justify-content:center; gap:12px; box-shadow:inset 0 4px 8px rgba(0,0,0,0.15);">
        <span style="position:absolute; top:8px; left:14px; font-weight:800; color:#FFF; font-size:12px;">Pohon Apel Cetta 🌳</span>
        ${applesHtml}
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; width:100%; margin-top:4px;">
        <div style="font-size:18px; font-weight:800; color:var(--text-dark);">${qItem.q}</div>
        <div id="apple-blender-btn" class="squish-btn" style="width:48px; height:48px; border-radius:14px; background:#FFF3E0; font-size:24px; border:2px solid #FFE0B2;" onclick="spinJuiceBlender()" title="Blender Jus!">
          🧃
        </div>
      </div>

      <div class="options-grid">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural(qItem.q);
}

function tapApple(idx) {
  playTonePop();
  speakNatural("Apel ke " + idx + " jatuh ke keranjang!");
}

function spinJuiceBlender() {
  playToneJuice();
  var el = document.getElementById('apple-blender-btn');
  if (el) {
    el.classList.add('anim-blender');
    setTimeout(function() { el.classList.remove('anim-blender'); }, 800);
  }
  speakNatural("Wrrr! Jus apel segar siap diminum!");
}

function handleHitungAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen === q.ans);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Benar sekali! Jawabannya " + chosen + "! Juara! 🍎⭐");
    speakNatural("Hebat sekali! Jawabannya benar!");
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    setMascotSpeech("Yuk kita hitung lagi pelan-pelan bersama Pandi!");
    speakNatural("Coba hitung lagi yuk sayang!");
  }
}

// ---------------------------------------------------------
// 4. WARNA & BENTUK (Shuffled Options)
// ---------------------------------------------------------
function renderWarnaRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var target = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.warna[0];

  var allColors = window.GAME_DATA.warna;
  var distractors = [];
  while (distractors.length < 3) {
    var r = allColors[Math.floor(Math.random() * allColors.length)];
    if (r.name !== target.name && distractors.indexOf(r) === -1) {
      distractors.push(r);
    }
  }

  var shuffledOpts = shuffleArray([target, distractors[0], distractors[1], distractors[2]]);
  currentStageSession.currentQuestion = {
    target: target,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(c, idx) {
    return `
      <button class="option-btn" style="background:${c.hex}; color:#2E3A23; border:3px solid rgba(0,0,0,0.1);" 
              onclick="handleColorAnswer(this, ${idx})">
        ${c.emoji} ${c.name}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; text-align:center;">
        Sentuh Warna <span style="color:#D81B60;">${target.name}</span>!
      </div>
      <div style="font-size:14px; color:var(--text-muted);">Contoh: ${target.benda ? target.benda.join(', ') : 'Warna Indah'}</div>
      <div class="options-grid" style="margin-top:12px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural("Sentuh warna " + target.name);
}

function handleColorAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen.name === q.target.name);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Pintar! Ini warna " + chosen.name + "! 🌸⭐");
    speakNatural("Pintar sekali! Ini warna " + chosen.name);
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Itu bukan warna yang diminta, coba lagi yuk!");
  }
}

function renderBentukRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var target = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.bentuk[0];

  var allShapes = window.GAME_DATA.bentuk;
  var distractors = [];
  while (distractors.length < 3) {
    var r = allShapes[Math.floor(Math.random() * allShapes.length)];
    if (r.name !== target.name && distractors.indexOf(r) === -1) {
      distractors.push(r);
    }
  }

  var shuffledOpts = shuffleArray([target, distractors[0], distractors[1], distractors[2]]);
  currentStageSession.currentQuestion = {
    target: target,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(s, idx) {
    return `
      <button class="option-btn" onclick="handleShapeAnswer(this, ${idx})">
        <span style="font-size:28px;">${s.emoji}</span><br>${s.name}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; text-align:center;">
        Mana bentuk <span style="color:#0288D1;">${target.name}</span>?
      </div>
      <div style="font-size:14px; color:var(--text-muted);">Contoh: ${target.contoh ? target.contoh.slice(0, 3).join(', ') : ''}</div>
      <div class="options-grid" style="margin-top:12px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural("Mana bentuk " + target.name + "?");
}

function handleShapeAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen.name === q.target.name);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Benar! Bentuk " + chosen.name + " yang pas! 📐⭐");
    speakNatural("Hebat! Itu bentuk " + chosen.name);
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Coba cari bentuk yang cocok ya sayang!");
  }
}

// ---------------------------------------------------------
// 5. KEBUN HEWAN (Tebak Suara & Semak)
// ---------------------------------------------------------
function renderHewanRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var target = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.hewan[0];

  var allAnimals = window.GAME_DATA.hewan;
  var distractors = [];
  while (distractors.length < 3) {
    var r = allAnimals[Math.floor(Math.random() * allAnimals.length)];
    if (r.n !== target.n && distractors.indexOf(r) === -1) {
      distractors.push(r);
    }
  }

  var shuffledOpts = shuffleArray([target, distractors[0], distractors[1], distractors[2]]);
  currentStageSession.currentQuestion = {
    target: target,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(a, idx) {
    return `
      <button class="option-btn" onclick="handleAnimalAnswer(this, ${idx})">
        <span style="font-size:32px;">${a.e}</span><br>${a.n}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; text-align:center;">
        Siapa di Balik Semak Rumput?
      </div>

      <!-- Bush with sound -->
      <div class="squish-btn" style="padding:14px 28px; font-size:32px; background:#C8E6C9; border:3px solid #81C784;" onclick="speakNatural('Suara hewan ini: ${target.suara}!')">
        🌿 🔊 "${target.suara}"
      </div>
      
      <div class="options-grid" style="margin-top:10px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural("Suara hewan " + target.suara + "! Hewan apakah itu?");
}

function handleAnimalAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen.n === q.target.n);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Benar! Itu " + chosen.n + "! Suaranya " + chosen.suara + "! 🦁⭐");
    speakNatural("Benar sekali! Itu " + chosen.n);
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Bukan itu suaranya, yuk dengar lagi!");
  }
}

// ---------------------------------------------------------
// 6. DAPUR HEWAN (MAKAN APA?) - 25+ Hewan, Shuffled Options!
// ---------------------------------------------------------
function renderMakanRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var item = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.makanApa[0];

  // Robustly shuffle options so the answer is NOT always first!
  var shuffledOpts = shuffleArray(item.opts);
  currentStageSession.currentQuestion = {
    hewan: item.hewan,
    e: item.e,
    makan: item.makan,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(opt, idx) {
    return `
      <button class="option-btn" onclick="handleMakanAnswer(this, ${idx})">
        ${opt}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:18px; font-weight:800; color:#E65100;">
        ${item.hewan} sedang lapar! Makanan apa kesukaannya?
      </div>

      <div id="eating-animal-icon" style="font-size:76px; filter:drop-shadow(0 6px 12px rgba(0,0,0,0.1));">
        ${item.e}
      </div>

      <div class="options-grid" style="margin-top:8px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural(item.hewan + " sedang lapar! Kasih makan apa ya?");
}

function handleMakanAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen === q.makan);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneCrunch();
    playToneChime();
    btn.classList.add('opt-correct');
    var icon = document.getElementById('eating-animal-icon');
    if (icon) icon.classList.add('anim-munch');
    setMascotSpeech("Nyam nyam! " + q.hewan + " kenyang makan " + chosen + "! ❤️⭐");
    speakNatural("Nyam nyam nyam! Enak sekali!");
    setTimeout(advanceToNextRound, 1300);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    setMascotSpeech("Aduh, " + q.hewan + " tidak makan itu sayang!");
    speakNatural("Bukan itu makanannya, coba lagi ya!");
  }
}

// ---------------------------------------------------------
// 7. KENDARAAN (Darat, Laut, Udara - Shuffled)
// ---------------------------------------------------------
function renderKendaraanRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var target = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.kendaraan[0];

  var allVehicles = window.GAME_DATA.kendaraan;
  var distractors = [];
  while (distractors.length < 3) {
    var r = allVehicles[Math.floor(Math.random() * allVehicles.length)];
    if (r.n !== target.n && distractors.indexOf(r) === -1) {
      distractors.push(r);
    }
  }

  var shuffledOpts = shuffleArray([target, distractors[0], distractors[1], distractors[2]]);
  currentStageSession.currentQuestion = {
    target: target,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(v, idx) {
    return `
      <button class="option-btn" onclick="handleKendaraanAnswer(this, ${idx})">
        <span style="font-size:32px;">${v.e}</span><br>${v.n}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; color:#0288D1; text-align:center;">
        Kendaraan Jalur <span style="color:#F57C00;">${target.jalur}</span>
      </div>
      <div style="font-size:14px; color:var(--text-muted);">Fungsi: ${target.fungsi} | Bunyi: "${target.bunyi}"</div>

      <div class="options-grid" style="margin-top:12px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural("Mana kendaraan yang berjalan di jalur " + target.jalur + "?");
}

function handleKendaraanAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen.n === q.target.n);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Brum brum! Itu " + chosen.n + "! " + chosen.bunyi + "! 🚗⭐");
    speakNatural("Hebat! Itu " + chosen.n);
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Bukan kendaraan itu, yuk coba yang lain!");
  }
}

// ---------------------------------------------------------
// 8. SAYUR & BUAH SEHAT (Shuffled Options)
// ---------------------------------------------------------
function renderSayurRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var target = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.sayur[0];

  var allVeggies = window.GAME_DATA.sayur;
  var distractors = [];
  while (distractors.length < 3) {
    var r = allVeggies[Math.floor(Math.random() * allVeggies.length)];
    if (r.name !== target.name && distractors.indexOf(r) === -1) {
      distractors.push(r);
    }
  }

  var shuffledOpts = shuffleArray([target, distractors[0], distractors[1], distractors[2]]);
  currentStageSession.currentQuestion = {
    target: target,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(s, idx) {
    return `
      <button class="option-btn" onclick="handleSayurAnswer(this, ${idx})">
        <span style="font-size:32px;">${s.e}</span><br>${s.name}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; color:#2E7D32; text-align:center;">
        Pilih Sayur/Buah Sehat: <span style="color:#388E3C;">${target.name}</span>!
      </div>
      <div style="font-size:14px; color:var(--text-muted);">${target.manfaat || 'Yuk belanja makanan sehat! 🛒'}</div>

      <div class="options-grid" style="margin-top:12px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural("Pilih sayur sehat " + target.name);
}

function handleSayurAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen.name === q.target.name);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Yum! " + chosen.name + " masuk ke keranjang! " + (chosen.manfaat || 'Sehat sekali!') + " 🥦⭐");
    speakNatural("Bagus sekali! " + chosen.name + " sangat menyehatkan tubuh!");
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Coba cari sayur yang diminta ya sayang!");
  }
}

// ---------------------------------------------------------
// 9. ISLAM CERIA (30 Soal, Ka'bah Fix, 100% Shuffled Options)
// ---------------------------------------------------------
function renderIslamRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var item = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.islamCeria[0];

  // Shuffle the 4 options so the answer is randomized across positions!
  var shuffledOpts = shuffleArray(item.opts);
  currentStageSession.currentQuestion = {
    q: item.q,
    ans: item.ans,
    e: item.e,
    shuffledOpts: shuffledOpts
  };

  // Render options using INDEX ONLY - zero quote injection bug!
  var optionsHtml = shuffledOpts.map(function(opt, idx) {
    return `<button class="option-btn" onclick="handleIslamAnswer(this, ${idx})">${opt}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:62px;">${item.e}</div>
      <div style="font-size:20px; font-weight:800; color:#00796B; text-align:center;">${item.q}</div>
      
      <div class="options-grid" style="margin-top:12px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural(item.q);
}

function handleIslamAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen === q.ans);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Alhamdulillah! Jawaban " + chosen + " sangat tepat! Anak sholeh! 🕌⭐");
    speakNatural("Alhamdulillah! Jawaban benar!");
    setTimeout(advanceToNextRound, 1200);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Coba jawab lagi ya sayang!");
  }
}

// ---------------------------------------------------------
// 10. TEROPONG LANGIT (Shuffled Options)
// ---------------------------------------------------------
function renderLangitRound(container, progressHtml) {
  var pool = currentStageSession.questionPool;
  var target = pool[(currentStageSession.round - 1) % pool.length] || window.GAME_DATA.langit[0];

  var shuffledOpts = shuffleArray(target.opts);
  currentStageSession.currentQuestion = {
    q: target.q,
    ans: target.ans,
    e: target.e,
    shuffledOpts: shuffledOpts
  };

  var optionsHtml = shuffledOpts.map(function(opt, idx) {
    return `<button class="option-btn" onclick="handleLangitAnswer(this, ${idx})">${opt}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="stage-question-card">
      ${progressHtml}
      <div style="font-size:20px; font-weight:800; color:#303F9F; text-align:center;">${target.q}</div>

      <div class="options-grid" style="margin-top:12px;">
        ${optionsHtml}
      </div>
    </div>
  `;

  speakNatural(target.q);
}

function handleLangitAnswer(btn, optIdx) {
  if (currentStageSession.isProcessing) return;
  var q = currentStageSession.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen === q.ans);

  if (isCorrect) {
    currentStageSession.isProcessing = true;
    playToneChime();
    btn.classList.add('opt-correct');
    setMascotSpeech("Subhanallah! Itu " + chosen + "! Hebat sekali! 🌙⭐");
    speakNatural("Hebat! Itu " + chosen);
    setTimeout(advanceToNextRound, 1300);
  } else {
    playToneBoing();
    btn.classList.add('opt-wrong');
    setTimeout(function() { btn.classList.remove('opt-wrong'); }, 500);
    speakNatural("Yuk cari benda langit yang diminta!");
  }
}

// ---------------------------------------------------------
// Master Round Advance & Victory Handler
// ---------------------------------------------------------
function advanceToNextRound() {
  currentStageSession.round++;
  if (currentStageSession.round > currentStageSession.totalRounds) {
    showVictoryScreen();
  } else {
    renderCurrentWahanaQuestion();
  }
}

function showVictoryScreen() {
  playToneFanfare();
  addGameStars(3);

  var modal = document.getElementById('modal-victory');
  if (modal) {
    modal.classList.add('modal-active');
  }

  var msg = "Horeee! " + window.gameState.playerName + " berhasil menyelesaikan wahana ini dan dapat 3 Bintang Emas! 🎉";
  speakNatural(msg);
}

function replayCurrentWahana() {
  var modal = document.getElementById('modal-victory');
  if (modal) modal.classList.remove('modal-active');
  currentStageSession.round = 1;
  // Re-shuffle question pool so replay gets fresh questions!
  currentStageSession.questionPool = buildQuestionPoolForStage(currentStageSession.type);
  renderCurrentWahanaQuestion();
}

function exitWahanaToMap() {
  var modal = document.getElementById('modal-victory');
  if (modal) modal.classList.remove('modal-active');
  goToScene('map');
}
