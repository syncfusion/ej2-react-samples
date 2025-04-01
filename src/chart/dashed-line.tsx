/**
 * Sample for Line Series with dashed line
 */
import * as React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, Inject, ChartAnnotation, LineSeries, Crosshair, Category, Tooltip, Highlight, Double, ISharedTooltipRenderEventArgs, IAxisLabelRenderEventArgs, Legend, ILegendRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let dashedLineData: Object[] = [
  { x: 1950, y: 2493092843, y1: 126304100, y2: 1042159246, y3: 1324614904, y4: 867732396, y5: 343353092 },
  { x: 1951, y: 2536927039, y1: 127874077, y2: 1059306957, y3: 1349731048, y4: 887027436, y5: 357004128 },
  { x: 1952, y: 2584086332, y1: 129789937, y2: 1077187100, y3: 1377093884, y4: 908405828, y5: 369808784 },
  { x: 1953, y: 2634106246, y1: 132153416, y2: 1096035634, y3: 1405901764, y4: 931753376, y5: 382937200 },
  { x: 1954, y: 2685894869, y1: 134605062, y2: 1115476219, y3: 1435798628, y4: 956729584, y5: 394915600 },
  { x: 1955, y: 2740213784, y1: 136880366, y2: 1135578064, y3: 1467741048, y4: 983973024, y5: 405901520 },
  { x: 1956, y: 2795409978, y1: 139125007, y2: 1155761749, y3: 1500508948, y4: 1011888692, y5: 415775920 },
  { x: 1957, y: 2852618346, y1: 141568323, y2: 1175591988, y3: 1535443604, y4: 1042438600, y5: 425253344 },
  { x: 1958, y: 2911249658, y1: 144363555, y2: 1195306118, y3: 1571565948, y4: 1074936332, y5: 433848472 },
  { x: 1959, y: 2965950358, y1: 147197383, y2: 1214751313, y3: 1603988080, y4: 1103604040, y5: 437784216 },
  { x: 1960, y: 3015470890, y1: 149860352, y2: 1233928643, y3: 1631668376, y4: 1127544516, y5: 436596448 },
  { x: 1961, y: 3064869656, y1: 152850029, y2: 1253708611, y3: 1658297144, y4: 1148386820, y5: 434964720 },
  { x: 1962, y: 3123374299, y1: 156395576, y2: 1274900546, y3: 1692063800, y4: 1173295688, y5: 438972640 },
  { x: 1963, y: 3192807820, y1: 160302497, y2: 1296562666, y3: 1735927828, y4: 1206503268, y5: 452062216 },
  { x: 1964, y: 3264487340, y1: 164451917, y2: 1317979479, y3: 1782040416, y4: 1239592904, y5: 469172200 },
  { x: 1965, y: 3334533717, y1: 169108161, y2: 1338894058, y3: 1826515176, y4: 1268384936, y5: 485583192 },
  { x: 1966, y: 3404041107, y1: 174013799, y2: 1359285314, y3: 1870725008, y4: 1295130168, y5: 501321120 },
  { x: 1967, y: 3473412894, y1: 179017542, y2: 1379099986, y3: 1915277412, y4: 1319254600, y5: 511678312 },
  { x: 1968, y: 3545187239, y1: 184229600, y2: 1398152460, y3: 1962786172, y4: 1343769016, y5: 515962920 },
  { x: 1969, y: 3619491592, y1: 189539722, y2: 1417310770, y3: 2012621136, y4: 1369478312, y5: 520507776 },
  { x: 1970, y: 3694683801, y1: 195016711, y2: 1437190872, y3: 2062454968, y4: 1393771016, y5: 526956400 },
  { x: 1971, y: 3769847834, y1: 200588292, y2: 1459336606, y3: 2109900176, y4: 1417853552, y5: 534032664 },
  { x: 1972, y: 3844917687, y1: 206390747, y2: 1484884110, y3: 2153618424, y4: 1440422400, y5: 541213960 },
  { x: 1973, y: 3920805030, y1: 212422892, y2: 1512563538, y3: 2195792440, y4: 1462497824, y5: 546365040 },
  { x: 1974, y: 3996416108, y1: 218717961, y2: 1542270558, y3: 2235399592, y4: 1486019592, y5: 548583600 },
  { x: 1975, y: 4070735264, y1: 225166613, y2: 1574702706, y3: 2270835680, y4: 1508916512, y5: 548458064 },
  { x: 1976, y: 4144246391, y1: 231559948, y2: 1608826064, y3: 2303827704, y4: 1530800952, y5: 547089112 },
  { x: 1977, y: 4217863819, y1: 238154900, y2: 1645110360, y3: 2334563496, y4: 1547645704, y5: 545866904 },
  { x: 1978, y: 4292097508, y1: 245024620, y2: 1683215588, y3: 2363819640, y4: 1556720360, y5: 545028776 },
  { x: 1979, y: 4368539472, y1: 252002993, y2: 1722489600, y3: 2394006664, y4: 1565820904, y5: 546646552 },
  { x: 1980, y: 4447606208, y1: 258253409, y2: 1764580050, y3: 2424729928, y4: 1578266056, y5: 551846088 },
  { x: 1981, y: 4528777285, y1: 263195672, y2: 1808778556, y3: 2456757336, y4: 1592682840, y5: 559671496 },
  { x: 1982, y: 4612673436, y1: 267593878, y2: 1854986672, y3: 2490043408, y4: 1610230968, y5: 570399848 },
  { x: 1983, y: 4697327604, y1: 272017870, y2: 1901816808, y3: 2523439120, y4: 1626733184, y5: 581810632 },
  { x: 1984, y: 4782175500, y1: 277170763, y2: 1945941806, y3: 2559004464, y4: 1641254336, y5: 591666648 },
  { x: 1985, y: 4868943460, y1: 283540500, y2: 1988008110, y3: 2597331592, y4: 1656735296, y5: 601095160 },
  { x: 1986, y: 4958072822, y1: 290665853, y2: 2029712638, y3: 2637625464, y4: 1673777344, y5: 610851352 },
  { x: 1987, y: 5049746378, y1: 298201619, y2: 2075990698, y3: 2675478592, y4: 1693431288, y5: 620493512 },
  { x: 1988, y: 5141992550, y1: 306184817, y2: 2129663112, y3: 2706062632, y4: 1713928864, y5: 629807696 },
  { x: 1989, y: 5234431714, y1: 314703670, y2: 2184634986, y3: 2735005000, y4: 1735347000, y5: 639046304 },
  { x: 1990, y: 5327803075, y1: 323619711, y2: 2238415822, y3: 2765674296, y4: 1758562896, y5: 647145312 },
  { x: 1991, y: 5418735879, y1: 332665856, y2: 2291717918, y3: 2794254864, y4: 1780282120, y5: 650732200 },
  { x: 1992, y: 5505989821, y1: 341998187, y2: 2343506204, y3: 2820384936, y4: 1799662128, y5: 648925872 },
  { x: 1993, y: 5591544841, y1: 351680100, y2: 2396466244, y3: 2843295464, y4: 1817863560, y5: 645336136 },
  { x: 1994, y: 5675551281, y1: 361762416, y2: 2450773196, y3: 2862909328, y4: 1833093864, y5: 640546200 },
  { x: 1995, y: 5758878997, y1: 371721306, y2: 2505532870, y3: 2881513424, y4: 1845505312, y5: 634154088 },
  { x: 1996, y: 5842055726, y1: 381398079, y2: 2560800906, y3: 2899738688, y4: 1855881872, y5: 629364568 },
  { x: 1997, y: 5924787787, y1: 391326985, y2: 2615527344, y3: 2917806576, y4: 1862965920, y5: 627307696 },
  { x: 1998, y: 6007066714, y1: 401296934, y2: 2670641308, y3: 2934990720, y4: 1867940384, y5: 626110096 },
  { x: 1999, y: 6089006330, y1: 411254796, y2: 2725406328, y3: 2952195672, y4: 1872029008, y5: 625629808 },
  { x: 2000, y: 6171703018, y1: 421660833, y2: 2778339060, y3: 2971541416, y4: 1875006224, y5: 626535704 },
  { x: 2001, y: 6254936479, y1: 432645199, y2: 2829812884, y3: 2992304680, y4: 1876577360, y5: 628668808 },
  { x: 2002, y: 6337730319, y1: 444024330, y2: 2880295052, y3: 3013226576, y4: 1876397640, y5: 631412760 },
  { x: 2003, y: 6420361649, y1: 455436352, y2: 2930943312, y3: 3033788328, y4: 1875994912, y5: 634725280 },
  { x: 2004, y: 6503377778, y1: 466713013, y2: 2983841408, y3: 3052619880, y4: 1875497888, y5: 638468416 },
  { x: 2005, y: 6586970145, y1: 478036109, y2: 3038958536, y3: 3069761136, y4: 1874478024, y5: 641820944 },
  { x: 2006, y: 6671452018, y1: 489424846, y2: 3096159140, y3: 3085641296, y4: 1876181776, y5: 645167776 },
  { x: 2007, y: 6757308750, y1: 500428766, y2: 3156555272, y3: 3100083760, y4: 1882180592, y5: 649871160 },
  { x: 2008, y: 6844457675, y1: 510794361, y2: 3218017656, y3: 3115390608, y4: 1891210304, y5: 656122824 },
  { x: 2009, y: 6932766459, y1: 521178808, y2: 3279351504, y3: 3131965312, y4: 1902480200, y5: 663301136 },
  { x: 2010, y: 7021732131, y1: 532057050, y2: 3342060220, y3: 3147327512, y4: 1914573024, y5: 670391464 },
  { x: 2011, y: 7110923797, y1: 544982124, y2: 3404883628, y3: 3160754888, y4: 1927465608, y5: 676963504 },
  { x: 2012, y: 7201202531, y1: 560697398, y2: 3467181704, y3: 3173003520, y4: 1942243728, y5: 683539920 },
  { x: 2013, y: 7291793608, y1: 577848182, y2: 3528461544, y3: 3185146168, y4: 1958086304, y5: 689121936 },
  { x: 2014, y: 7381616239, y1: 596508339, y2: 3588072904, y3: 3196678576, y4: 1973723728, y5: 692944144 },
  { x: 2015, y: 7470491904, y1: 617227976, y2: 3646515492, y3: 3206377680, y4: 1987689968, y5: 695586976 },
  { x: 2016, y: 7558554580, y1: 639011154, y2: 3701427400, y3: 3217734760, y4: 2000603912, y5: 697616160 },
  { x: 2017, y: 7645618013, y1: 662249068, y2: 3750580264, y3: 3232394080, y4: 2013577872, y5: 697928096 },
  { x: 2018, y: 7729902724, y1: 686727264, y2: 3796508740, y3: 3246253968, y4: 2024111456, y5: 695282048 },
  { x: 2019, y: 7811293714, y1: 711960159, y2: 3840671552, y3: 3258218608, y4: 2031520384, y5: 690617536 },
  { x: 2020, y: 7887001284, y1: 736844945, y2: 3882253576, y3: 3267423136, y4: 2035060496, y5: 683431016 },
  { x: 2021, y: 7954448405, y1: 758737437, y2: 3921248932, y3: 3273956664, y4: 2034484160, y5: 673691560 },
  { x: 2022, y: 8021407170, y1: 782133168, y2: 3959728840, y3: 3279020696, y4: 2030820152, y5: 663098224 },
  { x: 2023, y: 8091734935, y1: 808366320, y2: 3999849852, y3: 3282968992, y4: 2024582768, y5: 654028320 }
];

