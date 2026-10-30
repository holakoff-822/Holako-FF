/**
 * Gaming Nickname Decorator - Main Application Logic
 */

// Application State
const state = {
  currentInput: "محارب",
  activeTab: "all",
  favorites: JSON.parse(localStorage.getItem("gaming_favorites") || "[]"),
  soundEnabled: true
};

// Subtle Web Audio Synth for Gamer sound effects (no external MP3 needed!)
const audioCtx = (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined')
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playSound(type = 'click') {
  if (!state.soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'copy') {
      // Victory/Laser beep
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    }
  } catch (e) {
    // Ignore audio permission or browser block
  }
}

// DOM Elements
let elements = {};

function initElements() {
  elements = {
    nameInput: document.getElementById("nameInput"),
    clearBtn: document.getElementById("clearBtn"),
    randomBtn: document.getElementById("randomBtn"),
    charCount: document.getElementById("charCount"),
    pubgLimitBadge: document.getElementById("pubgLimitBadge"),
    ffLimitBadge: document.getElementById("ffLimitBadge"),
    resultsGrid: document.getElementById("resultsGrid"),
    emptyState: document.getElementById("emptyState"),
    tabs: document.querySelectorAll(".filter-tab"),
    copyInvisibleBtn: document.getElementById("copyInvisibleBtn"),
    symbolsContainer: document.getElementById("symbolsContainer"),
    symbolsCategorySelect: document.getElementById("symbolsCategorySelect"),
    toast: document.getElementById("toast"),
    toastMessage: document.getElementById("toastMessage"),
    soundToggle: document.getElementById("soundToggle")
  };
}

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initElements();
  initEventListeners();
  initAmbientCanvas();
  renderSymbols();
  updateResults();
});

// Ambient Cyber Particles Animation Engine
function initAmbientCanvas() {
  const canvas = document.getElementById("ambientCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 32), 55);
  const colors = ["#00f5d4", "#a855f7", "#ffd166", "#3b82f6"];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(0, 245, 212, 0.15)";
          ctx.globalAlpha = (1 - dist / 110) * 0.25;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Event Listeners
function initEventListeners() {
  // Input changes
  elements.nameInput.addEventListener("input", (e) => {
    state.currentInput = e.target.value;
    updateResults();
  });

  // Clear button
  elements.clearBtn.addEventListener("click", () => {
    elements.nameInput.value = "";
    state.currentInput = "";
    elements.nameInput.focus();
    playSound('click');
    updateResults();
  });

  // Random name generator
  elements.randomBtn.addEventListener("click", () => {
    playSound('click');
    const pickLanguage = Math.random() > 0.5 ? 'ar' : 'en';
    const list = RANDOM_NAMES[pickLanguage];
    const picked = list[Math.floor(Math.random() * list.length)];
    elements.nameInput.value = picked;
    state.currentInput = picked;
    
    // Animate input briefly
    elements.nameInput.classList.add("pulse-glow");
    setTimeout(() => elements.nameInput.classList.remove("pulse-glow"), 500);

    updateResults();
  });

  // Filter tabs
  elements.tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      elements.tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.activeTab = tab.dataset.tab;
      playSound('click');
      renderCurrentTab();
    });
  });

  // Invisible Space Button
  elements.copyInvisibleBtn.addEventListener("click", () => {
    copyTextToClipboard(INVISIBLE_SPACES.hangulFiller, "تم نسخ المسافة المخفية (Hangul Filler) بنجاح!");
  });

  // Sound toggle button
  if (elements.soundToggle) {
    elements.soundToggle.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      elements.soundToggle.classList.toggle("muted", !state.soundEnabled);
      elements.soundToggle.title = state.soundEnabled ? "كتم المؤثرات الصوتية" : "تشغيل المؤثرات الصوتية";
      showToast(state.soundEnabled ? "🔊 تم تشغيل المؤثرات الصوتية" : "🔇 تم كتم الصوت");
    });
  }

  // Symbols Category Select Change
  if (elements.symbolsCategorySelect) {
    elements.symbolsCategorySelect.addEventListener("change", (e) => {
      renderSymbols(e.target.value);
    });
  }
}

