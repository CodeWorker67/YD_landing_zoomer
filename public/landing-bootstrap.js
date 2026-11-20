(function () {
  var cfg = document.getElementById('landing-shell-config');
  if (!cfg) return;

  var authBase = (cfg.dataset.authUrl || '').trim();
  var authStart = cfg.dataset.authStart || '';
  var yandexId = Number(cfg.dataset.yandexId || 0);

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

  var path = location.pathname;
  if (path !== '/' && path !== '') {
    var shell = document.getElementById('landing-shell');
    if (shell) shell.remove();
    var shellStyle = document.getElementById('landing-shell-style');
    if (shellStyle) shellStyle.remove();
    return;
  }

  applyLinks(buildEarlyAuthUrl(null));

  function attachClientId() {
    if (!yandexId || typeof ym !== 'function') return;
    try {
      ym(yandexId, 'getClientID', function (id) {
        if (id) applyLinks(buildEarlyAuthUrl(id));
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