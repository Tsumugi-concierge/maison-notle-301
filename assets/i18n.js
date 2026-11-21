// Minimal shared i18n helper for 6 languages across all pages
// - Persists selection in localStorage
// - Defaults to browser language if supported, else English
// - Applies [data-i18n] text replacements
// - Wires up .lang-btn elements that have data-lang attributes

(function () {
  const SUPPORTED = ['en', 'ja', 'zh', 'ko', 'fr', 'es'];
  const STORE_KEY = 'mn301.lang';

  function detectBrowserLang() {
    try {
      const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
      const code = nav.slice(0, 2);
      return SUPPORTED.includes(code) ? code : 'en';
    } catch { return 'en'; }
  }

  function loadLang() {
    try { return localStorage.getItem(STORE_KEY) || detectBrowserLang(); }
    catch { return detectBrowserLang(); }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORE_KEY, lang); } catch {}
  }

  function getBtnLang(btn) {
    return (btn.getAttribute('data-lang') || '').toLowerCase();
  }

  function setActiveButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(b => {
      const l = getBtnLang(b);
      b.classList.toggle('active', l === lang);
    });
  }

  function applyTranslations(strings, lang) {
    if (strings && strings[lang]) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const val = strings[lang][key];
        if (typeof val === 'string') el.textContent = val;
      });
    }
    document.documentElement.lang = lang;
  }

  function wireButtons() {
    document.querySelectorAll('.lang-btn').forEach(b => {
      // Remove any inline onclick side-effects
      b.onclick = null;
      b.addEventListener('click', () => {
        const l = getBtnLang(b);
        if (!SUPPORTED.includes(l)) return;
        I18N.setLang(l);
      });
    });
  }

  window.I18N = {
    SUPPORTED,
    init(opts = {}) {
      this.strings = opts.strings || {};
      this.onChange = typeof opts.onChange === 'function' ? opts.onChange : null;
      const initial = (opts.defaultLang && SUPPORTED.includes(opts.defaultLang)) ? opts.defaultLang : loadLang();
      this.lang = initial;
      wireButtons();
      setActiveButtons(initial);
      applyTranslations(this.strings, initial);
      if (this.onChange) this.onChange(initial);
    },
    setLang(lang) {
      if (!SUPPORTED.includes(lang)) lang = 'en';
      if (this.lang === lang) return;
      this.lang = lang;
      saveLang(lang);
      setActiveButtons(lang);
      applyTranslations(this.strings, lang);
      if (this.onChange) this.onChange(lang);
    },
    getLang() { return this.lang || loadLang(); },
  };
})();
