window.KFMH_DATA = {
  "meta": {
    "projectName": {
      "ar": "نظام إدارة توزيع الكهرباء - المستشفى العسكري",
      "en": "Military Hospital Electrical Distribution Management System"
    },
    "version": "2.0.0-beta",
    "updated": "2026-08-04",
    "confidential": true
  },
  "legend": [
    {
      "code": "RMU",
      "ar": "وحدة الربط الحلقي للجهد المتوسط",
      "en": "Ring Main Unit"
    },
    {
      "code": "TR",
      "ar": "محول",
      "en": "Transformer"
    },
    {
      "code": "FED",
      "ar": "قاطع التغذية",
      "en": "Feeder Breaker"
    },
    {
      "code": "ATS",
      "ar": "مفتاح التحويل الآلي",
      "en": "Automatic Transfer Switch"
    },
    {
      "code": "MDP",
      "ar": "لوحة التوزيع الرئيسية",
      "en": "Main Distribution Panel"
    },
    {
      "code": "MP",
      "ar": "اللوحة الرئيسية",
      "en": "Main Panel"
    },
    {
      "code": "PP",
      "ar": "لوحة القوى",
      "en": "Power Panel"
    }
  ],
  "transformers": [
    {
      "id": "TR1",
      "number": 1,
      "name": {
        "ar": "محول المبردات",
        "en": "Chiller Transformer"
      },
      "ratingKva": null,
      "lvV": 400,
      "supply": "external",
      "sourcePath": [
        "RMU (OS)",
        "TR1",
        "MDP1"
      ],
      "mdpId": "MDP1",
      "notes": {
        "ar": "لا يوجد FED ولا ATS في هذا المسار.",
        "en": "No FED or ATS on this path."
      }
    },
    {
      "id": "TR2",
      "number": 2,
      "name": {
        "ar": "المحول رقم 2",
        "en": "Transformer 2"
      },
      "ratingKva": 1500,
      "lvV": 400,
      "supply": "internal",
      "sourcePath": [
        "RMU1",
        "TR2",
        "FED2 2500A",
        "ATS4 2500A",
        "MDP2 2500A"
      ],
      "mdpId": "MDP2",
      "notes": {
        "ar": "تغذية داخلية عبر RMU1.",
        "en": "Internal supply through RMU1."
      }
    },
    {
      "id": "TR3",
      "number": 3,
      "name": {
        "ar": "المحول رقم 3",
        "en": "Transformer 3"
      },
      "ratingKva": null,
      "lvV": 400,
      "supply": "internal",
      "sourcePath": [
        "RMU1",
        "TR3",
        "FED3",
        "ATS5",
        "MDP3"
      ],
      "mdpId": "MDP3",
      "notes": {
        "ar": "تغذية داخلية عبر RMU1.",
        "en": "Internal supply through RMU1."
      }
    },
    {
      "id": "TR4",
      "number": 4,
      "name": {
        "ar": "محول العيادات الخارجية",
        "en": "Outpatient Clinics Transformer"
      },
      "ratingKva": 500,
      "lvV": 400,
      "supply": "external",
      "sourcePath": [
        "RMU (OS)",
        "TR4",
        "ATS3 (Shared)",
        "MDP4"
      ],
      "mdpId": "MDP4",
      "notes": {
        "ar": "ATS3 مشترك مع MDP5.",
        "en": "ATS3 is shared with MDP5."
      }
    },
    {
      "id": "TR5",
      "number": 5,
      "name": {
        "ar": "محول عيادات الصحة النفسية",
        "en": "Psychiatric Clinics Transformer"
      },
      "ratingKva": 500,
      "lvV": 400,
      "supply": "external",
      "sourcePath": [
        "RMU (OS)",
        "TR5",
        "ATS3 (Shared / Manual)",
        "MDP5"
      ],
      "mdpId": "MDP5",
      "notes": {
        "ar": "الربط عبر ATS3 المشترك والتشغيل يدوي لـ MDP5.",
        "en": "Connection through shared ATS3; MDP5 operation is manual."
      }
    }
  ],
  "mdps": [
    {
      "id": "MDP1",
      "name": {
        "ar": "لوحة توزيع المبردات",
        "en": "Chiller Main Distribution Panel"
      },
      "ratingA": 2500,
      "transformerId": "TR1",
      "sourcePath": [
        "RMU (OS)",
        "TR1",
        "MDP1"
      ],
      "status": "confirmed",
      "mps": [
        {
          "id": "MDP1-MP1",
          "number": 1,
          "tag": "MDP1-MP1",
          "ratingA": 800,
          "name": {
            "ar": "المبرد 1",
            "en": "Chiller 1"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP1.MP1.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP1-MP5",
          "number": 5,
          "tag": "MDP1-MP5",
          "ratingA": 400,
          "name": {
            "ar": "المبرد 5",
            "en": "Chiller 5"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP1.MP5.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP1-MP4",
          "number": 4,
          "tag": "MDP1-MP4",
          "ratingA": 400,
          "name": {
            "ar": "المبرد 4",
            "en": "Chiller 4"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP1.MP4.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP1-MP3",
          "number": 3,
          "tag": "MDP1-MP3",
          "ratingA": 400,
          "name": {
            "ar": "المبرد 3",
            "en": "Chiller 3"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP1.MP3.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        }
      ]
    },
    {
      "id": "MDP2",
      "name": {
        "ar": "لوحة التوزيع الرئيسية 2",
        "en": "Main Distribution Panel 2"
      },
      "ratingA": 2500,
      "transformerId": "TR2",
      "sourcePath": [
        "RMU1",
        "TR2",
        "FED2 2500A",
        "ATS4 2500A",
        "MDP2 2500A"
      ],
      "status": "confirmed",
      "mps": [
        {
          "id": "MDP2-MP1",
          "number": 1,
          "tag": "MDP2-MP1",
          "ratingA": 100,
          "name": {
            "ar": "لوحة توزيع محطة الطاقة",
            "en": "Power House Distribution Board"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP1.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP2",
          "number": 2,
          "tag": "MDP2-MP2",
          "ratingA": 200,
          "name": {
            "ar": "لوحة توزيع نظام الفاكيوم الجديدة",
            "en": "New Vacuum Distribution Board"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP2.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP3",
          "number": 3,
          "tag": "MDP2-MP3",
          "ratingA": 400,
          "name": {
            "ar": "لوحة التوزيع الرئيسية لأجنحة التنويم / قسم ما بعد الولادة",
            "en": "Wards Main Distribution Panel / Post Partum"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP3.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP2",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP3",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP4",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP5",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 5",
                "en": "Power Panel 5"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP6",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 6",
                "en": "Power Panel 6"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP7",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 7",
                "en": "Power Panel 7"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP3.PP8",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 8",
                "en": "Power Panel 8"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP4",
          "number": 4,
          "tag": "MDP2-MP4",
          "ratingA": 400,
          "name": {
            "ar": "لوحة التوزيع العادية لسطح المبنى",
            "en": "Roof Top Normal Distribution Panel"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "تم اعتماد تصحيح سعة القاطع إلى 400A.",
            "en": "Breaker rating correction to 400A is applied."
          },
          "pps": [
            {
              "tag": "MDP2.MP4.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP2",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP3",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP4",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP5",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 5",
                "en": "Power Panel 5"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP6",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 6",
                "en": "Power Panel 6"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP7",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 7",
                "en": "Power Panel 7"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP4.PP8",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 8",
                "en": "Power Panel 8"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP5",
          "number": 5,
          "tag": "MDP2-MP5",
          "ratingA": 630,
          "name": {
            "ar": "لوحة التوزيع بالقرب من المحول رقم 1",
            "en": "Distribution Panel Near Transformer No. 1"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP5.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP6",
          "number": 6,
          "tag": "MDP2-MP6",
          "ratingA": 400,
          "name": {
            "ar": "لوحة التوزيع الرئيسية لغرف العمليات",
            "en": "Main Operating Room Distribution Panel"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP6.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP6.PP2",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP6.PP3",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP6.PP4",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP7",
          "number": 7,
          "tag": "MDP2-MP7",
          "ratingA": 400,
          "name": {
            "ar": "مضخة الحريق",
            "en": "Fire Pump"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP7.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP2-MP8",
          "number": 8,
          "tag": "MDP2-MP8",
          "ratingA": 100,
          "name": {
            "ar": "المصدر الرئيسي لـ UPS غرف العمليات / المصدر الرئيسي لغرف عمليات قسم الولادة",
            "en": "OR UPS Mains / L&D OR Mains"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP2.MP8.PP1",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP8.PP2",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP8.PP3",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP2.MP8.PP4",
              "ratingA": null,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        }
      ]
    },
    {
      "id": "MDP3",
      "name": {
        "ar": "لوحة التوزيع الرئيسية 3",
        "en": "Main Distribution Panel 3"
      },
      "ratingA": null,
      "transformerId": "TR3",
      "sourcePath": [
        "RMU1",
        "TR3",
        "FED3",
        "ATS5",
        "MDP3"
      ],
      "status": "confirmed",
      "mps": [
        {
          "id": "MDP3-MP1",
          "number": 1,
          "tag": "MDP3-MP1",
          "ratingA": 630,
          "name": {
            "ar": "ورشة الكهرباء",
            "en": "Electrical Workshop"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP1.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP1.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP1.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP1.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP1.PP5",
              "ratingA": 50,
              "name": {
                "ar": "ورشة الأكسجين",
                "en": "Oxygen Workshop"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP1.PP6",
              "ratingA": 250,
              "name": {
                "ar": "الغلاية 1",
                "en": "Boiler 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP1.PP7",
              "ratingA": 250,
              "name": {
                "ar": "الغلاية 2",
                "en": "Boiler 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP2",
          "number": 2,
          "tag": "MDP3-MP2",
          "ratingA": 630,
          "name": {
            "ar": "التعقيم",
            "en": "CSSD"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP2.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP2.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP3",
          "number": 3,
          "tag": "MDP3-MP3",
          "ratingA": 400,
          "name": {
            "ar": "بيسيمنت AHU الميكانيكا",
            "en": "Basement AHU / Mechanical"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP3.PP1",
              "ratingA": 100,
              "name": {
                "ar": "قسم الصيانة",
                "en": "Maintenance Department"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP3.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP3.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP3.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP3.PP5",
              "ratingA": 250,
              "name": {
                "ar": "AHU الميكانيكا",
                "en": "AHU Mechanical"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP4",
          "number": 4,
          "tag": "MDP3-MP4",
          "ratingA": 400,
          "name": {
            "ar": "العناية المركزة يو بي إس / النيكو الخارجي",
            "en": "NICU UPS / ICU External Panel"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "تم استبعاد قاطع النيكو الخارجي من عدّ PP لأنه اللوحة الرئيسية نفسها.",
            "en": "The external NICU breaker is excluded from PP count because it is the main panel itself."
          },
          "pps": [
            {
              "tag": "MDP3.MP4.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP4.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP4.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP4.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP5",
          "number": 5,
          "tag": "MDP3-MP5",
          "ratingA": 400,
          "name": {
            "ar": "ما قبل الولادة",
            "en": "Antenatal"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP5.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP5.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP5.PP3",
              "ratingA": 100,
              "name": {
                "ar": "وحدة معالجة الهواء",
                "en": "AHU"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP5.PP4",
              "ratingA": 100,
              "name": {
                "ar": "توسعة النيكو",
                "en": "NICU Extension"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP6",
          "number": 6,
          "tag": "MDP3-MP6",
          "ratingA": 400,
          "name": {
            "ar": "العناية المركزة النيكو",
            "en": "NICU / ICU"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP6.PP1",
              "ratingA": 50,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP6.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP6.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP6.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP7",
          "number": 7,
          "tag": "MDP3-MP7",
          "ratingA": 400,
          "name": {
            "ar": "غرفة ميكانيكا العمليات",
            "en": "Operating Room Mechanical Room"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP7.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP7.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP7.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP7.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP7.PP5",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 5",
                "en": "Power Panel 5"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP7.PP6",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 6",
                "en": "Power Panel 6"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP7.PP7",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 7",
                "en": "Power Panel 7"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP8",
          "number": 8,
          "tag": "MDP3-MP8",
          "ratingA": 630,
          "name": {
            "ar": "غرفة البدروم",
            "en": "Basement Room"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP8.PP1",
              "ratingA": 50,
              "name": {
                "ar": "عزل النيكو",
                "en": "NICU Insulation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP8.PP2",
              "ratingA": 50,
              "name": {
                "ar": "مضخة مياه المبرد",
                "en": "Chiller Water Pump"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP8.PP3",
              "ratingA": 50,
              "name": {
                "ar": "احتياطي",
                "en": "Spare"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP8.PP4",
              "ratingA": 100,
              "name": {
                "ar": "AHU 9",
                "en": "AHU 9"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP8.PP5",
              "ratingA": 100,
              "name": {
                "ar": "AHU 10",
                "en": "AHU 10"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP8.PP6",
              "ratingA": 100,
              "name": {
                "ar": "AHU 11",
                "en": "AHU 11"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP9",
          "number": 9,
          "tag": "MDP3-MP9",
          "ratingA": 400,
          "name": {
            "ar": "ترانسبورت بيسيمنت",
            "en": "Transport Basement"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP9.PP1",
              "ratingA": 100,
              "name": {
                "ar": "توسعة قسم الولادة",
                "en": "L&D Extension"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP9.PP2",
              "ratingA": 400,
              "name": {
                "ar": "HDU / قسم الولادة",
                "en": "HDU / L&D"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP10",
          "number": 10,
          "tag": "MDP3-MP10",
          "ratingA": 400,
          "name": {
            "ar": "قسم الولادة",
            "en": "L&D"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP10.PP1",
              "ratingA": 50,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP10.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP10.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP10.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP10.PP5",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 5",
                "en": "Power Panel 5"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP10.PP6",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 6",
                "en": "Power Panel 6"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP10.PP7",
              "ratingA": 50,
              "name": {
                "ar": "لوحة القوى 7",
                "en": "Power Panel 7"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP11",
          "number": 11,
          "tag": "MDP3-MP11",
          "ratingA": 400,
          "name": {
            "ar": "الأشعة",
            "en": "Radiology"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "عدد لوحات PP المعتمد 4 فقط.",
            "en": "The approved PP count is 4 only."
          },
          "pps": [
            {
              "tag": "MDP3.MP11.PP1",
              "ratingA": 100,
              "name": {
                "ar": "غرفة الأشعة 1",
                "en": "Radiology Room 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP11.PP2",
              "ratingA": 100,
              "name": {
                "ar": "غرفة الأشعة 2",
                "en": "Radiology Room 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP11.PP3",
              "ratingA": 100,
              "name": {
                "ar": "غرفة الأشعة 3",
                "en": "Radiology Room 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP11.PP4",
              "ratingA": 400,
              "name": {
                "ar": "الأشعة المقطعية (UPS)",
                "en": "CT Scan (UPS)"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP12",
          "number": 12,
          "tag": "MDP3-MP12",
          "ratingA": 400,
          "name": {
            "ar": "مستودع خدمات التغذية",
            "en": "Food Service Warehouse"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP12.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP12.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP12.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP13",
          "number": 13,
          "tag": "MDP3-MP13",
          "ratingA": 400,
          "name": {
            "ar": "مطبخ خدمات التغذية",
            "en": "Food Service Kitchen"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP13.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP2",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 2",
                "en": "Power Panel 2"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP3",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 3",
                "en": "Power Panel 3"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP4",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 4",
                "en": "Power Panel 4"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP5",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 5",
                "en": "Power Panel 5"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP6",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 6",
                "en": "Power Panel 6"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP7",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 7",
                "en": "Power Panel 7"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            },
            {
              "tag": "MDP3.MP13.PP8",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 8",
                "en": "Power Panel 8"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        },
        {
          "id": "MDP3-MP14",
          "number": 14,
          "tag": "MDP3-MP14",
          "ratingA": 250,
          "name": {
            "ar": "غرفة ضغط الهواء",
            "en": "Air Pressure Room"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "confirmed",
          "notes": {
            "ar": "",
            "en": ""
          },
          "pps": [
            {
              "tag": "MDP3.MP14.PP1",
              "ratingA": 100,
              "name": {
                "ar": "لوحة القوى 1",
                "en": "Power Panel 1"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "confirmed"
            }
          ]
        }
      ]
    },
    {
      "id": "MDP4",
      "name": {
        "ar": "لوحة العيادات الخارجية",
        "en": "Outpatient Clinics Main Distribution Panel"
      },
      "ratingA": 800,
      "transformerId": "TR4",
      "sourcePath": [
        "RMU (OS)",
        "TR4",
        "ATS3 (Shared)",
        "MDP4"
      ],
      "status": "partial",
      "mps": [
        {
          "id": "MDP4-MP1",
          "number": 1,
          "tag": "MDP4-MP1",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP4.MP1.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP4-MP2",
          "number": 2,
          "tag": "MDP4-MP2",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP4.MP2.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP4-MP3",
          "number": 3,
          "tag": "MDP4-MP3",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP4.MP3.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP4-MP4",
          "number": 4,
          "tag": "MDP4-MP4",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP4.MP4.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP4-MP5",
          "number": 5,
          "tag": "MDP4-MP5",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP4.MP5.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        }
      ]
    },
    {
      "id": "MDP5",
      "name": {
        "ar": "لوحة عيادات الصحة النفسية",
        "en": "Psychiatric Clinics Main Distribution Panel"
      },
      "ratingA": 800,
      "transformerId": "TR5",
      "sourcePath": [
        "RMU (OS)",
        "TR5",
        "ATS3 (Shared / Manual)",
        "MDP5"
      ],
      "status": "partial",
      "mps": [
        {
          "id": "MDP5-MP1",
          "number": 1,
          "tag": "MDP5-MP1",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP5.MP1.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP5-MP2",
          "number": 2,
          "tag": "MDP5-MP2",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP5.MP2.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP5-MP3",
          "number": 3,
          "tag": "MDP5-MP3",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP5.MP3.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP5-MP4",
          "number": 4,
          "tag": "MDP5-MP4",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP5.MP4.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP5-MP5",
          "number": 5,
          "tag": "MDP5-MP5",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP5.MP5.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        },
        {
          "id": "MDP5-MP6",
          "number": 6,
          "tag": "MDP5-MP6",
          "ratingA": null,
          "name": {
            "ar": "قيد التوثيق",
            "en": "Pending documentation"
          },
          "location": {
            "ar": "قيد التحديث",
            "en": "Pending update"
          },
          "status": "pending",
          "notes": {
            "ar": "لم تستلم تفاصيل الاسم والسعة بعد.",
            "en": "Name and rating details have not been received yet."
          },
          "pps": [
            {
              "tag": "MDP5.MP6.PP1",
              "ratingA": null,
              "name": {
                "ar": "قيد التوثيق",
                "en": "Pending documentation"
              },
              "location": {
                "ar": "قيد التحديث",
                "en": "Pending update"
              },
              "status": "pending"
            }
          ]
        }
      ]
    }
  ],
  "generators": {
    "title": {
      "ar": "مولدات المستشفى",
      "en": "Hospital Generators"
    },
    "status": "pending",
    "message": {
      "ar": "لم تُستلم بيانات المولدات المعتمدة بعد.",
      "en": "Approved generator data has not been received yet."
    }
  },
  "ups": {
    "title": {
      "ar": "البطاريات وأنظمة UPS",
      "en": "Batteries and UPS Systems"
    },
    "status": "pending",
    "message": {
      "ar": "لم تُستلم بيانات البطاريات وأنظمة UPS المعتمدة بعد.",
      "en": "Approved battery and UPS data has not been received yet."
    }
  },
  "printTypes": [
    {
      "id": "transformer",
      "ar": "صفحة المحول",
      "en": "Transformer Page"
    },
    {
      "id": "mp",
      "ar": "صفحة Main Panel (MP)",
      "en": "Main Panel (MP) Page"
    },
    {
      "id": "pp",
      "ar": "صفحة Power Panel (PP)",
      "en": "Power Panel (PP) Page"
    },
    {
      "id": "labels",
      "ar": "الملصقات",
      "en": "Labels"
    },
    {
      "id": "diagram",
      "ar": "المخطط العام",
      "en": "General Diagram"
    }
  ]
};
