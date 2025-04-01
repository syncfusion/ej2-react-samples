/**
 * Sample for Stock Chart with Spline Area
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, SplineAreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, ChartTheme, IStockChartEventArgs, RangeTooltip, Tooltip } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { loadStockChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { googl } from './stock-data';
const SAMPLE_CSS = `

    #control-container {
        padding: 0px !important;
    }

    #material-gradient-chart stop {
        stop-color: #00bdae;
    }

    #fabric-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #bootstrap4-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #fluent-gradient-chart stop {
        stop-color: #1AC9E6;
    }
    #fluent-dark-gradient-chart stop {
        stop-color: #1AC9E6;
    }

    #highcontrast-gradient-chart stop {
        stop-color: #79ECE4;
    }

    #tailwind-gradient-chart stop {
        stop-color: #5A61F6;
    }

    #tailwind3-gradient-chart stop {
        stop-color: #2F4074;
    }

    #bootstrap5-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #material-dark-gradient-chart stop {
        stop-color: #9ECB08;
    }

    #fabric-dark-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-dark-gradient-chart stop {
        stop-color: #a16ee5;
    }

 #tailwind-dark-gradient-chart stop {
        stop-color: #8B5CF6;
    }

    #tailwind3-dark-gradient-chart stop {
        stop-color: #8029F1;
    }

    #bootstrap5-dark-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #material3-gradient-chart stop {
        stop-color: #6355C7;
    }

    #material3-dark-gradient-chart stop {
        stop-color: #4EAAFF;
    }

    #fluent2-gradient-chart stop {
        stop-color: #6200EE;
    }

    #fluent2-highcontrast-gradient-chart stop {
        stop-color: #9BB449;
    }

    #fluent2-dark-gradient-chart stop {
        stop-color: #9BB449;
    }

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.50;
    }

    .chart-gradient stop[offset="0.3"] {
        stop-opacity: 0.40;
    }
    .chart-gradient stop[offset="0.6"] {
        stop-opacity: 0.2;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0;
    }

`
let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
let borderColor: string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];

export class SplineArea extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <svg style={{ height: 0 }}>
                    <defs>
                        <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="0.3"></stop>
                            <stop offset="0.6"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div className='control-section'>
                    <StockChartComponent
                        tooltip={{
                            enable: true,
                            format: '<b>${point.x}</b> <br>Stock Price : <b>${point.y}</b>',
                            header: '',
                            enableMarker: false
                        }} id='stockchartsplinearea' primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } }} primaryYAxis={{ lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true } }} load={this.load.bind(this)} seriesType={[]} indicatorType={[]} chartArea={{ border: { width: 0 } }} crosshair={{ enable: true, lineType: 'Both', snapToData: true, dashArray: '5, 5' }} title='Google Stock Price'>
                        <Inject services={[DateTime, SplineAreaSeries, RangeTooltip, Tooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={googl} xName='x' yName='high' type='SplineArea' opacity={0.5} >
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample uses spline area series to visualize stock data. Crosshair display information about the data and period.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure stock chart to visualize the stock data with spline area series. Use series <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/stock-chart/stockSeries#types" aria-label="Navigate to the type property reference for TypeScript Stock Chart control">type</a> as <b>SplineArea</b> to render a spline area series.</p>
                    <p>
                        <code>Crosshair</code> is enabled in this example. To see the crosshair in action, hover the chart or tap on it in touch enabled devices.The <code>snapToData</code> property snaps the crosshair to the nearest data point instead of following the exact mouse position, providing a more precise focus on data points.
                    </p>
                    <p>
                        More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for Stock Chart Series Types">documentation section</a>.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method. To use the SplineAreaSeries, inject the <code>SplineAreaSeries</code> module using the <code>StockChart.Inject(SplineAreaSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }

    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = loadStockChartTheme(args);
        args.stockChart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.stockChart.theme.toLowerCase())] };
        args.stockChart.series[0].fill = 'url(#' + selectedTheme + '-gradient-chart)';
    };

}
