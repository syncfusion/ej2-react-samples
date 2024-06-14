import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs, PointersDirective, PointerDirective, Annotations, AnnotationDirective, AnnotationsDirective, GaugeTheme } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const Pointers = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    let needlePointerGauge = useRef<CircularGaugeComponent>(null);
    let liveUpdateGauge = useRef<CircularGaugeComponent>(null);
    let needleInterval: Object;
    let liveUpdateInterval: Object;

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const onChartLoad = (args: ILoadedEventArgs): void => {

        let id: string = args.gauge.element.id;

        document.getElementById(id).setAttribute('title', '');
        if (id === 'needle-pointer-container') {
            needleInterval = setInterval(
                (): void => {
                    let newVal: number = Math.random() * (90 - 20) + 20;
                    if (document.getElementById('needle-pointer-container')) {
                        needlePointerGauge.current.setPointerValue(0, 0, newVal);
                    } else {
                        clearInterval(+needleInterval);
                    }
                },
                1000
            );
        }

        if (id === 'live-update-container') {
            liveUpdateInterval = setInterval(
                (): void => {
                    let newVal: number = Math.random() * (80 - 30) + 30;
                    if (document.getElementById('live-update-container') && liveUpdateGauge != null) {
                        liveUpdateGauge.current.setPointerValue(0, 0, newVal);
                        liveUpdateGauge.current.setPointerValue(0, 1, newVal);
                    } else {
                        clearInterval(+needleInterval);
                    }
                },
                1000
            );
        }
    };

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div className="row" style={{ margin: '0px' }}>
                    <div className="col-sm-12" style={{ padding: '0px' }}>
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} background='transparent' centerY='40%' loaded={onChartLoad.bind(this)} id='marker-pointer-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100} lineStyle={{ width: 3, color: '#01aebe' }} majorTicks={{ height: 0, interval: 100 }} minorTicks={{ height: 0 }} labelStyle={{ position: 'Outside', font: { size: '0px' } }}>
                                            <PointersDirective>
                                                <PointerDirective value={80} radius='100%' color='rgb(0,171,169)' type='Marker' markerShape='InvertedTriangle' markerHeight={15} markerWidth={15} />
                                            </PointersDirective>
                                            <AnnotationsDirective>
                                                <AnnotationDirective content='<div style="font-size:14px;margin-top:10px;">Marker pointer</div>' angle={180} zIndex='1' radius='28%'></AnnotationDirective>
                                            </AnnotationsDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} centerY='40%' background='transparent' loaded={onChartLoad.bind(this)} id='rangebar-pointer-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100} lineStyle={{ width: 3, color: '#ff5985' }} majorTicks={{ height: 0, interval: 100 }} minorTicks={{ height: 0, width: 0 }} labelStyle={{ position: 'Outside', font: { size: '0px' } }}>
                                            <PointersDirective>
                                                <PointerDirective value={66} radius='90%' color='#ff5985' type="RangeBar" pointerWidth={10} animation={{ enable: true, duration: 1000 }} />
                                            </PointersDirective>
                                            <AnnotationsDirective>
                                                <AnnotationDirective content='<div style="font-size:14px;margin-top:11px;">Range bar pointer</div>' angle={180} zIndex='1' radius='28%' />
                                            </AnnotationsDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} centerY='40%' background='transparent' ref={needlePointerGauge} loaded={onChartLoad.bind(this)} id='needle-pointer-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100} lineStyle={{ width: 3, color: '#9250e6' }} majorTicks={{ height: 0, interval: 100 }} minorTicks={{ height: 0 }} labelStyle={{ position: 'Outside', font: { size: '0px' } }}>
                                            <PointersDirective>
                                                <PointerDirective value={80} animation={{ enable: true, duration: 900 }} radius='100%' color='#923C99' pointerWidth={6} cap={{ radius: 0 }} needleTail={{ length: '4%', color: '#923C99' }} />
                                            </PointersDirective>
                                            <AnnotationsDirective>
                                                <AnnotationDirective content='<div style="font-size:14px;margin-top:10px;">Needle pointer</div>' angle={180} zIndex='1' radius='28%'></AnnotationDirective>
                                            </AnnotationsDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ margin: '0px' }}>
                    <div className="col-sm-12" style={{ padding: '0px' }}>
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} centerY='40%' background='transparent' loaded={onChartLoad.bind(this)} id='customized-pointer-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100} lineStyle={{ width: 3, color: '#1E7145' }} majorTicks={{ height: 0, interval: 100 }} minorTicks={{ height: 0 }} labelStyle={{ position: 'Outside', font: { size: '0px', color: '#1E7145' } }}>
                                            <PointersDirective>
                                                <PointerDirective value={80} radius='80%' color='green' pointerWidth={2} needleStartWidth={4} needleEndWidth={4} animation={{ enable: true, duration: 1000 }} cap={{ radius: 8, color: 'green' }} needleTail={{ length: '0%' }} />
                                            </PointersDirective>
                                            <AnnotationsDirective>
                                                <AnnotationDirective content='<div style="font-size:14px;margin-top:29px;">Customized pointer</div>' angle={180} zIndex='1' radius='28%'></AnnotationDirective>
                                            </AnnotationsDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} centerY='40%' background='transparent' loaded={onChartLoad.bind(this)} id='multiple-pointer-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100} lineStyle={{ width: 3, color: '#e3a21a' }} majorTicks={{ height: 0, interval: 100 }} minorTicks={{ height: 0 }} labelStyle={{ position: 'Outside', font: { size: '0px', color: '#e3a21a' } }}>
                                            <PointersDirective>
                                                <PointerDirective value={80} markerWidth={5} markerHeight={5} radius='60%' color='#e3a21a' pointerWidth={10} cap={{ radius: 8, color: 'white', border: { color: '#e3a21a', width: 1 } }} animation={{ enable: true, duration: 1000 }} needleTail={{ length: '20%', color: '#e3a21a' }} />
                                                <PointerDirective value={40} radius='60%' color='#ffb133' pointerWidth={10} markerWidth={5} markerHeight={5} cap={{ radius: 8, color: 'white', border: { color: '#ffb133', width: 1 } }} animation={{ enable: true, duration: 1000 }} needleTail={{ length: '20%', color: '#e3a21a' }} />
                                            </PointersDirective>
                                            <AnnotationsDirective>
                                                <AnnotationDirective content='<div style="font-size:14px;margin-top:22px;">Multiple pointers</div>' angle={180} zIndex='1' radius='32%'></AnnotationDirective>
                                            </AnnotationsDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} background='transparent' ref={liveUpdateGauge} centerY='40%' loaded={onChartLoad.bind(this)} id='live-update-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100} lineStyle={{ width: 0 }} majorTicks={{ height: 0, interval: 100 }} minorTicks={{ height: 0 }} labelStyle={{ position: 'Outside', font: { size: '0px' } }}>
                                            <PointersDirective>
                                                <PointerDirective value={40} animation={{ enable: false, duration: 100 }} radius='100%' color='#067bc2' pointerWidth={6} cap={{ radius: 0 }} needleTail={{ length: '4%', color: '#067bc2' }} />
                                                <PointerDirective value={40} type="RangeBar" radius="100%" animation={{ enable: false, duration: 100 }} color='#067bc2' pointerWidth={5} />
                                            </PointersDirective>
                                            <AnnotationsDirective>
                                                <AnnotationDirective content='<div style="font-size:14px;margin-top:22px;">Live update</div>' angle={180} zIndex='1' radius='32%'></AnnotationDirective>
                                            </AnnotationsDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>This sample demonstrates the various pointer types available in the circular gauge.</p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>In this example, you can see how to customize the pointer for an axis in the circular gauge. The circular gauge supports a variety of pointers, including marker, needle, and range bar. Additionally, the pointer can be customized, and multiple pointers can also be enabled.</p>
                    <p>
                        More information on the pointers can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/">documentation section</a>.
                    </p>
                </section>
        </main>
    )
}
export default Pointers;