export let dashLineData: Object[] = [
  { x: 2024, y: 8161972549, y1: 832893775, y2: 4041127600, y3: 3287364176, y4: 2016800712, y5: 647339928 },
  { x: 2025, y: 8231613090, y1: 856250699, y2: 4083270100, y3: 3291462584, y4: 2008312288, y5: 643562112 },
  { x: 2026, y: 8300678442, y1: 879523781, y2: 4125853768, y3: 3294628960, y4: 1999255032, y5: 642354544 },
  { x: 2027, y: 8369094318, y1: 906337883, y2: 4164244648, y3: 3297797216, y4: 1988692880, y5: 642333896 },
  { x: 2028, y: 8436618862, y1: 939269399, y2: 4196151560, y3: 3300437224, y4: 1977677632, y5: 643121856 },
  { x: 2029, y: 8503285348, y1: 973321243, y2: 4226977848, y3: 3302176512, y4: 1967410000, y5: 644104488 },
  { x: 2030, y: 8569124886, y1: 1005909636, y2: 4259440112, y3: 3302914224, y4: 1957758448, y5: 645159856 },
  { x: 2031, y: 8634119339, y1: 1037534710, y2: 4293141648, y3: 3302530704, y4: 1948442800, y5: 646407664 },
  { x: 2032, y: 8698229878, y1: 1067916691, y2: 4328669872, y3: 3300680448, y4: 1939621776, y5: 647795032 },
  { x: 2033, y: 8761449104, y1: 1099339870, y2: 4363884728, y3: 3297213208, y4: 1933196616, y5: 649316048 },
  { x: 2034, y: 8823784961, y1: 1132103324, y2: 4398236688, y3: 3292384736, y4: 1929351040, y5: 650938824 },
  { x: 2035, y: 8885210190, y1: 1164947923, y2: 4432201432, y3: 3286943024, y4: 1928467400, y5: 652611688 },
  { x: 2036, y: 8945686606, y1: 1197331535, y2: 4466044920, y3: 3281129608, y4: 1930347416, y5: 654300584 },
  { x: 2037, y: 9005152615, y1: 1228347839, y2: 4501631624, y3: 3273929248, y4: 1933528488, y5: 655969000 },
  { x: 2038, y: 9063572896, y1: 1258209093, y2: 4537724896, y3: 3266334544, y4: 1937577584, y5: 657564864 },
  { x: 2039, y: 9120928391, y1: 1286729880, y2: 4573373208, y3: 3259459480, y4: 1941800352, y5: 659039168 },
  { x: 2040, y: 9177190247, y1: 1313365950, y2: 4609289768, y3: 3253098224, y4: 1945997736, y5: 660367176 },
  { x: 2041, y: 9232281559, y1: 1338564237, y2: 4645330944, y3: 3246879800, y4: 1950197896, y5: 661489608 },
  { x: 2042, y: 9286110411, y1: 1362737926, y2: 4680925880, y3: 3240876080, y4: 1954263112, y5: 662356952 },
  { x: 2043, y: 9338661330, y1: 1386381265, y2: 4713715064, y3: 3236933616, y4: 1958137824, y5: 662970856 },
  { x: 2044, y: 9389873699, y1: 1410883374, y2: 4742169672, y3: 3235133696, y4: 1961688736, y5: 663280416 },
  { x: 2050, y: 9664378588, y1: 1575447386, y2: 4835760816, y3: 3250602296, y4: 1969375024, y5: 656480224 },
  { x: 2051, y: 9704192320, y1: 1605226113, y2: 4844144088, y3: 3252088520, y4: 1967690048, y5: 654007048 },
  { x: 2052, y: 9742264492, y1: 1636146498, y2: 4850402672, y3: 3252811384, y4: 1965120824, y5: 651310896 },
  { x: 2053, y: 9778614529, y1: 1666900774, y2: 4855886048, y3: 3252752744, y4: 1961706808, y5: 648487560 },
  { x: 2054, y: 9813251648, y1: 1697317280, y2: 4860845360, y3: 3251848568, y4: 1957465520, y5: 645583536 },
  { x: 2055, y: 9846237603, y1: 1728208872, y2: 4864514728, y3: 3250089464, y4: 1952463848, y5: 642681416 },
  { x: 2056, y: 9877680349, y1: 1756711135, y2: 4869826392, y3: 3247539920, y4: 1946856608, y5: 639881648 },
  { x: 2057, y: 9907637176, y1: 1781513004, y2: 4878093952, y3: 3244244176, y4: 1940773248, y5: 637237832 },
  { x: 2058, y: 9936164370, y1: 1804535251, y2: 4887447256, y3: 3240213768, y4: 1934278320, y5: 634775320 },
  { x: 2059, y: 9963337060, y1: 1826347801, y2: 4897402304, y3: 3235472944, y4: 1927497464, y5: 632551472 },
  { x: 2060, y: 9989232308, y1: 1847284669, y2: 4907618176, y3: 3230074872, y4: 1920598744, y5: 630575696 },
  { x: 2061, y: 10013916270, y1: 1867330861, y2: 4918122112, y3: 3224058080, y4: 1913686984, y5: 628789408 },
  { x: 2062, y: 10037466618, y1: 1886351815, y2: 4928959744, y3: 3217507576, y4: 1906901904, y5: 627198472 },
  { x: 2063, y: 10059950016, y1: 1904498006, y2: 4939934640, y3: 3210489672, y4: 1900366608, y5: 625805136 },
  { x: 2064, y: 10081402757, y1: 1922221123, y2: 4950744240, y3: 3203043384, y4: 1894148856, y5: 624574264 },
  { x: 2065, y: 10101849556, y1: 1940535516, y2: 4960409512, y3: 3195214824, y4: 1888309832, y5: 623473544 },
  { x: 2066, y: 10121317193, y1: 1959106385, y2: 4969198200, y3: 3187081312, y4: 1882872968, y5: 622484536 },
  { x: 2067, y: 10139808403, y1: 1977096755, y2: 4977840088, y3: 3178729376, y4: 1877849024, y5: 621558184 },
  { x: 2068, y: 10157301910, y1: 1994915171, y2: 4985798336, y3: 3170167920, y4: 1873207184, y5: 620635120 },
  { x: 2069, y: 10173782143, y1: 2012984882, y2: 4992611728, y3: 3161436008, y4: 1868919280, y5: 619666904 },
  { x: 2070, y: 10189241966, y1: 2031474339, y2: 4998041720, y3: 3152639040, y4: 1864932264, y5: 618624416 },
  { x: 2071, y: 10203681578, y1: 2050499789, y2: 5001903664, y3: 3143862112, y4: 1861167368, y5: 617503712 },
  { x: 2072, y: 10217055191, y1: 2070381773, y2: 5003800576, y3: 3135166880, y4: 1857552744, y5: 616275552 },
  { x: 2073, y: 10229327843, y1: 2091255671, y2: 5003495224, y3: 3126601880, y4: 1854016664, y5: 614925336 },
  { x: 2074, y: 10240485124, y1: 2112931045, y2: 5001147520, y3: 3118184600, y4: 1850474008, y5: 613451984 },
  { x: 2075, y: 10250496479, y1: 2134750926, y2: 4997397320, y3: 3109926536, y4: 1846843016, y5: 611835360 },
  { x: 2076, y: 10259351451, y1: 2156452037, y2: 4992464888, y3: 3101832760, y4: 1843085824, y5: 610058640 },
  { x: 2077, y: 10267044976, y1: 2178944733, y2: 4985414808, y3: 3093896656, y4: 1839135408, y5: 608133872 },
  { x: 2078, y: 10273556402, y1: 2201309734, y2: 4977186456, y3: 3086056968, y4: 1834902648, y5: 606047560 },
  { x: 2079, y: 10278887444, y1: 2222493561, y2: 4968812480, y3: 3078281136, y4: 1830335488, y5: 603796000 },
  { x: 2080, y: 10283078029, y1: 2242689112, y2: 4960173392, y3: 3070529528, y4: 1825417720, y5: 601410976 },
  { x: 2081, y: 10286161702, y1: 2262268062, y2: 4951073056, y3: 3062701512, y4: 1820123000, y5: 598887944 },
  { x: 2082, y: 10288205101, y1: 2281150810, y2: 4941677928, y3: 3054765416, y4: 1814462232, y5: 596255952 },
  { x: 2083, y: 10289247340, y1: 2297665959, y2: 4933818992, y3: 3046682416, y4: 1808454080, y5: 593561400 },
  { x: 2084, y: 10289315221, y1: 2311723214, y2: 4927702760, y3: 3038378040, y4: 1802108200, y5: 590819136 },
  { x: 2085, y: 10288456631, y1: 2322939251, y2: 4923711016, y3: 3029807368, y4: 1795441424, y5: 588034952 },
  { x: 2086, y: 10286708315, y1: 2331487672, y2: 4921728216, y3: 3020946312, y4: 1788451736, y5: 585227688 },
  { x: 2087, y: 10284111359, y1: 2338720283, y2: 4920486208, y3: 3011759712, y4: 1781182624, y5: 582399832 },
  { x: 2088, y: 10280704571, y1: 2345116023, y2: 4919642816, y3: 3002229656, y4: 1773690544, y5: 579574520 },
  { x: 2089, y: 10276518216, y1: 2351323914, y2: 4918577464, y3: 2992360824, y4: 1766029280, y5: 576795080 },
  { x: 2090, y: 10271565096, y1: 2357459993, y2: 4917129168, y3: 2982145848, y4: 1758239920, y5: 574064480 },
  { x: 2091, y: 10265861685, y1: 2363618518, y2: 4915399152, y3: 2971591416, y4: 1750350392, y5: 571396696 },
  { x: 2092, y: 10259408415, y1: 2369870272, y2: 4913338544, y3: 2960721080, y4: 1742401792, y5: 568800952 },
  { x: 2093, y: 10252184759, y1: 2376041244, y2: 4910899928, y3: 2949564544, y4: 1734451728, y5: 566264600 },
  { x: 2094, y: 10244185824, y1: 2382123990, y2: 4908000336, y3: 2938161648, y4: 1726545712, y5: 563775664 },
  { x: 2095, y: 10235403633, y1: 2388126286, y2: 4904583056, y3: 2926534408, y4: 1718694168, y5: 561335384 },
  { x: 2096, y: 10225850878, y1: 2394065867, y2: 4900634528, y3: 2914702448, y4: 1710937968, y5: 558952208 },
  { x: 2097, y: 10215549325, y1: 2399936776, y2: 4896124768, y3: 2902732248, y4: 1703303144, y5: 556640024 },
  { x: 2098, y: 10204489848, y1: 2405753390, y2: 4890990312, y3: 2890660088, y4: 1695792608, y5: 554391472 },
  { x: 2099, y: 10192689014, y1: 2411559196, y2: 4885172224, y3: 2878513592, y4: 1688423552, y5: 552193472 },
  { x: 2100, y: 10180160751, y1: 2417301901, y2: 4878640816, y3: 2866316728, y4: 1681182000, y5: 550027496 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }

    #charts_Series_1, #charts_Series_3, #charts_Series_5, #charts_Series_7, #charts_Series_9, #charts_Series_11 {
        stroke-dasharray: 4px 4px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 1s linear infinite;
        animation: dash 1s linear infinite;
    }
 
    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }
 
    @keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }

    @keyframes opac {
        0% {
            stroke-opacity: 1;
            stroke-width: 0px;
        }
        100% {
            stroke-opacity: 0;
            stroke-width: 10px;
        }
    }`;
export class DashedLine extends SampleBase<{}, {}> {
  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'Double', majorGridLines: { width: 0 }, minimum: 1950, maximum: 2100, interval: 30, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{ maximum: 12e9, interval: 2e9, lineStyle: { width: 0 }, title: 'Population (in Billions)', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} tooltip={{ enable: true, shared: true, showNearestTooltip: true }} legendSettings={{ visible: true, enableHighlight: true }} crosshair={{ enable: false, line: { color: 'rgba(204,214,235,0.25)', width: Browser.isDevice ? 50 : 20 }, lineType: 'Vertical' }} width={Browser.isDevice ? '100%' : '75%'} title="Global Population Trends by Age Group (1950–2100)" subTitle='Source: ourworldindata.org' loaded={this.onChartLoad.bind(this)} axisLabelRender={this.axisLabelRender.bind(this)} sharedTooltipRender={this.sharedTooltipRender.bind(this)} legendRender={this.legendRender.bind(this)}>
            <Inject services={[LineSeries, Category, Tooltip, Crosshair, ChartAnnotation, Highlight, Double, Legend]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={dashedLineData} xName="x" yName="y" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line" name="Total"></SeriesDirective>
              <SeriesDirective dataSource={dashLineData} xName="x" yName="y" width={2} marker={{ visible: false, width: 7, height: 7 }} dashArray='4,4' type="Line" name="Total1"></SeriesDirective>
              <SeriesDirective dataSource={dashedLineData} xName="x" yName="y1" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line" name="Ages 65+"></SeriesDirective>
              <SeriesDirective dataSource={dashLineData} xName="x" yName="y1" width={2} marker={{ visible: false, width: 7, height: 7 }} dashArray='4,4' type="Line" name="Ages1 65+"></SeriesDirective>
              <SeriesDirective dataSource={dashedLineData} xName="x" yName="y2" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line" name="Ages 25-64"></SeriesDirective>
              <SeriesDirective dataSource={dashLineData} xName="x" yName="y2" width={2} marker={{ visible: false, width: 7, height: 7 }} dashArray='4,4' type="Line" name="Ages1 25-64"></SeriesDirective>
              <SeriesDirective dataSource={dashedLineData} xName="x" yName="y3" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line" name="Under-25s"></SeriesDirective>
              <SeriesDirective dataSource={dashLineData} xName="x" yName="y3" width={2} marker={{ visible: false, width: 7, height: 7 }} dashArray='4,4' type="Line" name="Unders-25s"></SeriesDirective>
              <SeriesDirective dataSource={dashedLineData} xName="x" yName="y4" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line" name="Under-15s"></SeriesDirective>
              <SeriesDirective dataSource={dashLineData} xName="x" yName="y4" width={2} marker={{ visible: false, width: 7, height: 7 }} dashArray='4,4' type="Line" name="Unders-15s"></SeriesDirective>
              <SeriesDirective dataSource={dashedLineData} xName="x" yName="y5" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line" name="Under-5s"></SeriesDirective>
              <SeriesDirective dataSource={dashLineData} xName="x" yName="y5" width={2} marker={{ visible: false, width: 7, height: 7 }} dashArray='4,4' type="Line" name="Unders-5s"></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
        <div id="action-description">
          <p>
            This sample illustrates global population trends from 1950 to 2100, with solid lines representing historical data and dashed lines for projections.
          </p>
        </div>
        <div id="description">
          <p>
            In this example, you will see how to render and configure the line chart. Line charts are used to represent time-dependent data, showing trends in data at equal intervals.
            You can use <code>DashArray</code>, <code>Width</code>, <code>Fill</code> properties to customize the line.
          </p>
          <p>
            <code>Tooltips</code> are enabled in this example.To see the tooltip in action, hover a point or tap on a point in touch enabled devices.
          </p>

          <p><b>Injecting Module</b></p>
          <p>
            Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject <code>LineSeries</code> module into <code>services</code>.
          </p>
          <p>
            More information on the line series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/line#series-customization" aria-label="Navigate to the documentation for Series customization in React Chart component">documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
  public onChartLoad(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('charts');
    chart.setAttribute('title', '');
  };
  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  };
  public axisLabelRender (args: IAxisLabelRenderEventArgs): void {
    if (args.axis.orientation === 'Vertical') {
      let value: number = Number(args.text);
      if (!isNaN(value) && value >= 0) {
        args.text = (value / 1e9).toFixed(0);
      }
    }
  };
  public sharedTooltipRender (args: ISharedTooltipRenderEventArgs): void {
    if (args.text && Array.isArray(args.point) && Array.isArray(args.series)) {
      args.text = args.point.map((point, i) => {
        if (point && point.y !== undefined && args.series[i]) {
          const value: number = Number(point.y);
          let formattedValue: string;
          if (value >= 1_000_000_000) {
            formattedValue = (value / 1_000_000_000).toFixed(2) + ' B';
          } else if (value >= 1_000_000) {
            formattedValue = (value / 1_000_000).toFixed(2) + ' M';
          }
          const seriesNameMapping: Record<string, string> = {
            'Total1': 'Total',
            'Ages1 65+': 'Ages 65+',
            'Ages1 25-64': 'Ages 25-64',
            'Unders-25s': 'Under-25s',
            'Unders-15s': 'Under-15s',
            'Unders-5s': 'Under-5s',
          };
          let seriesName = args.series[i].name || `Series ${i + 1}`;
          seriesName = seriesNameMapping[seriesName] || seriesName;
          return `${seriesName}: <b>${formattedValue}</b>`;
        }
        return null;
      }).filter(Boolean);
    }
  };

  public legendRender (args: ILegendRenderEventArgs): void {
    const cancelLegendNames: Set<string> = new Set([
      'Total1',
      'Ages1 65+',
      'Ages1 25-64',
      'Unders-25s',
      'Unders-15s',
      'Unders-5s'
    ]);

    if (cancelLegendNames.has(args.text)) {
      args.cancel = true;
    }
  };

}
