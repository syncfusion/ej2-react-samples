/**
 * Sample for multiple axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, SeriesDirective, Inject,
    LineSeries, ChartAnnotation, ColumnSeries, AnnotationsDirective, AnnotationDirective,
    Category, Tooltip, ILoadedEventArgs, ChartTheme, IAnimationCompleteEventArgs, SplineSeries
}
    from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
    { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
    { x: 'Sat', y: 50 }
];
export let data2: any[] = [
    { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
    { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
    { x: 'Sat', y: 34 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class MultipleAxis extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} ref={charts=>this.chartInstance=charts} primaryXAxis={{ valueType: 'Category', minorGridLines: { width : 0}, majorGridLines: { width: 0 } }} primaryYAxis={{ minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, labelFormat: '{value}°F', majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} legendSettings={{ visible: false }} title='Weather Data' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true }}>
                        <Inject services={[LineSeries, ColumnSeries, Category, Tooltip, SplineSeries, ChartAnnotation]} />
                        <AxesDirective>
                            <AxisDirective majorGridLines={{ width: 0 }} rowIndex={0} opposedPosition={true} lineStyle={{ width: 0 }} minimum={24} maximum={36} interval={2} majorTickLines={{ width: 0 }} name='yAxis1' labelFormat='{value}°C' />
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="chart_cloud"><img src="src/chart/images/cloud.png" alt="Cloud Picture" style={{width: "41px"; height: "41px"}}/></div>' x='Sun' y={62} coordinateUnits='Point' verticalAlignment='Top' />
                            <AnnotationDirective content='<div id="chart_cloud"><img src="src/chart/images/sunny.png" alt="Sunny Picture" style={{width: "41px"; height: "41px"}}/></div>' x='Sat' y={35} coordinateUnits='Point' yAxisName='yAxis1' />
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Germany' type='Column'   marker={{ visible: true, width: 7, height: 7 }} />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Japan' type='Spline' marker={{ visible: true, width: 7, height: 7, isFilled: true }} yAxisName='yAxis1' width={2} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This example shows how to use a chart's multiple axes to depict temperatures in both Celsius and Fahrenheit.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure multiple axes. Use an <code>Axes</code> collection to render a secondary axis in the chart that can be bound to a specific series using <code>YAxisName</code> and <code>XAxisName</code> properties in the series. You can also customize the secondary axis similar to the primary axis.
                    </p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p>
                        More information on the multiple axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/axis-customization/#multiple-axis" aria-label="Navigate to the documentation for Multiple Axis in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
    public animationComplete(args: IAnimationCompleteEventArgs): void {
        this.chartInstance.removeSvg();
        this.chartInstance.animateSeries = false;
        this.chartInstance['renderElements']();
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}