/**
 * Sample for Update DataSource.
 */
import * as React from "react";
import { useEffect, useState} from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Category, ColumnSeries, ILoadedEventArgs, Series, DataLabel, IPointRenderEventArgs, IAxisRangeCalculatedEventArgs, MarkerSettingsModel } from '@syncfusion/ej2-react-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const data3: Object[] = [
    { x: 'Jewellery', y: 75 },
    { x: 'Shoes', y: 45 },
    { x: 'Footwear', y: 73 },
    { x: 'Pet Services', y: 53 },
    { x: 'Business Clothing', y: 85},
    { x: 'Office Supplies', y: 68 },
    { x: 'Food', y: 45 }
];
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluent2Colors, fluent2HighContrastColors, pointTailwindColors, pointTailwindDarkColors, pointTailwind3Colors, pointTailwind3DarkColors } from './theme-color';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2') {
        args.fill = fluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
        args.fill = fluent2HighContrastColors[args.point.index % 10];
    } 
    else if (selectedTheme === 'tailwind') {
        args.fill = pointTailwindColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind-dark') {
        args.fill = pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = pointTailwind3Colors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind3-dark') {
        args.fill = pointTailwind3DarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
}; 

const UpdateDataSource = () => {
    let[intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    useEffect(() => {
        updateSampleSection();
        return () => {
            clearIntervalFn();
        };
    }, [])

    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        clearIntervalFn();
        intervalId = setInterval(function () {
            var container = document.getElementById('UpdateData');
            if (container && container.id === args.chart.element.id) {
                const newData = data3.map((item: { x: string, y: number }) => {
                    const min: number = 10;
                    const max: number = 90;
                    const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
                    return { x: item.x, y: value };
                });
                if (args.chart.series.length > 0) {
                    (args.chart.series[0] as Series).setData(newData, 500);
                }
            }
            else {
                clearIntervalFn();
            }
        }, 1500);
        if (intervalId) setIntervalId(intervalId);
    };
    const marker:MarkerSettingsModel = {visible: false, dataLabel: {visible: true, position: 'Top', format: '{value}%', font: { color: '#ffffff' }}};
    const clearIntervalFn = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    const axisRangeCalculated = (args: IAxisRangeCalculatedEventArgs): void => {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum > 100 ? 100 : args.maximum;
            if (args.maximum > 80) {
                args.interval = 20;
            } else if(args.maximum > 40){
                args.interval = 10;
            }
        }
    }
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='UpdateData' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', labelStyle: { size: Browser.isDevice ? '11px' : '12px' }, majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate90' }} primaryYAxis={{
                    title: 'Sales (in percentage)', labelFormat: '{value}%', interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0, maximum: 100
                }}
                    chartArea={{ border: { width: 0 } }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title='Sales by product' pointRender={pointRender} axisRangeCalculated={axisRangeCalculated.bind(this)} >
                    <Inject services={[ColumnSeries, DataLabel, Category]} />
                    <SeriesCollectionDirective >
                        <SeriesDirective dataSource={data3} xName='x' yName='y' type='Column' cornerRadius={{ topLeft: Browser.isDevice ? 10 : 15, topRight: Browser.isDevice ? 10 : 15 }} columnWidth={0.5} marker={marker}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how the data source for the chart can dynamically update with random values at a set interval.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a column chart that displays sales data, with each entry featuring the product name and the corresponding sales percentage. Additionally, the chart can dynamically update with random values using the <code>setData</code> method.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use the column series, we need to inject the <code>ColumnSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the column series can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column"  aria-label="Navigate to the documentation for Column Chart in React Chart control">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default UpdateDataSource;
