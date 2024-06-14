/**
 * Sample for Trackball in chart
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Tooltip, Crosshair, Legend, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { john, andrew, thomas, mark, william } from './trackball-data';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

const TrackballChart = () => {
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11), valueType: 'DateTime', skeleton: 'y', lineStyle: { width: 0 }, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} load={load.bind(this)} primaryYAxis={{ title: 'Revenue (in Million)', labelFormat: '{value}M', majorTickLines: { width: 0 }, minimum: 10, maximum: 80, lineStyle: { width: 0 } }} legendSettings={{ visible: true , enableHighlight: true}} title='Average Sales per Person' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical' }}>
                    <Inject services={[LineSeries, DateTime, Tooltip, Crosshair, Legend, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={john} xName='x' yName='y' width={2} name='John' type='Line' marker={{ visible: true, isFilled: true, width: 7, height: 7 }} />
                        <SeriesDirective dataSource={andrew} xName='x' yName='y' width={2} name='Andrew' type='Line' marker={{ visible: true, isFilled: true, width: 7, height: 7 }} />
                        <SeriesDirective dataSource={thomas} xName='x' yName='y' width={2} name='Thomas' type='Line' marker={{ visible: true, isFilled: true, width: 7, height: 7 }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample depicts the trackball behavior in the chart. To view the trackball and its tooltip, hover over the chart or tap on it in touch-enabled devices.</p>
            </div>
            <div id="description">
                <p>
                    The trackball is used to track a data point close to the mouse or touch position. The trackball can be enabled by setting the Enable property of the crosshair to <b>true</b> and the <code>Shared</code> property of the tooltip to <b>true</b> in the chart.
                </p>
                <p>Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Trackball, we need to inject <code>Tooltip</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the Tooltip and Trackball can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball/#trackball" aria-label="Navigate to the documentation for Trackball in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default TrackballChart;