// Update the generated results and limits
function updateResults() {
  const text = state.currentInput;
  const len = text.length;

  // Update counter
  elements.charCount.textContent = `${len} حرف`;
  
  // Game limits indicators
  if (elements.pubgLimitBadge) {
    if (len === 0) {
      elements.pubgLimitBadge.className = "limit-badge neutral";
      elements.pubgLimitBadge.textContent = "ببجي (14)";
    } else if (len <= 14) {
      elements.pubgLimitBadge.className = "limit-badge success";
      elements.pubgLimitBadge.textContent = "ببجي: متاح ✓";
    } else {
      elements.pubgLimitBadge.className = "limit-badge warning";
      elements.pubgLimitBadge.textContent = "ببجي: طويل ⚠";
    }
  }

  if (elements.ffLimitBadge) {
    if (len === 0) {
      elements.ffLimitBadge.className = "limit-badge neutral";
      elements.ffLimitBadge.textContent = "فري فاير (12)";
    } else if (len <= 12) {
      elements.ffLimitBadge.className = "limit-badge success";
      elements.ffLimitBadge.textContent = "فري فاير: متاح ✓";
    } else {
      elements.ffLimitBadge.className = "limit-badge warning";
      elements.ffLimitBadge.textContent = "فري فاير: طويل ⚠";
    }
  }

  renderCurrentTab();
}

// Filter and render list
function renderCurrentTab() {
  elements.resultsGrid.innerHTML = "";

  if (state.activeTab === "favorites") {
    renderFavorites();
    return;
  }

  if (!state.currentInput.trim()) {
    elements.emptyState.style.display = "block";
    return;
  }

  elements.emptyState.style.display = "none";

  const allDecorations = generateDecorations(state.currentInput);
  
  // Filter by active tab
  let filtered = allDecorations;
  if (state.activeTab !== "all") {
    filtered = allDecorations.filter(item => item.tag === state.activeTab);
  }

  if (filtered.length === 0) {
    elements.resultsGrid.innerHTML = `
      <div class="no-results">
        <p>لا توجد زخارف في هذا التصنيف لهذا النص. جرّب كتابة نص باللغة الإنجليزية أو العربية، أو اختر تصنيف "الكل".</p>
      </div>
    `;
    return;
  }

  filtered.forEach((item, index) => {
    const card = createCard(item.text, item.title, item.badge, index);
    elements.resultsGrid.appendChild(card);
  });
}

// Render user favorites
function renderFavorites() {
  if (state.favorites.length === 0) {
    elements.resultsGrid.innerHTML = `
      <div class="no-results">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">⭐</div>
        <p>لم تقم بإضافة أي اسم للمفضلة بعد.</p>
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 0.5rem;">انقر على أيقونة النجمة بجانب أي اسم مزخرف لحفظه هنا!</p>
      </div>
    `;
    return;
  }

  state.favorites.forEach((text, index) => {
    const card = createCard(text, "اسم محفوظ في المفضلة", "⭐ مفضلة", index, true);
    elements.resultsGrid.appendChild(card);
  });
}

