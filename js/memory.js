// =========================================================
// JS/MEMORY.JS - KARTU INGATAN AJAIB (MEMORY CARD MATCH)
// Visual Working Memory & Focus Training for Preschoolers
// =========================================================

var MEMORY_THEMES = {
  animals: [
    { name: 'Kucing', emoji: '🐱' },
    { name: 'Panda', emoji: '🐼' },
    { name: 'Kelinci', emoji: '🐰' },
    { name: 'Singa', emoji: '🦁' },
    { name: 'Gajah', emoji: '🐘' },
    { name: 'Kupu-kupu', emoji: '🦋' }
  ],
  fruits: [
    { name: 'Apel', emoji: '🍎' },
    { name: 'Stroberi', emoji: '🍓' },
    { name: 'Pisang', emoji: '🍌' },
    { name: 'Jeruk', emoji: '🍊' },
    { name: 'Semangka', emoji: '🍉' },
    { name: 'Anggur', emoji: '🍇' }
  ],
  vehicles: [
    { name: 'Mobil', emoji: '🚗' },
    { name: 'Pesawat', emoji: '✈️' },
    { name: 'Kereta', emoji: '🚆' },
    { name: 'Bus', emoji: '🚌' },
    { name: 'Roket', emoji: '🚀' },
    { name: 'Kapal', emoji: '🚢' }
  ]
};

var memoryState = {
  theme: 'animals',
  cards: [], // Array of card objects
  flippedIndices: [],
  matchedCount: 0,
  totalPairs: 3, // 3 pairs = 6 cards for preschool ease
  isProcessing: false
};

// ---------------------------------------------------------
// Navigation & Lifecycle
// ---------------------------------------------------------
function openMemoryStudio() {
  goToScene('memory');
  setMascotSpeech("Selamat datang di Kartu Ingatan Ajaib! Cari 2 kartu yang kembar ya! 🎴✨");
  speakNatural("Ayo buka kartu dan cari pasangan yang sama!");
  initMemoryGame(3);
}

function exitMemoryToMap() {
  goToScene('map');
}

function switchMemoryTheme(themeKey) {
  playTonePop();
  memoryState.theme = themeKey;
  initMemoryGame(memoryState.totalPairs);
}

function setMemoryPairCount(count) {
  playTonePop();
  initMemoryGame(count);
}

// ---------------------------------------------------------
// Game Setup & Shuffle
// ---------------------------------------------------------
function initMemoryGame(pairsCount) {
  memoryState.totalPairs = pairsCount || 3;
  memoryState.flippedIndices = [];
  memoryState.matchedCount = 0;
  memoryState.isProcessing = false;

  var pool = (MEMORY_THEMES[memoryState.theme] || MEMORY_THEMES.animals).slice();
  pool.sort(function() { return Math.random() - 0.5; });
  var chosenItems = pool.slice(0, memoryState.totalPairs);

  // Duplicate items to make pairs
  var cardDeck = [];
  chosenItems.forEach(function(item, idx) {
    cardDeck.push({ id: idx, name: item.name, emoji: item.emoji, isFlipped: false, isMatched: false });
    cardDeck.push({ id: idx, name: item.name, emoji: item.emoji, isFlipped: false, isMatched: false });
  });

  // Shuffle deck
  cardDeck.sort(function() { return Math.random() - 0.5; });
  memoryState.cards = cardDeck;

  renderMemoryStage();
}

