import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { PropertyPane } from '../common/property-pane';
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, isCompleteAngle, PointersDirective, PointerDirective, ILoadedEventArgs, GaugeTheme, GaugeDirection } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }

    #start, #end {
        margin-left:-76px;   
    }

    #startAngle, #endAngle {
        width:72%; 
    }

    @media screen and (min-width: 1200px) {
        #start, #end {
            margin-left:-40px; 
        }
        #startAngle, #endAngle {
            width:72%; 
        }
    }

    @media screen and (min-width: 1200px) and (max-width: 1500px) {
        #start, #end {
            margin-left:-25px; 
        }
    }

    @media screen and (max-width: 420px) {
        #start, #end {
           margin-left:-42px;   
        }
        #startAngle, #endAngle {
            width:58%; 
        }
    }
    `;

const Axes = () => {

    const [startValue, setStartValue] = useState<string>('220');
    const [endValue, setEndValue] = useState<string>('140');
    const [directionValue, setDirectionValue] = useState('ClockWise');
    let gauge = useRef<CircularGaugeComponent>(null);
    let start = useRef<HTMLInputElement>(null);
    let end = useRef<HTMLInputElement>(null);
    let axisRef = useRef<DropDownListComponent>(null);
    let directionRef = useRef<DropDownListComponent>(null);
    let axisIndex: number = 0;

    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    let dropList: { [key: string]: Object }[] = [
        { text: 'Axis 1', value: 'Axis 1' },
        { text: 'Axis 2', value: 'Axis 2' },
    ];

    let dropDirectionList: { [key: string]: Object }[] = [
        { text: 'Clockwise', value: 'ClockWise' },
        { text: 'Anti-clockwise', value: 'AntiClockWise' },
    ];

    const directionChange = (): void => {
        axisIndex = axisRef.current.index;
        let axisDirection: GaugeDirection = (gauge.current.axes[axisIndex].direction =
            directionRef.current.value == 'ClockWise'
                ? 'ClockWise'
                : 'AntiClockWise');
        gauge.current.axes[axisIndex].direction = axisDirection;
        setDirectionValue(axisDirection);
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.axes[1].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };

    const typeChange = (): void => {
        axisIndex = axisRef.current.index;
        let startAngle: number = gauge.current.axes[axisIndex].startAngle;
        let endAngle: number = gauge.current.axes[axisIndex].endAngle;
        directionRef.current.value = gauge.current.axes[axisIndex].direction;
        setDirectionValue(directionRef.current.value);
        setStartValue(String(startAngle));
        setEndValue(String(endAngle));
        start.current.value = startAngle.toString();
        end.current.value = endAngle.toString();
    };

    const startAngle = (): void => {
        let value: number = +start.current.value;
        axisIndex = axisRef.current.index;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.axes[1].pointers[0].animation.enable = false;
        gauge.current.axes[axisIndex].startAngle = value;
        setStartValue(String(value));
        gauge.current.axes[axisIndex].labelStyle.hiddenLabel = isCompleteAngle(gauge.current.axes[axisIndex].startAngle, gauge.current.axes[axisIndex].endAngle) ? 'First' : 'None';
        gauge.current.refresh();
    }

    const endAngle = (): void => {
        let value: number = +end.current.value;
        axisIndex = axisRef.current.index;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.axes[1].pointers[0].animation.enable = false;
        gauge.current.axes[axisIndex].endAngle = value;
        setEndValue(String(value));
        gauge.current.axes[axisIndex].labelStyle.hiddenLabel = isCompleteAngle(gauge.current.axes[axisIndex].startAngle, gauge.current.axes[axisIndex].endAngle) ? 'First' : 'None';
        gauge.current.refresh();
    }

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} id='range-container' background='transparent' ref={gauge}>
                        <AxesDirective>
                            <AxisDirective lineStyle={{ width: 1.5 }} radius='95%' direction='ClockWise' startAngle={220} endAngle={140} minimum={0} maximum={160} majorTicks={{ position: 'Inside', width: 2, height: 10 }} minorTicks={{ position: 'Inside', width: 2, height: 5 }} labelStyle={{ position: 'Inside', autoAngle: true, font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective value={80} radius='100%' markerHeight={15} markerWidth={15} type='Marker' markerShape='Triangle' />
                                </PointersDirective>
                            </AxisDirective>
                            <AxisDirective lineStyle={{ width: 1.5, color: ' #E84011' }} radius='95%' direction='ClockWise' startAngle={220} endAngle={140} minimum={0} maximum={240} majorTicks={{ position: 'Outside', width: 2, height: 10, color: '#E84011' }} minorTicks={{ position: 'Outside', width: 2, height: 5, color: '#E84011' }} labelStyle={{ position: 'Outside', autoAngle: true, offset: 5, font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective value={120} radius='100%' color='#E84011' markerHeight={15} markerWidth={15} type='Marker' markerShape='InvertedTriangle' />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '95%', marginLeft: "-10px" }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ fontSize: '14px' }}> Axis </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <DropDownListComponent id="axis" width="100%" index={0} change={typeChange.bind(this)} ref={axisRef} dataSource={dropList} fields={{ text: 'text', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ fontSize: '14px' }}> Direction </div>
                                    </td>
                                    <td style={{ width: '50% ' }}>
                                        <div>
                                            <DropDownListComponent id="axisdirection" width="100%" index={0} change={directionChange.bind(this)} ref={directionRef} dataSource={dropDirectionList} fields={{ text: 'text', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ fontSize: '14px' }}>Start Angle </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="startAngle" onChange={startAngle.bind(this)} ref={start} defaultValue="220" min="0" max="360" />
                                        </div>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <div style={{ textAlign: 'center', paddingLeft: '0px' }}>
                                            <span id='start'>{startValue}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ fontSize: '14px' }}>End Angle </div>
                                    </td>
                                    <td style={{ width: '40% ' }}>
                                        <div>
                                            <input type="range" id="endAngle" onChange={endAngle.bind(this)} ref={end} defaultValue="140" min="0" max="360" />
                                        </div>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <div style={{ textAlign: 'center', paddingLeft: '0px' }}>
                                            <span id='end'>{endValue}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Circular Gauge sample">
                <p>This sample illustrates the multiple axes in the circular gauge as well as the options for changing the direction, start, and end angle of an axis.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>In this example, you can see how to render and configure multiple axes in the circular gauge. To render multiple axes in the circular gauge, use the axes collection, and each axis can be customized with pointers and ticks.</p>
                <p>
                    More information on the multiple axes can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/#multiple-axes">documentation section</a>.
                </p>
            </section>
        </main>
    )
}
export default Axes;
