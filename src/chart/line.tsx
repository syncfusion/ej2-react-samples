/**
 * Sample for Line Series
 */
import * as React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, ChartTheme, LineSeries, Legend, DateTime, Tooltip,Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: new Date(2020, 6, 11), y: 11.0 }, { x: new Date(2019, 6, 11), y: 12.9 }, { x: new Date(2018, 6, 11), y: 13.4 },
    { x: new Date(2017, 6, 11), y: 13.7 }, { x: new Date(2016, 6, 11), y: 12.7 }, { x: new Date(2015, 6, 11), y: 12.5 },
    { x: new Date(2014, 6, 11), y: 12.7 }, { x: new Date(2013, 6, 11), y: 12.4 }, { x: new Date(2012, 6, 11), y: 13.5 },
];
export let data2 = [
    { x: new Date(2020, 6, 11), y: 19.5 }, { x: new Date(2019, 6, 11), y: 17.5 }, { x: new Date(2018, 6, 11), y: 15.5 },
    { x: new Date(2017, 6, 11), y: 10.3 }, { x: new Date(2016, 6, 11), y: 7.8 }, { x: new Date(2015, 6, 11), y: 5.7 },
    { x: new Date(2014, 6, 11), y: 5.9 }, { x: new Date(2013, 6, 11), y: 5.6 }, { x: new Date(2012, 6, 11), y: 5.3 },
];
export let data3 = [
    { x: new Date(2020, 6, 11), y: 7.1 }, { x: new Date(2019, 6, 11), y: 6.8 }, { x: new Date(2018, 6, 11), y: 4.1 },
    { x: new Date(2017, 6, 11), y: 2.8 }, { x: new Date(2016, 6, 11), y: 2.8 }, { x: new Date(2015, 6, 11), y: 3.8 },
    { x: new Date(2014, 6, 11), y: 4.3 }, { x: new Date(2013, 6, 11), y: 4.7 }, { x: new Date(2012, 6, 11), y: 5.6 },
];
export let data4 = [
    { x: new Date(2020, 6, 11), y: 8.2 }, { x: new Date(2019, 6, 11), y: 7.3 }, { x: new Date(2018, 6, 11), y: 7.8 },
    { x: new Date(2017, 6, 11), y: 6.8 }, { x: new Date(2016, 6, 11), y: 5.0 }, { x: new Date(2015, 6, 11), y: 5.5 },
    { x: new Date(2014, 6, 11), y: 6.5 }, { x: new Date(2013, 6, 11), y: 6.8 }, { x: new Date(2012, 6, 11), y: 6.6 },
];
export let data5 = [
    { x: new Date(2020, 6, 11), y: 9.3 }, { x: new Date(2019, 6, 11), y: 7.8 }, { x: new Date(2018, 6, 11), y: 6.2 },
    { x: new Date(2017, 6, 11), y: 5.3 }, { x: new Date(2016, 6, 11), y: 4.8 }, { x: new Date(2015, 6, 11), y: 4.9 },
    { x: new Date(2014, 6, 11), y: 4.4 }, { x: new Date(2013, 6, 11), y: 2.6 }, { x: new Date(2012, 6, 11), y: 2.3 },
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
         .charts {
             align :center
         }`;
export class Line extends SampleBase<{}, {}>{
    render() {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">
                    <ChartComponent
                        id="charts"
                        style={{ textAlign: 'center' }}
                        primaryXAxis={{
                            valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 },
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Million Metric Tons', rangePadding: 'None', minimum: 0, maximum: 20, interval: 4, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }}
                        legendSettings={{enableHighlight: true}}
                        width={Browser.isDevice ? '100%' : '75%'}
                        title="Crude Steel Production Annual Growth"
                        loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, DateTime, Legend, Tooltip,Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={data2} xName="x" yName="y" name="Vietnam" width={2}
                                marker={{ visible: true, width: 7, height: 7, shape: 'Circle', isFilled: true }}
                                type="Line"
                            ></SeriesDirective>
                            <SeriesDirective
                                dataSource={data1} xName="x" yName="y" name="Canada" width={2}
                                marker={{ visible: true, width: 6, height: 6, shape: 'Triangle', isFilled: true }}
                                type="Line"
                            ></SeriesDirective>
                            <SeriesDirective
                                dataSource={data3} xName="x" yName="y" name="Malaysia" width={2}
                                marker={{ visible: true, width: 7, height: 7, shape: 'Diamond', isFilled: true }}
                                type="Line"
                            ></SeriesDirective>
                            <SeriesDirective
                                dataSource={data4} xName="x" yName="y" name="Egypt" width={2}
                                marker={{ visible: true, width: 5, height: 5, shape: 'Rectangle', isFilled: true }}
                                type="Line"
                            ></SeriesDirective>
                            <SeriesDirective
                                dataSource={data5} xName="x" yName="y" name="Indonesia" width={2}
                                marker={{ visible: true, width: 7, height: 7, shape: 'Pentagon', isFilled: true }}
                                type="Line"
                            ></SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React Line Chart example represents the crude steel production annual growth data with default line series in the chart. 
                Data points are enhanced with marker and tooltip.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the line type charts. Line type charts are used to represent time-dependent data, showing trends in data at equal intervals.
                     You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the line. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                  </p>
                    <p>
                    Tooltips are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                  </p> <br>
                    </br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject
                         <code>LineSeries</code> module into <code>services</code>.
                   </p>
                    <p>
                        More information on the line series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/line">documentation section</a>.
                   </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };    
}
