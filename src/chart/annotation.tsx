import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StackingColumnSeries, Category, Legend, ILoadedEventArgs, Selection, IMouseEventArgs, IAccLoadedEventArgs,
    ChartAnnotation, AccumulationChart, AccumulationDataLabel, IAnimationCompleteEventArgs, AccumulationTheme, ChartTheme,
    AnnotationsDirective, AnnotationDirective, Series
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
AccumulationChart.Inject(AccumulationDataLabel);


const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Sample for annotation
 */
export function getValue(series: Series[], pointIndex: number, y: number): string {
    let totalValue: number = 0;
    for (let ser of series) {
        totalValue += ser.points[pointIndex].y as number;
    }
    return (Math.round((y / totalValue) * 100)) + '%';
}
export class Annotation extends SampleBase<{}, {}> {

    private chart: ChartComponent;
    private pie: AccumulationChart;
    private isRender: boolean = false;
    private dataSource: Object = [
        { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
        { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
        { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
        { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
    ];
    private pieDataSource: Object[] = [
        { x: 'UK', y: 51, text: '22%' }, { x: 'Germany', y: 77, text: '34%' },
        { x: 'France', y: 66, text: '29%' }, { x: 'Italy', y: 34, text: '15%' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' ref={chart => this.chart = chart} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            title: 'Years', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 1 },
                            minorTickLines: { width: 1 }, interval: 1, labelIntersectAction: 'Rotate45',
                        }}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            title: 'Sales', lineStyle: { width: 0 },
                            minimum: 0, maximum: 700, interval: 100,
                            majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
                            minorTickLines: { width: 0 }, labelFormat: '{value}B',
                            majorTickLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        loaded={this.loaded.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}
                        animationComplete={this.onChartLoad.bind(this)}
                        chartMouseUp={this.chartMouseUp.bind(this)}
                        selectionMode='Cluster'
                        selectedDataIndexes={[{ series: 0, point: 0 }]}
                        legendSettings={{ visible: true, toggleVisibility: false }}
                        title="Mobile Game Market by Country">
                        <Inject services={[StackingColumnSeries, Category, Legend, Selection, ChartAnnotation]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="chart_annotation" style="width: 200px; height: 200px"></div>' x='20%' y='25%' coordinateUnits='Pixel' region='Series'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={this.dataSource} type='StackingColumn' xName='x' yName='y0' name='UK' >
                            </SeriesDirective>
                            <SeriesDirective dataSource={this.dataSource} type='StackingColumn' xName='x' yName='y1' name='Germany' >
                            </SeriesDirective>
                            <SeriesDirective dataSource={this.dataSource} type='StackingColumn' xName='x' yName='y2' name='France' >
                            </SeriesDirective>
                            <SeriesDirective dataSource={this.dataSource} type='StackingColumn' xName='x' yName='y3' name='Italy' >
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates annotation feature in chart. Accumulation chart is placed in cartesian chart by using annotation.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure annotation feature in chart. We have used a pie chart to depict the sales for each year using annotation support,
                        while selecting a particular year from the StackedColumn series, the respective data's are showed in pie. An annotation can hold any html element as its content, here we have added the Pie chart as its content.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use annotation feature in chart, we need to inject
                        <code>ChartAnnotation</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the chart annotation can be found in this
                       <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-chartAnnotation.html">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
        this.isRender = true;
        this.pie = new AccumulationChart({
            background: 'transparent',
            series: [{
                radius: '65%', animation: { enable: false },
                dataSource: this.pieDataSource,
                xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' }, name: 'text' },
            }],
            load: (args: IAccLoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as AccumulationTheme;
            },
            legendSettings: { visible: false }
        });
        this.pie.appendTo('#chart_annotation');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
    public loaded(args: ILoadedEventArgs): void {
        if (this.isRender) {
            this.pie.destroy();
            this.pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: this.pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' }, name: 'text' },
                }],
                load: (args: IAccLoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as AccumulationTheme;
                },
                legendSettings: { visible: false }
            });
            this.pie.appendTo('#chart_annotation');
        }
    };

    public chartMouseUp(args: IMouseEventArgs): void {
        if (args.target.indexOf('Point') > -1) {
            let pointIndex: number = parseInt(args.target[args.target.length - 1], 10);
            this.pieDataSource = [];
            for (let series of this.chart.visibleSeries) {
                let value: number = series.points[pointIndex].y as number;
                this.pieDataSource.push({
                    'x': series.name, 'y': value, 'text': getValue(this.chart.visibleSeries, pointIndex, value)
                });
            }
            this.pie.series[0].dataSource = this.pieDataSource;
            this.pie.series[0].xName = 'x';
            this.pie.series[0].yName = 'y';
            this.pie.refresh();
        }
    };

}