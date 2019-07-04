/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme,
    DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator , Export
} from '@syncfusion/ej2-react-charts';
import { chartData } from './indicator-data';
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
                            valueType: 'DateTime',
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
                        titleStyle={{
                            fontWeight: '500', color: '#424242 '
                        }}
                    >
                        <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, 
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={chartData} xName='x' 
                                type='Candle'  animation={{ enable: true }}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes stock chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                            In this example, you can see how to render and configure the Stock chart.
                        <code>CandleSeries</code> is used to represent selected data value.
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
                </div>
            </div>
        )
    }
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark") as ChartTheme;
    }
}
