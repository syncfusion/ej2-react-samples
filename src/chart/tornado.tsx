/**
 * Negative Stack sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    Legend, Category, StackingBarSeries, Tooltip, ILoadedEventArgs, DataLabel, ITooltipRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: '4.5', y: 31 }, { x: '4.8', y: 37 },
    { x: '5.1', y: 49 }, { x: '5.4', y: 57 },
    { x: '5.7', y: 63 }, { x: '6', y: 69 }
];
export let data2: any[] = [
    { x: '4.5', y: -31, text: '31 KG' }, { x: '4.8', y: -39, text: '39 KG' },
    { x: '5.1', y: -52, text: '52 KG' }, { x: '5.4', y: -64, text: '64 KG' },
    { x: '5.7', y: -70, text: '70 KG' }, { x: '6', y: -74, text: '74 KG' }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export let textRender: EmitType<ITooltipRenderEventArgs> = (args: ITooltipRenderEventArgs) => {
    args.textCollections = args.textCollections.indexOf('-') > 0 ? args.textCollections.replace('-', '') : args.textCollections;
};
export class NegativeStack extends SampleBase<{}, {}> {

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
                            title: 'Height in Inches',
                            minorGridLines: { width: 0 },
                            minorTickLines: { width: 0 },
                            interval: 1,
                            majorGridLines: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            labelFormat: '{value} KG',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            labelStyle: {
                                color: 'transparent'
                            }
                        }}
                        tooltipRender={textRender}
                        legendSettings={{ position: Browser.isDevice ? 'Auto' : 'Right' }}
                        load={this.load.bind(this)}
                        title='Height vs Weight' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingBarSeries, DataLabel, Category, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} width={2} xName='x' yName='y' name='Female' type='StackingBar'
                                marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} width={2} xName='x' yName='y' name='Male' type='StackingBar'
                                marker={{ dataLabel: { name: 'text', visible: true, position: 'Top', font: { fontWeight: '600' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates stacked bar series type with negative values.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the bar type charts. Similar to column charts, but the orientation of y axis is horizontal instead of vertical.
                  You can use <code>border</code>, <code>fill</code> properties to customize the data appearance. <code>dataLabel</code> is used to represent individual data and its value.
              </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
             </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject
               <code>BarSeries</code> module into <code>services</code>.
             </p>
                    <p>
                        More information on the bar series can be found in this &nbsp;
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