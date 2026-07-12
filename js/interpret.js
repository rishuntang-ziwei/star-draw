const FORTUNE_HINT = {
  君: '具有主導與定調的力量',
  臣: '擅長整合資源、推動局面',
  佐: '適合從旁策劃、謀定後動',
  使: '代表付出、執行與能量輸出',
  吉: '整體偏向順遂與助力',
  凶: '需留意阻力與反覆',
  形: '局面多變，不宜僵化',
  桃: '與情感、人際互動密切',
  佑: '有庇護、緩解與轉圜',
  耗: '恐有消耗、損失或空轉',
  化: '代表後續的轉化走向',
};

const TOPIC_RULES = [
  { id: 'work', words: ['工作', '事業', '職', 'job', '面試', '升遷', '同事', '老闆', '創業', '離職'] },
  { id: 'love', words: ['感情', '愛', '戀', '婚姻', '對象', '喜歡', '分手', '復合', '曖昧', '伴侶'] },
  { id: 'money', words: ['錢', '財', '投資', '收入', '借', '經濟', '貸', '破財', '賺'] },
  { id: 'health', words: ['健康', '身體', '病', '醫', '睡眠', '壓力', '疲勞'] },
  { id: 'study', words: ['考', '學', '讀書', '研', '試', '證照', '進修'] },
];

const TOPIC_HOOK = {
  work: '在事業與工作面向上，',
  love: '在感情與關係面向上，',
  money: '在財務與資源面向上，',
  health: '在身心狀態面向上，',
  study: '在學習與進修面向上，',
  general: '就目前的牌陣而言，',
};

const TIER_ROLE = {
  major: '主星定調',
  tierB: '乙級輔星',
  tierC: '丙級輔星',
  mutagen: '四化轉化',
};

const MUTAGEN_READ = {
  化祿: '後勢偏向圓滿與收穫，宜把握可得之福。',
  化權: '局面將更明顯地傾向主導與承擔，力度會加重。',
  化科: '名望、認可或實至名歸的機會浮現，宜穩步累積。',
  化忌: '阻礙與卡關較易浮現，需預留轉圜空間。',
};

