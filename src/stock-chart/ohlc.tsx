/**
 * Sample for Stock Chart with Hilo open close
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,ITooltipRenderEventArgs,IStockChartEventArgs,ChartTheme,
    DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export
} from '@syncfusion/ej2-react-charts';
import { googl } from './stock-data';
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
export class OHLC extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartohlc'
                        primaryXAxis={{
                            valueType: 'DateTime',
                            majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' },
                            crosshairTooltip: { enable: true },
                        }}
                        primaryYAxis={{
                            labelFormat: 'n0',
                            lineStyle: { width: 0 }, rangePadding: 'None',
                            majorTickLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true }}
                        tooltipRender={tooltipRender}
                        crosshair={{ enable: true }}
                        title= 'AAPL Stock Price'
                        titleStyle={{
                            fontWeight: '500', color: '#424242 '
                        }}
                    >
                        <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, 
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={googl} xName='x' high='high' low='low' open='open' close='close'
                                type='HiloOpenClose' bearFillColor={'#2ecd71'} bullFillColor={'#e74c3d'} animation={{ enable: true }}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes stock chart with OHLC series.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Stock chart.
                        <code>HILO Open Close series</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis,
                        inject the
                        <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the OHLC, inject the
                        <code>HILO Open Close series</code> module using the
                        <code>StockChart.Inject(HILO Open Close series)</code> method.
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
    };
        
}
