import * as React from 'react';
import {
    AIAssistViewComponent,
    PromptRequestEventArgs,
    ToolbarItemClickedEventArgs,
    ToolbarSettingsModel
} from '@syncfusion/ej2-react-interactive-chat';
import {
    AccumulationChartComponent,
    AccumulationLegend,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective,
    AccumulationTooltip,
    AnnotationDirective,
    AnnotationsDirective,
    AreaSeries,
    AtrIndicator,
    BarSeries,
    BollingerBands,
    BubbleSeries,
    Category,
    ChartAnnotation,
    ChartComponent,
    ColumnSeries,
    Crosshair,
    DataLabel,
    DateTime,
    DateTimeCategory,
    EmaIndicator,
    ErrorBar,
    Export,
    FunnelSeries,
    Highlight,
    HiloOpenCloseSeries,
    HiloSeries,
    HistogramSeries,
    IndicatorDirective,
    IndicatorsDirective,
    Inject,
    Legend,
    LineSeries,
    Logarithmic,
    MacdIndicator,
    MomentumIndicator,
    MultiColoredAreaSeries,
    MultiColoredLineSeries,
    ParetoSeries,
    PieSeries,
    PolarSeries,
    PyramidSeries,
    RadarSeries,
    RangeAreaSeries,
    RangeColumnSeries,
    ScatterSeries,
    Selection,
    SeriesCollectionDirective,
    SeriesDirective,
    SmaIndicator,
    SplineAreaSeries,
    SplineRangeAreaSeries,
    SplineSeries,
    StackingAreaSeries,
    StackingBarSeries,
    StackingColumnSeries,
    StackingLineSeries,
    StackingStepAreaSeries,
    StepAreaSeries,
    StepLineSeries,
    StochasticIndicator,
    StripLine,
    TmaIndicator,
    Tooltip,
    Trendlines,
    WaterfallSeries,
    Zoom
} from '@syncfusion/ej2-react-charts';
import { chartSuggestions } from '../model/prompt-data';
import { fetchChartConfig } from '../model/ai-input';
import './generate-chart.css';

const PALETTE: string[] = [
    '#1089E9', '#08CDAA', '#F58400', '#9656FF', '#F9C200',
    '#F954A3', '#05BB3D', '#06B1E2', '#FF4E4E'
];

export type AxisType = 'category' | 'numerical' | 'datetime' | 'datetimecategory' | 'logarithmic';
export type ChartFamily = 'cartesian' | 'circular';
export type SeriesType =
    'line' | 'column' | 'bar' | 'area' | 'spline' | 'stepline' | 'steparea' | 'splinearea' |
    'multicoloredline' | 'multicoloredarea' | 'rangecolumn' | 'rangearea' | 'splinerangearea' |
    'hilo' | 'hiloopenclose' | 'bubble' | 'scatter' | 'stackingcolumn' | 'stackingcolumn100' |
    'stackingbar' | 'stackingbar100' | 'stackingarea' | 'stackingarea100' | 'stackingline' |
    'stackingline100' | 'stackingsteparea' | 'pareto' | 'polar' | 'radar' | 'waterfall' |
    'histogram' | 'pie' | 'doughnut' | 'funnel' | 'pyramid';
export type ExportType = 'PNG' | 'JPEG' | 'SVG' | 'PDF';

export interface ChartDataPoint extends Record<string, any> {
    xvalue: string | number | Date;
    yvalue: number;
    high?: number;
    low?: number;
    open?: number;
    close?: number;
    volume?: number;
    size?: number;
    minimum?: number;
    maximum?: number;
    pointColor?: string;
}

export interface AxisConfig extends Record<string, any> {
    type: AxisType;
    title?: string;
    labelRotation?: number;
    min?: number;
    max?: number;
    stripLines?: Record<string, any>[];
}

export interface SeriesConfig extends Record<string, any> {
    type: SeriesType;
    name: string;
    dataSource: ChartDataPoint[];
    tooltip?: boolean;
    fill?: string;
    width?: number;
    marker?: Record<string, any>;
    innerRadius?: string;
    radius?: string;
    opacity?: number;
    dashArray?: string;
    dataLabel?: Record<string, any>;
    errorBar?: Record<string, any>;
    trendlines?: Array<Record<string, any>>;
    animation?: Record<string, any>;
    high?: string;
    low?: string;
    open?: string;
    close?: string;
    volume?: string;
    size?: string;
}

export interface AnnotationConfig extends Record<string, any> {
    content: string;
    coordinateUnits?: string;
    region?: string;
    x?: string | number | Date;
    y?: string | number;
}

export interface IndicatorConfig extends Record<string, any> {
    type: string;
    seriesName?: string;
    period?: number;
    xName?: string;
    close?: string;
    high?: string;
    low?: string;
    open?: string;
    volume?: string;
    fill?: string;
    width?: number;
    dataSource?: ChartDataPoint[];
}

export interface ChartConfig extends Record<string, any> {
    chartType: ChartFamily;
    title: string;
    showLegend?: boolean;
    sideBySidePlacement?: boolean;
    xAxis?: AxisConfig[];
    yAxis?: AxisConfig[];
    series: SeriesConfig[];
    tooltip?: Record<string, any>;
    crosshair?: Record<string, any>;
    zoomSettings?: Record<string, any>;
    selectionMode?: string;
    highlightMode?: string;
    annotations?: AnnotationConfig[];
    indicators?: IndicatorConfig[];
    legendSettings?: Record<string, any>;
    chartArea?: Record<string, any>;
    palettes?: string[];
}

export interface CodeViewConfig {
    id: 'changes' | 'complete';
    title: string;
    description: string;
    code: string;
}
export interface CodeToolConfig {
    views: CodeViewConfig[];
}
export interface ChangeSummaryConfig {
    changes: string[];
}
export interface AssistBlock {
    blockType: 'text' | 'tool';
    content?: string;
    toolName?: 'chart-tool' | 'code-tool' | 'change-summary-tool';
    props?: ChartConfig | CodeToolConfig | ChangeSummaryConfig;
}

