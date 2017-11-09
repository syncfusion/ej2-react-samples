/**
 * Sample for Hilo Open Close Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, ILoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from './sample-base';
import { chartData } from '../financial-data';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class HiloOpenClose extends SampleBase<{}, {}> {

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
                            labelFormat: '${value}',
                            minimum: 50, maximum: 170,
                            interval: 40,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        legendSettings={{ visible: false }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL Historical' loaded={this.onChartLoad.bind(this)}>
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

ReactDOM.render(<HiloOpenClose />, document.getElementById('sample'));