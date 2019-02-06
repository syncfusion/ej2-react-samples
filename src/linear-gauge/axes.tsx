/**
 * Sample for Axes
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, Point, MarkerType, Placement, AxesDirective, Annotations, AxisDirective, PointersDirective, PointerDirective, AnnotationDirective, AnnotationsDirective, Inject, Pointer } from '@syncfusion/ej2-react-lineargauge';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';


export class Axes extends SampleBase<{}, {}> {
    private gaugeInstance: LinearGaugeComponent;
    private rangeMinElement: HTMLInputElement;
    private rangeMaxElement: HTMLInputElement;
    private inversedElement: HTMLInputElement;
    private opposedElement: HTMLInputElement;
    private labelElement: HTMLInputElement;
    private typeElement: DropDownListComponent;
    private placeElement: DropDownListComponent;
    private markerElement: HTMLSelectElement;
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as LinearGaugeTheme;
    }
    private minChange() {
        this.gaugeInstance.axes[0].minimum = parseInt(this.rangeMinElement.value, 10);
        document.getElementById('minValue').innerHTML = 'Axis Minimum <span>&nbsp;&nbsp;&nbsp;' + this.rangeMinElement.value;
        this.gaugeInstance.annotations[0].axisValue = (this.gaugeInstance.axes[0].pointers[0] as Pointer).currentValue;
        this.gaugeInstance.refresh();
    }
    private maxChange() {
        this.gaugeInstance.axes[0].maximum = parseInt(this.rangeMaxElement.value, 10);
        document.getElementById('maxValue').innerHTML = 'Axis Maximum <span>&nbsp;&nbsp;&nbsp;' + this.rangeMaxElement.value;
        this.gaugeInstance.annotations[0].axisValue = (this.gaugeInstance.axes[0].pointers[0] as Pointer).currentValue;
        this.gaugeInstance.refresh();
    }

    private inverseChange() {
        this.gaugeInstance.axes[0].isInversed = this.inversedElement.checked;
        this.gaugeInstance.refresh();
    }

    private opposedChange() {
        this.gaugeInstance.axes[0].opposedPosition = this.opposedElement.checked;
        if (this.opposedElement.checked) {
            this.gaugeInstance.axes[0].pointers[0].placement = 'Near';
            this.gaugeInstance.axes[0].pointers[0].markerType = 'Triangle';
            this.gaugeInstance.axes[0].pointers[0].offset = -20;
            this.gaugeInstance.axes[0].labelStyle.offset = 0;
            this.gaugeInstance.annotations[0].x = 10;
            this.gaugeInstance.annotations[0].y = -60;
        } else {
            this.gaugeInstance.axes[0].pointers[0].placement = 'Far';
            this.gaugeInstance.axes[0].pointers[0].offset = 0;
            this.gaugeInstance.axes[0].pointers[0].offset = 30;
            this.gaugeInstance.axes[0].pointers[0].markerType = 'InvertedTriangle';
            this.gaugeInstance.axes[0].labelStyle.offset = 38;
            this.gaugeInstance.annotations[0].x = 10;
            this.gaugeInstance.annotations[0].y = 60;
        }
        this.gaugeInstance.refresh();
    }

    private labelChange() {
        this.gaugeInstance.axes[0].labelStyle.format = this.labelElement.value.indexOf('{value}') > -1 ? this.labelElement.value : this.gaugeInstance.axes[0].labelStyle.format;
        this.gaugeInstance.refresh();
    }

    private typeChange() {
        this.gaugeInstance.axes[0].pointers[0].type = this.typeElement.value as Point;
        this.placeElement.enabled = (this.typeElement.value === 'Marker');
        this.gaugeInstance.refresh();
    }

    private placeChange() {
        this.gaugeInstance.axes[0].pointers[0].placement = this.placeElement.value as Placement;
        this.gaugeInstance.refresh();
    }
    private droplist: { [key: string]: Object }[] = [
        { value: 'Marker'},
        { value: 'Bar'}
    ];
    private placelist: { [key: string]: Object }[] = [
        { value: 'Near'},
        { value: 'Center'},
        { value: 'Far'}
    ];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <LinearGaugeComponent load={this.load.bind(this)} id='gauge' ref={gauge => this.gaugeInstance = gauge} orientation='Horizontal'>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective line={{ color: '#9E9E9E' }} majorTicks={{ color: '#9E9E9E', interval: 10 }} minorTicks={{ color: '#9E9E9E', interval: 2 }} labelStyle={{ offset: 48 }}>
                                    <PointersDirective>
                                        <PointerDirective value={10} height={15} width={15} color='#757575' offset={30}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div id="pointer" style="width:70px"><h1 style="font-size:14px;">${axes[0].pointers[0].currentValue} MPH</h1></div>'
                                    axisIndex={0}
                                    axisValue={10}
                                    x={10}
                                    y={60}
                                    zIndex='1'>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div id='minValue'>Axis Minimum <span>&nbsp;&nbsp;&nbsp;40</span> </div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.minChange.bind(this)} ref={d => this.rangeMinElement = d} name="range-min" step='5' id="min" defaultValue="0" min="0" max="100" style={{ width: '100px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div id='maxValue'>Axis Maximum <span>&nbsp;&nbsp;&nbsp;80</span> </div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.maxChange.bind(this)} ref={d => this.rangeMaxElement = d} step='5' id="max" defaultValue="80" min="0" max="100" style={{ width: '100px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Axis Inversed</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onChange={this.inverseChange.bind(this)} ref={d => this.inversedElement = d} id='axisInversed' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Axis Opposed</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onChange={this.opposedChange.bind(this)} ref={d => this.opposedElement = d} id='opposed' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Label Format</div>
                                    </td>
                                    <td>
                                        <div className="e-float-input" style={{ 'margin-top': '0px' }}>
                                            <input id="format" onChange={this.labelChange.bind(this)} ref={d => this.labelElement = d} type="text" defaultValue="{value}" style={{ "width": "100px" }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Pointer type</div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width={120} id="pointerType" style={{ "width": "auto" }} change={this.typeChange.bind(this)} ref={d => this.typeElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Marker" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Marker Placement</div>
                                    </td>
                                    <td>
                                    <div>
                                            <DropDownListComponent width={120} id="pointerPlace" style={{ "width": "auto" }} change={this.placeChange.bind(this)} ref={d => this.placeElement = d} dataSource={this.placelist} fields={{ text: 'value', value: 'value' }} value="Far" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates the axis and pointers feature in the linear gauge. Axis and pointers can be customized by using options available in the panel.
             </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to customize the axes and pointers. Use <code>format</code> of labelStyle property
                    to customize the axis labels and use <code>type</code>, <code>markerType</code> and <code>placement</code> properties
                    to customize the pointers in linear gauge.
    </p>
                    <p>
                        More information about linear gauge can be found in this <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation section</a>.
    </p>
                </div>
            </div >
        )
    }
}