export interface HistoryMessage {
    id: string;
    prompt: string;
    blocks: AssistBlock[];
    chartConfig: ChartConfig | null;
    createdAt: Date;
}

export interface HistorySession {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: HistoryMessage[];
}

export interface AIChartState {
    histories: HistorySession[];
    currentSession: HistorySession;
    currentHistoryId: string | null;
    showHistory: boolean;
    chatKey: number;
    latestChartConfig: ChartConfig | null;
}

interface ChartPreviewProps {
    config: ChartConfig;
    theme: string;
}

interface ChartPreviewState {
    status: string;
    exportType: string;
}
interface CodePreviewProps { config: CodeToolConfig; }
interface ChangeSummaryProps { config: ChangeSummaryConfig; }

function cloneValue<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeSeriesType(value: unknown): SeriesType {
    const normalized: string = String(value || 'line').toLowerCase().replace(/[\s-]/g, '');
    const supported: SeriesType[] = [
        'line', 'column', 'bar', 'area', 'spline', 'stepline', 'steparea', 'splinearea',
        'multicoloredline', 'multicoloredarea', 'rangecolumn', 'rangearea', 'splinerangearea',
        'hilo', 'hiloopenclose', 'bubble', 'scatter', 'stackingcolumn', 'stackingcolumn100',
        'stackingbar', 'stackingbar100', 'stackingarea', 'stackingarea100', 'stackingline',
        'stackingline100', 'stackingsteparea', 'pareto', 'polar', 'radar', 'waterfall', 'histogram',
        'pie', 'doughnut', 'funnel', 'pyramid'
    ];
    return supported.includes(normalized as SeriesType) ? normalized as SeriesType : 'line';
}

function normalizeAxisType(value: unknown, fallback: AxisType): AxisType {
    const normalized: string = String(value || fallback).toLowerCase().replace(/[\s-]/g, '');
    switch (normalized) {
    case 'numerical':
    case 'number':
    case 'double':
        return 'numerical';
    case 'datetime':
    case 'date':
        return 'datetime';
    case 'datetimecategory':
        return 'datetimecategory';
    case 'logarithmic':
    case 'log':
        return 'logarithmic';
    default:
        return 'category';
    }
}

function normalizeDataSource(value: unknown): ChartDataPoint[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.reduce((points: ChartDataPoint[], point: any, index: number) => {
        const xvalue: unknown = point?.xvalue ?? point?.xValue ?? point?.x ?? point?.category ?? point?.label ?? index;
        const rawYValue: unknown = point?.yvalue ?? point?.yValue ?? point?.y ?? point?.value;
        const yvalue: number = typeof rawYValue === 'number' ? rawYValue : Number(rawYValue);
        if (xvalue !== undefined && xvalue !== null && Number.isFinite(yvalue)) {
            const normalizedPoint: ChartDataPoint = { ...point, xvalue: xvalue as string | number | Date, yvalue };
            ['high', 'low', 'open', 'close', 'volume', 'size', 'minimum', 'maximum'].forEach((field: string) => {
                const numericValue: number = Number(point?.[field]);
                if (Number.isFinite(numericValue)) {
                    (normalizedPoint as any)[field] = numericValue;
                }
            });
            points.push(normalizedPoint);
        }
        return points;
    }, []);
}

function normalizeChartConfig(value: any): ChartConfig | null {
    const source: any = value?.config || value?.props || value?.ChartConfig || value?.chartConfig || value;
    if (!source || typeof source !== 'object') {
        return null;
    }
    let rawSeries: any[] = Array.isArray(source.series) ? source.series : [];
    if (!rawSeries.length && Array.isArray(source.dataSource || source.data)) {
        rawSeries = [{
            type: source.type || source.chartType,
            name: source.name || source.title || 'Series',
            dataSource: source.dataSource || source.data,
            tooltip: source.enableTooltip
        }];
    }
    const series: SeriesConfig[] = rawSeries.reduce((items: SeriesConfig[], item: any, index: number) => {
        const dataSource: ChartDataPoint[] = normalizeDataSource(item?.dataSource || item?.data);
        if (!dataSource.length) {
            return items;
        }
        items.push({
            type: normalizeSeriesType(item?.type || source.chartType),
            name: String(item?.name || `Series ${index + 1}`),
            dataSource,
            tooltip: item?.tooltip !== false,
            fill: item?.fill,
            width: typeof item?.width === 'number' ? item.width : 2,
            marker: item?.marker || { visible: true, width: 7, height: 7 },
            innerRadius: item?.innerRadius,
            radius: item?.radius,
            opacity: item?.opacity,
            dashArray: item?.dashArray,
            dataLabel: item?.dataLabel,
            errorBar: item?.errorBar,
            trendlines: item?.trendlines,
            animation: item?.animation,
            high: item?.high || 'high',
            low: item?.low || 'low',
            open: item?.open || 'open',
            close: item?.close || 'close',
            volume: item?.volume || 'volume',
            size: item?.size || 'size'
        });
        return items;
    }, []);
    if (!series.length) {
        return null;
    }
    const circular: boolean = source.chartType === 'circular' || series.some((item: SeriesConfig) =>
        ['pie', 'doughnut', 'funnel', 'pyramid'].includes(item.type));
    if (circular && series.some((item: SeriesConfig) => !['pie', 'doughnut', 'funnel', 'pyramid'].includes(item.type))) {
        return null;
    }
    const config: ChartConfig = {
        chartType: circular ? 'circular' : 'cartesian',
        title: String(source.title || 'Generated Chart'),
        showLegend: source.showLegend !== false && source.enableLegend !== false,
        sideBySidePlacement: source.sideBySidePlacement !== false,
        tooltip: source.tooltip || { enable: source.enableTooltip !== false },
        crosshair: source.crosshair,
        zoomSettings: source.zoomSettings,
        selectionMode: source.selectionMode || 'None',
        highlightMode: source.highlightMode || 'None',
        annotations: Array.isArray(source.annotations) ? source.annotations : [],
        indicators: Array.isArray(source.indicators) ? source.indicators : [],
        legendSettings: source.legendSettings || {},
        chartArea: source.chartArea || { border: { width: 0 } },
        palettes: Array.isArray(source.palettes) ? source.palettes : undefined,
        series
    };
    if (!circular) {
        const rawXAxis: any = Array.isArray(source.xAxis) ? source.xAxis[0] : null;
        const rawYAxis: any = Array.isArray(source.yAxis) ? source.yAxis[0] : null;
        config.xAxis = [{
            type: normalizeAxisType(rawXAxis?.type, 'category'),
            title: rawXAxis?.title || source.xAxisTitle || 'Category',
            labelRotation: Number(rawXAxis?.labelRotation) || 0,
            stripLines: Array.isArray(rawXAxis?.stripLines) ? rawXAxis.stripLines : []
        }];
        config.yAxis = [{
            type: normalizeAxisType(rawYAxis?.type, 'numerical'),
            title: rawYAxis?.title || source.yAxisTitle || 'Value',
            min: Number.isFinite(Number(rawYAxis?.min)) ? Number(rawYAxis.min) : undefined,
            max: Number.isFinite(Number(rawYAxis?.max)) ? Number(rawYAxis.max) : undefined,
            stripLines: Array.isArray(rawYAxis?.stripLines) ? rawYAxis.stripLines : []
        }];
    }
    return config;
}

