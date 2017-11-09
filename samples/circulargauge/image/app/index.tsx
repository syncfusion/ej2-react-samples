/**
 * Sample for Pointer Imagei in circular gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from './property-pane';
import {
    CircularGaugeComponent, AxesDirective, ILoadedEventArgs, AxisDirective, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, TickModel, getRangeColor,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from './sample-base';
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
    }`;
    
export class Image extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-12'>
                        <CircularGaugeComponent title='Short Put Distance' loaded={this.onChartLoad.bind(this)} id='image-container' ref={gauge => this.gauge = gauge} enablePointerDrag={true}
                            titleStyle={{ size: '18px' }} centerY="57%'">
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={200} endAngle={130} radius='90%' minimum={0} maximum={14}
                                    lineStyle={{
                                        width: 0, color: '#1d1d1d'
                                    }}
                                    majorTicks={{
                                        interval: 20, width: 0,
                                    }}
                                    minorTicks={{
                                        width: 0,
                                    }} labelStyle={{
                                        font: {
                                            size: '0px'
                                        }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective type="Marker" value={12} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/football.png" radius='108%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                        <PointerDirective type="Marker" value={11} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/basketball.png" radius='78%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1200 }} />
                                        <PointerDirective type="Marker" value={10} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/golfball.png" radius='48%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 900 }} />
                                        <PointerDirective type="Marker" value={12} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/Athletics.png" radius='0%' markerWidth={90} markerHeight={90}
                                            animation={{ duration: 0 }} />
                                        <PointerDirective type="Marker" value={0.1} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/girl1.png" radius='108%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                        <PointerDirective type="Marker" value={0.1} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/man1.png" radius='78%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                        <PointerDirective type="Marker" value={0.1} markerShape="Image" imageUrl="http://npmci.syncfusion.com/production/react/demos/src/circulargauge/images/man2.png" radius='48%' markerWidth={28} markerHeight={28}
                                            animation={{ duration: 1500 }} />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={12} radius='115%' color='#01aebe' startWidth={25} endWidth={25} />
                                        <RangeDirective start={0} end={11} radius='85%' color='#3bceac' startWidth={25} endWidth={25} />
                                        <RangeDirective start={0} end={10} radius='55%' color='#ee4266' startWidth={25} endWidth={25} />
                                    </RangesDirective>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='12 M' radius='108%' angle={98} zIndex='1' />
                                        <AnnotationDirective content='11 M' radius='80%' angle={81} zIndex='1' />
                                        <AnnotationDirective content='10 M' radius='50%' angle={69} zIndex='1' />
                                        <AnnotationDirective content='Doe' radius='108%' angle={190} zIndex='1' />
                                        <AnnotationDirective content='Almaida' radius='80%' angle={185} zIndex='1' />
                                        <AnnotationDirective content='John' radius='50%' angle={180} zIndex='1' />
                                    </AnnotationsDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('image-container').setAttribute('title', '');
    };
}
ReactDOM.render(<Image />, document.getElementById('sample'));