/** 45 張牌組 — 全牌面圖已匯入 */

export const CARD_BACK = 'assets/ui/card-back.png';
export const BACKGROUND = 'assets/ui/background.png';

export const TIERS = {
  major: {
    id: 'major',
    label: '主星',
    subtitle: '從牌陣中抽出 2 張',
    pickCount: 2,
    mode: 'draw',
    color: '#1a237e',
    accent: '#c9a227',
  },
  tierB: {
    id: 'tierB',
    label: '乙級輔助星',
    subtitle: '洗牌後從牌堆抽選 2 張',
    pickCount: 2,
    mode: 'draw',
    color: '#1b4332',
    accent: '#52b788',
  },
  tierC: {
    id: 'tierC',
    label: '丙級輔助星',
    subtitle: '洗牌後從牌堆抽選 2 張',
    pickCount: 2,
    mode: 'draw',
    color: '#6a1b9a',
    accent: '#ce93d8',
  },
  mutagen: {
    id: 'mutagen',
    label: '四化與空牌',
    subtitle: '洗牌後從 5 張中抽選 1 張',
    pickCount: 1,
    mode: 'draw',
    color: '#b71c1c',
    accent: '#ef9a9a',
  },
};

export const ROUND_ORDER = ['major', 'tierB', 'tierC', 'mutagen'];

/** @typedef {{ id: string, name: string, meaning?: string, image?: string, theme?: string, themeEn?: string, rank?: number|string, suit?: string, element?: string, fortune?: string, keywords?: string, keywordsEn?: string, variant?: string }} Card */

