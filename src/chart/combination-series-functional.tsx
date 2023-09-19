/**
 * Sample for Combination Serie
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Legend, StackingColumnSeries, LineSeries, Tooltip, ILoadedEventArgs, Category, ColumnSeries, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: '2005', y: 1.2, y1: 0.5, y2: 0.7, y3: -0.8, y4: 1.5},
    { x: '2006', y: 1, y1: 0.5, y2: 1.4, y3: 0, y4: 2.3 },
    { x: '2007', y: 1, y1: 0.5, y2: 1.5, y3: -1, y4: 2 },
    { x: '2008', y: 0.25, y1: 0.35, y2: 0.35, y3: -.35, y4: 0.1 },
    { x: '2009', y: 0.1, y1: 0.9, y2: -2.7, y3: -0.3, y4: -2.7 },
    { x: '2010', y: 1, y1: 0.5, y2: 0.5, y3: -0.5, y4: 1.8 },
    { x: '2011', y: 0.1, y1: 0.25, y2: 0.25, y3: 0, y4: 2 },
    { x: '2012', y: -0.25, y1: -0.5, y2: -0.1, y3: -0.4, y4: 0.4 },
    { x: '2013', y: 0.25, y1: 0.5, y2: -0.3, y3: 0, y4: 0.9 },
    { x: '2014', y: 0.6, y1: 0.6, y2: -0.6, y3: -0.6, y4: 0.4 },
    { x: '2015', y: 0.9, y1: 0.5, y2: 0, y3: -0.3, y4: 1.3 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const CombinationSeries = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ interval: Browser.isDevice ? 2 : 1, labelIntersectAction: 'Rotate45', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 } }} load={load.bind(this)} primaryYAxis={{ title: 'Growth (in Billion)', minimum: -3, maximum: 3, interval: 1, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}B' }} chartArea={{ border: { width: 0 } }} title='Annual Growth GDP in France' loaded={onChartLoad.bind(this)} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: true, enableHighlight: true }}>
                    <Inject services={[StackingColumnSeries, LineSeries, Category, ColumnSeries, Tooltip, Legend, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y' name='Private Consumption' type='StackingColumn' />
                        <SeriesDirective dataSource={data} xName='x' yName='y1' name='Government Consumption' type='StackingColumn' />
                        <SeriesDirective dataSource={data} xName='x' yName='y2' name='Investment' type='StackingColumn' />
                        <SeriesDirective dataSource={data} xName='x' yName='y3' name='Net Foreign Trade' type='StackingColumn' />
                        <SeriesDirective dataSource={data} xName='x' yName='y4' name='GDP' type='Line' width={2} opacity={0.6} marker={{ visible: true, width: 7, height: 7 }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                    <a href="http://perspectives.pictet.com/2016/01/29/growth-accelerated-markedly-in-france-and-spain-in-2015/" target="_blank">perspectives.pictet.com</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates a combination of line and stacked column series. Tooltip shows the information about the data point.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the different type of charts. You can render any combination of series in chart except bar.
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    In this example, we have used line and column series. To use column and line feature, we need to inject
                    <code>ColumnSeries</code> <code>LineSeries</code> modules into <code>services</code>.
                </p>
                <p>
                    More information on the Combination series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-series/#combination-series">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default CombinationSeries;