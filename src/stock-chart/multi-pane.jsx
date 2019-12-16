/**
 * Sample for Stock Chart with Multiple Panes
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, StockChartRowsDirective, StockChartRowDirective, StockChartAxesDirective, StockChartAxisDirective } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { chartData } from './indicator-data';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export let tooltipRender = (args) => {
    if (args.text.split('<br/>')[4]) {
        let target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
        let value = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
};
export class MultiPane extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartpane' primaryYAxis={{
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', width: 0 }
        }} primaryXAxis={{
            crosshairTooltip: { enable: true },
            majorGridLines: { width: 0 },
            valueType: 'DateTime',
        }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} tooltipRender={tooltipRender} axisLabelRender={this.axisLabelRender.bind(this)} crosshair={{ enable: true }} load={this.load.bind(this)} title='AAPL Historical' titleStyle={{
            fontWeight: '500', color: '#424242 '
        }}>
                        <Inject services={[DateTime, Crosshair, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartRowsDirective>
                            <StockChartRowDirective height={'30%'}>
                            </StockChartRowDirective>
                            <StockChartRowDirective height={'70%'}>
                            </StockChartRowDirective>
                        </StockChartRowsDirective>
                        <StockChartAxesDirective>
                            <StockChartAxisDirective name='yAxis1' rowIndex={1} labelPosition={'Inside'} tickPosition={'Inside'} opposedPosition={true} lineStyle={{ color: 'transparent' }} majorTickLines={{ color: 'transparent' }}>
                            </StockChartAxisDirective>
                        </StockChartAxesDirective>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={chartData} xName='x' yName='close' type='Candle' yAxisName='yAxis1'>
                            </StockChartSeriesDirective>
                            <StockChartSeriesDirective dataSource={chartData} xName='x' yName='volume' type='Column'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes stock chart with multiple pane.
                    </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the Stock chart with volume.
                 <code>CandleSeries</code> is used to represent selected data value and <code>ColumnSeries</code> is used to represent the volume.

                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject
                        the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method.  To use the CandleSeries, inject the <code>CandleSeries</code> module using the <code>StockChart.Inject(CandleSeries)</code> method.
                    </p>
                </div>
            </div>);
    }
    axisLabelRender(args) {
        let text = parseInt(args.text);
        if (args.axis.name === "primaryYAxis") {
            args.text = text / 100000000 + 'B';
        }
    }
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    }
}
