/**
 * Sample for Candle Series
 */
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, AnnotationsDirective, AnnotationDirective, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries, Crosshair, StripLine,  ChartTheme, SeriesDirective, Inject, Legend, IAxisRangeCalculatedEventArgs, Series, IPointRenderEventArgs, ChartAnnotation } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

let value: number = 180;
let getData = (): { series: Candlestick[] } => {
    let series: Candlestick[] = [];
    let point: Candlestick;
    for (let i: number = 0; i < 30; i++) {
        value = 180 + Math.round((Math.random() * 25) * Math.sin(i * Math.PI / 8)); // Adjust the function as needed
        value = Math.max(140, Math.min(260, value));
        if (value > 260) {
            value = 260;
        }
        if (value < 140) {
            value = 140;
        }
        let open = value + Math.round(Math.random() * 18);
        let low = Math.min(value, open) - Math.round(Math.random() * 6);
        let high = Math.min(220, Math.max(value, open) + Math.round(Math.random() * 15));
        point = {
            x: new Date(2000, 5, 2, 2, 0, i),
            close: value,
            open: open,
            low: low,
            high: high
        };
        series.push(point);
    }
    return { series: series };
};
let data: Candlestick[] = getData().series;
let incVal: number = 0;
let updateVal: number = data.length;
let pointAdded: boolean = false;
interface Candlestick {
    open: number;
    close: number;
    high: number;
    low: number;
    x: Date;
}

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Candle sample
 */

const LiveStock = () => {
    let[intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    useEffect(() => {
        updateSampleSection();
        return () => {
            clearIntervalFn();
        };
    }, [])
    let chartInstance = useRef<ChartComponent>(null);
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {

        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;

        clearIntervalFn();
        intervalId = setInterval(function () {
            var container = document.getElementById('stock');
            if (container && container.id === args.chart.element.id) {
                let newData1: Candlestick[] = [];
                let value: number = 180;
                pointAdded = true;
                for (let i: number = 0; i < (args.chart.series[0].dataSource as Object[]).length; i++) {
                    newData1.push(Object.assign({}, (args.chart.series[0] as Series).dataSource[i]));
                }
                if (newData1.length > 0) {
                    const lastIndex: number = newData1.length - 1;
                    const previousClose: number = newData1[lastIndex].close;
                    newData1[lastIndex].close += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 25;
                    newData1[lastIndex].close = Math.min(Math.min(Math.max(newData1[lastIndex].close, newData1[lastIndex].low + 5), newData1[lastIndex].high - 5), newData1[lastIndex].open - 2);
                    if (previousClose === newData1[lastIndex].close) {
                        newData1[lastIndex].close -= 5;
                    }
                }
                if (incVal < 10) {
                    if (args.chart.series.length > 0) {
                        (args.chart.series[0] as Series).setData(newData1);
                        incVal++;
                    }
                }
                else {
                    let change: number = Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10);
                    value += change;
                    if (value > 260) {
                        value = 260;
                    }
                    if (value < 140) {
                        value = 140;
                    }
                    let open: number = value + Math.round(Math.random() * 12);
                    let low: number = Math.min(value, open) - Math.round(Math.random() * 8);
                    let high: number = Math.max(value, open) + Math.round(Math.random() * 15);
                    if (args.chart.series.length > 0) {
                        var lastDataPointIndex: number = ((args.chart.series[0] as Series).dataSource as []).length - 1;
                        if (lastDataPointIndex >= 0) {
                            var timestamp = (args.chart.series[0] as Series).dataSource[lastDataPointIndex].x;
                            var lastTimestamp = new Date(timestamp).getTime();
                            (args.chart.series[0] as Series).addPoint({ x: new Date(lastTimestamp + 1000), high: high, low: low, open: open, close: value });
                        }
                    }
                    incVal = 0;
                    updateVal++;
                }
            }
            else {
                clearIntervalFn();
            }
        }, 1000);
        if (intervalId) setIntervalId(intervalId);
    };
    const clearIntervalFn = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    const axisRangeCalculated = (args: IAxisRangeCalculatedEventArgs): void  => {
        if (args.axis.name === 'primaryXAxis') {
            let lastPoint = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 2500;
            let firstPoint = args.axis.series[0].points[0].x;
            args.minimum = new Date(Number(firstPoint)).getTime() + 500;
        }
    };
    const pointRender = (args: IPointRenderEventArgs): void => {
        if (args.series.chart.enableRtl) {
            args.series.chart.annotations[0].x = 0;
        }
        if (pointAdded && args.series.points[args.series.points.length - 1] === args.point) {
            const firstPoint = args.series.chart.enableRtl ? args.series.points[args.series.points.length - 1].x : args.series.points[0].x;
            args.series.chart.annotations[0].x = new Date(Number(firstPoint)).getTime() + (args.series.chart.enableRtl ? 2000 : 1000);
            args.series.chart.annotations[0].y = args.point.close as number;
            args.series.chart.annotations[0].content = `<div style="width: ${args.series.chart.initialClipRect.width}px; height: 0; left: ${Browser.isDevice ? -10 : -16}px; position: absolute;">
            <svg width="100%" height="2" style="display: block;">
              <line x1="0" y1="1" x2="${args.series.chart.initialClipRect.width}" y2="1" 
                style="stroke:#868180; stroke-width:0.75; stroke-dasharray:5,5;" />
            </svg>
          </div>
          <div style="width: 40px; height: 18px; background-color: ${args.fill}; border: 1px solid rgba(48, 153, 245, 0.4); color: white; font-size: 11px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 18px; position: absolute; left: ${(args.series.chart.enableRtl ? -args.series.chart.initialClipRect : args.series.chart.initialClipRect.width - 20)}px; top: -9px;">
            ${(args.point.close as number).toFixed(2)}
          </div> `;
        }
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div className="row">
                    <ChartComponent id='stock' ref={chartInstance} style={{ textAlign: "center" }} load={load.bind(this)} primaryXAxis={{ valueType: 'DateTime', interval: Browser.isDevice ? 8 : 4, edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',  crosshairTooltip: { enable: true }, majorGridLines: { width: 0 }, labelIntersectAction: 'Hide' }} primaryYAxis={{ interval: 20, minimum: 120, opposedPosition: true, crosshairTooltip: { enable: true }, lineStyle: { width: 0 }, majorGridLines: { width: 1 }, majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '90%'} chartArea={{ border: { width: 0 } }} title="AAPL Historical" crosshair={{ enable: true, dashArray: '5,5' }} pointRender={pointRender.bind(this)}  axisRangeCalculated={axisRangeCalculated.bind(this)}>
                        <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair, ChartAnnotation]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective type='Candle' bearFillColor='#2ecd71' bullFillColor='#e74c3d' dataSource={data} columnWidth={0.4}  xName='x' low='low' high='high' open='open' close='close' />
                        </SeriesCollectionDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div"></div>' x={new Date(2000, 5, 2, 2, 0, 1)} y={140} region="Series" coordinateUnits='Point'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </ChartComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the animation in the candle chart when existing data is updated or new data is added.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a candlestick series to display data that updates every second using the <code>setData</code> method and adds new data every five seconds using the <code>addPoint</code> method. The chart demonstrates setting up a crosshair to follow the latest data and adjusting the point color based on the value.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use the candle series, we need to inject <code>CandleSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the candle series can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle" aria-label="Navigate to the documentation for Candle Chart in React Chart control">documentation section</a>.
                </p>
            </div>
        </div >
    )
    
   
}
export default LiveStock;