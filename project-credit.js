(() => {
  const CREDIT_AR = 'إعداد المشروع الفني/ عبدالله عسيري';
  const CREDIT_EN = 'Technical Project Preparation / Abdullah Asiri';

  function isArabic() {
    return (document.documentElement.lang || 'ar').toLowerCase().startsWith('ar');
  }

  function applyCredit() {
    const text = isArabic() ? CREDIT_AR : CREDIT_EN;

    const footer = document.querySelector('.footer');
    if (footer) {
      let credit = footer.querySelector('.project-credit');
      if (!credit) {
        credit = document.createElement('div');
        credit.className = 'project-credit';
        footer.appendChild(credit);
      }
      credit.textContent = text;
    }

    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (sidebarFooter) {
      let credit = sidebarFooter.querySelector('.project-credit');
      if (!credit) {
        credit = document.createElement('div');
        credit.className = 'project-credit';
        sidebarFooter.appendChild(credit);
      }
      credit.textContent = text;
    }

    const page = document.querySelector('.document-page, .viewer-page, .page-canvas, #content');
    if (page && !document.querySelector('.project-credit-badge')) {
      const badge = document.createElement('div');
      badge.className = 'project-credit-badge no-print';
      badge.textContent = text;
      document.body.appendChild(badge);
    } else {
      const badge = document.querySelector('.project-credit-badge');
      if (badge) badge.textContent = text;
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    .project-credit{margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.16);font-weight:800;line-height:1.6}
    .footer .project-credit{border-top:0;color:#062a54;font-size:13px}
    .project-credit-badge{position:fixed;inset-inline-end:18px;bottom:14px;z-index:12;background:rgba(6,42,84,.94);color:#fff;border:1px solid rgba(213,168,63,.7);border-radius:10px;padding:8px 12px;font:800 12px/1.4 Tahoma,Arial,sans-serif;box-shadow:0 8px 22px rgba(6,42,84,.2);pointer-events:none}
    @media(max-width:820px){.project-credit-badge{inset-inline-end:10px;bottom:10px;font-size:10px;padding:6px 9px;max-width:72vw}}
    @media print{.project-credit-badge{display:none!important}}
  `;
  document.head.appendChild(style);

  new MutationObserver(applyCredit).observe(document.documentElement, {childList:true, subtree:true});
  window.addEventListener('hashchange', applyCredit);
  window.addEventListener('DOMContentLoaded', applyCredit);
  applyCredit();
})();
