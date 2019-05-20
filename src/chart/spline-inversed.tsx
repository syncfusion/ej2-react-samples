/**
 * Sample for Inversed Spline series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, SplineSeries, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: 'Jan', y: -1 }, { x: 'Mar', y: 12 },
    { x: 'Apr', y: 25 },
    { x: 'Jun', y: 31 },
    { x: 'Aug', y: 26 }, { x: 'Oct', y: 14 },
    { x: 'Dec', y: 8 },
];
export let data2: any[] = [
    { x: 'Jan', y: 7 }, { x: 'Mar', y: 2 },
    { x: 'Apr', y: 13 },
    { x: 'Jun', y: 21 },
    { x: 'Aug', y: 26 }, { x: 'Oct', y: 10 },
    { x: 'Dec', y: 0 },
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class SplineInversed extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        isTransposed={true}
                        primaryXAxis={{ valueType: 'Category', interval: 1, labelIntersectAction: 'Rotate90', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{ labelFormat: '{value}°C', majorGridLines: { width: 0 } }}
                        tooltip={{ enable: true, format: '${series.name} (°c) <br>${point.x} : ${point.y}' }}
                        title='Climate Graph - 2012' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[SplineSeries, Category, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='London'
                                type='Spline'
                                marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' width={2} name='France'
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
                This sample illustrates a spline series by inversing X and Y Axis. 
                Data points are enhanced with marker and tooltip.
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
        // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme =(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        // custom code end
}