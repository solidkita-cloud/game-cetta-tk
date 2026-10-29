// =========================================================
// TRACING.JS - STUDIO CORETAN CERIA (PRA-MENULIS & GAMBAR)
// Responsive HTML5 Canvas with Particle Sparkles & Guides
// =========================================================

var tracingState = {
  currentLesson: 'hujan', // 'hujan', 'jalan', 'ombak', 'kotak', 'segitiga', 'bintang', 'bebas'
  currentColor: '#FF5252',
  brushSize: 14,
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  startedNearStartPoint: false,
  reachedTarget: false,
  completedLessons: {},
  particles: []
};

var TRACING_LESSONS = {
  hujan: {
    id: 'hujan',
    title: 'Garis Hujan (Tegak)',
    sub: 'Bantu rintik hujan turun ke rumput segar!',
    startIcon: '☁️',
    endIcon: '🌸',
    startPos: { x: 0.5, y: 0.18 },
    endPos: { x: 0.5, y: 0.82 },
    speech: "Tarik garis lurus dari awan turun ke bunga ya sayang! Srrrtt..."
  },
  jalan: {
    id: 'jalan',
    title: 'Jalan Mobil (Datar)',
    sub: 'Antar mobil Pandi pulang ke garasi!',
    startIcon: '🚗',
    endIcon: '🏠',
    startPos: { x: 0.18, y: 0.5 },
    endPos: { x: 0.82, y: 0.5 },
    speech: "Antar mobil meluncur ke rumah! Tarik garis datar dari kiri ke kanan!"
  },
  ombak: {
    id: 'ombak',
    title: 'Ombak Lumba-Lumba (Lengkung)',
    sub: 'Lumba-lumba melompat di atas ombak!',
    startIcon: '🐬',
    endIcon: '🏝️',
    startPos: { x: 0.15, y: 0.5 },
    endPos: { x: 0.85, y: 0.5 },
    speech: "Lompat melengkung seperti lumba-lumba! Ikuti alur ombaknya ya!"
  },
  kotak: {
    id: 'kotak',
    title: 'Kotak Kado (Persegi)',
    sub: 'Ayo buat kotak kado ulang tahun!',
    startIcon: '🎁',
    endIcon: '🎀',
    startPos: { x: 0.25, y: 0.25 },
    endPos: { x: 0.25, y: 0.25 },
    speech: "Tarik garis membuat 4 sudut kotak kado yang rapi!"
  },
  segitiga: {
    id: 'segitiga',
    title: 'Segitiga Pizza / Atap',
    sub: 'Potongan pizza lezat berbentuk segitiga!',
    startIcon: '🍕',
    endIcon: '🔺',
    startPos: { x: 0.5, y: 0.2 },
    endPos: { x: 0.5, y: 0.2 },
    speech: "Satu, dua, tiga... buat 3 sisi segitiga runcing!"
  },
  bintang: {
    id: 'bintang',
    title: 'Bintang Kejora',
    sub: 'Nyalakan bintang terang di langit malam!',
    startIcon: '⭐',
    endIcon: '✨',
    startPos: { x: 0.5, y: 0.18 },
    endPos: { x: 0.5, y: 0.18 },
    speech: "Hebat! Sekarang coba ikuti garis bintang yang bersinar!"
  },
  bebas: {
    id: 'bebas',
    title: 'Kanvas Coret Bebas',
    sub: 'Coret, gambar, dan warnai sesuka hatimu!',
    startIcon: '🎨',
    endIcon: '🌈',
    startPos: null,
    endPos: null,
    speech: "Horeee! Ini kanvas bebasmu. Gambarlah apa saja yang kamu sukai!"
  }
};

var tracingCanvas = null;
var tracingCtx = null;
var guideCanvas = null;
var guideCtx = null;
var animFrameId = null;

function startTracingStudio(lessonKey) {
  if (typeof playTonePop === 'function') playTonePop();
  goToScene('tracing');

  if (lessonKey && TRACING_LESSONS[lessonKey]) {
    tracingState.currentLesson = lessonKey;
  }

  setTimeout(function() {
    initTracingCanvases();
    selectTracingLesson(tracingState.currentLesson, true);
  }, 100);
}

function exitTracingToMap() {
  if (typeof playTonePop === 'function') playTonePop();
  if (animFrameId) cancelAnimationFrame(animFrameId);
  goToScene('map');
}

