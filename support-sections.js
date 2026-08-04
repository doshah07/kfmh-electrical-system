(() => {
  let queued = false;

  const isArabic = () => (document.documentElement.lang || 'ar').startsWith('ar');
  const tr = (ar, en) => isArabic() ? ar : en;
  const text = value => value ? (isArabic() ? value.ar : value.en) : '';
  const esc = (value='') => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const current = () => (location.hash || '#/home').replace(/^#\//, '').split('?')[0].split('/')[0];
  const shown = value => value === null || value === undefined || value === '' ? '—' : esc(value);

  function renderGenerators(root, data) {
    const items = Array.isArray(data.items) ? data.items : [];
    root.classList.add('support-rendered');
    root.dataset.supportRoute = 'generators';
    root.innerHTML = `
      <div class="breadcrumbs"><a href="#/home">${tr('الرئيسية','Home')}</a> / <span>${esc(text(data.title))}</span></div>
      <div class="page-head">
        <div><h1>${esc(text(data.title))}</h1><p>${esc(text(data.scopeNote))}</p></div>
      </div>
      <div class="support-summary">
        <div class="card"><strong>${items.length}</strong><span>${tr('إجمالي المولدات','Total Generators')}</span></div>
        <div class="card"><strong>2 × 1250</strong><span>kVA — GEN-1 / GEN-2</span></div>
        <div class="card"><strong>TR2 / TR3</strong><span>${tr('ارتباط المولدين 1 و2','GEN-1 & GEN-2 Association')}</span></div>
        <div class="card"><strong>TR4</strong><span>${tr('المولد 3','Generator 3')}</span></div>
      </div>
      <section class="card">
        <h2>${esc(text(data.synchronizingPanel))}</h2>
        <div class="generator-schematic" dir="ltr">
          <div class="unit">GEN-2<br><small>KOHLER — 1250 kVA</small></div>
          <div class="wire">→</div>
          <div class="sync">SYNCHRONIZING<br>PANEL BOARD</div>
          <div class="wire">←</div>
          <div class="unit">GEN-1<br><small>KOHLER — 1250 kVA</small></div>
        </div>
      </section>
      <section class="card" style="margin-top:16px">
        <h2>${tr('سجل المولدات الكامل','Complete Generator Register')}</h2>
        <div class="table-wrap"><table class="support-table">
          <thead><tr>
            <th>${tr('الرقم','No.')}</th><th>${tr('منطقة المولد','Generator Area')}</th><th>${tr('المنطقة المخدومة','Area Served')}</th><th>${tr('الشركة','Manufacturer')}</th><th>${tr('الموديل','Model')}</th><th>${tr('الرقم التسلسلي','Serial Number')}</th><th>kW</th><th>kVA</th><th>V</th><th>${tr('سنة التركيب','Install Year')}</th><th>${tr('الحالة','Condition')}</th><th>${tr('الأهمية','Performance Level')}</th>
          </tr></thead>
          <tbody>${items.map(item => `
            <tr>
              <td><b>${item.number}</b></td><td>${shown(item.area)}</td><td>${shown(item.servedArea)}</td><td>${shown(item.manufacturer)}</td><td>${shown(item.model)}</td><td dir="ltr">${shown(item.serialNumber)}</td><td>${shown(item.kw)}</td><td>${shown(item.kva)}</td><td>${shown(item.voltage)}</td><td>${shown(item.installYear)}</td><td>${shown(item.condition)}</td><td>${shown(item.performanceLevel)}</td>
            </tr>`).join('')}</tbody>
        </table></div>
      </section>
      <div class="generator-grid">
        ${items.filter(item => item.explanation).map(item => `
          <article class="card generator-card">
            <div class="generator-icon">G${item.number}</div>
            <div class="status-line"><h2>${tr('المولد','Generator')} ${item.number}</h2><span class="tag ok">${tr('شرح معتمد','Confirmed Note')}</span></div>
            <div class="kv">
              <div class="key">${tr('الشركة','Manufacturer')}</div><div>${shown(item.manufacturer)}</div>
              <div class="key">${tr('القدرة','Rating')}</div><div>${shown(item.kva)} kVA</div>
              <div class="key">${tr('الشرح','Explanation')}</div><div>${esc(text(item.explanation))}</div>
            </div>
          </article>`).join('')}
      </div>
      <div class="project-credit-inline">${tr('إعداد المشروع الفني/ عبدالله عسيري','Technical Project Preparation / Abdullah Asiri')}</div>`;
  }

  function renderUps(root, data) {
    const items = Array.isArray(data.items) ? data.items : [];
    const summary = data.summary || {};
    root.classList.add('support-rendered');
    root.dataset.supportRoute = 'ups';
    root.innerHTML = `
      <div class="breadcrumbs"><a href="#/home">${tr('الرئيسية','Home')}</a> / <span>${esc(text(data.title))}</span></div>
      <div class="page-head">
        <div><h1>${esc(text(data.title))}</h1><p>${esc(text(data.note))}</p></div>
      </div>
      <div class="support-summary">
        <div class="card"><strong>${summary.total || items.length}</strong><span>${tr('إجمالي وحدات UPS','Total UPS Units')}</span></div>
        <div class="card"><strong>ABB ${summary.byMake?.ABB || 0}</strong><span>${tr('وحدات','Units')}</span></div>
        <div class="card"><strong>EATON ${summary.byMake?.EATON || 0}</strong><span>${tr('وحدات','Units')}</span></div>
        <div class="card"><strong style="color:#9f1d18">#13</strong><span>${tr('وحدة عطلانة','Faulty Unit')}</span></div>
      </div>
      <div class="fault-banner">⚠ ${tr('وحدة UPS رقم 13 عطلانة، وتم الاحتفاظ بجميع بياناتها في السجل.','UPS unit 13 is FAULTY, and all of its data remains recorded.')}</div>
      <section class="card" style="margin-top:16px">
        <h2>${tr('سجل وحدات UPS الكامل','Complete UPS Unit Register')}</h2>
        <div class="table-wrap"><table class="support-table">
          <thead><tr><th>${tr('الرقم','No.')}</th><th>MAKE</th><th>MODEL</th><th>SR. #</th><th>kVA</th><th>LOCATION</th><th>${tr('الحالة','Status')}</th></tr></thead>
          <tbody>${items.map(item => `
            <tr class="${item.status === 'faulty' ? 'faulty-row' : ''}">
              <td><b>${item.number}</b></td><td>${shown(item.make)}</td><td>${shown(item.model)}</td><td dir="ltr">${shown(item.serialNumber)}</td><td>${shown(item.kva)}</td><td>${shown(item.location)}</td><td>${item.status === 'faulty' ? `<b class="fault-text">${tr('عطلان','FAULTY')}</b>` : tr('مسجل','Registered')}</td>
            </tr>`).join('')}</tbody>
        </table></div>
      </section>
      <div class="support-note">ABB — 4 ${tr('وحدات','units')} &nbsp; | &nbsp; EATON — 10 ${tr('وحدات','units')} &nbsp; | &nbsp; SCHNEIDER — 1 ${tr('وحدة','unit')}</div>
      <div class="project-credit-inline">${tr('إعداد المشروع الفني/ عبدالله عسيري','Technical Project Preparation / Abdullah Asiri')}</div>`;
  }

  function enhance() {
    queued = false;
    const root = document.querySelector('#content');
    const support = window.KFMH_SUPPORT_DATA;
    const route = current();
    if (!root || !support) return;

    if (route !== 'generators' && route !== 'ups') {
      root.classList.remove('support-rendered');
      delete root.dataset.supportRoute;
      return;
    }
    if (root.dataset.supportRoute === route) return;
    if (route === 'generators') renderGenerators(root, support.generators);
    if (route === 'ups') renderUps(root, support.ups);
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhance);
  }

  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('DOMContentLoaded', schedule);
  schedule();
})();
