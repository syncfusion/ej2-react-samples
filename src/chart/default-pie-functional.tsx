/**
 * Sample for Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
export let data1: any[] = Browser.isDevice ? 
[   { 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
    { 'x': 'Safari', y: 4.73, text: Browser.isDevice ? 'Safari <br> 4.73%'  : 'Safari: 4.73%' },
    { 'x': 'Opera', y: 6.12, text: 'Opera: 6.12%' },
    { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
    { 'x': 'Others', y: 22.39, text: 'Others: 22.39%' }] :
[
    { 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
    { 'x': 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
    { 'x': 'Opera', y: 3.12, text: 'Opera: 3.12%' },
    { 'x': 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
    { 'x': 'QQ', y: 3.96, text: 'QQ: 3.96%' },
    { 'x': 'Safari', y: 4.73, text: 'Safari: 4.73%' },
    { 'x': 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
    { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
    { 'x': 'Others', y: 9.57, text: 'Others: 9.57%' }
]
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align :center
    }`;
const Pie = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: IAccLoadedEventArgs): void => {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    const load = (args: IAccLoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <AccumulationChartComponent id='pie-chart' title='Browser Market Share' load={load.bind(this)} legendSettings={{ visible: false }} enableSmartLabels={true} enableAnimation={false} center={{ x: '50%', y: '50%' }} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:""  }} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y' explode={true} explodeOffset='10%' explodeIndex={0} startAngle = {Browser.isDevice ? 55 : 35 } dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle:{ length : '20px' ,type: 'Curve'} }} radius= {Browser.isDevice ? '40%' : '70%'} />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This React Pie Chart example demonstrates a pie chart for mobile browsers usage statistics. Datalabels show information about the points.</p>
            </div>
            <div id="description">
                <p> In this example, you can see how to render and configure a pie chart. The pie chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole . The radius of the pie chart can be customized using the <code>Radius</code> property.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Accumulation Chart component features are segregated into individual feature-wise modules. To use pie chart, we need to inject <code>PieSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart" aria-label="Navigate to the documentation for Pie Chart in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Pie;