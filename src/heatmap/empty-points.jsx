import * as React from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './data.json';
import { SampleBase } from '../common/sample-base';
/**
 * Schedule Default sample
 */
export class EmptyPoints extends SampleBase {
    render() {
        return (<div className='control-pane'>

                <div className='control-section'>
                    <HeatMapComponent id='heatmap-container' titleSettings={{
            text: 'Deffective Count per 1000 Products from a Manufacturing Unit',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        }} xAxis={{
            labels: ['2007', '2008', '2009', '2010', '2011',
                '2012', '2013', '2014', '2015', '2016', '2017'],
        }} yAxis={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        }} dataSource={data.emptyPointDataSource} cellSettings={{
            showLabel: true,
            border: { width: 0, color: 'white' },
        }} tooltipRender={this.tooltipTemplate} paletteSettings={{
            palette: [{ color: 'rgb(172, 213, 242)' },
                { color: 'rgb(127, 168, 201)' },
                { color: 'rgb(82, 123, 160)' },
                { color: 'rgb(37, 78, 119)' },
            ],
            type: 'Gradient'
        }} load={this.load.bind(this)} legendSettings={{
            position: 'Bottom',
            width: '250px',
            showLabel: true,
        }}>
                        <Inject services={[Legend, Tooltip]}/>
                    </HeatMapComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the number of deffective product count per 1000 units coming out from a manufacturing unit
                        Data points are enhanced with labels and tooltip. Some data points were not marked with any values which indicates
                        there are no deffective products and these data points are termed as empty points.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render empty points in the Heatmap. The empty points or the points with no data
                        can be marked using <code>null</code> in the data source. You can also customize the background color of the
                        empty points by using the <code>emptyPointColor</code> property in <code>paletteSettings</code>
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point
                        in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the
                        <code>Tooltip </code>  module using the <code>Heatmap.Inject(Tooltip) </code> method, and use a legend by injecting
                        the <code>Legend </code>  module using the <code>Heatmap.Inject(Legend) </code>  method.
                    </p>
                </div>
            </div>);
    }
    tooltipTemplate(args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' deffective units'];
    }
    ;
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    ;
}
