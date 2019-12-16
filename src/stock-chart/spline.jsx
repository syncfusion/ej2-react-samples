/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { aapl } from './stock-data';
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
    .charts {
        align :center
    }`;
export class Spline extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartspline' primaryXAxis={{
            valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
        }} primaryYAxis={{
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', width: 0 }
        }} load={this.load.bind(this)} indicatorType={[]} seriesType={[]} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} crosshair={{ enable: true }} title='AAPL Stock Price' titleStyle={{
            fontWeight: '500', color: '#424242 '
        }}>
                        <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={aapl} xName='x' yName='high' type='Spline'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes stock data with spline series. Period and range selector help us to navigate different of data.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stock chart with spline series.
                        <code>SplineSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the SplineSeries, inject the <code>SplineSeries</code> module using the <code>StockChart.Inject(SplineSeries)</code> method.
                    </p>
                </div>
            </div>);
    }
}
