/**
 * Sample for Line Series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Category, Inject, ColumnSeries, LineSeries, DataEditing, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 2005, y: 21 }, { x: 2006, y: 24 },
    { x: 2007, y: 36 }, { x: 2008, y: 38 },
    { x: 2009, y: 54 }, { x: 2010, y: 57 },
    { x: 2011, y: 70 }
];
export let data2: any[] = [
    { x: 2005, y: 28 }, { x: 2006, y: 44 },
    { x: 2007, y: 48 }, { x: 2008, y: 50 },
    { x: 2009, y: 66 }, { x: 2010, y: 78 },
    { x: 2011, y: 84 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const DataEdit = () => {
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', labelFormat: 'y', labelPlacement: 'BetweenTicks', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', majorTickLines: { width : 0}, minorTickLines: { width : 0} }} load={load.bind(this)} primaryYAxis={{ rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, title: 'Production(Billion in kWh)', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} title='Electricity - Production' loaded={onChartLoad.bind(this)}>
                    <Inject services={[LineSeries, ColumnSeries, Category, DataEditing, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} dragSettings={{ enable: true }} xName='x' yName='y' name='Renewable' width={2} marker={{ visible: true, width: 7, height: 7 }} type='Column' />
                        <SeriesDirective dataSource={data2} dragSettings={{ enable: true }} xName='x' yName='y' name='Non-Renewable' width={2} marker={{ visible: true, width: 7, height: 7, isFilled: true }} type='Line' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the behavior of the data editing in the chart. Drag and drop the points to change the data values dynamically.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to drag and drop the data points in the chart by setting Enable property in <code>ChartDataEditSettings</code> to <b>true</b>. Also, you can set data editing’s minimum and maximum range using the <code>MinY</code> and <code>MaxY</code> properties.
                </p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use data editing, we need to inject
                    <code>DataEditing</code> module using <code>Chart.Inject(DataEditing)</code> method.
                </p> <br>
                </br>
                <p>
                    More information on the Data Editing can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/data-editing/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default DataEdit;
