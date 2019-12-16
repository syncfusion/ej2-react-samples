/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
    .charts {
        align :center
    }`;
let series1 = [];
let point1;
let value = 80;
let i;
for (i = 1; i < 1440; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    }
    else {
        value -= Math.random();
    }
    point1 = { x: new Date(2000, 1, 1, 0, i), y: value.toFixed(1) };
    series1.push(point1);
}
export class PeroidCustomization extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartperiod' primaryXAxis={{
            valueType: 'DateTime', majorGridLines: { color: 'transparent' },
            crosshairTooltip: { enable: true }
        }} primaryYAxis={{
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', width: 0 },
            crosshairTooltip: { enable: true }
        }} load={this.load.bind(this)} seriesType={[]} indicatorType={[]} exportType={[]} trendlineType={[]} title='AAPL stock price by minutes' titleStyle={{
            fontWeight: '500', color: '#424242 '
        }} periods={[
            { intervalType: 'Minutes', interval: 1, text: '1m' },
            { intervalType: 'Minutes', interval: 30, text: '30m' },
            { intervalType: 'Hours', interval: 1, text: '1H' },
            { intervalType: 'Hours', interval: 12, text: '12H', selected: true },
            { text: '1D' }
        ]} crosshair={{ enable: true }} chartArea={{ border: { width: 0 } }}>
                        <Inject services={[DateTime, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={series1} xName='x' yName='y' type='Line'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes data for intraday using stock chart. Period and range selector help us to navigate different of data.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the dynamic stock chart.
                        <code>LineSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>LineSeries</code> module using the <code>StockChart.Inject(LineSeries)</code> method.
                    </p>
                </div>
            </div>);
    }
}
