/**
 * Sample for Line Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, Tooltip, ILoadedEventArgs, Category
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] =[{ x: 2002, y: 1.61 }, { x: 2003, y: 2.34 }, { x: 2004, y: 2.16 }, { x: 2005, y: 2.10 },
    { x: 2006, y: 1.81 }, { x: 2007, y: 2.05 }, { x: 2008, y: 2.50 }, { x: 2009, y: 2.22 },
    { x: 2010, y: 2.21 }, { x: 2011, y: 2.00 }, { x: 2012, y: 2.27 }]

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export class ChartTooltipTemplate extends SampleBase<{}, {}> {
    public tooltipTemplate(props): any {
        return (
            <div id="wrap">
                <table style={{ width: '100%', border: '1px solid black' }} className="table-borderless">
                    <tr>
                        <th rowSpan={2} style={{ backgroundColor: '#C1272D' }}>
                            <img src='src/chart/images/grain.png' />
                        </th>
                        <td style={{ height: '25px', width: '50px', backgroundColor: '#C1272D', fontSize: '14px', color: '#E7C554', fontWeight: 'bold', paddingLeft: '5px' }}>{props.y}</td>
                    </tr>
                    <tr >
                        <td style={{ height: '25px', width: '50px', backgroundColor: '#C1272D', fontSize: '18px', color: '#E7C554', fontWeight: 'bold', paddingLeft: '5px' }}>{props.x}</td>
                    </tr>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='chartTooltip' style={{ textAlign: "center" }}
                    backgroundImage='src/chart/images/wheat.png'
                        primaryXAxis={{
                            labelStyle: { color: 'white'},
                            valueType: 'Category',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            lineStyle: { color: '#EFEFEF' },
                        }}
                        primaryYAxis={{
                            rangePadding: 'None',
                            labelStyle: { color: 'white'},
                            majorGridLines: { color: '#EFEFEF' },
                            majorTickLines: { width: 0},
                            title: 'Billion Bushels',
                            titleStyle: { color: 'white'},
                            lineStyle: { width: 0 },
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true,
                        template: this.tooltipTemplate.bind(this) }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        title='USA Wheat Production' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, Tooltip, Category ]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' fill='#333333'
                                width={2}
                                marker={{
                                    visible: true,
                                    width: 10,
                                    height: 10,
                                    fill: '#C1272D',
                                    border: {color: '#333333', width: 2}
                                }} type='Line'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the USA Wheat Production data with default line series in the chart. Data points are enhanced with marker and tooltip.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the backgroundImage and tooltip template for the charts. You can use backgroundImage, tooltip, fill properties to customize the line. marker is used to represent individual data and its value.

Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                  </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                  </p> <br>
                    </br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Tooltip, we need to inject
                         <code>Tooltip</code> module into <code>services</code>.
                   </p>
                    <p>
                        More information on the line series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/chart/series/#type">documentation section</a>.
                   </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('chartTooltip');
        chart.setAttribute('title',  '');
    };
        
}
