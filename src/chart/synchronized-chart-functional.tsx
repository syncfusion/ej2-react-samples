/**
 * Sample for Synchronized Chart
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartTheme, Chart, AreaSeries, LineSeries, DateTime, DataLabel, Tooltip, Highlight, Crosshair, ILoadedEventArgs, Zoom, ZoomSettings, IZoomCompleteEventArgs, Legend, Selection, ISelectionCompleteEventArgs, IMouseEventArgs, ITooltipRenderEventArgs, ILegendClickEventArgs, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { synchronizedData } from './financial-data';
import { Browser } from '@syncfusion/ej2/base';
import { loadChartTheme } from './theme-color';
import { keyBootstrap4Colors, pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluent2Colors, pointFluent2DarkColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwind3Colors, pointTailwind3DarkColors, pointTailwindColors, pointTailwindDarkColors } from './theme-color';
let SAMPLE_CSS = `
#control-container {
    padding: 1px !important;
}

.row {
    display: flex;
    margin: 0px;
}

.col {
    width: 50%;
    margin: 10px;
    height: 270px;
}`;
/**
 * Synchronized Chart Sample
 */


let SynchronizedChart = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let chart1: ChartComponent;
    let chart2: ChartComponent;
    let chart3: ChartComponent;
    let chart4: ChartComponent;

    let charts: ChartComponent[] = [];
    useEffect(() => {
        charts = [chart1, chart2, chart3, chart4];
    }, []);

    let zoomFactor: number = 0;
    let zoomPosition: number = 0;
    let isZoom: boolean = false;
    let selectedData: any[] = [];
    let count: number = 0;
    let legendCount: number = 0;
    let load = (args: ILoadedEventArgs): void => {
        args.chart.primaryXAxis.labelRotation = Browser.isDevice ? -45 : 0;
        loadChartTheme(args);
        let themeColor: string[] = [];
        if (args.chart.theme === 'MaterialDark') {
            themeColor = pointMaterialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            themeColor = pointMaterialColors;
        }
        else if (args.chart.theme === "Fabric") {
            themeColor = pointFabricColors;
        }
        else if (args.chart.theme === "FabricDark") {
            themeColor = pointFabricColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            themeColor = pointBootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            themeColor = pointBootstrap5Colors;
        }
        else if (args.chart.theme === "Bootstrap4") {
            themeColor = keyBootstrap4Colors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            themeColor = pointTailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            themeColor = pointTailwindColors;
        }
        else if (args.chart.theme === "HighContrast") {
            themeColor = pointHighContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            themeColor = pointFluentDarkColors;
        }
        else if (args.chart.theme === 'Bootstrap') {
            themeColor = pointBootstrapColors;
        }
        else if (args.chart.theme === 'BootstrapDark') {
            themeColor = pointBootstrapColors;
        }
        else if (args.chart.theme === 'Material3') {
            themeColor = pointMaterial3Colors;
        }
        else if (args.chart.theme === 'Material3Dark') {
            themeColor = pointMaterial3DarkColors;
        }
        else if (args.chart.theme === 'Fluent2') {
            themeColor = pointFluent2Colors;
        }
        else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
            themeColor = pointFluent2DarkColors;
        } else if (args.chart.theme === 'Tailwind3Dark') {
            themeColor = pointTailwind3DarkColors;
        }
        else if (args.chart.theme === 'Tailwind3') {
            themeColor = pointTailwind3Colors;
        }
        else {
            themeColor = pointFluentColors;
        }
        // check the container
        if (args.chart.element.id === 'container1') {
            args.chart.series[0].fill = themeColor[0];
        }
        else if (args.chart.element.id === 'container2') {
            args.chart.series[0].fill = themeColor[1];
        }
        else if (args.chart.element.id === 'container3') {
            args.chart.series[0].fill = themeColor[2];
        }
        else if (args.chart.element.id === 'container4') {
            args.chart.series[0].fill = themeColor[3];
        }
    };

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('container1');
        chart.setAttribute('title', '');
    };
    const onChartLoad2 = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('container2');
        chart.setAttribute('title', '');
    };
    const onChartLoad3 = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('container3');
        chart.setAttribute('title', '');
    };
    const onChartLoad4 = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('container4');
        chart.setAttribute('title', '');
    };

    let zoomComplete = (args: IZoomCompleteEventArgs): void => {
        if (args.axis.name === 'primaryXAxis') {
            zoomFactor = args.currentZoomFactor;
            zoomPosition = args.currentZoomPosition;
            zoomCompleteFunction(args);
        }
    };

    let zoomCompleteFunction = (args): void => {
        for (let i: number = 0; i < charts.length; i++) {
            if (args.axis.series[0].chart.element.id !== charts[i].element.id) {
                charts[i].primaryXAxis.zoomFactor = zoomFactor;
                charts[i].primaryXAxis.zoomPosition = zoomPosition;
                charts[i].zoomModule.isZoomed = args.axis.series[0].chart.zoomModule.isZoomed;
                charts[i].zoomModule.isPanning = args.axis.series[0].chart.zoomModule.isPanning;
            }
        }
    }

    let chartMouseLeave = (args: IMouseEventArgs): void => {
        chart2.hideCrosshair();
        chart3.hideCrosshair();
        chart4.hideCrosshair();
        chart2.hideTooltip();
        chart3.hideTooltip();
        chart4.hideTooltip();
    };
    let chartMouseMove = (args: IMouseEventArgs): void => {
        if ((!Browser.isDevice && !chart1.isTouch  && !chart1.isChartDrag) || chart1.startMove) {
            chart2.startMove = chart3.startMove = chart4.startMove = chart1.startMove;
            chart2.showTooltip(args.x, args.y);
            chart3.showTooltip(args.x, args.y);
            chart4.showTooltip(args.x, args.y);
            chart2.showCrosshair(args.x, args.y);
            chart3.showCrosshair(args.x, args.y);
            chart4.showCrosshair(args.x, args.y);
        }
    };

    let chartobjMouseLeave = (args: IMouseEventArgs): void => {
        chart1.hideCrosshair();
        chart3.hideCrosshair();
        chart4.hideCrosshair();
        chart1.hideTooltip();
        chart3.hideTooltip();
        chart4.hideTooltip();
    };
    let chartobjMouseMove = (args: IMouseEventArgs): void => {
        if ((!Browser.isDevice && !chart2.isTouch && !chart2.isChartDrag) || chart2.startMove) {
            chart1.startMove = chart3.startMove = chart4.startMove = chart2.startMove;
            chart1.showTooltip(args.x, args.y);
            chart3.showTooltip(args.x, args.y);
            chart4.showTooltip(args.x, args.y);
            chart1.showCrosshair(args.x, args.y);
            chart3.showCrosshair(args.x, args.y);
            chart4.showCrosshair(args.x, args.y);
        }
    };

    let chart3MouseLeave = (args: IMouseEventArgs): void => {
        chart2.hideCrosshair();
        chart1.hideCrosshair();
        chart4.hideCrosshair();
        chart2.hideTooltip();
        chart1.hideTooltip();
        chart4.hideTooltip();
    };
    let chart3MouseMove = (args: IMouseEventArgs): void => {
        if ((!Browser.isDevice && !chart3.isTouch && !chart3.isChartDrag) || chart3.startMove) {
            chart1.startMove = chart2.startMove = chart4.startMove = chart3.startMove;
            chart1.showTooltip(args.x, args.y);
            chart2.showTooltip(args.x, args.y);
            chart4.showTooltip(args.x, args.y);
            chart1.showCrosshair(args.x, args.y);
            chart2.showCrosshair(args.x, args.y);
            chart4.showCrosshair(args.x, args.y);
        }
    };

    let chart4MouseLeave = (args: IMouseEventArgs): void => {
        chart2.hideCrosshair();
        chart3.hideCrosshair();
        chart1.hideCrosshair();
        chart2.hideTooltip();
        chart3.hideTooltip();
        chart1.hideTooltip();
    };
    let chart4MouseMove = (args: IMouseEventArgs): void => {
        if ((!Browser.isDevice && !chart4.isTouch && !chart4.isChartDrag) || chart4.startMove) {
            chart1.startMove = chart2.startMove = chart3.startMove = chart4.startMove;
            chart1.showTooltip(args.x, args.y);
            chart2.showTooltip(args.x, args.y);
            chart3.showTooltip(args.x, args.y);
            chart1.showCrosshair(args.x, args.y);
            chart2.showCrosshair(args.x, args.y);
            chart3.showCrosshair(args.x, args.y);
        }
    };

    let chartMouseUp = (args: IMouseEventArgs): void => {
        if (Browser.isDevice && chart1.startMove) {
            chart2.hideCrosshair();
            chart3.hideCrosshair();
            chart4.hideCrosshair();
            chart2.hideTooltip();
            chart3.hideTooltip();
            chart4.hideTooltip();
        }
    }
    let chart2MouseUp = (args: IMouseEventArgs): void => {
        if (Browser.isDevice && chart2.startMove) {
            chart1.hideCrosshair();
            chart3.hideCrosshair();
            chart4.hideCrosshair();
            chart1.hideTooltip();
            chart3.hideTooltip();
            chart4.hideTooltip();
        }
    }
    let chart3MouseUp = (args: IMouseEventArgs): void => {
        if (Browser.isDevice && chart3.startMove) {
            chart2.hideCrosshair();
            chart1.hideCrosshair();
            chart4.hideCrosshair();
            chart2.hideTooltip();
            chart1.hideTooltip();
            chart4.hideTooltip();
        }
    }
    let chart4MouseUp = (args: IMouseEventArgs): void => {
        if (Browser.isDevice && chart4.startMove) {
            chart2.hideCrosshair();
            chart3.hideCrosshair();
            chart1.hideCrosshair();
            chart2.hideTooltip();
            chart3.hideTooltip();
            chart1.hideTooltip();
        }
    }

    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
            <div className="row" style={{ margin: 0 }}>
                    <div className="col">
                        <ChartComponent
                            id="container1"
                            ref={chart => chart1 = chart}
                            style={{ textAlign: 'center' }}
                            primaryXAxis={{
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: Browser.isDevice ? -45 : 0,
                                interval: Browser.isDevice ? 2 : 1
                            }}
                            primaryYAxis={{
                                labelFormat: 'n2',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 0.86,
                                maximum: 0.96,
                                interval: 0.025
                            }}
                            chartArea={{ border: { width: 0 } }}
                            zoomSettings={{
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: false,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }}
                            zoomComplete={zoomComplete.bind(this)}
                            chartMouseLeave={chartMouseLeave.bind(this)}
                            chartMouseMove={chartMouseMove.bind(this)}
                            chartMouseUp={chartMouseUp.bind(this)}
                            load={load.bind(this)}
                            loaded={onChartLoad.bind(this)}
                            titleStyle={{ textAlignment: 'Near' }}
                            tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header:'', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false, enableHighlight: true }}
                            crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                            title="US to Euro">
                            <Inject services={[AreaSeries, LineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective type="Line" dataSource={synchronizedData} xName="USD" yName="EUR" width={2} emptyPointSettings={{ mode: 'Drop' }}></SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className="col">
                        <ChartComponent
                            id="container2"
                            ref={chart => chart2 = chart}
                            style={{ textAlign: 'center' }}
                            primaryXAxis={{
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: Browser.isDevice ? -45 : 0,
                                interval: Browser.isDevice ? 2 : 1
                            }}
                            primaryYAxis={{
                                labelFormat: '{value}',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 120,
                                maximum: 152,
                                interval: 8,
                                labelPadding: 8
                            }}
                            chartArea={{ border: { width: 0 } }}
                            zoomSettings={{
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: false,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }}
                            zoomComplete={zoomComplete.bind(this)}
                            chartMouseLeave={chartobjMouseLeave.bind(this)}
                            chartMouseMove={chartobjMouseMove.bind(this)}
                            chartMouseUp={chart2MouseUp.bind(this)}
                            load={load.bind(this)}
                            loaded={onChartLoad2.bind(this)}
                            titleStyle={{ textAlignment: 'Near' }}
                            tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header:'', format: '<b>¥${point.y}</b><br>${point.x} 2023', enableMarker: false, enableHighlight: true }}
                            crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                            title="US to Yen">
                            <Inject services={[AreaSeries, LineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective type="Line" dataSource={synchronizedData} xName="USD" yName="JPY" width={2}></SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="col">
                        <ChartComponent
                            id="container3"
                            ref={chart => chart3 = chart}
                            style={{ textAlign: 'center' }}
                            primaryXAxis={{
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: Browser.isDevice ? -45 : 0,
                                interval: Browser.isDevice ? 2 : 1
                            }}
                            primaryYAxis={{
                                labelFormat: 'n2',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 1.30,
                                maximum: 1.37,
                                interval: 0.0175
                            }}
                            chartArea={{ border: { width: 0 } }}
                            zoomSettings={{
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: false,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }}
                            zoomComplete={zoomComplete.bind(this)}
                            chartMouseLeave={chart3MouseLeave.bind(this)}
                            chartMouseMove={chart3MouseMove.bind(this)}
                            chartMouseUp={chart3MouseUp.bind(this)}
                            load={load.bind(this)}
                            loaded={onChartLoad3.bind(this)}
                            titleStyle={{ textAlignment: 'Near' }}
                            tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header:'', format: '<b>$${point.y}</b><br>${point.x} 2023', enableMarker: false }}
                            crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                            title="US to SGD">
                            <Inject services={[AreaSeries, LineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective type="Area" dataSource={synchronizedData} xName="USD" yName="SGD" opacity={0.6} width={2} border={{ width: 2 }}></SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className="col">
                        <ChartComponent
                            id="container4"
                            ref={chart => chart4 = chart}
                            style={{ textAlign: 'center' }}
                            primaryXAxis={{
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: Browser.isDevice ? -45 : 0,
                                interval: Browser.isDevice ? 2 : 1
                            }}
                            primaryYAxis={{
                                labelFormat: 'n1',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 79,
                                maximum: 85,
                                interval: 1.5
                            }}
                            chartArea={{ border: { width: 0 } }}
                            zoomSettings={{
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: false,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }}
                            zoomComplete={zoomComplete.bind(this)}
                            chartMouseLeave={chart4MouseLeave.bind(this)}
                            chartMouseMove={chart4MouseMove.bind(this)}
                            chartMouseUp={chart4MouseUp.bind(this)}
                            load={load.bind(this)}
                            loaded={onChartLoad4.bind(this)}
                            titleStyle={{ textAlignment: 'Near' }}
                            tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header:'', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false }}
                            crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                            title="US to INR">
                            <Inject services={[AreaSeries, LineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective type="Area" dataSource={synchronizedData} xName="USD" yName="INR" opacity={0.6} width={2} border={{ width: 2 }}></SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>

            </div>
            <div id="action-description">
                <p>
                    This example visualizes the history of currency exchange rates using synchronized charts.
                </p>
            </div>
            <div id="description">
                <p>
                    This demo showcases the synchronization of multiple charts, with crosshair, tooltip, and zooming functionalities synchronized across the charts. Hover over or zoom in on one chart to observe the corresponding impact on the other charts as well.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use line series and area series, we need to inject <code>LineSeries</code> and <code>AreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the area series can be found in this &nbsp;
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball" aria-label="Navigate to the documentation for Crosshair and Trackball in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default SynchronizedChart;

function componentDidMount() {
    throw new Error('Function not implemented.');
}
