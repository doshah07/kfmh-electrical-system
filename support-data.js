(() => {
  const generators = [
    {
      number: 1,
      id: 'GEN-1',
      area: 'Power House',
      servedArea: 'Main hospital',
      manufacturer: 'Kohler',
      model: '1000ROZMC',
      serialNumber: 'SGM32D53G',
      kw: 1000,
      kva: 1250,
      voltage: 380,
      installYear: null,
      condition: 'Good',
      performanceLevel: 'Critical',
      explanation: {
        ar: 'مرتبط بمنظومة المحولين 2 و3 عبر لوحة المزامنة المشتركة مع المولد 2.',
        en: 'Associated with Transformers 2 and 3 through the shared synchronizing panel with Generator 2.'
      }
    },
    {
      number: 2,
      id: 'GEN-2',
      area: 'Power House',
      servedArea: 'Main hospital',
      manufacturer: 'Kohler',
      model: 'KD1000UF',
      serialNumber: '19009740',
      kw: 1000,
      kva: 1250,
      voltage: 380,
      installYear: 2022,
      condition: 'Good',
      performanceLevel: 'Critical',
      explanation: {
        ar: 'مرتبط بمنظومة المحولين 2 و3 عبر لوحة المزامنة المشتركة مع المولد 1.',
        en: 'Associated with Transformers 2 and 3 through the shared synchronizing panel with Generator 1.'
      }
    },
    {
      number: 3,
      id: 'GEN-3',
      area: 'OPC Generator Room',
      servedArea: 'OPC Building',
      manufacturer: 'Cummins',
      model: 'C350D6',
      serialNumber: 'C08KALV060',
      kw: 350,
      kva: 438,
      voltage: 380,
      installYear: 2008,
      condition: 'Good',
      performanceLevel: 'Important',
      explanation: {
        ar: 'المولد 3 خاص بالمحول 4.',
        en: 'Generator 3 is dedicated to Transformer 4.'
      }
    },
    {
      number: 4,
      id: 'GEN-4',
      area: 'Generator Room',
      servedArea: 'Abha Clinic',
      manufacturer: 'Kohler',
      model: 'KH03544TO4D',
      serialNumber: '2180167',
      kw: 720,
      kva: 900,
      voltage: 380,
      installYear: null,
      condition: 'Good',
      performanceLevel: 'Important',
      explanation: null
    },
    {
      number: 5,
      id: 'GEN-5',
      area: 'MCC Outside',
      servedArea: 'MCC - Dental Clinics',
      manufacturer: 'Stamford',
      model: '6M26G50016',
      serialNumber: '2823B000049',
      kw: 356,
      kva: 445,
      voltage: 380,
      installYear: null,
      condition: 'Good',
      performanceLevel: 'Important',
      explanation: null
    },
    {
      number: 6,
      id: 'GEN-6',
      area: 'Warehouse outside',
      servedArea: 'Warehouse',
      manufacturer: 'Stamford',
      model: '6M26G50015',
      serialNumber: '2823B000050',
      kw: 356,
      kva: 445,
      voltage: 380,
      installYear: null,
      condition: 'Good',
      performanceLevel: 'Important',
      explanation: null
    },
    {
      number: 7,
      id: 'GEN-7',
      area: 'Clinic Outside',
      servedArea: 'Airbase Clinics',
      manufacturer: 'AKSA',
      model: '800S',
      serialNumber: 'CAT3412CCDK600563',
      kw: 275,
      kva: 344,
      voltage: 380,
      installYear: null,
      condition: 'Good',
      performanceLevel: 'Important',
      explanation: null
    },
    {
      number: 8,
      id: 'GEN-8',
      area: 'Clinic Outside',
      servedArea: 'Preventive Medicine',
      manufacturer: 'Caterpillar',
      model: 'C13PGAT',
      serialNumber: 'CAT00C13HDH401266',
      kw: 350,
      kva: 438,
      voltage: 220,
      installYear: null,
      condition: 'Standby',
      performanceLevel: null,
      explanation: null
    }
  ];

  const upsUnits = [
    { number: 1, make: 'ABB', model: 'POWER WAVE 33', serialNumber: 'P2W 1075', kva: 200, location: 'NICU', status: 'operational' },
    { number: 2, make: 'ABB', model: 'POWER WAVE 33', serialNumber: 'P2W 1074', kva: 200, location: 'NICU', status: 'operational' },
    { number: 3, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H472KXX29', kva: 40, location: 'NICU', status: 'operational' },
    { number: 4, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H472KXX30', kva: 40, location: 'NICU', status: 'operational' },
    { number: 5, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H482KXX30', kva: 40, location: 'NICU', status: 'operational' },
    { number: 6, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H481KXX27', kva: 40, location: 'NICU', status: 'operational' },
    { number: 7, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H422KXX31', kva: 40, location: 'NICU', status: 'operational' },
    { number: 8, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H462KXX06', kva: 40, location: 'NICU', status: 'operational' },
    { number: 9, make: 'ABB', model: 'POWER SCALE 33', serialNumber: 'P2557045', kva: 40, location: 'NICU', status: 'operational' },
    { number: 10, make: 'ABB', model: 'POWER SCALE 33', serialNumber: 'P2557426', kva: 40, location: 'NICU', status: 'operational' },
    { number: 11, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H482KXX29', kva: 40, location: 'ER', status: 'operational' },
    { number: 12, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2J022KXX20', kva: 40, location: 'ER', status: 'operational' },
    { number: 13, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H482KXX28', kva: 40, location: 'HDU', status: 'faulty' },
    { number: 14, make: 'EATON', model: '9355-40-N-0-MBS', serialNumber: '2H492KXX39', kva: 40, location: 'HDU', status: 'operational' },
    { number: 15, make: 'SCHNEIDER', model: 'GALAXY 5500', serialNumber: 'IJ-3N1Q11080001', kva: 60, location: 'OR', status: 'operational' }
  ];

  window.KFMH_SUPPORT_DATA = {
    generators: {
      title: { ar: 'مولدات المستشفى', en: 'Hospital Generators' },
      scopeNote: {
        ar: 'تم تسجيل المولدات الثمانية كاملة. الشرح التفصيلي للربط يظهر فقط للمولدات 1 و2 و3 حسب المعلومات المؤكدة.',
        en: 'All eight generators are registered. Detailed association notes are shown only for Generators 1, 2 and 3, based on confirmed information.'
      },
      synchronizingPanel: {
        ar: 'لوحة مزامنة مشتركة للمولدين 1 و2',
        en: 'Shared Synchronizing Panel Board for Generators 1 and 2'
      },
      items: generators
    },
    ups: {
      title: { ar: 'وحدات UPS', en: 'UPS Units' },
      summary: {
        total: 15,
        byMake: { ABB: 4, EATON: 10, SCHNEIDER: 1 },
        faultyUnits: [13]
      },
      items: upsUnits,
      note: {
        ar: 'تم تسجيل 15 وحدة UPS كما في الجدول. الوحدة رقم 13 عطلانة، مع الاحتفاظ بجميع بياناتها.',
        en: 'All 15 UPS units are registered as listed. Unit 13 is faulty, with all its data retained.'
      }
    }
  };

  if (window.KFMH_DATA) {
    window.KFMH_DATA.generators.status = 'confirmed';
    window.KFMH_DATA.generators.message = {
      ar: 'تم تسجيل 8 مولدات، مع شرح المولدات 1 و2 و3 فقط حسب البيانات المؤكدة.',
      en: 'Eight generators are registered, with detailed notes for Generators 1, 2 and 3 only.'
    };
    window.KFMH_DATA.ups.status = 'confirmed';
    window.KFMH_DATA.ups.message = {
      ar: 'تم تسجيل 15 وحدة UPS. الوحدة رقم 13 عطلانة.',
      en: 'Fifteen UPS units are registered. Unit 13 is faulty.'
    };
  }
})();
