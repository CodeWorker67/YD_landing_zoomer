const YANDEX_METRIKA_ID =
  Number(import.meta.env.VITE_YANDEX_METRIKA_ID) || 113482931;

export function buildAuthUrl(base, clientId) {
  try {
    const url = new URL(base);
    url.searchParams.set('start', 'happ_lab');
    if (clientId) {
      url.searchParams.set('ClientIDYandex', clientId);
    }
    return url.href;
  } catch {
    return base;
  }
}

export function buildSupportUrl(base, clientId) {
  try {
    const url = new URL(base);
    if (clientId) {
      url.searchParams.set('start', `YDhapp_lab_${clientId}`);
    }
    return url.href;
  } catch {
    return base;
  }
}

let clientIdPromise = null;

/** ClientID посетителя из счётчика Яндекс.Метрики. */
export function getYandexClientId(timeoutMs = 5000) {
  if (clientIdPromise) {
    return clientIdPromise;
  }

  clientIdPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    let settled = false;
    const finish = (id) => {
      if (settled) return;
      settled = true;
      resolve(id);
    };

    const timer = window.setTimeout(() => finish(null), timeoutMs);
    const ym = window.ym;

    if (typeof ym !== 'function') {
      window.clearTimeout(timer);
      finish(null);
      return;
    }

    try {
      ym(YANDEX_METRIKA_ID, 'getClientID', (clientId) => {
        window.clearTimeout(timer);
        finish(clientId || null);
      });
    } catch {
      window.clearTimeout(timer);
      finish(null);
    }
  });

  return clientIdPromise;
}
