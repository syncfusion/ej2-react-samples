/**
 * Sample for DateTime axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, DateTime, Legend, DataLabel, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data1: any[] = [
    { x: new Date(2016, 3, 1), y: 6.3 },
    { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
    { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
    { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 }
];
export let data2: any[] = [
    { x: new Date(2016, 3, 1), y: -5.3 },
    { x: new Date(2016, 4, 1), y: 1.0 }, { x: new Date(2016, 5, 1), y: 6.9 },
    { x: new Date(2016, 6, 1), y: 9.4 }, { x: new Date(2016, 7, 1), y: 7.6 },
    { x: new Date(2016, 8, 1), y: 2.6 }, { x: new Date(2016, 9, 1), y: -4.9 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function DateTimeAxis() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            labelFormat: 'MMM',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        load={load.bind(this)}
                        primaryYAxis={{
                            minimum: -20,
                            maximum: 30,
                            interval: 10,
                            edgeLabelPlacement: 'Shift',
                            labelFormat: '{value}°C',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        title='Alaska Weather Statistics - 2016' loaded={onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, DateTime, Legend, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Warmest' type='Line'
                                marker={{
                                    visible: true, height: 10, width: 10, shape: 'Pentagon',
                                    dataLabel: { visible: true, position: 'Top' }
                                }} width={2}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Coldest' type='Line'
                                marker={{
                                    visible: true, height: 10, width: 10, shape: 'Pentagon',
                                    dataLabel: { visible: true, position: 'Top' }
                                }} width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                        <a href="http://www.yr.no/place/USA/Alaska/Hatcher_Pass/statistics.html" target="_blank">www.yr.no</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the rendering of date time axis in the chart with weather statistics analysis of Alaska for a year.
                    </p>
                </div>
                <div id="description">
                    <p>
                        DateTime data is used in this sample and data values are represented using dataLabel. Date time axis uses date time scale and displays the date time values as axis labels. To render dateTime axis, set <code>valueType</code> in axis to <code>DateTime</code>.
                        Format for the axis label will be calculated based on intervalType of axis or we can set the format through labelFormat property in axis.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use DateTime axis, we need to inject
                        <code>DateTime</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the DateTime axis can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#valuetype-valuetype">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };
}
export default DateTimeAxis;