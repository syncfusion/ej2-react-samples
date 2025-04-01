/**
 * Sample for Column Series with disabled side by side placement
 */
import * as React from "react";
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, DataLabel, Tooltip, Legend, ILoadedEventArgs, IAxisLabelRenderEventArgs, ISharedTooltipRenderEventArgs, IResizeEventArgs } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
  
export let totalData: Object[] = [
    { country: 'India', population: 1450935791 },
    { country: 'China', population: 1419321278 },
    { country: 'USA', population: 345426571 },
    { country: 'Indonesia', population: 283487931 },
    { country: 'Pakistan', population: 251269164 }
];
  
export let maleData: Object[] = [
    { country: 'India', male: 748323427 },
    { country: 'China', male: 723023723 },
    { country: 'USA', male: 173551527 },
    { country: 'Indonesia', male: 142407931 },
    { country: 'Pakistan', male: 127433405 }
];
  
export let femaleData: Object[] = [
    { country: 'India', female: 702612364 },
    { country: 'China', female: 696297555 },
    { country: 'USA', female: 171875044 },
    { country: 'Indonesia', female: 141080014 },
    { country: 'Pakistan', female: 123835758 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const ColumnPlacemen = () =>  {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = loadChartTheme(args);
        if (selectedTheme.indexOf('Dark') !== -1 || selectedTheme.indexOf('HighContrast') !== -1) {
            args.chart.legendSettings.border = { width: 2, color: '#FFFFFF' };
        } else {
            args.chart.legendSettings.border = { width: 2, color: '#000000' };
        }
    };

    const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => { 
        const value: number = parseInt(args.text.replace(/,/g, ''), 10);
        if (value >= 1_000_000) {
            args.text = (value / 1_000_000).toFixed(0) + 'M';
        }
    };
    const sharedTooltipRender = (args: ISharedTooltipRenderEventArgs) => {
        if (args.text && args.point && args.series) {
            for (let i: number = 0; i < args.point.length; i++) {
                if (args.point[i] && args.point[i].y !== undefined) {
                    let formattedValue: string = (args.point[i].y as number).toLocaleString('en-US');
                    let seriesName: string = args.series[i] ? args.series[i].name : `Series ${i + 1}`;
                    args.text[i] = `${seriesName}: <b>${formattedValue}</b>`;
                }
            }
        }
    };

    const resize = (args: IResizeEventArgs): void => {
        const maxWidth: number = args.chart.availableSize.width;
        args.chart.legendSettings.location.x = maxWidth - 115;
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category',  majorTickLines: {width : 0}, minorTickLines: {width: 0}, interval: 1, majorGridLines: { width: 0 }, labelRotation: Browser.isDevice ? -45 : 0 }} primaryYAxis={{ majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Inhabitants (Millions)', interval: 300000000 }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} enableSideBySidePlacement={false} title='Population Distribution of the Top 5 Most Populous Countries (2024)' subTitle='Source: statisticstimes.com' tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: true, shapeWidth: 9, shapeHeight: 9, maximumColumns: 1, position: 'Custom', location: { x: 750, y: 80 } }} load={load.bind(this)} loaded={onChartLoad.bind(this)} axisLabelRender={axisLabelRender.bind(this)} sharedTooltipRender={sharedTooltipRender.bind(this)} resized={resize.bind(this)}>
                    <Inject services={[ColumnSeries, DataLabel, Category, Tooltip, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={totalData} xName='country' yName='population' name='Total' type='Column' columnWidth={0.5} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'/>
                        <SeriesDirective dataSource={maleData} xName='country' yName='male' name='Male' type='Column' columnWidth={0.3} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'/>
                        <SeriesDirective dataSource={femaleData} xName='country' yName='female' name='Female' type='Column' columnWidth={0.2} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows three series of columns in which each column is rendered with a different width and placed behind the previous column.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories. The <code>EnableSideBySidePlacement</code> property is used to enable and disable side-by-side positioning. DataLabel is used to present details about individual data points.
                </p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject <code>ColumnSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the column series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts" aria-label="Navigate to the documentation for Column Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default ColumnPlacemen;
