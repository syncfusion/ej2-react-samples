/**
 * Sample for Step line series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, DateTime, StepLineSeries, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

/**
 * StepLine Series
 */
export let data1: any[] = [
    { x: new Date(1975, 0, 1), y: 16 },
    { x: new Date(1980, 0, 1), y: 12.5 },
    { x: new Date(1985, 0, 1), y: 19 },
    { x: new Date(1990, 0, 1), y: 14.4 },
    { x: new Date(1995, 0, 1), y: 11.5 },
    { x: new Date(2000, 0, 1), y: 14 },
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2010, 0, 1), y: 16 }];
export let data2: any[] = [
    { x: new Date(1975, 0, 1), y: 10 },
    { x: new Date(1980, 0, 1), y: 7.5 },
    { x: new Date(1985, 0, 1), y: 11 },
    { x: new Date(1990, 0, 1), y: 7 },
    { x: new Date(1995, 0, 1), y: 8 },
    { x: new Date(2000, 0, 1), y: 6 },
    { x: new Date(2005, 0, 1), y: 3.5 },
    { x: new Date(2010, 0, 1), y: 7 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StepLine extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            labelFormat: 'y',
                            intervalType: 'Years',
                            majorGridLines: { width: 0 },
                            valueType: 'DateTime',
                            edgeLabelPlacement: 'Shift'
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            minimum: 0,
                            maximum: 20,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            interval: 5,
                            labelFormat: '{value}%'
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }} loaded={this.onChartLoad.bind(this)}
                        title='Unemployment Rates 1975-2010'>
                        <Inject services={[StepLineSeries, Legend, Tooltip, DateTime]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='China' width={2}
                                type='StepLine' marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Australia' width={2}
                                type='StepLine' marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates step line series type in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stepline type charts. This series forms the step line progress, by connecting points through vertical and horizontal lines.
                        You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the line. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use step line series, we need to inject
                        <code>StepLineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the StepLine series can be found in this &nbsp;
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