function initTracingCanvases() {
  tracingCanvas = document.getElementById('tracing-draw-canvas');
  guideCanvas = document.getElementById('tracing-guide-canvas');
  if (!tracingCanvas || !guideCanvas) return;

  var container = document.getElementById('tracing-canvas-box');
  if (!container) return;

  var rect = container.getBoundingClientRect();
  var w = Math.floor(rect.width);
  var h = Math.floor(rect.height);

  var dpr = window.devicePixelRatio || 1;
  tracingCanvas.width = w * dpr;
  tracingCanvas.height = h * dpr;
  guideCanvas.width = w * dpr;
  guideCanvas.height = h * dpr;

  tracingCtx = tracingCanvas.getContext('2d');
  guideCtx = guideCanvas.getContext('2d');

  tracingCtx.scale(dpr, dpr);
  guideCtx.scale(dpr, dpr);

  tracingCanvas.style.width = w + 'px';
  tracingCanvas.style.height = h + 'px';
  guideCanvas.style.width = w + 'px';
  guideCanvas.style.height = h + 'px';

  // Attach pointer events for smooth touchscreen & mouse drawing
  tracingCanvas.onpointerdown = handlePointerDown;
  tracingCanvas.onpointermove = handlePointerMove;
  tracingCanvas.onpointerup = handlePointerUp;
  tracingCanvas.onpointercancel = handlePointerUp;

  startParticleLoop();
}

function selectTracingLesson(lessonKey, skipSound) {
  if (!TRACING_LESSONS[lessonKey]) lessonKey = 'hujan';
  tracingState.currentLesson = lessonKey;
  tracingState.startedNearStartPoint = false;
  tracingState.reachedTarget = false;

  if (!skipSound && typeof playTonePop === 'function') playTonePop();

  // Update tabs highlight
  var tabs = document.querySelectorAll('.tracing-tab-btn');
  tabs.forEach(function(t) {
    if (t.getAttribute('data-lesson') === lessonKey) {
      t.classList.add('tab-active');
    } else {
      t.classList.remove('tab-active');
    }
  });

  // Update Header text
  var info = TRACING_LESSONS[lessonKey];
  var titleEl = document.getElementById('tracing-lesson-title');
  if (titleEl) titleEl.textContent = info.title;
  var subEl = document.getElementById('tracing-lesson-sub');
  if (subEl) subEl.textContent = info.sub;

  // Clear draw canvas & render guide
  clearTracingCanvas(true);
  drawGuidePath();

  if (typeof speakNatural === 'function') {
    speakNatural(info.speech);
  }
}

