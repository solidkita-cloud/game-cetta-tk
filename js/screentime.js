// =========================================================
// JS/SCREENTIME.JS - PENGINGAT SAYANG MATA (PARENTAL SCREEN TIME)
// Gentle preschool-friendly screen time protection with
// eye relaxation exercises and parental math gate unlock.
// =========================================================

var screenTimeState = {
  limitMinutes: 15, // Default 15 mins for preschool
  elapsedSeconds: 0,
  isActive: true,
  isResting: false,
  gateNumA: 4,
  gateNumB: 3,
  tickerInterval: null
};

// ---------------------------------------------------------
// Initialization & Storage
// ---------------------------------------------------------
function initScreenTimeSystem() {
  try {
    var savedLimit = localStorage.getItem('cetta_screen_timer_min');
    if (savedLimit !== null) {
      screenTimeState.limitMinutes = parseInt(savedLimit, 10);
    }
  } catch (e) {
    console.warn("Storage error screen time", e);
  }

  updateScreenTimeHudBadge();
  startScreenTimeTicker();
}

function startScreenTimeTicker() {
  if (screenTimeState.tickerInterval) clearInterval(screenTimeState.tickerInterval);

  screenTimeState.tickerInterval = setInterval(function() {
    // Only count if screen timer is enabled (> 0), not currently resting, and document is visible
    if (screenTimeState.limitMinutes > 0 && !screenTimeState.isResting && !document.hidden) {
      screenTimeState.elapsedSeconds++;

      var maxSeconds = screenTimeState.limitMinutes * 60;
      if (screenTimeState.elapsedSeconds >= maxSeconds) {
        triggerEyeRestScene();
      }

      // Update badge every 5 seconds to reduce DOM churn
      if (screenTimeState.elapsedSeconds % 5 === 0) {
        updateScreenTimeHudBadge();
      }
    }
  }, 1000);
}

function updateScreenTimeHudBadge() {
  var badge = document.getElementById('hud-screen-timer-btn');
  if (!badge) return;

  if (screenTimeState.limitMinutes <= 0) {
    badge.innerHTML = '👁️ Bebas';
    badge.title = 'Batas Waktu Layar: Mati (Bebas)';
    badge.style.background = '#ECEFF1';
    badge.style.color = '#455A64';
    return;
  }

  var maxSeconds = screenTimeState.limitMinutes * 60;
  var remaining = Math.max(0, maxSeconds - screenTimeState.elapsedSeconds);
  var remMin = Math.ceil(remaining / 60);

  badge.innerHTML = '👁️ ' + remMin + 'm';
  badge.title = 'Sisa Waktu Layar Anak: ' + remMin + ' Menit';
  
  if (remMin <= 3) {
    badge.style.background = '#FFEBEE';
    badge.style.color = '#C62828';
    badge.style.borderColor = '#EF9A9A';
  } else {
    badge.style.background = '#E8F5E9';
    badge.style.color = '#2E7D32';
    badge.style.borderColor = '#A5D6A7';
  }
}

// ---------------------------------------------------------
// Parental Settings Modal
// ---------------------------------------------------------
function openScreenTimeModal() {
  playTonePop();
  var m = document.getElementById('modal-screen-time');
  if (m) m.classList.add('modal-active');
  renderScreenTimeModal();
}

function closeScreenTimeModal() {
  playTonePop();
  var m = document.getElementById('modal-screen-time');
  if (m) m.classList.remove('modal-active');
}

function setScreenTimeLimit(minutes) {
  playTonePop();
  screenTimeState.limitMinutes = minutes;
  screenTimeState.elapsedSeconds = 0; // reset active timer on new setting
  try {
    localStorage.setItem('cetta_screen_timer_min', minutes);
  } catch (e) {}

  updateScreenTimeHudBadge();
  renderScreenTimeModal();

  if (minutes > 0) {
    setMascotSpeech("Pengingat Sayang Mata diatur " + minutes + " menit ya Ayah/Bunda! ⏰🌱");
  } else {
    setMascotSpeech("Batas waktu layar dinonaktifkan (Bebas). 🎈");
  }
}

function renderScreenTimeModal() {
  var optionsBox = document.getElementById('screen-time-options');
  if (!optionsBox) return;

  var opts = [
    { min: 10, label: '🟢 10 Menit', desc: 'Sangat santai untuk balita' },
    { min: 15, label: '🟡 15 Menit', desc: 'Rekomendasi ideal PAUD / TK' },
    { min: 20, label: '🟠 20 Menit', desc: 'Standar belajar interaktif' },
    { min: 0, label: '⚪ Bebas (Mati)', desc: 'Tanpa pengingat otomatis' }
  ];

  optionsBox.innerHTML = opts.map(function(o) {
    var isSel = (screenTimeState.limitMinutes === o.min);
    return `
      <div class="squish-btn" 
           style="background:${isSel ? '#E8F5E9' : '#FFF'}; border:2px solid ${isSel ? '#2E7D32' : '#E0E0E0'}; border-radius:16px; padding:12px 14px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;"
           onclick="setScreenTimeLimit(${o.min})">
        <div>
          <div style="font-size:15px; font-weight:800; color:${isSel ? '#2E7D32' : '#37474F'};">${o.label}</div>
          <div style="font-size:11px; color:#757575;">${o.desc}</div>
        </div>
        ${isSel ? '<span style="font-size:18px;">✅</span>' : ''}
      </div>
    `;
  }).join('');
}

