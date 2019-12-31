/**
 * Sample for Annotation in Chart
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, AnnotationsDirective, AnnotationDirective, StackingColumnSeries, Category, Legend, Selection, ChartAnnotation, AccumulationChart, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
AccumulationChart.Inject(AccumulationChart, AccumulationDataLabel);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export let dataSource = [
    { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
    { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
    { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
    { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
];
export let pieDataSource = [
    { x: 'UK', y: 111 }, { x: 'Germany', y: 76 },
    { x: 'France', y: 66 }, { x: 'Italy', y: 34 }
];
export class PieAnnotation extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' ref={chart => this.chart = chart} style={{ textAlign: "center" }} primaryXAxis={{ title: 'Years', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 1 }, minorTickLines: { width: 1 }, interval: 1, labelIntersectAction: 'Rotate45', }} primaryYAxis={{ title: 'Sales', lineStyle: { width: 0 }, minimum: 0, maximum: 700, interval: 100, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}B', majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} chartMouseUp={this.chartMouseUp.bind(this)} animationComplete={this.animationComplete.bind(this)} loaded={this.onChartLoad.bind(this)} title='Mobile Game Market by Country' selectionMode='Cluster' selectedDataIndexes={[{ series: 0, point: 0 }]} legendSettings={{ visible: false }} width={Browser.isDevice ? '100%' : '60%'} tooltip={{ enable: true, shared: true }}>
                        <Inject services={[StackingColumnSeries, Category, Legend, Selection, ChartAnnotation]}/>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="chart_annotation" style={{width:"200px"; height:"200px"}}></div>' x='20%' y='25%' coordinateUnits='Pixel' region='Series'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dataSource} xName='x' yName='y0' width={2} name='UK' type='StackingColumn'></SeriesDirective>
                            <SeriesDirective dataSource={dataSource} xName='x' yName='y1' width={2} name='Germany' type='StackingColumn'></SeriesDirective>
                            <SeriesDirective dataSource={dataSource} xName='x' yName='y2' width={2} name='France' type='StackingColumn'></SeriesDirective>
                            <SeriesDirective dataSource={dataSource} xName='x' yName='y3' width={2} name='Italy  ' type='StackingColumn'></SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates annotation feature in chart. Accumulation chart is placed in cartesian chart by using annotation.
    </p>
                </div>
                <div id="description"><p>
                    In this example, you can see how to render and configure annotation feature in chart. We have used a pie chart to depict
                the sales for each year using annotation support, while selecting a particular year from the StackedColumn series,
                the respective data's are showed in pie. An annotation can hold any html element as its content, here we have added
                the Pie chart as its content.
            </p>
                    <br />
                    <p style={{ "font-weight": 500 }}>Injecting Module</p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To annotation feature in chart, we need to
                inject
                <code>ChartAnnotation</code> module into <code>services</code>.
            </p>
                    <p>
                        More information on the chart annotation can be found in this
                <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-chartAnnotation.html">documentation section</a>.
            </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        if (this.isRender) {
            this.pie.destroy();
            this.pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                        radius: '65%', animation: { enable: false },
                        dataSource: pieDataSource,
                        xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                    }],
                load: (args) => {
                    let selectedTheme = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                },
                legendSettings: { visible: false }
            });
            this.pie.appendTo('#chart_annotation');
        }
    }
    ;
    chartMouseUp(args) {
        if (args.target.indexOf('Point') > -1 && args.target.indexOf('annotation') === -1) {
            let pointIndex = parseInt(args.target[args.target.length - 1], 10);
            pieDataSource = [];
            for (let series of this.chart.visibleSeries) {
                pieDataSource.push({ 'x': series.name, 'y': series.points[pointIndex].y });
            }
            this.pie.series[0].dataSource = pieDataSource;
            this.pie.series[0].xName = 'x';
            this.pie.series[0].yName = 'y';
            this.pie.refresh();
        }
    }
    animationComplete(args) {
        this.isRender = true;
        let selectedTheme = location.hash.split('/')[1];
        this.pie = new AccumulationChart({
            background: 'transparent',
            series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                }],
            legendSettings: { visible: false },
            theme: (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)),
            resized: (args) => {
                location.reload();
            }
        });
        this.pie.appendTo('#chart_annotation');
    }
}
