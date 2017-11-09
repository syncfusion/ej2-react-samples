/**
 * Sample for default gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from './sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <LinearGaugeComponent id='gauge' orientation='Horizontal'>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective line={{ color: '#9E9E9E' }} minorTicks={{ color: '#9E9E9E', interval: 2 }} majorTicks={{ color: '#9E9E9E', interval: 10 }} labelStyle={{ font: { color: '#424242' }, offset: 48 }}>
                                <PointersDirective>
                                    <PointerDirective value={10} placement='Near' height={15} width={15} color='#757575' offset={-50} markerType='Triangle'>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="pointer" style="width:70px"><h1 style="font-size:14px;color:#424242">10 MPH</h1></div>' axisIndex={0}
                                axisValue={10}
                                x={10} zIndex= '1'
                                y={-70}>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
            </div >
        )
    }
}

ReactDOM.render(<Default />, document.getElementById('sample'));