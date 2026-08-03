(() => {
  const DATA = window.KFMH_DATA;
  const state = {
    lang: localStorage.getItem('kfmh_lang') || 'ar',
    query: '',
  };

  const $ = (s, root=document) => root.querySelector(s);
  const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = (obj) => obj?.[state.lang] ?? obj?.ar ?? obj?.en ?? '';
  const num = (value, suffix='') => value === null || value === undefined ? tr('غير موثق','Not documented') : `${value}${suffix}`;
  const tr = (ar,en) => state.lang === 'ar' ? ar : en;
  const routeHref = (route) => `#/${route.replace(/^\/+/, '')}`;
  const statusLabel = (status) => ({
    confirmed: tr('معتمد','Confirmed'),
    partial: tr('جزئي','Partial'),
    pending: tr('قيد التوثيق','Pending')
  }[status] || status);
  const statusClass = (status) => status === 'confirmed' ? 'ok' : status === 'partial' ? 'partial' : 'pending';
  const iconFor = (type) => ({tr:'TR',mdp:'MDP',mp:'MP',pp:'PP'}[type] || '•');

  function findTransformer(id){ return DATA.transformers.find(x => x.id === id); }
  function findMDP(id){ return DATA.mdps.find(x => x.id === id); }
  function findMP(id){
    for (const mdp of DATA.mdps) {
      const item = mdp.mps.find(x => x.id === id || x.tag === id);
      if (item) return {mdp, mp:item};
    }
    return null;
  }
  function findPP(tag){
    for (const mdp of DATA.mdps) for (const mp of mdp.mps) {
      const item = mp.pps.find(x => x.tag === tag);
      if (item) return {mdp, mp, pp:item};
    }
    return null;
  }
  function sourceForPP(mdp, mp){ return [...mdp.sourcePath, mp.tag].join(' → '); }
  function pathHTML(nodes){
    return `<div class="path">${nodes.map((n,i)=>`${i?'<span class="arrow">→</span>':''}<span class="node">${esc(n)}</span>`).join('')}</div>`;
  }
  function breadcrumb(items){
    return `<div class="breadcrumbs">${items.map((x,i)=> x.href ? `<a href="${x.href}">${esc(x.label)}</a>` : `<span>${esc(x.label)}</span>`).join(' / ')}</div>`;
  }
  function statusTag(status){
    return `<span class="tag ${statusClass(status)}">${esc(statusLabel(status))}</span>`;
  }
  function pageHead(title, desc='', actions=''){
    return `<div class="page-head"><div><h1>${esc(title)}</h1>${desc?`<p>${esc(desc)}</p>`:''}</div>${actions?`<div class="print-actions no-print">${actions}</div>`:''}</div>`;
  }
  function printButton(){
    return `<button class="btn btn-outline" data-action="print">🖨 ${tr('طباعة','Print')}</button>`;
  }

  function buildSearchIndex(){
    const out = [];
    DATA.transformers.forEach(x => out.push({
      type:'tr', key:x.id, title:`${x.id} — ${t(x.name)}`,
      subtitle:x.sourcePath.join(' → '), href:routeHref(`transformer/${x.id}`),
      tokens:[x.id,x.name.ar,x.name.en,...x.sourcePath].join(' ').toLowerCase()
    }));
    DATA.mdps.forEach(mdp => {
      out.push({
        type:'mdp',key:mdp.id,title:`${mdp.id} — ${t(mdp.name)}`,
        subtitle:mdp.sourcePath.join(' → '),href:routeHref(`mdp/${mdp.id}`),
        tokens:[mdp.id,mdp.name.ar,mdp.name.en,...mdp.sourcePath].join(' ').toLowerCase()
      });
      mdp.mps.forEach(mp => {
        out.push({
          type:'mp',key:mp.tag,title:`${mp.tag} — ${t(mp.name)}`,
          subtitle:`${mdp.id} • ${num(mp.ratingA,'A')} • ${mp.pps.length} PP`,
          href:routeHref(`mp/${mp.id}`),
          tokens:[mp.tag,mp.name.ar,mp.name.en,mp.ratingA,...mdp.sourcePath].join(' ').toLowerCase()
        });
        mp.pps.forEach(pp => out.push({
          type:'pp',key:pp.tag,title:`${pp.tag} — ${t(pp.name)}`,
          subtitle:`${sourceForPP(mdp,mp)} • ${num(pp.ratingA,'A')}`,
          href:routeHref(`pp/${encodeURIComponent(pp.tag)}`),
          tokens:[pp.tag,pp.name.ar,pp.name.en,pp.ratingA,pp.location.ar,pp.location.en,sourceForPP(mdp,mp)].join(' ').toLowerCase()
        }));
      });
    });
    return out;
  }
  const SEARCH = buildSearchIndex();

  function renderLayout(){
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t(DATA.meta.projectName);
    document.body.innerHTML = `
      <div class="app-shell">
        <aside class="sidebar" id="sidebar">
          <div class="brand">
            <img src="hospital_logo_white.png" alt="Hospital logo">
            <div><strong>${tr('نظام توزيع الكهرباء','Electrical Distribution System')}</strong><small>${tr('المستشفى العسكري','Military Hospital')}</small></div>
          </div>
          <nav class="nav">
            <a href="${routeHref('home')}" data-nav="home">⌂ ${tr('الرئيسية','Home')}</a>
            <a href="${routeHref('diagram')}" data-nav="diagram">⌁ ${tr('المخطط العام','General Diagram')}</a>
            <a href="${routeHref('search')}" data-nav="search">⌕ ${tr('البحث','Search')}</a>
            <div class="section-label">${tr('المحولات واللوحات','TRANSFORMERS & PANELS')}</div>
            ${DATA.transformers.map(x=>`<a href="${routeHref(`transformer/${x.id}`)}" data-nav="transformer/${x.id}">▣ ${x.id} — ${esc(t(x.name))}</a>`).join('')}
            <div class="section-label">${tr('أنظمة مساندة','SUPPORT SYSTEMS')}</div>
            <a href="${routeHref('generators')}" data-nav="generators">⚡ ${tr('مولدات المستشفى','Hospital Generators')}</a>
            <a href="${routeHref('ups')}" data-nav="ups">▤ ${tr('البطاريات و UPS','Batteries & UPS')}</a>
            <a href="${routeHref('print')}" data-nav="print">🖨 ${tr('الطباعة','Print Center')}</a>
          </nav>
          <div class="sidebar-footer">
            <b>${tr('سري — للاستخدام الداخلي فقط','CONFIDENTIAL — INTERNAL USE ONLY')}</b><br>
            ${tr('الإصدار','Version')} ${esc(DATA.meta.version)}<br>${tr('آخر تحديث','Last update')}: ${esc(DATA.meta.updated)}
          </div>
        </aside>
        <div class="mobile-overlay" id="overlay"></div>
        <main class="main">
          <header class="topbar no-print">
            <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
            <form class="search-box" id="globalSearch"><span>⌕</span><input id="globalSearchInput" placeholder="${tr('ابحث بالرقم أو الاسم أو الموقع...','Search by tag, name or location...')}" autocomplete="off"></form>
            <button class="toolbar-btn" id="langBtn">${state.lang === 'ar' ? 'EN' : 'ع'}</button>
            <button class="toolbar-btn" data-action="print">🖨 <span class="wide">${tr('طباعة','Print')}</span></button>
          </header>
          <div class="content" id="content"></div>
          <footer class="footer">${tr('إدارة الهندسة والصيانة — قسم الكهرباء','Engineering & Maintenance Department — Electrical Section')}</footer>
        </main>
      </div>`;
    bindGlobal();
    renderRoute();
  }

  function bindGlobal(){
    $('#menuBtn')?.addEventListener('click',()=>toggleMenu(true));
    $('#overlay')?.addEventListener('click',()=>toggleMenu(false));
    $('#langBtn')?.addEventListener('click',()=>{
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('kfmh_lang',state.lang);
      renderLayout();
    });
    $('#globalSearch')?.addEventListener('submit',(e)=>{
      e.preventDefault();
      const q = $('#globalSearchInput').value.trim();
      location.hash = `#/search?q=${encodeURIComponent(q)}`;
      toggleMenu(false);
    });
    document.addEventListener('click', globalClick, {once:true});
  }
  function globalClick(e){
    const action = e.target.closest('[data-action]')?.dataset.action;
    if(action === 'print') window.print();
    if(e.target.closest('.nav a')) toggleMenu(false);
    document.addEventListener('click', globalClick, {once:true});
  }
  function toggleMenu(open){
    $('#sidebar')?.classList.toggle('open',open);
    $('#overlay')?.classList.toggle('show',open);
  }

  function parseRoute(){
    const raw = (location.hash || '#/home').slice(2);
    const [path, query=''] = raw.split('?');
    return {parts:path.split('/').filter(Boolean), params:new URLSearchParams(query)};
  }
  function setActive(route){
    document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active', route.startsWith(a.dataset.nav)));
  }
  function setContent(html, route=''){
    const root = $('#content');
    root.innerHTML = html;
    setActive(route);
    root.querySelectorAll('[data-action="print"]').forEach(x=>x.addEventListener('click',()=>window.print()));
    window.scrollTo({top:0,behavior:'instant'});
  }

  function renderRoute(){
    const {parts,params} = parseRoute();
    const page = parts[0] || 'home';
    try{
      if(page === 'home') return renderHome();
      if(page === 'diagram') return renderDiagram();
      if(page === 'search') return renderSearch(params.get('q') || '');
      if(page === 'transformer') return renderTransformer(parts[1]);
      if(page === 'mdp') return renderMDP(parts[1]);
      if(page === 'mp') return renderMP(parts[1]);
      if(page === 'pp') return renderPP(decodeURIComponent(parts.slice(1).join('/')));
      if(page === 'generators') return renderSupport('generators');
      if(page === 'ups') return renderSupport('ups');
      if(page === 'print') return renderPrint();
      return renderNotFound();
    }catch(err){
      console.error(err);
      setContent(`<div class="alert alert-warn">${tr('حدث خطأ في عرض الصفحة.','An error occurred while rendering the page.')}</div>`,'');
    }
  }

  function renderHome(){
    const totalMP = DATA.mdps.reduce((n,x)=>n+x.mps.length,0);
    const totalPP = DATA.mdps.reduce((n,x)=>n+x.mps.reduce((m,p)=>m+p.pps.length,0),0);
    const html = `
      <section class="hero">
        <h1>${esc(t(DATA.meta.projectName))}</h1>
        <p>${tr('مرجع فني ثنائي اللغة لمسارات التغذية والمحولات ولوحات MDP وMP وPP. تم بناء النظام وفق البيانات المؤكدة، وأي بيانات ناقصة تظهر بوضوح على أنها قيد التوثيق.','A bilingual technical reference for supply paths, transformers, MDP, MP and PP panels. Confirmed data is used as provided; missing data is clearly marked as pending documentation.')}</p>
        <div class="hero-actions">
          <a class="btn btn-gold" href="${routeHref('diagram')}">${tr('فتح المخطط العام','Open General Diagram')}</a>
          <a class="btn btn-light" href="${routeHref('transformer/TR2')}">${tr('فتح المحولات','Open Transformers')}</a>
        </div>
      </section>
      <div class="grid grid-4" style="margin-top:18px">
        <div class="card stat"><div><strong>${DATA.transformers.length}</strong><span>${tr('محولات','Transformers')}</span></div><div class="icon-badge">TR</div></div>
        <div class="card stat"><div><strong>${DATA.mdps.length}</strong><span>MDP</span></div><div class="icon-badge">MDP</div></div>
        <div class="card stat"><div><strong>${totalMP}</strong><span>Main Panels</span></div><div class="icon-badge">MP</div></div>
        <div class="card stat"><div><strong>${totalPP}</strong><span>Power Panels</span></div><div class="icon-badge">PP</div></div>
      </div>
      <div class="grid grid-3" style="margin-top:18px">
        ${DATA.transformers.map(x=>{
          const mdp=findMDP(x.mdpId);
          return `<a class="card card-link" href="${routeHref(`transformer/${x.id}`)}">
            <div class="panel-top"><span class="tag ${x.supply==='external'?'partial':'ok'}">${x.supply==='external'?tr('تغذية خارجية','External Supply'):tr('تغذية داخلية','Internal Supply')}</span><strong>${x.id}</strong></div>
            <h3 style="margin-top:13px">${esc(t(x.name))}</h3>
            <p>${esc(x.sourcePath.join(' → '))}</p>
            <div class="stat"><span>${mdp?.mps.length || 0} MP</span><b>${num(x.ratingKva,' kVA')}</b></div>
          </a>`;
        }).join('')}
      </div>
      <div class="grid grid-2" style="margin-top:18px">
        <a class="card card-link" href="${routeHref('generators')}"><h3>⚡ ${tr('مولدات المستشفى','Hospital Generators')}</h3><p>${tr('قسم مخصص لإضافة بيانات المولدات عند استلامها.','Dedicated section for generator data when received.')}</p>${statusTag(DATA.generators.status)}</a>
        <a class="card card-link" href="${routeHref('ups')}"><h3>▤ ${tr('البطاريات وأنظمة UPS','Batteries and UPS Systems')}</h3><p>${tr('قسم مخصص لبيانات البطاريات وأنظمة UPS.','Dedicated section for batteries and UPS data.')}</p>${statusTag(DATA.ups.status)}</a>
      </div>`;
    setContent(html,'home');
  }

  function renderTransformer(id){
    const item=findTransformer(id);
    if(!item) return renderNotFound();
    const mdp=findMDP(item.mdpId);
    const html=`
      ${breadcrumb([{label:tr('الرئيسية','Home'),href:routeHref('home')},{label:item.id}])}
      ${pageHead(`${item.id} — ${t(item.name)}`,tr('صفحة المحول ومسار التغذية واللوحة الرئيسية التابعة له.','Transformer page, supply path and associated main distribution panel.'),printButton())}
      <div class="grid grid-3">
        <div class="card stat"><div><strong>${num(item.ratingKva)}</strong><span>kVA</span></div><div class="icon-badge">TR</div></div>
        <div class="card stat"><div><strong>${num(item.lvV)}</strong><span>LV Voltage</span></div><div class="icon-badge">V</div></div>
        <div class="card stat"><div><strong>${mdp.mps.length}</strong><span>Main Panels</span></div><div class="icon-badge">MP</div></div>
      </div>
      <section class="card" style="margin-top:16px">
        <h2>${tr('مسار التغذية','Supply Path')}</h2>
        ${pathHTML(item.sourcePath)}
        <div class="alert alert-info">${esc(t(item.notes))}</div>
      </section>
      <section class="card" style="margin-top:16px">
        <div class="panel-top"><div><h2>${mdp.id} — ${esc(t(mdp.name))}</h2><p>${tr('لوحة التوزيع الرئيسية التابعة للمحول.','Main distribution panel associated with this transformer.')}</p></div>${statusTag(mdp.status)}</div>
        <div class="kv"><div class="key">${tr('السعة','Rating')}</div><div>${num(mdp.ratingA,'A')}</div><div class="key">${tr('عدد لوحات MP','MP Count')}</div><div>${mdp.mps.length}</div></div>
        <a class="btn btn-navy no-print" style="margin-top:14px" href="${routeHref(`mdp/${mdp.id}`)}">${tr('فتح لوحة MDP','Open MDP')}</a>
      </section>`;
    setContent(html,`transformer/${id}`);
  }

  function renderMDP(id){
    const mdp=findMDP(id);
    if(!mdp) return renderNotFound();
    const trf=findTransformer(mdp.transformerId);
    const html=`
      ${breadcrumb([{label:tr('الرئيسية','Home'),href:routeHref('home')},{label:trf.id,href:routeHref(`transformer/${trf.id}`)},{label:mdp.id}])}
      ${pageHead(`${mdp.id} — ${t(mdp.name)}`,tr('جميع لوحات Main Panel التابعة لهذه اللوحة.','All Main Panels supplied by this distribution panel.'),printButton())}
      <section class="card">
        <div class="panel-top"><div><h2>${tr('مسار المصدر','Source Path')}</h2>${pathHTML(mdp.sourcePath)}</div>${statusTag(mdp.status)}</div>
        <div class="grid grid-3" style="margin-top:12px"><div class="stat"><div><strong>${num(mdp.ratingA)}</strong><span>A</span></div><div class="icon-badge">MDP</div></div><div class="stat"><div><strong>${mdp.mps.length}</strong><span>Main Panels</span></div><div class="icon-badge">MP</div></div><div class="stat"><div><strong>${mdp.mps.reduce((n,x)=>n+x.pps.length,0)}</strong><span>Power Panels</span></div><div class="icon-badge">PP</div></div></div>
      </section>
      <div class="grid grid-3" style="margin-top:16px">
        ${mdp.mps.map(mp=>`<a class="card card-link panel-card" href="${routeHref(`mp/${mp.id}`)}">
          <div class="panel-top"><span class="panel-tag">${esc(mp.tag)}</span><span class="rating">${num(mp.ratingA,'A')}</span></div>
          <div class="name">${esc(t(mp.name))}</div><div class="sub">${mp.pps.length} PP • ${statusLabel(mp.status)}</div>
        </a>`).join('')}
      </div>`;
    setContent(html,`transformer/${trf.id}`);
  }

  function renderMP(id){
    const found=findMP(id);
    if(!found) return renderNotFound();
    const {mdp,mp}=found;
    const trf=findTransformer(mdp.transformerId);
    const html=`
      ${breadcrumb([{label:tr('الرئيسية','Home'),href:routeHref('home')},{label:trf.id,href:routeHref(`transformer/${trf.id}`)},{label:mdp.id,href:routeHref(`mdp/${mdp.id}`)},{label:mp.tag}])}
      ${pageHead(`${mp.tag} — ${t(mp.name)}`,tr('تفاصيل Main Panel ولوحات Power Panel التابعة لها.','Main Panel details and associated Power Panels.'),printButton())}
      <section class="card">
        <div class="panel-top"><div><h2>${esc(mp.tag)}</h2><p>${esc(t(mp.name))}</p></div>${statusTag(mp.status)}</div>
        ${pathHTML([...mdp.sourcePath,mp.tag])}
        <div class="kv"><div class="key">${tr('TAG No.','TAG No.')}</div><div>${esc(mp.tag)}</div><div class="key">${tr('سعة القاطع','Breaker Rating')}</div><div>${num(mp.ratingA,'A')}</div><div class="key">${tr('الموقع','Location')}</div><div>${esc(t(mp.location))}</div><div class="key">${tr('عدد PP','PP Count')}</div><div>${mp.pps.length}</div></div>
        ${t(mp.notes)?`<div class="alert alert-warn" style="margin-top:14px">${esc(t(mp.notes))}</div>`:''}
      </section>
      <div class="grid grid-3" style="margin-top:16px">
        ${mp.pps.map(pp=>`<a class="card card-link panel-card" href="${routeHref(`pp/${encodeURIComponent(pp.tag)}`)}">
          <div class="panel-top"><span class="panel-tag">${esc(pp.tag)}</span><span class="rating">${num(pp.ratingA,'A')}</span></div>
          <div class="name">${esc(t(pp.name))}</div><div class="sub">${esc(t(pp.location))}</div>
        </a>`).join('')}
      </div>`;
    setContent(html,`transformer/${trf.id}`);
  }

  function renderPP(tag){
    const found=findPP(tag);
    if(!found) return renderNotFound();
    const {mdp,mp,pp}=found;
    const trf=findTransformer(mdp.transformerId);
    const source=sourceForPP(mdp,mp);
    const html=`
      ${breadcrumb([{label:tr('الرئيسية','Home'),href:routeHref('home')},{label:trf.id,href:routeHref(`transformer/${trf.id}`)},{label:mdp.id,href:routeHref(`mdp/${mdp.id}`)},{label:mp.tag,href:routeHref(`mp/${mp.id}`)},{label:pp.tag}])}
      ${pageHead(`${pp.tag} — ${t(pp.name)}`,tr('صفحة Power Panel والملصق الداخلي المعتمد.','Power Panel page and approved internal label.'),printButton())}
      <div class="grid grid-2">
        <section class="card">
          <div class="panel-top"><h2>${esc(pp.tag)}</h2>${statusTag(pp.status)}</div>
          ${pathHTML([...mdp.sourcePath,mp.tag,pp.tag])}
          <div class="kv"><div class="key">TAG No.</div><div>${esc(pp.tag)}</div><div class="key">SOURCE</div><div>${esc(source)}</div><div class="key">LOCATION</div><div>${esc(pp.location.en)}<br>${esc(pp.location.ar)}</div><div class="key">${tr('السعة','Rating')}</div><div>${num(pp.ratingA,'A')}</div></div>
        </section>
        <section class="equipment-label">
          <div class="label-head">${esc(pp.tag)}</div>
          <div class="label-body"><div class="label-row"><div class="label-key">TAG No.</div><div>${esc(pp.tag)}</div></div><div class="label-row"><div class="label-key">SOURCE</div><div>${esc(source)}</div></div><div class="label-row"><div class="label-key">LOCATION</div><div>${esc(pp.location.en)}<br>${esc(pp.location.ar)}</div></div></div>
        </section>
      </div>`;
    setContent(html,`transformer/${trf.id}`);
  }

  function renderSearch(q=''){
    const needle=q.trim().toLowerCase();
    const results=needle ? SEARCH.filter(x=>x.tokens.includes(needle)).slice(0,100) : SEARCH.slice(0,30);
    const html=`
      ${pageHead(tr('البحث داخل المشروع','Project Search'),tr('ابحث بالرمز أو الاسم أو الموقع أو السعة.','Search by tag, name, location or rating.'))}
      <form class="card no-print" id="pageSearch" style="display:flex;gap:8px;margin-bottom:16px">
        <input id="pageSearchInput" value="${esc(q)}" placeholder="${tr('مثال: MDP3.MP8.PP1 أو Radiology','Example: MDP3.MP8.PP1 or Radiology')}" style="flex:1;border:1px solid var(--line);border-radius:11px;padding:12px;min-width:0">
        <button class="btn btn-navy">${tr('بحث','Search')}</button>
      </form>
      <div class="search-results">
        ${results.length?results.map(x=>`<a class="card card-link result" href="${x.href}">
          <span class="type">${iconFor(x.type)}</span>
          <span><strong>${esc(x.title)}</strong><small>${esc(x.subtitle)}</small></span>
          <span>←</span>
        </a>`).join(''):`<div class="empty">${tr('لا توجد نتائج مطابقة.','No matching results.')}</div>`}
      </div>`;
    setContent(html,'search');
    $('#pageSearch')?.addEventListener('submit',e=>{
      e.preventDefault();
      location.hash=`#/search?q=${encodeURIComponent($('#pageSearchInput').value.trim())}`;
    });
  }

  function renderDiagram(){
    const html=`
      ${pageHead(tr('المخطط العام لتوزيع الكهرباء','General Electrical Distribution Diagram'),tr('عرض مبسط لمسارات المصدر من RMU حتى لوحات MP وPP.','Simplified source paths from RMU to MP and PP panels.'),printButton())}
      <div class="alert alert-info">${tr('الترتيب المعتمد للرموز: RMU ثم TR ثم FED ثم ATS ثم MDP ثم MP ثم PP.','Approved legend order: RMU, TR, FED, ATS, MDP, MP, PP.')}</div>
      ${DATA.transformers.map(trf=>{
        const mdp=findMDP(trf.mdpId);
        return `<section class="card" style="margin-top:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h2>${trf.id} — ${esc(t(trf.name))}</h2><span class="tag">${mdp.mps.length} MP</span></div>
          <div class="diagram">${trf.sourcePath.map((n,i)=>`${i?'<div class="diagram-arrow">→</div>':''}<div class="diagram-node ${n.includes('MDP')?'gold':''}">${esc(n)}</div>`).join('')}<div class="diagram-arrow">→</div><div class="diagram-node">MP1…MP${Math.max(...mdp.mps.map(x=>x.number))}</div><div class="diagram-arrow">→</div><div class="diagram-node">PP</div></div>
        </section>`;
      }).join('')}
      <section class="card" style="margin-top:16px">
        <h2>${tr('معنى الرموز','Legend')}</h2>
        <div class="table-wrap"><table><thead><tr><th>${tr('الرمز','Code')}</th><th>العربية</th><th>English</th></tr></thead><tbody>${DATA.legend.map(x=>`<tr><td><b>${x.code}</b></td><td>${esc(x.ar)}</td><td dir="ltr">${esc(x.en)}</td></tr>`).join('')}</tbody></table></div>
      </section>`;
    setContent(html,'diagram');
  }

  function renderSupport(key){
    const item=DATA[key];
    const html=`
      ${pageHead(t(item.title),tr('قسم مخصص ضمن النظام','Dedicated system section'))}
      <div class="empty">
        <div style="font-size:48px;margin-bottom:10px">${key==='generators'?'⚡':'▤'}</div>
        <h2>${esc(t(item.title))}</h2>
        <p>${esc(t(item.message))}</p>
        ${statusTag(item.status)}
      </div>`;
    setContent(html,key);
  }

  function renderPrint(){
    const allPP=[];
    DATA.mdps.forEach(mdp=>mdp.mps.forEach(mp=>mp.pps.forEach(pp=>allPP.push({mdp,mp,pp}))));
    const html=`
      ${pageHead(tr('مركز الطباعة','Print Center'),tr('الطباعة مقتصرة على الصفحات والملصقات والمخطط العام المعتمد.','Printing is limited to the approved pages, labels and general diagram.'))}
      <div class="grid grid-3 no-print">
        ${DATA.printTypes.map(x=>`<div class="card"><h3>${esc(state.lang==='ar'?x.ar:x.en)}</h3><p>${x.id==='labels'?tr('يعرض ملصقات PP الداخلية وفق الحقول الثلاثة المعتمدة.','Shows internal PP labels using the three approved fields.'):tr('افتح الصفحة المطلوبة ثم استخدم زر الطباعة.','Open the required page and use the print button.')}</p>${x.id==='diagram'?`<a class="btn btn-outline" href="${routeHref('diagram')}">${tr('فتح','Open')}</a>`:''}</div>`).join('')}
      </div>
      <h2 style="margin:24px 0 12px;color:var(--navy)">${tr('ملصقات Power Panel الداخلية','Internal Power Panel Labels')}</h2>
      <div class="label-sheet">
        ${allPP.map(({mdp,mp,pp})=>`<section class="equipment-label">
          <div class="label-head">${esc(pp.tag)}</div>
          <div class="label-body">
            <div class="label-row"><div class="label-key">TAG No.</div><div>${esc(pp.tag)}</div></div>
            <div class="label-row"><div class="label-key">SOURCE</div><div>${esc(sourceForPP(mdp,mp))}</div></div>
            <div class="label-row"><div class="label-key">LOCATION</div><div>${esc(pp.location.en)}<br>${esc(pp.location.ar)}</div></div>
          </div>
        </section>`).join('')}
      </div>`;
    setContent(html,'print');
  }

  function renderNotFound(){
    setContent(`<div class="empty"><h1>404</h1><p>${tr('الصفحة المطلوبة غير موجودة.','The requested page was not found.')}</p><a class="btn btn-navy" href="${routeHref('home')}">${tr('العودة للرئيسية','Back Home')}</a></div>`,'');
  }

  window.addEventListener('hashchange',renderRoute);
  window.addEventListener('DOMContentLoaded',renderLayout);
})();
