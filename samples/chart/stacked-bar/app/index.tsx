/**
 * Sample for stackingBar series 
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingBarSeries, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from './sample-base';
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
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            minimum: -20,
                            maximum: 60,
                            interval: 20,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            labelFormat: '{value}%',
                            edgeLabelPlacement: 'Shift'
                        }}
                        load={this.load.bind(this)}
                        title='Sales Comparison' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingBarSeries, Category, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} width={2} xName='x' yName='y' name='Apple' type='StackingBar'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} width={2} xName='x' yName='y' name='orange' type='StackingBar'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} width={2} xName='x' yName='y' name='Wastage' type='StackingBar'>
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
ReactDOM.render(<StackedBar />, document.getElementById('sample'));