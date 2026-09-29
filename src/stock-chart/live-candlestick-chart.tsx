/**
 * Sample for Stock Chart with simulated real-time data
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    IStockChartEventArgs,
    DateTime, Export, CandleSeries, LastValueLabel
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { loadStockChartTheme } from './theme-color';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

/**
 * Simulated one-minute candle in milliseconds.
 */
const ONE_MINUTE_MS: number = 60 * 1000;

/**
 * Tick frequency for updating the chart.
 * For demo purposes it is 100 ms so changes are visible quickly.
 */
const UPDATE_INTERVAL_MS: number = 100;

/**
 * After this many ticks, a brand-new one-minute candle is appended.
 */
const UPDATES_PER_CANDLE: number = 10;

/**
 * Animation is disabled for setData() because it is called frequently.
 */
const UPDATE_ANIMATION_DURATION: number = 0;

/**
 * Short animation when a new candle is added via addPoint().
 */
const ADD_ANIMATION_DURATION: number = 100;

/**
 * Multiplier used to amplify the random price walk so the chart
 * shows visible movement within the demo interval.
 */
const PRICE_MOVEMENT_MULTIPLIER: number = 2;

/**
 * Number of historical one-minute candles generated locally.
 */
const INITIAL_CANDLE_COUNT: number = 120;

/**
 * Starting price used when generating the historical data.
 */
const INITIAL_PRICE: number = 375;

/*
 * =====================================================
 * MODULE-LEVEL STATE
 * =====================================================
 *
 * Mirrors the original TS: `createInitialLocalData()` is
 * called once at module evaluation, immediately before the
 * chart is created, so `stockData` is populated from the
 * very first render.
 */
let stockData: object[] = createInitialLocalData();
let updateTimer: number | null = null;
let updateIndex: number = 0;
let isPageClosing: boolean = false;

function correctFloat(value: number): number {
    return Number(value.toFixed(4));
}

function randomBetween(minimum: number, maximum: number): number {
    return minimum + Math.random() * (maximum - minimum);
}

function getCurrentMinute(): number {
    return Math.floor(Date.now() / ONE_MINUTE_MS) * ONE_MINUTE_MS;
}

function createHistoricalCandle(timestamp: number, openingPrice: number): object {
    const movement: number = randomBetween(-1.5, 1.5);
    const close: number = correctFloat(Math.max(1, openingPrice + movement));
    const high: number = correctFloat(
        Math.max(openingPrice, close) + randomBetween(0.05, 0.7)
    );
    const low: number = correctFloat(
        Math.max(1, Math.min(openingPrice, close) - randomBetween(0.05, 0.7))
    );
    return {
        x: new Date(timestamp),
        open: correctFloat(openingPrice),
        high: high,
        low: low,
        close: close,
        volume: correctFloat(randomBetween(1, 30))
    };
}

function createInitialLocalData(): object[] {
    const currentMinute: number = getCurrentMinute();
    const startingTime: number = currentMinute - (INITIAL_CANDLE_COUNT - 1) * ONE_MINUTE_MS;
    let price: number = INITIAL_PRICE;
    const candles: object[] = [];
    for (let index: number = 0; index < INITIAL_CANDLE_COUNT; index++) {
        const timestamp: number = startingTime + index * ONE_MINUTE_MS;
        const candle: object = createHistoricalCandle(timestamp, price);
        candles.push(candle);
        price = candle['close'];
    }
    return candles;
}

