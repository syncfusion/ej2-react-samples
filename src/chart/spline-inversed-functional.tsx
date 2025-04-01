/**
 * Sample for Inversed Spline series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, Inject, Category, SplineSeries, Tooltip, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

export let inversedData: Object[] = [
    { country: 'United States', y: 194.55 },
    { country: 'Japan', y: 146.2 },
    { country: 'China', y: 65.1 },
    { country: 'France', y: 84.9 },
    { country: 'India', y: 140.1 },
    { country: 'Canada', y: 160.7 },
    { country: 'Brazil', y: 68.4 },
    { country: 'United Kingdom', y: 100.2 },
    { country: 'Sweden', y: 162 },
    { country: 'Netherlands', y: 132.3 },
    { country: 'Bangladesh', y: 27.7 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const SplineInversed = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    
    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} isTransposed={true} primaryXAxis={{ valueType: 'Category', minorTickLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, labelPlacement: 'OnTicks' }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: false }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}%', title: 'Capitalization Ratio (% of GDP)', interval: 40, edgeLabelPlacement: 'Shift',  lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 0 }, labelRotation: Browser.isDevice ? -45 : 0 }} tooltip={{ enable: true, showNearestTooltip: true, header: '<b>Stock Market Cap</b>', format: '${point.x}: <b>${point.y}</b>', enableHighlight: true }} title="Stock Market Capitalization as a Percentage of GDP by Country" subTitle='Source: wikipedia.org' loaded={onChartLoad.bind(this)}>
                    <Inject services={[SplineSeries, Category, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={inversedData} xName="country" yName="y" width={2} type="Spline" marker={{ visible: true, width: 7, height: 7, isFilled: true }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample showcases an inversed spline chart depicting stock market capitalization as a percentage of GDP by country, with enhanced interactivity through markers and tooltips.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure inversed spline type charts using the <code>isTransposed</code> property. A spline chart uses a curved line to connect points in a data series.  
                    <code>Markers</code> are used to represent individual data points and their values.
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
export default SplineInversed;