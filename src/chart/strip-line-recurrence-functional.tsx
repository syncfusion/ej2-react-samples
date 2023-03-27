/**
 * Sample for stripline recurrence
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, ColumnSeries, DateTime, Tooltip, ILoadedEventArgs, StripLine, ChartTheme, Border, Highlight
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: new Date(1970, 1, 1), y: 16500 }, { x: new Date(1975, 1, 1), y: 16000 }, { x: new Date(1980, 1, 1), y: 15400 },
    { x: new Date(1985, 1, 1), y: 15800 }, { x: new Date(1990, 1, 1), y: 14000 }, { x: new Date(1995, 1, 1), y: 10500 },
    { x: new Date(2000, 1, 1), y: 13300 }, { x: new Date(2005, 1, 1), y: 12800 }];
export let data2: any[] = [{ x: new Date(1970, 1, 1), y: 8000 }, { x: new Date(1975, 1, 1), y: 7600 }, { x: new Date(1980, 1, 1), y: 6400 },
{ x: new Date(1985, 1, 1), y: 3700 }, { x: new Date(1990, 1, 1), y: 7200 }, { x: new Date(1995, 1, 1), y: 2300 },
{ x: new Date(2000, 1, 1), y: 4000 }, { x: new Date(2005, 1, 1), y: 4800 }];
const SAMPLE_CSS = `
     .control-container {
         padding: 0px !important;
     }
     #xIndex:hover {
        cursor: pointer;
    }
    #yIndex:hover {
        cursor: pointer;
    }`;
function Striplinerecurrence() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let xcheckElement: HTMLInputElement;
    let ycheckElement: HTMLInputElement;
    let loaded: EmitType<ILoadedEventArgs>;
    function xIndex(): void {
        chartInstance.primaryXAxis.stripLines[0].visible = xcheckElement.checked;
    };
    function yIndex(): void {
        chartInstance.primaryYAxis.stripLines[0].visible = ycheckElement.checked;
    };
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chart => chartInstance = chart}
                        primaryXAxis={{
                            valueType: 'DateTime', intervalType: 'Years', majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift',
                            minimum: new Date(1965, 1, 1), maximum: new Date(2010, 1, 1),  majorTickLines: {width : 0},
                            minorTickLines: {width: 0},
                            stripLines: [{
                                startFromAxis: true, size: 5, sizeType: 'Years', isRepeat: true, repeatEvery: 10, visible: true,
                                color: 'rgba(167,169,171, 0.1)'
                            }]
                        }}
                        chartArea={{ border: { width: 0 } }}
                        load={load.bind(this)}
                        primaryYAxis={{
                            minimum: 0, maximum: 18000, interval: 2000, majorGridLines: { color: 'rgba(167,169,171, 0.3)' },
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' },
                            stripLines: [
                                {
                                    startFromAxis: true, size: 2000, isRepeat: true, repeatEvery: 4000, visible: true,
                                    color: 'rgba(167,169,171, 0.1)'
                                }
                            ]
                        }}
                        legendSettings={{ visible: true, enableHighlight: true }}
                        tooltip={{
                            enable: true, format: ' Year: ${point.x}<br> Tons Per Day: ${point.y}'
                        }}
                        loaded={onChartLoad.bind(this)}
                        title='World Pollution Report'>
                        <Inject services={[ColumnSeries, DateTime, Category, Legend, Tooltip, StripLine, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} columnSpacing={0.1}
                                type='Column' name='AllSources' >
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' width={2}
                                type='Column' name='Autos && Light Trucks'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>X Axis:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="xIndex" defaultChecked={true} onChange={xIndex.bind(this)} style={{ marginLeft: '-5px' }} ref={d => xcheckElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Y Axis:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="yIndex" defaultChecked={true} onChange={yIndex.bind(this)} style={{ marginLeft: '-5px' }} ref={d => ycheckElement = d} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                This sample shows how to repeat a strip line in a chart.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure a strip line for the chart. To repeat the strip line, you need to set the <code>StartFromAxis</code>, <code>Size</code>, <code>IsRepeat</code>, and <code>RepeatEvery</code> properties accordingly in ChartStripline.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                    <code>ColumnSeries</code> module using <code>Chart.Inject(ColumnSeries)</code> method.
                </p>
                <p>
                    More information on the strip line can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/strip-line/">documentation section</a>.
                </p>
            </div>
        </div>
    );
    function onChartLoad(args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    function load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default Striplinerecurrence;