/**
 * Sample for data sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Annotations, Inject, PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Data extends SampleBase<{}, {}> {
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as LinearGaugeTheme;
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row">
                        <LinearGaugeComponent load={this.load.bind(this)} style={{ height: "300px" }} id='gauge1' orientation='Horizontal' container={{ width: 30, backgroundColor: '#e0e0e0', border: { width: 0 }, offset: 30 }}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective line={{ offset: 30 }} labelStyle={{ offset: 50 }}>
                                    <PointersDirective>
                                        <PointerDirective value={10} placement='Near'
                                            offset={-60}
                                            height={10}
                                            width={10}
                                            markerType='Triangle'>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={10} startWidth={30} endWidth={30} color='#30b32d'>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div id="title" style="width:300px;"> <img style="float:left" src="src/linear-gauge/images/exercise-tracking.svg"/><p style="font-size:18px;color:#4285F4;float:left;margin-left:12px;margin-top:4px">Exercise Tracking </p></div>'
                                    axisIndex={0}
                                    axisValue={0}
                                    x={150}
                                    zIndex= '1'
                                    y={-180}>
                                </AnnotationDirective>
                                <AnnotationDirective content='<div id="running" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge/images/Running.svg" /></span><p style="float:left;margin-left:10px;">Running</p></div>'
                                    axisIndex={0}
                                    axisValue={0}
                                    zIndex= '1'
                                    x={50}
                                    y={-130}>
                                </AnnotationDirective>
                                <AnnotationDirective content='<div id="pointerText" style="width:60px;"><p style="font-size:15px;">10 MPH</p></div>'
                                    axisIndex={0}
                                    zIndex= '1'
                                    axisValue={10}
                                    y={-65}>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className="row">
                        <LinearGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} id='gauge2' orientation='Horizontal' container={{ width: 30, backgroundColor: '#e0e0e0', border: { width: 0 }, offset: -50 }}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective line={{ offset: 30 }} labelStyle={{ offset: 50 }}>
                                    <PointersDirective>
                                        <PointerDirective value={28} placement='Near'
                                            offset={-60}
                                            height={10}
                                            width={10}
                                            markerType='Triangle'>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={10} startWidth={28} endWidth={28} color='#30b32d'>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div id="cycle" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge/images/Cycling.svg" /></span><p style="float:left;margin-left:10px;">Cycling</p></div>'
                                    axisIndex={0}
                                    axisValue={0}
                                    zIndex= '1'
                                    x={50}
                                    y={-110}>
                                </AnnotationDirective>
                                <AnnotationDirective content='<div id="pointerText" style="width:60px;"><p style="font-size:15px;">28 MPH</p></div>'
                                    axisIndex={0}
                                    axisValue={28}
                                    y={-70}>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className="row">
                        <LinearGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} id='gauge3' orientation='Horizontal' container={{ width: 30, backgroundColor: '#e0e0e0', border: { width: 0 }, offset: -90 }}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective maximum={10} line={{ offset: 30 }} labelStyle={{ offset: 50, format: '{value}k' }}>
                                    <PointersDirective>
                                        <PointerDirective value={2} placement='Near'
                                            offset={-60}
                                            height={10}
                                            width={10}
                                            markerType='Triangle'>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={2} startWidth={30} endWidth={30} color='#30b32d'>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div id="walk" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge/images/Walking.svg" /></span><p style="float:left;margin-left:10px;">Walking</p></div>'
                                    axisIndex={0}
                                    axisValue={0}
                                    zIndex= '1'
                                    x={50}
                                    y={-120}>
                                </AnnotationDirective>
                                <AnnotationDirective content='<div id="pointerText" style="width:100px;"><p style="font-size:15px;">2000 Steps</p></div>'
                                    axisIndex={0}
                                    zIndex= '1'
                                    axisValue={2.2}
                                    y={-65}>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features available in linear gauge.
            </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the exercise tracking using ranges, pointer and annotation features in linear gauge. We have rendered
                    3 linear gauges in this sample for indicating running, cycling and walking.
    </p>
                    <p>
                        More information about linear gauge can be found in this <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation section</a>.
    </p>
                </div>
            </div >
        )
    }
}
