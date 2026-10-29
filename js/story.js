// =========================================================
// STORY.JS - POJOK DONGENG SAHABAT ALAM (LIVING STORYBOOK)
// Petualangan Kiko si Rintik Hujan (Sains & Empati Lingkungan)
// =========================================================

var storyState = {
  chapter: 1,
  totalChapters: 4,
  trashCleaned: 0,
  chapterCompleted: false
};

var STORY_CHAPTERS = [
  {
    num: 1,
    title: "Kiko Meluncur dari Awan",
    sub: "Awan Gembul di Langit Biru",
    text: "Di langit biru yang tinggi, Kiko si Rintik Hujan melambaikan tangan ceria! 'Hai teman-teman, aku mau meluncur ke bumi menyiram bunga dan rumput!' seru Kiko. Ayo ketuk awan gembul untuk membantu Kiko meluncur!",
    icon: "☁️"
  },
  {
    num: 2,
    title: "Menyapa Bunga yang Kehausan",
    sub: "Kebun Bunga di Pelataran",
    text: "Pluk! Kiko mendarat lembut di atas tanah. Di sana ada sekuntum kuncup bunga mawar yang sedang mengantuk dan kehausan menanti air. Usap atau ketuk bunganya agar segar dan mekar tersenyum!",
    icon: "🌸"
  },
  {
    num: 3,
    title: "Sungai Sedih Tersumbat Sampah",
    sub: "Aliran Sungai Kecil yang Keruh",
    text: "Oh tidak! Kiko sampai di sungai, tapi airnya terhenti. Ada botol plastik dan kantong kresek kotor menumpuk! Kiko menangis sesak napas. Ayo ketuk semua sampah untuk membuangnya ke tong sampah!",
    icon: "💔"
  },
  {
    num: 4,
    title: "Menari di Lautan Lepas",
    sub: "Lautan Biru Bersama Sahabat",
    text: "Horeee! Karena kebaikan tanganmu, air sungai kembali jernih berkilauan! Kiko mengalir sampai ke laut luas dan menari bahagia bersama lumba-lumba dan ikan warna-warni. 'Terima kasih anak baik!' bisik Kiko penuh cinta.",
    icon: "🐬"
  }
];

function startStoryBook() {
  if (typeof playTonePop === 'function') playTonePop();
  goToScene('story');
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
  storyState.trashCleaned = 0;

  var ch = STORY_CHAPTERS[chNum - 1];
  if (!ch) return;

  var badge = document.getElementById('story-page-badge');
  if (badge) badge.textContent = "BAB " + chNum + " / " + storyState.totalChapters;

  var titleEl = document.getElementById('story-chapter-title');
  if (titleEl) titleEl.textContent = ch.title;

  var textEl = document.getElementById('story-narrative-text');
  if (textEl) textEl.textContent = ch.text;

  var stage = document.getElementById('story-interactive-canvas');
  if (!stage) return;

  // Render interactive playground based on chapter
  if (chNum === 1) {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:20px; text-align:center;">
        <div id="story-cloud-actor" class="squish-btn" style="font-size:80px; cursor:pointer;" onclick="tapCloudToRain()">
          ☁️
        </div>
        <div id="story-rain-particles" style="height:60px; display:flex; gap:12px; font-size:32px; opacity:0; transition:opacity 0.4s;">
          💧 💧 💧
        </div>
        <div style="font-size:14px; color:#5C6F4D; font-weight:800; background:rgba(255,255,255,0.85); padding:8px 16px; border-radius:20px;">
          👆 Ketuk awan gembul untuk memanggil hujan!
        </div>
      </div>
    `;
  } else if (chNum === 2) {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:16px; text-align:center;">
        <div style="font-size:38px;">💧</div>
        <div id="story-flower-actor" class="squish-btn" style="font-size:74px; cursor:pointer; transition:transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);" onclick="tapFlowerToBloom()">
          🥀
        </div>
        <div id="story-flower-status" style="font-size:14px; font-weight:800; color:#C62828; background:rgba(255,255,255,0.85); padding:8px 16px; border-radius:20px;">
          Bunga kuncup kehausan... Ayo ketuk untuk menyiram!
        </div>
      </div>
    `;
  } else if (chNum === 3) {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:14px; text-align:center;">
        <div id="story-river-status" style="font-size:14px; font-weight:800; color:#D84315; background:rgba(255,255,255,0.85); padding:6px 14px; border-radius:18px;">
          Sungai Sedih 😢 Kiko tersumbat sampah!
        </div>
        <!-- River Water Area -->
        <div id="story-river-surface" style="width:100%; max-width:340px; height:90px; background:#8D6E63; border-radius:24px; border:3px solid #6D4C41; display:flex; align-items:center; justify-content:space-around; padding:10px; transition:background 0.6s;">
          <div id="trash-item-1" class="squish-btn" style="font-size:42px; cursor:pointer;" onclick="cleanTrashItem(this)">🧃</div>
          <div id="trash-item-2" class="squish-btn" style="font-size:42px; cursor:pointer;" onclick="cleanTrashItem(this)">🛍️</div>
          <div id="trash-item-3" class="squish-btn" style="font-size:42px; cursor:pointer;" onclick="cleanTrashItem(this)">🥫</div>
        </div>
        <!-- Trash Bin -->
        <div style="display:flex; align-items:center; gap:8px; font-weight:800; color:#2E7D32;">
          <span style="font-size:36px;">🗑️</span> <span>Tong Sampah Bersih</span>
        </div>
      </div>
    `;
  } else if (chNum === 4) {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:14px; text-align:center;">
        <div style="font-size:14px; font-weight:800; color:#0277BD; background:rgba(255,255,255,0.85); padding:6px 16px; border-radius:20px;">
          🌊 Lautan Biru Bahagia! Ketuk sahabat laut:
        </div>
        <div style="display:flex; gap:20px; align-items:center; justify-content:center;">
          <div class="squish-btn" style="font-size:62px; cursor:pointer;" onclick="tapOceanFriend('dolphin', this)">🐬</div>
          <div class="squish-btn" style="font-size:54px; cursor:pointer;" onclick="tapOceanFriend('fish', this)">🐠</div>
          <div class="squish-btn" style="font-size:48px; cursor:pointer;" onclick="tapOceanFriend('turtle', this)">🐢</div>
        </div>
        <button class="squish-btn btn-primary btn-pill" style="margin-top:10px; font-size:16px; padding:12px 28px;" onclick="finishStoryBook()">
          🏅 Ambil Lencana Penjaga Alam!
        </button>
      </div>
    `;
  }

  // Auto Read
  readStoryAloud();
}

