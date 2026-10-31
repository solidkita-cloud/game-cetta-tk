// =========================================================
// JS/HABITS.JS - WAHANA BINA DIRI & KEBIASAAN SEHAT
// 1. Gosok Gigi Monster Manis (Kiki Monster)
// 2. Cuci Tangan Busa Balon (Interactive Bubble Pop)
// =========================================================

var habitsState = {
  activeTab: 'gigi', // 'gigi' or 'tangan'
  // Toothbrushing state
  teethData: [
    { id: 1, label: 'Atas Kiri', dirt: 100, isClean: false },
    { id: 2, label: 'Atas Tengah Kiri', dirt: 100, isClean: false },
    { id: 3, label: 'Atas Tengah Kanan', dirt: 100, isClean: false },
    { id: 4, label: 'Atas Kanan', dirt: 100, isClean: false },
    { id: 5, label: 'Bawah Kiri', dirt: 100, isClean: false },
    { id: 6, label: 'Bawah Tengah Kiri', dirt: 100, isClean: false },
    { id: 7, label: 'Bawah Tengah Kanan', dirt: 100, isClean: false },
    { id: 8, label: 'Bawah Kanan', dirt: 100, isClean: false }
  ],
  isBrushing: false,
  totalTeethCleaned: 0,
  gigiCompleted: false,

  // Handwashing state
  handStep: 1, // 1: Sabun, 2: Gosok Busa, 3: Bilas Kran, 4: Pesta Gelembung Pop
  bubblesPopped: 0,
  handWashCompleted: false,
  bubbleInterval: null
};

// ---------------------------------------------------------
// Navigation & Opening
// ---------------------------------------------------------
function openHabitsStudio() {
  goToScene('habits');
  setMascotSpeech("Yuk belajar hidup sehat mandiri! Mau sikat gigi Kiki Monster atau main busa sabun? 🪥🫧");
  speakNatural("Yuk belajar hidup sehat! Pilih sikat gigi atau cuci tangan ya!");
  renderHabitsView();
}

function exitHabitsToMap() {
  if (habitsState.bubbleInterval) {
    clearInterval(habitsState.bubbleInterval);
    habitsState.bubbleInterval = null;
  }
  goToScene('map');
}

function switchHabitsTab(tab) {
  playTonePop();
  if (habitsState.bubbleInterval) {
    clearInterval(habitsState.bubbleInterval);
    habitsState.bubbleInterval = null;
  }
  habitsState.activeTab = tab;
  renderHabitsView();
}

// ---------------------------------------------------------
// Main View Router
// ---------------------------------------------------------
function renderHabitsView() {
  var container = document.getElementById('habits-stage-container');
  if (!container) return;

  if (habitsState.activeTab === 'gigi') {
    renderToothBrushingGame(container);
  } else {
    renderHandWashingGame(container);
  }
}

