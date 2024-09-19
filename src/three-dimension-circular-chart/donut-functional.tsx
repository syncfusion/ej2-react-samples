/**
 * Sample for Circular Donut 3D Chart.
 */
import * as React from "react";
import { useEffect } from 'react';
import { CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme, CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [{ x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Circular Donut 3D Chart.
 */
const DonutSeries = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    return (<div className='control-pane'>
        <style>{SAMPLE_CSS}</style>
        <div className='control-section'>
            <div>
                <CircularChart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ visible: false }} tilt={-30} enableRotation={true} load={load.bind(this)} title='Top Selling Electric Cars in China' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' }}>
                    <Inject services={[PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D]} />
                    <CircularChart3DSeriesCollectionDirective>
                        <CircularChart3DSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='65%' radius={Browser.isDevice ? '45%' : '75%'} dataLabel={{ visible: true, name: 'x', position: 'Outside', font: { fontWeight: '600', }, connectorStyle: { length: Browser.isDevice ? '20px' : '40px' } }}>
                        </CircularChart3DSeriesDirective>
                    </CircularChart3DSeriesCollectionDirective>
                </CircularChart3DComponent>
            </div>
        </div>
        <div id="action-description">
            <p>
                This sample visualizes the top-selling electric cars in China using a 3D donut chart. Data points are enhanced
                with tooltip.
            </p>
        </div>
        <div id="description">
            <p>
                In this example, you can see how to render and configure a 3D donut chart. The donut chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole. To create a
                donut in the pie series, use the <code>innerRadius</code> property. You can rotate and tilt the donut chart using a mouse or touch-enabled devices.
            </p>
            <p><code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices.</p>
            <p><b>Injecting Module</b></p>
            <p>
                3D circular chart component features are segregated into individual feature-wise modules. To use datalabel, you need to inject the <code>CircularChartDataLabel3D</code> module into <code>services</code>.
            </p>
        </div>
    </div>);
};
export default DonutSeries;
