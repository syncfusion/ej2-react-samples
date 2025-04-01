/**
 * Sample for Indexed Category Axis
 */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ILoadedEventArgs, LineSeries, ColumnSeries, Crosshair, ChartTheme, DataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let data1: any[] = [
    { x: 'India', y: 7.3 },
    { x: 'Myanmar', y: 7.9 },
    { x: 'Bangladesh', y: 6.0 },
    { x: 'Cambodia', y: 7.0 },
    { x: 'China', y: 6.9 },];
export let data2: any[] = [
    { x: 'Australia', y: 2.5 },
    { x: 'Poland', y: 2.7 },
    { x: 'Singapore', y: 2.0 },
    { x: 'Canada', y: 1.4 },
    { x: 'Germany', y: 1.8 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #isIndexed:hover {
        cursor: pointer;
    }`;
const IndexedAxis = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<HTMLInputElement>(null);
    let loaded: EmitType<ILoadedEventArgs>;
    const onChange = (): void =>{
        chartInstance.current.primaryXAxis.isIndexed = dropElement.current.checked;
        if (chartInstance.current.primaryXAxis.isIndexed) {
            chartInstance.current.tooltip.shared = false;
            chartInstance.current.series[0].type = 'Column';
            chartInstance.current.series[1].type = 'Column';
            chartInstance.current.series[0].marker.visible = false;
            chartInstance.current.series[1].marker.visible = false;
            chartInstance.current.primaryXAxis.labelRotation = 0;
            chartInstance.current.crosshair.line.width = 1;
        } else {
            chartInstance.current.series[0].type = 'Line';
            chartInstance.current.series[1].type = 'Line';
            chartInstance.current.series[0].marker.visible = true;
            chartInstance.current.series[1].marker.visible = true;
            chartInstance.current.primaryXAxis.labelRotation = 90;
            chartInstance.current.crosshair.line.width = 0;
            chartInstance.current.tooltip.enable = false;
            chartInstance.current.tooltip.shared = false;
        }
        chartInstance.current.refresh();
    };
    const onChartLoad = (args: ILoadedEventArgs): void => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-9'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', interval: 1, crosshairTooltip: { enable: false }, isIndexed: true, labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: {width : 0}, minorTickLines: {width: 0}, majorGridLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}%', title: 'GDP Growth Rate', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} load={load.bind(this)} title="GDP by Countries" loaded={onChartLoad.bind(this)} tooltip={{ enable: false}} crosshair={{ enable: false, lineType: 'Vertical' }}>
                        <Inject services={[Legend, Category, LineSeries, ColumnSeries,  Crosshair, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='2015' width={2} type='Column' marker={{ height: 10, width: 10, dataLabel: { visible: true, position: 'Top', enableRotation : Browser.isDevice ? true : false, angle: -90, font: {  size : Browser.isDevice ? '8px' : '11px' } } }} />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='2016' width={2} type='Column'  marker={{ height: 10, width: 10, dataLabel: { visible: true, position: 'Top', enableRotation : Browser.isDevice ? true : false, angle: -90, font: {  size : Browser.isDevice ? '8px' : '11px' } } }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="indexed">Indexed:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="isIndexed" defaultChecked={true} onChange={onChange.bind(this)} style={{ marginLeft: '-5px' }} ref={dropElement} aria-labelledby="Checkbox checked"/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample shows an indexed category axis in a chart with details about GDP growth across different countries.
                </p>
            </div>
            <div id="description">
                <p>
                    The category axis is also rendered on the basis of the index values in the data source. To render the indexed category axis, set <code>ValueType</code> to Category and <code>IsIndexed</code> property to <b>true</b>.
                </p>
                <p>
                    More information on the indexed axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/category-axis/#indexed-category-axis" aria-label="Navigate to the documentation for Indexed category Axis in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default IndexedAxis;