// =========================================================
// STORY.JS - POJOK DONGENG SAHABAT ALAM (4 KISAH ELEMEN ALAM)
// Kiko (Air), Bayu (Angin), Bara (Api), Boni (Tanah)
// =========================================================

var ALL_STORIES = {
  kiko: {
    id: 'kiko',
    title: 'Kiko si Rintik Hujan',
    subtitle: 'Sains Air & Cinta Kebersihan Sungai',
    themeColor: '#0288D1',
    bgColor: '#E0F7FA',
    coverIcon: '🌧️',
    chapters: [
      {
        num: 1,
        title: "Kiko Meluncur dari Awan",
        text: "Di langit biru yang tinggi, Kiko si Rintik Hujan melambaikan tangan ceria! 'Hai teman-teman, aku mau meluncur ke bumi menyiram bunga dan rumput!' seru Kiko. Ayo ketuk awan gembul untuk membantu Kiko meluncur!",
        type: 'cloud'
      },
      {
        num: 2,
        title: "Menyapa Bunga yang Kehausan",
        text: "Pluk! Kiko mendarat lembut di atas tanah. Di sana ada sekuntum kuncup bunga mawar yang sedang mengantuk dan kehausan menanti air. Usap atau ketuk bunganya agar segar dan mekar tersenyum!",
        type: 'flower'
      },
      {
        num: 3,
        title: "Sungai Sedih Tersumbat Sampah",
        text: "Oh tidak! Kiko sampai di sungai, tapi airnya terhenti. Ada botol plastik dan kantong kresek kotor menumpuk! Kiko menangis sesak napas. Ayo ketuk semua sampah untuk membuangnya ke tong sampah!",
        type: 'river'
      },
      {
        num: 4,
        title: "Menari di Lautan Lepas",
        text: "Horeee! Karena kebaikan tanganmu, air sungai kembali jernih berkilauan! Kiko mengalir sampai ke laut luas dan menari bahagia bersama lumba-lumba dan ikan warna-warni. 'Terima kasih anak baik!' bisik Kiko penuh cinta.",
        type: 'ocean'
      }
    ]
  },
  bayu: {
    id: 'bayu',
    title: 'Bayu si Angin Sejuk',
    subtitle: 'Sains Udara, Layang-Layang & Kincir',
    themeColor: '#00897B',
    bgColor: '#E0F2F1',
    coverIcon: '🍃',
    chapters: [
      {
        num: 1,
        title: "Hembusan Pertama dari Bukit",
        text: "Wuuusshh! Bayu si Angin Sejuk bangun di pagi hari. Udara terasa gerah dan panas. Bayu ingin menyegarkan bumi! Ayo usap layar ke kanan untuk membantu Bayu meniup hawa sejuk!",
        type: 'wind_sweep'
      },
      {
        num: 2,
        title: "Menerbangkan Layang-Layang Cetta",
        text: "Lihat! Ada layang-layang cantik di atas rumput. Anak-anak ingin layang-layang itu terbang tinggi. Ketuk layang-layang agar Bayu bisa mengangkatnya menari di angkasa!",
        type: 'kite'
      },
      {
        num: 3,
        title: "Memutar Kincir Angin Raksasa",
        text: "Di atas bukit, ada kincir angin raksasa yang diam. Kalau kincirnya berputar, lampu-lampu rumah bisa menyala terang! Ayo ketuk kincir angin agar berputar kencang!",
        type: 'windmill'
      },
      {
        num: 4,
        title: "Daun Gugur untuk Tunas Baru",
        text: "Bayu meniup dahan pohon dengan lembut. Daun-daun kuning yang sudah tua gugur ke tanah menjadi pupuk subur. Di dahannya, tunas hijau baru siap tumbuh! Terima kasih Bayu si Angin Sejuk!",
        type: 'leaves'
      }
    ]
  },
  bara: {
    id: 'bara',
    title: 'Bara si Api yang Hangat',
    subtitle: 'Kehangatan, Sup Lezat & Keselamatan',
    themeColor: '#E65100',
    bgColor: '#FFF3E0',
    coverIcon: '🔥',
    chapters: [
      {
        num: 1,
        title: "Menghangatkan Malam yang Dingin",
        text: "Malam hari terasa sangat dingin di perkemahan. Bara si Api Kecil menyala lembut di dalam tungku batu yang aman. Ketuk kayu bakar untuk membuat Bara menyala hangat!",
        type: 'bonfire'
      },
      {
        num: 2,
        title: "Membantu Ibu Memasak Sup Sayur",
        text: "Di dapur, Ibu sedang membuat sup wortel dan jagung untuk makan malam. Bara membantu memanaskan panci sup dengan hati-hati. Ketuk panci untuk mengaduk sup harum yang lezat!",
        type: 'soup'
      },
      {
        num: 3,
        title: "Bernyanyi di Sekeliling Api Unggun",
        text: "Pandi, Miko, dan teman-teman berkumpul di sekitar api unggun. Mereka bertepuk tangan dan bernyanyi riang. Bara menari ceria memberi cahaya terang di kegelapan malam!",
        type: 'camp_sing'
      },
      {
        num: 4,
        title: "Pesan Sahabat Bara: Hati-Hati!",
        text: "Bara berbisik manis: 'Aku sahabat yang baik untuk memasak dan menghangatkan, tapi ingat ya sayang: jangan pernah bermain api atau korek sendirian tanpa Ayah dan Bunda!' Jadilah anak bijak yang hebat!",
        type: 'fire_safety'
      }
    ]
  },
  boni: {
    id: 'boni',
    title: 'Boni si Benih Pohon',
    subtitle: 'Tanah Subur, Tunas Hijau & Buah Manis',
    themeColor: '#558B2F',
    bgColor: '#F1F8E9',
    coverIcon: '🌱',
    chapters: [
      {
        num: 1,
        title: "Biji Kecil Tertidur di Tanah",
        text: "Di dalam pelukan tanah gembur yang hangat, Boni si Benih kecil tertidur pulas. Selimut tanahnya sangat nyaman. Ayo usap tanahnya untuk membangunkan Boni!",
        type: 'seed_sleep'
      },
      {
        num: 2,
        title: "Disapa Air & Disinari Mentari",
        text: "Kiko si Rintik membasahi tanah, dan Mentari tersenyum hangat. Boni mulai menggeliat! Kraaak... Tunas hijau mungil menyembul ke atas tanah! Ketuk tunasnya agar makin semangat tumbuh!",
        type: 'sprout'
      },
      {
        num: 3,
        title: "Tumbuh Jadi Pohon Rindang",
        text: "Hari demi hari berlalu, Boni tumbuh semakin tinggi dan kuat! Batangnya kokoh, daun-daunnya rimbun menaungi burung-burung yang bernyanyi riang di dahannya!",
        type: 'big_tree'
      },
      {
        num: 4,
        title: "Panen Buah Mangga Manis",
        text: "Waaah! Dari bunga-bunga pohon Boni, muncullah buah mangga matang yang ranum dan wangi! Pandi dan anak-anak memetik buah bersama dengan gembira. Terima kasih Ibu Bumi dan Pohon Boni!",
        type: 'harvest'
      }
    ]
  }
};

