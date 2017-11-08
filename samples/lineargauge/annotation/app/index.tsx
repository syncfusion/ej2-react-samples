import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, Position, AnnotationsDirective, GaugeTooltip, Annotations, Inject, AnnotationDirective, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from './sample-base';

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
/**
 * Linear Gauge Annotation Sample
 */

export class Annotation extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>

                <style>
                    {SAMPLE_CSS}

                </style>
                <div className='control-section'>
                    <LinearGaugeComponent id='gauge' rangePalettes={range} orientation='Horizontal'>
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
                            <AnnotationDirective content='<div id="low"><img style="height:25px;width:25px;" src="http://npmci.syncfusion.com/production/react/demos/src/lineargauge/images/Low.png"/></div>'
                                axisIndex={0}
                                axisValue={15}
                                y={-25}
                                zIndex='1'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="moderate"><img style="height:25px;width:25px;" src="http://npmci.syncfusion.com/production/react/demos/src/lineargauge/images/Moderate.png"/></div>'
                                axisIndex={0}
                                axisValue={45}
                                y={-25}
                                zIndex='1'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="high"><img style="height:25px;width:25px;" src="http://npmci.syncfusion.com/production/react/demos/src/lineargauge/images/High.png"/></div>'
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
            </div >
        )
    }
}

ReactDOM.render(<Annotation />, document.getElementById('sample'));