/**
 * Sample for pointer and range drag in the Circular Gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, ILoadedEventArgs, GaugeTheme, AxisDirective, IPointerDragEventArgs, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, TickModel, getRangeColor,
} from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Drag extends SampleBase<{}, {}> {

    private gauge: CircularGaugeComponent;
    private drag: HTMLInputElement;
    private pointerDrag: CheckBoxComponent;
    private rangesDrag: CheckBoxComponent;
    private content: string = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';

    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('drag-container').setAttribute('title', '');
    };

    public dragMove(args: IPointerDragEventArgs): void {
        if (args.type.indexOf('pointer') > -1) {
            document.getElementById('pointerValue').innerHTML = String(Math.round(args.currentValue));
            this.drag.value = Math.round(args.currentValue).toString();
            this.gauge.setAnnotationValue(0, 0, this.content + Math.round(args.currentValue) + ' MPH</span></div > ');
        }
    };
    public dragEnd(args: IPointerDragEventArgs): void {
        if (isNaN(args.rangeIndex)) {
            this.setPointersValue(this.gauge, Math.round(args.currentValue));
        }
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    public dragChange(): void {
        let pointerValue: number = +this.drag.value;
        document.getElementById('pointerValue').innerHTML = String(Math.round(pointerValue));
        this.setPointersValue(this.gauge, pointerValue);
    }

    public pointerDragChange(): void {
        let value: boolean = this.pointerDrag.checked;
        this.gauge.enablePointerDrag = value;
    }

    public rangesDragChange(): void {
        let value: boolean = this.rangesDrag.checked;
        this.gauge.enableRangeDrag = value;
    }

    public setPointersValue(circulargauge: CircularGaugeComponent, pointerValue: number): void {
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
        this.content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, this.content + pointerValue + ' MPH</span></div>');
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} background='transparent' dragMove={this.dragMove.bind(this)} dragEnd={this.dragEnd.bind(this)} id='drag-container' ref={gauge => this.gauge = gauge} enablePointerDrag={true} enableRangeDrag={false}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={220} endAngle={140} radius='80%' minimum={0} maximum={120}
                                    majorTicks={{
                                        useRangeColor: true
                                    }} lineStyle={{ width: 0 }}
                                    minorTicks={{
                                        useRangeColor: true
                                    }} labelStyle={{
                                        useRangeColor: true,
                                        font: {
                                            fontFamily: 'inherit'
                                        }
                                    }}>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;margin-left:-20px;"><span>70 MPH</span></div>'
                                            angle={180} radius='45%' zIndex='1'>
                                        </AnnotationDirective>
                                    </AnnotationsDirective>
                                    <PointersDirective>
                                        <PointerDirective value={70} radius='60%' markerWidth={5}
                                            cap={{
                                                radius: 10, border: { width: 5, color: '#E5C31C' }
                                            }}
                                            needleTail={{
                                                length: '0%', color: '#E5C31C'
                                            }} color='#E5C31C' />
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
                                            <div style={{ width: "110%", fontSize:"14px" }}>Pointer Value </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div style={{ marginLeft: '5px' }}>
                                                <input type="range" id="value" onChange={this.dragChange.bind(this)} ref={d => this.drag = d} defaultValue="70" min="0" max="120" style={{ width: "100%", paddingLeft: '0px' }} />
                                            </div>
                                        </td>
                                        <td style={{ width: '10%' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <span id='pointerValue' style={{ fontSize:"14px" }}>70</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td style={{ width: "20%" }}>
                                            <div id='enablePointer' style={{ width: "90%", fontSize:"14px" }}>Allow Pointer Drag</div>
                                        </td>
                                        <td style={{ width: "49%" }}>
                                            <div style={{ paddingTop: "0px", marginLeft: "-4px" }}>
                                                <CheckBoxComponent id='enable' checked={true} change={this.pointerDragChange.bind(this)} ref={d => this.pointerDrag = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td style={{ width: "20%" }}>
                                            <div id='enablePointer' style={{ width: "90%", fontSize:"14px" }}>Allow Ranges Drag</div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div style={{ paddingTop: "0px", marginLeft: "-4px" }}>
                                                <CheckBoxComponent id='rangeDragEnable' checked={false} change={this.rangesDragChange.bind(this)} ref={d => this.rangesDrag = d} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates dragging a pointer and a range in a circular gauge. End-user can drag the pointer and the range by enabling the pointer drag and range drag options.
                    </p>
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
}
