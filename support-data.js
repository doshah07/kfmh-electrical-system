(() => {
  const batteries = Array.from({ length: 44 }, (_, index) => {
    const number = index + 1;
    return {
      id: `BAT-${String(number).padStart(2, '0')}`,
      number,
      manufacturer: 'SHOTO',
      model: null,
      condition: number === 13 ? 'faulty' : 'installed-unverified',
      note: number === 13
        ? { ar: 'عطلان — تم تأكيد العطل من الفني/ عبدالله عسيري.', en: 'FAULTY — fault confirmed by Technician Abdullah Asiri.' }
        : { ar: 'مركب — الحالة الفردية تحتاج قياسًا وفحصًا ميدانيًا.', en: 'Installed — individual condition requires field measurement and inspection.' }
    };
  });

  window.KFMH_SUPPORT_DATA = {
    generators: {
      title: { ar: 'مولدات المستشفى', en: 'Hospital Generators' },
      status: 'confirmed-partial',
      scopeNote: {
        ar: 'شرح وربط المولدات يظهر داخل قسم المولدات فقط.',
        en: 'Generator explanation and associations are shown only in the Generators section.'
      },
      synchronizingPanel: {
        ar: 'لوحة مزامنة مشتركة للمولدين 1 و2',
        en: 'Shared Synchronizing Panel Board for Generators 1 and 2'
      },
      items: [
        {
          id: 'GEN-1',
          name: { ar: 'المولد 1', en: 'Generator 1' },
          manufacturer: 'KOHLER',
          ratingKva: 1250,
          association: { ar: 'مرتبط بمنظومة المحولين 2 و3', en: 'Associated with Transformers 2 and 3 system' },
          connection: { ar: 'عبر لوحة المزامنة المشتركة مع المولد 2', en: 'Through the shared synchronizing panel with Generator 2' },
          status: 'confirmed'
        },
        {
          id: 'GEN-2',
          name: { ar: 'المولد 2', en: 'Generator 2' },
          manufacturer: 'KOHLER',
          ratingKva: 1250,
          association: { ar: 'مرتبط بمنظومة المحولين 2 و3', en: 'Associated with Transformers 2 and 3 system' },
          connection: { ar: 'عبر لوحة المزامنة المشتركة مع المولد 1', en: 'Through the shared synchronizing panel with Generator 1' },
          status: 'confirmed'
        },
        {
          id: 'GEN-3',
          name: { ar: 'المولد 3', en: 'Generator 3' },
          manufacturer: null,
          ratingKva: null,
          association: { ar: 'خاص بالمحول 4', en: 'Dedicated to Transformer 4' },
          connection: { ar: 'تفاصيل القدرة والربط النهائي قيد استكمال التوثيق.', en: 'Rating and final connection details are pending documentation.' },
          status: 'partial'
        }
      ]
    },
    ups: {
      title: { ar: 'أنظمة UPS والبطاريات', en: 'UPS & Battery Systems' },
      status: 'confirmed-partial',
      batteryBank: {
        manufacturer: 'SHOTO',
        model: null,
        quantity: 44,
        numberingFrom: 1,
        numberingTo: 44,
        physicalArrangement: { ar: '4 أعمدة × 11 بطارية', en: '4 columns × 11 batteries' },
        confirmedFaulty: [13],
        note: {
          ar: 'تم تسجيل جميع البطاريات من 01 إلى 44. البطارية رقم 13 عطلانة. الموديل والسعة والجهد الفردي غير مقروءة بوضوح في الصورة، لذلك لم يتم افتراضها.',
          en: 'All batteries from 01 to 44 are registered. Battery 13 is faulty. Model, capacity and individual voltage are not clearly legible in the photo and have not been assumed.'
        },
        batteries
      }
    }
  };

  if (window.KFMH_DATA) {
    window.KFMH_DATA.generators.status = 'confirmed';
    window.KFMH_DATA.generators.message = {
      ar: 'تم تسجيل المولدات 1 و2 و3، مع شرح الربط داخل قسم المولدات فقط.',
      en: 'Generators 1, 2 and 3 are registered, with association details shown only in the Generators section.'
    };
    window.KFMH_DATA.ups.status = 'partial';
    window.KFMH_DATA.ups.message = {
      ar: 'تم تسجيل بنك بطاريات SHOTO بعدد 44 بطارية؛ البطارية رقم 13 عطلانة.',
      en: 'A 44-unit SHOTO battery bank is registered; battery 13 is faulty.'
    };
  }
})();