/** @type {Record<string, Card[]>} */
export const DECK = {
  major: [
    { id: 'm01', name: '紫微', theme: '自主', themeEn: 'Autonomy', rank: 'A', suit: 'spade', element: '土', fortune: '君', keywords: '擁有、掌控、創造', keywordsEn: 'Be the owner, Take control, Create', meaning: '北斗帝星，象徵尊貴、領導與自主。宜先定方向再行動，但需避免剛愎自用、孤軍奮戰。', image: 'assets/cards/major/zi-wei.png' },
    { id: 'm02', name: '天機', theme: '策劃', themeEn: 'Strategize', rank: 'A', suit: 'club', element: '木', fortune: '佐', keywords: '智商、創意、勞心', keywordsEn: 'IQ, Creativity, Mind laborious', meaning: '南斗善星，主智慧、策劃與變動。思維敏捷、善於謀略，宜動腦規劃，但須防想太多而搖擺不定。', image: 'assets/cards/major/tian-ji.png' },
    { id: 'm03', name: '太陽', theme: '能量', themeEn: 'Energy', rank: 'Q', suit: 'spade', element: '火', fortune: '使', keywords: '提供、執著、粗心', keywordsEn: 'Provide, Persistent, Careless', meaning: '中天貴星，光明博愛、外放能量。善於付出與照亮他人，需留意過度燃燒自己、忽略界線。', image: 'assets/cards/major/tai-yang.png' },
    { id: 'm04', name: '武曲', theme: '開拓', themeEn: 'Pioneer', rank: 'K', suit: 'spade', element: '金', fortune: '君', keywords: '資源、工作、新創', keywordsEn: 'Resource, Work, Innovation', meaning: '北斗財星，剛毅果決、重執行與資源。適合開拓與理財實務，但情感表達可能較直接、內斂。', image: 'assets/cards/major/wu-qu.png' },
    { id: 'm05', name: '天同', theme: '分享', themeEn: 'Sharing', rank: 'J', suit: 'heart', element: '水', fortune: '佐', keywords: '擁有、滿足、自在', keywordsEn: 'Enjoy, Satisfy, Comfortable', meaning: '福星，溫和分享、重感受與滿足。宜以柔克剛、修復關係，但需避免只求安逸而缺乏行動。', image: 'assets/cards/major/tian-tong.png' },
    { id: 'm06', name: '廉貞', theme: '需求', themeEn: 'Demand', rank: 'J', suit: 'spade', element: '火', fortune: '君', keywords: '主觀、想法、細膩', keywordsEn: 'Subjective, Idea, Exquisite', meaning: '次桃花，主欲望、原則與主觀需求。意志強、界線分明，需防情緒拉扯或標準過嚴。', image: 'assets/cards/major/lian-zhen.png' },
    { id: 'm07', name: '天府', theme: '儲存', themeEn: 'Abundant', rank: 'K', suit: 'heart', element: '土', fortune: '臣', keywords: '福祿、順暢、有得', keywordsEn: 'Knighthood, Favorable, Gain', meaning: '南斗令星、庫星，主守成、儲存與穩定。重視資源累積，順境易得福祿，但不宜過度保守。', image: 'assets/cards/major/tian-fu.png' },
    { id: 'm08', name: '太陰', theme: '養分', themeEn: 'Nourish', rank: 'Q', suit: 'heart', element: '水', fortune: '使', keywords: '提供、多變、掛心', keywordsEn: 'Provide, Change, Care', meaning: '中天母星，細膩養分、內斂關懷。重視感受與照顧，情緒起伏時宜慢決策、先安頓自己。', image: 'assets/cards/major/tai-yin.png' },
    { id: 'm09', name: '貪狼', theme: '資源', themeEn: 'Resources', rank: 'Q', suit: 'diamond', element: '水', fortune: '臣', keywords: '才華、能力、學習', keywordsEn: 'Talent, Ability, Learning', meaning: '才藝桃花，多才慾望、善學習拓展。機會與資源豐富，但易分散，需聚焦出口與界線。', image: 'assets/cards/major/tan-lang.png' },
    { id: 'm10', name: '巨門', theme: '協調', themeEn: 'Coordination', rank: 'Q', suit: 'club', element: '水', fortune: '佐', keywords: '溝通、顯示、好評', keywordsEn: 'Communicate, Display, Praise', meaning: '暗星，口才協調、善溝通顯示。能辨析真相亦易招口舌，宜謹言慎行、以理服人。', image: 'assets/cards/major/ju-men.png' },
    { id: 'm11', name: '天相', theme: '操盤', themeEn: 'Manage', rank: 'A', suit: 'heart', element: '水', fortune: '臣', keywords: '經手、掌控、安排', keywordsEn: 'Handle, Take control, Lay out', meaning: '印星，操盤協調、經手安排。適合輔佐管理與維持秩序，重信用平衡，但不宜過度迎合。', image: 'assets/cards/major/tian-xiang.png' },
    { id: 'm12', name: '天梁', theme: '背景', themeEn: 'Background', rank: 'K', suit: 'club', element: '土', fortune: '使', keywords: '能量、助力、成就', keywordsEn: 'Energy, Boost, Achievement', meaning: '蔭星，背景助力、解厄與成就。常有長輩或無形庇蔭，宜持正道、借力而不濫用。', image: 'assets/cards/major/tian-liang.png' },
    { id: 'm13', name: '七殺', theme: '執行', themeEn: 'Execution', rank: 'J', suit: 'diamond', element: '金', fortune: '臣', keywords: '領導、動能、提升', keywordsEn: 'Leader, Kinetic energy, Promote', meaning: '將星，執行魄力、開創動能。能突破僵局、帶領向前，須防衝勁過猛、壓力過大。', image: 'assets/cards/major/qi-sha.png' },
    { id: 'm14', name: '破軍', theme: '整合', themeEn: 'Integration', rank: 'A', suit: 'diamond', element: '火', fortune: '臣', keywords: '管理、資源、籌碼', keywordsEn: 'Administer, Resource, Bargaining chip', meaning: '耗星，整合變革、破而後立。擅長重整資源與籌碼，人生常先破後立，變動中見生機。', image: 'assets/cards/major/po-jun.png' },
  ],

  tierB: [
    { id: 'b01', name: '天魁', theme: '顯示', themeEn: 'Display', rank: 10, suit: 'spade', element: '火', fortune: '吉', keywords: '貴人相助、完滿', keywordsEn: 'Noble help, Perfect', meaning: '陽貴人，主顯達、貴人提攜。遇事易逢援手，宜把握機會展現自身，向完滿靠近。', image: 'assets/cards/tierB/tian-kui.png' },
    { id: 'b02', name: '天鉞', theme: '能量', themeEn: 'Power', rank: 10, suit: 'heart', element: '火', fortune: '吉', keywords: '神助、逢凶、求神', keywordsEn: "God's help, Disaster, Praying to God", meaning: '陰貴人，主暗中助力、逢凶化吉。危機時常有轉機，宜保持信念並適時求助。', image: 'assets/cards/tierB/tian-yue.png' },
    { id: 'b03', name: '左輔', theme: '推動', themeEn: 'Promote', rank: 8, suit: 'spade', element: '土', fortune: '吉', keywords: '助力、外力幫助', keywordsEn: 'Assistance, External force help', meaning: '吉星，主推動、左膀右臂。外力協助明顯，適合結盟合作，借力使力。', image: 'assets/cards/tierB/zuo-fu.png' },
    { id: 'b04', name: '右弼', theme: '協力', themeEn: 'Aid', rank: 8, suit: 'club', element: '金', fortune: '吉', keywords: '助力、得力助手', keywordsEn: 'Assistance, Right-hand man', meaning: '吉星，主協力、幕僚支援。得力助手在側，宜分工明確、彼此補位。', image: 'assets/cards/tierB/you-bi.png' },
    { id: 'b05', name: '文昌', theme: '質感', themeEn: 'Classy', rank: 8, suit: 'heart', element: '金', fortune: '吉', keywords: '學習、專業、圓潤', keywordsEn: 'Learning, Professional, Mellow', meaning: '文星，主學習、專業與質感。利考試進修、提升形象，宜以知識與涵養取勝。', image: 'assets/cards/tierB/wen-chang.png' },
    { id: 'b06', name: '文曲', theme: '程度', themeEn: 'Level', rank: 6, suit: 'heart', element: '金', fortune: '吉', keywords: '才華、技術、圓潤', keywordsEn: 'Talent, Technology, Mellow', meaning: '文星，主才華、技術與表達。口才好、上手快，宜精進技藝、圓融處世。', image: 'assets/cards/tierB/wen-qu.png' },
    { id: 'b07', name: '祿存', theme: '多變', themeEn: 'Changeable', rank: 5, suit: 'heart', element: '土', fortune: '形', keywords: '失而復得、好事', keywordsEn: 'Lost and found, Good things', meaning: '禄星，主財禄與得失變動。可能有失而復得之象，好事常伴波折，宜穩健理財。', image: 'assets/cards/tierB/lu-cun.png' },
    { id: 'b08', name: '天馬', theme: '改變', themeEn: 'Change', rank: 4, suit: 'club', element: '火', fortune: '形', keywords: '不穩、距離、外出', keywordsEn: 'Instability, Distance, Going out', meaning: '動星，主變動、遠行與距離。局面不穩、易有外出或環境改變，宜彈性應對。', image: 'assets/cards/tierB/tian-ma.png' },
    { id: 'b09', name: '擎羊', theme: '動能', themeEn: 'Momentum', rank: 5, suit: 'diamond', element: '金', fortune: '凶', keywords: '破壞、創造、獨立', keywordsEn: 'Destroy, Create, Independence', meaning: '羊刃，主剛猛動能與破壞力。可開創亦易衝突，宜獨立行事但須防硬碰硬。', image: 'assets/cards/tierB/qing-yang.png' },
    { id: 'b10', name: '陀羅', theme: '週轉', themeEn: 'Spin', rank: 8, suit: 'diamond', element: '金', fortune: '凶', keywords: '延遲、多磨、空轉', keywordsEn: 'Delay, Hard work, Idling', meaning: '煞星，主拖延、反覆與空轉。進程可能多磨，宜耐心周旋，避免原地打轉。', image: 'assets/cards/tierB/tuo-luo.png' },
    { id: 'b11', name: '火星', theme: '灰燼', themeEn: 'Ash', rank: 4, suit: 'diamond', element: '火', fortune: '凶', keywords: '傷害、能量、急躁', keywordsEn: 'Damage, Energy, Impatience', meaning: '煞星，主急躁、衝突與突发。能量強但易傷害，須防口角、意外與情緒失控。', image: 'assets/cards/tierB/huo-xing.png' },
    { id: 'b12', name: '鈴星', theme: '提醒', themeEn: 'Remind', rank: 3, suit: 'diamond', element: '火', fortune: '凶', keywords: '干擾、暗火、煩躁', keywordsEn: 'Disturbance, Dark fire, Irritability', meaning: '煞星，主暗火、干擾與煩躁。小事易放大，宜冷靜應對、避免被情緒牽引。', image: 'assets/cards/tierB/ling-xing.png' },
    { id: 'b13', name: '地空', theme: '天道', themeEn: 'Spirituality', rank: 2, suit: 'heart', element: '火', fortune: '凶', keywords: '捨棄、直覺、宗教', keywordsEn: 'Renunciation, Intuition, Religion', meaning: '空亡，主捨棄、直覺與精神性。物質面易落空，宜回歸內在、重視直覺與取捨。', image: 'assets/cards/tierB/di-kong.png' },
    { id: 'b14', name: '地劫', theme: '淨空', themeEn: 'Clear out', rank: 2, suit: 'diamond', element: '火', fortune: '凶', keywords: '清除、失去、不好', keywordsEn: 'Clear, Lose, Bad', meaning: '空亡，主破耗、清除與失去。舊有模式可能被打破，宜止损重建、不戀戰。', image: 'assets/cards/tierB/di-jie.png' },
  ],

  tierC: [
    { id: 'c01', name: '大耗', theme: '損失', themeEn: 'Heavy Loss', rank: 'K', suit: 'diamond', element: '火', fortune: '耗', keywords: '衰、滅、失', keywordsEn: 'Attenuation, Reduction, Loss', meaning: '耗星，主大幅損失與衰退。資源、精力恐有消耗，宜保守、避免重大冒進。', image: 'assets/cards/tierC/da-hao.png' },
    { id: 'c02', name: '咸池', theme: '享樂', themeEn: 'Pleasure', rank: 7, suit: 'diamond', element: '火', fortune: '桃', keywords: '親密、生活關係', keywordsEn: 'Intimacy, Life relationship', meaning: '桃花，主親密、享樂與生活關係。情感與感官議題浮現，宜享受亦須設界線。', image: 'assets/cards/tierC/xian-chi.png' },
    { id: 'c03', name: '天廚', theme: '常態', themeEn: 'Normal', rank: 4, suit: 'heart', element: '土', fortune: '佑', keywords: '生活、飲食、技藝', keywordsEn: 'Life, Food, Skill', meaning: '福星，主日常、飲食與技藝。生活起居與手藝相關，宜回归常態、細水長流。', image: 'assets/cards/tierC/tian-chu.png' },
    { id: 'c04', name: '解神', theme: '反轉', themeEn: 'Reversal', rank: 9, suit: 'spade', element: '金', fortune: '佑', keywords: '逢凶化解、放鬆', keywordsEn: 'Turn bad luck into good luck', meaning: '解厄星，主逢凶化解、鬆绑困境。緊張局勢有轉圜可能，宜放鬆、換角度思考。', image: 'assets/cards/tierC/jie-shen.png' },
    { id: 'c05', name: '天姚', theme: '社交', themeEn: 'Social', rank: 7, suit: 'spade', element: '金', fortune: '桃', keywords: '異性、互動、交往', keywordsEn: 'Opposite sex, Interaction, Communication', meaning: '桃花，主社交、異性互動。人際吸引力增強，宜真誠交往、避免遊戲心態。', image: 'assets/cards/tierC/tian-yao.png' },
    { id: 'c06', name: '封誥', theme: '庇蔭', themeEn: 'Patronize', rank: 9, suit: 'heart', element: '土', fortune: '佑', keywords: '肯定、受獎、酬庸', keywordsEn: 'Affirmation, Award, Reward', meaning: '封誥星，主肯定、受獎與庇蔭。努力可能被看見，宜謙遜接受肯定與回報。', image: 'assets/cards/tierC/feng-gao.png' },
    { id: 'c07', name: '紅鸞', theme: '喜悅', themeEn: 'Joy', rank: 7, suit: 'heart', element: '土', fortune: '桃', keywords: '感情交往、正緣', keywordsEn: 'Relationship, Main fate', meaning: '桃花喜星，主感情、喜悅與正緣。姻緣、慶事機會增加，宜敞開心懷。', image: 'assets/cards/tierC/hong-luan.png' },
    { id: 'c08', name: '陰煞', theme: '被害', themeEn: 'Victim', rank: 'JOKER', suit: 'joker', element: '火', fortune: '耗', keywords: '小人、阻礙、不順', keywordsEn: 'A base person, Obstacle, Trouble', meaning: '陰煞，主小人、暗阻與不順。宜提高警覺、少言慎行，避免被暗中拖累。', image: 'assets/cards/tierC/yin-sha.png' },
    { id: 'c09', name: '喜神', theme: '對的', themeEn: 'Right', rank: 3, suit: 'heart', element: '金', fortune: '佑', keywords: '好事臨門、愉悅', keywordsEn: 'Good things come, Happy', meaning: '喜神，主好事臨門、愉悅順遂。小確幸易出現，宜把握當下、分享喜悅。', image: 'assets/cards/tierC/xi-shen.png' },
    { id: 'c10', name: '蜚廉', theme: '不定', themeEn: 'Undecided', rank: 'JOKER', suit: 'joker', element: '金', fortune: '耗', keywords: '爭執、爭議、雙面', keywordsEn: 'Dispute, Controversy, Two-Face', meaning: '蜚廉，主是非、爭議與雙面性。口舌與傳言可能增多，宜就事論事、避免站隊。', image: 'assets/cards/tierC/fei-lian.png' },
    { id: 'c11', name: '破碎', theme: '沒了', themeEn: 'Broken', rank: 9, suit: 'diamond', element: '金', fortune: '耗', keywords: '好夢、醒、沒指望', keywordsEn: 'Good dream, Wake up, Hopeless', meaning: '破碎，主幻夢醒來、期待落空。不宜過度執著舊有想像，宜接受現實、重新開始。', image: 'assets/cards/tierC/po-sui.png' },
    { id: 'c12', name: '華蓋', theme: '背景', themeEn: 'Forces behind', rank: 9, suit: 'club', element: '木', fortune: '佑', keywords: '朝中有人、保護', keywordsEn: 'With background, Protect', meaning: '華蓋，主背景、保護與孤高。或有靠山庇護，亦可能偏孤獨、走專業路線。', image: 'assets/cards/tierC/hua-gai.png' },
  ],

  mutagen: [
    { id: 'h01', name: '化祿', theme: '好事', themeEn: 'Positive', rank: 3, suit: 'spade', element: '木', fortune: '化', keywords: '圓滿、財富、佳況', keywordsEn: 'Fulfillment, Wealth, Prosperity', variant: 'lu', meaning: '四化祿，主圓滿、財富與順遂。所問之事偏向有收穫、有成果，宜把握機會。', image: 'assets/cards/mutagen/hua-lu.png' },
    { id: 'h02', name: '化權', theme: '逾越', themeEn: 'Exceed', rank: 4, suit: 'spade', element: '金', fortune: '化', keywords: '明顯、更多、嚴厲', keywordsEn: 'Obvious, More, Severe', variant: 'quan', meaning: '四化權，主權力、主導與加重。局面將更明顯地傾向承擔與決斷，力度會提升。', image: 'assets/cards/mutagen/hua-quan.png' },
    { id: 'h03', name: '化科', theme: '加成', themeEn: 'Boost', rank: 5, suit: 'spade', element: '水', fortune: '化', keywords: '獲得、實至名歸', keywordsEn: 'Get, Well deserved', variant: 'ke', meaning: '四化科，主名望、認可與實至名歸。利於考試、曝光、建立口碑，宜穩步累積。', image: 'assets/cards/mutagen/hua-ke.png' },
    { id: 'h04', name: '化忌', theme: '不通', themeEn: 'Blockage', rank: 6, suit: 'diamond', element: '火', fortune: '化', keywords: '阻礙、不順困難', keywordsEn: 'Hindrance, Difficulty', variant: 'ji', meaning: '四化忌，主阻礙、不順與卡關。進展可能受挫，宜預留轉圜、避免硬推。', image: 'assets/cards/mutagen/hua-ji.png' },
    { id: 'h05', name: '空牌', theme: '空', themeEn: 'Void', rank: 2, suit: 'spade', element: '', fortune: '', keywords: '', keywordsEn: '', variant: 'void', meaning: '空牌，象徵留白、未定與無形。答案尚未成形，與其強求不如靜觀，等待下一個訊號。', image: 'assets/cards/mutagen/void.png' },
  ],
};
