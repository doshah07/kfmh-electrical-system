(() => {
  let queued = false;

  const isArabic = () => (document.documentElement.lang || 'ar').startsWith('ar');
  const tr = (ar, en) => isArabic() ? ar : en;
  const text = value => value ? (isArabic() ? value.ar : value.en) : '';
  const esc = (value='') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const current = () => (location.hash || '#/home').replace(/^#\//, '').split('?')[0].split('/')[0];

  function generatorStatus(item) {
    if (item.status === 'confirmed') return `<span class="tag ok">${tr('معتمد','Confirmed')}</span>`;
    return `<span class="tag partial">${tr('جزئي','Partial')}</span>`;
  }

  function renderGenerators(root, data) {
    const items = data.items;
    root.classList.add('support-rendered');
    root.innerHTML = `
      <div class="breadcrumbs"><a href="#/home">${tr('الرئيسية','Home')}</a> / <span>${esc(text(data.title))}</span></div>
      <div class="page-head">
        <div><h1>${esc(text(data.title))}</h1><p>${esc(text(data.scopeNote))}</p></div>
      </div>
      <div class="support-summary">
        <div class="card"><strong>3</strong><span>${tr('مولدات مسجلة','Registered Generators')}</span></div>
        <div class="card"><strong>2 × 1250</strong><span>kVA — GEN-1 / GEN-2</span></div>
        <div class="card"><strong>TR2 / TR3</strong><span>${tr('ربط المولدين 1 و2','GEN-1 & GEN-2 Association')}</span></div>
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
      <div class="generator-grid">
        ${items.map(item => `
          <article class="card generator-card">
            <div class="generator-icon">${esc(item.id.replace('GEN-','G'))}</div>
            <div class="status-line"><h2>${esc(text(item.name))}</h2>${generatorStatus(item)}</div>
            <div class="kv">
              <div class="key">ID</div><div>${esc(item.id)}</div>
              <div class="key">${tr('الشركة','Manufacturer')}</div><div>${esc(item.manufacturer || tr('قيد التوثيق','Pending'))}</div>
              <div class="key">${tr('القدرة','Rating')}</div><div>${item.ratingKva ? `${item.ratingKva} kVA` : tr('قيد التوثيق','Pending')}</div>
              <div class="key">${tr('الربط','Association')}</div><div>${esc(text(item.association))}</div>
              <div class="key">${tr('التوصيل','Connection')}</div><div>${esc(text(item.connection))}</div>
            </div>
          </article>`).join('')}
      </div>
      <div class="project-credit-inline">${tr('إعداد المشروع الفني/ عبدالله عسيري','Technical Project Preparation / Abdullah Asiri')}</div>`;
  }

  function renderUps(root, data) {
    const bank = data.batteryBank;
    const faulty = new Set(bank.confirmedFaulty);
    root.classList.add('support-rendered');
    root.innerHTML = `
      <div class="breadcrumbs"><a href="#/home">${tr('الرئيسية','Home')}</a> / <span>${esc(text(data.title))}</span></div>
      <div class="page-head">
        <div><h1>${esc(text(data.title))}</h1><p>${tr('سجل بنك البطاريات والحالة المؤكدة لكل رقم.','Battery bank register and confirmed status by battery number.')}</p></div>
      </div>
      <div class="support-summary">
        <div class="card"><strong>${esc(bank.manufacturer)}</strong><span>${tr('الشركة المصنعة','Manufacturer')}</span></div>
        <div class="card"><strong>${bank.quantity}</strong><span>${tr('إجمالي البطاريات','Total Batteries')}</span></div>
        <div class="card"><strong>01–44</strong><span>${tr('نطاق الترقيم','Numbering Range')}</span></div>
        <div class="card"><strong style="color:#9f1d18">13</strong><span>${tr('بطارية عطلانة','Faulty Battery')}</span></div>
      </div>
      <section class="card battery-bank">
        <div class="panel-top">
          <div><h2>${tr('بنك بطاريات SHOTO','SHOTO Battery Bank')}</h2><p>${esc(text(bank.physicalArrangement))}</p></div>
          <span class="tag partial">${tr('يوجد عطل مسجل','Recorded Fault')}</span>
        </div>
        <div class="fault-banner">⚠ ${tr('البطارية رقم 13 عطلانة — يجب إبقاؤها ظاهرة بوضوح في سجل الصيانة والفحص.','Battery 13 is FAULTY — keep it clearly flagged in maintenance and inspection records.')}</div>
        <div class="battery-grid">
          ${bank.batteries.map(battery => `
            <div class="battery-cell ${faulty.has(battery.number) ? 'faulty' : ''}" title="${esc(text(battery.note))}">
              <strong>#${String(battery.number).padStart(2,'0')}</strong>
              <small>SHOTO</small>
              <small>${faulty.has(battery.number) ? tr('عطلان','FAULTY') : tr('مسجل','REGISTERED')}</small>
            </div>`).join('')}
        </div>
        <div class="support-note">${esc(text(bank.note))}</div>
      </section>
      <section class="card" style="margin-top:16px">
        <h2>${tr('حقول الفحص المطلوبة لاحقًا','Required Future Inspection Fields')}</h2>
        <div class="table-wrap"><table><thead><tr><th>${tr('رقم البطارية','Battery ID')}</th><th>${tr('الجهد','Voltage')}</th><th>${tr('الحرارة','Temperature')}</th><th>${tr('الحالة','Condition')}</th><th>${tr('التاريخ','Date')}</th></tr></thead><tbody><tr><td>#13</td><td>${tr('يُقاس ميدانيًا','Field measurement')}</td><td>${tr('تُقاس ميدانيًا','Field measurement')}</td><td><b style="color:#9f1d18">${tr('عطلان','FAULTY')}</b></td><td>${tr('يُسجل عند الفحص','Record on inspection')}</td></tr></tbody></table></div>
      </section>
      <div class="project-credit-inline">${tr('إعداد المشروع الفني/ عبدالله عسيري','Technical Project Preparation / Abdullah Asiri')}</div>`;
  }

  function enhance() {
    queued = false;
    const root = document.querySelector('#content');
    const support = window.KFMH_SUPPORT_DATA;
    if (!root || !support || root.classList.contains('support-rendered')) return;
    if (current() === 'generators') renderGenerators(root, support.generators);
    if (current() === 'ups') renderUps(root, support.ups);
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhance);
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('DOMContentLoaded', schedule);
  schedule();
})();