function drawGuidePath() {
  if (!guideCtx || !guideCanvas) return;
  var w = guideCanvas.clientWidth;
  var h = guideCanvas.clientHeight;
  guideCtx.clearRect(0, 0, w, h);

  var lesson = TRACING_LESSONS[tracingState.currentLesson];
  if (!lesson || !lesson.startPos) return; // Free mode has no guide

  guideCtx.save();
  guideCtx.strokeStyle = 'rgba(100, 150, 220, 0.45)';
  guideCtx.lineWidth = 14;
  guideCtx.lineCap = 'round';
  guideCtx.lineJoin = 'round';
  guideCtx.setLineDash([12, 14]);

  guideCtx.beginPath();

  if (lesson.id === 'hujan') {
    var sx = w * lesson.startPos.x;
    var sy = h * lesson.startPos.y;
    var ex = w * lesson.endPos.x;
    var ey = h * lesson.endPos.y;
    guideCtx.moveTo(sx, sy);
    guideCtx.lineTo(ex, ey);
  } else if (lesson.id === 'jalan') {
    var sx = w * lesson.startPos.x;
    var sy = h * lesson.startPos.y;
    var ex = w * lesson.endPos.x;
    var ey = h * lesson.endPos.y;
    guideCtx.moveTo(sx, sy);
    guideCtx.lineTo(ex, ey);
  } else if (lesson.id === 'ombak') {
    var sx = w * 0.15;
    var sy = h * 0.5;
    guideCtx.moveTo(sx, sy);
    var segs = 3;
    var segW = (w * 0.7) / segs;
    for (var i = 0; i < segs; i++) {
      var cp1x = sx + i * segW + segW * 0.25;
      var cp1y = sy - 45;
      var cp2x = sx + i * segW + segW * 0.75;
      var cp2y = sy + 45;
      var nx = sx + (i + 1) * segW;
      var ny = sy;
      guideCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nx, ny);
    }
  } else if (lesson.id === 'kotak') {
    var size = Math.min(w, h) * 0.55;
    var cx = (w - size) / 2;
    var cy = (h - size) / 2;
    guideCtx.rect(cx, cy, size, size);
  } else if (lesson.id === 'segitiga') {
    var size = Math.min(w, h) * 0.6;
    var cx = w / 2;
    var cy = (h - size) / 2 + 10;
    guideCtx.moveTo(cx, cy);
    guideCtx.lineTo(cx - size * 0.5, cy + size * 0.85);
    guideCtx.lineTo(cx + size * 0.5, cy + size * 0.85);
    guideCtx.closePath();
  } else if (lesson.id === 'bintang') {
    var cx = w / 2;
    var cy = h / 2;
    var rOut = Math.min(w, h) * 0.32;
    var rIn = rOut * 0.45;
    var pts = 5;
    var step = Math.PI / pts;
    var rot = (Math.PI / 2) * 3;
    guideCtx.moveTo(cx, cy - rOut);
    for (var i = 0; i < pts; i++) {
      var x = cx + Math.cos(rot) * rOut;
      var y = cy + Math.sin(rot) * rOut;
      guideCtx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * rIn;
      y = cy + Math.sin(rot) * rIn;
      guideCtx.lineTo(x, y);
      rot += step;
    }
    guideCtx.closePath();
  }

  guideCtx.stroke();
  guideCtx.restore();

  // Draw start and end icons
  drawIconBadge(lesson.startIcon, w * lesson.startPos.x, h * lesson.startPos.y, '#4CAF50');
  if (lesson.id === 'hujan' || lesson.id === 'jalan' || lesson.id === 'ombak') {
    drawIconBadge(lesson.endIcon, w * lesson.endPos.x, h * lesson.endPos.y, '#FF5252');
  }
}

function drawIconBadge(icon, x, y, borderColor) {
  guideCtx.save();
  guideCtx.beginPath();
  guideCtx.arc(x, y, 22, 0, Math.PI * 2);
  guideCtx.fillStyle = '#FFFFFF';
  guideCtx.shadowColor = 'rgba(0,0,0,0.2)';
  guideCtx.shadowBlur = 8;
  guideCtx.fill();
  guideCtx.lineWidth = 3;
  guideCtx.strokeStyle = borderColor;
  guideCtx.stroke();

  guideCtx.font = '22px Arial, sans-serif';
  guideCtx.textAlign = 'center';
  guideCtx.textBaseline = 'middle';
  guideCtx.fillText(icon, x, y + 2);
  guideCtx.restore();
}

function handlePointerDown(e) {
  tracingCanvas.setPointerCapture(e.pointerId);
  var pos = getCanvasPos(e);
  tracingState.isDrawing = true;
  tracingState.lastX = pos.x;
  tracingState.lastY = pos.y;

  // Check start point proximity
  var lesson = TRACING_LESSONS[tracingState.currentLesson];
  if (lesson && lesson.startPos) {
    var sx = guideCanvas.clientWidth * lesson.startPos.x;
    var sy = guideCanvas.clientHeight * lesson.startPos.y;
    var dist = Math.hypot(pos.x - sx, pos.y - sy);
    if (dist < 45) {
      tracingState.startedNearStartPoint = true;
      if (typeof playTonePop === 'function') playTonePop();
    }
  }

  addGlitterParticle(pos.x, pos.y);
}

