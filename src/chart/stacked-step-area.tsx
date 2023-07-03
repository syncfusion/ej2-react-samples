/**
 * Sample for Stacked Step Area series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, StackingStepAreaSeries, ILoadedEventArgs, ChartTheme, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [{ x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
{ x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
{ x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 520 }];
export let data1: any[] = [{ x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
{ x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
{ x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 220 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedStepArea extends SampleBase<{}, {}> {
    private opacity: number = 0.5;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Double',
                            majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift'
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Production (Billion as kWh)',
                            valueType: 'Double',
                            labelFormat: '{value}B',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        legendSettings={{enableHighlight: true}}
                        chartArea={{ border: { width: 0 } }}
                        loaded={this.onChartLoad.bind(this)}
                        title='Electricity- Production'>
                        <Inject services={[StackingStepAreaSeries, Legend, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='Renewable'
                                type='StackingStepArea' fill="#56CCF2" opacity={0.5} border={{ width: 2.5}}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Non-Renewable'
                                type='StackingStepArea' opacity={0.5} fill="#2F80ED" border={{ width: 2.5}}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the data about electricity production using stacked stepped area chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Stacked StepArea chart. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking step area series, we need to inject
                        <code>StackingStepArea</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacked step area series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-step-area">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    
}