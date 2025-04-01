/**
 * Sample for Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Legend, Tooltip, ILoadedEventArgs, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export let columnData: Object[] = [
    { country: 'Chile', walnuts: 175000, almonds: 11300 },
    { country: 'European Union', walnuts: 140000, almonds: 135000 },
    { country: 'Turkey', walnuts: 67000, almonds: 24000 },
    { country: 'India', walnuts: 33000, almonds: 4200 },
    { country: 'Australia', walnuts: 12000, almonds: 154000 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Column extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ title: 'Metric Tons', interval: 40000, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} legendSettings={{ visible: true, enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} tooltip={{ enable: true, header: '<b>${point.x}</b>', format: '${series.name}: <b>${point.y}</b>', enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} title='Walnuts and Almonds Estimated Production for 2023' subTitle='Source: fas.usda.gov' loaded={this.onChartLoad.bind(this)} load={this.load.bind(this)} axisLabelRender={this.axisLabelRender.bind(this)} tooltipRender={this.tooltipRender.bind(this)}>
                        <Inject services={[ColumnSeries, Category, Legend, Tooltip]} />
                        <SeriesCollectionDirective >
                            <SeriesDirective dataSource={columnData} xName='country' yName='walnuts' name='Walnuts' type='Column' cornerRadius={{ topLeft: 4, topRight: 4 }} columnSpacing={0.4} legendShape='Rectangle' />
                            <SeriesDirective dataSource={columnData} xName='country' yName='almonds' name='Almonds' type='Column' cornerRadius={{ topLeft: 4, topRight: 4 }} columnSpacing={0.4} legendShape='Rectangle' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This React column chart example visualizes the production of Walnuts and Almonds for different countries in 2023.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories.
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject <code>ColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column" aria-label="Navigate to the documentation for Column Chart in React Chart component">documentation section</a>.
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
    public axisLabelRender (args: IAxisLabelRenderEventArgs): void {
        const value: number = parseInt(args.text.replace(/,/g, ''), 10);
        if (value >= 1000) {
            args.text = value / 1000 + 'K';
        }
    };
    public tooltipRender (args: ITooltipRenderEventArgs): void {
        if (args.text) {
            let value: string = args.point.y.toLocaleString('en-US');
            args.text = `${args.series.name}: <b>${value}</b>`;
        }
    };

}
