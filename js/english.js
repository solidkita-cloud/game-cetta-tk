// =========================================================
// JS/ENGLISH.JS - POJOK HALO ENGLISH (BILINGUAL ID/EN)
// Interactive Flashcards & Dynamic "Where is...?" Game
// =========================================================

var ENGLISH_CATEGORIES = {
  animals: [
    { en: 'Cat', id: 'Kucing', emoji: '🐱' },
    { en: 'Dog', id: 'Anjing', emoji: '🐶' },
    { en: 'Duck', id: 'Bebek', emoji: '🦆' },
    { en: 'Lion', id: 'Singa', emoji: '🦁' },
    { en: 'Elephant', id: 'Gajah', emoji: '🐘' },
    { en: 'Fish', id: 'Ikan', emoji: '🐟' },
    { en: 'Rabbit', id: 'Kelinci', emoji: '🐰' },
    { en: 'Butterfly', id: 'Kupu-kupu', emoji: '🦋' }
  ],
  colors: [
    { en: 'Red', id: 'Merah', emoji: '🔴', hex: '#EF5350' },
    { en: 'Blue', id: 'Biru', emoji: '🔵', hex: '#42A5F5' },
    { en: 'Yellow', id: 'Kuning', emoji: '🟡', hex: '#FDD835' },
    { en: 'Green', id: 'Hijau', emoji: '🟢', hex: '#66BB6A' },
    { en: 'Purple', id: 'Ungu', emoji: '🟣', hex: '#AB47BC' },
    { en: 'Orange', id: 'Jingga', emoji: '🟠', hex: '#FFA726' }
  ],
  fruits: [
    { en: 'Apple', id: 'Apel', emoji: '🍎' },
    { en: 'Banana', id: 'Pisang', emoji: '🍌' },
    { en: 'Orange', id: 'Jeruk', emoji: '🍊' },
    { en: 'Strawberry', id: 'Stroberi', emoji: '🍓' },
    { en: 'Watermelon', id: 'Semangka', emoji: '🍉' }
  ],
  greetings: [
    { en: 'Hello!', id: 'Halo!', emoji: '👋' },
    { en: 'Good Morning!', id: 'Selamat Pagi!', emoji: '🌅' },
    { en: 'Thank You!', id: 'Terima Kasih!', emoji: '🙏' },
    { en: 'Goodbye!', id: 'Sampai Jumpa!', emoji: '🤝' }
  ]
};

var englishState = {
  mode: 'quiz', // 'quiz' or 'cards'
  activeCategory: 'animals',
  currentQuiz: null,
  recentWords: [],
  isProcessing: false
};

function openEnglishStudio() {
  goToScene('english');
  setMascotSpeech("Hello! Welcome to Halo English! Ayo belajar bahasa Inggris bersama Pandi! 🇬🇧✨");
  englishState.recentWords = [];
  if (englishState.mode === 'quiz') {
    generateNewEnglishQuiz();
  } else {
    renderEnglishStage();
    speakEnglish("Tap a card to listen!");
  }
}

function exitEnglishToMap() {
  goToScene('map');
}

function switchEnglishMode(newMode) {
  playTonePop();
  englishState.mode = newMode;
  if (newMode === 'quiz') {
    generateNewEnglishQuiz();
  } else {
    renderEnglishStage();
    speakEnglish("Tap a card to listen!");
  }
}

function switchEnglishCategory(catKey) {
  playTonePop();
  englishState.activeCategory = catKey;
  if (englishState.mode === 'quiz') {
    generateNewEnglishQuiz();
  } else {
    renderEnglishStage();
  }
}

