/**
 * Sample for Combination Serie
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Legend,
    StackingColumnSeries, LineSeries, Tooltip, ILoadedEventArgs, Category, ColumnSeries, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: '2007', y: 1, y1: 0.5, y2: 1.5, y3: -1, y4: 2 },
    { x: '2008', y: 0.25, y1: 0.35, y2: 0.35, y3: -.35, y4: 0.1 },
    { x: '2009', y: 0.1, y1: 0.9, y2: -2.7, y3: -0.3, y4: -2.7 },
    { x: '2010', y: 1, y1: 0.5, y2: 0.5, y3: -0.5, y4: 1.8 },
    { x: '2011', y: 0.1, y1: 0.25, y2: 0.25, y3: 0, y4: 2 },
    { x: '2012', y: -0.25, y1: -0.5, y2: -0.1, y3: -0.4, y4: 0.4 },
    { x: '2013', y: 0.25, y1: 0.5, y2: -0.3, y3: 0, y4: 0.9 },
    { x: '2014', y: 0.6, y1: 0.6, y2: -0.6, y3: -0.6, y4: 0.4 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class CombinationSeries extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ interval: Browser.isDevice ? 2 : 1, labelIntersectAction: 'Rotate45', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{ title: 'Growth (in Billion)', minimum: -3, maximum: 3, interval: 1, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}B' }} chartArea={{ border: { width: 0 } }} title='Annual Growth GDP in France' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: true, enableHighlight: true }}>
                        <Inject services={[StackingColumnSeries, LineSeries, Category, ColumnSeries, Tooltip, Legend, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='Private Consumption' type='StackingColumn' />
                            <SeriesDirective dataSource={data} xName='x' yName='y1' name='Government Consumption' type='StackingColumn' />
                            <SeriesDirective dataSource={data} xName='x' yName='y2' name='Investment' type='StackingColumn' />
                            <SeriesDirective dataSource={data} xName='x' yName='y3' name='Net Foreign Trade' type='StackingColumn' />
                            <SeriesDirective dataSource={data} xName='x' yName='y4' name='GDP' type='Line' width={2} opacity={0.6} marker={{ visible: true, width: 7, height: 7 }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample illustrates a combination of line and stacked column series. Tooltip shows the information about the data point.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the different type of charts. You can render any combination of series in chart except bar.
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        In this example, we have used line and column series. To use column and line feature, we need to inject
                        <code>ColumnSeries</code> <code>LineSeries</code> modules into <code>services</code>.
                    </p>
                    <p>
                        More information on the Combination series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-series/#combination-series" aria-label="Navigate to the documentation for Multiple Series in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}