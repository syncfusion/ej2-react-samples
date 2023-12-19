import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from "react";
import { PropertyPane } from '../common/property-pane';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, AxesDirective, AxisDirective, Inject, AnnotationsDirective, AnnotationDirective, PointersDirective, PointerDirective, Annotations, TickModel, Position } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }

    #tickOffset, #tickHeight, #labelOffset {
        width: 76%;
    }
    #offset, #height, #labelOffsetValue {
        margin-left: -45px;
    }

    @media screen and (max-width: 420px) {
        #tickOffset, #tickHeight, #labelOffset {
            width: 72%;
        }
        #offset, #height, #labelOffsetValue {
            margin-left: -25px;
        }
    }

    @media screen and (min-width: 1200px) and (max-width: 1500px) {
        #offset, #height, #labelOffsetValue {
            margin-left: -22px;
        }
    }

    .tailwind .labelCheckbox, .tailwind-dark .labelCheckbox{
        margin-top: 2px;
    }`;

const Labels = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [offset, setOffset] = useState<string>('0');
    const [labelOffsetValue, setLabelOffset] = useState<string>('0');
    const [height, setHeight] = useState<string>('10');
    const [ticksValue, setTicksValue] = useState('Major Ticks');
    let gauge = useRef<CircularGaugeComponent>(null);
    let tickOffset = useRef<HTMLInputElement>(null);
    let tickHeight = useRef<HTMLInputElement>(null);
    let labelOffset = useRef<HTMLInputElement>(null);
    let lastLabel = useRef<CheckBoxComponent>(null);
    let ticksRef = useRef<DropDownListComponent>(null);
    let labelPositionRef = useRef<DropDownListComponent>(null);
    let tickPositionRef = useRef<DropDownListComponent>(null);
    let isMajorTicks: boolean = true;
    let loc = window.location;

    let tickList : { [key: string]: Object }[] = [
        { text: 'Major Ticks', value: 'Major Ticks' },
        { text: 'Minor Ticks', value: 'Minor Ticks' },
    ];

    let tickPositionList : { [key: string]: Object }[] = [
        { text: 'Inside', value: 'Inside' },
        { text: 'Cross', value: 'Cross' },
        { text: 'Outside', value: 'Outside' }
    ];

    let labelPositionList : { [key: string]: Object }[] = [
        { text: 'Outside', value: 'Outside' },
        { text: 'Cross', value: 'Cross' },
        { text: 'Inside', value: 'Inside' }
    ];

    const ticksChange = (): void => {
        let value:  string  = ticksRef.current.value.toString();
        setTicksValue(value);
        let tickProp : TickModel;
        isMajorTicks = value === 'Major Ticks';
        if (isMajorTicks) {
            tickProp = gauge.current.axes[0].majorTicks;
        } else {
            tickProp = gauge.current.axes[0].minorTicks;
        }
        tickPositionRef.current.value = tickProp.position;
        tickOffset.current.value = tickProp.offset.toString();
        tickHeight.current.value = tickProp.height.toString();
        setOffset(tickProp.offset.toString());
        setHeight(tickProp.height.toString());
    };

    const tickPositionChange = (): void => {
        let value : string = tickPositionRef.current.value.toString();
        isMajorTicks = ticksValue === 'Major Ticks';
        if (isMajorTicks) {
            gauge.current.axes[0].majorTicks.position = value as Position;
        } else {
            gauge.current.axes[0].minorTicks.position = value as Position;
        }
        gauge.current.refresh();
    };

    const labelPositionChange = (): void => {
        let value: string = labelPositionRef.current.value.toString();
        gauge.current.axes[0].labelStyle.position = value as Position;
        gauge.current.refresh();
    };

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = loc.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }


    const ticksOffset = (): void => {
        let value : number = +tickOffset.current.value;
        isMajorTicks = ticksValue === 'Major Ticks';
        if (isMajorTicks) {
            gauge.current.axes[0].majorTicks.offset = value;
        } else {
            gauge.current.axes[0].minorTicks.offset = value;
        }
        setOffset(String(value));
        gauge.current.refresh();
    }

    const ticksHeight = (): void => {
        let value : number = +tickHeight.current.value;
        isMajorTicks = ticksValue === 'Major Ticks';
        if (isMajorTicks) {
            gauge.current.axes[0].majorTicks.height = value;
        } else {
            gauge.current.axes[0].minorTicks.height = value;
        }
        setHeight(String(value));
        gauge.current.refresh();
    }

    const labelsOffset = (): void => {
        let value: number = +labelOffset.current.value;
        gauge.current.axes[0].labelStyle.offset = value;
        setLabelOffset(String(value));
        gauge.current.refresh();
    }

    const showLastLabel = (): void => {
        gauge.current.axes[0].showLastLabel = lastLabel.current.checked;
        gauge.current.refresh();
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} background='transparent' id='range-container' ref={gauge}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={210} endAngle={150} radius='80%' minimum={0} maximum={170} showLastLabel={false} majorTicks={{ position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20, offset: 0 }} lineStyle={{ width: 2, color: '#9E9E9E' }} minorTicks={{ position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10, offset: 0 }} labelStyle={{ position: 'Outside', autoAngle: true, offset: 0, font: { fontFamily: 'inherit', size: '10px' } }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div id="content" style="color:#518C03;font-size:20px;font-family:inherit;font-weight:semibold;margin-left:-12px;margin-top:-12px">145</div>' angle={0} radius='0%' zIndex='1' />
                                </AnnotationsDirective>
                                <PointersDirective>
                                    <PointerDirective value={145} radius='60%' color='#8BC34A' pointerWidth={7} animation={{ enable: false }} type="RangeBar" roundedCornerRadius={10} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '95%', overflow: 'hidden' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Ticks </div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div>
                                            <DropDownListComponent
                                                id="Ticks"
                                                width="100%"
                                                index={0}
                                                change={ticksChange.bind(this)}
                                                ref={ticksRef}
                                                dataSource={tickList}
                                                fields={{ text: 'text', value: 'value' }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Tick Position </div>
                                    </td>
                                    <td style={{ width: "50%" }}>
                                        <div>
                                            <DropDownListComponent
                                                id="tickposition"
                                                width="100%"
                                                index={0}
                                                change={tickPositionChange.bind(this)}
                                                ref={tickPositionRef}
                                                dataSource={tickPositionList}
                                                fields={{ text: 'text', value: 'value' }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Label Position </div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div>
                                            <DropDownListComponent
                                                id="labelposition"
                                                width="100%"
                                                index={0}
                                                change={labelPositionChange.bind(this)}
                                                ref={labelPositionRef}
                                                dataSource={labelPositionList}
                                                fields={{ text: 'text', value: 'value' }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "50px" }}>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Tick Offset </div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div>
                                            <input type="range" onChange={ticksOffset.bind(this)} ref={tickOffset} id="tickOffset" defaultValue="0" min="0" max="50" />
                                        </div>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <div style={{ textAlign: 'center', paddingLeft: '0px' }}>
                                            <span id='offset'>{offset}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "50px" }}>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Tick Height </div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div>
                                            <input type="range" onChange={ticksHeight.bind(this)} ref={tickHeight} id="tickHeight" defaultValue="10" min="1" max="50" />
                                        </div>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <div style={{ textAlign: 'center', paddingLeft: '0px' }}>
                                            <span id='height'>{height}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "50px" }}>
                                    <td>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Label Offset </div>
                                    </td>
                                    <td style={{ width: "40%" }}>
                                        <div>
                                            <input type="range" onChange={labelsOffset.bind(this)} ref={labelOffset} id="labelOffset" defaultValue="0" min="0" max="50" />
                                        </div>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <div style={{ textAlign: 'center', paddingLeft: '0px' }}>
                                            <span id='labelOffsetValue'>{labelOffsetValue}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "50px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div style={{ marginLeft: "-10px", fontSize: "14px" }}> Show Last Label </div>
                                    </td>
                                    <td style={{ "width": "40%" }}>
                                        <div className='labelCheckbox' style={{ marginLeft: "-10px", paddingTop: "0px" }}>
                                            <CheckBoxComponent change={showLastLabel.bind(this)} ref={lastLabel} id='enable' disabled={false} style={{ paddingLeft: "0px" }} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to customize the ticks and labels on an axis. The position, offset, and height of the ticks and labels can be changed.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the ticks and labels of an axis in the circular gauge.
                    Labels are units that are used to display the values on the axis. Labels can be customized using <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/'>labelStyle</a>.
                    Ticks are used to represent values on the axis. Ticks can be customized using <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/'>majorTicks</a> and <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/'>minorTicks</a>.
                </p>
                <p>
                    More information on the ticks and labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Labels;