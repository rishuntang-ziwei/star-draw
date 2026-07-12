export const WUXING_ORDER = ['木', '火', '土', '金', '水'];

export const WUXING_COLORS = {
  木: '#3d9a50',
  火: '#d84343',
  土: '#8b5a2b',
  金: '#c9a227',
  水: '#1f1f1f',
};

export function countElements(cards) {
  const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  cards.forEach((card) => {
    if (card.element && counts[card.element] !== undefined) {
      counts[card.element] += 1;
    }
  });
  return counts;
}

function pentagonPoints(cx, cy, radius) {
  return WUXING_ORDER.map((_, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / WUXING_ORDER.length;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

export function buildWuxingPanel(counts) {
  const cx = 110;
  const cy = 110;
  const radius = 72;
  const points = pentagonPoints(cx, cy, radius);
  const ringPoints = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const nodes = WUXING_ORDER.map((name, index) => {
    const point = points[index];
    const count = counts[name] || 0;
    const color = WUXING_COLORS[name];
    const active = count > 0;
    return `
      <g class="wuxing-node${active ? ' is-active' : ''}">
        <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="26"
          fill="${active ? color : '#f5f5f5'}"
          stroke="${color}" stroke-width="${active ? 3 : 2}" />
        <text x="${point.x.toFixed(1)}" y="${(point.y - 2).toFixed(1)}"
          text-anchor="middle" class="wuxing-node-name">${name}</text>
        <text x="${point.x.toFixed(1)}" y="${(point.y + 14).toFixed(1)}"
          text-anchor="middle" class="wuxing-node-count">${count}</text>
      </g>`;
  }).join('');

  const arrows = WUXING_ORDER.map((name, index) => {
    const from = points[index];
    const to = points[(index + 1) % WUXING_ORDER.length];
    return `
      <line x1="${from.x.toFixed(1)}" y1="${from.y.toFixed(1)}"
        x2="${to.x.toFixed(1)}" y2="${to.y.toFixed(1)}"
        class="wuxing-edge" marker-end="url(#wuxing-arrow)" />`;
  }).join('');

  const summary = WUXING_ORDER.map(
    (name) => `<span class="wuxing-chip" style="--wx-color:${WUXING_COLORS[name]}">${name} ${counts[name] || 0}</span>`,
  ).join('');

  return `
    <p class="wuxing-title">五行統計</p>
    <svg class="wuxing-svg" viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <marker id="wuxing-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#aaa" />
        </marker>
      </defs>
      <polygon points="${ringPoints}" class="wuxing-ring" />
      ${arrows}
      ${nodes}
    </svg>
    <div class="wuxing-summary">${summary}</div>`;
}
