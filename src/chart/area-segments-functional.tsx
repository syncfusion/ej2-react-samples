/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip, ILoadedEventArgs, ChartTheme, AnnotationsDirective, AnnotationDirective, DateTime, MultiColoredAreaSeries, ChartAnnotation, SegmentsDirective, SegmentDirective } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let dataValues = [];
[150, 71.5, 106.4, 100.25, 70.0, 106.0, 85.6, 78.5, 76.4, 86.1, 155.6, 160.4,].map((value, index) => {
    dataValues.push({ XValue: new Date(2016, index, 1), YValue: value });
});
let content = "<div style='color:#4ca1af; font-weight:bold; font-size: 14px;'>Winter</div>";
let content1 = "<div style='color:#ffa751; font-weight:bold; font-size: 14px;'>Summer</div>";
let content2 = "<div style='color:#1d976c; font-weight:bold; font-size: 14px;'>Spring</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #control-container {
        padding: 0px !important;
    }

    #control-container {
        padding: 0px !important;
    }

    #winter stop {
        stop-color: #4ca1af;
    }

    #winter stop[offset="0"] {
        stop-color: #c4e0e5;
    }

    #winter stop[offset="1"] {
        stop-color: #4ca1af;
    }

    #summer stop {
        stop-color: #ffa751;
    }

    #summer stop[offset="0"] {
        stop-color: #ffe259;
    }

    #summer stop[offset="1"] {
        stop-color: #ffa751;
    }

    #spring stop {
        stop-color: #1d976c;
    }

    #spring stop[offset="0"] {
        stop-color: #93f9b9;
    }

    #spring stop[offset="1"] {
        stop-color: #1d976c;
    }`;
/**
 * Area empty sample
 */
const AreaMultiColored = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'DateTime',  majorTickLines: {width : 0}, minorTickLines: {width: 0}, labelFormat: 'MMM', intervalType: 'Months',   majorGridLines: { width: 0 }, interval: 1, labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice? 'None' : 'Trim' }} primaryYAxis={{ labelFormat: '${value}K', rangePadding: 'None', minimum: 0, maximum: 200, interval: 50, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} tooltip={{ enable: true, shared: true, header: '<b>Revenue</b>', format: '${point.x} : <b>${point.y}</b>' }} legendSettings={{ visible: false }} chartArea={{ border: { width: 0 } }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title="US Season Retail Sales Growth" loaded={onChartLoad.bind(this)}>
                    <Inject services={[MultiColoredAreaSeries, DateTime, Tooltip, ChartAnnotation,]} />
                    <AnnotationsDirective>
                        <AnnotationDirective content={content} region="Series" x="18%" y="43%"></AnnotationDirective>
                        <AnnotationDirective content={content1} region="Series" x="46%" y="43%"></AnnotationDirective>
                        <AnnotationDirective content={content2} region="Series" x="90%" y="18%"></AnnotationDirective>
                    </AnnotationsDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={dataValues} xName="XValue" yName="YValue" name="US" type="MultiColoredArea" segmentAxis="X">
                            <SegmentsDirective>
                                <SegmentDirective value={new Date(2016, 4, 1)} color="url(#winter)"></SegmentDirective>
                                <SegmentDirective value={new Date(2016, 8, 1)} color="url(#summer)"></SegmentDirective>
                                <SegmentDirective color="url(#spring)"></SegmentDirective>
                            </SegmentsDirective>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <svg style={{ height: 0 }}>
                <defs>
                    <linearGradient id="winter" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="summer" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="spring" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                </defs>
            </svg>
            <div id="action-description">
                <p>This sample visualizes the data on US season retail sales growth using a multi-colored area series in the chart. Data points are enhanced with segments and tooltips.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the points in a particular range by using <code>MultiColoredArea</code> series.
                    Points within the range can be configured with <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/chartSegment/#color" aria-label="Navigate to the color property reference for React Chart component">color</a> property in chart segment.
                </p>
                <p>
                    The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/tooltip/" aria-label="Navigate to the tooltip property reference for React Chart component">tooltip</a> is enabled in this example. To see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject <code>MultiColoredAreaSeries</code> module using <code>Chart.Inject(MultiColoredAreaSeries)</code> method.
                </p>
                <p>
                    More information on the area series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#area-charts" aria-label="Navigate to the documentation for Multicolored Area Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default AreaMultiColored;