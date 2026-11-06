// =========================================================
// JS/DETECTIVE.JS - DETEKTIF CILIK (HIDDEN OBJECTS MINI-GAME)
// Visual Observation, Focus & Shape Recognition for Preschoolers
// =========================================================

var DETECTIVE_SCENES = {
  taman: {
    id: 'taman',
    title: 'Taman Bunga Ajaib',
    icon: '🌸',
    targetName: 'Kupu-kupu Emas',
    targetEmoji: '🦋',
    bgGradient: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 60%, #81C784 100%)',
    targets: [
      { id: 1, x: 22, y: 24, decorNear: 'Dekat pohon rindang 🌳', hint: 'Coba intip di dekat pohon sebelah kiri!' },
      { id: 2, x: 74, y: 38, decorNear: 'Di atas bunga mawar 🌹', hint: 'Lihat bunga merah di sebelah kanan!' },
      { id: 3, x: 48, y: 72, decorNear: 'Di antara rumput hijau 🌿', hint: 'Ada yang hinggap di rerumputan bawah!' }
    ],
    decorations: [
      { emoji: '☀️', x: 86, y: 8, size: 36, opacity: 0.9 },
      { emoji: '☁️', x: 15, y: 10, size: 38, opacity: 0.8 },
      { emoji: '☁️', x: 50, y: 6, size: 32, opacity: 0.7 },
      { emoji: '🌳', x: 8, y: 36, size: 54, opacity: 0.95 },
      { emoji: '🌲', x: 88, y: 44, size: 48, opacity: 0.95 },
      { emoji: '🌹', x: 70, y: 45, size: 40, opacity: 0.9 },
      { emoji: '🌻', x: 35, y: 65, size: 42, opacity: 0.9 },
      { emoji: '🌷', x: 18, y: 78, size: 38, opacity: 0.85 },
      { emoji: '🌼', x: 82, y: 76, size: 36, opacity: 0.85 },
      { emoji: '🐝', x: 42, y: 30, size: 28, opacity: 0.8 },
      { emoji: '🍄', x: 62, y: 82, size: 32, opacity: 0.9 }
    ]
  },
  kamar: {
    id: 'kamar',
    title: 'Kamar Mainan Cetta',
    icon: '🧸',
    targetName: 'Boneka Beruang',
    targetEmoji: '🧸',
    bgGradient: 'linear-gradient(180deg, #FFF9C4 0%, #FFF176 50%, #FFE082 100%)',
    targets: [
      { id: 1, x: 18, y: 28, decorNear: 'Di atas rak buku 📚', hint: 'Coba lihat rak buku sebelah kiri atas!' },
      { id: 2, x: 82, y: 34, decorNear: 'Dekat bantal tidur 🛏️', hint: 'Ada yang sembunyi di dekat bantal kasur!' },
      { id: 3, x: 45, y: 75, decorNear: 'Di dalam kotak mainan 📦', hint: 'Intip ke karpet di tengah kamar!' }
    ],
    decorations: [
      { emoji: '🪟', x: 50, y: 12, size: 46, opacity: 0.9 },
      { emoji: '📚', x: 12, y: 32, size: 42, opacity: 0.9 },
      { emoji: '🛏️', x: 84, y: 40, size: 52, opacity: 0.9 },
      { emoji: '🎨', x: 30, y: 38, size: 34, opacity: 0.85 },
      { emoji: '🚗', x: 26, y: 78, size: 38, opacity: 0.9 },
      { emoji: '🧩', x: 68, y: 76, size: 36, opacity: 0.9 },
      { emoji: '⚽', x: 86, y: 80, size: 34, opacity: 0.85 },
      { emoji: '⏰', x: 70, y: 20, size: 30, opacity: 0.8 },
      { emoji: '🚀', x: 36, y: 18, size: 34, opacity: 0.85 }
    ]
  },
  kolam: {
    id: 'kolam',
    title: 'Kolam Ikan Teratai',
    icon: '🐠',
    targetName: 'Ikan Mas Berkilau',
    targetEmoji: '🐠',
    bgGradient: 'linear-gradient(180deg, #E0F7FA 0%, #80DEEA 55%, #4DD0E1 100%)',
    targets: [
      { id: 1, x: 25, y: 35, decorNear: 'Di bawah daun teratai 🪷', hint: 'Ada ikan berenang di dekat teratai kiri!' },
      { id: 2, x: 75, y: 28, decorNear: 'Dekat jembatan kayu 🪵', hint: 'Lihat air di sebelah kanan atas!' },
      { id: 3, x: 52, y: 70, decorNear: 'Di antara bebatuan kali 🪨', hint: 'Perhatikan air di bagian bawah tengah!' }
    ],
    decorations: [
      { emoji: '🪷', x: 20, y: 38, size: 48, opacity: 0.95 },
      { emoji: '🪷', x: 80, y: 65, size: 44, opacity: 0.95 },
      { emoji: '🐸', x: 46, y: 22, size: 36, opacity: 0.9 },
      { emoji: '🫧', x: 36, y: 55, size: 28, opacity: 0.7 },
      { emoji: '🫧', x: 68, y: 42, size: 24, opacity: 0.7 },
      { emoji: '🌿', x: 10, y: 75, size: 42, opacity: 0.9 },
      { emoji: '🪨', x: 42, y: 80, size: 38, opacity: 0.9 },
      { emoji: '🪨', x: 62, y: 78, size: 36, opacity: 0.9 },
      { emoji: '🪵', x: 82, y: 22, size: 40, opacity: 0.85 },
      { emoji: '🦗', x: 88, y: 48, size: 26, opacity: 0.75 }
    ]
  }
};

