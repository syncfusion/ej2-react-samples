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
    { x: 'Android', y: 45.49, text: 'Android: 45.49%' },
    { x: 'Windows', y: 25.35, text: 'Windows: 25.35%' },
    { x: 'iOS', y: 18.26, text: 'iOS: 18.26%' },
    { x: 'macOS', y: 5.06, text: 'macOS: 5.06%' },
    { x: 'Linux', y: 1.48, text: 'Linux: 1.48%' },
    { x: 'Others', y: 4.36, text: 'Others: 4.36%' }
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
                        title='Global Operating System Usage Share - 2024' subTitle='Source: wikipedia.org'
                        load={this.load.bind(this)}
                        style={{ textAlign: 'center' }}
                        legendSettings={{ visible: false }}
                        enableAnimation={true}
                        enableBorderOnMouseMove={false}
                        tooltip={{ enable: true, header: '', format: '<b>${point.x}</b><br>Operating System Usage: <b>${point.y}%</b>', enableHighlight: true }}
                        loaded={this.onChartLoad.bind(this)}
                    >
                        <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationAnnotation]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective
                                dataSource={chartData}
                                name='Project'
                                xName='x'
                                yName='y'
                                type='Pie'
                                radius= {Browser.isDevice ? '25%' : '70%'}
                                explode={false}
                                startAngle={120}
                                innerRadius='50%'
                                dataLabel={{
                                    visible: true,
                                    position: 'Outside',
                                    name: 'text',
                                    font: { size: '12px', fontWeight: '600' },
                                    connectorStyle: { length: '20px', type: 'Curve' }
                                }}
                                borderRadius={8}
                                border={{ width: 0.5, color: 'white' }}
                            />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the global usage share of operating systems across all platforms in 2024 using a donut chart with rounded corners.
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