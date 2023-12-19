import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LinearGaugeComponent, LinearGaugeTheme, IAxisLabelRenderEventArgs, ILoadedEventArgs, ILoadEventArgs, IResizeEventArgs, ITooltipRenderEventArgs, GaugeTooltip, AnnotationsDirective, Annotations, Inject, AnnotationDirective, AxesDirective, AxisDirective, PointersDirective, PointerDirective, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Tooltip = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [gaugeOriention, setOrientation] = useState<Orientation>('Horizontal');
    let gaugeInstance = useRef<LinearGaugeComponent>(null);

    const tooltipRender = (args: ITooltipRenderEventArgs): void => {
        args.content = (args.axis.visibleRange.max === 25) ? Number(args.content).toFixed(1) + ' cm' : Number(args.content).toFixed(1) + ' in';
    }

    const gaugeLoad = (args: ILoadEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast') {
            args.gauge.annotations[0].content = '<div id="first"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
            args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
        }
        let width: number = Number(args.gauge.element.offsetWidth);
        if (width < 500) {
            args.gauge.axes[1].majorTicks.interval = 2;
            args.gauge.axes[1].minorTicks.interval = 1;
            args.gauge.annotations[0].x = -57;
            args.gauge.annotations[0].y = -30;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = -45;
            args.gauge.orientation = "Vertical";
        } else {
            args.gauge.axes[1].majorTicks.interval = 1;
            args.gauge.axes[1].minorTicks.interval = 0.2;
            args.gauge.annotations[0].x = 35;
            args.gauge.annotations[0].y = -58;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = 52;
            args.gauge.orientation = "Horizontal";
        }
    }

    const gaugeLoaded = (args: ILoadedEventArgs): void => {
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

    const labelRender = (args: IAxisLabelRenderEventArgs): void => {
        if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
            args.text = '';
        }
    }

    const gaugeResized = (args: IResizeEventArgs): void => {
        if (args.currentSize.width < 500) {
            gaugeInstance.current.axes[1].majorTicks.interval = 2;
            gaugeInstance.current.axes[1].minorTicks.interval = 1;
            gaugeInstance.current.annotations[0].x = -57;
            gaugeInstance.current.annotations[0].y = -30;
            gaugeInstance.current.annotations[1].x = 50;
            gaugeInstance.current.annotations[1].y = -45;
            gaugeInstance.current.orientation = "Vertical";
        } else {
            gaugeInstance.current.axes[1].majorTicks.interval = 1;
            gaugeInstance.current.axes[1].minorTicks.interval = 0.2;
            gaugeInstance.current.annotations[0].x = 35;
            gaugeInstance.current.annotations[0].y = -58;
            gaugeInstance.current.annotations[1].x = 50;
            gaugeInstance.current.annotations[1].y = 52;
            gaugeInstance.current.orientation = "Horizontal";
        }
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-scxection'>
                <LinearGaugeComponent id='tooltipContainer' ref={gaugeInstance} background='transparent' orientation={gaugeOriention} axisLabelRender={labelRender.bind(this)} load={gaugeLoad.bind(this)} loaded={gaugeLoaded.bind(this)} resized={gaugeResized.bind(this)} tooltipRender={tooltipRender.bind(this)} container={{ width: 140, border: { width: 2, color: '#a6a6a6' } }} tooltip={{ enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } }}>
                    <Inject services={[Annotations, GaugeTooltip]} />
                    <AxesDirective>
                        <AxisDirective minimum={0} maximum={10} majorTicks={{ interval: 1, height: 20, color: '#9E9E9E' }} minorTicks={{ interval: 0.2, height: 10, color: '#9E9E9E' }} line={{ offset: 140 }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                            <PointersDirective>
                                <PointerDirective type='Bar' value={5.4} color='#ff66b3' offset={15} />
                            </PointersDirective>
                        </AxisDirective>
                        <AxisDirective opposedPosition={true} minimum={0} maximum={25} majorTicks={{ interval: 1, height: 20, color: '#9E9E9E' }} minorTicks={{ interval: 0.2, height: 10, color: '#9E9E9E' }} line={{ offset: -140 }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                            <PointersDirective>
                                <PointerDirective type='Bar' value={16.5} color='#4d94ff' offset={-15} />
                            </PointersDirective>
                        </AxisDirective>
                    </AxesDirective>
                    <AnnotationsDirective>
                        <AnnotationDirective content='<div id="first"><h1 style="font-size:15px;color:#686868;">Inches</h1></div>' axisIndex={0} axisValue={5.4} x={35} y={-58} zIndex='1' />
                        <AnnotationDirective content='<div id="second"><h1 style="font-size:15px;color:#686868;">Centimeters</h1></div>' axisIndex={1} axisValue={16.5} x={50} y={52} zIndex='1' />
                    </AnnotationsDirective>
                </LinearGaugeComponent>
            </div>
            <div id="action-description">
                <p>This sample depicts the linear gauge as a measuring scale and shows the tooltip in the linear gauge.</p>
            </div>
            <div id="description">
                <p>The tooltip is used to track the current value that is closest to the mouse position or touch contact. When using a touch-enabled device, the tooltip is displayed by hovering or tapping.</p>
                <p>
                    More information about tooltip can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/user-interaction/#tooltip">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Tooltip;