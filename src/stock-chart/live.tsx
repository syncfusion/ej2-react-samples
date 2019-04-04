/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    DateTime, getElement, IStockChartEventArgs, CandleSeries, Crosshair,
    Tooltip, RangeTooltip, LineSeries, ChartTheme,
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
    .charts {
        align :center
    }`;
export class Live extends SampleBase<{}, {}> {
    public series1: { date: Date, y: string }[] = [];

    public value: number = 80;
    public intervalId: any;
    public setTimeoutValue: number;
    public count: number = 1;
    public time: number;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchart' 
                        primaryXAxis={{
                            valueType: 'DateTime'
                        }}
                        seriesType={[]}
                        indicatorType={[]}
                        exportType={[]}
                        periods={[
                            { text: '1H', interval: 1, intervalType: 'Hours', },
                            { text: '12H', interval: 12, intervalType: 'Hours' },
                            { text: '1D', interval: 1, intervalType: 'Days', selected: true },
                            { text: 'All' }
                        ]}
                        crosshair={{ enable: false }}
                        tooltip={{ enable: false }}
                        chartArea={{ border: { width: 0 } }}
                    >
                        <Inject services={[DateTime, Tooltip, RangeTooltip, LineSeries, CandleSeries, Crosshair]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={this.series1} xName='date' yName='y' type='Line' enableTooltip={false}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes dynamic stock chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the dynamic stock chart.
                        <code>LineSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>LineSeries</code> module using the <code>StockChart.Inject(LineSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }
    // public loaded(args: IStockChartEventArgs): void {
    //     this.setTimeoutValue = 1000;
    //     this.intervalId = +setInterval(
    //         () => {
    //             if (getElement('stockchart') === null) {
    //                 clearInterval(this.intervalId);
    //             } else {
    //                 if (Math.random() > .5) {
    //                     this.value += Math.random();
    //                 } else {
    //                     this.value -= Math.random();
    //                 }
    //                 this.series1.push({
    //                     date: new Date(this.series1[this.series1.length - 1].date.
    //                         setHours(this.series1[this.series1.length - 1].date.getHours() + 1)),
    //                     y: this.value.toFixed(1)
    //                 });
    //                 this.count++;
    //                 this.series1.shift(); // Used to remove the first element
    //                 args.stockChart.series[0].dataSource = this.series1;
    //                 args.stockChart.refresh();
    //             }
    //         },
    //         this.setTimeoutValue);
    // };
    constructor() {
        super()
        let point1: { date: Date, y: string };
        let i: number;
        for (i = 1; i < 500; i++) {
            if (Math.random() > .5) {
                this.value += Math.random();
            } else {
                this.value -= Math.random();
            }
            point1 = { date: new Date(2000, 1, 1, i), y: this.value.toFixed(1) };
            this.series1.push(point1);
        }

    };
}
