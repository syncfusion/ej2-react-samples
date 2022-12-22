/**
 * Sample for RangeColumn series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StripLineSettingsModel, StripLine,
    ColumnSeries, Category, ILegendClickEventArgs, Zoom, Selection, DataLabel, Tooltip, ILoadedEventArgs, Legend, ChartTheme,
} from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data: any[] = [
    { xValue: "Jan 15", yValue: 10 },
    { xValue: "Jan 31", yValue: 15 },
    { xValue: "Feb 15", yValue: 15 },
    { xValue: "Feb 28", yValue: 20 },
    { xValue: "March 15", yValue: 20 },
    { xValue: "March 31", yValue: 25 },
    { xValue: "March", yValue: null }
];
export let data1: any[] = [
    { xValue: "Apr 15", yValue: 36 },
    { xValue: "Apr 30", yValue: 48 },
    { xValue: "May 15", yValue: 43 },
    { xValue: "May 31", yValue: 59 },
    { xValue: "Jun 15", yValue: 35 },
    { xValue: "Jun 30", yValue: 50 },
    { xValue: "Jun", yValue: null }
];
export let data2: any[] = [
    { xValue: "Jul 15", yValue: 30 },
    { xValue: "Jul 31", yValue: 45 },
    { xValue: "Aug 15", yValue: 30 },
    { xValue: "Aug 31", yValue: 55 },
    { xValue: "Sep 15", yValue: 57 },
    { xValue: "Sep 30", yValue: 60 },
    { xValue: "Sep", yValue: null }
];
export let data3: any[] = [
    { xValue: "Oct 15", yValue: 60 },
    { xValue: "Oct 31", yValue: 70 },
    { xValue: "Nov 15", yValue: 70 },
    { xValue: "Nov 30", yValue: 70 },
    { xValue: "Dec 15", yValue: 90 },
    { xValue: "Dec 31", yValue: 100 }
];
export let FontColor: string = "#353535";
export let seriesIndex: number = 0;
export let Segments: any = [[0, 5], [7, 12], [14, 19], [21, 26]];

let materialColors: string[] = ["#00bdae", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
    "#ea7a57", "#404041", "#00bdae"];
let materialDarkColors: string[] = ["#9ECB08", "#56AEFF", "#C57AFF", "#61EAA9", "#EBBB3E", "#F45C5C", "#8A77FF", "#63C7FF", "#FF84B0",
    "#F7C928"];
let fabricColors: string[] = ["#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e",
    "#997300", "#4472c4", "#70ad47", "#ffc000", "#ed7d31"];
let bootstrapColors: string[] = ["#a16ee5", "#f7ce69", "#55a5c2", "#7ddf1e", "#ff6ea6", "#7953ac", "#b99b4f", "#407c92", "#5ea716",
    "#b91c52"];
let highContrastColors: string[] = ["#79ECE4", "#E98272", "#DFE6B6", "#C6E773", "#BA98FF", "#FA83C3", "#00C27A", "#43ACEF", "#D681EF",
    "#D8BC6E"];
let bootstrap5Colors: string[] = ["#262E0B", "#668E1F", "#AF6E10", "#862C0B", "#1F2D50", "#64680B", "#311508", "#4C4C81", "#0C7DA0",
    "#862C0B"];
let bootstrap5DarkColors: string[] = ["#5ECB9B", "#A860F1", "#EBA844", "#557EF7", "#E9599B", "#BFC529", "#3BC6CF", "#7A68EC", "#74B706",
    "#EA6266"];
let fluentColors: string[] = ["#614570", "#4C6FB1", "#CC6952", "#3F579A", "#4EA09B", "#6E7A89", "#D4515C", "#E6AF5D", "#639751",
    "#9D4D69"];
let fluentDarkColors: string[] = ["#8AB113", "#2A72D5", "#43B786", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266", "#EBA844", "#26BC7A",
    "#BC4870"];
let tailwindColors: string[] = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B",
    "#15803D"];
let tailwindDarkColors: string[] = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6",
    "#10B981"];


const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function KeyboardNavigation() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='keyboard_charts' ref={chart => chartInstance = chart} style={{ textAlign: "center" }}
                        selectionMode='Point'
                        selectionPattern='DiagonalForward'
                        enableSideBySidePlacement={false}
                        enableAnimation={false}
                        legendClick={legendClick.bind(this)}
                        load={load.bind(this)}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 },
                            labelStyle: { size: "0px" },
                            majorTickLines: { width: 0 }
                        }}

                        primaryYAxis={{
                            maximum: 120, title: "Sales in Percentage",
                            labelFormat: "{value}%",
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            stripLines: [
                                { isSegmented: true, start: 33, end: 35.5, visible: true, segmentStart: 0, segmentEnd: 5 },
                                { isSegmented: true, start: 39, end: 39.2, visible: true, text: "Jan - Mar", color: "transparent", segmentStart: 0, segmentEnd: 5 },
                                { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 7, segmentEnd: 12 },
                                { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Apr - Jun", segmentStart: 7, segmentEnd: 12, color: "transparent" },
                                { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 14, segmentEnd: 19 },
                                { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Jul - Sep", segmentStart: 14, segmentEnd: 19, color: "transparent" },
                                { isSegmented: true, start: 104, end: 106.5, visible: true, segmentStart: 21, segmentEnd: 26 },
                                { isSegmented: true, start: 109, end: 109.2, visible: true, text: "Oct - Dec", segmentStart: 21, segmentEnd: 26, color: "transparent" }
                            ]
                        }}
                        zoomSettings={{ enableSelectionZooming: true }}
                        title="Quarterly Sales Chart"
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        tooltip={{
                            enable: true
                        }}>
                        <Inject services={[ColumnSeries, Selection, StripLine, DataLabel, Tooltip, Zoom, Category, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='Quarter 1' xName='xValue' yName='yValue' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} name='Quarter 2' xName='xValue' yName='yValue' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} name='Quarter 3' xName='xValue' yName='yValue' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} name='Quarter 4' xName='xValue' yName='yValue' type='Column'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        Keyboard shortcuts can be used to interact with chart functionality. In the example below,
                        various key combinations can be used to interact with the chart.
                    </p>
                </div>
                <div id="description">
                    <i>The key combinations listed below can be used in the chart to initiate various actions.</i>
                    <ul>
                        <li>
                            <b>FOCUS ELEMENTS</b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Alt</kbd> + <kbd>J</kbd></span>
                                    <span> - Moves the focus to the chart element.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Tab</kbd></span>
                                    <span> - Moves the focus to the next element in the chart.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                    <span> - Moves the focus to the previous element in the chart.</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>SERIES</b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Down arrow</kbd></span>
                                    <span> - Moves the focus to the data point left side from the selected point.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Up arrow</kbd></span>
                                    <span> - Moves the focus to the data point right side from the selected point.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Left arrow</kbd></span>
                                    <span> - Moves the focus to the next series in our chart.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Right arrow</kbd></span>
                                    <span> - Moves the focus to the previous series in our chart.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>ESC</kbd></span>
                                    <span> - Cancel the tooltip for the data point.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Enter</kbd>/<kbd>Space</kbd></span>
                                    <span> - Selects the data point in the series.</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>Legend </b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Down</kbd>/<kbd>Left arrow</kbd></span>
                                    <span> - Moves the focus to the legend left side from the selected legend.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Up</kbd>/<kbd>Right arrow</kbd></span>
                                    <span> - Moves the focus to the legend right side from the selected legend.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Enter</kbd>/<kbd>Space</kbd></span>
                                    <span> - Toggles the visibility of the corresponding series.</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>ZOOMING AND PANNING</b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Ctrl</kbd> + <kbd>+</kbd></span>
                                    <span> - Zoom in the chart.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Ctrl</kbd> + <kbd>-</kbd></span>
                                    <span> - Zoom out the chart.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Down</kbd>/<kbd>Up arrow</kbd></span>
                                    <span> - Pans the chart vertically.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Left</kbd>/<kbd>Right arrow</kbd></span>
                                    <span> - Pans the chart horizontally.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>R</kbd></span>
                                    <span> - Reset the zoomed chart.</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>PRINT</b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Ctrl</kbd> + <kbd>P</kbd></span>
                                    <span> - Prints the chart.</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
    function legendClick(args: ILegendClickEventArgs): void {
        seriesIndex = 0;
        getStriplineValues(args.series.name);
    }
    function getStriplineValues(legendClickedName): void {
        let chart: any = chartInstance;
        for (var i = 0; i < chart.series.length; i++) {
            var name = chart.series[i].name;
            var visible = name === legendClickedName ? !chart.series[i].visible : chart.series[i].visible;
            if (seriesIndex > 3) {
                seriesIndex = 0;
            }
            if (name == "Quarter 1") {
                chart.primaryYAxis.stripLines[0].visible = chart.primaryYAxis.stripLines[1].visible = visible;
                if (chart.primaryYAxis.stripLines[0].visible) {
                    chart.primaryYAxis.stripLines[0].segmentStart = chart.primaryYAxis.stripLines[1].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[0].segmentEnd = chart.primaryYAxis.stripLines[1].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 2") {
                chart.primaryYAxis.stripLines[2].visible = chart.primaryYAxis.stripLines[3].visible = visible;
                if (chart.primaryYAxis.stripLines[2].visible) {
                    chart.primaryYAxis.stripLines[2].segmentStart = chart.primaryYAxis.stripLines[3].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[2].segmentEnd = chart.primaryYAxis.stripLines[3].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 3") {
                chart.primaryYAxis.stripLines[4].visible = chart.primaryYAxis.stripLines[5].visible = visible;
                if (chart.primaryYAxis.stripLines[4].visible) {
                    chart.primaryYAxis.stripLines[4].segmentStart = chart.primaryYAxis.stripLines[5].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[4].segmentEnd = chart.primaryYAxis.stripLines[5].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else {
                chart.primaryYAxis.stripLines[6].visible = chart.primaryYAxis.stripLines[7].visible = visible;
                if (chart.primaryYAxis.stripLines[6].visible) {
                    chart.primaryYAxis.stripLines[6].segmentStart = chart.primaryYAxis.stripLines[7].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[6].segmentEnd = chart.primaryYAxis.stripLines[7].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
        }
        chart.refresh();
    };

    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
        FontColor = args.chart.theme.indexOf("Dark") > -1 || args.chart.theme.indexOf("Highcontrast") > -1 ? "#F3F2F1" : "#353535";
        let FillColors: any;
        if (args.chart.theme === 'MaterialDark') {
            FillColors = materialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            FillColors = materialColors;
        }
        else if (args.chart.theme.indexOf("fabric") > -1) {
            FillColors = fabricColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            FillColors = bootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            FillColors = bootstrap5Colors;
        }
        else if (args.chart.theme.indexOf("bootstrap") > -1) {
            FillColors = bootstrapColors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            FillColors = tailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            FillColors = tailwindColors;
        }
        else if (args.chart.theme.indexOf("highcontrast") > -1) {
            FillColors = highContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            FillColors = fluentDarkColors;
        }
        else {
            FillColors = fluentColors;
        }
        args.chart.primaryYAxis.stripLines[0].color = FillColors[0 % 10];
        args.chart.primaryYAxis.stripLines[2].color = FillColors[1 % 10];
        args.chart.primaryYAxis.stripLines[4].color = FillColors[2 % 10];
        args.chart.primaryYAxis.stripLines[6].color = FillColors[3 % 10];
        args.chart.primaryYAxis.stripLines[1].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[3].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[5].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[7].textStyle.color = FontColor;
    };
}
export default KeyboardNavigation;