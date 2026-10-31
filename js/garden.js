// =========================================================
// JS/GARDEN.JS - KEBUN IMPIAN CETTA (STAR REWARD HABITAT)
// Gives concrete purpose to child's stars: unlock flowers,
// feed cute bunnies, grow apple trees, and nurture fish ponds!
// =========================================================

var GARDEN_SLOTS = [
  {
    id: 'bunga',
    name: 'Bunga Matahari',
    icon: '🌻',
    cost: 3,
    levelDesc: 'Mekar berseri menyapa pagi',
    actionLabel: '🚿 Siram Bunga',
    speech: 'Syuuur! Bunga matahari mekar besar disiram air sejuk!',
    type: 'water'
  },
  {
    id: 'kelinci',
    name: 'Kelinci Gemoy & Wortel',
    icon: '🐰',
    cost: 8,
    levelDesc: 'Lompat ceria di kebun wortel',
    actionLabel: '🥕 Beri Wortel',
    speech: 'Kruk kruk kruk! Kelinci gemoy suka sekali makan wortel manismu!',
    type: 'feed'
  },
  {
    id: 'apel',
    name: 'Pohon Apel Merah',
    icon: '🍎',
    cost: 14,
    levelDesc: 'Buah manis siap dipetik',
    actionLabel: '🌳 Petik Apel',
    speech: 'Puk! Apel merah manis jatuh ke keranjang buah Cetta!',
    type: 'pick'
  },
  {
    id: 'ikan',
    name: 'Kolam Ikan Mas Koki',
    icon: '🐟',
    cost: 20,
    levelDesc: 'Berenang lincah berbusa',
    actionLabel: '🫧 Beri Pakan',
    speech: 'Blup blup! Ikan mas koki berenang lincah menyambut pakanmu!',
    type: 'fish'
  },
  {
    id: 'mancur',
    name: 'Air Mancur Pelangi',
    icon: '⛲',
    cost: 26,
    levelDesc: 'Gemercik air pelangi sejuk',
    actionLabel: '🌈 Pancarkan Air',
    speech: 'Syuuur! Air mancur pelangi menyegarkan seluruh taman!',
    type: 'fountain'
  },
  {
    id: 'kupu',
    name: 'Taman Kupu-Kupu Ajaib',
    icon: '🦋',
    cost: 32,
    levelDesc: 'Sayap pelangi menari indah',
    actionLabel: '✨ Ajak Menari',
    speech: 'Wah! Kupu-kupu pelangi menari ceria mengelilingi kita!',
    type: 'butterfly'
  }
];

function openGardenScene() {
  goToScene('garden');
  setMascotSpeech("Selamat datang di Kebun Impian Cetta! Bintang belajarmu membuat kebun makin rimbun! 🌸✨");
  speakNatural("Selamat datang di Kebun Impian Cetta! Ayo lihat tanaman dan hewan peliharaanmu!");
  renderGardenScene();
}

function exitGardenToMap() {
  goToScene('map');
}

