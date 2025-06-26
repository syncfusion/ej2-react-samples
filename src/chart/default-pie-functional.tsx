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
import { loadAccumulationChartTheme } from './theme-color';
export let data1: any[] =
[
    { 'x': 'Coal', y: 34.4, text: 'Coal: 34.4%' },
    { 'x': 'Natural Gas', y: 22.1, text: 'Natural Gas: 22.1%' },
    { 'x': 'Hydro', y: 14.4, text: 'Hydro: 14.4%' },
    { 'x': 'Nuclear', y: 9.0, text: 'Nuclear: 9.0%' },
    { 'x': 'Wind', y: 8.1, text: 'Wind: 8.1%' },
    { 'x': 'Others', y: 12.0, text: 'Others: 12.0%' }
];
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
        loadAccumulationChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <AccumulationChartComponent id='pie-chart' title='Global Electricity Generation by Source - 2024' subTitle='Source: wikipedia.org' load={load.bind(this)} legendSettings={{ visible: false }} enableAnimation={true} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Percentage: <b>${point.y}%</b>',header:""  , enableHighlight: true}} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y' borderRadius={3} innerRadius='0%' explode={true} explodeOffset='10%' explodeIndex={0} startAngle = {Browser.isDevice ? 70 : 30 } border={{color: '#FFFFFF', width: 1}} dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' }, connectorStyle:{ length : Browser.isDevice ? '10px' : '20px', type: 'Curve'} }} radius= {Browser.isDevice ? '40%' : '60%'} />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This React Pie Chart example demonstrates a pie chart for global electricity generation. Datalabels show information about the points.</p>
            </div>
            <div id="description">
                <p> In this example, you can see how to render and configure a pie chart. The pie chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole. The radius of the pie chart can be customized using the <code>Radius</code> property.</p>
                <p> Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices.</p>
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