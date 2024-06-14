/**
 * Sample for 100 percent Stacking Line series
 */
import * as React from 'react';
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective, ILoadedEventArgs, ChartTheme,
    Inject,
    Legend,
    Category,
    StackingLineSeries,
    Tooltip,
    Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let chartData = [
    { x: 'Food', y: 90, y1: 40, y2: 70, y3: 120 },{ x: 'Transport', y: 80, y1: 90, y2: 110, y3: 70 },{ x: 'Medical', y: 50, y1: 80, y2: 120, y3: 50 },
    { x: 'Clothes', y: 70, y1: 30, y2: 60, y3: 180 },{ x: 'Personal Care', y: 30, y1: 80, y2: 80, y3: 30 },{ x: 'Books', y: 10, y1: 110, y2: 100, y3: 270 },
    { x: 'Fitness', y: 100, y1: 30, y2: 70, y3: 40 },{ x: 'Electricity', y: 55, y1: 95, y2: 55, y3: 75 },{ x: 'Tax', y: 20, y1: 50, y2: 40, y3: 65 },
    { x: 'Pet Care', y: 40, y1: 20, y2: 80, y3: 95 },{ x: 'Education', y: 45, y1: 15, y2: 45, y3: 195 },{ x: 'Entertainment', y: 75, y1: 45, y2: 65, y3: 115 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
export class StackedLine100 extends SampleBase<{}, {}>{
    render() {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">
                    <ChartComponent
                        id="charts"
                        style={{ textAlign: 'center' }}
                        primaryXAxis={{
                            majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, valueType: 'Category',
                        }}
                        primaryYAxis={{
                            title: 'Expense', lineStyle: { width: 0 }, interval: 20, minorTickLines: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        legendSettings={{enableHighlight: true}}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title="Family Expenses Per Month"
                        tooltip={{
                            enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>',
                        }}>
                        <Inject services={[StackingLineSeries, Category, Legend, Tooltip, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} xName="x" yName="y" name="John" width={2} type="StackingLine100" marker={{ visible: true, shape: 'Circle', width: 7, isFilled: true, height: 7 }}></SeriesDirective>
                            <SeriesDirective dataSource={chartData} xName="x" yName="y1" name="Peter" width={2} type="StackingLine100" marker={{ visible: true, isFilled: true, shape: 'Diamond', width: 7, height: 7, }}></SeriesDirective>
                            <SeriesDirective dataSource={chartData} xName="x" yName="y2" name="Steve" width={2} type="StackingLine100" marker={{ visible: true, isFilled: true, shape: 'Rectangle', width: 5, height: 5, }}></SeriesDirective>
                            <SeriesDirective dataSource={chartData} xName="x" yName="y3" name="Charle" width={2} type="StackingLine100" marker={{ isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6, }}></SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This React 100% Stacked Line Chart example visualizes the family expenses with 100% stacked line series to identify who spent more money in each category. Data points are enhanced with markers and tooltips.
            </p>
                </div>
                <div id="description">
                     <p>
                     In this example, you can see how to render and configure the 100% stacked line chart. This chart displays multiple series of data as stacked lines, ensuring that the cumulative proportion of each stacked element always totals 100%. <code>Markers</code>  are used to represent individual data and its values.
                     </p>
                     <p>
                     Tooltips are enabled in this example. To see a tooltip in action, hover over a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                    Chart component features are segregated into individual feature-wise modules. To use 100% stacking line series, we need to inject
                    <code>StackingLineSeries</code>  module into <code>services</code>.
                    </p>
                    <p>
                        More information about the 100% stacked line series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-line" aria-label="Navigate to the documentation for 100% Stacked Line Chart in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}