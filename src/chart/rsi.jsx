/**
 * Sample RSI Indicator
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject, StripLinesDirective, StripLineDirective, LineSeries, RsiIndicator, IndicatorsDirective, IndicatorDirective, Category, StripLine, CandleSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair } from '@syncfusion/ej2-react-charts';
import { chartData } from './datasource';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class RSI extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            majorGridLines: { width: 0 },
            zoomFactor: 0.2, zoomPosition: 0.6,
            crosshairTooltip: { enable: true },
        }} primaryYAxis={{
            title: 'Price',
            labelFormat: '${value}',
            plotOffset: 25,
            minimum: 50, maximum: 170,
            interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
        }} tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '80%'} crosshair={{ enable: true, lineType: 'Vertical' }} chartArea={{ border: { width: 0 } }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
            RsiIndicator, StripLine]}/>
                        <RowsDirective>
                            <RowDirective height={'40%'}>
                            </RowDirective>
                            <RowDirective height={'60%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }} minimum={0} maximum={120} interval={60} title='RSI' lineStyle={{ width: 0 }}>
                                <StripLinesDirective>
                                    <StripLineDirective start={0} end={120} text='' color='black' visible={true} opacity={0.03} zIndex='Behind'>
                                    </StripLineDirective>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='silver' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' low='low' open='open' close='close' high='high' volume='volume' type='Candle'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective field='Close' yAxisName='secondary' type='Rsi' fill='#6063ff' seriesName='Apple Inc' period={3} showZones={true} overBought={70} overSold={30} upperLine={{ color: '#e74c3d' }} lowerLine={{ color: '#2ecd71' }} animation={{ enable: true }}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a stock chart with candle series and a Relative Strength Index indicator. Trackball shows the information about the stock, signalline, lowerline, and upperline value of a day.
           </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the RSI Indicator.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use RSI Indicator, we need to inject
                       <code>RsiIndicator</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the RSI Indicator can be found in this &nbsp;
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
