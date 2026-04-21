/**
 * Sample for Bar series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, BarSeries, Category, Legend, Tooltip, Highlight, ILoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export let chartData: Object[] = [
    { Company: 'Tata Motors',                           Revenue: 52.9  },
    { Company: 'State Bank of India',                   Revenue: 71.8  },
    { Company: 'Oil and Natural Gas Corporation',       Revenue: 77.5  },
    { Company: 'Indian Oil Corporation',                Revenue: 93.8  },
    { Company: 'Life Insurance Corporation of India',   Revenue: 98.0  },
    { Company: 'Reliance Industries',                   Revenue: 108.8 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Bar sample
 */
export class BarWithGradient extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <div>
                        <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ visible: false }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 1 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, edgeLabelPlacement: 'Shift', enableWrap: true, maximumLabelWidth: 100 }} primaryYAxis={{ visible: false }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} width={Browser.isDevice ? '100%' : '90%'} title='Leading Revenue Drivers in India: 2024 Rankings' subTitle='Source: Wikipedia (Forbes 2024) | Revenue in USD Billions' tooltip={{ enable: true, format: '${point.x}: <b>${point.y} B</b>' }}>
                            <Inject services={[BarSeries, DataLabel, Category, Legend, Tooltip, Highlight]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={chartData} xName='Company' yName='Revenue' type='Bar' columnWidth={0.75} columnSpacing={0.25} cornerRadius={{ topLeft: 10, bottomRight: 10, topRight: 10, bottomLeft: 10 }}
                                    linearGradient={{ x1: 0, y1: 0, x2: 1, y2: 0,
                                        gradientColorStop:
                                            [
                                                { color: '#1a9fd4', offset: 0, opacity: 1 },
                                                { color: '#9b4dca', offset: 50, opacity: 1 },
                                                { color: '#f95d8f', offset: 100, opacity: 1 }
                                            ]
                                    }}
                                    marker={{ dataLabel: { visible: true, position: 'Outer', format: '{value} B' } }} />
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This example visualizes the top revenue-generating companies in India for 2024. A horizontal bar chart with a left-to-right color gradient 
                        is used to highlight each company's revenue in USD Billions. Company names appear on the left axis, and revenue values are displayed at the 
                        end of each bar. Companies are ordered by revenue to emphasize ranking and relative contribution. Compare bar lengths to quickly identify the top 
                        contributors among India's leading corporations.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a horizontal bar chart with a linear gradient fill using the
                        <code>linearGradient</code> property of the series. The gradient is applied horizontally from left to right with multiple color stops
                        to create smooth color transitions across all bars, visually emphasizing the revenue comparison.
                    </p>
                    <p>
                        <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a bar or tap on a
                        bar on touch-enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use bar series, inject the
                        <code>BarSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the bar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar" aria-label="Navigate to the documentation for Bar Chart in ASP.NET Core Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }

    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };

    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

}
