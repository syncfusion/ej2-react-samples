/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme,
    DateTime, DateTimeCategory, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator , Export
} from '@syncfusion/ej2-react-charts';
import { defaultData } from './indicator-data';
import { SampleBase } from '../common/sample-base';
import { EmitType } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export let tooltipRender: EmitType<ITooltipRenderEventArgs> = (args: ITooltipRenderEventArgs) => {
    if (args.text.split('<br/>')[4]) { 
        let target : number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
        let value : string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
};
export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartdefault'
                        primaryXAxis={{
                            valueType: 'DateTimeCategory',
                            majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' },
                            crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            labelFormat: 'n0',
                            lineStyle: { width: 0 }, rangePadding: 'None',
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true }}
                        tooltipRender={tooltipRender}
                        crosshair={{ enable: true }}
                        load={this.load.bind(this)}
                        title= 'AAPL Stock Price'
                    >
                        <Inject services={[DateTime, DateTimeCategory, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, 
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={defaultData} xName='x' 
                                type='Candle'  animation={{ enable: true }}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>This <a target="_blank" href="https://www.syncfusion.com/react-components/react-stock-chart">React Stock Chart</a> example visualizes the AAPL stock price with candle chart. Tooltip and crosshair show the information about the data and period.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stock chart. The candle type series chart shows financial data and trends at equal intervals. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/period-selector">Period Selector</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/range-selector">Range Selector</a> can be used to select a range with specified periods.
                    </p>
                    <p>
                        Stock Chart provides support to 10 types of <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/technical-indicators">Technical Indicators</a> namely <code>Accumulation Distribution</code>, <code>ATR</code>, <code>EMA</code>, <code>SMA</code>, <code>TMA</code>, <code>Momentum</code>, <code>MACD</code>, <code>RSI</code>, <code>Stochastic</code>, <code>Bollinger Band</code>. By using indicator dropdown box, add and remove the required indicator types.
                    </p>
                    <p>
                        <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices.
                    </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis,
                        inject the
                        <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the
                        <code>CandleSeries</code> module using the
                        <code>StockChart.Inject(CandleSeries)</code> method.
                    </p>
                    <p>
                        More information about the stock charts can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/getting-started">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as ChartTheme;
    }
}
