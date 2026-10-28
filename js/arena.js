// =========================================================
// ARENA.JS - ARENA TANDING GELUD VS BOT KIKO (REAL 5 ROUNDS)
// Expanded Question Pool & 100% Shuffled Random Options
// =========================================================

var vsBattle = {
  active: false,
  round: 1,
  totalRounds: 5,
  playerScore: 0,
  botScore: 0,
  timerInterval: null,
  timeLeft: 5,
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

function startVsBattle() {
  playTonePop();
  vsBattle.active = true;
  vsBattle.round = 1;
  vsBattle.playerScore = 0;
  vsBattle.botScore = 0;
  vsBattle.roundLocked = false;

  // Shuffle entire pool so questions never repeat in a battle
  vsBattle.questionPool = shuffleArray(vsQuestionsPoolMaster);

  goToScene('vs');
  updateVsScoreboard();
  speakNatural("Arena Tanding dimulai! Siapa yang paling cepat? Satu, dua, tiga, serbuuu!");
  renderVsRound();
}

function renderVsRound() {
  vsBattle.roundLocked = false;
  vsBattle.timeLeft = 5;
  clearInterval(vsBattle.timerInterval);
  clearTimeout(vsBattle.botTimeout);

  var pool = vsBattle.questionPool;
  var qItem = pool[(vsBattle.round - 1) % pool.length] || vsQuestionsPoolMaster[0];

  // Shuffle the 4 options so the answer is never locked to option A!
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

  // Timer Bar Animation
  var timerBar = document.getElementById('vs-timer-bar');
  if (timerBar) {
    timerBar.style.width = '100%';
    timerBar.style.transition = 'none';
    setTimeout(function() {
      timerBar.style.transition = 'width 5s linear';
      timerBar.style.width = '0%';
    }, 50);
  }

  // Timer Countdown
  vsBattle.timerInterval = setInterval(function() {
    vsBattle.timeLeft--;
    if (vsBattle.timeLeft <= 0) {
      clearInterval(vsBattle.timerInterval);
      if (!vsBattle.roundLocked) {
        onVsRoundTimeout();
      }
    }
  }, 1000);

  // Bot Kiko AI Decision (Answers between 2.2s and 3.8s)
  var botDelay = 2200 + Math.random() * 1600;
  vsBattle.botTimeout = setTimeout(function() {
    if (!vsBattle.roundLocked && vsBattle.active) {
      botAnswersNow();
    }
  }, botDelay);
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
    playToneWhistle();
    playToneChime();
    btn.classList.add('opt-correct');
    vsBattle.playerScore++;
    updateVsScoreboard();
    speakNatural("Hebat! " + window.gameState.playerName + " dapat poin!");
  } else {
    playToneBoing();
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

  // 75% Bot is correct
  var botCorrect = Math.random() < 0.75;
  if (botCorrect) {
    playToneWhistle();
    vsBattle.botScore++;
    updateVsScoreboard();
    speakNatural("Bot Kiko menjawab duluan!");
  } else {
    playToneBoing();
    speakNatural("Bot Kiko salah menjawab! Kesempatan buat kamu!");
  }

  setTimeout(nextVsRound, 1500);
}

function onVsRoundTimeout() {
  vsBattle.roundLocked = true;
  playToneBoing();
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
  clearInterval(vsBattle.timerInterval);
  clearTimeout(vsBattle.botTimeout);

  playToneFanfare();
  var winnerText = "";
  if (vsBattle.playerScore > vsBattle.botScore) {
    addGameStars(5);
    winnerText = "🎉 Horeee! " + window.gameState.playerName + " Juara Tanding Cetta! Kamu dapat 5 Bintang Emas!";
  } else if (vsBattle.playerScore === vsBattle.botScore) {
    addGameStars(3);
    winnerText = "🤝 Seri Hebat! Kamu dan Bot Kiko sama-sama pintar! Dapat 3 Bintang Emas!";
  } else {
    addGameStars(2);
    winnerText = "👏 Pertandingan seru! Bot Kiko menang tipis, yuk tanding lagi!";
  }

  speakNatural(winnerText);

  var modal = document.getElementById('modal-vs-finish');
  if (modal) {
    var title = document.getElementById('vs-finish-title');
    if (title) title.textContent = (vsBattle.playerScore >= vsBattle.botScore ? "🏆 KAMU JUARANYA!" : "🤝 PERTANDINGAN SERU!");
    var sub = document.getElementById('vs-finish-sub');
    if (sub) sub.textContent = "Skor: " + window.gameState.playerName + " (" + vsBattle.playerScore + ") vs Bot Kiko (" + vsBattle.botScore + ")";
    modal.classList.add('modal-active');
  }
}
