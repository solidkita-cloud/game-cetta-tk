// =========================================================
// ARENA.JS - ARENA TANDING CERDAS (VS BOT KIKO & DUEL ANAK VS ANAK)
// 1. Mode VS Bot Kiko (Dynamic Kid-Friendly Timer)
// 2. Mode Anak vs Anak (Split-Screen 1 Layar Berhadapan 180°)
// Zero Spoiler Answers & Procedural Random Math Mixing
// =========================================================

var VS_DURATIONS = [
  { val: 15, label: "15s (Santai) 🟢", desc: "Cocok untuk TK / PAUD" },
  { val: 20, label: "20s (Sangat Santai) 🟢", desc: "Banyak Waktu Berpikir" },
  { val: 0,  label: "Tanpa Waktu (Bebas) 🧘", desc: "Santai Sepuasnya" },
  { val: 10, label: "10s (Sedang) 🟡", desc: "Mulai Lancar Membaca" },
  { val: 5,  label: "5s (Kilat) 🔴", desc: "Tantangan Cepat" }
];

var currentArenaMode = 'bot'; // 'bot' or 'pvp'

var vsBattle = {
  active: false,
  round: 1,
  totalRounds: 5,
  playerScore: 0,
  botScore: 0,
  duration: 15,
  timeLeft: 15,
  timerInterval: null,
  botTimeout: null,
  roundLocked: false,
  questionPool: [],
  currentQuestion: null
};

var pvpState = {
  active: false,
  round: 1,
  totalRounds: 5,
  p1Score: 0,
  p2Score: 0,
  p1Cooldown: false,
  p2Cooldown: false,
  roundLocked: false,
  questionPool: [],
  currentQuestion: null
};

// Clean Question Master Pool (ZERO star/emoji spoilers!)
var vsQuestionsPoolMaster = [
  { q: "M-A ditambah T-A dibaca apa?", ans: "MATA 👀", opts: ["MATA 👀", "BAJU 👕", "KUKU 💅", "BOLA ⚽"] },
  { q: "Hewan apa yang bersuara 'Moo moo'?", ans: "Sapi 🐄", opts: ["Ayam 🐔", "Sapi 🐄", "Kucing 🐱", "Kuda 🐴"] },
  { q: "Warna langit cerah di siang hari apa?", ans: "Biru 💧", opts: ["Merah 🍎", "Biru 💧", "Hijau 🌿", "Hitam 🌑"] },
  { q: "Kelinci suka makan sayur apa?", ans: "Wortel 🥕", opts: ["Wortel 🥕", "Batu 🪨", "Kayu 🪵", "Cabai 🌶️"] },
  { q: "B-A ditambah J-U dibaca apa?", ans: "BAJU 👕", opts: ["BOLA ⚽", "BAJU 👕", "ROTI 🍞", "BUKU 📖"] },
  { q: "Kendaraan yang terbang tinggi di awan?", ans: "Pesawat ✈️", opts: ["Mobil 🚗", "Kapal 🚢", "Pesawat ✈️", "Sepeda 🚲"] },
  { q: "Benda langit yang bersinar di malam hari?", ans: "Bulan 🌙", opts: ["Matahari ☀️", "Bulan 🌙", "Pelangi 🌈", "Awan ☁️"] },
  { q: "Hewan apa yang suka makan pisang?", ans: "Monyet 🐒", opts: ["Monyet 🐒", "Singa 🦁", "Ikan 🐟", "Kuda 🐴"] },
  { q: "B-O ditambah L-A dibaca apa?", ans: "BOLA ⚽", opts: ["BOLA ⚽", "BUKU 📚", "BATA 🧱", "BIRU 💧"] },
  { q: "Warna buah pisang yang matang manis apa?", ans: "Kuning 🟡", opts: ["Kuning 🟡", "Biru 💧", "Hitam 🌑", "Ungu 🍇"] },
  { q: "Kiblat sholat umat Islam menghadap ke mana?", ans: "Ka'bah 🕋", opts: ["Ka'bah 🕋", "Gunung ⛰️", "Lautan 🌊", "Pohon 🌳"] },
  { q: "R-O ditambah T-I dibaca apa?", ans: "ROTI 🍞", opts: ["ROTI 🍞", "RODA 🛞", "RUSA 🦌", "RAKIT 🪵"] },
  { q: "Hewan yang bersuara 'Kukuruyuk' di pagi hari?", ans: "Ayam Jago 🐓", opts: ["Ayam Jago 🐓", "Bebek 🦆", "Kucing 🐱", "Kambing 🐐"] },
  { q: "Benda langit yang muncul sehabis hujan reda?", ans: "Pelangi 🌈", opts: ["Pelangi 🌈", "Petir ⚡", "Lampu 💡", "Awan Hitam ☁️"] },
  { q: "Kucing suka makan lauk apa?", ans: "Ikan 🐟", opts: ["Ikan 🐟", "Daun 🍃", "Batu 🪨", "Soda 🥤"] },
  { q: "Kendaraan yang berjalan di atas rel besi?", ans: "Kereta Api 🚂", opts: ["Kereta Api 🚂", "Mobil 🚗", "Kapal 🚢", "Pesawat ✈️"] },
  { q: "Sayur berwarna oranye yang menyehatkan mata?", ans: "Wortel 🥕", opts: ["Wortel 🥕", "Permen 🍬", "Cokelat 🍫", "Es Krim 🍦"] },
  { q: "Sebelum makan dan minum kita membaca doa apa?", ans: "Bismillah 🤲", opts: ["Bismillah 🤲", "Horeee 🎉", "Aduh 😮", "Halo 👋"] },
  { q: "Bentuk roda sepeda dan bola adalah apa?", ans: "Lingkaran 🟡", opts: ["Lingkaran 🟡", "Kotak 🟦", "Segitiga 🔺", "Bintang ⭐"] },
  { q: "B-U ditambah K-U dibaca apa?", ans: "BUKU 📚", opts: ["BUKU 📚", "BUSA 🧼", "BULU 🪶", "BUMI 🌍"] },
  { q: "Panda yang lucu suka makan apa?", ans: "Bambu 🎋", opts: ["Bambu 🎋", "Burger 🍔", "Permen 🍬", "Es Krim 🍦"] }
];

