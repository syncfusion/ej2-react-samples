/**
 * Sample for column series with rounded corner
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, Category, BarSeries, DataLabel, Tooltip, IPointRenderEventArgs, ITooltipRenderEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { roundedPointRender } from './theme-color';
import { loadChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export let roundedColumnData: Object[] = [
    { x: 'Healthcare', y: 0.9, text: '0.9%' },
    { x: 'Real Estate', y: 1.3, text: '1.3%' },
    { x: 'Energy', y: 2.3, text: '2.3%' },
    { x: Browser.isDevice ? 'Consumer <br> Staples' : 'Consumer Staples', y: 12.0, text: '12.0%' },
    { x: 'Industrials', y: 15.6, text: '15.6%' },
    { x: 'Utilities', y: 19.6, text: '19.6%' },
    { x: Browser.isDevice ? 'S&P <br> 500 Average' : 'S&P 500 Average', y: 23.3, text: '23.3%' },
    { x: 'Financials', y: 28.4, text: '28.4%' },
    { x: Browser.isDevice ? 'Consumer <br> Discretionary' : 'Consumer Discretionary', y: 29.1, text: '29.1%' },
    { x: Browser.isDevice ? 'Information <br> Technology' : 'Information Technology', y: 35.7, text: '35.7%' },
    { x: Browser.isDevice ? 'Communication <br> Services' : 'Communication Services', y: 38.9, text: '38.9%' }
];

export class RoundedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts2' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelPosition: 'Outside', labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45' }} primaryYAxis={{ minimum: 0, maximum: 50, title: 'Sector-wise Growth (%)', labelFormat: '{value}%', interval: 10, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, opposedPosition: true }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} title='Top Performing Market Sectors by Growth Rate (2024)' subTitle='Source: visualcapitalist.com' titleStyle={{ position: 'Bottom' }} loaded={this.loaded.bind(this)} legendSettings={{ visible: false }} width={Browser.isDevice ? '100%' : '77%'} tooltip={{ enable: true, header: Browser.isDevice ? "" : "<b>${point.x}</b>", format: "Growth Rate : <b>${point.text}</b>" }} pointRender={this.pointRender.bind(this)} height='500px'>
                        <Inject services={[BarSeries, DataLabel, Category, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective xName='x' yName='y' columnWidth={0.5} dataSource={roundedColumnData} type='Bar' marker={{ dataLabel: { visible: true, name: 'text', enableRotation: false, angle: -90, font: { fontWeight: '600' } } }} cornerRadius={{ bottomLeft: Browser.isDevice ? 8 : 10, bottomRight: Browser.isDevice ? 8 : 10, topLeft: Browser.isDevice ? 8 : 10, topRight: Browser.isDevice ? 8 : 10 }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample showcases a bar chart with rounded corners, illustrating the anticipated growth rates across various sectors in 2024.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the bar chart. The bar chart is similar to the column chart, but the orientation of the y-axis is horizontal rather than vertical. You can use the <code>cornerRadius</code> option to customize the horizontal rectangle, resulting in a rounded bar.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject <code>BarSeries</code> module into <code>services</code>
                    </p>
                    <p>
                        More information on the bar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar" aria-label="Navigate to the documentation for Bar Chart in React Chart Component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public loaded(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts2');
        chart.setAttribute('title', '');
    };

    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };

    public pointRender(args: IPointRenderEventArgs): void {
        roundedPointRender(args);
    };
}