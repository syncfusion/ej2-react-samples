/**
 * Stochastic sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    StripLine, DateTime, Logarithmic, Tooltip, CandleSeries, Crosshair, Zoom, ILoadedEventArgs, StripLinesDirective, StripLineDirective,
    LineSeries, StochasticIndicator, IndicatorsDirective, IndicatorDirective, Category, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { chartData } from '../datasource';
import { SampleBase } from './sample-base';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Stochastic extends SampleBase<{}, {}> {

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
                            intervalType: 'Months', majorGridLines: { width: 0 },
                            zoomFactor: 0.2, zoomPosition: 0.6,
                            skeleton: 'yMd',
                            crosshairTooltip: { enable: true },
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: '${value}',
                            minimum: 80, maximum: 170,
                            plotOffset: 25,
                            interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
                        }}
                        tooltip={{ enable: true, shared: true }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{ visible: false }}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
                            StochasticIndicator, StripLine]} />
                        <RowsDirective>
                            <RowDirective height={'40%'}>
                            </RowDirective>
                            <RowDirective height={'60%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }}
                                minimum={0} maximum={120} interval={60} title='Stochastic' lineStyle={{ width: 0 }}>
                                <StripLinesDirective>
                                    <StripLineDirective start={0} end={120} text='' color='black' visible={true} opacity={0.03} zIndex='Behind'>
                                    </StripLineDirective>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} width={2} xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='Stochastic' field='Close' seriesName='Apple Inc' yAxisName='secondary' fill='#6063ff' kPeriod={2} dPeriod={3} showZones={true} periodLine={{ color: '#f2ec2f' }} period={3} animation={{ enable: false }} upperLine={{ color: '#e74c3d' }}
                                lowerLine={{ color: '#2ecd71' }}>
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

ReactDOM.render(<Stochastic />, document.getElementById('sample'));