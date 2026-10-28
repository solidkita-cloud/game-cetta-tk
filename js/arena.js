// =========================================================
// ARENA.JS - ARENA TANDING GELUD VS BOT KIKO (5 ROUNDS)
// Dynamic Kid-Friendly Timer (15s Default, 20s, Bebas, 10s, 5s)
// Bulletproof Modal Dismissal & Instant Map Navigation
// =========================================================

var VS_DURATIONS = [
  { val: 15, label: "15s (Santai) 🟢", desc: "Cocok untuk TK / PAUD" },
  { val: 20, label: "20s (Sangat Santai) 🟢", desc: "Banyak Waktu Berpikir" },
  { val: 0,  label: "Tanpa Waktu (Bebas) 🧘", desc: "Santai Sepuasnya" },
  { val: 10, label: "10s (Sedang) 🟡", desc: "Mulai Lancar Membaca" },
  { val: 5,  label: "5s (Kilat) 🔴", desc: "Tantangan Cepat" }
];

var vsBattle = {
  active: false,
  round: 1,
  totalRounds: 5,
  playerScore: 0,
  botScore: 0,
  duration: 15, // Default 15 seconds
  timeLeft: 15,
  timerInterval: null,
  botTimeout: null,
  roundLocked: false,
  questionPool: [],
  currentQuestion: null
};

var vsQuestionsPoolMaster = [
  { q: "M-A ditambah T-A dibaca apa?", ans: "MATA 👀", opts: ["MATA 👀", "BAJU 👕", "KUKU 💅", "BOLA ⚽"] },
  { q: "1 ditambah 2 sama dengan berapa?", ans: "3 ⭐", opts: ["2", "3 ⭐", "4", "5"] },
  { q: "Hewan apa yang bersuara 'Moo moo'?", ans: "Sapi 🐄", opts: ["Ayam 🐔", "Sapi 🐄", "Kucing 🐱", "Kuda 🐴"] },
  { q: "Warna langit cerah di siang hari apa?", ans: "Biru 💧", opts: ["Merah 🍎", "Biru 💧", "Hijau 🌿", "Hitam 🌑"] },
  { q: "Kelinci suka makan sayur apa?", ans: "Wortel 🥕", opts: ["Wortel 🥕", "Batu 🪨", "Kayu 🪵", "Cabai 🌶️"] },
  { q: "B-A ditambah J-U dibaca apa?", ans: "BAJU 👕", opts: ["BOLA ⚽", "BAJU 👕", "ROTI 🍞", "BUKU 📖"] },
  { q: "Kendaraan yang terbang tinggi di awan?", ans: "Pesawat ✈️", opts: ["Mobil 🚗", "Kapal 🚢", "Pesawat ✈️", "Sepeda 🚲"] },
  { q: "Benda langit yang bersinar di malam hari?", ans: "Bulan 🌙", opts: ["Matahari ☀️", "Bulan 🌙", "Pelangi 🌈", "Awan ☁️"] },
  { q: "2 ditambah 2 sama dengan berapa?", ans: "4 ⭐", opts: ["3", "4 ⭐", "5", "6"] },
  { q: "Hewan apa yang suka makan pisang?", ans: "Monyet 🐒", opts: ["Monyet 🐒", "Singa 🦁", "Ikan 🐟", "Kuda 🐴"] },
  { q: "B-O ditambah L-A dibaca apa?", ans: "BOLA ⚽", opts: ["BOLA ⚽", "BUKU 📚", "BATA 🧱", "BIRU 💧"] },
  { q: "Warna buah pisang yang matang manis apa?", ans: "Kuning ⭐", opts: ["Kuning ⭐", "Biru 💧", "Hitam 🌑", "Ungu 🍇"] },
  { q: "Kiblat sholat umat Islam menghadap ke mana?", ans: "Ka'bah 🕋", opts: ["Ka'bah 🕋", "Gunung ⛰️", "Lautan 🌊", "Pohon 🌳"] },
  { q: "R-O ditambah T-I dibaca apa?", ans: "ROTI 🍞", opts: ["ROTI 🍞", "RODA 🛞", "RUSA 🦌", "RAKIT 🪵"] },
  { q: "Hewan yang bersuara 'Kukuruyuk' di pagi hari?", ans: "Ayam Jago 🐓", opts: ["Ayam Jago 🐓", "Bebek 🦆", "Kucing 🐱", "Kambing 🐐"] },
  { q: "3 ditambah 1 sama dengan berapa?", ans: "4 ⭐", opts: ["2", "3", "4 ⭐", "5"] },
  { q: "Benda langit yang muncul sehabis hujan reda?", ans: "Pelangi 🌈", opts: ["Pelangi 🌈", "Petir ⚡", "Lampu 💡", "Awan Hitam ☁️"] },
  { q: "Kucing suka makan lauk apa?", ans: "Ikan 🐟", opts: ["Ikan 🐟", "Daun 🍃", "Batu 🪨", "Soda 🥤"] },
  { q: "Kendaraan yang berjalan di atas rel besi?", ans: "Kereta Api 🚂", opts: ["Kereta Api 🚂", "Mobil 🚗", "Kapal 🚢", "Pesawat ✈️"] },
  { q: "Sayur berwarna oranye yang menyehatkan mata?", ans: "Wortel 🥕", opts: ["Wortel 🥕", "Permen 🍬", "Cokelat 🍫", "Es Krim 🍦"] },
  { q: "Sebelum makan dan minum kita membaca doa apa?", ans: "Bismillah 🤲", opts: ["Bismillah 🤲", "Horeee 🎉", "Aduh 😮", "Halo 👋"] },
  { q: "Bentuk roda sepeda dan bola adalah apa?", ans: "Lingkaran 🟡", opts: ["Lingkaran 🟡", "Kotak 🟦", "Segitiga 🔺", "Bintang ⭐"] },
  { q: "5 dikurang 2 sama dengan berapa?", ans: "3 ⭐", opts: ["1", "2", "3 ⭐", "4"] },
  { q: "B-U ditambah K-U dibaca apa?", ans: "BUKU 📚", opts: ["BUKU 📚", "BUSA 🧼", "BULU 🪶", "BUMI 🌍"] },
  { q: "Panda yang lucu suka makan apa?", ans: "Bambu 🎋", opts: ["Bambu 🎋", "Burger 🍔", "Permen 🍬", "Es Krim 🍦"] }
];

