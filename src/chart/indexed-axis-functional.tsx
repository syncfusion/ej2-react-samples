/**
 * Sample for Indexed Category Axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, ILoadedEventArgs, LineSeries, ColumnSeries, Crosshair, ChartTheme, DataLabel
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'India', y: 7.3 },
    { x: 'Myanmar', y: 7.9 },
    { x: 'Bangladesh', y: 6.8 },
    { x: 'Cambodia', y: 7.0 },
    { x: 'China', y: 6.9 },];
export let data2: any[] = [
    { x: 'Australia', y: 2.7 },
    { x: 'Poland', y: 2.5 },
    { x: 'Singapore', y: 2.0 },
    { x: 'Canada', y: 1.4 },
    { x: 'Germany', y: 1.8 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function IndexedAxis() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let dropElement: HTMLInputElement;
    let loaded: EmitType<ILoadedEventArgs>;
    function onChange(): void {
        chartInstance.primaryXAxis.isIndexed = dropElement.checked;
        if (chartInstance.primaryXAxis.isIndexed) {
            chartInstance.tooltip.shared = false;
            chartInstance.series[0].type = 'Column';
            chartInstance.series[1].type = 'Column';
            chartInstance.series[0].marker.visible = false;
            chartInstance.series[1].marker.visible = false;
            chartInstance.primaryXAxis.labelRotation = 0;
            chartInstance.crosshair.line.width = 1;
        } else {
            chartInstance.series[0].type = 'Line';
            chartInstance.series[1].type = 'Line';
            chartInstance.series[0].marker.visible = true;
            chartInstance.series[1].marker.visible = true;
            chartInstance.primaryXAxis.labelRotation = 90;
            chartInstance.crosshair.line.width = 0;
            chartInstance.tooltip.enable = true;
            chartInstance.tooltip.shared = false;
        }
        chartInstance.refresh();
    };
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-md-9'>
                    <ChartComponent id='charts' ref={chart => chartInstance = chart}
                        primaryXAxis={{
                            valueType: 'Category',
                            interval: 1,
                            crosshairTooltip: { enable: false },
                            isIndexed: true,
                            labelRotation: Browser.isDevice ? -45 : 0,
                            labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
                            majorTickLines: {width : 0},
                            minorTickLines: {width: 0}
                        }}
                        primaryYAxis={{
                            labelFormat: '{value}%'
                        }}
                        chartArea={{ border: { width: 0 } }}
                        load={load.bind(this)}
                        title="Real GDP Growth" loaded={onChartLoad.bind(this)}
                        tooltip={{ enable: false, shared: true }}
                        crosshair={{ enable: false, lineType: 'Vertical' }}>
                        <Inject services={[Legend, Category, LineSeries, ColumnSeries,  Crosshair, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='2015' width={2}
                                type='Column'    marker={{
                                    dataLabel: {
                                      visible: true,
                                      position: 'Top',
                                      font: { fontWeight: '600' , size : Browser.isDevice ? '8px' : '11px'},
                                    }
                                }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='2016' width={2}
                                 type='Column'  marker={{
                                    dataLabel: {
                                      visible: true,
                                      position: 'Top',
                                      font: { fontWeight: '600' , size : Browser.isDevice ? '8px' : '11px'},
                                    }
                                }} >
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Indexed:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="isIndexed" defaultChecked={true} onChange={onChange.bind(this)} style={{ marginLeft: '-5px' }} ref={d => dropElement = d} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the rendering of indexed category axis in the chart by using two series.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to indexed axis in chart. For indexed category axis you can use <code>isIndexed</code> property.
                </p>
                <p>
                    Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices.
                </p>
                <p>
                    More information on the indexed axis can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
}
export default IndexedAxis;