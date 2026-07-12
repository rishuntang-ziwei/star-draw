const FORTUNE_HINT = {
  君: '具核心主導力',
  臣: '偏向資源整合',
  佐: '適合策劃協助',
  使: '代表付出與能量輸出',
  吉: '整體偏順遂',
  凶: '需留意阻力',
  形: '多變動之象',
  桃: '與情感人際相關',
  佑: '有庇護與緩解',
  耗: '恐有消耗損失',
  化: '四化轉化之力',
};

function templateBrief(card, question) {
  const topic = question ? `就「${question}」而言，` : '';
  const kw = (card.keywords || '').split('、').filter(Boolean).slice(0, 2).join('、');
  const tone = FORTUNE_HINT[card.fortune] || '';

  if (card.variant === 'void' || card.name === '空牌') {
    return `${topic}空牌象徵留白與未定，此刻不宜強求答案，靜觀其變。`;
  }

  const parts = [`${topic}【${card.name}】（${card.theme}）`];
  if (tone) parts.push(tone);
  if (kw) parts.push(`提示${kw}等面向`);
  return `${parts.join('，')}。`;
}

function templateSynthesis(cards, question) {
  const names = cards.filter((c) => c.name !== '空牌').map((c) => c.name);
  const majors = cards.filter((c) => c.tierId === 'major').map((c) => c.theme);
  const mutagen = cards.find((c) => c.tierId === 'mutagen' && c.name !== '空牌');

  const lead = question
    ? `針對你的問題，牌陣以${names.slice(0, 2).join('、')}為主軸`
    : `此牌陣以${names.slice(0, 2).join('、')}為主軸`;

  const core = majors.length
    ? `，核心能量落在「${majors.join('／')}」，`
    : '，';

  const tail = mutagen
    ? `四化${mutagen.name}為整體走勢加上${mutagen.theme}的轉化。`
    : '整體宜綜合七張牌的能量，順勢而為。';

  return `${lead}${core}輔星與丙級星補充細節${tail}（娛樂參考，非絕對預言。）`;
}

export function templateReading(cards, question = '') {
  return {
    source: 'template',
    cards: cards.map((card) => ({
      name: card.name,
      brief: templateBrief(card, question),
    })),
    synthesis: templateSynthesis(cards, question),
  };
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

  return templateReading(cards, question);
}
