/**
 * Sample for Semi pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser} from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationDataLabel, PieSeries, Inject, IAccLoadedEventArgs, AccumulationTheme, AccumulationAnnotationsDirective, AccumulationAnnotationDirective, ChartAnnotation, AccumulationAnnotation, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import { loadAccumulationChartTheme } from './theme-color';
export let data1: any[] = [
    { x: 'Chrome', y: 100, text: 'Chrome (100M)<br>40%', tooltipMappingName: '40%'},
    { x: 'UC Browser', y: 40, text: 'UC Browser (40M)<br>16%', tooltipMappingName: '16%' },
    { x: 'Opera', y: 30, text: 'Opera (30M)<br>12%', tooltipMappingName: '12%' },
    { x: 'Safari', y: 30, text: 'Safari (30M)<br>12%', tooltipMappingName: '12%' },
    { x: 'Firefox', y: 25, text: 'Firefox (25M)<br>10%', tooltipMappingName: '10%' },
    { x: 'Others', y: 25, text: 'Others (25M)<br>10%', tooltipMappingName: '10%' }
];
let content = Browser.isDevice ? "<div style='font-Weight:700; font-size:10px;'>Browser<br>Market<br>Shares</div>" : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align :center
    }`;
const SemiPie = () => {
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
                <AccumulationChartComponent id='pie-chart' ref={pie => pie = pie} legendSettings={{ visible: false }}  enableAnimation={false} enableBorderOnMouseMove={false}  load={load.bind(this)} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AccumulationDataLabel, PieSeries, AccumulationTooltip, ChartAnnotation, AccumulationAnnotation]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='Browser' startAngle={270} endAngle={90} explode={false} radius = {'100%'} borderRadius={3} innerRadius='50%' border={{ width: 1, color: '#ffffff' }} dataLabel={{ visible: true, position: 'Inside' , enableRotation: true, connectorStyle: { length: '20px', type:'Curve' }, name: 'text', font: { fontWeight: '600', size: Browser.isDevice ? '7px' : '11px' } }} />
                    </AccumulationSeriesCollectionDirective>
                    <AccumulationAnnotationsDirective>
                        <AccumulationAnnotationDirective content={content} region="Series" x= {"50%"} y={"85%"} />
                    </AccumulationAnnotationsDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This example demonstrates a semi-pie chart for mobile browsers usage statistics. Data label shows the information about the points.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a semi pie chart using <code>StartAngle</code> and <code>EndAngle</code> properties.  Data labels are wrapped to fit inside the pie slice. To enable the datalabel wrap feature, use the <code>TextWrap</code> datalabel property.
                </p>
                <p>
                    More information on the data labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/data-label/" aria-label="Navigate to the documentation for DataLabel in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )  
}
export default SemiPie;