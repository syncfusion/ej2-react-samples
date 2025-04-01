/**
 * Sample for smart axis labels
 */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, Category, StackingColumnSeries, Inject, ChartTheme, sort, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { loadChartTheme } from './theme-color';
export let data1: any[] = [
    { x: 'Asia', car: 120, trucks: 90, bike: 180, cycle: 90 },
    { x: 'Canada', car: 100, trucks: 80, bike: 90, cycle: 80 },
    { x: 'Europe', car: 80, trucks: 90, bike: 60, cycle: 50 },
    { x: 'Africa', car: 40, trucks: 20, bike: 30, cycle: 30 },
    { x: 'Mexico', car: 40, trucks: 50, bike: 80, cycle: 50 },
    { x: 'US', car: 140, trucks: 90, bike: 75, cycle: 70 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Sorting = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [dataSource, setDataSource] = useState<Object>(data1);
    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let checkElement = useRef<HTMLInputElement>(null);
    let droplist: { [key: string]: Object }[] = [
        { value: 'None' },
        { value: 'Sort by X' },
        { value: 'Sort by Y' },
    ];
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    const change = (): void => {
        sortDataSource(dropElement.current.value + '');
    };
    const isDescending = (): void => {
        sortDataSource(dropElement.current.value + '');
    };
    const sortDataSource = (value: string): void => {
        let isDecending: boolean = checkElement.current.checked;
        checkElement.current.disabled = false;
        let sortData: Object[];
        if (value === 'Sort by X') {
            sortData = sort(data1, ['x'], isDecending);
        } else if (value === 'Sort by Y') {
            sortData = sort(data1, ['car', 'trucks', 'bike', 'cycle'], isDecending);
        } else {
            checkElement.current.disabled = true;
            sortData = data1;
        }
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.series[2].animation.enable = false;
        chartInstance.current.series[3].animation.enable = false;
        chartInstance.current.series[0].dataSource = sortData;
        chartInstance.current.series[1].dataSource = sortData;
        chartInstance.current.series[2].dataSource = sortData;
        chartInstance.current.series[3].dataSource = sortData;
        chartInstance.current.refresh();
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} style={{ textAlign: "center" }} primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, labelIntersectAction: 'Rotate45', valueType: 'Category' }} width={'92%'} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} primaryYAxis={{ title: 'Sales', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}K' }} load={load.bind(this)} title="Vehicle Sales by Region" loaded={onChartLoad.bind(this)} legendSettings={{ visible: true }} tooltip={{ enable: true, enableHighlight: true }}>
                        <Inject services={[Category, StackingColumnSeries, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dataSource} xName='x' yName='car' name="Car" type='StackingColumn' width={2} />
                            <SeriesDirective dataSource={dataSource} xName='x' yName='trucks' name="Trucks" type='StackingColumn' width={2} />
                            <SeriesDirective dataSource={dataSource} xName='x' yName='bike' name="Bike" type='StackingColumn' width={2} />
                            <SeriesDirective dataSource={dataSource} xName='x' yName='cycle' name="Cycle" type='StackingColumn' width={2} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="checkValue">Descending: </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="isDescending" disabled onChange={isDescending.bind(this)} style={{ marginLeft: '-5px' }} ref={checkElement} aria-labelledby="Checkbox unchecked"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Sort By: </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="None" />
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample visualizes sales for vehicle range for different zone with default stacked column series in chart. Legend in the sample shows the information about those series.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to sort the series data in chart. To sort the data points of the series, use the <code>sort</code> method.
                    This method determines whether the series data points should be sorted by their arguments or values.
                </p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject <code>StackingColumnSeries</code> module using <code>Chart.Inject(StackingColumnSeries)</code> method.
                </p>
            </div>
        </div>
    )
}
export default Sorting;