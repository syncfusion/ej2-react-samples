import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationAnnotation,
    AccumulationDataLabel, IAccLoadedEventArgs, IAccPointRenderEventArgs, AccumulationAnnotationDirective, AccumulationAnnotationsDirective
} from '@syncfusion/ej2-react-charts';
import { Browser } from "@syncfusion/ej2/base";
import { loadAccumulationChartTheme, roundedCornnerPointRender } from './theme-color';

const SAMPLE_CSS = `
  .control-fluid {
    padding: 0px !important;
  }
  .pie-chart {
    align: center;
  }
`;

const chartData: { x: string, y: number, text: string }[] = [
    { x: 'Operations', y: 30.0, text: '30.0%' },
    { x: 'Miscellaneous', y: 10.0, text: '10.0%' },
    { x: 'Human Resources', y: 15.0, text: '15.0%' },
    { x: 'Research and Development', y: 20.0, text: '20.0%' },
    { x: 'Marketing', y: 25.0, text: '25.0%' }
];

class PieCornerRadius extends SampleBase<{}, {}> {
    private onPointRender(args: IAccPointRenderEventArgs): void {
        roundedCornnerPointRender(args);
    }

    private load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }

    public onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    }

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section row'>
                    <AccumulationChartComponent
                        id='pie-chart'
                        title='Company Budget Distribution'
                        load={this.load.bind(this)}
                        style={{ textAlign: 'center' }}
                        legendSettings={{ visible: false }}
                        enableSmartLabels={true}
                        enableAnimation={false}
                        center={{ x: '50%', y: '50%' }}
                        enableBorderOnMouseMove={false}
                        width={Browser.isDevice ? '100%' : '75%'}
                        tooltip={{ enable: true, header: '<b>Budget</b>', format: '${point.x}: <b>${point.y}%</b>', enableHighlight: true }}
                        loaded={this.onChartLoad.bind(this)}
                        pointRender={this.onPointRender.bind(this)}
                    >
                        <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationAnnotation]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective
                                dataSource={chartData}
                                name='Company Budget'
                                xName='x'
                                yName='y'
                                type='Pie'
                                innerRadius='50%'
                                dataLabel={{
                                    visible: true,
                                    position: 'Outside',
                                    name: 'x',
                                    connectorStyle: { width: 0 }
                                }}
                                borderRadius={8}
                                border={{ width: 3 }}
                            />
                        </AccumulationSeriesCollectionDirective>
                        <AccumulationAnnotationsDirective>
                            <AccumulationAnnotationDirective content={`<div style="padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">30%</div>`} region='Series' coordinateUnits='Point' x='Operations' y={30.0} />
                            <AccumulationAnnotationDirective content={`<div style="padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">10%</div>`} region='Series' coordinateUnits='Point' x='Miscellaneous' y={10.0} />
                            <AccumulationAnnotationDirective content={`<div style="padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">15%</div>`} region='Series' coordinateUnits='Point' x='Human Resources' y={15.0} />
                            <AccumulationAnnotationDirective content={`<div style="padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">20%</div>`} region='Series' coordinateUnits='Point' x='Research and Development' y={20.0} />
                            <AccumulationAnnotationDirective content={`<div style="padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">25%</div>`} region='Series' coordinateUnits='Point' x='Marketing' y={25.0} />
                        </AccumulationAnnotationsDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the company's budget distribution over a year using a donut chart with rounded corners.
                    </p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure a donut chart with customized corners for each slice. By specifying a value for <code>borderRadius</code>, you can create rounded corners for each slice, giving the chart a modern and polished look.</p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a slice or tap on it in touch-enabled devices.
                    </p>
                    <p>
                        More information about the donut series can be found in this <a target="_blank"
                            href="https://ej2.syncfusion.com/documentation/accumulation-chart/pie-dough-nut/#doughnut-chart"
                            aria-label="Navigate to the documentation for Doughnut Chart in TypeScript Accumulation Chart control">documentation
                            section</a>.
                    </p>
                </div>
            </div>
        );
    }
}

export default PieCornerRadius;