/**
 * Sample for Category Axis
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, ChartTheme, Legend, Tooltip, BarSeries, Category, IPointRenderEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors, bubbleFabricColors, bubbleMaterialDarkColors, bubbleMaterialColors, bubbleBootstrap5DarkColors, bubbleBootstrapColors, bubbleHighContrastColors, bubbleFluentDarkColors, bubbleFluentColors, bubbleTailwindDarkColors, bubbleTailwindColors, pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, bubbleBootstrap5Colors, pointBootstrap5Colors, pointMaterial3DarkColors, pointMaterial3Colors, fluent2Colors, fluent2DarkColors } from './theme-color';
import { updateSampleSection } from '../common/sample-base';
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = pointFabricColors[args.point.index % 10];;
    } else if (selectedTheme === 'material-dark') {
        args.fill = pointMaterialDarkColors[args.point.index % 10];;
    } else if (selectedTheme === 'material') {
        args.fill = pointMaterialColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = pointBootstrap5DarkColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5') {
        args.fill = pointBootstrap5Colors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap4') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap-dark') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = pointHighContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = pointFluentDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = pointFluentColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind-dark') {
        args.fill = pointTailwindDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind') {
        args.fill = pointTailwindColors[args.point.index % 10];
    } else if (selectedTheme === 'material3-dark') {
        args.fill = pointMaterial3DarkColors[args.point.index % 10];
    } else if (selectedTheme === 'material3') {
        args.fill = pointMaterial3Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2') {
        args.fill = fluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-dark') {
        args.fill = fluent2DarkColors[args.point.index % 10];
    };
}
export let data: any[] = [
    { x: 'Germany', y: 72, country: 'GER: 72' },
    { x: 'Russia', y: 103.1, country: 'RUS: 103.1' },
    { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1' },
    { x: 'India', y: 462.1, country: 'IND: 462.1' },
    { x: 'China', y: 721.4, country: 'CHN:  721.4' },
    { x: 'United States<br>Of America', y: 286.9, country: 'USA: 286.9' },
    { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1' },
    { x: 'Nigeria', y: 97.2, country: 'NGR:  97.2' },
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Category sample
 */
const CategoryAxis = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, enableTrim: false, majorTickLines: {width : 0}, minorTickLines: {width: 0} }} primaryYAxis={{ minimum: 0, maximum: 800, labelFormat: '{value}M', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} title={Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016'} pointRender={pointRender} loaded={onChartLoad.bind(this)} tooltip={{ enable: false, format: '${point.tooltip}' }}>
                    <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y' type='Bar' width={2} tooltipMappingName='country' marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff', size: Browser.isDevice ? '9px' : '11px' } } }} name='Users' />
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                    <a href="http://www.internetworldstats.com/top20.htm" target="_blank" aria-label="Navigate to the documentation for internet world stats">www.internetworldstats.com</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows a category axis in a chart with details about internet users across different countries.</p>
            </div>
            <div id="description">
                <p>
                    You can use the category axis to represent string values instead of numbers in the chart. To use the category axis, set <code>ValueType</code> in axis to <b>Category</b>.
                </p>
                <br></br>
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
export default CategoryAxis;