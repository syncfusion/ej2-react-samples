/**
 * Sample for rtl series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel, IAxisLabelRenderEventArgs, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [
    { x: 2016, y: 1000 },
    { x: 2017, y: 1170 },
    { x: 2018, y: 660 },
    { x: 2019, y: 1030 },
];
export let data2 = [
    { x: 2016, y: 400 },
    { x: 2017, y: 460 },
    { x: 2018, y: 1120 },
    { x: 2019, y: 540 },
];
export let data3 = [
    { x: 2016, y: 200 },
    { x: 2017, y: 250 },
    { x: 2018, y: 300 },
    { x: 2019, y: 350 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RTL = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    const labelRender = (args: IAxisLabelRenderEventArgs): void => {
        if (args.axis.orientation === 'Horizontal') {
            args.cancel = args.value === 2015 || args.value === 2020;
        }
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id="charts" style={{ textAlign: 'center' }} load={load.bind(this)} enableRtl={true} primaryXAxis={{ valueType: 'Double', majorGridLines: { width: 0 }, minimum: 2015, maximum: 2020, interval: 1, majorTickLines: {width : 0}, minorTickLines: {width: 0} }} primaryYAxis={{ valueType: 'Double', minimum: 0, maximum: 1200, interval: 200, labelFormat: '{value}B', lineStyle: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '75%'} title="Company Performance" legendSettings={{ visible:true , enableHighlight: true}} loaded={onChartLoad.bind(this)} axisLabelRender={labelRender.bind(this)}>
                    <Inject services={[ColumnSeries, Legend, Tooltip, Category, Highlight, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} columnSpacing= {0.1} xName="x" yName="y" name="Sales" type="Column" ></SeriesDirective>
                        <SeriesDirective dataSource={data2} columnSpacing= {0.1} xName="x" yName="y" name="Expense" type="Column" ></SeriesDirective>
                        <SeriesDirective dataSource={data3} columnSpacing= {0.1} xName="x" yName="y" name="Profit" type="Column" ></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes the company performance with default column chart in RTL direction. The values of the data points are displayed in a tooltip, and the legend in the sample displays information about the series.</p>
            </div>
            <div id="description">
                <p>
                    <code>Right-to-left</code>(RTL) is used to render the component from right to left direction and it can be enabled by setting <code>enableRtl</code> property as <b>true</b>.
                    In this demo, you can see <code>axis</code>, <code>data points</code>, <code>tooltip</code> and <code>legend</code> are aligned from right to left direction.
                </p>
                <p>
                    <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject <code>ColumnSeries</code> module into <code>services</code>.
                </p>
                <br />
                <p>
                    More information on the column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column" aria-label="Navigate to the documentation for Column Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default RTL;