function getToolValue(args: any): any {
    return args?.config?.props || args?.config || args?.props?.props || args?.props || args;
}
function getToolChartConfig(args: any): ChartConfig | null {
    const source: any = args?.config?.ChartConfig || args?.config?.chartConfig || args?.config?.props?.ChartConfig ||
        args?.config?.props?.chartConfig || args?.props?.ChartConfig || args?.props?.chartConfig || getToolValue(args);
    return normalizeChartConfig(source);
}
function compareConfigs(previous: ChartConfig, updated: ChartConfig): string[] {
    const changes: string[] = [];
    (['title', 'chartType', 'showLegend', 'tooltip', 'crosshair', 'zoomSettings', 'selectionMode', 'highlightMode',
        'annotations', 'indicators', 'xAxis', 'yAxis', 'chartArea', 'palettes', 'series'] as Array<keyof ChartConfig>)
        .forEach((key: keyof ChartConfig): void => {
            if (JSON.stringify(previous[key]) !== JSON.stringify(updated[key])) {
                changes.push(`${String(key)} updated`);
            }
        });
    return changes;
}
function generateReactCode(config: ChartConfig): string {
    const json: string = JSON.stringify(config, null, 4);
    const circular: boolean = config.chartType === 'circular';
    if (circular) {
        return `import * as React from 'react';\nimport { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,\n    AccumulationLegend, AccumulationTooltip, Export, FunnelSeries, Inject, PieSeries, PyramidSeries\n} from '@syncfusion/ej2-react-charts';\n\nexport class GeneratedChart extends React.Component {\n    public chartConfig = ${json};\n\n    public render(): JSX.Element {\n        return (\n            <AccumulationChartComponent width="100%" height="400px" title={this.chartConfig.title}\n                tooltip={this.chartConfig.tooltip} legendSettings={{ visible: this.chartConfig.showLegend !== false }}>\n                <Inject services={[PieSeries, FunnelSeries, PyramidSeries, AccumulationLegend, AccumulationTooltip, Export]} />\n                <AccumulationSeriesCollectionDirective>\n                    {this.chartConfig.series.map((series, index) => (\n                        <AccumulationSeriesDirective key={\`series-\${index}\`} dataSource={series.dataSource}\n                            xName="xvalue" yName="yvalue" name={series.name}\n                            type={series.type === 'funnel' ? 'Funnel' : series.type === 'pyramid' ? 'Pyramid' : 'Pie'}\n                            innerRadius={series.innerRadius || (series.type === 'doughnut' ? '70%' : '0%')}\n                            radius={series.radius || '80%'} dataLabel={series.dataLabel} />\n                    ))}\n                </AccumulationSeriesCollectionDirective>\n            </AccumulationChartComponent>\n        );\n    }\n}`;
    }
    return `import * as React from 'react';\nimport { ChartComponent, SeriesCollectionDirective, SeriesDirective, Category, ColumnSeries, Export, Inject,\n    Legend, LineSeries, BarSeries, AreaSeries, SplineSeries, Tooltip\n} from '@syncfusion/ej2-react-charts';\n\nexport class GeneratedChart extends React.Component {\n    public chartConfig = ${json};\n\n    public render(): JSX.Element {\n        const xAxis = this.chartConfig.xAxis?.[0];\n        const yAxis = this.chartConfig.yAxis?.[0];\n        return (\n            <ChartComponent width="100%" height="400px" title={this.chartConfig.title}\n                primaryXAxis={{ ...xAxis, valueType: 'Category' }}\n                primaryYAxis={{ ...yAxis, valueType: 'Double', minimum: yAxis?.min, maximum: yAxis?.max }}\n                tooltip={this.chartConfig.tooltip} legendSettings={{ visible: this.chartConfig.showLegend !== false }}>\n                <Inject services={[LineSeries, ColumnSeries, BarSeries, AreaSeries, SplineSeries, Category, Legend, Tooltip, Export]} />\n                <SeriesCollectionDirective>\n                    {this.chartConfig.series.map((series, index) => (\n                        <SeriesDirective key={\`series-\${index}\`} dataSource={series.dataSource} xName="xvalue"\n                            yName="yvalue" name={series.name} type={series.type as any}\n                            fill={series.fill} width={series.width || 2} marker={series.marker} />\n                    ))}\n                </SeriesCollectionDirective>\n            </ChartComponent>\n        );\n    }\n}`;
}
function generateModifiedReactCode(prompt: string, previous: ChartConfig, updated: ChartConfig): string {
    const comments: string = compareConfigs(previous, updated).map((change: string): string => `// ${change}`).join('\n');
    return `// Applied request: ${prompt}\n${comments}\n\n${generateReactCode(updated)}`;
}
function mapSeriesType(type: SeriesType): any {
    const values: Record<SeriesType, string> = {
        line: 'Line', column: 'Column', bar: 'Bar', area: 'Area', spline: 'Spline', stepline: 'StepLine',
        steparea: 'StepArea', splinearea: 'SplineArea', multicoloredline: 'MultiColoredLine',
        multicoloredarea: 'MultiColoredArea', rangecolumn: 'RangeColumn', rangearea: 'RangeArea',
        splinerangearea: 'SplineRangeArea', hilo: 'Hilo', hiloopenclose: 'HiloOpenClose', bubble: 'Bubble',
        scatter: 'Scatter', stackingcolumn: 'StackingColumn', stackingcolumn100: 'StackingColumn100',
        stackingbar: 'StackingBar', stackingbar100: 'StackingBar100', stackingarea: 'StackingArea',
        stackingarea100: 'StackingArea100', stackingline: 'StackingLine', stackingline100: 'StackingLine100',
        stackingsteparea: 'StackingStepArea', pareto: 'Pareto', polar: 'Polar', radar: 'Radar',
        waterfall: 'Waterfall', histogram: 'Histogram', pie: 'Pie', doughnut: 'Pie', funnel: 'Funnel', pyramid: 'Pyramid'
    };
    return values[type];
}

