/**
 * Sample for Line Series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, ChartTheme, Legend, DateTime, Tooltip, Highlight, ChartAnnotation, SplineSeries } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
const chartData: Object[] = [
    { x: new Date(2010, 0, 1), y: 5.00, y1: 4.54, y2: 3.62, y3: 2.92, y4: 1.87 },
    { x: new Date(2011, 0, 1), y: 5.69, y1: 4.50, y2: 3.23, y3: 3.00, y4: 1.87 },
    { x: new Date(2012, 0, 1), y: 4.99, y1: 4.60, y2: 4.19, y3: 2.97, y4: 1.85 },
    { x: new Date(2013, 0, 1), y: 5.65, y1: 5.04, y2: 2.99, y3: 2.97, y4: 1.84 },
    { x: new Date(2014, 0, 1), y: 5.43, y1: 4.39, y2: 3.07, y3: 2.00, y4: 1.84 },
    { x: new Date(2015, 0, 1), y: 5.51, y1: 3.86, y2: 3.19, y3: 1.88, y4: 1.65 },
    { x: new Date(2016, 0, 1), y: 6.12, y1: 4.12, y2: 3.28, y3: 1.81, y4: 1.69 },
    { x: new Date(2017, 0, 1), y: 6.68, y1: 6.35, y2: 4.12, y3: 1.79, y4: 1.38 },
    { x: new Date(2018, 0, 1), y: 5.52, y1: 3.90, y2: 3.39, y3: 1.75, y4: 1.72 },
    { x: new Date(2019, 0, 1), y: 5.59, y1: 4.01, y2: 3.46, y3: 1.75, y4: 1.31 },
    { x: new Date(2020, 0, 1), y: 5.46, y1: 4.64, y2: 3.52, y3: 1.78, y4: 1.75 },
    { x: new Date(2021, 0, 1), y: 6.08, y1: 4.12, y2: 3.58, y3: 1.74, y4: 1.29 },
    { x: new Date(2022, 0, 1), y: 6.23, y1: 3.64, y2: 3.40, y3: 1.73, y4: 1.64 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const CustomAnimation = () => {
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };

    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, labelFormat: 'y' }} load={load.bind(this)} primaryYAxis={{ title: 'Yield (In Tons per Hectare)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, maximum: 8, interval: 2, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{
                    enable: true,
                    shared: true,
                    header: '<b>Almond Yield - ${point.x}</b>',
                    format: '${series.name}: <b>${point.y}</b>'
                }} legendSettings={{ visible: true, enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} title="Almond Yield" loaded={onChartLoad.bind(this)}>
                    <Inject services={[SplineSeries, DateTime, Legend, Tooltip, Highlight, ChartAnnotation]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartData} xName="x" yName="y1" name="United States" width={3} animation={{ enable: true, duration: 1500 }} type="Spline"></SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName="x" yName="y2" name="China" width={3} animation={{ enable: true, delay: 2300, duration: 1500 }} type="Spline"></SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName="x" yName="y3" name="Afghanistan" width={3} animation={{ enable: true, delay: 3400, duration: 1500 }} type="Spline"></SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName="x" yName="y4" name="Yemen" width={3} animation={{ enable: true, delay: 4800, duration: 1500 }} type="Spline"></SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName="x" yName="y" name="Australia" width={3} animation={{ enable: true, delay: 6200, duration: 1500 }} type="Spline"></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the almond yield per hectare data for different countries using a spline series in the chart.
                    The data points are enhanced with tooltip and the animation delay is configured to provide a smooth, staggered effect.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a spline chart with multiple series representing almond yield across different countries over time. Spline charts are ideal for visualizing smooth trends in data over equal intervals, particularly time-dependent data.
                    The <code>width</code> and <code>animation</code> properties are used to customize the appearance and behavior of the spline. The staggered animations enhance the visual experience by introducing each spline in sequence.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p style={{ fontWeight: 500 }}><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject <code>SplineSeries</code> module using <code>Chart.Inject(SplineSeries)</code> method.
                </p>
                <p>
                    More information on the spline series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/chart/Chart-types/spline" aria-label="Navigate to the documentation for Spline Chart in TypeScript Chart control">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default CustomAnimation;