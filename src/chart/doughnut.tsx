/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, IAccLoadedEventArgs, AccumulationDataLabel, Inject, AccumulationTheme, AccumulationAnnotation, AccumulationAnnotationDirective, AccumulationAnnotationsDirective } from '@syncfusion/ej2-react-charts';

import { Browser } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2/base';
export let data1: any[] = [
{ x: 'Chrome', y: 63.5, text: 'Chrome: 63.5%' },
{ x: 'Safari', y: 25.0, text: 'Safari: 25.0%' },
{ x: 'Samsung Internet', y: 6.0, text: 'Samsung Internet: 6.0%' },
{ x: 'UC Browser', y: 2.5, text: 'UC Browser: 2.5%' },
{ x: 'Opera', y: 1.5, text: 'Opera: 1.5%' },
{ x: 'Others', y: 1.5, text: 'Others: 1.5%' }];
export class AccumulationDoughnut extends SampleBase<{}, {}> {
    public pie: AccumulationChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AccumulationChartComponent id="pie-chart" load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true }} legendSettings={{ visible: false }}>
                        <Inject services={[PieSeries, AccumulationDataLabel, AccumulationAnnotation]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='Project' innerRadius='65%' border={{ color: '#ffffff', width: 1 }} explode={false} borderRadius={3} startAngle={Browser.isDevice ? 70 : 60} dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' }, connectorStyle: { length: Browser.isDevice ? '10px' : '20px', type: 'Curve' } }} radius={Browser.isDevice ? '40%' : '70%'} />
                        </AccumulationSeriesCollectionDirective>
                        <AccumulationAnnotationsDirective>
                            <AccumulationAnnotationDirective content= { Browser.isDevice  ? '<div style="font-size:7px;font-weight:600" id="annotation">Mobile<br> Browser <br> Statistics <br>2024</div>' : '<div style="font-size:15px;font-weight:600" id="annotation">Mobile<br> Browser <br> Statistics <br>2024</div>'} region='Series' x='50%' y='50%' />
                        </AccumulationAnnotationsDirective>
                    </AccumulationChartComponent>
                </div>
            <div id="action-description">
                <p>This React donut chart example visualizes mobile browser statistics. Data labels and the center label provide information about the data in the series.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a donut chart. To create a donut in the pie series, we use the <code>innerRadius</code> property. The <code>centerLabel</code> property allows you to specify the default text that will be rendered in the center. You can also customize the text that will render when the mouse pointer is hovered over one of the donut slices using the <code>hoverTextFormat</code> property.
                </p>
                <p> Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    The Charts component’s features are segregated into individual feature modules. To use pie chart, we need to inject <code>PieSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the donut series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/" aria-label="Navigate to the documentation for Donut Chart in React accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
        )
    }
    public onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
        
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast')   as AccumulationTheme;
    };
        
}