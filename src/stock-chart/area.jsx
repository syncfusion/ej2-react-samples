/**
 * Sample for Stock Chart with Area Series
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, AreaSeries } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { aapl } from './stock-data';
import { SampleBase } from '../common/sample-base';
export class Area extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <StockChartComponent id='stockchartarea' primaryXAxis={{
            valueType: 'DateTime',
            majorGridLines: { color: 'transparent' },
            crosshairTooltip: { enable: true },
        }} primaryYAxis={{
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent' },
            crosshairTooltip: { enable: true }
        }} load={this.load.bind(this)} seriesType={[]} indicatorType={[]} chartArea={{ border: { width: 0 } }} crosshair={{ enable: true }} title='AAPL Stock Price' titleStyle={{
            fontWeight: '500', color: '#424242 '
        }}>
                        <Inject services={[DateTime, Crosshair, AreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, Export,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={aapl} xName='x' yName='high' type='Area' fill='#BDEDE9'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes stock data with area. Period and range selector help us to navigate different of data.
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
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the AreaSeries, inject the <code>AreaSeries</code> module using the <code>StockChart.Inject(AreaSeries)</code> method.
                    </p>
                </div>
            </div>);
    }
}
