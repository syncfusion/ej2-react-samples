/**
 * Sample for default gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Default extends SampleBase<{}, {}> {
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }
    
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <LinearGaugeComponent load={this.load.bind(this)} id='gauge' orientation='Horizontal'>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective minorTicks={{  interval: 2 }} majorTicks={{ interval: 10 }} labelStyle={{ offset: 48 }}>
                                <PointersDirective>
                                    <PointerDirective value={10} placement='Near' height={15} width={15} offset={-50} markerType='Triangle'>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content='<div id="pointer" style="width:70px"><h1 style="font-size:14px;">10 MPH</h1></div>' axisIndex={0}
                                axisValue={10}
                                x={10} zIndex= '1'
                                y={-70}>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates the default rendering of linear gauge.
           </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the default linear gauge. The linear gauge control indicates the values of scales in horizontal
        or vertical sliding meter. You can use <code>axes</code>,
        <code>ranges</code>, <code>pointers</code> and <code>container</code> properties to customize the appearance of the
        gauge. In this sample, an axis, annotation and a pointer has been used.
    </p>
                    <p>
                        More information about linear gauge can be found in this <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation section</a>.
    </p>
                </div>
            </div >
        )
    }
}
