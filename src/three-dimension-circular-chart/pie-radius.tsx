/**
 * Sample for Circular Pie 3D Chart with various radius.
 */
import * as React from "react";
import {
    PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme, CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, Inject
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1 = [{ x: 'Belgium', y: 551500, r: Browser.isDevice ? '120' : '110.7', text: 'Belgium' },
{ x: 'Dominican Republic', y: 312685, r: '137.5', text: 'Dominican Republic' },
{ x: 'Cuba', y: 350000, r: '124.6', text: 'Cuba' },
{ x: 'Egypt', y: 301000, r: Browser.isDevice ? '130.8' : '150.8', text: 'Egypt' },
{ x: 'Kazakhstan', y: 300000, r: Browser.isDevice ? '135.5' : '155.5', text: 'Kazakhstan' },
{ x: 'Somalia', y: 357022, r: Browser.isDevice ? '104.6' : '160.6', text: 'Somalia' },
{ x: 'Argentina', y: 505370, r: Browser.isDevice ? '110' : '100', text: 'Argentina' },];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Circular Pie 3D Chart sample.
 */
export class PieRadius extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div>
                        <CircularChart3DComponent id='charts' style={{ textAlign: "center" }} rotation={15} legendSettings={{ visible: true, reverse: true }} load={this.load.bind(this)} title='Population Density per Square Kilometer by Country' loaded={this.onChartLoad.bind(this)} enableAnimation={false} tilt={-15} tooltip={{ enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>' }}>
                            <Inject services={[PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D]} />
                            <CircularChart3DSeriesCollectionDirective>
                                <CircularChart3DSeriesDirective dataSource={data1} xName='x' yName='y' radius='r' tooltipMappingName='r' innerRadius='20%' animation={{ enable: false }} dataLabel={{
                                    visible: true, position: Browser.isDevice ? 'Inside' : 'Outside', name: 'text', enableRotation: true, font: { fontWeight: '600' }, connectorStyle: { length: '20px' }
                                }}>
                                </CircularChart3DSeriesDirective>
                            </CircularChart3DSeriesCollectionDirective>
                        </CircularChart3DComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample compares countries by population density and total area using various radii in a 3D pie series.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render a 3D donut chart with varying radii. You can use the
                        <code>radius</code> mapping property to achieve this feature. The data labels are used to represent individual
                        data and its values. In addition, the sample shows how to change the order of legend for the donut
                        chart by using the <code>reverse</code> property.
                    </p>
                    <p><code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a point or tap on a
                        point on touch-enabled devices. </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D circular chart component features are segregated into individual feature-wise modules. To use legend, you need to Inject the <code>CircularChartLegend3D</code> module into <code>services</code>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: CircularChart3DLoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    public load(args: CircularChart3DLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as CircularChart3DTheme;
    };

}