function mapAccumulationType(type: SeriesType): 'Pie' | 'Funnel' | 'Pyramid' {
    switch (type) {
    case 'funnel':
        return 'Funnel';
    case 'pyramid':
        return 'Pyramid';
    default:
        return 'Pie';
    }
}

function mapAxisType(type: AxisType): any {
    switch (type) {
    case 'numerical':
        return 'Double';
    case 'datetime':
        return 'DateTime';
    case 'datetimecategory':
        return 'DateTimeCategory';
    case 'logarithmic':
        return 'Logarithmic';
    default:
        return 'Category';
    }
}

function getCurrentChartTheme(): string {
    const routeTheme: string = location.hash.split('/')[1]?.toLowerCase() || '';
    const classNames: string = `${document.documentElement.className} ${document.body.className}`.toLowerCase();
    const themeSource: string = routeTheme || classNames;
    if (themeSource.includes('highcontrast')) return 'HighContrast';
    if (themeSource.includes('fluent2-dark')) return 'Fluent2Dark';
    if (themeSource.includes('fluent-dark')) return 'FluentDark';
    if (themeSource.includes('material3-dark')) return 'Material3Dark';
    if (themeSource.includes('bootstrap5.3-dark') || themeSource.includes('bootstrap5-dark')) return 'Bootstrap5Dark';
    if (themeSource.includes('tailwind3-dark')) return 'Tailwind3Dark';
    if (themeSource.includes('tailwind-dark')) return 'TailwindDark';
    if (themeSource.includes('dark')) return 'Material3Dark';
    if (themeSource.includes('fluent2')) return 'Fluent2';
    if (themeSource.includes('fluent')) return 'Fluent';
    if (themeSource.includes('bootstrap5')) return 'Bootstrap5';
    if (themeSource.includes('tailwind3')) return 'Tailwind3';
    if (themeSource.includes('tailwind')) return 'Tailwind';
    return 'Material3';
}
function isDarkChartTheme(theme: string): boolean {
    return theme === 'HighContrast' || theme.endsWith('Dark');
}

function getAnnotationContent(annotation: AnnotationConfig): JSX.Element {
    return <div className="chartgenerator-chart-annotation">{annotation.content}</div>;
}

function mapIndicatorType(type: string): any {
    return type;
}

class GeneratedCodePreview extends React.PureComponent<CodePreviewProps> {
    private copyCode = (code: string): void => { if (navigator.clipboard) void navigator.clipboard.writeText(code); };
    public render(): JSX.Element {
        const views: CodeViewConfig[] = Array.isArray(this.props.config?.views) ? this.props.config.views : [];
        if (!views.length) {
            return <div className="chartgenerator-tool-error">Unable to render the generated code.</div>;
        }
        return <div className="chartgenerator-generated-code-container">
            <div className="chartgenerator-generated-code-header"><strong>React standalone samples</strong></div>
            <div className={`chartgenerator-generated-code-grid ${views.length === 1 ? 'single' : ''}`}>
                {views.map((view: CodeViewConfig) => <section key={view.id} className="chartgenerator-generated-code-panel">
                    <div className="chartgenerator-generated-code-panel-header"><div><strong>{view.title}</strong>
                        <div className="chartgenerator-generated-code-description">{view.description}</div></div>
                        <button type="button" className="chartgenerator-copy-code-button" onClick={(): void => this.copyCode(view.code)}>Copy code</button>
                    </div><pre className="chartgenerator-generated-code-wrapper" tabIndex={0}><code>{view.code}</code></pre>
                </section>)}
            </div>
        </div>;
    }
}
class GeneratedChangeSummary extends React.PureComponent<ChangeSummaryProps> {
    public render(): JSX.Element { return <div className="chartgenerator-change-summary"><strong>Changes applied</strong>
        <ul>{this.props.config.changes.map((change: string, index: number) => <li key={`${change}-${index}`}>{change}</li>)}</ul></div>; }
}
class GeneratedChartPreview extends React.PureComponent<ChartPreviewProps, ChartPreviewState> {
    private chartInstance: ChartComponent | null = null;
    private accumulationInstance: AccumulationChartComponent | null = null;

    public state: ChartPreviewState = { status: '', exportType: '' };

    public componentDidMount(): void {
        window.requestAnimationFrame((): void => {
            window.requestAnimationFrame((): void => {
                this.refreshChart();
            });
        });
    }

    public componentDidUpdate(previousProps: ChartPreviewProps): void {
        if (previousProps.theme !== this.props.theme) {
            window.requestAnimationFrame((): void => {
                window.requestAnimationFrame((): void => {
                    this.refreshChart();
                });
            });
        }
    }

