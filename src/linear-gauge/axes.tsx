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
    private lastLabelElement: HTMLInputElement;
    private labelElement: HTMLInputElement;
    private typeElement: DropDownListComponent;
    private placeElement: DropDownListComponent;
    private markerElement: HTMLSelectElement;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
    }
    // custom code end
    // Code for Property Panel
    private minChange() {
        this.gaugeInstance.axes[0].minimum = parseInt(this.rangeMinElement.value, 10);
        document.getElementById('minValue').innerHTML = this.rangeMinElement.value;
        this.gaugeInstance.annotations[0].axisValue = (this.gaugeInstance.axes[0].pointers[0] as Pointer).currentValue;
        this.gaugeInstance.refresh();
    }
    private maxChange() {
        this.gaugeInstance.axes[0].maximum = parseInt(this.rangeMaxElement.value, 10);
        document.getElementById('maxValue').innerHTML = this.rangeMaxElement.value;
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

    private lastLabelChange() {
        this.gaugeInstance.axes[0].showLastLabel = this.lastLabelElement.checked;
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
                                <AxisDirective line={{ color: '#9E9E9E' }} majorTicks={{ color: '#9E9E9E', interval: 20 }} minorTicks={{ color: '#9E9E9E', interval: 2 }} maximum={115} labelStyle={{ offset: 48 }}>
                                    <PointersDirective>
                                        <PointerDirective value={20} height={15} width={15} color='#757575' offset={30}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div id="pointer" style="width:70px"><h1 style="font-size:14px;">${axes[0].pointers[0].currentValue} MPH</h1></div>'
                                    axisIndex={0}
                                    axisValue={20}
                                    x={10}
                                    y={60}
                                    zIndex='1'>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ marginBottom: '20px',  marginLeft: '-10px' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ width: '110%'}}>Axis Minimum </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.minChange.bind(this)} ref={d => this.rangeMinElement = d} name="range-min" step='5' id="min" defaultValue="0" min="0" max="115" style={{ width: '90%' }} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%'}}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px' }}>
                                            <span id='minValue'>0</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ width: '110%'}}>Axis Maximum </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div data-role='rangeslider'>
                                            <input type="range" onChange={this.maxChange.bind(this)} ref={d => this.rangeMaxElement = d} step='5' id="max" defaultValue="115" min="0" max="115" style={{ width: '90%' }} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%'}}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px' }}>
                                            <span id='maxValue'>115</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div  style={{ width: '100%'}}>Axis Inversed</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{paddingLeft: "10px", marginTop:"2px"}}>
                                            <input type="checkbox" onChange={this.inverseChange.bind(this)} ref={d => this.inversedElement = d} id='axisInversed' />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div  style={{ width: '100%'}}>Axis Opposed</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{paddingLeft: "10px", marginTop:"2px"}}>
                                            <input type="checkbox" onChange={this.opposedChange.bind(this)} ref={d => this.opposedElement = d} id='opposed' />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '100%'}}>Show Last Label</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{paddingLeft: "10px", marginTop:"2px"}}>
                                            <input type="checkbox" onChange={this.lastLabelChange.bind(this)} ref={d => this.lastLabelElement = d} id='lastlabel' />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '100%'}}>Label Format</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div className="e-float-input" style={{ 'marginTop': '0px' }}>
                                            <input id="format" onChange={this.labelChange.bind(this)} ref={d => this.labelElement = d} type="text" defaultValue="{value}" style={{ "width": "125%" , "paddingTop": "13px"}} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '100%'}}>Pointer Type</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={'125%'} id="pointerType" style={{ "width": "110%" }} change={this.typeChange.bind(this)} ref={d => this.typeElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Marker" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '100%'}}>Marker Placement</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                    <div>
                                            <DropDownListComponent width={'125%'} id="pointerPlace" style={{ "width": "110%" }} change={this.placeChange.bind(this)} ref={d => this.placeElement = d} dataSource={this.placelist} fields={{ text: 'value', value: 'value' }} value="Far" />
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
