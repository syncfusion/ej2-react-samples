/**
 * Sample for Stacked Area series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Highlight, ILoadedEventArgs, ChartTheme, Inject, Tooltip, DateTime, StackingAreaSeries, Legend } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let data1 = [
    { x: new Date(2000, 0, 1), y: 0.61 }, { x: new Date(2001, 0, 1), y: 0.81 }, { x: new Date(2002, 0, 1), y: 0.91 },
    { x: new Date(2003, 0, 1), y: 1 }, { x: new Date(2004, 0, 1), y: 1.19 }, { x: new Date(2005, 0, 1), y: 1.47 },
    { x: new Date(2006, 0, 1), y: 1.74 }, { x: new Date(2007, 0, 1), y: 1.98 }, { x: new Date(2008, 0, 1), y: 1.99 },
    { x: new Date(2009, 0, 1), y: 1.7 }, { x: new Date(2010, 0, 1), y: 1.48 }, { x: new Date(2011, 0, 1), y: 1.38 },
    { x: new Date(2012, 0, 1), y: 1.66 }, { x: new Date(2013, 0, 1), y: 1.66 }, { x: new Date(2014, 0, 1), y: 1.67 },
];
export let data2 = [
    { x: new Date(2000, 0, 1), y: 0.03 }, { x: new Date(2001, 0, 1), y: 0.05 }, { x: new Date(2002, 0, 1), y: 0.06 },
    { x: new Date(2003, 0, 1), y: 0.09 }, { x: new Date(2004, 0, 1), y: 0.14 }, { x: new Date(2005, 0, 1), y: 0.2 },
    { x: new Date(2006, 0, 1), y: 0.29 }, { x: new Date(2007, 0, 1), y: 0.46 }, { x: new Date(2008, 0, 1), y: 0.64 },
    { x: new Date(2009, 0, 1), y: 0.75 }, { x: new Date(2010, 0, 1), y: 1.06 }, { x: new Date(2011, 0, 1), y: 1.25 },
    { x: new Date(2012, 0, 1), y: 1.55 }, { x: new Date(2013, 0, 1), y: 1.55 }, { x: new Date(2014, 0, 1), y: 1.65 },
];
export let data3 = [
    { x: new Date(2000, 0, 1), y: 0.48 }, { x: new Date(2001, 0, 1), y: 0.53 }, { x: new Date(2002, 0, 1), y: 0.57 },
    { x: new Date(2003, 0, 1), y: 0.61 }, { x: new Date(2004, 0, 1), y: 0.63 }, { x: new Date(2005, 0, 1), y: 0.64 },
    { x: new Date(2006, 0, 1), y: 0.66 }, { x: new Date(2007, 0, 1), y: 0.76 }, { x: new Date(2008, 0, 1), y: 0.77 },
    { x: new Date(2009, 0, 1), y: 0.55 }, { x: new Date(2010, 0, 1), y: 0.54 }, { x: new Date(2011, 0, 1), y: 0.57 },
    { x: new Date(2012, 0, 1), y: 0.61 }, { x: new Date(2013, 0, 1), y: 0.67 }, { x: new Date(2014, 0, 1), y: 0.67 },
];
export let data4 = [
    { x: new Date(2000, 0, 1), y: 0.23 }, { x: new Date(2001, 0, 1), y: 0.17 }, { x: new Date(2002, 0, 1), y: 0.17 },
    { x: new Date(2003, 0, 1), y: 0.2 }, { x: new Date(2004, 0, 1), y: 0.23 }, { x: new Date(2005, 0, 1), y: 0.36 },
    { x: new Date(2006, 0, 1), y: 0.43 }, { x: new Date(2007, 0, 1), y: 0.52 }, { x: new Date(2008, 0, 1), y: 0.72 },
    { x: new Date(2009, 0, 1), y: 1.29 }, { x: new Date(2010, 0, 1), y: 1.38 }, { x: new Date(2011, 0, 1), y: 1.82 },
    { x: new Date(2012, 0, 1), y: 2.16 }, { x: new Date(2013, 0, 1), y: 2.51 }, { x: new Date(2014, 0, 1), y: 2.61 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedArea = () => {
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
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'DateTime', intervalType: 'Years', majorGridLines: { width: 0 }, labelFormat: 'y', edgeLabelPlacement: 'Shift' }} load={load.bind(this)} primaryYAxis={{ title: 'Amount of sales in €', minimum: 0, maximum: 7, interval: 1, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}k' }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ enableHighlight: true }} title="Amount of Sales by Payment Mode" loaded={onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true, showNearestTooltip: true }}>
                    <Inject services={[StackingAreaSeries, Legend, DateTime, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName="x" yName="y" opacity={1} name="Bank-Transfer" type="StackingArea" border={{ width: 2, color: '#666666' }}></SeriesDirective>
                        <SeriesDirective dataSource={data2} xName="x" yName="y" opacity={1} name="Credit Card" type="StackingArea" border={{ width: 2, color: '#666666' }}></SeriesDirective>
                        <SeriesDirective dataSource={data3} xName="x" yName="y" opacity={1} name="Debit Card" type="StackingArea" border={{ width: 2, color: '#666666' }}></SeriesDirective>
                        <SeriesDirective dataSource={data4} xName="x" yName="y" opacity={1} name="Cash" type="StackingArea" border={{ width: 2, color: '#666666' }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This React Stacked Area example visualizes the amount of sales by payment mode with default stacked area series. A legend in the sample shows information about the series.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the stacked area chart. This chart visualizes data with y-values stacked one over another in a series order. It shows the relationship between individual values to the total sum of points.</p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject <code>StackingAreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about area type series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-area" aria-label="Navigate to the documentation for Stacked Area Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default StackedArea;