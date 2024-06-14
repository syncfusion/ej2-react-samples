/**
 * Sample for Bar series
 */
import * as React from "react";
import { useEffect } from 'react';
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, BarSeries3D, Chart3DLoadedEventArgs, ChartTheme, Category3D, Legend3D, Tooltip3D, Highlight3D } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
    { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
];
export let data2: any[] = [
    { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
    { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Bar sample
 */
const Bar = () => {
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
                <div>
                    <Chart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }}
                        rotation={22}
                        depth={100}
                        height='400'
                        enableRotation={true} primaryXAxis={{ valueType: 'Category', labelPlacement: 'BetweenTicks' }} primaryYAxis={{ labelFormat: '{value}%', maximum: Browser.isDevice ? 8 : 7, interval: Browser.isDevice ? 2 : 1, edgeLabelPlacement: 'Shift' }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '70%'} title='GDP Percentage by Country in 2017' loaded={onChartLoad.bind(this)} tooltip={{ enable: true }}>
                        <Inject services={[BarSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D]} />
                        <Chart3DSeriesCollectionDirective>
                            <Chart3DSeriesDirective dataSource={data1} xName='x' yName='y' type='Bar' columnSpacing={0.1} name='GDP'>
                            </Chart3DSeriesDirective>
                            <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' type='Bar' columnSpacing={0.1} name="Share in World's GDP"
                            >
                            </Chart3DSeriesDirective>
                        </Chart3DSeriesCollectionDirective>
                    </Chart3DComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the GDP data by country for the year 2017 using bar series in a 3D chart. Data points are enhanced with tooltips.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a 3D bar chart. The 3D bar chart, similar to the 3D column chart, differs in that the orientation of the y-axis is horizontal rather than vertical.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    3D chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject <code>BarSeries3D</code> module into <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default Bar;
