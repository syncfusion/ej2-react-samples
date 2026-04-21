import * as React from 'react';
import * as financeDataSource from './data.json';
import { ClickEventArgs, ItemDirective, ItemModel, ItemsDirective, SidebarComponent, ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { DashboardLayoutComponent, PanelDirective, PanelsDirective } from "@syncfusion/ej2-react-layouts";
import { DropDownListComponent, ChangeEventArgs, MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import './finance-dashboard.css';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  AccumulationLegend, Legend, PieSeries, AccumulationTooltip, AccumulationTheme, AccumulationDataLabel,
  ChartComponent, SeriesCollectionDirective, SeriesDirective,
  ColumnSeries, Category, Tooltip, DataLabel, DateTime, SplineSeries, StackingColumnSeries, LineSeries,
  Inject, ILoadedEventArgs, IAxisLabelRenderEventArgs, ITextRenderEventArgs,
  BarSeries,
  AccumulationAnnotation,
  ITooltipRenderEventArgs,
  IAccLoadedEventArgs,
  ChartTheme,
  SparklineComponent,
  StripLine,
  WaterfallSeries,
  AreaSeries,
  SplineAreaSeries,
  StackingAreaSeries,
  StackingStepAreaSeries,
  SparklineTooltip,
} from '@syncfusion/ej2-react-charts';
import { JSX, useEffect, useMemo, useRef, useState } from 'react';
import { AnnotationDirective, Annotations, AnnotationsDirective, AxesDirective, AxisDirective, CircularGaugeComponent, PointerDirective, PointersDirective, RangeDirective, RangesDirective, GaugeTooltip, Legend as CircularGaugeLegend, GaugeTheme } from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './dashboard-bold-icon.css';
import './dashboard-light-icon.css';

let financeData: any = financeDataSource as any;
const cellSpacing: number[] = [10, 10];
const items: any[] = [
  { id: 'overview', text: 'Overview', iconCss: 'e-icons e-chart' },
  { id: 'profitloss', text: 'Financial Performance', iconCss: 'e-icons e-agenda-date-range' },
  { id: 'cashflow', text: 'Cash Flow and Liquidity', iconCss: 'e-icons e-people' },
];
type CashflowItem = {
  year: string | number;
  month: number;            // 1–12 (optional but useful)
  monthamount: number;
  yearAmount: number;
};

type FinanceDashboardState = {
  selectedId: 'overview' | 'profitloss' | 'cashflow';
  selectedYear: number;
  isDocked: boolean;
};

type DashboardProps = {
  selectedYear: number;
  onYearChange: (e: ChangeEventArgs) => void;
};
type CompanyShareItem = { id: string; name: string; amount?: number };
type CompanyShareQuarterly = {
  period: string;
  year: number;
  quarter: string; // or "Q1" | "Q2" | "Q3" | "Q4"
  assets: CompanyShareItem[];
  liabilities: CompanyShareItem[];
  equity: CompanyShareItem[];
};
type CompanyIncome = {
  period: string;
  year: number;
  cogs?: number;
  revenue?: number;
  grossProfit?: number;
  label?: string;
  // optional P&L fields that may be present in source JSON
  operatingExpenses?: number;
  opex?: number;
  otherExpenses?: number;
  interest?: number;
  taxes?: number;
};
const financialAvailableYears = [2021, 2022, 2023, 2024, 2025];
const formatCurrency = (n: number): string => {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2, notation: "compact" }).format(n ?? 0);
};
const companyShareData: CompanyShareQuarterly[] =
  financeData?.companyshares?.companyshares_quarterly ?? [];
const profitShareData: CompanyIncome[] =
  financeData?.incomeStatement.series ?? [];
const currentAssetIds = ["cash", "ar", "inventory"];
const currentLiabilityIds = ["ap", "accrued", "shortDebt"];
const debtIds = ["shortDebt", "longDebt"];
const companyShareGroupedByYear = companyShareData.reduce<Record<number, CompanyShareQuarterly[]>>(
  (acc, item) => {
    (acc[item.year] ??= []).push(item);
    return acc;
  },
  {}
);
const companyIncomeByYear = profitShareData.reduce<Record<number, CompanyIncome>>((acc, item) => {
  acc[item.year] = item;
  return acc;
}, {});

let quartersData = companyShareGroupedByYear[2025];

type Quarter = {
  period: string; // 'YYYY-Qn'
  year: number;
  assets: any[];
  liabilities: any[];
  equity: any[];
};

type YearBuckets = Record<string, Quarter[]>;
const sumItems = (items: CompanyShareItem[] = []) =>
  items.reduce((s, x) => s + (x.amount ?? 0), 0);
const sumOneQuarter = (q: CompanyShareItem[]) => sumItems(q)

const sumCurrentAssetItems = (items: CompanyShareItem[] = []) =>
  items.filter(a => currentAssetIds.includes(a.id)).reduce((s, x) => s + (x.amount ?? 0), 0);
const sumCurrentAssetQuarter = (q: CompanyShareItem[]) => sumCurrentAssetItems(q)

const sumCurrentLiabilitiesItems = (items: CompanyShareItem[] = []) =>
  items.filter(a => currentLiabilityIds.includes(a.id)).reduce((s, x) => s + (x.amount ?? 0), 0);
const sumCurrentLiabilitiesQuarter = (q: CompanyShareItem[]) => sumCurrentLiabilitiesItems(q)

const sumDebtItems = (items: CompanyShareItem[] = []) =>
  items.filter(a => debtIds.includes(a.id)).reduce((s, x) => s + (x.amount ?? 0), 0);
const sumDebtQuarter = (q: CompanyShareItem[]) => sumDebtItems(q)

const sumInvesmentItems = (items: CompanyShareItem[] = []) =>
  items.reduce((s, x) => s + (x.amount ?? 0), 0);
const sumInvesmentQuarter = (q: CompanyShareItem[]) => sumInvesmentItems(q)

const sumInventoryItems = (items: CompanyShareItem[] = []) =>
  items.find(a => a.id === "inventory")?.amount ?? 0;
const sumInventoryQuarter = (q: CompanyShareItem[]) => sumInventoryItems(q)


//stored the total amount based on the each year.
const quarterAllSharesByYear = Object.fromEntries(
  Object.entries(companyShareGroupedByYear).map(([year, qObj]) => {
    const totals = {
      Assets: Math.round(qObj.reduce((s, q) => s + sumOneQuarter(q.assets), 0)),
      Liabilities: Math.round(qObj.reduce((s, q) => s + sumOneQuarter(q.liabilities), 0)),
      Equity: Math.round(qObj.reduce((s, q) => s + sumOneQuarter(q.equity), 0)),
      Debt: Math.round(qObj.reduce((s, q) => s + sumDebtQuarter(q.liabilities), 0)),
      CurrentAssets: Math.round(qObj.reduce((s, q) => s + sumCurrentAssetQuarter(q.assets), 0)),
      CurrentLiabilities: Math.round(qObj.reduce((s, q) => s + sumCurrentLiabilitiesQuarter(q.liabilities), 0)),
      InitialInvestment: Math.round(qObj.reduce((s, q) => s + sumInvesmentQuarter(q.equity), 0)),
      InventoryAmount: Math.round(qObj.reduce((s, q) => s + sumInventoryQuarter(q.assets), 0)),
    };
    return [Number(year), totals] as const;
  })
);

// accessing the cash inflow data from json file
const cashInflowData = (financeData.cashInFlows?.series ?? [])
  .flatMap((s: any) =>
    (s.monthlyseries ?? []).map((m: any) => ({
      yearAmount: Number(s.amount) || 0,    // the annual total for that year
      year: m.year,
      month: m.month,
      monthamount: Number(m.amount) || 0,
      monthlabel: m.label,
      yearlabel: s.label
    }))
  );
const cashInFlowGroupCollection = (cashInflowData as CashflowItem[]).reduce(
  (acc, item) => {
    const idx = Number(item.year) - 1;
    (acc[idx] ??= []).push(item);
    return acc;
  },
  [] as CashflowItem[][]
);
const cashInFlowTotals = cashInFlowGroupCollection.map((group: CashflowItem[]) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += group[i]?.monthamount ?? 0;
  }
  return Math.round(sum);
});

// accessing the cash outflow data from json file
const cashOutflowData = (financeData.cashOutFlows?.series ?? [])
  .flatMap((s: any) =>
    (s.monthlyseries ?? []).map((m: any) => ({
      yearAmount: Number(s.amount) || 0,    // the annual total for that year
      year: m.year,
      month: m.month,
      monthamount: Number(m.amount) || 0,
      monthlabel: m.label,
      yearlabel: s.label
    }))
  );
const cashOutFlowGroupCollection = (cashOutflowData as CashflowItem[]).reduce(
  (acc, item) => {
    const idx = Number(item.year) - 1;
    (acc[idx] ??= []).push(item);
    return acc;
  },
  [] as CashflowItem[][]
);
const cashOutFlowTotals = cashOutFlowGroupCollection.map((group: CashflowItem[]) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += group[i]?.monthamount ?? 0;
  }
  return Math.round(sum);
});

// calculate the total amount of assests, liabilities and equities and represent in the chart.
const getAmount = (items: CompanyShareItem[], id: string) =>
  items?.find(x => x.id === id)?.amount ?? 0;
const sum = (o: Record<string, number>) =>
  Object.values(o).reduce((a, b) => a + b, 0);
const buildChartData = (quarters: CompanyShareQuarterly[]) =>
  quarters.map((q) => {
    const assets = {
      cash: getAmount(q.assets, "cash"),
      ar: getAmount(q.assets, "ar"),
      inventory: getAmount(q.assets, "inventory"),
      ppe: getAmount(q.assets, "ppe"),
      otherAssets: getAmount(q.assets, "otherAssets"),
    };

    const liabilities = {
      ap: getAmount(q.liabilities, "ap"),
      accrued: getAmount(q.liabilities, "accrued"),
      shortDebt: getAmount(q.liabilities, "shortDebt"),
      longDebt: getAmount(q.liabilities, "longDebt"),
    };

    const equity = {
      commonStock: getAmount(q.equity, "commonStock"),
      apic: getAmount(q.equity, "apic"),
      retained: getAmount(q.equity, "retained"),
    };

    return {
      // create a nice x-axis label
      x: `${q.quarter} ${q.year}`,  // e.g., "Q1 2025"
      period: q.quarter,
      year: q.year,
      assets: sum(assets),
      liabilities: sum(liabilities),
      equity: sum(equity)
    };
  });


function getYearEndCashFromShares(year: number): number | null {
  const quarters = companyShareGroupedByYear[year] ?? [];
  if (!quarters || quarters.length === 0) return null;
  // pick the quarter with the highest quarter number (handles "Quarter 1", "Q1", etc.)
  const qNum = (qLabel: string) => {
    const m = String(qLabel).match(/(\d+)/);
    return m ? Number(m[1]) : 0;
  };
  let best = quarters[0];
  let bestN = qNum(best.quarter ?? best.period ?? '');
  for (const q of quarters) {
    const n = qNum(q.quarter ?? q.period ?? '');
    if (n > bestN) { best = q; bestN = n; }
  }
  const val = getAmount(best.assets ?? [], 'cash');
  return typeof val === 'number' ? Math.round(val) : null;
}

const cashBalances: number[] = [];
for (let i = 0; i < financialAvailableYears.length; i++) {
  const year = financialAvailableYears[i];
  const yearEndCash = getYearEndCashFromShares(year);

  if (yearEndCash !== null && !Number.isNaN(yearEndCash)) {
    // Use the Q4 / last-quarter cash from companyshares as the canonical year-end balance
    cashBalances.push(Math.round(yearEndCash));
    continue;
  }

  // Fallback: compute closing by aggregating monthly nets (older logic)
  const openingYearAmount = cashInFlowGroupCollection[i]?.[0]?.yearAmount ?? 0;
  let running = (i === 0 ? 0 : (cashBalances[i - 1] ?? 0)) + openingYearAmount;
  for (let j = 0; j < 12; j++) {
    const inflow = cashInFlowGroupCollection[i]?.[j]?.monthamount ?? 0;
    const outflow = cashOutFlowGroupCollection[i]?.[j]?.monthamount ?? 0;
    running += inflow - outflow;
  }
  cashBalances.push(Math.round(running));
}

function formatCompactCurrencySignificant(n: number, significantDigits = 3) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumSignificantDigits: significantDigits,
  }).format(n ?? 0);
}

const getAxisLabelFromTarget = (targetId?: string) => {
  if (!targetId) return { text: '', year: null as number | null };

  // 1) try direct element lookup by id
  const el = document.getElementById(String(targetId));
  if (el) {
    const text = (el.textContent || (el as HTMLElement).innerText || '').trim();
    const m = text.match(/(\d{4})/);
    return { text, year: m ? Number(m[1]) : null as number | null };
  }

  // 2) fallback: if id encodes label index (e.g. "..._AxisLabel_1"), pick element by index
  const idxMatch = String(targetId).match(/_AxisLabel_(\d+)/i);
  if (idxMatch) {
    const idx = Number(idxMatch[1]);
    const labels = Array.from(document.querySelectorAll(`#income-expense-year-column .e-axis-label, #income-expense-year-column .e-text`));
    const found = labels[idx] as HTMLElement | undefined;
    if (found) {
      const text = (found.textContent || found.innerText || '').trim();
      const m = text.match(/(\d{4})/);
      return { text, year: m ? Number(m[1]) : null as number | null };
    }
  }

  return { text: '', year: null as number | null };
};

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

const sparklinePalette = ["#05B3DA", "#E77A16", "#9204EA", "#6200EE", "#B1212D", "#82C100"];

