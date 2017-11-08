/**
 * Area Empty Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Category, AreaSeries, ILoadedEventArgs, ChartTheme, Legend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

export let data1: any[] = [{ x: '2002', y: 2 }, { x: '2003', y: 1.7 }, { x: '2004', y: 1.8 }, { x: '2005', y: 2.1 },
{ x: '2006', y: 2.3 }, { x: '2007', y: 1.7 }, { x: '2008', y: 1.5 }, { x: '2009', y: 1.8 },
{ x: '2010', y: 2 }, { x: 2011, y: 3.1 }];
export let data2: any[] = [{ x: '2002', y: 2.2 }, { x: '2003', y: 3.4 }, { x: '2004', y: 2.8 }, { x: '2005', y: null },
{ x: '2006', y: null }, { x: '2007', y: 2.5 }, { x: '2008', y: 2.9 }, { x: '2009', y: 3.8 },
{ x: '2010', y: 1.4 }, { x: 2011, y: 3.1 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Area empty sample
 */
export class AreaEmpty extends SampleBase<{}, {}> {

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
                            interval: 2,
                            majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift'
                        }}
                        primaryYAxis={{
                            title: 'Rates',
                            majorGridLines: { width: 0 },
                            labelFormat: '{value}M'
                        }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '60%'}
                        title="Inflation Rate" loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[AreaSeries, Category, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='France'
                                opacity={0.8} type='Area' width={2}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='US'
                                opacity={0.8} type='Area' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
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
ReactDOM.render(<AreaEmpty />, document.getElementById('sample'));