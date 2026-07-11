import { DECK, ROUND_ORDER, TIERS, CARD_BACK } from './cards.js';

const $ = (sel) => document.querySelector(sel);

const state = {
  phase: 'idle', // idle | round | reveal | done
  roundIndex: 0,
  roundPicks: [],
  deckRemaining: [],
  results: [],
  revealIndex: 0,
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function currentTierId() {
  return ROUND_ORDER[state.roundIndex];
}

function currentTier() {
  return TIERS[currentTierId()];
}

function cardBackHtml() {
  return `<img src="${CARD_BACK}" alt="" loading="eager">`;
}

function cardFaceHtml(card) {
  if (card.image) {
    return `<img src="${card.image}" alt="${card.name}" loading="lazy">`;
  }
  return `<div style="display:grid;place-items:center;height:100%;font-weight:700">${card.name}</div>`;
}

function makeCardEl(card, opts = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'card';
  if (opts.hero) btn.classList.add('hero');
  if (opts.inRow) btn.classList.add('in-row');
  if (opts.flipped) btn.classList.add('flipped', 'revealed');
  if (opts.waiting) btn.classList.add('waiting');
  if (opts.activeFlip) btn.classList.add('active-flip');

  btn.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">${cardBackHtml()}</div>
      <div class="card-face card-front">${cardFaceHtml(card)}</div>
    </div>`;

  btn.dataset.cardId = card.id;
  return btn;
}

function fanAngles(count) {
  if (count <= 1) return [0];
  const spread = Math.min(10 + count * 4.2, 128);
  const start = -spread / 2;
  const step = spread / (count - 1);
  return Array.from({ length: count }, (_, i) => start + step * i);
}

function layoutFan(container, entries) {
  container.innerHTML = '';
  const angles = fanAngles(entries.length);

  entries.forEach((entry, index) => {
    const { card, onClick, picked } = entry;
    const el = makeCardEl(card);
    if (picked) {
      el.disabled = true;
      el.classList.add('picked');
    }

    const angle = angles[index];
    const lift = Math.abs(angle) * 0.42;
    el.style.transform = `rotate(${angle}deg) translateY(-${lift}px)`;
    el.style.zIndex = String(index + 1);

    if (onClick && !picked) {
      el.addEventListener('click', onClick);
    }

    container.appendChild(el);
  });
}

function setHint(text) {
  $('#hint').textContent = text;
}

function clearControls() {
  $('#controls').innerHTML = '';
}

function addControl(label, handler, opts = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pill-btn';
  btn.textContent = label;
  btn.disabled = !!opts.disabled;
  btn.addEventListener('click', handler);
  $('#controls').appendChild(btn);
  return btn;
}

function ensureDeck(tierId) {
  if (state.deckRemaining.length > 0) return;
  state.deckRemaining = shuffle(
    DECK[tierId].map((c) => ({ ...c, tierId })),
  );
}

function renderIdle() {
  state.phase = 'idle';
  $('#brand').classList.remove('hidden');
  setHint('點擊卡牌開始');
  $('#pickedRow').innerHTML = '';
  clearControls();

  const table = $('#table');
  table.innerHTML = '';
  const hero = makeCardEl({ id: 'hero', name: '開始' }, { hero: true });
  hero.addEventListener('click', startGame);
  table.appendChild(hero);
}

function startGame() {
  state.roundIndex = 0;
  state.roundPicks = [];
  state.deckRemaining = [];
  state.results = [];
  state.revealIndex = 0;
  state.phase = 'round';
  renderRound();
}

function roundHint(tier) {
  const picked = state.roundPicks.length;
  const need = tier.pickCount - picked;
  if (need > 0) {
    return `${tier.label} · 請從扇形中抽出 ${need} 張牌`;
  }
  return `${tier.label} · 本輪完成`;
}

function renderRound() {
  const tierId = currentTierId();
  const tier = currentTier();

  $('#brand').classList.add('hidden');
  setHint(roundHint(tier));
  clearControls();

  ensureDeck(tierId);

  const pickedRow = $('#pickedRow');
  pickedRow.innerHTML = '';
  state.roundPicks.forEach((card) => {
    const el = makeCardEl(card, { inRow: true });
    el.disabled = true;
    pickedRow.appendChild(el);
  });

  const fanEntries = state.deckRemaining.map((card) => ({
    card,
    onClick: () => handlePick(card),
  }));

  layoutFan($('#table'), fanEntries);

  if (state.roundPicks.length === tier.pickCount) {
    setTimeout(() => {
      if (state.phase === 'round' && state.roundPicks.length === tier.pickCount) {
        finishRound();
      }
    }, 700);
  } else if (state.roundPicks.length > 0) {
    addControl('復原', undoLastPick);
  }
}

function handlePick(card) {
  if (state.phase !== 'round') return;

  const tier = currentTier();
  if (state.roundPicks.length >= tier.pickCount) return;

  const idx = state.deckRemaining.findIndex((c) => c.id === card.id);
  if (idx < 0) return;

  const [picked] = state.deckRemaining.splice(idx, 1);
  state.roundPicks.push(picked);
  renderRound();
}

function undoLastPick() {
  if (!state.roundPicks.length || state.phase !== 'round') return;
  const last = state.roundPicks.pop();
  state.deckRemaining.push(last);
  renderRound();
}

function finishRound() {
  const tier = currentTier();
  if (state.roundPicks.length !== tier.pickCount) return;

  state.results.push(
    ...state.roundPicks.map((c) => ({
      ...c,
      roundLabel: tier.label,
    })),
  );
  state.roundPicks = [];
  state.deckRemaining = [];
  state.roundIndex += 1;

  if (state.roundIndex >= ROUND_ORDER.length) {
    startReveal();
  } else {
    renderRound();
  }
}

function startReveal() {
  state.phase = 'reveal';
  state.revealIndex = 0;
  renderReveal();
}

function renderReveal() {
  setHint(`請翻開第 ${state.revealIndex + 1} 張牌（${state.revealIndex}/${state.results.length}）`);
  $('#table').innerHTML = '';
  clearControls();

  const row = document.createElement('div');
  row.className = 'picked-row';
  row.style.width = '100%';

  state.results.forEach((card, i) => {
    const el = makeCardEl(card, {
      inRow: true,
      flipped: i < state.revealIndex,
      waiting: i > state.revealIndex,
      activeFlip: i === state.revealIndex,
    });

    if (i === state.revealIndex) {
      el.addEventListener('click', flipNext);
    } else {
      el.disabled = true;
    }

    row.appendChild(el);
  });

  $('#pickedRow').innerHTML = '';
  $('#pickedRow').appendChild(row);

  if (state.revealIndex >= state.results.length) {
    showDone();
  }
}

function flipNext() {
  if (state.revealIndex >= state.results.length) return;
  state.revealIndex += 1;
  if (state.revealIndex >= state.results.length) {
    state.phase = 'done';
  }
  renderReveal();
}

function showDone() {
  setHint('抽牌完成 · 七張牌已全部翻開');
  clearControls();
  addControl('重新抽牌', () => renderIdle());
}

function init() {
  $('#infoBtn').addEventListener('click', () => $('#infoDialog').showModal());
  $('#closeInfoBtn').addEventListener('click', () => $('#infoDialog').close());
  renderIdle();
}

init();
