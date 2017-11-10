/**
 * Sample for Bubble Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    BubbleSeries, Tooltip, IPointRenderEventArgs, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, bootstrapColors, materialColors } from './theme-color';
import { SampleBase } from '../common/sample-base';
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
export let data: any[] = [
    { x: 92.2, y: 7.8, size: 1.347, text: 'China' },
    { x: 74, y: 6.5, size: 1.241, text: 'India' },
    { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia' },
    { x: 99.4, y: 2.2, size: 0.312, text: 'US' },
    { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' },
    { x: 99, y: 0.7, size: 0.0818, text: 'Germany' },
    { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' },
    { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' },
    { x: 99, y: 0.2, size: 0.128, text: 'Japan' },
    { x: 86.1, y: 4.0, size: 0.115, text: 'Mexico' },
    { x: 92.6, y: 6.6, size: 0.096, text: 'Philippines' },
    { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria' },
    { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong' },
    { x: 79.2, y: 3.9, size: 0.162, text: 'Netherland' },
    { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan' },
    { x: 81, y: 3.5, size: 0.21, text: 'Australia' },
    { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia' },
    { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan' }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Bubble sample
 */
export class Bubble extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            title: 'Literacy Rate',
                            minimum: 60,
                            maximum: 100,
                            interval: 5
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'GDP Growth Rate',
                            minimum: 0,
                            maximum: 10,
                            interval: 2.5
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        title='World Countries Details' pointRender={pointRender}
                        legendSettings={{ visible: false }} loaded={this.onChartLoad.bind(this)}
                        tooltip={{
                            enable: true,
                            format: '${point.text}<br/>Literacy Rate : <b>${point.x}%</b>' +
                            '<br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>'
                        }}>
                        <Inject services={[BubbleSeries, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} type='Bubble' minRadius={3}
                                maxRadius={Browser.isDevice ? 6 : 8}
                                xName='x' yName='y' size='size' name='Pound'
                                marker={{ dataLabel: { name: 'text' } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the  Literacy Rate and GDP Growth Rate of world countries by using bubble series in the chart. Tooltip shows the information about the  countries.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the bubble type charts.A bubble chart is a type of chart that displays three dimensions of data. Each points is drawn as a bubble, where bubble's size depends on <code>size</code> property.
                        You can use <code>fill</code> property to customize the data appearance.
                  </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                  </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use bubble series, we need to inject
                       <code>BubbleSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the bubble series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
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