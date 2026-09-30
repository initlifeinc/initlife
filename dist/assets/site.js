(() => {
  const isErrorPage = Boolean(document.querySelector('[data-error-title]'));
  let savedLanguage = '';
  try { savedLanguage = localStorage.getItem('initlife-language') || ''; } catch (_) {}
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en') ||
    (isErrorPage && (location.pathname.startsWith('/en/') || savedLanguage === 'en'));
  if (isErrorPage && isEnglish) {
    document.documentElement.lang = 'en';
    document.title = 'Page not found — InitLife';
    document.querySelector('[data-error-title]').textContent = 'This page could not be found.';
    document.querySelector('[data-error-copy]').textContent = 'The address may be incorrect, or the page may have moved.';
    document.querySelector('[data-error-home]').textContent = 'Back to home →';
    document.querySelector('[data-error-home]').href = '/en/';
    document.querySelector('[data-error-footer]').textContent = '© 2026 InitLife · A personal digital life journal';
  }
  const home = isEnglish ? '/en/' : '/';
  const copy = isEnglish
    ? { home: 'InitLife home', nav: 'Main navigation', about: 'About', notes: 'Journal', language: 'Language' }
    : { home: 'InitLife 首页', nav: '主导航', about: '关于', notes: '记录', language: '语言' };

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `<div class="wrap header-inner"><a class="brand" href="${home}" aria-label="${copy.home}">InitLife<span>${isEnglish ? 'Reimagining digital life with AI' : '用AI重构个人数字生活'}</span></a><nav aria-label="${copy.nav}"><a href="${home}#about">${copy.about}</a><a href="${home}#notes">${copy.notes}</a><label class="language-select"><span class="sr-only">${copy.language}</span><select data-language-select aria-label="${copy.language}"><option value="zh">简体中文</option><option value="en">English</option></select></label></nav></div>`;
  }

  const languageSelect = document.querySelector('[data-language-select]');
  if (languageSelect) {
    languageSelect.value = isEnglish ? 'en' : 'zh';
    languageSelect.addEventListener('change', () => {
      try { localStorage.setItem('initlife-language', languageSelect.value); } catch (_) {}
      const target = languageSelect.value === 'en' ? '/en/' : '/';
      const hash = ['#about', '#notes'].includes(location.hash) ? location.hash : '';
      location.assign(target + hash);
    });
  }
})();
