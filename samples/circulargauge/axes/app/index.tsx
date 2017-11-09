/**
 * Sample for Multiple Axis
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from './property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, isCompleteAngle,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, ILoadedEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from './sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Axes extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    private start: HTMLInputElement;
    private end: HTMLInputElement;
    private axisIndex: number = 0;
    private loaded: boolean = false;
    public axis: DropDownList; public direction: DropDownList;
    public onChartLoad(args: ILoadedEventArgs): void {
        let id: string = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (!this.loaded) {
            this.loaded = true;
            this.axis = new DropDownList({
                index: 0, width: 140,
                change: () => {
                    this.axisIndex = +this.axis.value;
                    let direction: string = this.gauge.axes[this.axisIndex].direction;
                    this.direction.value = direction;
                    let startAngle: number = this.gauge.axes[this.axisIndex].startAngle;
                    let endAngle: number = this.gauge.axes[this.axisIndex].endAngle;
                    document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + startAngle;
                    document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + endAngle;
                    this.start.value = startAngle.toString();
                    this.end.value = endAngle.toString();
                }
            });
            this.axis.appendTo('#axisIndex');

            this.direction = new DropDownList({
                index: 0, width: 140,
                change: () => {
                    this.gauge.axes[this.axisIndex].direction = this.direction.value == 'ClockWise' ? 'ClockWise' : 'AntiClockWise';
                    this.gauge.axes[0].pointers[0].animation.enable = false;
                    this.gauge.axes[1].pointers[0].animation.enable = false;
                    this.gauge.refresh();
                }
            });
            this.direction.appendTo('#axisDirection');
        }
    };
    public startAngle(): void {
        let value: number = +this.start.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].startAngle = value;
        document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + value;
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            isCompleteAngle(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    }

    public endAngle(): void {
        let value: number = +this.end.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].endAngle = value;
        document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + value;
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            isCompleteAngle(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent id='range-container' title="Gauge with Multiple Axes" titleStyle={{
                            color: 'gray',
                            size: '16px'
                        }} ref={gauge => this.gauge = gauge}
                            loaded={this.onChartLoad.bind(this)}>
                            <AxesDirective>
                                <AxisDirective
                                    lineStyle={{ width: 1.5, color: ' #9E9E9E' }}
                                    radius='95%'
                                    startAngle={220} endAngle={140}
                                    minimum={0} maximum={160}
                                    majorTicks={{
                                        position: 'Inside',
                                        width: 2, height: 10, color: '#757575'
                                    }}
                                    minorTicks={{
                                        position: 'Inside', width: 2,
                                        height: 5, color: '#757575'
                                    }} labelStyle={{
                                        position: 'Inside', autoAngle: true,
                                        hiddenLabel: 'None', font: { color: '#333333' }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={80} radius='100%' color='#333333'
                                            markerHeight={15} markerWidth={15} type='Marker'
                                            markerShape='Triangle' />
                                    </PointersDirective>
                                </AxisDirective>
                                <AxisDirective
                                    lineStyle={{ width: 1.5, color: ' #E84011' }}
                                    radius='95%'
                                    startAngle={220} endAngle={140}
                                    minimum={0} maximum={240}
                                    majorTicks={{
                                        position: 'Outside', width: 2, height: 10,
                                        color: '#E84011'
                                    }}
                                    minorTicks={{
                                        position: 'Outside', width: 2,
                                        height: 5, color: '#E84011'
                                    }} labelStyle={{
                                        position: 'Outside', autoAngle: true,
                                        hiddenLabel: 'None', font: { color: '#E84011' }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={120} radius='100%' color='#C62E0A'
                                            markerHeight={15} markerWidth={15} type='Marker'
                                            markerShape='InvertedTriangle' />
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div> Axis </div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="axisIndex" className="form-control" style={{ width: "90%" }}>
                                                    <option value="0">Axis 1</option>
                                                    <option value="1">Axis 2</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div> Direction </div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="axisDirection" className="form-control" style={{ width: "90%" }}>
                                                    <option value="ClockWise">ClockWise</option>
                                                    <option value="AntiClockWise">AntiClockWise</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id='start'>Start Angle <span> &nbsp;&nbsp;&nbsp;220</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="startAngle" onChange={this.startAngle.bind(this)} ref={d => this.start = d} defaultValue="220" min="0" max="360" style={{ width: "90%" }} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id='end'>End Angle <span> &nbsp;&nbsp;&nbsp;140</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="endAngle" onChange={this.endAngle.bind(this)} ref={d => this.end = d} defaultValue="140" min="0" max="360" style={{ width: "90%" }} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Axes />, document.getElementById('sample'));