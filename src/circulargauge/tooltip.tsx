/**
 * Sample for tooltip
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, ILoadedEventArgs, AxisDirective, ITooltipRenderEventArgs, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, GaugeTooltip, TickModel, getRangeColor,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #templateWrap img {
        border-radius: 30px;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }
    #templateWrap .des {
        float: right;
        padding-left: 10px;
        line-height: 30px;
    }`;
    
export class Tooltip extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-12'>
                        <CircularGaugeComponent title='Tooltip Customization' loaded={this.onChartLoad.bind(this)} tooltipRender={this.tooltipRender.bind(this)} id='tooltip-container' ref={gauge => this.gauge = gauge} enablePointerDrag={true}
                            titleStyle={{ size: '15px', color: 'grey' }} tooltip={{
                                enable: true,
                                template: '<div id="gauge-tooltip"><div id="templateWrap">'
                                          + '<img src="src/circulargauge/images/range1.png" />'
                                          + '<img src="src/circulargauge/images/range3.png" /><div class="des"><span>${Math.round(pointers[0].value)} MPH</span></div></div></div>',
                                border: {
                                    color: '#33BCBD',
                                    width: 2
                                }
                            }}>
                            <Inject services={[GaugeTooltip]} />
                            <AxesDirective>
                                <AxisDirective startAngle={240} endAngle={120} radius='90%' minimum={0} maximum={120}
                                    majorTicks={{
                                        color: 'white', offset: -5, height: 12
                                    }}
                                    lineStyle={{ width: 0 }}
                                    minorTicks={{
                                        width: 0
                                    }} labelStyle={{
                                        useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={70} radius='60%'
                                            cap={{
                                                radius: 10, border: { color: '#33BCBD', width: 5 }
                                            }}
                                            animation={{
                                                enable: true, duration: 1500
                                            }} color='#33BCBD' />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={50} radius='102%' color='#3A5DC8' startWidth={10} endWidth={10} />
                                        <RangeDirective start={50} end={120} radius='102%' color='#33BCBD' startWidth={10} endWidth={10} />
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates rendering tooltip in circular gauge. To see tooltip in action , hover pointer or tap on pointer.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to show the tooltip for pointer in gauge, to see the tooltip in action, hover pointer or
                        tap on pointer in touch enabled devices.
                    </p>
                    <br />
                    <p className='description-header'>Injecting Module</p>
                    <p>Circular gauge component features are segregated into individual feature-wise modules. To use tooltip, we need to inject
                        <code>GaugeTooltip</code> module into services.
                    </p>
                    <p>
                        More information on the tooltip can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('tooltip-container').setAttribute('title', '');
    };

    public tooltipRender(args: ITooltipRenderEventArgs): void {
        let color: string;
        let value: number = args.pointer.currentValue;
        let content: HTMLElement = args.content as HTMLElement;
        if (value >= 0 && value <= 50) {
            color = '#3A5DC8';
            content.children[0].children[1].remove();
        } else {
            color = '#33BCBD';
            content.children[0].children[0].remove();
        }
        args.textStyle.color = color;
        args.border.color = color;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[0].pointers[0].color = color;
        this.gauge.axes[0].pointers[0].cap.border.color = color;
        this.gauge.setPointerValue(0, 0, value);
    };
}