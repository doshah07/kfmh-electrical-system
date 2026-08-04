(() => {
  let scheduled = false;
  let lastRouteKey = '';
  const isArabic = () => (document.documentElement.lang || 'ar').startsWith('ar');
  const tr = (ar, en) => isArabic() ? ar : en;
  const data = () => window.KFMH_DATA;
  const route = () => (location.hash || '#/home').replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  const routeKey = () => route().join('/') || 'home';
  const href = value => `#/${value}`;

  const sectionPages = [
    {key:'home', page:2, ar:'الصفحة الرئيسية', en:'Home', target:'home'},
    {key:'contents', page:3, ar:'الفهرس', en:'Contents', target:'home'},
    {key:'diagram', page:8, ar:'المخطط العام', en:'General Diagram', target:'diagram'},
    {key:'TR1', page:9, ar:'المحول 1', en:'Transformer 1', target:'transformer/TR1'},
    {key:'TR2', page:18, ar:'المحول 2', en:'Transformer 2', target:'transformer/TR2'},
    {key:'TR3', page:56, ar:'المحول 3', en:'Transformer 3', target:'transformer/TR3'},
    {key:'TR4', page:137, ar:'المحول 4', en:'Transformer 4', target:'transformer/TR4'},
    {key:'TR5', page:143, ar:'المحول 5', en:'Transformer 5', target:'transformer/TR5'},
    {key:'generators', page:150, ar:'المولدات', en:'Generators', target:'generators'},
    {key:'ups', page:153, ar:'UPS والبطاريات', en:'UPS & Batteries', target:'ups'},
    {key:'search', page:156, ar:'البحث', en:'Search', target:'search'},
    {key:'print', page:157, ar:'الطباعة', en:'Printing', target:'print'},
    {key:'approval', page:158, ar:'الاعتماد', en:'Approval', target:'home'}
  ];

  function currentSectionIndex() {
    const r = route();
    if (r[0] === 'transformer') return Math.max(0, sectionPages.findIndex(x => x.key === r[1]));
    const map = {home:'home', diagram:'diagram', generators:'generators', ups:'ups', search:'search', print:'print'};
    return Math.max(0, sectionPages.findIndex(x => x.key === (map[r[0]] || 'home')));
  }

  function pageNumberForRoute() {
    const r = route();
    if (r[0] === 'transformer') return sectionPages.find(x => x.key === r[1])?.page || 2;
    return sectionPages[currentSectionIndex()]?.page || 2;
  }

  function installViewerToolbar() {
    const main = document.querySelector('.main');
    const topbar = document.querySelector('.topbar');
    if (!main || !topbar) return;
    let bar = main.querySelector('.viewer-toolbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'viewer-toolbar no-print';
      topbar.insertAdjacentElement('afterend', bar);
    }
    const idx = currentSectionIndex();
    const current = sectionPages[idx];
    const prev = sectionPages[Math.max(0, idx - 1)];
    const next = sectionPages[Math.min(sectionPages.length - 1, idx + 1)];
    const signature = `${routeKey()}|${isArabic() ? 'ar' : 'en'}|${pageNumberForRoute()}`;
    if (bar.dataset.signature === signature) return;
    bar.dataset.signature = signature;
    bar.innerHTML = `
      <a class="viewer-nav-btn" href="${href(prev.target)}">‹ <span>${tr('القسم السابق','Previous section')}</span></a>
      <div class="viewer-page-meta"><strong>${pageNumberForRoute()} / 158</strong><span>${tr('صفحة المشروع','Project page')}</span></div>
      <label class="viewer-jump"><span>${tr('إلى الصفحة','Go to page')}</span><input id="viewerPageJump" type="number" min="1" max="158" value="${pageNumberForRoute()}" inputmode="numeric"><button id="viewerPageGo">${tr('انتقال','Go')}</button></label>
      <div class="viewer-zoom"><button data-viewer-zoom="out">−</button><strong id="viewerZoomValue">100%</strong><button data-viewer-zoom="in">＋</button></div>
      <a class="viewer-nav-btn viewer-next" href="${href(next.target)}"><span>${tr('القسم التالي','Next section')}</span> ›</a>`;

    bar.querySelector('#viewerPageGo')?.addEventListener('click', () => goToPage(Number(bar.querySelector('#viewerPageJump')?.value)));
    bar.querySelector('#viewerPageJump')?.addEventListener('keydown', e => { if (e.key === 'Enter') goToPage(Number(e.currentTarget.value)); });
    bar.querySelectorAll('[data-viewer-zoom]').forEach(button => button.addEventListener('click', () => {
      const root = document.documentElement;
      const old = Number(root.dataset.viewerZoom || 100);
      const value = Math.max(80, Math.min(140, old + (button.dataset.viewerZoom === 'in' ? 10 : -10)));
      root.dataset.viewerZoom = String(value);
      root.style.setProperty('--viewer-zoom', String(value / 100));
      bar.querySelector('#viewerZoomValue').textContent = `${value}%`;
    }));
  }

  function goToPage(page) {
    if (!Number.isFinite(page)) return;
    const nearest = sectionPages.reduce((best, item) => Math.abs(item.page - page) < Math.abs(best.page - page) ? item : best, sectionPages[0]);
    location.hash = `#/${nearest.target}`;
  }

  function switchgearGraphic() {
    return `<div class="switchgear-visual" aria-hidden="true">
      ${Array.from({length:8}, (_, i) => `<div class="switchgear-panel"><span class="meter"></span><span class="lamp-row"></span><span class="breaker"></span><small>${String(i + 1).padStart(2,'0')}</small></div>`).join('')}
    </div>`;
  }

  function transformerCards() {
    return data().transformers.map(item => {
      const mdp = data().mdps.find(x => x.id === item.mdpId);
      const status = item.supply === 'internal' ? tr('تغذية داخلية RMU1','Internal RMU1 supply') : tr('تغذية خارجية','External supply');
      return `<a class="prototype-transformer" href="${href(`transformer/${item.id}`)}" aria-label="${item.id}">
        <span class="prototype-tr-code">${item.id}</span>
        <strong>${isArabic() ? item.name.ar : item.name.en}</strong>
        <small>${item.ratingKva ? `${item.ratingKva} kVA · ${item.lvV || 400}V` : `${mdp?.mps.length || 0} MP`}</small>
        <span class="prototype-status ${item.supply === 'internal' ? 'internal' : 'external'}">${status}</span>
        <b>${item.id === 'TR2' || item.id === 'TR3' ? item.mdpId : `${mdp?.mps.length || 0} MP`}</b>
      </a>`;
    }).join('');
  }

  function renderProfessionalHome() {
    const content = document.querySelector('#content');
    if (!content || !data() || route()[0] !== 'home') return;
    if (content.dataset.professionalHome === '1') return;
    content.dataset.professionalHome = '1';
    content.classList.add('viewer-content');
    content.innerHTML = `
      <section class="document-stage">
        <article class="document-sheet">
          <header class="document-head">
            <div class="document-brand"><img src="hospital_logo_white.png" alt="Hospital logo"><div><b>${tr('مستشفى الملك فيصل العسكري','King Faisal Military Hospital')}</b><small>KING FAISAL MILITARY HOSPITAL</small></div></div>
            <div class="document-title"><h1>${tr('نظام إدارة توزيع الطاقة الكهربائية','Electrical Distribution Management System')}</h1><span>ELECTRICAL DISTRIBUTION MANAGEMENT SYSTEM</span></div>
            <div class="document-dept"><b>${tr('إدارة التشغيل والصيانة','Operations & Maintenance')}</b><small>Operations & Maintenance Department</small></div>
          </header>
          <div class="document-gold-line"></div>
          <section class="document-hero">
            <div class="document-copy">
              <span class="eyebrow">${tr('مرحباً بكم في','Welcome to')}</span>
              <h2>${tr('نظام إدارة توزيع الطاقة الكهربائية','Electrical Distribution Management System')}</h2>
              <p>${tr('مرجع فني شامل لمسارات التغذية والعلاقات بين المحولات ولوحات MDP واللوحات الرئيسية MP واللوحات الفرعية PP في المستشفى العسكري.','A complete technical reference for transformers, supply paths, MDP, MP and PP panels at the military hospital.')}</p>
              <div class="document-stats">
                <a href="${href('home')}"><strong>5</strong><span>TR<br>${tr('محولات','Transformers')}</span></a>
                <a href="${href('diagram')}"><strong>2</strong><span>MDP<br>${tr('لوحات رئيسية','Main DPs')}</span></a>
                <a href="${href('transformer/TR2')}"><strong>37</strong><span>MP<br>${tr('لوحة رئيسية','Main Panels')}</span></a>
                <a href="${href('search')}"><strong>93</strong><span>PP<br>${tr('لوحة قدرة','Power Panels')}</span></a>
              </div>
            </div>
            <div class="document-visual">${switchgearGraphic()}<span>${tr('لوحات التوزيع الكهربائية بالمستشفى','Hospital electrical distribution panels')}</span></div>
          </section>
          <section class="document-transformers">
            <div class="document-section-title"><h3>${tr('المحولات الرئيسية','Main Transformers')}</h3><span>MAIN TRANSFORMERS</span></div>
            <div class="prototype-transformer-grid">${transformerCards()}</div>
          </section>
          <footer class="document-foot"><span>⚠ ${tr('جميع البيانات سرية وللاستخدام الداخلي فقط','CONFIDENTIAL — INTERNAL USE ONLY')}</span><b>${tr('الصفحة','PAGE')} 2 / 158</b></footer>
        </article>
      </section>
      ${buildThumbnailRail()}
      ${buildFloatingTools()}`;
  }

  function buildThumbnailRail() {
    return `<nav class="thumbnail-rail no-print" aria-label="${tr('أقسام المشروع','Project sections')}">
      ${sectionPages.map((item, index) => `<a href="${href(item.target)}" class="thumbnail-item ${index === currentSectionIndex() ? 'active' : ''}"><span class="thumbnail-preview"><i>${item.key === 'home' ? '⌂' : item.key.startsWith('TR') ? item.key : item.key === 'diagram' ? '⌁' : item.key === 'generators' ? '⚡' : item.key === 'ups' ? 'UPS' : item.page}</i></span><b>${item.page}</b><small>${isArabic() ? item.ar : item.en}</small></a>`).join('')}
    </nav>`;
  }

  function buildFloatingTools() {
    return `<aside class="floating-tools no-print">
      <a href="${href('search')}" title="${tr('بحث','Search')}">⌕<span>${tr('بحث','Search')}</span></a>
      <button type="button" data-tool="favorite">☆<span>${tr('مفضلة','Favorite')}</span></button>
      <button type="button" data-tool="notes">▤<span>${tr('ملاحظات','Notes')}</span></button>
      <a href="${href('print')}" title="${tr('طباعة','Print')}">⌑<span>${tr('طباعة','Print')}</span></a>
      <button type="button" data-tool="top">↑<span>${tr('أعلى','Top')}</span></button>
    </aside>`;
  }

  function bindFloatingTools() {
    document.querySelector('[data-tool="top"]')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    document.querySelector('[data-tool="favorite"]')?.addEventListener('click', e => e.currentTarget.classList.toggle('active'));
    document.querySelector('[data-tool="notes"]')?.addEventListener('click', () => alert(tr('سيتم تفعيل الملاحظات في المرحلة التالية.','Notes will be enabled in the next phase.')));
  }

  function polishStandardPages() {
    const content = document.querySelector('#content');
    if (!content || route()[0] === 'home') return;
    content.classList.add('viewer-content', 'standard-document-page');
    if (!content.querySelector('.thumbnail-rail')) content.insertAdjacentHTML('beforeend', buildThumbnailRail());
    if (!content.querySelector('.floating-tools')) content.insertAdjacentHTML('beforeend', buildFloatingTools());
  }

  function enhance() {
    scheduled = false;
    const key = routeKey();
    installViewerToolbar();
    if (route()[0] === 'home') renderProfessionalHome();
    else polishStandardPages();
    bindFloatingTools();
    lastRouteKey = key;
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhance);
  }

  new MutationObserver(schedule).observe(document.documentElement, {childList:true, subtree:true});
  window.addEventListener('hashchange', schedule);
  window.addEventListener('DOMContentLoaded', schedule);
})();