// Card DOM Factory
function createCard(text, title, badgeText, index, isFromFavorites = false) {
  const card = document.createElement("div");
  card.className = "name-card";
  card.style.animationDelay = `${Math.min(index * 0.03, 0.4)}s`;

  const isFav = state.favorites.includes(text);

  card.innerHTML = `
    <div class="card-header">
      <span class="badge">${badgeText}</span>
      <span class="card-style-title">${title}</span>
    </div>
    <div class="card-body">
      <div class="decorated-name-text" title="${text}">${escapeHtml(text)}</div>
    </div>
    <div class="card-footer">
      <div class="card-info">
        <span class="name-length">${text.length} حرف</span>
      </div>
      <div class="card-actions">
        <button class="fav-btn ${isFav ? 'active' : ''}" title="${isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}">
          ${isFav ? '★' : '☆'}
        </button>
        <button class="copy-btn">
          <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-label">نسخ</span>
        </button>
      </div>
    </div>
  `;

  // Copy Action
  const copyBtn = card.querySelector(".copy-btn");
  copyBtn.addEventListener("click", () => {
    copyTextToClipboard(text, `تم نسخ "${text}" بنجاح!`);
    copyBtn.classList.add("copied");
    copyBtn.querySelector(".copy-label").textContent = "تم النسخ!";
    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.querySelector(".copy-label").textContent = "نسخ";
    }, 1500);
  });

  // Favorite Action
  const favBtn = card.querySelector(".fav-btn");
  favBtn.addEventListener("click", () => {
    toggleFavorite(text);
    playSound('click');
    if (state.activeTab === "favorites") {
      renderFavorites();
    } else {
      const activeNow = state.favorites.includes(text);
      favBtn.classList.toggle("active", activeNow);
      favBtn.textContent = activeNow ? '★' : '☆';
      favBtn.title = activeNow ? 'إزالة من المفضلة' : 'حفظ في المفضلة';
    }
  });

  return card;
}

// Toggle favorite state
function toggleFavorite(text) {
  const index = state.favorites.indexOf(text);
  if (index > -1) {
    state.favorites.splice(index, 1);
    showToast("تمت الإزالة من المفضلة");
  } else {
    state.favorites.push(text);
    showToast("⭐ تمت الإضافة إلى المفضلة!");
  }
  localStorage.setItem("gaming_favorites", JSON.stringify(state.favorites));
}

// Render Symbols Grid
function renderSymbols(selectedCategoryId = "all") {
  if (!elements.symbolsContainer) return;
  elements.symbolsContainer.innerHTML = "";

  SYMBOLS_DATA.forEach(cat => {
    if (selectedCategoryId !== "all" && cat.id !== selectedCategoryId) {
      return;
    }

    const group = document.createElement("div");
    group.className = "symbol-category-group";

    const title = document.createElement("h4");
    title.className = "symbol-cat-title";
    title.textContent = cat.category;
    group.appendChild(title);

    const symbolsWrap = document.createElement("div");
    symbolsWrap.className = "symbols-grid";

    cat.symbols.forEach(sym => {
      const symBtn = document.createElement("button");
      symBtn.className = "symbol-item";
      symBtn.textContent = sym;
      symBtn.title = "انقر لإضافة الرمز للاسم أو نسخه";

      symBtn.addEventListener("click", () => {
        insertSymbolAtCursor(sym);
        playSound('click');
        showToast(`تمت إضافة الرمز: ${sym}`);
      });

      symbolsWrap.appendChild(symBtn);
    });

    group.appendChild(symbolsWrap);
    elements.symbolsContainer.appendChild(group);
  });
}

// Insert symbol into input field at cursor position
function insertSymbolAtCursor(symbol) {
  const input = elements.nameInput;
  const startPos = input.selectionStart || input.value.length;
  const endPos = input.selectionEnd || input.value.length;
  
  const val = input.value;
  input.value = val.substring(0, startPos) + symbol + val.substring(endPos);
  
  // Set new cursor position after inserted symbol
  input.focus();
  input.selectionStart = input.selectionEnd = startPos + symbol.length;
  
  // Trigger update
  state.currentInput = input.value;
  updateResults();
}

// Clipboard Helper
function copyTextToClipboard(text, successMsg = "تم النسخ بنجاح!") {
  playSound('copy');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

// Fallback clipboard method for older browsers or file:// context
function fallbackCopy(text, successMsg) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (err) {
    showToast("تعذر النسخ، يرجى التحديد والنسخ يدوياً");
  }
  document.body.removeChild(textarea);
}

// Toast Notifications
let toastTimeout;
function showToast(message) {
  if (!elements.toast || !elements.toastMessage) return;
  elements.toastMessage.textContent = message;
  elements.toast.classList.add("visible");
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2200);
}

// Helper to escape HTML tags
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
