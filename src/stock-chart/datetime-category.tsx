/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    DateTimeCategory, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries,
    Trendlines, RangeTooltip, Tooltip, Crosshair, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme, IRangeTooltipRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { datetimeCategoryData } from './stock-data';


export class DatetimeCategoryAxis extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <StockChartComponent id='stockchartdefault'
                        primaryXAxis={{
                            majorGridLines: { width: 0 },
                            crosshairTooltip: { enable: true },
                            valueType: 'DateTimeCategory'
                        }}
                        primaryYAxis={{
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{  enable: true, header: 'AAPL Stock Price', format: '${point.x}: <b>${point.y}</b>'}}
                        crosshair={{ enable: true }}
                        load={this.load.bind(this)}
                        title='AAPL Stock Price'>
                        <Inject services={[DateTimeCategory, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries,
                            AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator,
                            MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={datetimeCategoryData} type='Spline'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the AAPL stock price using the <code>DateTimeCategory</code> axis type in the stock chart to display the minimum number of labels without any overlap on various business days.
                    </p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure a stock chart to visualize stock data using the <code>DateTimeCategory</code> axis type. Use series <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types">type</a> as <code>Spline</code> to render a spline series.</p>
                    <p>
                        <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices.
                    </p>
                    <p>
                        More information about axis types can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/axis-types">documentation section</a>.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                    The stock chart component features are segregated into individual feature-wise modules. To use datetime category axis, inject the <code>DateTimeCategory</code> module using the <code>StockChart.Inject(DateTimeCategory)</code> method. To use the SplineSeries, inject the <code>SplineSeries</code> module using the <code>StockChart.Inject(SplineSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
            let target: number = parseFloat(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
            let value: string = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    }
}