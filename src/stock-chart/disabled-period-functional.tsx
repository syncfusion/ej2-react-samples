/**
 * Sample for Stock Chart without Peroid Selector
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, AreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export, RangeTooltip } from '@syncfusion/ej2-react-charts';
import { aapl } from './stock-data';
import { updateSampleSection } from '../common/sample-base';
import { loadStockChartTheme } from './theme-color';
const SAMPLE_CSS = `
    #gradient-chart stop {
        stop-color: #BDEDE9;
    }
    #gradient-chart stop[offset="0"] {
        stop-opacity: 1;
    }
    #gradient-chart stop[offset="1"] {
        stop-opacity: 0.4;
    }
#tailwind-dark-gradient-chart stop {
    stop-color: #8B5CF6;
}

#tailwind3-dark-gradient-chart stop {
    stop-color: #8029F1;
}
#tailwind-gradient-chart stop {
    stop-color: #5A61F6;
}

#tailwind3-gradient-chart stop {
    stop-color: #2F4074;
}
    #fluent-gradient-chart stop {
        stop-color: #1AC9E6;
    }
    #fluent-dark-gradient-chart stop {
        stop-color: #1AC9E6;
    }
    #bootstrap5-gradient-chart stop {
        stop-color: #6355C7;
    }
    #bootstrap5-dark-gradient-chart stop {
        stop-color: #8F80F4;
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
    #control-container {
        padding: 0px !important;
    }`;
const PeriodSelector = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IStockChartEventArgs): void => {
        loadStockChartTheme(args);
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <StockChartComponent id='stockchartperiod' primaryYAxis={{ lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 } }} primaryXAxis={{ majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} load={load.bind(this)} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} crosshair={{ enable: true }} enablePeriodSelector={false}>
                    <Inject services={[DateTime, AreaSeries, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, RangeTooltip, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={aapl} type='Area' xName='x' yName='open' opacity={0.5} />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
                <div>
                    <svg style={{ height: '0' }}>
                        <defs>
                            <linearGradient id="gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0" />
                                <stop offset="1" />
                            </linearGradient>
                            <linearGradient id="fluent-gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="fluent-dark-gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="bootstrap5-gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="bootstrap5-dark-gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="material3-gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="tailwind3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="tailwind3-dark-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="material3-dark-gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="fluent2-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="fluent2-highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                            <linearGradient id="fluent2-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0"></stop>
                                <stop offset="1"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <div id="action-description">
                <p>By hiding the period selector in the stock chart, this sample visualizes the AAPL stock price. The tooltip and crosshair display data and period information.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure stock chart to visualize the stock data. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockChartModel/#enableperiodselector" aria-label="Navigate to the enablePeriodSelector property reference for React Stock Chart component">enablePeriodSelector</a> property allows to toggle the visibility of period selector.
                </p>
                <p>
                    <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject
                    the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method.  To use the AreaSeries, inject the <code>AreaSeries</code> module using the <code>StockChart.Inject(AreaSeries)</code> method.
                </p>
                <p>
                    More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for React Stock Chart series types">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PeriodSelector;