function readStoryAloud() {
  var ch = STORY_CHAPTERS[storyState.chapter - 1];
  if (!ch) return;
  if (typeof speakNatural === 'function') {
    speakNatural(ch.text);
  }
}

// Chapter 1 Interaction
function tapCloudToRain() {
  if (storyState.chapterCompleted) return;
  storyState.chapterCompleted = true;

  if (typeof playTonePop === 'function') playTonePop();
  if (typeof playToneWhistle === 'function') playToneWhistle();

  var cloud = document.getElementById('story-cloud-actor');
  if (cloud) {
    cloud.textContent = '🌧️';
    cloud.classList.add('anim-wiggle');
  }

  var rain = document.getElementById('story-rain-particles');
  if (rain) {
    rain.style.opacity = '1';
  }

  if (typeof speakNatural === 'function') {
    speakNatural("Wuuush! Hujan rintik segar turun ke bumi! Yippiiie!");
  }

  unlockNextChapterButton();
}

// Chapter 2 Interaction
function tapFlowerToBloom() {
  if (storyState.chapterCompleted) return;
  storyState.chapterCompleted = true;

  if (typeof playToneChime === 'function') playToneChime();
  if (typeof playTonePop === 'function') playTonePop();

  var flower = document.getElementById('story-flower-actor');
  if (flower) {
    flower.textContent = '🌹';
    flower.style.transform = 'scale(1.35) rotate(10deg)';
  }

  var status = document.getElementById('story-flower-status');
  if (status) {
    status.style.color = '#2E7D32';
    status.textContent = 'Horeee! Bunganya mekar tersenyum bahagia! 🌸✨';
  }

  if (typeof speakNatural === 'function') {
    speakNatural("Bunganya segar dan mekar tersenyum berkat Kiko dan kamu!");
  }

  unlockNextChapterButton();
}

// Chapter 3 Interaction
function cleanTrashItem(el) {
  if (!el || el.getAttribute('data-cleaned')) return;
  el.setAttribute('data-cleaned', 'true');

  if (typeof playTonePop === 'function') playTonePop();
  el.style.transform = 'scale(0) translateY(40px)';
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';

  storyState.trashCleaned++;

  if (storyState.trashCleaned >= 3) {
    storyState.chapterCompleted = true;
    if (typeof playToneFanfare === 'function') playToneFanfare();

    var river = document.getElementById('story-river-surface');
    if (river) {
      river.style.background = '#29B6F6';
      river.style.borderColor = '#0288D1';
    }

    var riverStatus = document.getElementById('story-river-status');
    if (riverStatus) {
      riverStatus.style.color = '#0277BD';
      riverStatus.textContent = 'Horeee! Sungai bersih dan jernih kembali! 💧✨';
    }

    if (typeof speakNatural === 'function') {
      speakNatural("Hebat! Sungai bersih dari sampah! Kiko bisa mengalir riang kembali!");
    }

    unlockNextChapterButton();
  }
}

// Chapter 4 Interaction
function tapOceanFriend(type, el) {
  if (typeof playTonePop === 'function') playTonePop();
  if (el) {
    el.classList.add('anim-wiggle');
    setTimeout(function() { el.classList.remove('anim-wiggle'); }, 600);
  }
  if (typeof speakNatural === 'function') {
    if (type === 'dolphin') speakNatural("Lumba-lumba melompat tinggi menyapa Kiko!");
    else if (type === 'fish') speakNatural("Ikan badut menari berenang lincah!");
    else speakNatural("Penyu laut berenang anggun di lautan bening!");
  }
}

function unlockNextChapterButton() {
  var nextBtn = document.getElementById('btn-story-next');
  if (nextBtn) {
    nextBtn.style.animation = 'squishBounce 0.6s infinite alternate';
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
  if (typeof addGameStars === 'function') addGameStars(5);

  var msg = "Selamat " + window.gameState.playerName + "! Kamu berhasil menyelesaikan dongeng Kiko dan mendapatkan Lencana Pahlawan Penjaga Alam serta 5 Bintang Emas! ⭐⭐⭐⭐⭐";
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
