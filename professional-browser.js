(() => {
  'use strict';

  const DATA = window.KFMH_DATA || { legend: [], transformers: [], mdps: [] };
  const SUPPORT = window.KFMH_SUPPORT_DATA || { generators: { items: [] }, ups: { items: [] } };
  const ADMIN_EMAIL = 'a.doshah07@gmail.com';
  const ROUTES = ['home','diagram','legend','transformer/TR1','transformer/TR2','transformer/TR3','transformer/TR4','transformer/TR5','generators','ups','approval'];

  const viewport = document.getElementById('appViewport');
  const canvas = document.getElementById('appCanvas');
  const view = document.getElementById('viewContainer');
  const quickRail = document.getElementById('quickRail');
  const toast = document.getElementById('toast');
  const searchDialog = document.getElementById('searchDialog');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const adminDialog = document.getElementById('adminDialog');
  const notesDialog = document.getElementById('notesDialog');
  const notesText = document.getElementById('notesText');

  let language = localStorage.getItem('kfmh-language') || 'ar';
  let route = 'home';
  let scale = 1;

  const I18N = {
    ar: {
      appTitle:'نظام إدارة توزيع الطاقة الكهربائية',hospitalName:'المستشفى العسكري — إدارة التشغيل والصيانة',searchPlaceholder:'ابحث بالرمز أو الاسم أو الموقع...',print:'طباعة',fullscreen:'ملء الشاشة',admin:'الإدارة',home:'الصفحة الرئيسية',diagram:'المخطط العام',legend:'معنى الرموز',transformers:'المحولات',transformer1:'محول المبردات',transformer2:'المحول رقم 2',transformer3:'المحول رقم 3',transformer4:'محول العيادات الخارجية',transformer5:'محول الصحة النفسية',supportSystems:'أنظمة الدعم',generators:'مولدات المستشفى',ups:'وحدات UPS',approval:'الاعتماد والتوثيق',maintenance:'إدارة التشغيل والصيانة',systemReady:'النظام جاهز للعرض',previous:'السابق',next:'التالي',fit:'ملاءمة الشاشة',search:'بحث',favorite:'مفضلة',notes:'ملاحظات',top:'أعلى',searchProject:'البحث في المشروع',adminPanel:'لوحة الإدارة',authorizedAccount:'الحساب المخول بالتحكم',adminNote:'سيتم تفعيل التحرير الآمن بعد اعتماد التصميم وربطه بخدمة مصادقة حقيقية. لا توجد كلمة مرور محفوظة داخل المتصفح.',understood:'تم',save:'حفظ'
    },
    en: {
      appTitle:'Electrical Distribution Management System',hospitalName:'Military Hospital — Operations & Maintenance',searchPlaceholder:'Search by tag, name, or location...',print:'Print',fullscreen:'Fullscreen',admin:'Admin',home:'Home',diagram:'General Diagram',legend:'Legend',transformers:'Transformers',transformer1:'Chiller Transformer',transformer2:'Transformer 2',transformer3:'Transformer 3',transformer4:'Outpatient Clinics Transformer',transformer5:'Psychiatric Clinics Transformer',supportSystems:'Support Systems',generators:'Hospital Generators',ups:'UPS Units',approval:'Approval & Documentation',maintenance:'Operations & Maintenance',systemReady:'System ready for viewing',previous:'Previous',next:'Next',fit:'Fit to screen',search:'Search',favorite:'Favorite',notes:'Notes',top:'Top',searchProject:'Search Project',adminPanel:'Administration Panel',authorizedAccount:'Authorized control account',adminNote:'Secure editing will be enabled after the interface is approved and connected to a real authentication service. No password is stored in the browser.',understood:'Done',save:'Save'
    }
  };

  function tr(ar, en) { return language === 'ar' ? ar : en; }
  function safe(value, fallback = '—') { return value === null || value === undefined || value === '' ? fallback : value; }
  function localName(obj) { return obj && obj[language] ? obj[language] : (obj && (obj.ar || obj.en)) || '—'; }
  function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (I18N[language][key]) el.textContent = I18N[language][key];
    });
    document.getElementById('languageButton').textContent = language === 'ar' ? 'EN' : 'AR';
    localStorage.setItem('kfmh-language', language);
    renderRoute(route, false);
  }

  function setScale(nextScale) {
    scale = Math.max(.24, Math.min(1.6, nextScale));
    document.documentElement.style.setProperty('--app-scale', scale);
    document.getElementById('zoomValue').textContent = `${Math.round(scale * 100)}%`;
  }

  function fitToScreen() {
    setScale(Math.min(1, window.innerWidth / 1600));
    viewport.scrollTo({ left: 0, top: 0 });
  }

  function equipmentSvg(type, label = '') {
    const navy = '#062d5b', gold = '#d5a83f', steel = '#dfe6ec', dark = '#253746', green = '#2e9f61', red = '#c94343';
    const common = `viewBox="0 0 160 110" role="img" aria-label="${escapeHtml(label || type)}"`;
    const text = `<text x="80" y="103" text-anchor="middle" font-family="Arial" font-size="11" font-weight="700" fill="${navy}">${escapeHtml(label || type)}</text>`;
    const drawings = {
      RMU:`<svg ${common}><rect x="24" y="12" width="112" height="78" rx="6" fill="${steel}" stroke="${navy}" stroke-width="3"/><rect x="34" y="22" width="92" height="22" rx="3" fill="${dark}"/><circle cx="54" cy="58" r="7" fill="${red}"/><circle cx="80" cy="58" r="7" fill="${gold}"/><circle cx="106" cy="58" r="7" fill="${green}"/><path d="M44 76h72" stroke="${navy}" stroke-width="4"/><path d="M54 76v10M80 76v10M106 76v10" stroke="${navy}" stroke-width="3"/>${text}</svg>`,
      TR:`<svg ${common}><rect x="28" y="18" width="104" height="65" rx="8" fill="${steel}" stroke="${navy}" stroke-width="3"/><circle cx="64" cy="50" r="22" fill="none" stroke="${gold}" stroke-width="5"/><circle cx="96" cy="50" r="22" fill="none" stroke="${navy}" stroke-width="5"/><path d="M38 22v-9M58 22v-9M102 22v-9M122 22v-9" stroke="${navy}" stroke-width="4"/><path d="M42 84h76" stroke="${navy}" stroke-width="4"/>${text}</svg>`,
      FED:`<svg ${common}><rect x="42" y="15" width="76" height="72" rx="8" fill="${steel}" stroke="${navy}" stroke-width="3"/><rect x="54" y="27" width="52" height="18" rx="4" fill="${dark}"/><path d="M80 48v26" stroke="${navy}" stroke-width="5"/><path d="M66 62h28" stroke="${gold}" stroke-width="5"/><circle cx="64" cy="80" r="4" fill="${red}"/><circle cx="80" cy="80" r="4" fill="${gold}"/><circle cx="96" cy="80" r="4" fill="${green}"/>${text}</svg>`,
      ATS:`<svg ${common}><rect x="30" y="14" width="100" height="74" rx="8" fill="${steel}" stroke="${navy}" stroke-width="3"/><path d="M48 30h24M88 30h24" stroke="${navy}" stroke-width="5"/><circle cx="60" cy="56" r="12" fill="#fff" stroke="${gold}" stroke-width="4"/><circle cx="100" cy="56" r="12" fill="#fff" stroke="${navy}" stroke-width="4"/><path d="M72 56h16" stroke="${red}" stroke-width="5"/><path d="M80 44v24" stroke="${red}" stroke-width="4"/>${text}</svg>`,
      MDP:`<svg ${common}><rect x="20" y="12" width="120" height="78" rx="5" fill="${steel}" stroke="${navy}" stroke-width="3"/><rect x="31" y="24" width="98" height="20" fill="${dark}" rx="3"/><g fill="#fff" stroke="${navy}" stroke-width="2"><rect x="31" y="53" width="24" height="25"/><rect x="68" y="53" width="24" height="25"/><rect x="105" y="53" width="24" height="25"/></g><circle cx="43" cy="65" r="4" fill="${green}"/><circle cx="80" cy="65" r="4" fill="${gold}"/><circle cx="117" cy="65" r="4" fill="${red}"/>${text}</svg>`,
      MP:`<svg ${common}><rect x="36" y="15" width="88" height="72" rx="6" fill="${steel}" stroke="${navy}" stroke-width="3"/><rect x="49" y="26" width="62" height="16" rx="3" fill="${dark}"/><g stroke="${navy}" stroke-width="3"><path d="M52 54h20M88 54h20M52 68h20M88 68h20"/></g><circle cx="80" cy="80" r="5" fill="${gold}"/>${text}</svg>`,
      PP:`<svg ${common}><rect x="46" y="18" width="68" height="66" rx="6" fill="#f7f9fb" stroke="${navy}" stroke-width="3"/><rect x="56" y="28" width="48" height="13" rx="2" fill="${dark}"/><g fill="${navy}"><rect x="56" y="50" width="12" height="9" rx="2"/><rect x="74" y="50" width="12" height="9" rx="2"/><rect x="92" y="50" width="12" height="9" rx="2"/><rect x="56" y="65" width="12" height="9" rx="2"/><rect x="74" y="65" width="12" height="9" rx="2"/><rect x="92" y="65" width="12" height="9" rx="2"/></g>${text}</svg>`,
      GEN:`<svg ${common}><rect x="24" y="27" width="92" height="52" rx="8" fill="${steel}" stroke="${navy}" stroke-width="3"/><circle cx="46" cy="82" r="9" fill="${dark}"/><circle cx="100" cy="82" r="9" fill="${dark}"/><rect x="116" y="39" width="20" height="35" fill="${gold}" stroke="${navy}" stroke-width="3"/><path d="M38 40h32M38 52h32M38 64h32" stroke="${navy}" stroke-width="3"/><circle cx="88" cy="52" r="15" fill="#fff" stroke="${gold}" stroke-width="4"/><path d="M88 42v10l8 5" stroke="${navy}" stroke-width="3" fill="none"/>${text}</svg>`,
      UPS:`<svg ${common}><rect x="48" y="14" width="64" height="74" rx="7" fill="${steel}" stroke="${navy}" stroke-width="3"/><rect x="59" y="26" width="42" height="19" rx="3" fill="${dark}"/><path d="M72 55h16l-8 13h11L72 82l5-11H66z" fill="${gold}" stroke="${navy}" stroke-width="2"/>${text}</svg>`,
      SYNC:`<svg ${common}><rect x="27" y="15" width="106" height="72" rx="7" fill="${steel}" stroke="${navy}" stroke-width="3"/><circle cx="55" cy="50" r="17" fill="#fff" stroke="${gold}" stroke-width="4"/><circle cx="105" cy="50" r="17" fill="#fff" stroke="${navy}" stroke-width="4"/><path d="M72 50h16" stroke="${red}" stroke-width="4"/><path d="M48 50l7-8 7 8-7 8zM98 50l7-8 7 8-7 8z" fill="${navy}"/>${text}</svg>`
    };
    return `<div class="equipment-svg">${drawings[type] || drawings.PP}</div>`;
  }

  function nodeTypeFromText(text) {
    const upper = String(text).toUpperCase();
    if (upper.startsWith('RMU')) return 'RMU';
    if (upper.startsWith('TR')) return 'TR';
    if (upper.startsWith('FED')) return 'FED';
    if (upper.startsWith('ATS')) return 'ATS';
    if (upper.startsWith('MDP')) return 'MDP';
    if (upper.includes('SYNC')) return 'SYNC';
    return 'PP';
  }

  function paperHeader(titleAr, titleEn) {
    return `<div class="paper-header">
      <div class="paper-hospital"><div class="paper-hospital-logo"><img src="hospital_logo_white.png" alt=""></div><div><b>${tr('المستشفى العسكري','Military Hospital')}</b><small>KING FAISAL MILITARY HOSPITAL</small></div></div>
      <div class="paper-title"><h2>${tr(titleAr,titleEn)}</h2><span>${escapeHtml(titleEn.toUpperCase())}</span></div>
      <div class="paper-department"><b>${tr('إدارة التشغيل والصيانة','Operations & Maintenance')}</b><small>Electrical Section</small></div>
    </div>`;
  }

  function counts() {
    const mdps = DATA.mdps || [];
    let mp = 0, pp = 0;
    mdps.forEach(mdp => (mdp.mps || []).forEach(item => { mp += 1; pp += (item.pps || []).length; }));
    return { tr: (DATA.transformers || []).length || 5, mdp: mdps.length || 5, mp, pp };
  }

  function renderHome() {
    const c = counts();
    const transformers = DATA.transformers || [];
    const cards = transformers.map(item => `<button class="transformer-card" data-open-route="transformer/${escapeHtml(item.id)}" type="button">
      ${equipmentSvg('TR', item.id)}
      <b>${escapeHtml(item.id)} — ${escapeHtml(localName(item.name))}</b>
      <small>${safe(item.ratingKva)} kVA · LV ${safe(item.lvV)}V</small>
      <span class="source-chip ${item.supply === 'internal' ? 'internal' : 'external'}">${item.supply === 'internal' ? tr('تغذية داخلية','Internal Supply') : tr('مصدر خارجي','External Supply')}</span>
      <small>${escapeHtml(item.mdpId || '')}</small>
    </button>`).join('');

    view.innerHTML = `<article class="paper-view">
      ${paperHeader('نظام إدارة توزيع الطاقة الكهربائية','Electrical Distribution Management System')}
      <section class="home-hero">
        <div class="home-copy">
          <div class="eyebrow">${tr('مرجع فني تفاعلي شامل','A Complete Interactive Technical Reference')}</div>
          <h3>${tr('من المصدر إلى آخر لوحة قدرة','From Source to the Final Power Panel')}</h3>
          <p>${tr('عرض احترافي لمسارات التغذية والرسومات الفنية والعلاقات بين RMU والمحولات والقواطع وATS ولوحات MDP وMP وPP، مع البحث والطباعة والتنقل السريع.','A professional browser for supply paths, technical drawings, and relationships between RMU, transformers, feeder breakers, ATS, MDP, MP and PP panels, with search, print, and quick navigation.')}</p>
          <div class="stats-row">
            <div class="stat-card"><strong>${c.tr}</strong><span>TR<br>${tr('محولات','Transformers')}</span></div>
            <div class="stat-card"><strong>${c.mdp}</strong><span>MDP<br>${tr('لوحات توزيع','Distribution Panels')}</span></div>
            <div class="stat-card"><strong>${c.mp || 37}</strong><span>MP<br>${tr('لوحات رئيسية','Main Panels')}</span></div>
            <div class="stat-card"><strong>${c.pp || 93}</strong><span>PP<br>${tr('لوحات قدرة','Power Panels')}</span></div>
          </div>
        </div>
        <div class="home-visual"><div class="switchgear-illustration">${Array.from({length:7},()=>'<div class="switchgear-cell"></div>').join('')}</div></div>
      </section>
      <div class="home-section-title"><h4>${tr('المحولات الرئيسية','Main Transformers')}</h4><span>TR1 — TR5</span></div>
      <section class="transformer-card-grid">${cards}</section>
      <div class="credit-line">إعداد الفني/عبدالله عسيري</div>
    </article>`;
  }

  function renderLegend() {
    const legend = DATA.legend || [];
    const typeByCode = {RMU:'RMU',TR:'TR',FED:'FED',ATS:'ATS',MDP:'MDP',MP:'MP',PP:'PP'};
    view.innerHTML = `<section class="section-view">
      <div class="section-heading"><div><h2>${tr('معنى الرموز والرسومات الفنية','Legend and Technical Drawings')}</h2><p>${tr('الترتيب المعتمد لمسار التغذية','Approved supply-path order')}: RMU → TR → FED → ATS → MDP → MP → PP</p></div><div class="section-badge">LEGEND</div></div>
      <div class="section-content"><div class="legend-grid">${legend.map(item => `<article class="legend-card">${equipmentSvg(typeByCode[item.code],item.code)}<div><code>${escapeHtml(item.code)}</code><h3>${escapeHtml(localName(item))}</h3><p>${escapeHtml(item.en || '')}</p></div></article>`).join('')}</div></div>
    </section>`;
  }

  function renderGlobalDiagram() {
    const blocks = (DATA.transformers || []).map(item => {
      const flow = (item.sourcePath || []).map((part,index,array) => `${renderFlowNode(part, index === array.length-1)}${index < array.length-1 ? '<span class="flow-arrow">→</span>' : ''}`).join('');
      return `<article class="info-panel"><h3>${escapeHtml(item.id)} — ${escapeHtml(localName(item.name))}</h3><div class="flow-diagram">${flow}</div></article>`;
    }).join('');
    view.innerHTML = `<section class="section-view">
      <div class="section-heading"><div><h2>${tr('المخطط العام لتوزيع الكهرباء','General Electrical Distribution Diagram')}</h2><p>${tr('المسارات الرئيسية للمحولات الخمسة','Main paths for all five transformers')}</p></div><div class="section-badge">SLD</div></div>
      <div class="section-content"><div style="display:grid;gap:16px">${blocks}</div></div>
    </section>`;
  }

  function renderFlowNode(part, active = false) {
    const type = nodeTypeFromText(part);
    return `<div class="flow-node ${active ? 'active' : ''}">${equipmentSvg(type,type)}<b>${escapeHtml(part)}</b><small>${escapeHtml(flowTypeName(type))}</small></div>`;
  }

  function flowTypeName(type) {
    const names = {
      RMU:tr('وحدة ربط حلقي','Ring Main Unit'),TR:tr('محول','Transformer'),FED:tr('قاطع تغذية','Feeder Breaker'),ATS:tr('مفتاح تحويل آلي','Automatic Transfer Switch'),MDP:tr('لوحة توزيع رئيسية','Main Distribution Panel'),SYNC:tr('لوحة مزامنة','Synchronizing Panel'),PP:tr('لوحة كهربائية','Electrical Panel')
    };
    return names[type] || type;
  }

  function renderTransformer(id) {
    const transformer = (DATA.transformers || []).find(item => item.id === id);
    if (!transformer) return renderMissing(id);
    const mdp = (DATA.mdps || []).find(item => item.id === transformer.mdpId);
    const mps = mdp?.mps || [];
    const flow = (transformer.sourcePath || []).map((part,index,array) => `${renderFlowNode(part, index === array.length-1)}${index < array.length-1 ? '<span class="flow-arrow">→</span>' : ''}`).join('');
    const mpRows = mps.length ? mps.map(mp => `<div class="panel-row" data-tag="${escapeHtml(mp.tag || mp.id)}"><div class="panel-tag">${escapeHtml(mp.tag || mp.id)}</div><div class="panel-name">${escapeHtml(localName(mp.name))}</div><div class="panel-rating">${safe(mp.ratingA)}A</div></div>`).join('') : `<div class="empty-state"><strong>${tr('التفاصيل قيد الاستكمال','Details pending')}</strong><span>${tr('لم تُستلم جميع بيانات اللوحات الخارجة بعد.','Not all outgoing panel data has been received yet.')}</span></div>`;
    view.innerHTML = `<section class="section-view">
      <div class="section-heading"><div><h2>${escapeHtml(id)} — ${escapeHtml(localName(transformer.name))}</h2><p>${escapeHtml((transformer.sourcePath || []).join(' → '))}</p></div><div class="section-badge">${escapeHtml(id)}</div></div>
      <div class="section-content">
        <div class="flow-diagram">${flow}</div>
        <div class="details-grid">
          <article class="info-panel"><h3>${tr('بيانات المحول والمسار','Transformer and Path Data')}</h3><div class="info-list">
            <div class="info-item"><span>${tr('السعة','Rating')}</span><strong>${safe(transformer.ratingKva)} kVA</strong></div>
            <div class="info-item"><span>${tr('الجهد المنخفض','Low Voltage')}</span><strong>${safe(transformer.lvV)} V</strong></div>
            <div class="info-item"><span>${tr('نوع المصدر','Supply Type')}</span><strong>${transformer.supply === 'internal' ? tr('داخلي','Internal') : tr('خارجي','External')}</strong></div>
            <div class="info-item"><span>MDP</span><strong>${escapeHtml(transformer.mdpId || '—')}</strong></div>
            <div class="info-item"><span>${tr('القاطع الرئيسي','Main Breaker')}</span><strong>${safe(mdp?.ratingA)} A</strong></div>
            <div class="info-item"><span>${tr('ملاحظات','Notes')}</span><strong>${escapeHtml(localName(transformer.notes))}</strong></div>
          </div></article>
          <article class="info-panel"><h3>${tr('اللوحات الرئيسية الخارجة','Outgoing Main Panels')}</h3><div class="panel-list">${mpRows}</div></article>
        </div>
        <div class="home-section-title"><h4>${tr('رسومات القطع الكهربائية في المسار','Electrical Equipment Drawings in This Path')}</h4><span>${escapeHtml(id)}</span></div>
        <div class="equipment-gallery">${(transformer.sourcePath || []).map(part => `<article class="equipment-card">${equipmentSvg(nodeTypeFromText(part),part)}<b>${escapeHtml(part)}</b><small>${escapeHtml(flowTypeName(nodeTypeFromText(part)))}</small></article>`).join('')}</div>
      </div>
    </section>`;
  }

  function renderGenerators() {
    const generators = SUPPORT.generators?.items || [];
    const cards = generators.map(item => `<article class="support-card">
      ${equipmentSvg('GEN',item.id)}
      <div><h3>${escapeHtml(item.id)} — ${escapeHtml(item.manufacturer)}</h3><div class="support-meta">
        <span>${tr('الموديل','Model')}<strong>${escapeHtml(safe(item.model))}</strong></span>
        <span>${tr('السعة','Rating')}<strong>${safe(item.kva)} kVA</strong></span>
        <span>${tr('الموقع','Location')}<strong>${escapeHtml(safe(item.area))}</strong></span>
        <span>${tr('الجهد','Voltage')}<strong>${safe(item.voltage)} V</strong></span>
      </div><span class="good-chip">${tr('الحالة: جيدة','Condition: Good')}</span>${item.explanation ? `<p style="font-size:11px;color:#66798e;line-height:1.65;margin:9px 0 0">${escapeHtml(localName(item.explanation))}</p>` : ''}</div>
    </article>`).join('');
    view.innerHTML = `<section class="section-view">
      <div class="section-heading"><div><h2>${tr('مولدات المستشفى','Hospital Generators')}</h2><p>${tr('ثمانية مولدات مسجلة بالكامل','Eight fully registered generators')}</p></div><div class="section-badge">GEN</div></div>
      <div class="section-content">
        <div class="note-box">${escapeHtml(localName(SUPPORT.generators?.scopeNote))}</div>
        <div class="flow-diagram" style="margin-bottom:16px">${renderFlowNode('GEN-1')}<span class="flow-arrow">→</span>${renderFlowNode('Synchronizing Panel Board',true)}<span class="flow-arrow">←</span>${renderFlowNode('GEN-2')}</div>
        <div class="support-grid">${cards}</div>
      </div>
    </section>`;
  }

  function renderUps() {
    const units = SUPPORT.ups?.items || [];
    const cards = units.map(item => `<article class="support-card ${item.status === 'faulty' ? 'faulty' : ''}">
      ${equipmentSvg('UPS',`UPS-${item.number}`)}
      <div><h3>UPS-${item.number} — ${escapeHtml(item.make)}</h3><div class="support-meta">
        <span>${tr('الموديل','Model')}<strong>${escapeHtml(item.model)}</strong></span>
        <span>${tr('السعة','Rating')}<strong>${item.kva} kVA</strong></span>
        <span>${tr('الموقع','Location')}<strong>${escapeHtml(item.location)}</strong></span>
        <span>${tr('الرقم التسلسلي','Serial')}<strong>${escapeHtml(item.serialNumber)}</strong></span>
      </div><span class="${item.status === 'faulty' ? 'fault-chip' : 'good-chip'}">${item.status === 'faulty' ? tr('عطلان — يحتاج صيانة','Faulty — Maintenance Required') : tr('تشغيلي','Operational')}</span></div>
    </article>`).join('');
    view.innerHTML = `<section class="section-view">
      <div class="section-heading"><div><h2>${tr('وحدات UPS','UPS Units')}</h2><p>${tr('15 وحدة — الوحدة رقم 13 عطلانة','15 units — Unit 13 is faulty')}</p></div><div class="section-badge">UPS</div></div>
      <div class="section-content"><div class="note-box">${escapeHtml(localName(SUPPORT.ups?.note))}</div><div class="support-grid">${cards}</div></div>
    </section>`;
  }

  function renderApproval() {
    view.innerHTML = `<section class="section-view"><div class="approval-view"><div><div class="approval-symbol">✓</div><h2>${tr('الاعتماد والتوثيق','Approval & Documentation')}</h2><p>${tr('هذه الصفحة الأخيرة في المتصفح الفني. تُعرض بيانات المشروع وفق التسلسل والرموز والتعديلات المعتمدة، ويُفعّل التحكم الإداري الآمن بعد اعتماد التصميم النهائي.','This is the final page of the technical browser. Project data is displayed according to the approved sequence, symbols, and corrections. Secure administrative control will be activated after final design approval.')}</p><div class="approval-credit">إعداد الفني/عبدالله عسيري</div><div style="margin-top:12px;color:#6b7d91;direction:ltr">Authorized admin: ${ADMIN_EMAIL}</div></div></div></section>`;
  }

  function renderMissing(name) {
    view.innerHTML = `<section class="section-view"><div class="empty-state"><strong>${tr('القسم غير موجود','Section not found')}</strong><span>${escapeHtml(name)}</span></div></section>`;
  }

  function renderRoute(nextRoute, updateHash = true) {
    route = ROUTES.includes(nextRoute) ? nextRoute : 'home';
    if (route === 'home') renderHome();
    else if (route === 'diagram') renderGlobalDiagram();
    else if (route === 'legend') renderLegend();
    else if (route.startsWith('transformer/')) renderTransformer(route.split('/')[1]);
    else if (route === 'generators') renderGenerators();
    else if (route === 'ups') renderUps();
    else if (route === 'approval') renderApproval();
    else renderMissing(route);

    document.querySelectorAll('.nav-link').forEach(item => item.classList.toggle('active', item.dataset.route === route));
    renderQuickRail();
    bindDynamicRouteButtons();
    updateFavoriteIcon();
    if (updateHash) history.replaceState(null,'',`#${route}`);
    viewport.scrollTo({ top: 0, left: viewport.scrollLeft });
  }

  function routeLabel(item) {
    const map = {
      home:tr('الرئيسية','Home'),diagram:tr('المخطط','Diagram'),legend:tr('الرموز','Legend'),generators:tr('المولدات','Generators'),ups:'UPS',approval:tr('الاعتماد','Approval')
    };
    if (item.startsWith('transformer/')) return item.split('/')[1];
    return map[item] || item;
  }

  function routeIcon(item) {
    if (item.startsWith('transformer/')) return equipmentSvg('TR',item.split('/')[1]);
    if (item === 'generators') return equipmentSvg('GEN','GEN');
    if (item === 'ups') return equipmentSvg('UPS','UPS');
    if (item === 'diagram') return equipmentSvg('MDP','SLD');
    if (item === 'legend') return equipmentSvg('RMU','RMU');
    if (item === 'approval') return '<div style="font-size:32px;color:#0b447e">✓</div>';
    return '<div style="font-size:31px;color:#0b447e">⌂</div>';
  }

  function renderQuickRail() {
    quickRail.innerHTML = ROUTES.map(item => `<button class="quick-item ${item === route ? 'active' : ''}" data-quick-route="${escapeHtml(item)}" type="button"><div class="quick-preview">${routeIcon(item)}</div><span>${escapeHtml(routeLabel(item))}</span></button>`).join('');
    quickRail.querySelectorAll('[data-quick-route]').forEach(button => button.addEventListener('click', () => renderRoute(button.dataset.quickRoute)));
  }

  function bindDynamicRouteButtons() {
    view.querySelectorAll('[data-open-route]').forEach(button => button.addEventListener('click', () => renderRoute(button.dataset.openRoute)));
  }

  function favorites() {
    try { return JSON.parse(localStorage.getItem('kfmh-favorites') || '[]'); } catch { return []; }
  }

  function updateFavoriteIcon() {
    document.getElementById('toolFavorite').classList.toggle('favorite-on', favorites().includes(route));
  }

  function toggleFavorite() {
    const list = favorites();
    const index = list.indexOf(route);
    if (index >= 0) list.splice(index,1); else list.push(route);
    localStorage.setItem('kfmh-favorites',JSON.stringify(list));
    updateFavoriteIcon();
    showToast(index >= 0 ? tr('تمت الإزالة من المفضلة','Removed from favorites') : tr('تمت الإضافة إلى المفضلة','Added to favorites'));
  }

  function buildSearchIndex() {
    const items = [];
    (DATA.transformers || []).forEach(t => items.push({tag:t.id,name:localName(t.name),location:(t.sourcePath || []).join(' → '),route:`transformer/${t.id}`}));
    (DATA.mdps || []).forEach(mdp => {
      items.push({tag:mdp.id,name:localName(mdp.name),location:(mdp.sourcePath || []).join(' → '),route:`transformer/${mdp.transformerId || ''}`});
      (mdp.mps || []).forEach(mp => {
        items.push({tag:mp.tag || mp.id,name:localName(mp.name),location:localName(mp.location),route:`transformer/${mdp.transformerId || ''}`});
        (mp.pps || []).forEach(pp => items.push({tag:pp.tag,name:localName(pp.name),location:localName(pp.location),route:`transformer/${mdp.transformerId || ''}`}));
      });
    });
    (SUPPORT.generators?.items || []).forEach(g => items.push({tag:g.id,name:`${g.manufacturer} ${g.model}`,location:g.area,route:'generators'}));
    (SUPPORT.ups?.items || []).forEach(u => items.push({tag:`UPS-${u.number}`,name:`${u.make} ${u.model}`,location:u.location,route:'ups'}));
    return items;
  }

  const SEARCH_INDEX = buildSearchIndex();

  function showSearch() {
    if (!searchDialog.open) searchDialog.showModal();
    setTimeout(() => searchInput.focus(),50);
    renderSearch('');
  }

  function renderSearch(query) {
    const q = query.trim().toLowerCase();
    const results = (q ? SEARCH_INDEX.filter(item => `${item.tag} ${item.name} ${item.location}`.toLowerCase().includes(q)) : SEARCH_INDEX.slice(0,12)).slice(0,50);
    searchResults.innerHTML = results.length ? results.map((item,index) => `<button class="search-result" data-result-index="${index}" type="button"><code>${escapeHtml(item.tag)}</code><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.location || '—')}</small></span><span>›</span></button>`).join('') : `<div class="empty-state"><strong>${tr('لا توجد نتائج','No results')}</strong><span>${escapeHtml(query)}</span></div>`;
    searchResults.querySelectorAll('[data-result-index]').forEach(button => button.addEventListener('click', () => {
      const item = results[Number(button.dataset.resultIndex)];
      searchDialog.close();
      renderRoute(item.route);
    }));
  }

  function nextRoute(offset) {
    const index = ROUTES.indexOf(route);
    renderRoute(ROUTES[(index + offset + ROUTES.length) % ROUTES.length]);
  }

  document.querySelectorAll('.nav-link').forEach(button => button.addEventListener('click', () => renderRoute(button.dataset.route)));
  document.getElementById('previousSection').addEventListener('click', () => nextRoute(-1));
  document.getElementById('nextSection').addEventListener('click', () => nextRoute(1));
  document.getElementById('zoomOut').addEventListener('click', () => setScale(scale - .1));
  document.getElementById('zoomIn').addEventListener('click', () => setScale(scale + .1));
  document.getElementById('fitButton').addEventListener('click', fitToScreen);
  document.getElementById('fullscreenButton').addEventListener('click', () => document.documentElement.requestFullscreen?.());
  document.getElementById('printButton').addEventListener('click', () => window.print());
  document.getElementById('globalSearchButton').addEventListener('click', showSearch);
  document.getElementById('toolSearch').addEventListener('click', showSearch);
  document.getElementById('toolFavorite').addEventListener('click', toggleFavorite);
  document.getElementById('toolDiagram').addEventListener('click', () => renderRoute('diagram'));
  document.getElementById('toolTop').addEventListener('click', () => viewport.scrollTo({top:0,behavior:'smooth'}));
  document.getElementById('adminButton').addEventListener('click', () => adminDialog.showModal());
  document.getElementById('languageButton').addEventListener('click', () => { language = language === 'ar' ? 'en' : 'ar'; applyLanguage(); });
  document.getElementById('toolNotes').addEventListener('click', () => { notesText.value = localStorage.getItem(`kfmh-note:${route}`) || ''; notesDialog.showModal(); });
  document.getElementById('saveNotes').addEventListener('click', () => { localStorage.setItem(`kfmh-note:${route}`,notesText.value); showToast(tr('تم حفظ الملاحظة محليًا','Note saved locally')); });
  searchInput.addEventListener('input', event => renderSearch(event.target.value));
  window.addEventListener('resize', () => { if (window.innerWidth < 900) fitToScreen(); });
  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); showSearch(); }
    if (event.key === 'ArrowRight' && !searchDialog.open) nextRoute(language === 'ar' ? -1 : 1);
    if (event.key === 'ArrowLeft' && !searchDialog.open) nextRoute(language === 'ar' ? 1 : -1);
    if (event.key === '+' || event.key === '=') setScale(scale + .1);
    if (event.key === '-') setScale(scale - .1);
  });

  window.addEventListener('load', () => {
    applyLanguage();
    const hashRoute = decodeURIComponent(location.hash.replace(/^#/,''));
    renderRoute(ROUTES.includes(hashRoute) ? hashRoute : 'home', false);
    fitToScreen();
    showToast(tr('تم تحميل النسخة الاحترافية','Professional version loaded'));
  });
})();
