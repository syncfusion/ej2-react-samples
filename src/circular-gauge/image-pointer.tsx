import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    CircularGaugeComponent, AxesDirective, ILoadedEventArgs, GaugeTheme, AxisDirective, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #templateWrap img {
        border-radius: 30px;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }
    #templateWrap .des {
        float: right;
        padding-left: 10px;
        line-height: 30px;
    }
    .templateAlign {
        font-size: 14px;
        color: #9E9E9E;
        margin-left: -12px;
    }
    .annotationText {
        margin-top: -30px;
    }`;

export class Image extends SampleBase<{}, {}> {

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('image-container').setAttribute('title', '');
    };

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-12'>
                        <CircularGaugeComponent load={this.load.bind(this)} title='Shot Put Distance' background='transparent' loaded={this.onChartLoad.bind(this)} id='image-container' enablePointerDrag={true}
                            titleStyle={{ fontFamily: 'inherit' }} centerY="57%'">
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={200} endAngle={130} radius='80%' minimum={0} maximum={14}
                                    lineStyle={{
                                        width: 0,
                                    }}
                                    majorTicks={{
                                        width: 0,
                                    }}
                                    minorTicks={{
                                        width: 0,
                                    }} labelStyle={{
                                        font: {
                                            size: '0px'
                                        }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective description='Marker pointer foot ball value : 12' type="Marker" value={12} markerShape="Image" imageUrl="src/circular-gauge/images/foot-ball.png" radius='108%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                        <PointerDirective description='Marker pointer basket ball value : 11' type="Marker" value={11} markerShape="Image" imageUrl="src/circular-gauge/images/basket-ball.png" radius='78%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1200 }} />
                                        <PointerDirective description='Marker pointer golf ball value : 10' type="Marker" value={10} markerShape="Image" imageUrl="src/circular-gauge/images/golf-ball.png" radius='48%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 900 }} />
                                        <PointerDirective description='Marker pointer athletic value : 10' type="Marker" value={12} markerShape="Image" imageUrl="src/circular-gauge/images/Athletics.png" radius='0%' markerWidth={90} markerHeight={90}
                                            animation={{ duration: 0 }} />
                                        <PointerDirective description='Marker pointer girl value : 10' type="Marker" value={0} markerShape="Image" imageUrl="src/circular-gauge/images/girl.png" radius='108%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                        <PointerDirective description='Marker pointer man value : 10' type="Marker" value={0} markerShape="Image" imageUrl="src/circular-gauge/images/man-one.png" radius='78%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                        <PointerDirective description='Marker pointer man value: 10' type="Marker" value={0} markerShape="Image" imageUrl="src/circular-gauge/images/man-two.png" radius='48%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={12} radius='115%' color='#01aebe' startWidth={25} endWidth={25} />
                                        <RangeDirective start={0} end={11} radius='85%' color='#3bceac' startWidth={25} endWidth={25} />
                                        <RangeDirective start={0} end={10} radius='55%' color='#ee4266' startWidth={25} endWidth={25} />
                                    </RangesDirective>
                                    <AnnotationsDirective>
                                        <AnnotationDirective description='12 M' content='<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> 12 M </div>' radius='108%' angle={98} zIndex='1' />
                                        <AnnotationDirective description='11 M' content='<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> 11 M </div>' radius='80%' angle={81} zIndex='1' />
                                        <AnnotationDirective description='10 M' content='<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> 10 M </div>' radius='50%' angle={69} zIndex='1' />
                                        <AnnotationDirective description='Doe' content='<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> Doe </div>' radius='106%' angle={189} zIndex='1' />
                                        <AnnotationDirective description='Almaida' content='<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> Almaida </div>' radius='78%' angle={180} zIndex='1' />
                                        <AnnotationDirective description='John' content='<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> John </div>' radius='48%' angle={175} zIndex='1' />
                                    </AnnotationsDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This sample visualizes the shot put distance covered by the athletes using the image pointer in the circular gauge.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to use an image to customize the pointer in the circular gauge. The image can be added to the circular gauge's pointer primarily through the use of the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#type">type</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#markershape">markerShape</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#imageurl">imageUrl</a> properties in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/">PointersDirective</a>.
                    </p>
                    <p>
                        More information on the pointers can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/#marker-pointer">documentation section</a>.
                    </p>
                </section>
        </main>
        )
    }
}
