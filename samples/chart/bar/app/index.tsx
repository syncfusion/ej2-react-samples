/**
 * Sample for Bar series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    DataLabel, BarSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

export let data1: any[] = [
    { x: 'Egg', y: 2.2 }, { x: 'Fish', y: 2.4 },
    { x: 'Misc', y: 3 }, { x: 'Tea', y: 3.1 }
];
export let data2: any[] = [
    { x: 'Egg', y: 1.2 }, { x: 'Fish', y: 1.3 },
    { x: 'Misc', y: 1.5 }, { x: 'Tea', y: 2.2 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Bar sample
 */
export class Bar extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div>
                        <ChartComponent id='charts' style={{ textAlign: "center" }}
                            primaryXAxis={{
                                valueType: 'Category',
                                title: 'Food',
                                interval: 1,
                                majorGridLines: { width: 0 }
                            }}
                            primaryYAxis={{
                                minimum: 0,
                                maximum: 3.2,
                                labelFormat: '{value}B',
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 },
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                labelStyle: {
                                    color: 'transparent'
                                }
                            }}
                            chartArea={{ border: { width: 0 } }}
                            load={this.load.bind(this)}
                            width={Browser.isDevice ? '100%' : '60%'}
                            title='UK Trade in Food Groups - 2015' loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: true }}>
                            <Inject services={[BarSeries, DataLabel, Category, Legend, Tooltip]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' type='Bar' name='Imports' width={2} marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top',
                                        font: {
                                            fontWeight: '600', color: '#ffffff'
                                        }
                                    }
                                }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data2} xName='x' yName='y' type='Bar' name='Exports' width={2}
                                    marker={{
                                        dataLabel: {
                                            visible: true,
                                            position: 'Top',
                                            font: {
                                                fontWeight: '600', color: '#ffffff'
                                            }
                                        }
                                    }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.gov.uk/" target='_blank'>www.gov.uk</a>
                    </div>
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

ReactDOM.render(<Bar />, document.getElementById('sample'));