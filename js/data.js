const races = [
  {
    "id": 1,
    "venue": "Антхольц",
    "name": "Спринт",
    "entries": [
      {
        "rank": 1,
        "country": "AUT",
        "name": "Князь Куницевский",
        "shooting": [
          0,
          0
        ],
        "time": 4644,
        "gap": 0,
        "skiTime": null
      },
      {
        "rank": 2,
        "country": "JPN",
        "name": "Макото Наги",
        "shooting": [
          1,
          0
        ],
        "time": 4805,
        "gap": 161,
        "skiTime": null
      },
      {
        "rank": 3,
        "country": "NOR",
        "name": "Артём Дмитров",
        "shooting": [
          0,
          0
        ],
        "time": 4850,
        "gap": 206,
        "skiTime": null
      },
      {
        "rank": 4,
        "country": "FIN",
        "name": "Валентин Чернышев",
        "shooting": [
          1,
          0
        ],
        "time": 4877,
        "gap": 233,
        "skiTime": null
      },
      {
        "rank": 5,
        "country": "ITA",
        "name": "Илья Ершов",
        "shooting": [
          0,
          0
        ],
        "time": 4891,
        "gap": 247,
        "skiTime": null
      },
      {
        "rank": 6,
        "country": "FIN",
        "name": "Никита Казимирович",
        "shooting": [
          2,
          1
        ],
        "time": 4892,
        "gap": 248,
        "skiTime": null
      },
      {
        "rank": 7,
        "country": "AUT",
        "name": "Тимур Рейзей",
        "shooting": [
          1,
          0
        ],
        "time": 4931,
        "gap": 287,
        "skiTime": null
      },
      {
        "rank": 8,
        "country": "CAN",
        "name": "Алексей Караваев",
        "shooting": [
          1,
          0
        ],
        "time": 4947,
        "gap": 303,
        "skiTime": null
      },
      {
        "rank": 9,
        "country": "SUI",
        "name": "Роберто Дарбенбергер",
        "shooting": [
          0,
          0
        ],
        "time": 4948,
        "gap": 304,
        "skiTime": null
      },
      {
        "rank": 10,
        "country": "SUI",
        "name": "Тимур Челухин",
        "shooting": [
          0,
          0
        ],
        "time": 4954,
        "gap": 310,
        "skiTime": null
      },
      {
        "rank": 11,
        "country": "EST",
        "name": "Лёха Ломки",
        "shooting": [
          2,
          3
        ],
        "time": 4966,
        "gap": 322,
        "skiTime": null
      },
      {
        "rank": 12,
        "country": "RUS",
        "name": "Снос Збушатнев",
        "shooting": [
          2,
          1
        ],
        "time": 4968,
        "gap": 324,
        "skiTime": null
      },
      {
        "rank": 13,
        "country": "USA",
        "name": "Хантер Кулер",
        "shooting": [
          1,
          3
        ],
        "time": 4971,
        "gap": 327,
        "skiTime": null
      },
      {
        "rank": 14,
        "country": "NOR",
        "name": "Ринат Акылтасов",
        "shooting": [
          0,
          0
        ],
        "time": 4971,
        "gap": 327,
        "skiTime": null
      },
      {
        "rank": 15,
        "country": "CAN",
        "name": "Кирилл Сорокин",
        "shooting": [
          1,
          0
        ],
        "time": 4982,
        "gap": 338,
        "skiTime": null
      },
      {
        "rank": 16,
        "country": "SRB",
        "name": "Иван Душнилович",
        "shooting": [
          0,
          1
        ],
        "time": 4984,
        "gap": 340,
        "skiTime": null
      },
      {
        "rank": 17,
        "country": "CZE",
        "name": "Даниэль Викей",
        "shooting": [
          1,
          0
        ],
        "time": 5001,
        "gap": 357,
        "skiTime": null
      },
      {
        "rank": 18,
        "country": "GER",
        "name": "Гусейн Фармарджевали",
        "shooting": [
          2,
          1
        ],
        "time": 5011,
        "gap": 367,
        "skiTime": null
      },
      {
        "rank": 19,
        "country": "FIN",
        "name": "Данила Гладышев",
        "shooting": [
          0,
          2
        ],
        "time": 5046,
        "gap": 402,
        "skiTime": null
      },
      {
        "rank": 20,
        "country": "SRB",
        "name": "Карой Киркович",
        "shooting": [
          3,
          0
        ],
        "time": 5048,
        "gap": 404,
        "skiTime": null
      },
      {
        "rank": 21,
        "country": "GER",
        "name": "Максим Доронин",
        "shooting": [
          2,
          2
        ],
        "time": 5124,
        "gap": 480,
        "skiTime": null
      },
      {
        "rank": 22,
        "country": "GER",
        "name": "Ярослав Погребняк",
        "shooting": [
          2,
          3
        ],
        "time": 5242,
        "gap": 598,
        "skiTime": null
      },
      {
        "rank": 23,
        "country": "CAN",
        "name": "Константинос Тифолиус",
        "shooting": [
          4,
          2
        ],
        "time": 5285,
        "gap": 641,
        "skiTime": null
      },
      {
        "rank": 24,
        "country": "USA",
        "name": "Джей-Джей Ван Хаузер",
        "shooting": [
          2,
          2
        ],
        "time": 5296,
        "gap": 652,
        "skiTime": null
      },
      {
        "rank": 25,
        "country": "USA",
        "name": "Пенни Хэллоуин",
        "shooting": [
          0,
          1
        ],
        "time": 5305,
        "gap": 661,
        "skiTime": null
      },
      {
        "rank": 26,
        "country": "RUS",
        "name": "Игнат Медведев",
        "shooting": [
          3,
          2
        ],
        "time": 5355,
        "gap": 711,
        "skiTime": null
      },
      {
        "rank": 27,
        "country": "SUI",
        "name": "Джанкарло Джулиано",
        "shooting": [
          2,
          3
        ],
        "time": 5443,
        "gap": 799,
        "skiTime": null
      },
      {
        "rank": 28,
        "country": "EST",
        "name": "Евеня Пармезянович",
        "shooting": [
          3,
          2
        ],
        "time": 5450,
        "gap": 806,
        "skiTime": null
      }
    ]
  },
  {
    "id": 2,
    "venue": "Антхольц",
    "name": "Гонка преследования",
    "entries": [
      {
        "rank": 1,
        "country": "AUT",
        "name": "Князь Куницевский",
        "shooting": [
          0,
          0,
          0,
          0
        ],
        "time": 6021,
        "gap": 0,
        "skiTime": null
      },
      {
        "rank": 2,
        "country": "JPN",
        "name": "Макото Наги",
        "shooting": [
          0,
          2,
          0,
          1
        ],
        "time": 6466,
        "gap": 445,
        "skiTime": null
      },
      {
        "rank": 3,
        "country": "ITA",
        "name": "Илья Ершов",
        "shooting": [
          0,
          0,
          0,
          0
        ],
        "time": 6577,
        "gap": 556,
        "skiTime": null
      },
      {
        "rank": 4,
        "country": "AUT",
        "name": "Тимур Рейзей",
        "shooting": [
          0,
          0,
          2,
          1
        ],
        "time": 6670,
        "gap": 649,
        "skiTime": null
      },
      {
        "rank": 5,
        "country": "NOR",
        "name": "Артём Дмитров",
        "shooting": [
          1,
          0,
          0,
          1
        ],
        "time": 6684,
        "gap": 663,
        "skiTime": null
      },
      {
        "rank": 6,
        "country": "SUI",
        "name": "Тимур Челухин",
        "shooting": [
          0,
          0,
          1,
          1
        ],
        "time": 6751,
        "gap": 730,
        "skiTime": null
      },
      {
        "rank": 7,
        "country": "SUI",
        "name": "Роберто Дарбенбергер",
        "shooting": [
          0,
          1,
          0,
          0
        ],
        "time": 6765,
        "gap": 744,
        "skiTime": null
      },
      {
        "rank": 8,
        "country": "FIN",
        "name": "Никита Казимирович",
        "shooting": [
          2,
          2,
          1,
          1
        ],
        "time": 6807,
        "gap": 786,
        "skiTime": null
      },
      {
        "rank": 9,
        "country": "CAN",
        "name": "Кирилл Сорокин",
        "shooting": [
          1,
          0,
          0,
          0
        ],
        "time": 6819,
        "gap": 798,
        "skiTime": null
      },
      {
        "rank": 10,
        "country": "FIN",
        "name": "Валентин Чернышев",
        "shooting": [
          1,
          2,
          1,
          1
        ],
        "time": 6864,
        "gap": 843,
        "skiTime": null
      },
      {
        "rank": 11,
        "country": "SRB",
        "name": "Иван Душнилович",
        "shooting": [
          0,
          1,
          0,
          1
        ],
        "time": 6906,
        "gap": 885,
        "skiTime": null
      },
      {
        "rank": 12,
        "country": "NOR",
        "name": "Ринат Акылтасов",
        "shooting": [
          0,
          0,
          1,
          1
        ],
        "time": 7018,
        "gap": 997,
        "skiTime": null
      },
      {
        "rank": 13,
        "country": "EST",
        "name": "Лёха Ломки",
        "shooting": [
          3,
          2,
          2,
          2
        ],
        "time": 7087,
        "gap": 1066,
        "skiTime": null
      },
      {
        "rank": 14,
        "country": "GER",
        "name": "Максим Доронин",
        "shooting": [
          3,
          1,
          1,
          0
        ],
        "time": 7094,
        "gap": 1073,
        "skiTime": null
      },
      {
        "rank": 15,
        "country": "CAN",
        "name": "Алексей Караваев",
        "shooting": [
          1,
          1,
          1,
          1
        ],
        "time": 7148,
        "gap": 1127,
        "skiTime": null
      },
      {
        "rank": 16,
        "country": "CZE",
        "name": "Даниэль Викей",
        "shooting": [
          2,
          0,
          1,
          1
        ],
        "time": 7209,
        "gap": 1188,
        "skiTime": null
      },
      {
        "rank": 17,
        "country": "RUS",
        "name": "Снос Збушатнев",
        "shooting": [
          1,
          0,
          2,
          4
        ],
        "time": 7272,
        "gap": 1251,
        "skiTime": null
      },
      {
        "rank": 18,
        "country": "GER",
        "name": "Гусейн Фармарджевали",
        "shooting": [
          2,
          1,
          0,
          4
        ],
        "time": 7363,
        "gap": 1342,
        "skiTime": null
      },
      {
        "rank": 19,
        "country": "FIN",
        "name": "Данила Гладышев",
        "shooting": [
          3,
          2,
          1,
          1
        ],
        "time": 7433,
        "gap": 1412,
        "skiTime": null
      },
      {
        "rank": 20,
        "country": "USA",
        "name": "Хантер Кулер",
        "shooting": [
          4,
          4,
          3,
          2
        ],
        "time": 7648,
        "gap": 1627,
        "skiTime": null
      },
      {
        "rank": 21,
        "country": "SRB",
        "name": "Карой Киркович",
        "shooting": [
          3,
          3,
          1,
          5
        ],
        "time": 7704,
        "gap": 1683,
        "skiTime": null
      }
    ]
  },
  {
    "id": 3,
    "venue": "Антхольц",
    "name": "Индивидуальная гонка",
    "entries": [
      {
        "rank": 1,
        "country": "AUT",
        "name": "Князь Куницевский",
        "shooting": [
          0,
          0,
          1,
          0
        ],
        "time": 9229,
        "gap": 0,
        "skiTime": 7493
      },
      {
        "rank": 2,
        "country": "AUT",
        "name": "Тимур Рейзей",
        "shooting": [
          0,
          0,
          0,
          1
        ],
        "time": 9273,
        "gap": 44,
        "skiTime": 7491
      },
      {
        "rank": 3,
        "country": "FIN",
        "name": "Валентин Чернышев",
        "shooting": [
          2,
          0,
          0,
          0
        ],
        "time": 9499,
        "gap": 270,
        "skiTime": 7556
      },
      {
        "rank": 4,
        "country": "SWE",
        "name": "Фредрик Силинс",
        "shooting": [
          1,
          1,
          0,
          1
        ],
        "time": 9600,
        "gap": 371,
        "skiTime": 7576
      },
      {
        "rank": 5,
        "country": "SRB",
        "name": "Иван Душнилович",
        "shooting": [
          0,
          0,
          0,
          0
        ],
        "time": 9709,
        "gap": 480,
        "skiTime": 8098
      },
      {
        "rank": 6,
        "country": "ITA",
        "name": "Илья Ершов",
        "shooting": [
          0,
          0,
          1,
          0
        ],
        "time": 9835,
        "gap": 606,
        "skiTime": 8200
      },
      {
        "rank": 7,
        "country": "CAN",
        "name": "Кирилл Сорокин",
        "shooting": [
          1,
          1,
          0,
          0
        ],
        "time": 9849,
        "gap": 620,
        "skiTime": 7872
      },
      {
        "rank": 8,
        "country": "SUI",
        "name": "Роберто Дарбенбергер",
        "shooting": [
          0,
          0,
          0,
          1
        ],
        "time": 9857,
        "gap": 628,
        "skiTime": 8219
      },
      {
        "rank": 9,
        "country": "SUI",
        "name": "Тимур Челухин",
        "shooting": [
          0,
          2,
          1,
          0
        ],
        "time": 9868,
        "gap": 639,
        "skiTime": 7696
      },
      {
        "rank": 10,
        "country": "FIN",
        "name": "Никита Казимирович",
        "shooting": [
          2,
          2,
          2,
          0
        ],
        "time": 9919,
        "gap": 690,
        "skiTime": 7203
      },
      {
        "rank": 11,
        "country": "EST",
        "name": "Лёха Ломки",
        "shooting": [
          3,
          0,
          2,
          2
        ],
        "time": 9997,
        "gap": 768,
        "skiTime": 7054
      },
      {
        "rank": 12,
        "country": "NOR",
        "name": "Артём Дмитров",
        "shooting": [
          0,
          2,
          1,
          0
        ],
        "time": 10017,
        "gap": 788,
        "skiTime": 7938
      },
      {
        "rank": 13,
        "country": "FIN",
        "name": "Данила Гладышев",
        "shooting": [
          1,
          1,
          1,
          0
        ],
        "time": 10092,
        "gap": 863,
        "skiTime": 7920
      },
      {
        "rank": 14,
        "country": "NOR",
        "name": "Ринат Акылтасов",
        "shooting": [
          1,
          0,
          0,
          1
        ],
        "time": 10243,
        "gap": 1014,
        "skiTime": 8409
      },
      {
        "rank": 15,
        "country": "JPN",
        "name": "Макото Наги",
        "shooting": [
          1,
          1,
          3,
          2
        ],
        "time": 10385,
        "gap": 1156,
        "skiTime": 7578
      },
      {
        "rank": 16,
        "country": "USA",
        "name": "Хантер Кулер",
        "shooting": [
          3,
          3,
          3,
          0
        ],
        "time": 10433,
        "gap": 1204,
        "skiTime": 7101
      },
      {
        "rank": 17,
        "country": "GER",
        "name": "Максим Доронин",
        "shooting": [
          3,
          1,
          2,
          1
        ],
        "time": 10439,
        "gap": 1210,
        "skiTime": 7496
      },
      {
        "rank": 18,
        "country": "RUS",
        "name": "Игнат Медведев",
        "shooting": [
          1,
          2,
          0,
          4
        ],
        "time": 10542,
        "gap": 1313,
        "skiTime": 7584
      },
      {
        "rank": 19,
        "country": "CZE",
        "name": "Даниэль Викей",
        "shooting": [
          2,
          2,
          2,
          0
        ],
        "time": 10706,
        "gap": 1477,
        "skiTime": 7898
      },
      {
        "rank": 20,
        "country": "GER",
        "name": "Гусейн Фармарджевали",
        "shooting": [
          1,
          1,
          2,
          4
        ],
        "time": 10726,
        "gap": 1497,
        "skiTime": 7521
      },
      {
        "rank": 21,
        "country": "CAN",
        "name": "Алексей Караваев",
        "shooting": [
          2,
          2,
          2,
          0
        ],
        "time": 10767,
        "gap": 1538,
        "skiTime": 7974
      },
      {
        "rank": 22,
        "country": "RUS",
        "name": "Снос Збушатнев",
        "shooting": [
          2,
          4,
          1,
          2
        ],
        "time": 10818,
        "gap": 1589,
        "skiTime": 7463
      },
      {
        "rank": 23,
        "country": "USA",
        "name": "Джей-Джей Ван Хаузер",
        "shooting": [
          1,
          2,
          3,
          2
        ],
        "time": 11048,
        "gap": 1819,
        "skiTime": 7856
      },
      {
        "rank": 24,
        "country": "SRB",
        "name": "Карой Киркович",
        "shooting": [
          3,
          3,
          2,
          2
        ],
        "time": 11315,
        "gap": 2086,
        "skiTime": 7715
      },
      {
        "rank": 25,
        "country": "SUI",
        "name": "Джанкарло Джулиано",
        "shooting": [
          3,
          4,
          1,
          2
        ],
        "time": 11333,
        "gap": 2104,
        "skiTime": 7812
      },
      {
        "rank": 26,
        "country": "USA",
        "name": "Пенни Хэллоуин",
        "shooting": [
          1,
          0,
          3,
          0
        ],
        "time": 11342,
        "gap": 2113,
        "skiTime": 8591
      },
      {
        "rank": 27,
        "country": "GER",
        "name": "Ярослав Погребняк",
        "shooting": [
          3,
          5,
          3,
          1
        ],
        "time": 11535,
        "gap": 2306,
        "skiTime": 7533
      },
      {
        "rank": 28,
        "country": "CAN",
        "name": "Константинос Тифолиус",
        "shooting": [
          4,
          2,
          3,
          3
        ],
        "time": 11542,
        "gap": 2313,
        "skiTime": 7549
      },
      {
        "rank": 29,
        "country": "EST",
        "name": "Евеня Пармезянович",
        "shooting": [
          1,
          5,
          2,
          2
        ],
        "time": 11729,
        "gap": 2500,
        "skiTime": 8130
      }
    ]
  }
];
const pointsByPlace = [0,90,75,65,55,50,45,41,37,34,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
const countriesByCode = {
  "AUT": {
    "flag": "🇦🇹",
    "name": "Австрия"
  },
  "CAN": {
    "flag": "🇨🇦",
    "name": "Канада"
  },
  "CZE": {
    "flag": "🇨🇿",
    "name": "Чехия"
  },
  "EST": {
    "flag": "🇪🇪",
    "name": "Эстония"
  },
  "FIN": {
    "flag": "🇫🇮",
    "name": "Финляндия"
  },
  "GER": {
    "flag": "🇩🇪",
    "name": "Германия"
  },
  "ITA": {
    "flag": "🇮🇹",
    "name": "Италия"
  },
  "JPN": {
    "flag": "🇯🇵",
    "name": "Япония"
  },
  "NOR": {
    "flag": "🇳🇴",
    "name": "Норвегия"
  },
  "RUS": {
    "flag": "🇷🇺",
    "name": "Россия"
  },
  "SRB": {
    "flag": "🇷🇸",
    "name": "Сербия"
  },
  "SUI": {
    "flag": "🇨🇭",
    "name": "Швейцария"
  },
  "SWE": {
    "flag": "🇸🇪",
    "name": "Швеция"
  },
  "USA": {
    "flag": "🇺🇸",
    "name": "США"
  }
};