var storyState = {
  currentStoryId: 'kiko',
  chapter: 1,
  totalChapters: 4,
  actionCount: 0,
  chapterCompleted: false,
  isShelfView: true
};

function startStoryBook(storyId) {
  if (typeof playTonePop === 'function') playTonePop();
  goToScene('story');

  if (storyId && ALL_STORIES[storyId]) {
    storyState.currentStoryId = storyId;
    storyState.isShelfView = false;
    storyState.chapter = 1;
    renderStoryChapter(1);
  } else {
    // Show Story Shelf (Pilih Buku)
    openStoryShelf();
  }
}

function openStoryShelf() {
  if (typeof playTonePop === 'function') playTonePop();
  storyState.isShelfView = true;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  var scene = document.getElementById('scene-story');
  if (scene) scene.style.background = '#EDE7F6';

  var headerTitle = document.getElementById('story-header-title');
  if (headerTitle) headerTitle.textContent = "📖 Rak Dongeng Sahabat Alam";

  var badge = document.getElementById('story-page-badge');
  if (badge) badge.textContent = "4 KISAH ALAM";

  var stage = document.getElementById('story-interactive-canvas');
  if (stage) {
    stage.style.background = 'transparent';
    stage.style.border = 'none';
    stage.style.boxShadow = 'none';
    stage.innerHTML = `
      <div style="width:100%; display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:6px 0;">
        ${Object.keys(ALL_STORIES).map(function(key) {
          var s = ALL_STORIES[key];
          return `
            <div class="squish-btn" style="background:#FFF; border-radius:22px; padding:16px 10px; text-align:center; box-shadow:0 6px 16px rgba(0,0,0,0.08); border:2.5px solid ${s.themeColor}; cursor:pointer;" onclick="selectStoryFromShelf('${s.id}')">
              <div style="font-size:48px; margin-bottom:6px;">${s.coverIcon}</div>
              <div style="font-size:14px; font-weight:800; color:${s.themeColor}; line-height:1.2;">${s.title}</div>
              <div style="font-size:11px; color:#757575; margin-top:4px;">${s.subtitle}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  var narrativeCard = document.getElementById('story-narrative-card');
  if (narrativeCard) {
    narrativeCard.innerHTML = `
      <div style="font-size:15px; font-weight:800; color:#4A148C; text-align:center;">
        Pilih Kisah Sahabat Alam yang Ingin Kamu Baca 🌟
      </div>
      <div style="font-size:13px; color:#616161; text-align:center; margin-top:4px;">
        Belajar keajaiban air, angin, api, dan tanah sambil bermain!
      </div>
    `;
  }

  var navBar = document.getElementById('story-nav-bar');
  if (navBar) {
    navBar.innerHTML = `
      <button class="squish-btn btn-pill" style="background:#ECEFF1; color:#37474F; font-size:14px; padding:10px 24px; margin:0 auto;" onclick="exitStoryToMap()">
        🗺️ Kembali ke Peta
      </button>
    `;
  }

  if (typeof speakNatural === 'function') {
    speakNatural("Pilih buku dongeng sahabat alam yang ingin kamu dengar ya sayang!");
  }
}

function selectStoryFromShelf(storyId) {
  if (typeof playTonePop === 'function') playTonePop();
  storyState.currentStoryId = storyId;
  storyState.isShelfView = false;
  storyState.chapter = 1;
  renderStoryChapter(1);
}

function exitStoryToMap() {
  if (typeof playTonePop === 'function') playTonePop();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  goToScene('map');
}

function renderStoryChapter(chNum) {
  storyState.chapter = chNum;
  storyState.chapterCompleted = false;
  storyState.actionCount = 0;

  var currentStory = ALL_STORIES[storyState.currentStoryId] || ALL_STORIES.kiko;
  var ch = currentStory.chapters[chNum - 1];
  if (!ch) return;

  var scene = document.getElementById('scene-story');
  if (scene) scene.style.background = currentStory.bgColor;

  var headerTitle = document.getElementById('story-header-title');
  if (headerTitle) headerTitle.textContent = currentStory.title;

  var badge = document.getElementById('story-page-badge');
  if (badge) badge.textContent = "BAB " + chNum + " / " + storyState.totalChapters;

  // Restore Navigation Bar
  var navBar = document.getElementById('story-nav-bar');
  if (navBar) {
    navBar.innerHTML = `
      <button class="squish-btn btn-pill" style="background:#ECEFF1; color:#455A64; font-size:13px; padding:8px 14px;" onclick="prevStoryChapter()">
        ⬅️ Sebelum
      </button>
      <button class="squish-btn btn-pill" style="background:#FFF3E0; color:#E65100; font-size:13px; padding:8px 14px; font-weight:800;" onclick="openStoryShelf()">
        📚 Rak Buku
      </button>
      <button class="squish-btn btn-pill" style="background:#E0F2F1; color:#00695C; font-size:13px; padding:8px 14px; font-weight:800;" onclick="readStoryAloud()">
        🔊 Suara
      </button>
      <button id="btn-story-next" class="squish-btn btn-primary btn-pill" style="font-size:13px; padding:8px 16px;" onclick="nextStoryChapter()">
        Lanjut ➡️
      </button>
    `;
  }

  // Restore Narrative Text Card
  var narrativeCard = document.getElementById('story-narrative-card');
  if (narrativeCard) {
    narrativeCard.innerHTML = `
      <div id="story-chapter-title" style="font-size:16px; font-weight:800; color:${currentStory.themeColor}; margin-bottom:4px;">
        ${ch.title}
      </div>
      <div id="story-narrative-text" style="font-size:14px; color:#37474F; line-height:1.5;">
        ${ch.text}
      </div>
    `;
  }

  var stage = document.getElementById('story-interactive-canvas');
  if (!stage) return;
  stage.style.background = 'radial-gradient(circle at 50% 30%, #FFFFFF, #E1F5FE 70%, #B3E5FC)';
  stage.style.border = '3px solid ' + currentStory.themeColor;
  stage.style.boxShadow = 'inset 0 4px 12px rgba(0,0,0,0.05), 0 10px 25px rgba(0,0,0,0.1)';

  // Render Interactive Scene based on type
  renderChapterInteractivePlayground(stage, ch.type);

  // Auto Read
  readStoryAloud();
}

function renderChapterInteractivePlayground(stage, type) {
  if (type === 'cloud') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:18px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:80px; cursor:pointer;" onclick="triggerStoryAction('cloud')">☁️</div>
        <div id="story-particles-1" style="height:50px; display:flex; gap:12px; font-size:32px; opacity:0; transition:opacity 0.4s;">💧 💧 💧</div>
        <div style="font-size:13px; color:#0277BD; font-weight:800; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          👆 Ketuk awan gembul untuk memanggil hujan!
        </div>
      </div>
    `;
  } else if (type === 'flower') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:34px;">💧</div>
        <div id="story-actor-1" class="squish-btn" style="font-size:74px; cursor:pointer; transition:transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);" onclick="triggerStoryAction('flower')">🥀</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#C62828; background:rgba(255,255,255,0.85); padding:6px 14px; border-radius:18px;">
          Bunga kuncup kehausan... Ayo ketuk untuk menyiram!
        </div>
      </div>
    `;
  } else if (type === 'river') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:14px; text-align:center;">
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#D84315; background:rgba(255,255,255,0.85); padding:6px 14px; border-radius:18px;">
          Sungai Tersumbat Sampah 😢 Ketuk semua sampah!
        </div>
        <div id="story-river-surface" style="width:100%; max-width:320px; height:80px; background:#8D6E63; border-radius:22px; border:3px solid #6D4C41; display:flex; align-items:center; justify-content:space-around; padding:10px; transition:background 0.6s;">
          <div class="squish-btn" style="font-size:38px; cursor:pointer;" onclick="triggerStoryAction('trash', this)">🧃</div>
          <div class="squish-btn" style="font-size:38px; cursor:pointer;" onclick="triggerStoryAction('trash', this)">🛍️</div>
          <div class="squish-btn" style="font-size:38px; cursor:pointer;" onclick="triggerStoryAction('trash', this)">🥫</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px; font-weight:800; color:#2E7D32; font-size:13px;">
          <span style="font-size:30px;">🗑️</span> <span>Tong Sampah Bersih</span>
        </div>
      </div>
    `;
  } else if (type === 'ocean') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:14px; text-align:center;">
        <div style="font-size:13px; font-weight:800; color:#0277BD; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          🌊 Lautan Biru Bahagia! Ketuk sahabat laut:
        </div>
        <div style="display:flex; gap:20px; align-items:center; justify-content:center;">
          <div class="squish-btn" style="font-size:60px; cursor:pointer;" onclick="triggerStoryAction('marine', this, 'lumba-lumba')">🐬</div>
          <div class="squish-btn" style="font-size:52px; cursor:pointer;" onclick="triggerStoryAction('marine', this, 'ikan')">🐠</div>
          <div class="squish-btn" style="font-size:46px; cursor:pointer;" onclick="triggerStoryAction('marine', this, 'penyu')">🐢</div>
        </div>
        <button class="squish-btn btn-primary btn-pill" style="margin-top:10px; font-size:15px; padding:12px 24px;" onclick="finishStoryBook()">
          🏅 Ambil Lencana Bintang!
        </button>
      </div>
    `;
  } else if (type === 'wind_sweep') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:18px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:76px; cursor:pointer;" onclick="triggerStoryAction('wind_sweep')">🍃</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#00796B; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk Bayu si Angin untuk meniup hawa sejuk!
        </div>
      </div>
    `;
  } else if (type === 'kite') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:74px; cursor:pointer; transition:transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);" onclick="triggerStoryAction('kite')">🪁</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#00796B; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk layang-layang agar terbang ke awan!
        </div>
      </div>
    `;
  } else if (type === 'windmill') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:74px; cursor:pointer; transition:transform 0.8s ease-in-out;" onclick="triggerStoryAction('windmill')">🎡</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#00796B; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk kincir angin agar berputar kencang!
        </div>
      </div>
    `;
  } else if (type === 'leaves') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:70px;">🌳</div>
        <div id="story-actor-1" class="squish-btn" style="font-size:38px; cursor:pointer;" onclick="triggerStoryAction('leaves')">🍂 🍂 🍂</div>
        <button class="squish-btn btn-primary btn-pill" style="font-size:15px; padding:12px 24px;" onclick="finishStoryBook()">
          🏅 Ambil Lencana Sahabat Angin!
        </button>
      </div>
    `;
  } else if (type === 'bonfire') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:72px; cursor:pointer;" onclick="triggerStoryAction('bonfire')">🪵</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#E65100; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk kayu bakar untuk menyalakan Bara yang hangat!
        </div>
      </div>
    `;
  } else if (type === 'soup') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:74px; cursor:pointer;" onclick="triggerStoryAction('soup')">🍲</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#E65100; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk panci sup sayur lezat buatan Ibu!
        </div>
      </div>
    `;
  } else if (type === 'camp_sing') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:64px;">🔥</div>
        <div style="display:flex; gap:16px; font-size:44px;">
          <div class="squish-btn" onclick="triggerStoryAction('sing', this)">🐼</div>
          <div class="squish-btn" onclick="triggerStoryAction('sing', this)">🐱</div>
          <div class="squish-btn" onclick="triggerStoryAction('sing', this)">🐵</div>
        </div>
        <div style="font-size:13px; font-weight:800; color:#E65100; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk sahabat untuk bernyanyi bersama di api unggun!
        </div>
      </div>
    `;
  } else if (type === 'fire_safety') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:68px;">👨‍👩‍👧‍👦 ❤️ 🔥</div>
        <div style="font-size:14px; font-weight:800; color:#C62828; background:rgba(255,255,255,0.9); padding:10px 18px; border-radius:20px; line-height:1.4;">
          🛡️ Pesan Sahabat Bara:<br>Selalu bersama Ayah & Ibu saat menyalakan api!
        </div>
        <button class="squish-btn btn-primary btn-pill" style="font-size:15px; padding:12px 24px;" onclick="finishStoryBook()">
          🏅 Ambil Lencana Sahabat Bijak!
        </button>
      </div>
    `;
  } else if (type === 'seed_sleep') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:68px; cursor:pointer;" onclick="triggerStoryAction('seed_sleep')">🌰</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#558B2F; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk tanah untuk menyapa Boni si Benih kecil!
        </div>
      </div>
    `;
  } else if (type === 'sprout') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:36px;">💧 ☀️</div>
        <div id="story-actor-1" class="squish-btn" style="font-size:72px; cursor:pointer; transition:transform 0.5s;" onclick="triggerStoryAction('sprout')">🌱</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#558B2F; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Ketuk tunas hijau mungil agar bersemangat tumbuh!
        </div>
      </div>
    `;
  } else if (type === 'big_tree') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div id="story-actor-1" class="squish-btn" style="font-size:82px; cursor:pointer;" onclick="triggerStoryAction('big_tree')">🌳</div>
        <div id="story-status-msg" style="font-size:13px; font-weight:800; color:#558B2F; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Pohon Boni tumbuh rindang! Ketuk pohonnya!
        </div>
      </div>
    `;
  } else if (type === 'harvest') {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:74px;">🥭 🥭 🥭</div>
        <div style="font-size:14px; font-weight:800; color:#558B2F; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          Panen buah mangga manis bersama Pandi! Horeee!
        </div>
        <button class="squish-btn btn-primary btn-pill" style="font-size:15px; padding:12px 24px;" onclick="finishStoryBook()">
          🏅 Ambil Lencana Sahabat Bumi!
        </button>
      </div>
    `;
  }
}

