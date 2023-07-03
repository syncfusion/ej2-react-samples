/**
 * Sample for RangeColumn series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    RangeColumnSeries, Category, Tooltip, ILoadedEventArgs, ChartTheme, DataLabel, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: 'Sun', low: 3.1, high: 10.8 },
    { x: 'Mon', low: 5.7, high: 14.4 }, { x: 'Tue', low: 8.4, high: 16.9 },
    { x: 'Wed', low: 9.6, high: 18.2 },
    { x: 'Thu', low: 8.5, high: 16.1 }, { x: 'Fri', low: 6.0, high: 12.5 },
    { x: 'Sat', low: 1.5, high: 6.9 }
];
export let data1: any[] = [
    { x: 'Sun', low: 2.5, high: 9.8 },
    { x: 'Mon', low: 4.7, high: 11.4 }, { x: 'Tue', low: 6.4, high: 14.4 },
    { x: 'Wed', low: 9.6, high: 17.2 },
    { x: 'Thu', low: 7.5, high: 15.1 }, { x: 'Fri', low: 3.0, high: 10.5 },
    { x: 'Sat', low: 1.2, high: 7.9 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class RangeColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}    legendSettings={{ enableHighlight :true }}
                        primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
                        primaryYAxis={{ labelFormat: '{value}˚C', maximum: 20, title:'Temperature (In Celsius)', edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }}
                        title='Temperature Variation' loaded={this.onChartLoad.bind(this)}
                        load={this.load.bind(this)}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '75%'}
                            tooltip={{
                                enable: true,
                                header:"<b>${point.x}</b>",
                                format:"Temperature : <b>${point.low} - ${point.high}</b>"
                            }}>
                        <Inject services={[RangeColumnSeries, Tooltip, Category,  DataLabel, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='India' high="high" low="low" xName='x' columnSpacing={0.1} type='RangeColumn' marker={{
                                     dataLabel: {
                                        visible: true,
                                        position: 'Outer',
                                    }
                                }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} name='Germany' xName='x'high="high" low="low" columnSpacing={0.1} type='RangeColumn' marker={{
                                     dataLabel: {
                                        visible: true,
                                        position: 'Outer',
                                    }
                                }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React range column chart example visualizes the maximum and minimum temperatures for a week in different countries with the default range column series
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the range column chart. The range column chart is used to display a range of data by plotting two y-values per data point. The two y-values are used as the upper and lower bounds of a column.
                    </p>
                    <p>
                    Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>

                    <p><b>Injecting Module</b></p>
                    <p>
                        chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting
                        <code>RangeColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the range column series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-column">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as ChartTheme;
    };
     
}