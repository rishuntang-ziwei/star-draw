import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3002;
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://rishuntang-ziwei.github.io,http://localhost:8080,http://127.0.0.1:8080')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ai: Boolean(apiKey) });
});

app.post('/api/interpret', async (req, res) => {
  if (!apiKey) {
    res.status(503).json({ error: 'OPENAI_API_KEY not configured' });
    return;
  }

  const { question = '', cards = [] } = req.body || {};
  if (!Array.isArray(cards) || !cards.length) {
    res.status(400).json({ error: 'cards required' });
    return;
  }

  const cardList = cards
    .map((c, i) => `${i + 1}. ${c.roundLabel || ''} ${c.name}（${c.theme || ''}）關鍵：${c.keywords || ''}`)
    .join('\n');

  const prompt = `你是紫微斗數神牌解讀師，語氣溫和、簡潔、具體。
用戶問題：${question || '（未提供，做一般解讀）'}

抽到的牌：
${cardList}

請輸出 JSON，格式：
{
  "cards": [{ "name": "牌名", "brief": "20-45字，結合問題的簡易敘述" }],
  "synthesis": "80-120字整體綜合，結尾保守，不加嚇人斷語"
}
只輸出 JSON，不要 markdown。`;

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: '你是專業但保守的占卜解讀助手，只輸出合法 JSON。' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!aiRes.ok) {
      const err = await aiRes.text();
      res.status(502).json({ error: 'OpenAI request failed', detail: err.slice(0, 200) });
      return;
    }

    const payload = await aiRes.json();
    const text = payload.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(text);

    if (!parsed.cards?.length || !parsed.synthesis) {
      res.status(502).json({ error: 'Invalid AI response' });
      return;
    }

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'interpret failed' });
  }
});

app.listen(port, () => {
  console.log(`star-draw-api listening on ${port}`);
});
