// =========================================================
// JS/SCIENCE.JS - LAB SAINS CILIK: TERAPUNG ATAU TENGGELAM?
// Interactive Physics Experiment for Preschoolers (Sink or Float)
// =========================================================

var SCIENCE_OBJECTS = [
  { name: 'Bebek Karet', emoji: '🦆', isFloat: true, reason: 'Bebek karet terisi udara dan ringan, jadi terapung mengapung di atas air!' },
  { name: 'Batu Kali', emoji: '🪨', isFloat: false, reason: 'Batu kali padat dan berat, jadi meluncur tenggelam ke dasar kolam!' },
  { name: 'Daun Kering', emoji: '🍃', isFloat: true, reason: 'Daun sangat tipis dan ringan, jadi mengapung santai mengikuti riak air!' },
  { name: 'Koin Logam', emoji: '🪙', isFloat: false, reason: 'Koin terbuat dari logam berat, jadi langsung tenggelam ke dasar!' },
  { name: 'Bola Plastik', emoji: '⚽', isFloat: true, reason: 'Bola plastik berisi banyak udara, jadi terapung riang di permukaan!' },
  { name: 'Kunci Besi', emoji: '🔑', isFloat: false, reason: 'Kunci besi berat dan tidak ada udara di dalamnya, jadi tenggelam!' },
  { name: 'Balok Kayu', emoji: '🪵', isFloat: true, reason: 'Kayu punya rongga serat udara alami, jadi terapung tidak tenggelam!' },
  { name: 'Apel Segar', emoji: '🍎', isFloat: true, reason: 'Apel memiliki kantung-kantung udara kecil di daging buahnya, jadi terapung!' },
  { name: 'Sendok Besi', emoji: '🥄', isFloat: false, reason: 'Sendok besi padat dan berat, jadi tenggelam ke dasar air!' }
];

var scienceState = {
  currentObj: null,
  recentIndex: [],
  isDropped: false,
  isProcessing: false
};

function openScienceStudio() {
  goToScene('science');
  setMascotSpeech("Selamat datang di Lab Sains Cetta! Yuk kita uji coba: benda ini terapung atau tenggelam ya? 🌊🔬");
  speakNatural("Selamat datang di Lab Sains Cetta! Ayo kita tebak: terapung atau tenggelam?");
  scienceState.recentIndex = [];
  loadNextScienceObject();
}

function exitScienceToMap() {
  goToScene('map');
}

function loadNextScienceObject() {
  scienceState.isDropped = false;
  scienceState.isProcessing = false;

  var pool = SCIENCE_OBJECTS.map(function(o, i) { return i; }).filter(function(i) {
    return scienceState.recentIndex.indexOf(i) === -1;
  });
  if (pool.length === 0) {
    scienceState.recentIndex = [];
    pool = SCIENCE_OBJECTS.map(function(o, i) { return i; });
  }

  var pickIdx = pool[Math.floor(Math.random() * pool.length)];
  scienceState.recentIndex.push(pickIdx);
  if (scienceState.recentIndex.length > 4) scienceState.recentIndex.shift();

  scienceState.currentObj = SCIENCE_OBJECTS[pickIdx];
  renderScienceStage();
}

