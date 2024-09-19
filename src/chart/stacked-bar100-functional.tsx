/**
 * Sample for 100 percent StackingBar Series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingBarSeries, Tooltip, DataLabel, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: 'Jan', y: 6, y1: 6, y2: 1 }, { x: 'Feb', y: 8, y1: 8, y2: 1.5 },
    { x: 'Mar', y: 12, y1: 11, y2: 2 }, { x: 'Apr', y: 15, y1: 16, y2: 2.5 },
    { x: 'May', y: 20, y1: 21, y2: 3 }, { x: 'Jun', y: 24, y1: 25, y2: 3.5 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedBar100 = () => {
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
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ edgeLabelPlacement: 'Shift', title: 'Sales (In Percentage)', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} load={load.bind(this)} title='Sales Comparison' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' }}>
                    <Inject services={[StackingBarSeries, Legend, Tooltip, DataLabel, Category, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y' name='Apple' border={{ width: 1, color: "white" }} columnWidth={0.6} type='StackingBar100' />
                        <SeriesDirective dataSource={data} xName='x' yName='y1' name='Orange' border={{ width: 1, color: "white" }} columnWidth={0.6} type='StackingBar100' />
                        <SeriesDirective dataSource={data} xName='x' yName='y2' name='Wastage' border={{ width: 1, color: "white" }} columnWidth={0.6} type='StackingBar100' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This React 100% stacked bar chart example visualizes a comparison of sales percentages over several months with a default 100% stacked bar series. The legend in the sample shows more information about the series.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the 100% stacked bar chart. The 100% stacked bar chart displays multiple series of data as stacked bars, ensuring that the cumulative value of each stacked element always totals 100%.</p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use 100% stacking area series, we need to inject <code>StackingBarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the bar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-bar" aria-label="Navigate to the documentation for 100% Stacked Bar Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default StackedBar100;