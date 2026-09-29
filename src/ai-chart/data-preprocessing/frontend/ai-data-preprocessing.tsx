import * as React from 'react';
import { useRef, useState } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  LineSeries,
  Legend,
  Tooltip,
  AxisModel, MultiColoredLineSeries, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { executeChartAction } from '../model/chartAction';
import { fetchAI } from '../model/ai-input';
import './data-preprocessing.css';

function AIDataPreprocessing() {

  const chartRef = useRef<ChartComponent | null>(null);

  type ChartPoint = { time: Date; visitors: number | null; color?: string };

  // ----- Chart configuration (matches Angular component) -----
  const title = 'E-Commerce Website Traffic Data';
  const subTitle =
    'AI-powered data cleaning and preprocessing for tracking hourly website visitors';

  const primaryXAxis: AxisModel = {
    valueType: 'DateTime',
    minimum: new Date(2024, 6, 1, 0, 0, 0),
    maximum: new Date(2024, 6, 1, 23, 0, 0),
    labelFormat: 'h a',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
  };

  const primaryYAxis: AxisModel = { minimum: 140, maximum: 320, interval: 30 };

  const legendSettings = { visible: true, position: 'Top' as const };
  const chartArea = { border: { width: 0 } };
  const tooltip = { enable: true };
  const pointColorMapping = 'color';

  // ----- Original dataset (matches Angular originalList) -----
  const originalList: ChartPoint[] = [
    { time: new Date(2024, 6, 1, 0, 0, 0), visitors: 150 },
    { time: new Date(2024, 6, 1, 1, 0, 0), visitors: 160 },
    { time: new Date(2024, 6, 1, 2, 0, 0), visitors: 155 },
    { time: new Date(2024, 6, 1, 3, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 4, 0, 0), visitors: 170 },
    { time: new Date(2024, 6, 1, 5, 0, 0), visitors: 175 },
    { time: new Date(2024, 6, 1, 6, 0, 0), visitors: 145 },
    { time: new Date(2024, 6, 1, 7, 0, 0), visitors: 180 },
    { time: new Date(2024, 6, 1, 8, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 9, 0, 0), visitors: 185 },
    { time: new Date(2024, 6, 1, 10, 0, 0), visitors: 200 },
    { time: new Date(2024, 6, 1, 11, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 12, 0, 0), visitors: 220 },
    { time: new Date(2024, 6, 1, 13, 0, 0), visitors: 230 },
    { time: new Date(2024, 6, 1, 14, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 15, 0, 0), visitors: 250 },
    { time: new Date(2024, 6, 1, 16, 0, 0), visitors: 260 },
    { time: new Date(2024, 6, 1, 17, 0, 0), visitors: 270 },
    { time: new Date(2024, 6, 1, 18, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 19, 0, 0), visitors: 280 },
    { time: new Date(2024, 6, 1, 20, 0, 0), visitors: 250 },
    { time: new Date(2024, 6, 1, 21, 0, 0), visitors: 290 },
    { time: new Date(2024, 6, 1, 22, 0, 0), visitors: 300 },
    { time: new Date(2024, 6, 1, 23, 0, 0), visitors: null },
  ];

  const processChartData = async () => {
    if (!chartRef.current) return;
    showSpinnerById('chartSpinner');

    try {
      const prompt = generatePrompt(originalList);
      const aiData = await fetchAI(
        prompt,
        chartRef.current,
        getChartStateSnapshot(),
        originalList
      );
      //executeChartAction(aiData, chartRef.current);
      if (aiData?.props?.series?.[0]?.dataSource) {
        setChartData(aiData.props.series[0].dataSource);
      }
    } finally {
     hideSpinnerById('chartSpinner');
    }
  }

  // ----- Prompt + chart-state helpers (Angular private methods) -----
  function generatePrompt(data: ChartPoint[]): string {
    const fmt = (d: Date) =>
      `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d
        .getDate()
        .toString()
        .padStart(2, '0')}-${d.getHours().toString().padStart(2, '0')}-${d
        .getMinutes()
        .toString()
        .padStart(2, '0')}-${d.getSeconds().toString().padStart(2, '0')}`;

    const header =
      'Clean the following e-commerce website traffic data, resolve outliers and fill missing values:\n';
    const lines = data
      .map(
        (d) => `${fmt(d.time)}: ${d.visitors === null ? 'null' : d.visitors}`
      )
      .join('\n');
    const footer =
      '\nand the output cleaned data should be in the yyyy-MM-dd-HH-m-ss:Value format, no other explanation required';

    return header + lines + footer;
  }

  function load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
      args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
      replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
  };

  let [chartData, setChartData] = useState<ChartPoint[]>(
    originalList.map((p) => ({ ...p }))
  );

  function getChartStateSnapshot() {
    return {
      primaryXAxis: primaryXAxis,
      primaryYAxis: primaryYAxis,
      legendSettings: legendSettings,
      chartArea: chartArea,
      series: [
        {
          type: 'MultiColoredLine',
          xName: 'time',
          yName: 'visitors',
          pointColorMapping: pointColorMapping
        },
      ],
      title: title,
      subTitle: subTitle
    };
  }

    // Spinner helpers - mirror the Angular standalone helpers.
  const showSpinnerById = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('visible');
  };
  const hideSpinnerById = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('visible');
  };

  return (
      <div className='control-pane'>
        <div className='control-section'>
            <ChartComponent
              ref={chartRef}
              id="ai-chart"
              chartArea={chartArea}
              title={title}
              subTitle={subTitle}
              primaryXAxis={primaryXAxis}
              primaryYAxis={primaryYAxis}
              legendSettings={legendSettings}
              tooltip={tooltip}
              height="520"
              load={load.bind(this)}
            >
              <Inject services={[DateTime, MultiColoredLineSeries,LineSeries, Legend, Tooltip]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={chartData}
                  xName="time"
                  yName="visitors"
                  name="Visitors"
                  type="MultiColoredLine"
                  pointColorMapping={pointColorMapping}
                />
              </SeriesCollectionDirective>
            </ChartComponent>

            <div id="chartSpinner" className="chart-spinner-overlay">
              <div className="loader" />
            </div>

            <ButtonComponent
              className="ai-action-button"
              isPrimary
              iconCss="e-icons e-ai-chat"
              onClick={processChartData}
              title="AI Clean (fill missing values & resolve outliers)"
            />
           
          </div>
      </div>
  );
};

export { AIDataPreprocessing };
