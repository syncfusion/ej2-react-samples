/**
 * Sample for Pareto chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, AxesDirective, AxisDirective,
    Category, ColumnSeries, Legend, Tooltip, ChartTheme,ParetoSeries, LineSeries, Highlight
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    export let data1: any[] = [
        { x: 'Button Defect', y: 23 }, { x: 'Pocket Defect', y: 16 },
        { x: 'Collar Defect ', y: 10 }, { x: 'Cuff Defect', y: 7 },
        { x: 'Sleeve Defect', y: 6 }, { x: 'Other Defect', y: 2}
    ];

export class ParetoChart extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ interval: 1, valueType: 'Category', majorGridLines: { width: 0 }, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45 : 0, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, }} primaryYAxis={{ title: 'Frequency of Occurence', minimum: 0, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} title='Defects in Shirts' loaded={this.onChartLoad.bind(this)} legendSettings={{ visible: true, enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} tooltip={{ enable: true, shared: true, format: '${series.name} : <b>${point.y}</b>' }}>
                        <Inject services={[Category, ColumnSeries, Legend, LineSeries, Tooltip, ParetoSeries, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Defect' type='Pareto' width={2} opacity= {0.75} columnWidth= {0.4} cornerRadius= {{ topLeft: Browser.isDevice? 4 : 6, topRight: Browser.isDevice ? 4 : 6 }} paretoOptions={{ marker: { visible: true, isFilled: true, width: 7, height: 7 }, dashArray: '3,2', width: 2 }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}></div>
                </div>
                <div id="action-description">
                    <p>This sample visualizes the defects in shirts with default pareto series in the chart. Data points are enhanced with marker and tooltip.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a pareto chart. The pareto chart is used to find the cumulative values of the data in different categories. It is a combination of the column and line series. The initial values are shown in the column chart and the cumulative values are shown in the line chart.
                    </p>
                    <p>
                        The line series in the pareto chart can be customized using the <code>fill</code>, <code>dashArray</code>, <code>width</code>, and <code>marker</code> properties in <code>paretoOptions</code>. Additionally, the secondary axis in the pareto chart can be shown or hidden using the <code>showAxis</code> property in <code>paretoOptions</code>.
                    </p>
                    <p><code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <br />
                    <p style={{ "fontWeight": 500 }}><b>Injecting Module</b></p>
                    <p>
                        In this example, we have used pareto series with the help of column and line series. To use pareto feature, we need to inject <code>ParetoSeries</code>, <code>ColumnSeries</code> and <code>LineSeries</code> modules into <code>services</code>.
                    </p>
                    <p>
                        More information on the pareto series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/pareto" aria-label="Navigate to the documentation for Pareto in React Chart component"> documentation section</a>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}