function hash(text) {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) {
    h = (h * 31 + text.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function detectTopic(question) {
  const q = (question || '').toLowerCase();
  if (!q) return 'general';
  for (const rule of TOPIC_RULES) {
    if (rule.words.some((w) => q.includes(w.toLowerCase()))) return rule.id;
  }
  return 'general';
}

function topicHook(question, topic) {
  if (topic !== 'general') return TOPIC_HOOK[topic];
  return question ? `就「${question}」而論，` : TOPIC_HOOK.general;
}

function pickKeyword(card, salt) {
  const keywords = (card.keywords || '').split('、').map((s) => s.trim()).filter(Boolean);
  if (!keywords.length) return '';
  return keywords[hash(`${card.id}-${salt}`) % keywords.length];
}

function majorBrief(card, question, topic) {
  const hook = topicHook(question, topic);
  const kw = pickKeyword(card, question || topic);
  const tone = FORTUNE_HINT[card.fortune] || '';
  const lines = [
    `${hook}【${card.name}】為核心主星，象徵「${card.theme}」。`,
    tone ? `${tone}，` : '',
    kw ? `此刻可從「${kw}」的角度理解自己的位置。` : '宜先釐清你在這件事中的主動權。',
  ];
  return lines.filter(Boolean).join('');
}

function tierBBrief(card, question, topic) {
  const hook = topic !== 'general' ? '在推進過程中，' : question ? `就你的問題，` : '在過程中，';
  const kw = pickKeyword(card, `${question}-b`);
  const lucky = card.fortune === '吉';
  const tense = card.fortune === '凶';

  if (lucky) {
    return `${hook}【${card.name}】帶來助力，「${card.theme}」相關的能量偏順；${kw ? `可留意${kw}。` : '宜把握外力協助。'}`;
  }
  if (tense) {
    return `${hook}【${card.name}】提示阻力，「${card.theme}」面需多一層耐心；${kw ? `小心${kw}造成的反覆。` : '不宜躁進。'}`;
  }
  return `${hook}【${card.name}】呈現「${card.theme}」之動能，${FORTUNE_HINT[card.fortune] || '局面仍在變化'}。`;
}

function tierCBrief(card, question, topic) {
  const hook = '細節上，';
  const kw = pickKeyword(card, `${question}-c`);
  const tone = FORTUNE_HINT[card.fortune] || '';

  if (card.fortune === '桃') {
    return `${hook}【${card.name}】凸顯人際與情感色彩，「${card.theme}」可能成為關鍵變數。`;
  }
  if (card.fortune === '耗') {
    return `${hook}【${card.name}】提醒消耗與損失，${kw ? `尤其與${kw}有關，` : ''}宜節制與止损。`;
  }
  return `${hook}【${card.name}】補充「${card.theme}」的訊息，${tone}；${kw ? `可從${kw}著手觀察。` : '宜留意外圍環境。'}`;
}

function mutagenBrief(card, question) {
  if (card.variant === 'void' || card.name === '空牌') {
    return question
      ? `就「${question}」而言，空牌象徵留白與未定；答案尚未成形，與其強求，不如先觀察再行動。`
      : '空牌象徵留白與未定，此刻不宜強求答案，靜觀其變亦是訊號。';
  }

  const extra = MUTAGEN_READ[card.name] || `「${card.theme}」將影響整體結尾走向。`;
  return question
    ? `就你的問題，【${card.name}】為四化之牌，${extra}`
    : `【${card.name}】為四化之牌，${extra}`;
}

function cardBrief(card, question, topic) {
  if (card.variant === 'void' || card.name === '空牌') return mutagenBrief(card, question);

  switch (card.tierId) {
    case 'major':
      return majorBrief(card, question, topic);
    case 'tierB':
      return tierBBrief(card, question, topic);
    case 'tierC':
      return tierCBrief(card, question, topic);
    case 'mutagen':
      return mutagenBrief(card, question);
    default:
      return `【${card.name}】象徵「${card.theme}」，${FORTUNE_HINT[card.fortune] || '值得留意'}。`;
  }
}

function countFortune(cards, fortune) {
  return cards.filter((c) => c.fortune === fortune).length;
}

function templateSynthesis(cards, question, topic) {
  const majors = cards.filter((c) => c.tierId === 'major');
  const tierB = cards.filter((c) => c.tierId === 'tierB');
  const tierC = cards.filter((c) => c.tierId === 'tierC');
  const mutagen = cards.find((c) => c.tierId === 'mutagen');
  const parts = [];

  if (question) {
    parts.push(`針對「${question}」，`);
  } else {
    parts.push('綜觀此牌陣，');
  }

  if (majors.length >= 2) {
    parts.push(
      `主星${majors[0].name}與${majors[1].name}並立，核心在「${majors[0].theme}」與「${majors[1].theme}」的交會；`,
    );
  }

  const luckyB = countFortune(tierB, '吉');
  const harshB = countFortune(tierB, '凶');
  if (luckyB >= 2) parts.push('乙級雙吉，過程中助力與貴人偏多；');
  else if (harshB >= 2) parts.push('乙級偏凶，推進時需預留波折與緩衝；');
  else if (tierB.length) parts.push('乙級一吉一兇，成敗常取決於是否順勢調整；');

  const peachC = countFortune(tierC, '桃');
  const drainC = countFortune(tierC, '耗');
  if (peachC) parts.push('丙級帶桃花象，人際與情感因素不可忽略；');
  else if (drainC) parts.push('丙級見耗損象，宜避免過度投入或情緒性決策；');
  else if (tierC.length) parts.push('丙級補充環境細節，宜從小處觀察大勢；');

  if (mutagen?.name === '空牌') {
    parts.push('空牌收尾，代表答案仍在醞釀，不必急於定論。');
  } else if (mutagen) {
    parts.push(`${mutagen.name}為整體加上「${mutagen.theme}」的轉化，${MUTAGEN_READ[mutagen.name] || '後勢仍待觀察。'}`);
  }

  if (topic === 'work') parts.push('工作上宜先穩住核心，再談擴張。');
  if (topic === 'love') parts.push('感情上宜誠實面對需求，避免只憑直覺衝動。');
  if (topic === 'money') parts.push('財務上宜保守配置，避免一次押注過滿。');

  parts.push('以上僅供娛樂參考，請以現實判斷為準。');
  return parts.join('');
}

export function templateReading(cards, question = '') {
  const topic = detectTopic(question);
  return {
    source: 'builtin',
    cards: cards.map((card) => ({
      name: card.name,
      role: TIER_ROLE[card.tierId] || card.roundLabel || '',
      brief: cardBrief(card, question, topic),
    })),
    synthesis: templateSynthesis(cards, question, topic),
  };
}

function readingDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 900 + (hash(String(Date.now())) % 600));
  });
}

export async function fetchReading(cards, question = '') {
  const api = (window.INTERPRET_API || '').replace(/\/$/, '');

  if (api) {
    try {
      const res = await fetch(`${api}/api/interpret`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          cards: cards.map((card) => ({
            name: card.name,
            theme: card.theme,
            keywords: card.keywords,
            fortune: card.fortune,
            roundLabel: card.roundLabel,
            tierId: card.tierId,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.cards?.length && data.synthesis) {
          return { ...data, source: 'ai' };
        }
      }
    } catch {
      /* fallback below */
    }
  }

  await readingDelay();
  return templateReading(cards, question);
}
