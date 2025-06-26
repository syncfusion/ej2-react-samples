/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries,
     Trendlines , IStockChartEventArgs,ChartTheme
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export, LastValueLabel
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { aapl } from './stock-data';
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
    .charts {
        align :center
    }`;
export class Spline extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartspline'
                        primaryXAxis={{
                            valueType: 'DateTime', maximum: new Date(2015, 3, 30), majorGridLines: { width: 0 },crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 17, width: 10 }, labelPosition: 'Outside', tickPosition: 'Outside'
                        }}
                        load={this.load.bind(this)}
                        indicatorType={[]}
                        seriesType={[]}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }}
                        crosshair={{ enable: true }}
                        title= 'AAPL Stock Price'
                    >
                        <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, LastValueLabel]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={aapl} xName='x' yName='high' type='Spline' lastValueLabel={{enable: true, lineWidth: 0.5}}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample uses spline series to visualize stock data. The tooltip and crosshair display information about the data and period.</p>
                </div>
                <div id="description">
                    <p>
                        This example shows how to render and configure a stock chart to visualize stock data with a last value label using the <code>lastValueLabel</code> option. A spline series is used by setting the series <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockSeries/#type" aria-label="Navigate to the type property reference for React Stock Chart component">type</a> to <b>Spline</b>.
                    </p>
                    <p>
                        <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices.
                    </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the SplineSeries, inject the <code>SplineSeries</code> module using the <code>StockChart.Inject(SplineSeries)</code> method.
                    </p>
                    <p>
                        More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for React Stock Chart series types">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
        
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as ChartTheme;
    };
      
}