// Procedural Dynamic Math Question Generator (No Spoilers, Always Fresh!)
function generateProceduralArenaMath() {
  var isAdd = Math.random() > 0.4;
  var ansNum = 0;
  var qText = '';

  if (isAdd) {
    var a = Math.floor(Math.random() * 5) + 1; // 1..5
    var b = Math.floor(Math.random() * 5) + 1; // 1..5
    ansNum = a + b;
    qText = a + " ditambah " + b + " sama dengan berapa?";
  } else {
    var total = Math.floor(Math.random() * 6) + 3; // 3..8
    var sub = Math.floor(Math.random() * (total - 1)) + 1;
    ansNum = total - sub;
    qText = total + " dikurang " + sub + " sama dengan berapa?";
  }

  var opts = [String(ansNum)];
  while (opts.length < 4) {
    var delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
    var cand = ansNum + delta;
    if (cand >= 0 && cand <= 12 && opts.indexOf(String(cand)) === -1) {
      opts.push(String(cand));
    }
  }
  opts = shuffleArray(opts);
  return { q: qText, ans: String(ansNum), opts: opts };
}

function buildArenaBattleDeck(count) {
  var deck = [];
  var generalPool = shuffleArray(vsQuestionsPoolMaster);
  // Mix 2 fresh procedural math questions + general questions
  deck.push(generateProceduralArenaMath());
  deck.push(generateProceduralArenaMath());
  for (var i = 0; i < count - 2 && i < generalPool.length; i++) {
    deck.push(generalPool[i]);
  }
  return shuffleArray(deck);
}

// ---------------------------------------------------------
// Shared Modal & Exit Controls
// ---------------------------------------------------------
function closeVsModal() {
  var modal = document.getElementById('modal-vs-finish');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}

function exitVsBattleToMap() {
  closeVsModal();
  if (typeof closeAllModals === 'function') closeAllModals();

  vsBattle.active = false;
  vsBattle.roundLocked = true;
  clearInterval(vsBattle.timerInterval);
  vsBattle.timerInterval = null;
  clearTimeout(vsBattle.botTimeout);
  vsBattle.botTimeout = null;

  pvpState.active = false;
  pvpState.roundLocked = true;

  if (typeof goToScene === 'function') {
    goToScene('map');
  }
  if (typeof setMascotSpeech === 'function') {
    setMascotSpeech("Kembali ke Peta Wahana! Pilih permainan lainnya yuk! 🗺️✨");
  }
}

