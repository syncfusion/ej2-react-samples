import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from './property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, ILoadedEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { CircularGauge, Pointer } from '@syncfusion/ej2-circulargauge';
import { SampleBase } from './sample-base';
import { gauge2 } from '../annotation-gauge';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Annotation sample
 */
export class AnnotationsSample extends SampleBase<{}, {}> {
    public gauge: CircularGauge;
    public onChartLoad(args: ILoadedEventArgs): void {
        let id: string = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        this.gauge = args.gauge;
        this.updateSubGauge1();
        this.updateSubGauge2();
    };
    public onResized(args: Object) {
        location.reload();
    }

    public calcTime(offset: string): Date {
        let date: Date = new Date();
        let localTime: number = date.getTime();
        let localOffset: number = date.getTimezoneOffset() * 60000;
        let utc: number = localTime + localOffset;
        let curretDate: Date = new Date(utc + (3600000 * (+offset)));
        return curretDate;
    }
    public clockInterval: Object;
    public intervalExecute: boolean = true;
    public subGauge1: CircularGauge; public subGauge2: CircularGauge;
    public updateSubGauge1(): void {
        this.subGauge1 = new CircularGauge(gauge2());
        this.subGauge1.appendTo('#minutes');
    }
    public updateSubGauge2(): void {
        this.subGauge2 = new CircularGauge({
            axes: [{
                ranges: [{ start: 0, end: 3, startWidth: 4, endWidth: 4, color: 'rgba(29,29,29,0.4)' },
                { start: 3, end: 12, startWidth: 4, endWidth: 4, color: 'rgba(168,145,102,0.1)' }],
                labelStyle: { hiddenLabel: 'First', font: { color: '#8c8c8c', size: '0px' }, autoAngle: false },
                majorTicks: { width: 1, height: 5, interval: 1 },
                minorTicks: { height: 3, width: 0.5, interval: 0.2 }, minimum: 0, maximum: 12,
                pointers: [{
                    radius: '70%', pointerWidth: 2, color: 'rgba(29,29,29,1)',
                    cap: {
                        color: 'rgba(29,29,29,1)', radius: 2, border: { width: 0.2, color: 'rgba(168,145,102,1)' }
                    }, needleTail: { color: 'rgba(168,145,102,1)', length: '10%' }, animation: { enable: false, duration: 500 }
                }], startAngle: 0, endAngle: 0, lineStyle: { width: 0 }
            }],
            load: ((args: ILoadedEventArgs): void => {
                args.gauge.axes[0].annotations = [{
                    angle: 360, radius: '35%', zIndex: '1', content: '<div id="tm" style="font-size:10px;">21-06-17</div>'
                }];
            }),
            loaded: ((args: {}): void => {
                this.updateTime(false);
                this.clockInterval = setInterval(
                    (): void => {
                        this.updateTime(true, this.clockInterval);
                    },
                    1000
                );
                this.intervalExecute = false;
            })
        });
        this.subGauge2.appendTo('#seconds');
    }

    public updateTime(enable: boolean, interval?: Object): void {
        if (document.getElementById('annotation-container') && document.getElementsByClassName('e-circulargauge')) {
            this.getTime('+5.5', this.gauge, enable);
            if (document.getElementById('minutes').childElementCount) {
                this.getTime('+5.5', this.subGauge1, enable, true);
            } else {
                this.updateSubGauge1(); this.getTime('+5.5', this.subGauge1, enable, true);
            }
            if (document.getElementById('seconds').childElementCount) {
                this.getTime('+5.5', this.subGauge2, enable, true);
            } else {
                this.updateSubGauge2(); this.getTime('+5.5', this.subGauge2, enable, true);
            }
        } else {
            clearInterval(+interval);
        }
    }

