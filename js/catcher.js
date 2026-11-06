// =========================================================
// JS/CATCHER.JS - TANGKAP BUAH JATUH (BASKET REFLEX MINI-GAME)
// Hand-Eye Coordination & Visual Tracking for Preschoolers
// =========================================================

var FRUITS_TO_CATCH = [
  { name: 'Apel', emoji: '🍎', pts: 1, isRock: false },
  { name: 'Stroberi', emoji: '🍓', pts: 1, isRock: false },
  { name: 'Pisang', emoji: '🍌', pts: 1, isRock: false },
  { name: 'Jeruk', emoji: '🍊', pts: 1, isRock: false },
  { name: 'Bintang Emas', emoji: '⭐', pts: 2, isRock: false },
  { name: 'Batu Kali', emoji: '🪨', pts: 0, isRock: true }
];

var catcherState = {
  score: 0,
  targetScore: 10,
  basketX: 50, // Percentage 10% - 90%
  fallingItems: [],
  isRunning: false,
  animationId: null,
  spawnInterval: null
};

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openCatcherStudio() {
  goToScene('catcher');
  setMascotSpeech("Geser keranjang ke kiri dan kanan untuk menangkap buah segar ya! 🧺🍎🍌✨");
  speakNatural("Geser keranjang untuk menangkap buah yang jatuh!");
  startCatcherGame();
}

function exitCatcherToMap() {
  stopCatcherGame();
  goToScene('map');
}

// ---------------------------------------------------------
// Game Engine Loops
// ---------------------------------------------------------
function startCatcherGame() {
  stopCatcherGame();

  catcherState.score = 0;
  catcherState.basketX = 50;
  catcherState.fallingItems = [];
  catcherState.isRunning = true;

  renderCatcherStage();
  bindCatcherControls();

  // Spawn items every 1400ms (gentle preschool tempo)
  catcherState.spawnInterval = setInterval(function() {
    if (!catcherState.isRunning) return;
    spawnFallingFruit();
  }, 1400);

  // Animation Loop
  function loop() {
    if (!catcherState.isRunning) return;
    updateCatcherPhysics();
    catcherState.animationId = requestAnimationFrame(loop);
  }
  catcherState.animationId = requestAnimationFrame(loop);
}

function stopCatcherGame() {
  catcherState.isRunning = false;
  if (catcherState.spawnInterval) clearInterval(catcherState.spawnInterval);
  if (catcherState.animationId) cancelAnimationFrame(catcherState.animationId);
}

function spawnFallingFruit() {
  var pick = FRUITS_TO_CATCH[Math.floor(Math.random() * FRUITS_TO_CATCH.length)];
  catcherState.fallingItems.push({
    id: Date.now() + Math.random(),
    name: pick.name,
    emoji: pick.emoji,
    pts: pick.pts,
    isRock: pick.isRock,
    x: Math.floor(Math.random() * 75) + 12, // 12% .. 87%
    y: -10, // starts above top
    speed: 0.65 + Math.random() * 0.35 // Gentle slow falling speed
  });
}

function updateCatcherPhysics() {
  var arena = document.getElementById('catcher-arena');
  if (!arena) return;

  var basketEl = document.getElementById('catcher-basket');
  var scoreBadge = document.getElementById('catcher-score-text');
  var basketLeft = catcherState.basketX;

  // Move items down
  for (var i = catcherState.fallingItems.length - 1; i >= 0; i--) {
    var item = catcherState.fallingItems[i];
    item.y += item.speed;

    // Check collision with basket (basket is around y: 80% to 92%)
    if (item.y >= 78 && item.y <= 88) {
      // Horizontal hit detection (within ±14%)
      if (Math.abs(item.x - basketLeft) < 14) {
        // CATCH!
        if (item.isRock) {
          playToneBoing();
          if (basketEl) {
            basketEl.classList.add('anim-wiggle');
            setTimeout(function() { basketEl.classList.remove('anim-wiggle'); }, 400);
          }
        } else {
          playTonePop();
          catcherState.score += item.pts;
          if (basketEl) {
            basketEl.classList.add('anim-squish');
            setTimeout(function() { basketEl.classList.remove('anim-squish'); }, 300);
          }

          if (scoreBadge) {
            scoreBadge.textContent = `${catcherState.score} / ${catcherState.targetScore} Buah`;
          }

          // Check if target filled!
          if (catcherState.score >= catcherState.targetScore) {
            triggerCatcherVictory();
            return;
          }
        }

        catcherState.fallingItems.splice(i, 1);
        continue;
      }
    }

    // Remove if fallen below floor
    if (item.y > 105) {
      catcherState.fallingItems.splice(i, 1);
    }
  }

  renderFallingDomElements(arena);
}

function renderFallingDomElements(arena) {
  var container = document.getElementById('catcher-falling-layer');
  if (!container) return;

  container.innerHTML = catcherState.fallingItems.map(function(item) {
    return `
      <div style="position:absolute; left:${item.x}%; top:${item.y}%; font-size:36px; transform:translate(-50%, -50%); filter:drop-shadow(0 4px 6px rgba(0,0,0,0.15)); user-select:none; pointer-events:none;">
        ${item.emoji}
      </div>
    `;
  }).join('');
}

