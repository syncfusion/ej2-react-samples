/**
 * Sample for stripline
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StripLineSettingsModel,
    Legend, Category, LineSeries, Tooltip, ILoadedEventArgs, StripLine, ChartTheme, SplineAreaSeries, SplineSeries, Highlight
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { Day: 'Jan', Temperature: 90 },
    { Day: 'Feb', Temperature: 92 },
    { Day: 'Mar', Temperature: 94 },
    { Day: 'Apr', Temperature: 95 },
    { Day: 'May', Temperature: 94 },
    { Day: 'Jun', Temperature: 96 },
    { Day: 'Jul', Temperature: 97 },
    { Day: 'Aug', Temperature: 98 },
    { Day: 'Sep', Temperature: 97 },
    { Day: 'Oct', Temperature: 95 },
    { Day: 'Nov', Temperature: 90 },
    { Day: 'Dec', Temperature: 95 },];
export let data1: any[] = [
    { Day: "Jan", Temperature: 85 },
    { Day: "Feb", Temperature: 86 },
    { Day: "Mar", Temperature: 87 },
    { Day: "Apr", Temperature: 88 },
    { Day: "May", Temperature: 87 },
    { Day: "Jun", Temperature: 90 },
    { Day: "Jul", Temperature: 91 },
    { Day: "Aug", Temperature: 90 },
    { Day: "Sep", Temperature: 93 },
    { Day: "Oct", Temperature: 90 },
    { Day: "Nov", Temperature: 85 },
    { Day: "Dec", Temperature: 90 },];
export let data2: any[] = [
    { Day: "Jan", Temperature: 80 },
    { Day: "Feb", Temperature: 81 },
    { Day: "Mar", Temperature: 82 },
    { Day: "Apr", Temperature: 83 },
    { Day: "May", Temperature: 84 },
    { Day: "Jun", Temperature: 83 },
    { Day: "Jul", Temperature: 82 },
    { Day: "Aug", Temperature: 81 },
    { Day: "Sep", Temperature: 85 },
    { Day: "Oct", Temperature: 84 },
    { Day: "Nov", Temperature: 83 },
    { Day: "Dec", Temperature: 82 },];
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

function Stripline() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let dropElement: DropDownListComponent;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Vertical' },
        { value: 'Horizontal' },
        { value: 'Segment' }
    ];
    let loaded: EmitType<ILoadedEventArgs>;
    return (
        <div className='control-pane' >
            <style>
                {SAMPLE_CSS}
            </style>

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
                
                    <ChartComponent id='charts' style={{ textAlign: "center" }} ref={chart => chartInstance = chart}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                        }}
                        load={load.bind(this)}
                        primaryYAxis={{
                            minimum: 80,
                            maximum: 100,
                            interval: 5,
                            lineStyle: { color: '#808080' },
                            labelFormat: '{value}%',
                            rangePadding: 'None',
                            majorTickLines: {width: 0},
                            stripLines: [
                              {
                                start: 95,
                                end: 100,
                                text: 'Good',
                                color: '#ff512f',
                                visible: true,
                                horizontalAlignment: 'Middle',
                                textStyle: {
                                  size: '16px',
                                  color: '#ffffff',
                                  fontWeight: '500',
                                },
                                border: { width: 0 },
                              },
                              {
                                start: 85,
                                end: 95,
                                text: 'Ok',
                                color: '#fc902a',
                                horizontalAlignment: 'Middle',
                                visible: true,
                                textStyle: {
                                  size: '16px',
                                  color: '#ffffff',
                                  fontWeight: '500',
                                },
                                border: { width: 0 },
                              },
                              {
                                start: 80,
                                end: 85,
                                text: 'Average',
                                horizontalAlignment: 'Middle',
                                visible: true,
                                textStyle: {
                                  size: '16px',
                                  color: '#ffffff',
                                  fontWeight: '500',
                                },
                                border: { width: 0 },
                                color: '#f9d423',
                              },
                            ],
                        }}
                        tooltip={{
                            enable: true,
                            header: " ",
                            format: "<b>${point.x}</b> <br> Ratings : <b>${point.y}</b>"
                        }}
                        legendSettings={{ visible: true, enableHighlight: true }}
                        width={Browser.isDevice ? "100%" : "75%"}
                        loaded={onChartLoad.bind(this)}
                        title='Customer Satisfaction Rating'>
                        <Inject services={[SplineSeries, Category, Legend, Tooltip, StripLine, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data}
                                xName="Day"
                                yName="Temperature"
                                width={2}
                              
                                type="Spline"
                                name="Product A"
                                marker={{
                                    visible: true,
                                    width: 7,
                                    height: 7,
                                }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1}
                                xName="Day"
                                yName="Temperature"
                                width={2}
                              
                                type="Spline"
                                name="Product B"
                                marker={{
                                    visible: true,
                                    width: 7,
                                    height: 7,
                                }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2}
                                xName="Day"
                                yName="Temperature"
                                width={2}
                               
                                type="Spline"
                                name="Product C"
                                marker={{
                                    visible: true,
                                    width: 7,
                                    height: 7,
                                }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
            
             
            </div>
            <div id="action-description">
                <p>
                This sample highlights a certain temperature range recorded over a year using the strip line feature.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure a strip line for the chart. Use the <code>Start</code> and <code>End</code> properties in the <code>ChartStripline</code> option to add a strip line to an axis. You can add more than one strip line to the axis.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use strip line feature, we need to inject
                    <code>StripLine</code> module using
                    <code>Chart.Inject(StripLine)</code> method.

                </p>
                <p>
                    More information on the strip line can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/strip-line/">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default Stripline;