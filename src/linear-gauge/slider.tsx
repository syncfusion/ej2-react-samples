/**
 * Sample to design slider using the Linear Gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, Inject, GaugeTooltip, ILoadedEventArgs, LinearGaugeTheme, IPointerDragEventArgs, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class Slider extends SampleBase<{}, {}> {
    private enableSliderGauge: LinearGaugeComponent;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }
    private pointerValue: number;
    public dragMove(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.enableSliderGauge.setPointerValue(0, 0, args.currentValue);
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent title='Enabled' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} dragMove={this.dragMove.bind(this)} load={this.load.bind(this)} background='transparent' id='enableSliderGauge' height='150px' width='450px' format='N0' orientation='Horizontal' ref={enableSliderGauge => this.enableSliderGauge = enableSliderGauge}
                            tooltip={{ enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } }}>
                            <Inject services={[GaugeTooltip]} />
                            <AxesDirective>
                                <AxisDirective minimum={0} maximum={100} opposedPosition={true} line={{ width: 5, color: '#C2DEF8' }} minorTicks={{ interval: 10, height: 0 }} majorTicks={{ interval: 20, height: 0 }} labelStyle={{ offset: 10, font: { fontFamily: 'inherit' } }}>
                                    <PointersDirective>
                                        <PointerDirective value={50} height={5} width={5} color='#0074E3' position='Cross' type='Bar'>
                                        </PointerDirective>
                                        <PointerDirective value={50} height={15} width={15} color='#0074E3' placement='Center' enableDrag={true} offset={-10} markerType='Circle'>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent title='Disabled' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} load={this.load.bind(this)} background='transparent' id='disableSliderGauge' height='150px' width='450px' orientation='Horizontal'>
                            <AxesDirective>
                                <AxisDirective minimum={0} maximum={100} opposedPosition={true} line={{ width: 5, color: '#E0E0E0' }} minorTicks={{ interval: 10, height: 0 }} majorTicks={{ interval: 20, height: 0 }} labelStyle={{ offset: 10, font: { fontFamily: 'inherit' } }}>
                                    <PointersDirective>
                                        <PointerDirective value={50} height={5} width={5} color='#ADADAD' position='Cross' enableDrag={false} type='Bar'>
                                        </PointerDirective>
                                        <PointerDirective value={50} height={15} width={15} color='#ADADAD' placement='Center' enableDrag={false} offset={-10} markerType='Circle'>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how to create a slider by utilizing the functionalities available in the linear gauge.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a new slider in the linear gauge. This can be accomplished by combining axis, range, and pointer. The pointer has been made interactive, so the value changes as you drag it.
                    </p>
                    <p>
                        More information on the linear gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    }
} 