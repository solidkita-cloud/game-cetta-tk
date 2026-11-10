// =========================================================
// JS/PARENTAL-GATE.JS - GERBANG ORANG TUA & PRIVASI RAMAH ANAK
// Mencegah anak kecil mengakses pengaturan, reset data,
// atau tautan luar secara tidak sengaja (Kepatuhan COPPA & Skill Game Anak)
// =========================================================

var parentalGateState = {
  pendingCallback: null,
  gateTitle: 'Area Khusus Orang Tua',
  numA: 0,
  numB: 0,
  correctAnswer: 0,
  holdTimer: null,
  holdSeconds: 0
};

// ---------------------------------------------------------
// Trigger Parental Gate
// ---------------------------------------------------------
function requestParentalGate(callback, title) {
  parentalGateState.pendingCallback = callback;
  parentalGateState.gateTitle = title || 'Area Khusus Orang Tua';

  generateParentalChallenge();

  var modal = document.getElementById('modal-parental-gate');
  if (modal) {
    modal.classList.add('modal-active');
    modal.style.display = 'flex';
  }
}

function closeParentalGate() {
  if (typeof playTonePop === 'function') playTonePop();
  var modal = document.getElementById('modal-parental-gate');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
  parentalGateState.pendingCallback = null;
  cancelHoldGate();
}

// Generate random addition suitable for adults / older kids (e.g. 6 + 7)
function generateParentalChallenge() {
  var a = Math.floor(Math.random() * 6) + 4; // 4 to 9
  var b = Math.floor(Math.random() * 6) + 4; // 4 to 9
  parentalGateState.numA = a;
  parentalGateState.numB = b;
  parentalGateState.correctAnswer = a + b;

  var titleEl = document.getElementById('parent-gate-title');
  if (titleEl) titleEl.textContent = parentalGateState.gateTitle;

  var questionEl = document.getElementById('parent-gate-question');
  if (questionEl) {
    questionEl.textContent = a + ' + ' + b + ' = ?';
  }

  // Generate 3 choices (1 correct, 2 distractors)
  var choices = [parentalGateState.correctAnswer];
  var distractor1 = parentalGateState.correctAnswer + (Math.random() > 0.5 ? 2 : -2);
  var distractor2 = parentalGateState.correctAnswer + (Math.random() > 0.5 ? 3 : -3);
  if (distractor1 === distractor2) distractor2 += 1;
  choices.push(distractor1, distractor2);

  // Shuffle choices
  choices.sort(function() { return Math.random() - 0.5; });

  var choicesContainer = document.getElementById('parent-gate-choices');
  if (choicesContainer) {
    choicesContainer.innerHTML = choices.map(function(val) {
      return `
        <button class="squish-btn btn-pill" 
                style="flex:1; min-height:56px; font-size:22px; font-weight:900; background:#FFF; border:2.5px solid #81C784; color:#2E7D32;"
                onclick="submitParentalAnswer(${val})">
          ${val}
        </button>
      `;
    }).join('');
  }

  var errEl = document.getElementById('parent-gate-error');
  if (errEl) errEl.style.display = 'none';
}

function submitParentalAnswer(answer) {
  if (answer === parentalGateState.correctAnswer) {
    if (typeof playToneChime === 'function') playToneChime();
    var cb = parentalGateState.pendingCallback;
    closeParentalGate();
    if (typeof cb === 'function') {
      setTimeout(cb, 120);
    }
  } else {
    if (typeof playToneBoing === 'function') playToneBoing();
    var errEl = document.getElementById('parent-gate-error');
    if (errEl) {
      errEl.style.display = 'block';
      errEl.textContent = 'Jawaban belum tepat. Coba soal baru ya!';
    }
    setTimeout(generateParentalChallenge, 600);
  }
}

// ---------------------------------------------------------
// Alternate Hold-to-Unlock for Parents
// ---------------------------------------------------------
function startHoldGate() {
  parentalGateState.holdSeconds = 0;
  var bar = document.getElementById('parent-gate-hold-bar');
  if (bar) bar.style.width = '0%';

  parentalGateState.holdTimer = setInterval(function() {
    parentalGateState.holdSeconds += 0.1;
    var pct = Math.min(100, Math.round((parentalGateState.holdSeconds / 2.5) * 100));
    if (bar) bar.style.width = pct + '%';

    if (parentalGateState.holdSeconds >= 2.5) {
      clearInterval(parentalGateState.holdTimer);
      if (typeof playToneChime === 'function') playToneChime();
      var cb = parentalGateState.pendingCallback;
      closeParentalGate();
      if (typeof cb === 'function') {
        setTimeout(cb, 100);
      }
    }
  }, 100);
}

function cancelHoldGate() {
  if (parentalGateState.holdTimer) {
    clearInterval(parentalGateState.holdTimer);
    parentalGateState.holdTimer = null;
  }
  var bar = document.getElementById('parent-gate-hold-bar');
  if (bar) bar.style.width = '0%';
}

// ---------------------------------------------------------
// Parental Hub & Privacy Policy Modals
// ---------------------------------------------------------
function openParentalHub() {
  requestParentalGate(function() {
    var modal = document.getElementById('modal-parental-hub');
    if (modal) {
      modal.classList.add('modal-active');
      modal.style.display = 'flex';
    }
  }, 'Ruang Orang Tua & Pengaturan');
}

function closeParentalHub() {
  if (typeof playTonePop === 'function') playTonePop();
  var modal = document.getElementById('modal-parental-hub');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}

function openParentPrivacyModal() {
  if (typeof playTonePop === 'function') playTonePop();
  var modal = document.getElementById('modal-parent-privacy');
  if (modal) {
    modal.classList.add('modal-active');
    modal.style.display = 'flex';
  }
}

function closeParentPrivacyModal() {
  if (typeof playTonePop === 'function') playTonePop();
  var modal = document.getElementById('modal-parent-privacy');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}

// Safe Reset Data for Parents
function confirmResetAllData() {
  requestParentalGate(function() {
    if (confirm("Apakah Ayah/Bunda yakin ingin menghapus seluruh bintang dan kemajuan bermain untuk memulai dari awal?")) {
      try {
        localStorage.clear();
      } catch (e) {}
      alert("Seluruh data bermain telah direset bersih. Aplikasi akan dimuat ulang!");
      window.location.reload();
    }
  }, 'Konfirmasi Hapus Data');
}
