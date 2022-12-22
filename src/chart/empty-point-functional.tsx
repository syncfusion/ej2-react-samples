/**
 * Sample for Empty Point
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, ChartTheme, SplineSeries, AreaSeries, ChartSeriesType,
    EmptyPointMode, Category, Legend, Tooltip, ILoadedEventArgs, Inject
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data1: any[] = [
    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function EmptyPoint() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let dropElement: DropDownListComponent;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Column' },
        { value: 'Area' },
        { value: 'Spline' },
    ];
    let modeElement: DropDownListComponent;
    let modelist: { [key: string]: Object }[] = [
        { value: 'Gap' },
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    function change(): void {
        chartInstance.series[0].type = dropElement.value as ChartSeriesType;
        chartInstance.refresh();
    };
    function mode(): void {
        chartInstance.series[0].emptyPointSettings.mode = modeElement.value as EmptyPointMode;
        chartInstance.series[0].emptyPointSettings.fill = '#e6e6e6';
        chartInstance.refresh();
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
                            valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45: 0,   majorTickLines: {width : 0},
                            minorTickLines: {width: 0}
                        }}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%'
                        }}
                        load={load.bind(this)}
                        legendSettings={{ visible: false }}
                        title="Annual Product-Wise Profit Analysis" loaded={onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[ColumnSeries, Category, Legend, Tooltip, SplineSeries, AreaSeries]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Profit'
                                type='Column' marker={{ visible: true, height: 10, width: 10 }} emptyPointSettings={{
                                    fill: '#e6e6e6'
                                }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Series Type: </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={change.bind(this)} ref={d => dropElement = d} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Column" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Empty Point Mode: </div></td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={mode.bind(this)} ref={d => modeElement = d} dataSource={modelist} fields={{ text: 'value', value: 'value' }} value="Gap" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the empty point functionality in chart series. The mode of empty point can be changed by using <code>Empty Point Mode</code> in property panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the empty points. You can use <code>border</code>,
                    <code>fill</code>, <code>mode</code> properties to customize the empty points.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p>
                    More information on the empty points can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
            </div>
        </div >
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light") as ChartTheme;
    };
}
export default EmptyPoint;