// ---------------------------------------------------------
// Procedural Quiz Generator
// ---------------------------------------------------------
function generateNewEnglishQuiz() {
  englishState.isProcessing = false;
  var items = ENGLISH_CATEGORIES[englishState.activeCategory] || ENGLISH_CATEGORIES.animals;

  // Filter out recent
  var pool = items.filter(function(it) {
    return englishState.recentWords.indexOf(it.en) === -1;
  });
  if (pool.length === 0) {
    englishState.recentWords = [];
    pool = items;
  }

  var target = pool[Math.floor(Math.random() * pool.length)];
  englishState.recentWords.push(target.en);
  if (englishState.recentWords.length > 4) englishState.recentWords.shift();

  // Pick 3 distractors
  var distractors = items.filter(function(it) { return it.en !== target.en; });
  distractors.sort(function() { return Math.random() - 0.5; });
  var chosenDistractors = distractors.slice(0, 3);

  var options = [target].concat(chosenDistractors);
  options.sort(function() { return Math.random() - 0.5; });

  englishState.currentQuiz = {
    target: target,
    options: options
  };

  renderEnglishStage();
}

// ---------------------------------------------------------
// Render Stage UI
// ---------------------------------------------------------
function renderEnglishStage() {
  var container = document.getElementById('english-stage-container');
  if (!container) return;

  var isQuiz = (englishState.mode === 'quiz');

  var html = `
    <!-- Mode Tabs -->
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:10px;">
      <button class="squish-btn english-tab-btn ${isQuiz ? 'tab-active' : ''}" onclick="switchEnglishMode('quiz')">
        🎯 Tebak Kata (Where is...?)
      </button>
      <button class="squish-btn english-tab-btn ${!isQuiz ? 'tab-active' : ''}" onclick="switchEnglishMode('cards')">
        🃏 Kartu Suara (Flashcards)
      </button>
    </div>

    <!-- Category Pills -->
    <div style="display:flex; gap:8px; overflow-x:auto; padding:4px 2px 10px; scrollbar-width:none;">
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 14px; font-weight:800; white-space:nowrap; background:${englishState.activeCategory === 'animals' ? '#3F51B5' : '#FFF'}; color:${englishState.activeCategory === 'animals' ? '#FFF' : '#333'}; border:1.5px solid #3F51B5;" onclick="switchEnglishCategory('animals')">
        🐾 Animals
      </button>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 14px; font-weight:800; white-space:nowrap; background:${englishState.activeCategory === 'colors' ? '#E91E63' : '#FFF'}; color:${englishState.activeCategory === 'colors' ? '#FFF' : '#333'}; border:1.5px solid #E91E63;" onclick="switchEnglishCategory('colors')">
        🎨 Colors
      </button>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 14px; font-weight:800; white-space:nowrap; background:${englishState.activeCategory === 'fruits' ? '#FF9800' : '#FFF'}; color:${englishState.activeCategory === 'fruits' ? '#FFF' : '#333'}; border:1.5px solid #FF9800;" onclick="switchEnglishCategory('fruits')">
        🍎 Fruits
      </button>
      <button class="squish-btn btn-pill" style="font-size:12px; padding:6px 14px; font-weight:800; white-space:nowrap; background:${englishState.activeCategory === 'greetings' ? '#4CAF50' : '#FFF'}; color:${englishState.activeCategory === 'greetings' ? '#FFF' : '#333'}; border:1.5px solid #4CAF50;" onclick="switchEnglishCategory('greetings')">
        👋 Greetings
      </button>
    </div>

    ${isQuiz ? renderQuizViewHtml() : renderFlashcardsViewHtml()}
  `;

  container.innerHTML = html;
  if (isQuiz) speakEnglishPrompt();
}

