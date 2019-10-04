/**
 * Dynamic gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { SliderComponent, Slider, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import {
    CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { ILoadedEventArgs, CircularGauge } from '@syncfusion/ej2-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class SemiGauge extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    private startElement: HTMLInputElement;
    private endElement: HTMLInputElement;
    private xElement: HTMLInputElement;
    private yElement: HTMLInputElement;
    private radiusElement: HTMLInputElement;
    private angleElement: CheckBoxComponent;
    // Code for Property Panel
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
        document.getElementById('rangeStart').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + min + '°';
        this.gauge.axes[0].startAngle = min;
        this.gauge.refresh();
    }

    private end() {
        let max: number = +this.endElement.value;
        document.getElementById('rangeEnd').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + max + '°';
        this.gauge.axes[0].endAngle = max;
        this.gauge.refresh();        
    }

    private radius() {
        let radius: number = +this.radiusElement.value;
        document.getElementById('radius1').innerHTML = 'Radius <span> &nbsp;&nbsp;&nbsp;' + radius + '%';
        this.gauge.axes[0].radius = '' + radius + '%';
        this.gauge.refresh();
    }

    private centerX() {
        let max: number = +this.xElement.value;
        document.getElementById('center1').innerHTML = 'Center X <span> &nbsp;&nbsp;&nbsp;' + max + '%';
        this.gauge.centerX = '' + max + '%';
        this.gauge.refresh();
    }

    private centerY() {
        let max: number = +this.yElement.value;
        document.getElementById('center2').innerHTML = 'Center Y <span> &nbsp;&nbsp;&nbsp;' + max + '%';
        this.gauge.centerY = '' + max + '%';
        this.gauge.refresh();
    }

    public hideLabel(): void {
        let labelIntersect: boolean = (document.getElementById('hidelabel') as HTMLInputElement).checked;
        this.gauge.axes[0].hideIntersectingLabel = labelIntersect;
        this.gauge.refresh();
    }

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as GaugeTheme;
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-8 control-section'>
                    <CircularGaugeComponent load={this.load.bind(this)} ref={gauge => this.gauge = gauge} id='gauge'>
                        <AxesDirective>
                            <AxisDirective radius='80%' startAngle={270} endAngle={90} minimum={0} maximum={100} hideIntersectingLabel={true}
                                lineStyle={{ width: 0, color: '#0450C2' }}
                                labelStyle={{
                                    font: {
                                        fontWeight: 'normal'
                                    },
                                    position: 'Outside',
                                    autoAngle: true
                                }}
                                majorTicks={{ position: 'Inside', width: 2, height: 12, interval: 4 }}
                                minorTicks={{ position: 'Inside', width: 1, height: 5, interval: 2 }}>
                                <PointersDirective>
                                    <PointerDirective animation={{enable: false}} value={30} radius='75%' color='#FF9200' pointerWidth={7}
                                        cap={{
                                            radius: 8,
                                            color: '#565656',
                                            border: { width: 0 }
                                        }} needleTail ={{
                                            color: '#FF9200',
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
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangeStart'>Start Angle <span> &nbsp;&nbsp;&nbsp;270°</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="start" defaultValue="270" min="0" max="360" style={{ width: '90%' }} onChange={this.start.bind(this)} ref={d => this.startElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='rangeEnd'>End Angle <span> &nbsp;&nbsp;&nbsp;90°</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="end" defaultValue="90" min="0" max="360" style={{ width: '90%' }} onChange={this.end.bind(this)} ref={d => this.endElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='radius1'>Radius <span> &nbsp;&nbsp;&nbsp;80%</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="radius" defaultValue="80" min="0" max="100" style={{ width: '90%' }} onChange={this.radius.bind(this)} ref={d => this.radiusElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Radius based on angle</div>
                                        </td>
                                        <td>
                                            <div style={{paddingTop: '0px'}}>
                                                <CheckBoxComponent id='angle' change={this.angleChange.bind(this)} ref={d => this.angleElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='center1'>Center X <span> &nbsp;&nbsp;&nbsp;50%</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="centerX" defaultValue="50" min="0" max="100" style={{ width: '90%' }} onChange={this.centerX.bind(this)} ref={d => this.xElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='center2'>Center Y <span> &nbsp;&nbsp;&nbsp;50%</span> </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="range" id="centerY" defaultValue="50" min="0" max="100" style={{ width: '90%' }} onChange={this.centerY.bind(this)} ref={d => this.yElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Hide intersecting labels</div>
                                        </td>
                                        <td>
                                            <div style={{paddingTop: '0px'}}>
                                                <CheckBoxComponent id='hidelabel' checked={true} change={this.hideLabel.bind(this)} ref={d => this.angleElement = d} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the rendering of circular gauge with modified angles. The gauge can be customized using the options in properties panel.
                    </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render the circular gauge with modified start and end angles to form semi or quarter circular gauges. By enabling the radius based on angle option, the radius of circular gauge will be calculated based on the start and end angles. You can also hide the intersect labels using `hideIntersectingLabel` property.
                    </p>
                    <p>
                        For more information on ranges, refer to this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}