function closeVsModal() {
  var modal = document.getElementById('modal-vs-finish');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}

function exitVsBattleToMap() {
  // 1. Force close and hide all modals directly
  closeVsModal();
  var allModals = document.querySelectorAll('.game-modal-overlay');
  allModals.forEach(function(m) {
    m.classList.remove('modal-active');
    m.style.display = 'none';
  });

  // 2. Clear all battle timers and state
  vsBattle.active = false;
  vsBattle.roundLocked = true;
  clearInterval(vsBattle.timerInterval);
  vsBattle.timerInterval = null;
  clearTimeout(vsBattle.botTimeout);
  vsBattle.botTimeout = null;

  // 3. Switch scenes immediately to map
  var scenes = document.querySelectorAll('.scene-view');
  scenes.forEach(function(s) {
    s.classList.remove('active-scene');
  });
  var mapScene = document.getElementById('scene-map');
  if (mapScene) {
    mapScene.classList.add('active-scene');
  }

  // 4. Reactivate bubbles on map
  var bubbleLayer = document.getElementById('floating-bubbles-container');
  if (bubbleLayer) bubbleLayer.style.display = 'block';

  if (typeof playTonePop === 'function') playTonePop();
  if (typeof setMascotSpeech === 'function') {
    setMascotSpeech("Kembali ke Peta Wahana! Pilih permainan lainnya yuk! 🗺️✨");
  }
}

function startVsBattle() {
  // Ensure clean exit from any lingering state
  exitVsBattleToMap();
  if (typeof playTonePop === 'function') playTonePop();

  vsBattle.active = true;
  vsBattle.round = 1;
  vsBattle.playerScore = 0;
  vsBattle.botScore = 0;
  vsBattle.roundLocked = false;

  // Load saved duration (default 15s)
  var savedDur = localStorage.getItem('cetta_vs_duration');
  if (savedDur !== null) {
    vsBattle.duration = parseInt(savedDur, 10);
  } else {
    vsBattle.duration = 15;
  }

  // Shuffle pool so questions are randomized
  vsBattle.questionPool = shuffleArray(vsQuestionsPoolMaster);

  // Switch to VS scene
  var scenes = document.querySelectorAll('.scene-view');
  scenes.forEach(function(s) {
    s.classList.remove('active-scene');
  });
  var vsScene = document.getElementById('scene-vs');
  if (vsScene) vsScene.classList.add('active-scene');

  var bubbleLayer = document.getElementById('floating-bubbles-container');
  if (bubbleLayer) bubbleLayer.style.display = 'none';

  updateVsScoreboard();
  updateVsDurationBadge();
  speakNatural("Arena Tanding dimulai! Santai saja ya sayang, pasti bisa!");
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

  // Apply immediately to current round if in battle
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
  if (duration === 0) {
    // Tanpa batas waktu: Bot Kiko will wait 60 seconds (giving child unlimited time)
    return 60000;
  }
  // Bot gives player at least 70% - 88% of total time before answering!
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

  // 70% Bot is correct
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
