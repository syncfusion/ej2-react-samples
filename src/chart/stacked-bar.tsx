/**
 * Sample for stackingBar series 
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingBarSeries, Tooltip, ILoadedEventArgs, ChartTheme, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data: any[] = [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
{ x: 'May', y: 20 }, { x: 'Jun', y: 24 }];
export let data2: any[] = [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
{ x: 'May', y: 21 }, { x: 'Jun', y: 25 }];
export let data3: any[] = [{ x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
{ x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedBar extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}  legendSettings={{ enableHighlight :true }}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            title:'Sales (In Percentage)',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            labelFormat: '{value}%',
                            edgeLabelPlacement: 'Shift'
                        }}
                        load={this.load.bind(this)}
                        title='Sales Comparison' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingBarSeries, Category, Legend, Tooltip, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} width={2} xName='x' yName='y' border={{ width: 1, color: "white" }} columnWidth={0.6} name='Apple' type='StackingBar'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} width={2} xName='x' yName='y' border={{ width: 1, color: "white" }} columnWidth={0.6} name='Orange' type='StackingBar'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} width={2} xName='x' yName='y' border={{ width: 1, color: "white" }} columnWidth={0.6} name='Wastage' type='StackingBar'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React stacked bar chart example visualizes a comparison of several months’ sales with the default stacked bar series. The legend in the sample shows more information about the series.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the stacked bar chart. The stacked bar chart stacks points in the series horizontally. You can also use the <code>StackingGroup</code> property to group stacked collections based on category.
                    </p>
                    <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject
                        <code>StackingBarSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacked bar series can be found in this &nbsp;
                       <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-bar" aria-label="Navigate to the documentation for Stacked Bar Chart in React Chart component">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}