function exitPvpDuelToMap() {
  exitVsBattleToMap();
}

function replayCurrentArenaMatch() {
  closeVsModal();
  if (currentArenaMode === 'pvp') {
    startPvpDuelBattle();
  } else {
    startVsBattle();
  }
}

// =========================================================
// MODE 1: VS BOT KIKO (SINGLE PLAYER)
// =========================================================
function startVsBattle() {
  closeVsModal();
  currentArenaMode = 'bot';
  vsBattle.active = true;
  vsBattle.round = 1;
  vsBattle.playerScore = 0;
  vsBattle.botScore = 0;
  vsBattle.roundLocked = false;

  var savedDur = localStorage.getItem('cetta_vs_duration');
  if (savedDur !== null) {
    vsBattle.duration = parseInt(savedDur, 10);
  } else {
    vsBattle.duration = 15;
  }

  vsBattle.questionPool = buildArenaBattleDeck(vsBattle.totalRounds);

  if (typeof goToScene === 'function') {
    goToScene('vs');
  }

  updateVsScoreboard();
  updateVsDurationBadge();
  speakNatural("Arena Tanding melawan Bot Kiko dimulai! Santai saja ya sayang, pasti bisa!");
  renderVsRound();
}

function cycleVsDuration() {
  if (typeof playTonePop === 'function') playTonePop();
  var currVal = vsBattle.duration;
  var currIdx = VS_DURATIONS.findIndex(function(d) { return d.val === currVal; });
  if (currIdx === -1) currIdx = 0;
  var nextIdx = (currIdx + 1) % VS_DURATIONS.length;
  var next = VS_DURATIONS[nextIdx];

  vsBattle.duration = next.val;
  localStorage.setItem('cetta_vs_duration', next.val);
  updateVsDurationBadge();

  if (typeof speakNatural === 'function') {
    if (next.val > 0) {
      speakNatural("Waktu diatur ke " + next.val + " detik!");
    } else {
      speakNatural("Mode Santai Bebas tanpa batas waktu!");
    }
  }

  if (vsBattle.active && !vsBattle.roundLocked) {
    applyDurationToActiveRound();
  }
}

function updateVsDurationBadge() {
  var b = document.getElementById('vs-duration-badge');
  if (!b) return;
  var d = VS_DURATIONS.find(function(item) { return item.val === vsBattle.duration; });
  b.textContent = d ? d.label : (vsBattle.duration + "s");
}

function updateVsTimerDisplay() {
  var t = document.getElementById('vs-timer-text');
  if (!t) return;
  if (vsBattle.duration === 0) {
    t.textContent = "Santai (Tanpa Batas)";
    t.style.color = "#69F0AE";
  } else {
    t.textContent = vsBattle.timeLeft + " Detik";
    if (vsBattle.timeLeft <= 3) {
      t.style.color = "#FF5252";
    } else if (vsBattle.timeLeft <= 7) {
      t.style.color = "#FFD54F";
    } else {
      t.style.color = "#69F0AE";
    }
  }
}

function getBotDelayForDuration(duration) {
  if (duration === 0) return 60000;
  var minDelay = duration * 1000 * 0.72;
  var maxDelay = duration * 1000 * 0.90;
  return minDelay + Math.random() * (maxDelay - minDelay);
}

function applyDurationToActiveRound() {
  clearInterval(vsBattle.timerInterval);
  clearTimeout(vsBattle.botTimeout);

  var totalSec = vsBattle.duration;
  vsBattle.timeLeft = (totalSec > 0 ? totalSec : 999);
  updateVsTimerDisplay();

  var timerBar = document.getElementById('vs-timer-bar');
  if (timerBar) {
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    if (totalSec > 0) {
      setTimeout(function() {
        timerBar.style.transition = 'width ' + totalSec + 's linear';
        timerBar.style.width = '0%';
      }, 50);
    }
  }

  if (totalSec > 0) {
    vsBattle.timerInterval = setInterval(function() {
      vsBattle.timeLeft--;
      updateVsTimerDisplay();
      if (vsBattle.timeLeft <= 0) {
        clearInterval(vsBattle.timerInterval);
        if (!vsBattle.roundLocked) {
          onVsRoundTimeout();
        }
      }
    }, 1000);
  }

  var botDelay = getBotDelayForDuration(totalSec);
  vsBattle.botTimeout = setTimeout(function() {
    if (!vsBattle.roundLocked && vsBattle.active) {
      botAnswersNow();
    }
  }, botDelay);
}

