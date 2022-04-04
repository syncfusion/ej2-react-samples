/**
 * Sample for Stacking Line series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingLineSeries, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let chartData: any[] = [
    { x: 'Food', y: 90, y1: 40, y2: 70, y3: 120 },
    { x: 'Transport', y: 80, y1: 90, y2: 110, y3: 70 },
    { x: 'Medical', y: 50, y1: 80, y2: 120, y3: 50 },
    { x: 'Clothes', y: 70, y1: 30, y2: 60, y3: 180 },
    { x: 'Personal Care', y: 30, y1: 80, y2: 80, y3: 30 },
    { x: 'Books', y: 10, y1: 40, y2: 30, y3: 270 },
    { x: 'Fitness', y: 100, y1: 30, y2: 70, y3: 40 },
    { x: 'Electricity', y: 55, y1: 95, y2: 55, y3: 75 },
    { x: 'Tax', y: 20, y1: 50, y2: 40, y3: 65 },
    { x: 'Pet Care', y: 40, y1: 20, y2: 80, y3: 95 },
    { x: 'Education', y: 45, y1: 15, y2: 45, y3: 195 },
    { x: 'Entertainment', y: 75, y1: 45, y2: 65, y3: 115 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedLine extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
                            majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                            interval: 1, lineStyle: { width: 0 }, valueType: 'Category'
                        }}
                        primaryYAxis={{
                            title: 'Expense', lineStyle: { width: 0 },
                            minimum: 0, maximum: 400, interval: 100,
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 },
                            minorTickLines: { width: 0 },
                            labelFormat: '${value}',
                        }}
                        width={Browser.isDevice ? '100%' : '90%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Family Expense for Month'
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingLineSeries, Category, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='y' name='John' width={2} type='StackingLine' marker= {{visible: true}} dashArray='5,1'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='y1' name='Peter' width={2} type='StackingLine' marker= {{visible: true}} dashArray='5,1'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='y2' name='Steve' width={2} type='StackingLine' marker= {{visible: true}} dashArray='5,1'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={chartData} xName='x' yName='y3' name='Charle' width={2} type='StackingLine' marker= {{visible: true}} dashArray='5,1'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the family expense data with stacked line series in the chart to identify who spent more money in each category. 
                 Data points are enhanced with marker and tooltip.
            </p>
                </div>
                <div id="description">
                     <p>
                      In this example, you can see how to render and configure the stacked line type charts. Stacked Line type charts are used to represent time-dependent data, showing trends in data at equal intervals with stacked values of multiple series.
                     You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the line. <code>marker</code> used to represent individual data.
                  </p>
                  <p>
                  Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking line series, we need to inject
                          <code>StackingLineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacking column series can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        
}