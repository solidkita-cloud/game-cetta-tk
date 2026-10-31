// =========================================================
// APP.JS - UI CONTROLLER, SCENE ROUTER & EASTER EGGS
// =========================================================

function closeAllModals() {
  var modals = document.querySelectorAll('.game-modal-overlay');
  modals.forEach(function(m) {
    m.classList.remove('modal-active');
  });
}

function goToScene(sceneName) {
  playTonePop();
  closeAllModals(); // Automatically dismiss any open modals when navigating scenes!
  var scenes = document.querySelectorAll('.scene-view');
  scenes.forEach(function(s) {
    s.classList.remove('active-scene');
  });

  var target = document.getElementById('scene-' + sceneName);
  if (target) {
    target.classList.add('active-scene');
  }

  // Only show bubbles on Title & Map scene so they never obstruct game buttons!
  var bubbleLayer = document.getElementById('floating-bubbles-container');
  if (bubbleLayer) {
    bubbleLayer.style.display = (sceneName === 'title' || sceneName === 'map') ? 'block' : 'none';
  }

  // Update Mascot speech for scene
  var mascotName = (window.gameState.selectedMascot === 'pandi' ? 'Pandi' : 'Miko');
  if (sceneName === 'map') {
    setMascotSpeech("Halo " + window.gameState.playerName + "! Pilih wahana bermain yang kamu suka ya! 🗺️✨");
  } else if (sceneName === 'title') {
    setMascotSpeech("Selamat datang di Taman Petualangan Ceria Cetta! 🎈");
  } else if (sceneName === 'tracing') {
    setMascotSpeech("Selamat datang di Studio Coretan! Ayo tarik garis dan warnai sesukamu! 🎨✨");
  } else if (sceneName === 'story') {
    setMascotSpeech("Dengarkan kisah 4 Sahabat Alam yang seru dan penuh petualangan! 🌧️🍃🔥🌱");
  } else if (sceneName === 'music') {
    setMascotSpeech("Sentuh tuts Xilofon Pelangi dan buat musik indah sesukamu! 🎵🌈");
  } else if (sceneName === 'habits') {
    setMascotSpeech("Ayo jaga kebersihan! Sikat gigi bersih dan letuskan gelembung sabun! 🪥🫧");
  }
}

function setMascotSpeech(text) {
  var el = document.getElementById('mascot-speech-text');
  if (el) el.textContent = text;
}

// ---------------------------------------------------------
// Anti-Boredom Feature: Mascot Tickle & Giggle
// ---------------------------------------------------------
function tickleMascot() {
  playTonePop();
  var avatar = document.getElementById('main-mascot-avatar');
  if (avatar) {
    avatar.classList.add('anim-wiggle');
    setTimeout(function() { avatar.classList.remove('anim-wiggle'); }, 600);
  }
  var quotes = [
    "Hihihi geli-geli! Jangan digelitiki dong!",
    "Hahaha geli banget perutku!",
    "Hihihi geli perut Pandi gemoy!",
    "Geli-geli asik! Colek lagi dong!"
  ];
  var q = quotes[Math.floor(Math.random() * quotes.length)];
  setMascotSpeech(q);
  speakNatural(q);
}

// ---------------------------------------------------------
// Anti-Boredom Feature: Interactive Soap Bubbles
// ---------------------------------------------------------
function initFloatingBubbles() {
  var layer = document.getElementById('floating-bubbles-container');
  if (!layer) return;

  setInterval(function() {
    if (document.hidden) return;
    spawnSingleBubble(layer);
  }, 3500);
}

function spawnSingleBubble(layer) {
  var b = document.createElement('div');
  b.className = 'interactive-bubble';
  var size = 38 + Math.random() * 32;
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  b.style.left = (5 + Math.random() * 85) + '%';
  var dur = 6 + Math.random() * 5;
  b.style.animation = 'floatBubble ' + dur + 's linear forwards';

  b.onclick = function(e) {
    e.stopPropagation();
    popBubbleElement(b);
  };

  layer.appendChild(b);

  setTimeout(function() {
    if (b.parentNode) b.parentNode.removeChild(b);
  }, dur * 1000);
}

