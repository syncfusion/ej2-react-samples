/**
 * Sample for Linear Gauge Annotation
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, Position, AnnotationsDirective, GaugeTooltip, Annotations, Inject, AnnotationDirective, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, LinearGaugeTheme } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

export let range: string[] = ['#30b32d', '#ffdd00', '#f03e3e'];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #templateWrap img {
        border-radius: 30px;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }`;

export class Annotation extends SampleBase<{}, {}> {
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as LinearGaugeTheme;
    }
    // custom code end
    render() {
        return (
            <div className='control-pane'>

                <style>
                    {SAMPLE_CSS}

                </style>
                <div className='control-section'>
                    <LinearGaugeComponent load={this.load.bind(this)} id='gauge' rangePalettes={range} orientation='Horizontal'>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective maximum={90} majorTicks={{ interval: 10, height: 0 }} minorTicks={{ height: 0 }} line={{ width: 0 }} labelStyle={{ font: { size: '0px' } }}>
                                <PointersDirective>
                                    <PointerDirective value={35} color='#757575' placement='Near' height={15} width={15} offset={-50} markerType='Triangle'>
                                    </PointerDirective>
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={30} startWidth={50} endWidth={50}>
                                    </RangeDirective >
                                    <RangeDirective start={30} end={60} startWidth={50} endWidth={50}>
                                    </RangeDirective >
                                    <RangeDirective start={60} end={90} startWidth={50} endWidth={50}>
                                    </RangeDirective >
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="title" style="width:200px;"><p style="font-size:18px;">CPU Utilization</p></div>'
                                horizontalAlignment='Center'
                                x={35} zIndex='1'
                                y={50}>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="low"><img style="height:25px;width:25px;" src="src/linear-gauge/images/Low.png"/></div>'
                                axisIndex={0}
                                axisValue={15}
                                y={-25}
                                zIndex='1'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="moderate"><img style="height:25px;width:25px;" src="src/linear-gauge/images/Moderate.png"/></div>'
                                axisIndex={0}
                                axisValue={45}
                                y={-25}
                                zIndex='1'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="high"><img style="height:25px;width:25px;" src="src/linear-gauge/images/High.png"/></div>'
                                axisIndex={0}
                                axisValue={75}
                                y={-25}
                                zIndex='1'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="lowText"><p style="font-size:15px;color:#248622;">Low</p></div>'
                                axisIndex={0}
                                axisValue={15}
                                zIndex='1'
                                y={20}>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="moderateText"><p style="font-size:15px;color:#ba9e2a;">Moderate</p></div>'
                                axisIndex={0}
                                zIndex='1'
                                axisValue={45}
                                y={20}>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="highText"><p style="font-size:15px;color:#b42f2f;">High</p></div>'
                                axisIndex={0}
                                zIndex='1'
                                axisValue={75}
                                y={20}>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the CPU Utilization of a resource by using annotation feature.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this sample we have used annotations to indicate low, moderate and high ranges. Annotations are used to place the texts,
                    shapes or images anywhere in the gauge. You can use <code>content</code>, <code>x</code>, <code>y</code>,
                    <code>zIndex</code> properties to customize the annotations. And you can specify the id of the element that needs
                    to be displayed, in the content property.
    </p>
                    <p>
                        More information about linear gauge can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation section</a>.
    </p>
                </div>
            </div >
        )
    }
}
