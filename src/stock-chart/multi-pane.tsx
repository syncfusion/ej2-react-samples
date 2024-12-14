/**
 * Sample for Stock Chart with Multiple Panes
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,ITooltipRenderEventArgs,Crosshair,IAxisLabelRenderEventArgs,
    DateTime, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
    StockChartRowsDirective, StockChartRowDirective, StockChartAxesDirective, StockChartAxisDirective, IStockChartEventArgs, ChartTheme, StockLegend
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export
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
export class MultiPane extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartpane' primaryYAxis={{ lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 } }} primaryXAxis={{ crosshairTooltip: { enable: true }, majorGridLines: { width: 0 }, valueType: 'DateTime' }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, format:'High : <b>${point.high}</b><br/>Low :<b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>' }} tooltipRender={tooltipRender} axisLabelRender={this.axisLabelRender.bind(this)} crosshair={{ enable: true }} load={this.load.bind(this)} title='AAPL Historical' legendSettings={{ visible: true }}>
                        <Inject services={[DateTime, Crosshair, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, StockLegend]} />
                        <StockChartRowsDirective>
                            <StockChartRowDirective height={'30%'} />
                            <StockChartRowDirective height={'70%'} />
                        </StockChartRowsDirective>
                        <StockChartAxesDirective>
                            <StockChartAxisDirective name='yAxis1' rowIndex={1} labelPosition={'Inside'} tickPosition={'Inside'} opposedPosition={true} lineStyle={{ color: 'transparent' }} majorTickLines={{ color: 'transparent' }} />
                        </StockChartAxesDirective>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={chartData} xName='x' yName='close' type='Candle' yAxisName='yAxis1' name="Apple Inc" />
                            <StockChartSeriesDirective dataSource={chartData} xName='x' yName='volume' type='Column' enableTooltip={false} name="Volume" />
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>This <a target="_blank" href="https://www.syncfusion.com/react-components/react-stock-chart" aria-label="React Stock Chart with Candlestick and Volume">React Stock Chart</a> example visualizes the AAPL stock price with Candle chart. Tooltip and crosshair show the information about the data and period.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a stock chart for AAPL data, as well as how to use column charts to display data volume. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/period-selector" aria-label="Navigate to the documentation for Period Selector in React Stock Chart component">Period Selector</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/range-selector" aria-label="Navigate to the documentation for Range Selector in React Stock Chart component">Range Selector</a> can be used to select a range with specified periods.
                    </p>
                    <p>
                        The legend is enabled, and you can use it to toggle the visibility of series in the stock chart. To customize the legend in the stock chart, use the <code>stockChartLegendSettings</code> property.
                    </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject
                        the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method.  To use the CandleSeries, inject the <code>CandleSeries</code> module using the <code>StockChart.Inject(CandleSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        let text : number = parseInt(args.text);
        if (args.axis.name === "primaryYAxis") {
            args.text = text / 100000000 + 'B';
        }
    }
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as ChartTheme;
    }
}
