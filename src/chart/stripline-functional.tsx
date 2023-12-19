/**
 * Sample for stripline
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, DateTimeCategory, Tooltip, ILoadedEventArgs, StripLine, ChartTheme, SplineAreaSeries, SplineSeries, Highlight } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: new Date(2023, 4, 1), wind : 19 },
    { x: new Date(2023, 4, 2), wind : 17 },
    { x: new Date(2023, 4, 3), wind : 14 },
    { x: new Date(2023, 4, 4), wind : 9 },
    { x: new Date(2023, 4, 5), wind : 10 },
    { x: new Date(2023, 4, 6), wind : 8 },
    { x: new Date(2023, 4, 7), wind : 8 },
    { x: new Date(2023, 4, 8), wind : 16 },
    { x: new Date(2023, 4, 9), wind : 9 },
    { x: new Date(2023, 4, 10), wind : 13 },
    { x: new Date(2023, 4, 11), wind : 7 },
    { x: new Date(2023, 4, 12), wind : 12 },
    { x: new Date(2023, 4, 13), wind : 10 },
    { x: new Date(2023, 4, 14), wind : 5 },
    { x: new Date(2023, 4, 15), wind : 8 }];
export let data1: any[] = [
    { x: new Date(2023, 4, 1), gust : 30 },
    { x: new Date(2023, 4, 2), gust : 28 },
    { x: new Date(2023, 4, 3), gust : 26 },
    { x: new Date(2023, 4, 4), gust : 19 },
    { x: new Date(2023, 4, 5), gust : 21 },
    { x: new Date(2023, 4, 6), gust : 14 },
    { x: new Date(2023, 4, 7), gust : 13 },
    { x: new Date(2023, 4, 8), gust : 29 },
    { x: new Date(2023, 4, 9), gust : 19 },
    { x: new Date(2023, 4, 10), gust : 20 },
    { x: new Date(2023, 4, 11), gust : 15 },
    { x: new Date(2023, 4, 12), gust : 25 },
    { x: new Date(2023, 4, 13), gust : 20 },
    { x: new Date(2023, 4, 14), gust : 10 },
    { x: new Date(2023, 4, 15), gust : 15 }];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #winter stop {
        stop-color: #4ca1af;
    }

    #winter stop[offset="0"] {
        stop-color: #c4e0e5;
    }

    #winter stop[offset="1"] {
        stop-color: #4ca1af;
    }

    #summer stop {
        stop-color: #ffa751;
    }

    #summer stop[offset="0"] {
        stop-color: #ffe259;
    }

    #summer stop[offset="1"] {
        stop-color: #ffa751;
    }

    #spring stop {
        stop-color: #1d976c;
    }

    #spring stop[offset="0"] {
        stop-color: #93f9b9;
    }

    #spring stop[offset="1"] {
        stop-color: #1d976c;
    }

    #autumn stop {
        stop-color: #603813;
    }

    #autumn stop[offset="0"] {
        stop-color: #b29f94;
    }
    .productA {
        width: 10px;
        height: 10px;
        color: black;
        font-weight: bold;
    }
    .productB {
        width: 10px;
        height: 10px;
        color: black;
        font-weight: bold;
    }
    .productC {
        width: 10px;
        height: 10px;
        color: black;
        font-weight: bold;
    }

    #autumn stop[offset="1"] {
        stop-color: #603813;
    }`;

const Stripline = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane' >
            <style>{SAMPLE_CSS}</style>
            <svg style={{ height: 0 }}>
                <defs>
                    <linearGradient id="winter" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" />
                        <stop offset="1" />
                    </linearGradient>
                    <linearGradient id="summer" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" />
                        <stop offset="1" />
                    </linearGradient>
                    <linearGradient id="spring" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" />
                        <stop offset="1" />
                    </linearGradient>
                    <linearGradient id="autumn" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" />
                        <stop offset="1" />
                    </linearGradient>
                </defs>
            </svg>
            <div className='control-section row'>              
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, labelFormat: 'E dd/MM', labelRotation: -90, labelIntersectAction: Browser.isDevice ? 'Rotate90' : 'None' }} load={load.bind(this)} primaryYAxis={{ minimum: 0, maximum: 30, interval: 10, title: 'Wind Speed and Gust (km/h)', lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: {width: 0}, majorGridLines: {width: 0}, stripLines: [{ start: 0, end: 5, text: 'Calm', color: 'rgba(68, 170, 213, 0.1)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 } }, { start: 5, end: 8, text: 'Light Air', color: 'rgba(0, 0, 0, 0)', horizontalAlignment: 'Start', visible: true, textStyle: { size: '13px' }, border: { width: 0 } }, { start: 8, end: 11, text: 'Light Breeze', horizontalAlignment: 'Start', visible: true, textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(68, 170, 213, 0.1)' }, { start: 11, end: 18, text: 'Gentle Breeze', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 }}, { start: 18, end: 28, text: 'Moderate Breeze', color: 'rgba(68, 170, 213, 0.1)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 }},  { start: 28, end: 30, text: 'Fresh Breeze', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 }}] }} tooltip={{ enable: true, header: " ", format: "<b>${point.x}</b> <br> ${series.name} : <b>${point.y}</b>", enableMarker: false }} legendSettings={{ visible: true, enableHighlight: true, shapeHeight: 6, shapeWidth: 15 }} width={Browser.isDevice ? "100%" : "75%"} loaded={onChartLoad.bind(this)} title='Wind Speed and Gust (km/h)' titleStyle={ {position: 'Bottom', textAlignment: 'Far'}} subTitle= 'WorldWeatherOnline.com' chartArea={{border: {width: 0}}} >
                    <Inject services={[SplineSeries, DateTimeCategory, Legend, Tooltip, StripLine, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName="x" yName="wind" width={4} type="Spline" legendShape="HorizontalLine" name="Wind Speed (km/h)" />
                        <SeriesDirective dataSource={data1} xName="x" yName="gust" width={4} type="Spline" legendShape="HorizontalLine" name="Wind Gust (km/h)" />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample displays the changes in wind speed and gust with stripline feature.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a strip line for the chart. Use the <code>start</code> and <code>end</code> properties in the <code>chartStripline</code> option to add a strip line to an axis. Additionally, the title for the chart can be positioned anywhere in the chart by using the <code>position</code> property in <code>titleStyle</code>.
                </p>
                <p><code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use strip line, we need to inject <code>StripLine</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the strip line can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/strip-line/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Stripline;