import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { PropertyPane } from '../common/property-pane';
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, AnnotationsDirective, AnnotationDirective, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-react-circulargauge';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .property-panel-table td {
        width: inherit;
    }
    `;

const Range = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    const [startMin, setStartMin] = useState<string>("0");
    const [startMax, setStartMax] = useState<string>("40");
    const [endMin, setEndMin] = useState<string>("0");
    const [endMax, setEndMax] = useState<string>("40");
    const [rangeEndWidth, setRangeEndWidth] = useState<string>("10");
    const [rangeStartWidth, setRangeStartWidth] = useState<string>("10");
    const [startValue, setStartValue] = useState<string>("0");
    const [endValue, setEndValue] = useState<string>("40");
    const [radiusValue, setRadiusValue] = useState<string>("0");
    let gauge = useRef<CircularGaugeComponent>(null);
    let startWidthElement = useRef<HTMLInputElement>(null);
    let endWidthElement = useRef<HTMLInputElement>(null);
    let radiusElement = useRef<HTMLInputElement>(null);
    let rangeSelectRef = useRef<DropDownListComponent>(null);
    let startElementOne = useRef<HTMLInputElement>(null);
    let endElementOne = useRef<HTMLInputElement>(null);
    let selectedRange: string;

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    let rangeSelectList : { [key: string]: Object }[] = [
        { text: 'Low', value: 'Low' },
        { text: 'Medium', value: 'Medium' },
        { text: 'High', value: 'High' },
    ];

    const rangeSelectChange = () : void => {
        let index : number = rangeSelectRef.current.index;
        selectedRange = rangeSelectRef.current.value.toString();
        if (selectedRange == 'Low') {
            setStartMin('0');
            setStartMax('40');
            setEndMin('0');
            setEndMax('40');
        } else if (selectedRange == 'Medium') {
            setStartMin('40');
            setStartMax('80');
            setEndMin('40');
            setEndMax('80');
        } else {
            setStartMin('80');
            setStartMax('120');
            setEndMin('80');
            setEndMax('120');
        }
        setRangeEndWidth(String(gauge.current.axes[0].ranges[index].endWidth));
        setRangeStartWidth(String(gauge.current.axes[0].ranges[index].startWidth));
        setStartValue(gauge.current.axes[0].ranges[index].start.toString());
        setEndValue(gauge.current.axes[0].ranges[index].end.toString());
        setRadiusValue(
            gauge.current.axes[0].ranges[index].roundedCornerRadius.toString()
        );
    };

    const start = (): void => {
        let index: number = rangeSelectRef.current.index;
        let min: number = parseInt(startElementOne.current.value);
        setStartValue(min.toString());
        gauge.current.axes[0].ranges[index].start = min;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    }

    const end = (): void => {
        let index: number = rangeSelectRef.current.index;
        let max: number = parseInt(endElementOne.current.value);
        setEndValue(String(max));
        gauge.current.axes[0].ranges[index].end = max;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    }

    const startWidth = (): void => {
        let index: number = rangeSelectRef.current.index;
        let startWidth: number = parseFloat(startWidthElement.current.value);
        setRangeStartWidth(String(startWidth));
        gauge.current.axes[0].ranges[index].startWidth = startWidth;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    }

    const endWidth = (): void => {
        let index: number = rangeSelectRef.current.index;
        let endWidth: number = parseFloat(endWidthElement.current.value.toString());
        setRangeEndWidth(String(endWidth));
        gauge.current.axes[0].ranges[index].endWidth = endWidth;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    }

    const radius = (): void => {
        let index: number = rangeSelectRef.current.index;
        let radius: number = parseFloat(radiusElement.current.value.toString());
        setRadiusValue(String(radius));
        gauge.current.axes[0].ranges[index].roundedCornerRadius = radius;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    }

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} id='range-container' background='transparent' ref={gauge}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={210} radius='80%' endAngle={150} minimum={0} maximum={120} majorTicks={{ height: 10, offset: 5 }} lineStyle={{ width: 10, color: 'transparent' }} minorTicks={{ height: 0, width: 0 }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective value={65} radius='60%' pointerWidth={8} needleTail={{ length: '18%' }} cap={{ radius: 7 }} animation={{ enable: true }} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={40} color='#30B32D' startWidth={10} endWidth={10} roundedCornerRadius={0} />
                                    <RangeDirective start={40} end={80} color='#FFDD00' startWidth={10} endWidth={10} roundedCornerRadius={0} />
                                    <RangeDirective start={80} end={120} color='#F03E3E' startWidth={10} endWidth={10} roundedCornerRadius={0} />
                                </RangesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div><span class="templateText" style="font-size:14px;">Speedometer</span></div>' angle={0} zIndex='1' radius='30%' />
                                    <AnnotationDirective content='<div><span class="templateText" style="font-size:20px;">65 MPH</span></div>' angle={180} zIndex='1' radius='40%' />
                                </AnnotationsDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '90%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div style={{ marginLeft: '-10px', fontSize: "14px", marginTop: "-8px" }}> Select Range </div>
                                    </td>
                                    <td style={{ width: '41%' }}>
                                        <DropDownListComponent
                                            id="rangeSelect"
                                            width="100%"
                                            index={0}
                                            change={rangeSelectChange.bind(this)}
                                            ref={rangeSelectRef}
                                            dataSource={rangeSelectList}
                                            fields={{ text: 'text', value: 'value' }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table id='property1' role='none' title='Properties' className='property-panel-table' style={{ width: '90%' }}>
                            <colgroup>
                                <col span={1} style={{ width: "35%" }}></col>
                                <col span={1} style={{ width: "45%" }}></col>
                                <col span={1} style={{ width: "20%" }}></col>
                            </colgroup>
                               <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: "38%" }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Range Start </div>
                                    </td>
                                    <td style={{ width: '52%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="startone" min={startMin} max={startMax} value={startValue} style={{ width: '90%' }} onChange={start.bind(this)} ref={startElementOne} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeStart' style={{ fontSize: "14px" }}>{startValue}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Range End </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginLeft: "10px", marginTop: "-10px" }}>
                                            <input type="range" id="endone" min={endMin} max={endMax} value={endValue} style={{ width: '90%' }} onChange={end.bind(this)} ref={endElementOne} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeEnd' style={{ fontSize: "14px" }}>{endValue}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Start Width </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="startWidth" value={rangeStartWidth} min="0" max="30" style={{ width: '90%' }} onChange={startWidth.bind(this)} ref={startWidthElement} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeStartWidth' style={{ fontSize: "14px" }}>{rangeStartWidth}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>End Width </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="endWidth" value={rangeEndWidth} min="0" max="30" style={{ width: '90%' }} onChange={endWidth.bind(this)} ref={endWidthElement} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='rangeEndWidth' style={{ fontSize: "14px" }}>{rangeEndWidth}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" }}>Corner Radius </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                            <input type="range" id="radius" value={radiusValue} min="0" max="12" step="1" style={{ width: '90%' }} onChange={radius.bind(this)} ref={radiusElement} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' }}>
                                            <span id='roundedRadius' style={{ fontSize: "14px" }}>{radiusValue}</span>
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
                <p>This sample demonstrates how to highlight a region in an axis using ranges in the circular gauge. The width, corner radius, and start and end range of a range can all be customized.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to render and configure the ranges in the circular gauge. Ranges are used to group the axis values, and you can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#start">start</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#end">end</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#color">color</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#startwidth">startWidth</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#endwidth">endWidth</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#radius">radius</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#roundedcornerradius">roundedCornerRadius</a> properties to customize them. In addition, an axis with multiple ranges is shown in the circular gauge component, as well as options to customize the range properties via the property panel.
                </p>
                <p>
                    More information on the ranges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/">documentation section</a>.
                </p>
            </section>
        </main>
    )
}
export default Range;
