const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

export function ensureHttpsBase(base) {
  if (!base) return base;
  try {
    const url = new URL(base);
    if (url.protocol === 'http:' && !LOCAL_HOSTS.has(url.hostname)) {
      url.protocol = 'https:';
    }
    return url.href;
  } catch {
    return base.replace(/^http:\/\/(?!localhost(?:\:\d+)?|127\.0\.0\.1(?:\:\d+)?)/i, 'https://');
  }
}

/** Копирует query-параметры с текущей страницы лендинга в целевой URL. */
export function mergeLandingQueryIntoUrl(url) {
  if (typeof window === 'undefined') return url;
  const landing = new URLSearchParams(window.location.search);
  landing.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  return url;
}