// =========================================================
// SUB-GAME 1: GOSOK GIGI MONSTER CERIA
// =========================================================
function renderToothBrushingGame(container) {
  var cleanCount = habitsState.teethData.filter(function(t) { return t.isClean; }).length;

  var html = `
    <!-- Sub-Game Tabs -->
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:10px;">
      <button class="squish-btn habits-tab-btn tab-active" onclick="switchHabitsTab('gigi')">
        🪥 Sikat Gigi Kiki Monster
      </button>
      <button class="squish-btn habits-tab-btn" onclick="switchHabitsTab('tangan')">
        🫧 Cuci Tangan & Busa Balon
      </button>
    </div>

    <!-- Instructions / Progress -->
    <div style="background:#FFFFFF; border-radius:18px; padding:8px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2px solid #C8E6C9; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:12px; font-weight:800; color:#2E7D32;">GIGI KIKI MONSTER</div>
        <div style="font-size:14px; font-weight:700; color:#388E3C;">
          ${habitsState.gigiCompleted ? '✨ Semua Gigi Bersih Kinclong! ✨' : 'Gosok gigi cokelat sampai putih bersih!'}
        </div>
      </div>
      <div style="font-size:14px; font-weight:900; background:#E8F5E9; color:#2E7D32; padding:4px 12px; border-radius:12px;">
        🦷 ${cleanCount} / 8 Bersih
      </div>
    </div>

    <!-- Monster Face & Mouth Stage -->
    <div id="monster-mouth-stage" style="background:linear-gradient(180deg, #CE93D8, #AB47BC); border-radius:28px; padding:20px 14px 24px; border:4px solid #7B1FA2; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; overflow:hidden;">
      
      <!-- Monster Friendly Eyes & Horns -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 24px;">
        <!-- Left Horn -->
        <div style="font-size:32px; transform:rotate(-15deg);">🦄</div>
        <!-- Googly Eyes -->
        <div style="display:flex; gap:16px;">
          <div class="monster-eye">
            <div class="monster-pupil"></div>
          </div>
          <div class="monster-eye">
            <div class="monster-pupil"></div>
          </div>
        </div>
        <!-- Right Horn -->
        <div style="font-size:32px; transform:rotate(15deg);">🦄</div>
      </div>

      <!-- Rosy Cheeks -->
      <div style="display:flex; justify-content:space-between; padding:0 10px; margin-bottom:-10px;">
        <div style="width:28px; height:18px; border-radius:50%; background:#F48FB1; opacity:0.8;"></div>
        <div style="width:28px; height:18px; border-radius:50%; background:#F48FB1; opacity:0.8;"></div>
      </div>

      <!-- Monster Open Mouth -->
      <div id="monster-mouth" style="background:#5D1049; border-radius:30px; padding:16px 12px; border:4px solid #4A0E4E; box-shadow:inset 0 4px 12px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:space-between; height:180px; position:relative; touch-action:none; user-select:none;">
        
        <!-- Big Pink Tongue in Background -->
        <div style="position:absolute; bottom:10px; left:25%; right:25%; height:60px; background:#F06292; border-radius:30px 30px 0 0; border:3px solid #E91E63; opacity:0.85; z-index:1;"></div>

        <!-- Upper Row (4 Teeth) -->
        <div style="display:flex; justify-content:space-around; gap:8px; position:relative; z-index:2;">
          ${habitsState.teethData.slice(0, 4).map(function(t) {
            return renderSingleToothHtml(t);
          }).join('')}
        </div>

        <!-- Lower Row (4 Teeth) -->
        <div style="display:flex; justify-content:space-around; gap:8px; position:relative; z-index:2;">
          ${habitsState.teethData.slice(4, 8).map(function(t) {
            return renderSingleToothHtml(t);
          }).join('')}
        </div>

      </div>

      <!-- Toothbrush Floating Tool Indicator -->
      <div style="text-align:center; margin-top:10px; color:#FFF; font-weight:800; font-size:13px; text-shadow:0 1px 2px rgba(0,0,0,0.3);">
        🪥 Usap atau sentuh gigi cokelat berkali-kali!
      </div>
    </div>

    <!-- Action Bar -->
    <div style="margin-top:12px; display:flex; justify-content:center; gap:10px;">
      <button class="squish-btn btn-pill" style="background:#FFF3E0; border:1.5px solid #FFB74D; color:#E65100; font-size:13px; padding:8px 18px; font-weight:800;" onclick="resetToothGame()">
        🔄 Ulangi Sikat Gigi
      </button>
    </div>
  `;

  container.innerHTML = html;
  bindToothBrushingEvents();
}

function renderSingleToothHtml(tooth) {
  var dirtOpacity = tooth.dirt / 100;
  return `
    <div id="tooth-box-${tooth.id}" 
         class="tooth-element ${tooth.isClean ? 'tooth-sparkling' : ''}" 
         data-id="${tooth.id}"
         style="width:58px; height:52px; background:#FFFFFF; border-radius:12px; border:2.5px solid #E0E0E0; box-shadow:0 4px 6px rgba(0,0,0,0.15); display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; overflow:hidden; cursor:pointer;">
      
      <!-- Dirt Chocolate Stain Overlay -->
      <div id="tooth-dirt-${tooth.id}" 
           style="position:absolute; inset:0; background:linear-gradient(135deg, #795548, #5D4037); opacity:${dirtOpacity}; transition:opacity 0.1s ease; border-radius:10px; display:flex; align-items:center; justify-content:center;">
        <span style="font-size:16px;">🍫</span>
      </div>

      <!-- Sparkle reflection when clean -->
      ${tooth.isClean ? '<div class="tooth-star-bling">✨</div>' : ''}
    </div>
  `;
}

