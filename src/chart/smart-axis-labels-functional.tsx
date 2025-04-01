/**
 * Sample for smart axis labels
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, DataLabel, IPointRenderEventArgs,
    ILoadedEventArgs, Category, ColumnSeries, Inject, LabelIntersectAction, EdgeLabelPlacement, ChartTheme,
    AxisPosition
} from '@syncfusion/ej2-react-charts';
import { loadChartTheme, pointRenderEvent } from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

export let data1: any[] = [{ x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
{ x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
{ x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
{ x: 'France', y: 45 }, { x: 'United Arab Emirates', y: 10 },
{ x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
{ x: 'Brazil', y: 76 }, { x: 'China', y: 51 }];

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function SmartAxisLabels() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let widthElement: NumericTextBoxComponent;
    let checkElement: HTMLInputElement;
    let dropElement: DropDownListComponent;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Hide' },
        { value: 'Trim' },
        { value: 'Wrap' },
        { value: 'MultipleRows' },
        { value: 'Rotate45' },
        { value: 'Rotate90' },
        { value: 'None' }
    ];
    function change(): void {
        chartInstance.primaryXAxis.labelIntersectAction = dropElement.value as LabelIntersectAction;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    };
    function mode(): void {
        chartInstance.primaryXAxis.edgeLabelPlacement = modeElement.value as EdgeLabelPlacement;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    };
    function trim(): void {
        chartInstance.primaryXAxis.enableTrim = checkElement.checked;
        chartInstance.refresh();
    };
    function xwid(): void {
        chartInstance.primaryXAxis.maximumLabelWidth = widthElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    function xpos(): void {
        chartInstance.primaryXAxis.labelPosition = posElement.value as AxisPosition;
        chartInstance.refresh();
    };
    let modeElement: DropDownListComponent;
    let modelist: { [key: string]: Object }[] = [
        { value: 'None' },
        { value: 'Hide' },
        { value: 'Shift' }
    ];
    let posElement: DropDownListComponent;
    let poslist: { [key: string]: Object }[] = [
        { value: 'Inside' },
        { value: 'Outside' }
    ];
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chart => chartInstance = chart} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Category',
                            interval: 1,
                            majorGridLines: { width: 0 },
                            labelIntersectAction: 'Hide',
                            majorTickLines: {width : 0},
                            minorTickLines: {width: 0}
                        }}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            labelStyle: { size: '0px' },
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 0 },
                            lineStyle: { width: 0 },
                        }}
                        load={load.bind(this)}
                        pointRender={pointRender}
                        title="Internet Users in Millions"
                        loaded={onChartLoad.bind(this)}
                        legendSettings={{ visible: false }}
                        tooltip={{ enable: true, format: "<b>${point.x}</b> <br> Internet Users : <b>${point.y}M</b>", header: ''  }}>
                        <Inject services={[Category, Category, ColumnSeries, Tooltip, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name="Users" type='Column' marker={{ dataLabel: { visible: true, enableRotation: Browser.isDevice ? true : false, angle: -90, position: 'Top', format:"{value}M", font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td>
                                    <div>Intersect Action: </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent width="120px" id="selchange" change={change.bind(this)} ref={d => dropElement = d} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Hide" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Edge Label<br />Placement: </div></td>
                                <td style={{ padding: 10 }}>
                                    <DropDownListComponent width="120px" id="selmode" change={mode.bind(this)} ref={d => modeElement = d} dataSource={modelist} fields={{ text: 'value', value: 'value' }} value="None" />
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Label Position: </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent width="120px" id="labmode" change={xpos.bind(this)} ref={d => posElement = d} dataSource={poslist} fields={{ text: 'value', value: 'value' }} value="Outside" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="trim">Enable Trim:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="trimmode" defaultChecked={false} onChange={trim.bind(this)} style={{ marginLeft: '-5px' }} ref={d => checkElement = d} aria-labelledby="Checkbox unchecked"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="labelWidth">Maximum Label Width:</div>
                                </td>
                                <td style={{ padding: 10, width: '40%' }}>
                                    <NumericTextBoxComponent width={120} value={34} min={1} change={xwid.bind(this)} ref={d => widthElement = d} aria-labelledby="Text"/>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                This example shows the smart label placement for the chart axis labels.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how the axis labels are smartly arranged when they overlap with each other using the <code>LabelIntersectAction</code> property in the axis.
                </p>
                <p>Chart supports the following by which can be set using <code>labelIntersectAction</code> property.
                </p>
                <ul>
                    <li><code>Hide</code> - Hide the label when it intersect.</li>
                    <li><code>Trim</code> - Trim the label when it intersect.</li>
                    <li><code>Wrap</code> - Wrap the label when it intersect.</li>
                    <li><code>MultipleRows</code> - Arrange the label in multiple row when it intersect.</li>
                    <li><code>Rotate45</code> - Rotate the label to 45 degree when it intersect.</li>
                    <li><code>Rotate90</code> - Rotate the label to 90 degree when it intersect.</li>
                    <li><code>None</code> - Shows all the labels.</li>
                </ul>
                <p>Chart supports three types of edge labels placement which can be set using <code>edgeLabelPlacement</code> property.
                </p>
                <ul>
                    <li><code>None</code> - No action will be performed.</li>
                    <li><code>Hide</code> - Edge label will be hidden .</li>
                    <li><code>Shift</code> - Shifts the edge labels.</li>
                </ul>
                <p>
                    More information on the smart axis labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/axis-labels#smart-axis-labels" aria-label="Navigate to the documentation for Smart Axis Labels in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    function load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    function pointRender (args: IPointRenderEventArgs): void {
        pointRenderEvent(args);
    }
}
export default SmartAxisLabels;