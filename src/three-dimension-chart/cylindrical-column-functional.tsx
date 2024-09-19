/**
 * Sample for Cylindrical Column series
 */
import * as React from 'react';
import { useEffect } from "react";
import { Chart3DComponent, Chart3DLoadedEventArgs, ColumnSeries3D, Category3D, Tooltip3D, ChartTheme, Chart3DSeriesDirective, Chart3DSeriesCollectionDirective, Inject, Chart3DPointRenderEventArgs, Chart3DAxisLabelRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointMaterial3DarkColors, pointMaterial3Colors, pointFluent2Colors, pointFluent2HighContrastColors } from './theme-color';

export let data: Object[] = [{ x: 'Czechia', y: 1.11 }, { x: 'Spain', y: 1.66 }, { x: 'USA', y: 1.56 }, { x: 'Germany', y: 3.1 }, { x: 'Russia', y: 1.35 }, { x: 'Slovakia', y: 1 }, { x: 'South Korea', y: 3.16 }, { x: 'France', y: 0.92 }];
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
const CylindricalColumn = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: Chart3DLoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const axisLabelRender = (args: Chart3DAxisLabelRenderEventArgs) => {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'M';
        }
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
                    title='Passenger Car Production in Selected Countries – 2021'
                    primaryXAxis={{
                        valueType: 'Category', interval: 1,
                        labelPlacement: 'BetweenTicks',
                        labelRotation: -45
                    }}
                    primaryYAxis={{
                        maximum: 4,
                        interval: 1
                    }}
                    tooltip={{
                        enable: true, header: "${point.x}", format: 'Car Production : <b>${point.y}M'
                    }}
                    rotation={7}
                    tilt={10}
                    depth={100}
                    height='400'
                    wallColor='transparent'
                    pointRender={pointRender}
                    load={load.bind(this)}
                    loaded={onChartLoad.bind(this)}
                    axisLabelRender={axisLabelRender.bind(this)}
                    width={Browser.isDevice ? '100%' : '75%'}>
                    <Inject services={[ColumnSeries3D, Category3D, Tooltip3D]} />
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective
                            dataSource={data}
                            columnFacet='Cylinder'
                            type='Column'
                            xName='x'
                            yName='y'
                            columnWidth={0.9}>
                        </Chart3DSeriesDirective>
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the passenger car production in selected countries for 2021, using a cylindrical column in 3D chart.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see the rendering and configuration of a 3D cylindrical column chart. The 3D cylindrical column chart is similar to a 3D column chart but features a distinct cylindrical shape.
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
export default CylindricalColumn;