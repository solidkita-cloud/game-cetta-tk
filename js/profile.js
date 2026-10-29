// =========================================================
// PROFILE.JS - SISTEM LOGIN & RAPOR PROGRES ANAK (TANPA PASSWORD)
// Menyimpan Profil Anak, Bintang, Lencana & Riwayat Belajar
// =========================================================

var DEFAULT_PROFILES = [
  {
    id: 'cetta_main',
    name: 'Cetta',
    avatar: '🐼',
    ageGroup: 'TK-A (4-5 Tahun)',
    stars: 18,
    badges: ['⭐ Bintang Rajin', '🌧️ Penjaga Alam', '✍️ Seniman Cilik'],
    completedStages: { huruf: 1, hitung: 1, warna: 1, kendaraan: 1 },
    storiesRead: { kiko: true },
    tracingDone: { hujan: true }
  }
];

var profileState = {
  activeProfileId: 'cetta_main',
  profiles: []
};

function initProfileSystem() {
  try {
    var saved = localStorage.getItem('cetta_child_profiles_v2');
    if (saved) {
      profileState.profiles = JSON.parse(saved);
    } else {
      profileState.profiles = JSON.parse(JSON.stringify(DEFAULT_PROFILES));
      saveProfilesToStorage();
    }
  } catch (e) {
    profileState.profiles = JSON.parse(JSON.stringify(DEFAULT_PROFILES));
  }

  var savedActive = localStorage.getItem('cetta_active_profile_id');
  if (savedActive && profileState.profiles.find(function(p) { return p.id === savedActive; })) {
    profileState.activeProfileId = savedActive;
  } else if (profileState.profiles.length > 0) {
    profileState.activeProfileId = profileState.profiles[0].id;
  }

  updateProfileHUD();
}

function saveProfilesToStorage() {
  try {
    localStorage.setItem('cetta_child_profiles_v2', JSON.stringify(profileState.profiles));
    localStorage.setItem('cetta_active_profile_id', profileState.activeProfileId);
  } catch (e) {
    console.warn("Storage error:", e);
  }
}

function getActiveProfile() {
  var p = profileState.profiles.find(function(item) { return item.id === profileState.activeProfileId; });
  if (!p) {
    p = profileState.profiles[0] || DEFAULT_PROFILES[0];
  }
  return p;
}

function updateProfileHUD() {
  var p = getActiveProfile();
  if (!p) return;

  // Sync with global window.gameState
  if (window.gameState) {
    window.gameState.playerName = p.name;
    window.gameState.stars = p.stars;
  }

  // Update DOM elements on Title & Map
  var nameTags = document.querySelectorAll('.player-name-text');
  nameTags.forEach(function(el) { el.textContent = p.name; });

  var starTags = document.querySelectorAll('#hud-star-count, .hud-stars-clone');
  starTags.forEach(function(el) { el.textContent = p.stars; });

  var avatarTags = document.querySelectorAll('.player-avatar-hud');
  avatarTags.forEach(function(el) { el.textContent = p.avatar; });

  var profileBtn = document.getElementById('btn-profile-card-map');
  if (profileBtn) {
    profileBtn.innerHTML = `
      <span style="font-size:22px;">${p.avatar}</span>
      <div style="text-align:left; line-height:1.1;">
        <div style="font-size:13px; font-weight:800; color:#2E7D32;">${p.name}</div>
        <div style="font-size:10px; color:#558B2F;">⭐ ${p.stars} Bintang</div>
      </div>
    `;
  }
}

// Open Progress Card Modal (Rapor Cetta)
function openProfileProgressModal() {
  if (typeof playTonePop === 'function') playTonePop();
  var p = getActiveProfile();
  var modal = document.getElementById('modal-profile-report');
  if (!modal) return;

  var avatarBig = document.getElementById('report-avatar-big');
  if (avatarBig) avatarBig.textContent = p.avatar;

  var nameBig = document.getElementById('report-name-big');
  if (nameBig) nameBig.textContent = p.name;

  var ageTag = document.getElementById('report-age-tag');
  if (ageTag) ageTag.textContent = p.ageGroup || 'Anak Hebat TK';

  var starsBig = document.getElementById('report-stars-count');
  if (starsBig) starsBig.textContent = p.stars;

  // Badges
  var badgesBox = document.getElementById('report-badges-list');
  if (badgesBox) {
    badgesBox.innerHTML = (p.badges || []).map(function(b) {
      return `<span style="background:#FFF9C4; color:#F57F17; font-size:12px; font-weight:800; padding:6px 12px; border-radius:14px; border:1px solid #FFE082;">${b}</span>`;
    }).join('');
  }

  // Sibling Profile Switcher buttons
  var switchBox = document.getElementById('report-siblings-list');
  if (switchBox) {
    switchBox.innerHTML = profileState.profiles.map(function(item) {
      var isActive = (item.id === p.id);
      return `
        <button class="squish-btn" style="padding:6px 12px; border-radius:14px; border:${isActive ? '2px solid #2E7D32' : '1px solid #CCC'}; background:${isActive ? '#E8F5E9' : '#FFF'}; font-size:13px; font-weight:700; cursor:pointer;" onclick="switchActiveProfile('${item.id}')">
          ${item.avatar} ${item.name} ${isActive ? '✅' : ''}
        </button>
      `;
    }).join('') + `
      <button class="squish-btn" style="padding:6px 12px; border-radius:14px; border:1px dashed #4CAF50; background:#F1F8E9; color:#2E7D32; font-size:13px; font-weight:800; cursor:pointer;" onclick="openNewProfileForm()">
        ➕ Tambah Anak
      </button>
    `;
  }

  modal.classList.add('modal-active');
  modal.style.display = 'flex';

  if (typeof speakNatural === 'function') {
    speakNatural("Ini adalah kartu rapor prestasi belajar " + p.name + "! Bintangmu sudah ada " + p.stars + "!");
  }
}

