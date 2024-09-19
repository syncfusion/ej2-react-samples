import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, PointersDirective, PointerDirective, AnnotationsDirective, AnnotationDirective, GaugeTheme, ILoadedEventArgs } from '@syncfusion/ej2-react-circulargauge';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const AxisBackGround = () => {    
    useEffect(() => {
        updateSampleSection();
    }, [])

    let annotationGauge: CircularGauge;
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    const updateGauge = (): void => {
        annotationGauge = new CircularGauge({
            width: '600px',
            height: '450px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', color: 'White' } },
                majorTicks: { height: 15, interval: 30 },
                minorTicks: { height: 10, interval: 6 }, minimum: 0, maximum: 360,
                pointers: [{
                    value: 90,
                    radius: '45%', markerWidth: 12, markerHeight: 12,
					description:'Marker pointer value : 90',
                    type: 'Marker', markerShape: 'Triangle', color: 'Orange',
                    animation: { enable: true, duration: 500 }
                }], startAngle: 0, endAngle: 0, radius: '60%', lineStyle: { width: 0 }
            }]
        });
        annotationGauge.appendTo('#subGauge');
    }

    const onChartLoad = (): void => {
        updateGauge();
    };

    const onResized = () => {
        location.reload();
    }

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <CircularGaugeComponent loaded={onChartLoad.bind(this)} resized={onResized.bind(this)} load={load.bind(this)} id='axis-background' background='transparent' centerY='65%'>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective startAngle={0} endAngle={0} radius='80%' majorTicks={{ height: 0 }} lineStyle={{ width: 0 }} minorTicks={{ height: 0 }} labelStyle={{ format:'{value} %', font: { size: '0px' } }}>
                            <PointersDirective>
                                <PointerDirective radius='0%' />
                            </PointersDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective description='Axis background' content='<div style="margin-top: -37%;"><img alt="Axis background image" src="src/circular-gauge/images/axis-background.png" height="400" width="400" /></div>' angle={0} radius='0%' zIndex='1' />
                                <AnnotationDirective description='Sub gauge' content='<div id="subGauge" style="margin-left: -50%; margin-top: -50%;"></div>' angle={0} radius='0%' zIndex='1' />
                                <AnnotationDirective description='Annotation value : 90' content='<div style="color:orange;margin-top: -86px;margin-left: -1px;font-size: 18px;"> 90</div>' angle={10} radius='0%' zIndex='1' />
                            </AnnotationsDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Circular Gauge sample">
                <p>This sample demonstrates a circular gauge with an axis and a background image set for the axis.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to render and configure the axis in the circular gauge with a background image. To accomplish this, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/">annotations</a> is used and an image is set as the background content.
                </p>
                <p>
                    More information on the annotations can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-annotations/">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default AxisBackGround;