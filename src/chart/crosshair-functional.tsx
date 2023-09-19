/**
 * Sample for Crosshair in chart
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, AxesDirective, AxisDirective, Inject, LineSeries, HiloOpenCloseSeries, Crosshair, DateTime, ILoadedEventArgs, ChartTheme, Zoom } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { axesData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Crosshair sample
 */
const CrosshairChart = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ majorGridLines: { width: 0 }, valueType: 'DateTime', crosshairTooltip: { enable: true }, labelFormat: 'MMM' }} load={load.bind(this)} primaryYAxis={{ minimum: 83, maximum: 87, interval: 1, title: 'Millions in USD', labelFormat: '{value}M', rowIndex: 0, crosshairTooltip: { enable: true } }} width={Browser.isDevice ? '100%' : '75%'} title='Conns,Inc Stock Details' loaded={onChartLoad.bind(this)} crosshair={{ enable: true }} legendSettings={{ visible: false }} zoomSettings={{ enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}>
                    <Inject services={[LineSeries, HiloOpenCloseSeries, Crosshair, DateTime, Zoom]} />
                    <AxesDirective>
                        <AxisDirective majorGridLines={{ width: 0 }} rowIndex={0} opposedPosition={true} minimum={82} maximum={88} interval={2} name='yAxis' title='Millions in USD (Stock)' crosshairTooltip={{ enable: true }} />
                    </AxesDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective type='Line' dataSource={axesData} border={{ width: 1.5 }} xName='xDate' width={2} yName='High' marker={{ visible: true }} />
                        <SeriesDirective type='HiloOpenClose' dataSource={axesData} yAxisName='yAxis' border={{ width: 1.5 }} bearFillColor='#2ecd71' bullFillColor='#e74c3d' xName='xDate' width={2} high='High' low='Low' open='Open' close='Close' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample depicts the crosshair behavior in the charts. To view the crosshair and its tooltip, hover over the chart or tap on it in touch-enabled devices.</p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates the crosshair behavior in chart. Crosshair is used to inspect or focus on an individual data point.
                    You can customize the axis tooltip using <code>crosshairTooltip</code> properties in axis.
                </p>
                <p>Hover the chart area to view crosshair and its tooltip. Touch and hold to enable crosshair in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Crosshair, we need to inject
                    <code>Crosshair</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the Crosshair can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball/#trackball">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default CrosshairChart;