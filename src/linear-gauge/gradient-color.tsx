/**
 * Sample for default gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective,
    Inject, PointersDirective, PointerDirective,
    RangeDirective,RangesDirective, Gradient
} from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { PropertyPane } from '../common/property-pane';

export class GradientColor extends SampleBase<{}, {}> {
    private gauge: LinearGaugeComponent;
    public gradientType: DropDownList; public element: DropDownList;
    private loaded: boolean = false;
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as LinearGaugeTheme;
    }
    public rangeLinearGradient: Object = {
        startValue: "0%",
        endValue: "100%",
        colorStop: [{ color: "#fef3f9", offset: "0%", opacity: 1 },
        { color: " #f54ea2", offset: "100%", opacity: 1 }
        ]};
    public rangeRadialGradient: Object = {
        radius: "65%",
        outerPosition: { x: "50%", y: "70%" },
        innerPosition: { x: "60%", y: "60%" },
        colorStop: [{ color: "#fff5f5", offset: "5%", opacity: 0.9 },
        { color: " #f54ea2", offset: "100%", opacity: 0.9 }
        ]};
    public pointerLinearGradient: Object = {
        startValue: "0%",
        endValue: "100%",
        colorStop: [{ color: "#fef3f9", offset: "0%", opacity: 1 },
        { color: " #f54ea2", offset: "100%", opacity: 1 }
        ]};
    public pointerRadialGradient: Object = {
        radius: "60%",
        outerPosition: { x: "50%", y: "50%" },
        innerPosition: { x: "50%", y: "50%" },
        colorStop: [{ color: "#fff5f5", offset: "0%", opacity: 0.9 },
        { color: "#f54ea2", offset: "100%", opacity: 0.8 }
    ]};
    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.gradientType = new DropDownList({
                index: 0,
                width: 120,
                change: () => {
                    if (this.gradientType.value === 'radial' && this.element.value === 'range') {
                        this.gauge.axes[0].ranges[0].linearGradient = null;
                        this.gauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                        this.gauge.refresh();
                    }
                    if (this.element.value === 'range' && this.gradientType.value === 'linear') {
                        this.gauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                        this.gauge.axes[0].ranges[0].radialGradient = null;
                        this.gauge.refresh();
                    }
                    if (this.gradientType.value === 'radial' && this.element.value === 'pointer') {
                        this.gauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                        this.gauge.axes[0].pointers[0].linearGradient = null;
                        this.gauge.refresh();
                    }
                    if (this.gradientType.value === 'linear' && this.element.value === 'pointer') {
                        this.gauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                        this.gauge.axes[0].pointers[0].radialGradient = null;
                        this.gauge.refresh();
                    }
                }
            });
            this.gradientType.appendTo('#gradient');

            this.element = new DropDownList({
                index: 0,
                width: 120,
                change: () => {
                    if (this.gradientType.value === 'radial' && this.element.value === 'range') {
                        this.gauge.axes[0].ranges[0].linearGradient = null;
                        this.gauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                        this.gauge.axes[0].pointers[0].linearGradient = null;
                        this.gauge.axes[0].pointers[0].radialGradient = null;
                        this.gauge.refresh();
                    }
                    if (this.element.value === 'range' && this.gradientType.value === 'linear') {
                        this.gauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                        this.gauge.axes[0].ranges[0].radialGradient = null;
                        this.gauge.axes[0].pointers[0].linearGradient = null;
                        this.gauge.axes[0].pointers[0].radialGradient = null;
                        this.gauge.refresh();
                    }
                    if (this.gradientType.value === 'radial' && this.element.value === 'pointer') {
                        this.gauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                        this.gauge.axes[0].pointers[0].linearGradient = null;
                        this.gauge.axes[0].ranges[0].linearGradient = null;
                        this.gauge.axes[0].ranges[0].radialGradient = null;
                        this.gauge.refresh();
                    }
                    if (this.gradientType.value === 'linear' && this.element.value === 'pointer') {
                        this.gauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                        this.gauge.axes[0].pointers[0].radialGradient = null;
                        this.gauge.axes[0].ranges[0].linearGradient = null;
                        this.gauge.axes[0].ranges[0].radialGradient = null;
                        this.gauge.refresh();
                    }
        
                }
            });
            this.element.appendTo('#element');
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-md-8 control-section'>
                        <LinearGaugeComponent load={this.load.bind(this)} id='gauge' container={{ width: 30, offset: 30 }}
                            loaded={this.onChartLoad.bind(this)} orientation='Horizontal' ref={gauge => this.gauge = gauge}>
                            <Inject services={[Gradient]} />
                            <AxesDirective>
                                <AxisDirective minimum = {0} maximum = {100} line = {{ width: 0}}
                                 minorTicks={{ height:0 }} 
                                 majorTicks={{ height: 0, interval: 25 }} 
                                 labelStyle={{ font: { color: '#424242'}, offset: 55 }}>
                                
                               <RangesDirective>
                                       <RangeDirective start={0} end={80} startWidth={30} endWidth={30}
                                                color='#f54ea2' offset={30} linearGradient={ this.rangeLinearGradient }>
                                       </RangeDirective>
                                </RangesDirective>

                                 <PointersDirective>
                                        <PointerDirective value={80} height={25} width={35} offset={-44}
                                                        markerType='Triangle' placement='Near' color='#f54ea2'>
                                        </PointerDirective>
                                    </PointersDirective> 
                                </AxisDirective>
                            </AxesDirective>
                            </LinearGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='' style={{"margin-top":"30px", "width": "120px"}}>Gradient Type</div>
                                        </td>
                                        <td>
                                            <div style={{"margin-top":"20px", "margin-left":"-15px"}}>
                                                <select id="gradient" className="form-control">
                                                    <option value="linear">Linear Gradient</option>
                                                    <option value="radial">Radial Gradient</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='' style={{"margin-top":"30px"}}>Elements</div>
                                        </td>
                                        <td>
                                            <div style={{"margin-top":"30px", "margin-left":"-15px"}}>
                                                <select id="element" className="form-control">
                                                    <option value="range">Range</option>
                                                    <option value="pointer">Pointer</option>
                                                </select>
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
                    This sample shows how linear gradient color and radial gradient color are applied to the linear gauge elements.
           </p>
                </div>
                <div id="description">
                <p>
                The linear gauge supports gradient coloring in a linear or radial manner. The gradient type can be changed using the <b>Gradient Type</b> dropdown list in the properties panel. In the same way, the element for which the gradient color should be applied is decided by the <b>Elements</b> dropdown list.
                </p>
                <p>
                </p>
                <br />
                    <p className='description-header'>Injecting Module</p>
                    <p>To apply gradient coloring in the linear gauge, we need to inject the <code>Gradient</code> module into the <code>services</code>.
                    </p>
                </div>
            </div >
        )
    }
}
