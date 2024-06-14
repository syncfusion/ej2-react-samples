/**
 * Sample for smart axis labels
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, IPointRenderEventArgs, ChartTheme,
    ILoadedEventArgs, DateTimeCategory, ColumnSeries, Inject, AnnotationDirective, AnnotationsDirective,
    ChartAnnotation, StripLine
} from '@syncfusion/ej2-react-charts';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    let selectedTheme: string = location.hash.split('/')[1];
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    } else {
        args.fill = materialColors[args.point.index];
    }
};

export let data1: any[] = [{ x: new Date(2017, 11, 20), y: 21 }, { x: new Date(2017, 11, 21), y: 24 },
{ x: new Date(2017, 11, 22), y: 24 }, { x: new Date(2017, 11, 26), y: 70 },
{ x: new Date(2017, 11, 27), y: 75 }, { x: new Date(2018, 0, 2), y: 82 },
{ x: new Date(2018, 0, 3), y: 53 }, { x: new Date(2018, 0, 4), y: 54 },
{ x: new Date(2018, 0, 5), y: 53 }, { x: new Date(2018, 0, 8), y: 45 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class DatetimeCategoryAxis extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div>
                        <ChartComponent id='charts' style={{ textAlign: "center" }}
                            primaryXAxis={{
                                valueType: 'DateTimeCategory',
                                intervalType: 'Days',
                                skeleton: 'Ed',
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 },
                                stripLines: [
                                    { visible: true, start: new Date(2017, 11, 20), end: new Date(2017, 11, 27), color: 'skyblue', opacity: 0.5, },
                                    { visible: true, start: new Date(2018, 0, 2), end: new Date(2018, 0, 8), color: 'pink', opacity: 0.5 },
                                ],
                                title: 'Business Days'
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                labelFormat: '{value}M',
                                rangePadding: 'None',
                                minimum: 0,
                                maximum: 100,
                                interval: 20,
                                lineStyle: { width: 0 },
                                majorTickLines: { width: 0 },
                                minorTickLines: { width: 0 },
                            }}
                            load={this.load.bind(this)}
                            title="Sales Comparison of a Product"
                            loaded={this.onChartLoad.bind(this)}
                            legendSettings={{ visible: false }}
                            width={Browser.isDevice ? '100%' : '75%'}
                            tooltip={{ enable: true }}>
                            <Inject services={[DateTimeCategory, ColumnSeries, Tooltip, ChartAnnotation, StripLine]} />
                            <AnnotationsDirective>
                            <AnnotationDirective content='<div style="color:#FF0000;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>'
                    x =  { new Date(2017, 11, 22) }  y = { 90 } coordinateUnits='Point'>
                </AnnotationDirective>
                <AnnotationDirective content='<div style="color:#FF0000;font-family: bold; font-weight: 800">New Year Offer<br> Jan 2018</div>'
                    x =  { new Date(2018, 0, 4) } y= { 90 } coordinateUnits='Point'>
                </AnnotationDirective>
                </AnnotationsDirective>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name="Product" type='Column'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates sales of a product in business days.
                Data points in this sample are enhanced with tooltip.
            </p>

                </div>
                <div id="description">
                    <p>
                        In this sample, you can see how to render and configure the date time category axis.
        Date time category axis is used to represent only business days in datetime axis.
    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices.
            </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. For datetime category axis, you should inject
                <code>DateTimeCategory</code> module by using
                <code>Chart.Inject(DateTimeCategory)</code>method.
            </p>
                    <p>
                        More information on the date time category can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/date-time-axis/#datetimecategory-axis" aria-label="Navigate to the documentation for Date Time Category Axis in React Chart component">documentation section</a>.
                </p>
                </div>
            </div >
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
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;    };
  }
      