// ---------------------------------------------------------
// Trigger Eye Rest Scene (Peaceful & Non-Punitive)
// ---------------------------------------------------------
function triggerEyeRestScene() {
  screenTimeState.isResting = true;
  playToneLullabyRest();
  goToScene('eye-rest');

  // Random gentle math challenge for parental gate
  screenTimeState.gateNumA = Math.floor(Math.random() * 5) + 2; // 2..6
  screenTimeState.gateNumB = Math.floor(Math.random() * 4) + 1; // 1..4

  renderEyeRestScene();

  var mascotName = (window.gameState && window.gameState.selectedMascot === 'pandi') ? 'Pandi' : 'Miko';
  setMascotSpeech("Hoaaamm... Waktunya istirahat sayang mata dulu ya! Minum air putih dan lihat jendela hijau! 🍵🌳");
  speakNatural("Waktunya istirahat sayang mata dulu ya! Minum air putih dan pandang pepohonan hijau!");
}

function renderEyeRestScene() {
  var container = document.getElementById('eye-rest-container');
  if (!container) return;

  var sum = screenTimeState.gateNumA + screenTimeState.gateNumB;

  var html = `
    <div style="max-width:440px; margin:0 auto; text-align:center; padding:20px 14px; color:#FFF;">
      
      <!-- Sleeping Mascot Animation -->
      <div style="font-size:74px; margin-bottom:8px; animation:starBling 3s infinite ease-in-out;">
        😴 💤
      </div>

      <div style="font-size:24px; font-weight:900; color:#FFF9C4; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
        HOAAAMM... WAKTUNYA ISTIRAHAT!
      </div>
      
      <div style="font-size:14px; color:#E0F7FA; margin:8px 0 16px; line-height:1.5;">
        Matamu sudah hebat sekali belajar hari ini! Yuk sayangi matamu sejenak:
      </div>

      <!-- 3 Rest Exercises Cards -->
      <div style="display:flex; flex-direction:column; gap:10px; text-align:left; margin-bottom:20px;">
        <div style="background:rgba(255,255,255,0.15); backdrop-filter:blur(6px); border-radius:16px; padding:10px 14px; display:flex; align-items:center; gap:12px; border:1px solid rgba(255,255,255,0.3);">
          <span style="font-size:26px;">✨</span>
          <div style="font-size:13px; font-weight:700;">Pejamkan mata pelan-pelan: 1... 2... 3...</div>
        </div>
        <div style="background:rgba(255,255,255,0.15); backdrop-filter:blur(6px); border-radius:16px; padding:10px 14px; display:flex; align-items:center; gap:12px; border:1px solid rgba(255,255,255,0.3);">
          <span style="font-size:26px;">🌳</span>
          <div style="font-size:13px; font-weight:700;">Tengok ke luar jendela, pandang tanaman hijau</div>
        </div>
        <div style="background:rgba(255,255,255,0.15); backdrop-filter:blur(6px); border-radius:16px; padding:10px 14px; display:flex; align-items:center; gap:12px; border:1px solid rgba(255,255,255,0.3);">
          <span style="font-size:26px;">💧</span>
          <div style="font-size:13px; font-weight:700;">Minum segelas air putih segar bersama Ayah/Bunda</div>
        </div>
      </div>

      <!-- Parental Unlock Gate -->
      <div style="background:rgba(0,0,0,0.35); border-radius:20px; padding:14px; border:1.5px solid rgba(255,255,255,0.25);">
        <div style="font-size:12px; font-weight:800; color:#FFCC80; text-transform:uppercase; letter-spacing:0.5px;">
          🔒 Kunci Khusus Ayah & Bunda
        </div>
        <div style="font-size:13px; color:#FFF; margin:6px 0 10px;">
          Berapa <b>${screenTimeState.gateNumA} + ${screenTimeState.gateNumB}</b>?
        </div>
        <div style="display:flex; justify-content:center; gap:8px;">
          <input type="number" id="parent-gate-input" placeholder="?" 
                 style="width:70px; text-align:center; font-size:18px; font-weight:900; padding:8px; border-radius:12px; border:2px solid #FFF; outline:none;" />
          <button class="squish-btn btn-primary btn-pill" style="font-size:13px; padding:8px 18px; background:#4CAF50;" onclick="submitParentalGate()">
            Lanjut Main ➡️
          </button>
        </div>
        <div id="parent-gate-err" style="color:#FF8A80; font-size:12px; font-weight:700; margin-top:6px; display:none;">
          Jawaban belum tepat, coba lagi ya Ayah/Bunda.
        </div>
      </div>

    </div>
  `;

  container.innerHTML = html;
}

function submitParentalGate() {
  var input = document.getElementById('parent-gate-input');
  var err = document.getElementById('parent-gate-err');
  if (!input) return;

  var val = parseInt(input.value.trim(), 10);
  var correct = screenTimeState.gateNumA + screenTimeState.gateNumB;

  if (val === correct) {
    playToneChime();
    screenTimeState.isResting = false;
    screenTimeState.elapsedSeconds = 0; // reset session timer
    updateScreenTimeHudBadge();
    goToScene('map');
    setMascotSpeech("Halo lagi! Matamu sudah segar kembali! Yuk lanjut bermain ceria! 🎈✨");
    speakNatural("Halo lagi! Matamu sudah segar kembali!");
  } else {
    playToneBoing();
    if (err) err.style.display = 'block';
  }
}
