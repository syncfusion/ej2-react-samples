/**
 * Samples for vertical chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, LineSeries, ILoadedEventArgs, Series, ChartTheme, getElement, Tooltip, AxesDirective, AxisDirective, Category, ColumnSeries
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class VerticalChart extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private count: number = 0;
    private clrInterval: number;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <ChartComponent id='charts-vertical' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{ title: 'Sales in Billion', majorGridLines: { width: 0 }, minimum: 11000, maximum: 15000, interval: 500, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} isTransposed={true} legendSettings={{ visible: false }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '75%'} title='Sales Vs Profit Margins' loaded={this.onChartLoad.bind(this)}>
                    <Inject services={[LineSeries, Tooltip, Category, Legend, ColumnSeries]} />
                    <AxesDirective>
                        <AxisDirective majorGridLines={{ width: 0 }} opposedPosition={true} title='Profit(In Percentage)' lineStyle={{ width: 0 }} minimum={0} maximum={4} interval={0.5} majorTickLines={{ width: 0 }} name='yAxis2' labelFormat='{value}%' />
                    </AxesDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective width={2} dataSource={[ { Year: "2016", column: 13600 }, { Year: "2017", column: 12900 }, { Year: "2018", column: 12500 }, { Year: "2019", column: 14500 }, { Year: "2020", column: 14500 }, { Year: "2021", column: 12000 } ]} xName='Year' name="Sales" yName='column' type='Column' />
                        <SeriesDirective width={2} dataSource={[ { Year: "2016", column: 13600, series: 0.5 }, { Year: "2017", series: 1.5 }, { Year: "2018", series: 3.5 }, { Year: "2019", series: 1.5 }, { Year: "2020", series: 3 }, { Year: "2021", series: 2.5 }]} yAxisName="yAxis2" name="Profit Margin" xName='Year' yName='series' type='Line' marker={{ visible: true,  width: 7, height: 7, isFilled: true }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates the vertical chart by changing the orientation of x-axis to vertical and y-axis to horizontal.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the vertical type charts.
    To render a chart in vertical manner, you can use <code>isTransposed</code> in chart.
  </p>
                    <p>
                        More information on the isTransposed can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/vertical">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        //let chart: Element = document.getElementById('charts-vertical');
        args.chart.loaded = null;
        //chart.setAttribute('title', '');
        this.clrInterval =
            +setInterval(() => {
                args.chart.series[0].dataSource = this.liveData(args.chart.series[0].dataSource as any[], args.chart.series[0] as Series);
                args.chart.refresh();
            },
                // tslint:disable-next-line:align
                10);
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
        
    public liveData(data: any[], series: Series): any[] {
        this.count = this.count + 1;
        let newData: any[] = data;
        if (this.count > 350 || getElement('charts-vertical') === null) {
            clearInterval(this.clrInterval);
        } else if (this.count > 300) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(0, 0) });
        } else if (this.count > 250) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-2, 1) });
        } else if (this.count > 180) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 2) });
        } else if (this.count > 100) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-7, 6) });
        } else if (this.count < 50) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 3) });
        } else {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-9, 9) });
        }
        return newData;
    }
    public getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public getXValue(data: any[]): number {
        return data.length;
    }
}