function closeProfileProgressModal() {
  if (typeof playTonePop === 'function') playTonePop();
  var modal = document.getElementById('modal-profile-report');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}

function switchActiveProfile(profileId) {
  if (typeof playTonePop === 'function') playTonePop();
  profileState.activeProfileId = profileId;
  saveProfilesToStorage();
  updateProfileHUD();
  openProfileProgressModal(); // re-render modal with new profile data
}

// Edit Form Modal
function openEditProfileForm() {
  if (typeof playTonePop === 'function') playTonePop();
  closeProfileProgressModal();

  var p = getActiveProfile();
  var modal = document.getElementById('modal-edit-profile');
  if (!modal) return;

  var nameInput = document.getElementById('edit-profile-name-input');
  if (nameInput) nameInput.value = p.name;

  var ageSelect = document.getElementById('edit-profile-age-select');
  if (ageSelect) ageSelect.value = p.ageGroup || 'TK-A (4-5 Tahun)';

  window._tempSelectedAvatar = p.avatar;
  highlightAvatarOption(p.avatar);

  modal.classList.add('modal-active');
  modal.style.display = 'flex';
}

function openNewProfileForm() {
  if (typeof playTonePop === 'function') playTonePop();
  closeProfileProgressModal();

  var modal = document.getElementById('modal-edit-profile');
  if (!modal) return;

  var nameInput = document.getElementById('edit-profile-name-input');
  if (nameInput) nameInput.value = '';

  window._isCreatingNewProfile = true;
  window._tempSelectedAvatar = '🐱';
  highlightAvatarOption('🐱');

  modal.classList.add('modal-active');
  modal.style.display = 'flex';
}

function selectAvatarOption(avatar) {
  if (typeof playTonePop === 'function') playTonePop();
  window._tempSelectedAvatar = avatar;
  highlightAvatarOption(avatar);
}

function highlightAvatarOption(avatar) {
  var btns = document.querySelectorAll('.avatar-option-btn');
  btns.forEach(function(b) {
    if (b.getAttribute('data-avatar') === avatar) {
      b.style.borderColor = '#2E7D32';
      b.style.background = '#E8F5E9';
      b.style.transform = 'scale(1.18)';
    } else {
      b.style.borderColor = '#E0E0E0';
      b.style.background = '#FFF';
      b.style.transform = 'scale(1)';
    }
  });
}

function saveProfileFormData() {
  if (typeof playTonePop === 'function') playTonePop();
  var nameInput = document.getElementById('edit-profile-name-input');
  var name = (nameInput ? nameInput.value.trim() : '') || 'Cetta';
  var ageSelect = document.getElementById('edit-profile-age-select');
  var ageGroup = ageSelect ? ageSelect.value : 'TK-A (4-5 Tahun)';
  var avatar = window._tempSelectedAvatar || '🐼';

  if (window._isCreatingNewProfile) {
    var newId = 'child_' + Date.now();
    var newProfile = {
      id: newId,
      name: name,
      avatar: avatar,
      ageGroup: ageGroup,
      stars: 5, // Welcome bonus stars!
      badges: ['⭐ Bintang Pertama'],
      completedStages: {},
      storiesRead: {},
      tracingDone: {}
    };
    profileState.profiles.push(newProfile);
    profileState.activeProfileId = newId;
    window._isCreatingNewProfile = false;
  } else {
    var p = getActiveProfile();
    p.name = name;
    p.avatar = avatar;
    p.ageGroup = ageGroup;
  }

  saveProfilesToStorage();
  updateProfileHUD();
  closeEditProfileForm();

  if (typeof speakNatural === 'function') {
    speakNatural("Profil berhasil disimpan! Halo " + name + "!");
  }
}

function closeEditProfileForm() {
  window._isCreatingNewProfile = false;
  var modal = document.getElementById('modal-edit-profile');
  if (modal) {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
  }
}

// Award Stars Globally & Persist to Profile
function addProfileStars(count) {
  var p = getActiveProfile();
  p.stars = (p.stars || 0) + count;
  saveProfilesToStorage();
  updateProfileHUD();
}

// Auto Initialize when document loads
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfileSystem);
  } else {
    initProfileSystem();
  }
}
