/**
 * Sample for Synchronized Chart
 */
import * as React from 'react';
import {
    ChartTheme, Chart, AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DateTime, DataLabel, Tooltip, Highlight, Crosshair,
    ILoadedEventArgs, Zoom, ZoomSettings, IZoomCompleteEventArgs, Legend, Selection, ISelectionCompleteEventArgs, IMouseEventArgs, ITooltipRenderEventArgs, ILegendClickEventArgs,
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { synchronizedData } from './financial-data';
import { Browser } from '@syncfusion/ej2/base';

const SAMPLE_CSS = `
#control-container {
    padding: 1px !important;
}

.row {
    display: flex;
}

.col {
    width: 50%;
    margin: 10px;
    height: 270px;
}`;
/**
 * Synchronized Chart Sample
 */


export class SynchronizedChart extends SampleBase<{}, {}>{

    public chart1: ChartComponent;
    public chart2: ChartComponent;
    public chart3: ChartComponent;
    public chart4: ChartComponent;

    public charts: ChartComponent[] = [];
    componentDidMount() {
        this.charts = [this.chart1, this.chart2, this.chart3, this.chart4];
    }
    public zoomFactor: number = 0;
    public zoomPosition: number = 0;
    public isZoom: boolean = false;
    public selectedData: any[] = [];
    public count: number = 0;
    public legendCount: number = 0;

    render() {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">
                    <div className="row">
                        <div className="col">
                            <ChartComponent
                                id="container1"
                                ref={chart => this.chart1 = chart}
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
                                    enableDeferredZooming: true,
                                    enablePan: true,
                                    mode: 'X',
                                    toolbarItems: ['Pan', 'Reset']
                                }}
                                zoomComplete={this.zoomComplete.bind(this)}
                                chartMouseLeave={this.chartMouseLeave.bind(this)}
                                chartMouseMove={this.chartMouseMove.bind(this)}
                                chartMouseUp={this.chartMouseUp.bind(this)}
                                load={this.load.bind(this)}
                                titleStyle={{ textAlignment: 'Near' }}
                                tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false }}
                                crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                                title="US to Euro">
                                <Inject services={[AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective type="Line" dataSource={synchronizedData} xName="USD" yName="EUR" width={2} emptyPointSettings={{ mode: 'Drop' }}></SeriesDirective>
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </div>
                        <div className="col">
                            <ChartComponent
                                id="container2"
                                ref={chart => this.chart2 = chart}
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
                                    interval: 8
                                }}
                                chartArea={{ border: { width: 0 } }}
                                zoomSettings={{
                                    enableMouseWheelZooming: true,
                                    enablePinchZooming: true,
                                    enableScrollbar: false,
                                    enableDeferredZooming: true,
                                    enablePan: true,
                                    mode: 'X',
                                    toolbarItems: ['Pan', 'Reset']
                                }}
                                zoomComplete={this.zoomComplete.bind(this)}
                                chartMouseLeave={this.chartobjMouseLeave.bind(this)}
                                chartMouseMove={this.chartobjMouseMove.bind(this)}
                                chartMouseUp={this.chartobjMouseUp.bind(this)}
                                load={this.load.bind(this)}
                                titleStyle={{ textAlignment: 'Near' }}
                                tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>¥${point.y}</b><br>${point.x} 2023', enableMarker: false }}
                                crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                                title="US to Yen">
                                <Inject services={[AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective type="Spline" dataSource={synchronizedData} xName="USD" yName="JPY" width={2}></SeriesDirective>
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ChartComponent
                                id="container3"
                                ref={chart => this.chart3 = chart}
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
                                    enableDeferredZooming: true,
                                    enablePan: true,
                                    mode: 'X',
                                    toolbarItems: ['Pan', 'Reset']
                                }}
                                zoomComplete={this.zoomComplete.bind(this)}
                                chartMouseLeave={this.chart3MouseLeave.bind(this)}
                                chartMouseMove={this.chart3MouseMove.bind(this)}
                                chartMouseUp={this.chart3MouseUp.bind(this)}
                                load={this.load.bind(this)}
                                titleStyle={{ textAlignment: 'Near' }}
                                tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>$${point.y}</b><br>${point.x} 2023', enableMarker: false }}
                                crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                                title="US to SGD">
                                <Inject services={[AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective type="Area" dataSource={synchronizedData} xName="USD" yName="SGD" opacity={0.6} width={2} border={{ width: 2 }}></SeriesDirective>
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </div>
                        <div className="col">
                            <ChartComponent
                                id="container4"
                                ref={chart => this.chart4 = chart}
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
                                    enableDeferredZooming: true,
                                    enablePan: true,
                                    mode: 'X',
                                    toolbarItems: ['Pan', 'Reset']
                                }}
                                zoomComplete={this.zoomComplete.bind(this)}
                                chartMouseLeave={this.chart4MouseLeave.bind(this)}
                                chartMouseMove={this.chart4MouseMove.bind(this)}
                                chartMouseUp={this.chart4MouseUp.bind(this)}
                                load={this.load.bind(this)}
                                titleStyle={{ textAlignment: 'Near' }}
                                tooltip={{ enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false }}
                                crosshair={{ enable: true, lineType: 'Vertical', dashArray: '2,2' }}
                                title="US to INR">
                                <Inject services={[AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective type="SplineArea" dataSource={synchronizedData} xName="USD" yName="INR" opacity={0.6} width={2} border={{ width: 2 }}></SeriesDirective>
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
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use line series, spline series, area series and splinearea series, we need to inject <code>LineSeries</code>, <code>SplineSeries</code>, <code>AreaSeries</code> and <code>SplineAreaSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the area series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball" aria-label="Navigate to the documentation for Crosshair and Trackball in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    }

    public zoomComplete(args: IZoomCompleteEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            this.zoomFactor = args.currentZoomFactor;
            this.zoomPosition = args.currentZoomPosition;
            this.zoomCompleteFunction(args);
        }
    };

    public zoomCompleteFunction(args): void {
        for (let i: number = 0; i < this.charts.length; i++) {
            if (args.axis.series[0].chart.element.id !== this.charts[i].element.id) {
                this.charts[i].primaryXAxis.zoomFactor = this.zoomFactor;
                this.charts[i].primaryXAxis.zoomPosition = this.zoomPosition;
                this.charts[i].zoomModule.isZoomed = args.axis.series[0].chart.zoomModule.isZoomed;
                this.charts[i].zoomModule.isPanning = args.axis.series[0].chart.zoomModule.isPanning;
            }
        }
    }

    public chartMouseLeave(args: IMouseEventArgs): void {
        this.chart2.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart2.hideTooltip();
        this.chart3.hideTooltip();
        this.chart4.hideTooltip();
    };
    public chartMouseMove(args: IMouseEventArgs): void {
        if (!Browser.isDevice || this.chart1.startMove) {
            this.chart2.startMove = this.chart3.startMove = this.chart4.startMove = this.chart1.startMove;
            this.chart2.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart2.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    public chartMouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart1.startMove) {
            this.chart2.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart2.hideTooltip();
            this.chart3.hideTooltip();
            this.chart4.hideTooltip();
        }
    };

    public chartobjMouseLeave(args: IMouseEventArgs): void {
        this.chart1.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart1.hideTooltip();
        this.chart3.hideTooltip();
        this.chart4.hideTooltip();
    };
    public chartobjMouseMove(args: IMouseEventArgs): void {
        if (!Browser.isDevice || this.chart2.startMove) {
            this.chart1.startMove = this.chart3.startMove = this.chart4.startMove = this.chart2.startMove;
            this.chart1.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart1.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    public chartobjMouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart2.startMove) {
            this.chart1.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart1.hideTooltip();
            this.chart3.hideTooltip();
            this.chart4.hideTooltip();
        }
    };

    public chart3MouseLeave(args: IMouseEventArgs): void {
        this.chart2.hideCrosshair();
        this.chart1.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart2.hideTooltip();
        this.chart1.hideTooltip();
        this.chart4.hideTooltip();
    };
    public chart3MouseMove(args: IMouseEventArgs): void {
        if (!Browser.isDevice || this.chart3.startMove) {
            this.chart1.startMove = this.chart2.startMove = this.chart4.startMove = this.chart3.startMove;
            this.chart2.showTooltip(args.x, args.y);
            this.chart1.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart2.showCrosshair(args.x, args.y);
            this.chart1.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    public chart3MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart3.startMove) {
            this.chart2.hideCrosshair();
            this.chart1.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart2.hideTooltip();
            this.chart1.hideTooltip();
            this.chart4.hideTooltip();
        }
    };

    public chart4MouseLeave(args: IMouseEventArgs): void {
        this.chart2.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart1.hideCrosshair();
        this.chart2.hideTooltip();
        this.chart3.hideTooltip();
        this.chart1.hideTooltip();
    };
    public chart4MouseMove(args: IMouseEventArgs): void {
        if (!Browser.isDevice || this.chart4.startMove) {
            this.chart1.startMove = this.chart2.startMove = this.chart3.startMove = this.chart4.startMove;
            this.chart2.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart1.showTooltip(args.x, args.y);
            this.chart2.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart1.showCrosshair(args.x, args.y);
        }
    };
    public chart4MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart4.startMove) {
            this.chart2.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart1.hideCrosshair();
            this.chart2.hideTooltip();
            this.chart3.hideTooltip();
            this.chart1.hideTooltip();
        }
    };
    
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        let themeColor: string[] = [];
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590'];
        let materialDarkColors: string[] = ['#9ECB08', '#56AEFF', '#C57AFF', '#61EAA9'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e'];
        let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773'];
        let bootstrap4Colors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e'];
        let bootstrap5Colors: string[] = ['#6355C7', '#FFB400', '#2196F5', '#F7523F'];
        let bootstrap5DarkColors: string[] = ['#8F80F4', '#FFD46D', '#6CBDFF', '#FF7F71'];
        let fluentColors: string[] = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF'];
        let tailwindColors: string[] = ['#5A61F6', '#65A30D', '#334155', '#14B8A6'];
        let tailwindDarkColors: string[] = ['#8B5CF6', '#22D3EE', '#F87171', '#4ADE80'];
        let fabricdarkColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47'];
        let material3Colors: string[] = ['#6355C7', '#00AEE0', '#FFB400', '#F7523F'];
        let material3DarkColors: string[] = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58'];
        // check the theme
        if (args.chart.theme === 'MaterialDark') {
            themeColor = materialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            themeColor = materialColors;
        }
        else if (args.chart.theme === "Fabric") {
            themeColor = fabricColors;
        }
        else if (args.chart.theme === "FabricDark") {
            themeColor = fabricdarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            themeColor = bootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            themeColor = bootstrap5Colors;
        }
        else if (args.chart.theme === "Bootstrap4") {
            themeColor = bootstrap4Colors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            themeColor = tailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            themeColor = tailwindColors;
        }
        else if (args.chart.theme === "HighContrast") {
            themeColor = highContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            themeColor = fluentColors;
        }
        else if (args.chart.theme === 'Bootstrap') {
            themeColor = bootstrapColors;
        }
        else if (args.chart.theme === 'BootstrapDark') {
            themeColor = bootstrapColors;
        }
        else if (args.chart.theme === 'Material3') {
            themeColor = material3Colors;
        }
        else if (args.chart.theme === 'Material3Dark') {
            themeColor = material3DarkColors;
        }
        else {
            themeColor = fluentColors;
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

}