    public componentWillUnmount(): void {
        if (this.chartInstance && !this.chartInstance.isDestroyed) {
            this.chartInstance.destroy();
        }
        if (this.accumulationInstance && !this.accumulationInstance.isDestroyed) {
            this.accumulationInstance.destroy();
        }
        this.chartInstance = null;
        this.accumulationInstance = null;
    }

    private refreshChart(): void {
        const chart: any = this.props.config.chartType === 'circular'
            ? this.accumulationInstance
            : this.chartInstance;
        if (chart && !chart.isDestroyed && typeof chart.refresh === 'function') {
            chart.refresh();
        }
    }

    private getAccumulationDataSource(series: SeriesConfig, seriesIndex: number): ChartDataPoint[] {
        const palette: string[] = this.props.config.palettes?.length ? this.props.config.palettes : PALETTE;
        return series.dataSource.map((point: ChartDataPoint, pointIndex: number): ChartDataPoint => ({
            ...point,
            pointColor: point.pointColor || series.fill || palette[(seriesIndex + pointIndex) % palette.length]
        }));
    }

    private exportChart = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const type: ExportType = event.target.value as ExportType;
        this.setState({ exportType: '' });
        const chart: any = this.props.config.chartType === 'circular' ? this.accumulationInstance : this.chartInstance;
        if (!chart || chart.isDestroyed || !chart.exportModule) {
            this.setState({ status: 'The chart is not ready for export.' });
            return;
        }
        chart.exportModule.export(type, this.getFileName());
        this.setState({ status: `${type} export started.` });
    };

    private printChart = (): void => {
        const chart: any = this.props.config.chartType === 'circular' ? this.accumulationInstance : this.chartInstance;
        if (!chart || chart.isDestroyed || typeof chart.print !== 'function') {
            this.setState({ status: 'The chart is not ready for printing.' });
            return;
        }
        chart.print();
        this.setState({ status: 'Print dialog opened.' });
    };

    private getFileName(): string {
        return this.props.config.title.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'Generated-Chart';
    }

    public render(): JSX.Element {
        const { config, theme } = this.props;
        const xAxis: AxisConfig = config.xAxis?.[0] || { type: 'category', title: 'Category' };
        const yAxis: AxisConfig = config.yAxis?.[0] || { type: 'numerical', title: 'Value' };
        return (
            <div className="chartgenerator-generated-chart-container">
                <div className="chartgenerator-generated-chart-header">
                    <strong>Chart preview</strong>
                    <div className="chartgenerator-chart-preview-actions">
                        <select className="chartgenerator-chart-export-select" aria-label="Export chart" value={this.state.exportType} onChange={this.exportChart}>
                            <option value="" disabled={true}>Export</option>
                            <option value="PNG">PNG</option>
                            <option value="JPEG">JPEG</option>
                            <option value="SVG">SVG</option>
                            <option value="PDF">PDF</option>
                        </select>
                        <button className="chartgenerator-chart-print-button" type="button" onClick={this.printChart}>Print</button>
                    </div>
                </div>
                <div className="chartgenerator-chart-preview-status" role="status" aria-live="polite">{this.state.status}</div>
                <div className="chartgenerator-chart-tool-container">
                    {config.chartType === 'circular' ? (
                        <AccumulationChartComponent
                            ref={(instance: AccumulationChartComponent | null): void => { this.accumulationInstance = instance; }}
                            width="100%"
                            height="396px"
                            title={config.title}
                            theme={theme as any}
                            tooltip={{ ...config.tooltip, enable: config.tooltip?.enable !== false }}
                            legendSettings={{ ...config.legendSettings, visible: config.showLegend !== false, position: 'Bottom' }}>
                            <Inject services={[PieSeries, FunnelSeries, PyramidSeries, AccumulationLegend, AccumulationTooltip, Export]} />
                            <AccumulationSeriesCollectionDirective>
                                {config.series.map((series: SeriesConfig, index: number) => (
                                    <AccumulationSeriesDirective
                                        key={`${series.name}-${index}`}
                                        dataSource={this.getAccumulationDataSource(series, index)}
                                        xName="xvalue"
                                        yName="yvalue"
                                        name={series.name}
                                        type={mapAccumulationType(series.type)}
                                        innerRadius={series.innerRadius || (series.type === 'doughnut' ? '70%' : '0%')}
                                        radius={series.radius || '80%'}
                                        pointColorMapping="pointColor"
                                        opacity={series.opacity}
                                        dataLabel={series.dataLabel}
                                    />
                                ))}
                            </AccumulationSeriesCollectionDirective>
                        </AccumulationChartComponent>
                    ) : (
                        <ChartComponent
                            ref={(instance: ChartComponent | null): void => { this.chartInstance = instance; }}
                            width="100%"
                            height="396px"
                            title={config.title}
                            theme={theme as any}
                            primaryXAxis={{
                                valueType: mapAxisType(xAxis.type), title: xAxis.title, labelRotation: xAxis.labelRotation || 0,
                                labelIntersectAction: 'Rotate45', majorGridLines: { width: 0 }, stripLines: xAxis.stripLines || []
                            }}
                            primaryYAxis={{
                                valueType: mapAxisType(yAxis.type), title: yAxis.title, minimum: yAxis.min, maximum: yAxis.max,
                                majorGridLines: { width: 1 }, stripLines: yAxis.stripLines || []
                            }}
                            tooltip={{ ...config.tooltip, enable: config.tooltip?.enable !== false }}
                            crosshair={config.crosshair}
                            zoomSettings={config.zoomSettings}
                            selectionMode={(config.selectionMode || 'None') as any}
                            highlightMode={(config.highlightMode || 'None') as any}
                            legendSettings={{ ...config.legendSettings, visible: config.showLegend !== false }}
                            chartArea={config.chartArea || { border: { width: 0 } }}
                            palettes={config.palettes || PALETTE}
                            enableSideBySidePlacement={config.sideBySidePlacement !== false}>
                            <Inject services={[
                                LineSeries, ColumnSeries, BarSeries, SplineSeries, AreaSeries, StepLineSeries, StepAreaSeries,
                                SplineAreaSeries, MultiColoredLineSeries, MultiColoredAreaSeries, RangeColumnSeries,
                                RangeAreaSeries, SplineRangeAreaSeries, HiloSeries, HiloOpenCloseSeries, BubbleSeries, ScatterSeries,
                                StackingColumnSeries, StackingBarSeries, StackingAreaSeries, StackingLineSeries,
                                StackingStepAreaSeries, ParetoSeries, PolarSeries, RadarSeries, WaterfallSeries, HistogramSeries,
                                Legend, Tooltip, Category, DateTime, DateTimeCategory, Logarithmic, Crosshair, Zoom, Selection,
                                Highlight, StripLine, ChartAnnotation, DataLabel, ErrorBar, Trendlines, SmaIndicator, EmaIndicator,
                                TmaIndicator, AtrIndicator, MacdIndicator, MomentumIndicator, StochasticIndicator, BollingerBands, Export
                            ]} />
                            <AnnotationsDirective>
                                {(config.annotations || []).map((annotation: AnnotationConfig, index: number) => (
                                    <AnnotationDirective
                                        key={`annotation-${index}`}
                                        content={getAnnotationContent(annotation)}
                                        coordinateUnits={(annotation.coordinateUnits || 'Point') as any}
                                        region={(annotation.region || 'Chart') as any}
                                        x={annotation.x as any}
                                        y={annotation.y as any}
                                    />
                                ))}
                            </AnnotationsDirective>
                            <IndicatorsDirective>
                                {(config.indicators || []).map((indicator: IndicatorConfig, index: number) => (
                                    <IndicatorDirective
                                        key={`indicator-${index}`}
                                        type={mapIndicatorType(indicator.type)}
                                        seriesName={indicator.seriesName || config.series[0]?.name}
                                        dataSource={indicator.dataSource || config.series[0]?.dataSource}
                                        xName={indicator.xName || 'xvalue'}
                                        close={indicator.close || 'yvalue'}
                                        high={indicator.high || 'high'}
                                        low={indicator.low || 'low'}
                                        open={indicator.open || 'open'}
                                        volume={indicator.volume || 'volume'}
                                        period={indicator.period || 14}
                                        fill={indicator.fill || '#6063ff'}
                                        width={indicator.width || 2}
                                    />
                                ))}
                            </IndicatorsDirective>
                            <SeriesCollectionDirective>
                                {config.series.map((series: SeriesConfig, index: number) => (
                                    <SeriesDirective
                                        key={`${series.name}-${index}`}
                                        dataSource={series.dataSource}
                                        xName="xvalue"
                                        yName="yvalue"
                                        name={series.name}
                                        type={mapSeriesType(series.type)}
                                        fill={series.fill || PALETTE[index % PALETTE.length]}
                                        width={series.width || 2}
                                        marker={series.marker || { visible: true, width: 7, height: 7 }}
                                        opacity={series.opacity}
                                        dashArray={series.dashArray}
                                        high={series.high}
                                        low={series.low}
                                        open={series.open}
                                        close={series.close}
                                        volume={series.volume}
                                        size={series.size}
                                        errorBar={series.errorBar}
                                        trendlines={series.trendlines}
                                        animation={series.animation}
                                    />
                                ))}
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    )}
                </div>
            </div>
        );
    }
}

