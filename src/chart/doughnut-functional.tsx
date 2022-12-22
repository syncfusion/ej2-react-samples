/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel, Inject, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
export let data1: any[] = Browser.isDevice ?
[{ x: 'Chrome', y: 59.28, text: ' Chrome: 59.28%' }, { x: 'Safari', y: 5.73, text: Browser.isDevice ? 'Safari <br> 5.73%'  : 'Safari: 5.73%' },
{ x: 'Opera', y: 6.12, text: 'Opera: 6.12%' },
{ x: 'Edge', y: 7.48, text: 'Edge: 7.48%' },
{ x: 'Others', y: 22.41, text: 'Others: 22.41%' }] : 
[{ x: 'Chrome', y: 59.28, text: ' Chrome: 59.28%' }, { x: 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
{ x: 'Opera', y: 2.12, text: 'Opera: 2.12%' }, { x: 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
{ x: 'QQ', y: 3.96, text: 'QQ: 3.96%' }, { x: 'Safari', y: 5.73, text: 'Safari: 5.73%' },
{ x: 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
{ x: 'Edge', y: 7.48, text: 'Edge: 7.48%' },
{ x: 'Others', y: 9.21, text: 'Others: 9.21%' }]
function AccumulationDoughnut() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let pie: AccumulationChartComponent;
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AccumulationChartComponent id="pie-chart" title='Mobile Browsers Statistics' enableSmartLabels={true} load={load.bind(this)} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>' }} loaded={onChartLoad.bind(this)} enableBorderOnMouseMove={false} legendSettings={{ visible: false }}>
                        <Inject services={[PieSeries, AccumulationDataLabel]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='40%' startAngle= {Browser.isDevice ? 62 : 0 }  explode={true} explodeOffset='10%' explodeIndex={0} dataLabel={{
                                visible: true,
                                position: 'Outside', name: 'text',
                                font: {
                                    fontWeight: '600',

                                },
                                connectorStyle:{length : '20px', type: 'Curve'}
                                
                            }} radius= {Browser.isDevice ? '40%' : '75%'}>
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This React Donut Chart example visualizes the mobile browsers statistics by using doughnut series. Datalabels show information about the points.
                    </p>
                </div>
                <div id="description">
                    <p> In this example, you can see how to render and configure a doughnut chart. To create a doughnut in pie series, customize the <code>InnerRadius</code> property. <code>DataLabels</code> are used to represent individual data and its values.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>PieSeries</code> into <code>services</code>.
                    </p>
                    <p>
                        More information on the doughnut can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    function onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    function load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light").replace(/contrast/i, 'Contrast') as AccumulationTheme;
    };
}
export default AccumulationDoughnut;