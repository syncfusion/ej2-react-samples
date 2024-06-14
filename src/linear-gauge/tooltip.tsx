import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, LinearGaugeTheme, IAxisLabelRenderEventArgs, ILoadedEventArgs, ILoadEventArgs, IResizeEventArgs, ITooltipRenderEventArgs, GaugeTooltip, AnnotationsDirective, Annotations, Inject, AnnotationDirective, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Tooltip extends SampleBase<{}, {}> {
    private gaugeInstance: LinearGaugeComponent;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    public tooltipRender(args: ITooltipRenderEventArgs): void {
        args.content = (args.axis.visibleRange.max === 25) ? Number(args.content).toFixed(1) + ' cm' : Number(args.content).toFixed(1) + ' in';
    }

    public gaugeLoad(args: ILoadEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast') {
            args.gauge.annotations[0].content = '<div id="first"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
            args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
        }
        let width: number = Number(document.getElementById('tooltipContainer').offsetWidth);
        if (width < 500) {
            args.gauge.axes[1].majorTicks.interval = 2;
            args.gauge.axes[1].minorTicks.interval = 1;
            args.gauge.orientation = 'Vertical';
            args.gauge.annotations[0].x = -57;
            args.gauge.annotations[0].y = -30;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = -45;
        } else {
            args.gauge.axes[1].majorTicks.interval = 1;
            args.gauge.axes[1].minorTicks.interval = 0.2;
            args.gauge.orientation = 'Horizontal';
            args.gauge.annotations[0].x = 35;
            args.gauge.annotations[0].y = -58;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = 52;
        }
    }
    public gaugeLoaded(args: ILoadedEventArgs): void {
        if (document.getElementById('tooltipContainer')) {
            if (args.gauge.availableSize.width < 500) {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = 'rotate(270deg)';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = 'rotate(270deg)';
            } else {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = '';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = '';
            }
        }
    }

    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
            args.text = '';
        }
    }

    public gaugeResized(args: IResizeEventArgs): void {
        if (args.currentSize.width < 500) {
            this.gaugeInstance.axes[1].majorTicks.interval = 2;
            this.gaugeInstance.axes[1].minorTicks.interval = 1;
            this.gaugeInstance.orientation = 'Vertical';
            this.gaugeInstance.annotations[0].x = -57;
            this.gaugeInstance.annotations[0].y = -30;
            this.gaugeInstance.annotations[1].x = 50;
            this.gaugeInstance.annotations[1].y = -45;
        } else {
            this.gaugeInstance.axes[1].majorTicks.interval = 1;
            this.gaugeInstance.axes[1].minorTicks.interval = 0.2;
            this.gaugeInstance.orientation = 'Horizontal';
            this.gaugeInstance.annotations[0].x = 35;
            this.gaugeInstance.annotations[0].y = -58;
            this.gaugeInstance.annotations[1].x = 50;
            this.gaugeInstance.annotations[1].y = 52;
        }
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <LinearGaugeComponent id='tooltipContainer' ref={gauge => this.gaugeInstance = gauge} background='transparent' orientation='Horizontal' axisLabelRender={this.labelRender.bind(this)} load={this.gaugeLoad.bind(this)} loaded={this.gaugeLoaded.bind(this)} resized={this.gaugeResized.bind(this)} tooltipRender={this.tooltipRender.bind(this)} container={{ width: 140, border: { width: 2, color: '#a6a6a6' } }}
                        tooltip={{ enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } }} >
                        <Inject services={[Annotations, GaugeTooltip]} />
                        <AxesDirective>
                            <AxisDirective minimum={0} maximum={10} majorTicks={{ interval: 1, height: 20, color: '#9E9E9E' }} minorTicks={{ interval: 0.2, height: 10, color: '#9E9E9E' }} line={{ offset: 140, color: '#a6a6a6' }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective type='Bar' value={5.4} color='#ff66b3' offset={15}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                            <AxisDirective opposedPosition={true} minimum={0} maximum={25} majorTicks={{ interval: 1, height: 20, color: '#9E9E9E' }} minorTicks={{ interval: 0.2, height: 10, color: '#9E9E9E' }} line={{ offset: -140, color: '#a6a6a6' }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective type='Bar' value={16.5} color='#4d94ff' offset={-15}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="first"><h1 style="font-size:15px;color:#686868;">Inches</h1></div>'
                                axisIndex={0}
                                axisValue={5.4}
                                x={35}
                                y={-58}
                                zIndex='1'>
                            </AnnotationDirective>
                            <AnnotationDirective content='<div id="second"><h1 style="font-size:15px;color:#686868;">Centimeters</h1></div>'
                                axisIndex={1}
                                axisValue={16.5}
                                x={50}
                                y={52}
                                zIndex='1'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Linear Gauge sample">
                    <p>
                        This sample depicts the linear gauge as a measuring scale and shows the tooltip in the linear gauge.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                    <p>
                        The tooltip is used to track the current value that is closest to the mouse position or touch contact. When using a touch-enabled device, the tooltip is displayed by hovering or tapping.
                    </p>
                    <p>
                        More information about tooltip can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/user-interaction/#tooltip">documentation section</a>.
                    </p>
                </section>
        </main>
        )
    }
}


