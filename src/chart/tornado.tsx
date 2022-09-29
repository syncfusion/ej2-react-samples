/**
 * Sample for Tornado chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    Legend, Category, StackingBarSeries, Tooltip, ILoadedEventArgs, DataLabel, ITooltipRenderEventArgs, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: '4.5', y: 31, text: '31 KG'}, { x: '4.8', y: 37, text: '37 KG' },
    { x: '5.1', y: 49, text: '49 KG' }, { x: '5.4', y: 57, text: '57 KG' },
    { x: '5.7', y: 63, text: '63 KG' }, { x: '6', y: 69, text: '69 KG' }
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
    args.text = args.text.indexOf('-') > 0 ? args.text.replace('-', '') : args.text;
    args.text = args.text + " " + "<b>kg</b>";
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
                            interval: 1,
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            labelFormat: '{value}',
                            title: 'Weight (kg)',
                            lineStyle: { width: 0 },
                        }}
                        tooltipRender={textRender}
                        legendSettings={{ position: Browser.isDevice ? 'Auto' : 'Right' , enableHighlight :true}}
                        load={this.load.bind(this)}
                        title='Height vs Weight' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingBarSeries, DataLabel, Category, Legend, Tooltip, Highlight]} />
                        <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} width={2} xName='x' yName='y' name='Female' columnWidth={0.5} type='StackingBar' marker={{ dataLabel: { name: 'text',visible: true, position: 'Top', font: { fontWeight: '600' } } }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} width={2} xName='x' yName='y' name='Male' columnWidth={0.5} type='StackingBar' marker={{ dataLabel: { name: 'text', visible: true, position: 'Top', font: { fontWeight: '600' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates a stacked bar chart with negative data points. Data point values are shown in data labels.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure negative values in a stacked bar chart. The stacked bar chart stacks points in the series horizontally. You can also use the <code>StackingGroup</code> property to group stacked collections based on category.
              </p>
                    <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
             </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Stackingbar series, we need to inject
               <code>StackingBarSeries</code> module into <code>services</code>.
             </p>
                    <p>
                        More information on the stackingbar series can be found in this &nbsp;
                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/#bar-chart">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
    
        
}