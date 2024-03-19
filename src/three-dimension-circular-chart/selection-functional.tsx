/**
 * Circular 3D Chart with selection.
 */
import * as React from "react";
import { useEffect } from 'react';
import { CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChartSelection3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme, CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [
    { 'x': 'Chrome', y: 62.92 },
    { 'x': 'Internet Explorer', y: 6.12 },
    { 'x': 'Edge', y: 5.5 },
    { 'x': 'Opera', y: 3.15 },
    { 'x': 'Safari', y: 19.97 },
    { 'x': 'Others', y: 2.34 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Circular 3D Chart with selection.
 */
const Selection = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    return (<div className='control-pane'>
        <style>{SAMPLE_CSS}</style>
        <div className='control-section'>
            <div>
                <CircularChart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ visible: true, position: Browser.isDevice ? 'Bottom' : 'Right', toggleVisibility: false }} selectionMode='Point' selectionPattern='DiagonalBackward' isMultiSelect={true} highlightMode='Point' load={load.bind(this)} title='Browser Market Shares in November 2023' tilt={-30} tooltip={{enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:"" }} loaded={onChartLoad.bind(this)}>
                    <Inject services={[PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChartSelection3D]} />
                    <CircularChart3DSeriesCollectionDirective>
                        <CircularChart3DSeriesDirective dataSource={data1} xName='x' yName='y' radius= {Browser.isDevice ? '50%' : '70'} dataLabel={{
                            visible: true, name: 'x', position: 'Outside', font: { fontWeight: '600' },
                            connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
                        }}>
                        </CircularChart3DSeriesDirective>
                    </CircularChart3DSeriesCollectionDirective>
                </CircularChart3DComponent>
            </div>
        </div>
        <div id="action-description">
            <p>
                This sample displays the browser market share using a 3D pie chart with selection and highlight behavior.
            </p>
        </div>
        <div id="description">
            <p>
                In this sample, you can select and highlight any point in the chart by clicking on or touching it. Additionally,
                you have the option to select and highlight a point during the initial loading of the chart using the
                <code>selectedDataIndexes</code> option.
            </p>
            <p><code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a point or tap on a
                point on touch-enabled devices. </p>
            <p><b>Injecting Module</b></p>
            <p>
                3D circular chart component features are segregated into individual feature-wise modules. To use selection, you
                need to inject the <code>CircularChartSelection3D</code> module into <code>services</code>.
            </p>
        </div>
    </div>);
};
export default Selection;
