/**
 * Sample for 100 percent Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingColumnSeries, Tooltip, DataLabel, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
    { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
    { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
    { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedColumn100 extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Category',
                            labelIntersectAction: 'Rotate45',
                            majorGridLines: { width: 0 },
                            minorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'GDP (%) Per Annum',
                            rangePadding: 'None',
                            interval: 20,
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 },
                            minorTickLines: { width: 0 },
                            lineStyle: {
                                width: 0
                            }
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Gross Domestic Product Growth' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingColumnSeries, Legend, Tooltip, DataLabel, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='UK' type='StackingColumn100'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y1' name='Germany' type='StackingColumn100'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y2' name='France' type='StackingColumn100'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y3' name='Italy' type='StackingColumn100'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates 100 percent stacking column series type in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the 100% stacking column type charts. Stacks the points in the series vertically and also you can use <code>stackingGroup</code> property to group the stacking collection based on categories.
                        You can use <code>border</code>, <code>fill</code> properties to customize the vertical bar. <code>dataLabel</code> is used to represent individual data and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use 100% stacking column series, we need to inject
                          <code>StackingColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the 100% stacking column series can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}