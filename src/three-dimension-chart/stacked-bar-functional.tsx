/**
 * Sample for stackingBar series 
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, Legend3D, Category3D, StackingBarSeries3D, Tooltip3D, Chart3DLoadedEventArgs, ChartTheme, Highlight3D } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: 'Sochi 2014', y: 9 },
    { x: 'Rio 2016', y: 46 },
    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 9 },
    { x: 'Tokyo 2020', y: 39 },
    { x: 'Beijing 2022', y: 8 },
];
export let data2: any[] = [
    { x: 'Sochi 2014', y: 10 },
    { x: 'Rio 2016', y: 4 },
    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 11 },
    { x: 'Tokyo 2020', y: 7 },
    { x: 'Beijing 2022', y: 4 }
];
export let data3: any[] = [
    { x: 'Sochi 2014', y: 4 },
    { x: 'Rio 2016', y: 10 },
    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 5 },
    { x: 'Tokyo 2020', y: 10 },
    { x: 'Beijing 2022', y: 5 }
];
export let data4: any[] = [
    { x: 'Sochi 2014', y: 8 },
    { x: 'Rio 2016', y: 17 },
    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 14 },
    { x: 'Tokyo 2020', y: 10 },
    { x: 'Beijing 2022', y: 12 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedBar = () => {
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
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ valueType: 'Category', labelPlacement: 'BetweenTicks' }} width={Browser.isDevice ? '100%' : '75%'} primaryYAxis={{
                    edgeLabelPlacement: 'Shift', interval: Browser.isDevice ? 20 : 10
                }} enableRotation={true} rotation={22} depth={100} height='400' load={load.bind(this)} title='Olympic Gold Medal Comparison' loaded={onChartLoad.bind(this)} tooltip={{ enable: true }}>
                    <Inject services={[StackingBarSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D]} />
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective dataSource={data} xName='x' yName='y' columnWidth={0.6} name='America' type='StackingBar' />
                        <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' columnWidth={0.6} name='Canada' type='StackingBar' />
                        <Chart3DSeriesDirective dataSource={data3} xName='x' yName='y' columnWidth={0.6} name='France' type='StackingBar' />
                        <Chart3DSeriesDirective dataSource={data4} xName='x' yName='y' columnWidth={0.6} name='Germany' type='StackingBar' />
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
            <div id="action-description">
                <p>
                    This 3D stacked bar chart example visualizes a comparison of several Olympic medal-winning countries using the stacked bar series. The legend in the sample provides additional information about the series.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a 3D stacked bar chart. The 3D stacked bar chart stacks points in the series horizontally. Additionally, the <code>stackingGroup</code> property can be used to group stacked collections based on category.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    3D chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject <code>StackingBarSeries3D</code> module into <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default StackedBar;