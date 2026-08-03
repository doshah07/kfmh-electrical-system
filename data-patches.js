(() => {
  const data = window.KFMH_DATA;
  if (!data) return;

  // MDP4 and MDP5 have confirmed MP counts only. No downstream PP count or
  // details have been received, so the system must not invent placeholder PPs.
  data.mdps
    .filter(mdp => mdp.id === 'MDP4' || mdp.id === 'MDP5')
    .forEach(mdp => mdp.mps.forEach(mp => {
      mp.pps = [];
      mp.notes = {
        ar: 'لم تُستلم تفاصيل الاسم والسعة أو لوحات PP التابعة بعد.',
        en: 'Name, rating and downstream PP details have not been received yet.'
      };
    }));
})();
