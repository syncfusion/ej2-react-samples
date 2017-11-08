import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [{ x: 'USA', y: 46 }, { x: 'GBR', y: 27 }, { x: 'CHN', y: 26 }];
export let data2: any[] = [{ x: 'USA', y: 37 }, { x: 'GBR', y: 23 }, { x: 'CHN', y: 18 }];
export let data3: any[] = [{ x: 'USA', y: 38 }, { x: 'GBR', y: 17 }, { x: 'CHN', y: 26 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Column sample
 */
export class Column extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        load={this.load.bind(this)}
                        primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }}
                        primaryYAxis={{
                            minimum: 0, maximum: 50, interval: 10, majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        title='Olympic Medal Counts - RIO' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Gold' type='Column'
                                marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Silver' type='Column'
                                marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Bronze' type='Column'
                                marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates column series type in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the column type charts. Column type charts are used for comparing the frequency, count, total or average of data in different categories.
                       You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect. <code>dataLabel</code> is used to represent individual data and its value.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                       <code>ColumnSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
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
