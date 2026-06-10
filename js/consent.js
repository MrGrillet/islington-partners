(function () {
  var CONSENT_KEY = 'ip_cookie_consent';
  var GA_ID = 'G-KGPP6931TC';
  var PIXEL_ID = '1600633044369840';

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function loadPixel() {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function loadTracking() {
    loadGA();
    loadPixel();
  }

  function hideBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.style.display = 'none';
  }

  function showBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.style.display = '';
  }

  // If already accepted, load tracking immediately (before DOM ready)
  var stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted') {
    loadTracking();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var current = localStorage.getItem(CONSENT_KEY);

    // No decision yet — show the banner
    if (!current) {
      showBanner();
    }

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        hideBanner();
        if (!window.gtag) loadTracking();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'declined');
        hideBanner();
      });
    }
  });
})();
