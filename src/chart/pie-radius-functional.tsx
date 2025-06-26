/**
 * Sample for Pie with Various Radius
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadAccumulationChartTheme } from './theme-color';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, Inject, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-react-charts';
export let data1: any[] = [
    { x: 'Cuba', y: 103800, r: '106', text: 'CUB'},
  { x: 'Syria', y: 185178, r: '133', text: 'SYR'},
  { x: 'Benin', y: 112760, r: '128', text: 'BEN'},
  { x: 'Portugal', y: 91606, r: '114', text: 'POR'},
  { x: 'Austria', y: 82520, r: '111', text: 'AUS'},
  { x: 'Honduras', y: 111890, r: '97',text: 'HON'},
  { x: 'Azerbaijan', y: 82650, r: '125' , text: 'AZE'}
];
const PieRadius = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const loaded = (args: IAccLoadedEventArgs): void => {
        let chart: Element = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
    };

    const load = (args: IAccLoadedEventArgs): void => {
        loadAccumulationChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <AccumulationChartComponent id='pie-chart' legendSettings={{ visible: false }} enableSmartLabels={true} title='Global Distribution of Population and Land Area by Country - 2025' subTitle='Source: wikipedia.org' enableBorderOnMouseMove={false} enableAnimation={true} load={load.bind(this)} loaded={loaded.bind(this)} tooltip={{ enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>', enableHighlight: true }}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='20%' tooltipMappingName='r' borderRadius={3} border={{color: '#FFFFFF', width: 1}}  dataLabel={{ visible: true, position: Browser.isDevice ? 'Inside' : 'Outside', textWrap: Browser.isDevice ? 'Wrap' : 'Normal', name: Browser.isDevice ? 'text' : 'x', font: { size: Browser.isDevice ? '7px' : '12px', fontWeight: '600' }, connectorStyle:{length : Browser.isDevice ? '10px' : '20px' ,type: 'Curve'} }} radius='r' />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
                <div id="action-description">
                    <p>This sample compares countries by population density and total area using various radius in a pie series.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render a donut chart with different radius. You can use the <code>Radius</code> mapping property to achieve this feature. <code>DataLabels</code> are used to represent individual data and its values.</p>
                    <p> Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
                    </p>
                    <p>
                        More information about the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#various-radius-pie-chart" aria-label="Navigate to the documentation for Various Radius Pie Chart in React Accumulation Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default PieRadius;