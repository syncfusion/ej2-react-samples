/**
 * Sample for Dynamic Stock Chart with Spline Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,
    DateTime, SplineSeries, Tooltip, RangeTooltip, Crosshair
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
    .charts {
        align :center
    }`;
let series1: { date: Date, y: string }[] = [];
let point1: { date: Date, y: string };
let value: number = 80;
let i: number;
let day: Date;
for (i = 1; i < 500; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    } else {
        value -= Math.random();
    }
    point1 = { date: new Date(2000, 1, 1, i), y: value.toFixed(1) };

    series1.push(point1);
}
export class SplineLive extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchart'
                        primaryXAxis={{
                            valueType: 'DateTime', majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            lineStyle: { color: 'transparent' },
                            majorTickLines: { color: 'transparent', width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        periods={[
                            { text: '1H', interval: 1, intervalType: 'Hours', },
                            { text: '12H', interval: 12, intervalType: 'Hours' },
                            { text: '1D', interval: 1, intervalType: 'Days', selected: true },
                            { text: 'All' }
                        ]}
                        seriesType={[]}
                        indicatorType={[]}
                        exportType={[]}
                        tooltip={{ enable: true }}
                        crosshair={{ enable: true }}
                    >
                        <Inject services={[DateTime, SplineSeries, Tooltip, RangeTooltip, Crosshair]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={series1} xName='x' yName='y' type='Spline'>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes stock chart with dynamic spline series.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stock chart with spline series.
                        <code>LineSeries</code> is used to represent selected data value.
                  </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the SplineSeries, inject the <code>SplineSeries</code> module using the <code>StockChart.Inject(SplineSeries)</code> method.
                    </p>
                </div>
            </div>
        )
    }
}