function handlePointerMove(e) {
  if (!tracingState.isDrawing) return;
  var pos = getCanvasPos(e);

  tracingCtx.save();
  tracingCtx.beginPath();
  tracingCtx.moveTo(tracingState.lastX, tracingState.lastY);
  tracingCtx.lineTo(pos.x, pos.y);
  tracingCtx.lineWidth = tracingState.brushSize;
  tracingCtx.lineCap = 'round';
  tracingCtx.lineJoin = 'round';

  if (tracingState.currentColor === 'rainbow') {
    var hue = (Date.now() / 8) % 360;
    tracingCtx.strokeStyle = 'hsl(' + hue + ', 90%, 55%)';
    tracingCtx.shadowColor = 'hsl(' + hue + ', 90%, 65%)';
    tracingCtx.shadowBlur = 10;
  } else {
    tracingCtx.strokeStyle = tracingState.currentColor;
    tracingCtx.shadowColor = tracingState.currentColor;
    tracingCtx.shadowBlur = 6;
  }
  tracingCtx.stroke();
  tracingCtx.restore();

  tracingState.lastX = pos.x;
  tracingState.lastY = pos.y;

  if (Math.random() < 0.6) {
    addGlitterParticle(pos.x, pos.y);
  }

  // Check end point hit
  var lesson = TRACING_LESSONS[tracingState.currentLesson];
  if (lesson && lesson.endPos && !tracingState.reachedTarget && tracingState.startedNearStartPoint) {
    var ex = guideCanvas.clientWidth * lesson.endPos.x;
    var ey = guideCanvas.clientHeight * lesson.endPos.y;
    var dist = Math.hypot(pos.x - ex, pos.y - ey);
    if (dist < 45) {
      onTracingLessonComplete();
    }
  }
}

function handlePointerUp(e) {
  tracingState.isDrawing = false;
}

function getCanvasPos(e) {
  var rect = tracingCanvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function addGlitterParticle(x, y) {
  var colors = ['#FFEB3B', '#FF80AB', '#00E676', '#00E5FF', '#FF9100'];
  tracingState.particles.push({
    x: x + (Math.random() - 0.5) * 16,
    y: y + (Math.random() - 0.5) * 16,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2 - 1,
    size: 3 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1.0
  });
}

function startParticleLoop() {
  function loop() {
    if (tracingState.particles.length > 0 && tracingCtx) {
      for (var i = tracingState.particles.length - 1; i >= 0; i--) {
        var p = tracingState.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) {
          tracingState.particles.splice(i, 1);
        } else {
          tracingCtx.save();
          tracingCtx.globalAlpha = p.life;
          tracingCtx.fillStyle = p.color;
          tracingCtx.beginPath();
          tracingCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          tracingCtx.fill();
          tracingCtx.restore();
        }
      }
    }
    animFrameId = requestAnimationFrame(loop);
  }
  loop();
}

function onTracingLessonComplete() {
  tracingState.reachedTarget = true;
  if (typeof playToneFanfare === 'function') playToneFanfare();
  if (typeof playToneChime === 'function') playToneChime();
  if (typeof addGameStars === 'function') addGameStars(3);

  var lesson = TRACING_LESSONS[tracingState.currentLesson];
  var msg = "Hebat sekali! " + window.gameState.playerName + " berhasil membuat " + lesson.title + "! Dapat 3 Bintang Emas! ⭐⭐⭐";
  if (typeof speakNatural === 'function') speakNatural(msg);

  // Trigger celebration modal
  var modal = document.getElementById('modal-tracing-finish');
  if (modal) {
    var title = document.getElementById('tracing-finish-title');
    if (title) title.textContent = "HOREEE! " + lesson.title.toUpperCase();
    modal.classList.add('modal-active');
    modal.style.display = 'flex';
  }
}

function selectTracingColor(colorHex, btn) {
  if (typeof playTonePop === 'function') playTonePop();
  tracingState.currentColor = colorHex;
  var colorBtns = document.querySelectorAll('.palette-color-btn');
  colorBtns.forEach(function(b) { b.classList.remove('color-active'); });
  if (btn) btn.classList.add('color-active');
}

function clearTracingCanvas(keepParticles) {
  if (typeof playTonePop === 'function') playTonePop();
  if (!tracingCtx || !tracingCanvas) return;
  tracingCtx.clearRect(0, 0, tracingCanvas.clientWidth, tracingCanvas.clientHeight);
  if (!keepParticles) tracingState.particles = [];
  tracingState.startedNearStartPoint = false;
  tracingState.reachedTarget = false;
}

function nextTracingLesson() {
  closeTracingFinishModal();
  var keys = Object.keys(TRACING_LESSONS);
  var currIdx = keys.indexOf(tracingState.currentLesson);
  var nextIdx = (currIdx + 1) % keys.length;
  selectTracingLesson(keys[nextIdx]);
}

function closeTracingFinishModal() {
  var modal = document.getElementById('modal-tracing-finish');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}