function triggerStoryAction(actionType, el, extraParam) {
  if (typeof playTonePop === 'function') playTonePop();

  if (actionType === 'cloud') {
    var cloud = document.getElementById('story-actor-1');
    if (cloud) { cloud.textContent = '🌧️'; cloud.classList.add('anim-wiggle'); }
    var rain = document.getElementById('story-particles-1');
    if (rain) rain.style.opacity = '1';
    if (typeof playToneWhistle === 'function') playToneWhistle();
    if (typeof speakNatural === 'function') speakNatural("Wuuush! Hujan rintik segar turun ke bumi! Yippiiie!");
    unlockNextButton();
  } else if (actionType === 'flower') {
    var fl = document.getElementById('story-actor-1');
    if (fl) { fl.textContent = '🌹'; fl.style.transform = 'scale(1.3) rotate(10deg)'; }
    var msg = document.getElementById('story-status-msg');
    if (msg) { msg.textContent = 'Horeee! Bunganya mekar tersenyum bahagia! 🌸✨'; msg.style.color = '#2E7D32'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Bunganya segar dan mekar berkat air hujan yang kamu beri!");
    unlockNextButton();
  } else if (actionType === 'trash') {
    if (!el || el.getAttribute('data-cleaned')) return;
    el.setAttribute('data-cleaned', 'true');
    el.style.transform = 'scale(0) translateY(40px)';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';

    storyState.actionCount = (storyState.actionCount || 0) + 1;
    if (storyState.actionCount >= 3) {
      var river = document.getElementById('story-river-surface');
      if (river) { river.style.background = '#29B6F6'; river.style.borderColor = '#0288D1'; }
      var riverMsg = document.getElementById('story-status-msg');
      if (riverMsg) { riverMsg.textContent = 'Horeee! Sungai bersih dan jernih kembali! 💧✨'; riverMsg.style.color = '#0277BD'; }
      if (typeof playToneFanfare === 'function') playToneFanfare();
      if (typeof speakNatural === 'function') speakNatural("Hebat! Sungai bersih dari sampah! Kiko bisa mengalir riang kembali!");
      unlockNextButton();
    }
  } else if (actionType === 'marine') {
    if (el) { el.classList.add('anim-wiggle'); setTimeout(function() { el.classList.remove('anim-wiggle'); }, 600); }
    if (typeof speakNatural === 'function') speakNatural(extraParam + " berenang ceria di lautan jernih!");
  } else if (actionType === 'wind_sweep') {
    var wind = document.getElementById('story-actor-1');
    if (wind) { wind.textContent = '🌬️ 🍃'; wind.classList.add('anim-wiggle'); }
    var wMsg = document.getElementById('story-status-msg');
    if (wMsg) { wMsg.textContent = 'Hembusan angin sejuk bertiup menyegarkan! 🍃✨'; }
    if (typeof playToneWhistle === 'function') playToneWhistle();
    if (typeof speakNatural === 'function') speakNatural("Wuuush! Angin sejuk bertiup segar ke seluruh bumi!");
    unlockNextButton();
  } else if (actionType === 'kite') {
    var kite = document.getElementById('story-actor-1');
    if (kite) { kite.style.transform = 'translateY(-60px) scale(1.25) rotate(-10deg)'; }
    var kMsg = document.getElementById('story-status-msg');
    if (kMsg) { kMsg.textContent = 'Layang-layang terbang tinggi menari di langit! 🪁✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Layang-layang terbang tinggi melayang di angkasa!");
    unlockNextButton();
  } else if (actionType === 'windmill') {
    var wm = document.getElementById('story-actor-1');
    if (wm) { wm.style.transform = 'rotate(720deg)'; }
    var wmMsg = document.getElementById('story-status-msg');
    if (wmMsg) { wmMsg.textContent = 'Kincir berputar kencang menghasilkan cahaya terang! 💡✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Kincir angin berputar kencang menerangi rumah-rumah!");
    unlockNextButton();
  } else if (actionType === 'leaves') {
    var lv = document.getElementById('story-actor-1');
    if (lv) { lv.textContent = '🌱 ✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Daun kering gugur menyuburkan tanah untuk tunas baru!");
    unlockNextButton();
  } else if (actionType === 'bonfire') {
    var bf = document.getElementById('story-actor-1');
    if (bf) { bf.textContent = '🔥 🪵'; bf.classList.add('anim-wiggle'); }
    var bfMsg = document.getElementById('story-status-msg');
    if (bfMsg) { bfMsg.textContent = 'Bara api menyala hangat menerangi malam! 🔥✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Bara menyala hangat menerangi dinginnya malam!");
    unlockNextButton();
  } else if (actionType === 'soup') {
    var sp = document.getElementById('story-actor-1');
    if (sp) { sp.textContent = '🍲 ♨️'; sp.classList.add('anim-wiggle'); }
    var spMsg = document.getElementById('story-status-msg');
    if (spMsg) { spMsg.textContent = 'Sup sayur mengepul harum lezat siap dimakan! 😋✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Sup sayur lezat dan sehat sudah matang sempurna!");
    unlockNextButton();
  } else if (actionType === 'sing') {
    if (el) { el.classList.add('anim-wiggle'); setTimeout(function() { el.classList.remove('anim-wiggle'); }, 600); }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("La la la... Senangnya bernyanyi bersama sahabat!");
  } else if (actionType === 'seed_sleep') {
    var sd = document.getElementById('story-actor-1');
    if (sd) { sd.textContent = '🌰 ✨'; }
    var sdMsg = document.getElementById('story-status-msg');
    if (sdMsg) { sdMsg.textContent = 'Boni terbangun dari tidur nyenyaknya! 🌱✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Boni terbangun dan siap menyapa dunia luar!");
    unlockNextButton();
  } else if (actionType === 'sprout') {
    var sprt = document.getElementById('story-actor-1');
    if (sprt) { sprt.style.transform = 'scale(1.4)'; sprt.textContent = '🌿'; }
    var sprtMsg = document.getElementById('story-status-msg');
    if (sprrtMsg) { sprtMsg.textContent = 'Tunas hijau tumbuh makin segar dan tinggi! 🌿✨'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Tunas Boni tumbuh makin tinggi menuju cahaya mentari!");
    unlockNextButton();
  } else if (actionType === 'big_tree') {
    var bt = document.getElementById('story-actor-1');
    if (bt) { bt.textContent = '🌳 🐦'; }
    if (typeof playToneChime === 'function') playToneChime();
    if (typeof speakNatural === 'function') speakNatural("Burung-burung hinggap bernyanyi di pohon Boni yang rindang!");
    unlockNextButton();
  }
}

function unlockNextButton() {
  var nextBtn = document.getElementById('btn-story-next');
  if (nextBtn) {
    nextBtn.style.animation = 'squishBounce 0.6s infinite alternate';
  }
}

function readStoryAloud() {
  var currentStory = ALL_STORIES[storyState.currentStoryId] || ALL_STORIES.kiko;
  var ch = currentStory.chapters[storyState.chapter - 1];
  if (!ch) return;
  if (typeof speakNatural === 'function') {
    speakNatural(ch.text);
  }
}

function nextStoryChapter() {
  if (typeof playTonePop === 'function') playTonePop();
  if (storyState.chapter < storyState.totalChapters) {
    renderStoryChapter(storyState.chapter + 1);
  }
}

function prevStoryChapter() {
  if (typeof playTonePop === 'function') playTonePop();
  if (storyState.chapter > 1) {
    renderStoryChapter(storyState.chapter - 1);
  }
}

function finishStoryBook() {
  if (typeof playToneFanfare === 'function') playToneFanfare();
  if (typeof addProfileStars === 'function') {
    addProfileStars(5);
  } else if (typeof addGameStars === 'function') {
    addGameStars(5);
  }

  var currentStory = ALL_STORIES[storyState.currentStoryId] || ALL_STORIES.kiko;
  var msg = "Selamat " + (window.gameState ? window.gameState.playerName : 'Juara') + "! Kamu berhasil menyelesaikan kisah " + currentStory.title + " dan mendapatkan 5 Bintang Emas! ⭐⭐⭐⭐⭐";
  if (typeof speakNatural === 'function') speakNatural(msg);

  var modal = document.getElementById('modal-story-finish');
  if (modal) {
    modal.classList.add('modal-active');
    modal.style.display = 'flex';
  }
}

function closeStoryFinishModal() {
  var modal = document.getElementById('modal-story-finish');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}