// Dashboard 1 (Overview) with title + droddown with years
const OverviewDashboard: React.FC<DashboardProps> = ({ selectedYear, onYearChange }) => {
  const overviewRef = React.useRef<DashboardLayoutComponent | null>(null);
  const sparkPieRef = React.useRef<SparklineComponent | null>(null);
  const debtAssetRatioChartRef = React.useRef<ChartComponent | null>(null);
  const assetLiabilitiesPieChartRef = React.useRef<AccumulationChartComponent | null>(null);
  const assetLiabilitiesQuaterlyChartRef = React.useRef<ChartComponent | null>(null);
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshAll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        overviewRef.current?.refresh();
        sparkPieRef.current?.refresh();
        debtAssetRatioChartRef.current?.refresh();
        assetLiabilitiesPieChartRef.current?.refresh();
        assetLiabilitiesQuaterlyChartRef.current?.refresh();
      }, 500);
    };
    window.addEventListener('sidebar-toggled', refreshAll);
    window.addEventListener('resize', refreshAll);
    return () => {
      window.removeEventListener('sidebar-toggled', refreshAll);
      window.removeEventListener('resize', refreshAll);
      clearTimeout(timer);
    };
  }, []);
  const selectedDropdownYear = selectedYear;
  const [drillLevel, setDrillLevel] = React.useState<'root' | 'assets' | 'liabilities' | 'equity'>('root');
  const [pieData, setPieData] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState<string>('');
  type RatioKey = 'Debt by Asset Ratio' | 'Debt by Equity Ratio'; // add more as needed
  type Point = { period: string; value: number };
  const debtValues: { value: RatioKey }[] = [
    { value: 'Debt by Asset Ratio' },
    { value: 'Debt by Equity Ratio' },
  ];
  const [selectedRatio, setSelectedRatio] = useState<RatioKey[]>([
    'Debt by Asset Ratio',
    'Debt by Equity Ratio'
  ]);
  const debtRatiosData = [
    { year: '2021', debtToAsset: quarterAllSharesByYear[2021].Debt / quarterAllSharesByYear[2021].Assets, debtToEquity: quarterAllSharesByYear[2021].Debt / quarterAllSharesByYear[2021].Equity },
    { year: '2022', debtToAsset: quarterAllSharesByYear[2022].Debt / quarterAllSharesByYear[2022].Assets, debtToEquity: quarterAllSharesByYear[2022].Debt / quarterAllSharesByYear[2022].Equity },
    { year: '2023', debtToAsset: quarterAllSharesByYear[2023].Debt / quarterAllSharesByYear[2023].Assets, debtToEquity: quarterAllSharesByYear[2023].Debt / quarterAllSharesByYear[2023].Equity },
    { year: '2024', debtToAsset: quarterAllSharesByYear[2024].Debt / quarterAllSharesByYear[2024].Assets, debtToEquity: quarterAllSharesByYear[2024].Debt / quarterAllSharesByYear[2024].Equity },
    { year: '2025', debtToAsset: quarterAllSharesByYear[2025].Debt / quarterAllSharesByYear[2025].Assets, debtToEquity: quarterAllSharesByYear[2025].Debt / quarterAllSharesByYear[2025].Equity },
  ];
  const quickSeries = [
    { period: '2021', value: 1.90 },
    { period: '2022', value: 2.29 },
    { period: '2023', value: 2.29 },
    { period: '2024', value: 2.28 },
    { period: '2025', value: 2.28 }
  ];
  const currentSeries = [
    { period: '2021', value: 2.74 },
    { period: '2022', value: 3.32 },
    { period: '2023', value: 3.31 },
    { period: '2024', value: 3.3 },
    { period: '2025', value: 3.3 }
  ];
  const equitySeries = [
    { period: '2021', value: 0.7 },
    { period: '2022', value: 0.7 },
    { period: '2023', value: 0.7 },
    { period: '2024', value: 0.7 },
    { period: '2025', value: 0.7 }
  ];
  const chartData = React.useMemo(() => buildChartData(quartersData), [quartersData]);
  const availableQuarters = useMemo(
    () => Array.from(new Set(chartData.map(d => d.period))),
    [chartData]
  );
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>(availableQuarters);
  const financialFilteredData = useMemo(
    () => selectedQuarters.length ? chartData.filter(d => selectedQuarters.includes(d.period)) : chartData,
    [selectedQuarters, chartData]
  );
  const debtAssetEquityMaxValue = Math.max(
    ...debtRatiosData.flatMap(d => [d.debtToAsset, d.debtToEquity])
  );

  const npvCurrent = ((cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear)]
    - cashOutFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear)]) / Math.pow(1 + 0.10, financialAvailableYears.indexOf(selectedDropdownYear) + 1));
  const npvPrevious = ((cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear - 1)]
    - cashOutFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear - 1)]) / Math.pow(1 + 0.10, financialAvailableYears.indexOf(selectedDropdownYear) + 1));
  const npvPctChange = (npvCurrent - npvPrevious) / (npvPrevious) * 100;
  let npvPctFormatted =
    npvPctChange === null ? '—' : (npvPctChange === Infinity ? '∞' : `${npvPctChange.toFixed(1)}%`);
  let npvIsUp = npvPrevious !== null ? npvCurrent > npvPrevious : false;


  // build NPV pie data for all years (keeps existing logic)
  const paletteAll = ['#73467D', '#D989B5', '#7DE5ED', '#F675A8', '#FFADBC', '#87A2FB', '#EF9A53', '#C539B4', '#645CAA'];
  const smallPieData = financialAvailableYears.map((y, i) => {
    const idx = financialAvailableYears.indexOf(y);
    const pv = Math.round((cashInFlowTotals[idx]
      - cashOutFlowTotals[idx]) / Math.pow(1 + 0.10, idx + 1)).toFixed(2);
    return { x: String(y), y: Math.max(0, Number(pv)), color: paletteAll[i % paletteAll.length] };
  }).filter(d => d.y > 0);

  const computeIRR = (cashFlows: number[], guess = 0.1, maxIter = 100, tol = 1e-6) => {
    let rate = guess;
    for (let i = 0; i < maxIter; i++) {
      let npv = 0;
      let der = 0;
      for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + rate, t);
        if (t > 0) der += -t * cashFlows[t] / Math.pow(1 + rate, t + 1);
      }
      if (Math.abs(npv) < tol) return rate;
      if (Math.abs(der) < 1e-12) break;
      rate = rate - npv / der;
      if (!isFinite(rate) || rate <= -0.9999) break;
    }
    // fallback: simple binary search
    let lo = -0.9999, hi = 10;
    for (let i = 0; i < maxIter; i++) {
      const mid = (lo + hi) / 2;
      const npvMid = cashFlows.reduce((s, cf, t) => s + cf / Math.pow(1 + mid, t), 0);
      if (Math.abs(npvMid) < tol) return mid;
      const npvLo = cashFlows.reduce((s, cf, t) => s + cf / Math.pow(1 + lo, t), 0);
      if (npvLo * npvMid <= 0) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  };

  const selIdx = financialAvailableYears.indexOf(selectedDropdownYear);
  const selIdxPrevious = financialAvailableYears.indexOf(selectedDropdownYear) - 1;
  // use a stable initial investment (first year or top-level value)
  const initialInvestment = Math.abs(
    quarterAllSharesByYear[financialAvailableYears[selectedDropdownYear]]?.InitialInvestment
    ?? financeData?.companyshares?.initialInvestment
    ?? 0
  );

  const initialInvestPrevious = Math.abs(
    quarterAllSharesByYear[financialAvailableYears[selectedDropdownYear - 1]]?.InitialInvestment
    ?? financeData?.companyshares?.initialInvestment
    ?? 0
  );

  const netAnnualFlows = financialAvailableYears.map((y, i) => {
    const inflow = Number(cashInFlowTotals[i] ?? 0);
    const outflow = Number(cashOutFlowTotals[i] ?? 0);
    return Math.round(inflow - outflow);
  });

  const cashFlows = [-initialInvestment, ...netAnnualFlows];

  // build cashFlows up to the selected year (year 1 => [-init, y1], year 2 => [-init, y1, y2], ...)
  const flowsUpToSelected = selIdx >= 0
    ? [-initialInvestment, ...netAnnualFlows.slice(0, selIdx + 1)]
    : [-initialInvestment, ...netAnnualFlows];

  const flowsUpToSelectedPrevious = selIdxPrevious >= 0
    ? [-initialInvestment, ...netAnnualFlows.slice(0, (selIdxPrevious + 1))]
    : [-initialInvestment, ...netAnnualFlows];

  // compute IRR (decimal)
  const irrRate = computeIRR(flowsUpToSelected, 0.1);
  const irrRatePrevious = computeIRR(flowsUpToSelectedPrevious, 0.1);
  const irrPctLabel = irrRate === null ? null : irrRate * 100;
  const irrArrowUp = irrRatePrevious > irrRate;
  const irrFormatLabel = ((irrRate - irrRatePrevious) / (irrRatePrevious) * 100).toFixed(2);
  // build pie datasource: discounted contribution of each year's net flow at the IRR
  const paletteIRRAll = ['#87A2FB', '#EF9A53', '#C539B4', '#645CAA'];
  const cumulativeIrrPercents = financialAvailableYears.map((y, i) => {
    const flows = [-initialInvestment, ...netAnnualFlows.slice(0, i + 1)];
    const r = computeIRR(flows);
    return r === null ? null : Number((r * 100).toFixed()); // percent (can be negative)
  });

  const irrPieData = cumulativeIrrPercents
    .map((p, i) => {
      if (p === null || !isFinite(p)) return null;
      const absPct = Math.abs(p); // use absolute % to size pie slices (or keep sign if you prefer)
      return {
        x: String(financialAvailableYears[i]),
        y: absPct,                        // slice size = IRR percent magnitude
        text: `${p.toFixed()}%`,         // label shows signed IRR%
        tooltipText: `IRR: ${p.toFixed()}%`,
        irrPercent: p,                    // attach signed IRR percent for later use
        color: paletteIRRAll[i % paletteIRRAll.length]
      };
    })
    .filter(Boolean) as any[];

  const workingCapitalValue = quarterAllSharesByYear[selectedDropdownYear].CurrentAssets - quarterAllSharesByYear[selectedDropdownYear].CurrentLiabilities;
  const workingCapitalPreValue = quarterAllSharesByYear[selectedDropdownYear - 1].CurrentAssets - quarterAllSharesByYear[selectedDropdownYear - 1].CurrentLiabilities;
  const workingPctChange = ((workingCapitalValue - workingCapitalPreValue) / Math.abs(workingCapitalPreValue)) * 100;
  let workingPctFormatted =
    workingPctChange === null ? '—' : (workingPctChange === Infinity ? '∞' : `${workingPctChange.toFixed(1)}%`);
  let workingIsUp = workingCapitalPreValue !== null ? workingCapitalValue > workingCapitalPreValue : false;


  const workingCapitalPerYear = financialAvailableYears.map((y, i) => {
    const totals = quarterAllSharesByYear[y] ?? { CurrentAssets: 0, CurrentLiabilities: 0 };
    const wc = Math.round((totals.CurrentAssets ?? 0) - (totals.CurrentLiabilities ?? 0));
    return { x: String(y), y: wc };
  });

  // pie datasource (only positive slices) with palette
  const paletteWC = ['#73467D', '#87A2FB', '#D989B5', '#7DE5ED', '#EF9A53'];
  const workingCapitalPieData = workingCapitalPerYear
    .map((d, i) => ({ x: d.x, y: Math.max(0, d.y), color: paletteWC[i % paletteWC.length] }))
    .filter(p => p.y > 0);

  const quickRatioValue = (quarterAllSharesByYear[selectedDropdownYear].CurrentAssets - quarterAllSharesByYear[selectedDropdownYear].InventoryAmount) / quarterAllSharesByYear[selectedDropdownYear].CurrentLiabilities;
  const currentRatioValue = quarterAllSharesByYear[selectedDropdownYear].CurrentAssets / quarterAllSharesByYear[selectedDropdownYear].CurrentLiabilities;
  const equityRatioValue = quarterAllSharesByYear[selectedDropdownYear].Equity / quarterAllSharesByYear[selectedDropdownYear].Assets;

  const initialInvestmentValue = quarterAllSharesByYear[selectedDropdownYear].InitialInvestment;
  const initialInvestmentPrevious = quarterAllSharesByYear[selectedDropdownYear - 1].InitialInvestment;
  const initialArrowUp = initialInvestmentValue > initialInvestmentPrevious;
  const initialComparison = ((initialInvestmentValue - initialInvestmentPrevious) / initialInvestmentValue * 100).toFixed(2);

  const initialInvestmentCard = () => MetricInvestmentCard("Initial Investment", formatCurrency(initialInvestmentValue), initialComparison + "%", initialArrowUp);
  const npvCard = () => IRRCard("Net Present Value", false, '', formatCompactCurrencySignificant(npvCurrent, 2), npvIsUp, npvPctFormatted, "npvspark", npvPrevious, npvCurrent, "#87A2FB", smallPieData, 'Year: ${x}<br/>Amount: $${y}');
  const irrCard = () => IRRCard("Internal Rate of Return", true, "Internal Rate of Return", Math.round(Number(irrPctLabel)) + '%', irrArrowUp, irrFormatLabel + '%', "irrspark", irrRatePrevious, irrRate, "#F8E9F6", irrPieData, 'Year: ${x}<br/>IRR Value: ${y} %');
  const networkingcapital = () => IRRCard("Working Capital", false, '', formatCurrency(workingCapitalValue), workingIsUp, workingPctFormatted, "networkspark", workingCapitalPreValue, workingCapitalValue, "#C539B4", workingCapitalPieData, 'Year: ${x}<br/>Amount: $${y}');

  // compute % change vs previous FY for a selected year
  const getPctChange = (data: { period: string; value: number }[], year: number) => {
    const cur = data.find(d => Number(d.period) === year)?.value ?? null;
    const prev = data.find(d => Number(d.period) === year - 1)?.value ?? null;

    if (prev === null || cur === null || Math.abs(prev) < 1e-9) {
      return { pct: null as number | null, cur, prev, isGreater: null as boolean | null };
    }

    const diff = cur - prev;
    const pct = (diff / Math.abs(prev)) * 100;

    const EPS = 1e-6;
    let isGreater: boolean | null = null;
    if (diff > EPS) isGreater = true;
    else if (diff < -EPS) isGreater = false;
    else isGreater = null; // treat equal as neutral

    return { pct, cur, prev, isGreater };
  }

  const quickPctChange = getPctChange(quickSeries, selectedDropdownYear);
  const currentPctChange = getPctChange(currentSeries, selectedDropdownYear);
  const equityPctChange = getPctChange(equitySeries, selectedDropdownYear);

  const quickComparisonLabel = `${quickPctChange?.pct?.toFixed(1)}%`;
  const currentComparisonLabel = `${currentPctChange?.pct?.toFixed(1)}%`;
  const equityComparisonLabel = `${currentPctChange?.pct?.toFixed(1)}%`;

  const gaugeEquity = () => RatioCardEquity(
    "Equity Ratio",
    formatCurrency(equityRatioValue),
    "#87A2FB",
    "#87A2FB",
    equitySeries,
    equityComparisonLabel,
    (equityPctChange?.isGreater ?? false)
  );


  const gaugeQuick = () => RatioCard(
    "Quick Ratio",
    formatCurrency(quickRatioValue),
    "#EF9A53",
    "#EF9A53",
    quickSeries,
    quickComparisonLabel,
    (quickPctChange?.isGreater ?? false)
  );

  const gaugeCurrent = () => RatioCard(
    "Current Ratio",
    formatCurrency(currentRatioValue),
    "#7DE5ED",
    "#7DE5ED",
    currentSeries,
    currentComparisonLabel,
    (currentPctChange?.isGreater ?? false)
  );


  const RatioCardEquity = (
    title: string,
    value: string,
    color: string,
    bgFill: string,
    data: Point[],
    comparisonvalue: string,
    isGood: boolean
  ) => {
    const chipBg = isGood ? "#dcfce7" : "#fee2e2";
    const chipText = isGood ? "#16a34a" : "#991b1b";
    const arrow = isGood ? '▲' : '▼';
    return (
      <div id='main-finance-div'>
        <div id='title-finance-card'>{title}</div>
        <div id='card-finance-value'>{value}</div>
      </div>
    );
  };

  const RatioCard = (
    title: string,
    value: string,
    color: string,
    bgFill: string,
    data: Point[],
    comparisonvalue: string,
    isGood: boolean
  ) => {
    const chipText = isGood ? "#16a34a" : "#991b1b";
    return (
      <div id='main-finance-div'>
        <div id='title-finance-card'>{title}</div>
        <div id='card-finance-value'>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
          <span
            style={{
              color: isGood ? '#16a34a' : '#dc2626',   // fix: use boolean, not string
              fontWeight: 600
            }}
          >
            {isGood ? '▲' : '▼'} {comparisonvalue}
          </span>
          <span style={{ fontSize: 12 }}>
            vs {selectedDropdownYear - 1}
          </span>
        </div>
      </div>
    );
  };

  const MetricInvestmentCard = (title: string, value: string | number | null, comparisonValue: string, arrowUp: boolean) => {
    // const chipBg = arrowUp ? '#dcfce7' : '#fee2e2';
    const chipText = arrowUp ? '#16a34a' : '#991b1b';
    const arrow = arrowUp ? '▲' : '▼';
    return (
      <div className="kpi-totalcard">
        <div className="spark-header">
          <div className="kpi-label">{title}</div>
          <div className="kpi-value">{value}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
            <span style={{ color: chipText, fontWeight: 600 }}>
              {arrow} {comparisonValue}
            </span>
            <span style={{ fontSize: 12 }}>
              vs {selectedDropdownYear - 1}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const IRRCard = (title: string, showtooltip: boolean, tooltipValue: string, value: string | number | null, updownarrow: boolean, comparisonvalue: string, sparkId: string, previousValue: number, currentValue: number, color: string, pieData: any, tooltipFormatValue: string) => {
    // const chipBg = updownarrow ? '#dcfce7' : '#fee2e2';
    const chipText = updownarrow ? '#16a34a' : '#991b1b';
    const arrow = updownarrow ? '▲' : '▼';
    return (
      <div className="kpi-totalcard">
        <div className="spark-header">
          <div className="kpi-label">{title}</div>
          <div className="kpi-value">{value}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: chipText, fontSize: 12, fontWeight: 600 }}>
              <span style={{ fontSize: 12 }}>{arrow}</span>
              <span>{comparisonvalue}</span>
            </span>
            <div style={{ fontSize: 12 }}>{`vs ${selectedDropdownYear - 1}`}</div>
          </div>
        </div>
        <div className="spark-content" style={{ width: '50%', height: '50%' }}>
          <div style={{ marginTop: 0, width: '100%' }}>
            <SparklineComponent
              id={`${sparkId}-pie`}
              ref={sparkPieRef}
              type="Pie"
              dataSource={pieData}
              xName="x"
              yName="y"
              width="100%"
              height="68px"
              lineWidth={2}
              palette={sparklinePalette}
              markerSettings={{ visible: ['All'], size: 2, fill: '#05B3DA' }}
              tooltipSettings={{ visible: true, format: tooltipFormatValue }}
            >
              <Inject services={[SparklineTooltip]} />
            </SparklineComponent>
          </div>
        </div>
      </div>
    );
  };

  const assetliabilities = () => {
    quartersData = companyShareGroupedByYear[selectedDropdownYear];
    const onAxisLabelRender = (args: IAxisLabelRenderEventArgs) => {
      if (args.axis && args.axis.name === 'primaryYAxis') {
        args.text = formatCurrency(Number(args.text));
      }
    };
    const computeYAxis = (data: { assets?: number; liabilities?: number; equity?: number }[]) => {
      if (!data || data.length === 0) return { minimum: 0, maximum: 100, interval: 25 };
      // pick the largest series value (safe for stacked or individual series)
      const maxVal = Math.max(...data.map(d => Math.max(d.assets ?? 0, d.liabilities ?? 0, d.equity ?? 0)));
      if (!isFinite(maxVal) || maxVal <= 0) return { minimum: 0, maximum: 1, interval: 1 };

      // "Nice" rounding: round max up to 1,2,5 × 10^n
      const mag = Math.pow(10, Math.floor(Math.log10(maxVal)));
      const candidates = [1, 2, 5, 10].map(m => m * mag);
      const niceMax = candidates.find(c => c >= maxVal) ?? candidates[candidates.length - 1];

      // choose interval as a quarter of niceMax (adjustable)
      const interval = niceMax / 4;
      return { minimum: 0, maximum: niceMax, interval };
    };

    const yAxisCfg = computeYAxis(financialFilteredData);
    const onTextRender = (args: ITextRenderEventArgs) => {
      // only modify series data labels (args.point exists for data-label rendering)
      if (args.point && typeof args.point.y === 'number') {
        args.text = formatCurrency(Number(args.point.y));
      }
    };
    return (
      <div style={{ height: '100%', width: '100%', padding: 8 }}>
        <ChartComponent
          id="stacked-column-chart"
          ref={assetLiabilitiesQuaterlyChartRef}
          load={onChartLoad}
          textRender={onTextRender}
          axisLabelRender={onAxisLabelRender}
          tooltipRender={onCurrencyTooltip}
          chartArea={{ border: { width: 0 } }}
          primaryXAxis={{
            valueType: 'Category',
            majorGridLines: { width: 0 }
          }}
          primaryYAxis={{
            labelFormat: '{value}',
            majorGridLines: { width: 1 }
          }}
          tooltip={{ enable: true }}
          legendSettings={{ visible: true }}
        >
          <Inject services={[ColumnSeries, StackingColumnSeries, DataLabel, Category, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={financialFilteredData}
              xName="period"
              yName="assets"
              name="Assets"
              fill={rootPalette.assets}
              type="Column"
              stackingGroup="assets"
              marker={{ visible: true, dataLabel: { visible: true } }}
              animation={{ enable: false }}
            />
            <SeriesDirective
              dataSource={financialFilteredData}
              xName="period"
              yName="liabilities"
              name="Liabilities"
              fill={rootPalette.liabilities}
              type="Column"
              stackingGroup="liabilities"
              marker={{ visible: true, dataLabel: { visible: true } }}
              animation={{ enable: false }}
            />
            <SeriesDirective
              dataSource={financialFilteredData}
              xName="period"
              yName="equity"
              name="Equity"
              fill={rootPalette.equity}
              type="Column"
              stackingGroup="equity"
              marker={{ visible: true, dataLabel: { visible: true } }}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>

        </ChartComponent>
      </div>
    );
  };

  const rootPalette = {
    assets: '#C539B4',
    liabilities: '#87A2FB',
    equity: '#F675A8'
  };
  // root uses numeric totals from quarterAllSharesByYear (these have Assets, Liabilities, Equity)
  const buildRootDataWithColors = React.useCallback(() => {
    const totals = quarterAllSharesByYear[selectedDropdownYear] ?? { Assets: 0, Liabilities: 0, Equity: 0 };
    setPieData([
      { x: 'Assets', y: totals.Assets, color: rootPalette.assets, key: 'assets' },
      { x: 'Liabilities', y: totals.Liabilities, color: rootPalette.liabilities, key: 'liabilities' },
      { x: 'Equity', y: totals.Equity, color: rootPalette.equity, key: 'equity' }
    ]);
    setTitle('');
    setDrillLevel('root');
  }, [selectedDropdownYear]);

  React.useEffect(() => { buildRootDataWithColors(); }, [buildRootDataWithColors]);

  const onCurrencyTooltip = (args: any) => {
    const y = Number(args?.point?.y ?? 0);
    const x = String(args?.point?.x ?? '');
    const series = String(args?.series?.name ?? '');
    args.text = series ? `${x} : ${formatCurrency(y)}` : `${x}: ${formatCurrency(y)}`;
  };

  const assetliabilitiesPie = () => {
    const detailPalettes: Record<string, string[]> = {
      assets: ['#d674cb', '#87a2fb', '#f1a86a', '#aaeef3', '#f18a9a'],
      liabilities: ['#d674cb', '#87a2fb', '#f1a86a', '#aaeef3', '#f18a9a'],
      equity: ['#d674cb', '#87a2fb', '#f1a86a', '#aaeef3', '#f18a9a']
    };

    const onTextRender = (args: ITextRenderEventArgs) => {
      // only modify series data labels (args.point exists for data-label rendering)
      if (args.point && typeof args.point.y === 'number') {
        args.text = formatCurrency(Number(args.point.y));
      }
    };

    const drillPieChart = (key: any, breakdownLabel: string) => {
      const quarters = companyShareGroupedByYear[selectedDropdownYear] ?? [];
      const items = (quarters as any[]).flatMap(q => (q[key] ?? []) as CompanyShareItem[]);
      if (!items || items.length === 0) return;

      // aggregate by item name
      const agg: Record<string, number> = {};
      for (const it of items) {
        agg[it.name ?? 'Unknown'] = (agg[it.name ?? 'Unknown'] || 0) + (it.amount ?? 0);
      }

      const palette = detailPalettes[key] ?? ['#cccccc'];
      const subData = Object.entries(agg).map(([name, amount], idx) => ({
        x: name,
        y: amount,
        color: palette[idx % palette.length] // assign color from detail palette
      }));

      setPieData(subData);
      setTitle(`${breakdownLabel} breakdown`);
      setDrillLevel(key as any);
    };

    const getPieBreakdownFromTarget = (targetId?: string) => {
      if (!targetId) return null;
      // try direct element lookup first (preferred)
      const el = document.getElementById(String(targetId));
      if (el) {
        const txt = (el.textContent || (el as HTMLElement).innerText || '').trim();
        if (txt) {
          // if element contains numeric index (e.g. "0") map to Assets/Liabilities/Equity
          if (/^\d+$/.test(txt)) {
            const idx = Number(txt);
            const keys = ['assets', 'liabilities', 'equity'];
            const labels = ['Assets', 'Liabilities', 'Equity'];
            if (idx >= 0 && idx < keys.length) return { key: keys[idx], label: labels[idx] };
          }
          // otherwise treat the text as the label/key
          return { key: String(txt).toLowerCase(), label: txt };
        }
      }

      // fallback: parse encoded id like 'asset-liability-equity-pie_datalabel_Series_0_text_0'
      const m = String(targetId).match(/_datalabel_Series_\d+_text_(\d+)/i) || String(targetId).match(/_text_(\d+)/i);
      if (m) {
        const idx = Number(m[1]);
        const keys = ['assets', 'liabilities', 'equity'];
        const labels = ['Assets', 'Liabilities', 'Equity'];
        if (!Number.isNaN(idx) && idx >= 0 && idx < keys.length) return { key: keys[idx], label: labels[idx] };
      }

      // last-resort: take last underscore token if numeric
      const parts = String(targetId).split('_');
      const last = parts[parts.length - 1];
      if (/^\d+$/.test(last)) {
        const idx = Number(last);
        const keys = ['assets', 'liabilities', 'equity'];
        const labels = ['Assets', 'Liabilities', 'Equity'];
        if (idx >= 0 && idx < keys.length) return { key: keys[idx], label: labels[idx] };
      }

      return null;
    };

    const onChartMouseClick = (args: any) => {
      const targetId = args.target || args.event?.target?.id;
      const found = getPieBreakdownFromTarget(targetId);
      if (!found) return;
      // only allow drill when at root level
      if (drillLevel !== 'root') return;
      drillPieChart(found.key, found.label);
    };

    const onPointClick = (args: any) => {
      if (drillLevel !== 'root') return;
      const key = (args.point && args.point.key) || (args.point && String(args.point.x).toLowerCase()) || null;
      const breakdownLabel = args.point.x;
      if (!key) return;
      drillPieChart(key, breakdownLabel);
    };

    const onAxisLabelRender = (args: IAxisLabelRenderEventArgs) => {
      if (args.axis && args.axis.name === 'primaryYAxis') {
        args.text = formatCurrency(Number(args.text));
      }
    };
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }} onClick={() => { if (drillLevel !== 'root') buildRootDataWithColors(); }}>
        {drillLevel !== 'root' && (
          <button onClick={(e) => { e.stopPropagation(); buildRootDataWithColors(); }} style={{ background: 'transparent', position: 'absolute', top: 8, right: 8, zIndex: 5 }}>
            Back
          </button>
        )}
        <div style={{ paddingTop: 8, textAlign: 'center', fontWeight: 600 }}>{title}</div>
        {drillLevel === 'root' ? (
          <AccumulationChartComponent
            ref={assetLiabilitiesPieChartRef}
            id="asset-liability-equity-pie"
            load={onAccumulationLoad}
            legendSettings={{ visible: true, position: 'Bottom' }}
            tooltip={{ enable: true, format: '${point.x} : ${point.y}' }}
            height={'100%'}
            width={'100%'}
            textRender={onTextRender}
            chartMouseClick={onChartMouseClick}
            pointClick={onPointClick}
            tooltipRender={onCurrencyTooltip}
          >
            <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={pieData}
                xName="x"
                yName="y"
                type="Pie"
                pointColorMapping="color"
                innerRadius='40%'
                dataLabel={{
                  visible: true,
                  format: '${value}',
                  name: 'y',
                  position: 'Outside',
                  connectorStyle: { length: '10px' },
                  font: { size: '12px' }
                }}
                animation={{ enable: false }}
                borderRadius={10}
                border={{ width: 4, color: '#ffffff' }}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        ) : (
          // Drill: show a column chart of the breakdown (pieData) for the selected slice
          <div style={{ height: '100%', width: '100%', padding: 8 }}>
            <ChartComponent id="drill-column-chart" load={onChartLoad} textRender={onTextRender} axisLabelRender={onAxisLabelRender} tooltipRender={onCurrencyTooltip} height={'85%'} width={'90%'} primaryXAxis={{ valueType: 'Category' }} tooltip={{ enable: true, format: '${point.x} : $${point.y}' }}>
              <Inject services={[BarSeries, Tooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={pieData}
                  xName="x"
                  yName="y"
                  type="Bar"
                  pointColorMapping="color"
                  marker={{ dataLabel: { visible: true, format: '${value}', position: 'Outer' } }}
                  animation={{ enable: false }}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        )}
      </div>
    );
  };

  const stripLines = useMemo(() => {
    const lines: any[] = [];
    if (selectedRatio.length === 1 && selectedRatio.includes('Debt by Equity Ratio')) {
      lines.push(
        { start: 0, end: 0.15, text: 'Equity Low', color: '#e5dcf6', opacity: 0.5, visible: true, textStyle: { color: 'black', size: '12px' } },
        { start: 0.15, end: 0.210, text: 'Equity Medium', color: '#c4b3f8', opacity: 0.5, visible: true, textStyle: { color: 'black', size: '12px' } },
        { start: 0.210, end: 0.25, text: 'Equity High', color: '#9d84f2', opacity: 0.5, visible: true, textStyle: { color: 'black', size: '12px' } }
      );
    }
    if (selectedRatio.length === 1 && selectedRatio.includes('Debt by Asset Ratio')) {
      lines.push(
        { start: 0, end: 0.14, text: 'Asset Low', color: '#cffafe', textStyle: { size: 12, color: 'black' }, opacity: 0.5, visible: true },
        { start: 0.14, end: 0.22, text: 'Asset Medium', textStyle: { size: 12, color: 'black' }, color: '#67e8f9', opacity: 0.5, visible: true },
        { start: 0.22, end: 0.25, text: 'Asset High', textStyle: { size: 12, color: 'black' }, color: '#14b8a6', opacity: 0.5, visible: true }
      );
    }
    return lines;
  }, [selectedRatio]);

  const renderAssetHeader = () => (
    <div className="finance-panel-header">
      <div>Quarterly Comparison of Assets, Liabilities, and Equity</div>
      <MultiSelectComponent id="quarterelement" mode="CheckBox" width='30%' placeholder="Select Quarter" dataSource={availableQuarters} value={selectedQuarters}
        fields={{ text: 'value', value: 'value' } as any}
        change={(args: any) => setSelectedQuarters((args?.value as string[]) ?? [])}>
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
    </div>
  );


  const renderRatioHeader = () => (
    <div className="finance-panel-header">
      <div>Debt Asset and Equity Ratio</div>
      <MultiSelectComponent id="dbtelement" mode="CheckBox" width='40%' placeholder="Select Ratio" dataSource={debtValues} value={selectedRatio}
        fields={{ text: 'value', value: 'value' } as any}

        change={(args) => {
          const vals = (args?.value ?? []) as RatioKey[];
          setSelectedRatio(vals);
        }}
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
    </div>
  );

  const debtEquityRatio = () => {
    return (
      <div style={{ height: "100%", width: "100%", padding: 8 }}>
        <ChartComponent id='debtratio' ref={debtAssetRatioChartRef}
          load={onChartLoad}
          primaryXAxis={{
            valueType: 'Category', labelPlacement: 'OnTicks', majorGridLines: { width: 0 }
          }}
          primaryYAxis={{
            minimum: 0,
            maximum: debtAssetEquityMaxValue,
            interval: 0.1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            stripLines: stripLines
          }} tooltip={{
            enable: true,
            header: 'Year: <b>${point.x}</b>', // Custom tooltip header
          }} chartArea={{ border: { width: 0 } }}
        >
          <Inject services={[SplineSeries, Legend, Tooltip, DataLabel, Category, StripLine]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={debtRatiosData} xName='year' yName='debtToAsset' fill='#87A2FB' name='Debt by Asset Ratio' type='Spline'
              visible={selectedRatio.length === 0 || selectedRatio.includes('Debt by Asset Ratio')}
              marker={{ dataLabel: { visible: true, format: 'n3' }, visible: true, width: 8, height: 8, shape: 'Circle' }}
              tooltipFormat='Debt by Asset Ratio: ${point.y}' animation={{ enable: false }}>
            </SeriesDirective>
            <SeriesDirective dataSource={debtRatiosData} xName='year' yName='debtToEquity' fill='#C539B4' name='Debt by Equity Ratio' type='Spline'
              visible={selectedRatio.length === 0 || selectedRatio.includes('Debt by Equity Ratio')}
              marker={{ dataLabel: { visible: true, format: 'n3' }, visible: true, width: 8, height: 8, shape: 'Circle' }}
              tooltipFormat='Debt by Equity Ratio: ${point.y}' animation={{ enable: false }}>
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  return (
    <div className="Container">
      {/* Page title + global filters */}
      <div className="e-card cs-toolbar">
        <div className="cs-toolbar-left">
          <div className="cs-title">Overview</div>
        </div>
        <div className="cs-toolbar-right">
          <DropDownListComponent
            dataSource={financialAvailableYears.filter(y => y !== 2021)}
            value={selectedDropdownYear}
            placeholder="Select year"
            change={onYearChange}
          />
        </div>
      </div>

      <DashboardLayoutComponent
        ref={overviewRef}
        id="overview_dashboard"
        style={{ height: '100%', width: '100%' }}
        columns={8}
        cellAspectRatio={1}
        cellSpacing={cellSpacing}
        allowResizing={false}
        allowDragging={false}
        mediaQuery="(max-width:950px)"
      >
        <PanelsDirective>
          <PanelDirective id="investmentcard" sizeX={2} sizeY={1} row={0} col={0} content={initialInvestmentCard}></PanelDirective>
          <PanelDirective id="npvcard" sizeX={3} sizeY={1} row={1} col={0} content={npvCard} ></PanelDirective>
          <PanelDirective id="irrcard" sizeX={3} sizeY={1} row={1} col={3} content={irrCard} ></PanelDirective>
          <PanelDirective id="workingcapitalcard" sizeX={2} sizeY={1} row={1} col={6} content={networkingcapital} ></PanelDirective>
          <PanelDirective id="equityCard" sizeX={2} sizeY={1} row={0} col={6} content={gaugeEquity}></PanelDirective>
          <PanelDirective id="quickcard" sizeX={2} sizeY={1} row={0} col={2} content={gaugeQuick} ></PanelDirective>
          <PanelDirective id="currentcard" sizeX={2} sizeY={1} row={0} col={4} content={gaugeCurrent} ></PanelDirective>
          <PanelDirective id="ratiocard" sizeX={4} sizeY={3} row={3} col={0} header={renderRatioHeader} content={debtEquityRatio} ></PanelDirective>
          <PanelDirective id="piecard" sizeX={4} sizeY={3} row={3} col={4} header="<div style='margin-top:5px'>Assets, Liabilities, and Equity Breakdown</div>" content={assetliabilitiesPie} ></PanelDirective>
          <PanelDirective id="quarterlycard" sizeX={8} sizeY={3} row={6} col={0} header={renderAssetHeader} content={assetliabilities} ></PanelDirective>
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  );
};

// Dashboard 2 (Profit Loss Performance) with title + droddown with years
const ProfitLossDashboard: React.FC<DashboardProps> = ({ selectedYear, onYearChange }) => {
  const selectedDropdownYear = selectedYear;
  const [detailMode, setDetailMode] = useState(false);
  const [incomePieData, setIncomePieData] = useState<any[]>([]);
  const [expensePieData, setExpensePieData] = useState<any[]>([]);
  const [detailTitle, setDetailTitle] = useState<string>('');
  const profitlossRef = React.useRef<DashboardLayoutComponent | null>(null);
  const incomePieRef = React.useRef<AccumulationChartComponent | null>(null);
  const expensePieRef = React.useRef<AccumulationChartComponent | null>(null);
  const incomeexpensechartRef = React.useRef<ChartComponent | null>(null);
  const operatingProfitRef = React.useRef<ChartComponent | null>(null);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshAll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        profitlossRef.current?.refresh();
        incomePieRef.current?.refresh();
        expensePieRef.current?.refresh();
        incomeexpensechartRef.current?.refresh();
      }, 500);
    };
    window.addEventListener('sidebar-toggled', refreshAll);
    window.addEventListener('resize', refreshAll);
    return () => {
      window.removeEventListener('sidebar-toggled', refreshAll);
      window.removeEventListener('resize', refreshAll);
      clearTimeout(timer);
    };
  }, []);

  const onTextRender = (args: ITextRenderEventArgs) => {
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

  const buildDetailPies = (year: number) => {
    const idx = financialAvailableYears.indexOf(year);
    const incomeVal = Number(cashInFlowTotals[idx] ?? 0);
    const expenseVal = Number(cashOutFlowTotals[idx] ?? 0);

    // prefer income statement P&L if present
    const inc = companyIncomeByYear[year] ?? ({} as CompanyIncome);

    // find matching cash flow series for the year (period is 1..n)
    const inflowSeries: any = (financeData.cashInFlows?.series ?? []).find((s: any) => Number(s.period) === (idx + 1)) ?? null;
    const outflowSeries: any = (financeData.cashOutFlows?.series ?? []).find((s: any) => Number(s.period) === (idx + 1)) ?? null;

    const paletteIn = ['#F675A8', '#87A2FB', '#C539B4', '#73467D', '#D989B5'];
    const paletteOut = ['#E94560', '#FFADBC', '#C539B4', '#87A2FB', '#73467D'];

    const mapBreakdown = (arr: any[], palettes: string[]) =>
      (arr ?? []).map((b: any, ii: number) => ({
        x: b.name ?? b.id ?? `Item ${ii + 1}`,
        y: Math.round(Math.abs(Number(b.amount ?? b.value ?? 0) || 0)),
        color: palettes[ii % palettes.length],
        id: String((b.id ?? b.name ?? ii)).toLowerCase()
      })).filter((d: any) => d.y > 0);

    // build income pie (priority: explicit P&L -> annual breakdown -> monthly aggregate -> sensible fallback)
    let incomePie: any[] = [];
    if (inc && (inc as any).incomeBreakdown && (inc as any).incomeBreakdown.length) {
      incomePie = ((inc as any).incomeBreakdown as any[]).map((it: any, ii: number) => ({
        x: it.name || `Item ${ii + 1}`,
        y: Math.round(Number(it.amount ?? it.value ?? 0) || 0),
        color: paletteIn[ii % paletteIn.length]
      })).filter(d => d.y > 0);
    } else if (Array.isArray(inflowSeries?.breakdown) && inflowSeries.breakdown.length) {
      incomePie = mapBreakdown(inflowSeries.breakdown, paletteIn);
    } else if (Array.isArray(inflowSeries?.monthlyseries) && inflowSeries.monthlyseries.some((m: any) => Array.isArray(m.breakdown) && m.breakdown.length)) {
      const agg: Record<string, number> = {};
      for (const m of inflowSeries.monthlyseries) {
        if (!Array.isArray(m.breakdown)) continue;
        for (const b of m.breakdown) {
          const key = b.name ?? b.id ?? 'Other';
          agg[key] = (agg[key] || 0) + Math.abs(Number(b.amount ?? b.value ?? 0) || 0);
        }
      }
      incomePie = Object.entries(agg).map(([k, v], ii) => ({ x: k, y: Math.round(v), color: paletteIn[ii % paletteIn.length] })).filter(d => d.y > 0);
    } else {
      const total = Math.round(incomeVal || Number(inflowSeries?.amount ?? 0));
      if (total > 0) {
        const sales = Math.round(total * 0.70);
        const services = Math.round(total * 0.20);
        const other = Math.max(0, total - (sales + services));
        incomePie = [
          { x: 'Sales', y: sales, color: paletteIn[0] },
          { x: 'Services', y: services, color: paletteIn[1] },
          { x: 'Other', y: other, color: paletteIn[2] }
        ].filter(s => s.y > 0);
      } else {
        incomePie = [];
      }
    }

    // build expense pie (priority: explicit expenseBreakdown -> annual breakdown -> monthly aggregate -> sensible fallback)
    let expensePie: any[] = [];
    if (companyIncomeByYear[year] && (companyIncomeByYear[year] as any).expenseBreakdown && (companyIncomeByYear[year] as any).expenseBreakdown.length) {
      expensePie = ((companyIncomeByYear[year] as any).expenseBreakdown as any[]).map((it: any, ii: number) => ({
        x: it.name || `Item ${ii + 1}`,
        y: Math.round(Number(it.amount ?? it.value ?? 0) || 0),
        color: paletteOut[ii % paletteOut.length]
      })).filter(d => d.y > 0);
    } else if (Array.isArray(outflowSeries?.breakdown) && outflowSeries.breakdown.length) {
      expensePie = mapBreakdown(outflowSeries.breakdown, paletteOut);
    } else if (Array.isArray(outflowSeries?.monthlyseries) && outflowSeries.monthlyseries.some((m: any) => Array.isArray(m.breakdown) && m.breakdown.length)) {
      const agg: Record<string, number> = {};
      for (const m of outflowSeries.monthlyseries) {
        if (!Array.isArray(m.breakdown)) continue;
        for (const b of m.breakdown) {
          const key = b.name ?? b.id ?? 'Other';
          agg[key] = (agg[key] || 0) + Math.abs(Number(b.amount ?? b.value ?? 0) || 0);
        }
      }
      expensePie = Object.entries(agg).map(([k, v], ii) => ({ x: k, y: Math.round(v), color: paletteOut[ii % paletteOut.length] })).filter(d => d.y > 0);
    } else {
      const total = Math.round(expenseVal || Number(outflowSeries?.amount ?? 0));
      if (total > 0) {
        const payroll = Math.round(total * 0.40);
        const opex = Math.round(total * 0.35);
        const taxes = Math.round(total * 0.10);
        const capex = Math.round(total * 0.08);
        const other = Math.max(0, total - (payroll + opex + taxes + capex));
        expensePie = [
          { x: 'Payroll & Benefits', y: payroll, color: paletteOut[0] },
          { x: 'Operating Expenses', y: opex, color: paletteOut[1] },
          { x: 'Taxes', y: taxes, color: paletteOut[2] },
          { x: 'Capex', y: capex, color: paletteOut[3] },
          { x: 'Other', y: other, color: paletteOut[4] }
        ].filter(s => s.y > 0);
      } else {
        expensePie = [];
      }
    }

    setIncomePieData(incomePie);
    setExpensePieData(expensePie);
    setDetailTitle(` FY${year} — Income and Expense Breakdown`);
  };

  // show drilled pie initially for the selected year and keep in sync when year changes
  useEffect(() => {
    buildDetailPies(Number(selectedDropdownYear));
    setDetailMode(false);
  }, [selectedDropdownYear]);

  const incomeExpenseProfit = () => {

    // build column data across all years using breakdown totals when available
    const columnData = financialAvailableYears.map((y, i) => {
      const income = cashInFlowTotals[i] ?? 0;
      const expenses = cashOutFlowTotals[i] ?? 0;
      const profit = Math.round(income - expenses);
      return {
        year: String(y),
        income,
        expenses,
        profit,
        color: profit >= 0 ? '#EF9A53' : '#FB2B2B'
      };
    });

    const drillDownPie = (yearStr: string) => {
      const year = Number(yearStr);
      if (!year || !financialAvailableYears.includes(year)) return;

      const idx = financialAvailableYears.indexOf(year);
      const inflowSeries: any = (financeData.cashInFlows?.series ?? []).find((s: any) => Number(s.period) === (idx + 1)) ?? {};
      const outflowSeries: any = (financeData.cashOutFlows?.series ?? []).find((s: any) => Number(s.period) === (idx + 1)) ?? {};

      // use breakdowns for pie if present, otherwise derive sensible buckets
      const incomePie = Array.isArray(inflowSeries.breakdown) && inflowSeries.breakdown.length
        ? inflowSeries.breakdown.map((b: any, ii: number) => ({ x: b.name ?? b.id ?? `Item ${ii + 1}`, y: Math.round(Number(b.amount ?? b.value ?? 0)), color: ['#F675A8', '#87A2FB', '#C539B4'][ii % 3] }))
        : (() => {
          const total = Math.round(cashInFlowTotals[idx] ?? Number(inflowSeries.amount ?? 0));
          const sales = Math.round(total * 0.70);
          const services = Math.round(total * 0.20);
          const other = Math.max(0, total - (sales + services));
          return [{ x: 'Sales', y: sales, color: '#F675A8' }, { x: 'Services', y: services, color: '#87A2FB' }, { x: 'Other', y: other, color: '#C539B4' }].filter(s => s.y > 0);
        })();

      const expensePie = Array.isArray(outflowSeries.breakdown) && outflowSeries.breakdown.length
        ? outflowSeries.breakdown.map((b: any, ii: number) => ({ x: b.name ?? b.id ?? `Item ${ii + 1}`, y: Math.round(Math.abs(Number(b.amount ?? b.value ?? 0))), color: ['#E94560', '#FFADBC', '#C539B4'][ii % 3] }))
        : (() => {
          const total = Math.round(cashOutFlowTotals[idx] ?? Number(outflowSeries.amount ?? 0));
          const payroll = Math.round(total * 0.40);
          const opex = Math.round(total * 0.35);
          const other = Math.max(0, total - (payroll + opex));
          return [{ x: 'Payroll', y: payroll, color: '#E94560' }, { x: 'Operating', y: opex, color: '#FFADBC' }, { x: 'Other', y: other, color: '#C539B4' }].filter(s => s.y > 0);
        })();

      setIncomePieData(incomePie);
      setExpensePieData(expensePie);
      setDetailTitle(` FY${year} — Income & Expense Breakdown`);
      setDetailMode(true);
    };

    const onChartMouseClick = (args: any) => {
      const targetId = args.target || args.event?.target?.id;
      const { text, year } = getAxisLabelFromTarget(targetId);
      if (year) {
        drillDownPie(String(year)); // call existing drill function with the year
      } else if (text) {
        drillDownPie(text);
      }
    };

    const onColumnPointClick = (args: any) => {
      const yearStr = args.point?.x ?? args.point?.category;
      drillDownPie(yearStr);
    };

    const onAxisLabelRenderLocal = (args: IAxisLabelRenderEventArgs) => {
      if (args.axis && args.axis.name === 'primaryYAxis') {
        args.text = formatCurrency(Number(args.text));
      }
    };

    if (detailMode) {
      // existing detail UI (unchanged)
      return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <div style={{ fontWeight: 600 }}>{detailTitle}</div>
            <button onClick={() => { setDetailMode(false); setIncomePieData([]); setExpensePieData([]); }} style={{ background: 'transparent', padding: '6px 10px', borderRadius: 6 }}>Back</button>
          </div>

          <div style={{ display: 'flex', gap: 12, height: '100%', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: '100%', width: '100%' }}>
                <AccumulationChartComponent id="income-breakdown" ref={incomePieRef} load={onAccumulationLoad} textRender={onTextRender} tooltipRender={onCurrencyTooltip} legendSettings={{ visible: true, position: 'Bottom' }} tooltip={{ enable: true }}>
                  <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={incomePieData}
                      xName="x"
                      yName="y"
                      type="Pie"
                      pointColorMapping="color"
                      dataLabel={{ visible: true, format: '${value}', name: 'y', position: 'Outside' }}
                      animation={{ enable: false }}
                    />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ height: '100%', width: '100%' }}>
                <AccumulationChartComponent id="expense-breakdown" ref={expensePieRef} load={onAccumulationLoad} textRender={onTextRender} tooltipRender={onCurrencyTooltip} legendSettings={{ visible: true, position: 'Bottom' }} tooltip={{ enable: true }}>
                  <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={expensePieData}
                      xName="x"
                      yName="y"
                      type="Pie"
                      pointColorMapping="color"
                      dataLabel={{ visible: true, format: '${value}', name: 'y', position: 'Outside' }}
                      animation={{ enable: false }}
                    />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default: show year-over-year Income vs Expenses columns
    return (
      <div className='finance-chart-wrap' style={{ padding: 8 }}>
        <ChartComponent
          ref={incomeexpensechartRef}
          id="income-expense-year-column"
          load={onChartLoad}
          width="100%"
          height="100%"
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: false, format: '${series.name} : ${point.y}' }}
          axisLabelRender={onAxisLabelRenderLocal}
          pointClick={onColumnPointClick}
          chartMouseClick={onChartMouseClick}
          textRender={onTextRender}
          tooltipRender={onCurrencyTooltip}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={columnData}
              xName="year"
              yName="income"
              name="Income"
              type="Column"
              fill="#F675A8"
              marker={{ dataLabel: { visible: true, position: 'Outer' } }}
              animation={{ enable: false }}
            />
            <SeriesDirective
              dataSource={columnData}
              xName="year"
              yName="expenses"
              name="Expenses"
              type="Column"
              fill="#FFADBC"
              marker={{ dataLabel: { visible: true, position: 'Outer' } }}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const operatingProfitBreakdown = () => {
    const income = companyIncomeByYear[selectedDropdownYear] ?? ({} as CompanyIncome);
    const idx = financialAvailableYears.indexOf(selectedDropdownYear);
    const revenue = Number(income.revenue ?? cashInFlowTotals[idx] ?? 0);
    const cogs = Number(income.cogs ?? 0);
    const opEx = calculateOperatingExpenses(selectedDropdownYear);
    const operatingProfit = Math.round(revenue - cogs - opEx);
    const waterfallData = [
      { category: 'Total Income', change: revenue, color: '#C539B4' },
      { category: 'COGS', change: -cogs, color: '#E94560' },
      { category: 'Operating Expense', change: -opEx, color: '#E94560' },
      { category: 'Operating Profit', change: operatingProfit, color: '#87A2FB' } // value ignored; marked as total via sumIndexes
    ];
    const cornerRadius = { topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 };
    const onAxisLabelRender = (args: IAxisLabelRenderEventArgs) => {
      if (args.axis && args.axis.name === 'primaryYAxis') {
        args.text = formatCurrency(Number(args.text));
      }
    };
    return (
      <div style={{ width: '100%', height: '100%', padding: 8 }}>
        <ChartComponent id='waterfall'
          ref={operatingProfitRef}
          load={onChartLoad}
          chartArea={{ border: { width: 0 } }}
          axisLabelRender={onAxisLabelRender}
          textRender={onTextRender}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }} >
          <Inject services={[WaterfallSeries, DataLabel, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={waterfallData} type='Waterfall' xName="category" yName="change" intermediateSumIndexes={[4]} sumIndexes={[3]}
              columnWidth={0.7} cornerRadius={cornerRadius}
              connector={{ color: '#5F6A6A', width: 0.8, dashArray: '1,2' }}
              pointColorMapping="color"
              border={{ width: 0.2, color: '#000000' }} negativeFillColor='#E94560'
              marker={{
                dataLabel: {
                  visible: true,
                  font: { color: '#FFFFFF' },
                },
              }}
              animation={{ enable: false }}
            >
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const totalIncomeValue = cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear)];
  const totalIncomePrevious = cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear - 1)];
  const totalIncomePctChange = ((totalIncomeValue - totalIncomePrevious) / Math.abs(totalIncomePrevious)) * 100;
  let totalIncomeFormatted = `${totalIncomePctChange.toFixed(1)}`;
  let totalIncomeIsUp = totalIncomePrevious !== null ? totalIncomeValue > totalIncomePrevious : false;

  function calculateNetProfit(year: number) {
    const idx = financialAvailableYears.indexOf(year);
    const income = companyIncomeByYear[year] ?? ({} as CompanyIncome); // <- cast to CompanyIncome
    // prefer income statement values if available
    const revenue = Number(income.revenue ?? 0);
    const cogs = Number(income.cogs ?? 0);
    const operatingExpenses = Number(income.operatingExpenses ?? income.opex ?? 0);
    const interest = Number(income.interest ?? 0);
    const taxes = Number(income.taxes ?? 0);

    // primary calculation from P&L
    let net = revenue - cogs - operatingExpenses - (interest + taxes);

    return Math.round(net);
  }

  const netProfitValue = calculateNetProfit(selectedDropdownYear);
  const netProfitPrevious = selectedDropdownYear && financialAvailableYears.indexOf(selectedDropdownYear) > 0
    ? calculateNetProfit(financialAvailableYears[financialAvailableYears.indexOf(selectedDropdownYear) - 1])
    : null;
  const netProfitPctChange = netProfitPrevious !== null && Math.abs(netProfitPrevious) > 0
    ? ((netProfitValue - netProfitPrevious) / Math.abs(netProfitPrevious)) * 100
    : null;
  let netProfitFormatted = `${netProfitPctChange?.toFixed(1)}`;
  let netProfitIsUp = netProfitPrevious !== null ? netProfitValue > netProfitPrevious : false;


  function calculateGrossProfit(year: number) {
    const idx = financialAvailableYears.indexOf(year);
    const income = companyIncomeByYear[year] ?? ({} as CompanyIncome);

    const revenue = Number(income.revenue ?? cashInFlowTotals[idx] ?? 0);
    const cogs = Number(income.cogs ?? 0);

    return Math.round(revenue - cogs);
  }

  // usage (place after calculateNetProfit / where you build cards)
  const grossProfitValue = calculateGrossProfit(selectedDropdownYear);
  const grossProfitPrevious =
    selectedDropdownYear && financialAvailableYears.indexOf(selectedDropdownYear) > 0
      ? calculateGrossProfit(financialAvailableYears[financialAvailableYears.indexOf(selectedDropdownYear) - 1])
      : null;

  const grossProfitPctChange =
    grossProfitPrevious !== null && Math.abs(grossProfitPrevious) > 0
      ? ((grossProfitValue - grossProfitPrevious) / Math.abs(grossProfitPrevious)) * 100
      : null;

  const grossProfitFormatted = `${grossProfitPctChange?.toFixed(1)}`;
  const grossProfitIsUp = grossProfitPrevious !== null ? grossProfitValue > grossProfitPrevious : false;

  const idx = financialAvailableYears.indexOf(selectedDropdownYear);
  const prevIdx = idx > 0 ? idx - 1 : -1;

  const revenueCurrent = Number(companyIncomeByYear[selectedDropdownYear]?.revenue ?? cashInFlowTotals[idx] ?? 0);
  const revenuePrev = prevIdx >= 0 ? Number(companyIncomeByYear[financialAvailableYears[prevIdx]]?.revenue ?? cashInFlowTotals[prevIdx] ?? 0) : null;

  const grossMarginCurrent = revenueCurrent > 0 ? (grossProfitValue / revenueCurrent) * 100 : 0;
  const grossMarginPrevious = revenuePrev !== null && revenuePrev > 0 ? (grossProfitPrevious! / revenuePrev) * 100 : null;

  const profitMarginCurrent = revenueCurrent > 0 ? (netProfitValue / revenueCurrent) * 100 : 0;
  const profitMarginPrevious = revenuePrev !== null && revenuePrev > 0 ? (netProfitPrevious! / revenuePrev) * 100 : null;

  const calcPctChangeLabel = (cur: number, prev: number | null) => {
    if (prev === null || Math.abs(prev) < 1e-9) return '—';
    const change = ((cur - prev) / Math.abs(prev)) * 100;
    return `${change.toFixed(1)}% vs FY${(selectedDropdownYear - 1)}`;
  };

  const grossIsUp = grossMarginPrevious !== null ? grossMarginCurrent > grossMarginPrevious : false;
  const grossChangeLabel = calcPctChangeLabel(grossMarginCurrent, grossMarginPrevious);

  const profitIsUp = profitMarginPrevious !== null ? profitMarginCurrent > profitMarginPrevious : false;
  const profitChangeLabel = calcPctChangeLabel(profitMarginCurrent, profitMarginPrevious);

  function calculateOperatingExpenses(year: number) {
    const idx = financialAvailableYears.indexOf(year);
    const inc = companyIncomeByYear[year] ?? ({} as CompanyIncome);

    // 1) explicit field if present
    const explicit = Number(inc.operatingExpenses ?? inc.opex ?? 0);
    if (explicit > 0) return Math.round(explicit);

    // 2) estimate from P&L if grossProfit is available:
    // operatingExpenses = (revenue - cogs) - grossProfit
    const revenue = Number(inc.revenue ?? cashInFlowTotals[idx] ?? 0);
    const cogs = Number(inc.cogs ?? 0);
    if (typeof inc.grossProfit === 'number') {
      const est = (revenue - cogs) - Number(inc.grossProfit ?? 0);
      if (!Number.isNaN(est)) return Math.round(est);
    }

    // 3) fallback to otherExpenses or cash outflows for that year
    return Math.round(Number(inc.otherExpenses ?? cashOutFlowTotals[idx] ?? 0));
  }

  function calculateOperatingProfit(year: number) {
    const idx = financialAvailableYears.indexOf(year);
    const inc = companyIncomeByYear[year] ?? ({} as CompanyIncome);

    // prefer explicit operatingProfit if present
    if (typeof (inc as any).operatingProfit === 'number') return Math.round((inc as any).operatingProfit);

    const revenue = Number(inc.revenue ?? cashInFlowTotals[idx] ?? 0);
    const cogs = Number(inc.cogs ?? 0);
    const opEx = calculateOperatingExpenses(year);

    return Math.round(revenue - cogs - opEx);
  }

  // compute values + previous year comparisons and formatted strings
  const operatingExpensesValue = calculateOperatingExpenses(selectedDropdownYear);
  const operatingExpensesPrev =
    financialAvailableYears.indexOf(selectedDropdownYear) > 0
      ? calculateOperatingExpenses(financialAvailableYears[financialAvailableYears.indexOf(selectedDropdownYear) - 1])
      : null;
  const operatingExpensesPct =
    operatingExpensesPrev !== null && Math.abs(operatingExpensesPrev) > 0
      ? ((operatingExpensesValue - operatingExpensesPrev) / Math.abs(operatingExpensesPrev)) * 100
      : null;
  const operatingExpensesFormatted = `${operatingExpensesPct?.toFixed(1)}`;
  const operatingExpensesIsUp = operatingExpensesPrev !== null ? operatingExpensesValue > operatingExpensesPrev : false;

  const operatingProfitValue = calculateOperatingProfit(selectedDropdownYear);
  const operatingProfitPrev =
    financialAvailableYears.indexOf(selectedDropdownYear) > 0
      ? calculateOperatingProfit(financialAvailableYears[financialAvailableYears.indexOf(selectedDropdownYear) - 1])
      : null;
  const operatingProfitPct =
    operatingProfitPrev !== null && Math.abs(operatingProfitPrev) > 0
      ? ((operatingProfitValue - operatingProfitPrev) / Math.abs(operatingProfitPrev)) * 100
      : null;
  const operatingProfitFormatted = `${operatingProfitPct?.toFixed(1)}`;
  const operatingProfitIsUp = operatingProfitPrev !== null ? operatingProfitValue > operatingProfitPrev : false;

  const income = companyIncomeByYear[selectedDropdownYear] ?? ({} as CompanyIncome);
  const cogsVal = Number(income.cogs ?? 0);
  const revenueVal = Number(cashInFlowTotals[idx] ?? 0);
  const progressValue = revenueVal > 0 ? Number(((cogsVal / revenueVal) * 100).toFixed(2)) : 0;

  // const checkGreater = selectedDropdownYear != 2021 ? cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear)] > cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear) - 1] : true;
  // const incomePercentDifference = ((Math.abs(cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear) - 1] - cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear)]) / cashInFlowTotals[financialAvailableYears.indexOf(selectedDropdownYear)]) * 100).toFixed(1);

  const goodsSoldCard = () => MetricGoodsCard("Cost of Goods Sold", formatCurrency(cogsVal), true, progressValue, 'costgoods', "", "", "#000000");
  const totalIncomeCard = () => MetricCard("Total Income", formatCurrency(totalIncomeValue), totalIncomeFormatted, totalIncomeIsUp);
  const netProfit = () => MetricCard("Net Profit", formatCurrency(netProfitValue), netProfitFormatted, netProfitIsUp);
  const grossProfit = () => MetricCard("Gross Profit", formatCurrency(grossProfitValue), grossProfitFormatted, grossProfitIsUp);
  const operatingExpenses = () => MetricCard(
    "Operating Expenses",
    formatCurrency(operatingExpensesValue),
    operatingExpensesFormatted,
    operatingExpensesIsUp
  );
  const operatingProfit = () => MetricCard(
    "Operating Profit",
    formatCurrency(operatingProfitValue),
    operatingProfitFormatted,
    operatingProfitIsUp
  );
  const profitMargin = () => gaugeProfitRatio(Math.min(Math.max(Math.round(profitMarginCurrent), 0), 100),                // pointerValue
    'Profit Margin',                                                            // title
    `${profitMarginCurrent.toFixed(1)}%`,                                       // value shown
    Math.round(profitMarginCurrent),                                            // percentageValue (gauge)
    profitChangeLabel,                                                           // yearComparisonText
    '#EF9A53',                                                                   // pointerColor
    'profitmargin',                                                              // id
    profitIsUp);
  const grossMargin = () => gaugeProfitRatio(Math.min(Math.max(Math.round(grossMarginCurrent), 0), 100),
    'Gross Margin',
    `${grossMarginCurrent.toFixed(1)}%`,
    Math.round(grossMarginCurrent),
    grossChangeLabel,
    '#863A6F',
    'grossmargin',
    grossIsUp);

  const MetricGoodsCard = (
    title: string,
    value: string | number | null,
    showProgress: boolean,
    progressValue: number,
    id: string,
    context: string,
    text: string,
    color: string
  ) => (
    <div id='main-finance-div'>
      <div id='title-finance-card'>{title}</div>
      <div id='card-finance-value'>{value}</div>
    </div>
  );
  const MetricCard = (title: string, value: string | number | null, comparisonValue: string, arrowUp: boolean) => {
    const chipBg = arrowUp ? '#dcfce7' : '#fee2e2';
    const chipText = arrowUp ? '#166534' : '#991b1b';

    return (
      <div id='main-finance-div'>
        <div id='title-finance-card'>{title}</div>
        <div id='card-finance-value'>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span
            style={{
              color: arrowUp ? '#16a34a' : '#dc2626',
              fontWeight: 600
            }}
          >
            {arrowUp ? '▲' : '▼'} {comparisonValue}%
          </span>
          <span style={{ fontSize: 12 }}>
            vs {selectedDropdownYear - 1}
          </span>
        </div>
      </div>
    );
  }

  const gaugeProfitRatio = (pointerValue: number, title: string, value: string, percentageValue: number, yearComparisonText: string, pointerColor: string, id: string, arrowUp: boolean) => {
    // Light track color from the same hue
    const toRGBA = (hex: string, a = 0.20) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return `rgba(0,0,0,${a})`;
      const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
      return `rgba(${r},${g},${b},${a})`;
    };
    const trackColor = toRGBA(pointerColor, 0.20);

    const chipBg = arrowUp ? '#dcfce7' : '#fee2e2';
    const chipText = arrowUp ? '#166534' : '#991b1b';
    const chipArrow = arrowUp ? '▲' : '▼';

    return (
      <div className='gauge-center'>
        <CircularGaugeComponent id={id} background="transparent" load={onGaugeLoad} title={title} titleStyle={{ fontWeight: '400', size: '14px' }}
          height="100%" width="100%" allowMargin={false}>
          <Inject services={[Annotations]} />
          <AxesDirective>
            <AxisDirective
              radius='82%' startAngle={270} endAngle={90}
              minimum={0} maximum={100}
              majorTicks={{ interval: 10, height: 0, width: 0 }}
              minorTicks={{ interval: 1, height: 0, width: 0 }}
              labelStyle={{ format: 'n1', font: { size: '0px' } }}
              lineStyle={{ width: 0 }}
            >
              <PointersDirective>
                {/* Track shows the not-filled remainder in a light tint */}
                <PointerDirective
                  value={100}
                  radius="100%"
                  type="RangeBar"
                  color={trackColor}
                  pointerWidth={35}
                  roundedCornerRadius={16}
                  animation={{ enable: false }}
                />
                {/* Filled value on top */}
                <PointerDirective
                  value={percentageValue}
                  radius="100%"
                  type="RangeBar"
                  color={pointerColor}
                  pointerWidth={35}
                  roundedCornerRadius={16}
                  animation={{ enable: false }}
                />
              </PointersDirective>
              <AnnotationsDirective>
                <AnnotationDirective
                  content={`<div><div><span style="font-size:28px;font-weight:500;"><b> ${percentageValue}% </b></span></div></div>`}
                  zIndex="1" angle={0} radius="20%"
                />
                <AnnotationDirective
                  content={`
                  <div><div>
                    <div class="irr-chip-block">
                      <span class="irr-chip" style="background:${chipBg};color:${chipText};padding:6px 8px;border-radius:6px;margin-right:6px;">
                        ${chipArrow}  <span class="irr-vs"> ${yearComparisonText}</span>
                      </span>
                    </div>
                  </div></div>
                `}
                  zIndex="1" angle={155} radius="35%"
                />
              </AnnotationsDirective>
            </AxisDirective>
          </AxesDirective>
        </CircularGaugeComponent>
      </div>
    );
  };
  return (
    <div className="Container">
      {/* Page title + global filters */}
      <div className="e-card cs-toolbar">
        <div className="cs-toolbar-left">
          <span className="cs-title">Financial Performance</span>
        </div>
        <div className="cs-toolbar-right">
          <DropDownListComponent
            dataSource={financialAvailableYears.filter(y => y !== 2021)}
            value={selectedDropdownYear}
            placeholder="Select year"
            change={onYearChange}
          />
        </div>
      </div>

      <DashboardLayoutComponent
        ref={profitlossRef}
        id="profitloss_dashboard"
        style={{ height: '100%', width: '100%' }}
        columns={8}
        cellAspectRatio={1}
        cellSpacing={cellSpacing}
        allowResizing={false}
        allowDragging={false}
        mediaQuery="(max-width:950px)"
      >
        <PanelsDirective>
          <PanelDirective id="goodssold" sizeX={2} sizeY={1} row={0} col={0} content={goodsSoldCard} />
          <PanelDirective id="totalincome" sizeX={2} sizeY={1} row={0} col={2} content={totalIncomeCard} />
          <PanelDirective id="operatingexpensecard" sizeX={2} sizeY={1} row={0} col={4} content={operatingExpenses} />
          <PanelDirective id="operatingprofitcard" sizeX={2} sizeY={1} row={0} col={6} content={operatingProfit} />
          <PanelDirective id="netprofitcard" sizeX={2} sizeY={1} row={2} col={0} content={netProfit} />
          <PanelDirective id="grossprofitcard" sizeX={2} sizeY={1} row={3} col={0} content={grossProfit} />
          <PanelDirective id="profitmargincard" sizeX={3} sizeY={2} row={2} col={2} content={profitMargin} />
          <PanelDirective id="grossmargincard" sizeX={3} sizeY={2} row={2} col={5} content={grossMargin} />
          <PanelDirective sizeX={8} sizeY={3} row={5} col={0} header="<div>Operating Profit Breakdown</div>" content={operatingProfitBreakdown} />
          {/* <PanelDirective sizeX={2} sizeY={4} row={8} col={0} header="<div>Year-over-Year Profit Comparison</div>" content={yearlyProfitBreakdown} /> */}
          <PanelDirective sizeX={8} sizeY={4} row={8} col={2} header="<div>Income and Expenses Breakdown Over Year</div>" content={incomeExpenseProfit} />
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  );
};

