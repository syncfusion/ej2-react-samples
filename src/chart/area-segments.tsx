/**
 * Sample for Area series with empty points
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip, AnnotationsDirective, AnnotationDirective,
    DateTime, MultiColoredAreaSeries, ILoadedEventArgs,ChartAnnotation, ChartTheme, SegmentsDirective, SegmentDirective
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let dataValues: Object[] = [];
[150, 71.5, 106.4, 100.25, 70.0, 106.0, 85.6, 78.5, 76.4, 86.1, 155.6, 160.4].map((value: number, index: number) => {
    dataValues.push({ XValue: new Date(2016, index, 1), YValue: value });
});

let content: string = "<div style='width:80px; padding: 5px;'> <table style='width: 100%'>" +
    "<tr><td><div style='width: 10px; height: 10px;background:linear-gradient(#4ca1af, #c4e0e5);border-radius: 15px;'></div>" +
    "</td><td style='padding-left: 5px;'>Winter</td></tr>" +
    "<tr><td><div style='width: 10px; height: 10px; background:linear-gradient(#ffa751, #ffe259);border-radius: 15px;'></div>" +
    "</td><td style='padding-left: 5px;'>Summer</td></tr><tr><td>" +
    "<div style='width: 10px; height: 10px; background:linear-gradient(#1d976c, #93f9b9);border-radius: 15px;'></div>" +
    "</td><td style='padding-left: 5px;'>Spring</td></tr></table></div>";

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
export class AreaMultiColored extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            labelFormat: 'MMM',
                            intervalType: 'Months',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            labelFormat: '${value}K',
                            rangePadding: 'None',
                            minimum: 0,
                            maximum: 200,
                            interval: 50,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        tooltip={{ enable: true }}
                        legendSettings={{ visible: false }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '60%'}
                        title="Organic Revenue in US - 2016" loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[MultiColoredAreaSeries, DateTime, Tooltip, ChartAnnotation]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content={content} region='Series'
                                x='90%' y='12%'></AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dataValues} xName='XValue' yName='YValue' name='US'
                                type='MultiColoredArea' segmentAxis='X'>
                                <SegmentsDirective>
                                    <SegmentDirective value={new Date(2016, 4, 1)}
                                        color='url(#winter)'></SegmentDirective>
                                    <SegmentDirective value={new Date(2016, 8, 1)}
                                        color='url(#summer)'></SegmentDirective>
                                    <SegmentDirective
                                        color='url(#spring)'></SegmentDirective>
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
                    <p>
                    This sample visualizes the organic revenue data with multi colored area series in the chart. 
                    Data points are enhanced with segments and tooltip.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the points in a particular range by using <code>MultiColoredArea</code> series type. 
                    Points under the range can be configured with <code>color</code>, <code>width</code>, and <code>dashArray</code>.
                   </p>
                   <p>
                   Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                    Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject
                    <code>MultiColoredAreaSeries</code> module using
                    <code>Chart.Inject(MultiColoredAreaSeries)</code> method.
                  </p>
                    <p>
                        More information on the area series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
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
        replace(/-dark/i, "Dark") as ChartTheme;
    };
      
}