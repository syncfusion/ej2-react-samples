/**
 * Sample for Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, ChartTheme,
    Legend3D, Category3D, Tooltip3D, ColumnSeries3D, Chart3DLoadedEventArgs, Highlight3D, Chart3DAxisLabelRenderEventArgs , Chart3DPointRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1 = [{ x: 'Nio', y: 31041 }, { x: 'Wuling', y: 76418 }, { x: 'Geely', y: 47234 }, { x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'BMW', y: 18733 }, { x: 'Changan', y: 52849 }, { x: 'Neta', y: 22449 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Column extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <Chart3DComponent id='charts' axisLabelRender={this.labelRender.bind(this)} style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true, visible: false }} primaryXAxis={{
                        valueType: 'Category',
                        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
                        labelRotation: Browser.isDevice ? -45 : 0,
                        labelPlacement: 'BetweenTicks',
                        minorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }} primaryYAxis={{
                        majorTickLines: { width: 0 },
                        maximum: 150000, interval: 50000
                    }} load={this.load.bind(this)} enableRotation={true} rotation={10} tilt={18} depth={100} tooltip={{ enable: true, header: "${point.x}", format: 'Vehicles Count : <b>${point.y}' }} width={Browser.isDevice ? '100%' : '75%'} title='Vehicles production in India, February 2023' loaded={this.onChartLoad.bind(this)} >
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
                        In this example, you can observe how to render and configure a 3D column chart. The 3D column chart serves the purpose of comparing the frequency, count, total, or average of data across different categories.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                        <code>ColumnSeries3D</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the 3D chart can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column" aria-label="Navigate to the documentation for React 3D column chart">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: Chart3DLoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    public load(args: Chart3DLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
    public labelRender(args: Chart3DAxisLabelRenderEventArgs ): void {
        if (args.axis.name === 'primaryYAxis') {
            let value = Number(args.text) / 1000;
            args.text = String(value) + 'k';
        }
    };

}
export default Column;