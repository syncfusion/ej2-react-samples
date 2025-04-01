/**
 * Sample for 100 percent Stacking Line series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, Inject, Legend, Category, StackingLineSeries, Tooltip, Highlight, ILegendClickEventArgs } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let chartData1: Object[] = [
    { x: 'O+ve', y: 39.0 },
    { x: 'A+ve', y: 36.0 },
    { x: 'B+ve', y: 7.6 },
    { x: 'AB+ve', y: 2.5 },
    { x: 'O-ve', y: 7.0 },
    { x: 'A-ve', y: 6.0 },
    { x: 'B-ve', y: 1.4 },
    { x: 'AB-ve', y: 0.5 }
];
export let chartData2: Object[] = [
    { x: 'O+ve', y: 40.0 },
    { x: 'A+ve', y: 30.0 },
    { x: 'B+ve', y: 15.0 },
    { x: 'AB+ve', y: 4.25 },
    { x: 'O-ve', y: 6.6 },
    { x: 'A-ve', y: 2.3 },
    { x: 'B-ve', y: 1.1 },
    { x: 'AB-ve', y: 0.75 }
];
export let chartData3: Object[] = [
    { x: 'O+ve', y: 47.0 },
    { x: 'A+ve', y: 26.0 },
    { x: 'B+ve', y: 9.0 },
    { x: 'AB+ve', y: 2.0 },
    { x: 'O-ve', y: 8.0 },
    { x: 'A-ve', y: 5.0 },
    { x: 'B-ve', y: 2.0 },
    { x: 'AB-ve', y: 1.0 }
];
export let chartData4: Object[] = [
    { x: 'O+ve', y: 29.0 },
    { x: 'A+ve', y: 46.3 },
    { x: 'B+ve', y: 12.0 },
    { x: 'AB+ve', y: 5.6 },
    { x: 'O-ve', y: 2.0 },
    { x: 'A-ve', y: 3.7 },
    { x: 'B-ve', y: 1.0 },
    { x: 'AB-ve', y: 0.4 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedLine100 = () => {
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
    const legendClick = (args: ILegendClickEventArgs) => {
        if (args.series.index === 0) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[0].width = 2;
            } else {
                args.chart.series[0].width = 3;
            }
        }

        if (args.series.index === 1) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[1].width = 2;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[1].width = 2;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[1].width = 2;
            } else {
                args.chart.series[1].width = 3;
                args.chart.series[0].width = 2;
            }
        }

        if (args.series.index === 2) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[2].width = 2;
            } else if (!args.series.visible) {
                args.chart.series[2].width = 3;
                args.chart.series[1].width = 2;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[2].width = 2;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[2].width = 2;
            }
        }

        if (args.series.index === 3) {
            if (!args.series.visible) {
                args.chart.series[3].width = 3;
                args.chart.series[2].width = 2;
                args.chart.series[1].width = 2;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[3].width = 2;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[3].width = 2;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[3].width = 2;
            }
        }
    };

    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 }, lineStyle: { width: 0 }, valueType: 'Category', labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim' }} primaryYAxis={{ title: 'Population Share (%)', lineStyle: { width: 0 }, interval: 20, minorTickLines: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 } }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ enableHighlight: true }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} load={load.bind(this)} loaded={loaded.bind(this)} legendClick={legendClick.bind(this)} title="Blood Type Distribution by Country" subTitle='Source: wikipedia.org' tooltip={{ enable: true, format: '${point.x} : <b>${point.y}% (${point.percentage}%)</b>', enableHighlight: true, showNearestTooltip: true }}>
                    <Inject services={[StackingLineSeries, Category, Legend, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartData1} xName="x" yName="y" name="Canada" width={2} type="StackingLine100" marker={{ visible: true, isFilled: true, shape: 'Circle', width: 7, height: 7 }}></SeriesDirective>
                        <SeriesDirective dataSource={chartData2} xName="x" yName="y" name="Algeria" width={2} type="StackingLine100" marker={{ visible: true, isFilled: true, shape: 'Diamond', width: 7, height: 7, }}></SeriesDirective>
                        <SeriesDirective dataSource={chartData3} xName="x" yName="y" name="Ireland" width={2} type="StackingLine100" marker={{ visible: true, isFilled: true, shape: 'Rectangle', width: 5, height: 5, }}></SeriesDirective>
                        <SeriesDirective dataSource={chartData4} xName="x" yName="y" name="Armenia" width={3} type="StackingLine100" marker={{ isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6, }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This React 100% Stacked Line Chart example visualizes the blood type distribution across different countries.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the 100% stacked line chart. This chart displays multiple series of data as stacked lines, ensuring that the cumulative proportion of each stacked element always totals 100%. <code>Markers</code> are used to represent individual data and its values.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use 100% stacking line series, we need to inject <code>StackingLineSeries</code>  module into <code>services</code>.
                </p>
                <p>
                    More information about the stacked line series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-line" aria-label="Navigate to the documentation for 100% Stacked Line Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default StackedLine100;