function renderVsRound() {
  vsBattle.roundLocked = false;
  var totalSec = vsBattle.duration;
  vsBattle.timeLeft = (totalSec > 0 ? totalSec : 999);

  var pool = vsBattle.questionPool;
  var qItem = pool[(vsBattle.round - 1) % pool.length] || vsQuestionsPoolMaster[0];

  var shuffledOpts = shuffleArray(qItem.opts);
  vsBattle.currentQuestion = {
    q: qItem.q,
    ans: qItem.ans,
    shuffledOpts: shuffledOpts
  };

  var qBox = document.getElementById('vs-question-text');
  if (qBox) qBox.textContent = qItem.q;

  var roundBadge = document.getElementById('vs-round-badge');
  if (roundBadge) roundBadge.textContent = "RONDE " + vsBattle.round + " / " + vsBattle.totalRounds;

  var grid = document.getElementById('vs-answers-grid');
  if (grid) {
    grid.innerHTML = shuffledOpts.map(function(opt, idx) {
      return `
        <button class="option-btn vs-opt-btn" onclick="handleVsPlayerAnswer(this, ${idx})">
          ${opt}
        </button>
      `;
    }).join('');
  }

  updateVsDurationBadge();
  applyDurationToActiveRound();
}

function handleVsPlayerAnswer(btn, optIdx) {
  if (vsBattle.roundLocked) return;
  vsBattle.roundLocked = true;
  clearInterval(vsBattle.timerInterval);
  clearTimeout(vsBattle.botTimeout);

  var q = vsBattle.currentQuestion;
  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen === q.ans);

  if (isCorrect) {
    if (typeof playToneWhistle === 'function') playToneWhistle();
    if (typeof playToneChime === 'function') playToneChime();
    btn.classList.add('opt-correct');
    vsBattle.playerScore++;
    updateVsScoreboard();
    speakNatural("Hebat! " + window.gameState.playerName + " dapat poin!");
  } else {
    if (typeof playToneBoing === 'function') playToneBoing();
    btn.classList.add('opt-wrong');
    speakNatural("Kurang tepat sayang, poin untuk Bot Kiko!");
    vsBattle.botScore++;
    updateVsScoreboard();
  }

  setTimeout(nextVsRound, 1500);
}

function botAnswersNow() {
  if (vsBattle.roundLocked) return;
  vsBattle.roundLocked = true;
  clearInterval(vsBattle.timerInterval);

  var botCorrect = Math.random() < 0.70;
  if (botCorrect) {
    if (typeof playToneWhistle === 'function') playToneWhistle();
    vsBattle.botScore++;
    updateVsScoreboard();
    speakNatural("Bot Kiko menjawab duluan!");
  } else {
    if (typeof playToneBoing === 'function') playToneBoing();
    speakNatural("Bot Kiko salah menjawab! Kesempatan buat kamu!");
  }

  setTimeout(nextVsRound, 1500);
}

function onVsRoundTimeout() {
  vsBattle.roundLocked = true;
  if (typeof playToneBoing === 'function') playToneBoing();
  speakNatural("Waktu habis untuk ronde ini!");
  setTimeout(nextVsRound, 1200);
}

function updateVsScoreboard() {
  var pName = document.getElementById('vs-player-name-hud');
  if (pName) pName.textContent = window.gameState.playerName;

  var pScore = document.getElementById('vs-player-score');
  if (pScore) pScore.textContent = vsBattle.playerScore;

  var bScore = document.getElementById('vs-bot-score');
  if (bScore) bScore.textContent = vsBattle.botScore;
}

function nextVsRound() {
  vsBattle.round++;
  if (vsBattle.round > vsBattle.totalRounds) {
    finishVsBattle();
  } else {
    renderVsRound();
  }
}

