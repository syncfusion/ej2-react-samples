/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip, ILoadedEventArgs, ChartTheme,
    AnnotationsDirective, AnnotationDirective, DateTime, MultiColoredLineSeries, ChartAnnotation, SegmentsDirective, SegmentDirective,Highlight
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let dataValues = [];
[
    380, 410, 310, 540, 510, 330, 490, 470, 472, 460, 550, 420, 380, 430, 385,
    520, 580, 420, 350, 505, 535, 410, 204, 400, 415, 408, 415, 350, 375, 500,
    390, 450, 440, 350, 400, 365, 490, 400, 520, 510, 395, 380, 404, 400, 500,
    390, 610, 380, 390, 420, 440, 570, 600, 380, 410, 405, 480, 320, 420, 440,
    320, 280, 320, 400, 390, 460, 470, 490, 420, 480, 410, 420, 580, 410, 380,
    480, 360, 650, 680, 720, 580, 480, 520, 440, 420, 430, 380, 520, 410, 540,
    400, 390, 460, 470, 490, 420, 480, 470, 490, 330, 520, 480, 580, 590, 600,
    310, 480, 500, 400, 508, 480, 460, 700, 705, 480, 410, 480,
].map((value, index) => {
    dataValues.push({ XValue: new Date(1900 + index, 1, 1), YValue: value });
});
let content =
    "<div style='color:green; font-weight:bold; font-size:14px'>Medium</div>";
let content1 =
    "<div style='color:blue; font-weight:bold;font-size:14px'>High</div>";
let content2 =
    "<div style='color:red; font-weight:bold; font-size:14px'>Low</div>";
/**
 * Area empty sample
 */
export class LineZone extends SampleBase<{}, {}> {
    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <ChartComponent
                        id="charts"
                        style={{ textAlign: 'center' }}
                        primaryXAxis={{ valueType: 'DateTime', labelFormat: 'y', intervalType: 'Years', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }}
                        primaryYAxis={{ labelFormat: '{value}mm', rangePadding: 'None', minimum: 200, maximum: 800, interval: 100, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
                        tooltip={{ enable: true, shared: true, enableAnimation: false,header:'<b>Rainfall</b>', format: '${point.x} : <b>${point.y}</b>', }}
                        legendSettings={{ visible: false }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}
                        title="Annual Mean Rainfall in Australia"
                        loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[MultiColoredLineSeries, ChartAnnotation, DateTime, Tooltip, Highlight]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content={content} region="Series" x="25%" y="47%"></AnnotationDirective>
                            <AnnotationDirective content={content1} region="Series" x="68%" y="10%"></AnnotationDirective>
                            <AnnotationDirective content={content2} region="Series" x="91%" y="84%"></AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dataValues} xName="XValue" width={2} yName="YValue" name="Australia" type="MultiColoredLine" segmentAxis="Y">
                                <SegmentsDirective>
                                    <SegmentDirective value={450} color="red"></SegmentDirective>
                                    <SegmentDirective value={500} color="green"></SegmentDirective>
                                    <SegmentDirective color="blue"></SegmentDirective>
                                </SegmentsDirective>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample visualizes the annual mean rainfall in Australia with multi-colored line series in the chart. Data points are enhanced with segments and tooltips.  
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the points in a particular range by using <code>MultiColoredLine</code> series.
                Points under the range can be configured with <code>color</code> and <code>dashArray</code> properties in the ChartSegment.
            </p><br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject
                <code>MultiColoredLineSeries</code> module using
                <code>Chart.Inject(MultiColoredLineSeries)</code> method.
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
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
         if (selectedTheme === 'highcontrast') {
               args.chart.series[0].segments[0].color = '#FF4741';
               args.chart.series[0].segments[1].color = '#00B400';
               args.chart.series[0].segments[2].color = '#3F9BFF';
            }
    };
        
}