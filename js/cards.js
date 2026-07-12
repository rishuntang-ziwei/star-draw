/** 45 撘萇?蝯????函??Ｗ?撌脣??*/

export const CARD_BACK = 'assets/ui/card-back.png';
export const BACKGROUND = 'assets/ui/background.png';

export const TIERS = {
  major: {
    id: 'major',
    label: '銝餅?',
    subtitle: '敺???葉?賢 2 撘?,
    pickCount: 2,
    mode: 'draw',
    color: '#1a237e',
    accent: '#c9a227',
  },
  tierB: {
    id: 'tierB',
    label: '銋?頛??,
    subtitle: '瘣?敺????賡 2 撘?,
    pickCount: 2,
    mode: 'draw',
    color: '#1b4332',
    accent: '#52b788',
  },
  tierC: {
    id: 'tierC',
    label: '銝?頛??,
    subtitle: '瘣?敺????賡 2 撘?,
    pickCount: 2,
    mode: 'draw',
    color: '#6a1b9a',
    accent: '#ce93d8',
  },
  mutagen: {
    id: 'mutagen',
    label: '???征??,
    subtitle: '瘣?敺? 5 撘萎葉?賡 1 撘?,
    pickCount: 1,
    mode: 'draw',
    color: '#b71c1c',
    accent: '#ef9a9a',
  },
};

export const ROUND_ORDER = ['major', 'tierB', 'tierC', 'mutagen'];

/** @typedef {{ id: string, name: string, image?: string, theme?: string, themeEn?: string, rank?: number|string, suit?: string, element?: string, fortune?: string, keywords?: string, keywordsEn?: string, variant?: string }} Card */

