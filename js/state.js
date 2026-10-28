// =========================================================
// GAME STATE & PERSISTENT STORAGE
// =========================================================

var defaultGameState = {
  playerName: "ALI",
  role: "bu_guru", // 'bu_guru', 'pak_guru', 'murid'
  selectedMascot: "pandi", // 'pandi', 'miko'
  stars: 18,
  gardenLevel: 2,
  eggCrackStage: 1, // 0: bulat, 1: retak 1, 2: retak 2, 3: menetas 🐣
  treehouseLevel: 1,
  selectedMotherReward: "🍦 Makan Es Krim Bareng Ibu",
  currentStage: null,
  // Wahana Progress Tracking
  progress: {
    huruf: { completed: 0, bestScore: 0 },
    suku: { level: 0, wordIdx: 0 },
    hitung: { currentQ: 0, correctCount: 0 },
    warna: { completed: 0 },
    bentuk: { completed: 0 },
    hewan: { currentIdx: 0 },
    makan: { currentIdx: 0 },
    kendaraan: { currentIdx: 0 },
    sayur: { basketCount: 0 },
    islam: { currentIdx: 0 },
    langit: { timeMode: 'day' }
  }
};

window.gameState = Object.assign({}, defaultGameState);

function loadGameState() {
  try {
    var saved = localStorage.getItem('cetta_petualangan_state_v2');
    if (saved) {
      var parsed = JSON.parse(saved);
      window.gameState = Object.assign({}, defaultGameState, parsed);
    }
  } catch (e) {
    console.warn("Storage load error, using defaults:", e);
  }
}

function saveGameState() {
  try {
    localStorage.setItem('cetta_petualangan_state_v2', JSON.stringify(window.gameState));
  } catch (e) {
    console.warn("Storage save error:", e);
  }
}

function addGameStars(count) {
  window.gameState.stars += count;
  
  // Living World Progression Milestones
  if (window.gameState.stars >= 25 && window.gameState.eggCrackStage < 3) {
    window.gameState.eggCrackStage = 3; // Menetas!
  } else if (window.gameState.stars >= 15 && window.gameState.eggCrackStage < 2) {
    window.gameState.eggCrackStage = 2; // Retak banyak
  } else if (window.gameState.stars >= 5 && window.gameState.eggCrackStage < 1) {
    window.gameState.eggCrackStage = 1; // Retak sedikit
  }

  if (window.gameState.stars >= 30) {
    window.gameState.gardenLevel = 4;
  } else if (window.gameState.stars >= 20) {
    window.gameState.gardenLevel = 3;
  } else if (window.gameState.stars >= 10) {
    window.gameState.gardenLevel = 2;
  }

  saveGameState();
  updateHUD();
}

function updateHUD() {
  var starEl = document.getElementById('hud-star-count');
  if (starEl) starEl.textContent = window.gameState.stars;

  var starClones = document.querySelectorAll('.hud-stars-clone');
  starClones.forEach(function(el) {
    el.textContent = window.gameState.stars;
  });

  var gardenEl = document.getElementById('world-garden-status');
  if (gardenEl) gardenEl.textContent = "🌸 Kebun Lv." + window.gameState.gardenLevel;

  var eggEl = document.getElementById('world-egg-status');
  if (eggEl) {
    if (window.gameState.eggCrackStage >= 3) {
      eggEl.innerHTML = "🐣 <b>Burung Cetta Menetas!</b>";
    } else if (window.gameState.eggCrackStage === 2) {
      eggEl.innerHTML = "🥚 ⚡⚡ Telur Retak Banyak!";
    } else if (window.gameState.eggCrackStage === 1) {
      eggEl.innerHTML = "🥚 ⚡ Telur Retak Sedikit";
    } else {
      eggEl.innerHTML = "🥚 Telur Rahasia";
    }
  }

  var rewardText = document.getElementById('active-reward-display');
  if (rewardText) {
    rewardText.textContent = window.gameState.selectedMotherReward;
  }
}

// Initial load
loadGameState();
