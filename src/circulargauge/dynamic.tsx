import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';
import { ILoadedEventArgs, IResizeEventArgs, CircularGauge, PointerModel, AnnotationModel } from '@syncfusion/ej2-circulargauge';
import { DynamicDataSerive } from './dynamic.service';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    /**
     * Dynamic gauge
     */
export class Dynamic extends SampleBase<{}, {}> {
    public circularGauge1: CircularGaugeComponent;
    public circularGauge2: CircularGauge;
    public circularGauge3: CircularGauge;
    public circularGauge4: CircularGauge;
    public tooltipInterval1: number;
    public GEARS: number[] = [0.14, 0.06, 0.035, 0.027, 0.019];
    public speed: number = 0;
    public skip: number = 0;
    public gear: number = 0;
    public count: number = 0;
    public start: boolean = true;
    public gauge1StartAngle: number = 200;
    public gauge1EndAngle: number = 365;
    public gauge2StartAngle: number = 110;
    public gauge2EndAngle: number = 180;
    public gauge3StartAngle: number = 0;
    public gauge3EndAngle: number = 70;
    public gauge1Interval: number = 1;
    public gauge1FontSize: string = '14px';
    public gauge1Radius: string = '95%';
    public subGauge1Radius: string = '95%';
    public subGauge2Radius: string = '75%';
    public tickWidth: number = 3;
    public annotationContent: string = '<div><span>RPM <br/>X 1000</span></div>';
    public annotationRadius: string = '40%';
    public annotationAngle: number = 200;
    public centerX: string = '47%';
    public centerY: string = '50%';
    public fuelRadius: string = '40%';
    public gauge1LineWidth: number = 10;
    public cloudAngle: number = 10;
    public tickHeight: number = 10;
    public gaugeLineStyle: Object = { width: 0 };
    public gaugeLabelStyle: Object = {
        position: 'Inside', format: '####', font: { size: '14px', color: '#565656' }
    };
    public gaugeMajorTicks: Object = {
        width: 3, height: 15, color: '#565656', interval: 20
    };
    public gaugeMinorTicks: Object = {
        width: 2, height: 10, color: '#565656'
    };
    public gaugePointers: Object = [{
        value: 0, radius: '65%',
        pointerWidth: 8,
        cap: { color: '#FF9200', radius: 9, border: { width: 0, color: '#FF7A00' } },
        needleTail: { length: '20%', color: '#FF9200' },
        color: '#FF9200',
        animation: {
            enable: true
        }
    }];
    public gaugeLineStyle1: Object = { width: 10, color: '#565656' };
    public gaugeLabelStyle1: Object = {
        font: { size: '0px' }
    };
    public gaugeMajorTicks1: Object = {
        height: 0
    };
    public gaugeMinorTicks1: Object = {
        height: 0
    };
    public gaugePointers1: Object = [];
    public gaugeAnnotations1: Object = [{
        zIndex: '1', angle: 270, radius: '100%'
    }, {
        zIndex: '1', angle: 90, radius: '110%'
    }, {
        zIndex: '1', angle: 90, radius: '110%'
    }, {
        zIndex: '1', angle: 180, radius: '40%', content: '0 KM/H'
    }];