function renderScienceStage() {
  var container = document.getElementById('science-stage-container');
  if (!container) return;

  var obj = scienceState.currentObj;
  if (!obj) return;

  var html = `
    <!-- Experiment Mission Banner -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2.5px solid #80DEEA; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:12px; font-weight:800; color:#00838F; text-transform:uppercase;">
          Eksperimen Fisika Air Ceria
        </div>
        <div style="font-size:16px; font-weight:900; color:#006064;">
          Uji Coba: ${obj.name} ${obj.emoji}
        </div>
      </div>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 12px; background:#E0F7FA; color:#00838F; border:1.5px solid #80DEEA; font-weight:800;" onclick="readScienceQuestionAloud()">
        🔊 Suara
      </button>
    </div>

    <!-- The Aquarium / Water Tank Stage -->
    <div id="science-tank" style="width:100%; height:250px; background:linear-gradient(180deg, #E0F7FA 30%, #4DD0E1 40%, #0097A7 85%, #E0C097 88%, #D7B17B 100%); border-radius:26px; border:4px solid #00838F; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; overflow:hidden;">
      
      <!-- Surface Ripple Line -->
      <div style="position:absolute; top:36%; left:0; right:0; height:6px; background:rgba(255,255,255,0.7); box-shadow:0 0 10px #FFF;"></div>

      <!-- Water Surface Text Label -->
      <div style="position:absolute; top:40%; left:12px; font-size:11px; font-weight:800; color:rgba(255,255,255,0.9); text-transform:uppercase;">
        🌊 Permukaan Air
      </div>

      <!-- Sandy Bottom Text Label -->
      <div style="position:absolute; bottom:6px; left:12px; font-size:11px; font-weight:800; color:#5D4037;">
        🏖️ Dasar Kolam
      </div>

      <!-- Test Platform at Top -->
      <div id="science-drop-platform" style="position:absolute; top:12px; left:50%; transform:translateX(-50%); text-align:center; z-index:2;">
        <div id="science-active-item" 
             style="font-size:52px; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.2)); transition:transform 0.9s cubic-bezier(0.25, 1, 0.5, 1);">
          ${obj.emoji}
        </div>
      </div>

      <!-- Floating Splash Particles Container -->
      <div id="science-splash-box" style="position:absolute; inset:0; pointer-events:none;"></div>

    </div>

    <!-- Prediction Choice Buttons -->
    <div id="science-controls" style="margin-top:14px;">
      <div style="text-align:center; font-size:15px; font-weight:800; color:#006064; margin-bottom:10px;">
        Jika dicelupkan ke air, apakah <u>${obj.name}</u> akan:
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <button class="squish-btn science-choice-btn" 
                style="background:#E1F5FE; border:2.5px solid #039BE5; color:#0277BD; border-radius:18px; padding:14px 10px; font-size:16px; font-weight:900;" 
                onclick="makeScienceGuess(true)">
          ☁️ TERAPUNG<br><span style="font-size:11px; font-weight:700; color:#0288D1;">(Mengapung di Atas)</span>
        </button>

        <button class="squish-btn science-choice-btn" 
                style="background:#ECEFF1; border:2.5px solid #546E7A; color:#37474F; border-radius:18px; padding:14px 10px; font-size:16px; font-weight:900;" 
                onclick="makeScienceGuess(false)">
          ⚓ TENGGELAM<br><span style="font-size:11px; font-weight:700; color:#455A64;">(Jatuh ke Dasar)</span>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
  speakSciencePrompt();
}

function makeScienceGuess(guessFloat) {
  if (scienceState.isProcessing || scienceState.isDropped) return;
  scienceState.isProcessing = true;
  scienceState.isDropped = true;

  var obj = scienceState.currentObj;
  var isCorrect = (guessFloat === obj.isFloat);

  var itemEl = document.getElementById('science-active-item');

  // Trigger Drop Animation
  if (itemEl) {
    if (obj.isFloat) {
      // Drop to surface and bob
      itemEl.style.transform = 'translateY(70px)';
      setTimeout(function() {
        playToneWaterSplash();
        itemEl.classList.add('anim-wiggle');
      }, 500);
    } else {
      // Sink all the way down to sandy floor
      itemEl.style.transform = 'translateY(160px)';
      setTimeout(function() {
        playToneWaterSplash();
      }, 500);
    }
  }

  setTimeout(function() {
    if (isCorrect) {
      playToneChime();
      if (typeof addProfileStars === 'function') addProfileStars(1);
      if (typeof addGameStars === 'function') addGameStars(1);
      setMascotSpeech("TEBAKANMU TEPAT SEKALI! " + obj.reason + " ⭐🎉");
      speakNatural("Hebat! Tebakanmu benar! " + obj.reason);
    } else {
      playToneBoing();
      setMascotSpeech("Wah lihat! Ternyata " + obj.name + " " + (obj.isFloat ? 'terapung' : 'tenggelam') + "! " + obj.reason);
      speakNatural("Ternyata " + obj.name + " " + (obj.isFloat ? 'terapung' : 'tenggelam') + "! " + obj.reason);
    }

    renderScienceResultCard(isCorrect);
  }, 1000);
}

function renderScienceResultCard(isCorrect) {
  var controls = document.getElementById('science-controls');
  var obj = scienceState.currentObj;
  if (!controls || !obj) return;

  controls.innerHTML = `
    <div style="background:#FFFFFF; border-radius:20px; padding:14px; border:2.5px solid ${isCorrect ? '#81C784' : '#FFB74D'}; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
      <div style="font-size:20px; font-weight:900; color:${isCorrect ? '#2E7D32' : '#E65100'};">
        ${isCorrect ? '🎉 HEBAT! JAWABAN BENAR!' : '💡 WAH, LIHAT HASILNYA!'}
      </div>
      <div style="font-size:13px; font-weight:700; color:#37474F; margin:6px 0 12px; line-height:1.4;">
        ${obj.name} ternyata <b>${obj.isFloat ? '☁️ Terapung di atas air' : '⚓ Tenggelam di dasar'}</b>!<br>
        <span style="color:#558B2F; font-size:12px;">${obj.reason}</span>
      </div>
      <button class="squish-btn btn-primary btn-pill" style="font-size:14px; padding:10px 24px; background:#00838F;" onclick="loadNextScienceObject()">
        Uji Benda Berikutnya ➡️
      </button>
    </div>
  `;
}

function speakSciencePrompt() {
  var obj = scienceState.currentObj;
  if (!obj) return;
  speakNatural("Kalau " + obj.name + " dicelupkan ke air, kira-kira terapung atau tenggelam ya?");
}

function readScienceQuestionAloud() {
  speakSciencePrompt();
}