function renderQuizViewHtml() {
  var q = englishState.currentQuiz;
  if (!q) return '';

  return `
    <!-- Question Prompt Banner -->
    <div style="background:#FFFFFF; border-radius:20px; padding:12px 16px; margin-bottom:14px; box-shadow:0 4px 12px rgba(0,0,0,0.06); border:2.5px solid #90CAF9; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:12px; font-weight:800; color:#1976D2; text-transform:uppercase;">
          Dengarkan Pertanyaan Pandi:
        </div>
        <div style="font-size:18px; font-weight:900; color:#0D47A1; margin-top:2px;">
          "Where is the <u>${q.target.en}</u>?" 🇬🇧
        </div>
        <div style="font-size:12px; color:#558B2F; font-weight:700;">
          (Artinya: Mana ${q.target.id}?) 🇮🇩
        </div>
      </div>
      <button class="squish-btn btn-pill" style="font-size:13px; padding:8px 14px; background:#E3F2FD; color:#1565C0; border:1.5px solid #90CAF9; font-weight:800;" onclick="speakEnglishPrompt()">
        🔊 Suara
      </button>
    </div>

    <!-- 4 Options Cards Grid -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
      ${q.options.map(function(opt) {
        return `
          <div class="squish-btn english-option-card" 
               style="background:#FFFFFF; border-radius:20px; padding:16px 10px; border:2.5px solid #E0E0E0; box-shadow:0 4px 10px rgba(0,0,0,0.05); text-align:center; cursor:pointer;"
               onclick="handleEnglishAnswer(this, '${opt.en}')">
            <div style="font-size:52px; margin-bottom:4px; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.1));">
              ${opt.emoji}
            </div>
            <div style="font-size:18px; font-weight:900; color:#1A237E;">
              ${opt.en}
            </div>
            <div style="font-size:12px; font-weight:700; color:#757575;">
              ${opt.id}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderFlashcardsViewHtml() {
  var items = ENGLISH_CATEGORIES[englishState.activeCategory] || ENGLISH_CATEGORIES.animals;

  return `
    <div style="text-align:center; font-size:13px; font-weight:700; color:#424242; margin-bottom:10px;">
      Sentuh kartu untuk mendengar pengucapan bahasa Inggris & artinya:
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
      ${items.map(function(it) {
        return `
          <div class="squish-btn english-flashcard" 
               style="background:#FFFFFF; border-radius:20px; padding:16px 10px; border:2.5px solid #BBDEFB; box-shadow:0 4px 10px rgba(0,0,0,0.05); text-align:center; cursor:pointer;"
               onclick="tapEnglishFlashcard('${it.en}', '${it.id}')">
            <div style="font-size:48px; margin-bottom:6px;">${it.emoji}</div>
            <div style="font-size:18px; font-weight:900; color:#0D47A1;">${it.en}</div>
            <div style="font-size:13px; font-weight:700; color:#388E3C; margin-top:2px;">${it.id}</div>
            <div style="font-size:11px; color:#1976D2; font-weight:800; margin-top:6px; background:#E3F2FD; border-radius:10px; padding:2px 0;">
              🔊 Sentuh Suara
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function tapEnglishFlashcard(en, id) {
  playTonePop();
  speakEnglish(en, function() {
    speakNatural("artinya " + id);
  });
}

function speakEnglishPrompt() {
  var q = englishState.currentQuiz;
  if (!q) return;
  if (englishState.activeCategory === 'greetings') {
    speakEnglish("Can you find " + q.target.en + "?");
  } else {
    speakEnglish("Where is the " + q.target.en + "?");
  }
}

function handleEnglishAnswer(cardEl, chosenEn) {
  if (englishState.isProcessing) return;
  var q = englishState.currentQuiz;
  if (!q) return;

  var isCorrect = (chosenEn === q.target.en);

  if (isCorrect) {
    englishState.isProcessing = true;
    playToneChime();
    cardEl.style.borderColor = '#4CAF50';
    cardEl.style.background = '#E8F5E9';

    if (typeof addProfileStars === 'function') addProfileStars(1);
    if (typeof addGameStars === 'function') addGameStars(1);

    setMascotSpeech("GREAT JOB! That is " + q.target.en + " (" + q.target.id + ")! You are awesome! 🌟🎉");
    speakEnglish("Awesome! Good job! That is " + q.target.en + "!");

    setTimeout(function() {
      generateNewEnglishQuiz();
    }, 1600);
  } else {
    playToneBoing();
    cardEl.style.borderColor = '#EF5350';
    cardEl.style.background = '#FFEBEE';
    setTimeout(function() {
      cardEl.style.borderColor = '#E0E0E0';
      cardEl.style.background = '#FFFFFF';
    }, 500);

    setMascotSpeech("Let's try again! Coba cari lagi ya sayang! 💪");
    speakEnglish("Try again!");
  }
}