function finishVsBattle() {
  vsBattle.active = false;
  vsBattle.roundLocked = true;
  clearInterval(vsBattle.timerInterval);
  clearTimeout(vsBattle.botTimeout);

  if (typeof playToneFanfare === 'function') playToneFanfare();
  var winnerText = "";
  if (vsBattle.playerScore > vsBattle.botScore) {
    if (typeof addGameStars === 'function') addGameStars(5);
    winnerText = "🎉 Horeee! " + window.gameState.playerName + " Juara Tanding Cetta! Kamu dapat 5 Bintang Emas!";
  } else if (vsBattle.playerScore === vsBattle.botScore) {
    if (typeof addGameStars === 'function') addGameStars(3);
    winnerText = "🤝 Seri Hebat! Kamu dan Bot Kiko sama-sama pintar! Dapat 3 Bintang Emas!";
  } else {
    if (typeof addGameStars === 'function') addGameStars(2);
    winnerText = "👏 Pertandingan seru! Bot Kiko menang tipis, yuk tanding lagi!";
  }

  speakNatural(winnerText);

  var modal = document.getElementById('modal-vs-finish');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('modal-active');
    var title = document.getElementById('vs-finish-title');
    if (title) title.textContent = (vsBattle.playerScore >= vsBattle.botScore ? "🏆 KAMU JUARANYA!" : "🤝 PERTANDINGAN SERU!");
    var sub = document.getElementById('vs-finish-sub');
    if (sub) sub.textContent = "Skor: " + window.gameState.playerName + " (" + vsBattle.playerScore + ") vs Bot Kiko (" + vsBattle.botScore + ")";
  }
}

// =========================================================
// MODE 2: DUEL ANAK VS ANAK (SPLIT-SCREEN 1 LAYAR BERHADAPAN!)
// Atas (Terbalik 180°) = Pemain 2 (Tim Oranye 🐱)
// Bawah (Normal 0°)   = Pemain 1 (Tim Hijau 🐼)
// =========================================================
function startPvpDuelBattle() {
  closeVsModal();
  currentArenaMode = 'pvp';
  pvpState.active = true;
  pvpState.round = 1;
  pvpState.p1Score = 0;
  pvpState.p2Score = 0;
  pvpState.p1Cooldown = false;
  pvpState.p2Cooldown = false;
  pvpState.roundLocked = false;
  pvpState.questionPool = buildArenaBattleDeck(pvpState.totalRounds);

  if (typeof goToScene === 'function') {
    goToScene('pvp-duel');
  }

  updatePvpScoreboard();
  renderPvpRound();
}

function updatePvpScoreboard() {
  var p1El = document.getElementById('pvp-p1-score');
  if (p1El) p1El.textContent = pvpState.p1Score;

  var p2El = document.getElementById('pvp-p2-score');
  if (p2El) p2El.textContent = pvpState.p2Score;

  var rEl = document.getElementById('pvp-round-num');
  if (rEl) rEl.textContent = pvpState.round + " / " + pvpState.totalRounds;
}

function speakPvpQuestion() {
  if (!pvpState.currentQuestion) return;
  if (typeof speakNatural === 'function') {
    speakNatural(pvpState.currentQuestion.q);
  }
}

function renderPvpRound() {
  if (!pvpState.active) return;
  pvpState.roundLocked = false;
  pvpState.p1Cooldown = false;
  pvpState.p2Cooldown = false;

  var pool = pvpState.questionPool;
  var qItem = pool[(pvpState.round - 1) % pool.length] || vsQuestionsPoolMaster[0];
  var opts = shuffleArray(qItem.opts);

  pvpState.currentQuestion = {
    q: qItem.q,
    ans: qItem.ans,
    shuffledOpts: opts
  };

  updatePvpScoreboard();

  // Render Player 1 (Bottom - Normal) & Player 2 (Top - 180deg Rotated)
  var p1Q = document.getElementById('pvp-p1-question');
  var p2Q = document.getElementById('pvp-p2-question');
  if (p1Q) p1Q.textContent = qItem.q;
  if (p2Q) p2Q.textContent = qItem.q;

  var p1Status = document.getElementById('pvp-p1-status');
  var p2Status = document.getElementById('pvp-p2-status');
  if (p1Status) p1Status.textContent = "Siap menjawab!";
  if (p2Status) p2Status.textContent = "Siap menjawab!";

  var p1Grid = document.getElementById('pvp-p1-grid');
  var p2Grid = document.getElementById('pvp-p2-grid');

  if (p1Grid) {
    p1Grid.innerHTML = opts.map(function(opt, idx) {
      return `
        <button id="pvp-p1-btn-${idx}" class="squish-btn pvp-ans-btn" onclick="handlePvpAnswer(1, ${idx}, this)">
          ${opt}
        </button>
      `;
    }).join('');
  }

  if (p2Grid) {
    p2Grid.innerHTML = opts.map(function(opt, idx) {
      return `
        <button id="pvp-p2-btn-${idx}" class="squish-btn pvp-ans-btn" onclick="handlePvpAnswer(2, ${idx}, this)">
          ${opt}
        </button>
      `;
    }).join('');
  }

  speakPvpQuestion();
}