    public gaugeLoad(args: ILoadedEventArgs): void {
        let width: number = args.gauge.element.offsetWidth;
        let height: number = args.gauge.element.offsetHeight;
        if (width < 700) {
            this.gauge1StartAngle = 310; this.gauge1EndAngle = 50;
            this.gauge2StartAngle = 10; this.gauge2EndAngle = 90;
            this.gauge3StartAngle = 270; this.gauge3EndAngle = 350;
            this.gauge1Interval = 2; this.gauge1FontSize = '10px';
            this.gauge1Radius = '70%'; this.subGauge1Radius = '85%';
            this.subGauge2Radius = '65%'; this.centerX = '50%';
            this.centerY = '30%'; this.cloudAngle = 300;
            this.annotationContent = '<div style="font-size: 8px;"><span>RPM X 1000</span></div>';
            this.annotationAngle = 180; this.fuelRadius = '-25%'; this.annotationRadius = '10';
            this.tickWidth = 2; this.tickHeight = 8; this.gauge1LineWidth = 0;
            args.gauge.axes[1].annotations[0].radius = '110%'; args.gauge.axes[1].annotations[0].angle = 180;
            args.gauge.axes[1].annotations[1].radius = '20%'; args.gauge.axes[1].annotations[1].angle = 40;
            args.gauge.axes[1].annotations[2].radius = '20%'; args.gauge.axes[1].annotations[2].angle = 320;
            args.gauge.axes[1].annotations[0].content = '<div id="rpm" style="width:' + 200 + 'px;height:' + 200 + 'px;"></div>';
            args.gauge.axes[1].annotations[1].content = '<div id="fuel" style="width:' + 200 + 'px;height:' + 200 + 'px;"></div>';
            args.gauge.axes[1].annotations[2].content = '<div id="battery" style="width:' + 200 + 'px;height:' + 200 + 'px;"></div>';
        } else {
            width = width / 3;
            args.gauge.axes[1].annotations[0].content =
                '<div id="rpm" style="width:' + width + 'px;height:' + width + 'px;"></div>';
            args.gauge.axes[1].annotations[1].content =
                '<div id="fuel" style="width:' + width + 'px;height:' + width + 'px;"></div>';
            args.gauge.axes[1].annotations[2].content =
                '<div id="battery" style="width:' + width + 'px;height:' + width + 'px;"></div>';
        }
    };
    public gaugeResize(args: IResizeEventArgs): void {
        location.reload();
    }

