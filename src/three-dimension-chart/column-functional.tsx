/**
 * Sample for Column series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, ChartTheme, Legend3D, Category3D, Tooltip3D, ColumnSeries3D, Chart3DLoadedEventArgs, Highlight3D, Chart3DAxisLabelRenderEventArgs , Chart3DPointRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwindColors, pointTailwindDarkColors } from './theme-color';

export let pointRender: EmitType<Chart3DPointRenderEventArgs> = (args: Chart3DPointRenderEventArgs): void => {
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
    }
};
export let data1 = [{ x: 'Tesla', y: 137429 },{ x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 } ];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Column = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: Chart3DLoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const labelRender = (args: Chart3DAxisLabelRenderEventArgs ) => {
        if (args.axis.name === 'primaryYAxis') {
            let value = Number(args.text) / 1000;
            args.text = (typeof value === 'number' && !isNaN(value)) ? String(value) + 'k' : args.text;
        }
    };
    const load = (args: Chart3DLoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }} axisLabelRender={labelRender.bind(this)} legendSettings={{ enableHighlight: true, visible: false }} primaryXAxis={{
                    valueType: 'Category',
                    labelRotation: -45,
                    labelPlacement: 'BetweenTicks'
                }}
                    wallColor='transparent'
                    height="400"
                    pointRender={pointRender.bind(this)}
                    primaryYAxis={{
                        maximum: 150000, interval: 30000
                    }} load={load.bind(this)} enableRotation={true} rotation={7} tilt={10} depth={100} tooltip={{ enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' }} width={Browser.isDevice ? '100%' : '75%'} title='Top Selling Electric Cars in China' loaded={onChartLoad.bind(this)} >
                    <Inject services={[ColumnSeries3D, Legend3D, Tooltip3D, Category3D, Highlight3D]} />
                    <Chart3DSeriesCollectionDirective >
                        <Chart3DSeriesDirective dataSource={data1} xName='x' columnSpacing={0.1} yName='y' type='Column'>
                        </Chart3DSeriesDirective>
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the top-selling electric car in China using the default column series in the 3D chart. Data points are enhanced with tooltips.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a 3D column chart. The 3D column chart serves the purpose of comparing the frequency, count, total, or average of data across different categories.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    3D chart component features are segregated into individual feature-wise modules. To use column series, we need to inject <code>ColumnSeries3D</code> module into <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default Column;