export class AIChartGeneration extends React.Component<{}, AIChartState> {
    private assistInstance: AIAssistViewComponent | null = null;
    private abortController: AbortController | null = null;
    private requestSequence: number = 0;
    private themeObserver: MutationObserver | null = null;
    private currentTheme: string = getCurrentChartTheme();
    private pendingHistorySession: HistorySession | null = null;

    public state: AIChartState = {
        histories: [], currentSession: this.createSession(), currentHistoryId: null,
        showHistory: false, chatKey: 0, latestChartConfig: null
    };

    public bannerTemplate: string = [
        '<div class="chartgenerator-banner-content">',
        '  <div class="e-icons e-assistview-icon"></div>',
        '  <h2>AI-Powered Chart Creation and Editing</h2>',
        '  <p>Generate chart code, create visual previews, and modify charts using natural language.</p>',
        '</div>'
    ].join('');

    public assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [
            { iconCss: 'e-icons e-edit-notes', align: 'Right', tooltip: 'Start new chat' },
            { iconCss: 'e-icons e-menu', align: 'Right', tooltip: 'Show chat history' }
        ],
        itemClicked: this.toolbarItemClicked.bind(this)
    };

    public componentDidMount(): void {
        this.observeTheme();
    }

    public componentWillUnmount(): void {
        this.requestSequence += 1;
        if (this.abortController) {
            this.abortController.abort();
        }
        if (this.themeObserver) {
            this.themeObserver.disconnect();
        }
        this.pendingHistorySession = null;
        this.assistInstance = null;
    }

    public toolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
        const icon: string = String(args.item?.iconCss || '');
        if (icon.includes('e-menu')) {
            this.setState((previous: AIChartState) => ({ showHistory: !previous.showHistory }));
        } else if (icon.includes('e-edit-notes')) {
            this.startNewChat();
        }
    }

    private observeTheme(): void {
        this.themeObserver = new MutationObserver((): void => {
            const theme: string = getCurrentChartTheme();
            if (theme !== this.currentTheme) {
                this.currentTheme = theme;
                this.forceUpdate();
            }
        });
        this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

    private registerToolUIs(): void {
        if (!this.assistInstance) {
            return;
        }
        const ChartTemplate = (args: any): JSX.Element => {
            const config: ChartConfig | null = getToolChartConfig(args);
            return config ? <GeneratedChartPreview config={config} theme={this.currentTheme} />
                : <div className="chartgenerator-tool-error">Unable to render the chart because the configuration is invalid.</div>;
        };
        const CodeTemplate = (args: any): JSX.Element => <GeneratedCodePreview config={getToolValue(args) as CodeToolConfig} />;
        const ChangeTemplate = (args: any): JSX.Element => <GeneratedChangeSummary config={getToolValue(args) as ChangeSummaryConfig} />;
        this.assistInstance.registerToolUI({ toolName: 'chart-tool', template: ChartTemplate, handler: (): void => undefined });
        this.assistInstance.registerToolUI({ toolName: 'code-tool', template: CodeTemplate, handler: (): void => undefined });
        this.assistInstance.registerToolUI({ toolName: 'change-summary-tool', template: ChangeTemplate, handler: (): void => undefined });
    }

    private createModificationPrompt(prompt: string, config: ChartConfig): string {
        return [
            'Modify the existing chart configuration below.',
            'Preserve every property, series, data point, axis, title, feature, and style not explicitly changed.',
            'Return the complete two-block response required by the system prompt.',
            'EXISTING CHART CONFIGURATION:',
            JSON.stringify(config, null, 2),
            'USER REQUEST:',
            prompt
        ].join('\n');
    }

    private getResponseObject(reply: any): any {
        if (reply && typeof reply === 'object' && Array.isArray(reply.blocks)) {
            return reply;
        }
        const raw: unknown = reply?.response ?? reply?.data ?? reply?.result ?? reply;
        if (raw && typeof raw === 'object') {
            return raw;
        }
        if (typeof raw !== 'string' || !raw.trim()) {
            return null;
        }
        const normalized: string = raw.replace(/^\uFEFF/, '').trim();
        const fenced: string | undefined = normalized.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();
        const candidate: string = fenced || normalized.slice(normalized.indexOf('{'), normalized.lastIndexOf('}') + 1);
        try {
            return JSON.parse(candidate);
        } catch {
            return null;
        }
    }

    private normalizeBlocks(value: any, previous: ChartConfig | null, prompt: string):
        { blocks: AssistBlock[]; config: ChartConfig | null } | null {
        const response: any = this.getResponseObject(value) || value;
        const blocks: any[] = Array.isArray(response?.blocks) ? response.blocks : [];
        const textBlock: any = blocks.find((block: any) => block?.blockType === 'text');
        const toolBlock: any = blocks.find((block: any) => block?.blockType === 'tool' && block?.toolName === 'chart-tool');
        const config: ChartConfig | null = normalizeChartConfig(toolBlock?.props || response?.ChartConfig);
        if (!config) return null;
        const output: AssistBlock[] = [{ blockType: 'text', content: String(textBlock?.content || response?.Text || 'The chart is ready.') }];
        const views: CodeViewConfig[] = [];
        if (previous) views.push({ id: 'changes', title: 'Modified standalone React sample',
            description: 'Complete runnable React TypeScript sample after the requested changes.',
            code: generateModifiedReactCode(prompt, previous, config) });
        views.push({ id: 'complete', title: 'Complete React sample',
            description: 'Complete runnable React TypeScript sample for the current chart.', code: generateReactCode(config) });
        output.push({ blockType: 'tool', toolName: 'code-tool', props: { views } });
        output.push({ blockType: 'tool', toolName: 'chart-tool', props: config });
        const changes: string[] = previous ? compareConfigs(previous, config) : [];
        if (changes.length) output.push({ blockType: 'tool', toolName: 'change-summary-tool', props: { changes } });
        return { blocks: output, config };
    }

    public promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
        const prompt: string = String(args?.prompt || '').trim();
        if (!prompt || !this.assistInstance) {
            return;
        }
        if (this.abortController) {
            this.abortController.abort();
        }
        this.abortController = new AbortController();
        const requestId: number = ++this.requestSequence;
        const existingConfig: ChartConfig | null = this.state.latestChartConfig;
        const userPrompt: string = existingConfig ? this.createModificationPrompt(prompt, existingConfig) : prompt;
        let normalized: { blocks: AssistBlock[]; config: ChartConfig | null } | null = null;
        try {
            const response: any = await fetchChartConfig(prompt, existingConfig, this.abortController);
            if (requestId !== this.requestSequence) return;
            normalized = this.normalizeBlocks(response, existingConfig, prompt);
        } catch (error) {
            if (this.abortController.signal.aborted || requestId !== this.requestSequence) {
                return;
            }
            console.error('Unable to retrieve the AI chart response:', error);
        }
        void userPrompt;
        if (!normalized) {
            this.assistInstance.addPromptResponse({
                blocks: [{
                    blockType: 'text',
                    content: existingConfig
                        ? 'The requested modification could not be applied because the AI response was invalid. The existing chart was preserved.'
                        : 'The AI response did not contain usable chart data. Please try a suggested prompt.'
                }]
            } as any);
            return;
        }
        this.assistInstance.addPromptResponse({ blocks: cloneValue(normalized.blocks) } as any);
        const message: HistoryMessage = {
            id: this.createId('message'),
            prompt,
            blocks: cloneValue(normalized.blocks),
            chartConfig: normalized.config ? cloneValue(normalized.config) : null,
            createdAt: new Date()
        };
        this.setState((previous: AIChartState) => {
            const currentSession: HistorySession = {
                ...previous.currentSession,
                title: previous.currentSession.messages.length === 0
                    ? normalized?.config?.title || prompt
                    : previous.currentSession.title,
                updatedAt: new Date(),
                messages: [...previous.currentSession.messages, message]
            };
            return {
                currentSession,
                histories: [currentSession, ...previous.histories.filter((item: HistorySession) => item.id !== currentSession.id)],
                currentHistoryId: currentSession.id,
                latestChartConfig: message.chartConfig
            } as Pick<AIChartState, 'currentSession' | 'histories' | 'currentHistoryId' | 'latestChartConfig'>;
        });
    };

    public startNewChat = (): void => {
        this.requestSequence += 1;
        if (this.abortController) {
            this.abortController.abort();
        }
        this.pendingHistorySession = null;
        this.setState((previous: AIChartState) => ({
            currentSession: this.createSession(),
            currentHistoryId: null,
            chatKey: previous.chatKey + 1,
            latestChartConfig: null,
            showHistory: false
        }));
    };

    public openHistory = (session: HistorySession): void => {
        this.requestSequence += 1;
        if (this.abortController) {
            this.abortController.abort();
        }
        const restoredSession: HistorySession = this.cloneSession(session);
        const latestMessage: HistoryMessage | undefined = [...restoredSession.messages].reverse()
            .find((message: HistoryMessage): boolean => Boolean(message.chartConfig));
        this.pendingHistorySession = restoredSession;
        this.setState((previous: AIChartState) => ({
            currentSession: restoredSession,
            currentHistoryId: restoredSession.id,
            latestChartConfig: latestMessage?.chartConfig ? cloneValue(latestMessage.chartConfig) : null,
            chatKey: previous.chatKey + 1,
            showHistory: false
        }));
    };

    public deleteHistory = (session: HistorySession, event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        const deletingCurrent: boolean = this.state.currentHistoryId === session.id;
        if (deletingCurrent) {
            this.pendingHistorySession = null;
        }
        this.setState((previous: AIChartState) => ({
            histories: previous.histories.filter((item: HistorySession) => item.id !== session.id),
            currentSession: deletingCurrent ? this.createSession() : previous.currentSession,
            currentHistoryId: deletingCurrent ? null : previous.currentHistoryId,
            chatKey: deletingCurrent ? previous.chatKey + 1 : previous.chatKey,
            latestChartConfig: deletingCurrent ? null : previous.latestChartConfig
        }));
    };

    public stopResponse = (): void => {
        this.requestSequence += 1;
        if (this.abortController) {
            this.abortController.abort();
        }
    };

    public onCreated = (): void => {
        this.registerToolUIs();
        if (this.pendingHistorySession && this.assistInstance) {
            const session: HistorySession = this.pendingHistorySession;
            this.pendingHistorySession = null;
            window.requestAnimationFrame((): void => {
                if (!this.assistInstance) {
                    return;
                }
                (this.assistInstance as any).prompts = session.messages.map((message: HistoryMessage) => ({
                    prompt: message.prompt,
                    blocks: cloneValue(message.blocks)
                }));
                if (typeof (this.assistInstance as any).dataBind === 'function') {
                    (this.assistInstance as any).dataBind();
                }
            });
        }
    };

    private createSession(): HistorySession {
        const now: Date = new Date();
        return {
            id: this.createId('session'),
            title: 'New Chart Session',
            createdAt: now,
            updatedAt: now,
            messages: []
        };
    }

    private cloneSession(session: HistorySession): HistorySession {
        return {
            ...session,
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
            messages: session.messages.map((message: HistoryMessage): HistoryMessage => ({
                ...message,
                createdAt: new Date(message.createdAt),
                blocks: cloneValue(message.blocks),
                chartConfig: message.chartConfig ? cloneValue(message.chartConfig) : null
            }))
        };
    }

    private createId(prefix: string): string {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }

    private formatDate(date: Date): string {
        const value: Date = date instanceof Date ? date : new Date(date);
        return value.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    }

    private handleHistoryKeyDown(event: React.KeyboardEvent<HTMLDivElement>, session: HistorySession): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.openHistory(session);
        }
    }

    public render(): JSX.Element {
        const { showHistory, histories, currentHistoryId, chatKey } = this.state;
        return (
            <div className={`chartgenerator-aiassistview-wrapper ${isDarkChartTheme(this.currentTheme)
                ? 'chartgenerator-dark-mode'
                : 'chartgenerator-light-mode'}`}>
                <div className="chartgenerator-aiassistview-pane">
                    <div className="chartgenerator-aiassistview">
                        <AIAssistViewComponent
                            key={chatKey}
                            id="aiAssistView"
                            bannerTemplate={this.bannerTemplate}
                            promptSuggestionsHeader="Suggested Prompts"
                            promptSuggestions={chartSuggestions}
                            enableStreaming={false}
                            showClearButton={true}
                            toolbarSettings={this.assistViewToolbarSettings}
                            promptRequest={this.promptRequest}
                            stopRespondingClick={this.stopResponse}
                            created={this.onCreated}
                            ref={(instance: AIAssistViewComponent | null): void => { this.assistInstance = instance; }}
                        />
                    </div>
                </div>
                {showHistory && (
                    <div className="chartgenerator-sidebar" role="region" aria-labelledby="chartgenerator-history-heading">
                        <div className="chartgenerator-sidebar-content">
                            <div className="chartgenerator-history-header">
                                <h3 id="chartgenerator-history-heading">Chat History</h3>
                                <button className="chartgenerator-icon-btn chartgenerator-close" type="button" title="Close"
                                    aria-label="Close chat history" onClick={(): void => this.setState({ showHistory: false })}>
                                    <span className="e-icons e-close" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="chartgenerator-history-scroll">
                                {!histories.length && <div className="chartgenerator-empty">No history yet.</div>}
                                {histories.map((session: HistorySession) => (
                                    <div
                                        key={session.id}
                                        className={`chartgenerator-history-item ${currentHistoryId === session.id ? 'chartgenerator-active' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Open ${session.title}`}
                                        onClick={(): void => this.openHistory(session)}
                                        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>): void =>
                                            this.handleHistoryKeyDown(event, session)}>
                                        <div className="chartgenerator-history-text">
                                            <div className="chartgenerator-history-title">{session.title}</div>
                                            <div className="chartgenerator-history-date">{this.formatDate(session.updatedAt)}</div>
                                        </div>
                                        <button className="chartgenerator-icon-btn chartgenerator-danger" type="button" title="Delete"
                                            aria-label={`Delete ${session.title}`}
                                            onClick={(event: React.MouseEvent<HTMLButtonElement>): void => this.deleteHistory(session, event)}>
                                            <span className="e-icons e-trash" aria-hidden="true" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
