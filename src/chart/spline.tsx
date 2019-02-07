/**
 * Sample for Spline series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, AnnotationsDirective, AnnotationDirective, ChartAnnotation,
    Legend, Category, SplineSeries, Tooltip, ILoadedEventArgs, ChartTheme, IAnimationCompleteEventArgs
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: 'Sun', y: 15 }, { x: 'Mon', y: 22 },
    { x: 'Tue', y: 32 },
    { x: 'Wed', y: 31 },
    { x: 'Thu', y: 29 }, { x: 'Fri', y: 24 },
    { x: 'Sat', y: 18 },
];
export let data2: any[] = [
    { x: 'Sun', y: 10 }, { x: 'Mon', y: 18 },
    { x: 'Tue', y: 28 },
    { x: 'Wed', y: 28 },
    { x: 'Thu', y: 26 }, { x: 'Fri', y: 20 },
    { x: 'Sat', y: 15 }
];
export let data3: any[] = [
    { x: 'Sun', y: 2 }, { x: 'Mon', y: 12 },
    { x: 'Tue', y: 22 },
    { x: 'Wed', y: 23 },
    { x: 'Thu', y: 19 }, { x: 'Fri', y: 13 },
    { x: 'Sat', y: 8 },
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #charts_Series_0_Point_2_Symbol {
        -webkit-animation: opac 1s ease-out infinite;
        animation: opac 1s ease-out infinite;
    }

    #charts_Series_2_Point_0_Symbol {
        -webkit-animation: opac 1s ease-out infinite;
        animation: opac 1s ease-in-out infinite;
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

export class Spline extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} ref={charts => this.chartInstance = charts}
                        primaryXAxis={{
                            valueType: 'Category',
                            interval: 1, majorGridLines: { width: 0 },
                            labelIntersectAction: 'Rotate90'
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            labelFormat: '{value}°C',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        tooltip={{ enable: true }}
                        title='NC Weather Report - 2016' loaded={this.onChartLoad.bind(this)}
                        animationComplete={this.animationComplete.bind(this)}>
                        <Inject services={[SplineSeries, Legend, Category, Tooltip, ChartAnnotation]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="chart_cloud"><img src="src/chart/images/cloud.png" style={{width: "41px"; height: "41px"}} /></div>' x='Sun' y={2} coordinateUnits='Point' verticalAlignment='Top'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="chart_cloud"><img src="src/chart/images/sunny.png"   style={{width: "41px"; height: "41px"}}/></div>' x='Tue' y={33} coordinateUnits='Point' verticalAlignment='Top'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Max Temp'
                                type='Spline'
                                marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' width={2} name='Avg Temp'
                                type='Spline'
                                marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' width={2} name='Min Temp'
                                type='Spline'
                                marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.worldweatheronline.com/mooresville-weather/north-carolina/us.aspx" target="_blank">www.worldweatheronline.com</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the NC weather report for the year 2016 with default spline series in the chart.
                Low and high temperature of the year are indicated by using annotation.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the spline type charts. Spline chart connects each point in series through a curved line.
                       You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the spline. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject
                        <code>SplineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the spline series can be found in this &nbsp;
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
    public animationComplete(args: IAnimationCompleteEventArgs): void {
        this.chartInstance.removeSvg();
        this.chartInstance.animateSeries = false;
        this.chartInstance['renderElements']();
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}