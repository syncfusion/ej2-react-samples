/**
 * Sample for Candle Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries,
    Crosshair, StripLine, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    /**
     * Candle sample
     */
export class Candle extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{textAlign:"center"}}
                        load={this.load.bind(this)}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            skeleton: 'yMd', zoomFactor: 0.2, zoomPosition: 0.6,
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Volume',
                            labelFormat: '{value}',
                            valueType: 'Logarithmic',
                            minimum: 500000000, maximum: 130000000, opposedPosition: true,
                            majorGridLines: { width: 1 },
                            lineStyle: { width: 0 },
                            stripLines: [
                                {
                                    end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                                    opacity: 0.03, zIndex: 'Behind'
                                }]
                        }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        width= { Browser.isDevice ? '100%' : '80%'}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        axisLabelRender={this.axisLabelRender.bind(this)}
                        tooltipRender={this.tooltipLabelRender.bind(this)}
                        chartArea={{ border: { width: 0 } }}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL Historical' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair]} />
                        <RowsDirective>
                            <RowDirective height={'30%'}>
                            </RowDirective>
                            <RowDirective height={'70%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective name='secondary' minimum={50} maximum={180} interval={40} opposedPosition={true} rowIndex={1} majorGridLines={{ width: 1 }}
                                labelFormat='${value}' title='Price' plotOffset={30} lineStyle={{ width: 0 }}>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective type='Column'
                                dataSource={chartData} animation={{ enable: true }} xName='x' yName='volume'
                                name='Volume'>
                            </SeriesDirective>
                            <SeriesDirective type='Candle' yAxisName='secondary' bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                dataSource={chartData} animation={{ enable: true }}
                                xName='x' low='low' high='high' open='open' close='close' name='Apple Inc'
                                volume='volume'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Candle type charts. Candle type chart is used to represent the price movements in stock.
                       You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Candle series, we need to inject
                       <code>CandleSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the Candle series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = this.getLabelText(+args.text);
        }
    }
    public tooltipLabelRender(args: ITooltipRenderEventArgs): void {
        if (!args.series.index) {
            args.textCollections = 'Volume : <b>' +
                this.getLabelText(args.textCollections.split('<b>')[1].split('</b>')[0]) + '</b>';
        }
    }
    public getLabelText: Function = (value: number): string => {
        return (((value) / 1000000000)).toFixed(1) + 'bn';
    };
}
