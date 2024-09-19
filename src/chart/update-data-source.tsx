/**
 * Sample for Update DataSource.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, ILoadedEventArgs, ColumnSeries, DataLabel, Category, Series, IPointRenderEventArgs, IAxisRangeCalculatedEventArgs, MarkerSettingsModel
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
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

const data: Object[] = [
    { x: 'Jewellery', y: 20 },
    { x: 'Shoes', y: 15 },
    { x: 'Footwear', y: 13 },
    { x: 'Pet Services', y: 23 },
    { x: 'Business Clothing', y: 10 },
    { x: 'Office Supplies', y: 8 },
    { x: 'Food', y: 11 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class UpdateDataSource extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='UpdateData' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', labelStyle: { size: Browser.isDevice ? '11px' : '12px' }, majorGridLines: { width: 0 } }} primaryYAxis={{
                        title: 'Sales in percentage', labelFormat: '{value}%', interval: 10,  lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                    }}
                        chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title='Sales by product' pointRender = {pointRender} axisRangeCalculated= {this.axisRangeCalculated.bind(this)} >
                        <Inject services={[ColumnSeries, DataLabel, Category]} />
                        <SeriesCollectionDirective >
                            <SeriesDirective dataSource={data} xName='x' yName='y' type='Column' cornerRadius={{ topLeft: Browser.isDevice ? 10 : 15, topRight: Browser.isDevice ? 10 : 15 }} columnWidth= {0.5}  marker={this.marker}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how the data source for the chart can dynamically change with random values.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a column chart displaying data for sales, with each entry featuring the product name and the corresponding sales percentage. Additionally, the chart can dynamically update with random values.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use the column series, we need to inject the
                        <code>ColumnSeries</code> module using <code>Chart.Inject(ColumnSeries)</code> method.
                    </p>
                    <p>
                        More information on the column series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column"  aria-label="Navigate to the documentation for Column Chart in React Chart control">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public marker: MarkerSettingsModel =  {visible: false, dataLabel: {visible: true, position: 'Top', format: '{value}%', font: { color: '#ffffff' }}};
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        setInterval(function () {
            const newData = data.map((item: { x: string, y: number }) => {
                const min: number = 10;
                const max: number = 90;
                const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
                return { x: item.x, y: value };
            });
            if (args.chart.series.length > 0) {
                args.chart.series[0].setData(newData);
            }
        }, 2500);
    };

    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum > 100 ? 100 : args.maximum;
            if (args.maximum > 90) {
                args.interval = 20
            }
        }
    }
}
