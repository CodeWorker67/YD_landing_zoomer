const VID_KEY = 'landing_ad_vid';

export function getOrCreateAdVisitorId() {
  if (typeof window === 'undefined') return '';
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('vid');
    if (fromUrl) {
      sessionStorage.setItem(VID_KEY, fromUrl);
      return fromUrl;
    }
    let vid = sessionStorage.getItem(VID_KEY);
    if (!vid) {
      vid = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      sessionStorage.setItem(VID_KEY, vid);
    }
    return vid;
  } catch {
    return '';
  }
}

function pickUtmParams() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const out = {};
  for (const key of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'etext',
    'start',
  ]) {
    const v = p.get(key);
    if (v) out[key] = v;
  }
  const stamp = p.get('start');
  if (stamp) out.stamp = stamp;
  return out;
}

function resolveAdHitUrl() {
  const fromEnv = (import.meta.env.VITE_AD_HIT_API_URL || '').trim();
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined' && window.__AD_HIT_API_URL__) {
    return String(window.__AD_HIT_API_URL__).trim();
  }
  return '';
}

/** @param {'entry'|'metrika_id'|'main_site'} event */
export function sendLandingAdHit(event, extra = {}) {
  const apiUrl = resolveAdHitUrl();
  const visitorId = getOrCreateAdVisitorId();
  if (!apiUrl || !visitorId) return;

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent || '');
  const body = {
    event,
    visitor_id: visitorId,
    host: window.location.host,
    is_mobile: isMobile,
    ...pickUtmParams(),
    ...extra,
  };

  try {
    const blob = new Blob([JSON.stringify(body)], { type: 'text/plain;charset=UTF-8' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(apiUrl, blob);
      return;
    }
  } catch {
    /* fallback below */
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(body),
    keepalive: true,
    credentials: 'omit',
    mode: 'cors',
  }).catch(() => {});
}