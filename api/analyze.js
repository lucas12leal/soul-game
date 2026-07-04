const DEFAULT_MODEL = 'openai/gpt-5.5';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured on the server.' });
    }

    const { messages, max_tokens, temperature } = req.body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages array is required' });
    }

    const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
    const referer = process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
        : 'https://soul-game-sable.vercel.app';

    try {
        const upstream = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
                'HTTP-Referer': referer,
                'X-Title': 'Soul Game Analysis Generator'
            },
            body: JSON.stringify({
                model,
                messages,
                stream: true,
                max_tokens: max_tokens || 16000,
                temperature: temperature != null ? temperature : 0.8
            })
        });

        if (!upstream.ok) {
            const errText = await upstream.text();
            let errMsg = errText;
            try {
                const parsed = JSON.parse(errText);
                errMsg = (parsed.error && parsed.error.message) || parsed.error || errText;
            } catch (_) { /* keep raw text */ }
            return res.status(upstream.status).json({ error: errMsg });
        }

        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');

        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(decoder.decode(value, { stream: true }));
        }
        res.end();
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Upstream request failed' });
    }
}
