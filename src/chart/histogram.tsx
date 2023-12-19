/**
 * Sample for Histogram series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel, HistogramSeries
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let chartData: Object[] = [];
let points: number[] = [5.250, 7.750, 0, 8.275, 9.750, 7.750, 8.275, 6.250, 5.750,
        5.250, 23.000, 26.500, 27.750, 25.025, 26.500, 26.500, 28.025, 29.250, 26.750, 27.250,
        26.250, 25.250, 34.500, 25.625, 25.500, 26.625, 36.275, 36.250, 26.875, 40.000, 43.000,
        46.500, 47.750, 45.025, 56.500, 56.500, 58.025, 59.250, 56.750, 57.250,
        46.250, 55.250, 44.500, 45.525, 55.500, 46.625, 46.275, 56.250, 46.875, 43.000,
        46.250, 55.250, 44.500, 45.425, 55.500, 56.625, 46.275, 56.250, 46.875, 43.000,
        46.250, 55.250, 44.500, 45.425, 55.500, 46.625, 56.275, 46.250, 56.875, 41.000, 63.000,
        66.500, 67.750, 65.025, 66.500, 76.500, 78.025, 79.250, 76.750, 77.250,
        66.250, 75.250, 74.500, 65.625, 75.500, 76.625, 76.275, 66.250, 66.875, 80.000, 85.250,
        87.750, 89.000, 88.275, 89.750, 97.750, 98.275, 96.250, 95.750, 95.250
    ];
    points.map((value: number) => {
        chartData.push({
            y: value
        });
    });
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Histogram extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} load={this.load.bind(this)} primaryXAxis={{ majorGridLines: { width: 0 }, title: 'Score of Final Examination', minimum: 0, maximum: 100, edgeLabelPlacement: 'Shift' }} primaryYAxis={{ title: 'Number of Students', minimum: 0, maximum: 50, interval: 10, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, header: " " }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: false }} title='Examination Result' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[HistogramSeries, Legend, Tooltip, Category, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} yName='y' name='Score' type='Histogram' marker={{ visible: true, height: 7, width: 7, dataLabel: { visible: true, position: 'Top', font: {color: '#ffffff', fontWeight: "600"} } }} showNormalDistribution={true} columnWidth={0.99} binInterval={20} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This React Histogram Chart example visualizes final examination results. The number of students between each interval is shown in data labels.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure the histogram chart. The histogram chart is a bar (column) chart used for frequency distribution in which the widths of the bars are proportional to classes into which variables have been divided and the heights of the bars are proportional to class frequencies. The DataLabel property is used to present details on individual data points.</p>
                    <p>
                        Tooltip is enabled in this example.
                        To see the tooltip in action, hover the mouse over a point or tap a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules.
                        To use histogram series, you should inject the <code>HistogramSeries</code> module using the <code>Chart.Inject(HistogramSeries)</code> method.
                    </p>
                    <p>
                        More information on the histogram series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/other-types/#histogram-series">documentation section</a>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
         if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.font.color = '#000000';
          }
    };
        
}