/** @type {Record<string, Card[]>} */
export const DECK = {
  major: [
    { id: 'm01', name: '蝝怠凝', theme: '?芯蜓', themeEn: 'Autonomy', rank: 'A', suit: 'spade', element: '??, fortune: '??, keywords: '?????扼??, keywordsEn: 'Be the owner, Take control, Create', image: 'assets/cards/major/zi-wei.png' },
    { id: 'm02', name: '憭拇?', theme: '蝑?', themeEn: 'Strategize', rank: 'A', suit: 'club', element: '??, fortune: '雿?, keywords: '?箏????敹?, keywordsEn: 'IQ, Creativity, Mind laborious', image: 'assets/cards/major/tian-ji.png' },
    { id: 'm03', name: '憭芷', theme: '?賡?', themeEn: 'Energy', rank: 'Q', suit: 'spade', element: '??, fortune: '雿?, keywords: '?????敹?, keywordsEn: 'Provide, Persistent, Careless', image: 'assets/cards/major/tai-yang.png' },
    { id: 'm04', name: '甇行', theme: '??', themeEn: 'Pioneer', rank: 'K', suit: 'spade', element: '??, fortune: '??, keywords: '鞈??極雿??, keywordsEn: 'Resource, Work, Innovation', image: 'assets/cards/major/wu-qu.png' },
    { id: 'm05', name: '憭拙?', theme: '?澈', themeEn: 'Sharing', rank: 'J', suit: 'heart', element: '瘞?, fortune: '雿?, keywords: '???遛頞喋??, keywordsEn: 'Enjoy, Satisfy, Comfortable', image: 'assets/cards/major/tian-tong.png' },
    { id: 'm06', name: '撱?', theme: '?瘙?, themeEn: 'Demand', rank: 'J', suit: 'spade', element: '??, fortune: '??, keywords: '銝餉??瘜敦??, keywordsEn: 'Subjective, Idea, Exquisite', image: 'assets/cards/major/lian-zhen.png' },
    { id: 'm07', name: '憭拙?', theme: '?脣?', themeEn: 'Abundant', rank: 'K', suit: 'heart', element: '??, fortune: '??, keywords: '蝳正???Ｕ?敺?, keywordsEn: 'Knighthood, Favorable, Gain', image: 'assets/cards/major/tian-fu.png' },
    { id: 'm08', name: '憭芷', theme: '擗?', themeEn: 'Nourish', rank: 'Q', suit: 'heart', element: '瘞?, fortune: '雿?, keywords: '????霈?敹?, keywordsEn: 'Provide, Change, Care', image: 'assets/cards/major/tai-yin.png' },
    { id: 'm09', name: '鞎芰', theme: '鞈?', themeEn: 'Resources', rank: 'Q', suit: 'diamond', element: '瘞?, fortune: '??, keywords: '???飛蝧?, keywordsEn: 'Talent, Ability, Learning', image: 'assets/cards/major/tan-lang.png' },
    { id: 'm10', name: '撌券?', theme: '?矽', themeEn: 'Coordination', rank: 'Q', suit: 'club', element: '瘞?, fortune: '雿?, keywords: '皞＊蝷箝末閰?, keywordsEn: 'Communicate, Display, Praise', image: 'assets/cards/major/ju-men.png' },
    { id: 'm11', name: '憭拍', theme: '?', themeEn: 'Manage', rank: 'A', suit: 'heart', element: '瘞?, fortune: '??, keywords: '蝬????扼???, keywordsEn: 'Handle, Take control, Lay out', image: 'assets/cards/major/tian-xiang.png' },
    { id: 'm12', name: '憭拇?', theme: '?', themeEn: 'Background', rank: 'K', suit: 'club', element: '??, fortune: '雿?, keywords: '?賡????撠?, keywordsEn: 'Energy, Boost, Achievement', image: 'assets/cards/major/tian-liang.png' },
    { id: 'm13', name: '銝捏', theme: '?瑁?', themeEn: 'Execution', rank: 'J', suit: 'diamond', element: '??, fortune: '??, keywords: '?????賬???, keywordsEn: 'Leader, Kinetic energy, Promote', image: 'assets/cards/major/qi-sha.png' },
    { id: 'm14', name: '?渲?', theme: '?游?', themeEn: 'Integration', rank: 'A', suit: 'diamond', element: '??, fortune: '??, keywords: '蝞∠???皞?蝣?, keywordsEn: 'Administer, Resource, Bargaining chip', image: 'assets/cards/major/po-jun.png' },
  ],

  tierB: [
    { id: 'b01', name: '憭拚?', theme: '憿舐內', themeEn: 'Display', rank: 10, suit: 'spade', element: '??, fortune: '??, keywords: '鞎港犖?詨??皛?, keywordsEn: 'Noble help, Perfect', image: 'assets/cards/tierB/tian-kui.png' },
    { id: 'b02', name: '憭拚?', theme: '?賡?', themeEn: 'Power', rank: 10, suit: 'heart', element: '??, fortune: '??, keywords: '蟡?Ｗ??蟡?, keywordsEn: "God's help, Disaster, Praying to God", image: 'assets/cards/tierB/tian-yue.png' },
    { id: 'b03', name: '撌西?', theme: '?典?', themeEn: 'Promote', rank: 8, suit: 'spade', element: '??, fortune: '??, keywords: '?拙????鼠??, keywordsEn: 'Assistance, External force help', image: 'assets/cards/tierB/zuo-fu.png' },
    { id: 'b04', name: '?喳撮', theme: '??', themeEn: 'Aid', rank: 8, suit: 'club', element: '??, fortune: '??, keywords: '?拙??????, keywordsEn: 'Assistance, Right-hand man', image: 'assets/cards/tierB/you-bi.png' },
    { id: 'b05', name: '??', theme: '鞈芣?', themeEn: 'Classy', rank: 8, suit: 'heart', element: '??, fortune: '??, keywords: '摮貊???璆准?瞏?, keywordsEn: 'Learning, Professional, Mellow', image: 'assets/cards/tierB/wen-chang.png' },
    { id: 'b06', name: '?', theme: '蝔漲', themeEn: 'Level', rank: 6, suit: 'heart', element: '??, fortune: '??, keywords: '???銵?瞏?, keywordsEn: 'Talent, Technology, Mellow', image: 'assets/cards/tierB/wen-qu.png' },
    { id: 'b07', name: '蟡踹?', theme: '憭?', themeEn: 'Changeable', rank: 5, suit: 'heart', element: '??, fortune: '敶?, keywords: '憭梯儔敺末鈭?, keywordsEn: 'Lost and found, Good things', image: 'assets/cards/tierB/lu-cun.png' },
    { id: 'b08', name: '憭拚收', theme: '?寡?', themeEn: 'Change', rank: 4, suit: 'club', element: '??, fortune: '敶?, keywords: '銝帘???Ｕ???, keywordsEn: 'Instability, Distance, Going out', image: 'assets/cards/tierB/tian-ma.png' },
    { id: 'b09', name: '??', theme: '?', themeEn: 'Momentum', rank: 5, suit: 'diamond', element: '??, fortune: '??, keywords: '?游???蝡?, keywordsEn: 'Destroy, Create, Independence', image: 'assets/cards/tierB/qing-yang.png' },
    { id: 'b10', name: '?蝢?, theme: '?梯?', themeEn: 'Spin', rank: 8, suit: 'diamond', element: '??, fortune: '??, keywords: '撱園??蝤具征頧?, keywordsEn: 'Delay, Hard work, Idling', image: 'assets/cards/tierB/tuo-luo.png' },
    { id: 'b11', name: '?急?', theme: '?啁', themeEn: 'Ash', rank: 4, suit: 'diamond', element: '??, fortune: '??, keywords: '?瑕拿??亥?', keywordsEn: 'Damage, Energy, Impatience', image: 'assets/cards/tierB/huo-xing.png' },
    { id: 'b12', name: '?湔?', theme: '??', themeEn: 'Remind', rank: 3, suit: 'diamond', element: '??, fortune: '??, keywords: '撟脫???怒頨?, keywordsEn: 'Disturbance, Dark fire, Irritability', image: 'assets/cards/tierB/ling-xing.png' },
    { id: 'b13', name: '?啁征', theme: '憭拚?', themeEn: 'Spirituality', rank: 2, suit: 'heart', element: '??, fortune: '??, keywords: '?冽??閬箝???, keywordsEn: 'Renunciation, Intuition, Religion', image: 'assets/cards/tierB/di-kong.png' },
    { id: 'b14', name: '?啣', theme: '瘛函征', themeEn: 'Clear out', rank: 2, suit: 'diamond', element: '??, fortune: '??, keywords: '皜?仃?颯?憟?, keywordsEn: 'Clear, Lose, Bad', image: 'assets/cards/tierB/di-jie.png' },
  ],

  tierC: [
    { id: 'c01', name: '憭扯?, theme: '?仃', themeEn: 'Heavy Loss', rank: 'K', suit: 'diamond', element: '??, fortune: '??, keywords: '銵啜??仃', keywordsEn: 'Attenuation, Reduction, Loss', image: 'assets/cards/tierC/da-hao.png' },
    { id: 'c02', name: '?豢?', theme: '鈭急?', themeEn: 'Pleasure', rank: 7, suit: 'diamond', element: '??, fortune: '獢?, keywords: '閬芸???瘣駁?靽?, keywordsEn: 'Intimacy, Life relationship', image: 'assets/cards/tierC/xian-chi.png' },
    { id: 'c03', name: '憭拙?', theme: '撣豢?', themeEn: 'Normal', rank: 4, suit: 'heart', element: '??, fortune: '雿?, keywords: '?暑?ㄡ憌???, keywordsEn: 'Life, Food, Skill', image: 'assets/cards/tierC/tian-chu.png' },
    { id: 'c04', name: '閫??', theme: '??', themeEn: 'Reversal', rank: 9, suit: 'spade', element: '??, fortune: '雿?, keywords: '?Ｗ?圾?擛?, keywordsEn: 'Turn bad luck into good luck', image: 'assets/cards/tierC/jie-shen.png' },
    { id: 'c05', name: '憭拙?', theme: '蝷曆漱', themeEn: 'Social', rank: 7, suit: 'spade', element: '??, fortune: '獢?, keywords: '?唳扼??漱敺', keywordsEn: 'Opposite sex, Interaction, Communication', image: 'assets/cards/tierC/tian-yao.png' },
    { id: 'c06', name: '撠炙', theme: '摨', themeEn: 'Patronize', rank: 9, suit: 'heart', element: '??, fortune: '雿?, keywords: '?臬????摨?, keywordsEn: 'Affirmation, Award, Reward', image: 'assets/cards/tierC/feng-gao.png' },
    { id: 'c07', name: '蝝?', theme: '??', themeEn: 'Joy', rank: 7, suit: 'heart', element: '??, fortune: '獢?, keywords: '??鈭文??迤蝺?, keywordsEn: 'Relationship, Main fate', image: 'assets/cards/tierC/hong-luan.png' },
    { id: 'c08', name: '?啁?', theme: '鋡怠拿', themeEn: 'Victim', rank: 'JOKER', suit: 'joker', element: '??, fortune: '??, keywords: '撠犖?蝷???, keywordsEn: 'A base person, Obstacle, Trouble', image: 'assets/cards/tierC/yin-sha.png' },
    { id: 'c09', name: '??', theme: '撠?', themeEn: 'Right', rank: 3, suit: 'heart', element: '??, fortune: '雿?, keywords: '憟賭??券?????, keywordsEn: 'Good things come, Happy', image: 'assets/cards/tierC/xi-shen.png' },
    { id: 'c10', name: '??', theme: '銝?', themeEn: 'Undecided', rank: 'JOKER', suit: 'joker', element: '??, fortune: '??, keywords: '?剖?霅啜???, keywordsEn: 'Dispute, Controversy, Two-Face', image: 'assets/cards/tierC/fei-lian.png' },
    { id: 'c11', name: '?渡?', theme: '瘝?', themeEn: 'Broken', rank: 9, suit: 'diamond', element: '??, fortune: '??, keywords: '憟賢丐??????', keywordsEn: 'Good dream, Wake up, Hopeless', image: 'assets/cards/tierC/po-sui.png' },
    { id: 'c12', name: '?航?', theme: '?', themeEn: 'Forces behind', rank: 9, suit: 'club', element: '??, fortune: '雿?, keywords: '?葉?犖??霅?, keywordsEn: 'With background, Protect', image: 'assets/cards/tierC/hua-gai.png' },
  ],

  mutagen: [
    { id: 'h01', name: '?正', theme: '憟賭?', themeEn: 'Positive', rank: 3, suit: 'spade', element: '??, fortune: '??, keywords: '?遛?瓷撖蔔瘜?, keywordsEn: 'Fulfillment, Wealth, Prosperity', variant: 'lu', image: 'assets/cards/mutagen/hua-lu.png' },
    { id: 'h02', name: '??', theme: '?曇?', themeEn: 'Exceed', rank: 4, suit: 'spade', element: '??, fortune: '??, keywords: '?＊?憭??, keywordsEn: 'Obvious, More, Severe', variant: 'quan', image: 'assets/cards/mutagen/hua-quan.png' },
    { id: 'h03', name: '??', theme: '??', themeEn: 'Boost', rank: 5, suit: 'spade', element: '瘞?, fortune: '??, keywords: '?脣??祕?喳?甇?, keywordsEn: 'Get, Well deserved', variant: 'ke', image: 'assets/cards/mutagen/hua-ke.png' },
    { id: 'h04', name: '??', theme: '銝?, themeEn: 'Blockage', rank: 6, suit: 'diamond', element: '??, fortune: '??, keywords: '?餌??????, keywordsEn: 'Hindrance, Difficulty', variant: 'ji', image: 'assets/cards/mutagen/hua-ji.png' },
    { id: 'h05', name: '蝛箇?', theme: '蝛?, themeEn: 'Void', rank: 2, suit: 'spade', element: '', fortune: '', keywords: '', keywordsEn: '', variant: 'void', image: 'assets/cards/mutagen/void.png' },
  ],
};
