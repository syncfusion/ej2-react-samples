/**
 * Sample for 100 percent StackingBar Series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, Legend3D, Category3D, StackingBarSeries3D, Tooltip3D, Chart3DLoadedEventArgs, ChartTheme, Highlight3D } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: '2013', y: 9628912, y1: 4298390, y2: 2842133, y3: 2006366 },
    { x: '2014', y: 9609326, y1: 4513769, y2: 3016710, y3: 2165566 },
    { x: '2015', y: 7485587, y1: 4543838, y2: 3034081, y3: 2279503 },
    { x: '2016', y: 7793066, y1: 4999266, y2: 2945295, y3: 2359756 },
    { x: '2017', y: 6856880, y1: 5235842, y2: 3302336, y3: 2505741 }];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedBar100 = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: Chart3DLoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: Chart3DLoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ valueType: 'Category', labelPlacement: 'BetweenTicks' }} primaryYAxis={{
                    edgeLabelPlacement: 'Shift', interval: Browser.isDevice ? 20 : 10
                }} enableRotation={true}
                    rotation={22} height='400' depth={100} width={Browser.isDevice ? '100%' : '70%'} load={load.bind(this)} title='Motor Vehicle Production by Manufacturer' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' }}>
                    <Inject services={[StackingBarSeries3D, Legend3D, Tooltip3D, Category3D, Highlight3D]} />
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective dataSource={data} xName='x' yName='y' name='General Motors' columnWidth={0.5} type='StackingBar100' />
                        <Chart3DSeriesDirective dataSource={data} xName='x' yName='y1' name='Honda' columnWidth={0.5} type='StackingBar100' />
                        <Chart3DSeriesDirective dataSource={data} xName='x' yName='y2' name='Suzuki' columnWidth={0.5} type='StackingBar100' />
                        <Chart3DSeriesDirective dataSource={data} xName='x' yName='y2' name='BMW' columnWidth={0.5} type='StackingBar100' />
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
            <div id="action-description">
                <p>
                    This example of a 100% 3D stacked bar chart visualizes motor vehicle production by manufacturer using a stacked bar series. The legend in the sample provides information about these series.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the 100% 3D stacked bar chart. The 100% 3D stacked bar chart displays multiple series of data as stacked bars, ensuring that the cumulative proportion of each stacked element always totals 100%.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    3D chart component features are segregated into individual feature-wise modules. To use 100% stacking area series, we need to inject <code>StackingBarSeries3D</code> module into <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default StackedBar100;