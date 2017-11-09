/**
 * Sample for Gauge Customization
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, TickModel
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { DynamicDataSerive } from './customization.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Customization extends SampleBase<{}, {}> {
    private gauge1: CircularGauge;
    private usageGauge: CircularGauge = new CircularGauge(DynamicDataSerive.prototype.GetSubGauge1().gauge1);
    private randomGauge: CircularGauge = new CircularGauge(DynamicDataSerive.prototype.GetSubGauge1().gauge2);
    private image1: HTMLImageElement;
    private image2: HTMLImageElement;
    private isUsage: boolean = false;
    private isClicked: boolean = true;
    private loaded: boolean = false;
    private pointerValueElement: HTMLInputElement;
    public barColor: DropDownList; public rangeColor: DropDownList; public pointerColor: DropDownList;
    public random(): void {
        if (this.isClicked) {
            this.gauge1.destroy();
            this.isClicked = false;
        } else {
            this.usageGauge.destroy();
        }
        this.randomGauge.appendTo('#customization-container');
        this.isUsage = false;
        this.pointerValueElement.min = '1000';
        this.pointerValueElement.max = '2000';
        this.pointerValueElement.value = this.randomGauge.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + this.randomGauge.axes[0].pointers[0].value + '</span>';
        this.barColor.value = this.randomGauge.axes[0].pointers[0].color;
        this.rangeColor.value = this.randomGauge.axes[0].ranges[0].color;
        this.pointerColor.value = this.randomGauge.axes[0].pointers[1].color;
        this.pointerColor.enabled = true;
        document.getElementById('pointColor').className = 'e-enabled';
        document.getElementById('pointColor').style.visibility = 'visible';
        let currentLine: HTMLSelectElement = document.getElementById('random_line') as HTMLSelectElement;
        let exisLine: HTMLSelectElement = document.getElementById('usage_line') as HTMLSelectElement;
        currentLine.style.display = 'block';
        exisLine.style.display = 'none';
    }
    public usage(): void {
        if (this.isClicked) {
            this.gauge1.destroy();
            this.isClicked = false;
        } else {
            this.randomGauge.destroy();
        }
        this.usageGauge.appendTo('#customization-container');
        this.isUsage = true;
        this.pointerValueElement.min = '0.5';
        this.pointerValueElement.max = '100';
        this.pointerValueElement.value = this.usageGauge.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + this.usageGauge.axes[0].pointers[0].value + '</span>';
        this.barColor.value = this.usageGauge.axes[0].pointers[0].color;
        this.rangeColor.value = this.usageGauge.axes[0].ranges[0].color;
        this.pointerColor.enabled = false;
        document.getElementById('pointColor').className = 'e-disabled';
        let currentLine: HTMLSelectElement = document.getElementById('usage_line') as HTMLSelectElement;
        let exisLine: HTMLSelectElement = document.getElementById('random_line') as HTMLSelectElement;
        currentLine.style.display = 'block';
        exisLine.style.display = 'none';

    }
    public pointerValue(): void {
        let value: number = +this.pointerValueElement.value;
        if (!this.isClicked) {
            if (this.isUsage) {
                this.usageGauge.setPointerValue(0, 0, value);
                this.usageGauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + 'GB' + '</div>');
            } else {
                this.randomGauge.setPointerValue(0, 0, value);
                this.randomGauge.setPointerValue(0, 1, value);
                this.randomGauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>');
            }
        } else {
            this.gauge1.setPointerValue(0, 0, value);
            this.gauge1.setPointerValue(0, 1, value);
            this.gauge1.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>');
            this.randomGauge.axes[0].pointers[0].value = value;
            this.randomGauge.axes[0].pointers[1].value = value;
            this.randomGauge.axes[0].annotations[0].content = '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>';
        }
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + value + '</span>';
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent id='customization-container' loaded={this.onChartLoad.bind(this)} ref={gauge => this.gauge1 = gauge}
                            centerY='70%'>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={300} endAngle={60} radius='80%' minimum={999} maximum={2000}
                                    majorTicks={{
                                        width: 0
                                    }} lineStyle={{ width: 0 }}
                                    minorTicks={{
                                        width: 0
                                    }} labelStyle={{
                                        font: { size: '0px' }
                                    }}>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='<div style="color:#666666;font-size:35px;">1800</div>'
                                            angle={0} radius='110%' zIndex='1'>
                                        </AnnotationDirective>
                                    </AnnotationsDirective>
                                    <PointersDirective>
                                        <PointerDirective type='RangeBar' value={1800} radius='90%' color='#FFDD00' pointerWidth={30} animation={{
                                            duration: 0
                                        }} />
                                        <PointerDirective value={1800} radius='90%' color='#424242' pointerWidth={9} cap=
                                            {{ radius: 10, color: '#424242', border: { width: 0 } }} animation={{
                                                duration: 0
                                            }} />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={1000} end={2000} radius='90%' color='#E0E0E0' startWidth={30} endWidth={30} />
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <img id='random' src="src/circulargauge/images/gauge1.png" style={{ marginLeft: '25px', marginTop: '10px' }} onClick={this.random.bind(this)} ref={d => this.image1 = d} />
                                            <div id="random_line" style={{ display: "block", left: "0px", background: "#ff4081", "padding-top": "0px", height: "2px", width: "85px", margin: "2px 2px 2px 17px" }}></div>
                                        </td>
                                        <td>
                                            <img id='usage' src="src/circulargauge/images/gauge2.png" style={{ marginLeft: '25px', marginTop: '10px' }} onClick={this.usage.bind(this)} ref={d => this.image2 = d} />
                                            <div id="usage_line" style={{ display: "none", left: "0px", background: "#ff4081", "padding-top": "0px", height: "2px", width: "85px", margin: "2px 2px 2px 17px" }}></div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='currentPointerValue'>Current Value <span> &nbsp;&nbsp;&nbsp;1800</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="currentValue" defaultValue="1800" min="1000" max="2000" style={{ width: "90%" }} onChange={this.pointerValue.bind(this)} ref={d => this.pointerValueElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangebarColor'>RangeBar Color</div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="barColor" className="form-control">
                                                    <option value="#FFDD00">#FFDD00</option>
                                                    <option value="#00bdae">#00bdae</option>
                                                    <option value="#FF2680">#FF2680</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='range'>Range Color</div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="rangeColor" className="form-control">
                                                    <option value="#E0E0E0">#E0E0E0</option>
                                                    <option value="#7bb4eb">#7bb4eb</option>
                                                    <option value="#ea7a57">#ea7a57</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='pointColor'>Pointer Color</div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="pointerColor" className="form-control">
                                                    <option value="#424242" >#424242</option>
                                                    <option value="#6f6fe2">#6f6fe2</option>
                                                    <option value="#9e480e">#9e480e</option>
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
                        This sample demonstrates customization of circulargauge.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to customize the gauge elements such as <code>pointers</code> and <code>range</code>.
                        Here a needle and range bar are added to show the current value and its appearance
                        can be customized by using options in property panel.
                    </p>
                    <p>
                        More information on the range and pointer customization can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }

    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.barColor = new DropDownList({
                index: 0,
                width: 130,
                change: () => {
                    let barColor: string = this.barColor.value.toString();
                    if (!this.isClicked) {
                        if (this.isUsage) {
                            this.usageGauge.axes[0].pointers[0].color = barColor;
                            this.usageGauge.refresh();
                        } else {
                            this.randomGauge.axes[0].pointers[0].color = barColor;
                            this.randomGauge.refresh();
                        }
                    } else {
                        this.gauge1.axes[0].pointers[0].color = barColor;
                        this.gauge1.refresh();
                        this.randomGauge.axes[0].pointers[0].color = barColor;
                    }
                }
            });
            this.barColor.appendTo('#barColor');
            this.rangeColor = new DropDownList({
                index: 0,
                width: 130,
                change: () => {
                    let barColor: string = this.rangeColor.value.toString();
                    if (!this.isClicked) {
                        if (this.isUsage) {
                            this.usageGauge.axes[0].ranges[0].color = barColor;
                            this.usageGauge.refresh();
                        } else {
                            this.randomGauge.axes[0].ranges[0].color = barColor;
                            this.randomGauge.refresh();
                        }
                    } else {
                        this.gauge1.axes[0].ranges[0].color = barColor;
                        this.gauge1.refresh();
                        this.randomGauge.axes[0].ranges[0].color = barColor;
                    }
                }
            });
            this.rangeColor.appendTo('#rangeColor');
            this.pointerColor = new DropDownList({
                index: 0,
                width: 130,
                change: () => {
                    let barColor: string = this.pointerColor.value.toString();
                    if (!this.isClicked) {
                        if (!this.isUsage) {
                            this.randomGauge.axes[0].pointers[1].color = barColor;
                            this.randomGauge.axes[0].pointers[1].cap.border.color = barColor;
                            this.randomGauge.axes[0].pointers[1].cap.color = barColor;
                            this.randomGauge.refresh();
                        }
                    } else {
                        this.gauge1.axes[0].pointers[1].color = barColor;
                        this.gauge1.axes[0].pointers[1].cap.border.color = barColor;
                        this.gauge1.axes[0].pointers[1].cap.color = barColor;
                        this.gauge1.refresh();
                        this.randomGauge.axes[0].pointers[1].color = barColor;
                        this.randomGauge.axes[0].pointers[1].cap.border.color = barColor;
                        this.randomGauge.axes[0].pointers[1].cap.color = barColor;
                    }
                }
            });
            this.pointerColor.appendTo('#pointerColor');
        }
        let selectedTheme: string = location.hash.split('/')[1]; let color: string;
        if (selectedTheme === 'bootstrap') {
            color = '#a16ee5';
        } else if (selectedTheme === 'fabric') {
            color = '#1783FF';
        } else {
            color = '#ff4081';
        }
        let exisLine: HTMLSelectElement = document.getElementById('usage_line') as HTMLSelectElement;
        let currentLine: HTMLSelectElement = document.getElementById('random_line') as HTMLSelectElement;
        exisLine.style.background = color; currentLine.style.background = color;
    }
}