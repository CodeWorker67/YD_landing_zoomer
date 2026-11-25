(function () {
  var cfg = document.getElementById('landing-shell-config');
  if (!cfg) return;

  var authBase = (cfg.dataset.authUrl || '').trim();
  var authStart = cfg.dataset.authStart || '';
  var yandexId = Number(cfg.dataset.yandexId || 0);
  var adHitApi = (cfg.dataset.adHitApi || '').trim();
  var VID_KEY = 'landing_ad_vid';
  var metrikaSent = false;

  function toHttpsBase(base) {
    try {
      var url = new URL(base);
      if (url.protocol === 'http:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
        url.protocol = 'https:';
      }
      return url.href;
    } catch (e) {
      return base.replace(/^http:\/\/(?!localhost|127\.0\.0\.1)/i, 'https://');
    }
  }

  authBase = toHttpsBase(authBase);

  function getOrCreateVid() {
    try {
      var fromUrl = new URLSearchParams(location.search).get('vid');
      if (fromUrl) {
        sessionStorage.setItem(VID_KEY, fromUrl);
        return fromUrl;
      }
      var vid = sessionStorage.getItem(VID_KEY);
      if (!vid) {
        vid = typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + '-' + Math.random().toString(16).slice(2);
        sessionStorage.setItem(VID_KEY, vid);
      }
      return vid;
    } catch (e) {
      return '';
    }
  }

  function pickUtm() {
    var out = {};
    var p = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'etext'].forEach(function (k) {
      var v = p.get(k);
      if (v) out[k] = v;
    });
    if (authStart) out.stamp = authStart;
    return out;
  }

  function sendAdHit(event, extra) {
    var vid = getOrCreateVid();
    if (!adHitApi || !vid) return;
    var payload = Object.assign(
      {
        event: event,
        visitor_id: vid,
        host: location.host,
        is_mobile: /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent || ''),
      },
      pickUtm(),
      extra || {},
    );
    try {
      var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(adHitApi, blob);
        return;
      }
    } catch (e) {}
    fetch(adHitApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: 'omit',
      mode: 'cors',
    }).catch(function () {});
  }

  function buildEarlyAuthUrl(clientId) {
    try {
      var url = new URL(authBase);
      if (url.protocol === 'http:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
        url.protocol = 'https:';
      }
      new URLSearchParams(location.search).forEach(function (v, k) {
        url.searchParams.set(k, v);
      });
      if (authStart) url.searchParams.set('start', authStart);
      var vid = getOrCreateVid();
      if (vid) url.searchParams.set('vid', vid);
      if (clientId) url.searchParams.set('ClientIDYandex', clientId);
      return url.href;
    } catch (e) {
      return authBase;
    }
  }

  function applyLinks(href) {
    document.querySelectorAll('[data-landing-cta]').forEach(function (a) {
      a.href = href;
    });
  }

  function sendMetrikaHit(clientId) {
    if (metrikaSent) return;
    metrikaSent = true;
    var extra = {};
    if (clientId) extra.yandex_client_id = clientId;
    sendAdHit('metrika_id', extra);
  }

  var path = location.pathname;
  if (path !== '/' && path !== '') {
    var shell = document.getElementById('landing-shell');
    if (shell) shell.remove();
    var shellStyle = document.getElementById('landing-shell-style');
    if (shellStyle) shellStyle.remove();
    return;
  }

  sendAdHit('entry', {});
  applyLinks(buildEarlyAuthUrl(null));

  setTimeout(function () {
    sendMetrikaHit(null);
  }, 5500);

  function attachClientId() {
    if (!yandexId || typeof ym !== 'function') return;
    try {
      ym(yandexId, 'getClientID', function (id) {
        if (id) {
          applyLinks(buildEarlyAuthUrl(id));
          sendMetrikaHit(id);
        }
      });
    } catch (e) {}
  }

  if (typeof ym === 'function') {
    attachClientId();
  } else {
    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      if (typeof ym === 'function') {
        clearInterval(timer);
        attachClientId();
      } else if (attempts > 100) {
        clearInterval(timer);
      }
    }, 50);
  }
})();