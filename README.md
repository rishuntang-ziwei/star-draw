# 全知之眼 · 先知斗數神牌

線上抽牌軟體，共 45 張牌。

| 輪次 | 牌組 | 數量 | 方式 |
|------|------|------|------|
| 第一輪 | 主星 | 14 | 自行挑選 2 張 |
| 第二輪 | 乙級輔助星 | 14 | 洗牌抽 2 張 |
| 第三輪 | 丙級輔助星 | 12 | 洗牌抽 2 張 |
| 第四輪 | 四化 + 空牌 | 5 | 洗牌抽 1 張 |

## 本地預覽

```bash
npx http-server . -p 8080
```

瀏覽器開啟 `http://localhost:8080`

## 資源目錄

- `assets/cards/major/` — 14 張主星
- `assets/cards/tierB/` — 14 張乙級星
- `assets/cards/tierC/` — 12 張丙級星
- `assets/cards/mutagen/` — 四化 + 空牌
- `assets/ui/card-back.png` — 牌背
- `assets/ui/background.png` — 抽牌背景

## 神牌解讀

翻完七張牌後會自動生成簡易解讀（每張牌一段＋綜合），**不需 API Key**，使用內建解讀引擎：

- 可選填問題，解讀會依工作／感情／財務等主題調整語氣
- 主星、乙級、丙級、四化各有不同解讀角度

若日後有 OpenAI API，可選用 `server/` 部署後端並設定 `window.INTERPRET_API`。

## 修改牌組

編輯 `js/cards.js` 中的 `DECK` 物件。

