/**
 * Sample for Stock Chart with Multiple Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair,
    DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,IStockChartEventArgs,ChartTheme
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export, StockLegend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { goog, googl } from './stock-data';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export class MultipleSeries extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartmultiseries' 
                        primaryXAxis={{
                            valueType: 'DateTime',
                            majorGridLines: { width: 0 },
                            crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            interval: 40,
                            lineStyle: { color: 'transparent' },
                            majorTickLines: { color: 'transparent', width: 0 },
                            crosshairTooltip: { enable: true },
                        }}
                        load={this.load.bind(this)}
                        indicatorType={[]}
                        trendlineType ={[]}
                        crosshair={{ enable: true }}
                        chartArea={{ border: { width: 0 } }}
                        title= 'Multiple Series'
                        legendSettings={{ visible: true }}
                    >
                        <Inject services={[DateTime, LineSeries, Crosshair, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, 
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, StockLegend,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={goog} xName='x' yName='close' type='Spline' name='GOOG'>
                            </StockChartSeriesDirective>
                            <StockChartSeriesDirective dataSource={googl} xName='x' yName='close' type='Spline' name='GOOGL'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes stock chart with multiple series and legend.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Stock Chart.
                        <code>SplineSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p><b>Injecting Module:</b></p>
                    <p>
                        The Stock Chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the 
                        <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>SplineSeries</code> module using the <code>StockChart.Inject(SplineSeries)</code> method. 
                        To use the Legend, inject the <code>StockLegend</code> module using the <code>StockChart.Inject(StockLegend)</code> method.
                    </p>
                </div>
            </div >
        )
    }
        
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark") as  ChartTheme;
    };
    
}
