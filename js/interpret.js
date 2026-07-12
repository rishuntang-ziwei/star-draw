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

const TOPIC_TAIL = {
  work: '工作上可據此調整策略與節奏。',
  love: '感情上宜誠實溝通，勿只憑猜測行事。',
  money: '財務上宜保守規劃，避免一次押注過滿。',
  health: '身心上宜規律作息，別忽視累積的壓力。',
  study: '學習上宜專注重點，循序漸進較穩。',
};

const TIER_ROLE = {
  major: '主星定調',
  tierB: '乙級輔星',
  tierC: '丙級輔星',
  mutagen: '四化轉化',
};

const TIER_INTRO = {
  major: '作為核心主星，',
  tierB: '在推進過程中，',
  tierC: '細節上，',
  mutagen: '就整體走向，',
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

function cardBrief(card, question, topic) {
  const hook = topicHook(question, topic);
  const intro = TIER_INTRO[card.tierId] || '';

  if (card.meaning) {
    const kw = pickKeyword(card, question || topic);
    const kwNote = kw ? `此刻可特別留意「${kw}」。` : '';
    return `${hook}${intro}【${card.name}】${card.meaning}${kwNote ? ` ${kwNote}` : ''}`;
  }

  return `${hook}【${card.name}】象徵「${card.theme}」，值得深入理解。`;
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
    if (majors[0].meaning && majors[1].meaning) {
      parts.push(
        `主星${majors[0].name}與${majors[1].name}並立：${majors[0].name}重${majors[0].theme}，${majors[1].name}重${majors[1].theme}，兩股核心能量需整合；`,
      );
    } else {
      parts.push(`主星${majors[0].name}與${majors[1].name}定調全局；`);
    }
  }

  const luckyB = tierB.filter((c) => c.fortune === '吉');
  const harshB = tierB.filter((c) => c.fortune === '凶');
  if (luckyB.length >= 2) {
    parts.push(`乙級${luckyB.map((c) => c.name).join('、')}偏吉，貴人與助力充足；`);
  } else if (harshB.length >= 2) {
    parts.push(`乙級${harshB.map((c) => c.name).join('、')}偏凶，推進需防波折；`);
  } else if (tierB.length === 2) {
    parts.push(`乙級${tierB[0].name}與${tierB[1].name}一正一反，成敗取決於是否順勢調整；`);
  }

  const peachC = tierC.filter((c) => c.fortune === '桃');
  const drainC = tierC.filter((c) => c.fortune === '耗');
  if (peachC.length) {
    parts.push(`丙級${peachC.map((c) => c.name).join('、')}帶桃花象，人際與情感因素不可忽略；`);
  } else if (drainC.length) {
    parts.push(`丙級${drainC.map((c) => c.name).join('、')}見耗損，宜節制投入；`);
  } else if (tierC.length) {
    parts.push(`丙級${tierC.map((c) => c.name).join('、')}補充環境細節；`);
  }

  if (mutagen?.meaning) {
    parts.push(`${mutagen.name}收尾：${mutagen.meaning}`);
  } else if (mutagen?.name === '空牌') {
    parts.push('空牌收尾，答案仍在醞釀，不必急於定論。');
  }

  if (TOPIC_TAIL[topic]) {
    parts.push(TOPIC_TAIL[topic]);
  }

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
            meaning: card.meaning,
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
