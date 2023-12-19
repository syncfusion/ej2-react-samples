import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const TextPointer = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <CircularGaugeComponent load={load.bind(this)} centerY='75%' id='text-pointer' background='transparent'>
                    <AxesDirective>
                        <AxisDirective startAngle={270} endAngle={90} radius='120%' minimum={0} maximum={120} rangeGap={3} majorTicks={{ width: 0 }} lineStyle={{ width: 0 }} minorTicks={{ width: 0 }} labelStyle={{ font: { size: '0px' } }}>
                            <PointersDirective>
                                <PointerDirective pointerWidth={10} radius='60%' needleStartWidth={1} needleEndWidth={1} value={82} cap={{ radius: 0 }} animation={{ enable: true }} />
                                <PointerDirective radius='85%' type='Marker' value={20} text='Poor' markerShape='Text' animation={{ enable: false }} textStyle={{ size: '18px', fontFamily: 'inherit' }} />
                                <PointerDirective radius='85%' type='Marker' value={60} text='Average' markerShape='Text' animation={{ enable: false }} textStyle={{ size: '18px', fontFamily: 'inherit' }} />
                                <PointerDirective radius='85%' type='Marker' value={100} text='Good' markerShape='Text' animation={{ enable: false }} textStyle={{ size: '18px', fontFamily: 'inherit' }} />
                            </PointersDirective>
                            <RangesDirective>
                                <RangeDirective start={0} end={20} radius='80%' startWidth={85} endWidth={85} color='#dd3800' />
                                <RangeDirective start={20.5} end={40} radius='80%' startWidth={85} endWidth={85} color='#ff4100' />
                                <RangeDirective start={40.5} end={60} radius='80%' startWidth={85} endWidth={85} color='#ffba00' />
                                <RangeDirective start={60.5} end={80} radius='80%' startWidth={85} endWidth={85} color='#ffdf10' />
                                <RangeDirective start={80.5} end={100} radius='80%' startWidth={85} endWidth={85} color='#8be724' />
                                <RangeDirective start={100.5} end={120} radius='80%' startWidth={85} endWidth={85} color='#64be00' />
                            </RangesDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes the performance outcome of a work using the text pointer in the circular gauge.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to use a text to customize the pointer in the circular gauge. The text can be added to the circular gauge's pointer primarily through the use of the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#type">type</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#markershape">markerShape</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#text">text</a> properties in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/">PointersDirective</a>.
                </p>
                <p>
                    More information on the pointers can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default TextPointer;