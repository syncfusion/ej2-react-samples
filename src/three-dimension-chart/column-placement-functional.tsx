/**
 * Sample for Column Series with disabled side by side placement
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, ChartTheme, ColumnSeries3D, Category3D, Tooltip3D, Chart3DLoadedEventArgs, Legend3D, Highlight3D } from '@syncfusion/ej2-react-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { load3DChartTheme } from './theme-color';
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
const ColumnPlacement = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: Chart3DLoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: Chart3DLoadedEventArgs): void => {
        load3DChartTheme(args);
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }}
                    load={load.bind(this)}
                    rotation={Browser.isDevice ? 5 : 25}
                    depth={500}
                    height='400'
                    primaryXAxis={{
                        valueType: 'Category', interval: 1,
                        labelPlacement: 'BetweenTicks',
                        labelRotation: -45
                    }}
                    primaryYAxis={{
                        interval: Browser.isDevice ? 4 : 2
                    }}
                    enableSideBySidePlacement={false}
                    title='Fruit Consumption by Individuals'
                    tooltip={{ enable: true }}
                    legendSettings={{ visible: true, enableHighlight: true }}
                    width={Browser.isDevice ? '100%' : '75%'}
                    loaded={onChartLoad.bind(this)}>
                    <Inject services={[ColumnSeries3D, Category3D, Tooltip3D, Legend3D, Highlight3D]} />
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective dataSource={data1} xName='x' yName='y' name='Grapes' type='Column'
                            columnWidth={0.2}
                        >
                        </Chart3DSeriesDirective>
                        <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' name='Orange' type='Column'
                            columnWidth={0.2}
                        >
                        </Chart3DSeriesDirective>
                        <Chart3DSeriesDirective dataSource={data3} xName='x' yName='y' name='Apple' type='Column'
                            columnWidth={0.2}
                        >
                        </Chart3DSeriesDirective>
                        <Chart3DSeriesDirective dataSource={data4} xName='x' yName='y' name='Total' type='Column'
                            columnWidth={0.2}
                        >
                        </Chart3DSeriesDirective>
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>

            <div id="action-description">
                <p>
                    This sample displays four series of 3D column chart, with each column positioned behind the preceding one.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure a 3D column chart with each column positioned behind the preceding one. The 3D column chart serves the purpose of comparing the frequency, count, total, or average of data across different categories. The <code>enableSideBySidePlacement</code> property is used to position the column behind another.
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
export default ColumnPlacement;
