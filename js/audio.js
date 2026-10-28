// =========================================================
// AUDIO SYNTHESIZER & SPEECH ENGINE (OFFLINE-READY)
// =========================================================

var audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    var AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Pop Sound (Bubbles, Buttons)
function playTonePop() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn("Audio pop error", e);
  }
}

// 2. Chime Sound (Correct Answer / Star)
function playToneChime() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    var notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach(function(freq, idx) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
  } catch (e) {
    console.warn("Audio chime error", e);
  }
}

// 3. Gentle Boing (Try again - warm, never harsh)
function playToneBoing() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("Audio boing error", e);
  }
}

// 4. Train Horn / Whistle
function playToneWhistle() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    var freqs = [392.00, 493.88]; // G4, B4
    freqs.forEach(function(f) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    });
  } catch (e) {
    console.warn("Audio whistle error", e);
  }
}

// 5. Celebration Fanfare (Victory / Level Complete)
function playToneFanfare() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    var chordNotes = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.16 },
      { f: 523.25, d: 0.15, t: 0.32 },
      { f: 659.25, d: 0.45, t: 0.50 },
      { f: 783.99, d: 0.60, t: 0.85 }
    ];
    chordNotes.forEach(function(n) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);
      gain.gain.setValueAtTime(0.35, ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.d);
    });
  } catch (e) {
    console.warn("Audio fanfare error", e);
  }
}

// 6. Munch / Eating Snack
function playToneCrunch() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    for (var i = 0; i < 3; i++) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(200 + i * 80, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.06);
    }
  } catch (e) {
    console.warn("Audio crunch error", e);
  }
}

// 7. Blender Whirring Sound
function playToneJuice() {
  try {
    var ctx = getAudioContext();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(320, ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.9);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.95);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.95);
  } catch (e) {
    console.warn("Audio juice error", e);
  }
}

// 8. Natural Indonesian Speech Synthesis
function speakNatural(text, callback) {
  if (!('speechSynthesis' in window)) {
    if (callback) callback();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'id-ID';
    u.rate = 0.95;  // gentle teacher speed
    u.pitch = 1.15; // friendly, warm tone
    
    var voices = window.speechSynthesis.getVoices();
    var idVoice = voices.find(function(v) {
      return (v.lang.indexOf('id') !== -1 || v.lang.indexOf('ID') !== -1);
    });
    if (idVoice) {
      u.voice = idVoice;
    }
    
    if (callback) {
      u.onend = function() { callback(); };
      u.onerror = function() { callback(); };
    }
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn("TTS Error:", e);
    if (callback) callback();
  }
}

// Initialize speech voices listener
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
  };
}
