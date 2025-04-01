/**
 * Sample for SplineAnimation series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, IPointRenderEventArgs, SeriesCollectionDirective, SplineAreaSeries, BubbleSeries, StepLineSeries, ScatterSeries, BarSeries, RangeColumnSeries, ColumnSeries, SeriesDirective, Inject, LineSeries, SplineSeries, Category, ILoadedEventArgs, DataLabel, Highlight, sort } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { TabComponent, TabItemDirective, TabItemsDirective, SelectingEventArgs } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, bubblePointRender } from './theme-color';

export let splinedata: Object[] = [
    { x: '1', y: 30 },
    { x: '2', y: 10 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 5 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
];
export let linedata: Object[] = [
    { x: '1', y: 10 },
    { x: '2', y: 30 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
];
export let columndata: Object[] = [
    { x: '1', y: 90 },
    { x: '2', y: 10 },
    { x: '3', y: 50 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 70 },
    { x: '7', y: 9 }
];
export let areadata: Object[] = [
    { x: '1', y: 10 },
    { x: '2', y: 20 },
    { x: '3', y: 80 },
    { x: '4', y: 15 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 }
];
export let bardata: Object[] = [
    { x: '1', y: 90 },
    { x: '2', y: 10 },
    { x: '3', y: 50 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 70 },
    { x: '7', y: 9 }
];
export let rangecolumndata: Object[] = [
    { x: '1', low: 30, high: 60 },
    { x: '2', low: 42, high: 73 },
    { x: '3', low: 35, high: 80 },
    { x: '4', low: 20, high: 50 },
    { x: '5', low: 30, high: 80 },
    { x: '6', low: 10, high: 40 },
    { x: '7', low: 15, high: 69 }
];
export let steplinedata: Object[] = [
    { x: '1', y: 10 },
    { x: '2', y: 30 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
];
export let bubbledata: Object[] = [
    { x: '1.5', y: 80, size: 5 },
    { x: '2', y: 60, size: 10 },
    { x: '3', y: 70, size: 8 },
    { x: '4', y: 13, size: 6 },
    { x: '5', y: 30, size: 9 },
    { x: '6', y: 20, size: 7 },
    { x: '6.5', y: 40, size: 11 }
];

function shuffleArray<T>(array: T[]): T[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
interface DataPoint {
    x: string;
    y: number;
    y1: number;
};
export let scatterdata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 15, y1: 10 },
    { x: '1.25', y: 35, y1: 20 },
    { x: '1.5', y: 60, y1: 50 },
    { x: '1.75', y: 25, y1: 15 },
    { x: '2', y: 25, y1: 35 },
    { x: '2.25', y: 30, y1: 30 },
    { x: '2.5', y: 45, y1: 30 },
    { x: '2.75', y: 40, y1: 20 },
    { x: '3', y: 30, y1: 45 },
    { x: '3.25', y: 55, y1: 35 },
    { x: '3.5', y: 65, y1: 20 },
    { x: '3.75', y: 40, y1: 50 },
    { x: '4', y: 40, y1: 60 },
    { x: '4.25', y: 60, y1: 25 },
    { x: '4.5', y: 15, y1: 25 },
    { x: '4.75', y: 75, y1: 55 },
    { x: '5', y: 50, y1: 40 },
    { x: '5.25', y: 45, y1: 30 },
    { x: '5.5', y: 20, y1: 15 },
    { x: '5.75', y: 65, y1: 35 },
    { x: '6', y: 65, y1: 65 },
    { x: '6.25', y: 35, y1: 50 },
    { x: '6.5', y: 70, y1: 35 },
    { x: '6.75', y: 50, y1: 40 },
    { x: '7', y: 25, y1: 60 },
    { x: '7.25', y: 60, y1: 45 },
    { x: '7.5', y: 45, y1: 20 },
    { x: '7.75', y: 30, y1: 15 },
    { x: '8', y: 60, y1: 50 },
    { x: '8.25', y: 25, y1: 35 },
    { x: '8.5', y: 30, y1: 10 },
    { x: '8.75', y: 45, y1: 25 },
    { x: '9', y: 75, y1: 45 },
    { x: '9.25', y: 40, y1: 50 },
    { x: '9.5', y: 20, y1: 15 },
    { x: '9.75', y: 30, y1: 40 },
    { x: '10', y: 60, y1: 25 }
]);

export let scatterdata1: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 60, y1: 45 },
    { x: '1.25', y: 40, y1: 30 },
    { x: '1.5', y: 25, y1: 10 },
    { x: '1.75', y: 15, y1: 50 },
    { x: '2', y: 15, y1: 65 },
    { x: '2.25', y: 35, y1: 50 },
    { x: '2.5', y: 40, y1: 30 },
    { x: '2.75', y: 60, y1: 25 },
    { x: '3', y: 65, y1: 25 },
    { x: '3.25', y: 30, y1: 15 },
    { x: '3.5', y: 20, y1: 60 },
    { x: '3.75', y: 50, y1: 40 },
    { x: '4', y: 50, y1: 35 },
    { x: '4.25', y: 55, y1: 50 },
    { x: '4.5', y: 75, y1: 15 },
    { x: '4.75', y: 45, y1: 60 },
    { x: '5', y: 45, y1: 50 },
    { x: '5.25', y: 35, y1: 30 },
    { x: '5.5', y: 30, y1: 20 },
    { x: '5.75', y: 55, y1: 40 },
    { x: '6', y: 70, y1: 55 },
    { x: '6.25', y: 60, y1: 25 },
    { x: '6.5', y: 15, y1: 40 },
    { x: '6.75', y: 40, y1: 15 },
    { x: '7', y: 30, y1: 25 },
    { x: '7.25', y: 60, y1: 35 },
    { x: '7.5', y: 60, y1: 35 },
    { x: '7.75', y: 25, y1: 15 },
    { x: '8', y: 25, y1: 10 },
    { x: '8.25', y: 50, y1: 30 },
    { x: '8.5', y: 45, y1: 65 },
    { x: '8.75', y: 55, y1: 20 },
    { x: '9', y: 50, y1: 60 },
    { x: '9.25', y: 30, y1: 45 },
    { x: '9.5', y: 10, y1: 20 },
    { x: '9.75', y: 40, y1: 35 },
    { x: '10', y: 55, y1: 15 }
]);

export let scatterdata2: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 70, y1: 25 },
    { x: '1.25', y: 55, y1: 40 },
    { x: '1.5', y: 45, y1: 40 },
    { x: '1.75', y: 30, y1: 45 },
    { x: '2', y: 20, y1: 55 },
    { x: '2.25', y: 30, y1: 45 },
    { x: '2.5', y: 10, y1: 35 },
    { x: '2.75', y: 25, y1: 15 },
    { x: '3', y: 50, y1: 20 },
    { x: '3.25', y: 60, y1: 30 },
    { x: '3.5', y: 25, y1: 60 },
    { x: '3.75', y: 50, y1: 45 },
    { x: '4', y: 30, y1: 15 },
    { x: '4.25', y: 55, y1: 20 },
    { x: '4.5', y: 65, y1: 75 },
    { x: '4.75', y: 45, y1: 35 },
    { x: '5', y: 60, y1: 45 },
    { x: '5.25', y: 35, y1: 10 },
    { x: '5.5', y: 15, y1: 30 },
    { x: '5.75', y: 30, y1: 60 },
    { x: '6', y: 55, y1: 50 },
    { x: '6.25', y: 25, y1: 45 },
    { x: '6.5', y: 35, y1: 10 },
    { x: '6.75', y: 20, y1: 30 },
    { x: '7', y: 40, y1: 65 },
    { x: '7.25', y: 30, y1: 45 },
    { x: '7.5', y: 30, y1: 60 },
    { x: '7.75', y: 45, y1: 30 },
    { x: '8', y: 60, y1: 45 },
    { x: '8.25', y: 50, y1: 40 },
    { x: '8.5', y: 20, y1: 25 },
    { x: '8.75', y: 70, y1: 15 },
    { x: '9', y: 75, y1: 15 },
    { x: '9.25', y: 30, y1: 50 },
    { x: '9.5', y: 50, y1: 35 },
    { x: '9.75', y: 55, y1: 20 },
    { x: '10', y: 15, y1: 70 }
]);

export let scatterdata3: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 20, y1: 30 },
    { x: '1.25', y: 30, y1: 20 },
    { x: '1.5', y: 35, y1: 60 },
    { x: '1.75', y: 40, y1: 30 },
    { x: '2', y: 55, y1: 20 },
    { x: '2.25', y: 45, y1: 35 },
    { x: '2.5', y: 60, y1: 45 },
    { x: '2.75', y: 25, y1: 30 },
    { x: '3', y: 45, y1: 15 },
    { x: '3.25', y: 50, y1: 45 },
    { x: '3.5', y: 50, y1: 35 },
    { x: '3.75', y: 15, y1: 40 },
    { x: '4', y: 15, y1: 70 },
    { x: '4.25', y: 45, y1: 55 },
    { x: '4.5', y: 75, y1: 10 },
    { x: '4.75', y: 60, y1: 25 },
    { x: '5', y: 30, y1: 55 },
    { x: '5.25', y: 45, y1: 35 },
    { x: '5.5', y: 60, y1: 25 },
    { x: '5.75', y: 40, y1: 45 },
    { x: '6', y: 10, y1: 50 },
    { x: '6.25', y: 20, y1: 65 },
    { x: '6.5', y: 65, y1: 40 },
    { x: '6.75', y: 30, y1: 30 },
    { x: '7', y: 25, y1: 65 },
    { x: '7.25', y: 35, y1: 40 },
    { x: '7.5', y: 20, y1: 45 },
    { x: '7.75', y: 60, y1: 50 },
    { x: '8', y: 35, y1: 60 },
    { x: '8.25', y: 25, y1: 45 },
    { x: '8.5', y: 30, y1: 15 },
    { x: '8.75', y: 50, y1: 70 },
    { x: '9', y: 45, y1: 75 },
    { x: '9.25', y: 20, y1: 35 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 45, y1: 30 },
    { x: '10', y: 50, y1: 25 }
]);

export let scatterdata4: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 50, y1: 60 },
    { x: '1.25', y: 45, y1: 55 },
    { x: '1.5', y: 15, y1: 30 },
    { x: '1.75', y: 55, y1: 20 },
    { x: '2', y: 60, y1: 45 },
    { x: '2.25', y: 55, y1: 35 },
    { x: '2.5', y: 55, y1: 20 },
    { x: '2.75', y: 30, y1: 50 },
    { x: '3', y: 70, y1: 50 },
    { x: '3.25', y: 25, y1: 35 },
    { x: '3.5', y: 30, y1: 35 },
    { x: '3.75', y: 45, y1: 60 },
    { x: '4', y: 65, y1: 15 },
    { x: '4.25', y: 20, y1: 70 },
    { x: '4.5', y: 25, y1: 75 },
    { x: '4.75', y: 35, y1: 25 },
    { x: '5', y: 40, y1: 60 },
    { x: '5.25', y: 50, y1: 30 },
    { x: '5.5', y: 20, y1: 10 },
    { x: '5.75', y: 35, y1: 40 },
    { x: '6', y: 35, y1: 45 },
    { x: '6.25', y: 30, y1: 25 },
    { x: '6.5', y: 30, y1: 70 },
    { x: '6.75', y: 60, y1: 20 },
    { x: '7', y: 45, y1: 25 },
    { x: '7.25', y: 40, y1: 35 },
    { x: '7.5', y: 20, y1: 55 },
    { x: '7.75', y: 50, y1: 40 },
    { x: '8', y: 50, y1: 40 },
    { x: '8.25', y: 35, y1: 55 },
    { x: '8.5', y: 60, y1: 35 },
    { x: '8.75', y: 30, y1: 60 },
    { x: '9', y: 10, y1: 65 },
    { x: '9.25', y: 25, y1: 50 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 30, y1: 25 },
    { x: '10', y: 65, y1: 30 },
]);

export let headertext: Object[] = [
    { text: "Line" },
    { text: "Column" },
    { text: "Spline" },
    { text: "Area" },
    { text: "Bar" },
    { text: "Bubble" },
    { text: "Scatter" },
    { text: "Step line" },
    { text: "Range column" }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class SeriesAnimation extends SampleBase<{}, {}> {
    private intervalId: NodeJS.Timeout | null = null;
    private splineIntervalId: NodeJS.Timeout | null = null;
    private columnIntervalId: NodeJS.Timeout | null = null;
    private areaIntervalId: NodeJS.Timeout | null = null;
    private barIntervalId: NodeJS.Timeout | null = null;
    private rangeIntervalId: NodeJS.Timeout | null = null;
    private stepIntervalId: NodeJS.Timeout | null = null;
    private scatterIntervalId: NodeJS.Timeout | null = null;
    private bubbleIntervalId: NodeJS.Timeout | null = null;

    componentWillUnmount() {
        this.clearIntervalFn();
        this.splineClearIntervalFn();
        this.columnClearIntervalFn();
        this.areaClearIntervalFn();
        this.barClearIntervalFn();
        this.rangeClearIntervalFn();
        this.stepClearIntervalFn();
        this.scatterClearIntervalFn();
        this.bubbleClearIntervalFn();
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <TabComponent cssClass='responsive-mode' heightAdjustMode='None' overflowMode={"Scrollable"} headerPlacement="Top" height="500px" selected={this.tabSelected.bind(this)}>
                        <TabItemsDirective>
                            <TabItemDirective header={headertext[0]} content={() => <this.LineTemplate />} />
                            <TabItemDirective header={headertext[1]} content={() => <this.ColumnTemplate />} />
                            <TabItemDirective header={headertext[2]} content={() => <this.SplineTemplate />} />
                            <TabItemDirective header={headertext[3]} content={() => <this.AreaTemplate />} />
                            <TabItemDirective header={headertext[4]} content={() => <this.BarTemplate />} />
                            <TabItemDirective header={headertext[5]} content={() => <this.BubbleTemplate />} />
                            <TabItemDirective header={headertext[6]} content={() => <this.ScatterTemplate />} />
                            <TabItemDirective header={headertext[7]} content={() => <this.StepLineTemplate />} />
                            <TabItemDirective header={headertext[8]} content={() => <this.RangeColumnTemplate />} />
                        </TabItemsDirective>
                    </TabComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the animation capabilities of various chart series types in React Charts. The chart updates its data dynamically at regular intervals to showcase smooth transitions and animations.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, different types of chart series, such as Line, Column, Spline, Area, Bar, Bubble, Scatter, Step Line, and Range Column, are animated to demonstrate real-time data updates. The chart dynamically updates with random values using the <code>setData</code> method. Each chart type reflects its unique characteristics and enhances visual understanding through animations.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are divided into individual, feature-specific modules. To use a particular series, you need to inject the corresponding series module using the <code>Chart.Inject(LineSeries)</code> method.
                    </p>
                    <p>
                        More information on the various chart types can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/line" aria-label="Navigate to the documentation for Line Chart in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }

    public pointRender(args: IPointRenderEventArgs): void {
        bubblePointRender(args);
    };

    public onsplineLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('splineCharts');
        chart.setAttribute('title', '');
    };

    public splineLoad(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.splineClearIntervalFn();
        this.splineIntervalId = setInterval(() => {
            let container = document.getElementById('splineCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = splinedata.map((item: { x: string, y: number }) => {
                    const min: number = 10;
                    const max: number = 90;
                    const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
                    return { x: item.x, y: value };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            } else {
                this.splineClearIntervalFn();
            }
        }, 2000);
    };

    private splineClearIntervalFn = () => {
        if (this.splineIntervalId) {
            clearInterval(this.splineIntervalId);
            this.splineIntervalId = null;
        }
    };

    public generateRandomValues(item: { x: string, y: number }): { x: string, y: number } {
        const min: number = 10;
        const max: number = 95;
        const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
        return { x: item.x, y: value };
    };

    public generateRandomBubbleData(item: { x: string, y: number, size: number }): { x: string, y: number, size: number } {
        const minYValue: number = 5;
        const maxYValue: number = 95;
        const randomYValue: number = Math.random() * (maxYValue - minYValue) + minYValue;
        const minSize: number = 3.5;
        const maxSize: number = 9.5;
        const randomSize: number = Math.random() * (maxSize - minSize) + minSize;
        return { ...item, y: randomYValue, size: randomSize };
    };

    public onlineLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('lineCharts');
        chart.setAttribute('title', '');
    };
    public lineload(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.clearIntervalFn();
        this.intervalId = setInterval(() => {
            let container = document.getElementById('lineCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = linedata.map(this.generateRandomValues);
                if (args.chart && args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            } else {
                this.clearIntervalFn();
            }
        }, 2000);
    };

    private clearIntervalFn = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };

    public oncolumnLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('columnCharts');
        chart.setAttribute('title', '');
    };
    public columnload (args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.columnClearIntervalFn();
        this.columnIntervalId = setInterval(() => {
            let container = document.getElementById('columnCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = columndata.map(this.generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                this.columnClearIntervalFn();
            }
        }, 2000);
    };

    private columnClearIntervalFn = () => {
        if (this.columnIntervalId) {
            clearInterval(this.columnIntervalId);
            this.columnIntervalId = null;
        }
    };

    public onareaLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('areaCharts');
        chart.setAttribute('title', '');
    };
    public areaload (args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.areaClearIntervalFn();
        this.areaIntervalId = setInterval(() => {
            let container = document.getElementById('areaCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = areadata.map(this.generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                this.areaClearIntervalFn();
            }
        }, 2000);
    };

    private areaClearIntervalFn = () => {
        if (this.areaIntervalId) {
            clearInterval(this.areaIntervalId);
            this.areaIntervalId = null;
        }
    };

    public onbarLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('barcharts');
        chart.setAttribute('title', '');
    };
    public barload (args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.barClearIntervalFn();
        this.barIntervalId = setInterval(() => {
            let container = document.getElementById('barcharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = bardata.map(this.generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                this.barClearIntervalFn();
            }
        }, 2000);
    };

    private barClearIntervalFn = () => {
        if (this.barIntervalId) {
            clearInterval(this.barIntervalId);
            this.barIntervalId = null;
        }
    };

    public onrangeLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('rangecharts');
        chart.setAttribute('title', '');
    };
    public rangeload (args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.rangeClearIntervalFn();
        this.rangeIntervalId = setInterval(() => {
            let container = document.getElementById('rangecharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = rangecolumndata.map((item: { x: string, high: number, low: number }) => {
                    const highMin: number = 50;
                    const highMax: number = 95;
                    const lowMin: number = 5;
                    const lowMax: number = 45;
                    const highValue: number = Math.floor(Math.random() * (highMax - highMin + 1)) + highMin;
                    const lowValue: number = Math.floor(Math.random() * (lowMax - lowMin + 1)) + lowMin;
                    return { x: item.x, high: highValue, low: lowValue };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                this.rangeClearIntervalFn();
            }
        }, 2000);
    };

    private rangeClearIntervalFn = () => {
        if (this.rangeIntervalId) {
            clearInterval(this.rangeIntervalId);
            this.rangeIntervalId = null;
        }
    };

    public onStepLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('stepcharts');
        chart.setAttribute('title', '');
    };
    public stepLoad (args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.stepClearIntervalFn();
        this.stepIntervalId = setInterval(() => {
            let container = document.getElementById('stepcharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = steplinedata.map(this.generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                this.stepClearIntervalFn();
            }
        }, 2000);
    };

    private stepClearIntervalFn = () => {
        if (this.stepIntervalId) {
            clearInterval(this.stepIntervalId);
            this.stepIntervalId = null;
        }
    };

    public onScatterLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('scattercharts');
        chart.setAttribute('title', '');
    };
    public scatterLoad (args: ILoadedEventArgs): void {
        loadChartTheme(args);
        let index: number = 1;
        const datasets: any = [scatterdata, scatterdata1, scatterdata2, scatterdata3, scatterdata4];
        this.scatterClearIntervalFn();
        this.scatterIntervalId = setInterval(() => {
            let container = document.getElementById('scattercharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const scatterDataSource: any = datasets[index % datasets.length];
                index++;
                args.chart.series[0].setData(scatterDataSource, 2000);
                args.chart.series[1].setData(scatterDataSource, 2000);
            }
            else {
                this.scatterClearIntervalFn();
            }
        }, 2000);
    };

    private scatterClearIntervalFn = () => {
        if (this.scatterIntervalId) {
            clearInterval(this.scatterIntervalId);
            this.scatterIntervalId = null;
        }
    };

    public onBubbleLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('bubblecharts');
        chart.setAttribute('title', '');
    };
    public bubbleLoad = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
        this.bubbleClearIntervalFn();
        this.bubbleIntervalId = setInterval(() => {
            let container = document.getElementById('bubblecharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                if (args.chart.series.length > 0) {
                    let newBubbleData: any = bubbledata.map(this.generateRandomBubbleData);
                    newBubbleData = shuffleArray(newBubbleData);
                    args.chart.series[0].setData(newBubbleData, 1400);
                }
            }
            else {
                this.bubbleClearIntervalFn();
            }
        }, 2000);
    };

    private bubbleClearIntervalFn = () => {
        if (this.bubbleIntervalId) {
            clearInterval(this.bubbleIntervalId);
            this.bubbleIntervalId = null;
        }
    };

    public tabSelected = (e: SelectingEventArgs): void => {
        const chartIds = [
            'lineCharts',
            'splineCharts',
            'columnCharts',
            'areaCharts',
            'barcharts',
            'rangecharts',
            'stepcharts',
            'scattercharts',
            'bubblecharts'
        ];
        chartIds.forEach((id, index) => {
            if (index === e.selectedIndex) {
                let chartElement = document.getElementById(id);
                if (chartElement) {
                    let chart = (chartElement as any).ej2_instances[0];
                    chart.refresh();
                }
            }
        });
    };

    public SplineTemplate = () => (
        <ChartComponent id='splineCharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} loaded={this.onsplineLoad.bind(this)} load={this.splineLoad.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[SplineSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={splinedata} width={2.5} marker={{ visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } }} xName='x' yName="y" type='Spline' animation={{ enable: true }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public LineTemplate = () => (
        <ChartComponent id='lineCharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} loaded={this.onlineLoad.bind(this)} load={this.lineload.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[LineSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={linedata} width={2.5} marker={{ visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } }} xName='x' yName="y" type='Line' animation={{ enable: true }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public ColumnTemplate = () => (
        <ChartComponent id='columnCharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} loaded={this.oncolumnLoad.bind(this)} load={this.columnload.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[ColumnSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={columndata} xName='x' yName="y" type='Column' animation={{ enable: true }} marker={{ dataLabel: { visible: true, position: 'Outer' } }} cornerRadius={{ topLeft: 4, topRight: 4 }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public AreaTemplate = () => (
        <ChartComponent id='areaCharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} loaded={this.onareaLoad.bind(this)} load={this.areaload.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[SplineAreaSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={areadata} xName='x' yName="y" type='SplineArea' animation={{ enable: true }} marker={{ dataLabel: { visible: true, position: 'Outer' } }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public BarTemplate = () => (
        <ChartComponent id='barcharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ lineStyle: { width: 0 }, labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', majorTickLines: { width: 0 } }} loaded={this.onbarLoad.bind(this)} load={this.barload.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[BarSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={bardata} xName='x' yName="y" type='Bar' animation={{ enable: true }} marker={{ dataLabel: { visible: true, position: 'Outer' } }} cornerRadius={{ bottomRight: 4, topRight: 4 }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public RangeColumnTemplate = () => (
        <ChartComponent id='rangecharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} loaded={this.onrangeLoad.bind(this)} load={this.rangeload.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[RangeColumnSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={rangecolumndata} high="high" low="low" xName='x' columnSpacing={0.1} type='RangeColumn' animation={{ enable: true }} marker={{ dataLabel: { visible: true, position: 'Outer' } }} cornerRadius={{ bottomRight: 4, bottomLeft: 4, topLeft: 4, topRight: 4 }}/>
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public StepLineTemplate = () => (
        <ChartComponent id='stepcharts' style={{ marginTop: '10px' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} loaded={this.onStepLoad.bind(this)} load={this.stepLoad.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[StepLineSeries, Category, DataLabel, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={steplinedata} width={2.5} xName='x' yName="y" type='StepLine' animation={{ enable: true }} marker={{ dataLabel: { visible: false, position: 'Outer' } }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
    public ScatterTemplate = () => (
        <ChartComponent id='scattercharts' style={{ marginTop: '10px' }} primaryXAxis={{ minimum: 1, interval: 1, maximum: 10, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} primaryYAxis={{ majorTickLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 0, maximum: 80, interval: 10, rangePadding: 'None' }} load={this.scatterLoad.bind(this)} loaded={this.onScatterLoad.bind(this)} chartArea={{ border: { width: 0 } }} >
            <Inject services={[ScatterSeries, Category, Highlight]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={scatterdata} xName='x' yName='y' type='Scatter' marker={{ visible: false, width: 8, height: 8, shape: 'Circle' }} animation={{ enable: true }} />
                <SeriesDirective dataSource={scatterdata} xName='x' yName='y1' type='Scatter' marker={{ visible: false, width: 8, height: 8, shape: 'Circle' }} animation={{ enable: true }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )

    public BubbleTemplate = () => (
        <ChartComponent id='bubblecharts' style={{ marginTop: '10px' }} pointRender={this.pointRender.bind(this)} chartArea={{ border: { width: 0 } }} primaryXAxis={{ minimum: 1, maximum: 7, interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} load={this.bubbleLoad.bind(this)} primaryYAxis={{ minimum: 0, maximum: 100, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} legendSettings={{ visible: false }} loaded={this.onBubbleLoad.bind(this)} >
            <Inject services={[BubbleSeries, Category]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={bubbledata} type='Bubble' border={{ width: 2 }} xName='x' yName='y' size='size' animation={{ enable: true }} />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}