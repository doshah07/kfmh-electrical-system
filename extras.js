(() => {
  let scheduled = false;
  const tr = (ar, en) => (document.documentElement.lang || 'ar').startsWith('ar') ? ar : en;
  const currentRoute = () => (location.hash || '#/home')
    .replace(/^#\//, '')
    .split('?')[0]
    .split('/')
    .filter(Boolean);

  function addQuickIndex() {
    const content = document.querySelector('#content');
    if (!content || content.querySelector('.quick-index-extra')) return;
    const route = currentRoute();
    if (route[0] !== 'home' || !window.KFMH_DATA) return;

    const section = document.createElement('section');
    section.className = 'card quick-index-extra';
    section.innerHTML = `
      <h2>${tr('الفهرس السريع للوحات', 'Quick Panel Index')}</h2>
      <p>${tr(
        'من داخل النظام نفسه: افتح MDP ثم لوحات MP التابعة لها.',
        'Inside the same system: open each MDP and its MP pages.'
      )}</p>
      <div class="quick-index-grid">
        ${window.KFMH_DATA.mdps.map(mdp => `
          <div class="quick-index-group">
            <a class="quick-index-mdp" href="#/mdp/${encodeURIComponent(mdp.id)}">▦ ${mdp.id}</a>
            <div class="quick-index-mps">
              ${mdp.mps.length
                ? mdp.mps.map(mp => `<a href="#/mp/${encodeURIComponent(mp.id)}">🖼️ ${mp.tag || mp.id}</a>`).join('')
                : `<span>${tr('بانتظار البيانات', 'Pending data')}</span>`}
            </div>
          </div>`).join('')}
      </div>`;
    content.appendChild(section);
  }

  function enhance() {
    scheduled = false;
    addQuickIndex();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhance);
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('DOMContentLoaded', schedule);
})();