// ---------------------------------------------------------
// Touch & Drag Controls
// ---------------------------------------------------------
function bindCatcherControls() {
  var arena = document.getElementById('catcher-arena');
  if (!arena) return;

  function updateBasketPosition(clientX) {
    var rect = arena.getBoundingClientRect();
    var percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(12, Math.min(88, percent));
    catcherState.basketX = percent;

    var basketEl = document.getElementById('catcher-basket');
    if (basketEl) {
      basketEl.style.left = percent + '%';
    }
  }

  arena.onpointerdown = function(e) {
    updateBasketPosition(e.clientX);
  };
  arena.onpointermove = function(e) {
    if (e.buttons > 0 || e.pointerType === 'touch') {
      updateBasketPosition(e.clientX);
    }
  };
}

function nudgeBasket(dir) {
  var next = catcherState.basketX + (dir * 18);
  next = Math.max(12, Math.min(88, next));
  catcherState.basketX = next;

  var basketEl = document.getElementById('catcher-basket');
  if (basketEl) {
    basketEl.style.left = next + '%';
  }
}

// ---------------------------------------------------------
// Render Stage UI
// ---------------------------------------------------------
function renderCatcherStage() {
  var container = document.getElementById('catcher-stage-container');
  if (!container) return;

  var html = `
    <!-- Mission Header & Score -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:10px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2.5px solid #FFB74D; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:11px; font-weight:800; color:#E65100; text-transform:uppercase;">
          MISI KERANJANG PANEN
        </div>
        <div style="font-size:15px; font-weight:900; color:#37474F;">
          Tangkap 10 Buah Segar! 🍎🍓🍌
        </div>
      </div>
      <div style="font-size:14px; font-weight:900; background:#FFF3E0; color:#E65100; padding:6px 14px; border-radius:14px; border:1px solid #FFE082;">
        🧺 <span id="catcher-score-text">${catcherState.score} / ${catcherState.targetScore} Buah</span>
      </div>
    </div>

    <!-- Interactive Falling Arena -->
    <div id="catcher-arena" 
         style="width:100%; height:290px; background:linear-gradient(180deg, #81C784 8%, #C8E6C9 20%, #E8F5E9 75%, #A5D6A7 85%, #66BB6A 100%); border-radius:26px; border:4px solid #388E3C; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; overflow:hidden; touch-action:none; user-select:none; -webkit-user-select:none;">
      
      <!-- Tree Leaves Canopy at Top -->
      <div style="position:absolute; top:-12px; left:0; right:0; height:32px; background:radial-gradient(ellipse at 50% 0%, #2E7D32, #4CAF50); border-radius:0 0 50% 50%; opacity:0.85;"></div>

      <!-- Falling Fruits Layer -->
      <div id="catcher-falling-layer" style="position:absolute; inset:0; pointer-events:none;"></div>

      <!-- The Movable Basket -->
      <div id="catcher-basket" 
           style="position:absolute; bottom:16px; left:${catcherState.basketX}%; transform:translateX(-50%); font-size:52px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2)); cursor:grab; transition:left 0.05s linear; pointer-events:none;">
        🧺
      </div>
    </div>

    <!-- On-Screen Big Button Controls for Accessibility -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; gap:12px;">
      <button class="squish-btn" 
              style="flex:1; background:#FFF; border:2px solid #81C784; border-radius:16px; padding:10px 0; font-size:22px; font-weight:900; color:#2E7D32;"
              onclick="nudgeBasket(-1)">
        ⬅️ Kiri
      </button>

      <button class="squish-btn btn-pill" 
              style="background:#FFF3E0; border:1.5px solid #FFB74D; color:#E65100; font-size:12px; font-weight:800; padding:10px 14px;"
              onclick="startCatcherGame()">
        🔄 Main Ulang
      </button>

      <button class="squish-btn" 
              style="flex:1; background:#FFF; border:2px solid #81C784; border-radius:16px; padding:10px 0; font-size:22px; font-weight:900; color:#2E7D32;"
              onclick="nudgeBasket(1)">
        Kanan ➡️
      </button>
    </div>
  `;

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Victory Celebration
// ---------------------------------------------------------
function triggerCatcherVictory() {
  stopCatcherGame();
  playToneFanfare();

  if (typeof addProfileStars === 'function') addProfileStars(2);
  if (typeof addGameStars === 'function') addGameStars(2);

  var pName = (window.gameState && window.gameState.playerName) ? window.gameState.playerName : 'Cetta';
  setMascotSpeech("YUMMY! Keranjang buah " + pName + " sudah penuh terisi! Jus buah segar siap diminum! Dapat +2 Bintang! 🧃⭐🎉");
  speakNatural("Hebat sekali! Keranjang buahmu sudah penuh!");

  var arena = document.getElementById('catcher-arena');
  if (arena) {
    arena.innerHTML = `
      <div style="position:absolute; inset:0; background:rgba(255,255,255,0.92); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:16px; text-align:center;">
        <div style="font-size:60px;">🧺 🍎 🍓 🍌 ✨</div>
        <div style="font-size:22px; font-weight:900; color:#2E7D32; margin-top:8px;">KERANJANG PANEN PENUH!</div>
        <div style="font-size:14px; font-weight:700; color:#558B2F; margin:4px 0 14px;">Kamu berhasil mengumpulkan 10 buah segar!</div>
        <button class="squish-btn btn-primary btn-pill" style="font-size:14px; padding:10px 24px; background:#4CAF50;" onclick="startCatcherGame()">
          Main Panen Lagi 🔄
        </button>
      </div>
    `;
  }

  if (typeof triggerConfetti === 'function') triggerConfetti();
}
