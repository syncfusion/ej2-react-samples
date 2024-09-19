/**
 * Sample for Cylindrical Column series
 */
import * as React from 'react';
import { useEffect } from "react";
import { Chart3DComponent, Chart3DLoadedEventArgs, ColumnSeries3D, Category3D, Tooltip3D, ChartTheme, Chart3DSeriesDirective, Chart3DSeriesCollectionDirective, Inject, Chart3DPointRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwindColors, pointTailwindDarkColors, pointFluent2Colors, pointFluent2HighContrastColors } from './theme-color';

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
    } else if (selectedTheme === 'fluent2') {
        args.fill = pointFluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
        args.fill = pointFluent2HighContrastColors[args.point.index % 10];
    }
};
export let data: Object[] = [{ x: 'Italy', y: 10 }, { x: 'Kenya', y: 4 }, { x: 'France', y: 10 }, { x: 'Hungary', y: 0 }, { x: 'Australia', y: 17 }, { x: 'Brazil', y: 7 }, { x: 'Netherlands', y: 10 }, { x: 'Unspecified', y: null }, { x: 'Germany', y: 10 }, { x: 'Serbia', y: 3 }];
const EmptyPoint = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: Chart3DLoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    const load = (args: Chart3DLoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }}
                    title='Olympic Gold Medal Counts - Tokyo 2020'
                    enableRotation={true}
                    rotation={7} tilt={10} depth={100}
                    primaryXAxis={{
                        valueType: 'Category', labelPlacement: 'BetweenTicks', interval: 1, labelRotation: -45
                    }}
                    primaryYAxis={{
                        maximum: 20, interval: 4
                    }}
                    pointRender={pointRender}
                    tooltip={{
                        enable: true, header: '${point.x}', format: 'Gold Medal : <b>${point.y}'
                    }}
                    load={load.bind(this)}
                    loaded={onChartLoad.bind(this)}
                    height='400'
                    wallColor='transparent'
                    width={Browser.isDevice ? '100%' : '75%'}
                >
                    <Inject services={[ColumnSeries3D, Category3D, Tooltip3D]} />
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective
                            dataSource={data} type='Column' xName='x' yName='y' columnSpacing={0.1}>
                        </Chart3DSeriesDirective>
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
            <div id="action-description">
                <p>
                    This example of a 3D column chart visualizes the medal count from the Tokyo Olympics using the default column series in the 3D chart.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a 3D column chart, accommodating null and zero values. The null points represent missing data, while zero is considered a valid value in the 3D chart.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    3D chart component features are segregated into individual feature-wise modules. To use  column series, we need to inject <code>ColumnSeries3D</code> module into <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default EmptyPoint;