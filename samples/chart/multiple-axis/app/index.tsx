/**
 * Sample for multiple axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, SeriesDirective, Inject,
    LineSeries, ChartAnnotation, ColumnSeries, AnnotationsDirective, AnnotationDirective,
    Category, Tooltip, ILoadedEventArgs, ChartTheme, IAnimationCompleteEventArgs
}
    from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

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
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} ref={charts => this.chartInstance = charts}
                        primaryXAxis={{
                            valueType: 'Category',
                            interval: 1,
                            labelIntersectAction: 'Rotate90',
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            minimum: 0, maximum: 100, interval: 20,
                            lineStyle: { width: 0 },
                            labelFormat: '{value}°F'
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        legendSettings={{ visible: false }}
                        title='Weather Condition JPN vs DEU' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}
                        animationComplete={this.animationComplete.bind(this)}>
                        <Inject services={[LineSeries, ColumnSeries, Category, Tooltip, ChartAnnotation]} />
                        <AxesDirective>
                            <AxisDirective majorGridLines={{ width: 0 }}
                                rowIndex={0} opposedPosition={true}
                                lineStyle={{ width: 0 }}
                                minimum={24} maximum={36} interval={2}
                                name='yAxis1'
                                labelFormat='{value}°C'>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="chart_cloud"><img src="http://npmci.syncfusion.com/production/react/demos/src/chart/images/cloud.png"  style={{width: "41px"; height: "41px"}}/></div>'
                                x='Sun' y={35} coordinateUnits='Point' verticalAlignment='Top'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="chart_cloud"><img src="http://npmci.syncfusion.com/production/react/demos/src/chart/images/sunny.png"  style={{width: "41px"; height: "41px"}}/></div>'
                                x='Sat' y={34} coordinateUnits='Point' yAxisName='yAxis1'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Germany' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Japan' type='Line'
                                marker={{
                                    visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
                                }} yAxisName='yAxis1' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
ReactDOM.render(<MultipleAxis />, document.getElementById('sample'));