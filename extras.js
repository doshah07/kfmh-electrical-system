(() => {
  let scheduled = false;
  const isArabic = () => (document.documentElement.lang || 'ar').startsWith('ar');
  const tr = (ar, en) => isArabic() ? ar : en;
  const route = () => (location.hash || '#/home').replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  const data = () => window.KFMH_DATA;

  function containerForTransformer(trItem) {
    return data()?.mdps?.find(mdp => mdp.id === trItem.mdpId);
  }

  function fixOfficialHomeTotals() {
    if (route()[0] !== 'home') return;
    const stats = [...document.querySelectorAll('#content .grid.grid-4 .card.stat strong')];
    const official = ['5', '2', '37', '93'];
    stats.slice(0, 4).forEach((node, index) => { node.textContent = official[index]; });
  }

  function addProfessionalIndex() {
    const content = document.querySelector('#content');
    if (!content || content.querySelector('.quick-index-extra') || route()[0] !== 'home' || !data()) return;

    const section = document.createElement('section');
    section.className = 'card quick-index-extra';
    section.innerHTML = `
      <div class="quick-index-title">
        <div>
          <h2>${tr('الدخول المباشر إلى أقسام الكهرباء', 'Direct Electrical Navigation')}</h2>
          <p>${tr('اضغط على أي محول أو لوحة للانتقال إلى صفحتها داخل النظام نفسه.', 'Select any transformer or panel to open its page inside the same system.')}</p>
        </div>
        <span class="tag ok">${tr('متصفح تفاعلي', 'Interactive Browser')}</span>
      </div>
      <div class="quick-index-grid transformer-index-grid">
        ${data().transformers.map(transformer => {
          const container = containerForTransformer(transformer);
          const physicalMdp = transformer.id === 'TR2' || transformer.id === 'TR3';
          return `
            <article class="quick-index-group transformer-index-card">
              <a class="quick-index-mdp transformer-open" href="#/transformer/${transformer.id}">
                <span class="transformer-code">${transformer.id}</span>
                <span>${isArabic() ? transformer.name.ar : transformer.name.en}</span>
              </a>
              <div class="transformer-path">${transformer.sourcePath.join(' → ')}</div>
              ${physicalMdp ? `<a class="physical-mdp-link" href="#/mdp/${container.id}">▦ ${container.id}</a>` : ''}
              <div class="quick-index-mps">
                ${(container?.mps || []).map(mp => `<a href="#/mp/${encodeURIComponent(mp.id)}">${mp.tag || mp.id}</a>`).join('')}
              </div>
            </article>`;
        }).join('')}
      </div>`;
    content.appendChild(section);
  }

  function relabelDirectTransformerPages() {
    const current = route();
    const directMap = {
      TR1: { container: 'MDP1', titleAr: 'اللوحات الرئيسية المباشرة للمحول 1', titleEn: 'Transformer 1 Direct Main Panels' },
      TR4: { container: 'MDP4', titleAr: 'اللوحات الرئيسية المباشرة للمحول 4', titleEn: 'Transformer 4 Direct Main Panels' },
      TR5: { container: 'MDP5', titleAr: 'اللوحات الرئيسية المباشرة للمحول 5', titleEn: 'Transformer 5 Direct Main Panels' }
    };

    if (current[0] === 'transformer' && directMap[current[1]]) {
      const cfg = directMap[current[1]];
      const cards = [...document.querySelectorAll('#content > section.card')];
      const directCard = cards.find(card => card.querySelector(`a[href="#/mdp/${cfg.container}"]`));
      if (directCard) {
        const heading = directCard.querySelector('h2');
        const desc = directCard.querySelector('p');
        const open = directCard.querySelector('a.btn');
        if (heading) heading.textContent = isArabic() ? cfg.titleAr : cfg.titleEn;
        if (desc) desc.textContent = tr('مجموعة لوحات MP مغذاة مباشرة من مسار المحول.', 'Main Panels supplied directly from the transformer path.');
        if (open) open.textContent = tr('فتح اللوحات الرئيسية', 'Open Main Panels');
        directCard.querySelectorAll('.kv .key').forEach(node => {
          if (node.textContent.trim() === 'السعة' || node.textContent.trim() === 'Rating') node.parentElement?.remove();
        });
      }
    }

    if (current[0] === 'mdp') {
      const match = Object.entries(directMap).find(([, cfg]) => cfg.container === current[1]);
      if (match) {
        const [trId, cfg] = match;
        const head = document.querySelector('#content .page-head h1');
        const desc = document.querySelector('#content .page-head p');
        if (head) head.textContent = `${trId} — ${isArabic() ? cfg.titleAr : cfg.titleEn}`;
        if (desc) desc.textContent = tr('اللوحات الرئيسية المتصلة مباشرة بمسار المحول.', 'Main Panels connected directly to the transformer path.');
        document.querySelectorAll('#content .icon-badge').forEach(node => {
          if (node.textContent.trim() === 'MDP') node.textContent = 'TR';
        });
      }
    }
  }

  function improveMobileLabels() {
    document.querySelectorAll('.card-link').forEach(link => link.setAttribute('aria-label', link.textContent.trim().replace(/\s+/g, ' ')));
  }

  function enhance() {
    scheduled = false;
    fixOfficialHomeTotals();
    addProfessionalIndex();
    relabelDirectTransformerPages();
    improveMobileLabels();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhance);
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('DOMContentLoaded', schedule);
})();