function handlePvpAnswer(playerNum, optIdx, btnEl) {
  if (!pvpState.active || pvpState.roundLocked) return;
  if (playerNum === 1 && pvpState.p1Cooldown) return;
  if (playerNum === 2 && pvpState.p2Cooldown) return;

  var q = pvpState.currentQuestion;
  if (!q) return;

  var chosen = q.shuffledOpts[optIdx];
  var isCorrect = (chosen === q.ans);

  var statusEl = document.getElementById('pvp-p' + playerNum + '-status');
  var oppNum = (playerNum === 1 ? 2 : 1);
  var oppStatusEl = document.getElementById('pvp-p' + oppNum + '-status');

  if (isCorrect) {
    pvpState.roundLocked = true;
    if (typeof playToneChime === 'function') playToneChime();
    if (btnEl) btnEl.classList.add('opt-correct');

    if (playerNum === 1) {
      pvpState.p1Score++;
    } else {
      pvpState.p2Score++;
    }
    updatePvpScoreboard();

    if (statusEl) statusEl.textContent = "🎉 HEBAT! +1 Poin!";
    if (oppStatusEl) oppStatusEl.textContent = "👏 Bagus! Siap ronde berikutnya!";

    var teamLabel = (playerNum === 1 ? "Tim Pandi Hijau" : "Tim Miko Oranye");
    if (typeof speakNatural === 'function') {
      speakNatural(teamLabel + " benar dan cepat sekali!");
    }

    setTimeout(function() {
      pvpState.round++;
      if (pvpState.round > pvpState.totalRounds) {
        finishPvpDuel();
      } else {
        renderPvpRound();
      }
    }, 1500);
  } else {
    // Gentle anti-spam cooldown ONLY on the tapping player's side (opponent can still answer!)
    if (typeof playToneBoing === 'function') playToneBoing();
    if (btnEl) btnEl.classList.add('opt-wrong');

    if (playerNum === 1) {
      pvpState.p1Cooldown = true;
    } else {
      pvpState.p2Cooldown = true;
    }
    if (statusEl) statusEl.textContent = "⏳ Ups, tunggu sebentar ya!";

    setTimeout(function() {
      if (btnEl) btnEl.classList.remove('opt-wrong');
      if (playerNum === 1) pvpState.p1Cooldown = false;
      else pvpState.p2Cooldown = false;
      if (!pvpState.roundLocked && statusEl) {
        statusEl.textContent = "Ayo coba lagi!";
      }
    }, 1200);
  }
}

function finishPvpDuel() {
  pvpState.active = false;
  pvpState.roundLocked = true;
  if (typeof playToneFanfare === 'function') playToneFanfare();
  if (typeof triggerConfetti === 'function') triggerConfetti();
  if (typeof addGameStars === 'function') addGameStars(3);

  var titleText = "🏆 DUEL SERU SELESAI!";
  var speechText = "";
  if (pvpState.p1Score > pvpState.p2Score) {
    titleText = "🏆 TIM PANDI 🐼 MENANG!";
    speechText = "Horeee! Tim Pandi unggul! Kedua pemain hebat sekali dapat tiga bintang!";
  } else if (pvpState.p2Score > pvpState.p1Score) {
    titleText = "🏆 TIM MIKO 🐱 MENANG!";
    speechText = "Horeee! Tim Miko unggul! Kedua pemain hebat sekali dapat tiga bintang!";
  } else {
    titleText = "🤝 SERI! DUA-DUANYA JUARA!";
    speechText = "Wah hebat! Tim Pandi dan Tim Miko seri! Kalian sama-sama cerdas!";
  }

  if (typeof speakNatural === 'function') speakNatural(speechText);

  var modal = document.getElementById('modal-vs-finish');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('modal-active');
    var titleEl = document.getElementById('vs-finish-title');
    if (titleEl) titleEl.textContent = titleText;
    var subEl = document.getElementById('vs-finish-sub');
    if (subEl) subEl.textContent = "🐼 Tim Pandi (" + pvpState.p1Score + ") vs 🐱 Tim Miko (" + pvpState.p2Score + ") • +3 Bintang Bersama ⭐";
  }
}
