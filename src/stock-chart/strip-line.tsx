/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    DateTime, StripLine, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, 
    RangeAreaSeries, Trendlines ,ChartTheme ,IStockChartEventArgs
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { amzn } from './stock-data';
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
    .charts {
        align :center
    }`;
export class StripLines extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartstripline'
                        primaryXAxis={{
                            valueType: 'DateTime', majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            lineStyle: { color: 'transparent' },
                            majorTickLines: { color: 'transparent', width: 0 },
                            stripLines: [{ start: 340, end: 380, color: '#3CB371', opacity: 0.1 }]
                        }}
                        load={this.load.bind(this)}
                        indicatorType={[]}
                        seriesType={[]}
                        title={'AAPL Historical'}
                        titleStyle={{ fontWeight: '500', color: '#424242 ' }}
                        chartArea={{ border: { width: 0 } }}
                    >
                        <Inject services={[DateTime, StripLine, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={amzn} xName='x' yName='close' type='Line'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes stock chart with strip line.
                    </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to highlight a particular range in stock chart. Period and range selector help us to navigate different of data.
                        <code>LineSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>LineSeries</code> module using the <code>StockChart.Inject(LineSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark") as  ChartTheme;
    };
}
