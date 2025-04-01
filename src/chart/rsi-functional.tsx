/**
 * Sample RSI Indicator
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject, ILoadedEventArgs, StripLinesDirective, StripLineDirective, LineSeries, RsiIndicator, IndicatorsDirective, ChartTheme, IndicatorDirective, Category, StripLine, CandleSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend } from '@syncfusion/ej2-react-charts';
import { chartValues } from './financial-data';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RSI = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' load={load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price(in Million)', labelFormat: '${value}M', plotOffset: 25, minimum: 50, maximum: 170, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '75%'} crosshair={{ enable: true, lineType: 'Vertical' }} chartArea={{ border: { width: 0 } }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL Stock Price 2012-2017' legendSettings={{ visible:false }}  loaded={onChartLoad.bind(this)}>
                    <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Legend, Logarithmic, Crosshair, LineSeries, RsiIndicator, StripLine]} />
                    <RowsDirective>
                        <RowDirective height={'40%'} />
                        <RowDirective height={'60%'} />
                    </RowsDirective>
                    <AxesDirective>
                        <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }} minimum={0} maximum={120} interval={60} title='RSI' lineStyle={{ width: 0 }}>
                            <StripLinesDirective>
                                <StripLineDirective start={0} end={120} text='' color='black' visible={true} opacity={0.03} zIndex='Behind' />
                            </StripLinesDirective>
                        </AxisDirective>
                    </AxesDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartValues} xName='period' yName='silver'    name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' low='low' open='open' close='close' high='high' volume='volume' type='Candle' />
                    </SeriesCollectionDirective>
                    <IndicatorsDirective>
                        <IndicatorDirective field='Close' yAxisName='secondary' type='Rsi' fill='#6063ff' seriesName='Apple Inc' period={3} showZones={true} overBought={70} overSold={30} upperLine={{ color: '#ffb735' }} lowerLine={{ color: '#f2ec2f' }} animation={{ enable: true }} />
                    </IndicatorsDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates a chart with candle series and a relative strength index indicator. The trackball shows information about the day’s stock, signal line, lower line, and upper line values.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a relative strength index indicator. RSA measures the speed and magnitude of price movements studying the average gains and average losses, and shows how strongly the stock is moving in its current direction.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use RSI Indicator, we need to inject <code>RsiIndicator</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the RSI Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#relative-strength-index-rsi" aria-label="Navigate to the documentation for Relative Strength Index in technical indicators of React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default RSI;
