const { Readable } = require('node:stream');
const { SnapSaver } = require('snapsaver-downloader');

const SOURCE_URL = 'https://www.facebook.com/reel/25081491734853486';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

function absoluteUrl(value, base = 'https://snapsave.app') {
  if (!value || typeof value !== 'string') return null;
  const cleaned = value.replace(/&amp;/g, '&').replace(/\\\//g, '/').trim();
  try { return new URL(cleaned, base).href; } catch { return null; }
}

function decodeEscaped(value) {
  if (!value || typeof value !== 'string') return null;
  try {
    return JSON.parse(`"${value.replace(/"/g, '\\"')}"`)
      .replace(/\\u0025/g, '%')
      .replace(/\\u0026/g, '&')
      .replace(/\\u003d/g, '=')
      .replace(/\\\//g, '/');
  } catch {
    return value
      .replace(/\\u0025/g, '%')
      .replace(/\\u0026/g, '&')
      .replace(/\\u003d/g, '=')
      .replace(/\\\//g, '/');
  }
}

function qualityScore(item) {
  const text = `${item.resolution || ''} ${item.url || ''}`.toLowerCase();
  let score = 0;
  const number = Number((text.match(/(2160|1440|1080|720|480|360|240)/) || [])[1] || 0);
  score += number;
  if (/hd|high/.test(text)) score += 100;
  if (/sd|normal/.test(text)) score += 20;
  if (item.shouldRender) score -= 5000;
  if (/\.mp4(?:\?|$)/.test(text)) score += 80;
  if (/audio|\.m4a|\.mp3/.test(text)) score += 50;
  return score;
}

async function resolveWithSnapSave() {
  const result = await SnapSaver(SOURCE_URL);
  if (!result || !result.success || !result.data || !Array.isArray(result.data.media)) {
    throw new Error(result && result.message ? result.message : 'SnapSave returned no media');
  }
  const media = result.data.media
    .filter((item) => item && item.url && item.type !== 'image')
    .map((item) => ({ ...item, url: absoluteUrl(item.url) }))
    .filter((item) => item.url)
    .sort((a, b) => qualityScore(b) - qualityScore(a));
  if (!media.length) throw new Error('SnapSave returned no usable video URL');
  return { provider: 'snapsave', candidates: media };
}

async function resolveWithFacebookHtml() {
  const variants = [
    SOURCE_URL,
    'https://www.facebook.com/watch/?v=25081491734853486',
    'https://m.facebook.com/reel/25081491734853486',
    `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(SOURCE_URL)}&show_text=0&width=560`,
  ];
  const patterns = [
    /"browser_native_hd_url":"([^"]+)"/g,
    /"browser_native_sd_url":"([^"]+)"/g,
    /"playable_url_quality_hd":"([^"]+)"/g,
    /"playable_url":"([^"]+)"/g,
    /"hd_src":"([^"]+)"/g,
    /"sd_src":"([^"]+)"/g,
    /"video_url":"([^"]+)"/g,
  ];
  const found = [];
  for (const pageUrl of variants) {
    const response = await fetch(pageUrl, {
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'es-MX,es;q=0.9,en;q=0.6',
      },
    });
    const html = await response.text();
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      for (const match of html.matchAll(pattern)) {
        const decoded = absoluteUrl(decodeEscaped(match[1]), pageUrl);
        if (decoded && !found.includes(decoded)) found.push(decoded);
      }
    }
  }
  if (!found.length) throw new Error('Facebook HTML exposed no progressive media URL');
  return {
    provider: 'facebook-html',
    candidates: found.map((url, index) => ({ url, resolution: index === 0 ? 'best' : '' })),
  };
}

async function resolveWithVkr() {
  const endpoint = new URL('https://vkrdownloader.org/server/');
  endpoint.searchParams.set('api_key', 'vkrdownloader');
  endpoint.searchParams.set('vkr', SOURCE_URL);
  const response = await fetch(endpoint, {
    headers: { 'user-agent': USER_AGENT, referer: 'https://vkrdownloader.org/' },
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`VKR HTTP ${response.status}`);
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  const urls = [];
  const walk = (value) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (value && typeof value === 'object') return Object.values(value).forEach(walk);
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      const url = absoluteUrl(value, endpoint.href);
      if (url && !urls.includes(url)) urls.push(url);
    }
  };
  walk(data);
  const textUrls = text.match(/https?:\\?\/\\?\/[^"'<>\\s]+/g) || [];
  for (const raw of textUrls) {
    const url = absoluteUrl(decodeEscaped(raw), endpoint.href);
    if (url && !urls.includes(url)) urls.push(url);
  }
  const filtered = urls.filter((url) => !/\.(?:jpe?g|png|webp)(?:\?|$)/i.test(url));
  if (!filtered.length) throw new Error('VKR returned no media URL');
  return { provider: 'vkr', candidates: filtered.map((url) => ({ url, resolution: '' })) };
}

async function resolveCandidates() {
  const errors = [];
  const methods = [resolveWithSnapSave, resolveWithFacebookHtml, resolveWithVkr];
  for (const method of methods) {
    try {
      const result = await method();
      if (result && result.candidates && result.candidates.length) return { ...result, errors };
    } catch (error) {
      errors.push(`${method.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(errors.join(' | ') || 'No resolver returned media');
}

async function chooseReachable(candidates) {
  const errors = [];
  for (const item of candidates) {
    try {
      const response = await fetch(item.url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'user-agent': USER_AGENT,
          referer: 'https://www.facebook.com/',
          range: 'bytes=0-65535',
        },
      });
      const type = response.headers.get('content-type') || '';
      const finalUrl = response.url || item.url;
      if (response.body) {
        try { await response.body.cancel(); } catch {}
      }
      if (response.ok || response.status === 206) {
        if (/video|audio|octet-stream/i.test(type) || /\.(?:mp4|m4a|mp3|webm)(?:\?|$)/i.test(finalUrl)) {
          return { ...item, url: finalUrl, contentType: type };
        }
      }
      errors.push(`${response.status} ${type} ${item.url.slice(0, 180)}`);
    } catch (error) {
      errors.push(`${error instanceof Error ? error.message : String(error)} ${item.url.slice(0, 180)}`);
    }
  }
  throw new Error(`No reachable media candidate: ${errors.join(' | ')}`);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const resolved = await resolveCandidates();
    const chosen = await chooseReachable(resolved.candidates);
    const mode = String(req.query.mode || 'json');

    if (mode === 'redirect') {
      res.statusCode = 302;
      res.setHeader('Location', chosen.url);
      return res.end();
    }

    if (mode === 'proxy') {
      const upstream = await fetch(chosen.url, {
        redirect: 'follow',
        headers: { 'user-agent': USER_AGENT, referer: 'https://www.facebook.com/' },
      });
      if (!upstream.ok || !upstream.body) throw new Error(`Upstream media HTTP ${upstream.status}`);
      res.statusCode = 200;
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'video/mp4');
      const length = upstream.headers.get('content-length');
      if (length) res.setHeader('Content-Length', length);
      res.setHeader('Content-Disposition', 'attachment; filename="Facebook_Reel_25081491734853486.mp4"');
      Readable.fromWeb(upstream.body).pipe(res);
      return;
    }

    return res.status(200).json({
      ok: true,
      source: SOURCE_URL,
      provider: resolved.provider,
      chosen,
      candidates: resolved.candidates,
      priorErrors: resolved.errors,
      proxy: '/api/resolve?mode=proxy',
      redirect: '/api/resolve?mode=redirect',
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
