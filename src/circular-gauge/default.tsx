/**
 * Sample for Gauge default sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    GaugeTheme, ILoadedEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Default extends SampleBase<{}, {}> {
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
    }
    // custom code end
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent load={this.load.bind(this)} id='gauge'>
                        <AxesDirective>
                            <AxisDirective radius='80%' startAngle={230} endAngle={130}
                                majorTicks={{ width: 0 }} lineStyle={{ width: 8 }}
                                minorTicks={{ width: 0 }} labelStyle={{
                                    font: {
                                        fontFamily: 'Roboto',
                                        size: '12px',
                                        fontWeight: 'Regular'
                                    },
                                    offset: -5
                                }}>
                                <PointersDirective>
                                    <PointerDirective value={60} radius='60%'  pointerWidth={7} cap={{
                                        radius: 8,
                                        border: { width: 0 }
                                    }} needleTail ={{
                                        length: '25%'
                                    }} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates the default rendering of circular gauge.
           </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render a default circular gauge.
                        The CircularGauge control visualizes the numerical values
                        of scales in a circular manner.
                        You can use <code>axes</code>, <code>ranges</code>,
                        <code>pointers</code>properties to customize the default appearance of the gauge.
                        In this sample, an axis with multiple ranges and a pointer has been used.
                    </p>
                    <p>
                        More information on the gauge can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
