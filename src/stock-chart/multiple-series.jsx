/**
 * Sample for Stock Chart with Multiple Series
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { goog, googl } from './stock-data';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export class MultipleSeries extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartmultiseries' primaryXAxis={{
            valueType: 'DateTime',
            majorGridLines: { width: 0 },
            crosshairTooltip: { enable: true }
        }} primaryYAxis={{
            interval: 40,
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', width: 0 },
            crosshairTooltip: { enable: true },
        }} load={this.load.bind(this)} indicatorType={[]} trendlineType={[]} crosshair={{ enable: true }} chartArea={{ border: { width: 0 } }} title='Multiple Series' titleStyle={{
            fontWeight: '500', color: '#424242 '
        }}>
                        <Inject services={[DateTime, LineSeries, Crosshair, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={goog} xName='x' yName='close' type='Line'>
                            </StockChartSeriesDirective>
                            <StockChartSeriesDirective dataSource={googl} xName='x' yName='close' type='Line'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes stock chart with multiple series.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Stock chart.
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
