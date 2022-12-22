/**
 * Sample for default functionalities in the Circular Gauge
 */

import * as React from "react";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective,
    GaugeTheme, ILoadedEventArgs, RangesDirective, RangeDirective, AnnotationsDirective, AnnotationDirective, Annotations, Inject
} from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid { padding: 0px !important; }
    .titleText { font-family: inherit; font-size: 22px; margin-top: 13px; }
    .e-view.tailwind div.titleText, .e-view.tailwind-dark div.titleText { font-size: 22px; margin-top: 0px; }
    .annotation { font-family: inherit; font-size: 18px; }
    @media screen and (max-width: 420px) {
        .titleText {font-size: 15px; }
        .annotation { font-size: 13px; }
        .e-view.tailwind div.titleText, .e-view.tailwind-dark div.titleText { font-size: 15px;	margin-top: 0px; }
    }
     `;

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
            args.gauge.axes[0].annotations[0].angle = 342;
            args.gauge.axes[0].annotations[0].radius = "92%";
            args.gauge.axes[0].annotations[1].angle = 337;
            args.gauge.axes[0].annotations[1].radius = "80%";
            args.gauge.axes[0].annotations[2].angle = 337;
            args.gauge.axes[0].annotations[2].radius = "65%";
            args.gauge.axes[0].annotations[3].angle = 326;
            args.gauge.axes[0].annotations[3].radius = "55%";
            args.gauge.axes[0].annotations[4].angle = 323;
            args.gauge.axes[0].annotations[4].radius = "39%";
            args.gauge.axes[0].annotations[5].angle = 192;
            args.gauge.axes[0].annotations[5].radius = "91%";
            args.gauge.axes[0].annotations[9].angle = 136;
            args.gauge.axes[0].annotations[9].radius = "34%";
        }
        // custom code end
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section' style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularGaugeComponent load={load.bind(this)} id="gauge" background="transparent" height="500px" title="Female (% usage) on popular social network" titleStyle={{ size: '18px', fontFamily: 'inherit' }} >
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective startAngle={0} endAngle={270} minimum={0} maximum={100} majorTicks={{ width: 0 }} lineStyle={{ width: 0 }} minorTicks={{ width: 0 }} labelStyle={{ font: { size: '0px', }, }} >
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div class="titleText" style="color:#c8eab7;">YouTube</div>' angle={344} radius="94%" zIndex="1" />
                                <AnnotationDirective content='<div class="titleText" style="color:#82cdbc;">Instagram</div>' angle={340} radius="81%" zIndex="1" />
                                <AnnotationDirective content='<div class="titleText" style="color:#43b6c4;">Twitter</div>' angle={340} radius="66%" zIndex="1" />
                                <AnnotationDirective content='<div class="titleText" style="color:#1d91bf;">Facebook</div>' angle={332} radius="55%" zIndex="1" />
                                <AnnotationDirective content='<div class="titleText" style="color:#205ea8;">TikTok</div>' angle={328} radius="40%" zIndex="1" />
                                <AnnotationDirective content='<div class="annotation">68%</div>' angle={191} radius="89%" zIndex="1" />
                                <AnnotationDirective content='<div class="annotation">43%</div>' angle={125} radius="75%" zIndex="1" />
                                <AnnotationDirective content='<div class="annotation">21%</div>' angle={67} radius="62%" zIndex="1" />
                                <AnnotationDirective content='<div class="annotation">75%</div>' angle={215} radius="48%" zIndex="1" />
                                <AnnotationDirective content='<div class="annotation">44%</div>' angle={133} radius="33%" zIndex="1" />
                            </AnnotationsDirective>
                            <PointersDirective>
                                <PointerDirective pointerWidth={0} cap={{ radius: 0, border: { width: 0 } }} />
                            </PointersDirective>
                            <RangesDirective>
                                <RangeDirective start={0} end={68} radius="94%" color="#c8eab7" startWidth={22} endWidth={22} />
                                <RangeDirective start={74} end={100} radius="90%" color="#7a7f82" startWidth={1} endWidth={1} />
                                <RangeDirective start={0} end={43} radius="80%" color="#82cdbc" startWidth={22} endWidth={22} />
                                <RangeDirective start={49} end={100} radius="76%" color="#7a7f82" startWidth={1} endWidth={1} />
                                <RangeDirective start={0} end={21} radius="66%" color="#43b6c4" startWidth={22} endWidth={22} />
                                <RangeDirective start={28} end={100} radius="63%" color="#7a7f82" startWidth={1} endWidth={1} />
                                <RangeDirective start={0} end={75} radius="52%" color="#1d91bf" startWidth={22} endWidth={22} />
                                <RangeDirective start={85} end={100} radius="49%" color="#7a7f82" startWidth={1} endWidth={1} />
                                <RangeDirective start={0} end={44} radius="38%" color="#205ea8" startWidth={22} endWidth={22} />
                                <RangeDirective start={55} end={100} radius="35%" color="#7a7f82" startWidth={1} endWidth={1} />
                            </RangesDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample shows the arc gauge's default rendering. It also shows the most popular social media platforms and the percentage of female users.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a default arc gauge. The arc gauge helps in the visualization of numerical values of scales in a semi-circular manner. You can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/">axes</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/">ranges</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/">annotations</a> oriented properties to customize the default appearance of the arc gauge.
                </p>
                <p>
                    More information on the arc gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Default; 