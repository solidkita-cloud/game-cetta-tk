// =========================================================
// JS/XOX.JS - ARENA XOX CETTA (TIC-TAC-TOE & STRATEGI ANAK)
// Preschool-Friendly Tic-Tac-Toe with Cute Animal/Fruit Tokens,
// Casual Bot Kiko AI, and 2-Player Pass & Play Mode
// =========================================================

var XOX_THEMES = {
  panda: { key: 'panda', p1: '🐼', p2: '🐱', name1: 'Panda', name2: 'Kucing', label: '🐼 vs 🐱' },
  star: { key: 'star', p1: '⭐', p2: '🌙', name1: 'Bintang', name2: 'Bulan', label: '⭐ vs 🌙' },
  fruit: { key: 'fruit', p1: '🍎', p2: '🍊', name1: 'Apel', name2: 'Jeruk', label: '🍎 vs 🍊' },
  classic: { key: 'classic', p1: '❌', p2: '⭕', name1: 'Silang', name2: 'Lingkaran', label: '❌ vs ⭕' }
};

var WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

var xoxState = {
  board: [null, null, null, null, null, null, null, null, null],
  turn: 'P1', // 'P1' or 'P2' (or Bot)
  mode: 'bot', // 'bot' (vs Bot Kiko) or 'pvp' (2 Pemain 1 Layar)
  theme: 'panda',
  winner: null, // 'P1', 'P2', 'draw', or null
  winLine: null,
  isBotThinking: false,
  score: { p1: 0, p2: 0, draw: 0 }
};

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openXoxStudio() {
  goToScene('xox');
  setMascotSpeech("Selamat datang di Arena XOX Cetta! Sambungkan 3 kotak lurus untuk menang! ⭕❌✨");
  speakNatural("Selamat datang di Arena X-O-X Cetta! Ayo sambungkan 3 kotak lurus!");
  resetXoxBoard(true);
}

function exitXoxToMap() {
  goToScene('map');
}

function switchXoxMode(mode) {
  playTonePop();
  xoxState.mode = mode;
  xoxState.score = { p1: 0, p2: 0, draw: 0 };
  resetXoxBoard(false);
}

function switchXoxTheme(themeKey) {
  playTonePop();
  xoxState.theme = themeKey;
  renderXoxStage();
}

function resetXoxBoard(fullReset) {
  xoxState.board = [null, null, null, null, null, null, null, null, null];
  xoxState.turn = 'P1';
  xoxState.winner = null;
  xoxState.winLine = null;
  xoxState.isBotThinking = false;
  if (fullReset) {
    xoxState.score = { p1: 0, p2: 0, draw: 0 };
  }
  renderXoxStage();
}

