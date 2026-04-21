import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DashboardLayoutComponent, PanelDirective, PanelsDirective, ResizeArgs } from "@syncfusion/ej2-react-layouts";
import * as InsuranceDatasource from './insurance-datasource.json';
import { ClickEventArgs, SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MultiSelectComponent, CheckBoxSelection, DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  StackingColumnSeries,
  Legend,
  Tooltip,
  Inject,
  ColumnSeries,
  BarSeries,
  DataLabel,
  SparklineComponent,
  SparklineTooltip,
  SplineAreaSeries,
  Crosshair,
  ILoadedEventArgs,
  ChartTheme,
  IAccLoadedEventArgs,
  AccumulationTheme,
  ITextRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort as GridSort,
  Page as GridPage,
  Filter as GridFilter,
  Inject as GridInject,
  Resize,
  Group,
  RowDD,
  Toolbar,
  ExcelExport,
  PdfExport,
  TextWrapSettingsModel
} from '@syncfusion/ej2-react-grids';
import {
  CircularGaugeComponent, AxesDirective as CircularGaugeAxesDirective, AxisDirective as CircularGaugeAxisDirective,
  PointersDirective, PointerDirective, RangesDirective, RangeDirective,
  Annotations, AnnotationDirective, AnnotationsDirective, GaugeTooltip, Legend as CircularGaugeLegend,
  GaugeTheme
} from '@syncfusion/ej2-react-circulargauge';
import {
  MapsComponent, LayersDirective, LayerDirective,
  Legend as MapsLegend, Inject as MapsInject,
  MapsTooltip, MarkersDirective, MarkerDirective,
  Zoom as MapsZoom, Selection as MapsSelection, Highlight as MapsHighlight,
  MapsTheme
} from '@syncfusion/ej2-react-maps';
import {
  KanbanComponent,
  ColumnsDirective as KanbanColumnsDirective,
  ColumnDirective as KanbanColumnDirective
} from '@syncfusion/ej2-react-kanban';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import {
  ItemDirective,
  ItemsDirective,
  ToolbarComponent
} from '@syncfusion/ej2-react-navigations';
import { setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './insurance-dashboard.css';
import './dashboard-bold-icon.css';
import './dashboard-light-icon.css';

const InsuranceData: any = InsuranceDatasource as any;
MultiSelectComponent.Inject(CheckBoxSelection);

setCulture('en');
setCurrencyCode('USD');

const POLICY_TYPES = ['Travel', 'Home', 'Life', 'Health', 'Disability'] as const;

const ALLOWED_YEARS = [2025, 2024, 2023, 2022] as const;

type InsuranceDashboardState = {
  selectedId: 'overview' | 'cliam-analysis' | 'customer';
  sharedYears: number[];
  isDocked: boolean;
  sharedPolicyTypes: string[];
};

const pieThemePalette = ["#CE9461", "#DC3535", "#F8CA7E", "#FF7000", "#CDA310", "#FFB200", "#FF4949"];

const donutPaletteColors = ["#CD104D", "#C55300", "#FFB200", "#E8AA42", "#FF4949", "#CDA310", "#FF7000", "#C55300"];

const mapPaletteColors = ["#FF4949", "#CE9461", "#FF7000", "#CD104D", "#FFB200", "#C55300"];

const sparklinePalette = ["#05B3DA", "#E77A16", "#9204EA", "#6200EE", "#B1212D", "#82C100"];

// Reusable delta badge (green up, red down)
const getBadgeStyle = (tone: 'good' | 'bad'): React.CSSProperties => {
  const base: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    border: '1px solid #E2E8F0'
  };
  return tone === 'good'
    ? { ...base, background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }
    : { ...base, background: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' };
};

type DeltaInfo = { diff: number; pct?: number; prevYear?: number };
const DeltaBadge: React.FC<{ delta?: DeltaInfo; goodWhenUp?: boolean }> = ({ delta, goodWhenUp = true }) => {
  if (!delta || delta.pct == null || delta.prevYear == null) return null;
  const up = delta.diff >= 0;
  const good = goodWhenUp ? up : !up;
  const icon = up ? '▲' : '▼';
  const text = `${up ? '+' : '-'}${Math.abs(delta.pct).toFixed(1)}% vs ${delta.prevYear}`;
  return (
    <span style={getBadgeStyle(good ? 'good' : 'bad')}>
      <span style={{ marginRight: 4 }}>{icon}</span>
      <span>{text}</span>
    </span>
  );
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

const Mapload = (args: any): void => {
  let selectedTheme: string = location.hash.split('/')[1];
  selectedTheme = selectedTheme ? selectedTheme : 'Material';
  args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast').replace(/-dark/i, "Dark").replace(/-highContrast/i, 'HighContrast') as MapsTheme;
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

const headerWithTooltip = (label: string) => {
  return () => (
    <div title={label} style={{ display: 'inline-block', cursor: 'default' }}>{label}</div>
  );
};

// Global compact currency formatter (USD)
const currencyCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1
});
const fmtCurrency = (n: number | null | undefined) => currencyCompact.format(Number(n || 0));

const Dashboard1: React.FC<{ selectedYears: number[]; onChangeYears: (ys: number[]) => void }> = ({ selectedYears, onChangeYears }) => {

  const OverviewRef = React.useRef<DashboardLayoutComponent | null>(null);
  const ProfitvsExpenseRef = React.useRef<ChartComponent | null>(null);
  const AssuredAmountRef = React.useRef<ChartComponent | null>(null);
  const APERef = React.useRef<ChartComponent | null>(null);
  const PolicyRatioRef = React.useRef<AccumulationChartComponent | null>(null);
  const PolicyHolderRef = React.useRef<AccumulationChartComponent | null>(null);
  const ReferralRef = React.useRef<AccumulationChartComponent | null>(null);
  const PoliciesSoldRef = React.useRef<SparklineComponent | null>(null);

  const yearOptions = React.useMemo(
    () => (ALLOWED_YEARS as readonly number[]).map(y => ({ id: String(y), year: String(y) })),
    []
  );

  const currentYearOverview = React.useMemo(
    () => (selectedYears.length ? Math.max(...selectedYears) : (ALLOWED_YEARS[0] as number)),
    [selectedYears]
  );

  const onYearChange = (e: ChangeEventArgs) => {
    const v = Number(e?.value);
    if (Number.isFinite(v)) onChangeYears([v]);
  };

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshAll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        OverviewRef.current?.refresh();
        ProfitvsExpenseRef.current?.refresh();
        AssuredAmountRef.current?.refresh();
        APERef.current?.refresh();
        PolicyRatioRef.current?.refresh();
        PolicyHolderRef.current?.refresh();
        ReferralRef.current?.refresh();
        PoliciesSoldRef.current?.refresh();
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

  // KPIs computed from selected years
  const kpis = React.useMemo(() => {
    const data = (InsuranceData as any).overview as any[]; // source: default-datasource.json
    const rows = data.filter(r => selectedYears.includes(r.year));
    const policiesSold = rows.length;
    const assuredAmount = rows.reduce((sum, r) => sum + (r.AssuredAmount ?? 0), 0);
    const totalAmount = rows.reduce((sum, r) => sum + (r.TotalAmount ?? 0), 0);
    return { policiesSold, assuredAmount, totalAmount };
  }, [selectedYears]);

  const onCurrencyAxisLabel = (args: any) => {
    if (args?.axis?.orientation === 'Vertical') {
      args.text = fmtCurrency(Number(args.value || 0));
    }
  };

  const onNumericAxisLabel = React.useCallback((args: any) => {
    if (args?.axis?.valueType !== 'Category') {
      args.text = fmtCurrency(Number(args.value || 0));
    }
  }, []);

  const onCurrencyTooltip = (args: any) => {
    const y = Number(args?.point?.y ?? 0);
    const x = String(args?.point?.x ?? '');
    const series = String(args?.series?.name ?? '');
    args.text = series ? `${x} : ${fmtCurrency(y)}` : `${x}: ${fmtCurrency(y)}`;
  };

  const onCurrencyDataLabel = React.useCallback((args: any) => {
    const val = Number(args?.point?.y ?? args?.text ?? 0);
    args.text = currencyCompact.format(val);
  }, [currencyCompact]);

  const fmtKpi = (n: number) => fmtCurrency(n);

  const onCreated = (e: ResizeArgs) => {
    setTimeout(() => {
      OverviewRef.current?.refresh();
    }, 500)
  }

  const PoliciesSold = () => {
    const data = React.useMemo(() => {
      const overviewdata = ((InsuranceData as any).overview as any[]) ?? [];
      const counts = new Map<number, number>();
      for (const row of overviewdata) {
        const y = Number(row.year ?? row.Year);
        if (!Number.isFinite(y)) continue;
        counts.set(y, (counts.get(y) || 0) + 1);
      }
      const years = Array.from(counts.keys()).sort((a, b) => a - b);
      return years.map(y => ({ x: String(y), y: counts.get(y) || 0 }));
    }, []);

    return (
      <div className="kpi-totalcard">
        <div className="spark-header">
          <div className="insurance-label">Policies Sold</div>
          <div className="insurance-card-value">{kpis.policiesSold.toLocaleString()}</div>
        </div>
        <div className="spark-content" style={{ width: '50%', height: '50%' }}>
          <div style={{ marginTop: 8, width: '100%' }}>
            <SparklineComponent
              id="policies-sold-sparkline"
              ref={PoliciesSoldRef}
              type="Line"
              dataSource={data as any}
              xName="x"
              yName="y"
              valueType="Category"
              width="100%"
              height="55px"
              lineWidth={2}
              fill="#05B3DA"
              markerSettings={{ visible: ['All'], size: 2, fill: '#05B3DA' }}
              tooltipSettings={{ visible: true, format: 'Year: ${x}<br/>Policies: ${y}' }}
            >
              <Inject services={[SparklineTooltip]} />
            </SparklineComponent>
          </div>
        </div>
      </div>
    );
  };

  const { assuredDelta, totalAmountDelta, avgPremiumDelta } = React.useMemo(() => {
    const overviewdata: any[] = ((InsuranceData as any).overview as any[]) ?? [];
    const yearsSel = Array.isArray(selectedYears) ? selectedYears : [];
    if (!overviewdata.length || !yearsSel.length) return { assuredDelta: undefined, totalAmountDelta: undefined, avgPremiumDelta: undefined };

    const currentYear = Math.max(...yearsSel);
    const prevYear = currentYear - 1;

    const sumFor = (yr: number, key: string) =>
      overviewdata.reduce((s, r) => (Number(r.year ?? r.Year) === yr ? s + (Number(r[key]) || 0) : s), 0);
    const countFor = (yr: number) => overviewdata.reduce((s, r) => (Number(r.year ?? r.Year) === yr ? s + 1 : s), 0);

    const currAssured = sumFor(currentYear, 'AssuredAmount');
    const prevAssured = sumFor(prevYear, 'AssuredAmount');
    const assuredDiff = currAssured - prevAssured;
    const assuredPct = prevAssured ? (assuredDiff / prevAssured) * 100 : undefined;

    const currTotal = sumFor(currentYear, 'TotalAmount');
    const prevTotal = sumFor(prevYear, 'TotalAmount');
    const totalDiff = currTotal - prevTotal;
    const totalPct = prevTotal ? (totalDiff / prevTotal) * 100 : undefined;

    const currCount = countFor(currentYear);
    const prevCount = countFor(prevYear);
    const currAvg = currCount ? currTotal / currCount : 0;
    const prevAvg = prevCount ? prevTotal / prevCount : 0;
    const avgDiff = currAvg - prevAvg;
    const avgPct = prevAvg ? (avgDiff / prevAvg) * 100 : undefined;

    return {
      assuredDelta: { diff: assuredDiff, pct: assuredPct, prevYear },
      totalAmountDelta: { diff: totalDiff, pct: totalPct, prevYear },
      avgPremiumDelta: { diff: avgDiff, pct: avgPct, prevYear }
    };
  }, [selectedYears]);


  const AssuredAmount = () => (
    <div className="insurance-card">
      <div className="insurance-label">Assured Amount</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">{fmtKpi(kpis.assuredAmount)}</div>
          <DeltaBadge delta={assuredDelta} />
        </div>
      </div>
    </div>
  );

  const TotalAmount = () => (
    <div className="insurance-card">
      <div className="insurance-label">Total Premium Amount</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">{fmtKpi(kpis.totalAmount)}</div>
          <DeltaBadge delta={totalAmountDelta} />
        </div>
      </div>
    </div>
  );

  const AverageAmount = () => (
    <div className="insurance-card">
      <div className="insurance-label">Average Premium Amount</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">
            {fmtKpi(kpis.policiesSold ? (kpis.totalAmount / kpis.policiesSold) : 0)}
          </div>
          <DeltaBadge delta={avgPremiumDelta} />
        </div>
      </div>
    </div>
  );

  const policyRateData = React.useMemo(() => {
    const policydata = ((InsuranceData as any).policydata as any[]) ?? [];
    if (!policydata.length) return [];

    const currentYear = selectedYears.length ? Math.max(...selectedYears) : undefined;
    if (!currentYear) return [];

    const rows = policydata.filter(r => (r.year ?? r.Year) === currentYear);
    if (!rows.length) return [];

    const getNum = (r: any, keys: string[]) => {
      for (const k of keys) {
        const value = r?.[k];
        if (typeof value === 'number' && Number.isFinite(value)) return value;
        if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(+value)) return +value;
      }
      return undefined;
    };

    let renewalSum = 0;
    let lapseSum = 0;
    let n = 0;

    for (const r of rows) {
      const renewal = getNum(r, ['RenewalRate', 'renewalRate', 'renewal']);
      const lapse = getNum(r, ['LapseRate', 'lapseRate', 'lapse']);
      const renewalrate = typeof renewal === 'number' ? renewal : (typeof lapse === 'number' ? 100 - lapse : undefined);
      const lapserate = typeof lapse === 'number' ? lapse : (typeof renewal === 'number' ? 100 - renewal : undefined);
      if (typeof renewalrate === 'number' && typeof lapserate === 'number') {
        renewalSum += renewalrate;
        lapseSum += lapserate;
        n++;
      }
    }
    if (n === 0) return [];

    const renewalAvg = +(renewalSum / n).toFixed(2);
    const lapseAvg = +(lapseSum / n).toFixed(2);

    return [
      { x: 'Renewal Rate', y: renewalAvg, text: `${renewalAvg}%` },
      { x: 'Lapse Rate', y: lapseAvg, text: `${lapseAvg}%` }
    ];
  }, [selectedYears]);

  const onPercentageTextRender = (args: ITextRenderEventArgs) => {
    const pct = (args as any)?.point?.percentage as number;
    if (pct != null) args.text = `${pct.toFixed(2)}%`;   // percentage only
  };

  const PolicyRatePieChart = () => (
    <div style={{ height: '100%', width: '100%' }}>
      {policyRateData.length === 0 ? (
        <div style={{ padding: 12 }}>No policy rate data for the selected year.</div>
      ) : (
        <AccumulationChartComponent
          id='policyratio-chart'
          ref={PolicyRatioRef}
          legendSettings={{ visible: true, position: 'Bottom' }}
          enableAnimation={true}
          tooltip={{ enable: true, format: '<b>${point.x}</b><br>Percentage: <b>${point.percentage}%</b>', header: '', enableHighlight: true }}
          load={onAccumulationLoad}
          textRender={onPercentageTextRender}
          enableSmartLabels={true}
        >
          <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={policyRateData}
              xName='x'
              yName='y'
              radius='70%'
              border={{ color: '#FFFFFF', width: 1 }}
              dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
              explode
              explodeIndex={0}
              explodeOffset='10%'
              palettes={pieThemePalette}
              animation={{ enable: false }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </div>
  );

  const profitExpenseData = React.useMemo<any[]>(() => {
    const policydata = ((InsuranceData as any).policydata as any[]) ?? [];
    if (!policydata.length) return [];

    const currentYear = selectedYears.length ? Math.max(...selectedYears) : undefined;
    if (!currentYear) return [];

    const toNum = (value: any) => {
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(+value)) return +value;
      return 0;
    };

    const rows = policydata.filter(r => (r.year ?? r.Year) === currentYear);

    const byType = new Map<string, { policy: string; profit: number; expense: number }>();
    for (const t of POLICY_TYPES) {
      byType.set(t, { policy: t, profit: 0, expense: 0 });
    }

    const addFromColumns = (acc: any, t: string, row: any) => {
      const tl = t.toLowerCase();
      const candidatesProfit = [
        `${t}Profit`, `${t}_Profit`, `Profit${t}`, `${t}GrossProfit`,
        `${tl}Profit`, `${tl}_profit`, `profit_${tl}`, `grossProfit_${tl}`
      ];
      const candidatesExpense = [
        `${t}Expense`, `${t}_Expense`, `Expense${t}`, `${t}OperationalExpense`,
        `${tl}Expense`, `${tl}_expense`, `expense_${tl}`, `operationalExpense_${tl}`, `opEx_${tl}`
      ];
      const profit = candidatesProfit.reduce((s, k) => s + toNum(row?.[k]), 0);
      const expense = candidatesExpense.reduce((s, k) => s + toNum(row?.[k]), 0);
      acc.profit += profit;
      acc.expense += expense;
    };

    for (const r of rows) {
      const rowTypeRaw = r.PolicyType ?? r.policyType ?? r.type ?? r.policy;
      const rowType = typeof rowTypeRaw === 'string'
        ? rowTypeRaw.trim().toLowerCase()
        : undefined;

      if (rowType) {
        const matched = POLICY_TYPES.find(t => t.toLowerCase() === rowType);
        if (matched) {
          const acc = byType.get(matched)!;
          acc.profit += toNum(r.Profit ?? r.profit ?? r.GrossProfit ?? r.grossProfit);
          acc.expense += toNum(r.Expense ?? r.expense ?? r.OperationalExpense ?? r.operationalExpense ?? r.opEx);
        }
      }

      for (const t of POLICY_TYPES) {
        const acc = byType.get(t)!;
        addFromColumns(acc, t, r);
      }
    }

    return Array.from(byType.values());
  }, [selectedYears]);

  const ProfitVsExpenseChart = () => (
    <div style={{ width: '100%', height: '100%', padding: 8 }}>
      {profitExpenseData.length === 0 ? (
        <div style={{ padding: 12 }}>No profit/expense data for the selected year.</div>
      ) : (
        <ChartComponent
          id="profit-expense-chart"
          ref={ProfitvsExpenseRef}
          primaryXAxis={{
            valueType: 'Category',
            majorGridLines: { width: 0 },
            labelIntersectAction: 'Trim'
          }}
          primaryYAxis={{
            labelFormat: '${value}',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
          }}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ visible: true, position: 'Bottom' }}
          tooltip={{ enable: true }}
          axisLabelRender={onCurrencyAxisLabel}
          tooltipRender={onCurrencyTooltip}
          textRender={onCurrencyDataLabel}
          load={onChartLoad}
          width="100%"
          height="100%"
        >
          <Inject services={[StackingColumnSeries, ColumnSeries, Category, Legend, Tooltip, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Column"
              name="Profit"
              dataSource={profitExpenseData}
              xName="policy"
              yName="profit"
              columnSpacing={0.2}
              marker={{ visible: true, dataLabel: { visible: true } }}
              fill='#FF7000'
              animation={{ enable: false }}
            />
            <SeriesDirective
              type="Column"
              name="Expense"
              dataSource={profitExpenseData}
              xName="policy"
              yName="expense"
              columnSpacing={0.2}
              marker={{ visible: true, dataLabel: { visible: true } }}
              fill='#FFB200'
              animation={{ enable: false }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </div>
  );

  const AssuredAmountByPolicyTypeChart = () => {
    // Drilldown state for Gender donut
    const [genderDrill, setGenderDrill] = React.useState<{ open: boolean; policy?: string }>({ open: false });

    // Gender donut data (from overview or fallback genderdata) for selected policy and years
    const genderDonutData = React.useMemo(() => {
      if (!genderDrill.policy) return [];

      const overview = ((InsuranceData as any).overview as any[]) ?? [];
      if (!overview.length || !selectedYears.length) return [];

      const norm = (s: any) => String(s ?? '').trim().toLowerCase();
      const wanted = norm(genderDrill.policy);

      let male = 0, female = 0;

      for (const r of overview) {
        const y = Number(r.year ?? r.Year);
        if (!selectedYears.includes(y)) continue;

        const pt = norm(r.PolicyType ?? r.policyType ?? r.type ?? r.policy);
        if (pt !== wanted) continue;

        const gRaw =
          r.HolderGender ?? r.holderGender ??
          r.PolicyHolderGender ?? r.policyHolderGender ??
          r.Gender ?? r.gender ?? r.Sex ?? r.sex;

        const g = norm(gRaw);
        if (g.startsWith('m')) male++;
        else if (g.startsWith('f')) female++;
      }

      return [
        ...(male > 0 ? [{ x: 'Male', y: male, text: String(male) }] : []),
        ...(female > 0 ? [{ x: 'Female', y: female, text: String(female) }] : [])
      ];
    }, [genderDrill.policy, selectedYears]);

    const assuredByPolicyTypeData = React.useMemo(() => {
      const overview = ((InsuranceData as any).overview as any[]) ?? [];
      if (!overview.length || !selectedYears.length) return [];

      const sums = new Map<string, number>();
      for (const t of POLICY_TYPES) sums.set(t, 0);

      for (const r of overview) {
        if (!selectedYears.includes(r.year)) continue;
        const raw = (r.PolicyType ?? '').toString().trim().toLowerCase();
        const match = POLICY_TYPES.find(t => t.toLowerCase() === raw);
        if (!match) continue;
        const amt = Number(r.AssuredAmount) || 0;
        sums.set(match, (sums.get(match) || 0) + amt);
      }

      return Array.from(sums.entries()).map(([policy, amount]) => ({ policy, amount }));
    }, [selectedYears]);

    const onBack = React.useCallback(() => setGenderDrill({ open: false }), []);

    const onAssuredChartClick = React.useCallback((args: any) => {
      const targetId: string =
        String(args?.target ?? args?.event?.target?.id ?? '');

      if (!targetId) return;

      let policy = '';

      if (targetId.includes('_AxisLabel_')) {
        const el = document.getElementById(targetId);
        policy = (el?.textContent || '').trim();
      }

      if (!policy && targetId.includes('_Series_0_Point_')) {
        const m = targetId.match(/_Series_0_Point_(\d+)/);
        const idx = m ? parseInt(m[1], 10) : -1;
        if (idx >= 0 && assuredByPolicyTypeData[idx]) {
          policy = assuredByPolicyTypeData[idx].policy;
        }
      }

      if (policy) setGenderDrill({ open: true, policy });
    }, [assuredByPolicyTypeData]);

    return (
      <div style={{ width: '100%', height: '100%', padding: 8 }}>
        {genderDrill.open && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#475569' }}>
              Policy Holder Gender — {genderDrill.policy}
            </div>
            <button onClick={onBack} className="e-btn e-outline e-small">Back</button>
          </div>
        )}

        {!genderDrill.open ? (
          assuredByPolicyTypeData.length === 0 ? (
            <div style={{ padding: 12 }}>No assured amount data for the selected year(s).</div>
          ) : (
            <ChartComponent
              id="assured-by-type-chart"
              ref={AssuredAmountRef}
              primaryXAxis={{
                valueType: 'Category',
                majorGridLines: { width: 0 },
                labelIntersectAction: 'Trim'
              }}
              primaryYAxis={{
                labelFormat: '${value}',
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 }
              }}
              chartArea={{ border: { width: 0 } }}
              legendSettings={{ visible: false }}
              tooltip={{ enable: true }}
              axisLabelRender={onCurrencyAxisLabel}
              tooltipRender={onCurrencyTooltip}
              textRender={onCurrencyDataLabel}
              load={onChartLoad}
              pointClick={(args: any) => {
                const policy = String(args?.point?.x ?? '').trim();
                if (policy) setGenderDrill({ open: true, policy });
              }}
              chartMouseClick={onAssuredChartClick}
              width="100%"
              height="100%"
            >
              <Inject services={[ColumnSeries, Category, Legend, Tooltip, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="Column"
                  name="Assured Amount"
                  dataSource={assuredByPolicyTypeData}
                  xName="policy"
                  yName="amount"
                  columnSpacing={0.2}
                  cornerRadius={{ topLeft: 4, topRight: 4 }}
                  fill="#f6b67a"
                  marker={{ visible: true, dataLabel: { visible: true } }}
                  animation={{ enable: false }}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          )
        ) : (
          // Drilldown view: donut (Male/Female only)
          <>
            {genderDonutData.length === 0 ? (
              <div style={{ padding: 12 }}>No gender data found.</div>
            ) : (
              <div style={{ width: '100%', height: '90%' }}>
                <AccumulationChartComponent
                  id="gender-donut-inline"
                  legendSettings={{ visible: true, position: 'Bottom' }}
                  enableAnimation={true}
                  load={onAccumulationLoad}
                  tooltip={{ enable: true, format: '<b>${point.x}</b><br/>Count: <b>${point.y}</b>', header: '' }}
                >
                  <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={genderDonutData}
                      xName='x'
                      yName='y'
                      innerRadius='60%'
                      radius='70%'
                      dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
                      borderRadius={10} border={{ width: 4, color: '#ffffff' }}
                      palettes={donutPaletteColors}
                      animation={{ enable: false }}
                    />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const ageDistributionData = React.useMemo(() => {
    const overviewdata = ((InsuranceData as any).overview as any[]) ?? [];
    if (!overviewdata.length) return [];

    let rows = overviewdata;
    const hasYear = rows.some(r => typeof (r.year ?? r.Year) !== 'undefined');
    if (hasYear && Array.isArray(selectedYears) && selectedYears.length) {
      rows = rows.filter(r => selectedYears.includes(Number(r.year ?? r.Year)));
    }

    const buckets = [
      { label: '18-24', min: 18, max: 24, count: 0 },
      { label: '25-34', min: 25, max: 34, count: 0 },
      { label: '35-44', min: 35, max: 44, count: 0 },
      { label: '45-54', min: 45, max: 54, count: 0 },
      { label: '55-64', min: 55, max: 64, count: 0 },
      { label: 'Over65', min: 65, max: Infinity, count: 0 }
    ];

    const getAge = (r: any): number | undefined => {
      const keys = ['PolicyHolderAge', 'policyHolderAge', 'HolderAge', 'holderAge', 'Age', 'age'];
      for (const k of keys) {
        const v = r?.[k];
        const n = typeof v === 'number' ? v : (typeof v === 'string' ? parseInt(v, 10) : NaN);
        if (Number.isFinite(n)) return n;
      }
      return undefined;
    };

    for (const r of rows) {
      const age = getAge(r);
      if (!Number.isFinite(age as number)) continue;
      const b = buckets.find(bk => (age as number) >= bk.min && (age as number) <= bk.max);
      if (b) b.count++;
    }

    return buckets
      .filter(b => b.count > 0)
      .map(b => ({ x: b.label, y: b.count, text: String(b.count) }));
  }, [selectedYears]);

  const PolicyHolderAgePie = () => (
    <div style={{ height: '100%', width: '100%' }}>
      {ageDistributionData.length === 0 ? (
        <div style={{ padding: 12 }}>No age data available.</div>
      ) : (
        <AccumulationChartComponent
          id='policyholder-age-pie'
          ref={PolicyHolderRef}
          legendSettings={{ visible: true, position: 'Bottom' }}
          enableAnimation={true}
          load={onAccumulationLoad}
          tooltip={{ enable: true, format: '<b>${point.x}</b><br>Count: <b>${point.y}</b>', header: '' }}
        >
          <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={ageDistributionData}
              xName='x'
              yName='y'
              radius='70%'
              dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
              palettes={pieThemePalette}
              animation={{ enable: false }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </div>
  );

  const apeChannelData = React.useMemo(() => {
    const policydata = ((InsuranceData as any).policydata as any[]) ?? [];
    if (!policydata.length) return [];

    const currentYear = selectedYears.length ? Math.max(...selectedYears) : undefined;
    const row = currentYear
      ? policydata.find(r => (r.year ?? r.Year) === currentYear)
      : undefined;
    if (!row) return [];

    const toNum = (v: any) =>
      typeof v === 'number' && Number.isFinite(v) ? v :
        (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : 0);

    return [
      { channel: 'Bancassurance', value: toNum(row.Bancassurance ?? row.bancassurance) },
      { channel: 'Brokers', value: toNum(row.Brokers ?? row.brokers) },
      { channel: 'Agent', value: toNum(row.Agent ?? row.agent) }
    ];
  }, [selectedYears]);

  const AnnualPremiumEquivalentChart = () => {
    return (
      <div style={{ width: '100%', height: '100%', padding: 8 }}>
        {apeChannelData.length === 0 ? (
          <div style={{ padding: 12 }}>No channel data for the selected year.</div>
        ) : (
          <ChartComponent
            id="ape-channel-chart"
            ref={APERef}
            primaryXAxis={{
              valueType: 'Category',
              majorGridLines: { width: 0 },
              labelIntersectAction: 'Trim'
            }}
            primaryYAxis={{
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 }
            }}
            legendSettings={{ visible: false }}
            tooltip={{ enable: true }}
            chartArea={{ border: { width: 0 } }}
            axisLabelRender={onNumericAxisLabel}
            tooltipRender={onCurrencyTooltip}
            textRender={onCurrencyDataLabel}
            load={onChartLoad}
            width="100%"
            height="100%"
          >
            <Inject services={[BarSeries, Category, Legend, Tooltip, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                type="Bar"
                name="APE"
                dataSource={apeChannelData}
                xName="channel"
                yName="value"
                columnSpacing={0.2}
                cornerRadius={{ topLeft: 4, topRight: 4 }}
                marker={{ visible: true, dataLabel: { visible: true } }}
                fill='#FF4949'
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        )}
      </div>
    );
  };

  // Referral distribution (from overview, filtered by selectedYears)
  const referralData = React.useMemo(() => {
    const overviewdata = ((InsuranceData as any).overview as any[]) ?? [];
    if (!overviewdata.length) return [];

    const categories = [
      'Customer Referral',
      'Agents & brokers',
      'Healthcare providers',
      'Travel partner',
      'Financial Institute',
      'Corporate partnership'
    ];
    const normMap = new Map(categories.map(c => [c.toLowerCase(), c]));
    const counts = new Map<string, number>(categories.map(c => [c, 0]));

    let rows = overviewdata;
    if (Array.isArray(selectedYears) && selectedYears.length) {
      rows = rows.filter(r => selectedYears.includes(Number(r.year ?? r.Year)));
    }

    for (const r of rows) {
      const raw = String(r?.Referral ?? r?.referral ?? '').trim();
      if (!raw) continue;
      const key = normMap.get(raw.toLowerCase());
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    return Array.from(counts.entries()).map(([x, y]) => ({ x, y, text: String(y) }));
  }, [selectedYears]);

  const ReferralResourceDonut = () => (
    <div style={{ height: '100%', width: '100%' }}>
      {referralData.length === 0 ? (
        <div style={{ padding: 12 }}>No referral data for the selected year(s).</div>
      ) : (
        <AccumulationChartComponent
          id='referral-donut'
          ref={ReferralRef}
          legendSettings={{ visible: true, position: 'Bottom' }}
          enableAnimation={true}
          load={onAccumulationLoad}
          tooltip={{ enable: true, format: '<b>${point.x}</b><br>Count: <b>${point.y}</b>', header: '' }}
        >
          <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={referralData}
              xName='x'
              yName='y'
              innerRadius='60%'
              radius='70%'
              dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
              borderRadius={10} border={{ width: 4, color: '#ffffff' }}
              explode
              explodeIndex={0}
              explodeOffset='8%'
              palettes={donutPaletteColors}
              animation={{ enable: false }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </div>
  );

  return (
    <div className="Container">
      <div className="e-card insurance-toolbar" >
        <div className="insurance-toolbar-left">
          <h4 className="insurance-title">Overview</h4>
        </div>
        <div className="insurance-toolbar-right" style={{ display: 'flex', gap: 10 }}>
          <DropDownListComponent
            id="yearDropOverview"
            placeholder="Select year"
            dataSource={yearOptions}
            fields={{ text: 'year', value: 'id' }}
            value={currentYearOverview != null ? String(currentYearOverview) : undefined}
            change={onYearChange}
            width={160}
          />
        </div>
      </div>
      <DashboardLayoutComponent
        id="dashboard_performance"
        ref={OverviewRef}
        style={{ height: '85vh', width: '100%', zIndex: 1 }}
        columns={8}
        cellAspectRatio={90 / 100}
        cellSpacing={[10, 10]}
        allowResizing={false}
        allowDragging={false}
        mediaQuery="(max-width:950px)"
        created={onCreated}
      >
        <PanelsDirective>
          <PanelDirective sizeX={2} sizeY={1} row={0} col={0} content={PoliciesSold} />
          <PanelDirective sizeX={2} sizeY={1} row={0} col={2} content={AssuredAmount} />
          <PanelDirective sizeX={2} sizeY={1} row={0} col={4} content={TotalAmount} />
          <PanelDirective sizeX={2} sizeY={1} row={0} col={6} content={AverageAmount} />
          <PanelDirective sizeX={3} sizeY={3} row={1} col={0} header="<div>Renewal vs Lapse Rate</div>" content={PolicyRatePieChart} />
          <PanelDirective sizeX={5} sizeY={3} row={1} col={4} header="<div>Profit vs Expense by Policy Type</div>" content={ProfitVsExpenseChart} />
          <PanelDirective sizeX={5} sizeY={3} row={4} col={0} header="<div>Assured Amount by Policy Type </div>" content={AssuredAmountByPolicyTypeChart} />
          <PanelDirective sizeX={3} sizeY={3} row={4} col={5} header="<div>Policy Holder Age</div>" content={PolicyHolderAgePie} />
          <PanelDirective sizeX={3} sizeY={3} row={8} col={0} header="<div>Referral Resource</div>" content={ReferralResourceDonut} />
          <PanelDirective sizeX={5} sizeY={3} row={8} col={3} header="<div>Annual Premium Equivalent by Channel</div>" content={AnnualPremiumEquivalentChart} />
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  );
}

const Dashboard2: React.FC<{
  selectedYears: number[];
  onChangeYears: (ys: number[]) => void;
  selectedPolicyTypes: string[];
  onChangePolicyTypes: (vals: string[]) => void;
}> = ({ selectedYears, onChangeYears, selectedPolicyTypes, onChangePolicyTypes }) => {

  const ClaimAnalysisRef = React.useRef<DashboardLayoutComponent | null>(null);
  const DeniedRef = React.useRef<AccumulationChartComponent | null>(null);
  const ClaimAmountComparisonRef = React.useRef<ChartComponent | null>(null);
  const KanbanRef = React.useRef<KanbanComponent | null>(null);
  const RecordsMapRef = React.useRef<MapsComponent | null>(null);
  const ClaimSeverityRef = React.useRef<AccumulationChartComponent | null>(null);
  const gridRef = React.useRef<GridComponent | null>(null);
  const TotalclaimRef = React.useRef<SparklineComponent | null>(null);

  const POLICY_TYPES_FILTER = ['Health', 'Life', 'Home', 'Travel', 'Disability'];

  // Build available years from claimdata dynamically
  const yearOptions = React.useMemo(() => {
    return (ALLOWED_YEARS as readonly number[]).map(y => ({ id: String(y), label: String(y) }));
  }, []);

  const currentYearClaim = React.useMemo(
    () => (selectedYears.length ? Math.max(...selectedYears) : Number(yearOptions[0]?.id)),
    [selectedYears, yearOptions]
  );

  const policyTypeOptions = React.useMemo(
    () => [{ id: 'All', name: 'All Policy Types' }, ...POLICY_TYPES_FILTER.map(t => ({ id: t, name: t }))],
    []
  );

  const selectedPolicyTypeValue = React.useMemo(() => {
    if (!selectedPolicyTypes.length) return 'All';
    const lower = new Set(selectedPolicyTypes.map(s => s.toLowerCase()));
    const isAll = POLICY_TYPES_FILTER.every(t => lower.has(t.toLowerCase()));
    return isAll ? 'All' : selectedPolicyTypes[0];
  }, [selectedPolicyTypes]);

  const onPolicyTypeChange = (e: ChangeEventArgs) => {
    const val = String(e?.value ?? 'All');
    onChangePolicyTypes(val === 'All' ? [] : [val]); // [] => no filter (all)
    applySortTrigger.current = true;
  };

  const onYearChange = (e: ChangeEventArgs) => {
    const value = Number(e?.value);
    if (Number.isFinite(value)) onChangeYears([value]);
    applySortTrigger.current = true;
  };

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshAll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        ClaimAnalysisRef.current?.refresh();
        DeniedRef.current?.refresh();
        ClaimAmountComparisonRef.current?.refresh();
        KanbanRef.current?.refresh();
        RecordsMapRef.current?.refresh();
        ClaimSeverityRef.current?.refresh();
        gridRef.current?.refresh();
        TotalclaimRef.current?.refresh();
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

  const kpis = React.useMemo(() => {
    const claims = (InsuranceData as any).claimdata as any[] ?? [];
    const typesLower = selectedPolicyTypes.map(t => t.toString().toLowerCase());
    const rows = claims.filter((r: any) => {
      const year = Number(r.year ?? r.Year);
      if (!selectedYears.includes(year)) return false;
      const pType = (r.PolicyType ?? r.policyType ?? '').toString().toLowerCase();
      return typesLower.length === 0 ? true : typesLower.includes(pType);
    });
    const totalClaims = rows.length;
    const totalClaimAmount = rows.reduce((sum: number, r: any) => sum + (Number(r.ClaimAmount) || 0), 0);
    return { totalClaims, totalClaimAmount };
  }, [selectedPolicyTypes, selectedYears]);

  const totalClaimsSparkByYear = React.useMemo(() => {
    const claims: any[] = ((InsuranceData as any).claimdata as any[]) ?? [];
    const types = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = types.size > 0;

    const getYear = (r: any): number | undefined => {
      const year = Number(r.year ?? r.Year ?? r.claimYear ?? r.ClaimYear);
      if (Number.isFinite(year)) return year;
      const ds = r.ClaimDate ?? r.claimDate ?? r.Date ?? r.date;
      if (!ds) return undefined;
      const d = new Date(ds);
      return Number.isNaN(d.getTime()) ? undefined : d.getFullYear();
    };

    const counts = new Map<number, number>(ALLOWED_YEARS.map(y => [y, 0]));
    for (const r of claims) {
      const y = getYear(r);
      if (!Number.isFinite(y as number) || !(ALLOWED_YEARS as readonly number[]).includes(y as number)) continue;
      if (useType) {
        const pt = String(r.PolicyType ?? r.policyType ?? '').toLowerCase();
        if (!types.has(pt)) continue;
      }
      counts.set(y as number, (counts.get(y as number) || 0) + 1);
    }
    return [...ALLOWED_YEARS].sort().map(y => ({ x: String(y), y: counts.get(y) || 0 }));
  }, [selectedPolicyTypes]);

  const onCreated = (e: ResizeArgs) => {
    setTimeout(() => {
      ClaimAnalysisRef.current?.refresh();
    }, 500)
  }

  const TotalClaims = () => (
    <div className="kpi-totalcard">
      <div className="spark-header">
        <div className="insurance-label">Total Claims</div>
        <div className="insurance-totalvalue">{kpis.totalClaims.toLocaleString()}</div>
      </div>
      <div className="spark-content" style={{ width: '50%', height: '50%' }}>
        <div style={{ marginTop: 8, width: '100%' }}>
          <SparklineComponent
            id="total-claims-spark"
            ref={TotalclaimRef}
            type="Pie"
            dataSource={totalClaimsSparkByYear as any}
            xName="x"
            yName="y"
            valueType="Category"
            width="100%"
            height="55px"
            lineWidth={2}
            palette={sparklinePalette}
            tooltipSettings={{ visible: true, format: 'Year: ${x}<br/>Claims: ${y}' }}
          >
            <Inject services={[SparklineTooltip]} />
          </SparklineComponent>
        </div>
      </div>
    </div>
  );

  const approvalStats = React.useMemo(() => {
    const claims: any[] = ((InsuranceData as any).claimdata as any[]) ?? [];
    if (!claims.length || !selectedYears.length) return { approvedCount: 0, totalCount: 0, rate: 0 };

    const years = new Set(selectedYears);
    const types = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = types.size > 0;

    const isApproved = (v: any) => {
      const s = String(v ?? '').toLowerCase();
      return ['approved', 'accept', 'accepted', 'paid', 'paid out', 'payout', 'settled'].some(k => s.includes(k));
    };

    let approved = 0, total = 0;
    for (const r of claims) {
      const y = Number(r.year ?? r.Year);
      if (!years.has(y)) continue;
      const pt = String(r.PolicyType ?? r.policyType ?? '').toLowerCase();
      if (useType && !types.has(pt)) continue;

      total += 1;
      if (isApproved(r.ClaimStatus ?? r.claimStatus ?? r.Status ?? r.status)) approved += 1;
    }
    const rate = total ? (approved / total) * 100 : 0;
    return { approvedCount: approved, totalCount: total, rate };
  }, [selectedYears, selectedPolicyTypes]);

  const { totalClaimDelta, avgClaimDelta, approvalRateDelta } = React.useMemo(() => {
    const claims: any[] = ((InsuranceData as any).claimdata as any[]) ?? [];
    const yearsSel = Array.isArray(selectedYears) ? selectedYears : [];
    if (!claims.length || !yearsSel.length) return { totalClaimDelta: undefined, avgClaimDelta: undefined, approvalRateDelta: undefined };

    const currentYear = Math.max(...yearsSel);
    const prevYear = currentYear - 1;

    const typesLower = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = typesLower.size > 0;

    const toNum = (v: any) => (typeof v === 'number' && Number.isFinite(v)) ? v :
      (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : 0);

    const isApproved = (v: any) => {
      const s = String(v ?? '').toLowerCase();
      return ['approved', 'accept', 'accepted', 'paid', 'paid out', 'payout', 'settled'].some(k => s.includes(k));
    };

    const rowsFor = (yr: number) => claims.filter(r => {
      const y = Number(r.year ?? r.Year);
      if (y !== yr) return false;
      if (!useType) return true;
      const pt = String(r.PolicyType ?? r.policyType ?? '').toLowerCase();
      return typesLower.has(pt);
    });

    // totals
    const currRows = rowsFor(currentYear);
    const prevRows = rowsFor(prevYear);

    const currTotal = currRows.reduce((s, r) => s + toNum(r.ClaimAmount ?? r.amount), 0);
    const prevTotal = prevRows.reduce((s, r) => s + toNum(r.ClaimAmount ?? r.amount), 0);
    const totalDiff = currTotal - prevTotal;
    const totalPct = prevTotal ? (totalDiff / prevTotal) * 100 : undefined;

    // averages
    const currAvg = currRows.length ? currTotal / currRows.length : 0;
    const prevAvg = prevRows.length ? prevTotal / prevRows.length : 0;
    const avgDiff = currAvg - prevAvg;
    const avgPct = prevAvg ? (avgDiff / prevAvg) * 100 : undefined;

    // approval rates
    const currApproved = currRows.reduce((n, r) => n + (isApproved(r.ClaimStatus ?? r.claimStatus ?? r.Status ?? r.status) ? 1 : 0), 0);
    const prevApproved = prevRows.reduce((n, r) => n + (isApproved(r.ClaimStatus ?? r.claimStatus ?? r.Status ?? r.status) ? 1 : 0), 0);
    const currRate = currRows.length ? (currApproved / currRows.length) * 100 : 0;
    const prevRate = prevRows.length ? (prevApproved / prevRows.length) * 100 : 0;
    const rateDiff = currRate - prevRate;
    const ratePct = prevRate ? (rateDiff / prevRate) * 100 : undefined;

    return {
      totalClaimDelta: { diff: totalDiff, pct: totalPct, prevYear },
      avgClaimDelta: { diff: avgDiff, pct: avgPct, prevYear },
      approvalRateDelta: { diff: rateDiff, pct: ratePct, prevYear }
    };
  }, [selectedYears, selectedPolicyTypes]);

  const TotalClaimAmount = () => (
    <div className="insurance-card">
      <div className="insurance-label">Total Claim Amount</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">{fmtCurrency(kpis.totalClaimAmount)}</div>
          <DeltaBadge delta={totalClaimDelta} />
        </div>
      </div>
    </div>
  );

  const AverageClaimAmount = () => (
    <div className="insurance-card">
      <div className="insurance-label">Average Claim Amount</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">
            {fmtCurrency(kpis.totalClaims ? (kpis.totalClaimAmount / kpis.totalClaims) : 0)}
          </div>
          <DeltaBadge delta={avgClaimDelta} />
        </div>
      </div>
    </div>
  );

  const ClaimApprovalRate = () => (
    <div className="insurance-card">
      <div className="insurance-label">Claim Approval Rate</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">{approvalStats.totalCount ? `${approvalStats.rate.toFixed(1)}%` : '0%'}</div>
          <DeltaBadge delta={approvalRateDelta} />
        </div>
      </div>
    </div>
  );

  const {
    paidOutSeries,
    deniedSeries,
    totalClaimsSeries,
    yAmountMax,
    yCountMax
  } = React.useMemo(() => {
    const claims = ((InsuranceData as any).claimdata as any[]) ?? [];
    if (!claims.length || !selectedYears.length) {
      return { paidOutSeries: [], deniedSeries: [], totalClaimsSeries: [], yAmountMax: 0, yCountMax: 0 };
    }

    // Helpers
    const toNum = (v: any) =>
      typeof v === 'number' && Number.isFinite(v) ? v :
        (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : 0);

    const getYear = (r: any): number | undefined => {
      const y = Number(r.year ?? r.Year ?? r.claimYear ?? r.ClaimYear);
      if (Number.isFinite(y)) return y;
      const dateStr = r.ClaimDate ?? r.claimDate ?? r.Date ?? r.date;
      if (dateStr) {
        const d = new Date(dateStr);
        if (!Number.isNaN(d.getTime())) return d.getFullYear();
      }
      return undefined;
    };

    const normType = (v: any): string | undefined => {
      const s = String(v ?? '').trim().toLowerCase();
      if (!s) return undefined;
      // map common aliases to your filter set
      if (s.includes('health')) return 'health';
      if (s.includes('life')) return 'life';
      if (s.includes('home')) return 'home';
      if (s.includes('travel')) return 'travel';
      if (s.includes('disab')) return 'disability';
      return s;
    };

    const statusGroup = (v: any): 'paid' | 'denied' | undefined => {
      const s = String(v ?? '').trim().toLowerCase();
      if (['approved', 'accept', 'accepted', 'paid', 'paid out', 'payout', 'settled'].some(k => s.includes(k))) return 'paid';
      if (['rejected', 'denied', 'declined'].some(k => s.includes(k))) return 'denied';
      return undefined;
    };

    const typesLower = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useTypeFilter = typesLower.size > 0;

    // Aggregate by year for selected types
    const agg = new Map<number, { paid: number; denied: number; totalCount: number }>();
    for (const y of selectedYears) agg.set(y, { paid: 0, denied: 0, totalCount: 0 });

    for (const r of claims) {
      const y = getYear(r);
      if (!Number.isFinite(y as number) || !selectedYears.includes(y as number)) continue;

      const ptype = normType(r.PolicyType ?? r.policyType ?? r.Type ?? r.policy);
      if (useTypeFilter && (!ptype || !typesLower.has(ptype))) continue;

      const amt = toNum(r.ClaimAmount ?? r.claimAmount ?? r.Amount ?? r.amount ?? r.PayoutAmount ?? r.payoutAmount);
      const grp = statusGroup(r.ClaimStatus ?? r.claimStatus ?? r.Status ?? r.status);

      const rec = agg.get(y as number);
      if (!rec) continue;

      if (grp === 'paid') rec.paid += amt;
      else if (grp === 'denied') rec.denied += amt;

      rec.totalCount += 1; // counts all statuses
    }

    const years = Array.from(agg.keys()).sort((a, b) => a - b);
    const paidOutSeries = years.map(y => ({ x: String(y), y: agg.get(y)!.paid }));
    const deniedSeries = years.map(y => ({ x: String(y), y: agg.get(y)!.denied }));
    const totalClaimsSeries = years.map(y => ({ x: String(y), y: agg.get(y)!.totalCount }));

    const yAmountMax = Math.max(0, ...years.map(y => Math.max(agg.get(y)!.paid, agg.get(y)!.denied)));
    const yCountMax = Math.max(0, ...years.map(y => agg.get(y)!.totalCount));

    return { paidOutSeries, deniedSeries, totalClaimsSeries, yAmountMax, yCountMax };
  }, [selectedYears, selectedPolicyTypes]);


  const paidDeniedPieData = React.useMemo(() => {
    const paid = paidOutSeries.reduce((s, p) => s + Number(p.y || 0), 0);
    const denied = deniedSeries.reduce((s, p) => s + Number(p.y || 0), 0);
    return [
      { x: 'Paid Out', y: paid, text: fmtCurrency(paid) },
      { x: 'Denied', y: denied, text: fmtCurrency(denied) }
    ].filter(d => d.y > 0);
  }, [paidOutSeries, deniedSeries]);

  const DeniedChart = () => (
    <div style={{ height: '100%', width: '100%' }}>
      {paidDeniedPieData.length === 0 ? (
        <div style={{ padding: 12 }}>No paid/denied data for the selected filters.</div>
      ) : (
        <AccumulationChartComponent
          id="paid-denied-pie"
          ref={DeniedRef}
          legendSettings={{ visible: true, position: 'Bottom' }}
          enableAnimation={true}
          tooltip={{ enable: true, header: '' }}
          load={onAccumulationLoad}
          tooltipRender={(args: any) => {
            const x = String(args?.point?.x ?? '');
            const y = Number(args?.point?.y ?? 0);
            args.text = `${x}<br/>Amount: <b>${fmtCurrency(y)}</b>`;
          }}
        >
          <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={paidDeniedPieData}
              xName="x"
              yName="y"
              radius="70%"
              dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
              border={{ color: '#FFFFFF', width: 1 }}
              palettes={pieThemePalette}
              animation={{ enable: false }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </div>
  );

  React.useEffect(() => {
    const time = setTimeout(() => KanbanRef.current?.refresh(), 0);
    return () => clearTimeout(time);
  }, []);
  React.useEffect(() => {
    KanbanRef.current?.refresh();
  }, [selectedYears, selectedPolicyTypes]);

  function toTitle(s: string): string {
    const t = (s || '').toLowerCase();
    if (t.includes('health')) return 'Health';
    if (t.includes('life')) return 'Life';
    if (t.includes('home')) return 'Home';
    if (t.includes('travel')) return 'Travel';
    if (t.includes('disab')) return 'Disability';
    return s || '';
  }

  const resolveYear = (r: any, idx: number): number => {
    const y = Number(r.year ?? r.Year);
    if (Number.isFinite(y)) return y;
    const ds = r.ClaimDate ?? r.claimDate ?? r.Date ?? r.date;
    if (ds) {
      const d = new Date(ds);
      if (!Number.isNaN(d.getTime())) return d.getFullYear();
    }
    const pool = [2025, 2024, 2023, 2022];
    return pool[idx % pool.length];
  };

  // Infer policy type if missing (from ClaimReason keywords)
  function inferPolicyType(r: any): string {
    const raw = String(r.PolicyType ?? r.policyType ?? '').toLowerCase();
    if (raw.includes('health')) return 'Health';
    if (raw.includes('life')) return 'Life';
    if (raw.includes('home')) return 'Home';
    if (raw.includes('travel')) return 'Travel';
    if (raw.includes('disab')) return 'Disability';
    const reason = String(r.ClaimReason ?? r.reason ?? '').toLowerCase();
    if (/(medical|bills|pre-existing)/.test(reason)) return 'Health';
    if (/(life)/.test(reason)) return 'Life';
    if (/(property|damage|home)/.test(reason)) return 'Home';
    if (/(travel)/.test(reason)) return 'Travel';
    if (/(disability)/.test(reason)) return 'Disability';
    return 'Health';
  }

  // Map ClaimReason to a status when ClaimStatus is missing
  const toKanbanStatus = (v: any, reason?: string): 'Approved' | 'Rejected' | 'Inprogress' | undefined => {
    const s = String(v ?? '').toLowerCase();
    if (['approved', 'accept', 'accepted', 'paid', 'paid out', 'payout', 'settled'].some(k => s.includes(k))) return 'Approved';
    if (['rejected', 'denied', 'declined'].some(k => s.includes(k))) return 'Rejected';
    if (['in progress', 'inprogress', 'pending', 'under review', 'processing'].some(k => s.includes(k))) return 'Inprogress';
    const r = String(reason ?? '').toLowerCase();
    if (/(valid|eligibility met|coverage confirmed|assessed|verified)/.test(r)) return 'Approved';
    if (/(exclusion|lapsed|pre-existing|insufficient|after deadline)/.test(r)) return 'Rejected';
    if (/(awaiting|pending|underwriter|review)/.test(r)) return 'Inprogress';
    return 'Inprogress';
  };

  const kanbanData = React.useMemo(() => {
    const claims: any[] = ((InsuranceData as any).claimdata as any[]) ?? [];
    const types = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = types.size > 0;

    return claims
      .map((r, idx) => {
        const yearNum = resolveYear(r, idx);
        const policyType = toTitle(inferPolicyType(r));
        const status = toKanbanStatus(r.ClaimStatus ?? r.claimStatus ?? r.Status ?? r.status, r.ClaimReason ?? r.reason);
        const id = Number(r.id) || idx + 1;
        return {
          Id: id,
          year: String(yearNum),          // Swimlane key as string
          Status: status,
          PolicyType: policyType,
          ClaimReason: String(r.ClaimReason ?? r.reason ?? '')
        };
      })
      .filter(row => selectedYears.map(String).includes(row.year))           // year filter (string)
      .filter(row => !useType || types.has(row.PolicyType.toLowerCase()))   // policy type filter
      .filter(row => !!row.Status);
  }, [selectedYears, selectedPolicyTypes]);

  const kanbanCardTemplate = (props: any): JSX.Element => {
    const policyClass = (name: any) => {
      const s = String(name || '').toLowerCase();
      if (s.includes('health')) return 'ins-policy--health';
      if (s.includes('life')) return 'ins-policy--life';
      if (s.includes('home')) return 'ins-policy--home';
      if (s.includes('travel')) return 'ins-policy--travel';
      if (s.includes('disab')) return 'ins-policy--disability';
      return '';
    };
    const cls = `kanban-card ${policyClass(props?.PolicyType)}`;
    return (
      <div className={cls}>
        <div className="insurance-kanban-row">
          <span className="insurance-kanban-id">#{props?.Id}</span>
          <span className="insurance-kanban-type">{props?.PolicyType}</span>
        </div>
        <div className="insurance-kanban-reason">{props?.ClaimReason}</div>
      </div>
    );
  };

  const onKanbanDialogOpen = (args: any) => {
    // Block the edit/add dialog
    if (args.requestType === 'Edit' || args.requestType === 'Add') {
      args.cancel = true;
    }
  };
  const onCardDoubleClick = (args: any) => { args.cancel = true; };

  const ClaimStatusKanban = () => (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', minHeight: 0, marginTop: '10px' }}>
      {kanbanData.length === 0 ? (
        <div style={{ padding: 12 }}>No claims for the selected filters.</div>
      ) : (
        <div className='claimstatus-kanban' style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
          <KanbanComponent
            ref={KanbanRef}
            id="claim-status-kanban"
            key={`kanban-${selectedYears.join(',')}-${selectedPolicyTypes.join(',')}`}
            keyField="Status"
            dataSource={kanbanData}
            allowDragAndDrop={false}
            height="100%"
            width="100%"
            cardSettings={{
              showHeader: false,
              template: kanbanCardTemplate as any
            } as any}
            dialogOpen={onKanbanDialogOpen}
            cardDoubleClick={onCardDoubleClick}
          >
            <KanbanColumnsDirective>
              <KanbanColumnDirective headerText="Approved" keyField="Approved" allowToggle={true} />
              <KanbanColumnDirective headerText="In Progress" keyField="Inprogress" allowToggle={true} />
              <KanbanColumnDirective headerText="Rejected" keyField="Rejected" allowToggle={true} />
            </KanbanColumnsDirective>
          </KanbanComponent>
        </div>
      )}
    </div>
  );

  const ClaimAmountComparisonChart = () => {
    const claims = ((InsuranceData as any).claimdata as any[]) ?? [];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

    const toNum = (value: any) =>
      typeof value === 'number' && Number.isFinite(value) ? value :
        (typeof value === 'string' && value.trim() && Number.isFinite(+value) ? +value : 0);

    const getYear = (r: any): number | undefined => {
      const y = Number(r.year ?? r.Year ?? r.claimYear ?? r.ClaimYear);
      if (Number.isFinite(y)) return y;
      const ds = r.ClaimDate ?? r.claimDate ?? r.Date ?? r.date;
      if (!ds) return undefined;
      const d = new Date(ds);
      return Number.isNaN(d.getTime()) ? undefined : d.getFullYear();
    };

    const getMonth = (r: any, idx: number): number => {
      const mNum = Number(r.month ?? r.Month ?? r.monthIndex ?? r.MonthIndex);
      if (Number.isFinite(mNum) && mNum >= 1 && mNum <= 12) return mNum;
      const ds = r.ClaimDate ?? r.claimDate ?? r.Date ?? r.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getTime())) return (d.getMonth() + 1);
      }
      const mStr = String(r.MonthName ?? r.monthName ?? r.Month ?? '').toLowerCase();
      const mIdx = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(mStr.slice(0, 3));
      if (mIdx >= 0) return mIdx + 1;
      return (idx % 12) + 1;
    };

    // filters
    const yearsSel = Array.isArray(selectedYears) && selectedYears.length ? selectedYears : [];
    const currentYear = yearsSel.length ? Math.max(...yearsSel) : undefined;
    const prevYear = currentYear ? currentYear - 1 : undefined;

    const typesLower = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = typesLower.size > 0;

    // build monthly totals for a given year
    const monthlyFor = (yr?: number) => {
      const totals = Array.from({ length: 12 }, () => 0);
      if (!yr) return totals;
      claims.forEach((r, idx) => {
        const y = getYear(r);
        if (y !== yr) return;
        if (useType) {
          const pt = String(r.PolicyType ?? r.policyType ?? r.Type ?? r.policy ?? '').toLowerCase();
          if (!typesLower.has(pt)) return;
        }
        const m = getMonth(r, idx); // 1..12
        const amt = toNum(r.ClaimAmount ?? r.claimAmount ?? r.Amount ?? r.amount ?? r.PayoutAmount ?? r.payoutAmount);
        if (m >= 1 && m <= 12) totals[m - 1] += amt;
      });
      return totals;
    };

    const currMonthly = monthlyFor(currentYear);
    const prevMonthly = monthlyFor(prevYear);

    const currSeries = MONTHS.map((m, i) => ({ x: m, y: currMonthly[i] || 0 }));
    const prevSeries = MONTHS.map((m, i) => ({ x: m, y: prevMonthly[i] || 0 }));

    const hasCurrData = currSeries.some(p => p.y > 0);
    const hasPrevData = prevYear != null && prevSeries.some(p => p.y > 0);

    const onCurrencyAxisLabel = (args: any) => {
      if (args?.axis?.valueType !== 'Category') {
        args.text = fmtCurrency(Number(args.value || 0));
      }
    };

    const onMonthlyTooltip = (args: any) => {
      const y = Number(args?.point?.y ?? 0);
      const x = String(args?.point?.x ?? '');
      const name = String(args?.series?.name ?? '');
      args.text = `${name}<br/>${x} : ${fmtCurrency(y)}`;
    };

    if (!currentYear || (!hasCurrData && !hasPrevData)) {
      return <div style={{ padding: 12 }}>No monthly claim amount data for the selected filters.</div>;
    }

    return (
      <div style={{ width: '100%', height: '100%', padding: 8, boxSizing: 'border-box' }}>
        <ChartComponent
          id="claim-amount-monthly"
          ref={ClaimAmountComparisonRef}
          enableAnimation={false}
          primaryXAxis={{
            valueType: 'Category',
            majorGridLines: { width: 0 },
            labelIntersectAction: 'Trim',
            labelStyle: { size: '11px' }
          }}
          primaryYAxis={{
            labelFormat: '${value}',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            majorGridLines: { width: 0 }
          }}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ visible: true, position: 'Bottom' }}
          tooltip={{ enable: true }}
          crosshair={{ enable: true, lineType: 'Vertical' }}
          width="100%"
          height="100%"
          axisLabelRender={onCurrencyAxisLabel}
          tooltipRender={onMonthlyTooltip}
          load={onChartLoad}
        >
          <Inject services={[SplineAreaSeries, Category, Tooltip, Legend, Crosshair]} />
          <SeriesCollectionDirective>
            {hasPrevData && (
              <SeriesDirective
                type="SplineArea"
                dataSource={prevSeries}
                xName="x"
                yName="y"
                name={`${prevYear} Claim Amount`}
                opacity={0.5}
                border={{ width: 2, color: '#CDA310' }}
                fill="#CDA310"
                marker={{ visible: true, width: 6, height: 6, shape: 'Circle' }}
                animation={{ enable: false }}
              />
            )}
            {hasCurrData && (
              <SeriesDirective
                type="SplineArea"
                dataSource={currSeries}
                xName="x"
                yName="y"
                name={`${currentYear} Claim Amount`}
                opacity={0.5}
                border={{ width: 2, color: '#FF7000' }}
                fill="#FF7000"
                marker={{ visible: true, width: 6, height: 6, shape: 'Circle' }}
                animation={{ enable: false }}
              />
            )}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  };

  const applySortTrigger = React.useRef(false);

  const claimGridData = React.useMemo(() => {
    const all = ((InsuranceData as any).claimdata as any[]) ?? [];
    const years = new Set(selectedYears);
    const types = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = types.size > 0;

    return all
      .filter(r => years.has(Number(r.year)))
      .filter(r => {
        if (!useType) return true;
        const pt = String(r.PolicyType ?? r.policyType ?? '').toLowerCase();
        return types.has(pt);
      })
      .map(r => ({
        id: r.id,
        year: Number(r.year),
        ClaimDate: r.ClaimDate,
        PolicyType: toTitle(r.PolicyType ?? r.policyType ?? ''),
        ClaimAmount: Number(r.ClaimAmount) || 0,
        ClaimStatus: String(r.ClaimStatus ?? r.claimStatus ?? ''),
        Region: r.Region                                   // <-- fix
      }));
  }, [selectedYears, selectedPolicyTypes]);

  const statusColors: Record<string, string> = {
    approved: '#2e7d32',
    rejected: '#c62828',
    'in progress': 'rgb(189, 126, 0)',
    inprogress: 'rgb(189, 126, 0)'
  };

  const queryCellInfo = (args: any) => {
    if (args.column?.field === 'ClaimStatus') {
      const raw = String(args.data?.ClaimStatus ?? '').trim();
      const key = raw.toLowerCase();
      // map to badge variants
      const variant =
        key === 'approved' ? 'approved' :
          key === 'rejected' ? 'rejected' :
            (key === 'in progress' || key === 'inprogress') ? 'progress' :
              '';

      // center cell, remove default text color
      Object.assign(args.cell.style, { textAlign: 'center', color: 'inherit' });

      // inject badge
      const label = raw || '-';
      args.cell.innerHTML =
        `<span class="ins-badge ${variant ? `ins-badge--${variant}` : ''}" title="${label}">${label}</span>`;
    }
  };

  React.useEffect(() => {
    if (!applySortTrigger.current || !gridRef.current) return;
    gridRef.current.sortSettings = {
      columns: [
        { field: 'PolicyType', direction: 'Ascending' as const },
        { field: 'year', direction: 'Ascending' as const }
      ]
    };
    gridRef.current.refresh();
    applySortTrigger.current = false;
  }, [selectedPolicyTypes, selectedYears]);

  // const toolBarOptions = [
  //   { id: 'search', text: 'Search', align: 'Right' },
  //   { id: 'excel', text: 'Excel Export', align: 'Left' },
  //   { id: 'pdf', text: 'PDF Export', align: 'Left' },
  // ]

  const toolBarOptions: any = ['Search', 'ExcelExport', 'PdfExport'];

  function toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'claimDetailsGrid_pdfexport':
        gridRef.current?.pdfExport();
        break;
      case 'claimDetailsGrid_excelexport':
        gridRef.current?.excelExport();
        break;
    }
  }

  const ClaimDetailsGrid = () => (
    <div style={{ width: '100%', height: '100%', padding: 8 }}>
      <GridComponent
        ref={gridRef}
        id='claimDetailsGrid'
        dataSource={claimGridData}
        allowPaging={false}
        enableVirtualMaskRow={true}
        allowSorting={true}
        allowResizing={true}
        allowFiltering={true}
        allowMultiSorting={true}
        width={'100%'}
        height={'100%'}
        allowGrouping={true}
        allowExcelExport={true}
        allowPdfExport={true}
        toolbar={toolBarOptions as any}
        toolbarClick={toolbarClick}
        filterSettings={{ type: 'Menu' }}
        queryCellInfo={queryCellInfo}
      >
        <ColumnsDirective>
          <ColumnDirective field="year" headerText="Year" headerTemplate={headerWithTooltip("Year")} visible={false} />
          <ColumnDirective field="id" headerText="Id" headerTemplate={headerWithTooltip("Id")} width="90" textAlign="Right" isPrimaryKey={true} />
          <ColumnDirective field="ClaimDate" headerText="Claim Date" headerTemplate={headerWithTooltip("Claim Date")} width="130" textAlign="Right" />
          <ColumnDirective field="PolicyType" headerText="Policy Type" headerTemplate={headerWithTooltip("Policy Type")} width="130" textAlign="Left" />
          <ColumnDirective field="ClaimAmount" headerText="Claim Amount" headerTemplate={headerWithTooltip("Claim Amount")} width="140" textAlign="Right" format="C0" />
          <ColumnDirective field="ClaimStatus" headerText="Claim Status" headerTemplate={headerWithTooltip("Claim Status")} width="140" textAlign="Center" />
          <ColumnDirective field="Region" headerText="Region" headerTemplate={headerWithTooltip("Region")} width="140" textAlign="Left" />
        </ColumnsDirective>
        <GridInject services={[GridSort, GridPage, GridFilter, Resize, Group, RowDD, Toolbar, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );

  // Regions we care about (normalized)
  const REGIONS = ['United States', 'Brazil', 'United Kingdom', 'Russia', 'China', 'India'] as const;
  const normalizeRegion = (v: any): typeof REGIONS[number] | undefined => {
    const s = String(v ?? '').trim().toLowerCase();
    if (!s) return undefined;

    if (s === 'north america' || s === 'united states' || s === 'usa' || s === 'united states of america') return 'United States';
    if (s === 'south america' || s === 'brazil' || s === 'argentina' || s === 'chile' || s === 'peru' || s === 'colombia') return 'Brazil';
    if (s.includes('united kingdom') || s === 'uk' || s === 'britain' || s === 'england') return 'United Kingdom';
    if (s === 'russia' || s === 'russian federation') return 'Russia';
    if (s === 'china' || s === 'prc') return 'China';
    if (s === 'india') return 'India';

    return undefined;
  };

  // Aggregate Claim Amount and Record Count by Region with filters
  const { amountByRegion, countByRegion } = React.useMemo(() => {
    const claims: any[] = ((InsuranceData as any).claimdata as any[]) ?? [];
    const years = new Set(selectedYears);
    const types = new Set(selectedPolicyTypes.map(t => t.toLowerCase()));
    const useType = types.size > 0;

    const amountMap = new Map<string, number>(REGIONS.map(r => [r, 0]));
    const countMap = new Map<string, number>(REGIONS.map(r => [r, 0]));

    for (const r of claims) {
      const y = Number(r.year ?? r.Year);
      if (!years.has(y)) continue;

      const pt = String(r.PolicyType ?? r.policyType ?? '').toLowerCase();
      if (useType && !types.has(pt)) continue;

      const norm = normalizeRegion(r.Region);
      if (!norm) continue;

      const amt = Number(r.ClaimAmount ?? r.amount ?? 0) || 0;
      amountMap.set(norm, (amountMap.get(norm) || 0) + amt);
      countMap.set(norm, (countMap.get(norm) || 0) + 1);
    }

    const amountByRegion = REGIONS
      .map(x => {
        const y = amountMap.get(x) || 0;
        return { x, y, text: fmtCurrency(y) };
      })
      .filter(d => d.y > 0);

    const countByRegion = REGIONS
      .map(x => ({ x, y: countMap.get(x) || 0, text: String(countMap.get(x) || 0) }))
      .filter(d => d.y > 0);

    return { amountByRegion, countByRegion };
  }, [selectedYears, selectedPolicyTypes]);

  const TotalRecordsByRegionMap = () => {
    const [worldData, setWorldData] = React.useState<any | null>(null);
    React.useEffect(() => {
      let alive = true;
      fetch('https://cdn.syncfusion.com/maps/map-data/world-map.json')
        .then(r => r.json())
        .then(d => { if (alive) setWorldData(d); })
        .catch(() => setWorldData(null));
      return () => { alive = false; };
    }, []);

    React.useEffect(() => {
      const refresh = () => RecordsMapRef.current?.refresh();
      const t = setTimeout(refresh, 0);
      window.addEventListener('resize', refresh);
      return () => { clearTimeout(t); window.removeEventListener('resize', refresh); };
    }, []);

    // shape aliases for world map join
    const shapeAliases: Record<string, string[]> = {
      'united states': ['United States'],
      'brazil': ['Brazil'],
      'united kingdom': ['United Kingdom'],
      'russia': ['Russia', 'Russian Federation'],
      'china': ['China'],
      'india': ['India']
    };

    // marker coordinates per country
    const countryCoords = (country: string) => {
      switch (country) {
        case 'United States': return { latitude: 39.8283, longitude: -98.5795 };
        case 'Brazil': return { latitude: -14.2350, longitude: -51.9253 };
        case 'United Kingdom': return { latitude: 55.3781, longitude: -3.4360 };
        case 'Russia': return { latitude: 61.5240, longitude: 105.3188 };
        case 'China': return { latitude: 35.8617, longitude: 104.1954 };
        case 'India': return { latitude: 20.5937, longitude: 78.9629 };
        default: return { latitude: 0, longitude: 0 };
      }
    };

    // Use already-computed, filter-respecting totals
    const amountByRegionMap = React.useMemo(() => {
      const m = new Map<string, number>();
      amountByRegion.forEach(d => m.set(d.x, Number(d.y || 0)));
      return m;
    }, [amountByRegion]);

    const allowedTooltipCountries = React.useMemo(
      () => new Set(['United States', 'Brazil', 'United Kingdom', 'Russia', 'China', 'India']),
      []
    );

    const onMapTooltipRender = React.useCallback((args: any) => {
      const data = args?.options?.data ?? args?.data;
      if (!data) { args.cancel = true; return; }

      const country = String(data.country ?? data.region ?? data.name ?? '').trim();
      if (!allowedTooltipCountries.has(country)) {
        args.cancel = true;
      }
    }, [allowedTooltipCountries]);

    const regions = countByRegion
      .filter(d => Number(d.y) > 0)
      .map(d => ({
        country: d.x,
        value: Number(d.y),
        label: String(d.y),
        amount: amountByRegionMap.get(d.x) ?? 0,
        amountText: fmtCurrency(amountByRegionMap.get(d.x) ?? 0)
      }));

    if (!worldData) return <div style={{ padding: 12 }}>Loading map…</div>;
    if (!regions.length) return <div style={{ padding: 12 }}>No records for the selected filters.</div>;

    // expand to shape aliases for joining by shape name
    const mapData = regions.flatMap(r => {
      const aliases = shapeAliases[r.country.toLowerCase()] ?? [];
      return aliases.map(name => ({ name, ...r }));
    });

    // legend/color by country
    const colors = mapPaletteColors;
    const colorMapping = regions.map((r, i) => ({
      value: r.country,
      color: colors[i % colors.length],
      label: `${r.country} - ${r.amountText}`
    }));

    const markers = regions.map(r => ({ ...r, ...countryCoords(r.country) }));

    return (
      <div className="insurance-map-panel">
        <MapsComponent
          ref={RecordsMapRef}
          id="records-region-map"
          height="100%"
          width="100%"
          background="transparent"
          tooltipDisplayMode="MouseMove"
          legendSettings={{ visible: true, position: 'Bottom', mode: 'Default' }}
          tooltipRender={onMapTooltipRender}
          load={Mapload}
        >
          <MapsInject services={[MapsTooltip, MapsZoom, MapsLegend, MapsSelection, MapsHighlight]} />
          <LayersDirective>
            <LayerDirective
              dataSource={mapData}
              shapeData={worldData as any}
              shapeDataPath="name"
              shapePropertyPath="name"
              shapeSettings={{
                fill: '#E5E5E5',
                colorValuePath: 'country',
                colorMapping
              }}
              tooltipSettings={{
                visible: true,
                valuePath: 'country',
                format: '<b>${country}</b><br/>Records: <b>${value}</b><br/>Amount: <b>${amountText}</b>'
              } as any}
            >
              <MarkersDirective>
                <MarkerDirective
                  visible={true}
                  dataSource={markers}
                  animationDuration={0}
                  template={'<div class="map-marker">${label}</div>'}
                />
              </MarkersDirective>
            </LayerDirective>
          </LayersDirective>
        </MapsComponent>
      </div>
    );
  };

  // Claim Severity by Region = (Total Amount) / (Number of Claims)
  const { severityByRegion, severityMax } = React.useMemo(() => {
    const amt = new Map<string, number>(amountByRegion.map(d => [d.x, Number(d.y || 0)]));
    const cnt = new Map<string, number>(countByRegion.map(d => [d.x, Number(d.y || 0)]));
    const rows = (REGIONS as readonly string[]).map(r => {
      const amount = amt.get(r) || 0;
      const count = cnt.get(r) || 0;
      const sev = count > 0 ? amount / count : 0;
      return { x: r, y: sev };
    }).filter(d => d.y > 0);
    const max = Math.max(0, ...rows.map(d => d.y));
    return { severityByRegion: rows, severityMax: max };
  }, [amountByRegion, countByRegion]);

  const ClaimSeverityByRegionChart = () => {
    const pieData = React.useMemo(
      () => severityByRegion.map(d => ({ ...d, text: fmtCurrency(Number(d.y || 0)) })),
      [severityByRegion]
    );

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {pieData.length === 0 ? (
          <div style={{ padding: 12 }}>No severity data for the selected filters.</div>
        ) : (
          <AccumulationChartComponent
            id="claim-severity-region-pie"
            ref={ClaimSeverityRef}
            legendSettings={{ visible: true, position: 'Bottom' }}
            enableAnimation={true}
            load={onAccumulationLoad}
            tooltip={{ enable: true, header: '' }}
            tooltipRender={(args: any) => {
              const x = String(args?.point?.x ?? '');
              const y = Number(args?.point?.y ?? 0);
              args.text = `${x}<br/>Severity: <b>${fmtCurrency(y)}</b>`;
            }}
          >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={pieData}
                xName="x"
                yName="y"
                radius="70%"
                dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
                border={{ color: '#FFFFFF', width: 1 }}
                palettes={pieThemePalette}
                animation={{ enable: false }}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        )}
      </div>
    );
  };

  return (
    <div className="Container">
      <div className="e-card insurance-toolbar" >
        <div className="insurance-toolbar-left">
          <h4 className="insurance-title">Claim Analysis</h4>
        </div>
        <div className="insurance-toolbar-right" style={{ display: 'flex', gap: 10 }}>
          <DropDownListComponent
            id="policyTypeToolbar"
            dataSource={policyTypeOptions}
            fields={{ text: 'name', value: 'id' }}
            placeholder="Policy type"
            value={selectedPolicyTypeValue}
            change={onPolicyTypeChange}
            width={200}
          />
          <DropDownListComponent
            id="yearToolbarClaim"
            dataSource={yearOptions}
            fields={{ text: 'label', value: 'id' }}
            placeholder="Select year"
            value={currentYearClaim != null ? String(currentYearClaim) : undefined}
            change={onYearChange}
            width={160}
          />
        </div>
      </div>
      <DashboardLayoutComponent
        id="dashboard_performance"
        ref={ClaimAnalysisRef}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        columns={8}
        cellAspectRatio={90 / 100}
        cellSpacing={[10, 10]}
        allowResizing={false}
        allowDragging={false}
        mediaQuery="(max-width:950px)"
        created={onCreated}
      >
        <PanelsDirective>
          <PanelDirective sizeX={2} sizeY={1} row={0} col={0} content={TotalClaims} />
          <PanelDirective sizeX={2} sizeY={1} row={0} col={2} content={TotalClaimAmount} />
          <PanelDirective sizeX={2} sizeY={1} row={0} col={4} content={AverageClaimAmount} />
          <PanelDirective sizeX={2} sizeY={1} row={0} col={6} content={ClaimApprovalRate} />
          <PanelDirective sizeX={3} sizeY={3} row={1} col={0} header="<div>Claim Paid Out vs Denied</div>" content={DeniedChart} />
          <PanelDirective sizeX={5} sizeY={3} row={1} col={3} header="<div>Claim Amount Comparison</div>" content={ClaimAmountComparisonChart} />
          <PanelDirective sizeX={8} sizeY={3} row={4} col={0} header="<div>Claim Status</div>" content={ClaimStatusKanban} />
          <PanelDirective sizeX={5} sizeY={3} row={9} col={0} header="<div>Total Amount and Records by Region</div>" content={TotalRecordsByRegionMap} />
          <PanelDirective sizeX={3} sizeY={3} row={9} col={5} header="<div>Average Claim Cost by Region</div>" content={ClaimSeverityByRegionChart} />
          <PanelDirective sizeX={8} sizeY={3} row={12} col={0} header="<div>Claim Details</div>" content={ClaimDetailsGrid} />
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  );
}

const Dashboard3: React.FC<{ selectedYears: number[]; onChangeYears: (ys: number[]) => void }> = ({ selectedYears, onChangeYears }) => {

  const CustomerFeedbackRef = React.useRef<DashboardLayoutComponent | null>(null);
  const NpsRef = React.useRef<CircularGaugeComponent | null>(null);
  const CrrRef = React.useRef<CircularGaugeComponent | null>(null);
  const ChannelFeedbackRef = React.useRef<ChartComponent | null>(null);
  const CustomerRatingRef = React.useRef<AccumulationChartComponent | null>(null);
  const gridInstance = React.useRef<GridComponent | null>(null);
  const totalResponseRef = React.useRef<SparklineComponent | null>(null);

  const YEAR_RANGE_CUSTOMER = [2025, 2024, 2023, 2022];
  const [selectedYearsCustomer, setSelectedYearsCustomer] = React.useState<number[]>(
    selectedYears.length ? selectedYears : (YEAR_RANGE_CUSTOMER.length ? [YEAR_RANGE_CUSTOMER[0]] : [])
  );

  const assignYearFromComment = React.useCallback((text: string, index: number) => {
    const pool = YEAR_RANGE_CUSTOMER;
    let h = 5381;
    const s = String(text || '');
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) + h) + s.charCodeAt(i);
      h |= 0;
    }
    const idx = Math.abs(h + index) % pool.length;
    return pool[idx];
  }, []);

  const yearOptionsCustomer = React.useMemo(
    () => YEAR_RANGE_CUSTOMER.map(y => ({ id: String(y), label: String(y) })),
    []
  );

  const currentYearCustomer = React.useMemo(
    () => (selectedYears.length ? Math.max(...selectedYears) : YEAR_RANGE_CUSTOMER[0]),
    [selectedYears]
  );

  React.useEffect(() => {
    setSelectedYearsCustomer(selectedYears);
  }, [selectedYears]);

  const onYearChangeToolbar = (e: ChangeEventArgs) => {
    const v = Number(e?.value);
    if (Number.isFinite(v)) {
      onChangeYears([v]);
      setSelectedYearsCustomer([v]);
    }
  };

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshAll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        CustomerFeedbackRef.current?.refresh();
        NpsRef.current?.refresh();
        CrrRef.current?.refresh();
        ChannelFeedbackRef.current?.refresh();
        CustomerRatingRef.current?.refresh();
        gridInstance.current?.refresh();
        totalResponseRef.current?.refresh();
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

  // Total responses from SentimentAnalysis if present; fallback to count of comments
  const totalResponses = React.useMemo(() => {
    const customerdata: any = (InsuranceData as any).customerdata ?? {};
    const rows: any[] = Array.isArray(customerdata?.SentimentAnalysis) ? customerdata.SentimentAnalysis : [];

    const years = new Set(selectedYearsCustomer);
    const toNum = (v: any) =>
      typeof v === 'number' && Number.isFinite(v) ? v :
        (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : 0);

    const getYear = (r: any) => {
      const y = Number(r.year ?? r.Year);
      if (Number.isFinite(y)) return y;
      const ds = r.Date ?? r.date;
      if (!ds) return undefined;
      const d = new Date(ds);
      return Number.isNaN(d.getTime()) ? undefined : d.getFullYear();
    };

    if (Array.isArray(rows) && rows.length) {
      let total = 0;
      for (const r of rows) {
        const y = getYear(r);
        if (!Number.isFinite(y as number) || !years.has(y as number)) continue;
        const hasBuckets =
          r.Positive != null || r.positive != null ||
          r.Neutral != null || r.neutral != null ||
          r.Negative != null || r.negative != null;

        if (hasBuckets) {
          total += toNum(r.Positive ?? r.positive)
            + toNum(r.Neutral ?? r.neutral)
            + toNum(r.Negative ?? r.negative);
        } else {
          total += toNum(r.Count ?? r.count ?? 0);
        }
      }
      return total;
    }

    if (Array.isArray(customerdata)) {
      let total = 0;
      customerdata.forEach((row: any, idx: number) => {
        const y = Number(row?.Year ?? row?.year);
        const yr = Number.isFinite(y) ? y : assignYearFromComment(row?.Comment ?? '', idx);
        if (years.has(yr)) total++;
      });
      return total;
    }
    return 0;
  }, [selectedYearsCustomer, assignYearFromComment]);

  const totalResponsesSparkByYear = React.useMemo(() => {
    const cd: any = (InsuranceData as any).customerdata ?? {};
    const rows: any[] = Array.isArray(cd?.SentimentAnalysis) ? cd.SentimentAnalysis
      : (Array.isArray(cd) ? cd : []);

    const getYear = (r: any, idx: number): number => {
      const y = Number(r?.Year ?? r?.year);
      if (Number.isFinite(y)) return y;
      const ds = r?.Date ?? r?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getFullYear())) return d.getFullYear();
      }
      return assignYearFromComment(String(r?.Comment ?? ''), idx);
    };

    const toNum = (v: any) =>
      typeof v === 'number' && Number.isFinite(v) ? v :
        (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : 0);

    const counts = new Map<number, number>(ALLOWED_YEARS.map(y => [y, 0]));
    rows.forEach((r, idx) => {
      const y = getYear(r, idx);
      if (!(ALLOWED_YEARS as readonly number[]).includes(y)) return;
      if ('Positive' in r || 'Neutral' in r || 'Negative' in r || 'positive' in r || 'neutral' in r || 'negative' in r) {
        const add = toNum(r.Positive ?? r.positive) + toNum(r.Neutral ?? r.neutral) + toNum(r.Negative ?? r.negative);
        counts.set(y, (counts.get(y) || 0) + add);
      } else {
        counts.set(y, (counts.get(y) || 0) + 1);
      }
    });

    return [...ALLOWED_YEARS].sort().map(y => ({ x: String(y), y: counts.get(y) || 0 }));
  }, [assignYearFromComment]);

  const TotalResponsesCard = () => (
    <div className="kpi-totalcard">
      <div className="spark-header">
        <div className="insurance-label">Total Responses</div>
        <div className="insurance-totalvalue">{totalResponses.toLocaleString()}</div>
      </div>
      <div className="spark-content" style={{ width: '50%', height: '50%' }}>
        <div>
          <SparklineComponent
            id="total-responses-spark"
            ref={totalResponseRef}
            type="Column"
            dataSource={totalResponsesSparkByYear as any}
            xName="x"
            yName="y"
            valueType="Category"
            width="100%"
            height="55px"
            fill="#05B3DA"
            axisSettings={{ minY: 130 }}
            tooltipSettings={{ visible: true, format: 'Year: ${x}<br/>Responses: ${y}' }}
          >
            <Inject services={[SparklineTooltip]} />
          </SparklineComponent>
        </div>
      </div>
    </div>
  );

  // Average SatisfactionScore (%) for selected years 
  const avgSatisfaction = React.useMemo(() => {
    const rows: any[] = Array.isArray((InsuranceData as any).customerdata) ? (InsuranceData as any).customerdata : [];
    if (!rows.length) return 0;
    const years = new Set(selectedYearsCustomer);

    const toNum = (v: any) =>
      typeof v === 'number' && Number.isFinite(v) ? v :
        (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : NaN);

    const resolveYear = (row: any, idx: number): number => {
      const y = Number(row?.Year ?? row?.year);
      if (Number.isFinite(y)) return y;
      const ds = row?.Date ?? row?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getFullYear())) return d.getFullYear();
      }
      return assignYearFromComment(String(row?.Comment ?? ''), idx);
    };

    let sum = 0, n = 0;
    rows.forEach((r, idx) => {
      const score = toNum(r?.SatisfactionScore);
      if (!Number.isFinite(score)) return;
      const yr = resolveYear(r, idx);
      if (!years.has(yr)) return;
      sum += Math.max(0, Math.min(100, score));
      n += 1;
    });

    return n ? (sum / n) : 0;
  }, [selectedYearsCustomer, assignYearFromComment]);

  // Delta for average satisfaction score (vs previous year)
  const satisfactionDelta = React.useMemo(() => {
    const rows: any[] = Array.isArray((InsuranceData as any).customerdata) ? (InsuranceData as any).customerdata : [];
    if (!rows.length || !selectedYearsCustomer.length) return undefined;

    const currentYear = Math.max(...selectedYearsCustomer);
    const prevYear = currentYear - 1;

    const toNum = (value: any) =>
      typeof value === 'number' && Number.isFinite(value) ? value :
        (typeof value === 'string' && value.trim() && Number.isFinite(+value) ? +value : NaN);

    const resolveYear = (row: any, idx: number): number => {
      const y = Number(row?.Year ?? row?.year);
      if (Number.isFinite(y)) return y;
      const ds = row?.Date ?? row?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getFullYear())) return d.getFullYear();
      }
      return assignYearFromComment(String(row?.Comment ?? ''), idx);
    };

    const avgFor = (yr: number) => {
      let sum = 0, n = 0;
      rows.forEach((r, idx) => {
        const score = toNum(r?.SatisfactionScore);
        if (!Number.isFinite(score)) return;
        const y = resolveYear(r, idx);
        if (y !== yr) return;
        sum += Math.max(0, Math.min(100, score));
        n += 1;
      });
      return n ? (sum / n) : 0;
    };

    const curr = avgFor(currentYear);
    const prev = avgFor(prevYear);
    const diff = curr - prev;
    const pct = prev ? (diff / prev) * 100 : undefined;
    return { diff, pct, prevYear };
  }, [selectedYearsCustomer, assignYearFromComment]);

  const SatisfactionScore = () => (
    <div className="insurance-card">
      <div className="insurance-label">Customer Satisfaction</div>
      <div className="e-card-content kpi-card-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div className="insurance-card-value">{`${avgSatisfaction.toFixed(0)}%`}</div>
          <DeltaBadge delta={satisfactionDelta} />
        </div>
      </div>
    </div>
  );

  const sentiment = React.useMemo(() => {
    const rows: any[] = Array.isArray((InsuranceData as any).customerdata) ? (InsuranceData as any).customerdata : [];
    if (!rows.length) return { positive: 0, neutral: 0, negative: 0, total: 0 };

    const years = new Set(selectedYearsCustomer);

    const toInt = (v: any): number | undefined => {
      const n = typeof v === 'number' ? v : (typeof v === 'string' && v.trim() ? +v : NaN);
      if (!Number.isFinite(n)) return undefined;
      const r = Math.round(n);
      return r >= 1 && r <= 5 ? r : undefined;
    };

    const resolveYear = (row: any, idx: number): number => {
      const y = Number(row?.Year ?? row?.year);
      if (Number.isFinite(y)) return y;
      const ds = row?.Date ?? row?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getFullYear())) return d.getFullYear();
      }
      return assignYearFromComment(String(row?.Comment ?? ''), idx);
    };

    let positive = 0, neutral = 0, negative = 0, total = 0;

    rows.forEach((r, idx) => {
      const yr = resolveYear(r, idx);
      if (!years.has(yr)) return;

      const rating = toInt(r?.Rating ?? r?.rating);
      if (rating == null) return;

      if (rating >= 4) positive++;
      else if (rating === 3) neutral++;
      else negative++;

      total++;
    });

    return { positive, neutral, negative, total };
  }, [selectedYearsCustomer, assignYearFromComment]);

  const SentimentOverview = () => {
    const pct = (n: number, d: number) => d ? ((n / d) * 100) : 0;

    const getPctClass = (t: string) => {
      const k = t.toLowerCase();
      if (k === 'positive') return 'sentiment-pct sentiment-pct--positive';
      if (k === 'neutral') return 'sentiment-pct sentiment-pct--neutral';
      return 'sentiment-pct sentiment-pct--negative';
    };

    const card = (title: string, count: number, total: number, imgUrl: string) => (
      <div className="sentiment-card">
        <div className="sentiment-title">{title}</div>
        <div className="sentiment-overview">
          <img src={imgUrl} alt={`${title} trend`} className="sentiment-img" />
          <div className="sentiment-content">
            <div className={getPctClass(title)}>{pct(count, sentiment.total).toFixed(1)}%</div>
            <div className="sentiment-rating">Rating: {count.toLocaleString()}</div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="sentiment-panel-center">
        <div className="sentiment-row">
          {card('Positive', sentiment.positive, sentiment.total, 'https://storage.googleapis.com/cdn-bolddesk/agent-angular-app/images/light/positive-line-1.svg')}
          {card('Neutral', sentiment.neutral, sentiment.total, 'https://storage.googleapis.com/cdn-bolddesk/agent-angular-app/images/light/neutral-line-1.svg')}
          {card('Negative', sentiment.negative, sentiment.total, 'https://storage.googleapis.com/cdn-bolddesk/agent-angular-app/images/light/negative-line-1.svg')}
        </div>
      </div>
    );
  };

  const gaugeRows: any[] = React.useMemo(
    () => (Array.isArray((InsuranceData as any).gaugedata) ? (InsuranceData as any).gaugedata as any[] : []),
    []
  );

  const currentCustomerYear = React.useMemo(
    () => (selectedYearsCustomer.length ? Math.max(...selectedYearsCustomer) : undefined),
    [selectedYearsCustomer]
  );

  const getGaugeValue = React.useCallback((keys: string[]): number | undefined => {
    if (!gaugeRows.length || !currentCustomerYear) return undefined;

    let row = gaugeRows.find(r => Number(r?.Year ?? r?.year) === currentCustomerYear);

    if (!row) {
      const idx = YEAR_RANGE_CUSTOMER.indexOf(currentCustomerYear);
      if (idx >= 0 && idx < gaugeRows.length) row = gaugeRows[idx];
      else row = gaugeRows[gaugeRows.length - 1]; // last known as fallback
    }

    if (!row) return undefined;

    for (const k of keys) {
      const v = row[k];
      const n = typeof v === 'number' && Number.isFinite(v)
        ? v
        : (typeof v === 'string' && v.trim() && Number.isFinite(+v) ? +v : undefined);
      if (typeof n === 'number') return n;
    }
    return undefined;
  }, [gaugeRows, currentCustomerYear]);

  // Net Promoter Score gauge
  const NpsGauge = () => {
    const raw = getGaugeValue(['NPSGauge', 'NPS', 'NetPromoterScore', 'NPS_Score', 'NPSValue', 'NPSScore']);
    let value = typeof raw === 'number' ? raw : 0;
    if (value >= 0 && value <= 1) value = value * 100;
    value = Math.max(0, Math.min(100, value));
    const vText = value.toFixed(1);
    const tooltipTpl = `<div style="font-size:18px;background:white;width:170px;color:#595959;border:1px solid #e8e8e8">Current Score: ${vText}</div>`;
    const annotationTpl = `<div style="font-size:16px;margin-top:5px;font-family:inherit;">${vText}</div>`;
    return (
      <div className="gauge-center" style={{ height: '100%', width: '100%' }}>
        <CircularGaugeComponent
          id="nps-gauge"
          ref={NpsRef}
          background="transparent"
          height="100%"
          width="100%"
          centerX="50%"
          centerY="70%"
          allowMargin={false}
          animationDuration={2000}
          title='Net Promoter Score (NPS)'
          titleStyle={{ size: '16px', fontWeight: '600' }}
          tooltip={{ enable: true, template: tooltipTpl }}
          load={onGaugeLoad}
          legendSettings={{ visible: false }}
        >
          <Inject services={[Annotations, GaugeTooltip, CircularGaugeLegend]} />
          <CircularGaugeAxesDirective>
            <CircularGaugeAxisDirective
              startAngle={270}
              endAngle={90}
              radius="100%"
              minimum={0}
              maximum={100}
              majorTicks={{ width: 1.5, height: 12, interval: 20, offset: 35 }}
              lineStyle={{ width: 0 }}
              minorTicks={{ width: 0 }}
              labelStyle={{ font: { size: '14px', fontFamily: 'inherit' }, position: 'Outside', offset: -40 }}
            >
              <AnnotationsDirective>
                <AnnotationDirective content={annotationTpl} angle={0} radius="-10%" zIndex="1" />
              </AnnotationsDirective>
              <PointersDirective>
                <PointerDirective value={value} radius="70%" pointerWidth={5} needleEndWidth={2} cap={{ radius: 8, border: { width: 2 } }} animation={{ enable: true, duration: 1000 }} />
              </PointersDirective>
              <RangesDirective>
                <RangeDirective
                  start={0}
                  end={value}
                  radius="80%"
                  color="#FF7000"
                  startWidth={40}
                  endWidth={40}
                />
              </RangesDirective>
            </CircularGaugeAxisDirective>
          </CircularGaugeAxesDirective>
        </CircularGaugeComponent>
      </div>
    );
  };

  // Customer Retention Rate gauge 
  const CrrGauge = () => {
    const raw = getGaugeValue(['CRRGauge', 'CustomerRetentionRate', 'CRR', 'CRRValue']);
    let v = typeof raw === 'number' ? raw : 0;
    if (v >= 0 && v <= 1) v = v * 100;
    v = Math.max(0, Math.min(100, v));
    const vText = v.toFixed(2);
    const tooltipTpl = `<div style="font-size:18px;background:white;width:180px;color:#595959;border:1px solid #e8e8e8">Current Rate: ${vText}%</div>`;
    const annotationTpl = `<div style="font-size:16px;margin-top:5px;font-family:inherit;">${v.toFixed(1)}%</div>`;

    return (
      <div className="gauge-center" style={{ height: '100%', width: '100%' }}>
        <CircularGaugeComponent
          id="crr-gauge"
          ref={CrrRef}
          background="transparent"
          height="100%"
          width="100%"
          centerX="50%"
          centerY="70%"
          allowMargin={false}
          animationDuration={2000}
          title='Customer Retention Rate'
          titleStyle={{ size: '16px', fontWeight: '600' }}
          tooltip={{ enable: true, template: tooltipTpl }}
          load={onGaugeLoad}
          legendSettings={{ visible: false }}
        >
          <Inject services={[Annotations, GaugeTooltip, CircularGaugeLegend]} />
          <CircularGaugeAxesDirective>
            <CircularGaugeAxisDirective
              startAngle={270}
              endAngle={90}
              radius="100%"
              minimum={0}
              maximum={100}
              majorTicks={{ width: 1.5, height: 12, interval: 20, offset: 35 }}
              lineStyle={{ width: 0 }}
              minorTicks={{ width: 0 }}
              labelStyle={{ font: { size: '14px', fontFamily: 'inherit' }, position: 'Outside', offset: -40 }}
            >
              <AnnotationsDirective>
                <AnnotationDirective content={annotationTpl} angle={0} radius="-10%" zIndex="1" />
              </AnnotationsDirective>
              <PointersDirective>
                <PointerDirective value={v} radius="70%" pointerWidth={5} needleEndWidth={2} cap={{ radius: 8, border: { width: 2 } }} animation={{ enable: true, duration: 1000 }} />
              </PointersDirective>
              <RangesDirective>
                <RangeDirective
                  start={0}
                  end={v}
                  radius="80%"
                  color="#CE9461"
                  startWidth={40}
                  endWidth={40}
                />
              </RangesDirective>
            </CircularGaugeAxisDirective>
          </CircularGaugeAxesDirective>
        </CircularGaugeComponent>
      </div>
    );
  };

  // --- Channel Feedback by Channel (Email, Phone, Social Media, Surveys, Agent, SMS) ---
  const channelFeedbackData = React.useMemo(() => {
    const rows: any[] = Array.isArray((InsuranceData as any).customerdata) ? (InsuranceData as any).customerdata : [];
    if (!rows.length) return [];

    const years = new Set(selectedYearsCustomer);

    const resolveYear = (row: any, idx: number): number => {
      const y = Number(row?.Year ?? row?.year);
      if (Number.isFinite(y)) return y;
      const ds = row?.Date ?? row?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getTime())) return d.getFullYear();
      }
      return assignYearFromComment(String(row?.Comment ?? ''), idx);
    };

    const CHANNELS = ['Email', 'Phone', 'Social Media', 'Surveys', 'Agent', 'SMS'] as const;
    const counts = new Map<string, number>(CHANNELS.map(c => [c, 0]));

    const normChannel = (v: any): typeof CHANNELS[number] | undefined => {
      const s = String(v ?? '').trim().toLowerCase();
      if (!s) return undefined;
      if (s.includes('email') || s.includes('e-mail') || s === 'mail') return 'Email';
      if (s.includes('phone') || s.includes('call') || s.includes('mobile')) return 'Phone';
      if (s.includes('social') || s.includes('twitter') || s.includes('facebook') || s.includes('instagram')) return 'Social Media';
      if (s.includes('survey') || s.includes('nps')) return 'Surveys';
      if (s.includes('agent')) return 'Agent';
      if (s.includes('sms') || s.includes('text') || s.includes('message')) return 'SMS';
      return undefined;
    };

    rows.forEach((r, idx) => {
      const yr = resolveYear(r, idx);
      if (!years.has(yr)) return;
      const ch = normChannel(r?.FeedbackType ?? r?.feedbackType ?? r?.Channel ?? r?.channel);
      if (ch) counts.set(ch, (counts.get(ch) || 0) + 1);
    });

    return (['Email', 'Phone', 'Social Media', 'Surveys', 'Agent', 'SMS'] as const)
      .map(x => ({ x, y: counts.get(x) || 0 }));
  }, [selectedYearsCustomer, assignYearFromComment]);

  const ChannelFeedbackChart = () => {
    return (
      <div style={{ width: '100%', height: '100%', padding: 8 }}>
        {channelFeedbackData.length === 0 ? (
          <div style={{ padding: 12 }}>No channel feedback for the selected year(s).</div>
        ) : (
          <ChartComponent
            id="channel-feedback-chart"
            ref={ChannelFeedbackRef}
            primaryXAxis={{
              valueType: 'Category',
              majorGridLines: { width: 0 },
              labelIntersectAction: 'Trim'
            }}
            primaryYAxis={{
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 }
            }}
            legendSettings={{ visible: false }}
            tooltip={{ enable: true, format: '${point.x}: <b>${point.y}</b>' }}
            chartArea={{ border: { width: 0 } }}
            width="100%"
            height="100%"
            load={onChartLoad}
          >
            <Inject services={[ColumnSeries, Category, Legend, Tooltip, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                type="Column"
                dataSource={channelFeedbackData}
                xName="x"
                yName="y"
                columnSpacing={0.2}
                marker={{ visible: true, dataLabel: { visible: true } }}
                cornerRadius={{ topLeft: 4, topRight: 4 }}
                fill="#F8CA7E"
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        )}
      </div>
    );
  };

  // --- Customer Rating Analytics (Pie: ratings 1..5) ---
  const ratingPieData = React.useMemo(() => {
    const rows: any[] = Array.isArray((InsuranceData as any).customerdata) ? (InsuranceData as any).customerdata : [];
    if (!rows.length) return [];

    const years = new Set(selectedYearsCustomer);

    const resolveYear = (row: any, idx: number): number => {
      const y = Number(row?.Year ?? row?.year);
      if (Number.isFinite(y)) return y;
      const ds = row?.Date ?? row?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getTime())) return d.getFullYear();
      }
      return assignYearFromComment(String(row?.Comment ?? ''), idx);
    };

    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    rows.forEach((r, idx) => {
      const yr = resolveYear(r, idx);
      if (!years.has(yr)) return;
      const raw = r?.Rating ?? r?.rating;
      const n = typeof raw === 'number' ? raw : (typeof raw === 'string' ? parseInt(raw, 10) : NaN);
      if (Number.isFinite(n)) {
        const clamped = Math.max(1, Math.min(5, Math.round(n)));
        counts[clamped] += 1;
      }
    });

    // Legend uses point.x, so add the “Star(s)” suffix here
    return [1, 2, 3, 4, 5].map(k => ({
      x: `${k} star`,
      y: counts[k],
      text: String(counts[k])
    }));
  }, [selectedYearsCustomer, assignYearFromComment]);

  const CustomerRatingPie = () => (
    <div style={{ height: '100%', width: '100%' }}>
      {ratingPieData.every(d => d.y === 0) ? (
        <div style={{ padding: 12 }}>No rating data for the selected year(s).</div>
      ) : (
        <AccumulationChartComponent
          id='customer-rating-pie'
          ref={CustomerRatingRef}
          legendSettings={{ visible: true, position: 'Bottom' }}
          enableAnimation={true}
          load={onAccumulationLoad}
          tooltip={{ enable: true, format: '<b>Rating ${point.x}</b><br>Count: <b>${point.y}</b>', header: '' }}
        >
          <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={ratingPieData}
              xName='x'
              yName='y'
              innerRadius='60%'
              radius='70%'
              dataLabel={{ visible: true, position: 'Outside', name: 'text' }}
              palettes={donutPaletteColors}
              animation={{ enable: false }}
              borderRadius={10} border={{ width: 4, color: '#ffffff' }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </div>
  );

  // --- Feedback Details Grid ---
  const classifySentiment = React.useCallback((text: string): 'Positive' | 'Negative' | 'Neutral' => {
    const t = String(text || '').toLowerCase();
    if (!t) return 'Neutral';
    const posWords = ['good', 'satisfied', 'great', 'excellent', 'helpful', 'fast', 'easy', 'smooth', 'well', 'happy', 'transparent', 'clear', 'accurate', 'timely'];
    const negWords = ['poor', 'frustrating', 'disappointed', 'bad', 'slow', 'unhelpful', 'confusing', 'misleading', 'issue', 'issues', 'rejected', 'hard', 'delay', 'delayed', 'problem', 'problems', 'unresolved', 'unfair'];
    const pos = posWords.some(w => t.includes(w));
    const neg = negWords.some(w => t.includes(w));
    if (pos && !neg) return 'Positive';
    if (neg && !pos) return 'Negative';
    return 'Neutral';
  }, []);

  const normalizeSentiment = React.useCallback((v: any): 'Positive' | 'Negative' | 'Neutral' | undefined => {
    const s = String(v ?? '').trim().toLowerCase();
    if (!s) return undefined;
    if (['positive', 'pos', 'good', 'happy', 'excellent'].includes(s)) return 'Positive';
    if (['negative', 'neg', 'bad', 'poor', 'unhappy'].includes(s)) return 'Negative';
    if (['neutral', 'neu', 'mixed', 'average'].includes(s)) return 'Neutral';
    return undefined;
  }, []);

  const feedbackGridData = React.useMemo(() => {
    const rows: any[] = Array.isArray((InsuranceData as any).customerdata) ? (InsuranceData as any).customerdata : [];
    const years = new Set(selectedYearsCustomer);
    const data: any[] = [];

    const resolveYear = (row: any, idx: number): number => {
      const y = Number(row?.Year ?? row?.year);
      if (Number.isFinite(y)) return y;
      const ds = row?.Date ?? row?.date;
      if (ds) {
        const d = new Date(ds);
        if (!Number.isNaN(d.getFullYear())) return d.getFullYear();
      }
      return assignYearFromComment(String(row?.Comment ?? ''), idx);
    };

    rows.forEach((r, idx) => {
      const yr = resolveYear(r, idx);
      if (!years.has(yr)) return;

      const comment = String(r?.Comment ?? '');
      const dateStr = r?.Date ?? r?.date ?? '';
      const ft = String(r?.FeedbackType ?? r?.feedbackType ?? r?.Channel ?? r?.channel ?? '');
      const ratingRaw = r?.Rating ?? r?.rating;
      const rating = typeof ratingRaw === 'number'
        ? ratingRaw
        : (typeof ratingRaw === 'string' && ratingRaw.trim() && Number.isFinite(+ratingRaw) ? +ratingRaw : '');

      const sRaw = (r as any)['Sentiment Analysis'] ?? r?.SentimentAnalysis ?? r?.sentimentAnalysis ?? r?.Sentiment ?? r?.sentiment;
      const sentiment = normalizeSentiment(sRaw) ?? classifySentiment(comment);

      data.push({
        id: Number(r?.Id ?? r?.id ?? idx + 1),
        year: yr,
        Date: String(dateStr || ''),
        FeedbackType: ft,
        Rating: rating,
        Sentiment: sentiment,
        Comment: comment
      });
    });

    return data;
  }, [selectedYearsCustomer, assignYearFromComment, normalizeSentiment, classifySentiment]);

  const onFeedbackCellStyle = (args: any) => {
    if (args?.column?.field === 'Sentiment') {
      const s = String(args?.data?.Sentiment ?? '').toLowerCase();
      let color = '';
      if (s === 'positive') color = '#2e7d32';
      else if (s === 'negative') color = '#c62828';
      else color = 'rgb(189, 126, 0)'; // neutral
      Object.assign(args.cell.style, { color, fontWeight: '700', textAlign: 'center' });
    }

    // Add tooltip for Comment column (content = comment text)
    if (args?.column?.field === 'Comment') {
      const txt = String(args?.data?.Comment ?? '').trim();
      if (txt) {
        args.cell.setAttribute('title', txt);
      } else {
        args.cell.removeAttribute('title');
      }
    }
  };

  // Rating cell template
  const ratingTemplate = (props: any): JSX.Element => {
    const val = typeof props?.Rating === 'number' ? props.Rating : (Number(props?.Rating) || 0);
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RatingComponent value={val} cssClass="insurance-custom-rating" readOnly={true} />
      </div>
    );
  };

  function toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'feedbackDetailsGrid_pdfexport':
        gridInstance.current?.pdfExport();
        break;
      case 'feedbackDetailsGrid_excelexport':
        gridInstance.current?.excelExport();
        break;
    }
  }

  const toolBarOptions: any = ['Search', 'ExcelExport', 'PdfExport'];

  const FeedbackDetailsGrid = () => (
    <div style={{ width: '100%', height: '100%', padding: 8 }}>
      <GridComponent
        ref={gridInstance}
        id='feedbackDetailsGrid'
        dataSource={feedbackGridData}
        allowPaging={false}
        enableVirtualMaskRow={true}
        allowSorting={true}
        allowResizing={true}
        allowFiltering={true}
        allowMultiSorting={true}
        width={'100%'}
        height={'100%'}
        allowGrouping={true}
        allowExcelExport={true}
        allowPdfExport={true}
        toolbar={toolBarOptions as any}
        filterSettings={{ type: 'Menu' }}
        queryCellInfo={onFeedbackCellStyle}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          <ColumnDirective field="year" headerText="Year" headerTemplate={headerWithTooltip("Year")} visible={false} />
          <ColumnDirective field="id" headerText="ID" headerTemplate={headerWithTooltip("ID")} width="90" textAlign="Right" isPrimaryKey={true} />
          <ColumnDirective field="FeedbackType" headerText="Feedback Type" headerTemplate={headerWithTooltip("Feedback Type")} width="120" textAlign="Left" />
          <ColumnDirective field="Rating" headerText="Rating" headerTemplate={headerWithTooltip("Rating")} width="130" textAlign="Center" template={ratingTemplate as any} />
          <ColumnDirective field="Sentiment" headerText="Sentiment Analysis" headerTemplate={headerWithTooltip("Sentiment Analysis")} width="150" textAlign="Center" />
          <ColumnDirective field="Comment" headerText="Comment" headerTemplate={headerWithTooltip("Comment")} width="300" textAlign="Left" />
        </ColumnsDirective>
        <GridInject services={[GridSort, GridPage, GridFilter, Resize, Group, RowDD, Toolbar, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );

  return (
    <div className="Container">
      <div className="e-card insurance-toolbar" >
        <div className="insurance-toolbar-left">
          <h4 className="insurance-title">Customer Feedback</h4>
        </div>
        <div className="insurance-toolbar-right" style={{ display: 'flex', gap: 10 }}>
          <DropDownListComponent
            id="yearToolbarCustomer"
            dataSource={yearOptionsCustomer}
            fields={{ text: 'label', value: 'id' }}
            placeholder="Select year"
            value={currentYearCustomer != null ? String(currentYearCustomer) : undefined}
            change={onYearChangeToolbar}
            width={160}
          />
        </div>
      </div>
      <DashboardLayoutComponent
        id="dashboard_performance"
        ref={CustomerFeedbackRef}
        style={{ width: '100%', zIndex: 1 }}
        columns={8}
        cellAspectRatio={90 / 100}
        cellSpacing={[10, 10]}
        allowResizing={false}
        allowDragging={false}
        mediaQuery="(max-width:950px)"
      >
        <PanelsDirective>
          <PanelDirective sizeX={2} sizeY={1} row={0} col={0} content={TotalResponsesCard} />
          <PanelDirective sizeX={6} sizeY={2} row={0} col={2} header="<div>Sentiment Analysis</div>" content={SentimentOverview} />
          <PanelDirective sizeX={2} sizeY={1} row={1} col={0} content={SatisfactionScore} />
          <PanelDirective sizeX={4} sizeY={2} row={2} col={0} content={NpsGauge} />
          <PanelDirective sizeX={4} sizeY={2} row={2} col={4} content={CrrGauge} />
          <PanelDirective sizeX={5} sizeY={3} row={4} col={0} header="<div>Customer Feedback by Channel</div>" content={ChannelFeedbackChart} />
          <PanelDirective sizeX={3} sizeY={3} row={4} col={5} header="<div>Customer Rating Analytics</div>" content={CustomerRatingPie} />
          <PanelDirective sizeX={8} sizeY={3} row={7} col={0} header="<div>Feedback Details</div>" content={FeedbackDetailsGrid} />
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  );
}

export class InsuranceDashboard extends SampleBase<{}, InsuranceDashboardState> {
  private sidebarRef: React.RefObject<SidebarComponent | null>;
  private allowSidebarOpen = false;
  constructor(props: {}) {
    super(props);
    this.sidebarRef = React.createRef<SidebarComponent | null>();
    const overviewdata = (InsuranceData as any).overview as any[] | undefined;
    const policydata = (InsuranceData as any).policydata as any[] | undefined;
    const fromOverview = Array.from(new Set((overviewdata ?? []).map(r => Number(r.year ?? r.Year)).filter(Number.isFinite))).sort() as number[];
    const allYears = (fromOverview.length
      ? fromOverview
      : Array.from(new Set((policydata ?? []).map(r => Number(r.year ?? r.Year)).filter(Number.isFinite))).sort()
    ) as number[];
    const availAllowed = allYears.filter(y => (ALLOWED_YEARS as readonly number[]).includes(y));
    const latestYear = availAllowed.length ? Math.max(...availAllowed) : ALLOWED_YEARS[0];

    this.state = {
      selectedId: 'overview',
      sharedYears: latestYear != null ? [latestYear] : [],
      isDocked: false,
      sharedPolicyTypes: Array.from(POLICY_TYPES)
    };
  }

  private TOOLBAR_HEIGHT = 50;
  private DOCK_SIZE = 60;
  private OPEN_WIDTH = 240;

  private titleTemplate =
    '<div class="dashboard-title">Insurance Dashboard</div>';

  private onToolbarClicked = (args: ClickEventArgs) => {
    if (args.item.tooltipText === 'Menu') {
      // Only the Menu icon may open the sidebar
      this.allowSidebarOpen = true;
      this.sidebarRef.current?.toggle();
    }
  };

  onSidebarCreated = () => {
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
    setTimeout(() => {
      const el = document.getElementById('dashboard_default') as HTMLElement | null;
      (el as any)?.ej2_instances?.[0]?.refresh?.();
    }, 500);
  }

  private onSidebarClose = () => {
    // Ensure future opens require Menu click again
    this.allowSidebarOpen = false;

    setTimeout(this.notifyResize, 400);
    this.setState({ isDocked: true });
    setTimeout(() => {
      const el = document.getElementById('dashboard_default') as HTMLElement | null;
      (el as any)?.ej2_instances?.[0]?.refresh?.();
    }, 700);
  }

  private renderDashboard = (): JSX.Element => {
    const selectedId = this?.state?.selectedId ?? 'overview';
    const years = this.state.sharedYears;
    const onChangeYears = (ys: number[]) => this.setState({ sharedYears: ys });

    switch (selectedId) {
      case 'overview':
        return <Dashboard1 selectedYears={years} onChangeYears={onChangeYears} />;
      case 'cliam-analysis':
        return (
          <Dashboard2
            selectedYears={years}
            onChangeYears={onChangeYears}
            selectedPolicyTypes={this.state.sharedPolicyTypes}
            onChangePolicyTypes={(vals) => this.setState({ sharedPolicyTypes: vals })}
          />
        );
      case 'customer':
        return <Dashboard3 selectedYears={years} onChangeYears={onChangeYears} />;
      default:
        return <Dashboard1 selectedYears={years} onChangeYears={onChangeYears} />;
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
    const isActive = (id: InsuranceDashboardState['selectedId']) => this.state.selectedId === id ? 'active' : '';
    return (
      <div>
        <div className='control-section'>
          <div className="insurance-root">
            <div>
              <ToolbarComponent
                cssClass="insurance-dockToolbar"
                id="insurance-dockToolbar"
                height={`${this.TOOLBAR_HEIGHT}px`}
                clicked={this.onToolbarClicked}
              >
                <ItemsDirective>
                  <ItemDirective prefixIcon="e-menu" tooltipText="Menu" />
                  <ItemDirective template={this.titleTemplate} />
                </ItemsDirective>
              </ToolbarComponent>
            </div>

            <div className="insurance-workarea" >
              <SidebarComponent
                id="dockInsurancesidebar"
                ref={this.sidebarRef}
                enableDock={true}
                width={`${this.OPEN_WIDTH}px`}
                dockSize={`${this.DOCK_SIZE}px`}
                closeOnDocumentClick={false}
                enableGestures={false}
                className="insurance-sidebar"
                type="Push"
                target=".insurance-content"
                open={this.onSidebarOpen}
                close={this.onSidebarClose}
                created={this.onSidebarCreated}
              >
                {this.withTooltip('Overview',
                  <div
                    className={`insurance-nav-item ${isActive('overview')}`}
                    onClick={() => this.setState({ selectedId: 'overview' })}
                  >
                    <span className="e-icons e-home" aria-hidden="true" />
                    <span className="insurance-nav-text">Overview</span>
                  </div>
                )}
                {this.withTooltip('Claim Analysis',
                  <div
                    className={`insurance-nav-item ${isActive('cliam-analysis')}`}
                    onClick={() => this.setState({ selectedId: 'cliam-analysis' })}
                  >
                    <span className={this.icon('claim-analysis')} aria-hidden="true" />
                    <span className="insurance-nav-text">Claim Analysis</span>
                  </div>
                )}
                {this.withTooltip('Customer Feedback',
                  <div
                    className={`insurance-nav-item ${isActive('customer')}`}
                    onClick={() => this.setState({ selectedId: 'customer' })}
                  >
                    <span className={this.icon('feedback')} aria-hidden="true" />
                    <span className="insurance-nav-text">Customer Feedback</span>
                  </div>
                )}
              </SidebarComponent>

              <div className="insurance-content">
                <div className="insurance-page" style={{ padding: '16px', background: '#ffffff' }}>
                  {this.renderDashboard()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
            The Insurance Insights Dashboard provides a unified, interactive view of policy performance, claim analysis, and customer sentiment. It delivers real‑time KPIs (policies sold, assured amount, premium amount, total claims, total responses), drillable visualizations (Assured Amount by Policy), and deeper analysis through charts, a Kanban workflow, and a regional map component. The dashboard enables fast, data‑driven decisions by allowing users to filter insights by year and policy type, offering a clear and comprehensive understanding of portfolio health and customer behavior.
          </p>
        </div>
      </div>
    );
  }
}