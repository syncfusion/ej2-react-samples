/**
 * Combination Series Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Legend,
    StackingColumnSeries, LineSeries, Tooltip, ILoadedEventArgs, Category, ColumnSeries
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
/**
 * Combination sample
 */
export class CombinationSeries extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            title: 'Years',
                            interval: Browser.isDevice ? 2 : 1,
                            labelIntersectAction: 'Rotate45',
                            valueType: 'Category',
                            majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
                            majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Growth',
                            minimum: -3,
                            maximum: 3,
                            interval: 1,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
                            labelFormat: '{value}B',
                        }}
                        chartArea={{ border: { width: 0 } }}
                        title='Annual Growth GDP in France' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        legendSettings={{ visible: true}}>
                        <Inject services={[StackingColumnSeries, LineSeries, Category, ColumnSeries, Tooltip, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='Private Consumption'
                                type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y1' name='Government Consumption'
                                type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y2' name='Investment'
                                type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y3' name='Net Foreign Trade'
                                type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y4' name='GDP' type='Line' width={2} opacity={0.6}
                                marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="http://perspectives.pictet.com/2016/01/29/growth-accelerated-markedly-in-france-and-spain-in-2015/" target="_blank">perspectives.pictet.com</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates combination series of stacked column and line series for annual GDP growth of France.
                    </p>
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
                        More information on the series can be found in this &nbsp;
                            <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}