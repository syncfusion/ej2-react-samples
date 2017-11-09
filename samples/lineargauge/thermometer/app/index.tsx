/**
 * Sample for Thermometer model
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from './sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Thermometer extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <LinearGaugeComponent id='gauge' container={{ height: 350, width: 20, type: 'Thermometer' }}>
                        <AxesDirective>
                            <AxisDirective minimum={-40} maximum={120} line={{ width: 0 }} minorTicks={{ interval: 2 }} majorTicks={{ interval: 20 }} labelStyle={{ font: { color: '#000000' } }}>
                                <PointersDirective>
                                    <PointerDirective value={80} width={10} type='Bar' color='#ff0000'>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                            <AxisDirective minimum={-40} maximum={50} opposedPosition={true} line={{ width: 0 }} minorTicks={{ interval: 1 }} majorTicks={{ interval: 10 }} labelStyle={{ font: { color: '#000000' } }}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="first"><h1 style="font-size:20px">°F</h1></div>' horizontalAlignment='Center' verticalAlignment='Near' x={-30}>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="second"><h1 style="font-size:20px">°C</h1></div>' horizontalAlignment='Center' verticalAlignment='Near' x={30}>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Thermometer />, document.getElementById('sample'));