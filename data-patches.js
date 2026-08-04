(() => {
  const data = window.KFMH_DATA;
  if (!data) return;

  data.meta.projectName = {
    ar: 'نظام إدارة توزيع الطاقة الكهربائية',
    en: 'Electrical Distribution Management System'
  };
  data.meta.version = '1.5';
  data.meta.updated = 'August 2026';

  const byTr = id => data.transformers.find(item => item.id === id);
  const byMdp = id => data.mdps.find(item => item.id === id);

  // TR1 is a direct transformer-to-MP arrangement. MDP1 is retained only as an
  // internal data container so the existing router can render the four MPs.
  const tr1 = byTr('TR1');
  const tr1Container = byMdp('MDP1');
  if (tr1 && tr1Container) {
    tr1.name = { ar: 'المحول 1 - التشيلر', en: 'Transformer 1 - Chiller' };
    tr1.ratingKva = 1500;
    tr1.sourcePath = ['RMU (OS)', 'TR1'];
    tr1.notes = {
      ar: 'تغذية مباشرة إلى اللوحات الرئيسية. لا يوجد FED أو ATS أو MDP.',
      en: 'Direct supply to the Main Panels. No FED, ATS or MDP.'
    };
    tr1Container.name = { ar: 'اللوحات الرئيسية المباشرة للمحول 1', en: 'Transformer 1 Direct Main Panels' };
    tr1Container.sourcePath = ['RMU (OS)', 'TR1'];
    tr1Container.ratingA = null;
    tr1Container.mps.forEach(mp => {
      const n = mp.number;
      mp.id = `TR1-MP${n}`;
      mp.tag = `TR1-MP${n}`;
      mp.location = mp.name;
      mp.pps.forEach((pp, index) => {
        pp.tag = `TR1.MP${n}.PP${index + 1}`;
        pp.location = mp.name;
      });
    });
  }

  const tr2 = byTr('TR2');
  if (tr2) tr2.name = { ar: 'المحول 2', en: 'Transformer 2' };
  const mdp2 = byMdp('MDP2');
  if (mdp2) {
    const mp4 = mdp2.mps.find(mp => mp.number === 4);
    if (mp4) mp4.ratingA = 400;
  }

  const tr3 = byTr('TR3');
  if (tr3) {
    tr3.name = { ar: 'المحول 3', en: 'Transformer 3' };
    tr3.ratingKva = 1500;
  }

  // TR4 and TR5 are also direct MP groups. MDP4/MDP5 remain internal containers
  // only; no PP data is invented while field details are pending.
  [
    {
      trId: 'TR4', containerId: 'MDP4', count: 5,
      path: ['RMU (OS)', 'TR4', 'ATS3 (Automatic)'],
      ar: 'المحول 4 - العيادات الخارجية', en: 'Transformer 4 - Outpatient Clinics',
      noteAr: 'ATS3 تشغيل تلقائي. لا يوجد FED أو MDP.',
      noteEn: 'ATS3 automatic operation. No FED or MDP.'
    },
    {
      trId: 'TR5', containerId: 'MDP5', count: 6,
      path: ['RMU (OS)', 'TR5', 'ATS3 (Manual)'],
      ar: 'المحول 5 - عيادات الصحة النفسية', en: 'Transformer 5 - Psychiatry',
      noteAr: 'ATS3 تشغيل يدوي. لا يوجد FED أو MDP.',
      noteEn: 'ATS3 manual operation. No FED or MDP.'
    }
  ].forEach(cfg => {
    const tr = byTr(cfg.trId);
    const container = byMdp(cfg.containerId);
    if (!tr || !container) return;
    tr.name = { ar: cfg.ar, en: cfg.en };
    tr.sourcePath = cfg.path;
    tr.notes = { ar: cfg.noteAr, en: cfg.noteEn };
    container.name = {
      ar: `اللوحات الرئيسية المباشرة للمحول ${cfg.trId.slice(2)}`,
      en: `${cfg.trId} Direct Main Panels`
    };
    container.sourcePath = cfg.path;
    container.ratingA = null;
    container.mps.forEach(mp => {
      const n = mp.number;
      mp.id = `${cfg.trId}-MP${n}`;
      mp.tag = `${cfg.trId}-MP${n}`;
      mp.name = { ar: 'البيانات قيد الاستكمال', en: 'Data pending confirmation' };
      mp.location = { ar: 'قيد الاستكمال', en: 'Pending confirmation' };
      mp.ratingA = null;
      mp.pps = [];
      mp.status = 'pending';
      mp.notes = {
        ar: 'المعاينة الميدانية مطلوبة، ولم تُستلم أسماء القواطع أو مواقع اللوحات بعد.',
        en: 'Field verification is required; breaker names and panel locations have not yet been received.'
      };
    });
  });

  // The PDF's official summary is 5 transformers, 2 physical MDPs, 37 MPs and
  // 93 documented PPs (TR2: 28, TR3: 65). Mark the support sections as complete
  // structured sections without inventing equipment values.
  data.generators.status = 'confirmed';
  data.ups.status = 'confirmed';
})();
