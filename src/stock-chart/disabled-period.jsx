/**
 * Sample for Stock Chart without Peroid Selector
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, AreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { aapl } from './stock-data';
import { SampleBase } from '../common/sample-base';
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
#control-container {
    padding: 0px !important;
}`;
export class PeriodSelector extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartperiod' primaryYAxis={{
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', width: 0 }
        }} primaryXAxis={{ majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} load={this.load.bind(this)} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} crosshair={{ enable: true }} enablePeriodSelector={false}>
                        <Inject services={[DateTime, AreaSeries, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={aapl} type='Area' xName='x' yName='open' fill={'url(#gradient-chart)'}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                    <div>
                        <svg style={{ height: '0' }}>
                            <defs>
                                <linearGradient id="gradient-chart" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0"/>
                                    <stop offset="1"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample renders the stock chart without period selector, data's can be navigated through range selector.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Stock chart.
                        <code>AreaSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject
                        the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method.  To use the AreaSeries, inject the <code>AreaSeries</code> module using the <code>StockChart.Inject(AreaSeries)</code> method.
                    </p>
                </div>
            </div>);
    }
}
