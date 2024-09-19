/**
 * Sample for Column Series with disabled side by side placement
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    ColumnSeries, Category, DataLabel, Tooltip, ILoadedEventArgs, Legend
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: any[] = [{ x: 'Jamesh', y: 10, text: 'Total 10' },
{ x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }, { x: 'Jack', y: 8, text: 'Total 8' }, { x: 'Lucas', y: 10, text: 'Total 10' }];
export let data2: any[] = [{ x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }, { x: 'Jack', y: 5}, { x: 'Lucas', y: 6}];
export let data3: any[] = [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }, { x: 'Jack', y: 2 }, { x: 'Lucas', y: 3}];
export let data4: any[] = [{ x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }, { x: 'Jack', y: 1}, { x: 'Lucas', y: 1}];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Column Side placment sample
 */
export class ColumnPlacement extends SampleBase<{}, {}> {
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
                            title: 'Fruits Count',
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        enableSideBySidePlacement={false}
                        title='Fruit Consumption'
                        tooltip={{ enable: true, shared: true }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[ColumnSeries, DataLabel, Category, Tooltip, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' width={2} yName='y' name='Total' type='Column'
                                columnWidth={0.5}
                                marker={{ dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' width={2} yName='y' name='Apple' type='Column'
                                columnWidth={0.4}
                                marker={{ dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' width={2} yName='y' name='Orange' type='Column'
                                columnWidth={0.3}
                                marker={{ dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data4} xName='x' width={2} yName='y' name='Grapes' type='Column'
                                columnWidth={0.2}
                                marker={{ dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample shows four series of columns in which each column is rendered with a different width and placed behind the previous column.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories. The <code>EnableSideBySidePlacement</code> property is used to enable and disable side-by-side positioning. DataLabel is used to present details about individual data points.
                   </p>
                    <p>
                    Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                   </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                       <code>ColumnSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts" aria-label="Navigate to the documentation for Column Chart in React Chart component">documentation section</a>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}
