import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, GaugeTheme,
    ILoadedEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class MultipleRanges extends SampleBase<{}, {}> {

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent load={this.load.bind(this)} animationDuration={2000} id='multiple-ranges' background='transparent'>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={230} endAngle={130} radius='90%' minimum={-30} maximum={120} hideIntersectingLabel={true}
                                majorTicks={{
                                    width: 0,
                                    interval: 10
                                }} lineStyle={{ width: 0 }}
                                minorTicks={{
                                    width: 0
                                }} labelStyle={{
                                    offset: 50,
                                    position: 'Inside',
                                    autoAngle: true,
                                    font: { fontFamily: 'inherit' }
                                }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        content='<div style="font-size:18px;margin-left: 5px;color:#9DD55A"> 22.5\u00b0C </div>'
                                        angle={180} radius='20%' zIndex='1' />
                                </AnnotationsDirective>
                                <PointersDirective>
                                    <PointerDirective radius='45%' cap={{
                                        radius: 10, color: 'white',
                                        border: {
                                            width: 4,
                                            color: '#F7B194'
                                        }
                                    }} value={22.5} pointerWidth={7} color='#F7B194'
                                        animation={{ enable: false }}
                                        needleTail={{
                                            length: '25%',
                                            color: '#F7B194'
                                        }}
                                    />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={-30} end={-20} radius='90%' color='#58ABD5' startWidth={35} endWidth={35} />
                                    <RangeDirective start={-20} end={-10} radius='90%' color='#58ABD5' startWidth={35} endWidth={35} />
                                    <RangeDirective start={-10} end={0} radius='90%' color='#58ABD5' startWidth={35} endWidth={35} />
                                    <RangeDirective start={0} end={10} radius='90%' color='#58D2D5' startWidth={35} endWidth={35} />
                                    <RangeDirective start={10} end={20} radius='90%' color='#9DD55A' startWidth={35} endWidth={35} />
                                    <RangeDirective start={20} end={30} radius='90%' color='#9DD55A' startWidth={35} endWidth={35} />
                                    <RangeDirective start={30} end={40} radius='90%' color='#F1D158' startWidth={35} endWidth={35} />
                                    <RangeDirective start={40} end={50} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={50} end={60} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={60} end={70} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={70} end={80} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={80} end={90} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={90} end={100} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={100} end={110} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                    <RangeDirective start={110} end={120} radius='90%' color='#F48C6F' startWidth={35} endWidth={35} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows temperature variations in a circular gauge using multiple ranges. In addition, the needle pointer and annotation help in displaying the temperature that has been measured.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure multiple ranges in the circular gauge. The <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/'>RangesDirective</a> collection can be used to define multiple ranges, each of which points to a different start and end value.
                    </p>
                    <p>
                        More information on the ranges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}