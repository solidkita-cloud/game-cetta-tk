// =========================================================
// JS/EMPATHY.JS - CERMIN EMOSI & 3 KATA AJAIB
// Social-Emotional Learning (SEL) & Preschool Etiquette
// =========================================================

var EMOTION_SCENARIOS = [
  { text: 'Mendapat kado mainan balon warna-warni dari Ibu...', ans: 'Senang', emoji: '😄', exp: 'Hati kita gembira dan tersenyum ceria!' },
  { text: 'Menara balok tinggi yang kita susun tersenggol roboh...', ans: 'Sedih', emoji: '😢', exp: 'Wajar merasa sedih, tapi kita bisa menyusunnya lagi bersama teman!' },
  { text: 'Mendengar suara kilat dan guntur kencang di luar...', ans: 'Takut', emoji: '😨', exp: 'Peluk Ayah atau Bunda agar hatimu tenang dan merasa aman!' },
  { text: 'Berhasil memakai sepatu dan merapikan mainan sendiri...', ans: 'Bangga', emoji: '🥰', exp: 'Kamu mandiri dan hebat sekali!' },
  { text: 'Tiba-tiba ada kucing lucu melompat mengejutkan...', ans: 'Kaget', emoji: '😲', exp: 'Mata membulat dan mulut terbuka: Ooo!' }
];

var MAGIC_WORDS_SCENARIOS = [
  { text: 'Mainan kesayangan terselip di rak tinggi tak terjangkau. Apa kata ajaibmu pada Ayah?', ans: 'Tolong', emoji: '🤝', exp: 'Ucapkan "Ayah, tolong bantu ambilkan ya" dengan suara lembut!' },
  { text: 'Saat berlari tidak sengaja menyenggol krayon teman. Apa kata ajaib yang diucapkan?', ans: 'Maaf', emoji: '🙏', exp: 'Anak hebat berani minta maaf dan membantu merapikan krayonnya!' },
  { text: 'Bunda membawakan segelas susu hangat dan biskuit lezat. Apa kata ajaibmu?', ans: 'Terima Kasih', emoji: '🎁', exp: 'Ucapkan "Terima kasih banyak, Bunda!" dengan senyum manis!' }
];

var empathyState = {
  tab: 'emosi', // 'emosi' or 'magic'
  currentQuestion: null,
  isProcessing: false,
  recentIndex: []
};

function openEmpathyStudio() {
  goToScene('empathy');
  setMascotSpeech("Halo anak baik! Mari belajar mengenal perasaan dan 3 kata ajaib bersama Pandi! ❤️🤝");
  speakNatural("Mari belajar mengenal perasaan dan 3 kata ajaib yang sopan!");
  empathyState.recentIndex = [];
  generateNewEmpathyScenario();
}

function exitEmpathyToMap() {
  goToScene('map');
}

function switchEmpathyTab(newTab) {
  playTonePop();
  empathyState.tab = newTab;
  empathyState.recentIndex = [];
  generateNewEmpathyScenario();
}

function generateNewEmpathyScenario() {
  empathyState.isProcessing = false;
  var isEmosi = (empathyState.tab === 'emosi');
  var pool = isEmosi ? EMOTION_SCENARIOS : MAGIC_WORDS_SCENARIOS;

  var avail = pool.map(function(s, i) { return i; }).filter(function(i) {
    return empathyState.recentIndex.indexOf(i) === -1;
  });
  if (avail.length === 0) {
    empathyState.recentIndex = [];
    avail = pool.map(function(s, i) { return i; });
  }

  var pickIdx = avail[Math.floor(Math.random() * avail.length)];
  empathyState.recentIndex.push(pickIdx);
  if (empathyState.recentIndex.length > 3) empathyState.recentIndex.shift();

  var q = pool[pickIdx];

  // Options
  var opts = [];
  if (isEmosi) {
    opts = [
      { label: 'Senang', emoji: '😄' },
      { label: 'Sedih', emoji: '😢' },
      { label: 'Takut', emoji: '😨' },
      { label: 'Bangga', emoji: '🥰' }
    ];
  } else {
    opts = [
      { label: 'Tolong', emoji: '🤝' },
      { label: 'Maaf', emoji: '🙏' },
      { label: 'Terima Kasih', emoji: '🎁' }
    ];
  }
  opts.sort(function() { return Math.random() - 0.5; });

  empathyState.currentQuestion = {
    data: q,
    options: opts
  };

  renderEmpathyStage();
}

