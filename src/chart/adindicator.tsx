/**
 * ADI Indicator Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, StripLineDirective,
    Crosshair, LineSeries, AccumulationDistributionIndicator, IAxisLabelRenderEventArgs,
    StripLine, ChartTheme, IndicatorsDirective, IndicatorDirective, StripLinesDirective
} from '@syncfusion/ej2-react-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .charts {
        align :center
    }`;
/**
 * AccumulationDistribution sample
 */
export class AccumulationDistribution extends SampleBase<{}, {}> {

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
                            intervalType: 'Months',
                            majorGridLines: { width: 0 },
                            zoomFactor: 0.2, zoomPosition: 0.6,
                            skeleton: 'yMd',
                            crosshairTooltip: { enable: true },
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: '${value}',
                            minimum: 50, maximum: 170,
                            plotOffset: 25,
                            interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
                        }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        axisLabelRender={this.axisLableRender.bind(this)}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, StripLine, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
                            AccumulationDistributionIndicator]} />
                        <RowsDirective>
                            <RowDirective height={'40%'}>
                            </RowDirective>
                            <RowDirective height={'60%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }}
                                minimum={-7000000000} maximum={5000000000} interval={6000000000} title='Accumulation Distribution' lineStyle={{ width: 0 }}>
                                <StripLinesDirective>
                                    <StripLineDirective start={-7000000000} end={6000000000} text='' color='#6063ff' visible={true}
                                        opacity={0.1} zIndex={'Behind'}>
                                    </StripLineDirective>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} width={2}
                                xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open'
                                name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                type='Candle' animation={{ enable: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='AccumulationDistribution' field='Close' seriesName='Apple Inc' yAxisName='secondary' fill='#6063ff'
                                period={3} animation={{ enable: true }}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates Accumulation Distribution indicator in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Accumulation Distribution Indicator. Accumulation Distribution Indicator is used to represent the price movements in stock. You
                         can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Accumulation Distribution Indicator, we need to inject
                       <code>AccumulationDistributionIndicator</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the Accumulation Distribution Indicator can be found in this &nbsp;
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
    public axisLableRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'secondary') {
            let value: number = Number(args.text) / 1000000000;
            args.text = String(value) + 'bn';
        }
    }
}
