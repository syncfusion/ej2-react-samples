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
import { updateSampleSection } from '../common/sample-base';
import { chartValues } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { getElement } from "@syncfusion/ej2-svg-base/src/tooltip/helper";
export let zoomFactor : number;
export let zoomPosition :number;
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
function HiloOpenClose() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chart1: ChartComponent;
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                        <div id="title"> AAPL Historical</div>
                </div>
                <div className="row">
                    <ChartComponent id='charts' load={load.bind(this)} 
                        style={{ textAlign: "center" }}
                        ref={chart => chart1 = chart}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Price',
							rangePadding: 'None',
                            labelFormat: 'n0',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{
                            enable: true, shared: true, header:""
                        }}
                        
                        width={Browser.isDevice ? '100%' : '75%'}
                        legendSettings={{ visible: false }}
                        crosshair={{ enable: true, lineType: 'Vertical'}}>
                        <Inject services={[HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective type='HiloOpenClose'
                                dataSource={chartValues} animation={{ enable: true }}
                                bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                xName='period' low='low' high='high' open='open' close='close' name='Apple Inc'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes the AAPL stock price with default HILO Open Close series in the chart. The tooltip and the crosshairs display the data and period information.
           </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the HILO Open Close series. The horizontal lines on the left and the right are used to show the opening and closing values of the stock, and the vertical line represents both high and low values.
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
                        More information on the column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#high-low-open-close">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    function load(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark") as ChartTheme;
    };   
    
}
export default HiloOpenClose;
