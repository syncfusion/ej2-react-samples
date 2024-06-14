/**
 * Sample for Bar series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject,
    BarSeries3D, Category3D, Legend3D, Tooltip3D, Chart3DLoadedEventArgs, ChartTheme, Highlight3D
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
    { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
];
export let data2: any[] = [
    { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
    { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Bar sample
 */
export class Bar extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div>
                        <Chart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }}
                            rotation={25}
                            tilt= {18}
                            depth={100}
                            enableRotation={true} primaryXAxis={{ valueType: 'Category', labelPlacement: 'BetweenTicks' }} primaryYAxis={{ labelFormat: '{value}%', edgeLabelPlacement: 'Shift', maximum: 7, majorTickLines: { width: 0 } }} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title='GDP percent by Country in 2017' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true }}>
                            <Inject services={[BarSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D]} />
                            <Chart3DSeriesCollectionDirective>
                                <Chart3DSeriesDirective dataSource={data1} xName='x' yName='y' type='Bar' columnSpacing={0.1} name='GDP'>
                                </Chart3DSeriesDirective>
                                <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' type='Bar' columnSpacing={0.1} name='Share in World'
                                >
                                </Chart3DSeriesDirective>
                            </Chart3DSeriesCollectionDirective>
                        </Chart3DComponent>
                    </div>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                        <a href="https://www.gov.uk/" target='_blank'>www.gov.uk</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the GDP data by country for the year 2017 using bar series in a 3D chart. Data points are enhanced with tooltips.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a 3D bar chart. The bar chart, similar to the column chart, differs in that the orientation of the y-axis is horizontal rather than vertical.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject
                        <code>BarSeries3D</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the 3D chart can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar" aria-label="Navigate to the documentation for React 3D bar chart">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: Chart3DLoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    public load(args: Chart3DLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };

}
