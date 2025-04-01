/**
 * Sample for 100 percent Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip, ILoadedEventArgs, Highlight, ILegendClickEventArgs, ITooltipRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { loadChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 24300000 },
        { x: '2022', y: 26300000 },
        { x: '2023', y: 25400000 },
        { x: '2024', y: 25000000 }
    ] :
    [
        { x: '2019', y: 28500000 },
        { x: '2020', y: 27500000 },
        { x: '2021', y: 24300000 },
        { x: '2022', y: 26300000 },
        { x: '2023', y: 25400000 },
        { x: '2024', y: 25000000 }
    ];
export let data2: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 26700000 },
        { x: '2022', y: 30800000 },
        { x: '2023', y: 27400000 },
        { x: '2024', y: 31000000 }
    ] :
    [
        { x: '2019', y: 26900000 },
        { x: '2020', y: 29300000 },
        { x: '2021', y: 26700000 },
        { x: '2022', y: 30800000 },
        { x: '2023', y: 27400000 },
        { x: '2024', y: 31000000 }
    ];
export let data3: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 17500000 },
        { x: '2022', y: 14500000 },
        { x: '2023', y: 12100000 },
        { x: '2024', y: 14400000 }
    ] :
    [
        { x: '2019', y: 19900000 },
        { x: '2020', y: 14600000 },
        { x: '2021', y: 17500000 },
        { x: '2022', y: 14500000 },
        { x: '2023', y: 12100000 },
        { x: '2024', y: 14400000 }
    ];
export let data4: Object[] = Browser.isDevice ?
    [
        { x: '2021', y: 10800000 },
        { x: '2022', y: 11700000 },
        { x: '2023', y: 14600000 },
        { x: '2024', y: 17000000 }
    ] :
    [
        { x: '2019', y: 13000000 },
        { x: '2020', y: 13800000 },
        { x: '2021', y: 10800000 },
        { x: '2022', y: 11700000 },
        { x: '2023', y: 14600000 },
        { x: '2024', y: 17000000 }
    ];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedColumn100 extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }} primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, labelIntersectAction: 'Rotate45', valueType: 'Category' }} primaryYAxis={{ lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, interval: 20 }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} load={this.load.bind(this)} title={Browser.isDevice ? 'Global Cotton Production by Country (2021–2024)' : 'Global Cotton Production by Country (2019–2024)'} subTitle='Source: fas.usda.gov' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true, header: '<b>${point.x}</b>' }} legendClick={this.onLegendClick.bind(this)} tooltipRender={this.tooltipRender.bind(this)}>
                        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='India' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn100' legendShape='Rectangle' />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='China' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn100' legendShape='Rectangle' />
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='United States' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn100' legendShape='Rectangle' />
                            <SeriesDirective dataSource={data4} xName='x' yName='y' name='Brazil' columnWidth={0.4} border={{ width: 1, color: "white" }} type='StackingColumn100' cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This React 100% stacked column chart example visualizes global cotton production trends by depicting the contributions of various countries over multiple years. Each stacked column represents a countries proportionate production for a given year, summing to a total of 100% per year. The legend in the sample provides information about the series.
                    </p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure the 100% stacked column chart. The 100% stacked column chart displays multiple series of data as stacked columns, ensuring that the cumulative proportion of each stacked element always totals 100%.</p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use 100% stacking column series, we need to inject <code>StackingColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the 100% stacking column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-column" aria-label="Navigate to the documentation for 100% Stacked Column Chart in React Chart component">documentation section</a>.
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

    public onLegendClick(args: ILegendClickEventArgs): void {
        if (args.series.index === 0) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[2].visible) {
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
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else if (args.chart.series[2].visible) {
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
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            } else if (!args.series.visible) {
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

        if (args.series.index === 3) {
            if (!args.series.visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            }
        }
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text) {
            let value: string = args.point.y.toLocaleString('en-US');
            args.text = `${args.series.name}: <b>${value}M (${args.point.percentage}%)</b>`;
        }
    };

}