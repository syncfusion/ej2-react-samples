/**
 * Sample for Range Area Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective,Highlight, DateTime, SeriesDirective, Inject, Category, SplineRangeAreaSeries, ILoadedEventArgs, ChartTheme, Tooltip, Legend
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;
export class SplineRangeArea extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }}
                        load={this.load.bind(this)}
                        primaryXAxis={{    valueType: 'DateTime',
                        labelFormat: 'dd MMM',
                        edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide',
                        majorGridLines: { width: 0 } }}
                        primaryYAxis={{   labelFormat: '{value}˚C',
                        lineStyle: { width: 0 },
                        minimum: -10,
                        maximum: 25,
                        interval: 5,
                        majorTickLines: { width: 0 } }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }}
                        legendSettings={{ visible: true, enableHighlight: true }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        title='Monthly Temperature Range'
                        loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[SplineRangeAreaSeries, Category, DateTime, Tooltip, Legend, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartDataValues} border={{ width: 2 }} xName='x' high='high' opacity={0.7}
                                marker={{ visible: false }} low='low' animation={{ enable: true }} name='England' type='SplineRangeArea'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                 </div>
                <div id="action-description">
                    <p>
                        This sample shows the monthly difference in temperature between two different countries using the spline range area series in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the spline range area type chart.
                        You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the spline range area.
                        <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module:</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use SplineRangeArea series, we need to inject
                        <code>SplineRangeAreaSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the spline range area series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline-range-area" aria-label="Navigate to the documentation for Spline Range Area Chart in React Chart component">documentation section</a>.
                    </p>
                </div>
             </div>
         )
     }
     public onChartLoad(args: ILoadedEventArgs): void {
         let chart: Element = document.getElementById('charts');
         chart.setAttribute('title', '');
     };
 
     public load(args: ILoadedEventArgs): void {
         let selectedTheme: string = location.hash.split('/')[1];
         selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
         args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
     };
 }
 