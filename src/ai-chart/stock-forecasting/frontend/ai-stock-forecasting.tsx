import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  LineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  Legend,
  Tooltip,
  StripLine, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { fetchAI } from '../model/ai-input';
import { executeChartAction } from '../model/chartAction';
import './ai-stock-forecasting.css';

type ChartPoint = { date: Date; high: number; low: number; open: number; close: number };
type SeriesType = 'Candle' | 'Line' | 'HiloOpenClose';

const titleVal = 'Stock Forecasting';
const subTitleVal = 'AI-powered candlestick/OHLC forecasting (35 days)';

const defaultInfo: Record<string, { text: string; close: number; change: number; percentChange: number }> = {
  MSFT: { text: 'Microsoft Crp', close: 138.35, change: -2.0, percentChange: -0.22 },
  GOOG: { text: 'Alphabet Inc', close: 152.83, change: -2.0, percentChange: -0.22 },
  AMZN: { text: 'Amazon Inc', close: 222.27, change: -2.0, percentChange: -0.22 },
  TSLA: { text: 'Tesla Inc', close: 201.73, change: -2.0, percentChange: -0.22 }
};

const seriesOptions: SeriesType[] = ['Candle', 'Line', 'HiloOpenClose'];

function AIStockForecasting() {
  const chartRef = useRef<ChartComponent | null>(null);
  const baseDataLengthRef = useRef<number>(0);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('MSFT');
  const [selectedRange, setSelectedRange] = useState<number>(3);
  const [selectedSeriesType, setSelectedSeriesType] = useState<SeriesType>('Candle');
  // Animation is allowed only for the initial rendering; disabled for all later operations.
  const [enableAnimation, setEnableAnimation] = useState<boolean>(true);

  const [primaryXAxis, setPrimaryXAxis] = useState<any>({
    valueType: 'DateTime',
    edgeLabelPlacement: 'Shift',
    labelFormat: 'MMM d',
    majorGridLines: { width: 0 },
    stripLines: []
  });
  const primaryYAxis = useMemo(
    () => ({ title: 'Price (USD)', labelFormat: 'n0', rangePadding: 'None' }),
    []
  );
  const legendSettings = useMemo(() => ({ visible: false }), []);
  const chartArea = useMemo(() => ({ border: { width: 0 } }), []);
  const tooltip = useMemo(() => ({ enable: true, shared: true, header: '' as string }), []);

  const symbols = [
    { text: 'MSFT', iconCss: 'e-logo-msft', id: 'MSFT' },
    { text: 'GOOG', iconCss: 'e-logo-goog', id: 'GOOG' },
    { text: 'AMZN', iconCss: 'e-logo-amzn', id: 'AMZN' },
    { text: 'TSLA', iconCss: 'e-logo-tsla', id: 'TSLA' }
  ];

  useEffect(() => {
    // ngOnInit equivalent
    loadChartData(selectedSymbol, selectedRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSelectedIconClass = (): string => {
    switch (selectedSymbol) {
      case 'MSFT': return 'e-logo-msft';
      case 'GOOG': return 'e-logo-goog';
      case 'AMZN': return 'e-logo-amzn';
      case 'TSLA': return 'e-logo-tsla';
      default: return 'default-icon';
    }
  };

  const onStockItemSelected = (args: { item: { id?: string; text?: string } }) => {
    const id = args.item.id || args.item.text || 'MSFT';
    setSelectedSymbol(id);
    loadChartData(id, selectedRange);
  };

  const onSeriesChanged = (e: any) => {
    setSelectedSeriesType((e?.value || e?.itemData) as SeriesType);
  };

  const filterDataByMonths = (months: number) => {
    setSelectedRange(months);
    loadChartData(selectedSymbol, months);
  };

  const showSpinnerById = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('visible');
  };
  const hideSpinnerById = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
  };

  const filterByMonths = (all: ChartPoint[], months: number): ChartPoint[] => {
    if (!all.length) return [];
    const latest = all.reduce((a, b) => (new Date(a.date) > new Date(b.date) ? a : b));
    const cutoff = new Date(latest.date);
    cutoff.setMonth(cutoff.getMonth() - months + 1);
    return all
      .filter((p) => new Date(p.date) >= cutoff)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  };

  const loadChartData = async (symbol: string, months: number) => {
    setIsLoading(true);
    try {
      const url = `https://cdn.syncfusion.com/blazor/data/chart/${symbol.toLowerCase()}-data.json`;
      const res = await fetch(url);
      const raw = await res.json();

      const all: ChartPoint[] = (raw ?? []).map((r: any) => ({
        date: new Date(r.Date ?? r.date),
        high: +(r.High ?? r.high),
        low: +(r.Low ?? r.low),
        open: +(r.Open ?? r.open),
        close: +(r.Close ?? r.close)
      }));

      const filtered = filterByMonths(all, months);
      setChartData(filtered);
      baseDataLengthRef.current = filtered.length;
      setPrimaryXAxis((prev: any) => ({ ...prev, stripLines: [] }));
    } catch (err) {
      console.error('Failed to load chart data', err);
      setChartData([]);
      baseDataLengthRef.current = 0;
      setPrimaryXAxis((prev: any) => ({ ...prev, stripLines: [] }));
    } finally {
      setIsLoading(false);
    }
  };

  const showForecastStripLine = (current: ChartPoint[]) => {
    const baseLen = baseDataLengthRef.current;
    if (!current?.length || current.length <= baseLen) {
      setPrimaryXAxis((prev: any) => ({ ...prev, stripLines: [] }));
      return;
    }
    const start = current[baseLen].date;
    const end = current[current.length - 1].date;
    setPrimaryXAxis((prev: any) => ({
      ...prev,
      stripLines: [
        {
          start,
          end,
          visible: true,
          color: '#E0E0E0',
          opacity: 0.5,
          zIndex: 'Behind'
        }
      ]
    }));
  };

  const generatePrompt = (lastN: ChartPoint[]): string => {
    const lastDate = lastN[lastN.length - 1]?.date || new Date();
    const startDate = new Date(lastDate);
    startDate.setDate(startDate.getDate() + 1);

    let prompt = `Generate 35 realistic financial data points suitable for candlestick, OHLC, and line charts in ':' format.
Use the following format: yyyy-MM-dd: High: Low: Open: Close
Start from ${startDate.toISOString().slice(0, 10)} and increment by 1 day for each row.
`;

    for (const d of lastN) {
      const iso = new Date(d.date).toISOString().slice(0, 10);
      prompt += `${iso}: ${d.high}, ${d.low}, ${d.open}, ${d.close}\n`;
    }
    prompt += `
### STRICT OUTPUT REQUIREMENTS ###
- Generate EXACTLY 35 rows.
- Format: yyyy-MM-dd:High:Low:Open:Close
- Mix upward/downward trends; no missing/duplicate dates; no extra text.
- Values must be realistic and follow stock behavior.
`;
    return prompt;
  };

  const getChartStateSnapshot = () => ({
    primaryXAxis,
    primaryYAxis,
    legendSettings,
    chartArea,
    series: [
      {
        type: selectedSeriesType,
        xName: 'date',
        yName: 'close',
        high: 'high',
        low: 'low',
        open: 'open',
        close: 'close'
      }
    ],
    title: titleVal,
    subTitle: subTitleVal,
    selectedSymbol,
    selectedRange
  });

  const processForecast = async () => {
    if (!chartRef.current) return;
    showSpinnerById('chartSpinner');
    try {
      const beforeLen = chartData.length;
      const last10 = chartData.slice(Math.max(0, chartData.length - 10));
      const prompt = generatePrompt(last10);

      const chartHandle: any = chartRef.current;
      const proxiedChart = (chartHandle && typeof chartHandle.setProperties === 'function')
        ? chartHandle
        : (chartHandle?.chart ?? chartHandle);

      const aiDelta = await fetchAI(prompt, proxiedChart, getChartStateSnapshot(), chartData);
      //executeChartAction(aiDelta, proxiedChart);
      const newData: ChartPoint[] | undefined = aiDelta?.props?.series?.[0]?.dataSource;
      if (newData && newData.length > 0) {
        setChartData(newData);
        if (newData.length >= beforeLen) {
          baseDataLengthRef.current = beforeLen;
        }
        showForecastStripLine(newData);
      }
    } finally {
      hideSpinnerById('chartSpinner');
    }
  };
  function load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
      args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
      replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
  };

  const onAnimationComplete = (): void => {
    // Disable animation after the initial rendering animation completes,
    // so dropdown clicks and AI button updates render without animation.
    setEnableAnimation(false);
  };

  // For parity with Angular getDefaultInfo lookup (silently used; Angular template doesn't render info panel)
  void defaultInfo[selectedSymbol];

  return (
    <div className='control-pane'>
        <div className='control-section'>
          <div className="left-panel">
            <div className="symbol-row">
              <DropDownButtonComponent
                content={selectedSymbol}
                items={symbols}
                iconCss={getSelectedIconClass()}
                select={(e: any) => onStockItemSelected(e as any)}
                cssClass="e-primary"
              />
            </div>

            <div className="button-and-chart-controls">
              <div className="left-buttons">
                <div className="e-btn-group">
                  <ButtonComponent onClick={() => filterDataByMonths(3)}>3 Month</ButtonComponent>
                  <ButtonComponent onClick={() => filterDataByMonths(6)}>6 Month</ButtonComponent>
                  <ButtonComponent onClick={() => filterDataByMonths(12)}>1 Year</ButtonComponent>
                </div>
              </div>

              <div className="chart-controls">
                <DropDownListComponent
                  dataSource={seriesOptions as any}
                  placeholder="Select Chart Type"
                  value={selectedSeriesType as any}
                  change={(e: any) => onSeriesChanged(e)}
                  width="150px"
                  cssClass="ddl-range"
                />
                <ButtonComponent
                  isPrimary={true}
                  cssClass="chart-action-button"
                  onClick={() => processForecast()}
                  iconCss="e-icons e-ai-chat"
                />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <ChartComponent
                ref={chartRef}
                id="stock-chart"
                load={load.bind(this)}
                title={titleVal}
                subTitle={subTitleVal}
                primaryXAxis={primaryXAxis}
                primaryYAxis={primaryYAxis as any}
                legendSettings={legendSettings}
                tooltip={tooltip}
                height="520"
                chartArea={chartArea}
                enableAnimation={enableAnimation}
                animationComplete={onAnimationComplete}
              >
                <Inject
                  services={[
                    DateTime,
                    LineSeries,
                    CandleSeries,
                    HiloOpenCloseSeries,
                    Legend,
                    Tooltip,
                    StripLine
                  ]}
                />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={chartData as any}
                    type={selectedSeriesType}
                    xName="date"
                    yName="close"
                    high="high"
                    low="low"
                    open="open"
                    close="close"
                    name="Price"
                  />
                </SeriesCollectionDirective>
              </ChartComponent>

              <div id="chartSpinner" className={`chart-spinner-overlay${isLoading ? ' visible' : ''}`}>
                <div className="loader" />
              </div>
            </div>
          </div>
          
        </div>
    </div>
  );
};

export { AIStockForecasting, titleVal, subTitleVal, defaultInfo, seriesOptions };
// export type { SeriesType };
