/**
 * Sample for Momentum Indicator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, StripLinesDirective, StripLineDirective,
    Crosshair, LineSeries, MomentumIndicator, StripLine, ChartTheme, IndicatorsDirective, IndicatorDirective, Legend
} from '@syncfusion/ej2-react-charts';
import { chartValues } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function Momentum() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts' load={load.bind(this)} style={{ textAlign: "center" }}
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
                    width={Browser.isDevice ? '100%' : '75%'}
                    zoomSettings={{ enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                    title='AAPL Stock Price 2012-2017' legendSettings={{ visible:false }} loaded={onChartLoad.bind(this)}>
                    <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom,Legend, Logarithmic, Crosshair, LineSeries,
                        MomentumIndicator, StripLine]} />
                    <RowsDirective>
                        <RowDirective height={'40%'}>
                        </RowDirective>
                        <RowDirective height={'60%'}>
                        </RowDirective>
                    </RowsDirective>
                    <AxesDirective>
                        <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }}
                            minimum={80} maximum={120} interval={20} title='Momentum' lineStyle={{ width: 0 }}>
                            <StripLinesDirective>
                                <StripLineDirective start={80} end={120} text='' color='black' visible={true}
                                    opacity={0.03} zIndex='Behind'>
                                </StripLineDirective>
                            </StripLinesDirective>
                        </AxisDirective>
                    </AxesDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartValues} width={2}
                            xName='period' yName='y' low='low' high='high' close='close' volume='volume' open='open'
                            name='Apple Inc'  bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                            type='Candle' animation={{ enable: true }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                    <IndicatorsDirective>
                        <IndicatorDirective type='Momentum' field='Close' seriesName='Apple Inc' yAxisName='secondary' fill='#6063ff'
                            period={3} animation={{ enable: true }} upperLine={{ color: '#ffb735' }}>
                        </IndicatorDirective>
                    </IndicatorsDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                This sample illustrates a chart with candle series and a momentum indicator. The trackball shows information about each day’s stock, signal line, and upper line values.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure a momentum indicator. This indicator shows the speed at which the price of the stock is changing. It also identifies when the price is moving upwards or downwards.
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
                    More information on the Momentum Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#momentum">documentation section</a>.
                </p>
            </div>
        </div >
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default Momentum;
