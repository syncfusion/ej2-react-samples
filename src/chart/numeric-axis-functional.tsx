/**
 * Sample for numeric axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    ColumnSeries, IAxisLabelRenderEventArgs, DataLabel,
    ILoadedEventArgs, Tooltip, Legend, ChartTheme, Highlight
} from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 16, y: 2 }, { x: 17, y: 14 },
    { x: 18, y: 7 }, { x: 19, y: 7 },
    { x: 20, y: 10 }
];
export let data2: any[] = [
    { x: 16, y: 7 }, { x: 17, y: 7 },
    { x: 18, y: 11 }, { x: 19, y: 8 },
    { x: 20, y: 24 }
];

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function Numeric() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }}
                    primaryXAxis={{
                        minimum: 15,
                        maximum: 21,
                        interval: 1,
                        majorGridLines: { width: 0 }
                    }}
                    load={load.bind(this)}
                    primaryYAxis={{
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    }}
                    legendSettings={{ visible: true, enableHighlight: true }}
                    width={Browser.isDevice ? '100%' : '75%'}
                    chartArea={{ border: { width: 0 } }}
                    title='England vs West Indies' loaded={onChartLoad.bind(this)}
                    tooltip={{ enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>' }}>
                    <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Highlight ]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' fill='#1e90ff' marker={{
                            dataLabel: {
                                visible: true,
                                position: 'Top',
                                font: {
                                    fontWeight: '600'
                                }
                            }
                        }} name='England' type='Column' width={2} columnSpacing= {0.1}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={data2} xName='x' yName='y' fill='#b22222' marker={{
                            dataLabel: {
                                visible: true,
                                position: 'Top',
                                font: {
                                    fontWeight: '600'
                                }
                            }
                        }} name='West Indies' type='Column' width={2} columnSpacing= {0.1}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                    <a href="http://www.espncricinfo.com/icc-world-twenty20-2016/engine/current/match/951373.html" target="_blank">www.espncricinfo.com</a>
                </div>
            </div>
            <div id="action-description">
                <p>
                This sample shows the numeric axis in a chart with England and West Indies cricket match data.
                </p>
            </div>
            <div id="description">
                <p>
                You can use a numeric axis to represent numeric value data in a chart. To render a numeric axis, set the <code>ValueType</code> in axis to <b>Double</b>.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p>
                    More information on the Numeric axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/numeric-axis/">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].fill = '#57BCFF';
            args.chart.series[1].fill = '#E58184';
        }
    };
}
export default Numeric;