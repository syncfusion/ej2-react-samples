import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, PointersDirective, PointerDirective, AnnotationsDirective, AnnotationDirective, GaugeTheme, ILoadedEventArgs } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const Clock = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge = useRef<CircularGaugeComponent>(null);
    let pointerInterval: Object;
    let refreshTimeout: any;
    let annotationGaugeOne = useRef<CircularGauge>(null);
    let annotationGaugeTwo = useRef<CircularGauge>(null);
    let NeedlePointer: number = 0.2;

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    const onChartLoad = (args: ILoadedEventArgs): void => {
        renderGauges();
        if (isNullOrUndefined(pointerInterval)) {
            pointerInterval = setInterval(
                (): void => {
                    if (document.getElementById('axis-background')) {
                        if (NeedlePointer <= 12) {
                            gauge.current.setPointerValue(0, 2, NeedlePointer);
                            NeedlePointer += 0.2;
                        } else {
                            NeedlePointer = 0.2;
                        }
                    } else {
                        clearInterval(+pointerInterval);
                    }
                }, 1000);
        }
    };

    const onResized = () => {
        window.clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout((): void => {
            if (document.getElementById('axis-background')) {
                renderGauges();
            } else {
                window.clearTimeout(+refreshTimeout);
            }
        }, 1000);
    }

    const renderGauges = (): void => {
        annotationGaugeOne.current = new CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                majorTicks: { interval: 2, offset: 2 },
                minorTicks: { interval: 0.4, offset: 2 }, minimum: 0, maximum: 12,
                pointers: [{
                    value: 5,
                    radius: '50%', pointerWidth: 2, color: '#00A8B5',
                    animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
            }],
            load: (args) => {
                // custom code start
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
                // custom code end
            }
        });
        annotationGaugeOne.current.appendTo('#subGaugeOne');

        annotationGaugeTwo.current = new CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                majorTicks: { offset: 2, interval: 2 },
                minorTicks: { offset: 2, interval: 0.4 }, minimum: 0, maximum: 12,
                pointers: [{
                    value: 8,
                    radius: '50%', pointerWidth: 2, color: '#00A8B5',
                    animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
            }],
            load: (args) => {
                // custom code start
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
                // custom code end
            }
        });
        annotationGaugeTwo.current.appendTo('#subGaugeTwo');
    }

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <CircularGaugeComponent loaded={onChartLoad.bind(this)} resized={onResized.bind(this)} load={load.bind(this)} id='axis-background' background='transparent' ref={gauge}>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective startAngle={0} endAngle={0} radius='90%' minimum={0} maximum={12} majorTicks={{ height: 15, width: 2, interval: 1, offset: 5 }} lineStyle={{ width: 2 }} minorTicks={{ height: 10, width: 1, interval: 0.2, offset: 5 }} labelStyle={{ hiddenLabel: 'First', offset: 10, font: { fontFamily: 'inherit' } }}>
                            <PointersDirective>
                                <PointerDirective radius='70%' value={10.2} pointerWidth={3} needleStartWidth={2} animation={{ enable: false }} cap={{ radius: 5, color: 'white', border: { width: 1, color: '#00A8B5' } }} needleTail={{ length: '0%' }} />
                                <PointerDirective radius='100%' value={2} pointerWidth={3} needleStartWidth={1} animation={{ enable: false }} cap={{ radius: 5, color: 'white', border: { width: 1, color: '#00A8B5' } }} needleTail={{ length: '0%' }} />
                                <PointerDirective radius='90%' value={12} pointerWidth={3} needleStartWidth={1} animation={{ enable: false }} color='#00A8B5' cap={{ radius: 5, color: 'white', border: { width: 1, color: '#00A8B5' } }} needleTail={{ length: '25%', color: '#00A8B5' }} />
                            </PointersDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective description='Sub gauge one' content='<div id="subGaugeOne" style="margin-left: -50%"></div>' angle={290} radius='0%' zIndex='1' />
                                <AnnotationDirective description='Sub gauge two' content='<div id="subGaugeTwo" style="margin-left: -110%;margin-top: -50%;"></div>' angle={90} radius='0%' zIndex='1' />
                            </AnnotationsDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Circular Gauge sample">
                <p>This sample demonstrates how to create an analog clock that displays the time.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>In this example, a clock has been created by adding axis, minor ticks, major ticks, and needles in a circular gauge and customizing it accordingly. In addition, the clock ticks, displaying the time in a lively manner.</p>
                <p>
                    More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default Clock;