function renderGardenScene() {
  var container = document.getElementById('garden-stage-container');
  if (!container) return;

  var profile = (typeof getActiveChildProfile === 'function') ? getActiveChildProfile() : { stars: 18, name: 'Cetta' };
  var stars = profile.stars || (window.gameState ? window.gameState.stars : 18);

  // Calculate overall garden health/unlock level
  var unlockedCount = GARDEN_SLOTS.filter(function(s) { return stars >= s.cost; }).length;

  var html = `
    <!-- Top Garden HUD & Ownership Card -->
    <div style="background:#FFFFFF; border-radius:20px; padding:12px 16px; margin-bottom:14px; box-shadow:0 4px 14px rgba(0,0,0,0.06); border:2.5px solid #A5D6A7; display:flex; align-items:center; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:32px;">🏡</span>
        <div>
          <div style="font-size:16px; font-weight:900; color:#2E7D32;">Kebun Impian ${profile.name}</div>
          <div style="font-size:12px; font-weight:700; color:#558B2F;">
            🌿 ${unlockedCount} / ${GARDEN_SLOTS.length} Area Terbuka
          </div>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; align-items:flex-end;">
        <div style="font-size:15px; font-weight:900; color:#E65100; background:#FFF3E0; padding:4px 12px; border-radius:14px; border:1.5px solid #FFE082;">
          ⭐ ${stars} Bintang
        </div>
      </div>
    </div>

    <!-- Interactive Garden Meadow View -->
    <div style="background:linear-gradient(180deg, #C8E6C9, #81C784 60%, #558B2F); border-radius:26px; padding:18px 12px; border:4px solid #388E3C; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; overflow:hidden;">
      
      <!-- Sky Clouds & Sun in Background -->
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0 12px; margin-bottom:10px; opacity:0.85;">
        <div style="font-size:26px;">☁️</div>
        <div style="font-size:36px; animation:starBling 2.5s infinite ease-in-out;">☀️</div>
        <div style="font-size:26px;">☁️</div>
      </div>

      <!-- 2x3 Grid of Interactive Habitats -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; position:relative; z-index:2;">
        ${GARDEN_SLOTS.map(function(slot) {
          var isUnlocked = stars >= slot.cost;
          var diff = slot.cost - stars;
          return `
            <div id="garden-slot-${slot.id}" 
                 class="squish-btn garden-slot-card ${isUnlocked ? 'garden-unlocked' : 'garden-locked'}"
                 style="background:${isUnlocked ? '#FFFFFF' : 'rgba(255,255,255,0.7)'}; border-radius:20px; padding:12px 10px; border:2.5px solid ${isUnlocked ? '#66BB6A' : '#BDBDBD'}; box-shadow:0 4px 10px rgba(0,0,0,0.06); text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:space-between; min-height:148px; position:relative; cursor:pointer;"
                 onclick="tapGardenSlot('${slot.id}')">
              
              <!-- Slot Icon / Avatar -->
              <div id="slot-icon-${slot.id}" style="font-size:48px; margin:4px 0; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.15)); transition:transform 0.2s ease;">
                ${isUnlocked ? slot.icon : '🔒'}
              </div>

              <!-- Title -->
              <div>
                <div style="font-size:13px; font-weight:800; color:${isUnlocked ? '#2E7D32' : '#757575'};">
                  ${slot.name}
                </div>
                <div style="font-size:11px; font-weight:600; color:${isUnlocked ? '#689F38' : '#9E9E9E'};">
                  ${isUnlocked ? slot.levelDesc : 'Butuh ' + diff + ' ⭐ lagi'}
                </div>
              </div>

              <!-- Interactive Action Button -->
              <div style="margin-top:8px; width:100%;">
                ${isUnlocked ? `
                  <button class="squish-btn" style="background:#E8F5E9; color:#2E7D32; border:1.5px solid #81C784; border-radius:12px; font-size:11px; font-weight:800; padding:4px 10px; width:100%;">
                    ${slot.actionLabel}
                  </button>
                ` : `
                  <div style="background:#F5F5F5; color:#9E9E9E; border-radius:12px; font-size:11px; font-weight:700; padding:4px 0;">
                    ⭐ Buka di ${slot.cost} ⭐
                  </div>
                `}
              </div>

            </div>
          `;
        }).join('')}
      </div>

    </div>

    <!-- Bottom Garden Quick Actions -->
    <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
      <button class="squish-btn btn-primary btn-pill" style="font-size:13px; padding:10px 20px; background:#2E7D32;" onclick="waterEntireGarden()">
        🚿 Siram Semua Kebun Ceria!
      </button>
      <button class="squish-btn btn-pill" style="font-size:13px; padding:10px 18px; background:#FFF3E0; color:#E65100; border:1.5px solid #FFB74D; font-weight:800;" onclick="openPrintSheetsModal()">
        🖨️ Cetak Gambar Mewarnai
      </button>
    </div>
  `;

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Slot Tap Interactions (With Physics & Audio Feedback)
// ---------------------------------------------------------
function tapGardenSlot(slotId) {
  var slot = GARDEN_SLOTS.find(function(s) { return s.id === slotId; });
  if (!slot) return;

  var profile = (typeof getActiveChildProfile === 'function') ? getActiveChildProfile() : { stars: 18 };
  var stars = profile.stars || (window.gameState ? window.gameState.stars : 18);

  // If locked
  if (stars < slot.cost) {
    playToneBoing();
    var diff = slot.cost - stars;
    setMascotSpeech("Kumpulkan " + diff + " bintang lagi dengan bermain wahana ya! Semangat! ⭐💪");
    speakNatural("Kumpulkan " + diff + " bintang lagi ya!");
    return;
  }

  // If unlocked, execute fun action!
  var iconEl = document.getElementById('slot-icon-' + slot.id);
  if (iconEl) {
    iconEl.style.transform = 'scale(1.35) rotate(-10deg)';
    setTimeout(function() {
      iconEl.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  if (slot.type === 'water' || slot.type === 'fountain' || slot.type === 'fish') {
    playToneWaterSplash();
  } else if (slot.type === 'feed') {
    playToneCrunch();
    spawnHeartBubble(iconEl);
  } else {
    playToneChime();
  }

  setMascotSpeech(slot.speech);
  speakNatural(slot.speech);
}

function spawnHeartBubble(targetEl) {
  if (!targetEl) return;
  var rect = targetEl.getBoundingClientRect();
  var heart = document.createElement('div');
  heart.className = 'floating-music-particle';
  heart.textContent = '❤️';
  heart.style.left = (rect.left + rect.width / 2 - 12) + 'px';
  heart.style.top = (rect.top - 10) + 'px';
  document.body.appendChild(heart);

  setTimeout(function() {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, 1000);
}

function waterEntireGarden() {
  playToneWaterSplash();
  playToneChime();
  
  var icons = document.querySelectorAll('.garden-unlocked [id^="slot-icon-"]');
  icons.forEach(function(ic, i) {
    setTimeout(function() {
      ic.style.transform = 'scale(1.3) rotate(8deg)';
      setTimeout(function() { ic.style.transform = 'scale(1) rotate(0deg)'; }, 250);
    }, i * 120);
  });

  setMascotSpeech("Syuuuuur! Seluruh kebun disiram air segar! Semua bunga dan hewan bahagia! 🚿🌸🐰✨");
  speakNatural("Seluruh kebun disiram air segar! Semua bunga dan hewan bahagia!");

  if (typeof triggerConfetti === 'function') triggerConfetti();
}
