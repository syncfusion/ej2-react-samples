import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { ILoadedEventArgs } from '@syncfusion/ej2-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const SemiGauge = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [xValue, setXValue] = useState<string>('50%');
    const [yValue, setYValue] = useState<string>('50%');
    const [rangestart, setRangeStart] = useState<string>('270°');
    const [rangeEnd, setRangeEnd] = useState<string>('90°');
    const [radius1, setRadius] = useState<string>('100%');
    const [xCenter, setXCenter] = useState<string>('50%');
    const [yCenter, setYCenter] = useState<string>('50%');
    const [isMoveToCenter, setIsMoveToCenter] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    let gauge = useRef<CircularGaugeComponent>(null);
    let startElement = useRef<HTMLInputElement>(null);
    let endElement = useRef<HTMLInputElement>(null);
    let xElement = useRef<HTMLInputElement>(null);
    let yElement = useRef<HTMLInputElement>(null);
    let radiusElement = useRef<HTMLInputElement>(null);

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const angleChange = (e: ChangeEventArgs) => {
        if (e.checked) {
            setXValue(null);
            setYValue(null);
            setIsMoveToCenter(true);
            setDisabled(true);
        } else {
            setXValue(xElement.current.value + '%');
            setYValue(yElement.current.value + '%');
            setDisabled(false);
            setIsMoveToCenter(false);
        }
        gauge.current.refresh();
    }

    const start = (): void => {
        let min: number = +startElement.current.value;
        setRangeStart(min + '°');
        gauge.current.axes[0].startAngle = min;
        gauge.current.refresh();
    }

    const end = () => {
        let max: number = +endElement.current.value;
        setRangeEnd(max + '°');
        gauge.current.axes[0].endAngle = max;
        gauge.current.refresh();
    }

    const radius = () => {
        let radius: number = +radiusElement.current.value;
        setRadius(radius + '%');
        gauge.current.axes[0].radius = '' + radius + '%';
        gauge.current.refresh();
    }

    const centerX = () => {
        let max: number = +xElement.current.value;
        setXCenter(max + '%');
        gauge.current.centerX = '' + max + '%';
        gauge.current.refresh();
    }

    const centerY = () => {
        let max: number = +yElement.current.value;
        setYCenter(max + '%');
        gauge.current.centerY = '' + max + '%';
        gauge.current.refresh();
    }

    const hideLabel = (args: ChangeEventArgs): void => {
        gauge.current.axes[0].hideIntersectingLabel = args.checked;
        gauge.current.refresh();
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='col-lg-8 control-section'>
                <CircularGaugeComponent centerX={xValue} centerY={yValue} moveToCenter={isMoveToCenter} background='transparent' load={load.bind(this)} ref={gauge} id='gauge'>
                    <AxesDirective>
                        <AxisDirective radius='100%' startAngle={270} endAngle={90} minimum={0} maximum={100} hideIntersectingLabel={true} lineStyle={{ width: 3 }} labelStyle={{ font: { fontWeight: 'normal', fontFamily: 'inherit' }, format: "{value}%", position: 'Outside', autoAngle: true }} majorTicks={{ position: 'Inside', width: 2, height: 15, interval: 10 }} minorTicks={{ position: 'Inside', width: 1, height: 8, interval: 2 }}>
                            <PointersDirective>
                                <PointerDirective animation={{ enable: false }} value={30} radius='75%' pointerWidth={7} cap={{ radius: 8, border: { width: 0 } }} needleTail={{ length: '13%' }} />
                            </PointersDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
            {/* Property Panel */}
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', overflow: 'hidden' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Start Angle </div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div>
                                        <input type="range" id="start" defaultValue="270" min="0" max="360" style={{ width: '85%' }} onChange={start.bind(this)} ref={startElement} />
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                        <span id='rangeStart'>{rangestart}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>End Angle </div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div>
                                        <input type="range" id="end" defaultValue="90" min="0" max="360" style={{ width: '85%' }} onChange={end.bind(this)} ref={endElement} />
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                        <span id='rangeEnd'>{rangeEnd}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Radius </div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div>
                                        <input type="range" id="radius" defaultValue="100" min="30" max="100" style={{ width: '85%' }} onChange={radius.bind(this)} ref={radiusElement} />
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                        <span id='radius1'>{radius1}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Radius based on angle</div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div style={{ paddingTop: '0px', paddingLeft: "0px" }}>
                                        <CheckBoxComponent id='angle' change={angleChange.bind(this)} style={{ paddingLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Center X </div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div>
                                        <input type="range" id="centerX" defaultValue="50" min="0" max="100" style={{ width: '85%' }} onChange={centerX.bind(this)} ref={xElement} disabled={disabled}/>
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                        <span id='center1'>{xCenter}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ width: '110px', marginLeft: "-10px", fontSize: "14px" }}>Center Y </div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div>
                                        <input type="range" id="centerY" defaultValue="50" min="0" max="100" style={{ width: '85%' }} onChange={centerY.bind(this)} ref={yElement} disabled={disabled} />
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" }}>
                                        <span id='center2'>{yCenter}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{ marginLeft: "-10px", fontSize: "14px" }}>Hide Intersecting Labels</div>
                                </td>
                                <td style={{ width: '40% ' }}>
                                    <div style={{ paddingTop: '0px', paddingLeft: "0px" }}>
                                        <CheckBoxComponent id='hidelabel' checked={true} change={hideLabel.bind(this)} style={{ paddingLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample shows how to create semi-circular or quarter-circular gauges by modifying a circular gauge with different start and end angles.</p>
            </div>
            <div id="description">
                <p>In this example, a circular gauge is rendered with different start and end angles to create semi-circular or quarter-circular gauges. The radius, start angle, end angle, and center position of the circular gauge can all be customized using the options in the properties panel.</p>
                <p>
                    More information on the semi-circular or quarter-circular gauges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-appearance/#radius-calculation-based-on-angles">documentation section </a>.
                </p>
            </div>
        </div>
    )
}
export default SemiGauge;