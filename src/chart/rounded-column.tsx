/**
 * Sample for column series with rounded corner
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs,
    StackingColumnSeries, LineSeries, Category, ColumnSeries, Legend, DataLabel,
    Tooltip, IPointRenderEventArgs, ITooltipRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { fabricColors, bootstrapColors, materialColors, highContrastColors } from './theme-color';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export let data1: any[] = [
    { x: 'BGD', y: 106, text: 'Bangaladesh' },
    { x: 'BTN', y: 103, text: 'Bhutn' },
    { x: 'NPL', y: 198, text: 'Nepal' },
    { x: 'THA', y: 189, text: 'Thiland' },
    { x: 'MYS', y: 250, text: 'Malaysia' }
];
export let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
export let tooltipRender: EmitType<ITooltipRenderEventArgs> = (args: ITooltipRenderEventArgs) => {
    let tooltip: string = args.text;
    if (tooltip.indexOf('BGD') > -1) {
        tooltip = tooltip.replace('BGD', 'Bangladesh');
    } else if (tooltip.indexOf('BTN') > -1) {
        tooltip = tooltip.replace('BTN', 'Bhutan');
    } else if (tooltip.indexOf('NPL') > -1) {
        tooltip = tooltip.replace('NPL', 'Nepal');
    } else if (tooltip.indexOf('THA') > -1) {
        tooltip = tooltip.replace('THA', 'Thailand');
    } else {
        tooltip = tooltip.replace('MYS', 'Malaysia');
    }
    args.text = tooltip;
};
export class RoundedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, tickPosition: 'Inside',
                        labelPosition:'Inside', labelStyle: { color: '#ffffff' } }}
                        primaryYAxis={{ minimum: 0, maximum: 300, interval: 50, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Tiger Population - 2016'
                        loaded={this.onChartLoad.bind(this)}
                        legendSettings={{ visible: false }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        tooltip={{ enable: true }}
                        pointRender={labelRender}
                        tooltipRender={tooltipRender}
                    >
                        <Inject services={[ColumnSeries, DataLabel, Category, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} type='Column' xName='x' width={2} yName='y' name='Tiger'
                                cornerRadius={{ bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10 }}
                                marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                     <div style={{ float: 'right', marginRight: '10px' }}>Source:
				<a href="https://blogs.scientificamerican.com/extinction-countdown/tiger-populations-increasing/" target="_blank">blogs.scientificamerican.com</a>
                    </div>
                     </div>
                <div id="action-description">
                <p>
                This sample illustrates a rounded column series. Data points values are showed by using data label.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the column type charts with rounded corner. Column type charts are used for comparing
        the frequency, count, total or average of data in different categories. You can use <code>border</code>,
        <code>fill</code> properties to customize the vertical rectangle. <code>dataLabel</code> is used to represent individual
        data and its value.
    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
    </p>
                    <br />
                    <p style={{ "font-weight": 500 }}>Injecting Module</p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
        <code>ColumnSeries</code> module into <code>services</code>
    </p>
                    <p>
                        More information on the column series can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}