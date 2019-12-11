/**
 * Sample for SMA indicator
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Logarithmic, Tooltip, CandleSeries, DataLabel, Crosshair, Zoom, LineSeries, SmaIndicator, IndicatorsDirective, IndicatorDirective } from '@syncfusion/ej2-react-charts';
import { chartData } from './datasource';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class SMA extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price', labelFormat: '${value}M', minimum: 50, maximum: 170, interval: 30, majorGridLines: { width: 1 }, lineStyle: { width: 0 } }} width={Browser.isDevice ? '100%' : '80%'} tooltip={{ enable: true, shared: true }} chartArea={{ border: { width: 0 } }} crosshair={{ enable: true, lineType: 'Vertical' }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, SmaIndicator, Tooltip, DateTime, Logarithmic, DataLabel, Crosshair, Zoom, LineSeries]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='silver' name='Apple Inc' low='low' open='open' close='close' high='high' volume='volume' type='Candle' animation={{ enable: false }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='Sma' fill='blue' seriesName='Apple Inc' period={14}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a stock chart with candle series and a Simple Moving Average indicator. Trackball shows the information about the stock and signal value of a day.
           </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the SMA Indicator.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use SMA Indicator, we need to inject
                       <code>SmaIndicator</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the SMA Indicator can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
}
