/**
 * Sample for Line Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries,
    LineSeries, Category, DataEditing, Legend, Tooltip, ILoadedEventArgs, ChartTheme, DragSettings
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: '2005', y: 21 }, { x: '2006', y: 60 },
    { x: '2007', y: 45 }, { x: '2008', y: 50 },
    { x: '2009', y: 74 }, { x: '2010', y: 65 },
    { x: '2011', y: 85 }

];
export let data2: any[] = [
    { x: '2005', y: 21 }, { x: '2006', y: 22 },
    { x: '2007', y: 36 }, { x: '2008', y: 34 },
    { x: '2009', y: 54 }, { x: '2010', y: 55 },
    { x: '2011', y: 60 }

];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export class DataEdit extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', labelFormat: 'y', labelPlacement: 'BetweenTicks', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', majorTickLines: { width : 0}, minorTickLines: { width : 0} }} load={this.load.bind(this)} primaryYAxis={{ rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, title: 'Production(Billion in kWh)', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} title='Electricity - Production' loaded={this.onChartLoad.bind(this)}>
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
                    </p>
                    <p>
                        More information on the Data Editing can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/data-editing/" aria-label="Navigate to the documentation for Data Editing in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
}
