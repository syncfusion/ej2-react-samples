/**
 * Sample for Column Series with disabled side by side placement
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, ChartTheme,
    ColumnSeries3D, Category3D, Tooltip3D, Chart3DLoadedEventArgs, Legend3D, Highlight3D
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: any[] = [{ x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }, { x: 'Jack', y: 1 }, { x: 'Lucas', y: 1 }];
export let data2: any[] = [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }, { x: 'Jack', y: 2 }, { x: 'Lucas', y: 3 }];
export let data3: any[] = [{ x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }, { x: 'Jack', y: 5 }, { x: 'Lucas', y: 6 }];
export let data4: any[] = [{ x: 'Jamesh', y: 10, text: 'Total 10' }, { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }, { x: 'Jack', y: 8, text: 'Total 8' }, { x: 'Lucas', y: 10, text: 'Total 10' }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Column Side placment sample
 */
export class ColumnPlacement extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <Chart3DComponent id='charts' style={{ textAlign: "center" }} load={this.load.bind(this)} enableRotation={true} rotation={Browser.isDevice ? 5 : 25} depth={500} primaryXAxis={{
                        valueType: 'Category', interval: 1, majorTickLines: { width: 0 },
                         minorTickLines: { width: 0 }, labelPlacement: 'BetweenTicks',
                         labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
                         labelRotation: Browser.isDevice ? -45 : 0,
                    }} primaryYAxis={{
                        interval: Browser.isDevice ? 4 : 2,
                        majorTickLines: { width: 0 }
                    }} enableSideBySidePlacement={false} title='Fruit Consumption' tooltip={{ enable: true }} legendSettings={{ visible: true, enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[ColumnSeries3D, Category3D, Tooltip3D, Legend3D]} />
                        <Chart3DSeriesCollectionDirective>
                            <Chart3DSeriesDirective dataSource={data1} xName='x' yName='y' name='Grapes' type='Column' columnWidth={0.2}>
                            </Chart3DSeriesDirective>
                            <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' name='Orange' type='Column' columnWidth={0.2}>
                            </Chart3DSeriesDirective>
                            <Chart3DSeriesDirective dataSource={data3} xName='x' yName='y' name='Apple' type='Column' columnWidth={0.2}>
                            </Chart3DSeriesDirective>
                            <Chart3DSeriesDirective dataSource={data4} xName='x' yName='y' name='Total' type='Column' columnWidth={0.2}>
                            </Chart3DSeriesDirective>
                        </Chart3DSeriesCollectionDirective>
                    </Chart3DComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows four series of columns in which each column is placed behind the previous column.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the column 3D chart. The column 3D chart is used to
                        compare the frequency, count, total, or average of data in different categories. The
                        <code>enableSideBySidePlacement</code> property is used to enable and disable side-by-side positioning.
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                        <code>ColumnSeries3D</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the 3D chart can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };

}
