/**
 * Sample for Stacking Line series
 */
import * as React from "react";
import { useEffect } from "react";
import { ChartComponent, SeriesCollectionDirective, ILoadedEventArgs, Highlight, SeriesDirective, Inject, Legend, Double, StackingLineSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let chartData1: Object[] = [
    { x: 2015, y: 28.2 },
    { x: 2016, y: 28.6 },
    { x: 2017, y: 46.0 },
    { x: 2018, y: 52.7 },
    { x: 2019, y: 62.0 },
    { x: 2020, y: 64.6 },
    { x: 2021, y: 60.1 },
    { x: 2022, y: 68.6 },
    { x: 2023, y: 71.81 }
];
export let chartData2: Object[] = [
    { x: 2015, y: 15.0 },
    { x: 2016, y: 16.7 },
    { x: 2017, y: 14.2 },
    { x: 2018, y: 15.3 },
    { x: 2019, y: 16.4 },
    { x: 2020, y: 13.9 },
    { x: 2021, y: 14.8 },
    { x: 2022, y: 16.1 },
    { x: 2023, y: 16.02 }
];
export let chartData3: Object[] = [
    { x: 2015, y: 8.1 },
    { x: 2016, y: 8.4 },
    { x: 2017, y: 7.73 },
    { x: 2018, y: 5.1 },
    { x: 2019, y: 8.7 },
    { x: 2020, y: 9.4 },
    { x: 2021, y: 10.3 },
    { x: 2022, y: 10.4 },
    { x: 2023, y: 11.17 }
];
export let chartData4: Object[] = [
    { x: 2015, y: 4.6 },
    { x: 2016, y: 7.5 },
    { x: 2017, y: 12.1 },
    { x: 2018, y: 25.9 },
    { x: 2019, y: 39.3 },
    { x: 2020, y: 50.1 },
    { x: 2021, y: 60.4 },
    { x: 2022, y: 73.5 },
    { x: 2023, y: 102.01 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedLine = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const loaded = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style> {SAMPLE_CSS} </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, valueType: 'Double', labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim' }} primaryYAxis={{ lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}TWh', title: 'Energy Generation (TWh)' }} legendSettings={{ enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} load={load.bind(this)} loaded={loaded.bind(this)} title='Yearly Renewable Energy Generation in India (2015-2023)' subTitle='Source: wikipedia.org' tooltip={{ enable: true, enableHighlight: true, showNearestTooltip: true, header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}</b>' }}>
                    <Inject services={[StackingLineSeries, Double, Legend, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartData1} xName='x' yName='y' name='Wind' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }} />
                        <SeriesDirective dataSource={chartData2} xName='x' yName='y' name='Bio mass' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Diamond', width: 7, height: 7 }} />
                        <SeriesDirective dataSource={chartData3} xName='x' yName='y' name='Small Hydro' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Rectangle', width: 5, height: 5 }} />
                        <SeriesDirective dataSource={chartData4} xName='x' yName='y' name='Solar' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6 }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This React Stacked Line Chart example visualizes the yearly renewable energy generation in India from 2015 to 2023.
                </p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the stacked line chart. The stacked line chart visualizes data with y-values stacked one over another in a series order. It shows the relationship between individual values to the total sum of points.</p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking line series, we need to inject <code>StackingLineSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the stacked line series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-line" aria-label="Navigate to the documentation for Stacked Line Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default StackedLine;