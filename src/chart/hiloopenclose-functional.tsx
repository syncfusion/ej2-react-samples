/**
 * Sample for Hilo Open Close Series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ChartTheme, Crosshair, ILoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { chartValues } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let zoomFactor : number;
export let zoomPosition :number;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const HiloOpenClose = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const loaded = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        loadChartTheme(args);
    }; 
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div className="row">
                    <ChartComponent id='charts' load={load.bind(this)} loaded={loaded.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 } }} primaryYAxis={{ title: 'Price', labelFormat: 'n0', lineStyle: { width: 0 }, minimum: 40, maximum: 140, interval: 20, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true, header: "", format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b>" }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: false }} crosshair={{ enable: true, lineType: 'Vertical' }} title="AAPL Historical">
                        <Inject services={[HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective type='HiloOpenClose' dataSource={chartValues} animation={{ enable: true }} bearFillColor='#2ecd71' bullFillColor='#e74c3d' xName='period' low='low' high='high' open='open' close='close' name='Apple Inc' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample visualizes the AAPL stock price with default HILO Open Close series in the chart. The tooltip and the crosshairs display the data and period information.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the HILO Open Close series. The horizontal lines on the left and the right are used to show the opening and closing values of the stock, and the vertical line represents both high and low values.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use HiloOpenClose series, we need to inject <code>HiloOpenCloseSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#high-low-open-close" aria-label="Navigate to the documentation for High Low Open Close in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default HiloOpenClose;