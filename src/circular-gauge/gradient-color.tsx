/**
 * Sample for gradient color
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs, GaugeTheme,
    PointersDirective, PointerDirective, Gradient, RangesDirective, RangeDirective
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

export class GradientColor extends SampleBase<{}, {}> {
    private circulargauge: CircularGaugeComponent;
    public gradientType: DropDownList; public element: DropDownList;
    private loaded: boolean = false;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
    }
    // custom code end
    public rangeLinearGradient : Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9E40DC', offset: '0%', opacity: 0.9 },
            { color: '#E63B86', offset: '70%', opacity: 0.9 },
        ]
    };
    public pointerLinearGradient : Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#FEF3F9', offset: '0%', opacity: 0.9 },
            { color: '#E63B86', offset: '70%', opacity: 0.9 }]
    };    
    public rangeRadialGradient: Object = {
        radius: '50%',
        innerPosition: { x: '50%', y: '50%' },
        outerPosition: { x: '50%', y: '50%' },
        colorStop: [
            { color: '#9E40DC', offset: '90%', opacity: 0.9 },
            { color: '#E63B86', offset: '160%', opacity: 0.9 }]
    };    
    public pointerRadialGradient: Object = {
        radius: '50%',
        innerPosition: { x: '50%', y: '50%' },
        outerPosition: { x: '50%', y: '50%' },
        colorStop: [
            { color: '#FEF3F9', offset: '0%', opacity: 0.9 },
            { color: '#E63B86', offset: '60%', opacity: 0.9 }]
    };    
    // custom code end
    // Code for Property Panel
    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.gradientType = new DropDownList({
                index: 0,
                width: 150,
                change: () => {
                    if (this.gradientType.value === 'radial' && this.element.value === 'range') {
                        this.circulargauge.axes[0].ranges[0].linearGradient = null;
                        this.circulargauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                        this.circulargauge.refresh();
                    }
                    if (this.element.value === 'range' && this.gradientType.value === 'linear') {
                        this.circulargauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                        this.circulargauge.axes[0].ranges[0].radialGradient = null;
                        this.circulargauge.refresh();
                    }
                    if (this.gradientType.value === 'radial' && this.element.value === 'pointer') {
                        this.circulargauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                        this.circulargauge.axes[0].pointers[0].linearGradient = null;
                        this.circulargauge.refresh();
                    }
                    if (this.gradientType.value === 'linear' && this.element.value === 'pointer') {
                        this.circulargauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                        this.circulargauge.axes[0].pointers[0].radialGradient = null;
                        this.circulargauge.refresh();
                    }
                }
            });
            this.gradientType.appendTo('#gradient');

            this.element = new DropDownList({
                index: 0,
                width: 150,
                change: () => {
                    if (this.gradientType.value === 'radial' && this.element.value === 'range') {
                        this.circulargauge.axes[0].ranges[0].linearGradient = null;
                        this.circulargauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                        this.circulargauge.axes[0].pointers[0].linearGradient = null;
                        this.circulargauge.axes[0].pointers[0].radialGradient = null;
                        this.circulargauge.refresh();
                    }
                    if (this.element.value === 'range' && this.gradientType.value === 'linear') {
                        this.circulargauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                        this.circulargauge.axes[0].ranges[0].radialGradient = null;
                        this.circulargauge.axes[0].pointers[0].linearGradient = null;
                        this.circulargauge.axes[0].pointers[0].radialGradient = null;
                        this.circulargauge.refresh();
                    }
                    if (this.gradientType.value === 'radial' && this.element.value === 'pointer') {
                        this.circulargauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                        this.circulargauge.axes[0].pointers[0].linearGradient = null;
                        this.circulargauge.axes[0].ranges[0].linearGradient = null;
                        this.circulargauge.axes[0].ranges[0].radialGradient = null;
                        this.circulargauge.refresh();
                    }
                    if (this.gradientType.value === 'linear' && this.element.value === 'pointer') {
                        this.circulargauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                        this.circulargauge.axes[0].pointers[0].radialGradient = null;
                        this.circulargauge.axes[0].ranges[0].linearGradient = null;
                        this.circulargauge.axes[0].ranges[0].radialGradient = null;
                        this.circulargauge.refresh();
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
                        <CircularGaugeComponent load={this.load.bind(this)} id='gauge' ref={circulargauge => this.circulargauge = circulargauge}
                            loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[Gradient]} />
                            <AxesDirective>
                                <AxisDirective radius='80%' startAngle={210} endAngle={150}
                                    minimum={0} maximum={100}
                                    majorTicks={{
                                        width: 0, interval: 10
                                    }} lineStyle={{ width: 0, color: 'transparent' }}
                                    minorTicks={{
                                        width: 0
                                    }} labelStyle={{
                                        font: {
                                            size: '12px',
                                            fontFamily: 'Roboto',
                                            fontWeight: 'Regular'
                                        },
                                        offset: 10
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={65} radius='85%' color='#E63B86' pointerWidth={12} cap={{
                                           radius: 12 , border: {color: '#E63B86', width: 2.5}, color: 'white'
                                        }} needleTail={{ length: '0%'}} needleStartWidth={2} animation={{
                                            enable: false
                                        }} >
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={120} startWidth={18} endWidth={18}
                                            color={'#E63B86'} linearGradient={ this.rangeLinearGradient} 
                                            roundedCornerRadius={10}/>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='' style={{"margin-top":"30px", "width": "60%", "margin-left": "-10px"}}>Gradient Type</div>
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
                                            <div id='' style={{"margin-top":"30px", "margin-left": "-10px"}}>Elements</div>
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
                This sample shows how linear gradient color and radial gradient color are applied to the circular gauge elements.
            </p>
                </div>
                <div id="description">
                <p>
                The circular gauge supports gradient coloring in a linear or radial manner. The gradient type can be changed using the <b>Gradient Type</b> dropdown list in the properties panel. In the same way, the element for which the gradient color should be applied is decided by the <b>Elements</b> dropdown list.
                </p>
                <p>
                </p>
                <br />
                    <p className='description-header'>Injecting Module</p>
                    <p>To apply gradient coloring in the circular gauge, we need to inject the <code>Gradient</code> module into the <code>services</code>.
                    </p>
                </div>
            </div>
        )
    }
}