var detectiveState = {
  currentSceneKey: 'taman',
  foundTargetIds: [],
  isCompleted: false
};

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openDetectiveStudio() {
  goToScene('detective');
  setMascotSpeech('Halo Detektif Cilik! Ayo gunakan mata jelimu dan cari 3 benda yang bersembunyi! 🔍✨');
  if (typeof speakMascot === 'function') {
    speakMascot('Detektif Cilik! Temukan tiga benda tersembunyi ya!');
  }
  loadDetectiveScene(detectiveState.currentSceneKey);
}

function exitDetectiveToMap() {
  goToScene('map');
}

// ---------------------------------------------------------
// Load and Render Scene
// ---------------------------------------------------------
function loadDetectiveScene(sceneKey) {
  if (!DETECTIVE_SCENES[sceneKey]) {
    sceneKey = 'taman';
  }
  detectiveState.currentSceneKey = sceneKey;
  detectiveState.foundTargetIds = [];
  detectiveState.isCompleted = false;

  renderDetectiveUI();
}

function renderDetectiveUI() {
  var container = document.getElementById('detective-stage-container');
  if (!container) return;

  var scene = DETECTIVE_SCENES[detectiveState.currentSceneKey];
  var total = scene.targets.length;
  var foundCount = detectiveState.foundTargetIds.length;

  var html = '';

  // 1. Scene Switcher Pills
  html += '<div style="display:flex; justify-content:center; gap:8px; margin-bottom:12px; flex-wrap:wrap;">';
  var sceneKeys = ['taman', 'kamar', 'kolam'];
  sceneKeys.forEach(function(key) {
    var sc = DETECTIVE_SCENES[key];
    var isActive = (key === detectiveState.currentSceneKey);
    var bg = isActive ? '#0288D1' : '#FFFFFF';
    var fg = isActive ? '#FFFFFF' : '#0277BD';
    var border = isActive ? '#01579B' : '#B3E5FC';
    html += '<button class="squish-btn" onclick="loadDetectiveScene(\'' + key + '\')" style="padding:7px 14px; border-radius:20px; font-weight:800; font-size:13px; background:' + bg + '; color:' + fg + '; border:2px solid ' + border + '; cursor:pointer; box-shadow:0 3px 6px rgba(0,0,0,0.06);">' + sc.icon + ' ' + sc.title + '</button>';
  });
  html += '</div>';

  // 2. Mission Target Banner & Hint Button
  html += '<div style="background:#FFFFFF; border:2.5px solid #81D4FA; border-radius:18px; padding:10px 16px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 4px 10px rgba(2,136,209,0.08); flex-wrap:wrap; gap:8px;">';
  html += '  <div style="display:flex; align-items:center; gap:10px;">';
  html += '    <div style="width:44px; height:44px; border-radius:14px; background:#E1F5FE; border:2px solid #0288D1; display:flex; align-items:center; justify-content:center; font-size:24px;">' + scene.targetEmoji + '</div>';
  html += '    <div>';
  html += '      <div style="font-size:12px; font-weight:700; color:#546E7A; text-transform:uppercase;">Misi Detektif:</div>';
  html += '      <div style="font-size:15px; font-weight:800; color:#0277BD;">Cari 3 ' + scene.targetName + '</div>';
  html += '    </div>';
  html += '  </div>';
  
  html += '  <div style="display:flex; align-items:center; gap:8px;">';
  html += '    <div style="padding:6px 14px; border-radius:16px; background:#E8F5E9; border:2px solid #66BB6A; font-weight:800; font-size:14px; color:#2E7D32;">';
  html += '      ⭐ <span id="detective-counter">' + foundCount + '</span> / ' + total + ' Ketemu';
  html += '    </div>';
  html += '    <button class="squish-btn" onclick="giveDetectiveHint()" style="padding:6px 12px; border-radius:16px; background:#FFF9C4; border:2px solid #FBC02D; font-weight:800; font-size:13px; color:#E65100; cursor:pointer;">💡 Petunjuk</button>';
  html += '  </div>';
  html += '</div>';

  // 3. Main Observation Arena
  html += '<div id="detective-arena" style="position:relative; width:100%; height:340px; border-radius:24px; background:' + scene.bgGradient + '; border:3px solid #81D4FA; box-shadow:inset 0 4px 12px rgba(0,0,0,0.05), 0 6px 16px rgba(2,136,209,0.12); overflow:hidden; user-select:none; -webkit-user-select:none; touch-action:manipulation;">';

  // Render Background Scenery Decor
  scene.decorations.forEach(function(dec) {
    html += '<div style="position:absolute; left:' + dec.x + '%; top:' + dec.y + '%; font-size:' + dec.size + 'px; opacity:' + dec.opacity + '; transform:translate(-50%, -50%); pointer-events:none; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));">' + dec.emoji + '</div>';
  });

  // Render Hidden Target Items
  scene.targets.forEach(function(tar) {
    var isFound = detectiveState.foundTargetIds.indexOf(tar.id) !== -1;
    var opacity = isFound ? '1.0' : '0.88';
    var borderStyle = isFound ? 'border:3px solid #FFD700; background:rgba(255,255,255,0.95); box-shadow:0 0 16px #FFD700;' : 'background:transparent; border:2px dashed transparent;';
    var transform = isFound ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1.0)';
    var badge = isFound ? '<span style="position:absolute; top:-8px; right:-8px; background:#4CAF50; color:#FFF; font-size:11px; border-radius:50%; width:18px; height:18px; display:flex; align-items:center; justify-content:center; font-weight:800; border:1.5px solid #FFF;">✓</span>' : '';

    html += '<div id="detective-target-' + tar.id + '" class="detective-target ' + (isFound ? 'is-found' : '') + '" onclick="onTapDetectiveTarget(' + tar.id + ')" style="position:absolute; left:' + tar.x + '%; top:' + tar.y + '%; width:54px; height:54px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; cursor:pointer; ' + borderStyle + ' opacity:' + opacity + '; transform:' + transform + '; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">';
    html += scene.targetEmoji + badge;
    html += '</div>';
  });

  // Tap ripple effect layer
  html += '<div id="detective-tap-ripple" style="position:absolute; inset:0; pointer-events:none;"></div>';

  html += '</div>'; // End Arena

  // 4. Bottom Controls & Success Banner (if completed)
  if (detectiveState.isCompleted) {
    html += '<div style="margin-top:14px; background:#E8F5E9; border:2.5px solid #4CAF50; border-radius:20px; padding:14px; text-align:center; animation:popIn 0.4s ease-out;">';
    html += '  <div style="font-size:24px; margin-bottom:4px;">🎉 🔍 🌟</div>';
    html += '  <div style="font-weight:900; font-size:17px; color:#2E7D32;">Luar Biasa! Semua Benda Ditemukan!</div>';
    html += '  <div style="font-size:13px; color:#388E3C; margin-top:3px;">Mata Cetta jeli sekali seperti elang cilik! Dapat +2 Bintang! ⭐⭐</div>';
    html += '  <div style="display:flex; justify-content:center; gap:10px; margin-top:12px;">';
    html += '    <button class="squish-btn" onclick="loadDetectiveScene(\'' + detectiveState.currentSceneKey + '\')" style="padding:8px 18px; border-radius:18px; background:#4CAF50; color:#FFF; font-weight:800; font-size:14px; border:none; cursor:pointer; box-shadow:0 4px 8px rgba(76,175,80,0.3);">Main Lagi 🔄</button>';
    var nextKey = (detectiveState.currentSceneKey === 'taman' ? 'kamar' : (detectiveState.currentSceneKey === 'kamar' ? 'kolam' : 'taman'));
    html += '    <button class="squish-btn" onclick="loadDetectiveScene(\'' + nextKey + '\')" style="padding:8px 18px; border-radius:18px; background:#0288D1; color:#FFF; font-weight:800; font-size:14px; border:none; cursor:pointer; box-shadow:0 4px 8px rgba(2,136,209,0.3);">Lokasi Berikutnya 🚀</button>';
    html += '  </div>';
    html += '</div>';
  } else {
    html += '<div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center;">';
    html += '  <button class="squish-btn" onclick="loadDetectiveScene(\'' + detectiveState.currentSceneKey + '\')" style="padding:8px 16px; border-radius:16px; background:#FFFFFF; color:#546E7A; font-weight:800; font-size:13px; border:2px solid #CFD8DC; cursor:pointer;">Acak Ulang 🔄</button>';
    html += '  <button class="squish-btn" onclick="exitDetectiveToMap()" style="padding:8px 16px; border-radius:16px; background:#FFF3E0; color:#E65100; font-weight:800; font-size:13px; border:2px solid #FFB74D; cursor:pointer;">Pilih Game Lain 🗺️</button>';
    html += '</div>';
  }

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Target Click Handler
// ---------------------------------------------------------
function onTapDetectiveTarget(tarId) {
  if (detectiveState.isCompleted) return;
  if (detectiveState.foundTargetIds.indexOf(tarId) !== -1) return; // already found

  detectiveState.foundTargetIds.push(tarId);

  // Play Sound
  if (typeof playToneChime === 'function') {
    playToneChime();
  }

  var scene = DETECTIVE_SCENES[detectiveState.currentSceneKey];
  var total = scene.targets.length;
  var foundCount = detectiveState.foundTargetIds.length;

  // Mascot Speech Response
  if (foundCount === 1) {
    setMascotSpeech('Wah, hebat! Kamu menemukan satu ' + scene.targetName + '! ' + scene.targetEmoji + '✨');
    if (typeof speakMascot === 'function') speakMascot('Hebat! Kamu menemukan satu!');
  } else if (foundCount === 2) {
    setMascotSpeech('Keren sekali! Tinggal 1 lagi, ayo cari pelan-pelan! 🔍👏');
    if (typeof speakMascot === 'function') speakMascot('Keren! Tinggal satu lagi!');
  } else if (foundCount >= total) {
    detectiveState.isCompleted = true;
    setMascotSpeech('Horeee! Semua ' + scene.targetName + ' berhasil kamu temukan! Detektif hebat! 🥳🎉⭐');
    if (typeof speakMascot === 'function') speakMascot('Horeee! Semua ketemu! Kamu detektif hebat!');
    
    // Fanfare & Confetti
    if (typeof playToneFanfare === 'function') {
      setTimeout(playToneFanfare, 250);
    }
    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
    }
    // Add Score Reward (+2 Stars)
    if (typeof addScore === 'function') {
      addScore(2);
    }
    // Log Activity
    if (typeof saveDailyActivity === 'function') {
      saveDailyActivity('detective', 'Detektif Cilik (' + scene.title + ')');
    }
  }

  renderDetectiveUI();
}

