/**
 * Sample for Momentum Indicator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, StripLinesDirective, StripLineDirective,
    Crosshair, LineSeries, MomentumIndicator, StripLine, ChartTheme, IndicatorsDirective, IndicatorDirective
} from '@syncfusion/ej2-react-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Momentum extends SampleBase<{}, {}> {

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
                            majorGridLines: { width: 0 },
                            zoomFactor: 0.2, zoomPosition: 0.6,
                            crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: '${value}',
                            plotOffset: 25,
                            minimum: 50, maximum: 170,
                            interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 },
                        }}
                        tooltip={{
                            enable: true, shared: true,
                        }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan : true }}
                        title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
                            MomentumIndicator, StripLine]} />
                        <RowsDirective>
                            <RowDirective height={'40%'}>
                            </RowDirective>
                            <RowDirective height={'60%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }}
                                minimum={80} maximum={120} interval={20} title='Momentum' plotOffset={30} lineStyle={{ width: 0 }}>
                                <StripLinesDirective>
                                    <StripLineDirective start={80} end={120} text='' color='black' visible={true}
                                        opacity={0.03} zIndex='Behind'>
                                    </StripLineDirective>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} width={2}
                                xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open'
                                name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                type='Candle' animation={{ enable: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='Momentum' field='Close' seriesName='Apple Inc' yAxisName='secondary' fill='#6063ff'
                                period={3} animation={{ enable: true }} upperLine={{ color: '#e74c3d' }}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a stock chart with candle series and a momentum indicator. Trackball shows the information about the stock, signalline, and upperline value of a day.
           </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Momentum Indicator.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Momentum Indicator, we need to inject
                       <code>MomentumIndicator</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the Momentum Indicator can be found in this &nbsp;
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark") as ChartTheme;
    };
}
