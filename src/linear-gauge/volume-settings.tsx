import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
.container {
    width: 80px;
    display: flex;
    justify-content: center;
}

@font-face {
    font-family: 'font-v1';
    src:
        url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
}

#lineargauge-volume-settings [class^="sf-icon-"],
#lineargauge-volume-settings [class*=" sf-icon-"] {
    font-family: 'font-v1' !important;
    color: white;
    speak: none;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-left: 40%;
    margin-top: 70%;
}

#lineargauge-volume-settings .sf-icon-music:before {
    content: '\\e701';
    color: white !important;
}

#lineargauge-volume-settings .sf-icon-clock:before {
    content: '\\e702';
    color: white !important;
    margin-left: 2px;
}

#lineargauge-volume-settings .sf-icon-tick:before {
    content: '\\e704';
}

#lineargauge-volume-settings .sf-icon-bell:before {
    content: '\\e706';
    color: white !important;
}`;

export class VolumeSettings extends SampleBase<{}, {}> {

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
        // custom code end
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <div id='lineargauge-volume-settings' className='container' style={{ paddingTop: "12px" }}>
                        <div style={{ padding: "6px" }}>
                            <LinearGaugeComponent load={this.load.bind(this)} background='transparent' id='gaugeone' width='60px' height='350px' orientation='Vertical' container={{ width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent' }}>
                                <Inject services={[Annotations]} />
                                <AxesDirective>
                                    <AxisDirective minimum={0} maximum={100} line={{ width: 0 }} minorTicks={{ interval: 10, height: 0 }} majorTicks={{ interval: 20, height: 0 }} labelStyle={{ format:'Music {value} %', font: { size: '0px' } }}>
                                        <PointersDirective>
                                            <PointerDirective value={100} width={30} color='#0074E3' type='Bar' position='Cross' roundedCornerRadius={15} offset={-15}>
                                            </PointerDirective>
                                        </PointersDirective>
                                    </AxisDirective>
                                </AxesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div style="width: 70px;font-size: 16px;margin-left:63px;margin-top: -31px;">100%</div>' axisIndex={0} axisValue={100} x={0} zIndex='1' y={0}>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div class="sf-icon-music" style="width:16px"></div>' axisIndex={0} axisValue={11} x={9} zIndex='1' y={1}>
                                    </AnnotationDirective>
                                </AnnotationsDirective>
                            </LinearGaugeComponent>
                        </div>
                        <div style={{ padding: "6px" }}>
                            <LinearGaugeComponent load={this.load.bind(this)} background='transparent' id='gaugetwo' width='60px' height='350px' orientation='Vertical' container={{ width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent' }}>
                                <Inject services={[Annotations]} />
                                <AxesDirective>
                                    <AxisDirective minimum={0} maximum={100} line={{ width: 0 }} minorTicks={{ interval: 10, height: 0 }} majorTicks={{ interval: 20, height: 0 }} labelStyle={{ format:'Bell {value} %', font: { size: '0px' } }}>
                                        <PointersDirective>
                                            <PointerDirective value={85} width={30} color='#0074E3' type='Bar' position='Cross' roundedCornerRadius={15} offset={-15}>
                                            </PointerDirective>
                                        </PointersDirective>
                                    </AxisDirective>
                                </AxesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div style="width: 70px;font-size: 16px;margin-left:72px;margin-top: -31px;"> 85%</div>' axisIndex={0} axisValue={100} x={0} zIndex='1' y={0}>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div class="sf-icon-bell" style="width:16px"></div>' axisIndex={0} axisValue={11} x={9} zIndex='1' y={1}>
                                    </AnnotationDirective>
                                </AnnotationsDirective>
                            </LinearGaugeComponent>
                        </div>
                        <div style={{ padding: "6px" }}>
                            <LinearGaugeComponent load={this.load.bind(this)} background='transparent' id='gaugethree' width='60px' height='350px' orientation='Vertical' container={{ width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent' }}>
                                <Inject services={[Annotations]} />
                                <AxesDirective>
                                    <AxisDirective minimum={0} maximum={100} line={{ width: 0 }} minorTicks={{ interval: 10, height: 0 }} majorTicks={{ interval: 20, height: 0 }} labelStyle={{ format:'Clock {value} %', font: { size: '0px' } }}>
                                        <PointersDirective>
                                            <PointerDirective value={65} width={30} color='#0074E3' type='Bar' position='Cross' roundedCornerRadius={15} offset={-15}>
                                            </PointerDirective>
                                        </PointersDirective>
                                    </AxisDirective>
                                </AxesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div style="width: 70px;font-size: 16px;margin-left:70px;margin-top: -31px;">65%</div>' axisIndex={0} axisValue={100} x={0} zIndex='1' y={0}>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div class="sf-icon-clock" style="width:16px"></div>' axisIndex={0} axisValue={11} x={7} zIndex='1' y={1}>
                                    </AnnotationDirective>
                                </AnnotationsDirective>
                            </LinearGaugeComponent>
                        </div>
                    </div>
                </div>
            </div >
                <section id="action-description" aria-label="Description of Linear Gauge sample">
                    <p>
                        This sample demonstrates volume adjustments made for music/video and alarm clock applications.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to render and configure a linear gauge to look like a sound tracker. This can be accomplished by combining axis, pointer and annotation.
                    </p>
                    <p>
                        More information on the linear gauge can be found in this  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                    </p>
                </section>
        </main>
        )
    }
} 