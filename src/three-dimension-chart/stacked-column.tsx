/**
 * Sample for Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject,
    Legend3D, Category3D, StackingColumnSeries3D, Tooltip3D, Chart3DLoadedEventArgs, ChartTheme, Chart3DAxisLabelRenderEventArgs , Highlight3D
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: '2018', y: 104.3 },
    { x: '2019', y: 89.2 },
    { x: '2020', y: 96.3 },
    { x: '2021', y: 83.2 },
    { x: '2022', y: 159.4 }];
export let data2: any[] = [
    { x: '2018', y: 6.2 },
    { x: '2019', y: 15.6 },
    { x: '2020', y: 14.3 },
    { x: '2021', y: 9.3 },
    { x: '2022', y: 7.8 }];
export let data3: any[] = [
    { x: '2018', y: 42.4 },
    { x: '2019', y: 36.8 },
    { x: '2020', y: 40.1 },
    { x: '2021', y: 35.1 },
    { x: '2022', y: 39.6 }];
export let data4: any[] = [
    { x: '2018', y: 15.4 },
    { x: '2019', y: 21.1 },
    { x: '2020', y: 13.9 },
    { x: '2021', y: 11.6 },
    { x: '2022', y: 14.4 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <Chart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 },
                        interval: 1,
                        labelPlacement: 'BetweenTicks',
                        labelIntersectAction: 'Rotate45',
                        valueType: 'Category'
                    }} primaryYAxis={{
                        majorTickLines: { width: 0 },
                        majorGridLines: { width: 1 },
                        minorGridLines: { width: 1 },
                        minorTickLines: { width: 0 },
                        maximum: 75,
                        interval: 25
                    }} width={Browser.isDevice ? '100%' : '75%'} load={this.load.bind(this)} title='Steel Production Grouped By Continent' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y} Mmt' }} axisLabelRender={this.axisLabelRender.bind(this)} rotation={10} tilt={18} depth={100} enableRotation={true}>
                        <Inject services={[StackingColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D]} />
                        <Chart3DSeriesCollectionDirective>
                            <Chart3DSeriesDirective dataSource={data1} xName='x' yName='y' name='Japan' stackingGroup='Asia' columnWidth={0.6} type='StackingColumn' />
                            <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' name='Indonesia' stackingGroup='Asia' columnWidth={0.6} type='StackingColumn' />
                            <Chart3DSeriesDirective dataSource={data3} xName='x' yName='y' name='Germany' stackingGroup='Europe' columnWidth={0.6} type='StackingColumn' />
                            <Chart3DSeriesDirective dataSource={data4} xName='x' yName='y' name='France' stackingGroup='Europe' columnWidth={0.6} type='StackingColumn' />
                        </Chart3DSeriesCollectionDirective>
                    </Chart3DComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                        <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This example of a 3D stacked column chart visualizes the steel production of countries, grouped by continent.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can observe how to render and configure a 3D stacked column chart. The stacked column chart stacks points in the series vertically. Additionally, the <code>StackingGroup</code> property can be utilized to group stacked collections based on category.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject
                        <code>StackingColumnSeries3D</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the 3D chart can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };

    public axisLabelRender(args: Chart3DAxisLabelRenderEventArgs ): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + ' Mmt';
        }
    }

}