// ---------------------------------------------------------
// Touch / Swipe Brushing Detection
// ---------------------------------------------------------
function bindToothBrushingEvents() {
  var mouth = document.getElementById('monster-mouth');
  if (!mouth) return;

  function handleBrushAtPoint(clientX, clientY) {
    var elem = document.elementFromPoint(clientX, clientY);
    if (!elem) return;
    var toothBox = elem.closest('.tooth-element');
    if (!toothBox) return;

    var id = parseInt(toothBox.getAttribute('data-id'), 10);
    brushSingleTooth(id, toothBox);
  }

  mouth.addEventListener('pointerdown', function(e) {
    habitsState.isBrushing = true;
    handleBrushAtPoint(e.clientX, e.clientY);
  });

  mouth.addEventListener('pointermove', function(e) {
    if (habitsState.isBrushing) {
      handleBrushAtPoint(e.clientX, e.clientY);
    }
  });

  window.addEventListener('pointerup', function() {
    habitsState.isBrushing = false;
  });
}

function brushSingleTooth(id, toothBox) {
  var tooth = habitsState.teethData.find(function(t) { return t.id === id; });
  if (!tooth || tooth.isClean) return;

  // Sound & foam bubbles
  playToothBrushSound();
  spawnToothFoam(toothBox);

  // Reduce dirt
  tooth.dirt = Math.max(0, tooth.dirt - 25);
  var dirtEl = document.getElementById('tooth-dirt-' + id);
  if (dirtEl) {
    dirtEl.style.opacity = (tooth.dirt / 100);
  }

  // If now completely clean
  if (tooth.dirt === 0 && !tooth.isClean) {
    tooth.isClean = true;
    playToneChime();
    toothBox.classList.add('tooth-sparkling');
    toothBox.innerHTML = '<div class="tooth-star-bling">✨</div>';

    checkAllTeethCleaned();
  }
}

function spawnToothFoam(toothBox) {
  if (!toothBox) return;
  var foam = document.createElement('div');
  foam.className = 'tooth-foam-bubble';
  foam.textContent = '🫧';
  foam.style.left = (Math.random() * 25 + 10) + 'px';
  foam.style.top = (Math.random() * 20 + 5) + 'px';
  toothBox.appendChild(foam);

  setTimeout(function() {
    if (foam.parentNode) foam.parentNode.removeChild(foam);
  }, 600);
}

function checkAllTeethCleaned() {
  var cleanCount = habitsState.teethData.filter(function(t) { return t.isClean; }).length;
  
  // Update header text
  var container = document.getElementById('habits-stage-container');
  if (cleanCount === habitsState.teethData.length && !habitsState.gigiCompleted) {
    habitsState.gigiCompleted = true;
    playToneFanfare();
    if (typeof addProfileStars === 'function') addProfileStars(2);
    if (typeof addGameStars === 'function') addGameStars(2);
    
    setMascotSpeech("LUAR BIASA! Semua gigi Kiki bersih putih kinclong! Kamu dapat +2 Bintang! 🦷⭐");
    speakNatural("Luar biasa! Gigi Kiki sekarang bersih, wangi, dan bebas kuman!");

    setTimeout(function() {
      if (typeof triggerConfetti === 'function') triggerConfetti();
      renderHabitsView();
    }, 600);
  } else {
    // Refresh counter badge without re-rendering entire mouth
    renderToothBrushingGame(container);
  }
}

function resetToothGame() {
  playTonePop();
  habitsState.teethData.forEach(function(t) {
    t.dirt = 100;
    t.isClean = false;
  });
  habitsState.gigiCompleted = false;
  renderHabitsView();
}


