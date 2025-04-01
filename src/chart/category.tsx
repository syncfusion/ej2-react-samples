/**
 * Sample for Category Axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, ChartTheme, Legend, Tooltip, BarSeries, Category, IPointRenderEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, pointRenderEvent } from './theme-color';
import { SampleBase } from '../common/sample-base';

export let categoryData: Object[] = [
    { x: 'Facebook', y: 3049, country: 'Facebook: 3049' },
    { x: 'YouTube', y: 2491, country: 'YouTube: 2491' },
    { x: 'WhatsApp', y: 2000, country: 'WhatsApp: 2000' },
    { x: 'Instagram', y: 2000, country: 'Instagram: 2000' },
    { x: 'TikTok', y: 1562, country: 'TikTok:  1562' },
    { x: 'WeChat', y: 1336, country: 'WeChat: 1336' },
    { x: 'Facebook Messenger', y: 979, country: 'Facebook Messenger: 979' },
    { x: 'Telegram', y: 800, country: 'Telegram:  800' },
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Category sample
 */
export class CategoryAxis extends SampleBase<{}, {}> {


    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', enableWrap: true, maximumLabelWidth: 50, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, }} primaryYAxis={{ labelFormat: '{value}M', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} title='Active Users of Largest Social Networking Services (January 2024)' subTitle='Source: wikipedia.org' pointRender={this.pointRender.bind(this)} loaded={this.onChartLoad.bind(this)} tooltip={{ enable: false, format: '${point.tooltip}' }}>
                        <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={categoryData} xName='x' yName='y' type='Bar' width={2} tooltipMappingName='country' marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff', size: Browser.isDevice ? '9px' : '11px' } } }} name='Users' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample shows a category axis in a chart with details about internet users across different countries.</p>
                </div>
                <div id="description">
                    <p>
                        You can use the category axis to represent string values instead of numbers in the chart. To use the category axis, set <code>ValueType</code> in axis to <b>Category</b>.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Category axis, we need to inject <code>Category</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Category axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/category-axis/" aria-label="Navigate to the documentation for Category Axis in React Chart component">documentation section</a>.
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

    public pointRender(args: IPointRenderEventArgs): void {
        pointRenderEvent(args);
    };

}