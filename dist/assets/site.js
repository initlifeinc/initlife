(() => {
  const sharedHeader = document.querySelector('[data-site-header]');
  if (sharedHeader) sharedHeader.innerHTML = `<div class="shell nav-wrap"><a class="brand" href="index.html" aria-label="initlife 首页"><span class="brand-mark" aria-hidden="true">i</span><span>initlife</span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button><span class="sr-only">打开导航</span><span></span><span></span></button><nav id="site-nav" class="site-nav" aria-label="主导航" data-menu><details class="product-menu"><summary><span data-i18n="navProducts">产品</span><span class="product-arrow" aria-hidden="true"></span></summary><div class="product-popover"><a href="index.html#secretbankx"><img src="assets/apps/secretbankx.jpg" alt=""><span><strong>SecretBankX</strong><small>重要资料管理</small></span></a><a href="index.html#secretbank"><img src="assets/apps/secretbank.jpg" alt=""><span><strong>SecretBank</strong><small>个人信息管理</small></span></a><a href="index.html#duhuixiu"><img src="assets/apps/duhuixiu.jpg" alt=""><span><strong>嘟惠修</strong><small>打印机与电脑维修服务</small></span></a></div></details><a href="index.html#studio" data-i18n="navAbout">关于</a><a href="blog.html">Blog</a><label class="language-select"><span class="sr-only">选择语言</span><select data-lang-select aria-label="选择语言"><option value="zh">简体中文</option><option value="en">English</option></select></label><a class="nav-contact" href="mailto:initlifeltd@gmail.com" data-i18n="contact">联系我们</a></nav></div>`;
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
      carouselX: '重要资料，安心保存', carouselSecret: '简单可靠的信息管理', carouselRepair: '打印机与电脑维修服务',
      learnX: '了解 SecretBankX', followTitle: '与我们保持联系。', followCopy: '了解产品更新、设计思考，也欢迎提出建议。',
      blogCopy: '文章与开发手记',
      blogTitle: '关于产品、隐私，<br><span>以及长期主义。</span>',
      blogIntro: '记录产品背后的选择、开发过程中的思考，以及我们如何把复杂问题做得更简单。',
      productThinking: '产品思考', postTitle: '为什么 SecretBankX 坚持本地优先',
      postExcerpt: '密码与重要资料不应该先离开你的设备，再被承诺“我们会保护它”。从数据边界出发，谈谈 SecretBankX 的设计选择。',
      readArticle: '阅读全文 →', updatesLabel: '持续记录', updatesStatus: '产品随时在变', nextPost: '更多产品笔记，会跟着真实进展慢慢写下。', nextPostCopy: '这里用于沉淀已经发生的产品选择、设计取舍与开发经验，而不是预告尚未确认的功能。', backHome: '返回首页 →'
    },
    en: {
      navProducts: 'Products', navAbout: 'About', contact: 'Contact', explore: 'Explore our apps',
      heroTitle: 'Good software,<br><span>made for everyday life.</span>',
      heroLede: 'We make simple, dependable, privacy-minded apps. Every product begins with a real problem worth solving.',
      carouselX: 'Keep important information safe', carouselSecret: 'Simple, dependable information management', carouselRepair: 'Printer and computer repair services',
      learnX: 'Discover SecretBankX', followTitle: 'Stay connected.', followCopy: 'Follow product updates and design notes, or share an idea with us.',
      blogCopy: 'Stories and build notes',
      blogTitle: 'On products, privacy,<br><span>and building for the long term.</span>',
      blogIntro: 'Notes on the choices behind our products, what we learn while building, and how we make complex things feel simple.',
      productThinking: 'Product thinking', postTitle: 'Why SecretBankX is local-first',
      postExcerpt: 'Passwords and important records should not leave your device first and be protected by a promise later. A look at the data boundaries behind SecretBankX.',
      readArticle: 'Read article →', updatesLabel: 'Ongoing notes', updatesStatus: 'Always evolving', nextPost: 'More product notes will follow real progress.', nextPostCopy: 'This is where we document confirmed product choices, design trade-offs, and what we learn while building—not uncommitted promises.', backHome: 'Back home →'
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
    document.querySelectorAll('[data-lang-select]').forEach((select) => {
      select.value = lang;
    });
    try { localStorage.setItem('initlife-lang', lang); } catch (_) {}
  };

  let language = 'zh';
  try { language = localStorage.getItem('initlife-lang') || 'zh'; } catch (_) {}
  applyLanguage(language);
  document.querySelectorAll('[data-lang-select]').forEach((select) => select.addEventListener('change', (event) => {
    language = event.target.value;
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
