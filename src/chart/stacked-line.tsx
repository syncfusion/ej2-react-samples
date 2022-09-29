/**
 * Sample for Stacking Line series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, ILoadedEventArgs, ChartTheme,Highlight, SeriesDirective, Inject, Legend, Category, StackingLineSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let chartData = [
    { x: 'Food', y: 90, y1: 40, y2: 70, y3: 120 },{ x: 'Transport', y: 80, y1: 90, y2: 110, y3: 70 },{ x: 'Medical', y: 50, y1: 80, y2: 120, y3: 50 },
    { x: 'Clothes', y: 70, y1: 30, y2: 60, y3: 180 },{ x: 'Personal Care', y: 30, y1: 80, y2: 80, y3: 30 },{ x: 'Books', y: 10, y1: 40, y2: 30, y3: 270 },
    { x: 'Fitness', y: 100, y1: 30, y2: 70, y3: 40 },{ x: 'Electricity', y: 55, y1: 95, y2: 55, y3: 75 },{ x: 'Tax', y: 20, y1: 50, y2: 40, y3: 65 },
    { x: 'Pet Care', y: 40, y1: 20, y2: 80, y3: 95 },{ x: 'Education', y: 45, y1: 15, y2: 45, y3: 195 },{ x: 'Entertainment', y: 75, y1: 45, y2: 65, y3: 115 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
export class StackedLine extends SampleBase<{}, {}>{
    render() {
        return (<div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }}
                    primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, valueType: 'Category' }}

                    primaryYAxis={{ title: 'Expense', lineStyle: { width: 0 }, minimum: 0, maximum: 400, interval: 100, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '${value}', }}
                    legendSettings={{enableHighlight: true}}
                    width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} title='Family Expenses Per Month' tooltip={{ enable: true }}> 
                    <Inject services={[StackingLineSeries, Category, Legend, Tooltip, Highlight ]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartData} xName='x' yName='y' name='John' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }} >
                        </SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName='x' yName='y1' name='Peter' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Diamond', width: 7, height: 7 }} >
                        </SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName='x' yName='y2' name='Steve' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Rectangle', width: 5, height: 5 }} >
                        </SeriesDirective>
                        <SeriesDirective dataSource={chartData} xName='x' yName='y3' name='Charle' width={2} type='StackingLine' marker={{ isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6 }} >
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                    <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                </div>
            </div>
                <div id="action-description">
                <p>
                This React Stacked Line Chart example visualizes the family expenses data with a stacked line series in the chart to identify who spent more money in each category.
            </p>
                </div>
                <div id="description">
                     <p>
                     In this example, you can see how to render and configure the stacked line chart. The stacked line chart visualizes data with y-values stacked one over another in a series order. It shows the relationship between individual values to the total sum of points. 
                  </p>
                  <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking line series, we need to inject
                          <code>StackingLineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the line series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#line-charts">documentation section</a>.
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