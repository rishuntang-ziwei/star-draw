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

## AI 解讀（選用）

翻完七張牌後會顯示簡易解讀。預設使用內建模板；若要像 Taroscope 一樣用 OpenAI 生成：

1. 在 Render 部署 `server/`（設定 `OPENAI_API_KEY`）
2. 於 `index.html` 設定 `window.INTERPRET_API = 'https://你的-api.onrender.com'`

本地測試 API：

```bash
cd server && npm install && OPENAI_API_KEY=sk-... npm start
```