// Dashboard 3 (Cash Flow and Liquidity) with title + droddown with years
const CashFlowDashboard: React.FC<DashboardProps> = ({ selectedYear, onYearChange }) => {
  const selectedDropdownYear = selectedYear;
  const [cashDrill, setCashDrill] = useState<{ type: 'in' | 'out' | null; category?: string; series?: { month: string; value: number }[] }>({ type: null });
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const cashflowRef = React.useRef<DashboardLayoutComponent | null>(null);
  const debtChartRef = React.useRef<ChartComponent | null>(null);
  const burnchartRef = React.useRef<ChartComponent | null>(null);
  const inventoryChartRef = React.useRef<ChartComponent | null>(null);
  const turnoverChartRef = React.useRef<ChartComponent | null>(null);
  const monthlyCashRef = React.useRef<ChartComponent | null>(null);
  const overallcashRef = React.useRef<ChartComponent | null>(null);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshAll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cashflowRef.current?.refresh();
        debtChartRef.current?.refresh();
        burnchartRef.current?.refresh();
        inventoryChartRef.current?.refresh();
        turnoverChartRef.current?.refresh();
        monthlyCashRef.current?.refresh();
        overallcashRef.current?.refresh();
      }, 500);
    };
    window.addEventListener('sidebar-toggled', refreshAll);
    window.addEventListener('resize', refreshAll);
    return () => {
      window.removeEventListener('sidebar-toggled', refreshAll);
      window.removeEventListener('resize', refreshAll);
      clearTimeout(timer);
    };
  }, []);

  const overallCashData = [
    { year: '2020', cash: 20000 },  // $20.0K
    { year: '2021', cash: 18900 },  // $18.9K
    { year: '2022', cash: 25400 },  // $25.4K
    { year: '2023', cash: 26400 },  // $26.4K
    { year: '2024', cash: 24400 },  // $24.4K
    { year: '2025', cash: 27400 },  // $27.4K
  ];

  const debtData = [
    { month: 'Jan', value: 49000 },  // 49K
    { month: 'Feb', value: 55000 },  // 55K
    { month: 'Mar', value: 130000 }, // 130K (peak)
    { month: 'Apr', value: 30000 },  // 30K (dip)
    { month: 'May', value: 50000 },  // 50K
    { month: 'Jun', value: 80000 },  // 80K
    { month: 'Jul', value: 7000 },
    { month: 'Aug', value: 1000 },
    { month: 'Sep', value: 8000 },
    { month: 'Oct', value: 7000 },
    { month: 'Nov', value: 4000 },
    { month: 'Dec', value: 2000 },
  ];
  const onTextRender = (args: ITextRenderEventArgs) => {
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

  const formatYAxisDollar = (args: any) => {
    if (args.axis?.name === 'primaryYAxis') {
      const v = Number(args.value || 0);
      args.text = formatCurrency(v);
    }
  };

  const inventoryTurnOverData = useMemo(() => {
    return financialAvailableYears.map((y) => {
      const i = financialAvailableYears.indexOf(y);
      const quarters = companyShareGroupedByYear[y] ?? [];

      // average inventory across quarters (fallback to last quarter or 0)
      const invValues = quarters.map(q => getAmount(q.assets ?? [], 'inventory'));
      const avgInventory = invValues.length ? (invValues.reduce((s, v) => s + v, 0) / invValues.length) : 0;

      // prefer explicit COGS from income statement, else estimate as 60% of revenue, else use outflows
      const inc = companyIncomeByYear[y] ?? ({} as CompanyIncome);
      let cogs = Number(inc.cogs ?? 0);
      if (!cogs) {
        const revenue = Number(inc.revenue ?? cashInFlowTotals[i] ?? 0);
        cogs = revenue ? Math.round(revenue * 0.6) : Math.round(cashOutFlowTotals[i] ?? 0);
      }

      const turnover = avgInventory > 0 ? (cogs / avgInventory) : 0;
      return { year: String(y), turnover: Number(turnover.toFixed(2)) };
    });
  }, [financialAvailableYears, companyShareGroupedByYear, companyIncomeByYear, cashInFlowTotals, cashOutFlowTotals]);

  const availableYears = useMemo(
    () => Array.from(new Set(overallCashData.map(d => d.year))),
    []
  );

  const [selectedYears, setSelectedYears] = useState<string[]>(availableYears);

  const turnoverData = useMemo(() => {
    return financialAvailableYears.map((y) => {
      const idx = financialAvailableYears.indexOf(y);
      const revenue = Number(companyIncomeByYear[y]?.revenue ?? cashInFlowTotals[idx] ?? 0);
      // prefer explicit COGS; fallback to a sensible estimate (60% of revenue)
      let cogs = Number(companyIncomeByYear[y]?.cogs ?? 0);
      if (!cogs && revenue) cogs = Math.round(revenue * 0.6);

      const quarters = companyShareGroupedByYear[y] ?? [];
      const avg = (arr: number[]) => arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0;

      // average Accounts Receivable and Accounts Payable across quarters for the year
      const avgAR = avg(quarters.map(q => getAmount(q.assets ?? [], 'ar')));
      const avgAP = avg(quarters.map(q => getAmount(q.liabilities ?? [], 'ap')));

      const arTurnover = avgAR > 0 ? revenue / avgAR : 0;   // times per year
      const apTurnover = avgAP > 0 ? cogs / avgAP : 0;      // times per year

      // present as percentage-like value if you want percent (e.g. convert to % of 1)
      // here we keep times-per-year and also provide percent-format helper below in chart labels
      return {
        year: String(y),
        arTurnover: Number(arTurnover.toFixed(1)),
        apTurnover: Number(apTurnover.toFixed(1)),
        // keep inventoryTurnover placeholder if used elsewhere
        inventoryTurnover: Number(((revenue && getAmount(quarters[0]?.assets ?? [], 'inventory')) ? (revenue / Math.max(1, getAmount(quarters[0].assets, 'inventory'))) : 0).toFixed(2))
      };
    });
  }, [financialAvailableYears, companyIncomeByYear, companyShareGroupedByYear, cashInFlowTotals]);

  // filteredTurnOverData should use the computed turnoverData
  const filteredTurnOverData = useMemo(
    () =>
      selectedYears.length
        ? turnoverData.filter(d => selectedYears.includes(d.year))
        : turnoverData,
    [selectedYears, turnoverData]
  );

  const filteredInventoryData = useMemo(
    () =>
      selectedYears.length
        ? inventoryTurnOverData.filter(d => selectedYears.includes(d.year))
        : inventoryTurnOverData,
    [selectedYears]
  );


  const buildBurnSeriesFromData = (year: number) => {
    const periodIndex = financialAvailableYears.indexOf(Number(year)) + 1;
    const outflowSeries: any = (financeData.cashOutFlows?.series ?? []).find((s: any) => s.period === periodIndex) ?? null;
    const months = MONTHS;

    // monthly raw amounts (fallback to cashOutFlowGroupCollection monthamounts)
    const monthlyRaw = (outflowSeries?.monthlyseries ?? cashOutFlowGroupCollection[financialAvailableYears.indexOf(year)] ?? []).map((m: any, i: number) => ({
      monthIndex: i,
      month: months[i],
      amount: Number(m?.amount ?? m?.monthamount ?? 0),
      breakdown: Array.isArray(m?.breakdown) ? m.breakdown : undefined
    }));
    // ensure length 12
    while (monthlyRaw.length < 12) monthlyRaw.push({ monthIndex: monthlyRaw.length, month: months[monthlyRaw.length], amount: 0 });

    // category list (from annual breakdown if present, otherwise common outflow ids)
    const categoriesFromAnnual: any[] = Array.isArray(outflowSeries?.breakdown) ? outflowSeries.breakdown : [];
    const defaultCats = [
      { id: 'payroll', name: 'Payroll' },
      { id: 'opex', name: 'Operating Expenses' },
      { id: 'taxes', name: 'Taxes' },
      { id: 'capex', name: 'Capex' },
      { id: 'rent', name: 'Rent / Facilities' },
      { id: 'interest', name: 'Interest' },
      { id: 'other', name: 'Other' }
    ];
    const cats = categoriesFromAnnual.length ? categoriesFromAnnual.map((c: any) => ({ id: String(c.id ?? c.name).toLowerCase(), name: c.name ?? c.id, annual: Number(c.amount ?? c.value ?? 0) })) : defaultCats.map(c => ({ id: c.id, name: c.name, annual: 0 }));

    // if we have annual breakdown but no monthly breakdown, distribute proportionally to monthlyRaw amounts
    const totalMonthlySum = monthlyRaw.reduce((s: any, m: any) => s + m.amount, 0) || 0;
    return cats.map((cat, ci) => {
      const monthly = monthlyRaw.map((m: any) => {
        // priority: per-month breakdown if present
        const md = Array.isArray(m.breakdown) ? m.breakdown.find((b: any) => String(b.id ?? b.name).toLowerCase() === cat.id) : null;
        if (md) return { month: m.month, value: Number(md.amount ?? md.value ?? 0) };
        // else if annual known, distribute by month weight
        if (cat.annual && totalMonthlySum > 0) {
          const v = Math.round((m.amount / totalMonthlySum) * cat.annual);
          return { month: m.month, value: v };
        }
        // else fallback: if no annual or breakdown, try to infer by tag in monthly breakdown items
        return { month: m.month, value: 0 };
      });
      return { id: cat.id || `cat${ci}`, name: cat.name || `Category ${ci + 1}`, monthly };
    });
  };

  // build monthly debt data (shortDebt / longDebt) for a given year from companyshares
  const buildMonthlyDebtFromCompanyShares = (year: number): { month: string; shortDebt: number; longDebt: number }[] => {
    const quarters = companyShareGroupedByYear[year] ?? [];
    // map quarter name -> aggregated debt amounts (if multiple entries per quarter sum them)
    const qMap: Record<string, { shortDebt: number; longDebt: number }> = {};
    for (const q of quarters) {
      const qKey = (q.quarter ?? '').toLowerCase(); // e.g., "quarter 1"
      qMap[qKey] ??= { shortDebt: 0, longDebt: 0 };
      qMap[qKey].shortDebt += getAmount(q.liabilities ?? [], 'shortDebt');
      qMap[qKey].longDebt += getAmount(q.liabilities ?? [], 'longDebt');
    }

    // default to 0 if quarter missing
    const qValues = [
      qMap['quarter 1'] ?? { shortDebt: 0, longDebt: 0 },
      qMap['quarter 2'] ?? { shortDebt: 0, longDebt: 0 },
      qMap['quarter 3'] ?? { shortDebt: 0, longDebt: 0 },
      qMap['quarter 4'] ?? { shortDebt: 0, longDebt: 0 },
    ];

    // assign quarter values to months in that quarter (use same balance for each month in quarter)
    const monthly: { month: string; shortDebt: number; longDebt: number }[] = [];
    for (let q = 0; q < 4; q++) {
      const start = q * 3;
      for (let m = 0; m < 3; m++) {
        monthly.push({
          month: MONTHS[start + m],
          shortDebt: qValues[q].shortDebt,
          longDebt: qValues[q].longDebt
        });
      }
    }
    return monthly;
  };

  const [yearDrill, setYearDrill] = useState<number | null>(null); // <-- new state for overallCashByYear drill
  const overallCashByYear = () => {
    const data = financialAvailableYears.map((y, i) => {
      const inflow = Number(cashInFlowTotals[i] ?? 0);
      const outflow = Number(cashOutFlowTotals[i] ?? 0);
      const balance = typeof cashBalances[i] === 'number' ? cashBalances[i] : (inflow - outflow);
      const val = Math.round(balance);
      const label = val >= 1_000_000 ? `${(val / 1_000_000).toFixed(1)}M` : formatCurrency(val);
      return { year: Number(y), yearStr: String(y), cash: val, label };
    });

    const shown = selectedYears && selectedYears.length ? data.filter(d => selectedYears.includes(d.yearStr)) : data;

    const onAxisLabelRender = (args: IAxisLabelRenderEventArgs) => {
      if (args.axis && args.axis.name === 'primaryYAxis') {
        args.text = formatCurrency(Number(args.text));
      }
    };

    const onChartMouseClick = (args: any) => {
      const targetId = args.target || args.event?.target?.id;
      const { text, year } = getAxisLabelFromTarget(targetId);
      if (year) {
        setYearDrill(year); // call existing drill function with the year
      }
    };

    // handle clicking a year column -> drill to monthly view
    const onPointClick = (args: any) => {
      const yearNum = Number(args?.point?.x ?? args?.point?.category ?? args?.point?.label);
      if (!isNaN(yearNum)) setYearDrill(yearNum);
    };

    // build monthly datasource for a drilled year (net and cumulative)
    const buildMonthlyForYear = (year: number) => {
      const idx = financialAvailableYears.indexOf(year);
      const inflowGroup = cashInFlowGroupCollection[idx] ?? [];
      const outflowGroup = cashOutFlowGroupCollection[idx] ?? [];
      const months = MONTHS;

      // 1) compute monthly net values
      const nets: number[] = [];
      for (let i = 0; i < 12; i++) {
        const inflow = Number(inflowGroup[i]?.monthamount ?? 0);
        const outflow = Number(outflowGroup[i]?.monthamount ?? 0);
        nets.push(inflow - outflow);
      }

      const annualNet = nets.reduce((s, n) => s + n, 0);

      // 2) determine canonical year-end cash from company shares (Q4 closing). If present, use it to derive starting cash.
      const yearEndCash = getYearEndCashFromShares(year);
      let startingCash: number;
      if (yearEndCash !== null) {
        // starting such that starting + annualNet = yearEndCash
        startingCash = Math.round(yearEndCash - annualNet);
      } else {
        // fallback: use opening cash from companyshares first quarter if available, else previous year balance or 0
        const yearQuarters = companyShareGroupedByYear[year] ?? [];
        const openingCash = Number(getAmount(yearQuarters[0]?.assets ?? [], 'cash') ?? 0);
        const prevBalance = cashBalances[financialAvailableYears.indexOf(year) - 1] ?? 0;
        startingCash = openingCash || prevBalance || 0;
      }

      // 3) build running balances month-by-month (closing after each month)
      let running = startingCash;
      let cumulativeNet = 0;
      const monthly: { month: string; net: number; cumulativeNet: number; balance: number }[] = [];
      for (let i = 0; i < 12; i++) {
        const net = nets[i] ?? 0;
        cumulativeNet += net;                          // running total of monthly nets
        running += net;
        monthly.push({ month: months[i], net: Math.round(net), cumulativeNet: Math.round(cumulativeNet), balance: Math.round(running) });
      }

      // If we had a yearEndCash from shares, ensure last month matches it (small rounding corrections)
      if (yearEndCash !== null && monthly.length === 12) {
        const diff = yearEndCash - monthly[11].balance;
        if (diff !== 0) {
          // apply adjustment to December balance (and month) to preserve totals
          monthly[11].balance = Math.round(monthly[11].balance + diff);
        }
      }

      return monthly;
    };

    // back to year view
    const clearDrill = () => setYearDrill(null);

    // render monthly drill (if set)
    if (yearDrill !== null) {
      const monthlyData = buildMonthlyForYear(yearDrill);
      return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <div style={{ fontWeight: 600, padding: '10px' }}>{`Cash by Month — FY${yearDrill}`}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={clearDrill} style={{ background: 'transparent', padding: '6px 10px', borderRadius: 6 }}>Back</button>
            </div>
          </div>

          <ChartComponent id='monthly-cash-drill'
            ref={monthlyCashRef}
            load={onChartLoad}
            chartArea={{ border: { width: 0 } }}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: false }}
            axisLabelRender={onAxisLabelRender}
            textRender={onTextRender}
            tooltipRender={onCurrencyTooltip}
          >
            <Inject services={[ColumnSeries, SplineSeries, Legend, Tooltip, DataLabel, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={monthlyData}
                xName='month'
                yName='balance'
                name='Cash'
                type='Column'
                fill='#F675A8'
                marker={{ dataLabel: { visible: true, position: 'Outer', format: '${value}' } }}
                animation={{ enable: false }}
              />
              <SeriesDirective
                dataSource={monthlyData}
                xName='month'
                yName='cumulativeNet'
                name='Net Cash Flow'
                type='Spline'
                fill='#87A2FB'
                marker={{ visible: true }}
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      );
    }

    // default: year-level column chart with pointClick to drill
    return (
      <div style={{ height: "100%", width: "100%", padding: 8 }}>
        <ChartComponent id='areachart'
          ref={overallcashRef}
          load={onChartLoad}
          axisLabelRender={onAxisLabelRender}
          tooltip={{ enable: true }}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ visible: false }}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
          pointClick={onPointClick}
          chartMouseClick={onChartMouseClick}
          tooltipRender={onCurrencyTooltip}
        >
          <Inject services={[ColumnSeries, LineSeries, Legend, Tooltip, DataLabel, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={shown}
              fill="#87A2FB"
              xName='yearStr'
              yName='cash'
              type='Column'
              marker={{ dataLabel: { visible: true, position: 'Top', name: 'label' }, visible: true, width: 8, height: 8 }}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const inventoryTurnover = () => {

    const TARGET = 1.1;

    const targetLabel = `Target (${TARGET.toFixed(1)})`;
    // Build a matching array for the target line (one point per category)
    const targetData = inventoryTurnOverData.map((d) => ({ year: d.year, target: TARGET }));

    return (
      <div style={{ height: "100%", width: "100%", padding: 8 }}>
        <ChartComponent
          id="inventory-turnover"
          ref={inventoryChartRef}
          load={onChartLoad}
          primaryXAxis={{
            valueType: 'Category',
            majorGridLines: { width: 0 },
            labelIntersectAction: 'Rotate45', // keeps labels readable
          }}
          primaryYAxis={{
            minimum: 0,
            maximum: 1.5,
            interval: 0.2,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            stripLines: [
              {
                start: 0,
                end: 1.5,
                text: '',
                color: '#e5dcf6',
                opacity: 0.5,
                visible: true,
                textStyle: { color: '#6840d8', size: '12px' },
              },
            ],
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{
            enable: true,
            header: 'Inventory Turnover',
            format: 'Year: ${point.x} <br/> Turnover: ${point.y} <br/> Target: 1.1',
          }}
          legendSettings={{ visible: true }}
        >
          <Inject services={[ColumnSeries, LineSeries, Category, Tooltip, Legend, StripLine, DataLabel]} />

          <SeriesCollectionDirective>
            {/* Turnover = Column */}
            <SeriesDirective
              type="Column"
              dataSource={filteredInventoryData}
              xName="year"
              yName="turnover"
              name="Higher turnover - faster inventory movement"
              columnSpacing={0.25}
              marker={{ visible: true, dataLabel: { visible: true } }}
              fill="#C539B4" // reddish as in your image
              border={{ width: 0 }}
              animation={{ enable: false }}
            />

            {/* Target = dashed line across categories */}
            <SeriesDirective
              type="Line"
              dataSource={targetData}
              xName="year"
              yName="target"
              name={targetLabel}
              width={3}
              dashArray="8 6"
              fill="#73467D"
              marker={{ visible: false }}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const turnoverChart = () => {
    const AR_TARGET = 2.6;
    const AP_TARGET = 1.5;
    const arTargetLabel = `AR Target ≥ ${AR_TARGET}x`;
    const apTargetLabel = `AP Target ≤ ${AP_TARGET}x`;

    // build horizontal target series that match the visible categories
    const arTargetData = filteredTurnOverData.map(d => ({ year: d.year, target: AR_TARGET }));
    const apTargetData = filteredTurnOverData.map(d => ({ year: d.year, target: AP_TARGET }));

    return (
      <div style={{ height: "100%", width: "100%", padding: 8 }}>
        <ChartComponent
          id="turnover-chart"
          load={onChartLoad}
          ref={turnoverChartRef}
          chartArea={{ border: { width: 0 } }}
          primaryXAxis={{
            valueType: 'Category',
            majorGridLines: { width: 0 },
          }}
          primaryYAxis={{
            minimum: 0,
            maximum: 4,
            interval: 0.5
          }}
          tooltip={{ enable: true, format: 'Year: ${point.x} <br/> Turnover: ${point.y}' }}
          legendSettings={{ visible: true, position: 'Bottom' }}
        >
          <Inject services={[ColumnSeries, LineSeries, Legend, Tooltip, DataLabel, Category]} />

          <SeriesCollectionDirective>
            {/* Accounts Receivable Turnover - Column */}
            <SeriesDirective
              dataSource={filteredTurnOverData}
              xName="year"
              yName="arTurnover"
              name="Higher AR Turnover - faster customer collections"
              type="Column"
              marker={{ dataLabel: { visible: true, position: 'Middle', format: '{value}' } }}
              fill="#87A2FB"
              animation={{ enable: false }}
            />

            {/* Accounts Payable Turnover - Column */}
            <SeriesDirective
              dataSource={filteredTurnOverData}
              xName="year"
              yName="apTurnover"
              name="Lower AP Turnover - slower supplier payments"
              type="Column"
              marker={{ dataLabel: { visible: true, position: 'Middle', format: '{value}' } }}
              fill="#F675A8"
              animation={{ enable: false }}
            />

            {/* AR Target - dashed line with legend label */}
            <SeriesDirective
              type="Line"
              dataSource={arTargetData}
              xName="year"
              yName="target"
              width={2}
              dashArray="6 6"
              fill="#888"
              marker={{ visible: false }}
              animation={{ enable: false }}

            />

            {/* AP Target - dashed line with legend label */}
            <SeriesDirective
              type="Line"
              dataSource={apTargetData}
              xName="year"
              yName="target"
              width={2}
              dashArray="4 4"
              fill="#888"
              marker={{ visible: false }}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const burnLineChart = () => {
    const selYear = Number(selectedDropdownYear) || financialAvailableYears[financialAvailableYears.length - 1];
    const burnSeries = buildBurnSeriesFromData(selYear);
    const palette = ['#7DE5ED', '#D989B5', '#F675A8', '#73467D', '#FFADBC', '#87A2FB', '#EF9A53', '#C539B4', '#645CAA'];

    // compute stacked totals for axis bounds
    const monthlyTotals = MONTHS.map((m, mi) =>
      burnSeries.reduce((s, bs) => s + (bs.monthly[mi]?.value ?? 0), 0)
    );
    const maxTotal = monthlyTotals.length ? Math.max(...monthlyTotals) : 0;
    const yPadding = Math.max(1, Math.round(maxTotal * 0.12));
    const yMin = 0;
    const yMax = Math.ceil(maxTotal + yPadding);
    const yInterval = Math.max(1, Math.round((yMax - yMin) / 4));

    return (
      <div style={{ height: '100%', width: '100%', padding: 8 }}>
        <ChartComponent id='burnline'
          load={onChartLoad}
          ref={burnchartRef}
          chartArea={{ border: { width: 0 } }}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
          primaryYAxis={{
            majorGridLines: { width: 0.5 }
          }}
          tooltip={{ enable: true, header: '${series.name}' }}
          legendSettings={{ visible: false, position: 'Bottom' }}
          axisLabelRender={formatYAxisDollar}
          tooltipRender={onCurrencyTooltip}>
          <Inject services={[StackingColumnSeries, DataLabel, Category, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {burnSeries.map((bs, i) => (
              <SeriesDirective
                key={bs.id}
                dataSource={bs.monthly}
                xName='month'
                yName='value'
                type='StackingColumn'
                name={bs.name}
                fill={palette[i % palette.length]}
                columnWidth={0.6}
                marker={{ dataLabel: { visible: false } }}
                animation={{ enable: false }}
              />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const debtHeader = () => {
    return (
      <div className="finance-panel-header">
        <div>Long‑term vs Short‑term Debt Trend</div>
      </div>
    );
  };

  const burnHeader = () => {
    return (
      <div className="finance-panel-header">
        <div>Expense Burn by Month</div>
      </div>
    );
  };

  const overallCashHeader = () => {
    return (
      <div className="finance-panel-header">
        <div>Overall Cash by Years</div>
      </div>
    );
  };

  const turnOverHeader = () => {
    return (
      <div className="finance-panel-header">
        <div>Annual Account Receivable and Account Payable Turnover Comparison</div> <br />
      </div>
    );
  };

  const inventoryHeader = () => {
    return (
      <div className="finance-panel-header">
        <div>Inventory Turnover Trend vs Target</div>
      </div>
    );
  };



  const debtLineChart = () => {
    // build monthly debt for selected year (fallback to latest)
    const selYear = Number(selectedDropdownYear) || financialAvailableYears[financialAvailableYears.length - 1];
    const monthlyDebt = buildMonthlyDebtFromCompanyShares(selYear);

    // compute min/max across both series and add padding so smaller series remains visible
    const shortVals = monthlyDebt.map(d => d.shortDebt ?? 0);
    const longVals = monthlyDebt.map(d => d.longDebt ?? 0);
    const maxVal = Math.max(...shortVals, ...longVals, 0);
    const minVal = 0;
    const padding = Math.max(1, Math.round((maxVal - minVal) * 0.12)); // 12% padding
    const yMin = Math.max(0, Math.floor(minVal - padding));
    const yMax = Math.ceil(maxVal + padding);
    const yInterval = Math.max(1, Math.round((yMax - yMin) / 4));

    // colors
    const shortColor = '#F675A8';
    const longColor = '#7DE5ED';

    return (
      <div style={{ height: '100%', width: '100%', padding: 8 }}>
        <ChartComponent id='debtline'
          ref={debtChartRef}
          load={onChartLoad}
          chartArea={{ border: { width: 0 } }}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
          primaryYAxis={{
            majorGridLines: { width: 0.5 }
          }}
          tooltip={{ enable: true, header: '${series.name}' }}
          legendSettings={{ visible: true, position: 'Bottom' }}
          axisLabelRender={formatYAxisDollar}
          tooltipRender={onCurrencyTooltip}>
          <Inject services={[SplineAreaSeries, SplineSeries, DataLabel, Category, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {/* long-term area (drawn first) */}
            <SeriesDirective
              dataSource={monthlyDebt}
              xName='month'
              yName='longDebt'
              type='SplineArea'
              name="Long-term Debt"
              fill={longColor}
              opacity={0.35}
              marker={{
                visible: true,
                shape: 'Circle',
                width: 10,
                height: 10,
                border: { width: 1, color: '#ffffff' },
                fill: longColor
              }}
              border={{ width: 1, color: longColor }}
              animation={{ enable: false }}
            />
            {/* short-term area */}
            <SeriesDirective
              dataSource={monthlyDebt}
              xName='month'
              yName='shortDebt'
              type='SplineArea'
              name="Short-term Debt"
              fill={shortColor}
              opacity={0.45}
              marker={{
                visible: true,
                shape: 'Circle',
                width: 10,
                height: 10,
                border: { width: 1, color: '#ffffff' },
                fill: shortColor
              }}
              border={{ width: 1, color: shortColor }}
              animation={{ enable: false }}
            />

            {/* outline lines on top to make both series readable */}
            <SeriesDirective
              dataSource={monthlyDebt}
              xName='month'
              yName='longDebt'
              type='Spline'
              fill="transparent"
              width={2}
              marker={{
                visible: false
              }}
              border={{ width: 2, color: longColor }}
              animation={{ enable: false }}
            />
            <SeriesDirective
              dataSource={monthlyDebt}
              xName='month'
              yName='shortDebt'
              type='Spline'
              fill="transparent"
              width={2}
              marker={{
                visible: false,
              }}
              border={{ width: 2, color: shortColor }}
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const cashFlowCard = () => {
    // determine selected year (use first selectedDropdownYears value if set, otherwise latest available)
    const selectedYearStr = (selectedDropdownYear) ?? String(financialAvailableYears[financialAvailableYears.length - 1]);
    const selectedYear = Number(selectedYearStr);
    let idx = financialAvailableYears.indexOf(selectedYear);
    if (idx < 0) idx = financialAvailableYears.length - 1; // fallback to latest
    const prevIdx = idx > 0 ? idx - 1 : -1;

    const balanceCurrent = (cashBalances && cashBalances[idx] != null)
      ? cashBalances[idx]
      : ((cashInFlowTotals[idx] ?? 0) - (cashOutFlowTotals[idx] ?? 0));

    const balancePrev = prevIdx >= 0
      ? ((cashBalances && cashBalances[prevIdx] != null)
        ? cashBalances[prevIdx]
        : ((cashInFlowTotals[prevIdx] ?? 0) - (cashOutFlowTotals[prevIdx] ?? 0)))
      : null;

    const pctChange = (balancePrev === null || Math.abs(balancePrev) < 1e-9)
      ? null
      : ((balanceCurrent - balancePrev) / Math.abs(balancePrev)) * 100;

    const comparisonLabel = `${pctChange?.toFixed(1)}`;

    const isUp = pctChange === null ? true : pctChange >= 0;

    return MetricCard("Cash in Bank", formatCurrency(balanceCurrent ?? 0), comparisonLabel, isUp);
  };

  const runwaymonthCard = () => {
    const selectedYearStr = (selectedDropdownYear) ?? String(financialAvailableYears[financialAvailableYears.length - 1]);
    const selectedYear = Number(selectedYearStr);
    let idx = financialAvailableYears.indexOf(selectedYear);
    if (idx < 0) idx = financialAvailableYears.length - 1;
    const prevIdx = idx > 0 ? idx - 1 : -1;

    const getCashInBankForIndex = (i: number) => {
      // prefer explicit cashBalances; fallback to cash item in company shares (first quarter), then inflow-outflow
      if (Array.isArray(cashBalances) && typeof cashBalances[i] === 'number') return cashBalances[i];
      const quarters = companyShareGroupedByYear[financialAvailableYears[i]] ?? [];
      const q0 = quarters[0] ?? null;
      const cashFromShares = q0 ? getAmount(q0.assets, 'cash') : null;
      if (typeof cashFromShares === 'number' && isFinite(cashFromShares) && cashFromShares > 0) return cashFromShares;
      const inflow = Number(cashInFlowTotals[i] ?? 0);
      const outflow = Number(cashOutFlowTotals[i] ?? 0);
      return (inflow - outflow);
    };

    const getMonthlyBurnForIndex = (i: number) => {
      // use monthly data when available to compute average monthly burn (only count months with net outflow)
      const inflowMonthly = (cashInFlowGroupCollection[i] ?? []).map(m => Number(m?.monthamount ?? 0));
      const outflowMonthly = (cashOutFlowGroupCollection[i] ?? []).map(m => Number(m?.monthamount ?? 0));
      if (outflowMonthly.length === 12) {
        const nets = Array.from({ length: 12 }).map((_, m) => (outflowMonthly[m] ?? 0));
        // monthly burn = average of positive net months (conservative) else average of all (if no positive months)
        const positiveSum = nets.reduce((s, v) => s + (v > 0 ? v : 0), 0);
        const positiveCount = nets.reduce((c, v) => c + (v > 0 ? 1 : 0), 0);
        if (positiveCount > 0) return positiveSum / 12; // spread annual positive burn over 12 months
        const annualNet = nets.reduce((s, v) => s + v, 0);
        return Math.max(0, annualNet / 12);
      }

      // fallback: compute from annual totals (outflow - inflow) / 12
      const annualNet = Math.max((cashOutFlowTotals[i] ?? 0), 0);
      return Math.max(0, annualNet / 12);
    };

    const computeRunwayMonthsForIndex = (i: number): number | null => {
      if (i < 0 || i >= financialAvailableYears.length) return null;
      const cashInBank = getCashInBankForIndex(i);
      if (typeof cashInBank !== 'number' || !isFinite(cashInBank)) return null;

      const monthlyBurn = getMonthlyBurnForIndex(i);
      // if no burn (monthlyBurn === 0) then runway is effectively infinite (no burn); return null to indicate not applicable
      if (!monthlyBurn || monthlyBurn <= 1e-9) return null;

      const months = cashInBank / monthlyBurn;
      if (!isFinite(months) || months < 0) return null;
      return months;
    };

    const displayRunwayMonths = computeRunwayMonthsForIndex(idx);
    const prevDisplayRunway = prevIdx >= 0 ? computeRunwayMonthsForIndex(prevIdx) : null;

    const formatRunwayLabel = (months: number | null) => {
      if (months === null || !isFinite(months) || months < 0) return '—';
      if (months === Infinity) return '∞';
      const yrs = Math.floor(months / 12);
      const remMonths = Math.round(months % 12);
      if (yrs >= 1) {
        return remMonths === 0 ? `${yrs} y${yrs > 1 ? 's' : ''}` : `${yrs} y ${remMonths} m`;
      }
      return `${Math.round(months)} m`;
    };

    const runwayLabel = formatRunwayLabel(displayRunwayMonths);

    // compute pct using displayed values (null-safe)
    const pct = (prevDisplayRunway === null || prevDisplayRunway === 0 || displayRunwayMonths === null)
      ? null
      : ((displayRunwayMonths - prevDisplayRunway) / Math.abs(prevDisplayRunway)) * 100;

    const comparison = `${pct === null || !isFinite(pct) ? '—' : pct.toFixed(1)}`;
    const isUp = pct === null ? true : pct >= 0;

    return MetricCard("Runway in Months", runwayLabel, comparison, isUp);
  };


  const operatingCashFlow = () => {
    const selectedYearStr = (selectedDropdownYear) ?? String(financialAvailableYears[financialAvailableYears.length - 1]);
    const selectedYear = Number(selectedYearStr);
    let idx = financialAvailableYears.indexOf(selectedYear);
    if (idx < 0) idx = financialAvailableYears.length - 1;
    const prevIdx = idx > 0 ? idx - 1 : -1;

    // per-year operating cash = inflow - outflow
    const inflowVal = Number(cashInFlowTotals[idx] ?? 0);
    const outflowVal = Number(cashOutFlowTotals[idx] ?? 0);
    const opCash = inflowVal - outflowVal;
    const opCashPrev = prevIdx >= 0 ? (Number(cashInFlowTotals[prevIdx] ?? 0) - Number(cashOutFlowTotals[prevIdx] ?? 0)) : null;

    const pct = (opCashPrev === null || Math.abs(opCashPrev) < 1e-9) ? null : ((opCash - opCashPrev) / Math.abs(opCashPrev)) * 100;
    const comparisonLabel = pct === null ? '—' : `${pct.toFixed(1)}%`;
    const isUp = pct === null ? true : pct >= 0;

    // build yearly series for sparkline (one point per year)
    const yearlySeries = financialAvailableYears.map((y) => {
      const i = financialAvailableYears.indexOf(y);
      const val = Number(cashInFlowTotals[i] ?? 0) - Number(cashOutFlowTotals[i] ?? 0);
      return { x: String(y), y: val };
    });

    return (
      <div style={{
        padding: 14,
        boxSizing: 'border-box',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', width: '100%' }}>
          <div style={{ flex: '1 1 40%', minWidth: 125, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 14, lineHeight: 1.15, whiteSpace: 'nowrap' }}>Operating Cash Flow</div>
            <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.05 }}>{formatCurrency(opCash)}</div>

            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: isUp ? '#16a34a' : '#991b1b',
                fontWeight: 600,
                fontSize: 12,
                whiteSpace: 'nowrap'
              }}>
                <span style={{ fontSize: 12 }}>{isUp ? '▲' : '▼'}</span>
                <span>{comparisonLabel}</span>
              </span>

              <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{`vs ${selectedDropdownYear - 1}`}</div>
            </div>
          </div>

          {/* CENTER: yearly sparkline showing operating cash per year */}
          <div style={{ flex: '0 0 100px', minWidth: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 260 }}>
              <SparklineComponent
                id="operating-cash-year-spark"
                height="56px"
                width="100%"
                type="Area"
                axisSettings={{
                  minY: 17200, maxY: 22800
                }}
                dataSource={yearlySeries}
                xName="x"
                yName="y"
                fill="#d9890aff"                     // semi-transparent area fill
                border={{ color: '#84e7be', width: 4 }} // area outline (stroke)
                lineWidth={3}                         // thicker line
                valueType="Category"
                markerSettings={{                     // show last point with styled marker
                  size: 6,
                  fill: '#ffffff',
                  border: { color: '#7DE5ED', width: 2 }
                }}
                tooltipSettings={{ visible: true, format: ' Year: ${x} <br/> Amount: $${y}' } as any}
              >
                <Inject services={[SplineSeries, AreaSeries, SparklineTooltip]} />
              </SparklineComponent>
            </div>
          </div>

          {/* RIGHT: inflow/outflow */}
          <div style={{ flex: '0 0 60px', minWidth: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, textAlign: 'right' }}>
            <div style={{ fontSize: 12 }}>Inflow</div>
            <div style={{ fontWeight: 700 }}>{formatCurrency(inflowVal)}</div>

            <div style={{ height: 8 }} />

            <div style={{ fontSize: 12 }}>Outflow</div>
            <div style={{ fontWeight: 700 }}>{formatCurrency(outflowVal)}</div>
          </div>
        </div>
      </div>
    );
  };

  const MetricCard = (title: string, value: string | number, comparisonValue: string, arrowUp: boolean) => {
    const chipBg = arrowUp ? '#dcfce7' : '#fee2e2';
    const chipText = arrowUp ? '#166534' : '#991b1b';
    return (
      <div id='main-finance-div'>
        <div id='title-finance-card'>{title}</div>
        <div id='card-finance-value'>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span
            style={{
              color: arrowUp ? '#16a34a' : '#dc2626',
              fontWeight: 600
            }}
          >
            {arrowUp ? '▲' : '▼'} {comparisonValue}%
          </span>
          <span style={{ fontSize: 12 }}>
            vs {selectedDropdownYear - 1}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="Container">
      {/* Page title + global filters */}
      <div className="e-card cs-toolbar">
        <div className="cs-toolbar-left">
          <span className="cs-title">Cash Flow and Liquidity</span>
        </div>
        <div className="cs-toolbar-right">
          <DropDownListComponent
            dataSource={financialAvailableYears.filter(y => y !== 2021)}
            value={selectedDropdownYear}
            placeholder="Select year"
            change={onYearChange}
          />
        </div>
      </div>

      <DashboardLayoutComponent
        ref={cashflowRef}
        id="cashflow_dashboard"
        style={{ height: '100%', width: '100%' }}
        columns={8}
        cellAspectRatio={1}
        cellSpacing={cellSpacing}
        allowResizing={false}
        allowDragging={false}
        mediaQuery="(max-width:950px)"
      >
        <PanelsDirective>
          <PanelDirective id="cashcard" sizeX={2} sizeY={1} row={0} col={0} content={cashFlowCard} />
          <PanelDirective id="runwaymonthcard" sizeX={2} sizeY={1} row={0} col={2} content={runwaymonthCard} />
          <PanelDirective id="cashbalancecard" sizeX={4} sizeY={1} row={0} col={4} content={operatingCashFlow} />
          <PanelDirective id="debtheader" sizeX={4} sizeY={3} row={1} col={0} header={debtHeader} content={debtLineChart} />
          <PanelDirective id="burnheader" sizeX={4} sizeY={3} row={1} col={4} header={burnHeader} content={burnLineChart} />
          <PanelDirective id="inventoryheader" sizeX={8} sizeY={4} row={5} col={0} header={inventoryHeader} content={inventoryTurnover} />
          <PanelDirective id="turnoverheader" sizeX={8} sizeY={4} row={9} col={0} header={turnOverHeader} content={turnoverChart} />
          <PanelDirective id="overallcashheader" sizeX={8} sizeY={4} row={17} col={0} header={overallCashHeader} content={overallCashByYear} />
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  );
};


export class FinanceDashboard extends SampleBase<{}, FinanceDashboardState> {
  private sidebarRef: React.RefObject<SidebarComponent | null>;
  private allowSidebarOpen = false;

  constructor(props: {}) {
    super(props);

    this.state = {
      selectedId: 'overview',
      selectedYear: 2025,
      isDocked: true
    };
    this.sidebarRef = React.createRef<SidebarComponent>();
  }

  private toolbarTitleTemplate = () => (
    <span className="finance-header-title">Finance Dashboard</span>
  );


  private onToolbarClicked = (args: ClickEventArgs) => {
    if (args.item.tooltipText === 'Menu') {
      this.allowSidebarOpen = true;
      this.sidebarRef.current?.toggle();
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
    setTimeout(() => {
      const el = document.getElementById('overview_dashboard') as HTMLElement | null;
      (el as any)?.ej2_instances?.[0]?.refresh?.();
    }, 500);
  }

  private onSidebarClose = () => {
    this.allowSidebarOpen = false;
    setTimeout(this.notifyResize, 400);
    this.setState({ isDocked: true });
    setTimeout(() => {
      const el = document.getElementById('overview_dashboard') as HTMLElement | null;
      (el as any)?.ej2_instances?.[0]?.refresh?.();
    }, 700);
  }

  private onYearChange = (e: ChangeEventArgs) => {
    const newYear = Number(e.value);
    if (!Number.isNaN(newYear)) {
      this.setState({
        selectedYear: newYear
      });
    }
  };

  onSidebarCreated = () => {
    if (this.sidebarRef.current) {
      this.sidebarRef.current.hide(); // ensure hidden
    }
  };

  private renderDashboard = (): JSX.Element => {
    const { selectedId, selectedYear } = this.state;
    const commonProps = {
      selectedYear,
      onYearChange: this.onYearChange,
    };
    switch (selectedId) {
      case 'overview':
        return <OverviewDashboard {...commonProps} />;
      case 'profitloss':
        return <ProfitLossDashboard {...commonProps} />;
      case 'cashflow':
        return <CashFlowDashboard {...commonProps} />;
      default:
        return <OverviewDashboard {...commonProps} />;
    }
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
    const isActive = (id: FinanceDashboardState['selectedId']) => (this.state.selectedId === id ? 'active' : '');
    return (
      <div>
        <div className="control-section" id="target_finance_dash">
          <div id='finance-dashboard_sidebar_section'>
            <div className="header">
              <ToolbarComponent cssClass="app-toolbar" id="app-toolbar" height="50px" clicked={this.onToolbarClicked}>
                <ItemsDirective>
                  <ItemDirective prefixIcon="e-menu" tooltipText="Menu" />
                  <ItemDirective template={this.toolbarTitleTemplate} />
                </ItemsDirective>
              </ToolbarComponent>
            </div>
            <div className="cs-workarea">
              <SidebarComponent
                id="dockFinanceSideDash"
                ref={this.sidebarRef}
                width="240px"
                enableDock={true}
                closeOnDocumentClick={false}
                enableGestures={false}
                dockSize="60px"
                type="Push"
                target=".cs-content"
                open={this.onSidebarOpen}
                close={this.onSidebarClose}
                created={this.onSidebarCreated}
              >
                <div className="sidebar-content">
                  {this.withTooltip('Overview',
                    <div
                      className={`finance-nav-item ${isActive('overview')}`}
                      onClick={() => this.setState({ selectedId: 'overview' })}
                    >
                      <span className="e-icons e-home" aria-hidden="true"></span>
                      <span className="finance-nav-text">Overview</span>
                    </div>
                  )}
                  {this.withTooltip('Financial Performance',
                    <div
                      className={`finance-nav-item ${isActive('profitloss')}`}
                      onClick={() => this.setState({ selectedId: 'profitloss' })}
                    >
                      <span className={this.icon('profit-loss')} aria-hidden="true"></span>
                      <span className="finance-nav-text">Financial Performance</span>
                    </div>
                  )}
                  {this.withTooltip('Cash Flow and Liquidity',
                    <div
                      className={`finance-nav-item ${isActive('cashflow')}`}
                      onClick={() => this.setState({ selectedId: 'cashflow' })}
                    >
                      <span className={this.icon('cash-flow')} aria-hidden="true"></span>
                      <span className="finance-nav-text">Cash Flow and Liquidity</span>
                    </div>
                  )}
                </div>
              </SidebarComponent>

              {/* Main content area */}
              <div className="cs-content">
                <div className="app-page" style={{ padding: '16px', background: '#ffffff' }}>
                  {this.renderDashboard()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
            A balance sheet provides a snapshot of a company’s financial position by detailing its assets, liabilities, and equity at a specific point in time, while the Profit and Loss section highlights financial performance over a period by summarizing revenues, expenses, and net income. Together with cash flow analysis—which tracks the movement of money through operating, investing, and financing activities—these components offer a comprehensive view of the organization’s stability, profitability, liquidity, and overall financial health.
          </p>
        </div>
      </div>
    );
  }
}

export default FinanceDashboard;