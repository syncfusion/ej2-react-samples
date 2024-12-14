import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective,
    AnnotationDirective, Annotations, AnnotationsDirective, RangesDirective, RangeDirective
} from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class BatteryIndicator extends SampleBase<{}, {}> {
    borderColor: string = '#E5E7EB';
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
        // custom code end           
        this.borderColor = args.gauge.theme.indexOf('Dark') > -1 ? 'white' : '#bfbfbf';
        if (args.gauge.theme == 'Bootstrap5Dark' || args.gauge.theme == 'Tailwind3Dark') {
            this.borderColor = "#4b5563";
        }
        if (args.gauge.theme == 'Fluent2HighContrast' || args.gauge.theme == 'FabricDark' || args.gauge.theme == 'BootstrapDark' || args.gauge.theme == 'MaterialDark' || args.gauge.theme == 'HighContrast' || args.gauge.theme == 'Material' || args.gauge.theme == 'Fabric' || args.gauge.theme == 'Bootstrap') {
            this.borderColor = "#bfbfbf";
        }
        if (args.gauge.theme == 'Fluent' || args.gauge.theme == 'Fluent2') {
            this.borderColor = "#EDEBE9";
        }
        if (args.gauge.theme == 'FluentDark' || args.gauge.theme == 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
            this.borderColor = "#292827";
        }
        if (args.gauge.theme == 'Bootstrap5' || args.gauge.theme == 'Tailwind3') {
            this.borderColor = "#E5E7EB";
        }
        args.gauge.annotations[0].content = `<div style="width: 16px;height: 37px;border: 5px solid ${this.borderColor};margin-left:26px;margin-top:57px;border-radius: 6px;" />`;
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} background='transparent' id='gauge' orientation='Horizontal' width='200px' container={{ width: 58, type: 'RoundedRectangle', border: { width: 5 } }}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective minimum={0} maximum={60} line={{ width: 0 }} minorTicks={{ interval: 5, height: 0 }} majorTicks={{ interval: 15, height: 0 }} labelStyle={{ font: { size: '0px' } }}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={3} end={14} startWidth={45} endWidth={45} color='#66BB6A' offset={52}>
                                        </RangeDirective>
                                        <RangeDirective start={16} end={29} startWidth={45} endWidth={45} color='#66BB6A' offset={52}>
                                        </RangeDirective>
                                        <RangeDirective start={31} end={44} startWidth={45} endWidth={45} color='#66BB6A' offset={52}>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective axisIndex={0}
                                    axisValue={60}
                                    x={0} zIndex='1'
                                    y={0}>
                                </AnnotationDirective>
                                <AnnotationDirective content='<div style="width: 137px;font-size: 20px;margin-top:-47px;margin-left:147px;color:##000000;">Charged: 75%</div>' axisIndex={0}
                                    axisValue={0}
                                    x={0} zIndex='1'
                                    y={0}>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
            </div >
                <section id="action-description" aria-label="Description of Linear Gauge sample">
                    <p>
                        This sample shows the battery indicator charged up to 75% by utilizing the linear gauge's functionalities.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to render and configure a linear gauge to look like a battery indicator. This can be accomplished by combining axis, pointer, multiple ranges, and multiple annotation.
                    </p>
                    <p>
                        More information on the linear gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                    </p>
                </section>
        </main>
        )
    }
} 