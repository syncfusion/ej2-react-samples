/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    DateTime, StripLine, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, 
    RangeAreaSeries, Trendlines ,ChartTheme ,IStockChartEventArgs, Crosshair
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export, RangeTooltip
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
export class StockEvents extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartevents'
                        primaryXAxis={{
                            valueType: 'DateTime', majorGridLines: {  color: 'transparent' },
                            crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            lineStyle: { color: 'transparent' },
                            majorTickLines: { color: 'transparent' },
                            crosshairTooltip: { enable: true }
            
                        }}
                        load={this.load.bind(this)}
                        indicatorType={[]}
                        seriesType={[]}
                        trendlineType={[]}
                        title={'AAPL Stock Price'}
                        tooltip={{ enable: true }}
                        crosshair={{ enable: true, lineType: 'Both' }}
                        chartArea={{ border: { width: 0 } }}
                        stockEvents= {[
                            { date: new Date(2012, 3, 1), text: 'Q2', description: '2012 Quarter2 starts', type: 'Flag' },
                            { date: new Date(2012, 3, 20), text: 'Open', description: 'Markets opened', textStyle: { color: 'white' },
                              background: '#f48a21', border: { color: '#f48a21' } },
                            { date: new Date(2012, 6, 1), text: 'Q3', description: '2013 Quarter3 starts', type: 'Flag',
                              textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                            { date: new Date(2012, 9, 1), text: 'Q4', description: '2013 Quarter4 starts', type: 'Flag',
                              textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                            { date: new Date(2012, 7, 30), text: 'G', description: 'Google stocks bought',
                              textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } },
                            { date: new Date(2012, 10, 1), text: 'Y', description: 'Yahoo stocks sold', type: 'Square',
                              textStyle: { color: 'white' }, background: '#841391', border: { color: '#841391' } },
                            { date: new Date(2012, 12, 0), text: 'Y2', description: 'Year 2013', type: 'Pin', showOnSeries: false,
                              textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' } },
                            { date: new Date(2013, 3, 1), text: 'Q2', description: '2013 Quarter2 starts', type: 'Flag',
                              textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                            { date: new Date(2013, 3, 20), text: 'Q2', description: 'Surge in Stocks', type: 'ArrowUp',
                              textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' } },
                            { date: new Date(2013, 6, 1), text: 'Q3', description: '2013 Quarter3 starts', type: 'Flag',
                              textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                            { date: new Date(2013, 9, 1), text: 'Q4', description: '2013 Quarter4 starts',  type: 'Flag',
                              textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                            { date: new Date(2013, 12, 0), text: 'Y3', description: 'Year 2014', type: 'Pin', showOnSeries: false,
                              textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' } },
                            { date: new Date(2014, 3, 1), text: 'Q2', description: '2014 Quarter2 starts', type: 'ArrowDown',
                              textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' } },
                            { date: new Date(2014, 6, 1), text: 'Q3', description: '2014 Quarter3 starts',
                              textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } },
                            { date: new Date(2014, 9, 1), text: 'Q4', description: '2014 Quarter4 starts', type: 'Flag',
                              textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                            { date: new Date(2014, 12, 0), text: 'Y4', description: 'Year 2015', type: 'Pin', showOnSeries: false,
                              textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' } },
                            { date: new Date(2014, 2, 2), text: 'End', description: 'Markets closed', type: 'ArrowDown',
                              textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' } },
                            { date: new Date('2015-01-07'), text: 'A', description: 'This is event description',
                              textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } },
                            { date: new Date(2015, 1, 2), text: 'Q1', description: 'Add longer text',
                              textStyle: { color: 'white' }, background: '#dd3c9f', border: { color: '#dd3c9f' }, type: 'Text' },
                            { date: new Date(2015, 2, 12), text: 'Close', description: 'Markets closed',
                              textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } }
                        ]}
                    >
                        <Inject services={[DateTime, StripLine, LineSeries, Crosshair, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, RangeTooltip,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={aapl} xName='x' yName='high' type='Spline' name='google' close='high'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>This <a target="_blank" href="https://www.syncfusion.com/react-components/react-stock-chart">React Stock Chart</a> example visualizes the AAPL stock price with spline chart. Crosshair show the information about the data and period.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a stock chart with <a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockEventsSettings/">StockEvents</a> to mark specific events such as market open and close, highest or lowest price reached, year/quarter start and end on a chart for a specific date.
                    </p>
                    <p>
                        <code>Crosshair</code> is enabled in this example. To see the crosshair in action, hover the chart or tap on touch enabled devices.
                    </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis,
                        inject the
                        <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the SplineSeries, inject the
                        <code>SplineSeries</code> module using the
                        <code>StockChart.Inject(SplineSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }
        
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as  ChartTheme;
    };
        
}
