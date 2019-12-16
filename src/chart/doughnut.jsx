import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject } from '@syncfusion/ej2-react-charts';
export let data1 = [{ x: 'Labour', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' },
    { x: 'Production', y: 15, text: '15%' }, { x: 'License', y: 11, text: '11%' },
    { x: 'Facilities', y: 18, text: '18%' }, { x: 'Taxes', y: 14, text: '14%' },
    { x: 'Insurance', y: 16, text: '16%' }];
export class AccumulationDoughnut extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <AccumulationChartComponent id="pie-chart" title='Project Cost Breakdown' legendSettings={{
            visible: true,
            position: 'Top'
        }} enableSmartLabels={true} load={this.load.bind(this)} tooltip={{ enable: true }} loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel]}/>
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective name='Project' dataSource={data1} xName='x' yName='y' innerRadius='40%' startAngle={0} endAngle={360} radius='70%' explode={true} explodeOffset='10%' explodeIndex={3} dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
                fontWeight: '600',
                color: '#ffffff'
            }
        }}>
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the project cost breakdown statistics by using doughnut series. Datalabel shows the Information about the points.
                While hovering on the slice, border will be highlighted.
            </p>
                </div>
                <div id="description">
                    <p> In this example, you can see how to render doughnut chart. You can use <code>radius</code> and <code>innerRadius</code> properties to render the doughnut and also use <code>border</code>, <code>fill</code> properties to customize the point. <code>dataLabel</code> is used to represent individual data and its value.</p>
                    <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>PieSeries</code> into <code>services</code>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    }
    ;
}
