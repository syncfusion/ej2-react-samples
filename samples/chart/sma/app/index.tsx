/**
 * SMA sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    Legend, DateTime, Logarithmic, Tooltip, CandleSeries, DataLabel, Crosshair, Zoom, ColumnSeries, ILoadedEventArgs, IAxisLabelRenderEventArgs,
    LineSeries, SmaIndicator, IndicatorsDirective, IndicatorDirective, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { chartData } from '../datasource';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class SMA extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }}
                        primaryXAxis={{ valueType: 'DateTime', intervalType: 'Months', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }}
                        primaryYAxis={{ title: 'Price', labelFormat: '${value}M', minimum: 50, maximum: 170, interval: 30, majorGridLines: { width: 1 }, lineStyle: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        tooltip={{ enable: true, shared: true }}
                        chartArea={{ border: { width: 0 } }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        zoomSettings={{ enableMouseWheelZooming: true, enableSelectionZooming: true, enableDeferredZooming: true, enablePinchZooming: true, mode: 'X' }}
                        title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, SmaIndicator, Tooltip, DateTime, Logarithmic, DataLabel, Crosshair, Zoom, LineSeries]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='silver' name='Apple Inc'
                                low='low' open='open' close='close' high='high' volume='volume' type='Candle' animation={{ enable: false }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='Sma' fill='blue' seriesName='Apple Inc' period={14}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}

ReactDOM.render(<SMA />, document.getElementById('sample'));