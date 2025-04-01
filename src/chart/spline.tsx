/**
 * Sample for Spline series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, AnnotationsDirective, AnnotationDirective, ChartAnnotation, ILoadedEventArgs, Legend, Category, SplineSeries, Tooltip, Crosshair, Highlight } from '@syncfusion/ej2-react-charts';
import { loadChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let minimumData: Object[] = [
    { x: 'Jan', y: 22.75 },
    { x: 'Feb', y: 29.71 },
    { x: 'Mar', y: 33.53 },
    { x: 'Apr', y: 41.22 },
    { x: 'May', y: 49.87 },
    { x: 'Jun', y: 59.02 },
    { x: 'Jul', y: 62.94 },
    { x: 'Aug', y: 61.27 },
    { x: 'Sep', y: 55.36 },
    { x: 'Oct', y: 44.76 },
    { x: 'Nov', y: 34.79 },
    { x: 'Dec', y: 28.04 }
];
export let averageData: Object[] = [
    { x: 'Jan', y: 31.89 },
    { x: 'Feb', y: 40.82 },
    { x: 'Mar', y: 44.96 },
    { x: 'Apr', y: 53.64 },
    { x: 'May', y: 62.28 },
    { x: 'Jun', y: 71.80 },
    { x: 'Jul', y: 75.69 },
    { x: 'Aug', y: 73.99 },
    { x: 'Sep', y: 68.61 },
    { x: 'Oct', y: 58.95 },
    { x: 'Nov', y: 45.18 },
    { x: 'Dec', y: 38.21 }
];
export let maximumData: Object[] = [
    { x: 'Jan', y: 41.02 },
    { x: 'Feb', y: 51.93 },
    { x: 'Mar', y: 56.39 },
    { x: 'Apr', y: 66.06 },
    { x: 'May', y: 74.64 },
    { x: 'Jun', y: 84.58 },
    { x: 'Jul', y: 88.43 },
    { x: 'Aug', y: 86.72 },
    { x: 'Sep', y: 81.86 },
    { x: 'Oct', y: 73.13 },
    { x: 'Nov', y: 55.54 },
    { x: 'Dec', y: 48.36 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }

    @keyframes opac {
        0% {
            stroke-opacity: 1;
            stroke-width: 0px;
        }
        100% {
            stroke-opacity: 0;
            stroke-width: 10px;
        }
    }`;

export class Spline extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate90', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ enableHighlight: true }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} primaryYAxis={{ labelFormat: '{value}°F', minimum: 0, interval: 20, title: 'Temperature (°F)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} tooltip={{ enable: true, shared: true, showNearestTooltip: true, header: '<b>${point.x}<b>', format: '${series.name} : <b>${point.y}</b>' }} title='2024 US Temperature Trends with Hottest Coldest and Average Records' subTitle='Source: ncei.noaa.gov' crosshair={{ enable: true, lineType: 'Vertical', highlightCategory: true }} load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} height='500px'>
                        <Inject services={[SplineSeries, Legend, Category, Tooltip, ChartAnnotation, Crosshair, Highlight]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="chart_cloud"><img src="src/chart/images/cloud.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>' x='Jan' y={22.75} coordinateUnits='Point' verticalAlignment='Middle' />
                            <AnnotationDirective content='<div id="chart_cloud"><img src="src/chart/images/sunny.png" alt="Sunny Picture" style="width: 41px; height: 41px"/></div>' x='Jul' y={88.43} coordinateUnits='Point' verticalAlignment='Middle' />
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={maximumData} xName='x' yName='y' name='Max Temp' width={2} type='Spline' marker={{ visible: true, width: 7, height: 7, isFilled: true }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={averageData} xName='x' yName='y' name='Avg Temp' width={2} type='Spline' marker={{ visible: true, width: 7, height: 7, isFilled: true }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={minimumData} xName='x' yName='y' name='Min Temp' width={2} type='Spline' marker={{ visible: true, width: 7, height: 7, isFilled: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This React Spline Chart example visualizes the average monthly high and low temperatures across the contiguous U.S. for 2024.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a spline chart. The spline chart uses a smooth, curved line to connect points in a data series. <code>Markers</code> represent individual data points with different shapes, while the <code>crosshair</code> enhances data tracking by highlighting the category.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject <code>SplineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the spline series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline" aria-label="Navigate to the documentation for Spline Chart in React Chart component">documentation section</a>.
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
        loadChartTheme(args);
    };

}