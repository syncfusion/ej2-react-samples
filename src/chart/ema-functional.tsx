/**
 * Sample for EMA Indicator
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme, Crosshair, LineSeries, EmaIndicator, IndicatorsDirective, IndicatorDirective } from '@syncfusion/ej2-react-charts';
import { chartValues } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const EMA = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style> {SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' load={load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price (in Million) ', labelFormat: '${value}M', minimum: 50, maximum: 170, interval: 30, majorGridLines: { width: 1 }, lineStyle: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical' }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: false }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL Stock Price 2012-2017' loaded={onChartLoad.bind(this)}>
                    <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, EmaIndicator]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartValues} width={2} xName='period' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: false }} />
                    </SeriesCollectionDirective>
                    <IndicatorsDirective>
                        <IndicatorDirective type='Ema' field='Close' seriesName='Apple Inc' fill='#606eff' period={14} animation={{ enable: true }} />
                    </IndicatorsDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates a chart with candle series and an exponential moving average indicator. The trackball shows information about each day’s stock rates and signal values.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure an exponential moving average indicator. This indicator tracks the price of an investment over time and is used to define the direction of the trend.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use EMA Indicator, we need to inject <code>EmaIndicator</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the EMA Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#exponential-moving-average-ema" aria-label="Navigate to the documentation for Exponential Moving Average in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default EMA;