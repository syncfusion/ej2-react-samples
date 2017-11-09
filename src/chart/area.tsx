/**
 * Sample for Area series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    DateTime, AreaSeries, ILoadedEventArgs, Legend, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [{ x: new Date(2000, 0, 1), y: 4 }, { x: new Date(2001, 0, 1), y: 3.0 },
{ x: new Date(2002, 0, 1), y: 3.8 }, { x: new Date(2003, 0, 1), y: 3.4 },
{ x: new Date(2004, 0, 1), y: 3.2 }, { x: new Date(2005, 0, 1), y: 3.9 }];
export let data2: any[] = [{ x: new Date(2000, 0, 1), y: 2.6 }, { x: new Date(2001, 0, 1), y: 2.8 },
{ x: new Date(2002, 0, 1), y: 2.6 }, { x: new Date(2003, 0, 1), y: 3 },
{ x: new Date(2004, 0, 1), y: 3.6 }, { x: new Date(2005, 0, 1), y: 3 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Area sample
 */
export class Area extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            labelFormat: 'y',
                            majorGridLines: { width: 0 },
                            intervalType: 'Years',
                            edgeLabelPlacement: 'Shift'
                        }}
                        primaryYAxis={{
                            title: 'Revenue in Millions',
                            minimum: 2,
                            maximum: 5,
                            interval: 1,
                            majorGridLines: { width: 0 },
                            labelFormat: '{value}M'
                        }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        title="Average Sales Comparison" loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[AreaSeries, DateTime, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Product A'
                                opacity={0.5} type='Area' width={2}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Product B'
                                opacity={0.5} type='Area' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates area series type in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the area type charts. Similar to line type series, but the area get closed and filled with series color.
                       You can use <code>border</code>, <code>fill</code> properties to customize the area. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                       Legend is enabled in this example with series type shape.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject
                       <code>AreaSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the area series can be found in this &nbsp;
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