    public getTime(offset: string, gauge: CircularGauge | CircularGaugeComponent, enable: boolean, subGauge?: boolean): void {
        let returnTime: Date = this.calcTime(offset);
        let seconds: number = returnTime.getSeconds() * 12 / 60; seconds = seconds === 0 ? 12 : seconds;
        let pointer: Pointer = gauge.axes[0].pointers[2] as Pointer;
        let pointer1: Pointer = gauge.axes[0].pointers[0] as Pointer;
        if (!subGauge) {
            gauge.axes[0].pointers[2].animation.enable = enable;
            pointer.currentValue = seconds === 0.2 ? 0 : pointer.currentValue;
        } else {
            pointer1.currentValue = seconds === 0.2 ? 0 : pointer1.currentValue;
            gauge.axes[0].pointers[0].animation.enable = (gauge.element.id === 'seconds' && enable);
        }
        let hour: number = (returnTime.getHours() + returnTime.getMinutes() / 60) % 12;
        let minutes: number = returnTime.getMinutes() * 12 / 60 + returnTime.getSeconds() * 12 / 3600;
        let content: string; let hourValue: number;
        if (subGauge) {
            if (gauge.element.id === 'minutes') {
                content = '<div id="tm" style="font-size:8px;">' + Math.floor(returnTime.getMinutes()) + ' M</div>';
                gauge.setPointerValue(0, 0, minutes); gauge.setAnnotationValue(0, 3, content);
            } else {
                gauge.setPointerValue(0, 0, seconds);
                content = '<div id="tm" style="font-size:8px;">' + Math.floor(returnTime.getSeconds()) + ' S</div>';
                gauge.axes[0].annotations[0].angle = 0;
                gauge.axes[0].annotations[0].radius = '50%';
                gauge.setAnnotationValue(0, 0, content);
            }
        } else {
            gauge.setPointerValue(0, 0, hour); gauge.setPointerValue(0, 1, minutes); gauge.setPointerValue(0, 2, seconds);
            hourValue = (Math.floor(returnTime.getHours()) % 12);
            content = '<div id="hr" style="background-color:rgba(226, 226, 226, 0.4);' +
                'color:rgba(29,29,29,0.9);padding:4px;font-size:12px;">' +
                (hourValue === 0 ? 12 : hourValue) + ':' + Math.floor(returnTime.getMinutes()) +
                (returnTime.getHours() >= 12 ? ' PM' : ' AM') + '</div>';
            gauge.setAnnotationValue(0, 2, content); let date: Date = new Date();
            content = '<div id="tm" style="font-size:10px;">' + date.getDate() + '-' +
                (date.getMonth() + 1) + '-' + date.getFullYear() + '</div>';
            gauge.setAnnotationValue(0, 3, content);
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent id='annotation-container' ref={gauge => this.gauge = gauge}
                        loaded={this.onChartLoad.bind(this)}
                        resized={this.onResized.bind(this)}
                        centerY='45%'
                        titleStyle={{ color: 'black', size: '16px' }}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={0} radius={Browser.isDevice ? '90%' : '70%'} minimum={0} maximum={12}
                                majorTicks={{
                                    width: 2, height: 14, interval: 1, color: 'rgb(29,29,29)'
                                }} lineStyle={{ width: 0 }}
                                minorTicks={{
                                    height: 4, width: 1, interval: 0.2, color: 'rgb(29,29,29)'
                                }} labelStyle={{
                                    hiddenLabel: 'First', font: { color: 'rgb(29,29,29)' }, autoAngle: false
                                }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div id="minutes" style="width:75px;height:75px;"></div>'
                                        angle={270} radius='50%' zIndex='1'>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div id="seconds" style="width:75px;height:75px;"></div>'
                                        angle={180} radius='50%' zIndex='1'>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div id="hr" style="background-color:rgba(29,29,29,0.6); color:white;font-size:12px;">11:11 AM</div>'
                                        angle={90} radius='40%' zIndex='1'>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div id="tm" style="font-size:10px;">21-06-17</div>'
                                        angle={360} radius='50%' zIndex='1'>
                                    </AnnotationDirective>
                                </AnnotationsDirective>
                                <PointersDirective>
                                    <PointerDirective pointerWidth={5} radius='40%' color='rgba(29,29,29,0.8)'
                                        border={{ width: 0, color: '#679EEF' }}
                                        cap={{ radius: 0, border: { width: 0, color: 'red' } }}
                                        needleTail={{ length: '0%' }} animation={{ enable: false }}>
                                    </PointerDirective>
                                    <PointerDirective radius='60%' pointerWidth={5} color='rgba(29,29,29,0.8)'
                                        border={{ width: 0, color: '#2856B6' }}
                                        cap={{ color: 'rgba(29,29,29,0.8)', radius: 0, border: { width: 0, color: 'red' } }}
                                        needleTail={{ length: '0%' }}
                                        animation={{ enable: false }}>
                                    </PointerDirective>
                                    <PointerDirective radius='70%'
                                        pointerWidth={1}
                                        color='rgba(29,29,29,0.8)'
                                        cap={{ color: 'white', radius: 4, border: { width: 2, color: 'rgba(29,29,29,0.8)' } }}
                                        border={{ width: 2, color: 'rgba(29,29,29,0.8)' }}
                                        needleTail={{ color: 'rgba(29,29,29,0.8)', length: '20%', border: { width: 2, color: 'rgba(29,29,29,0.8)' } }}
                                        animation={{ enable: false, duration: 500 }}>
                                    </PointerDirective>
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={3} color='rgba(29,29,29,0.6)' />
                                    <RangeDirective start={3} end={12} color='rgba(226, 226, 226, 0.6)' />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to use annotation in the circular gauge. Annotations are used to mark the specific area
                        of interest in gauge with texts, shapes or images. In this sample <code>minutes</code> and <code>seconds</code>        sub gauges are achieved using <code>annotation</code> feature.
                    </p>
                    <br />
            </div >
        )
    }
}
ReactDOM.render(<AnnotationsSample />, document.getElementById('sample'));