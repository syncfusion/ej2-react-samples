/**
 * Sample for Waterfall series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, DateTime, Logarithmic, Tooltip, WaterfallSeries, DataLabel, Category, Crosshair, Zoom, ILoadedEventArgs, ITextRenderEventArgs,
    IAxisLabelRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: object[] = [
    { x: 'Income', y: 4711 }, { x: 'Sales', y: -1015 },
    { x: 'Development', y: -688 },
    { x: 'Revenue', y: 1030 }, { x: 'Balance' },
    { x: 'Expense', y: -361 }, { x: 'Tax', y: -695 },
    { x: 'Net Profit' }
];


const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #control-charts {
        padding: 0px !important;
    }

    #charts_Series_0_Connector_ {
        stroke-dasharray: 10px 10px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 1s linear infinite;
        animation: dash 1s linear infinite;
    }
    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }
    @keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }`;
export class Waterfall extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 },
                            plotOffset: 20
                        }}
                        primaryYAxis={{
                            minimum: 0, maximum: 5000, interval: 1000,
                            majorGridLines: { width: 0 },
                            title: 'Expenditure'
                        }}
                        tooltip={{ enable: true, shared: false }}
                        textRender={this.textRender.bind(this)}
                        axisLabelRender={this.axisLabelRender.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{ visible: false }}
                        title='Company Revenue and Profit' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y'  type='Waterfall' intermediateSumIndexes={[4]}
                                sumIndexes={[7]} marker={{ dataLabel: { visible: true, font: { color: '#ffffff' } } }} connector={{ color: '#5F6A6A', width: 2 }} columnWidth={0.9}
                                negativeFillColor='#e56590'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the revenue and profits of a company by using default waterfall series in the chart. Tooltip shows the information about the profits earned by each department on the company.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Waterfall type charts. Waterfall type charts are used to represent the financial datas.
                       You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect. <code>dataLabel</code> is used to represent individual data and its value.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Waterfall series, we need to inject
                       <code>WaterfallSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the waterfall series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/waterfall">documentation section</a>.
                  </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    public textRender(args: ITextRenderEventArgs): void {
        let value: number = Number(args.text) / 1000;
        value = Math.round((value * 100)) / 100;
        args.text = value.toString();
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
        
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '$' + Number(args.text) / 1000 + 'B';
        }
    };
}
