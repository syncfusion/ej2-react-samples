/**
 * Sample for local data
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, DateTime, Legend, ILoadedEventArgs, ChartTheme, Tooltip, Crosshair
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

export function GetLocalData(): any {
    let series1: Object[] = [];
    let series2: Object[] = [];
    let point1: Object;
    let point2: Object;
    let value: number = 80;
    let value1: number = 90;
    let i: number;
    for (i = 1; i < 500; i++) {

        if (Math.random() > .5) {
            value += Math.random();
            value1 += Math.random();
        } else {
            value -= Math.random();
            value1 -= Math.random();
        }
        point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
        point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
        series1.push(point1);
        series2.push(point2);
    }
    return { 'series1': series1, 'series2': series2 };
}

export let data1: any[] = GetLocalData().series1;
export let data2: any[] = GetLocalData().series2;

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class LocalData extends SampleBase<{}, {}> {

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
                            skeleton: 'y',
                            majorGridLines: { width: 0 },
                            valueType: 'DateTime',
                            edgeLabelPlacement: 'Shift'
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: '${value}',
                            rangePadding: 'None',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        crosshair={{
                            enable: true,
                            line: {
                                color: 'rgba(204,214,235,0.25)',
                                width: Browser.isDevice ? 50 : 20,
                            },
                            lineType: 'Vertical'
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        title='Stock Price Analysis' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, DateTime, Legend, Crosshair, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Product X'
                                animation={{ enable: true }} type='Line'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' width={2} name='Product Y'
                                animation={{ enable: true }} type='Line'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
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
ReactDOM.render(<LocalData />, document.getElementById('sample'));