// ---------------------------------------------------------
// Render Stage UI
// ---------------------------------------------------------
function renderMemoryStage() {
  var container = document.getElementById('memory-stage-container');
  if (!container) return;

  var is6Cards = (memoryState.totalPairs === 3);

  var html = `
    <!-- Top Controls: Theme & Difficulty -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px;">
      <!-- Difficulty (6 or 8 Cards) -->
      <div style="display:flex; gap:6px;">
        <button class="squish-btn btn-pill" 
                style="font-size:11px; padding:6px 12px; font-weight:800; background:${is6Cards ? '#4CAF50' : '#FFF'}; color:${is6Cards ? '#FFF' : '#333'}; border:1.5px solid #4CAF50;"
                onclick="setMemoryPairCount(3)">
          ⭐ Santai (6 Kartu)
        </button>
        <button class="squish-btn btn-pill" 
                style="font-size:11px; padding:6px 12px; font-weight:800; background:${!is6Cards ? '#4CAF50' : '#FFF'}; color:${!is6Cards ? '#FFF' : '#333'}; border:1.5px solid #4CAF50;"
                onclick="setMemoryPairCount(4)">
          🌟 Hebat (8 Kartu)
        </button>
      </div>

      <!-- Theme Selector -->
      <div style="display:flex; gap:4px;">
        <button class="squish-btn btn-pill" style="font-size:12px; padding:4px 8px; background:${memoryState.theme === 'animals' ? '#FF9800' : '#FFF'}; color:${memoryState.theme === 'animals' ? '#FFF' : '#333'}; border:1px solid #FF9800;" onclick="switchMemoryTheme('animals')">🐾</button>
        <button class="squish-btn btn-pill" style="font-size:12px; padding:4px 8px; background:${memoryState.theme === 'fruits' ? '#FF9800' : '#FFF'}; color:${memoryState.theme === 'fruits' ? '#FFF' : '#333'}; border:1px solid #FF9800;" onclick="switchMemoryTheme('fruits')">🍎</button>
        <button class="squish-btn btn-pill" style="font-size:12px; padding:4px 8px; background:${memoryState.theme === 'vehicles' ? '#FF9800' : '#FFF'}; color:${memoryState.theme === 'vehicles' ? '#FFF' : '#333'}; border:1px solid #FF9800;" onclick="switchMemoryTheme('vehicles')">🚗</button>
      </div>
    </div>

    <!-- Match Status Banner -->
    <div style="background:#FFFFFF; border-radius:18px; padding:10px 16px; margin-bottom:12px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border:2.5px solid #A5D6A7; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:11px; font-weight:800; color:#2E7D32; text-transform:uppercase;">
          MISI PASANGAN KEMBAR
        </div>
        <div style="font-size:15px; font-weight:900; color:#1B5E20;">
          ${memoryState.matchedCount === memoryState.totalPairs ? '🎉 Horeee! Semua Pasangan Ditemukan!' : 'Sentuh 2 kartu yang sama ya!'}
        </div>
      </div>
      <div style="font-size:13px; font-weight:900; background:#E8F5E9; color:#2E7D32; padding:4px 12px; border-radius:12px;">
        ⭐ ${memoryState.matchedCount} / ${memoryState.totalPairs} Pasang
      </div>
    </div>

    <!-- Cards Grid (2x3 or 2x4) -->
    <div style="display:grid; grid-template-columns:${is6Cards ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'}; gap:10px; max-width:${is6Cards ? '320px' : '360px'}; margin:0 auto 14px;">
      ${memoryState.cards.map(function(card, idx) {
        var isRevealed = card.isFlipped || card.isMatched;
        return `
          <div id="memory-card-${idx}" 
               class="squish-btn memory-card-tile ${card.isMatched ? 'card-matched' : ''}" 
               style="height:${is6Cards ? '105px' : '90px'}; background:${isRevealed ? '#FFFFFF' : 'linear-gradient(135deg, #81C784, #4CAF50)'}; border-radius:18px; border:3px solid ${card.isMatched ? '#4CAF50' : (isRevealed ? '#81C784' : '#2E7D32')}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:${isRevealed ? 'default' : 'pointer'}; box-shadow:0 4px 10px rgba(0,0,0,0.08); transition:transform 0.25s ease; user-select:none; -webkit-user-select:none;"
               onclick="handleMemoryCardClick(${idx})">
            
            ${isRevealed ? `
              <div style="font-size:${is6Cards ? '42px' : '34px'}; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));" class="anim-squish">
                ${card.emoji}
              </div>
              <div style="font-size:10px; font-weight:800; color:#2E7D32; margin-top:2px;">
                ${card.name}
              </div>
            ` : `
              <div style="font-size:30px; color:#FFF; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                ⭐
              </div>
            `}
          </div>
        `;
      }).join('')}
    </div>

    <!-- Bottom Reset Button -->
    <div style="display:flex; justify-content:center; gap:10px;">
      <button class="squish-btn btn-primary btn-pill" 
              style="font-size:14px; padding:10px 24px; background:#4CAF50;" 
              onclick="initMemoryGame(${memoryState.totalPairs})">
        🔄 Kocok Kartu Baru
      </button>
    </div>
  `;

  container.innerHTML = html;
}

// ---------------------------------------------------------
// Card Flip & Match Logic
// ---------------------------------------------------------
function handleMemoryCardClick(idx) {
  if (memoryState.isProcessing) return;
  var card = memoryState.cards[idx];
  if (!card || card.isFlipped || card.isMatched) return;

  // Flip this card
  card.isFlipped = true;
  playTonePop();
  memoryState.flippedIndices.push(idx);
  renderMemoryStage();

  // If 2 cards flipped, evaluate match
  if (memoryState.flippedIndices.length === 2) {
    memoryState.isProcessing = true;
    var idx1 = memoryState.flippedIndices[0];
    var idx2 = memoryState.flippedIndices[1];
    var card1 = memoryState.cards[idx1];
    var card2 = memoryState.cards[idx2];

    if (card1.id === card2.id) {
      // MATCH!
      playToneChime();
      card1.isMatched = true;
      card2.isMatched = true;
      memoryState.matchedCount++;
      memoryState.flippedIndices = [];
      memoryState.isProcessing = false;

      speakNatural("Kembar! " + card1.name + "!");
      renderMemoryStage();

      // Check if all pairs matched
      if (memoryState.matchedCount === memoryState.totalPairs) {
        triggerMemoryVictory();
      }
    } else {
      // NO MATCH - Flip back gently after small delay
      playToneBoing();
      setTimeout(function() {
        card1.isFlipped = false;
        card2.isFlipped = false;
        memoryState.flippedIndices = [];
        memoryState.isProcessing = false;
        renderMemoryStage();
      }, 900);
    }
  }
}

function triggerMemoryVictory() {
  playToneFanfare();
  if (typeof addProfileStars === 'function') addProfileStars(2);
  if (typeof addGameStars === 'function') addGameStars(2);

  var pName = (window.gameState && window.gameState.playerName) ? window.gameState.playerName : 'Cetta';
  setMascotSpeech("LUAR BIASA " + pName + "! Semua kartu kembar berhasil ditemukan! Ingatanmu hebat sekali! ⭐🎉");
  speakNatural("Luar biasa! Semua kartu kembar berhasil ditemukan!");

  if (typeof triggerConfetti === 'function') triggerConfetti();
}
