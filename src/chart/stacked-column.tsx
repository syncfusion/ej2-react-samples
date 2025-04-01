/**
 * Sample for Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip, Highlight, DataLabel, ILoadedEventArgs, ILegendClickEventArgs } from '@syncfusion/ej2-react-charts';
import { loadChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 24.3 },
        { x: '2022', y: 26.3 },
        { x: '2023', y: 25.4 },
        { x: '2024', y: 25 }
    ] :
    [
        { x: '2019', y: 28.5 },
        { x: '2020', y: 27.5 },
        { x: '2021', y: 24.3 },
        { x: '2022', y: 26.3 },
        { x: '2023', y: 25.4 },
        { x: '2024', y: 25 }
    ];
export let data2: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 26.7 },
        { x: '2022', y: 30.8 },
        { x: '2023', y: 27.4 },
        { x: '2024', y: 31 }
    ] :
    [
        { x: '2019', y: 26.9 },
        { x: '2020', y: 29.3 },
        { x: '2021', y: 26.7 },
        { x: '2022', y: 30.8 },
        { x: '2023', y: 27.4 },
        { x: '2024', y: 31 }
    ];
export let data3: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 17.5 },
        { x: '2022', y: 14.5 },
        { x: '2023', y: 12.1 },
        { x: '2024', y: 14.4 }
    ] :
    [
        { x: '2019', y: 19.9 },
        { x: '2020', y: 14.6 },
        { x: '2021', y: 17.5 },
        { x: '2022', y: 14.5 },
        { x: '2023', y: 12.1 },
        { x: '2024', y: 14.4 }
    ];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }} primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, labelIntersectAction: 'Rotate45', valueType: 'Category' }} primaryYAxis={{ title: 'Production (60KG Bags)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}M', interval: 20 }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} load={this.load.bind(this)} title='Global Cotton Production by Country (2018–2023)' subTitle='Source: fas.usda.gov' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true, header: '<b>${point.x}</b>', format: '${series.name} : <b>${point.y}</b>' }} legendClick={this.onLegendClick.bind(this)} stackLabels={{ visible: true, format: '{value}M', font: { size: Browser.isDevice ? '10px' : '12px' } }}>
                        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip, Highlight, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='India' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn' marker={{ dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } } }} legendShape='Rectangle' />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='China' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn' marker={{ dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } } }} legendShape='Rectangle' />
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='United States' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn' cornerRadius={{ topLeft: 4, topRight: 4 }} marker={{ dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } } }} legendShape='Rectangle' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This stacked column chart visualizes global cotton production trends over the years, with data points enhanced by data labels.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a stacked column chart. The stacked column chart stacks points in the series vertically. You can also use the <code>stackingGroup</code> property to group stacked collections based on category. This chart displays data labels for individual points and the total value on top of each stack.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject <code>StackingColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacked column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-column" aria-label="Navigate to the documentation for Stacked Column Chart in React Chart component">documentation section</a>.
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
        loadChartTheme(args);
    };

    public onLegendClick (args: ILegendClickEventArgs): void {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }

        if (args.series.index === 2) {
            if (!args.series.visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
    };

}