import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective,
    PointersDirective, PointerDirective
} from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { ILoadedEventArgs } from '@syncfusion/ej2-circulargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .angleCheckBox {
        padding-top: 0px !important;
        padding-left: 0px !important;
        margin-left: 0px
    }
    .e-view.fluent2 #property .angleCheckBox, .e-view.fluent2-dark #property .angleCheckBox {
        padding-top: 0px; padding-left: 0px; margin-left: -8px
    }`;

export class SemiGauge extends SampleBase<{}, {}> {

    private gauge: CircularGaugeComponent;
    private startElement: HTMLInputElement;
    private endElement: HTMLInputElement;
    private xElement: HTMLInputElement;
    private yElement: HTMLInputElement;
    private radiusElement: HTMLInputElement;
    private angleElement: CheckBoxComponent;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    private angleChange(e: ChangeEventArgs) {
        let centerX: HTMLInputElement = document.getElementById('centerX') as HTMLInputElement;
        let centerY: HTMLInputElement = document.getElementById('centerY') as HTMLInputElement;
        if (e.checked) {
            this.gauge.centerX = null;
            this.gauge.centerY = null;
            this.gauge.moveToCenter = true;
            centerX.disabled = true;
            centerY.disabled = true;
        } else {
            this.gauge.centerX = centerX.value + '%';
            this.gauge.centerY = centerY.value + '%';
            centerX.disabled = false;
            centerY.disabled = false;
            this.gauge.moveToCenter = false;
        }
        this.gauge.refresh();
    }

    private start(): void {
        let min: number = +this.startElement.value;
        document.getElementById('rangeStart').innerHTML = min + '°';
        this.gauge.axes[0].startAngle = min;
        this.gauge.refresh();
    }

    private end() {
        let max: number = +this.endElement.value;
        document.getElementById('rangeEnd').innerHTML = max + '°';
        this.gauge.axes[0].endAngle = max;
        this.gauge.refresh();
    }

    private radius() {
        let radius: number = +this.radiusElement.value;
        document.getElementById('radius1').innerHTML = radius + '%';
        this.gauge.axes[0].radius = '' + radius + '%';
        this.gauge.refresh();
    }

    private centerX() {
        let max: number = +this.xElement.value;
        document.getElementById('center1').innerHTML = max + '%';
        this.gauge.centerX = '' + max + '%';
        this.gauge.refresh();
    }

    private centerY() {
        let max: number = +this.yElement.value;
        document.getElementById('center2').innerHTML = max + '%';
        this.gauge.centerY = '' + max + '%';
        this.gauge.refresh();
    }

    public hideLabel(): void {
        let labelIntersect: boolean = (document.getElementById('hidelabel') as HTMLInputElement).checked;
        this.gauge.axes[0].hideIntersectingLabel = labelIntersect;
        this.gauge.refresh();
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-8 control-section'>
                    <CircularGaugeComponent centerX='50%' centerY='50%' moveToCenter={false} background='transparent' load={this.load.bind(this)} ref={gauge => this.gauge = gauge} id='gauge'>
                        <AxesDirective>
                            <AxisDirective radius='100%' startAngle={270} endAngle={90} minimum={0} maximum={100} hideIntersectingLabel={true}
                                lineStyle={{ width: 3 }}
                                labelStyle={{
                                    font: {
                                        fontWeight: 'normal',
                                        fontFamily: 'inherit'
                                    },
                                    format: "{value}%",
                                    position: 'Outside',
                                    autoAngle: true
                                }}
                                majorTicks={{ position: 'Inside', width: 2, height: 15, interval: 10 }}
                                minorTicks={{ position: 'Inside', width: 1, height: 8, interval: 2 }}>
                                <PointersDirective>
                                    <PointerDirective animation={{ enable: false }} value={30} radius='75%' pointerWidth={7}
                                        cap={{
                                            radius: 8,
                                            border: { width: 0 }
                                        }} needleTail={{
                                            length: '13%'
                                        }} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', overflow: 'hidden' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Start Angle </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="start" defaultValue="270" min="0" max="360" style={{ width: '85%' }} onChange={this.start.bind(this)} ref={d => this.startElement = d} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                            <span id='rangeStart'>270°</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>End Angle </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="end" defaultValue="90" min="0" max="360" style={{ width: '85%' }} onChange={this.end.bind(this)} ref={d => this.endElement = d} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                            <span id='rangeEnd'>90°</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Radius </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="radius" defaultValue="100" min="30" max="100" style={{ width: '85%' }} onChange={this.radius.bind(this)} ref={d => this.radiusElement = d} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                            <span id='radius1'>100%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Radius based on angle</div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div className="angleCheckBox">
                                            <CheckBoxComponent id='angle' change={this.angleChange.bind(this)} ref={d => this.angleElement = d} style={{ paddingLeft: '0px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Center X </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="centerX" defaultValue="50" min="0" max="100" style={{ width: '85%' }} onChange={this.centerX.bind(this)} ref={d => this.xElement = d} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                            <span id='center1'>50%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Center Y </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="centerY" defaultValue="50" min="0" max="100" style={{ width: '85%' }} onChange={this.centerY.bind(this)} ref={d => this.yElement = d} />
                                        </div>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                            <span id='center2'>50%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Hide Intersecting Labels</div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div className="angleCheckBox">
                                            <CheckBoxComponent id='hidelabel' checked={true} change={this.hideLabel.bind(this)} ref={d => this.angleElement = d} style={{ paddingLeft: '0px' }} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This sample shows how to create semi-circular or quarter-circular gauges by modifying a circular gauge with different start and end angles.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, a circular gauge is rendered with different start and end angles to create semi-circular or quarter-circular gauges. The radius, start angle, end angle, and center position of the circular gauge can all be customized using the options in the properties panel.
                    </p>
                    <p>
                        More information on the semi-circular or quarter-circular gauges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-appearance/#radius-calculation-based-on-angles">documentation section </a>.
                    </p>
                </section>
            </main>
        )
    }
}