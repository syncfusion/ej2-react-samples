/**
 * Sample for Hilo Open Close Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData } from './stock-chart-data';
import { Browser } from '@syncfusion/ej2-base';
export let zoomFactor;
export let zoomPosition;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #title{
        font-size: 15px;
        font-style: normal;
        font-family: "Segoe UI";
        font-weight: 500;
        text-anchor: middle;
        transform: none;
        opacity: 1;
    }`;
export class HiloOpenClose extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                        <div id="title"> AAPL Historical</div>
                </div>
                <div className="row">
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} ref={chart => this.chart1 = chart} primaryXAxis={{
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            majorGridLines: { width: 0 }
        }} primaryYAxis={{
            title: 'Price',
            rangePadding: 'None',
            labelFormat: 'n0',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        }} chartArea={{ border: { width: 0 } }} tooltip={{
            enable: true, shared: true
        }} axisLabelRender={this.axisLabelRender.bind(this)} width={Browser.isDevice ? '100%' : '80%'} legendSettings={{ visible: false }} crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }}>
                        <Inject services={[HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective type='HiloOpenClose' dataSource={chartData} animation={{ enable: true }} bearFillColor='#2ecd71' bullFillColor='#e74c3d' xName='x' low='low' high='high' open='open' close='close' name='Apple Inc'>
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
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use HiloOpenClose series, we need to inject
                       <code>HiloOpenCloseSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div>);
    }
    axisLabelRender(args) {
        if (args.axis.title === 'Price') {
            args.text = '$' + args.text;
        }
    }
}
