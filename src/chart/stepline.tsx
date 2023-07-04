/**
 * Sample for Step line series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, DateTime, StepLineSeries, Tooltip, ILoadedEventArgs, ChartTheme, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

/**
 * StepLine Series
 */
 export let data1 = [{ x: new Date(1975, 0, 1), y: 35 },{ x: new Date(1978, 0, 1), y: 45 },{ x: new Date(1981, 0, 1), y: 55 },
    { x: new Date(1984, 0, 1), y: 20 },{ x: new Date(1987, 0, 1), y: 10 },{ x: new Date(1990, 0, 1), y: 42 },
    { x: new Date(1993, 0, 1), y: 35 },{ x: new Date(1996, 0, 1), y: 22 },{ x: new Date(2000, 0, 1), y: 65 },
    { x: new Date(2005, 0, 1), y: 65 },{ x: new Date(2010, 0, 1), y: 58 },
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StepLine extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            minimum: new Date(1971, 0, 1), maximum: new Date(2015, 0, 1), labelFormat: 'yyyy', intervalType: 'Months', valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            interval: 10, title: 'Production (In Percentage)', labelFormat: '{value}%', lineStyle: { width: 0 }, majorTickLines: { width: 0 },
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{visible : false , enableHighlight: true}}
                        tooltip={{ enable: true , shared:true , header:"<b>Fruit Production</b>" , format:"${point.x} : <b>${point.y}</b>"}} loaded={this.onChartLoad.bind(this)}
                        title='Fruit Production Statistics'> 
                        <Inject services={[StepLineSeries, Tooltip, DateTime, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='China' width={5}
                                type='StepLine' marker={{ isFilled: false, visible: true, width: 7, height: 7 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React StepLine Chart example visualizes the fruit production statistics with default stepline series in the chart. 
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the step line type chart. This Chart forms the step line progress, by connecting, points using vertical and horizontal lines.
                  <code>Markers</code> are used to represent individual data and its values.
                    </p>
                    <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use step line series, we need to inject
                        <code>StepLineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the step line series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/step-line">documentation section</a>.
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