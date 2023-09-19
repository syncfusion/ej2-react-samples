/**
 * Sample for Line Series with dashed line
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, AnnotationDirective, ILoadedEventArgs, AnnotationsDirective, Inject, ChartAnnotation, LineSeries, Crosshair, Category, Tooltip, Highlight, ChartTheme } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [
    { x: 'Jan', y: 100 },
    { x: 'Feb', y: 110 },
    { x: 'Mar', y: 125 },
    { x: 'Apr', y: 150 },
    { x: 'May', y: 140 },
    { x: 'Jun', y: 160 },
];
export let data2 = [
    { x: 'Jun', y: 160 },
    { x: 'Jul', y: 170 },
    { x: 'Aug', y: 180 },
    { x: 'Sep', y: 190 },
    { x: 'Oct', y: 200 },
    { x: 'Nov', y: 230 },
    { x: 'Dec', y: 270 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #charts_Series_1 {
        stroke-dasharray: 10px 10px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 1s linear infinite;
        animation: dash 1s linear infinite;
    }
 
    #charts_Series_0_Point_3_Symbol {
        -webkit-animation: opac 1s ease-out infinite;
        animation: opac 1s ease-out infinite;
    }
 
    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }
 
    @keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }

    @keyframes opac {
        0% {
            stroke-opacity: 1;
            stroke-width: 0px;
        }
        100% {
            stroke-opacity: 0;
            stroke-width: 10px;
        }
    }`;
const DashedLine = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [content, setContent] = useState<string>("<div>Actual</div>");
    const [content1, setContent1] = useState<string>("<div>Forecast</div>");

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    const load = (args: ILoadedEventArgs): void => {
        let annotationColor = 'light';
        args.chart.annotations[0].content = '<div style="color:black; font-weight:bold;">Actual</div>';
        args.chart.annotations[1].content = '<div style="color:black; font-weight:bold;">Forecast</div>';
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
        if (selectedTheme === 'highcontrast' || selectedTheme.indexOf('dark') > -1) {
            args.chart.annotations[0].content = '<div style="color:white; font-weight:bold;">Actual</div>';
            args.chart.annotations[1].content = '<div style="color:white; font-weight:bold;">Forecast</div>';
        }
        if (selectedTheme && selectedTheme.indexOf('fabric-dark') > -1) {
            annotationColor = 'dark'
        } else if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            annotationColor = 'light'
        } else if (selectedTheme === 'material-dark') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'material') {
            annotationColor = 'light'
        } else if (selectedTheme === 'bootstrap5-dark') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'bootstrap5') {
            annotationColor = 'light'
        } else if (selectedTheme === 'bootstrap-dark') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'bootstrap') {
            annotationColor = 'light'
        } else if (selectedTheme === 'highcontrast') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'fluent-dark') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'fluent') {
            annotationColor = 'light'
        } else if (selectedTheme === 'tailwind-dark') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'tailwind') {
            annotationColor = 'light'
        } else if (selectedTheme === 'material3-dark') {
            annotationColor = 'dark'
        } else if (selectedTheme === 'material3') {
            annotationColor = 'light'
        } else {
            annotationColor = 'light'
        }

        if (annotationColor == 'light') {
            setContent('<div style="color:black; font-weight:bold;">Actual</div>');
            setContent1('<div style="color:black; font-weight:bold;">Forecast</div>');
        }
        else {
            setContent('<div style="color:whitesmoke; font-weight:bold;">Actual</div>');
            setContent1('<div style="color:whitesmoke; font-weight:bold;">Forecast</div>');
        }
    };

    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: {width : 0}, minorTickLines: {width: 0} }} load={load.bind(this)} primaryYAxis={{ labelFormat: '{value}k', rangePadding: 'None', lineStyle: { width: 0 }, minimum: 0, maximum: 300, interval: 50, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true, format: '${point.x} : <b>${point.y}</b>', header: '<b>Fruits Production</b>' }} legendSettings={{ enableHighlight: true }} crosshair={{ enable: false, line: { color: 'rgba(204,214,235,0.25)', width: Browser.isDevice ? 50 : 20}, lineType: 'Vertical' }} width={Browser.isDevice ? '100%' : '75%'} title="Fruits Production Statistics" loaded={onChartLoad.bind(this)}>
                    <Inject services={[ LineSeries, Category, Tooltip, Crosshair, ChartAnnotation, Highlight ]}/>
                    <AnnotationsDirective>
                        <AnnotationDirective content={content} region="Series" x="15%" y="55%"></AnnotationDirective>
                        <AnnotationDirective content={content1} region="Series" x="65%" y="30%"></AnnotationDirective>
                    </AnnotationsDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName="x" yName="y" width={2} marker={{ visible: false, width: 7, height: 7 }} type="Line"></SeriesDirective>
                        <SeriesDirective dataSource={data2} xName="x" yName="y" width={2} marker={{ visible: false, width: 7, height: 7, shape: 'Diamond'}} dashArray='10' type="Line"></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the rate of fruit production statistics with default line series and dash array in the chart. Dashed lines are animated by using CSS animation.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you will see how to render and configure the line chart. Line charts are used to represent time-dependent data, showing trends in data at equal intervals.
                    You can use <code>DashArray</code>, <code>Width</code>, <code>Fill</code> properties to customize the line.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example.To see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject
                    <code>LineSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the line series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#line-charts">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default DashedLine;
