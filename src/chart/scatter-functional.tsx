/**
 * Sample for scatter series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ScatterSeries, Tooltip, ILoadedEventArgs, ChartTheme,Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { scatterData } from './scatter-data';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Scatter = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ minimum: 40, maximum: 56, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', title: 'Shoulder Breadth (cm)' }} primaryYAxis={{ majorTickLines: { width: 0 }, minimum: 70, maximum: 140, interval: 10, lineStyle: { width: 0 }, title: 'Bust Chest Circumference (cm)', rangePadding: 'None' }} load={load.bind(this)} loaded={onChartLoad.bind(this)} legendSettings = {{visible: true,enableHighlight: true}} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }}>
                    <Inject services={[ScatterSeries, Legend, Tooltip, Category, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={scatterData.getCluster1Value} width={2} xName='Breadth' yName='Circumference' name='18-20 Years' type='Scatter' marker={{ visible: false, width: 10, height: 10, shape: 'Circle' }} />
                        <SeriesDirective dataSource={scatterData.getCluster2Value} xName='Breadth' yName='Circumference' name='21-25 Years' type='Scatter' marker={{ visible: false, width: 10, height: 10, shape: 'Circle' }} />
                        <SeriesDirective dataSource={scatterData.getCluster3Value} xName='Breadth' yName='Circumference' name='26-30 Years' type='Scatter' marker={{ visible: false, width: 10, height: 10, shape: 'Circle' }} />
                        <SeriesDirective dataSource={scatterData.getCluster4Value} xName='Breadth' yName='Circumference' name='31-35 years' type='Scatter' marker={{ visible: false, width: 10, height: 10, shape: 'Circle' }} />
                        <SeriesDirective dataSource={scatterData.getCluster5Value} xName='Breadth' yName='Circumference' name='36+ Years' type='Scatter' marker={{ visible: false, width: 10, height: 10, shape: 'Circle' }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This React scatter plot chart example compares the shoulder and chest measurements for different age groups using the default scatter series.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the scatter chart. The scatter chart is used to plot data with two numeric parameters. You can use the <code>Shape</code> property in the marker to change the scatter shape.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject <code>ScatterSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the scatter series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/scatter" aria-label="Navigate to the documentation for Scatter in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Scatter;