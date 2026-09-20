(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('open', open);
  });

  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    link.closest('details')?.removeAttribute('open');
  }));

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.product-menu[open]').forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute('open');
    });
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const translations = {
    zh: {
      navProducts: '产品', navAbout: '关于', contact: '联系我们', explore: '探索产品',
      heroTitle: '让好软件，<br><span>自然融入生活。</span>',
      heroLede: '我们打造简单、可靠且尊重隐私的 App。每一个产品，都从一个真实的问题开始。',
      carouselX: '重要资料，安心保存', carouselSecret: '简单可靠的信息管理', carouselRepair: '让服务协作更顺畅',
      learnX: '了解 SecretBankX', followTitle: '与我们保持联系。', followCopy: '了解产品更新、设计思考，也欢迎提出建议。',
      githubCopy: '查看项目与更新', blogCopy: '文章与开发手记', contactCopy: '建议、支持与合作',
      blogTitle: '关于产品、隐私，<br><span>以及长期主义。</span>',
      blogIntro: '记录产品背后的选择、开发过程中的思考，以及我们如何把复杂问题做得更简单。',
      productThinking: '产品思考', postTitle: '为什么 SecretBankX 坚持本地优先',
      postExcerpt: '密码与重要资料不应该先离开你的设备，再被承诺“我们会保护它”。从数据边界出发，谈谈 SecretBankX 的设计选择。',
      readArticle: '阅读全文 →', nextPost: '下一篇正在准备中。', nextPostCopy: '我们会继续分享产品设计、跨设备体验与独立开发过程。', backHome: '返回首页 →'
    },
    en: {
      navProducts: 'Products', navAbout: 'About', contact: 'Contact', explore: 'Explore our apps',
      heroTitle: 'Good software,<br><span>made for everyday life.</span>',
      heroLede: 'We make simple, dependable, privacy-minded apps. Every product begins with a real problem worth solving.',
      carouselX: 'Keep important information safe', carouselSecret: 'Simple, dependable information management', carouselRepair: 'Smoother service collaboration',
      learnX: 'Discover SecretBankX', followTitle: 'Stay connected.', followCopy: 'Follow product updates and design notes, or share an idea with us.',
      githubCopy: 'Projects and updates', blogCopy: 'Stories and build notes', contactCopy: 'Ideas, support, and partnerships',
      blogTitle: 'On products, privacy,<br><span>and building for the long term.</span>',
      blogIntro: 'Notes on the choices behind our products, what we learn while building, and how we make complex things feel simple.',
      productThinking: 'Product thinking', postTitle: 'Why SecretBankX is local-first',
      postExcerpt: 'Passwords and important records should not leave your device first and be protected by a promise later. A look at the data boundaries behind SecretBankX.',
      readArticle: 'Read article →', nextPost: 'The next story is in progress.', nextPostCopy: 'More notes on product design, cross-device experiences, and independent development are coming.', backHome: 'Back home →'
    }
  };

  const applyLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    const pageTitle = lang === 'zh' ? document.documentElement.dataset.titleZh : document.documentElement.dataset.titleEn;
    if (pageTitle) document.title = pageTitle;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const value = translations[lang][node.dataset.i18n];
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((node) => {
      const value = translations[lang][node.dataset.i18nHtml];
      if (value) node.innerHTML = value;
    });
    document.querySelectorAll('[data-zh][data-en]').forEach((node) => {
      node.textContent = lang === 'zh' ? node.dataset.zh : node.dataset.en;
    });
    document.querySelectorAll('[data-zh-html][data-en-html]').forEach((node) => {
      node.innerHTML = lang === 'zh' ? node.dataset.zhHtml : node.dataset.enHtml;
    });
    document.querySelectorAll('[data-lang-content]').forEach((node) => {
      node.hidden = node.dataset.langContent !== lang;
    });
    document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
      button.textContent = lang === 'zh' ? 'EN' : '中文';
      button.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    });
    try { localStorage.setItem('initlife-lang', lang); } catch (_) {}
  };

  let language = 'zh';
  try { language = localStorage.getItem('initlife-lang') || 'zh'; } catch (_) {}
  applyLanguage(language);
  document.querySelectorAll('[data-lang-toggle]').forEach((button) => button.addEventListener('click', () => {
    language = document.documentElement.lang.startsWith('zh') ? 'en' : 'zh';
    applyLanguage(language);
  }));

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('[data-slide]')];
    const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
    let current = 0;
    let timer;
    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.tabIndex = active ? 0 : -1;
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    };
    const play = () => { timer = window.setInterval(() => show(current + 1), 5200); };
    const stop = () => window.clearInterval(timer);
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => { stop(); show(current - 1); play(); });
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => { stop(); show(current + 1); play(); });
    dots.forEach((dot) => dot.addEventListener('click', () => { stop(); show(Number(dot.dataset.carouselDot)); play(); }));
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', play);
    show(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
  }

})();
