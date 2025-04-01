/**
 * Sample for Empty Point
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, ChartTheme, SplineSeries, AreaSeries, ChartSeriesType, EmptyPointMode, Category, Legend, Tooltip, ILoadedEventArgs, Inject, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
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
const EmptyPoint = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [emptyPointMode, setEmptyPointMode] = useState<EmptyPointMode>('Gap');
    const [chartType, setchartType] = useState<ChartSeriesType>('Column');

    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let modeElement = useRef<DropDownListComponent>(null);

    let droplist: { [key: string]: Object }[] = [
        { value: 'Column' },
        { value: 'SplineArea' },
        { value: 'Spline' },
    ];
    let modelist: { [key: string]: Object }[] = [
        { value: 'Gap' },
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    const change = (): void => {
        setchartType(dropElement.current.value as ChartSeriesType);
        if (dropElement.current.value === 'Spline') {
            setIsVisible(true);
            chartInstance.current.series[0].marker.visible = true;
        }
        else {
            setIsVisible(false);
            chartInstance.current.series[0].marker.visible = false;
        }
        chartInstance.current.series[0].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.refresh();
    };
    const mode = (): void => {
        setEmptyPointMode(modeElement.current.value as EmptyPointMode);
        chartInstance.current.series[0].emptyPointSettings.mode = modeElement.current.value as EmptyPointMode
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
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45: 0, majorTickLines: {width : 0}, title:'Product', minorTickLines: {width: 0}, majorGridLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ title: 'Profit' , minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} load={load.bind(this)} legendSettings={{ visible: false }} title="Annual Product-Wise Profit Analysis" loaded={onChartLoad.bind(this)} tooltip={{ enable: true, header: '' }}>
                        <Inject services={[ColumnSeries, Category, Legend, Tooltip, SplineSeries, SplineAreaSeries]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Profit' type={chartType} marker={{ visible: isVisible, height: 10, width: 10 }} emptyPointSettings={{ fill: '#e6e6e6', mode: emptyPointMode }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Series Type: </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selchange"  change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value={chartType} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Empty Point Mode: </div></td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={mode.bind(this)} ref={modeElement} dataSource={modelist} fields={{ text: 'value', value: 'value' }} value={emptyPointMode} />
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates the annual profit by product analysis of an organization with empty point functionality.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure empty points for a chart. Users can customize the empty points using <code>ChartEmptyPointSettings</code> in series. Default empty point Mode is <b>Gap</b>.
                </p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p>
                    More information on the empty points can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#empty-points" aria-label="Navigate to the documentation for Empty points in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default EmptyPoint;