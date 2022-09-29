/**
 * Sample for ticks and labels in the Circular Gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, AxesDirective, AxisDirective, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, Annotations, TickModel, Position
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    
    .tailwind .labelCheckbox, .tailwind-dark .labelCheckbox{
        margin-top: 2px;
    }`;

export class Labels extends SampleBase<{}, {}> {

    private gauge: CircularGaugeComponent;
    private tickOffset: HTMLInputElement;
    private tickHeight: HTMLInputElement;
    private labelOffset: HTMLInputElement;
    private lastLabel: CheckBoxComponent;
    private isMajorTicks: boolean = true;
    private loaded: boolean = false;
    public ticks: DropDownList;
    public tickPosition: DropDownList;
    public labelPosition: DropDownList;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.ticks = new DropDownList({
                index: 0, width: '125%',
                change: () => {
                    let value: string = this.ticks.value.toString();
                    let tickProp: TickModel; this.isMajorTicks = value === 'major';
                    if (this.isMajorTicks) {
                        tickProp = this.gauge.axes[0].majorTicks;
                    } else {
                        tickProp = this.gauge.axes[0].minorTicks;
                    }
                    this.tickPosition.value = tickProp.position;
                    this.tickOffset.value = tickProp.offset.toString();
                    this.tickHeight.value = tickProp.height.toString();
                    document.getElementById('offset').innerHTML = String(tickProp.offset);
                    document.getElementById('height').innerHTML = String(tickProp.height);
                }
            });
            this.ticks.appendTo('#Ticks');

            this.tickPosition = new DropDownList({
                index: 0, width: '125%',
                change: () => {
                    let value: string = this.tickPosition.value.toString();
                    if (this.isMajorTicks) {
                        this.gauge.axes[0].majorTicks.position = value as Position;
                    } else {
                        this.gauge.axes[0].minorTicks.position = value as Position;
                    }
                    this.gauge.refresh();
                }
            });
            this.tickPosition.appendTo('#tickposition');

            this.labelPosition = new DropDownList({
                index: 0, width: '125%',
                change: () => {
                    let value: string = this.labelPosition.value.toString();
                    this.gauge.axes[0].labelStyle.position = value as Position;
                    this.gauge.refresh();
                }
            });
            this.labelPosition.appendTo('#labelposition');
        }
    }

    public ticksOffset(): void {
        let value: number = +this.tickOffset.value;
        if (this.isMajorTicks) {
            this.gauge.axes[0].majorTicks.offset = value;
        } else {
            this.gauge.axes[0].minorTicks.offset = value;
        }
        document.getElementById('offset').innerHTML = String(value);
        this.gauge.refresh();
    }

    public ticksHeight(): void {
        let value: number = +this.tickHeight.value;
        if (this.isMajorTicks) {
            this.gauge.axes[0].majorTicks.height = value;
        } else {
            this.gauge.axes[0].minorTicks.height = value;
        }
        document.getElementById('height').innerHTML = String(value);
        this.gauge.refresh();
    }

    public labelsOffset(): void {
        let value: number = +this.labelOffset.value;
        this.gauge.axes[0].labelStyle.offset = value;
        document.getElementById('labelOffsetValue').innerHTML = String(value);
        this.gauge.refresh();
    }

    public showLastLabel(): void {
        let showLastLabel: HTMLInputElement = (document.getElementById('enable') as HTMLInputElement);
        this.gauge.axes[0].showLastLabel = this.lastLabel.checked;
        this.gauge.refresh();
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent load={this.load.bind(this)} background='transparent' id='range-container' loaded={this.onChartLoad.bind(this)} ref={gauge => this.gauge = gauge}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={210} endAngle={150} radius='80%' minimum={0} maximum={170} showLastLabel={false}
                                    majorTicks={{
                                        position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20, offset: 0
                                    }} lineStyle={{ width: 2, color: '#9E9E9E' }}
                                    minorTicks={{
                                        position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10, offset: 0
                                    }} labelStyle={{
                                        position: 'Outside', autoAngle: true, offset: 0,
                                        font: {
                                            fontFamily: 'inherit',
                                            size: '10px'
                                        }
                                    }}>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='<div id="content" style="color:#518C03;font-size:20px;font-family:inherit;font-weight:semibold;margin-left:-12px;margin-top:-12px">145</div>'
                                            angle={0} radius='0%' zIndex='1'>
                                        </AnnotationDirective>
                                    </AnnotationsDirective>
                                    <PointersDirective>
                                        <PointerDirective value={145} radius='60%' color='#8BC34A' pointerWidth={7}
                                            animation={{ enable: false }}
                                            type="RangeBar"
                                            roundedCornerRadius={10}
                                        />
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', overflow: 'hidden' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Ticks </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <select id="Ticks" className="form-control">
                                                    <option value="major"> Major Ticks</option>
                                                    <option value="minor">Minor Ticks</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Tick Position </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <select id="tickposition" className="form-control">
                                                    <option value="Inside"> Inside</option>
                                                    <option value="Cross">Cross</option>
                                                    <option value="Outside">Outside</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Label Position </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <select id="labelposition" className="form-control">
                                                    <option value="Outside"> Outside</option>
                                                    <option value="Cross">Cross</option>
                                                    <option value="Inside">Inside</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ "height": "50px" }}>
                                        <td>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Tick Offset </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <input type="range" onChange={this.ticksOffset.bind(this)} ref={d => this.tickOffset = d} id="tickOffset" defaultValue="0" min="0" max="50" style={{ width: '90%' }} />
                                            </div>
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <div style={{ textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' }}>
                                                <span id='offset'>0</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ "height": "50px" }}>
                                        <td>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Tick Height </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <input type="range" onChange={this.ticksHeight.bind(this)} ref={d => this.tickHeight = d} id="tickHeight" defaultValue="10" min="1" max="50" style={{ width: '90%' }} />
                                            </div>
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <div style={{ textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' }}>
                                                <span id='height'>10</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ "height": "50px" }}>
                                        <td>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Label Offset </div>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                            <div>
                                                <input type="range" onChange={this.labelsOffset.bind(this)} ref={d => this.labelOffset = d} id="labelOffset" defaultValue="0" min="0" max="50" style={{ width: '90%' }} />
                                            </div>
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <div style={{ textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' }}>
                                                <span id='labelOffsetValue'>0</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ "height": "50px" }}>
                                        <td style={{ "width": "50%" }}>
                                            <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Show Last Label </div>
                                        </td>
                                        <td style={{ "width": "40%" }}>
                                            <div className='labelCheckbox' style={{ marginLeft: "-10px", paddingTop: "0px" }}>
                                                <CheckBoxComponent change={this.showLastLabel.bind(this)} ref={d => this.lastLabel = d} id='enable' disabled={false} style={{ paddingLeft: "0px" }} />
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
                        This sample demonstrates how to customize the ticks and labels on an axis. The position, offset, and height of the ticks and labels can be changed.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the ticks and labels of an axis in the circular gauge.
                        Labels are units that are used to display the values on the axis. Labels can be customized using <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/'>labelStyle</a>.
                        Ticks are used to represent values on the axis. Ticks can be customized using <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/'>majorTicks</a> and <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/'>minorTicks</a>.
                    </p>
                    <p>
                        More information on the ticks and labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}