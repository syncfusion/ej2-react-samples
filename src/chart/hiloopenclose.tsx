/**
 * Sample for Hilo Open Close Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, ILoadedEventArgs, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData } from './stock-chart-data';
import { Browser } from '@syncfusion/ej2-base';
import { getElement } from "@syncfusion/ej2-svg-base/src/tooltip/helper";

export let zoomFactor : number;
export let zoomPosition :number;

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class HiloOpenClose extends SampleBase<{}, {}> {
    private chart1: ChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row">
                    <ChartComponent id='charts' load={this.load.bind(this)} 
                        style={{ textAlign: "center" }}
                        ref={chart => this.chart1 = chart}
                        loaded={this.loaded.bind(this)}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: 'n0',
                            lineStyle: { width: 0 },
                            minimum: 40,
                            maximum: 140,
                            interval: 20,
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{
                            enable: true, shared: true,
                            format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b>"
                        }}
                        title="AAPL Historical"
                        axisLabelRender={this.axisLabelRender.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}
                        legendSettings={{ visible: false }}
                        crosshair={{ enable: true, lineType: 'Vertical',  line: { width: 0 }}}>
                        <Inject services={[HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective type='HiloOpenClose'
                                dataSource={chartData} animation={{ enable: true }}
                                bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                xName='x' low='low' high='high' open='open' close='close' name='Apple Inc'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the AAPL historical data with default HILO Open Close series in the chart.
                Tooltip and crosshair shows the information about the data and period.
           </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Hilo Open Close type charts. Hilo Open Close chart are used to represent the price movements in stock. You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use HiloOpenClose series, we need to inject
                       <code>HiloOpenCloseSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the HILO Open Close series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/high-low-open-close" aria-label="Navigate to the documentation for High Low Open Close in React Chart component">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }

    public loaded (args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
       
    public load(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.title === 'Price') {
            args.text = '$' + args.text;
        }
    }
}
