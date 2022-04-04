/**
 * Dynamic gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, IAxisLabelRenderEventArgs, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { EmitType, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, CircularGauge } from '@syncfusion/ej2-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Speedometer extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    private gauge1: CircularGauge;
    private textElement: CheckBoxComponent;
    private rangeElement: CheckBoxComponent;
    private gapElement: CheckBoxComponent;
    // Code for Property Panel
    private rangeChange() {        
        if (this.rangeElement.checked === true) {
            this.gapElement.disabled = true;
            this.gauge.axes[0].ranges[0].start = 0;
            this.gauge.axes[0].ranges[0].end = 120;
            this.gauge.axes[0].ranges[0].startWidth = 5;
            this.gauge.axes[0].ranges[0].endWidth = 35;
            this.gauge.axes[0].ranges[0].color = 'url(#grad1)';
            this.gauge.axes[0].ranges[1].start = null;
            this.gauge.axes[0].ranges[1].end = null;
            this.gauge.axes[0].ranges[1].startWidth = '';
            this.gauge.axes[0].ranges[1].endWidth = '';
            this.gauge.axes[0].ranges[1].color = '';
            this.gauge.axes[0].ranges[2].start = null;
            this.gauge.axes[0].ranges[2].end = null;
            this.gauge.axes[0].ranges[2].startWidth = '';
            this.gauge.axes[0].ranges[2].endWidth = '';
            this.gauge.axes[0].ranges[2].color = '';
            this.gauge.axes[0].ranges[3].start = null;
            this.gauge.axes[0].ranges[3].end = null;
            this.gauge.axes[0].ranges[3].startWidth = '';
            this.gauge.axes[0].ranges[3].endWidth = '';
            this.gauge.axes[0].ranges[3].color = '';
            this.gauge.axes[0].ranges[4].start = null;
            this.gauge.axes[0].ranges[4].end = null;
            this.gauge.axes[0].ranges[4].startWidth = '';
            this.gauge.axes[0].ranges[4].endWidth = '';
            this.gauge.axes[0].ranges[4].color = '';
            this.gauge.axes[0].ranges[5].start = null;
            this.gauge.axes[0].ranges[5].end = null;
            this.gauge.axes[0].ranges[5].startWidth = '';
            this.gauge.axes[0].ranges[5].endWidth = '';
            this.gauge.axes[0].ranges[5].color = '';
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        } else {
            this.gapElement.disabled = false;
            this.gauge.axes[0].ranges[0].start = 0;
            this.gauge.axes[0].ranges[0].end = 20;
            this.gauge.axes[0].ranges[0].startWidth = 5;
            this.gauge.axes[0].ranges[0].endWidth = 10;
            this.gauge.axes[0].ranges[0].color = '#82b944';
            this.gauge.axes[0].ranges[1].start = 20;
            this.gauge.axes[0].ranges[1].end = 40;
            this.gauge.axes[0].ranges[1].startWidth = 10;
            this.gauge.axes[0].ranges[1].endWidth = 15;
            this.gauge.axes[0].ranges[1].color = '#a1cb43';
            this.gauge.axes[0].ranges[2].start = 40;
            this.gauge.axes[0].ranges[2].end = 60;
            this.gauge.axes[0].ranges[2].startWidth = 15;
            this.gauge.axes[0].ranges[2].endWidth = 20;
            this.gauge.axes[0].ranges[2].color = '#ddec12';
            this.gauge.axes[0].ranges[3].start = 60;
            this.gauge.axes[0].ranges[3].end = 80;
            this.gauge.axes[0].ranges[3].startWidth = 20;
            this.gauge.axes[0].ranges[3].endWidth = 25;
            this.gauge.axes[0].ranges[3].color = '#ffbc00';
            this.gauge.axes[0].ranges[4].start = 80;
            this.gauge.axes[0].ranges[4].end = 100;
            this.gauge.axes[0].ranges[4].startWidth = 25;
            this.gauge.axes[0].ranges[4].endWidth = 30;
            this.gauge.axes[0].ranges[4].color = '#ff6000';
            this.gauge.axes[0].ranges[5].start = 100;
            this.gauge.axes[0].ranges[5].end = 120;
            this.gauge.axes[0].ranges[5].startWidth = 30;
            this.gauge.axes[0].ranges[5].endWidth = 35;
            this.gauge.axes[0].ranges[5].color = 'red';
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        }
    }

    private textChange() {
        if (this.textElement.checked === true) {
            this.gauge.axes[0].majorTicks.interval = 10;
            this.gauge.axisLabelRender = (args: IAxisLabelRenderEventArgs ) => {
                let text: string;
                switch (parseInt(args.text)) {
                    case 10:
                        text = 'Ideal';
                        break;
                    case 30:
                        text = 'Safe';
                        break;
                    case 50:
                        text = 'Good';
                        break;
                    case 70:
                        text = 'Ok';
                        break;
                    case 90:
                        text = 'Risk';
                        break;
                    case 110:
                        text = 'Danger';
                        break;

                    default:
                        text = '';
                        break;
                }
                args.text = text;
            };
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        } else {
            this.gauge.axes[0].majorTicks.interval = 20;
            this.gauge.axes[0].minimum = 0;
            this.gauge.axes[0].maximum = 120;
            this.gauge.axisLabelRender = (args: IAxisLabelRenderEventArgs ) => {};
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        }
    }

    private gapChange() {        
        if (this.gapElement.checked) {
            this.gauge.axes[0].rangeGap = 5;
        } else {
            this.gauge.axes[0].rangeGap = null;
        }
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    }

    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
    }
    // custom code end
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-8 control-section'>    
                    <svg style={style1}>
                        <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={style2} />
                            <stop offset="50%" style={style3} />
                            <stop offset="100%" style={style4} />
                        </linearGradient>
                        </defs>   
                    </svg>
                    <CircularGaugeComponent title='Speedometer' titleStyle={{ size: '18px' }} centerY='75%' load={this.load.bind(this)} ref={gauge => this.gauge = gauge} id='container'>
                        <AxesDirective>
                            <AxisDirective radius='120%' startAngle={270} endAngle={90} minimum={0} maximum={120}
                                lineStyle={{ width: 0 }}
                                labelStyle={{
                                    font: {
                                        size: '13px',
                                        fontFamily: 'Roboto'
                                    },
                                    position: 'Outside',
                                    autoAngle: true,
                                    useRangeColor: false
                                }}
                                majorTicks={{ height: 0 }}
                                minorTicks={{ height: 0 }}>
                                <PointersDirective>
                                    <PointerDirective animation={{enable: true, duration: 900 }}  value={40} radius='80%' color='#757575' pointerWidth={7}
                                        cap={{
                                            radius: 8,
                                            color: '#757575',
                                            border: { width: 0 }
                                        }} needleTail ={{
                                            color: '#757575',
                                            length: '15%'
                                        }} />
                                </PointersDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        content='<div style="width:90px;text-align:center;font-size:20px;font-family:Roboto">${pointers[0].value} km/h</div>'
                                        angle={0} zIndex='1' radius='30%'/>
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective
                                        start={0} end={20} startWidth={5} endWidth={10} radius='102%'
                                        color='#82b944'
                                    />
                                    <RangeDirective
                                        start={20} end={40} startWidth={10} endWidth={15} radius='102%'
                                        color='#a1cb43'
                                    />
                                    <RangeDirective
                                        start={40} end={60} startWidth={15} endWidth={20} radius='102%'
                                        color='#ddec12'
                                    />
                                    <RangeDirective
                                        start={60} end={80} startWidth={20} endWidth={25} radius='102%'
                                        color='#ffbc00'
                                    />
                                    <RangeDirective
                                        start={80} end={100} startWidth={25} endWidth={30} radius='102%'
                                        color='#ff6000'
                                    />
                                    <RangeDirective
                                        start={100} end={120} startWidth={30} endWidth={35} radius='102%'
                                        color='red'
                                    />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: '-10px' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>Show text labels</div>
                                    </td>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='showText' change={this.textChange.bind(this)} ref={d => this.textElement = d} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Combine ranges</div>
                                    </td>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='combineRange' change={this.rangeChange.bind(this)} ref={d => this.rangeElement = d} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Gap between ranges</div>
                                    </td>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='range' change={this.gapChange.bind(this)} ref={d => this.gapElement = d} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample depicts the appearance of speedometer rendered using the circular gauge. The pointer is changed with random values dynamically.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to make the look of circular gauge like a speedometer. The labels can be changed to text values, gap can be added between the ranges, or the ranges can be combined to form single range using the options in the properties panel.
                    </p>
                    <p>
                        For more information on ranges, refer to this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }

    gauge5Interval1 = setInterval(
        (): void => {
            if(this.gauge) {
                let newVal: number = this.gauge.axes[0].pointers[0].value + (Math.floor(Math.random() * (10 - (-10))) - 10);
                if (newVal <= 0) {
                    newVal = 5;
                }
                if (document.getElementById('container')) {
                    this.gauge.axes[0].pointers[0].animation.enable = true;
                    this.gauge.setPointerValue(0, 0, newVal);
                    if (!isNullOrUndefined(document.getElementById('pointerannotation'))) {
                        document.getElementById('pointerannotation').innerHTML = newVal.toString() + ' km/h';
                    }
                } else {
                    clearInterval(this.gauge5Interval1);
                }
            }
        },
        1000
    );
}
 

var style1 = {
    'height': '0px',
    'width': '0px'
}

var style2 = {
    'stopColor': '#82b944',
    'stopOpacity': 1
}

var style3 = {
    'stopColor': 'rgb(255,255,0)',
    'stopOpacity': 1
}
 
var style4 = {
    'stopColor':'red',
    'stopOpacity': 1
}