/**
 * Hilo Series Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    HiloSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Hilo extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            skeleton: 'yMd', zoomFactor: 0.2, zoomPosition: 0.6,
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            minimum: 50,
                            maximum: 170,
                            interval: 30,
                            labelFormat: '${value}',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        legendSettings={{ visible: false }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL Historical' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='low' name='Apple Inc' type='Hilo' low='low'
                                high='high'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates hilo series type in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Hilo type charts. Hilo type chart is used to represent the price movements in stock. You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Hilo series, we need to inject
                       <code>HiloSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the Hilo series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div >
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
