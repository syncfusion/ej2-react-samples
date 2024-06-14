/**
 * Sample for TMA indicator
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, CandleSeries, Category, Tooltip, DateTime, Legend, Zoom, Logarithmic, Crosshair, LineSeries, TmaIndicator, IndicatorsDirective, IndicatorDirective, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { chartValues } from './financial-data';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const TMA = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' load={load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price (In Million)', labelFormat: '${value}M', minimum: 50, maximum: 170, interval: 30, majorGridLines: { width: 1 }, lineStyle: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical' }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL Stock Price 2012-2017'    legendSettings = {{visible: false}} loaded={onChartLoad.bind(this)}>
                    <Inject services={[CandleSeries, Category,Legend, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, TmaIndicator]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartValues} width={2} xName='period' yName='y' low='low' high='high' close='close' volume='volume' open='open'     name='Apple Inc'  bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: false }} />
                    </SeriesCollectionDirective>
                    <IndicatorsDirective>
                        <IndicatorDirective type='Tma' field='Close' seriesName='Apple Inc' fill='#6063ff' period={14} animation={{ enable: true }} />
                    </IndicatorsDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates a chart with candle series and a triangular moving average indicator. The trackball shows information about the stock and signal values for each day.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a triangle moving average indicator. The triangle moving average indicator is used to define the direction of the trend.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use TMA Indicator, we need to inject <code>TmaIndicator</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the TMA Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#triangular-moving-average-tma" aria-label="Navigate to the documentation for Triangular Moving Average in technical indicators of React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default TMA;