// ---------------------------------------------------------
// Hint System (Encouraging, Never Spoiling Completely)
// ---------------------------------------------------------
function giveDetectiveHint() {
  var scene = DETECTIVE_SCENES[detectiveState.currentSceneKey];
  var unfound = scene.targets.filter(function(t) {
    return detectiveState.foundTargetIds.indexOf(t.id) === -1;
  });

  if (unfound.length === 0) {
    setMascotSpeech('Semua benda sudah kamu temukan, Detektif hebat! 🌟');
    return;
  }

  var targetToHint = unfound[0];
  if (typeof playTonePop === 'function') playTonePop();

  setMascotSpeech('Petunjuk: ' + targetToHint.hint + ' ' + scene.targetEmoji + '🔍');
  if (typeof speakMascot === 'function') {
    speakMascot(targetToHint.hint);
  }

  // Gentle pulse glow on target element for 1.5 seconds
  var el = document.getElementById('detective-target-' + targetToHint.id);
  if (el) {
    el.style.boxShadow = '0 0 20px #FFCA28';
    el.style.transform = 'translate(-50%, -50%) scale(1.25)';
    setTimeout(function() {
      if (detectiveState.foundTargetIds.indexOf(targetToHint.id) === -1) {
        el.style.boxShadow = 'none';
        el.style.transform = 'translate(-50%, -50%) scale(1.0)';
      }
    }, 1500);
  }
}