// =========================================================
// SUB-GAME 2: CUCI TANGAN BUSA BALON (BUBBLE POP MANIA!)
// =========================================================
function renderHandWashingGame(container) {
  var html = `
    <!-- Sub-Game Tabs -->
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:10px;">
      <button class="squish-btn habits-tab-btn" onclick="switchHabitsTab('gigi')">
        🪥 Sikat Gigi Kiki Monster
      </button>
      <button class="squish-btn habits-tab-btn tab-active" onclick="switchHabitsTab('tangan')">
        🫧 Cuci Tangan & Busa Balon
      </button>
    </div>

    <!-- Instructions / Progress Bar -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2px solid #80DEEA; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:12px; font-weight:800; color:#00838F; text-transform:uppercase;">
          Langkah ${habitsState.handStep} / 4
        </div>
        <div style="font-size:15px; font-weight:900; color:#006064;">
          ${getHandStepTitle(habitsState.handStep)}
        </div>
      </div>
      <div style="font-size:14px; font-weight:900; background:#E0F7FA; color:#00838F; padding:4px 12px; border-radius:12px;">
        🫧 ${habitsState.bubblesPopped} Balon Pecah
      </div>
    </div>

    <!-- Handwashing Sink Interactive Arena -->
    <div id="sink-arena" style="background:linear-gradient(180deg, #E0F2F1, #80CBC4); border-radius:28px; padding:20px 14px; border:4px solid #00796B; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; min-height:280px; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center;">
      ${renderHandStepContent()}
    </div>
  `;

  container.innerHTML = html;
}

function getHandStepTitle(step) {
  if (step === 1) return "Tekan Botol Sabun Stroberi! 🧴";
  if (step === 2) return "Usap-usap busa sampai kuman kabur! 👐";
  if (step === 3) return "Buka kran air segar untuk membilas! 🚰";
  return "PESTA BUSA BALON! Letuskan semua gelembung! 🎈🫧";
}

function renderHandStepContent() {
  if (habitsState.handStep === 1) {
    return `
      <div style="text-align:center;">
        <div class="squish-btn" style="font-size:80px; cursor:pointer; filter:drop-shadow(0 6px 12px rgba(0,0,0,0.2));" onclick="dispenseSoap()">
          🧴
        </div>
        <div style="font-size:16px; font-weight:800; color:#004D40; margin-top:12px;">
          Sentuh botol sabun untuk menuang busa!
        </div>
      </div>
    `;
  } else if (habitsState.handStep === 2) {
    return `
      <div style="text-align:center; width:100%;" onpointerdown="rubHandsFoam()">
        <div style="font-size:75px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.15));" class="anim-wiggle">
          👐
        </div>
        <div style="display:flex; justify-content:center; gap:12px; margin:10px 0; font-size:24px;">
          <span>🦠</span> <span>🫧</span> <span>🫧</span> <span>🦠</span>
        </div>
        <button class="squish-btn btn-primary btn-pill" style="font-size:14px; padding:10px 24px; background:#00897B;" onclick="finishRubbingHands()">
          Busa Sudah Rata! Bilas Yuk ➡️
        </button>
      </div>
    `;
  } else if (habitsState.handStep === 3) {
    return `
      <div style="text-align:center;">
        <div class="squish-btn" style="font-size:80px; cursor:pointer;" onclick="rinseWaterFaucet()">
          🚰
        </div>
        <div style="font-size:16px; font-weight:800; color:#004D40; margin-top:12px;">
          Tekan kran untuk mengalirkan air jernih!
        </div>
      </div>
    `;
  } else {
    // Step 4: Bubble Pop Mania
    startBubblePopMania();
    return `
      <div id="bubble-pop-container" style="position:absolute; inset:0; overflow:hidden; touch-action:manipulation;">
        <!-- Bubbles will spawn here dynamically -->
      </div>
      <div style="position:absolute; bottom:12px; z-index:10; text-align:center;">
        <button class="squish-btn btn-primary btn-pill" style="background:#00796B; font-size:13px; padding:8px 20px;" onclick="finishHandWashing()">
          Tangan Sudah Bersih & Harum! Selesai ⭐
        </button>
      </div>
    `;
  }
}

// ---------------------------------------------------------
// Handwashing Step Actions
// ---------------------------------------------------------
function dispenseSoap() {
  playTonePop();
  playToneChime();
  setMascotSpeech("Croot! Sabun wangi siap! Sekarang usap-usap telapak tanganmu ya! 🫧");
  speakNatural("Croot! Sabun wangi siap! Sekarang usap kedua tanganmu!");
  habitsState.handStep = 2;
  renderHabitsView();
}

function rubHandsFoam() {
  playToothBrushSound();
}

function finishRubbingHands() {
  playTonePop();
  habitsState.handStep = 3;
  setMascotSpeech("Kuman-kuman sudah pusing! Sekarang nyalakan kran air untuk bilas! 🚰");
  speakNatural("Kuman sudah pusing! Nyalakan kran air ya!");
  renderHabitsView();
}