function popBubbleElement(el) {
  playTonePop();
  el.style.animation = 'popOut 0.25s forwards';
  setTimeout(function() {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 250);
}

// ---------------------------------------------------------
// Anti-Boredom Feature: Tamagotchi Living World Taps
// ---------------------------------------------------------
function tapLivingEgg() {
  playTonePop();
  var stage = window.gameState.eggCrackStage;
  if (stage >= 3) {
    speakNatural("Burung Cetta sudah menetas! Ciap ciap ciap!");
    setMascotSpeech("Ciap ciap! Burung Cetta menemanimu bermain! 🐣");
  } else if (stage === 2) {
    speakNatural("Telurnya retak makin banyak! Sebentar lagi menetas!");
    setMascotSpeech("Kumpulkan lebih banyak bintang biar telurnya menetas! 🥚⚡");
  } else {
    speakNatural("Telur rahasia ini hangat! Rajin belajar ya biar retak!");
    setMascotSpeech("Dengarkan, ada detak di dalam telur rahasia! 🥚");
  }
}

function tapGarden() {
  playToneChime();
  speakNatural("Kebun Cetta berbunga harum dan indah!");
  setMascotSpeech("Bunga-bunga tersenyum melihat anak pintar belajar! 🌸");
}

function tapTreehouse() {
  playToneWhistle();
  speakNatural("Ini rumah pohon tempat kita berkumpul bersama teman-teman!");
}

// ---------------------------------------------------------
// Roleplay Switcher (Bu Guru / Pak Guru / Murid)
// ---------------------------------------------------------
function setPlayerRole(role) {
  playTonePop();
  window.gameState.role = role;
  saveGameState();

  var roleLabel = document.getElementById('role-display-label');
  if (roleLabel) {
    if (role === 'bu_guru') roleLabel.textContent = "👩‍🏫 Bu Guru " + window.gameState.playerName;
    else if (role === 'pak_guru') roleLabel.textContent = "👨‍🏫 Pak Guru " + window.gameState.playerName;
    else roleLabel.textContent = "🎒 Murid Pintar " + window.gameState.playerName;
  }

  var msg = "Sekarang kamu berperan sebagai " + (role === 'bu_guru' ? 'Bu Guru' : (role === 'pak_guru' ? 'Pak Guru' : 'Murid Pintar')) + "!";
  setMascotSpeech(msg);
  speakNatural(msg);
}

// ---------------------------------------------------------
// Mascot Switcher (Pandi Panda vs Miko Kucing)
// ---------------------------------------------------------
function switchMascot(mName) {
  playTonePop();
  window.gameState.selectedMascot = mName;
  saveGameState();

  var avatar = document.getElementById('main-mascot-avatar');
  if (avatar) avatar.textContent = (mName === 'pandi' ? '🐼' : '🐱');

  var msg = (mName === 'pandi' ? "Pandi si Panda siap bermain bersamamu!" : "Miko si Kucing siap melompat ceria!");
  setMascotSpeech(msg);
  speakNatural(msg);
}

// ---------------------------------------------------------
// Change Player Name Prompt
// ---------------------------------------------------------
function editPlayerName() {
  playTonePop();
  var cur = window.gameState.playerName;
  var newName = prompt("Siapa nama anak pintar?", cur);
  if (newName && newName.trim().length > 0) {
    window.gameState.playerName = newName.trim().toUpperCase();
    saveGameState();
    
    var nameDisplays = document.querySelectorAll('.player-name-text');
    nameDisplays.forEach(function(el) {
      el.textContent = window.gameState.playerName;
    });

    updateHUD();
    speakNatural("Halo " + window.gameState.playerName + "! Senang sekali bermain denganmu!");
  }
}

// ---------------------------------------------------------
// Mother's Reward Agreement Modal
// ---------------------------------------------------------
function openMotherRewardModal() {
  playTonePop();
  var m = document.getElementById('modal-mother-reward');
  if (m) m.classList.add('modal-active');
  speakNatural("Pilih janji hadiah dari Ibu yang kamu inginkan saat bintangmu terkumpul!");
}

function closeMotherRewardModal() {
  playTonePop();
  var m = document.getElementById('modal-mother-reward');
  if (m) m.classList.remove('modal-active');
}

function selectMotherReward(rewardText) {
  playToneChime();
  window.gameState.selectedMotherReward = rewardText;
  saveGameState();
  updateHUD();
  closeMotherRewardModal();

  var msg = "Kesepakatan hadiah: " + rewardText + "! Kumpulkan bintangnya ya!";
  setMascotSpeech(msg);
  speakNatural(msg);
}

// ---------------------------------------------------------
// App Bootstrap
// ---------------------------------------------------------
window.addEventListener('DOMContentLoaded', function() {
  updateHUD();
  initFloatingBubbles();
  
  // Set initial player name displays
  var nameDisplays = document.querySelectorAll('.player-name-text');
  nameDisplays.forEach(function(el) {
    el.textContent = window.gameState.playerName;
  });

  // Mascot avatar
  var avatar = document.getElementById('main-mascot-avatar');
  if (avatar) {
    avatar.textContent = (window.gameState.selectedMascot === 'pandi' ? '🐼' : '🐱');
  }
});