// ---------------------------------------------------------
// Render Stage UI
// ---------------------------------------------------------
function renderXoxStage() {
  var container = document.getElementById('xox-stage-container');
  if (!container) return;

  var th = XOX_THEMES[xoxState.theme] || XOX_THEMES.panda;
  var isBot = (xoxState.mode === 'bot');
  var p1Name = (window.gameState && window.gameState.playerName) ? window.gameState.playerName : 'Cetta';
  var p2Name = isBot ? 'Bot Kiko' : 'Teman / Bunda';

  var statusText = '';
  var statusColor = '#37474F';
  if (xoxState.winner === 'P1') {
    statusText = `🎉 ${p1Name} (${th.p1}) Menang! Hebat!`;
    statusColor = '#2E7D32';
  } else if (xoxState.winner === 'P2') {
    statusText = `🤖 ${p2Name} (${th.p2}) Menang! Ayo balas!`;
    statusColor = '#C2185B';
  } else if (xoxState.winner === 'draw') {
    statusText = `🤝 Seri! Sama-sama pintar!`;
    statusColor = '#E65100';
  } else if (xoxState.isBotThinking) {
    statusText = `🤖 Bot Kiko sedang berpikir...`;
    statusColor = '#1565C0';
  } else {
    var activeName = (xoxState.turn === 'P1') ? p1Name : p2Name;
    var activeToken = (xoxState.turn === 'P1') ? th.p1 : th.p2;
    statusText = `Giliran: ${activeName} (${activeToken})`;
    statusColor = (xoxState.turn === 'P1') ? '#E65100' : '#1565C0';
  }

  var html = `
    <!-- Mode & Theme Selection Bar -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px;">
      <!-- Mode Tabs -->
      <div style="display:flex; gap:6px;">
        <button class="squish-btn xox-mode-btn ${isBot ? 'mode-active' : ''}" onclick="switchXoxMode('bot')">
          🤖 vs Bot Kiko
        </button>
        <button class="squish-btn xox-mode-btn ${!isBot ? 'mode-active' : ''}" onclick="switchXoxMode('pvp')">
          👥 2 Pemain (1 HP)
        </button>
      </div>

      <!-- Theme Selector Dropdown/Pills -->
      <div style="display:flex; gap:4px;">
        ${Object.keys(XOX_THEMES).map(function(k) {
          var t = XOX_THEMES[k];
          var isSel = (xoxState.theme === k);
          return `
            <button class="squish-btn btn-pill" 
                    style="font-size:11px; padding:4px 8px; font-weight:800; background:${isSel ? '#FF9800' : '#FFF'}; color:${isSel ? '#FFF' : '#424242'}; border:1px solid ${isSel ? '#E65100' : '#E0E0E0'};"
                    onclick="switchXoxTheme('${k}')" title="${t.label}">
              ${t.p1}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Match Status & Turn Banner -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 14px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2.5px solid #FFE082; display:flex; align-items:center; justify-content:space-between;">
      <div style="text-align:left;">
        <div style="font-size:11px; font-weight:800; color:#F57C00; text-transform:uppercase; letter-spacing:0.5px;">
          ARENA PERTANDINGAN
        </div>
        <div id="xox-status-msg" style="font-size:16px; font-weight:900; color:${statusColor}; margin-top:2px;">
          ${statusText}
        </div>
      </div>
      <!-- Score Pill -->
      <div style="font-size:12px; font-weight:900; background:#FFF3E0; color:#E65100; padding:6px 10px; border-radius:12px; border:1px solid #FFE082; white-space:nowrap;">
        ${th.p1} ${xoxState.score.p1} : ${xoxState.score.p2} ${th.p2}
      </div>
    </div>

    <!-- 3x3 Tic-Tac-Toe Board Container -->
    <div style="background:linear-gradient(180deg, #FFE082, #FFCA28); border-radius:26px; padding:12px; border:4px solid #FFA000; box-shadow:0 8px 24px rgba(0,0,0,0.12); width:280px; height:280px; margin:0 auto 12px; display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:repeat(3, 1fr); gap:8px; position:relative; box-sizing:border-box;">
      ${xoxState.board.map(function(val, idx) {
        var isWinCell = (xoxState.winLine && xoxState.winLine.indexOf(idx) !== -1);
        var tokenSymbol = val ? (val === 'P1' ? th.p1 : th.p2) : '';
        return `
          <div id="xox-cell-${idx}" 
               class="squish-btn xox-cell ${isWinCell ? 'xox-cell-win' : ''}" 
               style="background:#FFFFFF; border-radius:16px; border:2.5px solid ${isWinCell ? '#4CAF50' : '#E0E0E0'}; display:flex; align-items:center; justify-content:center; font-size:44px; cursor:${(!val && !xoxState.winner && !xoxState.isBotThinking) ? 'pointer' : 'default'}; box-shadow:0 4px 6px rgba(0,0,0,0.06); user-select:none; -webkit-user-select:none; touch-action:manipulation;"
               onclick="handleXoxCellClick(${idx})">
            ${tokenSymbol}
          </div>
        `;
      }).join('')}
    </div>

    <!-- Bottom Controls & Reset -->
    <div style="display:flex; justify-content:center; gap:10px;">
      <button class="squish-btn btn-primary btn-pill" 
              style="font-size:14px; padding:10px 24px; background:#FF9800;" 
              onclick="resetXoxBoard(false)">
        🔄 Main Ulang
      </button>
    </div>
  `;

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Player Move Interaction
// ---------------------------------------------------------
function handleXoxCellClick(idx) {
  // Ignore if cell occupied, game ended, or bot is thinking
  if (xoxState.board[idx] || xoxState.winner || xoxState.isBotThinking) return;

  var th = XOX_THEMES[xoxState.theme] || XOX_THEMES.panda;
  var isBot = (xoxState.mode === 'bot');

  // Make move
  xoxState.board[idx] = xoxState.turn;
  playTonePop();

  // Check game outcome
  var winResult = checkBoardWinner(xoxState.board);
  if (winResult) {
    finishXoxGame(winResult);
    return;
  }

  // Check draw
  if (xoxState.board.every(Boolean)) {
    finishXoxGame({ winner: 'draw', line: null });
    return;
  }

  // Switch turn
  if (isBot) {
    // Switch to Bot Kiko
    xoxState.turn = 'P2';
    xoxState.isBotThinking = true;
    renderXoxStage();

    // Bot takes move after friendly preschool delay (450ms)
    setTimeout(function() {
      botMakeMove();
    }, 450);
  } else {
    // 2-Player Pass and Play
    xoxState.turn = (xoxState.turn === 'P1') ? 'P2' : 'P1';
    renderXoxStage();
  }
}

// ---------------------------------------------------------
// Casual Friendly Bot AI (60% Smart, 40% Friendly Casual)
// ---------------------------------------------------------
function botMakeMove() {
  if (xoxState.winner || !xoxState.isBotThinking) return;

  var board = xoxState.board;
  var available = [];
  for (var i = 0; i < 9; i++) {
    if (!board[i]) available.push(i);
  }

  if (available.length === 0) {
    xoxState.isBotThinking = false;
    renderXoxStage();
    return;
  }

  var chosenMove = null;

  // 1. Can bot win in 1 move? Always take winning move!
  for (var w = 0; w < WIN_COMBOS.length; w++) {
    var combo = WIN_COMBOS[w];
    var bVals = combo.map(function(idx) { return board[idx]; });
    var p2Count = bVals.filter(function(v) { return v === 'P2'; }).length;
    var emptyCount = bVals.filter(function(v) { return v === null; }).length;
    if (p2Count === 2 && emptyCount === 1) {
      chosenMove = combo[bVals.indexOf(null)];
      break;
    }
  }

  // 2. Can player win in 1 move? Block with 60% probability (leave 40% opening for kid!)
  if (chosenMove === null && Math.random() < 0.6) {
    for (var b = 0; b < WIN_COMBOS.length; b++) {
      var c = WIN_COMBOS[b];
      var vals = c.map(function(idx) { return board[idx]; });
      var p1Count = vals.filter(function(v) { return v === 'P1'; }).length;
      var nullCount = vals.filter(function(v) { return v === null; }).length;
      if (p1Count === 2 && nullCount === 1) {
        chosenMove = c[vals.indexOf(null)];
        break;
      }
    }
  }

  // 3. Take center cell if available (50% chance)
  if (chosenMove === null && board[4] === null && Math.random() < 0.5) {
    chosenMove = 4;
  }

  // 4. Otherwise pick any random available cell
  if (chosenMove === null) {
    chosenMove = available[Math.floor(Math.random() * available.length)];
  }

  // Place bot token
  board[chosenMove] = 'P2';
  playTonePop();
  xoxState.isBotThinking = false;

  // Check outcome
  var winResult = checkBoardWinner(board);
  if (winResult) {
    finishXoxGame(winResult);
    return;
  }

  if (board.every(Boolean)) {
    finishXoxGame({ winner: 'draw', line: null });
    return;
  }

  // Switch turn back to Player 1
  xoxState.turn = 'P1';
  renderXoxStage();
}

// ---------------------------------------------------------
// Board Winner Evaluator
// ---------------------------------------------------------
function checkBoardWinner(b) {
  for (var i = 0; i < WIN_COMBOS.length; i++) {
    var combo = WIN_COMBOS[i];
    var x = combo[0], y = combo[1], z = combo[2];
    if (b[x] && b[x] === b[y] && b[x] === b[z]) {
      return { winner: b[x], line: combo };
    }
  }
  return null;
}

// ---------------------------------------------------------
// Game Finish Celebrations
// ---------------------------------------------------------
function finishXoxGame(result) {
  xoxState.winner = result.winner;
  xoxState.winLine = result.line;
  xoxState.isBotThinking = false;

  var th = XOX_THEMES[xoxState.theme] || XOX_THEMES.panda;
  var isBot = (xoxState.mode === 'bot');
  var p1Name = (window.gameState && window.gameState.playerName) ? window.gameState.playerName : 'Cetta';

  if (result.winner === 'P1') {
    xoxState.score.p1++;
    playToneFanfare();

    if (typeof addProfileStars === 'function') addProfileStars(2);
    if (typeof addGameStars === 'function') addGameStars(2);

    setMascotSpeech("HOREEE! " + p1Name + " berhasil menyambung 3 " + th.p1 + " dan MENANG! Dapat +2 Bintang! 🏆⭐🎉");
    speakNatural("Horee! Kamu menang! Hebat sekali!");

    if (typeof triggerConfetti === 'function') triggerConfetti();
  } else if (result.winner === 'P2') {
    xoxState.score.p2++;
    playToneBoing();
    var p2Name = isBot ? 'Bot Kiko' : 'Pemain 2';
    setMascotSpeech(p2Name + " berhasil menyambung 3 " + th.p2 + "! Ayo main lagi pasti bisa menang! 💪✨");
    speakNatural(p2Name + " menang! Ayo kita coba lagi ya!");
  } else {
    xoxState.score.draw++;
    playToneChime();
    setMascotSpeech("Permainan imbang seri! Kedua pemain sama-sama pintar mengatur strategi! 🤝✨");
    speakNatural("Permainan imbang seri! Sama-sama pintar!");
  }

  renderXoxStage();
}
