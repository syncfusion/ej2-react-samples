/**
 * Sample for Pointer drag
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, ILoadedEventArgs, GaugeTheme, AxisDirective, IPointerDragEventArgs, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, TickModel, getRangeColor,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    
export class Drag extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    private drag: HTMLInputElement;
    private pointerDrag: HTMLInputElement;
    private content: string = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';
    public dragChange(): void {
        let pointerValue: number = +this.drag.value;
        document.getElementById('pointerValue').innerHTML = 'Pointer Value <span> &nbsp;&nbsp;&nbsp;' + Math.round(pointerValue);
        this.setPointersValue(this.gauge, pointerValue);
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as GaugeTheme;
    }
    public pointerDragChange(): void {
        let value: boolean = this.pointerDrag.checked;
        this.gauge.enablePointerDrag = value;
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
        circulargauge.axes[0].pointers[0].animation.enable = true;
        circulargauge.axes[0].pointers[1].animation.enable = true;
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
                    <div className='col-lg-9'>
                        <CircularGaugeComponent load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} dragMove={this.dragMove.bind(this)} dragEnd={this.dragEnd.bind(this)} id='drag-container' ref={gauge => this.gauge = gauge} enablePointerDrag={true}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={210} endAngle={140} radius='80%' minimum={0} maximum={120}
                                    majorTicks={{
                                        useRangeColor: true
                                    }} lineStyle={{ width: 0, color: '#9E9E9E' }}
                                    minorTicks={{
                                        useRangeColor: true
                                    }} labelStyle={{
                                        useRangeColor: true
                                    }}>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='<div style="font-size: 14px;color:#FFDD00;font-weight: lighter;font-style: oblique;"><span>70 MPH</span></div>'
                                            angle={180} radius='45%' zIndex='1'>
                                        </AnnotationDirective>
                                    </AnnotationsDirective>
                                    <PointersDirective>
                                        <PointerDirective value={70} type="Marker" markerShape='InvertedTriangle' radius='110%' markerHeight={20} color='#E5C31C' markerWidth={20} />
                                        <PointerDirective value={70} radius='60%'
                                            cap={{
                                                radius: 10, border: { width: 5, color: '#E5C31C' }
                                            }}
                                            needleTail={{
                                                length: '0%', color: '#E5C31C'
                                            }} color='#E5C31C' />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={40} radius='108%' color='#30B32D' startWidth={8} endWidth={8} />
                                        <RangeDirective start={40} end={100} radius='108%' color='#FFDD00' startWidth={8} endWidth={8} />
                                        <RangeDirective start={100} end={120} radius='108%' color='#F03E3E' startWidth={8} endWidth={8} />
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: "50px" }}>
                                        <td style={{ width: "30%" }}>
                                            <div id='pointerValue'>Pointer Value <span> &nbsp;&nbsp;&nbsp;70</span> </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <input type="range" id="value" onChange={this.dragChange.bind(this)} ref={d => this.drag = d} defaultValue="70" min="0" max="120" style={{ width: "90%" }} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td style={{ width: "20%" }}>
                                            <div id='enablePointer'>Enable Drag</div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <input type="checkbox" onChange={this.pointerDragChange.bind(this)} ref={d => this.pointerDrag = d} id="enable" defaultChecked={true} style={{ width: "90%" }} />
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
                This sample visualizes pointer drag in circular gauge. Position of pointer value can be changed by using <code>Pointer Value</code> and we can drag the pointer by enabling drag option.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to move pointers in gauge using drag and drop. Use <code>enablePointerDrag</code>        property, to achieve this behavior.
                    </p>
                    <br />
                    <p>In this sample, you can drag the pointer using mouse or touch, the pointer value will be updated in an annotation placed
                        in the gauge.
                    </p>
                    <p>
                        More information on the gauge can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('drag-container').setAttribute('title', '');
    };

    public dragMove(args: IPointerDragEventArgs): void {
        document.getElementById('pointerValue').innerHTML = 'Pointer Value <span> &nbsp;&nbsp;&nbsp;' + Math.round(args.currentValue);
        this.drag.value = Math.round(args.currentValue).toString();
        this.gauge.setAnnotationValue(0, 0, this.content + Math.round(args.currentValue) + ' MPH</span></div > ');
    };
    public dragEnd(args: IPointerDragEventArgs): void {
        this.setPointersValue(this.gauge, Math.round(args.currentValue));
    };
}