    public gaugeLoaded(args: ILoadedEventArgs): void {
        document.getElementById(args.gauge.element.id).setAttribute('title', '');
        this.circularGauge2 = new CircularGauge(DynamicDataSerive.prototype.GetSubGauge1().gauge1);
        this.circularGauge2.appendTo('#rpm');
        this.circularGauge2.centerX = this.centerX;
        this.circularGauge2.centerY = this.centerY;
        this.circularGauge2.axes[0].annotations = [{
            content: this.annotationContent,
            angle: this.annotationAngle,
            radius: this.annotationRadius
        }];
        this.circularGauge2.axes[0].startAngle = this.gauge1StartAngle;
        this.circularGauge2.axes[0].endAngle = this.gauge1EndAngle;
        this.circularGauge2.axes[0].labelStyle.font.size = this.gauge1FontSize;
        this.circularGauge2.axes[0].majorTicks = {
            width: this.tickWidth,
            height: this.tickHeight,
            interval: this.gauge1Interval,
            useRangeColor: true
        }; this.circularGauge2.axes[0].minorTicks = {
            height: this.tickHeight,
            width: this.tickWidth,
            useRangeColor: true
        };
        this.circularGauge2.axes[0].radius = this.gauge1Radius;
        this.circularGauge2.axes[1].lineStyle.width = this.gauge1LineWidth;
        this.circularGauge2.refresh();
        this.circularGauge3 = new CircularGauge(DynamicDataSerive.prototype.GetSubGauge1().gauge2);
        this.circularGauge3.appendTo('#fuel');
        this.circularGauge3.axes[0].startAngle = this.gauge2StartAngle;
        this.circularGauge3.axes[0].endAngle = this.gauge2EndAngle;
        this.circularGauge3.axes[0].majorTicks = {
            width: this.tickWidth,
            height: this.tickHeight,
            interval: 40,
            useRangeColor: true
        }; this.circularGauge3.axes[0].minorTicks = {
            height: this.tickHeight,
            width: this.tickWidth,
            useRangeColor: true,
            interval: 5
        };
        this.circularGauge3.axes[0].radius = this.subGauge2Radius;
        this.circularGauge3.axes[0].annotations = [{
            radius: this.fuelRadius,
            content: '<div id="templateWrap"><img src="src/circulargauge/images/fuel.png"></div>',
            angle: 180
        }];
        this.circularGauge3.refresh();
        this.circularGauge4 = new CircularGauge(DynamicDataSerive.prototype.GetSubGauge1().gauge3);
        this.circularGauge4.appendTo('#battery');
        this.circularGauge4.axes[0].startAngle = this.gauge3StartAngle;
        this.circularGauge4.axes[0].endAngle = this.gauge3EndAngle;
        this.circularGauge4.axes[0].majorTicks = {
            width: this.tickWidth,
            height: this.tickHeight,
            interval: 40,
            useRangeColor: true
        }; this.circularGauge4.axes[0].minorTicks = {
            height: this.tickHeight,
            width: this.tickWidth,
            useRangeColor: true,
            interval: 5
        }; this.circularGauge4.axes[0].radius = this.subGauge1Radius;
        this.circularGauge4.axes[0].annotations = [{
            radius: '50%',
            content: '<div id="templateWrap"><img src="src/circulargauge/images/battery.png"></div>',
            angle: this.cloudAngle
        }];
        this.circularGauge4.axes[1].lineStyle.width = this.gauge1LineWidth;
        this.circularGauge4.refresh();
        this.tooltipInterval1 = setInterval(
            (): void => {
                if (document.getElementById('dynamic-container')) {
                    if (this.speed < 200 && this.start) {
                        this.count = 0;
                        this.circularGauge1.axes[0].pointers[0].animation.duration = 30;
                        this.circularGauge2.axes[0].pointers[0].animation.duration = 30;
                        if (this.GEARS[this.gear] * this.speed > 4 && this.gear < this.GEARS.length) {
                            this.gear++;
                            this.skip = 400 / 50;
                        }
                        if (this.skip-- < 0) {
                            this.speed += 0.6 - (0.0017 * this.speed);
                        }
                        this.circularGauge1.setPointerValue(0, 0, this.speed);
                        this.circularGauge1.setAnnotationValue(1, 3, Math.round(this.speed) + ' KM/H');
                        this.circularGauge2.setPointerValue(0, 0, this.GEARS[this.gear] * this.speed + 0.9);
                    } else {
                        this.count = this.count + 1;
                        if (this.start) {
                            if (this.count < 200) {
                                this.circularGauge1.setAnnotationValue(1, 3, Math.round((Math.random() * (200 - 202) + 202)) + ' KM');
                                this.circularGauge1.setPointerValue(0, 0, Math.random() * (200 - 202) + 202);
                            } else {
                                this.speed = 0;
                                this.gear = 0;
                                this.circularGauge1.axes[0].pointers[0].animation.duration = 2000;
                                this.circularGauge2.axes[0].pointers[0].animation.duration = 2000;
                                this.circularGauge1.setPointerValue(0, 0, this.speed);
                                this.circularGauge1.setAnnotationValue(1, 3, Math.round(this.speed) + ' KM/H');
                                this.circularGauge2.setPointerValue(0, 0, 0);
                                this.start = false;
                            }
                        } else {
                            this.start = this.count > 350;
                        }
                    }
                } else {
                    clearInterval(this.tooltipInterval1);
                }
            },
            50
        );
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent id='dynamic-container' load={this.gaugeLoad.bind(this)} loaded={this.gaugeLoaded.bind(this)} resized={this.gaugeResize.bind(this)} ref={gauge => this.circularGauge1 = gauge}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective
                                lineStyle={this.gaugeLineStyle}
                                majorTicks={this.gaugeMajorTicks}
                                minorTicks={this.gaugeMinorTicks}
                                labelStyle={this.gaugeLabelStyle}
                                minimum={0} maximum={220}
                                radius='100%' startAngle={240}
                                endAngle={120} pointers={this.gaugePointers as PointerModel[]}>
                            </AxisDirective>
                            <AxisDirective
                                lineStyle={this.gaugeLineStyle1}
                                majorTicks={this.gaugeMajorTicks1}
                                minorTicks={this.gaugeMinorTicks1}
                                pointers={this.gaugePointers1 as PointerModel[]}
                                labelStyle={this.gaugeLabelStyle1}
                                annotations={this.gaugeAnnotations1 as AnnotationModel[]}
                                radius='90%' startAngle={0} endAngle={0}>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                <div id="description">
                    <p>
                        Pointer values in the gauge can be updated dynamically using <code>setPointerValue</code> method. In this example
                        a speedometer is depicted with speed and fuel changes has been updated dynamically.
                    </p>
                    <p>
                        More information on the gauge can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
