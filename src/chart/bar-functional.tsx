/**
 * Sample for the Bar Series
 */
import * as React from "react";
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, BarSeries, Category, Legend, Tooltip, Highlight, ILoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export let appleData: Object[] = [
    { year: '2021', count: 237 },
    { year: '2022', count: 226.4 },
    { year: '2023', count: 234.6 }
];

export let xiaomiData: Object[] = [
    { year: '2021', count: 190 },
    { year: '2022', count: 153.1 },
    { year: '2023', count: 145.9 }
];

export let oppoData: Object[] = [
    { year: '2021', count: 143 },
    { year: '2022', count: 103.3 },
    { year: '2023', count: 103.1 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Bar = () => {
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
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}M', title: 'Units Sold (in Millions)', maximum: 300, edgeLabelPlacement: 'Shift', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title='Global Smartphone Sales Trends by Brand (2021-2023)' subTitle='Source: wikipedia.org' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true, header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}</b>' }}>
                        <Inject services={[BarSeries, DataLabel, Category, Legend, Tooltip, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={appleData} xName='year' yName='count' type='Bar' columnSpacing={0.3} name="Apple" cornerRadius={{ bottomRight: 4, topRight: 4 }} legendShape='Rectangle' />
                            <SeriesDirective dataSource={xiaomiData} xName='year' yName='count' type='Bar' columnSpacing={0.3} name='Xiaomi' cornerRadius={{ bottomRight: 4, topRight: 4 }} legendShape='Rectangle' />
                            <SeriesDirective dataSource={oppoData} xName='year' yName='count' type='Bar' columnSpacing={0.3} name='Oppo' cornerRadius={{ bottomRight: 4, topRight: 4 }} legendShape='Rectangle' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the global smartphone sales trends by brand from 2021 to 2023 using a bar chart. The data is visualized with bars representing unit sales for different brands, highlighting the comparative performance of each brand over the years.
                </p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the bar chart. The bar chart is similar to the column chart, but the orientation of the y-axis is horizontal rather than vertical.</p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject <code>BarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the bar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar" aria-label="Navigate to the documentation for Bar Chart in ASP.NET Core Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default Bar;
