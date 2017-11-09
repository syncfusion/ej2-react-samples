/**
 * Sample for 100 percent StackingBar Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingBarSeries, Tooltip, DataLabel, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from './sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: 'Jan', y: 6, y1: 6, y2: 1 }, { x: 'Feb', y: 8, y1: 8, y2: 1.5 },
    { x: 'Mar', y: 12, y1: 11, y2: 2 }, { x: 'Apr', y: 15, y1: 16, y2: 2.5 },
    { x: 'May', y: 20, y1: 21, y2: 3 }, { x: 'Jun', y: 24, y1: 25, y2: 3.5 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedBar100 extends SampleBase<{}, {}> {

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
                            majorGridLines: { width: 0 },
                        }}
                        primaryYAxis={{
                            edgeLabelPlacement: 'Shift'
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Sales Comparison' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingBarSeries, Legend, Tooltip, DataLabel, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='Apple' type='StackingBar100'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y1' name='orange' type='StackingBar100'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y2' name='Wastage' type='StackingBar100'>
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
ReactDOM.render(<StackedBar100 />, document.getElementById('sample'));