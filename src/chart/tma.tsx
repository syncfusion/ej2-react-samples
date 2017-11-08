/**
 * TMA sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, CandleSeries, Category, Tooltip, DateTime,
    Zoom, Logarithmic, Crosshair, LineSeries, TmaIndicator, IndicatorsDirective, IndicatorDirective, ILoadedEventArgs,
    ChartTheme
} from '@syncfusion/ej2-react-charts';
import { chartData } from './datasource';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class TMA extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            intervalType: 'Months',
                            majorGridLines: { width: 0 },
                            skeleton: 'yMd',
                            zoomFactor: 0.2, zoomPosition: 0.6,
                            crosshairTooltip: { enable: true },
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: '${value}M',
                            minimum: 50, maximum: 170, interval: 30,
                            majorGridLines: { width: 1 }, lineStyle: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, TmaIndicator]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} width={2} xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: false }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='Tma' field='Close' seriesName='Apple Inc' fill='#6063ff' period={14} animation={{ enable: true }}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates Triangle Moving Average indicator in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the TMA Indicator. TMA Indicator is used to represent the price movements in stock. You
                         can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use TMA Indicator, we need to inject
                       <code>TmaIndicator</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the TMA Indicator can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
