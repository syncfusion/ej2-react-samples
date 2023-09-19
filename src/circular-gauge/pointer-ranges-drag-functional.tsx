/**
 * Sample for pointer and range drag in the Circular Gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { PropertyPane } from '../common/property-pane';
import { CircularGaugeComponent, AxesDirective, ILoadedEventArgs, GaugeTheme, AxisDirective, IPointerDragEventArgs, Inject, AnnotationsDirective, AnnotationDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, TickModel, getRangeColor } from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const Drag = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    const [pointerValue, setPointerValue] = useState<String>('70');
    let gauge = useRef<CircularGaugeComponent>(null);
    let drag = useRef<HTMLInputElement>(null);
    let pointerDrag = useRef<CheckBoxComponent>(null);
    let rangesDrag = useRef<CheckBoxComponent>(null);
    let content: string = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';

    const onChartLoad = (): void => {
        document.getElementById('drag-container').setAttribute('title', '');
    };

    const dragMove = (args: IPointerDragEventArgs): void => {
        if (args.type.indexOf('pointer') > -1) {
            document.getElementById('pointerValue').innerHTML = String(Math.round(args.currentValue));
            drag.current.value = Math.round(args.currentValue).toString();
            gauge.current.setAnnotationValue(0, 0, content + Math.round(args.currentValue) + ' MPH</span></div > ');
        }
    };

    const dragEnd = (args: IPointerDragEventArgs): void => {
        if (isNaN(args.rangeIndex)) {
            setPointersValue(gauge.current, Math.round(args.currentValue));
        }
    };

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const dragChange = (): void => {
        let pointerValue: number = +drag.current.value;
        setPointerValue(String(Math.round(pointerValue)));
        setPointersValue(gauge.current, pointerValue);
    }

    const pointerDragChange = (): void => {
        let value: boolean = pointerDrag.current.checked;
        gauge.current.enablePointerDrag = value;
    }

    const rangesDragChange = (): void => {
        let value: boolean = rangesDrag.current.checked;
        gauge.current.enableRangeDrag = value;
    }

    const setPointersValue = (circulargauge: CircularGaugeComponent, pointerValue: number): void => {
        let color: string;
        if (pointerValue >= 0 && pointerValue <= 40) {
            color = '#30B32D';
        } else if (pointerValue >= 40 && pointerValue <= 100) {
            color = '#E5C31C';
        } else {
            color = '#F03E3E';
        }
        circulargauge.axes[0].pointers[0].color = color;
        circulargauge.axes[0].pointers[1].color = color;
        circulargauge.axes[0].pointers[0].animation.enable = false;
        circulargauge.axes[0].pointers[1].animation.enable = false;
        circulargauge.axes[0].pointers[0].needleTail.color = color;
        circulargauge.axes[0].pointers[1].needleTail.color = color;
        circulargauge.axes[0].pointers[0].cap.border.color = color;
        circulargauge.axes[0].pointers[1].cap.border.color = color;
        circulargauge.setPointerValue(0, 1, pointerValue);
        circulargauge.setPointerValue(0, 0, pointerValue);
        content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, content + pointerValue + ' MPH</span></div>');
    }

    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} loaded={onChartLoad.bind(this)} background='transparent' dragMove={dragMove.bind(this)} dragEnd={dragEnd.bind(this)} id='drag-container' ref={gauge} enablePointerDrag={true} enableRangeDrag={false}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={220} endAngle={140} radius='80%' minimum={0} maximum={120} majorTicks={{ useRangeColor: true }} lineStyle={{ width: 0 }} minorTicks={{ useRangeColor: true }} labelStyle={{ useRangeColor: true, font: { fontFamily: 'inherit' } }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;margin-left:-20px;"><span>70 MPH</span></div>' angle={180} radius='45%' zIndex='1'>
                                    </AnnotationDirective>
                                </AnnotationsDirective>
                                <PointersDirective>
                                    <PointerDirective value={70} radius='60%' markerWidth={5} cap={{ radius: 10, border: { width: 5, color: '#E5C31C' } }} needleTail={{ length: '0%', color: '#E5C31C' }} color='#E5C31C' />
                                    <PointerDirective value={70} radius='110%' color='#E5C31C' markerWidth={20} markerHeight={20} type='Marker' markerShape='InvertedTriangle' ></PointerDirective>
                                </PointersDirective>
                                <PointerDirective value={70} type="Marker" markerShape='InvertedTriangle' radius='110%' markerHeight={20} color='#E5C31C' markerWidth={20} />
                                <RangesDirective>
                                    <RangeDirective start={0} end={40} radius='108%' color='#30B32D' startWidth={8} endWidth={8} />
                                    <RangeDirective start={40} end={100} radius='108%' color='#E5C31C' startWidth={8} endWidth={8} />
                                    <RangeDirective start={100} end={120} radius='108%' color='#F03E3E' startWidth={8} endWidth={8} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: "-10px" }}>
                            <tbody>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "50%" }}>
                                        <div style={{ width: "110%", fontSize: "14px" }}>Pointer Value </div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div style={{ marginLeft: '5px' }}>
                                            <input type="range" id="value" onChange={dragChange.bind(this)} ref={drag} defaultValue="70" min="0" max="120" style={{ width: "100%", paddingLeft: '0px' }} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <span id='pointerValue' style={{ fontSize: "14px" }}>{pointerValue}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "20%" }}>
                                        <div id='enablePointer' style={{ width: "90%", fontSize: "14px" }}>Allow Pointer Drag</div>
                                    </td>
                                    <td style={{ width: "49%" }}>
                                        <div style={{ paddingTop: "0px", marginLeft: "-4px" }}>
                                            <CheckBoxComponent id='enable' checked={true} change={pointerDragChange.bind(this)} ref={pointerDrag} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "20%" }}>
                                        <div id='enablePointer' style={{ width: "90%", fontSize: "14px" }}>Allow Ranges Drag</div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div style={{ paddingTop: "0px", marginLeft: "-4px" }}>
                                            <CheckBoxComponent id='rangeDragEnable' checked={false} change={rangesDragChange.bind(this)} ref={rangesDrag} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates dragging a pointer and a range in a circular gauge. End-user can drag the pointer and the range by enabling the pointer drag and range drag options.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to move the pointer and range in the circular gauge via drag action. The <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#enablepointerdrag'>enablePointerDrag</a> property can be used to enable or disable the pointer drag functionality. Similarly, the <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#enablerangedrag'>enableRangeDrag</a> property can be used to enable or disable the range drag functionality.
                </p>
                <p>
                    More information on the pointer drag can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/#dragging-pointer">documentation section</a>. Likewise, the range drag information can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/#dragging-range">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Drag;
