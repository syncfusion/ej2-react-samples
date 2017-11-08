/**
 * Doughnut Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel, Inject, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
export let data1: any[] = [{ x: 'Labour', y: 28, text: '28%' }, { x: 'Legal', y: 10, text: '10%' },
{ x: 'Production', y: 20, text: '20%' }, { x: 'License', y: 15, text: '15%' },
{ x: 'Facilities', y: 23, text: '23%' }, { x: 'Taxes', y: 17, text: '17%' },
{ x: 'Insurance', y: 12, text: '12%' }];
export class AccumulationDoughnut extends SampleBase<{}, {}> {
    public pie: AccumulationChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AccumulationChartComponent id="pie-chart"
                        title='Project Cost Breakdown'
                        legendSettings={{
                            visible: false
                        }}
                        enableSmartLabels={true}
                        load={this.load.bind(this)}
                        tooltip={{ enable: true, format: '${point.x} <br> ${point.y} %' }}
                        loaded={this.onChartLoad.bind(this)}
                    >
                        <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='40%' startAngle={0}
                                endAngle={360} radius='70%' explode={true} explodeOffset='10%' explodeIndex={3}
                                dataLabel={{
                                    visible: true,
                                    name: 'text',
                                    position: 'Inside',
                                    font: {
                                        fontWeight: '600',
                                        color: '#ffffff'
                                    }
                                }}
                            >
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates doughnut chart for a project break down statistics.
                    </p>
                </div>
                <div id="description">
                    <p> In this example, you can see how to render doughnut chart. You can use <code>radius</code> and <code>innerRadius</code> properties to render the doughnut and also use <code>border</code>, <code>fill</code> properties to customize the point. <code>dataLabel</code> are used to represent individual data and its value.</p>
                    <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as AccumulationTheme;
    };
}