function renderEmpathyStage() {
  var container = document.getElementById('empathy-stage-container');
  if (!container) return;

  var isEmosi = (empathyState.tab === 'emosi');
  var q = empathyState.currentQuestion;
  if (!q) return;

  var html = `
    <!-- Sub-Tabs -->
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:12px;">
      <button class="squish-btn empathy-tab-btn ${isEmosi ? 'tab-active' : ''}" onclick="switchEmpathyTab('emosi')">
        🎭 Cermin Emosi (Perasaan)
      </button>
      <button class="squish-btn empathy-tab-btn ${!isEmosi ? 'tab-active' : ''}" onclick="switchEmpathyTab('magic')">
        ✨ 3 Kata Ajaib Sopan
      </button>
    </div>

    <!-- Scenario Card -->
    <div style="background:linear-gradient(180deg, #FFF, #FFF8E1); border-radius:24px; padding:18px 16px; border:3px solid #FFD54F; box-shadow:0 6px 18px rgba(0,0,0,0.06); margin-bottom:14px; text-align:center;">
      <div style="font-size:46px; margin-bottom:6px;">
        ${isEmosi ? '🪞' : '🪄'}
      </div>
      <div style="font-size:13px; font-weight:800; color:#E65100; text-transform:uppercase; letter-spacing:0.5px;">
        ${isEmosi ? 'Bagaimana Perasaan Cetta?' : 'Kata Ajaib Apa yang Diucapkan?'}
      </div>
      <div style="font-size:17px; font-weight:900; color:#37474F; margin:8px 0; line-height:1.4;">
        "${q.data.text}"
      </div>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 14px; background:#FFF3E0; color:#E65100; border:1.5px solid #FFB74D; font-weight:800;" onclick="readEmpathyPromptAloud()">
        🔊 Dengar Cerita
      </button>
    </div>

    <!-- Choices Grid -->
    <div style="display:grid; grid-template-columns:${isEmosi ? '1fr 1fr' : '1fr'}; gap:10px;">
      ${q.options.map(function(opt) {
        return `
          <button class="squish-btn empathy-choice-btn" 
                  style="background:#FFFFFF; border:2.5px solid #E0E0E0; border-radius:18px; padding:${isEmosi ? '14px 10px' : '16px 14px'}; font-size:16px; font-weight:900; color:#2E7D32; display:flex; align-items:center; justify-content:center; gap:8px;" 
                  onclick="handleEmpathyAnswer(this, '${opt.label}')">
            <span style="font-size:26px;">${opt.emoji}</span>
            <span>${opt.label}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
  speakEmpathyPrompt();
}

function handleEmpathyAnswer(btn, chosenLabel) {
  if (empathyState.isProcessing) return;
  var q = empathyState.currentQuestion;
  if (!q) return;

  var isCorrect = (chosenLabel === q.data.ans);

  if (isCorrect) {
    empathyState.isProcessing = true;
    playToneChime();
    btn.style.borderColor = '#4CAF50';
    btn.style.background = '#E8F5E9';

    if (typeof addProfileStars === 'function') addProfileStars(1);
    if (typeof addGameStars === 'function') addGameStars(1);

    setMascotSpeech("HEBAT SEKALI! " + q.data.exp + " ❤️⭐");
    speakNatural("Hebat sekali! " + q.data.exp);

    setTimeout(function() {
      generateNewEmpathyScenario();
    }, 1700);
  } else {
    playToneBoing();
    btn.style.borderColor = '#EF5350';
    btn.style.background = '#FFEBEE';
    setTimeout(function() {
      btn.style.borderColor = '#E0E0E0';
      btn.style.background = '#FFFFFF';
    }, 500);

    setMascotSpeech("Yuk kita renungkan lagi bersama Pandi ya! Semangat anak pintar! 🌸");
    speakNatural("Coba pikirkan lagi ya sayang!");
  }
}

function speakEmpathyPrompt() {
  var q = empathyState.currentQuestion;
  if (!q) return;
  speakNatural(q.data.text);
}

function readEmpathyPromptAloud() {
  speakEmpathyPrompt();
}
