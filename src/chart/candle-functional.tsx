/**
 * Sample for Candle Series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries, Crosshair, StripLine, IAxisLabelRenderEventArgs, ChartTheme, RowDirective, RowsDirective, SeriesDirective, Inject, Legend } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { chartValues } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

export let zoomFactor: number;
export let zoomPosition: number;
export let pointColors: string[] = [];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Candle sample
 */

const Candle = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => {
        args.text = args.text.replace("0000000M", "M");
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div className="row">
                    <ChartComponent id='charts' style={{ textAlign: "center" }} load={load.bind(this)} primaryXAxis={{ valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 } }} primaryYAxis={{ title: 'Volume', labelFormat: '{value}M', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 } }} legendSettings= {{visible: false}} tooltip={{ enable: true,  header: "",format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b> <br> Volume : <b>${point.volume}</b>" }} width={Browser.isDevice ? '100%' : '80%'} axisLabelRender={axisLabelRender.bind(this)} chartArea={{ border: { width: 0 } }} title="AAPL Historical" loaded={onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, Legend, ColumnSeries, Logarithmic, Crosshair]} />
                        <RowsDirective>
                            <RowDirective height={'30%'} />
                            <RowDirective height={'70%'} />
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective name='secondary' rangePadding={"None"}  maximum= {150} minimum= {55}  opposedPosition={true} rowIndex={1} majorGridLines={{ width: 1 }} labelFormat='n0' title='Price' plotOffset={30} lineStyle={{ width: 0 }} />
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective type='Column' dataSource={chartValues} animation={{ enable: true }} xName='period' yName='volume' enableTooltip={false} name='Volume' />
                            <SeriesDirective type='Candle' yAxisName='secondary' bearFillColor='#2ecd71' bullFillColor='#e74c3d' dataSource={chartValues} animation={{ enable: true }} xName='period' low='low' high='high' open='open' close='close' name='Apple Inc' volume='volume' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample visualizes the AAPL stock price with a default candlestick series. The tooltip and crosshair show information about the stock price.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the candlestick series. This chart shows financial data and trends at equal intervals. It can often be combined with line and column charts to show the closing value of the stock and volume of the data.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Candle series, we need to inject
                    <code>CandleSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the Candle series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle">documentation section</a>.
                </p>
            </div>
        </div >
    )
    
   
}
export default Candle;