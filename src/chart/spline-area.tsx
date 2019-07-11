/**
 * Sample for Area series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    DateTime, SplineAreaSeries, ILoadedEventArgs, Legend, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
];
export let data2: any[] = [
    { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
];
export let data3: any[] = [
    { x: new Date(2002, 0, 1), y: 0.8 }, { x: new Date(2003, 0, 1), y: 1.3 },
    { x: new Date(2004, 0, 1), y: 1.1 }, { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2 }, { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 2.3 }, { x: new Date(2009, 0, 1), y: 2.7 },
    { x: new Date(2010, 0, 1), y: 1.1 }, { x: new Date(2011, 0, 1), y: 2.3 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Area sample
 */
export class SplineArea extends SampleBase<{}, {}> {

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
                            labelFormat: '{value}%',
                            lineStyle: { width: 0 },
                            maximum: 4, interval: 1,
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        title="Inflation Rate in Percentage" loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[SplineAreaSeries, DateTime, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='US'
                                opacity={0.5} type='SplineArea' width={2}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='France'
                                opacity={0.5} type='SplineArea' width={2}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Germany'
                                opacity={0.5} type='SplineArea' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the data about inflation rate comparision for three countries by using spline area series in the chart. 
                Legend in the sample shows the information about the series.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the spline area type charts. Similar to line type series, but the area get closed and filled with series color.
                    You can use <code>border</code>, <code>fill</code> properties to customize the area. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                    Legend is enabled in this example with series type shape.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use spline area series, we need to inject
                       <code>SplineAreaSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the spline area series can be found in this &nbsp;
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
        // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme =(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        // custom code end
}