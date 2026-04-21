import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DashboardLayoutComponent, PanelDirective, PanelsDirective } from '@syncfusion/ej2-react-layouts';
import { SidebarComponent, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { MapsComponent, LayersDirective, LayerDirective, Legend as MapsLegend, MapsTooltip, MapsTheme } from '@syncfusion/ej2-react-maps';
import './ecommerce-marketing-dashboard.css';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  AccumulationLegend, Legend, PieSeries, ChartTheme, AccumulationTooltip, SeriesCollectionDirective, AccumulationDataLabel, ChartComponent,
  ColumnSeries, Category, SeriesDirective, Tooltip, DataLabel, Highlight, SplineAreaSeries, Inject,
  BulletChartComponent,
  BulletRangeCollectionDirective,
  BulletRangeDirective,
  BulletTooltip,
  StackingColumnSeries,
  StackingBarSeries,
  SplineSeries,
  LineSeries,
  SplineRangeAreaSeries,
  Tooltip as ChartTooltip,
  ISharedTooltipRenderEventArgs,
  WaterfallSeries,
  PyramidSeries,
  SparklineComponent,
  SparklineTooltip,
  Inject as SparkInject,
  BarSeries,
  ILoadedEventArgs,
  IAccLoadedEventArgs,
  AccumulationTheme,
  IBulletLoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import {
  CircularGaugeComponent,
  AxesDirective as GaugeAxesDirective,
  AxisDirective as GaugeAxisDirective,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
  Annotations as GaugeAnnotations,
  AnnotationsDirective as GaugeAnnotationsDirective,
  AnnotationDirective as GaugeAnnotationDirective,
  Inject as GaugeInject,
  GaugeTooltip,
  GaugeTheme
} from '@syncfusion/ej2-react-circulargauge';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import {
  GridComponent, ColumnsDirective, ColumnDirective, DetailRow,
  ExcelExport, Inject as GridInject, PdfExport, Toolbar, Page, Sort
} from '@syncfusion/ej2-react-grids';
import { HeatMapComponent, Inject as HeatmapInject, Adaptor as HeatmapAdaptor, Legend as HeatmapLegend, Tooltip as HeatmapTooltip, HeatMapTheme } from '@syncfusion/ej2-react-heatmap';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  ItemDirective,
  ItemsDirective,
  ToolbarComponent
} from '@syncfusion/ej2-react-navigations';
import './dashboard-bold-icon.css';
import './dashboard-light-icon.css';

const Palettes = {
  categorical: ["#B9005B", "#FF5858", "#850E35", "#F5C6A5", "#FE8F8F", "#554994", "#90AACB", "#554994", "#BD4B4B", "#E97777"],
  salesMix: ['#850E35', '#FF5858', '#B9005B', '#554994', '#FE8F8F', '#90AACB', '#E97777'],
  productTop: ["#850E35", "#FF5858", "#FE8F8F"],
  categorySalesTrend: ["#F5C6A5", "#90AACB", "#B9005B", "#FF5858", "#850E35", "#BD4B4B"],
  productMixTotal: ["#554994", "#90AACB", "#850E35", "#FF5858", "#E97777", "#BD4B4B"],
  revenueByCampaign: ["#554994", "#850E35", "#FF5858", "#E97777", "#90AACB", "#F5C6A5"]
} as const;

const pickPalette = (arr: readonly string[], count: number) => arr.slice(0, Math.max(0, Math.min(arr.length, count)));

type MonthlyRev = { m: string; actual: number; target: number };
const monthlyRev2022: MonthlyRev[] = [
  { m: 'Jan', actual: 355000, target: 360000 },
  { m: 'Feb', actual: 372000, target: 370000 },
  { m: 'Mar', actual: 378000, target: 380000 },
  { m: 'Apr', actual: 395000, target: 390000 },
  { m: 'May', actual: 402000, target: 400000 },
  { m: 'Jun', actual: 408000, target: 410000 },
  { m: 'Jul', actual: 420000, target: 415000 },
  { m: 'Aug', actual: 418000, target: 420000 },
  { m: 'Sep', actual: 435000, target: 430000 },
  { m: 'Oct', actual: 438000, target: 440000 },
  { m: 'Nov', actual: 455000, target: 450000 },
  { m: 'Dec', actual: 468000, target: 460000 },
];
const monthlyRev2023: MonthlyRev[] = [
  { m: 'Jan', actual: 392000, target: 388000 },
  { m: 'Feb', actual: 405000, target: 399000 },
  { m: 'Mar', actual: 415000, target: 410000 },
  { m: 'Apr', actual: 418000, target: 421000 },
  { m: 'May', actual: 440000, target: 432000 },
  { m: 'Jun', actual: 446000, target: 443000 },
  { m: 'Jul', actual: 455000, target: 449000 },
  { m: 'Aug', actual: 460000, target: 455000 },
  { m: 'Sep', actual: 472000, target: 466000 },
  { m: 'Oct', actual: 470000, target: 475000 },
  { m: 'Nov', actual: 495000, target: 486000 },
  { m: 'Dec', actual: 505000, target: 497000 },
];
const monthlyRev2024: MonthlyRev[] = [
  { m: 'Jan', actual: 420000, target: 415000 },
  { m: 'Feb', actual: 430000, target: 427000 },
  { m: 'Mar', actual: 445000, target: 439000 },
  { m: 'Apr', actual: 448000, target: 450000 },
  { m: 'May', actual: 470000, target: 463000 },
  { m: 'Jun', actual: 478000, target: 474000 },
  { m: 'Jul', actual: 485000, target: 481000 },
  { m: 'Aug', actual: 492000, target: 488000 },
  { m: 'Sep', actual: 508000, target: 500000 },
  { m: 'Oct', actual: 505000, target: 511000 },
  { m: 'Nov', actual: 530000, target: 523000 },
  { m: 'Dec', actual: 540000, target: 535000 },
];
const monthlyRev2025: MonthlyRev[] = [
  { m: 'Jan', actual: 445000, target: 440000 },
  { m: 'Feb', actual: 458000, target: 452000 },
  { m: 'Mar', actual: 470000, target: 465000 },
  { m: 'Apr', actual: 480000, target: 477000 },
  { m: 'May', actual: 498000, target: 491000 },
  { m: 'Jun', actual: 506000, target: 503000 },
  { m: 'Jul', actual: 515000, target: 511000 },
  { m: 'Aug', actual: 525000, target: 520000 },
  { m: 'Sep', actual: 540000, target: 533000 },
  { m: 'Oct', actual: 542000, target: 545000 },
  { m: 'Nov', actual: 565000, target: 558000 },
  { m: 'Dec', actual: 580000, target: 571000 },
];

const onChartLoad = (args: ILoadedEventArgs): void => {
  let selectedTheme: string = location.hash.split('/')[1] || 'Material';
  const themeForChart = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
    .replace(/contrast/i, 'Contrast')
    .replace(/-dark/i, 'Dark') as ChartTheme;

  args.chart.theme = themeForChart;

  if (selectedTheme.toLowerCase() === 'highcontrast') {
    const series = args.chart.series;
    if (Array.isArray(series) && series.length) {
      const s0 = series[0];
      const s1 = series[1];
      if (s0?.marker?.dataLabel) s0.marker.dataLabel.fill = '#000000';
      if (s1?.marker?.dataLabel) s1.marker.dataLabel.fill = '#000000';
    }
  }
};

const onHeatMapLoad = (args: any): void => {
  // derive Syncfusion theme from URL (same approach as other charts)
  let selectedTheme = location.hash.split('/')[1] || 'Tailwind3';
  const theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
    .replace(/-dark/i, 'Dark')
    .replace(/light/i, 'Light')
    .replace(/contrast/i, 'Contrast')
    .replace(/-highContrast/i, 'HighContrast') as HeatMapTheme;

  const isDark = /dark/i.test(selectedTheme) || /highcontrast/i.test(selectedTheme);

  // palettes for light vs dark
  const lightPalette = [
    { color: '#FEEBF4' }, // very low
    { color: '#F679B7' }, // low
    { color: '#CF3883' }, // mid
    { color: '#BF196B' }  // high
  ];
  const darkPalette = [
    { color: '#2A1130' },
    { color: '#6E2A57' },
    { color: '#B23A7D' },
    { color: '#FF4FA8' }
  ];

  // apply theme + palette + readable text/borders
  args.heatmap.theme = theme;
  args.heatmap.paletteSettings = {
    palette: isDark ? darkPalette : lightPalette,
    type: 'Gradient'
  };
  args.heatmap.cellSettings = {
    ...(args.heatmap.cellSettings || {}),
    border: { width: 0.6, color: isDark ? '#374151' : '#E5E7EB' },
    textStyle: { color: isDark ? '#F3F4F6' : '#111827' },
    format: 'c0'
  };
  args.heatmap.legendSettings = {
    ...(args.heatmap.legendSettings || {}),
    textStyle: { color: isDark ? '#E5E7EB' : '#374151' }
  };
};

const onGaugeLoad = (args: any): void => {
  let selectedTheme: string = location.hash.split('/')[1] || 'Material';
  const computed = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
    .replace(/-dark/i, 'Dark')
    .replace(/-high/i, 'High')
    .replace(/contrast/i, 'Contrast')
    .replace(/5\.3/i, '5');
  if (args && args.gauge) {
    args.gauge.theme = computed as GaugeTheme;
  }
};

const onAccumulationLoad = (args: IAccLoadedEventArgs): void => {
  const themeKey = location.hash.split('/')[1] || 'Material';
  const selectedTheme = (themeKey.charAt(0).toUpperCase() + themeKey.slice(1))
    .replace(/-dark/i, 'Dark')
    .replace(/contrast/i, 'Contrast')
    .replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
  args.accumulation.theme = selectedTheme;
  const isDark = /dark/i.test(themeKey)
    || /dark/i.test(String(selectedTheme))
    || /high-?contrast/i.test(themeKey)
    || /high-?contrast/i.test(String(selectedTheme));
  if (isDark && Array.isArray((args as any).accumulation?.series)) {
    ((args as any).accumulation.series as any[]).forEach((s: any) => {
      const width = s?.border?.width ?? 1;
      s.border = { color: '#000000', width };
    });
  }
};

const onBulletLoad = (args: IBulletLoadedEventArgs): void => {
  let selectedTheme = location.hash.split('/')[1];
  selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
  args.bulletChart.theme = ((selectedTheme.charAt(0).toUpperCase() +
    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast')) as ChartTheme;
};

const Mapload = (args: any): void => {
  let selectedTheme: string = location.hash.split('/')[1];
  selectedTheme = selectedTheme ? selectedTheme : 'Material';
  args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast').replace(/-dark/i, "Dark").replace(/-highContrast/i, 'HighContrast') as MapsTheme;
};

const formatCurrency = (n: number): string => {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: "compact" }).format(n ?? 0);
};

const cardformatCurrency = (n: number): string => {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2, notation: "compact" }).format(n ?? 0);
};

const onTextRender = (args: any) => {
  // only modify series data labels (args.point exists for data-label rendering)
  if (args.point && typeof args.point.y === 'number') {
    args.text = formatCurrency(Number(args.point.y));
  }
};

const onCurrencyTooltip = (args: any) => {
  const y = Number(args?.point?.y ?? 0);
  const x = String(args?.point?.x ?? '');
  const series = String(args?.series?.name ?? '');
  args.text = series ? `${x} : ${formatCurrency(y)}` : `${x}: ${formatCurrency(y)}`;
};

const n0 = (v: any) => (typeof v === 'number' && isFinite(v) ? v : 0);

function buildSeasonalityWeights(base: MonthlyRev[]) {
  const total = base.reduce((s, r) => s + n0(r.actual), 0);
  const denom = total > 0 ? total : 1;
  return base.map(r => ({
    m: r.m,
    w: n0(r.actual) / denom
  }));
}

function buildRevenueYearFromBase(opts: {
  baseYearRows: MonthlyRev[];
  newYearTotalActual: number;
  targetUpliftPct: number;
  noisePct?: number;
}) {
  const { baseYearRows, newYearTotalActual, targetUpliftPct, noisePct = 0 } = opts;
  const season = buildSeasonalityWeights(baseYearRows);
  const jitter = (i: number) => {
    if (!noisePct) return 1;
    const seq = [0.6, -0.3, 0.2, -0.4, 0.1, 0.25, -0.15, 0.35, -0.2, 0.3, -0.1, 0.05];
    return 1 + (seq[i % seq.length] * noisePct);
  };
  const actualRows = season.map((s, i) => {
    const a = Math.round(newYearTotalActual * s.w * jitter(i));
    return { m: s.m, actual: a, target: 0 };
  });
  const actualSum = actualRows.reduce((s, r) => s + r.actual, 0);
  let delta = Math.round(newYearTotalActual - actualSum);
  let idx = 0;
  while (delta !== 0 && idx < 5000) {
    const k = idx % actualRows.length;
    if (delta > 0) { actualRows[k].actual += 1; delta -= 1; }
    else if (delta < 0 && actualRows[k].actual > 0) { actualRows[k].actual -= 1; delta += 1; }
    idx++;
  }
  actualRows.forEach((r, i) => {
    const t = Math.round(r.actual * (1 + targetUpliftPct));
    actualRows[i].target = t;
  });
  return actualRows;
}

const base2025 = monthlyRev2025;

const total2025 = base2025.reduce((s, r) => s + n0(r.actual), 0);

const growth2026 = 1.10;
const growth2027 = 1.08;

const total2026 = Math.round(total2025 * growth2026);
const total2027 = Math.round(total2026 * growth2027);

const monthlyRev2026: MonthlyRev[] = buildRevenueYearFromBase({
  baseYearRows: base2025,
  newYearTotalActual: total2026,
  targetUpliftPct: 0.012,
  noisePct: 0.004
});

const monthlyRev2027: MonthlyRev[] = buildRevenueYearFromBase({
  baseYearRows: base2025,
  newYearTotalActual: total2027,
  targetUpliftPct: 0.015,
  noisePct: 0.004
});

const monthlyRevenueByYear: Record<number, MonthlyRev[]> = {
  2022: monthlyRev2022,
  2023: monthlyRev2023,
  2024: monthlyRev2024,
  2025: monthlyRev2025,
  2026: monthlyRev2026,
  2027: monthlyRev2027
};

const spendByYear: Record<number, { m: string; Paid: number; Organic: number; Email: number; Social: number }[]> = {
  2022: [
    { m: 'Jan', Paid: 90000, Organic: 12000, Email: 6000, Social: 20000 },
    { m: 'Feb', Paid: 88000, Organic: 12500, Email: 6200, Social: 20000 },
    { m: 'Mar', Paid: 92000, Organic: 13000, Email: 6400, Social: 21000 },
    { m: 'Apr', Paid: 95000, Organic: 13500, Email: 6600, Social: 21000 },
    { m: 'May', Paid: 94000, Organic: 14000, Email: 6800, Social: 22000 },
    { m: 'Jun', Paid: 97000, Organic: 14000, Email: 7000, Social: 22000 },
    { m: 'Jul', Paid: 100000, Organic: 14500, Email: 7200, Social: 23000 },
    { m: 'Aug', Paid: 102000, Organic: 15000, Email: 7400, Social: 24000 },
    { m: 'Sep', Paid: 105000, Organic: 15500, Email: 7600, Social: 24000 },
    { m: 'Oct', Paid: 108000, Organic: 16000, Email: 7800, Social: 25000 },
    { m: 'Nov', Paid: 110000, Organic: 16500, Email: 8000, Social: 26000 },
    { m: 'Dec', Paid: 112000, Organic: 17000, Email: 8200, Social: 27000 },
  ],
  2023: [
    { m: 'Jan', Paid: 98000, Organic: 13000, Email: 6500, Social: 22000 },
    { m: 'Feb', Paid: 96000, Organic: 13500, Email: 6700, Social: 22000 },
    { m: 'Mar', Paid: 101000, Organic: 14000, Email: 6900, Social: 23000 },
    { m: 'Apr', Paid: 104000, Organic: 14500, Email: 7100, Social: 23000 },
    { m: 'May', Paid: 103000, Organic: 15000, Email: 7300, Social: 24000 },
    { m: 'Jun', Paid: 106000, Organic: 15000, Email: 7500, Social: 24000 },
    { m: 'Jul', Paid: 110000, Organic: 15500, Email: 7700, Social: 25000 },
    { m: 'Aug', Paid: 112000, Organic: 16000, Email: 7900, Social: 26000 },
    { m: 'Sep', Paid: 115000, Organic: 16500, Email: 8100, Social: 26000 },
    { m: 'Oct', Paid: 118000, Organic: 17000, Email: 8300, Social: 27000 },
    { m: 'Nov', Paid: 121000, Organic: 17500, Email: 8500, Social: 28000 },
    { m: 'Dec', Paid: 124000, Organic: 18000, Email: 8700, Social: 29000 },
  ],
  2024: [
    { m: 'Jan', Paid: 105000, Organic: 14000, Email: 7200, Social: 24000 },
    { m: 'Feb', Paid: 103000, Organic: 14500, Email: 7400, Social: 24000 },
    { m: 'Mar', Paid: 108000, Organic: 15000, Email: 7600, Social: 25000 },
    { m: 'Apr', Paid: 111000, Organic: 15500, Email: 7800, Social: 25000 },
    { m: 'May', Paid: 110000, Organic: 16000, Email: 8000, Social: 26000 },
    { m: 'Jun', Paid: 113000, Organic: 16000, Email: 8200, Social: 26000 },
    { m: 'Jul', Paid: 118000, Organic: 16500, Email: 8400, Social: 27000 },
    { m: 'Aug', Paid: 120000, Organic: 17000, Email: 8600, Social: 28000 },
    { m: 'Sep', Paid: 123000, Organic: 17500, Email: 8800, Social: 28000 },
    { m: 'Oct', Paid: 126000, Organic: 18000, Email: 9000, Social: 29000 },
    { m: 'Nov', Paid: 129000, Organic: 18500, Email: 9200, Social: 30000 },
    { m: 'Dec', Paid: 132000, Organic: 19000, Email: 9400, Social: 31000 },
  ],
  2025: [
    { m: 'Jan', Paid: 115000, Organic: 15000, Email: 8000, Social: 26000 },
    { m: 'Feb', Paid: 113000, Organic: 15500, Email: 8200, Social: 26000 },
    { m: 'Mar', Paid: 118000, Organic: 16000, Email: 8400, Social: 27000 },
    { m: 'Apr', Paid: 121000, Organic: 16500, Email: 8600, Social: 27000 },
    { m: 'May', Paid: 120000, Organic: 17000, Email: 8800, Social: 28000 },
    { m: 'Jun', Paid: 123000, Organic: 17000, Email: 9000, Social: 28000 },
    { m: 'Jul', Paid: 128000, Organic: 17500, Email: 9200, Social: 29000 },
    { m: 'Aug', Paid: 130000, Organic: 18000, Email: 9400, Social: 30000 },
    { m: 'Sep', Paid: 133000, Organic: 18500, Email: 9600, Social: 30000 },
    { m: 'Oct', Paid: 136000, Organic: 19000, Email: 9800, Social: 31000 },
    { m: 'Nov', Paid: 140000, Organic: 19500, Email: 10000, Social: 32000 },
    { m: 'Dec', Paid: 145000, Organic: 20000, Email: 10200, Social: 34000 },
  ],
};

// Helper to uplift spend year-over-year with deterministic scaling
function upliftSpendYear(
  base: { m: string; Paid: number; Organic: number; Email: number; Social: number }[],
  mul: { Paid: number; Organic: number; Email: number; Social: number }
) {
  return (base ?? []).map(r => ({
    m: r.m,
    Paid: Math.round((r.Paid ?? 0) * mul.Paid),
    Organic: Math.round((r.Organic ?? 0) * mul.Organic),
    Email: Math.round((r.Email ?? 0) * mul.Email),
    Social: Math.round((r.Social ?? 0) * mul.Social),
  }));
}

// Derive 2026 spend from 2025 spend
spendByYear[2026] = upliftSpendYear(spendByYear[2025], {
  Paid: 1.08,     // +8% Paid
  Organic: 1.05,  // +5% Organic
  Email: 1.05,    // +5% Email
  Social: 1.06,   // +6% Social
});

// Derive 2027 spend from 2026 spend
spendByYear[2027] = upliftSpendYear(spendByYear[2026], {
  Paid: 1.07,     // +7% Paid
  Organic: 1.04,  // +4% Organic
  Email: 1.04,    // +4% Email
  Social: 1.05,   // +5% Social
});

type ProductBase = { name: string; category: string; sales: number[]; brand: string; warehouse: string; };

const mixedProducts: ProductBase[] = [
  { name: 'Noise-Cancel Headphones', category: 'Technology & Gadgets', sales: [120, 135, 150, 142, 160, 168], brand: 'SoundMax', warehouse: 'WH-SEA' },
  { name: 'Smartwatch X', category: 'Technology & Gadgets', sales: [98, 104, 112, 115, 120, 126], brand: 'TechPro', warehouse: 'WH-SEA' },
  { name: '4K TV 55"', category: 'Technology & Gadgets', sales: [87, 90, 94, 96, 101, 103], brand: 'VisionX', warehouse: 'WH-SEA' },
  { name: 'Laptop Pro 14', category: 'Technology & Gadgets', sales: [76, 84, 92, 88, 95, 102], brand: 'TechPro', warehouse: 'WH-SEA' },
  { name: 'Bluetooth Speaker', category: 'Technology & Gadgets', sales: [64, 70, 75, 78, 82, 85], brand: 'SoundMax', warehouse: 'WH-SEA' },

  { name: 'Hoodie Essential', category: 'Fashion & Lifestyle', sales: [52, 58, 60, 62, 65, 67], brand: 'StyleCo', warehouse: 'WH-NYC' },
  { name: 'Running Shoes', category: 'Fashion & Lifestyle', sales: [68, 72, 76, 74, 78, 81], brand: 'FitLife', warehouse: 'WH-NYC' },
  { name: 'Classic T-Shirt', category: 'Fashion & Lifestyle', sales: [45, 49, 52, 54, 56, 58], brand: 'StyleCo', warehouse: 'WH-NYC' },

  { name: 'Air Fryer', category: 'Home & Living', sales: [38, 42, 46, 45, 49, 52], brand: 'HomeEase', warehouse: 'WH-DAL' },
  { name: 'Vacuum Cleaner', category: 'Home & Living', sales: [30, 34, 36, 37, 39, 41], brand: 'HomeEase', warehouse: 'WH-DAL' },
  { name: 'Coffee Maker Pro', category: 'Home & Living', sales: [34, 37, 40, 41, 44, 46], brand: 'HomeEase', warehouse: 'WH-DAL' },
  { name: 'Smart LED Bulb Pack', category: 'Home & Living', sales: [22, 25, 28, 29, 31, 33], brand: 'HomeEase', warehouse: 'WH-DAL' },
  { name: 'Home Decor Set', category: 'General Merchandise', sales: [26, 28, 30, 31, 32, 34], brand: 'HomeEase', warehouse: 'WH-DAL' },

  { name: 'Face Serum', category: 'Personal Care & Wellness', sales: [28, 30, 33, 35, 36, 38], brand: 'WellnessLab', warehouse: 'WH-LAX' },
  { name: 'Yoga Mat Pro', category: 'Personal Care & Wellness', sales: [22, 24, 26, 27, 29, 31], brand: 'WellnessLab', warehouse: 'WH-LAX' },

  { name: 'Gift Card Pack', category: 'General Merchandise', sales: [40, 44, 48, 50, 53, 55], brand: 'Giftify', warehouse: 'WH-LAX' },
  { name: 'Stationery Bundle', category: 'General Merchandise', sales: [18, 20, 22, 23, 24, 26], brand: 'OfficePro', warehouse: 'WH-DAL' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ALL_MONTH = -1;

const yearGrowth: Record<number, number> = {
  2022: 1.00,
  2023: 1.03,
  2024: 1.06,
  2025: 1.09,
  2026: 1.12,
  2027: 1.15
};

const REGION_OPTIONS = [
  { text: 'All Regions', value: 'ALL' },
  { text: 'Asia-Pacific', value: 'AsiaPacific' },
  { text: 'Europe', value: 'Europe' },
  { text: 'North America', value: 'NorthAmerica' },
  { text: 'Latin America', value: 'LatinAmerica' },
  { text: 'Middle East & Africa', value: 'MiddleEastAfrica' }
];

const CAMPAIGN_OPTIONS = [
  { text: 'All Campaigns', value: 'ALL' },
  { text: 'Awareness Campaigns', value: 'BrandAwareness' },
  { text: 'Performance Campaigns', value: 'Performance' },
  { text: 'Retargeting Campaigns', value: 'Retargeting' },
  { text: 'Acquisition Campaigns', value: 'Acquisition' },
  { text: 'Loyalty Campaigns', value: 'Loyalty' }
];

const CATEGORY_OPTIONS = Array.from(new Set(mixedProducts.map(p => p.category))).sort();

const DROPDOWN_CATEGORY_OPTIONS = [
  { text: 'All Categories', value: 'ALL' },
  ...Array.from(new Set(mixedProducts.map(p => p.category)))
    .sort()
    .map(b => ({ text: b, value: b }))
];

const BRAND_OPTIONS = [
  { text: 'All Brands', value: 'ALL' },
  ...Array.from(new Set(mixedProducts.map(p => p.brand)))
    .sort()
    .map(b => ({ text: b, value: b }))
];

const WAREHOUSE_OPTIONS = [
  { text: 'All Warehouses', value: 'ALL' },
  ...Array.from(new Set(mixedProducts.map(p => p.warehouse)))
    .sort()
    .map(w => ({ text: w, value: w }))
];

const DROPDOWN_CHANNEL_OPTIONS = [
  { text: 'All Channels', value: 'ALL' },
  { text: 'Paid', value: 'Paid' },
  { text: 'Organic', value: 'Organic' },
  { text: 'Email', value: 'Email' },
  { text: 'Social', value: 'Social' }
];

const MARKETING_DROPDOWN_CHANNEL_OPTIONS = [
  { text: 'All Channels', value: 'ALL' },
  { text: 'Paid', value: 'Paid' },
  { text: 'Email', value: 'Email' }
];

type ScenarioKey = 'Baseline' | 'Optimistic' | 'Conservative';

const scenarioOptions: ScenarioKey[] = ['Baseline', 'Optimistic', 'Conservative'];

function buildYearProductSales(year: number, upToMonthIndex?: number) {
  const upliftH2 = 1.05;
  const yrMul = yearGrowth[year] ?? 1.0;

  const base = mixedProducts.map((p) => {
    const h1 = p.sales.map(v => Math.round(v * yrMul));
    const h2 = p.sales.map(v => Math.round(v * upliftH2 * yrMul));
    const fullYear = [...h1, ...h2];
    return { name: p.name, category: p.category, fullYear };
  });

  const regionYear = buildRegionMonthlyByYear(year);
  const targetTotals = months.map((_, i) => {
    const r = regionYear[i];
    return (r?.AsiaPacific ?? 0) + (r?.Europe ?? 0) + (r?.NorthAmerica ?? 0) + (r?.LatinAmerica ?? 0) + (r?.MiddleEastAfrica ?? 0);
  });

  const scaled: Record<string, number[]> = Object.fromEntries(base.map(b => [b.name, Array(12).fill(0)]));

  for (let m = 0; m < 12; m++) {
    const rawTotal = base.reduce((s, b) => s + (b.fullYear[m] ?? 0), 0);
    const target = Math.max(0, targetTotals[m] ?? 0);
    if (rawTotal <= 0 || target <= 0) {
      continue;
    }
    const scale = target / rawTotal;

    base.forEach(b => { scaled[b.name][m] = Math.max(0, Math.round((b.fullYear[m] ?? 0) * scale)); });

    let delta = target - base.reduce((s, b) => s + (scaled[b.name][m] ?? 0), 0);
    if (delta !== 0) {
      const order = [...base].sort((a, b) => (b.fullYear[m] ?? 0) - (a.fullYear[m] ?? 0));
      let idx = 0;
      while (delta !== 0 && idx < order.length * 5) {
        const b = order[idx % order.length];
        const cur = scaled[b.name][m] ?? 0;
        if (delta > 0) {
          scaled[b.name][m] = cur + 1;
          delta -= 1;
        } else if (delta < 0 && cur > 0) {
          scaled[b.name][m] = cur - 1;
          delta += 1;
        }
        idx++;
      }
    }
  }

  return base.map(b => {
    const fullYear = scaled[b.name];
    const cut = (typeof upToMonthIndex === 'number') ? fullYear.slice(0, upToMonthIndex + 1) : fullYear;
    return { name: b.name, category: b.category, monthly: cut };
  });
}

type RegionMonthly = { m: string; AsiaPacific: number; Europe: number; NorthAmerica: number; LatinAmerica: number; MiddleEastAfrica: number };
type ChannelMonthly = { m: string; Paid: number; Organic: number; Email: number; Social: number };
type RegionKey = 'AsiaPacific' | 'Europe' | 'NorthAmerica' | 'LatinAmerica' | 'MiddleEastAfrica';

const regionMonthlyBase: RegionMonthly[] = [
  { m: 'Jan', AsiaPacific: 180, Europe: 110, NorthAmerica: 95, LatinAmerica: 70, MiddleEastAfrica: 60 },
  { m: 'Feb', AsiaPacific: 200, Europe: 125, NorthAmerica: 105, LatinAmerica: 78, MiddleEastAfrica: 65 },
  { m: 'Mar', AsiaPacific: 230, Europe: 135, NorthAmerica: 120, LatinAmerica: 85, MiddleEastAfrica: 70 },
  { m: 'Apr', AsiaPacific: 260, Europe: 150, NorthAmerica: 130, LatinAmerica: 92, MiddleEastAfrica: 75 },
  { m: 'May', AsiaPacific: 240, Europe: 145, NorthAmerica: 128, LatinAmerica: 90, MiddleEastAfrica: 73 },
  { m: 'Jun', AsiaPacific: 255, Europe: 160, NorthAmerica: 140, LatinAmerica: 98, MiddleEastAfrica: 78 },
  { m: 'Jul', AsiaPacific: 270, Europe: 170, NorthAmerica: 150, LatinAmerica: 105, MiddleEastAfrica: 85 },
  { m: 'Aug', AsiaPacific: 280, Europe: 175, NorthAmerica: 155, LatinAmerica: 110, MiddleEastAfrica: 88 },
  { m: 'Sep', AsiaPacific: 300, Europe: 185, NorthAmerica: 165, LatinAmerica: 120, MiddleEastAfrica: 95 },
  { m: 'Oct', AsiaPacific: 310, Europe: 190, NorthAmerica: 170, LatinAmerica: 125, MiddleEastAfrica: 100 },
  { m: 'Nov', AsiaPacific: 335, Europe: 205, NorthAmerica: 185, LatinAmerica: 140, MiddleEastAfrica: 115 },
  { m: 'Dec', AsiaPacific: 360, Europe: 220, NorthAmerica: 200, LatinAmerica: 150, MiddleEastAfrica: 125 },
];

const channelsByRegionBase: Record<RegionKey, ChannelMonthly[]> = {
  AsiaPacific: [
    { m: 'Jan', Paid: 70, Organic: 60, Email: 30, Social: 20 },
    { m: 'Feb', Paid: 85, Organic: 65, Email: 30, Social: 20 },
    { m: 'Mar', Paid: 95, Organic: 75, Email: 35, Social: 25 },
    { m: 'Apr', Paid: 110, Organic: 85, Email: 40, Social: 25 },
    { m: 'May', Paid: 100, Organic: 80, Email: 35, Social: 25 },
    { m: 'Jun', Paid: 105, Organic: 85, Email: 40, Social: 25 },
    { m: 'Jul', Paid: 115, Organic: 90, Email: 42, Social: 28 },
    { m: 'Aug', Paid: 120, Organic: 95, Email: 42, Social: 28 },
    { m: 'Sep', Paid: 130, Organic: 100, Email: 45, Social: 30 },
    { m: 'Oct', Paid: 135, Organic: 105, Email: 47, Social: 30 },
    { m: 'Nov', Paid: 150, Organic: 115, Email: 50, Social: 35 },
    { m: 'Dec', Paid: 165, Organic: 125, Email: 55, Social: 40 },
  ],
  Europe: [
    { m: 'Jan', Paid: 40, Organic: 40, Email: 20, Social: 10 },
    { m: 'Feb', Paid: 48, Organic: 43, Email: 22, Social: 12 },
    { m: 'Mar', Paid: 52, Organic: 47, Email: 24, Social: 12 },
    { m: 'Apr', Paid: 60, Organic: 55, Email: 25, Social: 10 },
    { m: 'May', Paid: 58, Organic: 52, Email: 23, Social: 12 },
    { m: 'Jun', Paid: 65, Organic: 60, Email: 25, Social: 10 },
    { m: 'Jul', Paid: 68, Organic: 62, Email: 26, Social: 12 },
    { m: 'Aug', Paid: 70, Organic: 64, Email: 26, Social: 12 },
    { m: 'Sep', Paid: 74, Organic: 68, Email: 28, Social: 15 },
    { m: 'Oct', Paid: 76, Organic: 70, Email: 28, Social: 16 },
    { m: 'Nov', Paid: 82, Organic: 74, Email: 30, Social: 19 },
    { m: 'Dec', Paid: 88, Organic: 78, Email: 32, Social: 22 },
  ],
  NorthAmerica: [
    { m: 'Jan', Paid: 35, Organic: 30, Email: 18, Social: 12 },
    { m: 'Feb', Paid: 40, Organic: 35, Email: 18, Social: 12 },
    { m: 'Mar', Paid: 45, Organic: 40, Email: 20, Social: 15 },
    { m: 'Apr', Paid: 50, Organic: 42, Email: 22, Social: 16 },
    { m: 'May', Paid: 48, Organic: 40, Email: 22, Social: 18 },
    { m: 'Jun', Paid: 52, Organic: 45, Email: 23, Social: 20 },
    { m: 'Jul', Paid: 55, Organic: 48, Email: 24, Social: 18 },
    { m: 'Aug', Paid: 56, Organic: 50, Email: 25, Social: 19 },
    { m: 'Sep', Paid: 60, Organic: 52, Email: 26, Social: 20 },
    { m: 'Oct', Paid: 62, Organic: 54, Email: 27, Social: 21 },
    { m: 'Nov', Paid: 68, Organic: 58, Email: 30, Social: 24 },
    { m: 'Dec', Paid: 74, Organic: 62, Email: 32, Social: 26 },
  ],
  LatinAmerica: [
    { m: 'Jan', Paid: 25, Organic: 22, Email: 12, Social: 11 },
    { m: 'Feb', Paid: 28, Organic: 25, Email: 13, Social: 12 },
    { m: 'Mar', Paid: 31, Organic: 27, Email: 14, Social: 13 },
    { m: 'Apr', Paid: 34, Organic: 30, Email: 15, Social: 13 },
    { m: 'May', Paid: 33, Organic: 29, Email: 15, Social: 13 },
    { m: 'Jun', Paid: 36, Organic: 31, Email: 16, Social: 15 },
    { m: 'Jul', Paid: 38, Organic: 33, Email: 17, Social: 17 },
    { m: 'Aug', Paid: 39, Organic: 34, Email: 18, Social: 19 },
    { m: 'Sep', Paid: 43, Organic: 37, Email: 19, Social: 21 },
    { m: 'Oct', Paid: 45, Organic: 39, Email: 20, Social: 21 },
    { m: 'Nov', Paid: 50, Organic: 43, Email: 22, Social: 25 },
    { m: 'Dec', Paid: 53, Organic: 45, Email: 23, Social: 29 },
  ],
  MiddleEastAfrica: [
    { m: 'Jan', Paid: 22, Organic: 18, Email: 10, Social: 10 },
    { m: 'Feb', Paid: 24, Organic: 20, Email: 10, Social: 11 },
    { m: 'Mar', Paid: 26, Organic: 21, Email: 11, Social: 12 },
    { m: 'Apr', Paid: 28, Organic: 23, Email: 12, Social: 12 },
    { m: 'May', Paid: 27, Organic: 22, Email: 12, Social: 12 },
    { m: 'Jun', Paid: 29, Organic: 24, Email: 12, Social: 13 },
    { m: 'Jul', Paid: 31, Organic: 26, Email: 13, Social: 15 },
    { m: 'Aug', Paid: 32, Organic: 27, Email: 13, Social: 16 },
    { m: 'Sep', Paid: 34, Organic: 28, Email: 14, Social: 19 },
    { m: 'Oct', Paid: 36, Organic: 30, Email: 15, Social: 19 },
    { m: 'Nov', Paid: 40, Organic: 33, Email: 16, Social: 26 },
    { m: 'Dec', Paid: 44, Organic: 36, Email: 17, Social: 28 },
  ],
};
function buildRegionMonthlyByYear(year: number): RegionMonthly[] {
  const yrMul = yearGrowth[year] ?? 1.0;
  return regionMonthlyBase.map(r => ({
    m: r.m,
    AsiaPacific: Math.round(r.AsiaPacific * yrMul),
    Europe: Math.round(r.Europe * yrMul),
    NorthAmerica: Math.round(r.NorthAmerica * yrMul),
    LatinAmerica: Math.round(r.LatinAmerica * yrMul),
    MiddleEastAfrica: Math.round(r.MiddleEastAfrica * yrMul),
  }));
}
function buildChannelsByRegionYear(year: number, region: RegionKey): ChannelMonthly[] {
  const base = channelsByRegionBase[region];
  const regionYear = buildRegionMonthlyByYear(year);
  const regionTotals = regionYear.map(r => r[region]);
  return base.map((row, idx) => {
    const totalBase = row.Paid + row.Organic + row.Email + row.Social;
    const target = regionTotals[idx] ?? 1;
    const scale = totalBase ? target / totalBase : 1;
    return {
      m: row.m,
      Paid: Math.round(row.Paid * scale),
      Organic: Math.round(row.Organic * scale),
      Email: Math.round(row.Email * scale),
      Social: Math.round(row.Social * scale),
    };
  });
}

/* Market Trends & Share */
type MarketMonthly = { m: string; market: number };
const monthlyMarketBase: MarketMonthly[] = [
  { m: 'Jan', market: 900000 }, { m: 'Feb', market: 980000 }, { m: 'Mar', market: 1040000 },
  { m: 'Apr', market: 1080000 }, { m: 'May', market: 1090000 }, { m: 'Jun', market: 1100000 },
  { m: 'Jul', market: 1130000 }, { m: 'Aug', market: 1150000 }, { m: 'Sep', market: 1200000 },
  { m: 'Oct', market: 1240000 }, { m: 'Nov', market: 1350000 }, { m: 'Dec', market: 1480000 }
];
function buildMonthlyMarketByYear(year: number): MarketMonthly[] {
  const yrMul = yearGrowth[year] ?? 1.0;
  return monthlyMarketBase.map(r => ({ m: r.m, market: Math.round(r.market * yrMul) }));
}

const regionMarketSplit = {
  AsiaPacific: 0.36,
  Europe: 0.30,
  NorthAmerica: 0.22,
  LatinAmerica: 0.07,
  MiddleEastAfrica: 0.05
} as const;

type ChannelKey = 'Paid' | 'Organic' | 'Email' | 'Social';
const marketChannelSplitByRegion: Record<RegionKey, Record<ChannelKey, number>> = {
  AsiaPacific: { Paid: 0.42, Organic: 0.32, Email: 0.16, Social: 0.10 },
  Europe: { Paid: 0.40, Organic: 0.36, Email: 0.14, Social: 0.10 },
  NorthAmerica: { Paid: 0.38, Organic: 0.38, Email: 0.16, Social: 0.08 },
  LatinAmerica: { Paid: 0.46, Organic: 0.30, Email: 0.14, Social: 0.10 },
  MiddleEastAfrica: { Paid: 0.48, Organic: 0.28, Email: 0.14, Social: 0.10 }
};

const regionDisplay = {
  AsiaPacific: 'Asia-Pacific',
  Europe: 'Europe',
  NorthAmerica: 'North America',
  LatinAmerica: 'Latin America',
  MiddleEastAfrica: 'Middle East & Africa'
} as const;

type ChannelCRMonthly = { m: string; Paid: number; Organic: number; Email: number; Social: number };
const channelCR_2024: ChannelCRMonthly[] = [
  { m: 'Jan', Paid: 2.1, Organic: 3.0, Email: 4.2, Social: 1.8 },
  { m: 'Feb', Paid: 2.2, Organic: 3.1, Email: 4.1, Social: 1.9 },
  { m: 'Mar', Paid: 2.3, Organic: 3.2, Email: 4.3, Social: 2.0 },
  { m: 'Apr', Paid: 2.4, Organic: 3.3, Email: 4.5, Social: 2.1 },
  { m: 'May', Paid: 2.3, Organic: 3.2, Email: 4.4, Social: 2.0 },
  { m: 'Jun', Paid: 2.5, Organic: 3.4, Email: 4.6, Social: 2.2 },
  { m: 'Jul', Paid: 2.6, Organic: 3.5, Email: 4.7, Social: 2.3 },
  { m: 'Aug', Paid: 2.6, Organic: 3.5, Email: 4.7, Social: 2.3 },
  { m: 'Sep', Paid: 2.7, Organic: 3.6, Email: 4.8, Social: 2.4 },
  { m: 'Oct', Paid: 2.8, Organic: 3.7, Email: 4.9, Social: 2.5 },
  { m: 'Nov', Paid: 2.9, Organic: 3.8, Email: 5.0, Social: 2.6 },
  { m: 'Dec', Paid: 3.0, Organic: 3.9, Email: 5.1, Social: 2.7 },
];

function shiftCR(base: ChannelCRMonthly[], delta: number): ChannelCRMonthly[] {
  return base.map((r) => ({
    m: r.m,
    Paid: Math.max(0, +(r.Paid + delta).toFixed(2)),
    Organic: Math.max(0, +(r.Organic + delta).toFixed(2)),
    Email: Math.max(0, +(r.Email + delta).toFixed(2)),
    Social: Math.max(0, +(r.Social + delta).toFixed(2)),
  }));
}

const channelCR_2022: ChannelCRMonthly[] = shiftCR(channelCR_2024, -0.20);
const channelCR_2023: ChannelCRMonthly[] = shiftCR(channelCR_2024, -0.10);
const channelCR_2025: ChannelCRMonthly[] = shiftCR(channelCR_2024, +0.10);

const channelCRByYear: Record<number, ChannelCRMonthly[]> = {
  2022: channelCR_2022,
  2023: channelCR_2023,
  2024: channelCR_2024,
  2025: channelCR_2025,
};

function buildChannelCRByYear(year: number): ChannelCRMonthly[] {
  return (channelCRByYear[year] ?? channelCR_2024).map(r => ({ ...r }));
}

type OrdersByChannel = { m: string; Paid: number; Organic: number; Email: number; Social: number };
function buildOrdersByChannelYear(year: number): OrdersByChannel[] {
  const ap = buildChannelsByRegionYear(year, 'AsiaPacific');
  const eu = buildChannelsByRegionYear(year, 'Europe');
  const na = buildChannelsByRegionYear(year, 'NorthAmerica');
  const la = buildChannelsByRegionYear(year, 'LatinAmerica');
  const mea = buildChannelsByRegionYear(year, 'MiddleEastAfrica');
  return months.map((m, i) => {
    const a = ap[i], e = eu[i], n = na[i], l = la[i], me = mea[i];
    return {
      m,
      Paid: (a?.Paid ?? 0) + (e?.Paid ?? 0) + (n?.Paid ?? 0) + (l?.Paid ?? 0) + (me?.Paid ?? 0),
      Organic: (a?.Organic ?? 0) + (e?.Organic ?? 0) + (n?.Organic ?? 0) + (l?.Organic ?? 0) + (me?.Organic ?? 0),
      Email: (a?.Email ?? 0) + (e?.Email ?? 0) + (n?.Email ?? 0) + (l?.Email ?? 0) + (me?.Email ?? 0),
      Social: (a?.Social ?? 0) + (e?.Social ?? 0) + (n?.Social ?? 0) + (l?.Social ?? 0) + (me?.Social ?? 0),
    };
  });
}

function buildPromoNonPromoNetSales(year: number): { m: string; promo: number; nonPromo: number }[] {
  const orders = buildOrdersByChannelYear(year);
  const revenueRows = monthlyRevenueByYear[year] ?? [];
  return months.map((m, i) => {
    const o = orders[i];
    const rev = revenueRows[i]?.actual ?? 0;
    const promoOrders = (o?.Paid ?? 0) + (o?.Email ?? 0);
    const nonPromoOrders = (o?.Organic ?? 0) + (o?.Social ?? 0);
    const total = promoOrders + nonPromoOrders;
    if (total <= 0 || rev <= 0) return { m, promo: 0, nonPromo: 0 };
    const promo = rev * (promoOrders / total);
    const nonPromo = rev * (nonPromoOrders / total);
    return { m, promo, nonPromo };
  });
}

const ProductPricing: Record<string, { price: number; marginPct: number }> = {
  'Noise-Cancel Headphones': { price: 199, marginPct: 0.35 },
  'Smartwatch X': { price: 249, marginPct: 0.32 },
  '4K TV 55"': { price: 699, marginPct: 0.22 },
  'Laptop Pro 14': { price: 1299, marginPct: 0.18 },
  'Bluetooth Speaker': { price: 99, marginPct: 0.38 },
  'Hoodie Essential': { price: 49, marginPct: 0.45 },
  'Running Shoes': { price: 89, marginPct: 0.40 },
  'Classic T-Shirt': { price: 19, marginPct: 0.50 },
  'Air Fryer': { price: 149, marginPct: 0.30 },
  'Vacuum Cleaner': { price: 199, marginPct: 0.28 },
  'Coffee Maker Pro': { price: 129, marginPct: 0.33 },
  'Smart LED Bulb Pack': { price: 29, marginPct: 0.55 },
  'Face Serum': { price: 39, marginPct: 0.60 },
  'Yoga Mat Pro': { price: 35, marginPct: 0.50 },
  'Gift Card Pack': { price: 50, marginPct: 0.02 },
  'Home Decor Set': { price: 79, marginPct: 0.45 },
  'Stationery Bundle': { price: 25, marginPct: 0.55 },
};

const monthCoverage = [1.30, 1.30, 1.25, 1.30, 1.35, 1.40, 1.40, 1.35, 1.25, 1.15, 1.05, 1.05];

const supplyCoverByMonth = [1.05, 0.85, 1.10, 0.95, 0.80, 0.75, 0.90, 0.70, 1.00, 0.95, 0.85, 1.05] as const;

type StockStatus = 'In Stock' | 'Low' | 'Out of Stock';
const computeStockStatus = (units: number, monthIdx: number): StockStatus => {
  const cov = monthCoverage[monthIdx] ?? 1.3;
  const onhand = Math.round(units * cov);
  const remaining = onhand - units;
  if (remaining <= 0) return 'Out of Stock';
  if (remaining <= Math.max(5, Math.round(units * 0.10))) return 'Low';
  return 'In Stock';
};

type TargetVsActualBulletPanelProps = {
  year?: number;
  monthIdxs?: number[];
  region?: string;
  channels?: string[];
  categories?: string[];
  onReady?: (api: { refreshTargetActualBulletPanelChart: () => void }) => void
};

type TargetVsActualBulletPanelState = {
  metric: 'revenue' | 'orders';
};

class TargetVsActualBulletPanel extends React.PureComponent<TargetVsActualBulletPanelProps, TargetVsActualBulletPanelState> {
  static defaultProps: TargetVsActualBulletPanelProps = {
    year: 2025,
    monthIdxs: Array.from({ length: 12 }, (_, i) => i),
    region: 'ALL',
    channels: [],
    categories: []
  };

  private TargetActualBulletchartRef = React.createRef<BulletChartComponent>();

  state: TargetVsActualBulletPanelState = { metric: 'revenue' };

  private refreshTargetActualBulletPanelChart = () => {
    this.TargetActualBulletchartRef.current?.refresh();
  };

  componentDidMount() {
    this.props.onReady?.({ refreshTargetActualBulletPanelChart: this.refreshTargetActualBulletPanelChart });
  }

  componentDidUpdate(prevProps: TargetVsActualBulletPanelProps, prevState: TargetVsActualBulletPanelState) {
    const propsChanged =
      prevProps.year !== this.props.year ||
      !arrayEqual(prevProps.monthIdxs, this.props.monthIdxs) ||
      prevProps.region !== this.props.region ||
      !arrayEqual(prevProps.channels, this.props.channels) ||
      !arrayEqual(prevProps.categories, this.props.categories);

    const metricChanged = prevState.metric !== this.state.metric;

    if (propsChanged || metricChanged) {
      this.TargetActualBulletchartRef.current?.refresh();
    }
  }

  private setMetric = (metric: 'revenue' | 'orders') => {
    if (metric === this.state.metric) return;
    this.setState({ metric }, () => this.TargetActualBulletchartRef.current?.refresh());
  };

  private getIncludedRegions(): RegionKey[] {
    const r = this.props.region;
    if (r === 'ALL') {
      return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    }
    return isRegionKey(r) ? [r] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
  }

  private computeCategoryShareForMonth(year: number, monthIdx: number): { shareSum: number; shareByCat: Record<string, number> } {
    const products = buildYearProductSales(year);
    const totals: Record<string, number> = {};
    let totalUnits = 0;

    for (const p of products) {
      const units = p.monthly?.[monthIdx] ?? 0;
      totalUnits += units;
      totals[p.category] = (totals[p.category] ?? 0) + units;
    }

    const shareByCat: Record<string, number> = {};
    for (const k of Object.keys(totals)) {
      shareByCat[k] = totalUnits > 0 ? totals[k] / totalUnits : 0;
    }
    const selectedCats = this.props.categories ?? [];
    const shareSum = selectedCats.length
      ? selectedCats.reduce((s, c) => s + (shareByCat[c] ?? 0), 0)
      : 1;

    return { shareSum, shareByCat };
  }

  private computeIncludedOrdersForMonth(year: number, monthIdx: number): number {
    const regions = this.getIncludedRegions();
    const selectedChannels = asChannelKeys(this.props.channels ?? []);
    const channels = selectedChannels.length ? selectedChannels : ALL_CHANNELS;

    let orders = 0;
    for (const region of regions) {
      const chRows = buildChannelsByRegionYear(year, region); // by month
      const row = chRows[monthIdx];
      if (!row) continue;
      for (const ch of channels) {
        orders += (row[ch] ?? 0);
      }
    }
    const { shareSum } = this.computeCategoryShareForMonth(year, monthIdx);
    return orders * shareSum;
  }

  private computeRevenueSliceForMonth(year: number, monthIdx: number): { actual: number; target: number } {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const masterActual = master?.actual ?? 0;
    const masterTarget = master?.target ?? 0;
    const denomOrders = (() => {
      const allRegions: RegionKey[] = ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
      let sum = 0;
      for (const region of allRegions) {
        const chRows = buildChannelsByRegionYear(year, region);
        const row = chRows[monthIdx];
        if (!row) continue;
        sum += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
      }
      return sum;
    })();
    const { shareSum } = this.computeCategoryShareForMonth(year, monthIdx);
    const includedOrdersNoCat = (() => {
      const regions = this.getIncludedRegions();
      const selectedChannels = asChannelKeys(this.props.channels ?? []);
      const channels = selectedChannels.length ? selectedChannels : ALL_CHANNELS;

      let orders = 0;
      for (const region of regions) {
        const chRows = buildChannelsByRegionYear(year, region);
        const row = chRows[monthIdx];
        if (!row) continue;
        for (const ch of channels) orders += (row[ch] ?? 0);
      }
      return orders;
    })();

    const regionChannelFactor = denomOrders > 0 ? includedOrdersNoCat / denomOrders : 0;
    const sliceFactor = regionChannelFactor * shareSum;

    return {
      actual: masterActual * sliceFactor,
      target: masterTarget * sliceFactor
    };
  }

  private computeOrdersTargetForMonth(year: number, monthIdx: number, actualOrders: number): number {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const actualRev = master?.actual ?? 0;
    const targetRev = master?.target ?? 0;
    if (actualRev <= 0) return Math.round(actualOrders);
    const ratio = targetRev / actualRev;
    const safeRatio = Math.max(0.5, Math.min(1.8, ratio));
    return Math.round(actualOrders * safeRatio);
  }

  private buildRows(): BulletRow[] {
    const { year, monthIdxs } = this.props;
    const metric = this.state.metric;

    return monthIdxs.map((i) => {
      if (metric === 'revenue') {
        const { actual, target } = this.computeRevenueSliceForMonth(year, i);
        const ach = safePct(actual, target);
        return {
          category: months[i] ?? '',
          value: actual,
          target,
          valueColor: BulletColors.actual,
          targetColor: BulletColors.target,
          achievementPct: Math.round(ach),
          actualText: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(actual),
          targetText: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(target),
        };
      }

      // orders
      const actualOrders = this.computeIncludedOrdersForMonth(year, i);
      const targetOrders = this.computeOrdersTargetForMonth(year, i, actualOrders);
      const ach = safePct(actualOrders, targetOrders);

      return {
        category: months[i] ?? '',
        value: Math.round(actualOrders),
        target: targetOrders,
        valueColor: '#2563EB',
        targetColor: BulletColors.target,
        achievementPct: Math.round(ach),
        actualText: new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(actualOrders),
        targetText: new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(targetOrders),
      };
    });
  }

  private computeScale(data: BulletRow[]) {
    const maxValue = Math.max(0, ...data.map(d => Math.max(d.value ?? 0, d.target ?? 0)));
    const pad = maxValue * 0.15;
    const max = Math.ceil((maxValue + pad) / 10) * 10 || 10;
    const interval = Math.max(1, Math.round(max / 5));

    const maxTarget = Math.max(1, ...data.map(d => d.target ?? 0));
    const poorEnd = Math.round(maxTarget * 0.80);
    const okEnd = Math.round(maxTarget * 1.00);
    const goodEnd = Math.max(okEnd + 1, Math.round(maxTarget * 1.25));

    return { min: 0, max: Math.max(max, goodEnd), interval, poorEnd, okEnd, goodEnd };
  }

  private onBulletTooltipRender = (args: any) => {
    // Compact currency that works across browsers (currency+compact is unreliable)
    const compactUSD = (n: number) => {
      const abs = Math.abs(n);
      const txt = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 0 }).format(abs);
      return (n < 0 ? '-' : '') + '$' + txt; // e.g., $542K, $1.2M
    };

    const v = args?.value;
    const achievedText =
      typeof v === 'number' ? formatCurrency(v) : String(v ?? '');

    const t = Array.isArray(args?.target) ? args.target[0] : args?.target;
    const targetText =
      typeof t === 'number' ? formatCurrency(t) : String(t ?? '');

    args.text = `Achieved: ${achievedText}<br/>Target: ${targetText}`;
  };
  render() {
    const metric = this.state.metric;
    const data = this.buildRows();
    const scale = this.computeScale(data);

    const labelFormat = metric === 'revenue' ? '${value}' : '{value}';

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <div style={{ height: 'calc(100% - 50px)', width: '100%' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'end' }}>
            {/* Syncfusion button group */}
            <div className="e-btn-group" style={{ marginLeft: 10 }}>
              <ButtonComponent cssClass={metric === 'revenue' ? 'e-primary' : 'e-outline'} onClick={() => this.setMetric('revenue')}>Revenue</ButtonComponent>
              <ButtonComponent cssClass={metric === 'orders' ? 'e-primary' : 'e-outline'} onClick={() => this.setMetric('orders')}>Orders</ButtonComponent>
            </div>
          </div>
          <BulletChartComponent
            id="targetVsActualBullet"
            ref={this.TargetActualBulletchartRef}
            dataSource={data}
            valueField="value"
            targetField="target"
            categoryField="category"
            enableGroupSeparator={true}
            labelFormat={labelFormat}
            minimum={scale.min}
            maximum={scale.max}
            interval={scale.interval}
            valueFill={BulletColors.actual}
            targetColor={BulletColors.target}
            targetWidth={6}
            tooltip={{ enable: true }}
            tooltipRender={this.onBulletTooltipRender}
            majorTickLines={{ width: 0 }}
            minorTickLines={{ width: 0 }}
            animation={{ enable: false }}
            load={onBulletLoad}
          >
            <Inject services={[BulletTooltip]} />
            <BulletRangeCollectionDirective>
              <BulletRangeDirective end={scale.poorEnd} color={BulletColors.poor} opacity={0.14} />
              <BulletRangeDirective end={scale.okEnd} color={BulletColors.ok} opacity={0.14} />
              <BulletRangeDirective end={scale.goodEnd} color={BulletColors.good} opacity={0.14} />
            </BulletRangeCollectionDirective>
          </BulletChartComponent>
        </div>
      </div>
    );
  }
}

const ChannelColors: Record<ChannelKey, string> = {
  Paid: '#850E35',
  Organic: '#FF5858',
  Email: '#FE8F8F',
  Social: '#DBA39A'
};

/* ===========================
   Sales Mix & Growth
   =========================== */
type SalesMixGrowthProps = {
  year: number;
  monthIndex: number;
  region: string;
  channels: string[];
  categories: string[];
  onReady?: (api: { refreshSalesMixGrowthChart: () => void }) => void
};

type SalesMixGrowthTab = 'mix' | 'trend';

type SalesMixGrowthState = {
  drill: null | { type: 'channel'; key: ChannelKey } | { type: 'category'; key: string };
  activeTab: SalesMixGrowthTab;
};

class SalesMixGrowthPanel extends React.PureComponent<SalesMixGrowthProps, SalesMixGrowthState> {
  SalesMixGrowthChartRef = React.createRef<AccumulationChartComponent>();
  state: SalesMixGrowthState = { drill: null, activeTab: 'mix' };

  private refreshSalesMixGrowthChart = () => {
    this.SalesMixGrowthChartRef.current?.refresh();
  };

  componentDidMount() {
    this.props.onReady?.({ refreshSalesMixGrowthChart: this.refreshSalesMixGrowthChart });
  }

  private onChannelChartMouseClick = (args: any) => {
    const target = String(args?.target || '');
    if (
      target.startsWith('smg_channel_donut_datalabel_Series_0_text_') ||
      target.startsWith('smg_channel_donut_datalabel_Series_0_shape_')
    ) {
      const idx = parseInt(target.split('_').pop() || '-1', 10);
      if (idx >= 0) {
        const chart: any = this.SalesMixGrowthChartRef.current as any;
        const pt =
          chart?.visibleSeries?.[0]?.points?.[idx] ??
          chart?.accumulationSeries?.[0]?.points?.[idx] ??
          null;
        const raw = pt?.x ?? pt?.args?.point?.x ?? pt?.data?.x ?? '';
        const ch = String(raw).trim();
        if (ch === 'Paid' || ch === 'Organic' || ch === 'Email' || ch === 'Social') {
          this.setState({ drill: { type: 'channel', key: ch } });
        }
      }
    }
  };

  private setTab = (tab: SalesMixGrowthTab) => {
    if (tab === this.state.activeTab) return;

    this.setState((s) => ({
      activeTab: tab,
      drill: tab === 'trend' ? null : s.drill
    }));
  };

  private isAllMonths = () => this.props.monthIndex === ALL_MONTH;

  private getIncludedRegions(): RegionKey[] {
    const r = this.props.region;
    if (r === 'ALL') return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    return isRegionKey(r) ? [r] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
  }
  private getIncludedChannels(): ChannelKey[] {
    const sel = asChannelKeys(this.props.channels ?? []);
    return sel.length ? sel : ALL_CHANNELS;
  }

  private categoryShareForMonth(year: number, monthIdx: number) {
    const products = buildYearProductSales(year);
    const totals: Record<string, number> = {};
    let totalUnits = 0;
    for (const p of products) {
      const u = p.monthly?.[monthIdx] ?? 0;
      totalUnits += u;
      totals[p.category] = (totals[p.category] ?? 0) + u;
    }
    const shareByCat: Record<string, number> = {};
    Object.keys(totals).forEach(c => {
      shareByCat[c] = totalUnits > 0 ? (totals[c] ?? 0) / totalUnits : 0;
    });
    const selectedCats = this.props.categories ?? [];
    const catFactor = selectedCats.length
      ? selectedCats.reduce((s, c) => s + (shareByCat[c] ?? 0), 0)
      : 1;
    return { shareByCat, catFactor };
  }

  private revenueByCategoryWithinChannelMonth(year: number, monthIdx: number, channel: ChannelKey) {
    const cats = this.props.categories?.length ? this.props.categories : CATEGORY_OPTIONS;
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const masterActual = master?.actual ?? 0;
    const { shareByCat } = this.categoryShareForMonth(year, monthIdx);
    const denom = this.denomOrdersAllRegionsAllChannels(year, monthIdx) || 1;
    const chOrders = this.ordersForChannelMonth(year, monthIdx, channel);
    const rcFactor = chOrders / denom;
    return cats.map(c => ({ x: c, y: masterActual * rcFactor * (shareByCat[c] ?? 0) }));
  }

  private ordersForChannelMonth(year: number, monthIdx: number, ch: ChannelKey) {
    let sum = 0;
    for (const region of this.getIncludedRegions()) {
      const rows = buildChannelsByRegionYear(year, region);
      const r = rows[monthIdx];
      if (r) sum += (r[ch] ?? 0);
    }
    return sum;
  }

  private denomOrdersAllRegionsAllChannels(year: number, monthIdx: number) {
    let sum = 0;
    for (const region of ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'] as RegionKey[]) {
      const rows = buildChannelsByRegionYear(year, region);
      const r = rows[monthIdx];
      if (!r) continue;
      sum += (r.Paid ?? 0) + (r.Organic ?? 0) + (r.Email ?? 0) + (r.Social ?? 0);
    }
    return sum;
  }

  private revenueByChannelForMonth(year: number, monthIdx: number) {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const masterActual = master?.actual ?? 0;
    const { catFactor } = this.categoryShareForMonth(year, monthIdx);
    const denom = this.denomOrdersAllRegionsAllChannels(year, monthIdx) || 1;

    const channels = this.getIncludedChannels();
    const byCh: Record<ChannelKey, number> = { Paid: 0, Organic: 0, Email: 0, Social: 0 };
    for (const ch of channels) {
      const chOrders = this.ordersForChannelMonth(year, monthIdx, ch);
      byCh[ch] = masterActual * (chOrders / denom) * catFactor;
    }
    return byCh;
  }
  private revenueByChannelForYear(year: number) {
    const monthsIdx = Array.from({ length: 12 }, (_, i) => i);
    const agg: Record<ChannelKey, number> = { Paid: 0, Organic: 0, Email: 0, Social: 0 };
    for (const i of monthsIdx) {
      const m = this.revenueByChannelForMonth(year, i);
      (Object.keys(m) as ChannelKey[]).forEach(k => (agg[k] += m[k]));
    }
    const sel = this.getIncludedChannels();
    (Object.keys(agg) as ChannelKey[]).forEach(k => {
      if (!sel.includes(k)) delete (agg as any)[k];
    });
    return agg;
  }

  private revenueByCategoryForMonth(year: number, monthIdx: number) {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const masterActual = master?.actual ?? 0;
    const { shareByCat, catFactor } = this.categoryShareForMonth(year, monthIdx);
    const denom = this.denomOrdersAllRegionsAllChannels(year, monthIdx) || 1;
    const channels = this.getIncludedChannels();
    let included = 0;
    for (const ch of channels) included += this.ordersForChannelMonth(year, monthIdx, ch);
    const rcFactor = included / denom;
    const cats = this.props.categories?.length ? this.props.categories : Object.keys(shareByCat);
    const out: { x: string; y: number }[] = cats.map(c => ({
      x: c,
      y: masterActual * rcFactor * (shareByCat[c] ?? 0)
    }));
    return out;
  }
  private revenueByCategoryForYear(year: number) {
    const cats = this.props.categories?.length ? this.props.categories : CATEGORY_OPTIONS;
    const agg: Record<string, number> = Object.fromEntries(cats.map(c => [c, 0]));
    for (let i = 0; i < 12; i++) {
      for (const row of this.revenueByCategoryForMonth(year, i)) {
        if (row && typeof row.y === 'number') agg[row.x] = (agg[row.x] ?? 0) + row.y;
      }
    }
    return Object.keys(agg).map(k => ({ x: k, y: agg[k] }));
  }

  private revenueByCategoryWithinChannelYear(year: number, channel: ChannelKey) {
    const cats = this.props.categories?.length ? this.props.categories : CATEGORY_OPTIONS;
    const agg: Record<string, number> = Object.fromEntries(cats.map(c => [c, 0]));
    for (let i = 0; i < 12; i++) {
      const master = (monthlyRevenueByYear[year] ?? [])[i];
      const masterActual = master?.actual ?? 0;
      const { shareByCat } = this.categoryShareForMonth(year, i);
      const denom = this.denomOrdersAllRegionsAllChannels(year, i) || 1;
      const chOrders = this.ordersForChannelMonth(year, i, channel);
      const rcFactor = chOrders / denom;

      for (const c of cats) {
        agg[c] += masterActual * rcFactor * (shareByCat[c] ?? 0);
      }
    }
    return Object.keys(agg).map(k => ({ x: k, y: agg[k] }));
  }

  private onChannelDonutPointClick = (args: any) => {
    const raw = (args?.point?.data?.x ?? args?.point?.x ?? '') as string;
    const ch = String(raw).replace(/\s*\(\s*\d+%?\s*\)\s*$/, '').trim();
    if (ch === 'Paid' || ch === 'Organic' || ch === 'Email' || ch === 'Social') {
      this.setState({ drill: { type: 'channel', key: ch } });
    }
  };

  private onCurrencyTooltip = (args: any) => {
    const y = Number(args?.point?.y ?? 0);
    const x = String(args?.point?.x ?? '');
    const series = String(args?.series?.name ?? '');
    args.text = series ? `${x} : ${formatCurrency(y)}` : `${x}: ${formatCurrency(y)}`;
  };

  private onBack = () => this.setState({ drill: null });

  private roundSeriesToTotal(data: { x: any; y: number }[]) {
    const items = data.map(d => ({ x: d.x, y: Number(d.y || 0) }));
    const total = items.reduce((s, d) => s + d.y, 0);
    if (!isFinite(total) || items.length === 0) return items.map(d => ({ x: d.x, y: Math.round(d.y) }));

    const target = Math.round(total);
    const floors = items.map(d => Math.floor(Math.max(0, d.y)));
    let rem = target - floors.reduce((s, v) => s + v, 0);

    const order = items
      .map((d, i) => ({ i, frac: d.y - floors[i] }))
      .sort((a, b) => b.frac - a.frac);

    const out = items.map((d, i) => ({ x: d.x, y: floors[i] }));
    for (let k = 0; rem > 0 && k < order.length; k++) { out[order[k].i].y += 1; rem--; }
    for (let k = 0; rem < 0 && k < order.length; k++) {
      const idx = order[order.length - 1 - k].i;
      if (out[idx].y > 0) { out[idx].y -= 1; rem++; }
    }
    return out;
  }

  private renderMixView() {
    const { year, monthIndex } = this.props;
    const isAll = this.isAllMonths();
    const drill = this.state.drill;
    const chartId = drill ? 'smg_channel_donut_drill' : 'smg_channel_donut';
    // your existing donut data building stays the same:
    const byChannel = isAll ? this.revenueByChannelForYear(year) : this.revenueByChannelForMonth(year, monthIndex);
    const chDataRaw = Object.keys(byChannel)
      .map(k => ({ x: k, y: (byChannel as any)[k] as number }))
      .filter(d => (d.y ?? 0) > 0);

    const chData = this.roundSeriesToTotal(chDataRaw);
    const totalCh = chData.reduce((s, p) => s + (p.y || 0), 0) || 1;

    // Keep legend text plain; attach pct for data labels
    const chDataForChart = chData.map(d => {
      const pct = totalCh > 0 ? Math.round(((d.y || 0) / totalCh) * 100) : 0;
      return { ...d, legendText: String(d.x), pct };
    });

    const chColors = chData.map(d => ChannelColors[d.x as ChannelKey] ?? '#999');

    const byCategoryRaw = (
      isAll ? this.revenueByCategoryForYear(year) : this.revenueByCategoryForMonth(year, monthIndex)
    ).filter(d => d.y > 0);

    const byCategory = this.roundSeriesToTotal(byCategoryRaw);
    const catPalette = pickPalette(Palettes.salesMix, byCategory.length);

    // Drilldown data
    let drillTitle = '';
    let drillData: { x: string; y: number }[] = [];
    let drillColors: string[] = [];
    if (drill?.type === 'channel') {
      drillTitle = `Categories • ${drill.key}`;
      const rows = isAll
        ? this.revenueByCategoryWithinChannelYear(year, drill.key)
        : this.revenueByCategoryWithinChannelMonth(year, monthIndex, drill.key);
      const drillDataRounded = this.roundSeriesToTotal(rows.filter(r => (r?.y ?? 0) > 0));
      const drillTotal = drillDataRounded.reduce((s, p) => s + (p.y || 0), 0) || 1;
      // legendText plain; attach pct for labels
      const drillDataForChart = drillDataRounded.map(d => {
        const pct = Math.round(((d.y || 0) / drillTotal) * 100);
        return { ...d, legendText: String(d.x), pct };
      });

      drillData = drillDataRounded;
      drillColors = pickPalette(Palettes.salesMix, drillData.length);
      (drillData as any)._forChart = drillDataForChart;
    }

    const revenueCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    // Show "$value (pct%)" on labels; prefer pct from data, else derive
    const onTextRender = (args: any) => {
      const y = Number(args.point?.y ?? 0);
      const pctFromData = Number(args?.point?.data?.pct);
      let pct = Number.isFinite(pctFromData) ? Math.round(pctFromData) : NaN;

      if (!Number.isFinite(pct)) {
        const pts = Array.isArray(args?.series?.points) ? args.series.points : [];
        const sum = pts.reduce((s: number, p: any) => s + (Number(p?.y) || 0), 0);
        pct = sum > 0 ? Math.round((y / sum) * 100) : 0;
      }
      args.text = `${formatCurrency(y)} (${pct}%)`;
    };

    return (
      <div style={{ height: '100%', width: '100%', minHeight: 0 }}>
        <AccumulationChartComponent
          id={chartId}
          ref={this.SalesMixGrowthChartRef}
          legendSettings={{ visible: true, position: "Right" }}
          tooltip={{ enable: true }}
          tooltipRender={this.onCurrencyTooltip}
          textRender={onTextRender}
          pointClick={drill ? undefined : this.onChannelDonutPointClick}
          chartMouseClick={!drill ? this.onChannelChartMouseClick : undefined}
          load={onAccumulationLoad}
        >
          <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            {!drill && (
              <AccumulationSeriesDirective
                type="Pie"
                dataSource={chDataForChart}
                xName="legendText"
                yName="y"
                innerRadius="65%"
                palettes={chColors}
                dataLabel={{ visible: true, position: 'Outside', connectorStyle: { length: '10px' }, name: 'y', font: { size: '12px' } } as any}
                animation={{ enable: false }}
                borderRadius={10} border={{ width: 4, color: '#ffffff' }}
              />
            )}
            {drill && drill.type === 'channel' && (
              <AccumulationSeriesDirective
                type="Pie"
                dataSource={(drillData as any)._forChart ?? drillData}
                xName="legendText"
                yName="y"
                innerRadius="65%"
                palettes={drillColors as any}
                dataLabel={{ visible: true, position: 'Outside', connectorStyle: { length: '10px' }, name: 'y', font: { size: '12px' } } as any}
                animation={{ enable: false }}
                borderRadius={10} border={{ width: 4, color: '#ffffff' }}
              />
            )}
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    );
  }

  private clampMonth = (m: number) => Math.max(0, Math.min(11, m));

  private buildRollingWindow = (year: number, monthIndex: number, windowSize: number = 3) => {
    const out: Array<{ year: number; monthIdx: number; label: string }> = [];
    const DATA_FLOOR_YEAR = 2022;

    for (let back = windowSize - 1; back >= 0; back--) {
      let y = year;
      let m = monthIndex - back;

      while (m < 0) { y -= 1; m += 12; }
      if (y < DATA_FLOOR_YEAR) continue;

      const monthIdx = this.clampMonth(m);
      out.push({ year: y, monthIdx, label: `${months[monthIdx]} ${y}` });
    }
    if (out.length < 2) {
      const start = Math.max(0, monthIndex - (windowSize - 1));
      return Array.from({ length: monthIndex - start + 1 }, (_, i) => {
        const idx = start + i;
        return { year, monthIdx: idx, label: `${months[idx]} ${year}` };
      });
    }
    return out;
  };

  private pctChange = (current: number, base: number) => (base > 0 ? ((current - base) / base) * 100 : null);

  private fmtPct = (v: number | null) => {
    if (v === null || !isFinite(v)) return '—';
    const sign = v > 0 ? '+' : '';
    return `${sign}${v.toFixed(1)}%`;
  };

  private getPrevMonth = (year: number, monthIndex: number) => {
    if (monthIndex > 0) return { year, monthIdx: monthIndex - 1 };
    return { year: year - 1, monthIdx: 11 };
  };

  private onTrendsViewAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  private renderTrendView() {
    const { year, monthIndex } = this.props;
    const isAll = this.isAllMonths();
    const includedChannels = this.getIncludedChannels();

    const points = isAll
      ? Array.from({ length: 12 }, (_, i) => ({ year, monthIdx: i, label: months[i] }))
      : this.buildRollingWindow(year, monthIndex, 3);
    const trendSeriesByChannel: Record<string, Array<{ m: string; y: number }>> = {};
    includedChannels.forEach((ch) => {
      trendSeriesByChannel[ch] = points.map((p) => {
        const byCh = this.revenueByChannelForMonth(p.year, p.monthIdx);
        return { m: p.label, y: (byCh as any)[ch] ?? 0 };
      });
    });
    const currByCh = this.revenueByChannelForMonth(year, monthIndex);
    const prev = this.getPrevMonth(year, monthIndex);
    const prevByCh = prev.year >= 2022 ? this.revenueByChannelForMonth(prev.year, prev.monthIdx) : null;
    const yoyByCh = (year - 1) >= 2022 ? this.revenueByChannelForMonth(year - 1, monthIndex) : null;

    const growthRows = includedChannels.map((ch) => {
      const curr = (currByCh as any)[ch] ?? 0;
      const pm = prevByCh ? ((prevByCh as any)[ch] ?? 0) : 0;
      const ly = yoyByCh ? ((yoyByCh as any)[ch] ?? 0) : 0;
      return { ch, mom: this.pctChange(curr, pm), yoy: this.pctChange(curr, ly) };
    });

    return (
      <div style={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Growth chips */}
        {!isAll && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {growthRows.map((g) => (
              <div
                key={g.ch}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 10px',
                  border: '1px solid #E2E8F0',
                  borderRadius: 999,
                  background: '#F8FAFC'
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: (ChannelColors as any)[g.ch] ?? '#64748B' }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>{g.ch}</span>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 700 }}>MoM</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: (g.mom ?? 0) >= 0 ? '#16A34A' : '#DC2626' }}>
                  {this.fmtPct(g.mom)}
                </span>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 700 }}>YoY</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: (g.yoy ?? 0) >= 0 ? '#16A34A' : '#DC2626' }}>
                  {this.fmtPct(g.yoy)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Line chart (fills remaining space) */}
        <div style={{ flex: 1, minHeight: 0, height: '100%', width: '100%' }}>
          <ChartComponent
            id="salesMixGrowthTrendTab"
            height="100%"
            width="100%"
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, labelStyle: { size: '10px' } }}
            primaryYAxis={{ labelFormat: 'c0', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 0 }, labelStyle: { size: '10px' } }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
            axisLabelRender={this.onTrendsViewAxisLabelRender}
            load={onChartLoad}
            tooltipRender={this.onCurrencyTooltip}
          >
            <Inject services={[SplineSeries, Legend, ChartTooltip, Category]} />
            <SeriesCollectionDirective>
              {includedChannels.map((ch) => (
                <SeriesDirective
                  key={ch}
                  type="Spline"
                  name={ch}
                  dataSource={trendSeriesByChannel[ch]}
                  xName="m"
                  yName="y"
                  width={2}
                  marker={{ visible: true, width: 8, height: 8 }}
                  fill={(ChannelColors as any)[ch] ?? '#64748B'}
                />
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }


  render() {
    const { activeTab } = this.state;

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', minHeight: 0 }}>
        {/* Header with LEFT: Back + context text, RIGHT: Mix/Trend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}
        >
          {/* LEFT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 36 }}>
            {this.state.drill ? (
              <>
                <button onClick={this.onBack} className="e-btn e-outline">Back</button>
                <div
                  style={{
                    fontSize: 12,
                    color: '#64748B',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {this.state.drill.type === 'channel'
                    ? `Categories • ${this.state.drill.key}`
                    : `Products • ${this.state.drill.key}`}
                </div>
              </>
            ) : (
              // Keep line height stable when not drilled
              <div style={{ height: 0 }} />
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="e-btn-group">
            <ButtonComponent
              cssClass={this.state.activeTab === 'mix' ? 'e-primary' : 'e-outline'}
              onClick={() => this.setTab('mix')}
            >
              Mix
            </ButtonComponent>
            <ButtonComponent
              cssClass={this.state.activeTab === 'trend' ? 'e-primary' : 'e-outline'}
              onClick={() => this.setTab('trend')}
            >
              Trend
            </ButtonComponent>
          </div>
        </div>
        <div style={{ height: 'calc(100% - 60px)', minHeight: 0, width: '100%' }}>
          {activeTab === 'mix' ? this.renderMixView() : this.renderTrendView()}
        </div>
      </div>
    );
  }

}

/* ===========================
   Demand Origins Panel
   =========================== */
type DemandOriginsProps = {
  year: number;
  monthIndex: number;
  region: string;
  channels: string[];
  categories: string[];
  onReady?: (api: { refreshRegionChart: () => void }) => void
};
type DemandOriginsState = {
  demandRegion: RegionKey | null;
  worldShape: any | null;
  channelDrill: ChannelKey | null;
};

const TOP_N_PRODUCTS = 6;

const worldMap: any = {
  type: 'FeatureCollection',
  features: [
    // North America
    {
      type: 'Feature',
      properties: { continent: 'North America', name: 'North America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-170, 5], [-52, 5], [-52, 83], [-170, 83], [-170, 5]
        ]]
      }
    },
    // South America
    {
      type: 'Feature',
      properties: { continent: 'South America', name: 'South America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-82, -56], [-34, -56], [-34, 12], [-82, 12], [-82, -56]
        ]]
      }
    },
    // Europe
    {
      type: 'Feature',
      properties: { continent: 'Europe', name: 'Europe' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-10, 35], [60, 35], [60, 72], [-10, 72], [-10, 35]
        ]]
      }
    },
    // Africa
    {
      type: 'Feature',
      properties: { continent: 'Africa', name: 'Africa' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-20, -35], [50, -35], [50, 38], [-20, 38], [-20, -35]
        ]]
      }
    },
    // Asia
    {
      type: 'Feature',
      properties: { continent: 'Asia', name: 'Asia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [25, 5], [180, 5], [180, 80], [25, 80], [25, 5]
        ]]
      }
    },
    // Oceania
    {
      type: 'Feature',
      properties: { continent: 'Oceania', name: 'Oceania' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [110, -50], [180, -50], [180, 0], [110, 0], [110, -50]
        ]]
      }
    }
  ]
};

class DemandOriginsPanel extends React.Component<DemandOriginsProps, DemandOriginsState> {
  RegionChartRef = React.createRef<ChartComponent>();
  RegionMapRef = React.createRef<MapsComponent>();
  state: DemandOriginsState = { demandRegion: null, worldShape: null, channelDrill: null };

  private refreshRegionChart = () => {
    this.RegionMapRef.current?.refresh();
    this.RegionChartRef.current?.refresh();
  };

  // ADD: load Syncfusion world countries shape (with continent property)
  private async loadWorldShape() {
    const tryUrls = [
      'https://cdn.syncfusion.com/maps/map-data/world-map.json',
      'https://cdn.syncfusion.com/production/maps/map-data/world-map.json'
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          this.setState({ worldShape: json });
          return;
        }
      } catch { }
    }
    this.setState({ worldShape: null });
  }
  componentDidMount() {
    this.props.onReady?.({ refreshRegionChart: this.refreshRegionChart });
    this.loadWorldShape();
  }
  componentDidUpdate(prevProps: DemandOriginsProps) {
    const filtersChanged =
      prevProps.year !== this.props.year ||
      prevProps.monthIndex !== this.props.monthIndex ||
      prevProps.region !== this.props.region ||
      !arrayEqual(prevProps.channels, this.props.channels) ||
      !arrayEqual(prevProps.categories, this.props.categories);
    if (filtersChanged) {
      if (this.state.demandRegion && this.props.region !== 'ALL') {
        const rk = isRegionKey(this.props.region) ? this.props.region : null;
        this.setState({ demandRegion: rk }, () => this.RegionChartRef.current?.refresh());
      } else if (this.state.demandRegion && this.props.region === 'ALL') {
        this.setState({ demandRegion: null }, () => this.RegionChartRef.current?.refresh());
      } else {
        this.RegionChartRef.current?.refresh();
      }
    }
  }

  private get monthIdxs(): number[] {
    return this.props.monthIndex === ALL_MONTH
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, this.props.monthIndex))];
  }
  private getIncludedRegions(): RegionKey[] {
    const r = this.props.region;
    if (r === 'ALL') return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    return isRegionKey(r) ? [r] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
  }
  private getIncludedChannels(): ChannelKey[] {
    const sel = asChannelKeys(this.props.channels ?? []);
    return sel.length ? sel : ALL_CHANNELS;
  }
  private categoryShareForMonth(year: number, monthIdx: number) {
    const products = buildYearProductSales(year);
    const totals: Record<string, number> = {};
    let totalUnits = 0;
    for (const p of products) {
      const u = p.monthly?.[monthIdx] ?? 0;
      totalUnits += u;
      totals[p.category] = (totals[p.category] ?? 0) + u;
    }
    const selectedCats = this.props.categories ?? [];
    if (!selectedCats.length) return 1;
    let shareSum = 0;
    for (const c of selectedCats) {
      shareSum += totalUnits > 0 ? (totals[c] ?? 0) / totalUnits : 0;
    }
    return shareSum || 0;
  }

  private ordersForRegionFiltered(region: RegionKey): number {
    const y = this.props.year;
    const channels = this.getIncludedChannels();
    const monthsSel = this.monthIdxs;
    let total = 0;
    for (const i of monthsSel) {
      const rows = buildChannelsByRegionYear(y, region);
      const r = rows[i];
      if (!r) continue;
      let sum = 0;
      for (const ch of channels) sum += (r[ch] ?? 0);
      const catShare = this.categoryShareForMonth(y, i);
      total += sum * catShare;
    }
    return total;
  }

  private ordersByChannelForRegion(region: RegionKey): { m: string; Paid: number; Organic: number; Email: number; Social: number }[] {
    const y = this.props.year;
    const monthsSel = this.monthIdxs;
    return monthsSel.map((i) => {
      const rows = buildChannelsByRegionYear(y, region);
      const r = rows[i];
      const catShare = this.categoryShareForMonth(y, i);
      return {
        m: months[i],
        Paid: ((r?.Paid ?? 0) * catShare),
        Organic: ((r?.Organic ?? 0) * catShare),
        Email: ((r?.Email ?? 0) * catShare),
        Social: ((r?.Social ?? 0) * catShare)
      };
    });
  }

  private continentWeights: Record<RegionKey, { [continent: string]: number }> = {
    AsiaPacific: { 'Asia': 0.85, 'Oceania': 0.15 },
    Europe: { 'Europe': 1.0 },
    NorthAmerica: { 'North America': 1.0 },
    LatinAmerica: { 'South America': 1.0 },
    MiddleEastAfrica: { 'Africa': 0.75, 'Asia': 0.25 } // Middle East approximated into Asia
  };

  private continentDemandRows() {
    const includedRegions = this.getIncludedRegions();
    const regionVals: Record<RegionKey, number> = {
      AsiaPacific: 0, Europe: 0, NorthAmerica: 0, LatinAmerica: 0, MiddleEastAfrica: 0
    };
    for (const r of includedRegions) {
      regionVals[r] = this.ordersForRegionFiltered(r);
    }
    const continents = ['Asia', 'Oceania', 'Europe', 'North America', 'South America', 'Africa'];
    const out: { continent: string; value: number; primaryRegion: RegionKey | null }[] =
      continents.map(c => ({ continent: c, value: 0, primaryRegion: null }));
    for (const c of continents) {
      let primary: RegionKey | null = null;
      let primaryContribution = 0;
      let totalContribution = 0;
      (Object.keys(regionVals) as RegionKey[]).forEach(rk => {
        const regionValue = regionVals[rk] || 0;
        const weight = this.continentWeights[rk]?.[c] ?? 0;
        const contrib = regionValue * weight;
        totalContribution += contrib;
        if (contrib > primaryContribution) {
          primaryContribution = contrib;
          primary = rk;
        }
      });

      const row = out.find(x => x.continent === c);
      if (row) {
        row.value = primary ? (regionVals[primary] ?? totalContribution) : totalContribution;
        row.primaryRegion = primary;
      }
    }

    return out;
  }

  private mapRegionNameToKeyFromContinent(continent: string): RegionKey | null {
    const rows = this.continentDemandRows();
    const row = rows.find(r => r.continent === continent);
    if (row && row.primaryRegion) return row.primaryRegion;
    switch (continent) {
      case 'Europe': return 'Europe';
      case 'North America': return 'NorthAmerica';
      case 'South America': return 'LatinAmerica';
      case 'Oceania': return 'AsiaPacific';
      case 'Asia': return 'AsiaPacific';
      case 'Africa': return 'MiddleEastAfrica';
      default: return null;
    }
  }

  private onMapShapeSelected = (args: any) => {
    const continent = args?.shapeData?.continent as string;
    if (!continent) return;
    const key = this.mapRegionNameToKeyFromContinent(continent || '');
    if (!key) return;
    const allowedRegions = this.getIncludedRegions();
    if (!allowedRegions.includes(key)) return;

    this.setState({ demandRegion: key });
  };

  private onDemandBack = () => this.setState({ demandRegion: null, channelDrill: null });
  private onChannelBack = () => this.setState({ channelDrill: null });

  private onChannelPointClick = (args: any) => {
    const name = (args?.series?.name ?? '').trim();
    if (name === 'Paid' || name === 'Organic' || name === 'Email' || name === 'Social') {
      this.setState({ channelDrill: name as ChannelKey });
    }
  };

  private productsByChannelForRegionYear(
    year: number,
    region: RegionKey,
    channel: ChannelKey
  ): Array<{ m: string } & Record<string, number | string>> {

    const products = buildYearProductSales(year);
    const denomAllOrdersForMonth = (monthIdx: number) => {
      let sum = 0;
      (['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'] as RegionKey[]).forEach(r => {
        const row = buildChannelsByRegionYear(year, r)[monthIdx];
        if (!row) return;
        sum += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
      });
      return sum || 1;
    };

    const regionChannelOrdersForMonth = (monthIdx: number) => {
      const row = buildChannelsByRegionYear(year, region)[monthIdx];
      return row ? ((row as any)[channel] ?? 0) : 0;
    };
    const monthRows: Array<{ m: string } & Record<string, number | string>> = [];
    for (let i = 0; i < 12; i++) {
      const denom = denomAllOrdersForMonth(i);
      const num = regionChannelOrdersForMonth(i);
      const share = num / denom;
      const perProduct: Array<{ name: string; units: number }> = products.map(p => ({
        name: p.name,
        units: Math.max(0, Math.round((p.monthly?.[i] ?? 0) * share))
      }));
      const ytdByProduct: Record<string, number> = {};
      for (let m = 0; m < 12; m++) {
        const denomM = denomAllOrdersForMonth(m);
        const numM = regionChannelOrdersForMonth(m);
        const shareM = numM / denomM;
        products.forEach(p => {
          ytdByProduct[p.name] = (ytdByProduct[p.name] ?? 0) + Math.max(0, Math.round((p.monthly?.[m] ?? 0) * shareM));
        });
      }

      const top = Object.entries(ytdByProduct)
        .sort((a, b) => (b[1] - a[1]))
        .slice(0, TOP_N_PRODUCTS)
        .map(x => x[0]);

      const row: any = { m: months[i] };
      let other = 0;
      perProduct.forEach(pp => {
        if (top.includes(pp.name)) row[pp.name] = (row[pp.name] ?? 0) + pp.units;
        else other += pp.units;
      });
      if (other > 0) row['Other'] = other;
      monthRows.push(row);
    }

    return monthRows;
  }

  private displayRegion = (rk: RegionKey) => {
    switch (rk) {
      case 'AsiaPacific': return 'Asia-Pacific';
      case 'NorthAmerica': return 'North America';
      case 'LatinAmerica': return 'Latin America';
      case 'MiddleEastAfrica': return 'Middle East & Africa';
      default: return rk;
    }
  };

  private getShapeProp(shapeData: any, key: string) {
    return shapeData?.[key] ?? shapeData?.properties?.[key] ?? '';
  }

  private tooltipRender = (args: any): void => {
    if (!args.options['data'] || args.options['data'].value === 0) {
      args.cancel = true;
    }
    const shape = args?.shapeData ?? args?.options?.data ?? args?.options ?? {};
    const continent = String(this.getShapeProp(shape, 'continent') || '').trim();
    const name = String(this.getShapeProp(shape, 'name') || continent || '—').trim();
    const optData = args?.options?.data ?? args?.options ?? null;

    const rawValue =
      optData?.value ??
      optData?.properties?.value ??
      args?.data?.value ??
      args?._args$data$value ??
      0;
    const num = Number(rawValue) || 0;
    const primaryRegion = String(optData?.primaryRegion ?? '') || '';
    const primaryRegionLabel = primaryRegion ? `<div>Region: ${this.displayRegion(primaryRegion as RegionKey)}</div>` : '';

    args.content = `<div><div><b>${name}</b></div><br/>${continent ? `<div>Continent: ${continent}</div><br/>` : ''}${primaryRegionLabel}<br/><div>Demand: ${Math.round(num).toLocaleString()}</div></div>`;
  };

  render() {
    const { monthIndex, year } = this.props;
    const drilled = !!this.state.demandRegion;
    const drilledRegion = !!this.state.demandRegion;
    const drilledChannel = drilledRegion && !!this.state.channelDrill;
    const ds = this.continentDemandRows();
    const maxVal = Math.max(0, ...ds.map(d => d.value));
    const colorStops = [
      { from: 1, to: Math.round(maxVal * 0.25), color: '#DBA39A' },
      { from: Math.round(maxVal * 0.25) + 1, to: Math.round(maxVal * 0.5), color: '#FE8F8F' },
      { from: Math.round(maxVal * 0.5) + 1, to: Math.round(maxVal * 0.75), color: '#FF5858' },
      { from: Math.round(maxVal * 0.75) + 1, to: Math.round(maxVal), color: '#850E35' }
    ];
    const regionFilterIsSpecific = this.props.region !== 'ALL';
    let filteredDs = ds;
    if (regionFilterIsSpecific) {
      const rk = isRegionKey(this.props.region) ? this.props.region : null;
      if (rk) {
        const allowedContinents = Object.keys(this.continentWeights[rk]);
        filteredDs = ds.map(r => ({ ...r, value: allowedContinents.includes(r.continent) ? r.value : 0 }));
      }
    }
    let seriesData: { m: string; Paid: number; Organic: number; Email: number; Social: number }[] = [];
    const selChannels = this.getIncludedChannels();
    if (drilled && this.state.demandRegion) {
      seriesData = this.ordersByChannelForRegion(this.state.demandRegion);
    }

    const isSingleMonth = monthIndex !== ALL_MONTH;
    const chartType: any = 'StackingColumn';
    const stackedMax = (seriesData.length && selChannels.length)
      ? Math.max(...seriesData.map(s => selChannels.reduce((acc, ch) => acc + (s as any)[ch], 0)))
      : 100;
    const yAxisMax = Math.max(10, Math.ceil(stackedMax * 1.1));
    let productStackRows: Array<{ m: string } & Record<string, number | string>> = [];
    let productKeys: string[] = [];
    if (drilledChannel && this.state.demandRegion && this.state.channelDrill) {
      productStackRows = this.productsByChannelForRegionYear(year, this.state.demandRegion, this.state.channelDrill);
      productKeys = Array.from(
        new Set(
          productStackRows.flatMap(r => Object.keys(r).filter(k => k !== 'm'))
        )
      );
    }

    const productColors = pickPalette(Palettes.salesMix, Math.max(3, productKeys.length));

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {drilledRegion && !drilledChannel && (
            <>
              <button className="e-btn e-outline" onClick={this.onDemandBack}>Back</button>
              <div style={{ fontWeight: 600 }}>Demand Origins • {this.displayRegion(this.state.demandRegion!)}</div>
            </>
          )}
          {drilledChannel && (
            <>
              <button className="e-btn e-outline" onClick={this.onChannelBack}>Back</button>
              <div style={{ fontWeight: 600 }}>
                Demand Products • {this.displayRegion(this.state.demandRegion!)} • {this.state.channelDrill}
              </div>
            </>
          )}
        </div>
        {!drilled && (
          <MapsComponent
            id="demandOriginsMap"
            ref={this.RegionMapRef}
            legendSettings={{ visible: true, mode: 'Interactive', position: 'Left', orientation: 'Vertical' }}
            shapeSelected={this.onMapShapeSelected}
            tooltipRender={this.tooltipRender}
            load={Mapload}
          >
            <Inject services={[MapsTooltip, MapsLegend]} />
            <LayersDirective>
              <LayerDirective
                shapeData={(this.state.worldShape ?? worldMap) as any}
                shapePropertyPath="continent"
                shapeDataPath="continent"
                dataSource={filteredDs}
                shapeSettings={{
                  colorValuePath: 'value',
                  fill: '#E5E7EB',
                  border: { color: '#9CA3AF', width: 0.6 },
                  colorMapping: [
                    { from: 0, to: 0, color: '#E5E7EB' },
                    ...colorStops
                  ]
                } as any}
                highlightSettings={{ enable: true }}
                selectionSettings={{ enable: true }}
                tooltipSettings={{ visible: true, valuePath: 'continent' }}
              />
            </LayersDirective>
          </MapsComponent>
        )}
        {drilledRegion && !drilledChannel && (
          <ChartComponent
            ref={this.RegionChartRef}
            id="demandOriginsDrillChart"
            primaryXAxis={{ valueType: 'Category', title: isSingleMonth ? '' : 'Month', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{ labelFormat: '{value}', lineStyle: { width: 0 }, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0, maximum: yAxisMax }}
            tooltip={{ enable: true, shared: true }}
            legendSettings={{ visible: true }}
            pointClick={this.onChannelPointClick}
            load={onChartLoad}
          >
            <Inject services={[StackingColumnSeries, Legend, ChartTooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              {(selChannels.includes('Paid') ? ['Paid'] : []).map((k) => (
                <SeriesDirective key={k} type={chartType} name="Paid" xName="m" yName="Paid" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Paid} marker={{ dataLabel: { visible: true } }} animation={{ enable: false }} />
              ))}
              {(selChannels.includes('Organic') ? ['Organic'] : []).map((k) => (
                <SeriesDirective key={k} type={chartType} name="Organic" xName="m" yName="Organic" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Organic} marker={{ dataLabel: { visible: true } }} animation={{ enable: false }} />
              ))}
              {(selChannels.includes('Email') ? ['Email'] : []).map((k) => (
                <SeriesDirective key={k} type={chartType} name="Email" xName="m" yName="Email" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Email} marker={{ dataLabel: { visible: true } }} animation={{ enable: false }} />
              ))}
              {(selChannels.includes('Social') ? ['Social'] : []).map((k) => (
                <SeriesDirective key={k} type={chartType} name="Social" xName="m" yName="Social" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Social} marker={{ dataLabel: { visible: true } }} animation={{ enable: false }} />
              ))}
              {this.props.channels.length === 0 && (
                <>
                  <SeriesDirective type={chartType} name="Paid" xName="m" yName="Paid" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Paid} animation={{ enable: false }} />
                  <SeriesDirective type={chartType} name="Organic" xName="m" yName="Organic" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Organic} animation={{ enable: false }} />
                  <SeriesDirective type={chartType} name="Email" xName="m" yName="Email" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Email} animation={{ enable: false }} />
                  <SeriesDirective type={chartType} name="Social" xName="m" yName="Social" dataSource={seriesData} columnWidth={0.5} fill={ChannelColors.Social} animation={{ enable: false }} />
                </>
              )}
            </SeriesCollectionDirective>
          </ChartComponent>
        )}
        {drilledChannel && (
          <ChartComponent
            id="demandProductsByChannel"
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{ labelFormat: '{value}', lineStyle: { width: 0 }, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0 }}
            tooltip={{ enable: true, shared: true }}
            legendSettings={{ visible: true, position: 'Bottom' }}
            load={onChartLoad}
          >
            <Inject services={[StackingColumnSeries, Legend, ChartTooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              {productKeys.map((pName, i) => (
                <SeriesDirective
                  key={pName}
                  type="StackingColumn"
                  name={pName}
                  xName="m"
                  yName={pName}
                  dataSource={productStackRows}
                  columnWidth={0.5}
                  fill={productColors[i % productColors.length]}
                  marker={{ dataLabel: { visible: true, font: { size: "9px", fontWeight: 'Bold' } } }}
                  animation={{ enable: false }}
                />
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>
        )}
      </div>
    );
  }
}

/* ===========================
   Class Component: Overview
   =========================== */
type OverviewState = {
  year: number;
  monthIndex: number;
  region: string;
  channels: string[];
  categories: string[];
};

type OverviewProps = {
  year: number;
  monthIndex: number;
  region: string;
  channels: string[];
  categories: string[];
};

type TrendDirection = 'up' | 'down' | 'flat';
type TrendTone = 'good' | 'bad' | 'neutral';
type SparkPoint = { x: string; y: number };
type KpiMicroViz =
  | { kind: 'sparkline'; data: { x: string; y: number }[]; color: string; tooltipFormat?: string }
  | { kind: 'progress'; valuePct: number; color: string; trackColor?: string; segmentCount?: number; label?: string }
  | null;

type BulletRow = {
  category: string;
  value: number;
  target: number;
  valueColor: string;
  targetColor: string;
  achievementPct: number;
  actualText: string;
  targetText: string;
};

type RegionShareParentRow = {
  regionKey: RegionKey;
  region: string;
  totalRevenue: number;
  growthPct: number | null;

  online: number; // Organic
  ads: number;    // Paid
  email: number;
  social: number;
};

type RegionShareChannelRow = {
  region: string;
  rcKey: string;
  channelKey: ChannelKey;
  channel: string;
  revenue: number;
  sharePct: number;
};

type RegionShareCategoryRow = {
  rcKey: string;
  category: string;
  revenue: number;
  sharePct: number;
};

const asChannelKeys = (arr: string[]): ChannelKey[] =>
  (arr ?? []).filter((x): x is ChannelKey =>
    x === 'Paid' || x === 'Organic' || x === 'Email' || x === 'Social'
  );

const arrayEqual = (a: any[] = [], b: any[] = []) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const safePct = (actual: number, target: number) => (target > 0 ? (actual / target) * 100 : 0);

const isRegionKey = (r: string): r is RegionKey =>
  r === 'AsiaPacific' || r === 'Europe' || r === 'NorthAmerica' || r === 'LatinAmerica' || r === 'MiddleEastAfrica';

const ALL_CHANNELS: ChannelKey[] = ['Paid', 'Organic', 'Email', 'Social'];
const PES_AD_CHANNELS: ChannelKey[] = ['Paid', 'Email', 'Social'];

const BulletColors = {
  actual: '#554994',
  target: '#850E35',
  poor: '#FE8F8F',
  ok: '#F5C6A5',
  good: '#90AACB',
  subtleText: '#64748B',
  grid: '#90AACB'
} as const;

function buildSparkSeries(
  year: number,
  getValueForMonth: (y: number, monthIdx: number) => number
): SparkPoint[] {
  return Array.from({ length: 12 }, (_, i) => ({
    x: months[i],
    y: getValueForMonth(year, i)
  }));
}

function getAdChannelsFromFilter(selected: string[] | undefined): ChannelKey[] {
  const sel = asChannelKeys(selected ?? []);
  const raw = selected ?? [];
  const hasAll = raw.includes('ALL');

  if (sel.length === 0 || hasAll) return PES_AD_CHANNELS;

  const inter = PES_AD_CHANNELS.filter(ch => sel.includes(ch));
  if (inter.length > 0) return inter;
  return PES_AD_CHANNELS;
}

function calcTrend(current: number | null, previous: number | null) {
  const c = typeof current === 'number' ? current : null;
  const p = typeof previous === 'number' ? previous : null;

  if (c === null || p === null || p === 0) {
    return { delta: null as number | null, deltaPct: null as number | null, dir: 'flat' as TrendDirection };
  }
  const delta = c - p;
  const deltaPct = (delta / Math.abs(p)) * 100;
  const dir: TrendDirection = Math.abs(deltaPct) < 0.05 ? 'flat' : (delta > 0 ? 'up' : 'down');
  return { delta, deltaPct, dir };
}

// For each KPI, define whether "higher is better"
const KPI_POLARITY = {
  revenue: 'higher',
  orders: 'higher',
  aov: 'higher',
  conversion: 'higher',
  roas: 'higher',
  cac: 'lower',
  customerGrowth: 'higher'
} as const;

function toneForTrend(metricKey: keyof typeof KPI_POLARITY, dir: TrendDirection) {
  const polarity = KPI_POLARITY[metricKey];
  if (dir === 'flat') return 'neutral' as TrendTone;

  // lower is better: CAC down is good, up is bad
  if (polarity === 'lower') return dir === 'down' ? 'good' : 'bad';

  // higher is better
  return dir === 'up' ? 'good' : 'bad';
}

function formatDeltaPct(deltaPct: number | null) {
  if (deltaPct === null || !isFinite(deltaPct)) return '—';
  const sign = deltaPct > 0 ? '+' : '';
  return `${sign}${deltaPct.toFixed(1)}%`;
}

const commonSparkRefs: Record<string, React.RefObject<SparklineComponent | null>> = {};
function getCommonSparkRef(id: string) {
  if (!commonSparkRefs[id]) commonSparkRefs[id] = React.createRef<SparklineComponent | null>();
  return commonSparkRefs[id];
}

export function refreshCommonSparks() {
  Object.values(commonSparkRefs).forEach(r => r.current?.refresh());
}

type KpiTone = 'good' | 'bad' | 'neutral';
type KpiSparkSeries = { x: string; y: number };

function renderCommonKpiTile(opts: {
  label: string;
  valueText: string | React.ReactNode;
  badge?: { text: string; tone: KpiTone; icon?: string | React.ReactNode };
  sparkData?: KpiSparkSeries[];
  sparkColor?: string;
  sparkId?: string;
  hideHeader?: boolean;
  isMonthSelected?: boolean;
}) {
  const {
    label,
    valueText,
    badge,
    sparkData,
    sparkColor = '#10B981',
    sparkId = `kpi-spark-${label.replace(/\s+/g, '-').toLowerCase()}`,
    hideHeader = false,
    isMonthSelected = false
  } = opts;

  // Badge styles (UI only; tone decided by caller)
  const badgeBase: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: "#6b7280",
    padding: '2px 8px',
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6
  };
  const badgeStyle: React.CSSProperties =
    badge?.tone === 'good'
      ? { ...badgeBase, background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }
      : badge?.tone === 'bad'
        ? { ...badgeBase, background: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' }
        : { ...badgeBase, background: '#F1F5F9', color: '#334155', borderColor: '#E2E8F0' };

  const showSpark = Array.isArray(sparkData) && sparkData.length > 0 && !isMonthSelected;

  return (
    <div className="e-card kpi-commerce-card">
      {hideHeader && (
        <div className="e-card-header">
          <div className="e-card-header-caption">
            <div className="e-card-header-title">{label}</div>
          </div>
        </div>
      )}

      <div className="e-card-content kpi-commerce-card-content">
        {showSpark ? (
          <div>
            <div className="kpi-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div className="kpi-commerce-value">{valueText}</div>
              {badge && (
                <span style={badgeStyle}>
                  {badge.icon ? <span style={{ marginRight: 4 }}>{badge.icon}</span> : null}
                  <span>{badge.text}</span>
                </span>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className='card-content-padding' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 8 }}>
              <div className="kpi-text">{label}</div>
              <div className="kpi-commerce-value">{valueText}</div>
              {badge && (
                <span style={badgeStyle}>
                  {badge.icon ? <span style={{ marginRight: 4 }}>{badge.icon}</span> : null}
                  <span>{badge.text}</span>
                </span>
              )}
            </div>
          </>
        )}
        {/* Optional sparkline */}
        {showSpark && (
          <div>
            <SparklineComponent
              id={sparkId}
              ref={getCommonSparkRef(sparkId)}
              height='40px'
              width="100%"
              type="Area"
              valueType="Category"
              dataSource={sparkData}
              xName="x"
              yName="y"
              lineWidth={2}
              fill={sparkColor}
              border={{ color: sparkColor, width: 2 }}
              markerSettings={{
                size: 5,
                fill: '#FFFFFF',
                border: { width: 2, color: sparkColor }
              }}
              tooltipSettings={{ visible: true, format: '${x}: ${y}' }}
            >
              <SparkInject services={[SparklineTooltip]} />
            </SparklineComponent>
          </div>
        )}
      </div>
    </div>
  );
}

class OverviewClass extends React.Component<OverviewProps, OverviewState> {
  // Refs
  OverviewRef = React.createRef<DashboardLayoutComponent>();
  roasSummaryChartRef = React.createRef<ChartComponent>();
  MarketShareChartRef = React.createRef<ChartComponent>();
  RegionShareGridRef = React.createRef<GridComponent>();
  MarketShareGaugeRef = React.createRef<CircularGaugeComponent>();

  private targetActualMixPanelApi?: { refreshTargetActualBulletPanelChart: () => void };
  private salesMixPanelApi?: { refreshSalesMixGrowthChart: () => void };
  private demandOriginsApi?: { refreshRegionChart: () => void };

  yearOptions = [2023, 2024, 2025];
  monthOptions = [{ text: 'All (Yearly)', value: ALL_MONTH }, ...months.map((m, idx) => ({ text: m, value: idx }))];

  state: OverviewState = {
    year: this.props.year ?? 2025,
    monthIndex: this.props.monthIndex ?? ALL_MONTH,
    region: this.props.region ?? 'ALL',
    channels: this.props.channels ?? [],
    categories: this.props.categories ?? []
  };

  OverviewDashboardCreated = () => {
    // Mimic created hook: refresh after mount
    setTimeout(() => {
      this.OverviewRef.current?.refresh();
      refreshCommonSparks();
      this.roasSummaryChartRef.current?.refresh();
      this.targetActualMixPanelApi?.refreshTargetActualBulletPanelChart();
      this.salesMixPanelApi?.refreshSalesMixGrowthChart();
      this.MarketShareChartRef.current?.refresh();
      this.MarketShareGaugeRef.current?.refresh();
      this.demandOriginsApi?.refreshRegionChart();
      this.RegionShareGridRef.current?.refresh();
    }, 500);
  }

  componentDidMount() {
    window.addEventListener('sidebar-toggled', this.OverviewDashboardCreated);
    window.addEventListener('resize', this.OverviewDashboardCreated);
  }

  componentWillUnmount() {
    window.removeEventListener('sidebar-toggled', this.OverviewDashboardCreated);
    window.removeEventListener('resize', this.OverviewDashboardCreated);
  }

  componentDidUpdate(prevProps: OverviewProps, prevState: OverviewState): void {
    const propsChanged =
      prevProps.year !== this.props.year ||
      prevProps.monthIndex !== this.props.monthIndex ||
      prevProps.region !== this.props.region ||
      !arrayEqual(prevProps.channels, this.props.channels) ||
      !arrayEqual(prevProps.categories, this.props.categories);

    const stateOutOfSync =
      this.state.year !== this.props.year ||
      this.state.monthIndex !== this.props.monthIndex ||
      this.state.region !== this.props.region ||
      !arrayEqual(this.state.channels, this.props.channels) ||
      !arrayEqual(this.state.categories, this.props.categories);

    if (propsChanged && stateOutOfSync) {
      this.setState({
        year: this.props.year,
        monthIndex: this.props.monthIndex,
        region: this.props.region,
        channels: this.props.channels ?? [],
        categories: this.props.categories ?? []
      });
      return;
    }
    const yearChanged = prevState.year !== this.state.year;
    const monthChanged = prevState.monthIndex !== this.state.monthIndex;
    const regionChanged = prevState.region !== this.state.region;
    const channelsChanged = !arrayEqual(prevState.channels, this.state.channels);
    const categoriesChanged = !arrayEqual(prevState.categories, this.state.categories);

    if (yearChanged || monthChanged) {
      this.MarketShareChartRef.current?.refresh();
      this.RegionShareGridRef.current?.refresh();
    }
    if (yearChanged || monthChanged || regionChanged || channelsChanged || categoriesChanged) {
      this.salesMixPanelApi?.refreshSalesMixGrowthChart();
      this.MarketShareChartRef.current?.refresh();
      this.MarketShareGaugeRef.current?.refresh();
      this.demandOriginsApi?.refreshRegionChart();
      this.RegionShareGridRef.current?.refresh();
    }
  }

  get isAllSelected() { return this.props.monthIndex === ALL_MONTH; }

  get bulletData() {
    const rows = monthlyRevenueByYear[this.props.year] ?? [];
    return rows.map(d => ({ category: d.m, value: d.actual, target: d.target }));
  }
  get bulletDataForView() {
    if (this.isAllSelected) return this.bulletData;
    const monthName = months[this.props.monthIndex];
    return this.bulletData.filter(d => d.category === monthName);
  }

  /* ===== KPI Calculations ===== */
  currency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  currency2 = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  integer = (v: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v);
  pct = (v: number) => `${v.toFixed(2)}%`;

  // Local header tooltip helper for Grid headers (tooltip = header text)
  private headerWithTooltip = (label: string, _tip?: string) => {
    return () => (
      <div title={label} style={{ display: 'inline-block', cursor: 'default' }}>{label}</div>
    );
  };

  private get selectedMonthIdxs(): number[] {
    if (this.props.monthIndex === ALL_MONTH) {
      return Array.from({ length: 12 }, (_, i) => i);
    }
    return [Math.max(0, Math.min(11, this.props.monthIndex))];
  }

  private onCurrencyTooltip = (args: any) => {
    const y = Number(args?.point?.y ?? 0);
    const x = String(args?.point?.x ?? '');
    const seriesName = String(args?.series?.name ?? '');

    if (seriesName === 'Market Share %') {
      const pct = isFinite(y) ? `${y.toFixed(1)}%` : '0%';
      args.text = `${x}: ${pct}`;
    } else {
      args.text = `${x}: ${formatCurrency(y)}`;
    }
  };

  private getIncludedRegions(): RegionKey[] {
    const r = this.props.region;
    if (r === 'ALL') return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    return isRegionKey(r) ? [r] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
  }

  private computeCategoryShareForMonth(year: number, monthIdx: number): number {
    const products = buildYearProductSales(year); // full year, scaled to totals already
    const totals: Record<string, number> = {};
    let totalUnits = 0;

    for (const p of products) {
      const units = p.monthly?.[monthIdx] ?? 0;
      totalUnits += units;
      totals[p.category] = (totals[p.category] ?? 0) + units;
    }

    const selectedCats = this.props.categories ?? [];
    if (!selectedCats.length) return 1;

    let shareSum = 0;
    for (const c of selectedCats) {
      shareSum += totalUnits > 0 ? (totals[c] ?? 0) / totalUnits : 0;
    }
    return shareSum;
  }

  private computeIncludedOrdersForMonth(year: number, monthIdx: number): number {
    const regions = this.getIncludedRegions();
    const selectedChannels = asChannelKeys(this.props.channels ?? []);
    const channels = selectedChannels.length ? selectedChannels : ALL_CHANNELS;

    let orders = 0;
    for (const region of regions) {
      const chRows = buildChannelsByRegionYear(year, region);
      const row = chRows[monthIdx];
      if (!row) continue;
      for (const ch of channels) orders += (row[ch] ?? 0);
    }
    const share = this.computeCategoryShareForMonth(year, monthIdx);
    return orders * share;
  }

  private computeRevenueSliceForMonth(year: number, monthIdx: number): number {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const masterActual = master?.actual ?? 0;
    const allRegions: RegionKey[] = ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    let denomOrders = 0;
    for (const region of allRegions) {
      const chRows = buildChannelsByRegionYear(year, region);
      const row = chRows[monthIdx];
      if (!row) continue;
      denomOrders += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
    }
    const regions = this.getIncludedRegions();
    const selectedChannels = asChannelKeys(this.props.channels ?? []);
    const channels = selectedChannels.length ? selectedChannels : ALL_CHANNELS;

    let includedOrdersNoCat = 0;
    for (const region of regions) {
      const chRows = buildChannelsByRegionYear(year, region);
      const row = chRows[monthIdx];
      if (!row) continue;
      for (const ch of channels) includedOrdersNoCat += (row[ch] ?? 0);
    }

    const regionChannelFactor = denomOrders > 0 ? includedOrdersNoCat / denomOrders : 0;
    const share = this.computeCategoryShareForMonth(year, monthIdx);
    const sliceFactor = regionChannelFactor * share;

    return masterActual * sliceFactor;
  }

  private totalRevenueFilteredForRange(y: number, monthIdxs: number[]) {
    return monthIdxs.reduce((s, idx) => s + this.computeRevenueSliceForMonth(y, idx), 0);
  }

  private totalOrdersFilteredForRange(y: number, monthIdxs: number[]) {
    return monthIdxs.reduce((s, idx) => s + this.computeIncludedOrdersForMonth(y, idx), 0);
  }

  private revenueFilteredForMonth(y: number, monthIdx: number) {
    return this.computeRevenueSliceForMonth(y, monthIdx);
  }

  private conversionRateForRange(y: number, monthIdxs: number[]) {
    const crRows = buildChannelCRByYear(y);
    const regions = this.getIncludedRegions();
    const selectedChannels = asChannelKeys(this.props.channels ?? []);
    const channels = selectedChannels.length ? selectedChannels : ALL_CHANNELS;

    let totalOrdersSel = 0;
    let totalVisitsSel = 0;

    for (const i of monthIdxs) {
      const catShare = this.computeCategoryShareForMonth(y, i);

      // accumulate orders and visits for selected slice
      for (const region of regions) {
        const row = buildChannelsByRegionYear(y, region)[i];
        if (!row) continue;

        for (const ch of channels) {
          const chOrders = (row as any)[ch] ?? 0;
          const ordersSlice = chOrders * catShare; // category slice
          totalOrdersSel += ordersSlice;

          const cr = (crRows[i] as any)?.[ch] ?? 0;
          if (cr > 0) {
            totalVisitsSel += ordersSlice / (cr / 100);
          }
        }
      }
    }

    return totalVisitsSel <= 0 ? 0 : (totalOrdersSel / totalVisitsSel) * 100;
  }

  /** Market revenue filtered by Region, Channel, and Category for a month. */
  private filteredMarketForMonth(year: number, monthIdx: number): number {
    const base = (buildMonthlyMarketByYear(year)[monthIdx]?.market ?? 0);
    const regions = this.getIncludedRegions();
    const selectedChannels = asChannelKeys(this.props.channels ?? []);
    const channelSelected = selectedChannels.length > 0;

    // Region+Channel allocation using published market splits
    const regionChannelFactor = regions.reduce((sum, r) => {
      const rSplit = (regionMarketSplit as any)[r] ?? 0;
      const chFactor = channelSelected
        ? selectedChannels.reduce((s, ch) => s + (marketChannelSplitByRegion[r][ch] ?? 0), 0)
        : 1;
      return sum + (rSplit * chFactor);
    }, 0);

    const catShare = this.computeCategoryShareForMonth(year, monthIdx);
    return base * regionChannelFactor * catShare;
  }

  /** Company revenue (already filter-aware) for a month. */
  private companyRevenueFilteredForMonth(year: number, monthIdx: number): number {
    return this.computeRevenueSliceForMonth(year, monthIdx);
  }

  /** Build monthly series for the selected year (All months). */
  private marketTrendSeriesForYear(year: number) {
    return months.map((m, i) => {
      const your = this.companyRevenueFilteredForMonth(year, i);
      const market = this.filteredMarketForMonth(year, i);
      const share = market > 0 ? (your / market) * 100 : 0;
      return { m, your, market, share };
    });
  }

  /** Single-month growth comparison vs previous year. */
  private singleMonthGrowthVsPrev(year: number, monthIdx: number) {
    const prevY = Math.max(2022, year - 1);

    const yourNow = this.companyRevenueFilteredForMonth(year, monthIdx);
    const yourPrev = this.companyRevenueFilteredForMonth(prevY, monthIdx);
    const mkNow = this.filteredMarketForMonth(year, monthIdx);
    const mkPrev = this.filteredMarketForMonth(prevY, monthIdx);

    const yourGrowth = (yourPrev > 0) ? ((yourNow - yourPrev) / yourPrev) * 100 : 0;
    const marketGrowth = (mkPrev > 0) ? ((mkNow - mkPrev) / mkPrev) * 100 : 0;

    const share = mkNow > 0 ? (yourNow / mkNow) * 100 : 0;
    return { share, yourGrowth, marketGrowth };
  }

  private getAdChannels(): ChannelKey[] {
    return getAdChannelsFromFilter(this.props.channels);
  }

  /** Spend for a month summed only for provided channels. */
  private spendForMonthByChannels(year: number, monthIdx: number, channels: ChannelKey[]): number {
    const rows = spendByYear[year] ?? [];
    const r = rows[monthIdx];
    if (!r) return 0;
    return channels.reduce((sum, ch) => sum + (r[ch] ?? 0), 0);
  }

  /** Denominator orders for provided channels across ALL regions. */
  private denomOrdersForChannels(year: number, monthIdx: number, channels: ChannelKey[]): number {
    const allRegions: RegionKey[] = ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    let denom = 0;
    for (const region of allRegions) {
      const chRows = buildChannelsByRegionYear(year, region);
      const row = chRows[monthIdx];
      if (!row) continue;
      for (const ch of channels) denom += (row[ch] ?? 0);
    }
    return denom;
  }

  private computeAdSpendSliceForMonth(year: number, monthIdx: number): number {
    const adCh = this.getAdChannels();
    const monthSpend = this.spendForMonthByChannels(year, monthIdx, adCh);

    // numerator: selected regions + ad channels (orders, no category)
    const regions = this.getIncludedRegions();
    let includedOrdersNoCat = 0;
    for (const region of regions) {
      const chRows = buildChannelsByRegionYear(year, region);
      const row = chRows[monthIdx];
      if (!row) continue;
      for (const ch of adCh) includedOrdersNoCat += (row[ch] ?? 0);
    }
    // denominator: all regions + ad channels
    const denomOrders = this.denomOrdersForChannels(year, monthIdx, adCh);
    const regionChannelFactor = denomOrders > 0 ? (includedOrdersNoCat / denomOrders) : 0;

    const categoryShare = this.computeCategoryShareForMonth(year, monthIdx);
    return monthSpend * regionChannelFactor * categoryShare;
  }

  /** Sum filtered Ad Spend across selected months. */
  private totalAdSpendFilteredForRange(year: number, monthIdxs: number[]): number {
    return monthIdxs.reduce((sum, idx) => sum + this.computeAdSpendSliceForMonth(year, idx), 0);
  }

  private computeAdAttributedRevenueSliceForMonth(year: number, monthIdx: number): number {
    const masterActual = (monthlyRevenueByYear[year] ?? [])[monthIdx]?.actual ?? 0;
    const adCh = this.getAdChannels();

    // Numerator: orders from selected Regions in ad channels (no category yet)
    const regions = this.getIncludedRegions();
    let adOrdersSelectedRegions = 0;
    for (const region of regions) {
      const chRows = buildChannelsByRegionYear(year, region);
      const row = chRows[monthIdx];
      if (!row) continue;
      for (const ch of adCh) adOrdersSelectedRegions += (row[ch] ?? 0);
    }
    // Denominator: all orders across ALL regions and ALL channels
    let denomAllOrders = 0;
    for (const region of ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'] as RegionKey[]) {
      const row = buildChannelsByRegionYear(year, region)[monthIdx];
      if (!row) continue;
      denomAllOrders += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
    }

    const rcShare = denomAllOrders > 0 ? (adOrdersSelectedRegions / denomAllOrders) : 0;
    const categoryShare = this.computeCategoryShareForMonth(year, monthIdx);
    return masterActual * rcShare * categoryShare;
  }

  /** Attributed revenue over selected month range. */
  private totalAdAttributedRevenueFilteredForRange(year: number, monthIdxs: number[]): number {
    return monthIdxs.reduce((s, idx) => s + this.computeAdAttributedRevenueSliceForMonth(year, idx), 0);
  }

  private get prevYear() {
    return Math.max(2022, this.props.year - 1);
  }

  private renderKpiTile(opts: {
    metricKey: keyof typeof KPI_POLARITY;
    label: string;
    valueText: string;
    current: number | null;
    previous: number | null;
    hero?: boolean;
    sparkData?: { x: string; y: number }[];
    sparkColor?: string;
    microViz?: KpiMicroViz;
    extraContent?: React.ReactNode;
    hideMainValue?: boolean;
    showTrendBadge?: boolean;
    hideHeader?: boolean;
    description?: string;
  }) {
    const { metricKey, label, valueText, current, previous, sparkData, sparkColor, hero, description } = opts;

    const t = calcTrend(current, previous);
    const defaultTone = toneForTrend(metricKey, t.dir);
    const arrowDefault = t.dir === 'up' ? '▲' : t.dir === 'down' ? '▼' : '•';
    const highlightIndex = this.props.monthIndex === ALL_MONTH ? -1 : this.props.monthIndex;

    // Default comparison label
    const compPeriodDefault = (previous === null)
      ? 'vs —'
      : (this.props.monthIndex === ALL_MONTH
        ? `vs ${this.prevYear}`
        : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${this.prevYear}`);

    // Show YoY growth itself in the badge (not “change of growth”).
    let badgeText = `${formatDeltaPct(t.deltaPct)}  ${compPeriodDefault}`;
    let badgeTone: TrendTone = defaultTone;
    let badgeArrow = arrowDefault;

    // Badge styling (reuse tones)
    const badgeStyleBase: React.CSSProperties = {
      fontSize: 12,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 999,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      border: '1px solid #E2E8F0'
    };
    const badgeStyle: React.CSSProperties =
      badgeTone === 'good'
        ? { ...badgeStyleBase, background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }
        : badgeTone === 'bad'
          ? { ...badgeStyleBase, background: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' }
          : { ...badgeStyleBase, background: '#F1F5F9', color: '#334155', borderColor: '#E2E8F0' };

    const cardClass = `e-card kpi-commerce-card ${metricKey}`;
    const showTrendBadge = opts.showTrendBadge !== false;
    const hideHeader = opts.hideHeader === true;

    return (
      <div className={cardClass}>
        {!hideHeader && (
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-header-title">{label}</div>
            </div>
          </div>
        )}
        <div className="e-card-content kpi-commerce-card-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div className="kpi-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label}</div>
              {description && (
                <TooltipComponent content={description} position="TopCenter">
                  <div className='ecommerce-exclamation-container'>
                    <span className='e-icons e-circle-info kpi-commerce-info-icon' aria-label='Info About Total ROAS in Overview' role='button'></span>
                  </div>
                </TooltipComponent>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', gap: 12, marginBottom: 8 }}>
              <div className={`kpi-commerce-value ${hero ? 'kpi-commerce-value--hero' : ''}`} style={{ margin: 0 }}>
                {!opts.hideMainValue ? valueText : null}
              </div>

              {showTrendBadge && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={badgeStyle}>
                    <span>{badgeArrow}</span>
                    <span>{badgeText}</span>
                  </span>
                </div>
              )}
            </div>

            {opts.extraContent && <div>{opts.extraContent}</div>}
          </div>
        </div>
      </div>
    );
  }

  renderBulletChart = () => {
    return (
      <TargetVsActualBulletPanel
        year={this.props.year}
        monthIdxs={this.selectedMonthIdxs}
        region={this.props.region}
        channels={this.props.channels}
        categories={this.props.categories}
        onReady={(api) => (this.targetActualMixPanelApi = api)}
      />
    );
  };


  renderSalesMixGrowth = () => {
    return (
      <SalesMixGrowthPanel
        year={this.props.year}
        monthIndex={this.props.monthIndex}
        region={this.props.region}
        channels={this.props.channels}
        categories={this.props.categories}
        onReady={(api) => (this.salesMixPanelApi = api)}
      />
    );
  };

  renderDemandOrigins = () => {
    return (
      <DemandOriginsPanel
        year={this.props.year}
        monthIndex={this.props.monthIndex}
        region={this.props.region}
        channels={this.props.channels}
        categories={this.props.categories}
        onReady={(api) => (this.demandOriginsApi = api)}
      />
    );
  };

  private onMarketTrendsAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  renderMarketTrends = () => {
    const isSingleMonth = this.props.monthIndex !== ALL_MONTH;
    const y = this.props.year;

    if (isSingleMonth) {
      const { share } = this.singleMonthGrowthVsPrev(y, this.props.monthIndex);

      return (
        <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
          <CircularGaugeComponent id='marketShareGauge' ref={this.MarketShareGaugeRef} tooltip={{ enable: true, type: ['Pointer'] }} load={onGaugeLoad}>
            <GaugeInject services={[GaugeTooltip, GaugeAnnotations]} />
            <GaugeAxesDirective>
              <GaugeAxisDirective
                minimum={0}
                maximum={100}
                majorTicks={{ interval: 20, height: 0 } as any}
                minorTicks={{ height: 0 } as any}
                labelStyle={{ font: { size: '12px' }, position: 'Outside', offset: 10 } as any}
              >
                <PointersDirective>
                  <PointerDirective
                    value={+share.toFixed(2)}
                    radius="75%"
                    color="#7107DC"
                    pointerWidth={10}
                    cap={{ radius: 7, color: '#111827' } as any}
                    needleEndWidth={4}
                  />
                </PointersDirective>

                <RangesDirective>
                  <RangeDirective start={0} end={40} color="#FECACA" startWidth={18} endWidth={18} position='Outside' />
                  <RangeDirective start={40} end={70} color="#FDE68A" startWidth={18} endWidth={18} position='Outside' />
                  <RangeDirective start={70} end={100} color="#A7F3D0" startWidth={18} endWidth={18} position='Outside' />
                </RangesDirective>

                <GaugeAnnotationsDirective>
                  <GaugeAnnotationDirective
                    content={`<div style="text-align:center;"><div style="font-weight:800;font-size:24px;">${share.toFixed(1)}%</div></div>`}
                    angle={0}
                    radius="-20%"
                    zIndex="1"
                  />
                </GaugeAnnotationsDirective>
              </GaugeAxisDirective>
            </GaugeAxesDirective>
          </CircularGaugeComponent>
        </div>
      );
    }

    // Yearly: Multi-series Line/Area
    const seriesData = this.marketTrendSeriesForYear(y);

    const percentAxis: any = {
      name: 'percentAxis',
      opposedPosition: true,
      minimum: 0,
      maximum: 100,
      interval: 20,
      majorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      labelFormat: '{value}%'
    };

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <div style={{ height: "calc(100% - 10px)", width: '100%' }}>
          <ChartComponent
            id="marketTrendsChart"
            ref={this.MarketShareChartRef}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{ labelFormat: 'c0', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }}
            axes={[percentAxis]}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
            axisLabelRender={this.onMarketTrendsAxisLabelRender}
            tooltipRender={this.onCurrencyTooltip}
            load={onChartLoad}
          >
            <Inject services={[SplineAreaSeries, SplineSeries, Legend, ChartTooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              {/* Market Sales (Area) */}
              <SeriesDirective
                type="SplineArea"
                name="Market Sales"
                xName="m"
                yName="market"
                dataSource={seriesData}
                opacity={0.6}
                fill="#F2B6D1"
                border={{ width: 2, color: '#B9005B' }}
                marker={{ visible: true, width: 6, height: 6 }}
                animation={{ enable: false }}
              />
              {/* Company Sales (Line) */}
              <SeriesDirective
                type="Spline"
                name="Company Sales"
                xName="m"
                yName="your"
                dataSource={seriesData}
                width={3}
                marker={{ visible: true, width: 7, height: 7 }}
                fill="#554994"
                animation={{ enable: false }}
              />
              {/* Market Share % (Line on percent axis) */}
              <SeriesDirective
                type="Spline"
                name="Market Share %"
                xName="m"
                yName="share"
                yAxisName="percentAxis"
                dataSource={seriesData}
                width={2}
                marker={{ visible: true, shape: 'Diamond', width: 8, height: 8, fill: '#38BE09' }}
                fill="#850E35"
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  };

  private getIncludedChannelsForRegionGrid(): ChannelKey[] {
    const sel = asChannelKeys(this.props.channels ?? []);
    return sel.length ? sel : ALL_CHANNELS;
  }

  private getSelectedMonthIdxsForGrid(): number[] {
    return this.props.monthIndex === ALL_MONTH
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, this.props.monthIndex))];
  }

  private categoryShareMapForMonth(year: number, monthIdx: number): Record<string, number> {
    const products = buildYearProductSales(year); // already scaled to match totals
    const totals: Record<string, number> = {};
    let totalUnits = 0;

    for (const p of products) {
      const units = p.monthly?.[monthIdx] ?? 0;
      totalUnits += units;
      totals[p.category] = (totals[p.category] ?? 0) + units;
    }

    const shareByCat: Record<string, number> = {};
    for (const cat of Object.keys(totals)) {
      shareByCat[cat] = totalUnits > 0 ? (totals[cat] ?? 0) / totalUnits : 0;
    }
    return shareByCat;
  }

  private revenueSliceForRegionChannelMonthNoCategory(
    year: number,
    monthIdx: number,
    region: RegionKey,
    channel: ChannelKey
  ): number {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const masterActual = master?.actual ?? 0;
    if (!masterActual) return 0;

    // Denominator: all orders across all regions & channels
    const allRegions: RegionKey[] = ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    let denomOrders = 0;

    for (const r of allRegions) {
      const row = buildChannelsByRegionYear(year, r)[monthIdx];
      if (!row) continue;
      denomOrders += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
    }
    if (denomOrders <= 0) return 0;

    // Numerator: orders for this region+channel
    const regRow = buildChannelsByRegionYear(year, region)[monthIdx];
    const chOrders = (regRow?.[channel] ?? 0);

    return masterActual * (chOrders / denomOrders);
  }


  private buildRegionShareGridData2Level(): {
    parentRows: RegionShareParentRow[];
    channelRows: RegionShareChannelRow[];
    categoryRows: RegionShareCategoryRow[];
  } {
    const year = this.props.year;
    const monthIdxs = this.getSelectedMonthIdxsForGrid();
    const includedRegions = this.getIncludedRegions();
    const includedChannels = this.getIncludedChannelsForRegionGrid();

    const selectedCats = this.props.categories ?? [];
    const allCats = CATEGORY_OPTIONS;
    const catsToShow = selectedCats.length ? selectedCats : allCats;

    const displayChannel = (ch: ChannelKey) => {
      return ch;
    };

    const parentRows: RegionShareParentRow[] = [];
    const channelRows: RegionShareChannelRow[] = [];
    const categoryRows: RegionShareCategoryRow[] = [];

    for (const rk of includedRegions) {
      const regionName = regionDisplay[rk];

      // -------- Channel totals per region (filtered by category factor) --------
      const chTotalsFiltered: Record<ChannelKey, number> = { Paid: 0, Organic: 0, Email: 0, Social: 0 };

      for (const m of monthIdxs) {
        const catFactor = this.computeCategoryShareForMonth(year, m);

        for (const ch of includedChannels) {
          const base = this.revenueSliceForRegionChannelMonthNoCategory(year, m, rk, ch);
          chTotalsFiltered[ch] += base * catFactor;
        }
      }

      const totalRevenue = (Object.keys(chTotalsFiltered) as ChannelKey[])
        .reduce((sum, k) => sum + (chTotalsFiltered[k] ?? 0), 0);

      // -------- Growth vs prev year (same slice) --------
      const prevYear = Math.max(2022, year - 1);
      let prevTotal = 0;

      if (prevYear !== year) {
        for (const m of monthIdxs) {
          const catFactorPrev = this.computeCategoryShareForMonth(prevYear, m);
          for (const ch of includedChannels) {
            const basePrev = this.revenueSliceForRegionChannelMonthNoCategory(prevYear, m, rk, ch);
            prevTotal += basePrev * catFactorPrev;
          }
        }
      }

      const growthPct = prevTotal > 0 ? ((totalRevenue - prevTotal) / prevTotal) * 100 : null;

      // -------- Parent Row (Region) --------
      parentRows.push({
        regionKey: rk,
        region: regionName,
        totalRevenue,
        growthPct,
        online: chTotalsFiltered.Organic ?? 0,
        ads: chTotalsFiltered.Paid ?? 0,
        email: chTotalsFiltered.Email ?? 0,
        social: chTotalsFiltered.Social ?? 0
      });

      // -------- Child Rows (Channel) + Grandchild Rows (Category) --------
      for (const ch of includedChannels) {
        const rcKey = `${regionName}|${ch}`; // stable join key

        const channelRevenue = chTotalsFiltered[ch] ?? 0;
        const sharePct = totalRevenue > 0 ? (channelRevenue / totalRevenue) * 100 : 0;

        channelRows.push({
          region: regionName,
          rcKey,
          channelKey: ch,
          channel: displayChannel(ch),
          revenue: channelRevenue,
          sharePct
        });

        // --- Category drilldown for this region+channel ---
        // Build base revenue per month (no category), then split by category shares
        const catAgg: Record<string, number> = Object.fromEntries(catsToShow.map(c => [c, 0]));

        for (const m of monthIdxs) {
          const baseNoCat = this.revenueSliceForRegionChannelMonthNoCategory(year, m, rk, ch);
          const shareByCat = this.categoryShareMapForMonth(year, m);

          for (const cat of catsToShow) {
            const s = shareByCat[cat] ?? 0;
            catAgg[cat] += baseNoCat * s;
          }
        }

        const catTotal = catsToShow.reduce((sum, c) => sum + (catAgg[c] ?? 0), 0) || 0;

        for (const cat of catsToShow) {
          const rev = catAgg[cat] ?? 0;
          const catSharePct = catTotal > 0 ? (rev / catTotal) * 100 : 0;

          categoryRows.push({
            rcKey,
            category: cat,
            revenue: rev,
            sharePct: catSharePct
          });
        }
      }
    }

    // Helpful ordering: top regions first
    parentRows.sort((a, b) => (b.totalRevenue ?? 0) - (a.totalRevenue ?? 0));

    return { parentRows, channelRows, categoryRows };
  }

  renderRegionShareGrid = () => {
    const toolbarOptions: any = ['ExcelExport', 'PdfExport'];

    const { parentRows, channelRows, categoryRows } = this.buildRegionShareGridData2Level();
    const includedChannels = this.getIncludedChannelsForRegionGrid();

    const growthTemplate = (props: any) => {
      const g = props.growthPct;
      if (g === null || !isFinite(g)) return <span>—</span>;
      const tone = g > 0 ? '#16A34A' : g < 0 ? '#DC2626' : '#64748B';
      const sign = g > 0 ? '+' : '';
      return <span style={{ color: tone, fontWeight: 700 }}>{sign}{g.toFixed(1)}%</span>;
    };

    const totalRevenueTemplate = (props: any) => {
      const v = props?.totalRevenue ?? 0;
      return <span style={{ fontWeight: 700 }}>{this.currency(Math.round(v))}</span>;
    };

    // Only show split columns for selected channels (or all if none selected)
    const channelSplitColumns = [
      includedChannels.includes('Organic') && (
        <ColumnDirective key="online" field="online" headerText="Paid" headerTemplate={this.headerWithTooltip('Paid', '')} width="110" textAlign="Right" format="C0" />
      ),
      includedChannels.includes('Paid') && (
        <ColumnDirective key="ads" field="ads" headerText="Organic" headerTemplate={this.headerWithTooltip('Organic', '')} width="110" textAlign="Right" format="C0" />
      ),
      includedChannels.includes('Email') && (
        <ColumnDirective key="email" field="email" headerText="Email" headerTemplate={this.headerWithTooltip('Email', '')} width="110" textAlign="Right" format="C0" />
      ),
      includedChannels.includes('Social') && (
        <ColumnDirective key="social" field="social" headerText="Social" headerTemplate={this.headerWithTooltip('Social', '')} width="110" textAlign="Right" format="C0" />
      ),
    ].filter(Boolean);

    const toolbarClick = (args: ClickEventArgs) => {
      switch (args.item.id) {
        case 'regionShareGrid_pdfexport':
          this.RegionShareGridRef.current?.pdfExport({ hierarchyExportMode: 'All' });
          break;
        case 'regionShareGrid_excelexport':
          this.RegionShareGridRef.current?.excelExport({ hierarchyExportMode: 'All' });
          break;
      }
    };

    // --- Grandchild grid: Category rows under a Channel row ---
    const categoryChildGridModel: any = {
      dataSource: categoryRows,
      queryString: 'rcKey',
      gridLines: 'Horizontal',
      columns: [
        { field: 'category', headerText: 'Product Category', headerTemplate: this.headerWithTooltip('Product Category', ''), textAlign: 'Left', width: 220 },
        { field: 'revenue', headerText: 'Revenue', headerTemplate: this.headerWithTooltip('Revenue', ''), textAlign: 'Right', width: 140, format: 'C0' },
        { field: 'sharePct', headerText: 'Share %', headerTemplate: this.headerWithTooltip('Share %', ''), textAlign: 'Right', width: 120, format: 'N1' },
      ]
    };

    // --- Child grid: Channel rows under a Region row ---
    const channelChildGridModel: any = {
      dataSource: channelRows,
      queryString: 'region',
      gridLines: 'Horizontal',
      childGrid: categoryChildGridModel, // ✅ nested childGrid
      columns: [
        { field: 'channel', headerText: 'Channel', headerTemplate: this.headerWithTooltip('Channel', ''), textAlign: 'Left', width: 160 },
        { field: 'revenue', headerText: 'Revenue', headerTemplate: this.headerWithTooltip('Revenue', ''), textAlign: 'Right', width: 140, format: 'C0' },
        { field: 'sharePct', headerText: 'Share %', headerTemplate: this.headerWithTooltip('Share %', ''), textAlign: 'Right', width: 120, format: 'N1' },
      ]
    };

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '100%', minHeight: 0 }}>
          <GridComponent
            id="regionShareGrid"
            ref={this.RegionShareGridRef}
            dataSource={parentRows}
            enableHover={true}
            allowPaging={false}
            allowSorting={true}
            allowResizing={true}
            allowExcelExport={true}
            allowPdfExport={true}
            toolbar={toolbarOptions}
            toolbarClick={toolbarClick}
            childGrid={channelChildGridModel}
            height="100%"
            width="100%"
          >
            <ColumnsDirective>
              <ColumnDirective field="region" headerText="Region" headerTemplate={this.headerWithTooltip('Region', '')} width="140" textAlign="Left" isPrimaryKey={true} />
              {channelSplitColumns}
              <ColumnDirective field="totalRevenue" headerText="Total Revenue" headerTemplate={this.headerWithTooltip('Total Revenue', '')} width="130" textAlign="Right" template={totalRevenueTemplate as any} />
              <ColumnDirective field="growthPct" headerText="Growth %" headerTemplate={this.headerWithTooltip('Growth %', '')} width="100" textAlign="Right" template={growthTemplate as any} />
            </ColumnsDirective>
            <GridInject services={[DetailRow, ExcelExport, PdfExport, Toolbar, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  };

  /* ===== KPI Tiles ===== */
  totalRevenueContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;

    const current = Math.round(this.totalRevenueFilteredForRange(y, idxs));
    const previous = (y > 2022) ? Math.round(this.totalRevenueFilteredForRange(this.prevYear, idxs)) : null;

    const deltaPct = (previous && previous > 0) ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${this.prevYear}`;

    const spark = buildSparkSeries(y, (yy, mm) => Math.round(this.revenueFilteredForMonth(yy, mm)));

    return renderCommonKpiTile({
      hideHeader: false,
      label: 'Total Revenue',
      valueText: cardformatCurrency(current),
      badge: { text: badgeText, tone },
      sparkData: spark,
      sparkColor: '#850E35',
      sparkId: `kpi-total-rev-${y}-${idxs.join('_')}`,
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  totalOrdersContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const current = this.totalOrdersFilteredForRange(y, idxs);
    const previous = (y > 2022) ? this.totalOrdersFilteredForRange(this.prevYear, idxs) : null;
    const deltaPct = (previous && previous > 0) ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${this.prevYear}`;
    return renderCommonKpiTile({
      hideHeader: false,
      label: 'Total Orders',
      valueText: this.integer(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };


  aovContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const rev = this.totalRevenueFilteredForRange(y, idxs);
    const ord = this.totalOrdersFilteredForRange(y, idxs);
    const current = ord > 0 ? (rev / ord) : 0;
    const py = y - 1;
    let previous: number | null = null;
    if (py >= 2022) {
      const revP = this.totalRevenueFilteredForRange(py, idxs);
      const ordP = this.totalOrdersFilteredForRange(py, idxs);
      previous = (ordP > 0) ? (revP / ordP) : null;
    }
    const deltaPct = (previous && previous > 0) ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${this.prevYear}`;
    return renderCommonKpiTile({
      hideHeader: false,
      label: 'Average Order Value',
      valueText: this.currency2(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  convRateContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const current = this.conversionRateForRange(y, idxs);
    const py = y - 1;
    const previous = (py >= 2022) ? this.conversionRateForRange(py, idxs) : null;
    const deltaPct = (previous && previous > 0) ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${this.prevYear}`;
    return renderCommonKpiTile({
      hideHeader: false,
      label: 'Conversion Rate',
      valueText: this.pct(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  roasContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;

    // Spend and revenue attributed to advertising (filtered, channels = selected or default to Paid)
    const spend = this.totalAdSpendFilteredForRange(y, idxs);
    const adRev = this.totalAdAttributedRevenueFilteredForRange(y, idxs);
    const current = spend > 0 ? (adRev / spend) : null;

    const spendP = this.totalAdSpendFilteredForRange(this.prevYear, idxs);
    const adRevP = this.totalAdAttributedRevenueFilteredForRange(this.prevYear, idxs);
    const previous = spendP > 0 ? (adRevP / spendP) : null;

    // Build delta badge content (vs previous year or vs previous year's same month)
    const t = calcTrend(current, previous);
    const tone = toneForTrend('roas', t.dir);
    const arrow = t.dir === 'up' ? '▲' : t.dir === 'down' ? '▼' : '•';
    const compPeriod = (this.props.monthIndex === ALL_MONTH)
      ? `${this.prevYear}`
      : `${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${this.prevYear}`;
    const badgeText = `${formatDeltaPct(t.deltaPct)}  vs ${compPeriod}`;

    const badgeStyleBase: React.CSSProperties = {
      fontSize: 11,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 999,
      background: '#F1F5F9',
      color: '#111827'
    };

    const badgeStyle: React.CSSProperties =
      tone === 'good'
        ? { ...badgeStyleBase, background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }
        : tone === 'bad'
          ? { ...badgeStyleBase, background: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' }
          : { ...badgeStyleBase, background: '#F1F5F9', color: '#334155', borderColor: '#E2E8F0' };

    // Two-section layout with vertical separator — improved vertical alignment
    return this.renderKpiTile({
      metricKey: 'roas',
      label: 'Total ROAS',
      description: "Total ROAS (Return on Ad Spend) shows how much revenue was generated for every currency unit spent on advertising. It is calculated using only Paid, Email, and Social channels, regardless of the selected Channel filter.",
      valueText: '',
      current,
      previous,
      hideMainValue: true,
      hideHeader: true,
      showTrendBadge: false,
      extraContent: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 0.9fr', gap: 12, alignItems: 'center' }}>
          {/* Left column (center vertically) */}
          <div style={{ paddingRight: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className='ecommerce-meta' style={{ fontSize: 12, fontWeight: 600 }}>Ad Spend</span>
                <span className='revenue-font' style={{ fontSize: 14, fontWeight: 600 }}>{cardformatCurrency(spend)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className='ecommerce-meta' style={{ fontSize: 12, fontWeight: 600 }}>Attributed Revenue</span>
                <span className='revenue-font' style={{ fontSize: 14, fontWeight: 600 }}>{cardformatCurrency(adRev)}</span>
              </div>
            </div>
          </div>

          {/* Vertical separator */}
          <div style={{ width: 1, background: '#E2E8F0', height: '100%', alignSelf: 'stretch' }} />

          {/* Right column (center vertically & horizontally) */}
          <div style={{ paddingLeft: 8, display: 'grid', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexDirection: "column" }}>
              <div className='kpi-commerce-value'>
                {current === null ? 'N/A' : `${current.toFixed(2)}x`}
              </div>
              <span style={badgeStyle}><span style={{ marginRight: 6 }}>{arrow}</span><span>{badgeText}</span></span>
            </div>
          </div>
        </div>
      )
    });
  };

  customerGrowthContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const py = y - 1;
    const currentOrders = this.totalOrdersFilteredForRange(y, idxs);
    const prevOrders = (py >= 2022) ? this.totalOrdersFilteredForRange(py, idxs) : 0;
    const currentGrowthPct = (py >= 2022 && prevOrders > 0) ? ((currentOrders - prevOrders) / prevOrders) * 100 : 0;
    const tone: KpiTone = currentGrowthPct == null ? 'neutral' : currentGrowthPct > 0 ? 'good' : currentGrowthPct < 0 ? 'bad' : 'neutral';
    const sign = currentGrowthPct >= 0 ? '+' : '';
    const badgeText = `${sign}${currentGrowthPct.toFixed(1)}% vs ${this.prevYear}`;
    return renderCommonKpiTile({
      hideHeader: false,
      label: 'Customer Growth %',
      valueText: `${sign}${currentGrowthPct.toFixed(1)}%`,
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  render() {
    return (
      <div className="Container">
        <div className="sidebar-content">
          <DashboardLayoutComponent
            ref={this.OverviewRef}
            id="ecommerce_marketing_overview_dashboard"
            columns={8}
            cellAspectRatio={1}
            cellSpacing={[12, 12]}
            allowResizing={false}
            allowDragging={false}
            created={this.OverviewDashboardCreated}
            mediaQuery="(max-width:950px)"
          >
            <PanelsDirective>
              <PanelDirective sizeX={4} sizeY={1} row={0} col={0} content={() => this.totalRevenueContent()} />
              <PanelDirective sizeX={4} sizeY={1} row={0} col={4} content={() => this.roasContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={2} col={0} content={() => this.totalOrdersContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={2} col={2} content={() => this.aovContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={2} col={4} content={() => this.convRateContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={2} col={6} content={() => this.customerGrowthContent()} />
              <PanelDirective sizeX={4} sizeY={3} row={3} col={0} header="<div>Target vs Achievement Analysis</div>" content={() => this.renderBulletChart()} />
              <PanelDirective sizeX={4} sizeY={3} row={3} col={4} header="<div>Market Trends</div>" content={() => this.renderMarketTrends()} />
              <PanelDirective sizeX={8} sizeY={4} row={7} col={0} header="<div>Revenue By Channel</div>" content={() => this.renderSalesMixGrowth()} />
              <PanelDirective sizeX={8} sizeY={4} row={11} col={0} header="<div>Demand Origins</div>" content={() => this.renderDemandOrigins()} />
              <PanelDirective sizeX={8} sizeY={3} row={15} col={0} header="<div>Region Share</div>" content={() => this.renderRegionShareGrid()} />
            </PanelsDirective>
          </DashboardLayoutComponent>
        </div>
      </div>
    );
  }
}

// Build unique category list from mixedProducts
const allCategories: string[] = Array.from(new Set(mixedProducts.map(p => p.category))).sort();
const CategoryColorByName: Record<string, string> = Object.fromEntries(
  allCategories.map((cat, i) => [cat, Palettes.categorySalesTrend[i % Palettes.categorySalesTrend.length]])
);
const getCategoryColor = (name: string) => CategoryColorByName[name] ?? Palettes.categorySalesTrend[0];
const MarkerShapes = ['Circle', 'Diamond', 'Triangle', 'InvertedTriangle', 'Rectangle', 'Pentagon'] as const;
type MarkerShape = typeof MarkerShapes[number];
const CategoryMarkerByName: Record<string, MarkerShape> = Object.fromEntries(
  allCategories.map((cat, i) => [cat, MarkerShapes[i % MarkerShapes.length]])
);
type CatMonthPoint = { m: string; value: number };
function buildCategoryMonthlyTotalsByYear(
  year: number,
  endMonthIndex?: number
): Record<string, CatMonthPoint[]> {
  const products = buildYearProductSales(year);
  const endIdx = typeof endMonthIndex === 'number' ? endMonthIndex : months.length - 1;
  const byCat: Record<string, CatMonthPoint[]> = {};
  for (const cat of allCategories) {
    const series: CatMonthPoint[] = [];
    for (let i = 0; i <= endIdx; i++) {
      const total = products
        .filter(p => p.category === cat)
        .reduce((sum, p) => sum + (p.monthly[i] ?? 0), 0);
      series.push({ m: months[i], value: total });
    }
    byCat[cat] = series;
  }
  return byCat;
}
// build only the selected month (not YTD)
function buildCategoryTotalsForSingleMonth(
  year: number,
  monthIndex: number
): Record<string, CatMonthPoint[]> {
  const products = buildYearProductSales(year);
  const byCat: Record<string, CatMonthPoint[]> = {};
  for (const cat of allCategories) {
    const total = products
      .filter(p => p.category === cat)
      .reduce((sum, p) => sum + (p.monthly[monthIndex] ?? 0), 0);
    byCat[cat] = [{ m: months[monthIndex], value: total }];
  }
  return byCat;
}

const formatCurrencyAxis = {
  labelFormat: 'c0',
  majorGridLines: { width: 1, color: '#e5e7eb' },
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 }
} as const;

type MarketingState = {
  year: number;
  monthIndex: number;
  campaign: string;
  region: string;
  channels: string[];
  categories: string[];
  selectedCategory: string;
  productMixDrillCategory: string | null;
  topItemsCategory: string;
};

type MarketingProps = {
  year: number;
  monthIndex: number;
  region: string;
  channels: string[];
  categories: string[];
  campaign: string;
};

class MarketingClass extends React.Component<MarketingProps, MarketingState> {
  MarketingRef = React.createRef<DashboardLayoutComponent>();
  promoVsNonPromoChartRef = React.createRef<ChartComponent>();
  discountWaterfallChartRef = React.createRef<ChartComponent>();
  promoEfficiencyBarRef = React.createRef<ChartComponent>();
  campaignPerfGridRef = React.createRef<GridComponent>();
  campaignRevenueChartRef = React.createRef<ChartComponent>();
  funnelChartRef = React.createRef<AccumulationChartComponent>();

  state: MarketingState = {
    year: this.props.year ?? 2025,
    monthIndex: this.props.monthIndex ?? ALL_MONTH,
    campaign: this.props.campaign ?? 'ALL',
    region: this.props.region ?? 'ALL',
    channels: Array.isArray(this.props.channels) ? this.props.channels : [],
    categories: Array.isArray(this.props.categories) ? this.props.categories : [],
    selectedCategory: 'All Categories',
    productMixDrillCategory: null,
    topItemsCategory: 'All Categories',
  };

  yearOptions = [2023, 2024, 2025];
  monthOptions = [{ text: 'All (Yearly)', value: ALL_MONTH }, ...months.map((m, idx) => ({ text: m, value: idx }))];
  categoryOptions = ['All Categories', ...allCategories];

  MarketingDashboardCreated = () => {
    setTimeout(() => {
      this.MarketingRef.current?.refresh();
      refreshCommonSparks();
      this.promoVsNonPromoChartRef.current?.refresh();
      this.discountWaterfallChartRef.current?.refresh();
      this.promoEfficiencyBarRef.current?.refresh();
      this.campaignPerfGridRef.current?.refresh();
      this.campaignRevenueChartRef.current?.refresh();
      this.funnelChartRef.current?.refresh();
    }, 500);
  }

  componentDidMount() {
    window.addEventListener('sidebar-toggled', this.MarketingDashboardCreated);
    window.addEventListener('resize', this.MarketingDashboardCreated);
  }

  componentWillUnmount() {
    window.removeEventListener('sidebar-toggled', this.MarketingDashboardCreated);
    window.removeEventListener('resize', this.MarketingDashboardCreated);
  }

  componentDidUpdate(prevProps: MarketingProps, prevState: MarketingState): void {
    const propsChanged =
      prevProps.year !== this.props.year ||
      prevProps.monthIndex !== this.props.monthIndex ||
      prevProps.region !== this.props.region ||
      prevProps.campaign !== this.props.campaign ||
      !arrayEqual(prevProps.channels ?? [], this.props.channels ?? []) ||
      !arrayEqual(prevProps.categories ?? [], this.props.categories ?? []);

    const stateOutOfSync =
      this.state.year !== this.props.year ||
      this.state.monthIndex !== this.props.monthIndex ||
      this.state.region !== this.props.region ||
      this.state.campaign !== this.props.campaign ||
      !arrayEqual(this.state.channels ?? [], this.props.channels ?? []) ||
      !arrayEqual(this.state.categories ?? [], this.props.categories ?? []);

    if (propsChanged && stateOutOfSync) {
      this.setState({
        year: this.props.year,
        monthIndex: this.props.monthIndex,
        region: this.props.region,
        campaign: this.props.campaign ?? 'ALL',
        channels: this.props.channels ?? [],
        categories: this.props.categories ?? []
      });
      return;
    }
    const anyStateChanged =
      prevState.year !== this.state.year ||
      prevState.monthIndex !== this.state.monthIndex ||
      prevState.campaign !== this.state.campaign ||
      prevState.region !== this.state.region ||
      !arrayEqual(prevState.channels, this.state.channels) ||
      !arrayEqual(prevState.categories, this.state.categories);

    if (anyStateChanged) {
      this.promoVsNonPromoChartRef.current?.refresh();
      this.discountWaterfallChartRef.current?.refresh();
      this.promoEfficiencyBarRef.current?.refresh();
      this.campaignPerfGridRef.current?.refresh();
      this.campaignRevenueChartRef.current?.refresh();
      this.funnelChartRef.current?.refresh();
    }
  }

  // ===== Formatting helpers =====
  private currency(v: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  }
  private integer(v: number) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v);
  }

  // Local header tooltip helper for Grid headers (tooltip = header text)
  private headerWithTooltip = (label: string, _tip?: string) => {
    return () => (
      <div title={label} style={{ display: 'inline-block', cursor: 'default' }}>{label}</div>
    );
  };

  // Map campaigns to active channels, then intersect with Promo channels (Paid + Email)
  private readonly CAMPAIGN_PROMO_CHANNELS: Record<string, ChannelKey[]> = {
    ALL: ['Paid', 'Email', 'Organic', 'Social'],
    BrandAwareness: ['Paid', 'Social'],
    Performance: ['Paid', 'Organic'],
    Retargeting: ['Paid', 'Email'],
    Acquisition: ['Paid', 'Organic'],
    Loyalty: ['Email']
  };

  // Helper: selected months
  private get selectedMonthIdxs(): number[] {
    return this.props.monthIndex === ALL_MONTH
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, this.props.monthIndex))];
  }

  // Helpers: regions/channels from filters
  private getIncludedRegions(): RegionKey[] {
    const r = this.props.region;
    if (r === 'ALL') return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    return isRegionKey(r) ? [r] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
  }
  private getSelectedChannels(): ChannelKey[] {
    const sel = asChannelKeys(this.props.channels ?? []);
    return sel.length ? sel : ALL_CHANNELS;
  }

  private getFinalPromoChannels(): ChannelKey[] {
    const PROMO: ChannelKey[] = ['Paid', 'Email'];
    const campaign = String(this.props.campaign || 'ALL');
    const campaignChs = (this.CAMPAIGN_PROMO_CHANNELS[campaign] ?? PROMO) as ChannelKey[];

    const selected = asChannelKeys(this.props.channels ?? []);
    const inter = campaignChs.filter(ch => PROMO.includes(ch) && (selected.length ? selected.includes(ch) : true));

    if (inter.length > 0) return inter;                      // valid user selection
    const allowedPromo = campaignChs.filter(ch => PROMO.includes(ch));
    return allowedPromo.length ? allowedPromo : PROMO;        // fallback to promo set
  }

  private getFinalNonPromoChannels(): ChannelKey[] {
    const NONPROMO: ChannelKey[] = ['Organic', 'Social'];
    const campaign = String(this.props.campaign || 'ALL');
    const campaignChs = (this.CAMPAIGN_PROMO_CHANNELS[campaign] ?? NONPROMO) as ChannelKey[];

    const selected = asChannelKeys(this.props.channels ?? []);
    const inter = campaignChs.filter(ch => NONPROMO.includes(ch) && (selected.length ? selected.includes(ch) : true));

    if (inter.length > 0) return inter;                      // valid user selection
    const allowedNonPromo = campaignChs.filter(ch => NONPROMO.includes(ch));
    return allowedNonPromo.length ? allowedNonPromo : NONPROMO; // fallback to non‑promo set
  }

  // Helpers to get revenue for given channels (filters: region + categories applied inside)
  private revenueForMonthByChannels(year: number, monthIdx: number, channels: ChannelKey[]) {
    return this.computeRevenueSliceForMonthByChannels(year, monthIdx, channels);
  }

  // Category share for a month (sum of selected categories proportion of units)
  private computeCategoryShareForMonth(year: number, monthIdx: number): number {
    const products = buildYearProductSales(year);
    let totalUnits = 0;
    const byCat: Record<string, number> = {};
    for (const p of products) {
      const u = p.monthly?.[monthIdx] ?? 0;
      totalUnits += u;
      byCat[p.category] = (byCat[p.category] ?? 0) + u;
    }
    const selectedCats = this.props.categories ?? [];
    if (!selectedCats.length) return 1;
    let sum = 0;
    for (const c of selectedCats) sum += totalUnits > 0 ? (byCat[c] ?? 0) / totalUnits : 0;
    return sum || 0;
  }

  // Denominator orders: all regions, all channels
  private denomOrdersAllRegionsAllChannels(year: number, monthIdx: number): number {
    let sum = 0;
    for (const r of ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'] as RegionKey[]) {
      const row = buildChannelsByRegionYear(year, r)[monthIdx];
      if (!row) continue;
      sum += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
    }
    return sum;
  }

  // Included orders (regions + final promo channels), before category share
  private includedPromoOrdersForMonth(year: number, monthIdx: number): number {
    const regions = this.getIncludedRegions();
    const promoChs = this.getFinalPromoChannels();
    let sum = 0;
    for (const r of regions) {
      const row = buildChannelsByRegionYear(year, r)[monthIdx];
      if (!row) continue;
      for (const ch of promoChs) sum += (row as any)[ch] ?? 0;
    }
    return sum;
  }

  // Promo revenue for a month = master revenue * (included orders / denom orders) * category share
  private promoRevenueForMonth(year: number, monthIdx: number): number {
    const master = (monthlyRevenueByYear[year] ?? [])[monthIdx];
    const actual = master?.actual ?? 0;
    if (actual <= 0) return 0;

    const denom = this.denomOrdersAllRegionsAllChannels(year, monthIdx) || 1;
    const includedNoCat = this.includedPromoOrdersForMonth(year, monthIdx);
    const rcFactor = includedNoCat / denom;
    const catFactor = this.computeCategoryShareForMonth(year, monthIdx);

    return actual * rcFactor * catFactor;
  }

  private totalPromoRevenueForRange(year: number, idxs: number[]): number {
    return idxs.reduce((s, i) => s + this.promoRevenueForMonth(year, i), 0);
  }

  private buildPromoSparkSeries(year: number) {
    return months.map((m, i) => ({ x: m, y: Math.round(this.promoRevenueForMonth(year, i)) }));
  }

  // Badge tone helper
  private trendTone(dir: 'up' | 'down' | 'flat') {
    return dir === 'up' ? 'good' : dir === 'down' ? 'bad' : 'neutral';
  }

  // CTR assumptions by channel to derive Impressions from Clicks (Clicks = Visits by assumption)
  private readonly CTR_ASSUMPTION: Record<ChannelKey, number> = {
    Paid: 0.020,   // 2.0%
    Organic: 0.030, // 3.0%
    Email: 0.060,   // 6.0%
    Social: 0.015   // 1.5%
  };

  // Channels for metrics: campaign channels ∩ user-selected channels (or sensible defaults)
  private getFinalCampaignChannels(): ChannelKey[] {
    const campaign = String(this.props.campaign || 'ALL');
    const campaignChs = (this.CAMPAIGN_PROMO_CHANNELS[campaign] ?? ALL_CHANNELS) as ChannelKey[];
    const selected = asChannelKeys(this.props.channels ?? []);
    if (selected.length === 0) {
      return campaign === 'ALL' ? ALL_CHANNELS : campaignChs;
    }
    return campaignChs.filter(ch => selected.includes(ch));
  }

  // Orders across ALL regions but only for given channels (denominator helper)
  private denomOrdersForChannels(year: number, monthIdx: number, channels: ChannelKey[]): number {
    let denom = 0;
    for (const region of ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'] as RegionKey[]) {
      const row = buildChannelsByRegionYear(year, region)[monthIdx];
      if (!row) continue;
      for (const ch of channels) denom += (row as any)[ch] ?? 0;
    }
    return denom;
  }

  // Included orders for selected Regions and Channels (optionally apply Category share)
  private includedOrdersForMonthByChannels(year: number, monthIdx: number, channels: ChannelKey[], withCategory: boolean): number {
    let sum = 0;
    for (const region of this.getIncludedRegions()) {
      const row = buildChannelsByRegionYear(year, region)[monthIdx];
      if (!row) continue;
      for (const ch of channels) sum += (row as any)[ch] ?? 0;
    }
    if (!withCategory) return sum;
    const catShare = this.computeCategoryShareForMonth(year, monthIdx);
    return sum * catShare;
  }

  // Revenue slice for selected channels (region+channels factor vs ALL orders) * category share
  private computeRevenueSliceForMonthByChannels(year: number, monthIdx: number, channels: ChannelKey[]): number {
    const masterActual = (monthlyRevenueByYear[year] ?? [])[monthIdx]?.actual ?? 0;
    if (masterActual <= 0) return 0;
    const denomAll = this.denomOrdersAllRegionsAllChannels(year, monthIdx) || 1;

    const includedNoCat = this.includedOrdersForMonthByChannels(year, monthIdx, channels, false);
    const rcFactor = includedNoCat / denomAll;

    const catFactor = this.computeCategoryShareForMonth(year, monthIdx);
    return masterActual * rcFactor * catFactor;
  }

  // Spend slice for selected channels (use region allocation via orders share within those channels) * category share
  private computeSpendSliceForMonthByChannels(year: number, monthIdx: number, channels: ChannelKey[]): number {
    const rows = spendByYear[year] ?? [];
    const r = rows[monthIdx];
    if (!r) return 0;

    const monthSpend = channels.reduce((s, ch) => s + ((r as any)[ch] ?? 0), 0);

    // Allocation by region share of orders within provided channels
    const includedNoCat = this.includedOrdersForMonthByChannels(year, monthIdx, channels, false);
    const denomCh = this.denomOrdersForChannels(year, monthIdx, channels) || 1;
    const rcFactor = includedNoCat / denomCh;

    const catFactor = this.computeCategoryShareForMonth(year, monthIdx);
    return monthSpend * rcFactor * catFactor;
  }

  // Per-month metrics for current filters
  private metricsForMonth(year: number, monthIdx: number) {
    const channels = this.getFinalCampaignChannels();

    // Orders (with category)
    const orders = this.includedOrdersForMonthByChannels(year, monthIdx, channels, true);

    // Spend and revenue slices (filtered)
    const spend = this.computeSpendSliceForMonthByChannels(year, monthIdx, channels);
    const revenue = this.computeRevenueSliceForMonthByChannels(year, monthIdx, channels);

    // Visits/Clicks (derive from orders and channel CR) and Impressions (via CTR assumptions)
    const crRow = (channelCRByYear[year] ?? [])[monthIdx];
    let visits = 0;
    let clicks = 0;
    let impressions = 0;

    if (crRow) {
      // Distribute orders by channel (with category) to back out visits
      for (const ch of channels) {
        // Orders for this channel (with category)
        let chOrders = 0;
        for (const region of this.getIncludedRegions()) {
          const row = buildChannelsByRegionYear(year, region)[monthIdx];
          if (!row) continue;
          chOrders += ((row as any)[ch] ?? 0);
        }
        // Apply category filter
        chOrders *= this.computeCategoryShareForMonth(year, monthIdx);

        const crPct = (crRow as any)[ch] ?? 0; // conversion rate %
        const chVisits = crPct > 0 ? (chOrders / (crPct / 100)) : 0;
        const chClicks = chVisits; // assume 1:1 click→visit
        const ctr = this.CTR_ASSUMPTION[ch] ?? 0.02;
        const chImpr = ctr > 0 ? (chClicks / ctr) : 0;

        visits += chVisits;
        clicks += chClicks;
        impressions += chImpr;
      }
    }

    const roas = spend > 0 ? (revenue / spend) : null;
    const ctrPct = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? (spend / clicks) : null;
    const cpa = orders > 0 ? (spend / orders) : null;

    return { spend, revenue, orders, visits, clicks, impressions, roas, ctrPct, cpc, cpa };
  }

  // Aggregate metrics across a range of months (yearly or single month)
  private metricsForRange(year: number, idxs: number[]) {
    let spend = 0, revenue = 0, orders = 0, visits = 0, clicks = 0, impressions = 0;
    for (const i of idxs) {
      const m = this.metricsForMonth(year, i);
      spend += m.spend;
      revenue += m.revenue;
      orders += m.orders;
      visits += m.visits;
      clicks += m.clicks;
      impressions += m.impressions;
    }
    const roas = spend > 0 ? (revenue / spend) : null;
    const ctrPct = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? (spend / clicks) : null;
    const cpa = orders > 0 ? (spend / orders) : null;
    return { spend, revenue, orders, visits, clicks, impressions, roas, ctrPct, cpc, cpa };
  }

  // ===== Discount Waterfall helpers (filter-aware) =====

  // Attractive, consistent colors (positive, negative, summary)
  private readonly wfPositive = '#90AACB';
  private readonly wfNegative = '#FF5858';
  private readonly wfSummary = '#554994';

  // Discount assumptions (Promo vs Non‑Promo)
  private readonly promoDiscountPct = 0.18;     // 18% avg promo discount
  private readonly nonPromoDiscountPct = 0.04;  // 4% base/returns

  // Blended COGS rate based on selected product categories for a month
  private blendedCogsRateForSelectionMonth(year: number, monthIdx: number): number {
    const products = buildYearProductSales(year);
    const selCats = this.props.categories ?? [];
    const filtered = selCats.length ? products.filter(p => selCats.includes(p.category)) : products;

    let rev = 0;
    let cogs = 0;
    for (const p of filtered) {
      const units = Math.max(0, p.monthly[monthIdx] ?? 0);
      const { price, marginPct } = ProductPricing[p.name] ?? { price: 50, marginPct: 0.30 };
      const sales = units * price;
      const cost = sales * (1 - marginPct);
      rev += sales;
      cogs += cost;
    }
    if (rev <= 0) return 0.65; // fallback
    return Math.min(0.95, Math.max(0.10, cogs / rev));
  }

  // Month-level waterfall components under filters
  private discountWaterfallForMonth(year: number, monthIdx: number) {
    const includedChs = this.getFinalCampaignChannels();

    // Gross = revenue slice (region + channels + category)
    const gross = Math.max(0, this.computeRevenueSliceForMonthByChannels(year, monthIdx, includedChs));

    // Discounts split by Promo vs Non‑Promo (using campaign-aware intersections)
    const promoChsAll = this.getFinalPromoChannels();
    const nonPromoChsAll = this.getFinalNonPromoChannels();

    const promoChs = includedChs.filter(c => promoChsAll.includes(c));
    const nonPromoChs = includedChs.filter(c => nonPromoChsAll.includes(c));

    const promoRev = promoChs.length ? this.computeRevenueSliceForMonthByChannels(year, monthIdx, promoChs) : 0;
    const nonPromoRev = nonPromoChs.length ? this.computeRevenueSliceForMonthByChannels(year, monthIdx, nonPromoChs) : 0;

    const discounts = Math.max(0, (promoRev * this.promoDiscountPct) + (nonPromoRev * this.nonPromoDiscountPct));
    const netSales = Math.max(0, gross - discounts);

    // COGS from blended rate (selected categories)
    const cogsRate = this.blendedCogsRateForSelectionMonth(year, monthIdx);
    const cogs = Math.max(0, netSales * cogsRate);
    const grossMargin = Math.max(0, netSales - cogs);

    return { gross, discounts, netSales, cogs, grossMargin };
  }

  // Range (year or single month) aggregation
  private discountWaterfallForRange(year: number, idxs: number[]) {
    let gross = 0, discounts = 0, netSales = 0, cogs = 0, grossMargin = 0;
    for (const i of idxs) {
      const r = this.discountWaterfallForMonth(year, i);
      gross += r.gross;
      discounts += r.discounts;
      netSales += r.netSales;
      cogs += r.cogs;
      grossMargin += r.grossMargin;
    }
    return { gross, discounts, netSales, cogs, grossMargin };
  }

  // Add helper to build campaign performance rows (filter-aware)
  private buildCampaignPerformanceRows(): {
    campaignKey: string;
    campaign: string;
    cost: number;
    revenue: number;
    profit: number;
    roas: number | null;
    conversions: number;
  }[] {
    const year = this.props.year;
    const idxs = this.selectedMonthIdxs;
    // Selected channels filter (if user selected)
    const selectedChannels = asChannelKeys(this.props.channels ?? []);
    const hasChannelSelection = selectedChannels.length > 0;

    const rows: any[] = [];

    // iterate campaigns from CAMPAIGN_OPTIONS (value keys match CAMPAIGN_PROMO_CHANNELS)
    const campaigns = CAMPAIGN_OPTIONS.map(c => ({ key: c.value, text: c.text }));
    const pickCampaigns = this.props.campaign && this.props.campaign !== 'ALL'
      ? campaigns.filter(c => c.key === this.props.campaign)
      : campaigns;

    for (const c of pickCampaigns) {
      let spendSum = 0;
      let revSum = 0;
      let convSum = 0;

      // campaign allowed channels (campaign mapping)
      const campaignAllowed = (this.CAMPAIGN_PROMO_CHANNELS[c.key] ?? ALL_CHANNELS) as ChannelKey[];

      for (const mi of idxs) {
        // channels to use = campaignAllowed ∩ (selectedChannels || campaignAllowed)
        const channelsUsed = hasChannelSelection ? campaignAllowed.filter(ch => selectedChannels.includes(ch)) : campaignAllowed;

        if (channelsUsed.length === 0) continue;

        // spend / revenue / conversions for month for those channels (filter-aware: region + category applied inside)
        const monthSpend = this.computeSpendSliceForMonthByChannels(year, mi, channelsUsed);
        const monthRevenue = this.computeRevenueSliceForMonthByChannels(year, mi, channelsUsed);
        const monthConversions = this.includedOrdersForMonthByChannels(year, mi, channelsUsed, true);

        spendSum += monthSpend;
        revSum += monthRevenue;
        convSum += monthConversions;
      }

      const profit = revSum - spendSum;
      const roas = spendSum > 0 ? (revSum / spendSum) : null;

      rows.push({
        campaignKey: c.key,
        campaign: c.text,
        cost: Math.round(spendSum),
        revenue: Math.round(revSum),
        profit: Math.round(profit),
        roas: roas === null ? null : +(roas),
        conversions: Math.round(convSum)
      });
    }

    // sort by revenue desc by default
    rows.sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0));
    return rows;
  }

  private promoRevenueContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const current = this.totalPromoRevenueForRange(y, idxs);

    const py = y - 1;
    const hasPY = py >= 2022;
    const prev = hasPY ? this.totalPromoRevenueForRange(py, idxs) : null;
    const deltaPct = (prev && prev > 0) ? ((current - prev) / prev) * 100 : null;
    const compareLabel = this.props.monthIndex === ALL_MONTH
      ? `vs ${hasPY ? py : '—'}`
      : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${hasPY ? py : '—'}`;

    const spark = this.buildPromoSparkSeries(y);
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${compareLabel}`;

    return renderCommonKpiTile({
      label: 'Promotion Revenue',
      valueText: cardformatCurrency(current),
      badge: { text: badgeText, tone },
      sparkData: spark,
      sparkColor: '#850E35',
      sparkId: `kpi-spark-promoRevenue-${y}-${idxs.join('_')}`,
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private roasContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;

    const cur = this.metricsForRange(y, idxs);
    const py = y - 1;
    const hasPY = py >= 2022;
    const prev = hasPY ? this.metricsForRange(py, idxs) : null;

    const currentRoas = cur.roas;
    const prevRoas = prev?.roas ?? null;

    // Trend badge content
    const deltaPct = (prevRoas != null && isFinite(prevRoas) && prevRoas > 0 && currentRoas != null && isFinite(currentRoas))
      ? ((currentRoas - prevRoas) / prevRoas) * 100
      : null;

    const compareLabel = this.props.monthIndex === ALL_MONTH
      ? `vs ${hasPY ? py : '—'}`
      : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${hasPY ? py : '—'}`;

    // Badge tone and label
    const dir = (deltaPct == null || !isFinite(deltaPct) || Math.abs(deltaPct) < 0.05) ? 'flat' : (deltaPct > 0 ? 'up' : 'down');
    const tone = this.trendTone(dir);
    const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '•';
    const text = (deltaPct == null || !isFinite(deltaPct)) ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}%`;
    const badgeStyleBase: React.CSSProperties = {
      fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
      background: '#F1F5F9', color: '#111827'
    };
    const badgeStyle: React.CSSProperties =
      tone === 'good'
        ? { ...badgeStyleBase, background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }
        : tone === 'bad'
          ? { ...badgeStyleBase, background: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' }
          : { ...badgeStyleBase, background: '#F1F5F9', color: '#334155', borderColor: '#E2E8F0' };

    // Left: spend + attributed revenue. Right: ROAS big + badge
    const spendText = cardformatCurrency(cur.spend);
    const revText = cardformatCurrency(cur.revenue);
    const roasText = currentRoas == null ? 'N/A' : `${currentRoas.toFixed(2)}x`;
    const description = "ROAS (Return on Ad Spend) shows how effectively your promotion campaigns convert advertising spend into revenue. It is calculated using only the channels associated with the selected campaign (Paid, Email), even if other channels are selected in the filter."

    return (
      <div className="e-card kpi-commerce-card">
        <div className="e-card-content kpi-commerce-card-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div className="kpi-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>ROAS</div>
            {description && (
              <TooltipComponent content={description} position="TopCenter">
                <div className='exclamation-roas-container'>
                  <span className='e-icons e-circle-info kpi-commerce-info-icon' aria-label='Info About Total ROAS in Overview' role='button'></span>
                </div>
              </TooltipComponent>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 0.9fr', gap: 12, alignItems: 'center' }}>
            <div style={{ paddingRight: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className='ecommerce-meta' style={{ fontSize: 12, fontWeight: 600 }}>Spend</span>
                  <span className='revenue-font' style={{ fontSize: 14, fontWeight: 600 }}>{spendText}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className='ecommerce-meta' style={{ fontSize: 12, fontWeight: 600 }}>Attributed Revenue</span>
                  <span className='revenue-font' style={{ fontSize: 14, fontWeight: 600 }}>{revText}</span>
                </div>
              </div>
            </div>
            <div style={{ width: 1, background: '#E2E8F0', height: '100%', alignSelf: 'stretch' }} />
            <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              <div className='kpi-commerce-value'>{roasText}</div>
              <span style={badgeStyle}><span style={{ marginRight: 6 }}>{arrow}</span><span>{text}  {compareLabel}</span></span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  private impressionsContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const cur = this.metricsForRange(y, idxs);
    const py = y - 1;
    const prev = py >= 2022 ? this.metricsForRange(py, idxs) : null;

    const current = Math.round(cur.impressions ?? 0);
    const previous = prev?.impressions ? Math.round(prev.impressions) : null;
    const deltaPct = previous && previous > 0 ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const compareLabel = this.props.monthIndex === ALL_MONTH ? `vs ${py >= 2022 ? py : '—'}` : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${py >= 2022 ? py : '—'}`;
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${compareLabel}`;

    return renderCommonKpiTile({
      label: 'Impressions',
      valueText: this.integer(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private clicksContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const cur = this.metricsForRange(y, idxs);
    const py = y - 1;
    const prev = py >= 2022 ? this.metricsForRange(py, idxs) : null;

    const current = Math.round(cur.clicks ?? 0);
    const previous = prev?.clicks ? Math.round(prev.clicks) : null;
    const deltaPct = previous && previous > 0 ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const compareLabel = this.props.monthIndex === ALL_MONTH ? `vs ${py >= 2022 ? py : '—'}` : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${py >= 2022 ? py : '—'}`;
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${compareLabel}`;

    return renderCommonKpiTile({
      label: 'Clicks',
      valueText: this.integer(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private ctrContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const cur = this.metricsForRange(y, idxs);
    const py = y - 1;
    const prev = py >= 2022 ? this.metricsForRange(py, idxs) : null;

    const current = +(isFinite(cur.ctrPct) ? cur.ctrPct : 0);
    const previous = prev ? +(isFinite(prev.ctrPct) ? prev.ctrPct : 0) : null;
    const deltaPct = previous && previous > 0 ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const compareLabel = this.props.monthIndex === ALL_MONTH ? `vs ${py >= 2022 ? py : '—'}` : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${py >= 2022 ? py : '—'}`;
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${compareLabel}`;

    return renderCommonKpiTile({
      label: 'Click‑Through Rate',
      valueText: `${current.toFixed(2)}%`,
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private cpcOnlyContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const cur = this.metricsForRange(y, idxs);
    const cpc = cur.clicks > 0 ? (cur.spend / cur.clicks) : null;

    // Previous year comparison (same months)
    const py = y - 1;
    const hasPY = py >= 2022;
    const prev = hasPY ? this.metricsForRange(py, idxs) : null;
    const cpcPrev = prev && prev.clicks > 0 ? (prev.spend / prev.clicks) : null;

    // Delta % (lower CPC is better)
    const deltaPct =
      (cpc != null && isFinite(cpc) && cpcPrev != null && isFinite(cpcPrev) && Math.abs(cpcPrev) > 0)
        ? ((cpc - cpcPrev) / Math.abs(cpcPrev)) * 100
        : null;

    // Badge tone: CPC lower is good; higher is bad; unchanged is neutral
    let tone: 'good' | 'bad' | 'neutral' = 'neutral';
    if (deltaPct != null && isFinite(deltaPct)) {
      tone = deltaPct < 0 ? 'good' : deltaPct > 0 ? 'bad' : 'neutral';
    }

    // Badge label (YoY or month YoY)
    const compareLabel = this.props.monthIndex === ALL_MONTH
      ? `vs ${hasPY ? py : '—'}`
      : `vs ${months[Math.max(0, Math.min(11, this.props.monthIndex))]} ${hasPY ? py : '—'}`;

    const badgeText = (deltaPct == null || !isFinite(deltaPct))
      ? '—'
      : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${compareLabel}`;

    // Format currency with 2 decimals (you already use currency2 elsewhere)
    const currency2 = (v: number) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

    const valueText = (cpc == null || !isFinite(cpc)) ? 'N/A' : currency2(cpc);

    // Render single KPI tile via your shared helper
    return renderCommonKpiTile({
      label: 'Cost per click',
      valueText,
      badge: { text: badgeText, tone },           // green when CPC improved (went down)
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private onPromoAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  private onPromoDataLabelRender = (args: any) => {
    const val = args?.point?.y;
    if (typeof val === 'number' && isFinite(val)) {
      args.text = formatCurrency(Number(val));
    }
  }

  private renderPromoVsNonPromo = () => {
    const y = this.props.year;
    const isYearly = this.props.monthIndex === ALL_MONTH;

    const promoChs = this.getFinalPromoChannels();
    const nonPromoChs = this.getFinalNonPromoChannels();

    // Colors (attractive, consistent with palette)
    const colorPromo = '#FF5858';
    const colorNonPromo = '#DBA39A';

    if (isYearly) {
      // Build monthly series for stacked columns
      const monthsData = months.map((m, i) => {
        const promo = this.revenueForMonthByChannels(y, i, promoChs);
        const nonPromo = this.revenueForMonthByChannels(y, i, nonPromoChs);
        return { m, promo, nonPromo };
      });

      const seriesPromo = monthsData.map(r => ({ x: r.m, y: Math.max(0, Math.round(r.promo)) }));
      const seriesNonPromo = monthsData.map(r => ({ x: r.m, y: Math.max(0, Math.round(r.nonPromo)) }));

      return (
        <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Chart: Stacking Column (monthly) */}
          <div style={{ flex: 1, minHeight: 0, height: "calc(100% - 5px)" }}>
            <ChartComponent
              id="promoVsNonPromoYearlyFiltered"
              ref={this.promoVsNonPromoChartRef}
              height="100%"
              primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
              primaryYAxis={{ labelFormat: 'c0', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
              legendSettings={{ visible: true }}
              tooltip={{ enable: true }}
              chartArea={{ border: { width: 0 } }}
              textRender={this.onPromoDataLabelRender}
              axisLabelRender={this.onPromoAxisLabelRender}
              tooltipRender={onCurrencyTooltip}
              load={onChartLoad}
            >
              <Inject services={[StackingBarSeries, Legend, ChartTooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="StackingBar"
                  name="Non‑Promo"
                  xName="x"
                  yName="y"
                  dataSource={seriesNonPromo}
                  fill={colorNonPromo}
                  columnWidth={0.7}
                  marker={{ dataLabel: { visible: true, font: { fontWeight: "Bold" } } }}
                  animation={{ enable: false }}
                />
                <SeriesDirective
                  type="StackingBar"
                  name="Promo"
                  xName="x"
                  yName="y"
                  dataSource={seriesPromo}
                  fill={colorPromo}
                  columnWidth={0.7}
                  marker={{ dataLabel: { visible: true, font: { fontWeight: "Bold" } } }}
                  animation={{ enable: false }}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      );
    }

    // Single month view (stacked column with one category)
    const i = this.props.monthIndex;
    const promo = this.revenueForMonthByChannels(y, i, promoChs);
    const nonPromo = this.revenueForMonthByChannels(y, i, nonPromoChs);
    const monthTitle = `Promo vs Non‑Promo Sales`;

    const points = [{ x: 'Revenue', promo: Math.round(promo), nonPromo: Math.round(nonPromo) }];

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{monthTitle}</div>
        </div>
        <div style={{ flex: 1, minHeight: 0, height: "calc(100% - 5px)" }}>
          <ChartComponent
            id="promoVsNonPromoMonthlyFiltered"
            ref={this.promoVsNonPromoChartRef}
            height="100%"
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{ labelFormat: 'c0', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, minimum: 0 }}
            legendSettings={{ visible: true }}
            tooltip={{ enable: true, shared: true }}
            chartArea={{ border: { width: 0 } }}
            textRender={this.onPromoDataLabelRender}
            axisLabelRender={this.onPromoAxisLabelRender}
            load={onChartLoad}
          >
            <Inject services={[StackingColumnSeries, Legend, ChartTooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                type="StackingColumn"
                name="Non‑Promo"
                xName="x"
                yName="nonPromo"
                dataSource={points}
                fill={colorNonPromo}
                columnWidth={0.5}
                marker={{ dataLabel: { visible: true } }}
                animation={{ enable: false }}
              />
              <SeriesDirective
                type="StackingColumn"
                name="Promo"
                xName="x"
                yName="promo"
                dataSource={points}
                fill={colorPromo}
                columnWidth={0.5}
                marker={{ dataLabel: { visible: true } }}
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  };

  private onDiscountWaterfallAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  // Render: Discount Waterfall (Gross → Net → COGS → Profit)
  private renderDiscountWaterfall = () => {
    const y = this.props.year;
    const isYearly = this.props.monthIndex === ALL_MONTH;
    const idxs = isYearly ? Array.from({ length: 12 }, (_, i) => i) : [Math.max(0, Math.min(11, this.props.monthIndex))];
    const agg = this.discountWaterfallForRange(y, idxs);

    const title = `Discount Waterfall`;

    // Waterfall points: [Gross, Discounts, Net Sales (intermediate), COGS, Gross Margin (summary)]
    const data = [
      { x: 'Gross Sales', y: Math.round(agg.gross) },
      { x: 'Discounts', y: -Math.round(agg.discounts) },
      { x: 'Net Sales' }, // intermediate sum
      { x: 'COGS', y: -Math.round(agg.cogs) },
      { x: 'Gross Margin' } // final summary
    ];
    const intermediateSumIndexes = [2];
    const sumIndexes = [4];

    const C = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    const onLabelCurrency = (args: any) => {
      const val = args?.point?.y;
      if (typeof val === 'number') args.text = C.format(val);
    };

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ flex: 1, minHeight: 0, height: '100%', width: '100%' }}>
          <ChartComponent
            id="discountWaterfall"
            ref={this.discountWaterfallChartRef}
            height="100%"
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{ labelFormat: 'c0', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: false }}
            chartArea={{ border: { width: 0 } }}
            textRender={onTextRender}
            tooltipRender={onCurrencyTooltip}
            axisLabelRender={this.onDiscountWaterfallAxisLabelRender}
            load={onChartLoad}
          >
            <Inject services={[WaterfallSeries, DataLabel, Legend, ChartTooltip, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                type="Waterfall"
                name="Discount Waterfall"
                dataSource={data}
                xName="x"
                yName="y"
                intermediateSumIndexes={intermediateSumIndexes as any}
                sumIndexes={sumIndexes as any}
                negativeFillColor={this.wfNegative}
                summaryFillColor={this.wfSummary}
                columnWidth={0.6}
                marker={{ dataLabel: { visible: true, position: 'Outer' } }}
                connector={{ color: '#9CA3AF', width: 1 }}
                fill={this.wfPositive}
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  };

  private onPromoEfficiencyAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  private onPromoEfficiencyDataLabelRender = (args: any) => {
    const val = args?.point?.y;
    if (typeof val === 'number' && isFinite(val)) {
      args.text = formatCurrency(Number(val));
    }
  }

  private promoEfficiencyGrossVsCostsForMonth(year: number, monthIdx: number) {
    const w = this.discountWaterfallForMonth(year, monthIdx);
    const gross = Math.max(0, w.gross);
    const totalCosts = Math.max(0, (w.discounts ?? 0) + (w.cogs ?? 0));
    return { gross, totalCosts };
  }

  private promoEfficiencyGrossVsCostsSeries(year: number, idxs: number[]) {
    return idxs.map(i => {
      const v = this.promoEfficiencyGrossVsCostsForMonth(year, i);
      return { m: months[i], gross: v.gross, costs: v.totalCosts };
    });
  }

  private renderPromoEfficiency = () => {
    const y = this.props.year;
    const colorGross = '#90AACB';  // blue-ish (your current gross margin color fits well)
    const colorCosts = '#FF5858';  // red-ish (you used for discounts
    const idxs = this.selectedMonthIdxs;
    const data = this.promoEfficiencyGrossVsCostsSeries(y, idxs);
    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ minHeight: 0, flex: 1, height: "calc(100% - 10px)" }}>
          <ChartComponent
            id="promoEfficiencyChart"
            ref={this.promoEfficiencyBarRef}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{ labelFormat: 'c0', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
            chartArea={{ border: { width: 0 } }}
            axisLabelRender={this.onPromoEfficiencyAxisLabelRender}
            textRender={this.onPromoEfficiencyDataLabelRender}
            tooltipRender={onCurrencyTooltip}
            load={onChartLoad}
          >
            <Inject services={[ColumnSeries, Legend, ChartTooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              {/* Column 1: Gross Sales */}
              <SeriesDirective
                type="Column"
                name="Gross Sales"
                dataSource={data}
                xName="m"
                yName="gross"
                columnWidth={0.85}
                fill={colorGross}
                marker={{ dataLabel: { visible: true } }}
                animation={{ enable: false }}
              />
              {/* Column 2: Discounts + COGS */}
              <SeriesDirective
                type="Column"
                name="Discounts + COGS"
                dataSource={data}
                xName="m"
                yName="costs"
                columnWidth={0.85}
                fill={colorCosts}
                marker={{ dataLabel: { visible: true } }}
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }

  // Render Campaign Performance Table (DataGrid with Excel/PDF export)
  private renderCampaignPerformanceTable = () => {
    const toolbarOptions: any = ['ExcelExport', 'PdfExport'];
    const data = this.buildCampaignPerformanceRows();

    const toolbarClick = (args: ClickEventArgs) => {
      switch (args.item.id) {
        case 'campaignPerfGrid_pdfexport':
          this.campaignPerfGridRef.current?.pdfExport();
          break;
        case 'campaignPerfGrid_excelexport':
          this.campaignPerfGridRef.current?.excelExport();
          break;
      }
    };

    const roasTemplate = (props: any) => {
      const v = props.roas;
      if (v === null || v === undefined || !isFinite(v)) return <span>—</span>;
      return <span style={{ fontWeight: 700 }}>{v.toFixed(2)}x</span>;
    };

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ flex: 1, minHeight: 0 }}>
          <GridComponent
            id="campaignPerfGrid"
            ref={this.campaignPerfGridRef}
            dataSource={data}
            allowPaging={false}
            toolbar={toolbarOptions}
            toolbarClick={toolbarClick}
            allowExcelExport={true}
            allowPdfExport={true}
            allowResizing={true}
            height="100%"
          >
            <ColumnsDirective>
              <ColumnDirective field="campaign" headerText="Campaign" headerTemplate={this.headerWithTooltip('Campaign', '')} width="130" textAlign="Left" isPrimaryKey={true} />
              <ColumnDirective field="cost" headerText="Cost" headerTemplate={this.headerWithTooltip('Cost', '')} width="110" textAlign="Right" format="C0" />
              <ColumnDirective field="revenue" headerText="Revenue" headerTemplate={this.headerWithTooltip('Revenue', '')} width="110" textAlign="Right" format="C0" />
              <ColumnDirective field="profit" headerText="Profit" headerTemplate={this.headerWithTooltip('Profit', '')} width="110" textAlign="Right" format="C0" />
              <ColumnDirective field="roas" headerText="ROAS" headerTemplate={this.headerWithTooltip('ROAS', '')} width="110" textAlign="Right" template={roasTemplate as any} />
              <ColumnDirective field="conversions" headerText="Conversions" headerTemplate={this.headerWithTooltip('Conversions', '')} width="110" textAlign="Right" format="N0" />
            </ColumnsDirective>

            <GridInject services={[ExcelExport, PdfExport, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    );
  };

  private onRevenueCamapignAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  private onRevenueCamapignDataLabelRender = (args: any) => {
    const val = args?.point?.y;
    if (typeof val === 'number' && isFinite(val)) {
      args.text = formatCurrency(Number(val));
    }
  }

  private renderRevenueByCampaign = () => {
    const year = this.props.year;
    const idxs = this.selectedMonthIdxs;
    const allCampaigns = CAMPAIGN_OPTIONS.map(c => ({ key: c.value, label: c.text }));
    const campaignList = this.props.campaign && this.props.campaign !== 'ALL'
      ? allCampaigns.filter(c => c.key === this.props.campaign)
      : allCampaigns;
    const userSelectedChannels = asChannelKeys(this.props.channels ?? []);
    const hasUserSelectedChannels = userSelectedChannels.length > 0;

    const rows = campaignList.map(c => {
      const campaignAllowed = (this.CAMPAIGN_PROMO_CHANNELS[c.key] ?? ALL_CHANNELS) as ChannelKey[];
      const channelsUsed = hasUserSelectedChannels ? campaignAllowed.filter(ch => userSelectedChannels.includes(ch)) : campaignAllowed;
      let totalRev = 0;
      for (const mi of idxs) {
        totalRev += this.computeRevenueSliceForMonthByChannels(year, mi, channelsUsed);
      }
      return { key: c.key, x: c.label, y: Math.round(totalRev || 0) };
    });
    rows.sort((a, b) => b.y - a.y);
    const palette = pickPalette(Palettes.revenueByCampaign, Math.max(3, rows.length));
    const dataWithColor = rows.map((r, i) => ({ ...r, color: palette[i % palette.length] }));

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <ChartComponent
          id="revenueByCampaignChart"
          ref={this.campaignRevenueChartRef}
          primaryXAxis={{
            valueType: 'Category',
            labelIntersectAction: 'Rotate45',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            labelStyle: { size: '11px' }
          }}
          primaryYAxis={{
            labelFormat: 'c0',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: { size: '11px' }
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: false, format: '${series.name}: ${point.y}' }}
          legendSettings={{ visible: false }}
          textRender={this.onRevenueCamapignDataLabelRender}
          axisLabelRender={this.onRevenueCamapignAxisLabelRender}
          tooltipRender={onCurrencyTooltip}
          load={onChartLoad}
        >
          <Inject services={[BarSeries, Category, ChartTooltip, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={dataWithColor}
              type="Bar"
              xName="x"
              yName="y"
              name="Revenue"
              columnWidth={0.6}
              pointColorMapping="color"
              marker={{ dataLabel: { visible: true, position: 'Outer', format: 'C0' } } as any}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  private renderFunnelAdClickToPurchase = () => {
    const year = this.props.year;
    const monthIdxs = this.selectedMonthIdxs; // handles ALL_MONTH vs single month
    const channels = this.getFinalCampaignChannels(); // campaign-aware channels
    const regions = this.getIncludedRegions();

    // Assumed funnel stage rates (adjust if you want a different shape)
    const VIEW_RATE_BY_CHANNEL: Record<ChannelKey, number> = {
      Paid: 0.85,
      Organic: 0.65,
      Email: 0.60,
      Social: 0.55
    };
    const ATC_RATE_BY_CHANNEL: Record<ChannelKey, number> = {
      Paid: 0.20,
      Organic: 0.12,
      Email: 0.10,
      Social: 0.08
    };

    let totalClicks = 0;
    let totalViews = 0;
    let totalAtc = 0;
    let totalPurchases = 0;

    for (const mi of monthIdxs) {
      const crRow = (channelCRByYear[year] ?? [])[mi]; // channel conversion rates (percent)
      for (const ch of channels) {
        // Sum orders for this channel across selected regions for the month
        let channelOrders = 0;
        for (const rk of regions) {
          const row = buildChannelsByRegionYear(year, rk)[mi];
          if (!row) continue;
          channelOrders += (row as any)[ch] ?? 0;
        }
        // Apply category share filter (same approach used across the dashboard)
        const categoryShare = this.computeCategoryShareForMonth(year, mi);
        const purchasesForChannel = channelOrders * categoryShare;
        totalPurchases += purchasesForChannel;

        // Back out visits/clicks from purchases using channel conversion rate (cr % = purchases / visits * 100)
        const crPct = crRow ? ((crRow as any)[ch] ?? 0) : 0;
        const visitsForChannel = crPct > 0 ? purchasesForChannel / (crPct / 100) : 0;
        const clicksForChannel = visitsForChannel; // clicks == visits in this model
        totalClicks += clicksForChannel;

        // Product views and ATC derived from clicks by assumed channel rates
        const viewRate = VIEW_RATE_BY_CHANNEL[ch] ?? 0.6;
        const atcRate = ATC_RATE_BY_CHANNEL[ch] ?? 0.1;
        const viewsForChannel = clicksForChannel * viewRate;
        const atcForChannel = viewsForChannel * atcRate;

        totalViews += viewsForChannel;
        totalAtc += atcForChannel;
      }
    }

    // Round nicely for display
    const rows = [
      { x: 'Clicks', y: Math.round(totalClicks) },
      { x: 'Product Views', y: Math.round(totalViews) },
      { x: 'Add to Cart', y: Math.round(totalAtc) },
      { x: 'Purchases', y: Math.round(totalPurchases) }
    ];

    // Attractive palette (picked to be clear & accessible)
    const funnelColors = ['#B9005B', '#E97777', '#FF5858', '#554994'];

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <AccumulationChartComponent
          id="funnelAdClickToPurchase"
          ref={this.funnelChartRef}
          legendSettings={{ visible: true, position: 'Bottom' }}
          tooltip={{ enable: true }}
          enableBorderOnMouseMove={false}
          load={onAccumulationLoad}
          textRender={onTextRender}
          tooltipRender={onCurrencyTooltip}
        >
          <Inject services={[PyramidSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              type="Pyramid"
              dataSource={rows}
              xName="x"
              yName="y"
              neckWidth="20%"
              gapRatio={0.03}
              palettes={funnelColors}
              dataLabel={{
                visible: true,
                position: 'Outside'
              }}
              animation={{ enable: false }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    );
  };

  // Ensure shared tooltip shows absolute values (k) instead of % for StackingColumn100
  onStockSharedTooltipRender = (args: ISharedTooltipRenderEventArgs) => {
    const label = String(args.headerText ?? '');
    const row = (this.stockCompositionData || []).find(d => d.m === label) || this.stockCompositionData[0];
    if (!row) return;
    args.text = [
      `On-hand: ${Math.round(row.onhand)} units`,
      `Committed: ${Math.round(row.committed)} units`
    ];
  };

  handleCategoryChange = (e: DropDownChangeEventArgs) => this.setState({ selectedCategory: String(e.value) });
  handleTopItemsCategoryChange = (e: DropDownChangeEventArgs) => this.setState({ topItemsCategory: String(e.value) });

  get catSeriesData() {
    const byCat =
      this.props.monthIndex === ALL_MONTH
        ? buildCategoryMonthlyTotalsByYear(this.props.year)
        : buildCategoryTotalsForSingleMonth(this.props.year, this.props.monthIndex);

    const cats = this.state.selectedCategory === 'All Categories'
      ? allCategories.slice()
      : [this.state.selectedCategory];

    const series = cats.map(cat => ({ name: cat, data: byCat[cat] ?? [] }));
    const total = (s: { data: CatMonthPoint[] }) => s.data.reduce((a, p) => a + (p.value || 0), 0);
    series.sort((a, b) => total(b) - total(a));
    return series;
  }

  // ===========================
  // Product Mix (Share of Total)
  // ===========================
  // palette for product mix
  ProductMixPalette = [...Palettes.productMixTotal];

  // stable mapping for category colors (uses productMixTotal)
  ProductMixCategoryColorByName: Record<string, string> = Object.fromEntries(
    allCategories.map((cat, i) => [cat, this.ProductMixPalette[i % this.ProductMixPalette.length]])
  );

  // stable markers for categories (reuse MarkerShapes)
  ProductMixCategoryMarkerByName: Record<string, MarkerShape> = Object.fromEntries(
    allCategories.map((cat, i) => [cat, MarkerShapes[i % MarkerShapes.length]])
  );

  pmGetCategoryColor = (cat: string) => this.ProductMixCategoryColorByName[cat] ?? this.ProductMixPalette[0];
  pmGetCategoryMarker = (cat: string) => {
    const shape = this.ProductMixCategoryMarkerByName[cat] ?? 'Circle';
    const color = this.pmGetCategoryColor(cat);
    return {
      visible: true,
      shape,
      width: 8,
      height: 8,
      border: { width: 2, color },
      fill: '#ffffff'
    } as any;
  };

  // Build monthly total orders across all regions (Paid+Organic+Email+Social)
  private buildOrdersTotalsByMonth(year: number): { m: string; total: number }[] {
    const ap = buildChannelsByRegionYear(year, 'AsiaPacific');
    const eu = buildChannelsByRegionYear(year, 'Europe');
    const na = buildChannelsByRegionYear(year, 'NorthAmerica');
    const la = buildChannelsByRegionYear(year, 'LatinAmerica');
    const mea = buildChannelsByRegionYear(year, 'MiddleEastAfrica');
    return months.map((m, i) => {
      const sumFor = (r?: ChannelMonthly) => (r?.Paid ?? 0) + (r?.Organic ?? 0) + (r?.Email ?? 0) + (r?.Social ?? 0);
      const total = sumFor(ap[i]) + sumFor(eu[i]) + sumFor(na[i]) + sumFor(la[i]) + sumFor(mea[i]);
      return { m, total };
    });
  }

  // Stock composition dataset (On-hand vs Committed)
  private get stockCompositionData(): { m: string; onhand: number; committed: number }[] {
    const year = this.props.year;
    const orders = this.buildOrdersTotalsByMonth(year);        // committed = total demand
    const all = months.map((m, i) => {
      const committed = Math.max(orders[i]?.total ?? 0, 0);
      const coverRatio = supplyCoverByMonth[i] ?? 1.0;
      const onhand = Math.max(committed * Math.max(coverRatio, 0), 0); // same supply model
      return { m, onhand, committed };
    });
    if (this.props.monthIndex === ALL_MONTH) return all;
    const i = this.props.monthIndex;
    return all[i] ? [all[i]] : [];
  }

  render() {
    return (
      <div className="Container">
        <div className="sidebar-content">
          <DashboardLayoutComponent
            ref={this.MarketingRef}
            id="ecommerce_marketing_promo_dashboard"
            columns={8}
            cellAspectRatio={1}
            cellSpacing={[12, 12]}
            allowResizing={false}
            allowDragging={false}
            created={this.MarketingDashboardCreated}
            mediaQuery="(max-width:950px)"
          >
            <PanelsDirective>
              <PanelDirective
                sizeX={4}
                sizeY={1}
                row={0}
                col={0}
                content={() => this.promoRevenueContent()}
              />
              <PanelDirective
                sizeX={4}
                sizeY={1}
                row={0}
                col={4}
                content={() => this.roasContent()}
              />
              <PanelDirective
                sizeX={2}
                sizeY={1}
                row={2}
                col={0}
                content={() => this.impressionsContent()}
              />
              <PanelDirective
                sizeX={2}
                sizeY={1}
                row={2}
                col={2}
                content={() => this.clicksContent()}
              />
              <PanelDirective
                sizeX={2}
                sizeY={1}
                row={2}
                col={4}
                content={() => this.ctrContent()}
              />
              <PanelDirective
                sizeX={2}
                sizeY={1}
                row={2}
                col={6}
                content={() => this.cpcOnlyContent()}
              />
              <PanelDirective
                sizeX={4}
                sizeY={3}
                row={4}
                col={0}
                header="<div>Promotion vs Non‑Promotion Sales Analysis</div>"
                content={() => this.renderPromoVsNonPromo()}
              />
              <PanelDirective
                sizeX={4}
                sizeY={3}
                row={4}
                col={4}
                header="<div>Discount Impact Breakdown</div>"
                content={() => this.renderDiscountWaterfall()}
              />
              <PanelDirective
                sizeX={8}
                sizeY={3}
                row={7}
                col={0}
                header="<div>Promotion Efficiency Analysis</div>"
                content={() => this.renderPromoEfficiency()}
              />
              <PanelDirective
                sizeX={8}
                sizeY={4}
                row={10}
                col={0}
                header="<div>Campaign Performance Analysis</div>"
                content={() => this.renderCampaignPerformanceTable()}
              />
              <PanelDirective
                sizeX={3}
                sizeY={3}
                row={15}
                col={0}
                header="<div>Campaign Revenue Analysis</div>"
                content={() => this.renderRevenueByCampaign()}
              />
              <PanelDirective
                sizeX={5}
                sizeY={3}
                row={15}
                col={3}
                header="<div>Ad‑to‑Purchase Funnel Analysis</div>"
                content={() => this.renderFunnelAdClickToPurchase()}
              />
            </PanelsDirective>
          </DashboardLayoutComponent>
        </div>
      </div>
    );
  }
}

type ProductMixPanelProps = {
  year: number;
  monthIndex: number;
  categories: string | string[];
  brand: string;
  region: string;
  warehouse: string;
  onReady?: (api: { refreshProductMixDonut: () => void }) => void;
};
type ProductMixPanelState = { drillCategory: string | null };

class ProductMixPanel extends React.PureComponent<ProductMixPanelProps, ProductMixPanelState> {
  donutRef = React.createRef<AccumulationChartComponent>();
  state: ProductMixPanelState = { drillCategory: null };

  private refreshProductMixDonut = () => this.donutRef.current?.refresh();

  private clearLingeringTooltip = (chartId?: string) => {
    try {
      const id = chartId ?? (this.state.drillCategory ? 'productMixDonutFiltered_drill' : 'productMixDonutFiltered');
      // Common Syncfusion chart tooltip id pattern
      const t1 = document.getElementById(`${id}_tooltip`);
      if (t1 && t1.parentElement) t1.parentElement.removeChild(t1);
      // Fallback: remove any tooltip nodes inside this chart host
      const host = this.donutRef.current?.element as HTMLElement | null;
      if (host) {
        host.querySelectorAll('.e-tooltip-wrap, .e-chart-tooltip').forEach(n => n.parentElement?.removeChild(n));
      }
    } catch { }
  };

  componentDidMount() {
    this.props.onReady?.({ refreshProductMixDonut: this.refreshProductMixDonut });
  }

  componentDidUpdate(prev: ProductMixPanelProps, prevState: ProductMixPanelState) {
    const propsChanged =
      prev.year !== this.props.year ||
      prev.monthIndex !== this.props.monthIndex ||
      prev.categories !== this.props.categories ||
      prev.brand !== this.props.brand ||
      prev.region !== this.props.region ||
      prev.warehouse !== this.props.warehouse;

    const drillChanged = prevState.drillCategory !== this.state.drillCategory;

    if (propsChanged || drillChanged) {
      if (drillChanged) this.clearLingeringTooltip(); // ensure old tooltip is gone when view switches
      this.donutRef.current?.refresh();
    }
  }

  private filteredProducts() {
    return mixedProducts.filter(p => {
      const cats = this.props.categories;
      const catOk =
        cats === 'ALL' ||
        (Array.isArray(cats) ? (cats.length === 0 || cats.includes('ALL') || cats.includes(p.category)) : p.category === cats);
      const brandOk = this.props.brand === 'ALL' || p.brand === this.props.brand;
      const whOk = this.props.warehouse === 'ALL' || p.warehouse === this.props.warehouse;
      return catOk && brandOk && whOk;
    });
  }

  private regionFactor(year: number, monthIdx: number): number {
    const r = this.props.region;
    if (r === 'ALL' || !isRegionKey(r)) return 1;
    const regions = buildRegionMonthlyByYear(year)[monthIdx];
    if (!regions) return 1;
    const sum = (regions.AsiaPacific ?? 0) + (regions.Europe ?? 0) + (regions.NorthAmerica ?? 0) + (regions.LatinAmerica ?? 0) + (regions.MiddleEastAfrica ?? 0);
    const part = (regions as any)[r] ?? 0;
    return sum > 0 ? (part / sum) : 1;
  }

  private unitsForProductMonth(year: number, monthIdx: number, productName: string): number {
    const prods = buildYearProductSales(year);
    const row = prods.find(p => p.name === productName);
    const baseUnits = Math.max(0, row?.monthly?.[monthIdx] ?? 0);
    const rf = this.regionFactor(year, monthIdx);
    return baseUnits * rf;
  }

  private buildData() {
    const { year, monthIndex } = this.props;
    const isYearly = monthIndex === ALL_MONTH;
    const monthIdxs = isYearly ? Array.from({ length: 12 }, (_, i) => i) : [Math.max(0, Math.min(11, monthIndex))];

    const products = this.filteredProducts();

    const prodRevenue: Record<string, number> = {};
    for (const p of products) {
      let rev = 0;
      for (const mi of monthIdxs) {
        // price * units (region factor already applied in unitsForProductMonth)
        const units = this.unitsForProductMonth(year, mi, p.name);
        const price = ProductPricing[p.name]?.price ?? 50;
        rev += units * price;
      }
      prodRevenue[p.name] = rev;
    }

    const catAgg: Record<string, number> = {};
    for (const p of products) {
      catAgg[p.category] = (catAgg[p.category] ?? 0) + (prodRevenue[p.name] ?? 0);
    }

    const catDataRaw = Object.keys(catAgg)
      .map(k => ({ x: k, y: Math.round(catAgg[k] || 0) }))
      .filter(d => d.y > 0)
      .sort((a, b) => b.y - a.y);

    const total = catDataRaw.reduce((s, d) => s + d.y, 0);
    // attach pct for data label; legendText now only the category name
    const catData = catDataRaw.map(d => {
      const pct = total > 0 ? Math.round(((d.y || 0) / total) * 100) : 0;
      return { ...d, legendText: String(d.x), pct };
    });

    // Drill to top products within selected category
    let drillTitle = '';
    let drillData: { x: string; y: number }[] = [];
    if (this.state.drillCategory) {
      drillTitle = `Top Products • ${this.state.drillCategory}`;
      drillData = products
        .filter(p => p.category === this.state.drillCategory)
        .map(p => ({ x: p.name, y: Math.round(prodRevenue[p.name] || 0) }))
        .filter(r => r.y > 0)
        .sort((a, b) => b.y - a.y)
        .slice(0, 10);

      const drillTotal = drillData.reduce((s, d) => s + (d.y || 0), 0) || 1;
      // attach pct for labels; legend shows only product name
      drillData = drillData.map(d => {
        const pct = drillTotal > 0 ? Math.round(((d.y || 0) / drillTotal) * 100) : 0;
        return { ...d, legendText: String(d.x), pct } as any;
      });
    }
    return { catData, drillData, total };
  }

  private onPointClick = (args: any) => {
    const raw = args?.point?.data?.x ?? args?.point?.x ?? '';
    const key = String(raw).replace(/\s*\(\s*\d+%?\s*\)\s*$/, '').trim();
    if (!key) return;
    // Clear tooltip from base view before switching to drill
    this.clearLingeringTooltip('productMixDonutFiltered');
    this.setState(s => ({ drillCategory: s.drillCategory === key ? null : key }));
  };

  private onBack = () => {
    // Clear tooltip from drill view before returning
    this.clearLingeringTooltip('productMixDonutFiltered_drill');
    this.setState({ drillCategory: null });
  };

  private productMixDataLabelRender = (args: any) => {
    const val = Number(args?.point?.y);
    if (!isFinite(val)) return;

    // Prefer precomputed pct on the data object; else derive from series points
    const pctFromData = Number(args?.point?.data?.pct);
    let pct = isFinite(pctFromData) ? Math.round(pctFromData) : NaN;

    if (!isFinite(pct)) {
      const pts = Array.isArray(args?.series?.points) ? args.series.points : [];
      const sum = pts.reduce((s: number, p: any) => s + (Number(p?.y) || 0), 0);
      pct = sum > 0 ? Math.round((val / sum) * 100) : 0;
    }
    args.text = `${this.currency0(val)} (${pct}%)`;
  };

  private currency0 = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
      .format(Math.round(Number(v || 0)));

  render() {
    const { year, monthIndex } = this.props;
    const isYearly = monthIndex === ALL_MONTH;
    const title = `Product Mix`;

    const { catData, drillData, total } = this.buildData();
    const drilled = !!this.state.drillCategory;
    const dataSource = drilled ? drillData : catData;

    const chartId = drilled ? 'productMixDonutFiltered_drill' : 'productMixDonutFiltered';

    if (!drilled && catData.length === 0) {
      return (
        <div style={{ padding: 12, background: '#fff', borderRadius: 10 }}>
          <div className='commerce-section-title'>{title}</div>
          <div style={{ marginTop: 18, color: '#6b7280' }}>No data for selected filters</div>
        </div>
      );
    }

    const basePalette = pickPalette(Palettes.productMixTotal, Math.max(1, dataSource.length));
    const drillPalette = pickPalette(Palettes.categorical, Math.max(1, dataSource.length));

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          {drilled && <button className="e-btn e-outline" onClick={this.onBack}>Back</button>}
          {drilled && (
            <div style={{ fontWeight: 600, marginLeft: "8px" }}>
              Top Products • {this.state.drillCategory}
            </div>
          )}
        </div>

        <div style={{ height: 'calc(100% - 10px)' }}>
          <AccumulationChartComponent
            key={chartId}
            id={chartId}
            ref={this.donutRef}
            tooltip={{ enable: true }}
            pointClick={!drilled ? this.onPointClick : undefined}
            legendSettings={{ visible: true, position: 'Right' }}
            textRender={onTextRender}
            tooltipRender={onCurrencyTooltip}
            load={onAccumulationLoad}
          >
            <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                type="Pie"
                dataSource={dataSource}
                xName="legendText"
                yName="y"
                innerRadius="60%"
                palettes={(drilled ? drillPalette : basePalette) as any}
                dataLabel={{ visible: true, position: 'Outside', connectorStyle: { length: '10px' }, name: 'y', font: { size: '12px' } } as any}
                animation={{ enable: false }}
                borderRadius={10} border={{ width: 4, color: '#ffffff' }}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    );
  }
}

type CurrentStockCompositionPanelProps = {
  year: number;
  categories: string | string[];
  monthIndex: number;
  region?: string;
  brand: string;
  warehouse: string;
  onReady?: (api: { refreshCurrentStockComposition: () => void }) => void;
};

type CurrentStockCompositionPanelState = {
  drillCategory: string | null;
};

const COLOR_ONHAND = '#FF9AA2';     // match your red-tint palette
const COLOR_COMMITTED = '#F5C6A5';  // beige-tint
const COLOR_STOCKOUTS = '#FF5858';  // bars in drill
const COLOR_COVER = '#90AACB';      // line in drill

const nz = (v: any) => Number.isFinite(+v) ? +v : 0;

class StockCompositionPanel extends React.PureComponent<CurrentStockCompositionPanelProps, CurrentStockCompositionPanelState> {
  private mainRef = React.createRef<ChartComponent>();
  private drillRef = React.createRef<ChartComponent>();

  state: CurrentStockCompositionPanelState = { drillCategory: null };

  componentDidMount() {
    this.props.onReady?.({ refreshCurrentStockComposition: () => this.refreshCurrentStockComposition() });
  }

  componentDidUpdate(prev: CurrentStockCompositionPanelProps) {
    const changed =
      prev.year !== this.props.year ||
      prev.monthIndex !== this.props.monthIndex ||
      prev.region !== this.props.region ||
      prev.brand !== this.props.brand ||
      prev.warehouse !== this.props.warehouse ||
      JSON.stringify(prev.categories ?? []) !== JSON.stringify(this.props.categories ?? []);
    if (changed) this.refreshCurrentStockComposition();
  }

  private onMainChartMouseClick = (args: any) => {
    if (this.state.drillCategory) return;
    const target = String(args?.target || '');
    // e.g., "currentStockComposition0_AxisLabel_2"
    if (target.startsWith('currentStockComposition0_AxisLabel_')) {
      const idx = parseInt(target.split('_').pop() || '-1', 10);
      if (idx >= 0) {
        const chart: any = this.mainRef.current as any;
        const txt =
          chart?.primaryXAxis?.visibleLabels?.[idx]?.text ??
          document.getElementById(target)?.textContent?.trim() ??
          '';
        const label = String(txt || '').trim();
        if (!label) return;
        this.setState(s => ({ drillCategory: s.drillCategory === label ? null : label }));
      }
    }
  };

  private refreshCurrentStockComposition() {
    if (this.state.drillCategory) {
      this.drillRef.current?.refresh();
    } else {
      this.mainRef.current?.refresh();
    }
  }

  // ===== Data builders =====

  private selectedMonthIdxs(): number[] {
    return this.props.monthIndex === ALL_MONTH
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, this.props.monthIndex))];
  }

  /** Category totals for On‑hand vs Committed */
  private buildCompositionRows(): Array<{ x: string; onhand: number; committed: number }> {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs();
    const prods = this.filteredProducts(y); // <-- use filtered list
    const byCat: Record<string, { onhand: number; committed: number }> = {};

    for (const p of prods) {
      for (const i of idxs) {
        // apply region factor per month and keep integer units
        const rf = this.regionFactor(y, i);
        const baseUnits = Math.max(0, p.monthly?.[i] ?? 0);
        const units = Math.round(baseUnits * rf);

        // ALIGN: use supplyCoverByMonth for on‑hand (same as grids)
        const coverRatio = supplyCoverByMonth[i] ?? 1.0;
        const onH = Math.round(units * Math.max(0, coverRatio));

        if (!byCat[p.category]) byCat[p.category] = { onhand: 0, committed: 0 };
        byCat[p.category].onhand = nz(byCat[p.category].onhand) + nz(onH);
        byCat[p.category].committed = nz(byCat[p.category].committed) + nz(units);
      }
    }
    return Object.keys(byCat).map(k => ({ x: k, onhand: nz(byCat[k].onhand), committed: nz(byCat[k].committed) }));
  }

  private filteredProducts(year: number) {
    const prods = buildYearProductSales(year);
    const catsProp = this.props.categories as any;
    const categoriesSelected = Array.isArray(catsProp)
      ? (catsProp.length === 0 || catsProp.includes('ALL') ? null : catsProp)
      : (catsProp === 'ALL' ? null : [String(catsProp)]);
    const brandSelected = this.props.brand === 'ALL' ? null : this.props.brand;
    const warehouseSelected = this.props.warehouse === 'ALL' ? null : this.props.warehouse;

    // Use mixedProducts metadata (brand/warehouse) to filter the scaled product rows
    return prods.filter(p => {
      const meta = mixedProducts.find(mp => mp.name === p.name);
      if (!meta) return false;
      if (categoriesSelected && !categoriesSelected.includes(meta.category)) return false;
      if (brandSelected && String(meta.brand ?? '') !== String(brandSelected)) return false;
      if (warehouseSelected && String(meta.warehouse ?? '') !== String(warehouseSelected)) return false;
      return true;
    });
  }

  // Add helper: compute region factor for a month (fraction of global orders in selected region)
  private regionFactor(year: number, monthIdx: number): number {
    const r = this.props.region;
    if (!r || r === 'ALL') return 1;
    if (!isRegionKey(r)) return 1;
    const regions = buildRegionMonthlyByYear(year)[monthIdx];
    if (!regions) return 1;
    const sum = (regions.AsiaPacific ?? 0) + (regions.Europe ?? 0) + (regions.NorthAmerica ?? 0) + (regions.LatinAmerica ?? 0) + (regions.MiddleEastAfrica ?? 0);
    const part = (regions as any)[r] ?? 0;
    return sum > 0 ? (part / sum) : 1;
  }

  private computeBadges(rows: Array<{ onhand: number; committed: number }>) {
    let over = 0, short = 0;
    for (const r of rows) {
      if ((r.onhand - r.committed) > 0) over += (r.onhand - r.committed);
      if ((r.committed - r.onhand) > 0) short += (r.committed - r.onhand);
    }
    return { over, short };
  }

  /** Drill series: per‑month Stockouts & Cover(days) for a chosen category */
  private coverStockoutsDrill(category: string): Array<{ m: string; stockouts: number; coverDays: number }> {
    const y = this.props.year;
    const prods = buildYearProductSales(y);
    const demand: number[] = Array(12).fill(0);

    for (const p of prods) {
      if (p.category !== category) continue;
      for (let i = 0; i < 12; i++) {
        // ALIGN: include region factor and round per‑month committed
        const rf = this.regionFactor(y, i);
        const u = Number(p.monthly?.[i] ?? 0) * rf;
        const units = Math.max(0, Math.round(Number.isFinite(u) ? u : 0));
        demand[i] += units;
      }
    }

    return demand.map((committed, i) => {
      // ALIGN: use supplyCoverByMonth for on‑hand
      const coverRatio = supplyCoverByMonth[i] ?? 1.0;
      const onH = Math.max(0, Math.round(committed * Math.max(0, coverRatio)));
      const stockouts = Math.max(0, Math.round(committed - onH));
      const coverDays = committed > 0 ? Math.max(0, Math.round((onH / committed) * 30)) : 0;
      return { m: months[i], stockouts, coverDays };
    });
  }

  // ===== Handlers =====
  private onMainChartPointClick = (args: any) => {
    const cat = String(args?.point?.x ?? '').trim();
    if (cat) this.setState({ drillCategory: cat }, () => this.drillRef.current?.refresh());
  };
  private onBack = () => this.setState({ drillCategory: null }, () => this.mainRef.current?.refresh());

  // ===== Renderers =====
  private renderBadges(over: number, short: number) {
    const fmt = (n: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
    return (
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginBottom: 6 }}>
        <span style={{ background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0', borderRadius: 999, padding: '2px 8px', fontWeight: 700 }}>
          Overstock: {fmt(over)}
        </span>
        <span style={{ background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', borderRadius: 999, padding: '2px 8px', fontWeight: 700 }}>
          Shortage: {fmt(short)}
        </span>
      </div>
    );
  }

  private renderMain() {
    const rows = this.buildCompositionRows();
    const hasRows = Array.isArray(rows) && rows.length > 0;

    // Compute badges only when rows exist
    const overShort = hasRows ? this.computeBadges(rows) : { over: 0, short: 0 };

    // Compute Y axis limits so small stacks (e.g. Personal Care & Wellness) are visible
    const stackedTotals = rows.map(r => (Number(r.onhand) || 0) + (Number(r.committed) || 0));
    const maxStack = stackedTotals.length ? Math.max(...stackedTotals) : 100;
    const yAxisMax = Math.max(10, Math.ceil(maxStack * 1.1)); // 10% headroom
    const yInterval = Math.max(1, Math.ceil(yAxisMax / 5));

    return (
      <div style={{ height: '100%', width: '100%', borderRadius: 10, padding: 8, display: 'flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box' }}>
        {hasRows && this.renderBadges(overShort.over, overShort.short)}
        <ChartComponent
          id="currentStockComposition"
          ref={this.mainRef}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
          primaryYAxis={{ labelFormat: '{value}', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0, maximum: yAxisMax, interval: yInterval }}
          tooltip={{ enable: true, shared: true }}
          legendSettings={{ visible: true }}
          pointClick={this.onMainChartPointClick}
          chartMouseClick={this.onMainChartMouseClick}
          load={onChartLoad}
        >
          <Inject services={[StackingColumnSeries, Legend, ChartTooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              type="StackingColumn"
              name="On hand"
              dataSource={rows}
              xName="x"
              yName="onhand"
              columnWidth={0.5}
              fill={COLOR_ONHAND}
              marker={{ dataLabel: { visible: true, position: 'Bottom', font: { fontWeight: 'Bold', size: '9px' } } }}
              emptyPointSettings={{ mode: 'Zero' }}
            />
            <SeriesDirective
              type="StackingColumn"
              name="Committed"
              dataSource={rows}
              xName="x"
              yName="committed"
              columnWidth={0.5}
              fill={COLOR_COMMITTED}
              marker={{ dataLabel: { visible: true, position: 'Bottom', font: { fontWeight: 'Bold', size: '9px' } } }}
              emptyPointSettings={{ mode: 'Zero' }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  private renderDrill(category: string) {
    const raw = this.coverStockoutsDrill(category) || [];

    // sanitize; keep only finite numbers
    const data = raw
      .map(r => ({
        m: String(r?.m ?? ''),
        stockouts: Math.round(Number.isFinite(+r?.stockouts) ? Math.max(0, +r.stockouts) : 0),
        coverDays: Math.round(Number.isFinite(+r?.coverDays) ? Math.max(0, +r.coverDays) : 0)
      }))
      .filter(r => r.m.length > 0);

    // Spline needs at least 2 valid, non-zero points
    const validSplinePts = data.filter(d => Number.isFinite(d.coverDays) && d.coverDays > 0);
    const canSpline = validSplinePts.length >= 2;

    return (
      <div style={{ height: '100%', width: '100%', borderRadius: 10, padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="e-btn e-outline" onClick={this.onBack}>Back</button>
          <div style={{ fontWeight: 600 }}>{category} • Cover vs Stockouts</div>
        </div>
        <ChartComponent
          key={`drill-${category}`}
          id="stockCoverDrill"
          ref={this.drillRef}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
          // integer ticks and labels
          primaryYAxis={{ title: 'Stockouts (units)', labelFormat: 'n0', minimum: 0, rangePadding: 'None', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }}
          axes={[{ name: 'coverAxis', opposedPosition: true, title: 'Cover (days)', minimum: 0, rangePadding: 'None', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } } as any]}
          tooltip={{ enable: true, shared: true }}
          legendSettings={{ visible: true }}
          load={onChartLoad}
        >
          <Inject services={[ColumnSeries, SplineSeries, Legend, ChartTooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Column"
              name="Stockouts"
              dataSource={data}
              xName="m"
              yName="stockouts"
              columnWidth={0.5}
              fill={COLOR_STOCKOUTS}
              marker={{ dataLabel: { visible: true, font: { fontWeight: 'Bold' } } }}
            />
            {canSpline && (
              <SeriesDirective
                type="Spline"
                name="Cover (days)"
                dataSource={data}
                xName="m"
                yName="coverDays"
                yAxisName="coverAxis"
                width={2}
                marker={{ visible: true, width: 7, height: 7 }}
                fill={COLOR_COVER}
              />
            )}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  render() {
    return this.state.drillCategory ? this.renderDrill(this.state.drillCategory) : this.renderMain();
  }
}

type ProductState = {
  year: number;
  monthIndex: number;
  categories: string[];
  brand: string;
  region: string;
  warehouse: string;
  productMixDrillCategory?: string | null;
};

type ProductProps = {
  year: number;
  monthIndex: number;
  region: string;
  categories: string[];
  brand: string;
  warehouse: string;
};


/* Lightweight placeholders (no hooks needed) */
class ProductClass extends React.Component<ProductProps, ProductState> {
  ProductRef = React.createRef<DashboardLayoutComponent>();
  private totalSalesSparkRef = React.createRef<SparklineComponent>();
  private lowStockSparkRef = React.createRef<SparklineComponent>();
  private turnoverSparkRef = React.createRef<SparklineComponent>();
  private categoryRevenueChartRef = React.createRef<ChartComponent>();
  private productMixApi?: { refreshProductMixDonut: () => void };
  private currentStockCompositionApi?: { refreshCurrentStockComposition: () => void };
  private topItemsGridRef = React.createRef<GridComponent>();
  private lowItemsGridRef = React.createRef<GridComponent>();
  state: ProductState = {
    year: this.props.year ?? 2025,
    monthIndex: this.props.monthIndex ?? ALL_MONTH,
    categories: Array.isArray(this.props.categories) ? this.props.categories : [],
    brand: this.props.brand ?? 'ALL',
    region: this.props.region ?? 'ALL',
    warehouse: this.props.warehouse ?? 'ALL',
    productMixDrillCategory: null
  };

  yearOptions = [2023, 2024, 2025];
  monthOptions = [{ text: 'All (Yearly)', value: ALL_MONTH }, ...months.map((m, idx) => ({ text: m, value: idx }))];

  ProductDashboardCreated = () => {
    setTimeout(() => {
      this.ProductRef.current?.refresh();
      refreshCommonSparks();
      this.totalSalesSparkRef.current?.refresh();
      this.lowStockSparkRef.current?.refresh();
      this.turnoverSparkRef.current?.refresh();
      this.categoryRevenueChartRef.current?.refresh();
      this.productMixApi?.refreshProductMixDonut();
      this.currentStockCompositionApi.refreshCurrentStockComposition();
      this.topItemsGridRef.current?.refresh();
      this.lowItemsGridRef.current?.refresh();
    }, 500);
  }

  componentDidMount() {
    window.addEventListener('sidebar-toggled', this.ProductDashboardCreated);
    window.addEventListener('resize', this.ProductDashboardCreated);
  }

  componentWillUnmount() {
    window.removeEventListener('sidebar-toggled', this.ProductDashboardCreated);
    window.removeEventListener('resize', this.ProductDashboardCreated);
  }

  componentDidUpdate(prevProps: ProductProps, prevState: ProductState) {
    const propsChanged =
      prevProps.year !== this.props.year ||
      prevProps.monthIndex !== this.props.monthIndex ||
      prevProps.region !== this.props.region ||
      prevProps.brand !== this.props.brand ||
      prevProps.warehouse !== this.props.warehouse ||
      !arrayEqual(prevProps.categories ?? [], this.props.categories ?? []);

    const stateOutOfSync =
      this.state.year !== this.props.year ||
      this.state.monthIndex !== this.props.monthIndex ||
      this.state.region !== this.props.region ||
      this.state.brand !== this.props.brand ||
      this.state.warehouse !== this.props.warehouse ||
      !arrayEqual(this.state.categories ?? [], this.props.categories ?? []);

    if (propsChanged && stateOutOfSync) {
      this.setState({
        year: this.props.year,
        monthIndex: this.props.monthIndex,
        region: this.props.region,
        brand: this.props.brand,
        warehouse: this.props.warehouse,
        categories: this.props.categories ?? []
      });
      return; // charts will refresh on the next pass below
    }

    // Existing refresh when local state changes
    const changed =
      prevState.year !== this.state.year ||
      prevState.monthIndex !== this.state.monthIndex ||
      prevState.categories !== this.state.categories ||
      prevState.brand !== this.state.brand ||
      prevState.region !== this.state.region ||
      prevState.warehouse !== this.state.warehouse;

    if (changed) {
      this.totalSalesSparkRef.current?.refresh();
      this.lowStockSparkRef.current?.refresh();
      this.turnoverSparkRef.current?.refresh();
      this.categoryRevenueChartRef.current?.refresh();
      this.productMixApi?.refreshProductMixDonut();
      this.currentStockCompositionApi?.refreshCurrentStockComposition();
      this.topItemsGridRef.current?.refresh();
      this.lowItemsGridRef.current?.refresh();
    }
  }

  private readonly TOP_ITEMS_COUNT = 10;
  private readonly LOW_PCT = 0.20;          // bottom 20% by revenue/units
  private readonly LOW_MARGIN_PCT = 0.10;   // <=10% margin considered weak

  // Helper: pick Top N dynamically so low grid has room after strong filters
  private getTopCount(total: number) {
    return Math.min(this.TOP_ITEMS_COUNT, Math.max(1, Math.floor(total * 0.6)));
  }

  // Aggregate metrics per product for current selection (Category/Brand/Warehouse/Region, Month)
  private aggregateProductMetricsForSelection() {
    type Row = {
      product: string;
      category: string;
      units: number;              // committed units (demand)
      revenue: number;
      margin: number;
      marginPct: number;
      committedUnits: number;     // alias of units but explicit
      onhandUnits: number;        // computed using supplyCoverByMonth per month
      shortageUnits: number;      // committed - onhand (>=0)
      overstockUnits: number;     // onhand - committed (>=0)
    };

    const isSingleMonth = this.props.monthIndex !== ALL_MONTH;
    const monthIdxs = isSingleMonth
      ? [Math.max(0, Math.min(11, this.props.monthIndex))]
      : Array.from({ length: 12 }, (_, i) => i);

    const year = this.props.year;
    const products = this.filteredProducts();

    const rows: Row[] = products.map((p) => {
      const price = this.getPrice(p.name);
      const mPct = ProductPricing[p.name]?.marginPct ?? 0.30;

      let units = 0;
      let onhandUnits = 0;
      for (const mi of monthIdxs) {
        // ALIGN: round per‑month committed before summing (prevents drift)
        const uRaw = Math.max(0, this.unitsForProductMonth(year, mi, p.name));
        const u = Math.round(uRaw);
        units += u;

        // ALIGN: on‑hand = committed * supplyCoverByMonth
        const coverRatio = supplyCoverByMonth[mi] ?? 1;
        onhandUnits += Math.round(u * Math.max(0, coverRatio));
      }

      const committedUnits = units;
      const revenue = committedUnits * price;
      const margin = committedUnits * price * mPct;
      const marginPct = revenue > 0 ? (margin / revenue) : mPct;

      const shortageUnits = Math.max(0, Math.round(committedUnits - onhandUnits));
      const overstockUnits = Math.max(0, Math.round(onhandUnits - committedUnits));

      return {
        product: p.name,
        category: p.category,
        units: Math.round(committedUnits),
        revenue: Math.round(revenue),
        margin: Math.round(margin),
        marginPct: +(marginPct || 0),
        committedUnits: Math.round(committedUnits),
        onhandUnits: Math.round(onhandUnits),
        shortageUnits,
        overstockUnits
      };
    });

    const filteredRows = rows.filter(r => (r.committedUnits || 0) > 0 || (r.revenue || 0) > 0);

    return filteredRows;
  }

  // ===== Formatting helpers =====
  private currency(v: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v || 0);
  }
  private currency2(v: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(isFinite(v) ? v : 0);
  }
  private integer(v: number) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(v || 0));
  }

  private compareLabel() {
    const py = this.props.year - 1;
    if (this.props.monthIndex === ALL_MONTH) {
      return `vs ${py >= 2022 ? py : '—'}`;
    }
    const i = Math.max(0, Math.min(11, this.props.monthIndex));
    return `vs ${months[i]} ${py >= 2022 ? py : '—'}`;
  }

  // ===== Filtered data helpers =====
  private isAllMonths = () => this.props.monthIndex === ALL_MONTH;

  private selectedMonthIdxs(): number[] {
    return this.isAllMonths()
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, this.props.monthIndex))];
  }

  private filteredProducts() {
    return mixedProducts.filter(p => {
      const cats = this.props.categories as any;
      const catOk = Array.isArray(cats)
        ? (cats.length === 0 || cats.includes('ALL') || cats.includes(p.category))
        : (cats === 'ALL' || p.category === cats);
      const brandOk = this.props.brand === 'ALL' || p.brand === this.props.brand;
      const whOk = this.props.warehouse === 'ALL' || p.warehouse === this.props.warehouse;
      return catOk && brandOk && whOk;
    });
  }

  private regionFactor(year: number, monthIdx: number): number {
    const r = this.props.region;
    if (r === 'ALL') return 1;
    if (!isRegionKey(r)) return 1;
    const regions = buildRegionMonthlyByYear(year)[monthIdx];
    if (!regions) return 1;
    const sum = (regions.AsiaPacific ?? 0) + (regions.Europe ?? 0) + (regions.NorthAmerica ?? 0) + (regions.LatinAmerica ?? 0) + (regions.MiddleEastAfrica ?? 0);
    const part = (regions as any)[r] ?? 0;
    return sum > 0 ? (part / sum) : 1;
  }

  private unitsForProductMonth(year: number, monthIdx: number, productName: string): number {
    const prods = buildYearProductSales(year);
    const row = prods.find(p => p.name === productName);
    const baseUnits = Math.max(0, row?.monthly?.[monthIdx] ?? 0);
    const rf = this.regionFactor(year, monthIdx);
    return baseUnits * rf;
  }

  private monthMetrics(year: number, monthIdx: number) {
    const list = this.filteredProducts();
    let units = 0;
    let sales = 0;
    let onhand = 0; // estimate for turnover
    let lowSet = new Set<string>();

    for (const p of list) {
      const u = this.unitsForProductMonth(year, monthIdx, p.name);
      const price = ProductPricing[p.name]?.price ?? 50;
      units += u;
      sales += u * price;
      const cov = monthCoverage[monthIdx] ?? 1.3;
      onhand += u * cov;

      const st = computeStockStatus(Math.round(u), monthIdx);
      if (st === 'Low' || st === 'Out of Stock') {
        lowSet.add(p.name);
      }
    }
    return { units, sales, onhand, lowCount: lowSet.size };
  }

  private rangeMetrics(year: number, idxs: number[]) {
    let totalUnits = 0;
    let totalSales = 0;
    let onhandSum = 0;
    const lowProducts = new Set<string>();

    const list = this.filteredProducts();

    for (const i of idxs) {
      const rf = this.regionFactor(year, i);
      for (const p of list) {
        const row = buildYearProductSales(year).find(x => x.name === p.name);
        const u = Math.max(0, row?.monthly?.[i] ?? 0) * rf;
        const price = ProductPricing[p.name]?.price ?? 50;
        totalUnits += u;
        totalSales += u * price;
        const cov = monthCoverage[i] ?? 1.3;
        onhandSum += u * cov;

        const st = computeStockStatus(Math.round(u), i);
        if (st === 'Low' || st === 'Out of Stock') lowProducts.add(p.name);
      }
    }
    const avgOnhand = idxs.length > 0 ? (onhandSum / idxs.length) : 0;
    const turnover = avgOnhand > 0 ? (totalUnits / avgOnhand) : null;

    return {
      totalUnits,
      totalSales,
      asp: totalUnits > 0 ? (totalSales / totalUnits) : 0,
      lowCount: lowProducts.size,
      turnover
    };
  }

  private prevRangeMetrics(): ReturnType<ProductClass['rangeMetrics']> | null {
    const py = this.props.year - 1;
    if (py < 2022) return null;
    const idxs = this.selectedMonthIdxs();
    return this.rangeMetrics(py, idxs);
  }

  // ===== Sparks (12 months of selected year) =====
  private sparkTotalSales(year: number) {
    return months.map((m, i) => ({ x: m, y: Math.round(this.monthMetrics(year, i).sales) }));
  }

  // ===== KPI tiles (now using renderKpiCard) =====
  private totalSalesContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs();
    const cur = this.rangeMetrics(y, idxs);
    const prev = this.prevRangeMetrics();
    const delta = (prev && prev.totalSales > 0) ? ((cur.totalSales - prev.totalSales) / prev.totalSales) * 100 : null;
    const tone: KpiTone = delta == null ? 'neutral' : delta > 0 ? 'good' : 'bad';
    const badgeText = delta == null ? '—' : `${delta > 0 ? '+' : ''}${delta.toFixed(1)}% ${this.compareLabel()}`;

    const spark = this.sparkTotalSales(y);

    return renderCommonKpiTile({
      label: 'Total Sales',
      valueText: cardformatCurrency(cur.totalSales),
      badge: { text: badgeText, tone },
      sparkData: spark,
      sparkColor: '#850E35',
      sparkId: `kpi-total-sales-${y}-${idxs.join('_')}`,
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private unitSoldContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs();
    const cur = this.rangeMetrics(y, idxs);
    const prev = this.prevRangeMetrics();

    const current = Math.round(cur.totalUnits);
    const previous = prev ? Math.round(prev.totalUnits) : null;
    const deltaPct = previous && previous > 0 ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${this.compareLabel()}`;

    return renderCommonKpiTile({
      label: 'Units Sold',
      valueText: this.integer(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private aspContent = () => {
    const y = this.props.year;
    const idxs = this.selectedMonthIdxs();
    const cur = this.rangeMetrics(y, idxs);
    const prev = this.prevRangeMetrics();

    const current = cur.asp || 0;
    const previous = prev?.asp ?? null;
    const deltaPct = previous && previous > 0 ? ((current - previous) / previous) * 100 : null;
    const tone: KpiTone = deltaPct == null ? 'neutral' : deltaPct > 0 ? 'good' : 'bad';
    const badgeText = deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% ${this.compareLabel()}`;

    return renderCommonKpiTile({
      label: 'Average Selling Price',
      valueText: this.currency2(current),
      badge: { text: badgeText, tone },
      isMonthSelected: this.props.monthIndex !== ALL_MONTH
    });
  };

  private getPrice(name: string) {
    return ProductPricing[name]?.price ?? 50;
  }

  // Active categories for the chart based on the Category filter and filtered product list
  private getActiveCategoriesForTrend(): string[] {
    const list = this.filteredProducts();
    const present = Array.from(new Set(list.map(p => p.category))).sort();
    const cats: any = this.props.categories;

    if (Array.isArray(cats)) {
      // no selection or explicit 'ALL' in array => return all present categories
      if (cats.length === 0 || cats.includes('ALL')) return present;
      // return intersection of selected categories and present categories
      return present.filter(c => cats.includes(c));
    }

    // fallback for string value (e.g. 'ALL' or single category)
    if (cats === 'ALL') return present;
    return present.includes(String(cats)) ? [String(cats)] : [];
  }

  // Build a rolling window of (year, monthIdx, label) for month view (previous two months + selected)
  private buildRollingWindow(year: number, monthIndex: number, windowSize: number = 3) {
    const out: Array<{ year: number; monthIdx: number; label: string }> = [];
    const DATA_FLOOR_YEAR = 2022;
    for (let back = windowSize - 1; back >= 0; back--) {
      let y = year;
      let m = monthIndex - back;
      while (m < 0) { y -= 1; m += 12; }
      if (y < DATA_FLOOR_YEAR) continue;
      const monthIdx = Math.max(0, Math.min(11, m));
      out.push({ year: y, monthIdx, label: `${months[monthIdx]} ${y}` });
    }
    if (out.length === 0) {
      // fallback to the single selected month
      out.push({ year, monthIdx: Math.max(0, Math.min(11, monthIndex)), label: `${months[Math.max(0, Math.min(11, monthIndex))]} ${year}` });
    }
    return out;
  }

  // Build revenue by category series points for the selected year and month scope
  private buildCategoryRevenueSeries(): { name: string; data: { x: string; y: number }[] }[] {
    const { year, monthIndex } = this.props;
    const cats = this.getActiveCategoriesForTrend();
    if (cats.length === 0) return [];

    // months to produce: full year (12 months) OR rolling 3-month window ending at selected month
    const monthWindows = (monthIndex === ALL_MONTH)
      ? Array.from({ length: 12 }, (_, i) => ({ year, monthIdx: i, label: months[i] }))
      : this.buildRollingWindow(year, monthIndex, 3);

    // Filtered products (Category, Brand, Warehouse)
    const list = this.filteredProducts();

    // Build per-category series
    const series = cats.map(cat => {
      const catProducts = list.filter(p => p.category === cat);

      const points = monthWindows.map(mw => {
        let rev = 0;
        for (const p of catProducts) {
          const units = this.unitsForProductMonth(mw.year, mw.monthIdx, p.name); // includes Region factor
          rev += Math.max(0, units) * this.getPrice(p.name);
        }
        return { x: mw.label, y: Math.round(rev) };
      });

      return { name: cat, data: points };
    });

    return series;
  }

  private categorySalesTrendAxisLabelRender = (args: any) => {
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  // ===== Category Sales Trend (redesigned: yearly = line, month = 3‑point comparison line) =====
  private categorySalesTrendContent = () => {
    // Build series from current filters (yearly or 3‑month rolling window)
    const isYearly = this.props.monthIndex === ALL_MONTH;
    const series = this.buildCategoryRevenueSeries();

    // Dominant series that usually dwarfs others
    const DOMINANT = 'Technology & Gadgets';
    const hasDominant = series.some(s => s.name === DOMINANT);
    const useSplitAxis = hasDominant && series.length > 1;

    // Helpers to compute axis maxima with headroom
    const maxY = (data: { y: number }[]) => Math.max(0, ...data.map(p => Number(p.y) || 0));
    const roundUp = (v: number) => {
      const x = Math.ceil((v * 1.15) / 10000) * 10000; // 15% headroom, round to 10k
      return Math.max(10000, x || 10000);
    };

    // Left (others) and right (dominant) axis ranges
    let leftMax = 0, rightMax = 0;
    if (useSplitAxis) {
      rightMax = roundUp(maxY(series.find(s => s.name === DOMINANT)!.data));
      leftMax = roundUp(
        Math.max(
          0,
          ...series
            .filter(s => s.name !== DOMINANT)
            .map(s => maxY(s.data))
        )
      );
    } else {
      // Single axis (either only one series or no dominant)
      leftMax = roundUp(Math.max(0, ...series.map(s => maxY(s.data))));
    }
    const title = 'Category Sales Trend';
    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <div style={{ height: "calc(100% - 30px)", width: '100%' }}>
          <ChartComponent
            ref={this.categoryRevenueChartRef}
            id="categorySalesTrendChart"
            chartArea={{ border: { width: 0 } }}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }}
            primaryYAxis={{
              ...formatCurrencyAxis,
              title: useSplitAxis ? 'Sales (Others)' : 'Sales',
              maximum: leftMax
            }}
            axes={
              useSplitAxis
                ? [{
                  name: 'domAxis',
                  opposedPosition: true,
                  title: `Sales (${DOMINANT})`,
                  labelFormat: 'c0',
                  maximum: rightMax,
                  lineStyle: { width: 0 },
                  majorTickLines: { width: 0 },
                  majorGridLines: { width: 0 }
                } as any]
                : []
            }
            tooltip={{ enable: true }}
            legendSettings={{ visible: true, toggleVisibility: true }}
            highlightMode="Series"
            axisLabelRender={this.categorySalesTrendAxisLabelRender}
            tooltipRender={onCurrencyTooltip}
            load={onChartLoad}
          >
            <Inject services={[LineSeries, Legend, ChartTooltip, Category, Highlight]} />
            <SeriesCollectionDirective>
              {series.map(s => {
                const isDom = useSplitAxis && s.name === DOMINANT;
                return (
                  <SeriesDirective
                    key={s.name}
                    type="Line"
                    name={s.name}
                    xName="x"
                    yName="y"
                    dataSource={s.data}
                    width={isDom ? 3 : 2}
                    marker={{
                      visible: true,
                      width: isDom ? 9 : 7,
                      height: isDom ? 9 : 7,
                      border: { width: 2, color: getCategoryColor(s.name) }
                    }}
                    yAxisName={isDom ? 'domAxis' : undefined}
                    fill={getCategoryColor(s.name)}
                    animation={{ enable: false }}
                  />
                );
              })}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  };

  private headerWithTooltip = (label: string, tip: string) => {
    return () => (<div title={tip} style={{ display: 'inline-block', cursor: 'default' }}>{label}</div>);
  };

  private topPerformingItemsContent = () => {
    const isSingleMonth = this.props.monthIndex !== ALL_MONTH;
    const monthIdxs = isSingleMonth
      ? [Math.max(0, Math.min(11, this.props.monthIndex))]
      : Array.from({ length: 12 }, (_, i) => i);
    const year = this.props.year;

    // Purely inventory-based aggregation
    const full = this.aggregateProductMetricsForSelection()
      .sort((a, b) => {
        // Sort by absolute shortage desc, then shortage ratio desc, then committed desc
        const aRatio = (a.shortageUnits || 0) / Math.max(1, a.committedUnits || 0);
        const bRatio = (b.shortageUnits || 0) / Math.max(1, b.committedUnits || 0);
        return (b.shortageUnits - a.shortageUnits) ||
          (bRatio - aRatio) ||
          ((b.committedUnits || 0) - (a.committedUnits || 0));
      });

    const topCount = this.getTopCount(full.length);
    const agg = full.slice(0, topCount);

    if (agg.length === 0) {
      return (
        <div style={{ padding: 12, background: '#fff', borderRadius: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Top Performing Items</div>
          <div style={{ marginTop: 12, color: '#6b7280' }}>No products match the selected filters.</div>
        </div>
      );
    }

    const parentRows = agg.map(r => {
      const shortagePct = (r.shortageUnits || 0) / Math.max(1, r.committedUnits || 0);
      const overstockPct = (r.overstockUnits || 0) / Math.max(1, r.committedUnits || 0);
      return {
        product: r.product,
        category: r.category,
        committed: r.committedUnits,
        onhand: r.onhandUnits,
        shortage: r.shortageUnits,
        overstock: r.overstockUnits,
        shortagePct,
        overstockPct
      };
    });

    // Child rows: monthly breakdown (inventory only)
    const childRows: any[] = [];
    for (const r of agg) {
      if (isSingleMonth) {
        const mi = monthIdxs[0];
        const committed = Math.max(0, Math.round(this.unitsForProductMonth(year, mi, r.product)));
        const coverRatio = supplyCoverByMonth[mi] ?? 1;
        const onhand = Math.max(0, Math.round(committed * Math.max(0, coverRatio)));
        const shortage = Math.max(0, committed - onhand);
        const overstock = Math.max(0, onhand - committed);
        childRows.push({
          product: r.product,
          month: months[mi],
          committed,
          onhand,
          shortage,
          overstock
        });
      } else {
        for (let mi = 0; mi < 12; mi++) {
          const committed = Math.max(0, Math.round(this.unitsForProductMonth(year, mi, r.product)));
          const coverRatio = supplyCoverByMonth[mi] ?? 1;
          const onhand = Math.max(0, Math.round(committed * Math.max(0, coverRatio)));
          const shortage = Math.max(0, committed - onhand);
          const overstock = Math.max(0, onhand - committed);
          childRows.push({
            product: r.product,
            month: months[mi],
            committed,
            onhand,
            shortage,
            overstock
          });
        }
      }
    }

    const childGridModel: any = {
      dataSource: childRows,
      queryString: 'product',
      gridLines: 'Horizontal',
      columns: [
        { field: 'month', headerText: 'Month', width: 100, textAlign: 'Left' },
        { field: 'committed', headerText: 'Committed', width: 110, textAlign: 'Right', format: 'N0' },
        { field: 'onhand', headerText: 'On-hand', width: 110, textAlign: 'Right', format: 'N0' },
        { field: 'shortage', headerText: 'Shortage', width: 110, textAlign: 'Right', format: 'N0' },
        { field: 'overstock', headerText: 'Overstock', width: 110, textAlign: 'Right', format: 'N0' }
      ]
    };

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ minHeight: 0, flex: 1 }}>
          <GridComponent
            id="productTopItemsGrid"
            ref={this.topItemsGridRef}
            dataSource={parentRows}
            allowSorting={true}
            allowPaging={false}
            allowResizing={true}
            gridLines="Horizontal"
            height="100%"
            childGrid={childGridModel}
            sortSettings={{ columns: [{ field: 'shortage', direction: 'Descending' }] }}
          >
            <ColumnsDirective>
              <ColumnDirective field="product" headerTemplate={this.headerWithTooltip('Product', 'Click to expand for monthly breakdown')} width="200" textAlign="Left" isPrimaryKey={true} />
              <ColumnDirective field="category" headerTemplate={this.headerWithTooltip('Category', 'Product category')} width="170" textAlign="Left" />
              <ColumnDirective field="committed" headerTemplate={this.headerWithTooltip('Committed', 'Committed (demand) units')} width="100" textAlign="Right" format="N0" />
              <ColumnDirective field="onhand" headerTemplate={this.headerWithTooltip('On-hand', 'Estimated on‑hand units (supply cover applied)')} width="110" textAlign="Right" format="N0" />
              <ColumnDirective field="shortage" headerTemplate={this.headerWithTooltip('Shortage', 'Units short vs on‑hand')} width="110" textAlign="Right" format="N0" />
              <ColumnDirective field="shortagePct" headerTemplate={this.headerWithTooltip('Shortage %', 'Shortage as percentage of committed units')} width="100" textAlign="Right" format="P1" />
              <ColumnDirective field="overstock" headerTemplate={this.headerWithTooltip('Overstock', 'Excess on‑hand units')} width="90" textAlign="Right" format="N0" />
              <ColumnDirective field="overstockPct" headerTemplate={this.headerWithTooltip('Overstock %', 'Overstock as percentage of committed units')} width="105" textAlign="Right" format="P1" />
            </ColumnsDirective>
            <GridInject services={[DetailRow, Toolbar, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  };

  private lowPerformingItemsContent = () => {
    // Base data (inventory only)
    const agg = this.aggregateProductMetricsForSelection();

    if (agg.length === 0) {
      return (
        <div style={{ padding: 12, background: '#fff', borderRadius: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Low Performing Items</div>
          <div style={{ marginTop: 12, color: '#6b7280' }}>No products match the selected filters.</div>
        </div>
      );
    }

    // Exclude items already in "Top" (by shortage)
    const sortedByShortage = [...agg].sort((a, b) => {
      const aRatio = (a.shortageUnits || 0) / Math.max(1, a.committedUnits || 0);
      const bRatio = (b.shortageUnits || 0) / Math.max(1, b.committedUnits || 0);
      return (b.shortageUnits - a.shortageUnits) || (bRatio - aRatio) || ((b.committedUnits || 0) - (a.committedUnits || 0));
    });
    const topCount = this.getTopCount(sortedByShortage.length);
    const topShortageSet = new Set(sortedByShortage.slice(0, topCount).map(r => r.product));

    // Low performers by Overstock (absolute), then overstock ratio desc, then committed asc
    const low = agg
      .filter(r => !topShortageSet.has(r.product))
      .sort((a, b) => {
        const aRatio = (a.overstockUnits || 0) / Math.max(1, a.committedUnits || 0);
        const bRatio = (b.overstockUnits || 0) / Math.max(1, b.committedUnits || 0);
        return (b.overstockUnits - a.overstockUnits) ||
          (bRatio - aRatio) ||
          ((a.committedUnits || 0) - (b.committedUnits || 0));
      })
      .slice(0, this.TOP_ITEMS_COUNT);

    if (low.length === 0) {
      return (
        <div style={{ padding: 12, background: '#fff', borderRadius: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Low Performing Items</div>
          <div style={{ marginTop: 12, color: '#6b7280' }}>No low-performing products for the selected period.</div>
        </div>
      );
    }

    const rows = low.map(r => {
      const overstockPct = (r.overstockUnits || 0) / Math.max(1, r.committedUnits || 0);
      const shortagePct = (r.shortageUnits || 0) / Math.max(1, r.committedUnits || 0);
      return {
        product: r.product,
        category: r.category,
        committed: r.committedUnits,
        onhand: r.onhandUnits,
        overstock: r.overstockUnits,
        overstockPct,
        shortage: r.shortageUnits,
        shortagePct
      };
    });

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, minHeight: 0 }}>
          <GridComponent
            id="lowPerformingItemsGrid"
            ref={this.lowItemsGridRef}
            dataSource={rows}
            allowPaging={false}
            allowSorting={true}
            allowResizing={true}
            height="100%"
            sortSettings={{ columns: [{ field: 'overstock', direction: 'Descending' }] }}
          >
            <ColumnsDirective>
              <ColumnDirective field="product" headerTemplate={this.headerWithTooltip('Product', 'Product name')} width="170" textAlign="Left" isPrimaryKey={true} />
              <ColumnDirective field="category" headerTemplate={this.headerWithTooltip('Category', 'Product category')} width="180" textAlign="Left" />
              <ColumnDirective field="committed" headerTemplate={this.headerWithTooltip('Committed', 'Committed (demand) units')} width="100" textAlign="Right" format="N0" />
              <ColumnDirective field="onhand" headerTemplate={this.headerWithTooltip('On-hand', 'Estimated on‑hand units (supply cover applied)')} width="110" textAlign="Right" format="N0" />
              <ColumnDirective field="overstock" headerTemplate={this.headerWithTooltip('Overstock', 'Excess on‑hand units')} width="110" textAlign="Right" format="N0" />
              <ColumnDirective field="overstockPct" headerTemplate={this.headerWithTooltip('Overstock %', 'Overstock as percentage of committed units')} width="110" textAlign="Right" format="P1" />
              <ColumnDirective field="shortage" headerTemplate={this.headerWithTooltip('Shortage', 'Units short vs on‑hand')} width="100" textAlign="Right" format="N0" />
              <ColumnDirective field="shortagePct" headerTemplate={this.headerWithTooltip('Shortage %', 'Shortage as percentage of committed units')} width="110" textAlign="Right" format="P1" />
            </ColumnsDirective>
            <GridInject services={[Toolbar, Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="Container">
        <div className="sidebar-content">
          <DashboardLayoutComponent
            ref={this.ProductRef}
            id="ecommerce_marketing_product_dashboard"
            columns={8}
            cellAspectRatio={1}
            cellSpacing={[12, 12]}
            allowResizing={false}
            allowDragging={false}
            created={this.ProductDashboardCreated}
            mediaQuery="(max-width:950px)"
          >
            <PanelsDirective>
              <PanelDirective
                row={0}
                col={0}
                sizeX={4}
                sizeY={1}
                content={() => this.totalSalesContent()}
              />
              <PanelDirective
                row={0}
                col={4}
                sizeX={2}
                sizeY={1}
                content={() => this.unitSoldContent()}
              />
              <PanelDirective
                row={0}
                col={6}
                sizeX={2}
                sizeY={1}
                content={() => this.aspContent()}
              />
              <PanelDirective
                row={1}
                col={0}
                sizeX={8}
                sizeY={3}
                header="<div>Category Sales Trend</div>"
                content={() => this.categorySalesTrendContent()}
              />
              <PanelDirective
                row={4}
                col={0}
                sizeX={8}
                sizeY={3}
                header="<div>Product Mix Breakdown</div>"
                content={() => (
                  <ProductMixPanel
                    year={this.props.year}
                    monthIndex={this.props.monthIndex}
                    categories={this.props.categories}
                    brand={this.props.brand}
                    region={this.props.region}
                    warehouse={this.props.warehouse}
                    onReady={(api) => { this.productMixApi = api; }}
                  />
                )}
              />
              <PanelDirective
                row={7}
                col={0}
                sizeX={8}
                sizeY={3}
                header="<div>Current Stock Composition</div>"
                content={() => (
                  <StockCompositionPanel
                    year={this.props.year}
                    monthIndex={this.props.monthIndex}
                    categories={this.props.categories}
                    brand={this.props.brand}
                    region={this.props.region}
                    warehouse={this.props.warehouse}
                    onReady={(api) => { this.currentStockCompositionApi = api }}
                  />
                )}
              />
              <PanelDirective
                row={10}
                col={0}
                sizeX={8}
                sizeY={5}
                header="<div>Top Performing Items</div>"
                content={() => this.topPerformingItemsContent()}
              />
              <PanelDirective
                row={15}
                col={0}
                sizeX={8}
                sizeY={4}
                header="<div>Low Performing Items</div>"
                content={() => this.lowPerformingItemsContent()}
              />
            </PanelsDirective>
          </DashboardLayoutComponent>
        </div>
      </div>
    );
  }
}

type ForecastState = {
  includeSeasonality: boolean;
  includeCampaigns: boolean;
};

type ForecastProps = {
  year: number;
  monthIndex: number;
  region: string;        // 'ALL' | RegionKey
  channels: string[];    // selected channels
  scenario: ScenarioKey;
};

// ===== Campaign typing (TOP-LEVEL) =====
export const CAMPAIGN_KEYS = [
  'brandAwareness',
  'performance',
  'retargeting',
  'acquisition',
  'loyalty'
] as const;

export type CampaignKey = typeof CAMPAIGN_KEYS[number];

export const CAMPAIGN_LABEL: Record<CampaignKey, string> = {
  brandAwareness: 'Awareness Campaigns',
  performance: 'Performance Campaigns',
  retargeting: 'Retargeting Campaigns',
  acquisition: 'Acquisition Campaigns',
  loyalty: 'Loyalty Campaigns'
};

class ForecastClass extends React.Component<ForecastProps, ForecastState> {
  // Layout & chart refs
  private ForecastRef = React.createRef<DashboardLayoutComponent>();
  private revenueWaterfallRef = React.createRef<ChartComponent>();
  private scenarioSplineRangeAreaRef = React.createRef<ChartComponent>();
  private channelHeatmapRef = React.createRef<HeatMapComponent>();

  state: ForecastState = {
    includeSeasonality: true,
    includeCampaigns: true
  };

  /* --------- Lifecycle --------- */
  ForecastDashboardCreated = () => {
    setTimeout(() => {
      this.ForecastRef.current?.refresh();
      refreshCommonSparks();
      this.revenueWaterfallRef.current?.refresh();
      this.scenarioSplineRangeAreaRef.current?.refresh();
      this.channelHeatmapRef.current?.refresh();
    }, 500);
  };

  componentDidMount() {
    window.addEventListener('sidebar-toggled', this.ForecastDashboardCreated);
    window.addEventListener('resize', this.ForecastDashboardCreated);
  }

  componentWillUnmount() {
    window.removeEventListener('sidebar-toggled', this.ForecastDashboardCreated);
    window.removeEventListener('resize', this.ForecastDashboardCreated);
  }

  componentDidUpdate(prevProps: ForecastProps) {
    const changed =
      prevProps.year !== this.props.year ||
      prevProps.monthIndex !== this.props.monthIndex ||
      prevProps.scenario !== this.props.scenario ||
      prevProps.region !== this.props.region ||
      !arrayEqual(prevProps.channels, this.props.channels);

    if (changed) {
      //this.ForecastRef.current?.refresh();
      this.revenueWaterfallRef.current?.refresh();
      this.scenarioSplineRangeAreaRef.current?.refresh();
      this.channelHeatmapRef.current?.refresh();
    }
  }

  /* --------- Formatting helpers --------- */
  private clamp = (v: number, min = -1e15, max = 1e15) => Math.max(min, Math.min(max, v));

  /* --------- Scenario & growth assumptions (Revenue model) --------- */
  private readonly ScenarioAssumptions: Record<ScenarioKey, {
    growthMultiplier: number;
    campaignMultiplier: number;
    channelMultiplier: number;
  }> = {
      // Keep Baseline neutral
      Baseline: { growthMultiplier: 1.00, campaignMultiplier: 1.00, channelMultiplier: 1.00 },
      // Soften multipliers (we'll add an explicit absolute delta below for ~25k gap)
      Optimistic: { growthMultiplier: 1.02, campaignMultiplier: 1.05, channelMultiplier: 1.04 },
      Conservative: { growthMultiplier: 0.98, campaignMultiplier: 0.95, channelMultiplier: 0.96 }
    };

  private readonly ForecastGrowth: Record<number, number> = { 2026: 1.12, 2027: 1.15 };

  private readonly ScenarioAbsoluteDelta: Record<ScenarioKey, number> = {
    Baseline: 0,
    Optimistic: 25000,
    Conservative: -25000
  };

  /* --------- Scenario assumptions (Funnel model) --------- */
  private readonly FunnelScenario: Record<ScenarioKey, {
    visitsLift: number;     // traffic lift
    convLift: number;       // overall conversion lift (applies across stages, then normalized)
  }> = {
      Baseline: { visitsLift: 1.00, convLift: 1.00 },
      Optimistic: { visitsLift: 1.08, convLift: 1.04 },
      Conservative: { visitsLift: 0.96, convLift: 0.96 }
    };

  /* --------- Seasonality (from 2022–2025 actuals) --------- */
  private static _seasonalityCache?: number[];

  private static computeSeasonalityIndex(): number[] {
    const years = [2022, 2023, 2024, 2025]; // present in your dataset
    const totals = Array(12).fill(0);
    let n = 0;

    for (const yr of years) {
      const rows = monthlyRevenueByYear[yr] ?? [];
      if (!rows || rows.length < 12) continue;
      for (let i = 0; i < 12; i++) totals[i] += rows[i]?.actual ?? 0;
      n++;
    }
    const avg = totals.map(t => (n > 0 ? t / n : 0));
    const yearAvg = avg.reduce((s, v) => s + v, 0) / (avg.length || 1);
    if (yearAvg <= 0) return Array(12).fill(1);
    return avg.map(v => (v / yearAvg) || 1);
  }

  private static getSeasonalityIndex(): number[] {
    if (!this._seasonalityCache) {
      this._seasonalityCache = ForecastClass.computeSeasonalityIndex();
    }
    return this._seasonalityCache;
  }

  private avgActualForMonthOverHistory(monthIndex: number): number {
    let sum = 0, cnt = 0;
    for (const yr of [2022, 2023, 2024, 2025]) {
      const r = (monthlyRevenueByYear[yr] ?? [])[monthIndex];
      if (r?.actual != null) { sum += r.actual; cnt++; }
    }
    return cnt > 0 ? sum / cnt : 0;
  }

  private avgMonthlyActualForYear(year: number): number {
    const rows = monthlyRevenueByYear[year] ?? [];
    if (!rows.length) return 0;
    const total = rows.reduce((s, r) => s + (r?.actual ?? 0), 0);
    return total / Math.max(rows.length, 1);
  }

  private avgPromoShareForMonth(monthIndex: number): number {
    let promo = 0, total = 0;
    for (const yr of [2022, 2023, 2024, 2025]) {
      const row = (buildPromoNonPromoNetSales(yr) ?? [])[monthIndex];
      if (!row) continue;
      promo += row.promo ?? 0;
      total += (row.promo ?? 0) + (row.nonPromo ?? 0);
    }
    return total > 0 ? promo / total : NaN;
  }

  private avgPaidShareForMonth(monthIndex: number): number {
    let paid = 0, total = 0;
    for (const yr of [2022, 2023, 2024, 2025]) {
      const o = (buildOrdersByChannelYear(yr) ?? [])[monthIndex];
      if (!o) continue;
      paid += o.Paid ?? 0;
      total += (o.Paid ?? 0) + (o.Organic ?? 0) + (o.Email ?? 0) + (o.Social ?? 0);
    }
    return total > 0 ? paid / total : NaN;
  }

  private getLastYearActual(year: number, monthIndex: number): number {
    const prev = year - 1;
    const prevRow = (monthlyRevenueByYear[prev] ?? [])[monthIndex];
    if (prevRow?.actual && prevRow.actual > 0) return prevRow.actual;

    const histAvg = this.avgActualForMonthOverHistory(monthIndex);
    if (histAvg > 0) return histAvg;

    const prevYearAvgMonth = this.avgMonthlyActualForYear(prev);
    const floor = Math.max(prevYearAvgMonth * 0.5, 10_000); // tune as needed
    return floor;
  }

  private campaignImpact(base: number, year: number, monthIndex: number, scenario: ScenarioKey): number {
    const prev = year - 1;
    const row = (buildPromoNonPromoNetSales(prev) ?? [])[monthIndex];
    const promo = row?.promo ?? 0;
    const nonPromo = row?.nonPromo ?? 0;
    let promoShare = (promo + nonPromo) > 0 ? (promo / (promo + nonPromo)) : NaN;

    if (!isFinite(promoShare)) promoShare = this.avgPromoShareForMonth(monthIndex);
    if (!isFinite(promoShare)) promoShare = 0.25;

    const baseImpact = base * (promoShare * 0.05);
    return baseImpact * this.ScenarioAssumptions[scenario].campaignMultiplier;
  }

  private channelImpact(base: number, year: number, monthIndex: number, scenario: ScenarioKey): number {
    const prev = year - 1;
    const o = (buildOrdersByChannelYear(prev) ?? [])[monthIndex];
    const paid = o?.Paid ?? 0, org = o?.Organic ?? 0, em = o?.Email ?? 0, so = o?.Social ?? 0;
    const tot = paid + org + em + so;
    let paidShare = tot > 0 ? (paid / tot) : NaN;

    if (!isFinite(paidShare)) paidShare = this.avgPaidShareForMonth(monthIndex);
    if (!isFinite(paidShare)) paidShare = 0.30;

    const baseImpact = base * (paidShare * 0.04);
    return baseImpact * this.ScenarioAssumptions[scenario].channelMultiplier;
  }

  private buildMonthComponents(year: number, monthIndex: number, scenario: ScenarioKey) {
    const seasonIdx = ForecastClass.getSeasonalityIndex()[monthIndex] ?? 1;
    const lastYearActual = this.getLastYearActual(year, monthIndex);
    const growthBase = (this.ForecastGrowth[year] ?? 1) * lastYearActual;

    const rawGrowth = growthBase * (this.ScenarioAssumptions[scenario].growthMultiplier - 1);
    const rawSeasonality = growthBase * (seasonIdx - 1);
    const rawCampaigns = this.campaignImpact(growthBase, year, monthIndex, scenario);
    const rawChannels = this.channelImpact(growthBase, year, monthIndex, scenario);

    const targetFinal = growthBase + rawGrowth + rawSeasonality + rawCampaigns + rawChannels;

    const base = Math.max(growthBase, 1);
    const minComp = Math.max(base * 0.005, 1000);

    const applyFloor = (v: number) => {
      if (v === 0) return minComp;
      if (v > 0) return Math.max(v, minComp);
      return Math.min(v, -minComp);
    };

    let growth = applyFloor(rawGrowth);
    let seasonality = applyFloor(rawSeasonality);
    let campaigns = applyFloor(rawCampaigns);
    let channels = applyFloor(rawChannels);

    const compSum = growth + seasonality + campaigns + channels;
    let final = base + compSum;

    const delta = targetFinal - final;
    if (isFinite(delta) && Math.abs(delta) > 1e-6) {
      const weights = [Math.abs(growth), Math.abs(seasonality), Math.abs(campaigns), Math.abs(channels)];
      const wSum = weights.reduce((s, v) => s + v, 0) || 1;
      growth += delta * (weights[0] / wSum);
      seasonality += delta * (weights[1] / wSum);
      campaigns += delta * (weights[2] / wSum);
      channels += delta * (weights[3] / wSum);
      final = base + growth + seasonality + campaigns + channels;
    }

    return {
      base: this.clamp(base),
      growth: this.clamp(growth),
      seasonality: this.clamp(seasonality),
      campaigns: this.clamp(campaigns),
      channels: this.clamp(channels),
      final: this.clamp(final)
    };
  }

  /* ===========================
     Conversion Funnel (Pyramid)
     =========================== */

  // compute selection factor (region+channels) for a given month/year
  private computeSelectionOrderFactor(year: number, monthIdx: number) {
    // denom = total orders across all regions & channels for that year/month
    let denom = 0;
    const allRegions: RegionKey[] = ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    for (const r of allRegions) {
      const row = buildChannelsByRegionYear(year, r)[monthIdx];
      if (!row) continue;
      denom += (row.Paid ?? 0) + (row.Organic ?? 0) + (row.Email ?? 0) + (row.Social ?? 0);
    }
    if (denom <= 0) return 1;

    // numerator: orders for included regions & included channels (from App props)
    const includedRegions = (this.props && this.props.region === 'ALL') ? allRegions
      : (isRegionKey(this.props?.region ?? '') ? [this.props.region as RegionKey] : allRegions);

    const selectedChannels = asChannelKeys(this.props?.channels ?? []);
    const channels = selectedChannels.length ? selectedChannels : ALL_CHANNELS;

    let numer = 0;
    for (const r of includedRegions) {
      const row = buildChannelsByRegionYear(year, r)[monthIdx];
      if (!row) continue;
      for (const ch of channels) numer += (row as any)[ch] ?? 0;
    }

    return denom > 0 ? (numer / denom) : 1;
  }

  // sum components consistently (respect panel toggles)
  private sumComponentsWithToggles(c: { base: number; seasonality: number; campaigns: number }) {
    const s = this.state.includeSeasonality ? (c.seasonality || 0) : 0;
    const k = this.state.includeCampaigns ? (c.campaigns || 0) : 0;
    return Math.max(0, (c.base || 0) + s + k);
  }

  // single source of truth for “Projected Revenue” total (year or month)
  private projectedTotalForSelection(year: number, monthIndex: number, scenario: ScenarioKey) {
    const idxs = (monthIndex === ALL_MONTH)
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, monthIndex))];

    let total = 0;
    for (const i of idxs) {
      const c = this.buildAdjustedMonthComponents(year, i, scenario); // base/seasonality/campaigns already region+channel sliced
      total += this.sumComponentsWithToggles(c);
    }
    return Math.round(total);
  }

  /* ===========================
     Projected Revenue KPI
     =========================== */
  private projectedRevenueContent = () => {
    const year = this.props.year;
    const monthIndex = this.props.monthIndex;
    const scenario = this.props.scenario;

    // Use the SAME summed components as the waterfall
    const currentTotal = this.projectedTotalForSelection(year, monthIndex, scenario);

    const prevYear = Math.max(2025, year - 1);
    const previousTotal = this.projectedTotalForSelection(prevYear, monthIndex, scenario);

    const deltaPct = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : null;

    // Sparkline uses the same component-sum per month to stay aligned
    const sparkFull = months.map((m, i) => {
      const c = this.buildAdjustedMonthComponents(year, i, scenario);
      return { x: m, y: this.sumComponentsWithToggles(c) };
    });
    const sparkData = monthIndex === ALL_MONTH ? sparkFull : [sparkFull[Math.max(0, Math.min(11, monthIndex))]];

    const tone: KpiTone = (deltaPct == null) ? 'neutral' : (deltaPct > 0 ? 'good' : (deltaPct < 0 ? 'bad' : 'neutral'));

    return renderCommonKpiTile({
      label: 'Projected Revenue',
      valueText: cardformatCurrency(currentTotal),
      badge: { text: (deltaPct == null ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${prevYear}`), tone },
      isMonthSelected: monthIndex !== ALL_MONTH
    });
  };

  private growthPercentageContent = () => {
    const year = this.props.year;
    const monthIndex = this.props.monthIndex;
    const scenario = this.props.scenario;

    const currentTotal = this.projectedTotalForSelection(year, monthIndex, scenario);
    const prevYear = Math.max(2025, year - 1);
    const previousTotal = this.projectedTotalForSelection(prevYear, monthIndex, scenario);

    const growthPct = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : null;
    const tone: KpiTone = growthPct == null ? 'neutral' : (growthPct > 0 ? 'good' : 'bad');

    const valueText = growthPct == null ? '—' : `${growthPct > 0 ? '+' : ''}${growthPct.toFixed(1)}%`;

    return renderCommonKpiTile({
      label: 'Growth %',
      valueText,
      badge: { text: monthIndex === ALL_MONTH ? `YoY vs ${prevYear}` : `YoY vs ${months[Math.max(0, Math.min(11, monthIndex))]} ${prevYear}`, tone },
      isMonthSelected: monthIndex !== ALL_MONTH
    });
  };

  private projectedConversionRateContent = () => {
    // -----------------------------
    // Inputs from GLOBAL FILTERS
    // -----------------------------
    const year = Number(this.props.year);
    const monthIndex = Number(this.props.monthIndex);
    const region = String(this.props.region ?? 'ALL');
    const scenario = (this.props.scenario ?? 'Baseline') as ScenarioKey;
    const selectedChannels = (this.props.channels ?? []) as string[];

    const ALL_MONTH = -1; // (matches app constant)
    const monthsArr = months;

    // -----------------------------
    // Region + Channel scope
    // -----------------------------
    const isRegionKeyLocal = (r: string): r is RegionKey =>
      r === 'AsiaPacific' || r === 'Europe' || r === 'NorthAmerica' || r === 'LatinAmerica' || r === 'MiddleEastAfrica';

    const getIncludedRegions = (): RegionKey[] => {
      if (region === 'ALL') return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
      return isRegionKeyLocal(region) ? [region] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    };

    const asChannelKeysLocal = (arr: string[]): ChannelKey[] =>
      (arr ?? []).filter((x): x is ChannelKey => x === 'Paid' || x === 'Organic' || x === 'Email' || x === 'Social');

    const getIncludedChannels = (): ChannelKey[] => {
      const ch = asChannelKeysLocal(selectedChannels);
      return ch.length ? ch : (['Paid', 'Organic', 'Email', 'Social'] as ChannelKey[]);
    };

    const selectedMonthIdxs = (): number[] => {
      if (monthIndex === ALL_MONTH) return Array.from({ length: 12 }, (_, i) => i);
      return [Math.max(0, Math.min(11, monthIndex))];
    };

    const scenarioDeltaPP: Record<ScenarioKey, number> = {
      Baseline: 0,
      Optimistic: 0.25,
      Conservative: -0.25
    };

    const buildProjectedCRTable = (y: number) => {
      const baseYear = Math.min(y, 2025);
      const drift = y > 2025 ? (y - 2025) * 0.05 : 0; // +0.05pp per year beyond 2025
      const base = buildChannelCRByYear(baseYear);
      const delta = drift + (scenarioDeltaPP[scenario] ?? 0);

      return base.map(r => ({
        m: r.m,
        Paid: Math.max(0, +(r.Paid + delta).toFixed(2)),
        Organic: Math.max(0, +(r.Organic + delta).toFixed(2)),
        Email: Math.max(0, +(r.Email + delta).toFixed(2)),
        Social: Math.max(0, +(r.Social + delta).toFixed(2))
      }));
    };

    const projectedCRForMonth = (y: number, mIdx: number): number => {
      const crRows = buildProjectedCRTable(y);
      const cr = crRows[mIdx];
      if (!cr) return 0;

      let totalOrders = 0;
      let totalVisits = 0;

      for (const r of getIncludedRegions()) {
        const row = buildChannelsByRegionYear(y, r)[mIdx];
        if (!row) continue;

        for (const ch of getIncludedChannels()) {
          const orders = (row as any)[ch] ?? 0;
          const crPct = (cr as any)[ch] ?? 0;

          totalOrders += orders;
          if (crPct > 0) totalVisits += orders / (crPct / 100);
        }
      }

      return totalVisits <= 0 ? 0 : (totalOrders / totalVisits) * 100;
    };

    // Current value (selected month or all-months aggregation)
    const idxs = selectedMonthIdxs();
    const current =
      idxs.length === 1
        ? projectedCRForMonth(year, idxs[0])
        : (() => {
          // weighted aggregation across months
          let orders = 0;
          let visits = 0;
          for (const i of idxs) {
            const crRows = buildProjectedCRTable(year);
            const cr = crRows[i];
            if (!cr) continue;

            for (const r of getIncludedRegions()) {
              const row = buildChannelsByRegionYear(year, r)[i];
              if (!row) continue;

              for (const ch of getIncludedChannels()) {
                const o = (row as any)[ch] ?? 0;
                const c = (cr as any)[ch] ?? 0;
                orders += o;
                if (c > 0) visits += o / (c / 100);
              }
            }
          }
          return visits <= 0 ? 0 : (orders / visits) * 100;
        })();

    // Previous year comparison (same months selection)
    const prevYear = year - 1;
    const previous =
      prevYear >= 2022
        ? (idxs.length === 1
          ? projectedCRForMonth(prevYear, idxs[0])
          : (() => {
            let orders = 0;
            let visits = 0;
            for (const i of idxs) {
              const crRows = buildProjectedCRTable(prevYear);
              const cr = crRows[i];
              if (!cr) continue;

              for (const r of getIncludedRegions()) {
                const row = buildChannelsByRegionYear(prevYear, r)[i];
                if (!row) continue;

                for (const ch of getIncludedChannels()) {
                  const o = (row as any)[ch] ?? 0;
                  const c = (cr as any)[ch] ?? 0;
                  orders += o;
                  if (c > 0) visits += o / (c / 100);
                }
              }
            }
            return visits <= 0 ? 0 : (orders / visits) * 100;
          })())
        : null;

    const deltaPct =
      previous && previous > 0 ? ((current - previous) / previous) * 100 : null;

    const badgeText =
      deltaPct === null
        ? '—'
        : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${monthIndex === ALL_MONTH ? prevYear : `${monthsArr[idxs[0]]} ${prevYear}`}`;

    const badgeTone: 'good' | 'bad' | 'neutral' =
      deltaPct === null ? 'neutral' : deltaPct > 0 ? 'good' : deltaPct < 0 ? 'bad' : 'neutral';

    // Sparkline: 12 months for selected year
    const sparkData = Array.from({ length: 12 }, (_, i) => ({
      x: monthsArr[i],
      y: +projectedCRForMonth(year, i).toFixed(2)
    }));

    return renderCommonKpiTile({
      label: 'Projected Conversion Rate',
      valueText: `${current.toFixed(2)}%`,
      badge: { text: badgeText, tone: badgeTone, icon: deltaPct === null ? '•' : deltaPct > 0 ? '▲' : deltaPct < 0 ? '▼' : '•' },
      isMonthSelected: monthIndex !== ALL_MONTH
    });
  };

  // Update forecastAccuracyContent to use the shared calculation
  private forecastAccuracyContent = () => {
    const { year, monthIndex } = this.props;
    const monthsArr = months;

    // Use the shared accuracy calculation
    const current = this.calculateForecastAccuracy();

    const prevYear = year - 1;
    const previous =
      prevYear >= 2022
        ? (() => {
          // Calculate accuracy for previous year using same method
          const prevMonthIdxs = monthIndex === ALL_MONTH
            ? Array.from({ length: 12 }, (_, i) => i)
            : [Math.max(0, Math.min(11, monthIndex))];

          let totalAbsErr = 0;
          let totalActual = 0;

          for (const mi of prevMonthIdxs) {
            const forecast = this.computeFinalFor(prevYear, mi, 'Baseline');
            const refRow = (monthlyRevenueByYear[prevYear] ?? [])[mi];
            const actual = refRow?.actual ?? this.computeFinalFor(prevYear, mi, 'Baseline');
            const factor = this.computeSelectionOrderFactor(prevYear, mi);
            const actualSliced = actual * factor;

            if (actualSliced <= 0) continue;
            totalAbsErr += Math.abs(actualSliced - forecast);
            totalActual += actualSliced;
          }

          if (totalActual <= 0) return 0;
          const mape = (totalAbsErr / totalActual) * 100;
          return Math.max(0, Math.min(100, 100 - mape));
        })()
        : null;

    const deltaPct =
      previous && previous > 0 ? ((current - previous) / previous) * 100 : null;

    const badgeText =
      deltaPct === null
        ? '—'
        : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(1)}% vs ${monthIndex === ALL_MONTH ? prevYear : `${monthsArr[Math.max(0, Math.min(11, monthIndex))]} ${prevYear}`}`;

    const badgeTone: 'good' | 'bad' | 'neutral' =
      deltaPct === null ? 'neutral' : deltaPct > 0 ? 'good' : deltaPct < 0 ? 'bad' : 'neutral';

    return renderCommonKpiTile({
      label: 'Forecast Accuracy',
      valueText: `${current.toFixed(1)}%`,
      badge: { text: badgeText, tone: badgeTone, icon: deltaPct === null ? '•' : deltaPct > 0 ? '▲' : deltaPct < 0 ? '▼' : '•' },
      isMonthSelected: monthIndex !== ALL_MONTH
    });
  };

  private buildAdjustedMonthComponents(year: number, monthIdx: number, scenario: ScenarioKey) {
    // Use base engine
    const c = this.buildMonthComponents(year, monthIdx, scenario);
    // Region + Channel slice factor (make scenario delta filter-aware too)
    const factor = this.computeSelectionOrderFactor(year <= 2027 ? year : 2027, monthIdx);

    const base = Math.max(0, (c.base ?? 0) * factor);
    const seasonality = (c.seasonality ?? 0) * factor;
    let campaigns = (c.campaigns ?? 0) * factor;

    // Add explicit scenario delta (scaled by selection factor)
    const scenAdj = (this.ScenarioAbsoluteDelta[scenario] ?? 0) * factor;
    campaigns += scenAdj;

    return { base, seasonality, campaigns, final: Math.max(0, (c.final ?? 0) * factor) };
  }

  private axisformatCurrency = (n: number): string => {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2, notation: "compact" }).format(n ?? 0);
  };

  private revenueWaterfallAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = this.axisformatCurrency(args.value);
    }
  };

  // UPDATED: Revenue Waterfall — redesigned per spec
  private revenueWaterfallContent = () => {
    const { year, monthIndex, scenario } = this.props;
    const { includeSeasonality, includeCampaigns } = this.state;
    const isYearly = monthIndex === ALL_MONTH;

    let sumBase = 0, sumSeason = 0, sumCamp = 0;
    const loopIdxs = isYearly ? Array.from({ length: 12 }, (_, i) => i) : [Math.max(0, Math.min(11, monthIndex))];

    for (const i of loopIdxs) {
      const c = this.buildAdjustedMonthComponents(year, i, scenario);
      sumBase += (c.base || 0);
      sumSeason += (c.seasonality || 0);
      sumCamp += (c.campaigns || 0);
    }

    // Net computed exactly like the tile
    const net = this.sumComponentsWithToggles({ base: sumBase, seasonality: sumSeason, campaigns: sumCamp });

    const data: Array<{ x: string; y?: number }> = [];
    data.push({ x: isYearly ? 'Base (Sum)' : 'Base', y: sumBase });
    if (includeSeasonality) data.push({ x: isYearly ? 'Seasonality (Sum)' : 'Seasonality', y: sumSeason });
    if (includeCampaigns) data.push({ x: isYearly ? 'Campaign Impact (Sum)' : 'Campaign Impact', y: sumCamp });
    data.push({ x: isYearly ? 'Net Revenue (Year)' : 'Net Revenue (Month)' /* summary */ });

    const sumIndex = data.length - 1;

    const colors = { pos: '#554994', neg: '#FF5858', sum: '#850E35' };
    const title = "Revenue Waterfall";

    // Tooltip shows currency; Net bar will equal the tile
    const currency0 = (v: number) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(v || 0));
    const onTooltipRender = (args: any) => {
      const x = String(args?.point?.x ?? '');
      const y = Number(args?.point?.y ?? 0);
      if (x.startsWith('Net Revenue')) {
        args.text = `${x}: ${currency0(net)}`;
      } else {
        args.text = `${x}: ${currency0(y)}`;
      }
    };

    const onaxisCurrencyTooltip = (args: any) => {
      const y = Number(args?.point?.y ?? 0);
      const x = String(args?.point?.x ?? '');
      const series = String(args?.series?.name ?? '');
      args.text = series ? `${x} : ${this.axisformatCurrency(y)}` : `${x}: ${this.axisformatCurrency(y)}`;
    };

    const onaxisTextRender = (args: any) => {
      // only modify series data labels (args.point exists for data-label rendering)
      if (args.point && typeof args.point.y === 'number') {
        args.text = this.axisformatCurrency(Number(args.point.y));
      }
    };

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Chart */}
        <div style={{ flex: 1, minHeight: 0, height: '100%' }}>
          <ChartComponent
            id="revenue-waterfall"
            ref={this.revenueWaterfallRef}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, labelIntersectAction: 'Trim' }}
            primaryYAxis={{ labelFormat: 'c0', majorGridLines: { width: 1, color: '#e5e7eb' }, lineStyle: { width: 0 } }}
            tooltip={{ enable: true }}
            textRender={onaxisTextRender}
            tooltipRender={onaxisCurrencyTooltip}
            axisLabelRender={this.revenueWaterfallAxisLabelRender}
            load={onChartLoad}
          >
            <Inject services={[WaterfallSeries, Tooltip, DataLabel, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                type='Waterfall'
                dataSource={data}
                xName='x'
                yName='y'
                intermediateSumIndexes={[]}
                sumIndexes={[sumIndex]}
                negativeFillColor={colors.neg}
                columnWidth={0.6}
                fill={colors.pos}
                summaryFillColor={colors.sum}
                marker={{ dataLabel: { visible: true, position: 'Outer', format: 'c0' } }}
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  };

  private getIncludedRegions(): RegionKey[] {
    const r = this.props.region;
    if (r === 'ALL') return ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
    return isRegionKey(r) ? [r] : ['AsiaPacific', 'Europe', 'NorthAmerica', 'LatinAmerica', 'MiddleEastAfrica'];
  }

  private getIncludedChannels(): ChannelKey[] {
    const sel = asChannelKeys(this.props.channels ?? []);
    return sel.length ? sel : ['Paid', 'Organic', 'Email', 'Social'];
  }

  private getMonthIdxs(): number[] {
    return this.props.monthIndex === ALL_MONTH
      ? Array.from({ length: 12 }, (_, i) => i)
      : [Math.max(0, Math.min(11, this.props.monthIndex))];
  }

  // Channel shares from prior-year orders, restricted to selected Regions + Channels (month/year aware)
  private getChannelSharesFromPriorYear(year: number, monthIndex: number) {
    const py = Math.max(2022, year - 1);
    const monthsSel = (monthIndex === ALL_MONTH) ? Array.from({ length: 12 }, (_, i) => i) : [Math.max(0, Math.min(11, monthIndex))];

    const agg: Record<ChannelKey, number> = { Paid: 0, Organic: 0, Email: 0, Social: 0 };

    for (const mi of monthsSel) {
      for (const r of this.getIncludedRegions()) {
        const row = buildChannelsByRegionYear(py, r)[mi];
        if (!row) continue;
        for (const ch of this.getIncludedChannels()) {
          agg[ch] += (row as any)[ch] ?? 0;
        }
      }
    }
    const total = (Object.keys(agg) as ChannelKey[]).reduce((s, k) => s + (agg[k] ?? 0), 0) || 1;
    return {
      Paid: agg.Paid / total,
      Organic: agg.Organic / total,
      Email: agg.Email / total,
      Social: agg.Social / total
    };
  }

  // ---------- Helpers (Region/Channel slices for Spend/Orders) ----------
  private computeFinalFor(year: number, monthIdx: number, scenario: ScenarioKey): number {
    const clampToNonNeg = (v: number) => Math.max(0, Math.round(v));

    if (year <= 2027) {
      const comps = this.buildAdjustedMonthComponents(year, monthIdx, scenario);
      return clampToNonNeg(this.sumComponentsWithToggles(comps));
    }

    const base2027 = this.computeFinalFor(2027, monthIdx, scenario);
    const yearsAhead = year - 2027;
    const perYearGrowth = this.ForecastGrowth[2027] ?? 1.15;
    const factor = Math.pow(perYearGrowth, yearsAhead);
    return clampToNonNeg(base2027 * factor);
  }

  // 12-month series for a given year & scenario (now uses computeFinalFor -> unified)
  private buildScenarioMonthlyForecast(year: number, scenario: ScenarioKey) {
    return months.map((m, idx) => {
      const y = this.computeFinalFor(year, idx, scenario);
      return { x: `${m} ${year}`, m, idx, y, year };
    });
  }

  private buildScenarioWindowForecast(
    year: number,
    startIdx: number,
    count: number,
    scenario: ScenarioKey
  ) {
    const out: { x: string; m: string; idx: number; y: number; year: number }[] = [];
    let y = year;
    let i = startIdx;
    while (out.length < count) {
      if (i > 11) { i = 0; y += 1; }  // roll to next year (computeFinalFor handles y>2027)
      const val = this.computeFinalFor(y, i, scenario);
      out.push({ x: `${months[i]} ${y}`, m: months[i], idx: i, y: val, year: y });
      i++;
    }
    return out;
  }

  private revenueForecastAxisLabelRender = (args: any) => {
    if (args.axis && args.axis.name === 'percentAxis') return;
    if (args?.axis?.valueType !== 'Category') {
      args.text = formatCurrency(Number(args.value || 0));
    }
  };

  private onScenarioSharedTooltipRender = (args: ISharedTooltipRenderEventArgs) => {
    const toNumber = (s: string, abbr?: string) => {
      let n = Number(s.replace(/,/g, '')) || 0;
      if (abbr) {
        const A = abbr.toUpperCase();
        n *= A === 'K' ? 1e3 : A === 'M' ? 1e6 : A === 'B' ? 1e9 : 1;
      }
      return n;
    };

    // Replace any [$]<number>[K|M|B] with formatted currency (single $)
    const fmtLine = (line: string) =>
      line.replace(/\$?\s*(-?\d[\d,]*)(\.\d+)?\s*([KMB])?/gi, (_m, intPart: string, frac: string = '', abbr?: string) => {
        const n = toNumber(`${intPart}${frac}`, abbr);
        return formatCurrency(n);
      });

    if (Array.isArray(args.text)) {
      args.text = args.text.map(t => fmtLine(String(t)));
    } else {
      const single = fmtLine(String((args as any).text ?? ''));
      (args as any).text = [single];
    }
  };

  private buildScenarioRangeAndLines() {
    const { year, monthIndex } = this.props;
    const windowMode = monthIndex !== ALL_MONTH;
    const count = windowMode ? 6 : 12;

    const baseline = windowMode
      ? this.buildScenarioWindowForecast(year, monthIndex, count, 'Baseline')
      : this.buildScenarioMonthlyForecast(year, 'Baseline');

    const optimistic = windowMode
      ? this.buildScenarioWindowForecast(year, monthIndex, count, 'Optimistic')
      : this.buildScenarioMonthlyForecast(year, 'Optimistic');

    const conservative = windowMode
      ? this.buildScenarioWindowForecast(year, monthIndex, count, 'Conservative')
      : this.buildScenarioMonthlyForecast(year, 'Conservative');

    const range = baseline.map((p, i) => {
      const hi = optimistic[i]?.y ?? p.y;
      const lo = conservative[i]?.y ?? p.y;
      return { x: p.x, high: Math.max(hi, lo), low: Math.min(hi, lo) };
    });

    const maxVal = Math.max(
      0,
      ...range.map(r => r.high || 0),
      ...baseline.map(d => d.y || 0),
      ...optimistic.map(d => d.y || 0),
      ...conservative.map(d => d.y || 0),
    );
    const yMax = Math.max(10_000, Math.ceil(maxVal * 1.12 / 10_000) * 10_000);

    // also return first/last labels for subtitle
    const firstLabel = baseline[0]?.x ?? '';
    const lastLabel = baseline[baseline.length - 1]?.x ?? '';
    return { range, baseline, optimistic, conservative, yMax, windowMode, firstLabel, lastLabel };
  }

  private scenarioForecastContent = () => {
    const { scenario } = this.props;
    const { range, baseline, optimistic, conservative, yMax, windowMode, firstLabel, lastLabel } =
      this.buildScenarioRangeAndLines();

    const title = windowMode
      ? `Revenue Forecast (Next 6 months) • from ${firstLabel} → ${lastLabel}`
      : `Revenue Forecast (12 months) • Year ${baseline?.[0]?.year ?? ''}`;

    const colorRangeFill = '#F5C6A5';
    const colorRangeBorder = '#05B3DA';
    const colorBaseline = '#B9005B';     // Baseline
    const colorOptimistic = '#FF5858';   // Optimistic
    const colorConservative = '#554994'; // Conservative

    const marker = (fill: string, shape: 'Circle' | 'Diamond' | 'Triangle') => ({
      visible: true,
      shape,
      width: 8,
      height: 8,
      border: { width: 2, color: fill }
    });

    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <div style={{ height: "calc(100% - 10px)" }}>
          <ChartComponent
            id="scenarioSplineRangeArea"
            ref={this.scenarioSplineRangeAreaRef}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, labelIntersectAction: 'Trim' }}
            primaryYAxis={{
              title: '', labelFormat: 'c0', minimum: 0, maximum: yMax,
              majorGridLines: { width: 1, color: '#e5e7eb' },
              lineStyle: { width: 0 }, majorTickLines: { width: 0 }
            }}
            legendSettings={{ visible: true }}
            tooltip={{ enable: true, shared: true }}
            sharedTooltipRender={this.onScenarioSharedTooltipRender}
            chartArea={{ border: { width: 0 } }}
            width="100%"
            height="100%"
            axisLabelRender={this.revenueForecastAxisLabelRender}
            load={onChartLoad}
          >
            <Inject services={[SplineRangeAreaSeries, SplineSeries, Legend, ChartTooltip, Category]} />
            <SeriesCollectionDirective>
              {/* Band: Conservative ↔ Optimistic */}
              <SeriesDirective
                type="SplineRangeArea"
                name="Range: Conservative ↔ Optimistic"
                xName="x"
                high="high"
                low="low"
                dataSource={range}
                opacity={0.35}
                fill={colorRangeFill}
                border={{ width: 1, color: colorRangeBorder }}
                animation={{ enable: false }}
              />

              {/* Distinct marker shapes per series */}
              <SeriesDirective
                type="Spline"
                name="Optimistic"
                xName="x"
                yName="y"
                dataSource={optimistic}
                width={2}
                fill={colorOptimistic}
                marker={marker(colorOptimistic, 'Triangle') as any}
                animation={{ enable: false }}
              />
              <SeriesDirective
                type="Spline"
                name="Baseline"
                xName="x"
                yName="y"
                dataSource={baseline}
                width={2}
                fill={colorBaseline}
                marker={marker(colorBaseline, 'Circle') as any}
                animation={{ enable: false }}
              />
              <SeriesDirective
                type="Spline"
                name="Conservative"
                xName="x"
                yName="y"
                dataSource={conservative}
                width={2}
                fill={colorConservative}
                marker={marker(colorConservative, 'Diamond') as any}
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  };

  // --- Palette (light -> dark) for the heatmap values
  private HeatmapGradient = [
    { color: '#FEEBF4' }, // very low
    { color: '#F679B7' }, // low
    { color: '#CF3883' }, // mid
    { color: '#BF196B' }  // high
  ];

  private getPriorYearChannelShares(): { Paid: number; Organic: number; Email: number; Social: number } {
    const byMonth = buildOrdersByChannelYear(2025); // already defined at top-level utilities 

    // Constrain to channel keys only (exclude 'm')
    type ChannelKey = 'Paid' | 'Organic' | 'Email' | 'Social';

    const sum = (k: ChannelKey) =>
      byMonth.reduce((s, r) => s + (Number(r[k]) || 0), 0);

    const paid = sum('Paid');
    const org = sum('Organic');
    const em = sum('Email');
    const soc = sum('Social');

    const total = paid + org + em + soc;
    if (total <= 0) {
      return { Paid: 0.25, Organic: 0.25, Email: 0.25, Social: 0.25 };
    }
    return {
      Paid: paid / total,
      Organic: org / total,
      Email: em / total,
      Social: soc / total
    };
  }

  private readonly HeatMapChannels: Array<'Paid' | 'Organic' | 'Email' | 'Social'> = [
    'Paid', 'Organic', 'Email', 'Social'
  ];

  private buildChannelRevenueHeatMapData(
    year: number,
    monthIndex: number,
    scenario: ScenarioKey
  ): Array<{ month: string; channel: string; value: number }> {

    if (year !== 2026 && year !== 2027) return [];

    const buildForMonth = (mIdx: number) => {
      const monthlyFinal = Math.max(0, Math.round(this.computeFinalFor(year, mIdx, scenario) || 0));
      const sharesRaw = this.getChannelSharesFromPriorYear(year, mIdx) || { Paid: 0, Organic: 0, Email: 0, Social: 0 };
      let shareSum = this.HeatMapChannels.reduce((s, ch) => s + (sharesRaw as any)[ch], 0);
      if (shareSum <= 0) {
        shareSum = 4; // 4 channels
        this.HeatMapChannels.forEach(ch => ((sharesRaw as any)[ch] = 1));
      }

      const alloc: Record<string, number> = {};
      let allocated = 0;
      for (const ch of this.HeatMapChannels) {
        const frac = (sharesRaw as any)[ch] / shareSum;
        const v = Math.round(monthlyFinal * frac);
        alloc[ch] = Math.max(0, v);
        allocated += alloc[ch];
      }

      let delta = monthlyFinal - allocated;
      if (delta !== 0) {
        // Distribute +/-1 across channels by descending share weight
        const ordered = [...this.HeatMapChannels].sort((a, b) =>
          ((sharesRaw as any)[b] ?? 0) - ((sharesRaw as any)[a] ?? 0)
        );
        let i = 0;
        while (delta !== 0 && i < ordered.length * 3) {
          const ch = ordered[i % ordered.length];
          if (delta > 0) {
            alloc[ch] += 1; delta -= 1;
          } else if (delta < 0 && alloc[ch] > 0) {
            alloc[ch] -= 1; delta += 1;
          }
          i++;
        }
      }

      const monthName = months[mIdx];
      return this.HeatMapChannels.map(ch => ({
        month: monthName,
        channel: ch,
        value: alloc[ch] // <- valueMapping will use this
      }));
    };

    if (monthIndex === ALL_MONTH) {
      // All months for the selected year
      const out: Array<{ month: string; channel: string; value: number }> = [];
      for (let i = 0; i < months.length; i++) out.push(...buildForMonth(i));
      return out;
    }
    // Single selected month
    if (monthIndex >= 0 && monthIndex < months.length) {
      return buildForMonth(monthIndex);
    }
    return [];
  }

  private renderChannelWeekHeatmap = () => {
    const { year, monthIndex, scenario } = this.props;
    const data = this.buildChannelRevenueHeatMapData(year, monthIndex, scenario);
    return (
      <div style={{ height: '100%', width: '100%', padding: 8, boxSizing: 'border-box' }}>
        <HeatMapComponent
          id="channelRevenueHeatmap"
          ref={this.channelHeatmapRef}
          dataSource={data}
          dataSourceSettings={{
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'month',    // columns
            yDataMapping: 'channel',  // rows
            valueMapping: 'value',

          }}
          legendSettings={{ position: 'Bottom' }}
          cellSettings={{
            border: { width: 0.5, color: '#e5e7eb' },
            format: 'c0' // show currency in tooltip; cell text will be hidden by default
          }}
          load={onHeatMapLoad}
        >
          <HeatmapInject services={[HeatmapAdaptor, HeatmapLegend, HeatmapTooltip]} />
        </HeatMapComponent>
      </div>
    );
  };

  private calculateForecastAccuracy = (): number => {
    const { year, monthIndex, scenario } = this.props;
    const monthIdxs = this.getMonthIdxs();

    let totalAbsErr = 0;
    let totalActual = 0;

    for (const mi of monthIdxs) {
      // Forecast for current scenario
      const forecast = this.computeFinalFor(year, mi, scenario);

      // Actual/baseline reference (use 2025 actuals if forecasting 2026/2027)
      const refYear = year <= 2025 ? year : 2025;
      const refRow = (monthlyRevenueByYear[refYear] ?? [])[mi];
      const actual = refRow?.actual ?? this.computeFinalFor(refYear, mi, 'Baseline');

      // Apply region/channel slice factor to actual for fair comparison
      const factor = this.computeSelectionOrderFactor(refYear, mi);
      const actualSliced = actual * factor;

      if (actualSliced <= 0) continue;

      totalAbsErr += Math.abs(actualSliced - forecast);
      totalActual += actualSliced;
    }

    if (totalActual <= 0) return 0;

    // MAPE-based accuracy: 100 - (error%)
    const mape = (totalAbsErr / totalActual) * 100;
    return Math.max(0, Math.min(100, 100 - mape));
  };

  render() {
    return (
      <div className="Container">
        <div className="sidebar-content">
          <DashboardLayoutComponent
            ref={this.ForecastRef}
            id="ecommerce_marketing_forecast_dashboard"
            columns={8}
            cellAspectRatio={1}
            cellSpacing={[12, 12]}
            allowResizing={false}
            allowDragging={false}
            created={this.ForecastDashboardCreated}
            mediaQuery="(max-width:950px)"
          >
            <PanelsDirective>
              <PanelDirective sizeX={2} sizeY={1} row={0} col={0} content={() => this.projectedRevenueContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={0} col={2} content={() => this.growthPercentageContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={0} col={4} content={() => this.projectedConversionRateContent()} />
              <PanelDirective sizeX={2} sizeY={1} row={0} col={6} content={() => this.forecastAccuracyContent()} />
              <PanelDirective sizeX={8} sizeY={3} row={1} col={0} header="<div>Revenue Flow Breakdown</div>" content={() => this.revenueWaterfallContent()} />
              <PanelDirective sizeX={8} sizeY={3} row={4} col={0} header="<div>Projected Revenue</div>" content={() => this.scenarioForecastContent()} />
              <PanelDirective sizeX={8} sizeY={4} row={7} col={0} header="<div>Channel Contribution Overview</div>" content={() => this.renderChannelWeekHeatmap()} />
            </PanelsDirective>
          </DashboardLayoutComponent>
        </div>
      </div>
    );
  }
}

/* ===========================
   Marketing Dashboard Shell
   =========================== */
export class EcommerceMarketingDashboard extends SampleBase<{}, {}> {
  public state = {
    selectedId: 'overview',
    year: 2025,
    monthIndex: ALL_MONTH,
    region: 'ALL',
    channels: 'ALL',
    categories: 'ALL',
    campaign: 'ALL',
    brand: "ALL",
    warehouse: "ALL",
    scenario: 'Baseline',
    isDocked: true
  };
  sidebarRef = React.createRef<SidebarComponent>();
  private allowSidebarOpen = false;

  public items = [
    { id: 'overview', iconCss: 'e-icons home', text: 'Overview' },
    { id: 'promotion', iconCss: 'e-icons filter', text: 'Promotion' },
    { id: 'performance', iconCss: 'e-icons analyticsChart', text: 'Product and Sales' },
    { id: 'forecast_revenue', iconCss: 'e-icons analytics', text: 'Revenue Forecasting' }
  ];

  private onMenuClicked = (event?: React.MouseEvent<HTMLDivElement>) => {
    this.allowSidebarOpen = true;
    this.sidebarRef.current?.toggle();
  };

  private onSidebarCreated = () => {
    if (this.sidebarRef.current) {
      this.sidebarRef.current.hide();
    }
  };

  private notifyResize = () => window.dispatchEvent(new Event('sidebar-toggled'));

  private onSidebarOpen = () => {
    // Block any auto-open that wasn’t triggered by the Menu click
    if (!this.allowSidebarOpen) {
      this.sidebarRef.current?.hide();
      return;
    }
    // Reset the flag immediately after a valid open
    this.allowSidebarOpen = false;
    setTimeout(this.notifyResize, 400);
    this.setState({ isDocked: false });
  }

  private onSidebarClose = () => {
    // Ensure future opens require Menu click again
    this.allowSidebarOpen = false;
    setTimeout(this.notifyResize, 400);
    this.setState({ isDocked: true });
  }

  // Helper: current channels as ChannelKey[]
  private getChannelsArray = (): ChannelKey[] => {
    const raw = this.state.channels as any;
    if (Array.isArray(raw)) return asChannelKeys(raw as string[]);
    if (raw === 'ALL' || raw == null) return [];
    return asChannelKeys([String(raw)]);
  };

  // If entering Promotion with a non‑promo selection (e.g., Organic/Social), fallback to ALL
  private normalizeChannelsForPromotion = (): string | string[] => {
    const sel = this.getChannelsArray(); // [] means ALL
    const hasPromo = sel.length === 0 || sel.includes('Paid') || sel.includes('Email');
    return hasPromo ? this.state.channels : 'ALL';
  };

  private handleNavClick = (id: 'overview' | 'promotion' | 'performance' | 'forecast_revenue') => {
    if (id === 'forecast_revenue') {
      this.setState({ selectedId: id, year: 2026 });
      return;
    }

    if (id === 'promotion') {
      const fixedChannels = this.normalizeChannelsForPromotion();
      const patch: any = { selectedId: id };
      if (fixedChannels !== this.state.channels) patch.channels = fixedChannels;
      this.setState(patch);
      return;
    }

    // other tabs: keep year sane if coming from forecast years
    if (this.state.year === 2026 || this.state.year === 2027) {
      this.setState({ selectedId: id, year: 2025 });
    } else {
      this.setState({ selectedId: id });
    }
  };


  private renderDashboard() {
    switch (this.state.selectedId) {
      case 'overview':
        return (
          <OverviewClass
            year={this.state.year}
            monthIndex={this.state.monthIndex}
            region={this.state.region}
            channels={
              Array.isArray(this.state.channels)
                ? (this.state.channels as string[])
                : (this.state.channels === 'ALL' ? [] : [String(this.state.channels)])
            }
            categories={
              Array.isArray(this.state.categories)
                ? (this.state.categories as string[])
                : (this.state.categories === 'ALL' ? [] : [String(this.state.categories)])
            }
          />
        );
      case 'promotion': return <MarketingClass
        year={this.state.year}
        monthIndex={this.state.monthIndex}
        region={this.state.region}
        channels={
          Array.isArray(this.state.channels)
            ? this.state.channels
            : (this.state.channels === 'ALL' ? [] : [String(this.state.channels)])
        }
        categories={
          Array.isArray(this.state.categories)
            ? this.state.categories
            : (this.state.categories === 'ALL' ? [] : [String(this.state.categories)])
        }
        campaign={this.state.campaign}
      />;
      case 'performance': return <ProductClass
        year={this.state.year}
        monthIndex={this.state.monthIndex}
        region={this.state.region}
        categories={
          Array.isArray(this.state.categories)
            ? this.state.categories
            : (this.state.categories === 'ALL' ? [] : [String(this.state.categories)])
        }
        brand={this.state.brand}
        warehouse={this.state.warehouse}
      />;
      case 'forecast_revenue':
        return <ForecastClass
          year={this.state.year}
          monthIndex={this.state.monthIndex}
          region={this.state.region}
          channels={Array.isArray(this.state.channels) ? this.state.channels : (this.state.channels === 'ALL' ? [] : [String(this.state.channels)])}
          scenario={this.state.scenario as ScenarioKey}
        />;
      default: return <OverviewClass
        year={this.state.year}
        monthIndex={this.state.monthIndex}
        region={this.state.region}
        channels={
          Array.isArray(this.state.channels)
            ? (this.state.channels as string[])
            : (this.state.channels === 'ALL' ? [] : [String(this.state.channels)])
        }
        categories={
          Array.isArray(this.state.categories)
            ? (this.state.categories as string[])
            : (this.state.categories === 'ALL' ? [] : [String(this.state.categories)])
        }
      />;
    }
  }

  private handleCategoriesChange = (e: DropDownChangeEventArgs) => {
    const v: any = (e as any).value ?? (e as any).target?.value ?? null;
    if (Array.isArray(v)) {
      this.setState({ categories: v.length ? v : 'ALL' });
    } else if (v === null || v === undefined) {
      this.setState({ categories: 'ALL' });
    } else {
      const s = String(v);
      this.setState({ categories: s === 'ALL' ? 'ALL' : [s] });
    }
  };

  private handleCampaignChange = (e: DropDownChangeEventArgs) => {
    const v = String((e as any).value ?? 'ALL');
    this.setState({ campaign: v });
  };

  private handleBrandChange = (e: DropDownChangeEventArgs) => {
    const v = String((e as any).value ?? 'ALL');
    this.setState({ brand: v });
  };

  private handleWarehouseChange = (e: DropDownChangeEventArgs) => {
    const v = String((e as any).value ?? 'ALL');
    this.setState({ warehouse: v });
  };

  private handleScenarioChange = (e: DropDownChangeEventArgs) => {
    const v = String((e as any).value ?? 'Baseline') as ScenarioKey;
    this.setState({ scenario: v });
  };

  private handleYearChange = (e: DropDownChangeEventArgs) => {
    const v = Number(e.value);
    this.setState({ year: v });
  }

  public renderGlobalFilters = () => {
    const showCategoryFilter =
      this.state.selectedId === 'overview' ||
      this.state.selectedId === 'promotion' ||
      this.state.selectedId === 'performance';

    const showChannelFilter =
      this.state.selectedId === 'overview' ||
      this.state.selectedId === 'promotion' ||
      this.state.selectedId === 'forecast_revenue';
    const showCampaignFilter = this.state.selectedId === 'promotion';
    const showBrandFilter = this.state.selectedId === 'performance';
    const showWarehouseFilter = this.state.selectedId === 'performance';
    const showScenarioFilter = this.state.selectedId === 'forecast_revenue';
    const isForecast = this.state.selectedId === 'forecast_revenue';
    const yearOptions = isForecast ? [2026, 2027] : [2023, 2024, 2025];

    // Ensure current year is valid for the active tab
  let displayYear = this.state.year;
  if (!isForecast && (this.state.year === 2026 || this.state.year === 2027)) {
    displayYear = 2025;
    // Update state asynchronously to avoid render issues
    setTimeout(() => {
      if (this.state.year !== 2025) {
        this.setState({ year: 2025 });
      }
    }, 0);
  } else if (isForecast && (this.state.year < 2026)) {
    displayYear = 2026;
    setTimeout(() => {
      if (this.state.year !== 2026) {
        this.setState({ year: 2026 });
      }
    }, 0);
  }

    const itemTemplateWithTitle = (data: any) => <div title={data?.text ?? data} className='commerce-commerce-item-template-title'>{data?.text ?? data}</div>;

    return (
      <div className='commerce-toolbar' style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className='commerce-dropdown' style={{ minWidth: 100, width: 100 }}>
            <DropDownListComponent
              id="globalYear"
              dataSource={yearOptions}
              key={`${isForecast ? 'yr-forecast' : 'yr-historic'}-${displayYear}`}
              value={this.state.year}
              change={this.handleYearChange}
              placeholder="Year"
              popupHeight="220px"
            />
          </div>

          <div className='commerce-dropdown' style={{ minWidth: 100, width: 120 }}>
            <DropDownListComponent
              id="globalMonth"
              dataSource={[{ text: 'All (Yearly)', value: ALL_MONTH }, ...months.map((m, idx) => ({ text: m, value: idx }))]}
              fields={{ text: 'text', value: 'value' }}
              value={this.state.monthIndex}
              change={(e: any) => this.setState({ monthIndex: Number(e.value) })}
              popupHeight="260px"
            />
          </div>

          <div className='commerce-dropdown' style={{ minWidth: 100, width: 140 }}>
            <DropDownListComponent
              id="globalRegion"
              dataSource={REGION_OPTIONS}
              fields={{ text: 'text', value: 'value' }}
              value={this.state.region}
              change={(e: any) => this.setState({ region: String(e.value ?? 'ALL') })}
              popupHeight="260px"
              itemTemplate={itemTemplateWithTitle}
            />
          </div>

          {showChannelFilter && (
            <div className='commerce-dropdown' style={{ minWidth: 100, width: 130 }}>
              <DropDownListComponent id="ChannelsTop" dataSource={this.state.selectedId === 'promotion' ? MARKETING_DROPDOWN_CHANNEL_OPTIONS : DROPDOWN_CHANNEL_OPTIONS} fields={{ text: 'text', value: 'value' }} value={this.state.channels} popupHeight="260px" change={this.handleChannelsChange}>
              </DropDownListComponent>
            </div>
          )}

          {showCategoryFilter && (
            <div className='commerce-dropdown' style={{ minWidth: 100, width: 200 }}>
              <DropDownListComponent
                id="categoriesTop"
                dataSource={DROPDOWN_CATEGORY_OPTIONS}
                fields={{ text: 'text', value: 'value' }}
                value={this.state.categories}
                change={this.handleCategoriesChange}
                popupHeight="260px"
                itemTemplate={itemTemplateWithTitle}
              />
            </div>
          )}

          {showCampaignFilter && (
            <div className='commerce-dropdown' style={{ minWidth: 100, width: 190 }}>
              <DropDownListComponent
                id="campaignFilterTop"
                dataSource={CAMPAIGN_OPTIONS}
                fields={{ text: 'text', value: 'value' }}
                value={this.state.campaign}
                change={this.handleCampaignChange}
                popupHeight="260px"
                itemTemplate={itemTemplateWithTitle}
              />
            </div>
          )}

          {showBrandFilter && (
            <div className='commerce-dropdown' style={{ minWidth: 100, width: 130 }}>
              <DropDownListComponent
                id="brandFilter"
                dataSource={BRAND_OPTIONS}
                fields={{ text: 'text', value: 'value' }}
                value={this.state.brand}
                change={this.handleBrandChange}
                popupHeight="260px"
              />
            </div>
          )}

          {showWarehouseFilter && (
            <div className='commerce-dropdown' style={{ minWidth: 100, width: 150 }}>
              <DropDownListComponent
                id="warehouseFilter"
                dataSource={WAREHOUSE_OPTIONS}
                fields={{ text: 'text', value: 'value' }}
                value={this.state.warehouse}
                change={this.handleWarehouseChange}
                popupHeight="260px"
              />
            </div>
          )}

          {showScenarioFilter && (
            <div className='commerce-dropdown' style={{ minWidth: 100, width: 120 }}>
              <DropDownListComponent
                id="scenarioFilter"
                dataSource={scenarioOptions}
                value={this.state.scenario}
                change={this.handleScenarioChange}
                popupHeight="260px"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  private handleChannelsChange = (e: DropDownChangeEventArgs) => {
    // Support MultiSelect or DropDown: e.value may be an array or single value
    const v: any = (e as any).value ?? (e as any).target?.value ?? null;
    if (Array.isArray(v)) {
      this.setState({ channels: v.length ? v : 'ALL' });
    } else if (v === null || v === undefined) {
      this.setState({ channels: 'ALL' });
    } else {
      // single selection -> normalize to string or array depending on intent
      const s = String(v);
      this.setState({ channels: s === 'ALL' ? 'ALL' : [s] });
    }
  };

  private toolbarTitleTemplate = () => {
    const titleMap: Record<string, string> = {
      overview: 'Overview',
      promotion: 'Promotion Analysis',
      performance: 'Product and Sales Analysis',
      forecast_revenue: 'Revenue Forecasting and Analysis'
    };
    const subtitle = titleMap[this.state.selectedId] ?? '';
    return (
      <div className='header'>
        <div className="searchContent">
          <div className="dashboard-commerce-title">E-Commerce Marketing Dashboard</div>
          <div className='dashboard-commerce-subtitle'>{subtitle}</div>
        </div>
      </div>
    );
  };

  private onToolbarClicked = (args: ClickEventArgs) => {
    const isMenu = (args?.item as any)?.prefixIcon?.includes('e-menu');
    if (isMenu) this.onMenuClicked();
  };

  private withTooltip(title: string, node: JSX.Element) {
    return (
      <TooltipComponent
        content={title}
        position={this.state.isDocked ? 'RightCenter' : 'BottomCenter'}
        openDelay={250}
        closeDelay={0}
        showTipPointer={true}
      >
        {node}
      </TooltipComponent>
    );
  }

  private isLightIconTheme = () => {
    const cls = (document.body?.className || '').toLowerCase();
    const hash = (location.hash.split('/')[1] || '').toLowerCase();
    const key = cls || hash;
    return /(bootstrap5_3|fluent2-highcontrast|fluent2|fluent)(-dark)?/.test(key);
  };
  private icon = (name: string) =>
    `${this.isLightIconTheme() ? 'sf-dashboard-light' : 'sf-dashboard-bold'}-${name}`;

  public render(): JSX.Element {
    const isActive = (id: typeof this.state.selectedId) => (this.state.selectedId === id ? 'active' : '');
    return (
      <div>
        <div className="control-section" id="target_marketing_dash">
          <div className="col-lg-12 col-sm-12 col-md-12" id="marketing_dashboard_sidebar_section">
            <div id="analytic_head">
              <ToolbarComponent
                cssClass="ecommerce-dockToolbar"
                id="ecommerce-dockToolbar"
                height='65px'
                clicked={this.onToolbarClicked}
                key={this.state.selectedId}
              >
                <ItemsDirective>
                  <ItemDirective prefixIcon="e-menu" tooltipText="Menu" />
                  <ItemDirective template={this.toolbarTitleTemplate} />
                </ItemsDirective>
              </ToolbarComponent>
            </div>
            <div className="commerce-workarea">
              <SidebarComponent
                id="dockMarketingSideDash"
                ref={this.sidebarRef}
                width="240px"
                enableDock={true}
                closeOnDocumentClick={false}
                enableGestures={false}
                dockSize="60px"
                type="Push"
                target=".commerce-content"
                open={this.onSidebarOpen}
                close={this.onSidebarClose}
                created={this.onSidebarCreated}
              >
                <div className="sidebar-content">
                  {this.withTooltip('Overview',
                    <div
                      className={`commerce-nav-item ${isActive('overview')}`}
                      onClick={() => this.handleNavClick('overview')}
                    >
                      <span className="e-icons e-home" aria-hidden="true"></span>
                      <span className="commerce-nav-text">Overview</span>
                    </div>
                  )}
                  {this.withTooltip('Promotion',
                    <div
                      className={`commerce-nav-item ${isActive('promotion')}`}
                      onClick={() => this.handleNavClick('promotion')}
                    >
                      <span className={this.icon('promotion')} aria-hidden="true"></span>
                      <span className="commerce-nav-text">Promotion</span>
                    </div>
                  )}
                  {this.withTooltip('Product and Sales',
                    <div
                      className={`commerce-nav-item ${isActive('performance')}`}
                      onClick={() => this.handleNavClick('performance')}
                    >
                      <span className={this.icon('performance')} aria-hidden="true"></span>
                      <span className="commerce-nav-text">Product and Sales</span>
                    </div>
                  )}
                  {this.withTooltip('Revenue Forecasting',
                    <div
                      className={`commerce-nav-item ${isActive('forecast_revenue')}`}
                      onClick={() => this.handleNavClick('forecast_revenue')}
                    >
                      <span className={this.icon('monitoring')} aria-hidden="true"></span>
                      <span className="commerce-nav-text">Revenue Forecasting</span>
                    </div>
                  )}
                </div>
              </SidebarComponent>

              {/* Main content area */}
              <div className="commerce-content">
                <div className="app-commerce-page" style={{ padding: '16px', background: '#ffffff' }}>
                  {this.renderGlobalFilters()}
                  {this.renderDashboard()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
            The E‑Commerce Marketing Dashboard delivers a unified, interactive view of revenue, channel performance, product mix, promotional effectiveness, and supply health. It provides real‑time KPIs (revenue, orders, AOV, conversion, ROAS), drillable visualizations (sales mix, demand origins, product mix, stock composition), campaign and discount impact analyses, and scenario‑based revenue forecasts — all filterable by year, month, region, channel, campaign, category, brand and warehouse to support fast, data‑driven decisions for marketing and merchandising teams.
          </p>
        </div>
      </div>
    );
  }
}
export default EcommerceMarketingDashboard;