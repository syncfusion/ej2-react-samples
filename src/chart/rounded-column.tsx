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
    { x: 'Egg', y: 106 },
    { x: 'Fish', y: 103 },
    { x: 'Misc', y: 198 },
    { x: 'Tea', y: 189 },
    { x: 'Fruits', y: 250 }
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

let count: number = 0;
export class RoundedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts2' style={{ textAlign: "center" }}
                        primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, tickPosition: 'Inside',
                        labelPosition:'Inside', labelStyle: { color: '#ffffff' } }}
                        primaryYAxis={{ minimum: 0, maximum: 300, interval: 50, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Trade in Food Groups'
                        loaded={this.onChartLoad.bind(this)}
                        legendSettings={{ visible: false }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        tooltip={{ enable: false }}
                        pointRender={labelRender}
                    >
                        <Inject services={[ColumnSeries, DataLabel, Category, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} type='Column' xName='x' width={2} yName='y' name='Tiger'
                                cornerRadius={{ bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10 }}
                                marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
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
        let chart: Element = document.getElementById('charts2');
        chart.setAttribute('title', '');
        args.chart.loaded = null;
        let columninterval = setInterval(
            () => {
                if (document.getElementById('charts2')) {
                    if (count === 0) {
                        args.chart.series[0].dataSource = [
                            { x: 'Egg', y: 206 },
                            { x: 'Fish', y: 123},
                            { x: 'Misc', y: 48 },
                            { x: 'Tea', y: 240 },
                            { x: 'Fruits', y: 170 }
                        ];
                        args.chart.animate();
                        count++;
                    }
                    else if (count === 1) {
                        args.chart.series[0].dataSource = [
                            { x: 'Egg', y: 86 },
                            { x: 'Fish', y: 173 },
                            { x: 'Misc', y: 188 },
                            { x: 'Tea', y: 109 },
                            { x: 'Fruits', y: 100 }
                        ];
                        args.chart.animate();
                        count++;
                    }
                    else if (count === 2) {
                        args.chart.series[0].dataSource = [
                            { x: 'Egg', y: 156 },
                            { x: 'Fish', y: 33 },
                            { x: 'Misc', y: 260 },
                            { x: 'Tea', y: 200 },
                            { x: 'Fruits', y: 30 }
                        ];
                        args.chart.animate();
                        count = 0;
                    }
                } else {
                    clearInterval(columninterval);
                }
            },
            2000
        );

    };
        // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
   
        // custom code end
}