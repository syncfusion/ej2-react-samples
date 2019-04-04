/**
 * Sample for Ranges
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    Annotations, AnnotationsDirective, AnnotationDirective, ILoadedEventArgs, GaugeTheme,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    
export class Range extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    private startElement: HTMLInputElement;
    private endElement: HTMLInputElement;
    private startWidthElement: HTMLInputElement;
    private endWidthElement: HTMLInputElement;
    private enableElement: HTMLInputElement;
    private radiusElement: HTMLInputElement;
    private loaded: boolean = false;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as GaugeTheme;
    }
    // custom code end
    // Code for Property Panel
    public start(): void {
        let index: number = +this.listObj.value;
        let min: number = +this.startElement.value;
        document.getElementById('rangeStart').innerHTML = 'Range Start <span> &nbsp;&nbsp;&nbsp;' + min;
        this.gauge.axes[0].ranges[index].start = min;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }

    public end(): void {
        let index: number = +this.listObj.value;
        let max: number = +this.endElement.value;
        document.getElementById('rangeEnd').innerHTML = 'Range End <span> &nbsp;&nbsp;&nbsp;' + max;
        this.gauge.axes[0].ranges[index].end = max;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }

    public startWidth(): void {
        let index: number = +this.listObj.value;
        let startWidth: number = +this.startWidthElement.value;
        document.getElementById('rangeStartWidth').innerHTML = 'Start Width <span> &nbsp;&nbsp;&nbsp;' + startWidth;
        this.gauge.axes[0].ranges[index].startWidth = startWidth;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }

    public endWidth(): void {
        let index: number = +this.listObj.value;
        let endWidth: number = +this.endWidthElement.value;
        document.getElementById('rangeEndWidth').innerHTML = 'End Width <span> &nbsp;&nbsp;&nbsp;' + endWidth;
        this.gauge.axes[0].ranges[index].endWidth = endWidth;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }

    public radius(): void {
        let index: number = +this.listObj.value;
        let radius: number = +this.radiusElement.value;
        document.getElementById('roundedRadius').innerHTML = 'Corner Radius <span> &nbsp;&nbsp;&nbsp;' + radius;
        this.gauge.axes[0].ranges[index].roundedCornerRadius = radius;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }

    public enable(): void {
        let index: number = +this.listObj.value;
        let useRangeColor: boolean = this.enableElement.checked;
        this.gauge.axes[0].labelStyle.useRangeColor = useRangeColor;
        this.gauge.axes[0].majorTicks.useRangeColor = useRangeColor;
        this.gauge.axes[0].minorTicks.useRangeColor = useRangeColor;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }
    public colortObj: DropDownList;
    public listObj: DropDownList;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent load={this.load.bind(this)} id='range-container' ref={gauge => this.gauge = gauge} loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={210} radius='80%' endAngle={150} minimum={0} maximum={120}
                                    majorTicks={{
                                        height: 10, offset: 5,
                                    }} lineStyle={{ width: 10, color: 'transparent' }}
                                    minorTicks={{
                                        height: 0
                                    }} labelStyle={{
                                        position: 'Inside',
                                        font: {
                                            size: '12px',
                                            fontFamily: 'Roboto', fontStyle: 'Regular'
                                        },
                                        useRangeColor: false
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={65} radius='60%'  pointerWidth={8} needleTail={{
                                            length: '18%' 
                                        }} cap={{
                                            radius: 7
                                        }} />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={40} color='#30B32D' />
                                        <RangeDirective start={40} end={80} color='#FFDD00' />
                                        <RangeDirective start={80} end={120} color='#F03E3E' />
                                    </RangesDirective>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>'
                                            angle={0} zIndex='1' radius='30%'>
                                        </AnnotationDirective>
                                        <AnnotationDirective content='<div><span style="font-size:24px; color:#424242; font-family:Regular">65 MPH</span></div>'
                                        angle={180} zIndex='1' radius='40%'>
                                        </AnnotationDirective>
                                    </AnnotationsDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div> Select Range </div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="rangeSelect" className="form-control" style={{ width: '90%' }}>
                                                    <option value="0"> Low</option>
                                                    <option value="1">Medium</option>
                                                    <option value="2">High</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangeStart'>Range Start <span> &nbsp;&nbsp;&nbsp;0</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="start" defaultValue="0" min="0" max="120" style={{ width: '90%' }} onChange={this.start.bind(this)} ref={d => this.startElement = d} />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangeEnd'>Range End <span> &nbsp;&nbsp;&nbsp;40</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="end" defaultValue="40" min="0" max="120" style={{ width: '90%' }} onChange={this.end.bind(this)} ref={d => this.endElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id=''>Range Color</div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="rangeColor" className="form-control">
                                                    <option value="#30B32D">#30B32D</option>
                                                    <option value="#FFDD00">#FFDD00</option>
                                                    <option value="#F03E3E">#F03E3E</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ width: '20%' }}>
                                            <div id='enablePointer'>Range Font Color</div>
                                        </td>
                                        <td style={{ width: '40%' }}>
                                            <div>
                                                <input type="checkbox" id="enable" onChange={this.enable.bind(this)} ref={d => this.enableElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangeStartWidth'>Start Width <span> &nbsp;&nbsp;&nbsp;10</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="startWidth" defaultValue="10" min="0" max="30" style={{ width: '90%' }} onChange={this.startWidth.bind(this)} ref={d => this.startWidthElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangeEndWidth'>End Width <span> &nbsp;&nbsp;&nbsp;10</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="endWidth" defaultValue="10" min="0" max="30" style={{ width: '90%' }} onChange={this.endWidth.bind(this)} ref={d => this.endWidthElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='roundedRadius'>Corner Radius <span> &nbsp;&nbsp;&nbsp;0</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="radius" defaultValue="0" min="0" max="30" step="5" style={{ width: '90%' }} onChange={this.radius.bind(this)} ref={d => this.radiusElement = d} />
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
                This sample illustrates how to highlight a region in an axis by using ranges in gauge. Start, end, color, width and corner radius of the range can be changed by using the options provided 
                in the property panel.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to customize the ranges of an axis in the
                        circular gauge.
                        Ranges are used to group the axis values, you can use <code>start</code>,
                        <code>end</code>, <code>color</code>, <code>startWidth</code>, <code>endWidth</code>
                        <code>radius</code> and <code>roundedCornerRadius</code> properties to customize the ranges. In this sample,
                        an axis is shown with one range and options to customize the range properties with
                        property panel.
                    </p>
                    <p>
                        More information on the ranges can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.listObj = new DropDownList({
                index: 0, width: 130,
                change: () => {
                    let index: number = +this.listObj.value;
                    this.colortObj.value = this.gauge.axes[0].ranges[index].color;
                    this.endWidthElement.value = this.gauge.axes[0].ranges[index].endWidth.toString();
                    document.getElementById('rangeEndWidth').innerHTML = 'End Width <span> &nbsp;&nbsp;&nbsp;' + this.gauge.axes[0].ranges[index].endWidth;
                    this.startWidthElement.value = this.gauge.axes[0].ranges[index].startWidth.toString();
                    document.getElementById('rangeStartWidth').innerHTML = 'Start Width <span> &nbsp;&nbsp;&nbsp;' + this.gauge.axes[0].ranges[index].startWidth;
                    this.endElement.value = this.gauge.axes[0].ranges[index].end.toString();
                    document.getElementById('rangeEnd').innerHTML = 'Range End <span> &nbsp;&nbsp;&nbsp;' + this.gauge.axes[0].ranges[index].end;
                    this.startElement.value = this.gauge.axes[0].ranges[index].start.toString();
                    document.getElementById('rangeStart').innerHTML = 'Range Start <span> &nbsp;&nbsp;&nbsp;' + this.gauge.axes[0].ranges[index].start;
                    this.radiusElement.value = this.gauge.axes[0].ranges[index].roundedCornerRadius.toString();
                    document.getElementById('roundedRadius').innerHTML = 'Corner Radius <span> &nbsp;&nbsp;&nbsp;' + this.gauge.axes[0].ranges[index].roundedCornerRadius;
                }
            });
            this.listObj.appendTo('#rangeSelect');
            this.colortObj = new DropDownList({
                index: 0, width: 130,
                change: () => {
                    this.gauge.axes[0].ranges[+this.listObj.value].color = this.colortObj.value.toString();
                    this.gauge.axes[0].pointers[0].animation.enable = false; this.gauge.refresh();
                }
            });
            this.colortObj.appendTo('#rangeColor');
        }
    };
}