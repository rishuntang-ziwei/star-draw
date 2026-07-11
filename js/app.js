import { DECK, ROUND_ORDER, TIERS, CARD_BACK } from './cards.js';

const $ = (sel) => document.querySelector(sel);

const state = {
  roundIndex: 0,
  phase: 'round', // round | reveal | done
  results: [],
  roundPicks: [],
  deckRemaining: [],
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

function tierLabel(tierId, index) {
  const labels = ['第一輪', '第二輪', '第三輪', '第四輪'];
  return `${labels[index]} · ${TIERS[tierId].label}`;
}

function renderProgress() {
  const el = $('#progress');
  el.innerHTML = ROUND_ORDER.map((id, i) => {
    let cls = 'progress-step';
    if (i === state.roundIndex && state.phase === 'round') cls += ' active';
    if (i < state.roundIndex || state.phase !== 'round') cls += ' done';
    if (state.phase === 'reveal' && i === ROUND_ORDER.length - 1) {
      cls = 'progress-step active';
    }
    return `<span class="${cls}">${TIERS[id].label}</span>`;
  }).join('');
  if (state.phase === 'reveal') {
    el.innerHTML += '<span class="progress-step active">翻牌</span>';
  }
  if (state.phase === 'done') {
    el.innerHTML += '<span class="progress-step done">完成</span>';
  }
}

function cardBackHtml() {
  return `<img src="${CARD_BACK}" alt="" class="card-back-img">`;
}

function cardFaceHtml(card) {
  if (card.image) {
    return `<img src="${card.image}" alt="${card.name}" loading="lazy">`;
  }
  const hint = card.keywords || card.hint || '';
  return `<div class="card-name">${card.name}</div><div class="card-hint">${hint}</div>`;
}

function makeCardButton(card, tierId, opts = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'card-slot';
  btn.dataset.cardId = card.id;
  if (opts.flipped) btn.classList.add('flipped', 'revealed');
  if (opts.selected) btn.classList.add('selected');
  btn.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">${cardBackHtml()}</div>
      <div class="card-face card-front ${card.image ? '' : 'text-only'}">
        ${cardFaceHtml(card)}
      </div>
    </div>`;
  return btn;
}

function renderRound() {
  const tierId = currentTierId();
  const tier = currentTier();
  const deck = DECK[tierId];

  $('#stageTitle').textContent = tier.label;
  $('#stageSubtitle').textContent = tier.subtitle;
  $('#pickCounter').textContent =
    `已選 ${state.roundPicks.length} / ${tier.pickCount} 張`;

  const grid = $('#cardGrid');
  const drawArea = $('#drawArea');
  const actions = $('#actions');
  grid.innerHTML = '';
  drawArea.innerHTML = '';
  grid.classList.remove('hidden');
  drawArea.classList.add('hidden');
  actions.innerHTML = '';

  if (tier.mode === 'select') {
    deck.forEach((card) => {
      const picked = state.roundPicks.some((c) => c.id === card.id);
      const btn = makeCardButton(card, tierId, {
        flipped: true,
        selected: picked,
      });
      if (picked) btn.disabled = true;
      btn.addEventListener('click', () => toggleSelect(card, tierId));
      grid.appendChild(btn);
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = '確認選牌';
    nextBtn.disabled = state.roundPicks.length !== tier.pickCount;
    nextBtn.addEventListener('click', finishRound);
    actions.appendChild(nextBtn);
  } else {
    grid.classList.add('hidden');
    drawArea.classList.remove('hidden');

    if (state.deckRemaining.length === 0) {
      state.deckRemaining = shuffle(deck.map((c) => ({ ...c, tierId })));
    }

    const remaining = state.deckRemaining.length;
    const need = tier.pickCount - state.roundPicks.length;

    const stack = document.createElement('div');
    stack.className = 'deck-stack';
    stack.innerHTML = `
      <div class="card-face card-back layer-3">${cardBackHtml()}</div>
      <div class="card-face card-back layer-2">${cardBackHtml()}</div>
      <div class="card-face card-back layer-1">${cardBackHtml()}</div>`;
    stack.title = '點擊抽牌';
    stack.addEventListener('click', () => drawOne(tierId));

    const label = document.createElement('p');
    label.className = 'deck-label';
    label.textContent =
      need > 0
        ? `牌堆剩 ${remaining} 張，請抽 ${need} 張`
        : '本輪抽選完成';

    drawArea.appendChild(stack);
    drawArea.appendChild(label);

    const preview = document.createElement('div');
    preview.className = 'drawn-preview';
    state.roundPicks.forEach((card) => {
      const el = makeCardButton(card, tierId, { flipped: false });
      el.disabled = true;
      preview.appendChild(el);
    });
    drawArea.appendChild(preview);

    if (need === 0) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-primary';
      nextBtn.textContent = '進入下一輪';
      nextBtn.addEventListener('click', finishRound);
      actions.appendChild(nextBtn);
    }
  }

  renderProgress();
}

function toggleSelect(card, tierId) {
  const tier = TIERS[tierId];
  const idx = state.roundPicks.findIndex((c) => c.id === card.id);
  if (idx >= 0) {
    state.roundPicks.splice(idx, 1);
  } else if (state.roundPicks.length < tier.pickCount) {
    state.roundPicks.push({ ...card, tierId });
  }
  renderRound();
}

function drawOne(tierId) {
  const tier = TIERS[tierId];
  if (state.roundPicks.length >= tier.pickCount) return;
  if (state.deckRemaining.length === 0) return;

  const card = state.deckRemaining.pop();
  state.roundPicks.push({ ...card, tierId });
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
  $('#stageTitle').textContent = '翻開牌面';
  $('#stageSubtitle').textContent = '依序點擊牌面，由左至右逐一翻開';
  $('#pickCounter').textContent = `已翻 ${state.revealIndex} / ${state.results.length} 張`;
  $('#cardGrid').classList.add('hidden');
  $('#drawArea').classList.add('hidden');

  const actions = $('#actions');
  actions.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'reveal-row';

  state.results.forEach((card, i) => {
    const wrap = document.createElement('div');
    const btn = makeCardButton(card, card.tierId, {
      flipped: i < state.revealIndex,
    });
    if (i > state.revealIndex) {
      btn.classList.add('waiting');
      btn.disabled = true;
    } else if (i === state.revealIndex) {
      btn.addEventListener('click', () => flipNext());
    } else {
      btn.disabled = true;
    }
    wrap.appendChild(btn);
    const lab = document.createElement('div');
    lab.className = 'reveal-label';
    lab.textContent = card.roundLabel;
    wrap.appendChild(lab);
    row.appendChild(wrap);
  });

  const container = $('#drawArea');
  container.classList.remove('hidden');
  container.innerHTML = '';
  container.appendChild(row);

  if (state.revealIndex >= state.results.length) {
    showDone();
  }

  renderProgress();
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
  $('#stageTitle').textContent = '抽牌完成';
  $('#stageSubtitle').textContent = '以下為本次七張牌結果';
  $('#pickCounter').textContent = '';

  const list = document.createElement('div');
  list.className = 'result-list';
  state.results.forEach((card) => {
    const item = document.createElement('div');
    item.className = 'result-item';
    const imgPart = card.image
      ? `<img src="${card.image}" alt="${card.name}">`
      : `<div class="card-front text-only" style="width:72px;height:112px;border-radius:6px"><span class="card-name" style="font-size:1rem">${card.name}</span></div>`;
    const detail = card.keywords
      ? `<p>${card.keywords}</p><p>${card.keywordsEn || ''}</p>`
      : `<p>${card.hint || ''}</p>`;
    item.innerHTML = `${imgPart}<div><h3>${card.roundLabel} · ${card.name}</h3>${detail}</div>`;
    list.appendChild(item);
  });

  const container = $('#drawArea');
  container.innerHTML = '';
  container.appendChild(list);

  const actions = $('#actions');
  actions.innerHTML = '';
  const restart = document.createElement('button');
  restart.className = 'btn btn-secondary';
  restart.textContent = '重新抽牌';
  restart.addEventListener('click', reset);
  actions.appendChild(restart);
  renderProgress();
}

function reset() {
  state.roundIndex = 0;
  state.phase = 'round';
  state.results = [];
  state.roundPicks = [];
  state.deckRemaining = [];
  state.revealIndex = 0;
  renderRound();
}

function init() {
  $('#startBtn').addEventListener('click', () => {
    $('#welcome').classList.add('hidden');
    $('#game').classList.remove('hidden');
    reset();
  });
}

init();