function setElementValue(elementId: string, value: string): void {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function updateConnectionStatus(message: string, statusClass: string): void {
    const element: HTMLElement | null = document.getElementById('connection-status');
    if (!element) {
        return;
    }
    element.textContent = message;
    element.className = 'connection-status ' + statusClass;
}

function formatPrice(value: number): string {
    if (!isFinite(value)) {
        return '—';
    }
    return Number(value).toFixed(2);
}

function formatVolume(value: number): string {
    if (!isFinite(value)) {
        return '—';
    }
    return Number(value).toFixed(4);
}

function updateMarketValues(candle: any, status: string): void {
    if (!candle) {
        return;
    }
    setElementValue('open-value', formatPrice(candle.open));
    setElementValue('high-value', formatPrice(candle.high));
    setElementValue('low-value', formatPrice(candle.low));
    setElementValue('close-value', formatPrice(candle.close));
    setElementValue('volume-value', formatVolume(candle.volume));
    setElementValue('candle-status', status);
}

function getCandleSeries(chart: any): any {
    if (
        chart && chart.series && chart.series.length &&
        typeof chart.series[0].setData === 'function' &&
        typeof chart.series[0].addPoint === 'function'
    ) {
        return chart.series[0];
    }
    return null;
}

function createUpdatedCandle(currentCandle: any): object {
    const movement: number = correctFloat((Math.random() - 0.5) * PRICE_MOVEMENT_MULTIPLIER);
    const newClose: number = correctFloat(Math.max(1, currentCandle.close + movement));
    return {
        x: currentCandle.x,
        open: currentCandle.open,
        high: correctFloat(Math.max(currentCandle.high, newClose)),
        low: correctFloat(Math.min(currentCandle.low, newClose)),
        close: newClose,
        volume: correctFloat(currentCandle.volume + randomBetween(0.01, 0.3))
    };
}

function createNewCandle(previousCandle: any): object {
    const openingPrice: number = previousCandle.close;
    return {
        x: new Date(previousCandle.x.getTime() + ONE_MINUTE_MS),
        open: openingPrice,
        high: openingPrice,
        low: openingPrice,
        close: openingPrice,
        volume: correctFloat(randomBetween(0.1, 1))
    };
}

function updateCurrentPoint(chart: any, candle: object): void {
    const series: any = getCandleSeries(chart);
    if (!series) {
        return;
    }
    series.setData(candle, UPDATE_ANIMATION_DURATION);
}

function addNewPoint(chart: any, candle: object): void {
    const series: any = getCandleSeries(chart);
    if (!series) {
        return;
    }
    series.addPoint(candle, ADD_ANIMATION_DURATION);
}

function processDynamicUpdate(chart: any): void {
    if (isPageClosing || !stockData.length) {
        return;
    }
    const lastIndex: number = stockData.length - 1;
    const currentCandle: any = stockData[lastIndex];
    const shouldAddNewCandle: boolean =
        updateIndex > 0 && updateIndex % UPDATES_PER_CANDLE === 0;

    if (shouldAddNewCandle) {
        const newCandle: object = createNewCandle(currentCandle);
        stockData.push(newCandle);
        addNewPoint(chart, newCandle);
        updateMarketValues(newCandle, 'New simulated one-minute candle');
    } else {
        const updatedCandle: object = createUpdatedCandle(currentCandle);
        stockData[lastIndex] = updatedCandle;
        updateCurrentPoint(chart, updatedCandle);
        updateMarketValues(updatedCandle, 'Current candle updated');
    }
    updateIndex++;
}

function startDynamicUpdates(chart: any): void {
    if (updateTimer !== null) {
        return;
    }
    updateTimer = window.setInterval((): void => {
        processDynamicUpdate(chart);
    }, UPDATE_INTERVAL_MS);
}

export class LiveCandlestickChart extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <style>
                    {`
                        .local-stock-page {
                            display: flex;
                            flex-direction: column;
                            gap: 12px;
                            font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                        }

                        .local-stock-page .app-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 4px 2px;
                            gap: 12px;
                            flex-wrap: wrap;
                        }

                        .local-stock-page .app-title {
                            margin: 0;
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 1.4;
                        }

                        .local-stock-page .app-subtitle {
                            display: block;
                            margin-top: 2px;
                            font-size: 12px;
                            line-height: 1.5;
                        }

                        .local-stock-page .connection-status {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            padding: 5px 12px;
                            border-radius: 14px;
                            font-size: 12px;
                            font-weight: 500;
                            white-space: nowrap;
                        }

                        .local-stock-page .connection-status.connecting {
                            color: #92400e;
                        }

                        .local-stock-page .connection-status.error {
                            color: #991b1b;
                        }

                        .local-stock-page .info-panel {
                            display: grid;
                            grid-template-columns: repeat(5, minmax(0, 1fr));
                            gap: 12px;
                            padding: 16px 20px;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                        }

                        .local-stock-page .info-cell {
                            display: flex;
                            flex-direction: column;
                            gap: 5px;
                            min-width: 0;
                        }

                        .local-stock-page .info-label {
                            font-size: 11px;
                            font-weight: 500;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                        }

                        .local-stock-page .info-value {
                            overflow: hidden;
                            font-size: 18px;
                            font-weight: 600;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .local-stock-page .chart-shell {
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                        }

                        .local-stock-page .status-row {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 0 2px;
                            font-size: 12px;
                            flex-wrap: wrap;
                        }

                        @media (max-width: 720px) {
                            .local-stock-page .app-header {
                                align-items: flex-start;
                                flex-direction: column;
                            }

                            .local-stock-page .info-panel {
                                grid-template-columns: repeat(2, minmax(0, 1fr));
                                padding: 12px 16px;
                            }

                            .local-stock-page .info-value {
                                font-size: 16px;
                            }
                        }

                        @media (max-width: 420px) {
                            .local-stock-page .info-panel {
                                grid-template-columns: 1fr;
                            }
                        }
                    `}
                </style>
                <div className='control-section'>
                    <div className="local-stock-page">
                        <div className="app-header">
                            <div>
                                <h1 className="app-title">
                                    Real-Time Candlestick Chart
                                </h1>

                                <span className="app-subtitle">
                                    Syncfusion EJ2 StockChart &middot;
                                    Simulated one-minute OHLCV data streaming
                                </span>
                            </div>

                            <span
                                id="connection-status"
                                className="connection-status connecting"
                                role="status"
                                aria-live="polite">
                                Initializing local data
                            </span>
                        </div>

                        <div
                            className="info-panel"
                            aria-label="Current candlestick OHLCV values">
                            <div className="info-cell">
                                <span className="info-label">Open</span>
                                <span
                                    id="open-value"
                                    className="info-value"
                                    aria-label="Current candle open value">
                                    &mdash;
                                </span>
                            </div>

                            <div className="info-cell">
                                <span className="info-label">High</span>
                                <span
                                    id="high-value"
                                    className="info-value"
                                    aria-label="Current candle high value">
                                    &mdash;
                                </span>
                            </div>

                            <div className="info-cell">
                                <span className="info-label">Low</span>
                                <span
                                    id="low-value"
                                    className="info-value"
                                    aria-label="Current candle low value">
                                    &mdash;
                                </span>
                            </div>

                            <div className="info-cell">
                                <span className="info-label">Close</span>
                                <span
                                    id="close-value"
                                    className="info-value"
                                    aria-label="Current candle close value">
                                    &mdash;
                                </span>
                            </div>

                            <div className="info-cell">
                                <span className="info-label">Volume</span>
                                <span
                                    id="volume-value"
                                    className="info-value"
                                    aria-label="Current candle volume value">
                                    &mdash;
                                </span>
                            </div>
                        </div>

                        <div className="chart-shell">
                            <StockChartComponent
                                id='stockChart'
                                width='100%'
                                height='100%'
                                title='Real-Time Stock Market Data'
                                chartArea={{ border: { width: 0 } }}
                                primaryXAxis={{
                                    valueType: 'DateTime',
                                    intervalType: 'Auto',
                                    labelFormat: 'HH:mm',
                                    lineStyle: { color: 'transparent' },
                                    majorGridLines: { width: 1, color: '#e5e7eb' },
                                    crosshairTooltip: { enable: false }
                                }}
                                primaryYAxis={{
                                    labelPosition: 'Outside',
                                    lineStyle: { color: 'transparent' },
                                    majorTickLines: { color: 'transparent', height: 0 },
                                    majorGridLines: { width: 0.5, color: '#e5e7eb' },
                                    crosshairTooltip: { enable: false }
                                }}
                                crosshair={{ enable: false }}
                                tooltip={{ enable: false }}
                                load={this.load.bind(this)}
                                seriesType={[]}
                                indicatorType={[]}
                                trendlineType={[]}
                                periods={[
                                    { text: '15m', interval: 15, intervalType: 'Minutes' },
                                    { text: '1h', interval: 1, intervalType: 'Hours', selected: true },
                                    { text: 'All' }
                                ]}
                                enableCustomRange={false}
                            >
                                <Inject services={[DateTime, Export, CandleSeries, LastValueLabel]} />
                                <StockChartSeriesCollectionDirective>
                                    <StockChartSeriesDirective
                                        dataSource={stockData}
                                        type='Candle'
                                        xName='x'
                                        open='open'
                                        high='high'
                                        low='low'
                                        close='close'
                                        volume='volume'
                                        name='Local dynamic data'
                                        bullFillColor='#90EE90'
                                        bearFillColor='#FF7F7F'
                                        enableSolidCandles={true}
                                        border={{ width: 1 }}
                                        animation={{ enable: false }}
                                        lastValueLabel={{
                                            enable: true,
                                            background: '#FF7F7F',
                                            dashArray: '3,2',
                                            lineWidth: 0.5,
                                            font: { color: '#ffffff', size: '11px' }
                                        }}
                                    />
                                </StockChartSeriesCollectionDirective>
                            </StockChartComponent>

                            <div className="status-row" aria-live="polite">
                                <span className="info-label">Last candle status</span>
                                <span id="candle-status">Initializing data stream</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.syncfusion.com/react-components/react-stock-chart"
                            aria-label="React Stock Chart with simulated real-time local data">
                            React Stock Chart
                        </a>
                        example demonstrates a
                        <strong>real-time candlestick chart</strong> driven by continuously
                        updated local data. The chart starts with 120 simulated one-minute
                        OHLCV candles and then dynamically updates the active candle or
                        appends a new candle using <code>series.setData()</code> and
                        <code>series.addPoint()</code>.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the chart uses a plain in-memory array as its data
                        source, so no network request is required. A timer simulates a
                        real-time stock data stream by generating frequent price updates for
                        one-minute OHLCV candles.
                    </p>

                    <p>
                        Each generated record is processed in one of the following ways:
                    </p>

                    <ul>
                        <li>
                            When the generated record has the
                            <strong>same timestamp</strong> as the latest candle, the existing
                            candle is updated using
                            <code>series.setData(candle, 0)</code>. Animation is disabled for
                            this operation because updates occur frequently.
                        </li>

                        <li>
                            When the generated record has a
                            <strong>newer timestamp</strong>, a new one-minute candlestick is
                            appended using
                            <code>series.addPoint(candle, 100)</code> with a short animation.
                        </li>
                    </ul>

                    <p>
                        The open, high, low, close, and volume values shown above the chart
                        represent the latest simulated candle. The values are refreshed
                        whenever the local data stream updates the active candle or adds a
                        new one.
                    </p>

                    <p>
                        You can replace the simulated data returned by
                        <code>createInitialLocalData()</code> with data from an API,
                        WebSocket, or another local data source. The same update logic can be
                        used to build real-time stock market visualizations, financial
                        dashboards, and live trading charts.
                    </p>

                    <br />

                    <p style={{ fontWeight: 500 }}>
                        <strong>Injecting modules</strong>
                    </p>

                    <p>
                        The Stock Chart component features are divided into individual
                        feature modules. To use the date-time axis, inject the
                        <code>DateTime</code> module using
                        <code>StockChart.Inject(DateTime)</code>. To render the candlestick
                        series, inject the <code>CandleSeries</code> module using
                        <code>StockChart.Inject(CandleSeries)</code>. To display the latest
                        data value on the chart axis, inject the
                        <code>LastValueLabel</code> module using
                        <code>StockChart.Inject(LastValueLabel)</code>.
                    </p>

                    <p>
                        More information about configuring the Stock Chart component is
                        available in the
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://ej2.syncfusion.com/react/documentation/stock-chart/getting-started/"
                            aria-label="Navigate to the React Stock Chart getting started documentation">
                            Stock Chart documentation
                        </a>.
                    </p>
                </div>
            </div>
        )
    }

    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
        const chart: any = args.stockChart;

        updateConnectionStatus('Local data ready', 'connected');
        updateMarketValues(
            stockData.length ? stockData[stockData.length - 1] : null,
            stockData.length ? 'Local data loaded' : 'No local data available'
        );

        if (chart && chart.series && chart.series[0]) {
            startDynamicUpdates(chart);
        }
    }

    public componentDidMount(): void {
        super.componentDidMount();
        isPageClosing = false;
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        this.handleBeforeUnload();
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    private handleBeforeUnload = (): void => {
        isPageClosing = true;
        if (updateTimer !== null) {
            window.clearInterval(updateTimer);
            updateTimer = null;
        }
    };
}
