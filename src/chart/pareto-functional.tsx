/**
 * Sample for Pareto chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, AxesDirective, AxisDirective,
    Category, ColumnSeries, Legend, Tooltip, ChartTheme, ParetoSeries, LineSeries, 
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
export let data1: any[] = [
    { x: 'Button Defect', y: 23 }, { x: 'Pocket Defect', y: 16 },
    { x: 'Coller Defect ', y: 10 }, { x: 'Cuff Defect', y: 7 },
    { x: 'Sleeve Defect', y: 6 }
];
function ParetoChart() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }}
                    primaryXAxis={{ interval: 1, valueType: 'Category', majorGridLines: { width: 0 },labelIntersectAction: 'Rotate45', minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, }}
                    primaryYAxis={{ title: 'Frequency of Occurence', minimum: 0, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 } }}
                    chartArea={{ border: { width: 0 } }}
                    load={load.bind(this)}
                    title='Pareto chart - Defects in Shirts' loaded={onChartLoad.bind(this)}
                    legendSettings={{ visible: false }}
                    width={Browser.isDevice ? '100%' : '75%'}
                    tooltip={{ enable: true, shared: false }}
                >
                    <Inject services={[Category, ColumnSeries, Legend, LineSeries, Tooltip, ParetoSeries]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' name='Defect' type='Pareto' width={2} marker={{ visible: true }}>
                        </SeriesDirective>

                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>
                </div>
            </div>
            <div id="action-description">
                <p>
                This sample illustrates a pareto chart with line and column series.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure a pareto chart. The pareto chart is used to find the cumulative values of the data in different categories. It is a combination of the column and line series. The initial values are shown in the column chart and the cumulative values are shown in the line chart.
                </p>
                <p>
                Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br />
                <p style={{ "fontWeight": 500 }}>Injecting Module</p>
                <p>
                    In this example, we have used pareto series with the help of column and line series. To use pareto feature, we need to inject
                    <code>ParetoSeries</code> <code>ColumnSeries</code> <code>LineSeries</code> modules using
                    <code>Chart.Inject(ParetoSeries)</code> <code>Chart.Inject(ColumnSeries)</code> <code>Chart.Inject(LineSeries)</code>  method.
                </p>
                <p>
                    More information on the pareto chart can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/other-types/#pareto-chart"> documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default ParetoChart;