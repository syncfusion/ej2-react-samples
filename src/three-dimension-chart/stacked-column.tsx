/**
 * Sample for Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, Legend3D, Category3D, StackingColumnSeries3D, Tooltip3D, Chart3DLoadedEventArgs, ChartTheme, Chart3DAxisLabelRenderEventArgs, Highlight3D } from '@syncfusion/ej2-react-charts';
import { load3DChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: '2018', y: 24.5 },
    { x: '2019', y: 25.6 },
    { x: '2020', y: 29 },
    { x: '2021', y: 28.5 },
    { x: '2022', y: 30.6 },];
export let data2: any[] = [
    { x: '2018', y: 6.2 },
    { x: '2019', y: 15.6 },
    { x: '2020', y: 14.3 },
    { x: '2021', y: 9.3 },
    { x: '2022', y: 7.8 }];
export let data3: any[] = [
    { x: '2018', y: 24.5 },
    { x: '2019', y: 23.2 },
    { x: '2020', y: 20.4 },
    { x: '2021', y: 23.2 },
    { x: '2022', y: 24.5 }];
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
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <Chart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{
                        interval: 1,
                        valueType: 'Category'
                    }} primaryYAxis={{
                        maximum: Browser.isDevice ? 50 : 60,
                        interval: 10
                    }} wallColor='transparent' height="400" width={Browser.isDevice ? '100%' : '75%'} load={this.load.bind(this)} title='Steel Production by Countries, Grouped by Continent' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y} Mmt' }} axisLabelRender={this.axisLabelRender.bind(this)} rotation={7} tilt={10} depth={100} enableRotation={true}>
                        <Inject services={[StackingColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D]} />
                        <Chart3DSeriesCollectionDirective>
                            <Chart3DSeriesDirective dataSource={data1} xName='x' yName='y' name='Iran' stackingGroup='Asia' columnWidth={0.6} type='StackingColumn' />
                            <Chart3DSeriesDirective dataSource={data2} xName='x' yName='y' name='Indonesia' stackingGroup='Asia' columnWidth={0.6} type='StackingColumn' />
                            <Chart3DSeriesDirective dataSource={data3} xName='x' yName='y' name='Italy' stackingGroup='Europe' columnWidth={0.6} type='StackingColumn' />
                            <Chart3DSeriesDirective dataSource={data4} xName='x' yName='y' name='France' stackingGroup='Europe' columnWidth={0.6} type='StackingColumn' />
                        </Chart3DSeriesCollectionDirective>
                    </Chart3DComponent>
                </div>
                <div id="action-description">
                    <p>
                        This example of a 3D stacked column chart visualizes the steel production of countries, grouped by continent. The legend in the sample provides information about these series.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a 3D stacked column chart. The 3D stacked column chart stacks points in the series vertically. Additionally, the <code>stackingGroup</code> property can be used to group stacked collections based on category.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject <code>StackingColumnSeries3D</code> module into <code>services</code>.
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
        load3DChartTheme(args);
    };

    public axisLabelRender(args: Chart3DAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + ' Mmt';
        }
    };

}