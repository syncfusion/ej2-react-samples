/**
 * Sample for the StackingBar Series 
 */
import * as React from "react";
import { useEffect, useRef } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingBarSeries, Tooltip, ILoadedEventArgs, Highlight, DataLabel, ILegendClickEventArgs } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

export let data1: Object[] = [
    { x: '2020', y: 466 },
    { x: '2021', y: 656 },
    { x: '2022', y: 763 },
    { x: '2023', y: 886 }
];
export let data2: Object[] = [
    { x: '2020', y: 261 },
    { x: '2021', y: 327 },
    { x: '2022', y: 427 },
    { x: '2023', y: 584 }
];
export let data3: Object[] = [
    { x: '2020', y: 1355 },
    { x: '2021', y: 1340 },
    { x: '2022', y: 1352 },
    { x: '2023', y: 1286 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedBar = () => {
    let chartInstance: React.RefObject<ChartComponent> = useRef<ChartComponent>(null);
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
    const onLegendClick = (args: ILegendClickEventArgs) => {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }

        if (args.series.index === 2) {
            if (!args.series.visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' ref={chartInstance} style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} primaryYAxis={{ maximum: 3500, labelFormat: '{value}TWh', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} load={load.bind(this)} title='Annual Renewable Energy Generation in China (2020–2023) by Source' subTitle='Source: wikipedia.org' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true, header:'<b>Renewable Energy Generation</b>', format: '${series.name} : <b>${point.y}</b>' }} legendClick={onLegendClick.bind(this)} stackLabels={{ visible: true, format: '{value}TWh' }}>
                    <Inject services={[StackingBarSeries, Category, Legend, Tooltip, Highlight, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' border={{ width: 1, color: "white" }} columnWidth={0.6} name='Wind' type='StackingBar' marker={{ dataLabel: { visible: true } }} legendShape='Rectangle' />
                        <SeriesDirective dataSource={data2} xName='x' yName='y' border={{ width: 1, color: "white" }} columnWidth={0.6} name='Solar' type='StackingBar' marker={{ dataLabel: { visible: true } }} legendShape='Rectangle' />
                        <SeriesDirective dataSource={data3} xName='x' yName='y' border={{ width: 1, color: "white" }} columnWidth={0.6} name='Hydro' type='StackingBar' marker={{ dataLabel: { visible: true } }} cornerRadius={{ bottomRight: 4, topRight: 4 }} legendShape='Rectangle' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates a React stacked bar chart that illustrates renewable energy generation in China from 2020 to 2023, segmented by wind, solar, and hydro sources. The legend in the sample shows more information about the series.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the stacked bar chart. The stacked bar chart stacks points in the series horizontally. You can also use the <code>stackingGroup</code> property to group stacked collections based on category.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking bar series, we need to inject <code>StackingBarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the stacked bar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-bar" aria-label="Navigate to the documentation for Stacked Bar Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default StackedBar;