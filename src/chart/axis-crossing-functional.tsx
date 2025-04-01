/**
 * Sample for smart axis labels
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, LineSeries, ScatterSeries, SplineSeries, Tooltip, Legend, Inject, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { loadChartTheme } from './theme-color';
export let data1: any[] = [{ x: -6, y: 2 }, { x: -3, y: -4 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }];
export let data2: any[] = [
    { x: -6, y: 2 }, { x: -5, y: 0 }, { x: -4.511, y: -0.977 }, { x: -3, y: -4 }, { x: -1.348, y: -1.247 },
    { x: -0.6, y: 0 }, { x: 0, y: 1 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }
];
export let data3: any[] = [
    { x: -6, y: 2 }, { x: -5.291, y: 0 }, { x: -5, y: -0.774 }, { x: -3, y: -4 }, { x: -0.6, y: -0.965 },
    { x: -0.175, y: 0 }, { x: 0, y: 0.404 }, { x: 1.5, y: 3.5 }, { x: 3.863, y: 5.163 }, { x: 6, y: 4.5 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const AxisCrossing = () => {
    useEffect(() => {
        updateSampleSection();
       
    }, [])
    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let checkboxElement = useRef<HTMLInputElement>(null);
    let numericValue = useRef<NumericTextBoxComponent>(null);
    let droplist: { [key: string]: Object }[] = [
        { value: 'X' },
        { value: 'Y' },
    ];
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    const change = (): void => {
        if (dropElement.current.value === 'X') {
            checkboxElement.current.checked = chartInstance.current.primaryXAxis.placeNextToAxisLine;
            numericValue.current.value = +chartInstance.current.primaryXAxis.crossesAt;
        } else {
            checkboxElement.current.checked = chartInstance.current.primaryYAxis.placeNextToAxisLine;
            numericValue.current.value = +chartInstance.current.primaryYAxis.crossesAt;
        }
        chartInstance.current.dataBind();
    };
    const crosshingValue = (): void => {
        if (dropElement.current.index === 0) {
            chartInstance.current.primaryXAxis.crossesAt = numericValue.current.value;
        } else {
            chartInstance.current.primaryYAxis.crossesAt = numericValue.current.value;
        }
        chartInstance.current.dataBind();
    };
    const handleCheckboxChange = (e) => {
        if (dropElement.current.index === 0) {
            chartInstance.current.primaryXAxis.placeNextToAxisLine = checkboxElement.current.checked;
        } else {
            chartInstance.current.primaryYAxis.placeNextToAxisLine = checkboxElement.current.checked;
        }
        chartInstance.current.dataBind();
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} style={{ textAlign: "center" }} primaryXAxis={{ minimum: -8, maximum: 8, interval: 2, valueType: 'Double', lineStyle: { width: 2 }, minorTickLines: { width: 0 }, majorTickLines: { width: 0 }, crossesAt: 0, minorTicksPerInterval: 3 }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} primaryYAxis={{ minimum: -8, maximum: 8, interval: 2, lineStyle: { width: 2 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, crossesAt: 0, minorTicksPerInterval: 3 }} legendSettings = {{ visible: true, enableHighlight: true }} load={load.bind(this)} title="Spline Interpolation" tooltip={{ enable: true, enableHighlight: true }} loaded={onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, ScatterSeries, Highlight, SplineSeries, Tooltip, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name="Linear Interpolation" type='Line' width={2} enableTooltip={false} fill='Blue' />
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name="Cubic Spline Interpolation" type='Spline' width={2} enableTooltip={false} fill='Green' />
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name="Data Points" type='Scatter' width={2} marker={{ visible: false, width: 7, height: 7 }} fill='red' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Axis: </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent index={0} width="120px" id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="X" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="crossValue">Crosses Value:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <NumericTextBoxComponent value={0} min={-8} max={8} width={120} step={2} change={crosshingValue.bind(this)} style={{ marginLeft: '-5px' }} ref={numericValue} aria-labelledby="Text"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="axis">Placing Label Near to Axis Line:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="axisElements" onChange={(e) => handleCheckboxChange(e)} style={{ marginLeft: '-5px' }} defaultChecked={true} ref={checkboxElement} aria-labelledby="Checkbox checked"/>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates an interpolation of data points between linear and cubic by using spline and line series.</p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates the axis crossing behavior in chart.
                    Axis can be positioned anywhere in the chart area by using the <code>crossesAt</code> property of axis. This property specifies where the horizontal axis should intersect or cross the vertical axis and vice-versa.
                </p>
                <p>
                    Default value of crossesAt property is null. So, you can use <code>placeNextToAxisLine</code> property to place the axis labels and ticks next to axis line.
                    When there are multiple axes, you can choose an axis to cross by using <code>crossesInAxis</code> property.
                    If the axis name is not valid, primaryXAxis or primaryYAxis will be used for crossing, by default.
                </p>
                <p>
                    More information on the smart axis labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/axis-customization/#axis-crossing" aria-label="Navigate to the documentation for Axis Crossing in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default AxisCrossing;