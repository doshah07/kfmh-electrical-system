(() => {
  let scheduled = false;
  const tr = (ar,en) => (document.documentElement.lang || 'ar').startsWith('ar') ? ar : en;
  const currentRoute = () => (location.hash || '#/home').replace(/^#\//,'').split('?')[0].split('/').filter(Boolean);

  function addPageQR(){
    const content = document.querySelector('#content');
    if (!content || content.querySelector('.page-qr-extra')) return;
    const route = currentRoute();
    if (!['transformer','mdp','mp','pp'].includes(route[0])) return;
    const fullUrl = location.href;
    const box = document.createElement('section');
    box.className = 'card page-qr-extra no-print';
    box.innerHTML = `
      <div class="page-qr-copy">
        <div>
          <h2>${tr('رمز QR للصفحة','Page QR Code')}</h2>
          <p>${tr('يمكن تثبيت هذا الرمز بجانب المعدة لفتح صفحة التفاصيل مباشرة.','Place this code beside the equipment to open its detail page directly.')}</p>
          <button class="btn btn-outline" type="button" data-copy-page-link>🔗 ${tr('نسخ رابط الصفحة','Copy page link')}</button>
        </div>
        <img class="page-qr-image" alt="Page QR code" width="190" height="190" loading="lazy"
          src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(fullUrl)}">
      </div>`;
    content.appendChild(box);
    box.querySelector('[data-copy-page-link]')?.addEventListener('click', async e => {
      try {
        await navigator.clipboard.writeText(fullUrl);
        e.currentTarget.textContent = tr('✓ تم نسخ الرابط','✓ Link copied');
      } catch {
        prompt(tr('انسخ الرابط','Copy the link'), fullUrl);
      }
    });
  }

  function addQuickIndex(){
    const content = document.querySelector('#content');
    if (!content || content.querySelector('.quick-index-extra')) return;
    const route = currentRoute();
    if (route[0] !== 'home' || !window.KFMH_DATA) return;
    const section = document.createElement('section');
    section.className = 'card quick-index-extra';
    section.innerHTML = `
      <h2>${tr('الفهرس السريع للوحات','Quick Panel Index')}</h2>
      <p>${tr('رابط واحد للوصول إلى MDP ثم صفحات MP التابعة لها.','One index for opening each MDP and its MP pages.')}</p>
      <div class="quick-index-grid">
        ${window.KFMH_DATA.mdps.map(mdp => `
          <div class="quick-index-group">
            <a class="quick-index-mdp" href="#/mdp/${encodeURIComponent(mdp.id)}">▦ ${mdp.id}</a>
            <div class="quick-index-mps">
              ${mdp.mps.length ? mdp.mps.map(mp => `<a href="#/mp/${encodeURIComponent(mp.id)}">🖼️ ${mp.tag || mp.id}</a>`).join('') : `<span>${tr('بانتظار البيانات','Pending data')}</span>`}
            </div>
          </div>`).join('')}
      </div>`;
    content.appendChild(section);
  }

  function enhance(){
    scheduled = false;
    addPageQR();
    addQuickIndex();
  }
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhance);
  }
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('hashchange',schedule);
  window.addEventListener('DOMContentLoaded',schedule);
})();
