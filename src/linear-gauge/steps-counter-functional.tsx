/**
 * Sample to design step counter using the Linear Gauge
 */
import * as React from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function StepsCounter() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <LinearGaugeComponent load={load.bind(this)} background='transparent' id='gauge' orientation='Horizontal'>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective minimum={0} maximum={12000} line={{ width: 30 }} opposedPosition={true} minorTicks={{ height: 0 }} majorTicks={{ interval: 12000, height: 10, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                            <PointersDirective>
                                <PointerDirective value={8446} height={40} width={40} placement='Near' offset={-40} markerType='Image' imageUrl='src/linear-gauge/images/step-count.png'>
                                </PointerDirective>
                            </PointersDirective>
                            <RangesDirective>
                                <RangeDirective start={0} end={8456} startWidth={30} endWidth={30} color='#0DC9AB' offset={0}></RangeDirective>
                            </RangesDirective>
                        </AxisDirective>
                    </AxesDirective>
                    <AnnotationsDirective>
                        <AnnotationDirective content='<div style="width: 70px;"> <p align="center" style="font-size:10px;margin-left:60px;margin-top:10px;font-weight: 400;">STEPS</p> <p align="center" style="font-size: 23px;margin-top:-15px;margin-left:50px;color: #0DC9AB;font-weight: 600;">8456</p>
                        </div>' axisIndex={0}
                            axisValue={12000}
                            x={10} zIndex='1'
                            y={5}>
                        </AnnotationDirective>
                        <AnnotationDirective content='<div style="width: 145px;font-size: 19px;margin-left:135px"> Sun, 7 February </div>' axisIndex={0}
                            axisValue={0}
                            x={0} zIndex='1'
                            y={-100}>
                        </AnnotationDirective>
                    </AnnotationsDirective>
                </LinearGaugeComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample shows a linear gauge displaying the number of steps taken by a person in a day.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a linear gauge to look like a steps counter. This can be accomplished by combining axis, range, pointer and annotations.
                </p>
                <p>
                    More information on the linear gauge can be found in this  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default StepsCounter;