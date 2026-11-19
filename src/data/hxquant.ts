// hxQuant performance data.
//
// SIMULATED: generated from the acam5 trader comparison (research build of 2026-11-17).
// Coin list: the Bybit list the live bot trades. Window: Sep 2020 to Sep 2026 (73 months).
// "Fresh $10k a month" view: every month starts from a fresh $10,000, so nothing compounds
// into sizes the market could not absorb. Monthly values are fractions (0.1 = +10%).
//
// LIVE: real-money accounts. Update LIVE_RECORD every month; the page renders whatever is here.

export type TraderStatus = 'live' | 'paper' | 'research'

export interface Regime { label: string; avgMonth: number; months: number; losing: number }

export interface Trader {
  key: string
  name: string
  role: string
  status: TraderStatus
  statusNote: string
  summary: string
  stats: {
    avgMonth: number
    medianMonth: number
    losingMonths: number
    months: number
    worstMonth: number
    bestMonth: number
    since2023: number
    last12: number
    y2026: number
    largestFall: number
    worstWeek: number
    losingWeeks: number
    weeks: number
  }
  regimes: Regime[]
  monthly: Record<string, number>
}

export const SIM_AS_OF = '2026-11-17'
export const SIM_WINDOW = 'Sep 2020 to Sep 2026'

