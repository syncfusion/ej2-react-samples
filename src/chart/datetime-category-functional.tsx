/**
 * Sample for smart axis labels
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, IPointRenderEventArgs, ChartTheme, ILoadedEventArgs, DateTimeCategory, ColumnSeries, Inject, AnnotationDirective, AnnotationsDirective, DataLabel, ChartAnnotation, StripLine } from '@syncfusion/ej2-react-charts';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
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
export let data1: any[] = [
    { x: new Date(2017, 11, 20), y: 21, DataLabelMappingName:"21M" }, { x: new Date(2017, 11, 21), y: 24, DataLabelMappingName: "24M" },
    { x: new Date(2017, 11, 22), y: 24, DataLabelMappingName: "24M" }, { x: new Date(2017, 11, 26), y: 70,  DataLabelMappingName: "70M" },
    { x: new Date(2017, 11, 27), y: 75, DataLabelMappingName: "75M" }, { x: new Date(2018, 0, 2), y: 82, DataLabelMappingName: "82M" },
    { x: new Date(2018, 0, 3), y: 53, DataLabelMappingName: "53M" }, { x: new Date(2018, 0, 4), y: 54,  DataLabelMappingName: "54M" },
    { x: new Date(2018, 0, 5), y: 53, DataLabelMappingName: "53M"}, { x: new Date(2018, 0, 8), y: 45, DataLabelMappingName: "45M" }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const DatetimeCategoryAxis = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTimeCategory', intervalType: 'Days', skeleton: 'Ed', majorGridLines: { width: 0 }, stripLines: [ { visible: true, start: new Date(2017, 11, 20), end: new Date(2017, 11, 27), color: 'skyblue', opacity: 0.5, }, { visible: true, start: new Date(2018, 0, 2), end: new Date(2018, 0, 8), color: 'pink', opacity: 0.5 }, ], title: 'Business Days', labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45 : 0 }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}M', rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} load={load.bind(this)} title="Sales Comparison of a Product" loaded={onChartLoad.bind(this)} legendSettings={{ visible: false }} width={Browser.isDevice ? '100%' : '75%'} tooltip={{ enable: false }}>
                        <Inject services={[DateTimeCategory, ColumnSeries, Tooltip, ChartAnnotation, StripLine, DataLabel]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div style="color:#FF0000;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>' x={new Date(2017, 11, 22)} y={90} coordinateUnits='Point' />
                            <AnnotationDirective content='<div style="color:#FF0000;font-family: bold; font-weight: 800">New Year Offer<br> Jan 2018</div>' x={new Date(2018, 0, 4)} y={90} coordinateUnits='Point' />
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name="Product" type='Column' marker={{ dataLabel: { visible: true, enableRotation: Browser.isDevice ? true : false, angle : -90, position: 'Top', name: 'DataLabelMappingName' } }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows the date-time category axis with sample data about the sales of a product on different business days.</p>
            </div>
            <div id="description">
                <p>
                    The date-time category axis is used to display date-time values with nonlinear intervals. For example, business days alone can be depicted here in a week. To use a date-time category axis, set the <code>ValueType</code> in axis to <b>DateTimeCategory</b>.
                </p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. For datetime category axis, you should inject <code>DateTimeCategory</code> module by using <code>Chart.Inject(DateTimeCategory)</code>method.
                </p>
                <p>
                    More information on the date time category can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/date-time-axis/#datetimecategory-axis" aria-label="Navigate to the documentation for Date Time Category Axis in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default DatetimeCategoryAxis;
