/**
 * Sample for range customization in the Circular Gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    Annotations, AnnotationsDirective, AnnotationDirective, ILoadedEventArgs, GaugeTheme,
} from '@syncfusion/ej2-react-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .property-panel-table td {
        width: inherit;
    }
    `;

function Range() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge: CircularGaugeComponent;
    let startWidthElement: HTMLInputElement;
    let endWidthElement: HTMLInputElement;
    let enableElement: HTMLInputElement;
    let radiusElement: HTMLInputElement;
    let loaded: boolean = false;
    let startElementOne: HTMLInputElement;
    let endElementOne: HTMLInputElement;
    let listObj: DropDownList;
    let selectedRange: string;
    let startRangeValue: string = "0";
    let endRangeValue: string = "40";
    let endMinimum: string = "0";
    let endMaximum: string = "40";

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    function onChartLoad(args: {}): void {
        if (!loaded) {
            loaded = true;
            listObj = new DropDownList({
                index: 0, width: '90%',
                change: () => {
                    let index: number = parseFloat(listObj.value.toString());
                    selectedRange = listObj.text;
                    if (selectedRange == "Low") {
                        (document.getElementById('startone') as HTMLInputElement).min = "0";
                        (document.getElementById('startone') as HTMLInputElement).max = "40";
                        (document.getElementById('endone') as HTMLInputElement).min = "0";
                        (document.getElementById('endone') as HTMLInputElement).max = "40";
                    } else if (selectedRange == "Medium") {
                        (document.getElementById('startone') as HTMLInputElement).min = "40";
                        (document.getElementById('startone') as HTMLInputElement).max = "80";
                        (document.getElementById('endone') as HTMLInputElement).min = "40";
                        (document.getElementById('endone') as HTMLInputElement).max = "80";
                    } else {
                        (document.getElementById('startone') as HTMLInputElement).min = "80";
                        (document.getElementById('startone') as HTMLInputElement).max = "120";
                        (document.getElementById('endone') as HTMLInputElement).min = "80";
                        (document.getElementById('endone') as HTMLInputElement).max = "120";
                    }
                    endWidthElement.value = gauge.axes[0].ranges[index].endWidth.toString();
                    document.getElementById('rangeEndWidth').innerHTML = String(gauge.axes[0].ranges[index].endWidth);
                    startWidthElement.value = gauge.axes[0].ranges[index].startWidth.toString();
                    document.getElementById('rangeStartWidth').innerHTML = String(gauge.axes[0].ranges[index].startWidth);
                    (document.getElementById('startone') as HTMLInputElement).value = gauge.axes[0].ranges[index].start.toString();
                    (document.getElementById('endone') as HTMLInputElement).value = gauge.axes[0].ranges[index].end.toString();
                    document.getElementById('rangeEnd').innerHTML = gauge.axes[0].ranges[index].end.toString();
                    document.getElementById('rangeStart').innerHTML = gauge.axes[0].ranges[index].start.toString();
                    radiusElement.value = gauge.axes[0].ranges[index].roundedCornerRadius.toString();
                    document.getElementById('roundedRadius').innerHTML = String(gauge.axes[0].ranges[index].roundedCornerRadius);
                }
            });
            listObj.appendTo('#rangeSelect');
        }
    };

    function start(): void {
        let index: number = parseFloat(listObj.value.toString());
        let min: number = parseInt(startElementOne.value);
        startElementOne.value = min.toString();
        document.getElementById('rangeStart').innerHTML = min.toString();
        gauge.axes[0].ranges[index].start = min;
        gauge.axes[0].pointers[0].animation.enable = false;
        gauge.refresh();
    }

    function end(): void {
        let index: number = parseFloat(listObj.value.toString());
        let max: number = parseInt(endElementOne.value);
        document.getElementById('rangeEnd').innerHTML = String(max);
        gauge.axes[0].ranges[index].end = max;
        gauge.axes[0].pointers[0].animation.enable = false;
        gauge.refresh();
    }

    function startWidth(): void {
        let index: number = parseFloat(listObj.value.toString());
        let startWidth: number = parseFloat(startWidthElement.value);
        document.getElementById('rangeStartWidth').innerHTML = String(startWidth);
        gauge.axes[0].ranges[index].startWidth = startWidth;
        gauge.axes[0].pointers[0].animation.enable = false;
        gauge.refresh();
    }

    function endWidth(): void {
        let index: number = parseFloat(listObj.value.toString());
        let endWidth: number = parseFloat(endWidthElement.value.toString());
        document.getElementById('rangeEndWidth').innerHTML = String(endWidth);
        gauge.axes[0].ranges[index].endWidth = endWidth;
        gauge.axes[0].pointers[0].animation.enable = false;
        gauge.refresh();
    }

    function radius(): void {
        let index: number = parseFloat(listObj.value.toString());
        let radius: number = parseFloat(radiusElement.value.toString());
        document.getElementById('roundedRadius').innerHTML = String(radius);
        gauge.axes[0].ranges[index].roundedCornerRadius = radius;
        gauge.axes[0].pointers[0].animation.enable = false;
        gauge.refresh();
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} id='range-container' background='transparent' ref={g => gauge = g} loaded={onChartLoad.bind(this)}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={210} radius='80%' endAngle={150} minimum={0} maximum={120}
                                majorTicks={{
                                    height: 10, offset: 5,
                                }} lineStyle={{ width: 10, color: 'transparent' }}
                                minorTicks={{
                                    height: 0,
                                    width: 0
                                }} labelStyle={{
                                    font: {
                                        fontFamily: 'inherit',
                                    }
                                }}>
                                <PointersDirective>
                                    <PointerDirective value={65} radius='60%' pointerWidth={8} needleTail={{
                                        length: '18%'
                                    }} cap={{
                                        radius: 7
                                    }} animation={{ enable: true }} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={40} color='#30B32D' startWidth={10} endWidth={10} roundedCornerRadius={0} />
                                    <RangeDirective start={40} end={80} color='#FFDD00' startWidth={10} endWidth={10} roundedCornerRadius={0} />
                                    <RangeDirective start={80} end={120} color='#F03E3E' startWidth={10} endWidth={10} roundedCornerRadius={0} />
                                </RangesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div><span class="templateText" style="font-size:14px;">Speedometer</span></div>'
                                        angle={0} zIndex='1' radius='30%'>
                                    </AnnotationDirective>
                                    <AnnotationDirective content='<div><span class="templateText" style="font-size:20px;">65 MPH</span></div>'
                                        angle={180} zIndex='1' radius='40%'>
                                    </AnnotationDirective>
                                </AnnotationsDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div style={{ marginLeft: '-10px', fontSize: "14px", marginTop: "-8px" }}> Select Range </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <select id="rangeSelect" className="form-control">
                                            <option value="0">Low</option>
                                            <option value="1">Medium</option>
                                            <option value="2">High</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table id='property1' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <colgroup>
                                    <col span={1} style={{ width: "35%" }}></col>
                                    <col span={1} style={{ width: "45%" }}></col>
                                    <col span={1} style={{ width: "20%" }}></col>
                                </colgroup>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: "35%" }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Range Start </div>
                                    </td>
                                    <td style={{ width: '46%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="startone" min="0" max="40" defaultValue="0" style={{ width: '90%' }} onChange={start.bind(this)} ref={d => startElementOne = d} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeStart' style={{ fontSize: "14px" }}>0</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Range End </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginLeft: "10px", marginTop: "-10px" }}>
                                            <input type="range" id="endone" min="0" max="40" defaultValue="40" style={{ width: '100%' }} onChange={end.bind(this)} ref={d => endElementOne = d} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeEnd' style={{ fontSize: "14px" }}>40</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Start Width </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="startWidth" defaultValue="10" min="0" max="30" style={{ width: '100%' }} onChange={startWidth.bind(this)} ref={d => startWidthElement = d} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeStartWidth' style={{ fontSize: "14px" }}>10</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>End Width </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="endWidth" defaultValue="10" min="0" max="30" style={{ width: '100%' }} onChange={endWidth.bind(this)} ref={d => endWidthElement = d} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeEndWidth' style={{ fontSize: "14px" }}>10</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Corner Radius </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="radius" defaultValue="0" min="0" max="12" step="1" style={{ width: '100%' }} onChange={radius.bind(this)} ref={d => radiusElement = d} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='roundedRadius' style={{ fontSize: "14px" }}>0</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how to highlight a region in an axis using ranges in the circular gauge. The width, corner radius, and start and end range of a range can all be customized.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the ranges in the circular gauge. Ranges are used to group the axis values, and you can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#start">start</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#end">end</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#color">color</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#startwidth">startWidth</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#endwidth">endWidth</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#radius">radius</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#roundedcornerradius">roundedCornerRadius</a> properties to customize them. In addition, an axis with multiple ranges is shown in the circular gauge component, as well as options to customize the range properties via the property panel.
                </p>
                <p>
                    More information on the ranges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/">documentation section</a>.
                </p>
            </div>
        </div>
    )

}

export default Range;