export const TRADERS: Trader[] = [
  {
    "key": "acam4",
    "name": "acam4",
    "role": "Main engine",
    "status": "live",
    "statusNote": "Real money since 16 Nov 2026 · paper bot alongside",
    "summary": "Buys sudden crashes across 300+ coins. In market-wide panics it also buys Bitcoin and Ethereum. Between trades it can hold Bitcoin, Ethereum or tokenised gold while their trends are up.",
    "stats": {
      "avgMonth": 0.1994,
      "medianMonth": 0.1005,
      "losingMonths": 5,
      "months": 73,
      "worstMonth": -0.1257,
      "bestMonth": 2.9386,
      "since2023": 0.112,
      "last12": 0.064,
      "y2026": 0.0594,
      "largestFall": -0.2721,
      "worstWeek": -0.1333,
      "losingWeeks": 72,
      "weeks": 338
    },
    "regimes": [
      {
        "label": "2020–21 bull",
        "avgMonth": 0.5306,
        "months": 16,
        "losing": 1
      },
      {
        "label": "2022 bear",
        "avgMonth": 0.1505,
        "months": 12,
        "losing": 0
      },
      {
        "label": "2023–24",
        "avgMonth": 0.1455,
        "months": 24,
        "losing": 1
      },
      {
        "label": "2025–26 (to Sep)",
        "avgMonth": 0.075,
        "months": 21,
        "losing": 3
      }
    ],
    "monthly": {
      "2020-09": 0.3384,
      "2020-10": 0.1104,
      "2020-11": 0.593,
      "2020-12": 0.6471,
      "2021-01": 2.9386,
      "2021-02": 1.6587,
      "2021-03": 0.6632,
      "2021-04": 1.2558,
      "2021-05": 0.6722,
      "2021-06": -0.0109,
      "2021-07": 0.1593,
      "2021-08": 0.0203,
      "2021-09": 0.6159,
      "2021-10": 0.1916,
      "2021-11": 0.4331,
      "2021-12": 0.0972,
      "2022-01": 0.0832,
      "2022-02": 0.1029,
      "2022-03": 0.0134,
      "2022-04": 0.0197,
      "2022-05": 1.4909,
      "2022-06": 0.0632,
      "2022-07": 0.1046,
      "2022-08": 0.0505,
      "2022-09": 0.08,
      "2022-10": 0.0,
      "2022-11": 0.2103,
      "2022-12": 0.0845,
      "2023-01": 0.4794,
      "2023-02": 0.0697,
      "2023-03": 0.2482,
      "2023-04": 0.0188,
      "2023-05": 0.0395,
      "2023-06": 0.1108,
      "2023-07": 0.1005,
      "2023-08": 0.1656,
      "2023-09": 0.0035,
      "2023-10": 0.0583,
      "2023-11": 0.0548,
      "2023-12": 0.2913,
      "2024-01": 0.0995,
      "2024-02": 0.2519,
      "2024-03": 0.3739,
      "2024-04": -0.0048,
      "2024-05": 0.0553,
      "2024-06": 0.1839,
      "2024-07": 0.0905,
      "2024-08": 0.1679,
      "2024-09": 0.0345,
      "2024-10": 0.1179,
      "2024-11": 0.3801,
      "2024-12": 0.2645,
      "2025-01": 0.0587,
      "2025-02": 0.162,
      "2025-03": 0.0501,
      "2025-04": 0.1375,
      "2025-05": -0.0388,
      "2025-06": 0.0351,
      "2025-07": 0.3012,
      "2025-08": 0.0438,
      "2025-09": 0.0915,
      "2025-10": 0.0869,
      "2025-11": 0.1286,
      "2025-12": 0.0214,
      "2026-01": 0.1881,
      "2026-02": 0.142,
      "2026-03": -0.1257,
      "2026-04": 0.0122,
      "2026-05": 0.0581,
      "2026-06": 0.1937,
      "2026-07": -0.0306,
      "2026-08": 0.0648,
      "2026-09": 0.074
    }
  },
  {
    "key": "acam5",
    "name": "acam5",
    "role": "Next version",
    "status": "research",
    "statusNote": "Research · needs a bot change before paper trading",
    "summary": "acam4 plus one hard limit: no single coin may take more than half of the account. In a rebuilt Sep 2019 to Aug 2020 test it cut the worst month from −29.8% to −15.2%.",
    "stats": {
      "avgMonth": 0.1997,
      "medianMonth": 0.1005,
      "losingMonths": 5,
      "months": 73,
      "worstMonth": -0.1257,
      "bestMonth": 2.6686,
      "since2023": 0.1115,
      "last12": 0.063,
      "y2026": 0.058,
      "largestFall": -0.2721,
      "worstWeek": -0.1332,
      "losingWeeks": 71,
      "weeks": 338
    },
    "regimes": [
      {
        "label": "2020–21 bull",
        "avgMonth": 0.5361,
        "months": 16,
        "losing": 1
      },
      {
        "label": "2022 bear",
        "avgMonth": 0.1493,
        "months": 12,
        "losing": 0
      },
      {
        "label": "2023–24",
        "avgMonth": 0.1457,
        "months": 24,
        "losing": 1
      },
      {
        "label": "2025–26 (to Sep)",
        "avgMonth": 0.0737,
        "months": 21,
        "losing": 3
      }
    ],
    "monthly": {
      "2020-09": 0.3441,
      "2020-10": 0.1091,
      "2020-11": 0.593,
      "2020-12": 0.6314,
      "2021-01": 2.6686,
      "2021-02": 1.9549,
      "2021-03": 0.6665,
      "2021-04": 1.2558,
      "2021-05": 0.7227,
      "2021-06": -0.0108,
      "2021-07": 0.1593,
      "2021-08": 0.0203,
      "2021-09": 0.6115,
      "2021-10": 0.1916,
      "2021-11": 0.4331,
      "2021-12": 0.0972,
      "2022-01": 0.0832,
      "2022-02": 0.1029,
      "2022-03": 0.0134,
      "2022-04": 0.0462,
      "2022-05": 1.4657,
      "2022-06": 0.0632,
      "2022-07": 0.1046,
      "2022-08": 0.0505,
      "2022-09": 0.08,
      "2022-10": 0.0,
      "2022-11": 0.1771,
      "2022-12": 0.0845,
      "2023-01": 0.4794,
      "2023-02": 0.0697,
      "2023-03": 0.2482,
      "2023-04": 0.0188,
      "2023-05": 0.0395,
      "2023-06": 0.1108,
      "2023-07": 0.1005,
      "2023-08": 0.1656,
      "2023-09": 0.0035,
      "2023-10": 0.0583,
      "2023-11": 0.0548,
      "2023-12": 0.283,
      "2024-01": 0.0995,
      "2024-02": 0.2519,
      "2024-03": 0.3739,
      "2024-04": -0.0048,
      "2024-05": 0.0553,
      "2024-06": 0.1839,
      "2024-07": 0.0905,
      "2024-08": 0.1657,
      "2024-09": 0.0345,
      "2024-10": 0.1179,
      "2024-11": 0.38,
      "2024-12": 0.2791,
      "2025-01": 0.0587,
      "2025-02": 0.1585,
      "2025-03": 0.0501,
      "2025-04": 0.1375,
      "2025-05": -0.0427,
      "2025-06": 0.0351,
      "2025-07": 0.2925,
      "2025-08": 0.0438,
      "2025-09": 0.0915,
      "2025-10": 0.0869,
      "2025-11": 0.1286,
      "2025-12": 0.0214,
      "2026-01": 0.1881,
      "2026-02": 0.142,
      "2026-03": -0.1257,
      "2026-04": 0.0122,
      "2026-05": 0.0581,
      "2026-06": 0.179,
      "2026-07": -0.0306,
      "2026-08": 0.0648,
      "2026-09": 0.074
    }
  },
  {
    "key": "ac7",
    "name": "Any-Coin AI 7",
    "role": "Cash between trades",
    "status": "live",
    "statusNote": "Real money since 4 Nov 2026 · paper bot alongside",
    "summary": "Buys crashes only and holds plain USDT the rest of the time. In near-total market collapses (80%+ of coins down 15%) it buys the panic hour itself.",
    "stats": {
      "avgMonth": 0.1822,
      "medianMonth": 0.101,
      "losingMonths": 10,
      "months": 73,
      "worstMonth": -0.1302,
      "bestMonth": 2.6792,
      "since2023": 0.1018,
      "last12": 0.046,
      "y2026": 0.035,
      "largestFall": -0.2814,
      "worstWeek": -0.0991,
      "losingWeeks": 89,
      "weeks": 338
    },
    "regimes": [
      {
        "label": "2020–21 bull",
        "avgMonth": 0.5182,
        "months": 16,
        "losing": 1
      },
      {
        "label": "2022 bear",
        "avgMonth": 0.103,
        "months": 12,
        "losing": 1
      },
      {
        "label": "2023–24",
        "avgMonth": 0.1476,
        "months": 24,
        "losing": 3
      },
      {
        "label": "2025–26 (to Sep)",
        "avgMonth": 0.0517,
        "months": 21,
        "losing": 5
      }
    ],
    "monthly": {
      "2020-09": 0.3612,
      "2020-10": 0.1233,
      "2020-11": 0.9286,
      "2020-12": 0.4819,
      "2021-01": 2.6792,
      "2021-02": 1.1383,
      "2021-03": 0.4694,
      "2021-04": 1.6104,
      "2021-05": 0.7981,
      "2021-06": -0.003,
      "2021-07": 0.1489,
      "2021-08": 0.0254,
      "2021-09": 0.6094,
      "2021-10": 0.1566,
      "2021-11": 0.3991,
      "2021-12": 0.0983,
      "2022-01": 0.0794,
      "2022-02": 0.1059,
      "2022-03": 0.0131,
      "2022-04": -0.0096,
      "2022-05": 0.5449,
      "2022-06": 0.085,
      "2022-07": 0.1099,
      "2022-08": 0.061,
      "2022-09": 0.0893,
      "2022-10": 0.0063,
      "2022-11": 0.1813,
      "2022-12": 0.0591,
      "2023-01": 0.8607,
      "2023-02": 0.0687,
      "2023-03": 0.2815,
      "2023-04": -0.0012,
      "2023-05": 0.0493,
      "2023-06": 0.0272,
      "2023-07": 0.1576,
      "2023-08": 0.101,
      "2023-09": -0.0007,
      "2023-10": 0.1,
      "2023-11": 0.0423,
      "2023-12": 0.2894,
      "2024-01": 0.0552,
      "2024-02": 0.3831,
      "2024-03": 0.348,
      "2024-04": -0.1011,
      "2024-05": 0.0458,
      "2024-06": 0.1994,
      "2024-07": 0.0873,
      "2024-08": 0.1679,
      "2024-09": 0.0006,
      "2024-10": 0.1327,
      "2024-11": 0.4211,
      "2024-12": 0.1624,
      "2025-01": 0.0467,
      "2025-02": 0.1147,
      "2025-03": 0.0264,
      "2025-04": 0.13,
      "2025-05": -0.0427,
      "2025-06": -0.0445,
      "2025-07": 0.1895,
      "2025-08": 0.0068,
      "2025-09": 0.1339,
      "2025-10": 0.1088,
      "2025-11": 0.1124,
      "2025-12": 0.0214,
      "2026-01": 0.187,
      "2026-02": 0.162,
      "2026-03": -0.1302,
      "2026-04": 0.0064,
      "2026-05": 0.0648,
      "2026-06": 0.0706,
      "2026-07": -0.0408,
      "2026-08": 0.0819,
      "2026-09": -0.0462
    }
  },
  {
    "key": "bh2",
    "name": "Bear Hunter AI 2",
    "role": "Bear-market variant",
    "status": "paper",
    "statusNote": "Paper trading since Nov 2026",
    "summary": "Any-Coin AI 7 with freer crash buying in bear markets: it can buy the rebound of coins already down 40% or more, each with a 20% stop-loss.",
    "stats": {
      "avgMonth": 0.1908,
      "medianMonth": 0.1,
      "losingMonths": 10,
      "months": 73,
      "worstMonth": -0.1302,
      "bestMonth": 2.6792,
      "since2023": 0.1019,
      "last12": 0.0443,
      "y2026": 0.035,
      "largestFall": -0.2813,
      "worstWeek": -0.1004,
      "losingWeeks": 89,
      "weeks": 338
    },
    "regimes": [
      {
        "label": "2020–21 bull",
        "avgMonth": 0.5242,
        "months": 16,
        "losing": 1
      },
      {
        "label": "2022 bear",
        "avgMonth": 0.1462,
        "months": 12,
        "losing": 1
      },
      {
        "label": "2023–24",
        "avgMonth": 0.148,
        "months": 24,
        "losing": 3
      },
      {
        "label": "2025–26 (to Sep)",
        "avgMonth": 0.0515,
        "months": 21,
        "losing": 5
      }
    ],
    "monthly": {
      "2020-09": 0.3612,
      "2020-10": 0.1233,
      "2020-11": 0.9333,
      "2020-12": 0.4819,
      "2021-01": 2.6792,
      "2021-02": 1.202,
      "2021-03": 0.4694,
      "2021-04": 1.6204,
      "2021-05": 0.8487,
      "2021-06": -0.0109,
      "2021-07": 0.1489,
      "2021-08": 0.0254,
      "2021-09": 0.6242,
      "2021-10": 0.1566,
      "2021-11": 0.3991,
      "2021-12": 0.0972,
      "2022-01": 0.082,
      "2022-02": 0.1059,
      "2022-03": 0.0131,
      "2022-04": -0.0096,
      "2022-05": 1.4199,
      "2022-06": 0.0749,
      "2022-07": 0.1099,
      "2022-08": 0.0593,
      "2022-09": 0.0893,
      "2022-10": 0.0063,
      "2022-11": 0.2068,
      "2022-12": 0.0591,
      "2023-01": 0.8607,
      "2023-02": 0.0687,
      "2023-03": 0.2815,
      "2023-04": -0.0012,
      "2023-05": 0.0493,
      "2023-06": 0.0272,
      "2023-07": 0.1576,
      "2023-08": 0.101,
      "2023-09": -0.0007,
      "2023-10": 0.1,
      "2023-11": 0.0423,
      "2023-12": 0.2894,
      "2024-01": 0.0552,
      "2024-02": 0.3831,
      "2024-03": 0.348,
      "2024-04": -0.1011,
      "2024-05": 0.0458,
      "2024-06": 0.1994,
      "2024-07": 0.0873,
      "2024-08": 0.1679,
      "2024-09": 0.0006,
      "2024-10": 0.1327,
      "2024-11": 0.4211,
      "2024-12": 0.1711,
      "2025-01": 0.0467,
      "2025-02": 0.1125,
      "2025-03": 0.0264,
      "2025-04": 0.13,
      "2025-05": -0.0254,
      "2025-06": -0.0445,
      "2025-07": 0.1895,
      "2025-08": 0.0068,
      "2025-09": 0.1339,
      "2025-10": 0.0869,
      "2025-11": 0.1124,
      "2025-12": 0.0214,
      "2026-01": 0.187,
      "2026-02": 0.162,
      "2026-03": -0.1302,
      "2026-04": 0.0064,
      "2026-05": 0.0648,
      "2026-06": 0.0706,
      "2026-07": -0.0408,
      "2026-08": 0.0819,
      "2026-09": -0.0462
    }
  }
]

/** Rebuilt Sep 2019 to Aug 2020 test: the COVID crash (Mar 2020) and the MATIC drop (Dec 2019). */
export const PRE_YEAR: Record<string, { covid: number; dec19: number }> = {"acam4": {"covid": -0.4575, "dec19": -0.3789}, "acam5": {"covid": -0.4931, "dec19": -0.2153}, "ac7": {"covid": -0.4306, "dec19": -0.3621}, "bh2": {"covid": -0.4746, "dec19": -0.379}}

export interface LiveAccount {
  account: string
  trader: string
  since: string
  start: number
  now: number
  closedTrades: string
}

export const LIVE_AS_OF = '18 Nov 2026'

export const LIVE_RECORD: LiveAccount[] = [
  {
    account: 'Live account 1',
    trader: 'Bear Hunter AI 2 to 16 Nov, acam4 since',
    since: '4 Nov 2026',
    start: 670.0,
    now: 621.98,
    closedTrades: '3, all losses',
  },
  {
    account: 'Live account 2',
    trader: 'Any-Coin AI 7',
    since: '4 Nov 2026',
    start: 420.0,
    now: 389.63,
    closedTrades: '4, all losses',
  },
]
