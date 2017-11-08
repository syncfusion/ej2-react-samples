import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, Position, AnnotationsDirective, Annotations, Inject, AnnotationDirective, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { PropertyPane } from './property-pane';
import { SampleBase } from './sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export let range: string[] = ['#9ef47a', '#f4f47a', '#ed5e5e'];

/**
 * Lineargauge range sample
 */
export class Ranges extends SampleBase<{}, {}> {
    private gaugeInstance: LinearGaugeComponent;
    private indexElement: DropDownListComponent;
    private rangeColorElement: DropDownListComponent;
    private startElement: HTMLInputElement;
    private endElement: HTMLInputElement;
    private startWidthElement: HTMLInputElement;
    private endWidthElement: HTMLInputElement;
    private colorElement: HTMLInputElement;
    private indexChange() {
        this.startElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].start.toString();
        this.endElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].end.toString();
        this.startWidthElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].startWidth.toString();
        this.endWidthElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].endWidth.toString();
        this.colorElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].color.toString();
        document.getElementById('startWidthValue').innerHTML = 'Range Start Width <span>&nbsp;&nbsp;&nbsp;' + this.startWidthElement.value;
        document.getElementById('endWidthValue').innerHTML = 'Range End Width <span>&nbsp;&nbsp;&nbsp;' + this.endWidthElement.value;
        document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + this.startElement.value;
        document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + this.endElement.value;
        this.gaugeInstance.refresh();
    }
    private droplist: { [key: string]: Object }[] = [
        { value: '0',  text: 'Low'},
        { value: '1',  text: 'Moderate'},
        { value: '2',  text: 'High'},
    ];
    private modelist: { [key: string]: Object }[] = [
        { value: 'font',  text: 'Default Color'},
        { value: 'range',  text: 'Range Color'}
    ];
    private rangeColorChange() {
        this.gaugeInstance.axes[0].labelStyle.useRangeColor = (this.rangeColorElement.value === 'range') ? true : false;
        this.gaugeInstance.refresh();
    }

    private startChange() {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].start = parseInt(this.startElement.value, 10);
        document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + this.startElement.value;
        this.gaugeInstance.refresh();
    }

    private endChange() {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].end = parseInt(this.endElement.value, 10);
        document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + this.endElement.value;
        this.gaugeInstance.refresh();
    }

    private startWidthChange() {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].startWidth = parseInt(this.startWidthElement.value, 10);
        document.getElementById('startWidthValue').innerHTML = 'Range Start Width <span>&nbsp;&nbsp;&nbsp;' + this.startWidthElement.value;
        this.gaugeInstance.refresh();
    }

    private colorChange() {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].color = this.colorElement.value;
        this.gaugeInstance.refresh();
    }

    private endWidthChange() {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value as string, 10)].endWidth = parseInt(this.endWidthElement.value, 10);
        document.getElementById('endWidthValue').innerHTML = 'Range End Width <span>&nbsp;&nbsp;&nbsp;' + this.endWidthElement.value;
        this.gaugeInstance.refresh();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <LinearGaugeComponent id='gauge' ref={gauge => this.gaugeInstance = gauge} orientation='Horizontal'>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective majorTicks={{ height: 0 }} minorTicks={{ height: 0 }} line={{ width: 0 }} labelStyle={{ format: '{value}%', font: { color: '#424242' }, offset: 30 }}>
                                    <PointersDirective>
                                        <PointerDirective value={35} color='#757575' height={10} width={10} offset={-40} markerType='Triangle' placement='Near'>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={32} startWidth={15} endWidth={15} color='#30B32D'>
                                        </RangeDirective>
                                        <RangeDirective start={32} end={68} startWidth={15} endWidth={15} color='#FFDF00'>
                                        </RangeDirective>
                                        <RangeDirective start={68} end={100} startWidth={15} endWidth={15} color='#F03E3E'>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div id="pointer" style="width:20px"><h1 style="font-size:18px;color:#424242">35</h1></div>'
                                    axisIndex={0}
                                    axisValue={35}
                                    zIndex= '1'
                                    y={-50}>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr>
                                    <td>
                                        <div>Range Index</div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width={120} id="rangeIndex" style={{ "width": "auto" }} change={this.indexChange.bind(this)} ref={d => this.indexElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} text="Low" value="0" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Range Color</div>
                                    </td>
                                    <td>
                                        <div className="e-float-input" style={{ 'margin-top': '0px' }}>
                                            <input id="color" onChange={this.colorChange.bind(this)} ref={d => this.colorElement = d} type="text" defaultValue="#F03E3E" style={{ "width": "90%" }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Range Font Color</div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width={120} id="rangeColor" style={{ "width": "auto" }} change={this.rangeColorChange.bind(this)} ref={d => this.rangeColorElement = d} dataSource={this.modelist} fields={{ text: 'text', value: 'value' }} text="Default Color" value="font" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div id='startRangeValue'>Range Start <span>&nbsp;&nbsp;&nbsp;0</span> </div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.startChange.bind(this)} ref={d => this.startElement = d} name="range-min" id="start" defaultValue="0" min="0" max="100" style={{ width: '100px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div id='endRangeValue'>Range End <span>&nbsp;&nbsp;&nbsp;32</span> </div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.endChange.bind(this)} ref={d => this.endElement = d} id="end" defaultValue="732" min="0" max="100" style={{ width: '100px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div id='startWidthValue'>Range Start Width <span>&nbsp;&nbsp;&nbsp;10</span> </div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.startWidthChange.bind(this)} ref={d => this.startWidthElement = d} name="range-min" id="startWidth" defaultValue="15" min="0" max="30" style={{ width: '100px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div id='endWidthValue'>Range End Width <span>&nbsp;&nbsp;&nbsp;10</span> </div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.endWidthChange.bind(this)} ref={d => this.endWidthElement = d} id="endWidth" defaultValue="0" min="0" max="30" style={{ width: '100px' }} />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div >
        )
    }
}

ReactDOM.render(<Ranges />, document.getElementById('sample'));