function rinseWaterFaucet() {
  playToneWhistle();
  playToneChime();
  habitsState.handStep = 4;
  habitsState.bubblesPopped = 0;
  setMascotSpeech("HOREE! Lihat ada banyak balon busa sabun! Ayo sentuh dan letuskan semua! 🫧💥");
  speakNatural("Horee! Ayo sentuh dan letuskan semua balon busa sabun!");
  renderHabitsView();
}

function startBubblePopMania() {
  if (habitsState.bubbleInterval) clearInterval(habitsState.bubbleInterval);
  
  // Spawn continuous floating bubbles in step 4
  habitsState.bubbleInterval = setInterval(function() {
    var arena = document.getElementById('bubble-pop-container');
    if (!arena) return;
    spawnPopBubble(arena);
  }, 450);
}

function spawnPopBubble(arena) {
  var b = document.createElement('div');
  b.className = 'handwash-floating-bubble';
  var size = 42 + Math.random() * 38;
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  b.style.left = (Math.random() * 85 + 5) + '%';
  b.style.bottom = '-60px';

  var dur = 3 + Math.random() * 2.5;
  b.style.animation = 'floatUpward ' + dur + 's ease-in forwards';

  b.onpointerdown = function(e) {
    e.stopPropagation();
    popSingleHandBubble(b);
  };

  arena.appendChild(b);

  setTimeout(function() {
    if (b.parentNode) b.parentNode.removeChild(b);
  }, dur * 1000);
}

function popSingleHandBubble(bubbleEl) {
  playTonePop();
  habitsState.bubblesPopped++;
  
  // Burst animation
  bubbleEl.classList.add('bubble-burst-anim');
  bubbleEl.textContent = '✨';

  // Update badge
  var badge = document.querySelector('#habits-stage-container .stage-progress-badge');
  if (badge) badge.textContent = `🫧 ${habitsState.bubblesPopped} Balon Pecah`;

  setTimeout(function() {
    if (bubbleEl.parentNode) bubbleEl.parentNode.removeChild(bubbleEl);
  }, 200);

  // Milestone cheers
  if (habitsState.bubblesPopped === 10) {
    playToneChime();
  }
}

function finishHandWashing() {
  if (habitsState.bubbleInterval) {
    clearInterval(habitsState.bubbleInterval);
    habitsState.bubbleInterval = null;
  }
  
  playToneFanfare();
  if (typeof addProfileStars === 'function') addProfileStars(2);
  if (typeof addGameStars === 'function') addGameStars(2);
  
  setMascotSpeech("HEBAT! Tanganmu sekarang bersih, harum, dan bebas kuman! Dapat +2 Bintang! 👐⭐");
  speakNatural("Hebat! Tanganmu sekarang bersih, harum, dan bebas kuman!");

  var container = document.getElementById('habits-stage-container');
  if (container) {
    container.innerHTML = `
      <div style="background:#FFFFFF; border-radius:24px; padding:28px 16px; text-align:center; box-shadow:0 6px 18px rgba(0,0,0,0.08); border:3px solid #80CBC4; margin-top:20px;">
        <div style="font-size:54px;">🧼 👐 ⭐ ✨</div>
        <div style="font-size:22px; font-weight:900; color:#00695C; margin-top:8px;">JAGOAN TANGAN BERSIH!</div>
        <div style="font-size:14px; font-weight:700; color:#00897B; margin-top:4px;">
          Kamu sudah memecahkan ${habitsState.bubblesPopped} balon busa sabun!
        </div>
        <div style="font-size:13px; color:#558B2F; margin-top:8px;">+2 Bintang ditambahkan ke rapor! ⭐⭐</div>
        <div style="margin-top:16px; display:flex; justify-content:center; gap:10px;">
          <button class="squish-btn btn-primary btn-pill" style="font-size:14px; padding:10px 24px; background:#00796B;" onclick="habitsState.handStep=1; renderHabitsView();">
            Cuci Tangan Lagi 🔄
          </button>
          <button class="squish-btn btn-pill" style="font-size:14px; padding:10px 20px; background:#ECEFF1; color:#37474F;" onclick="exitHabitsToMap()">
            Ke Peta 🗺️
          </button>
        </div>
      </div>
    `;
  }

  if (typeof triggerConfetti === 'function') triggerConfetti();
}
