/**
 * Sample to design radial slider using the Circular Gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, IPointerDragEventArgs, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, ILoadedEventArgs, GaugeTheme
} from '@syncfusion/ej2-react-circulargauge';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

function RadialSlider() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge: CircularGauge;
    let pointerValue: number;

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    function dragMove(args: IPointerDragEventArgs): void {
        pointerValue = args.currentValue;
        if (pointerValue != null) {
            gauge.setPointerValue(0, 0, pointerValue);
            gauge.setRangeValue(0, 0, 0, pointerValue);
            gauge.setRangeValue(0, 1, pointerValue, 100);
            gauge.setAnnotationValue(0, 0, '<div style="font-style: oblique; margin-left: 5px;font-size: 20px; margin-top: -2px;"><span>' + Math.ceil(pointerValue) + '%</span></div>');
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <CircularGaugeComponent load={load.bind(this)} dragMove={dragMove.bind(this)} enableRangeDrag={true} enablePointerDrag={true} id='custom-labels' ref={g => gauge = g} background='transparent'>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective startAngle={0} endAngle={0} radius='80%'
                            majorTicks={{
                                height: 0
                            }} lineStyle={{ width: 0 }}
                            minorTicks={{
                                height: 0
                            }} labelStyle={{
                                offset: -1,
                                font: {
                                    size: '0px'
                                }
                            }}>
                            <PointersDirective>
                                <PointerDirective type='Marker' value={30} markerShape='Circle' color='#2C75DC' radius='97%' markerWidth={25} markerHeight={25} animation={{ enable: false }}>
                                </PointerDirective>
                            </PointersDirective>
                            <RangesDirective>
                                <RangeDirective start={0} end={30} color='#2C75DC' startWidth={12} endWidth={12} radius='100%'>
                                </RangeDirective>
                                <RangeDirective start={30} end={100} color='#BFD6F5' startWidth={12} endWidth={12} radius='100%'>
                                </RangeDirective>
                            </RangesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective
                                    content='<div style="font-style: oblique; font-size: 20px; margin-top: -2px; margin-left: 5px"><span>30%</span></div>'
                                    angle={180} radius='0%' zIndex='1' />
                            </AnnotationsDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how to create a range slider by utilizing the functions available in the circular gauge.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a new range slider in the circular gauge. It is possible to achieve this by combining ranges and a marker pointer. The marker pointer has been made interactive, so the value changes as you drag it.
                </p>
                <p>
                    More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                </p>
            </div>
        </div >
    )
}

export default RadialSlider;