/**
 * Sample for print and export in the Circular Gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, RangesDirective, RangeDirective, GaugeTheme, ILoadedEventArgs, ExportType, Print, PdfExport, ImageExport } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const Export = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let mode = useRef<DropDownListComponent>(null);
    let gauge = useRef<CircularGaugeComponent>(null);
    let fileNameObj = useRef<HTMLInputElement>(null);
    let type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const onClickPrint = (e: Event): void => {
        gauge.current.print();
    }

    const onClickExport = (e: Event): void => {
        gauge.current.export((mode.current.value as ExportType), fileNameObj.current.value);
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} id='gauge' background='transparent' allowPrint={true} allowPdfExport={true} allowImageExport={true} ref={gauge}>
                        <Inject services={[Print, PdfExport, ImageExport]} />
                        <AxesDirective>
                            <AxisDirective radius='80%' startAngle={0} endAngle={0} direction={'AntiClockWise'} majorTicks={{ width: 1, height: 25, interval: 10, position: "Outside", useRangeColor: true }} lineStyle={{ width: 0 }} minorTicks={{ width: 1, height: 8, interval: 2, position: "Outside", useRangeColor: true }} labelStyle={{ hiddenLabel: 'Last', offset: 2, font: { fontFamily: 'inherit' }, position: 'Outside', useRangeColor: true }}>
                                <RangesDirective>
                                    <RangeDirective start={0} end={32} radius='90%' startWidth={10} endWidth={35} color='#F8A197' />
                                    <RangeDirective start={32} end={70} radius='90%' startWidth={10} endWidth={35} color='#C45072' />
                                    <RangeDirective start={70} end={100} radius='90%' startWidth={10} endWidth={35} color='#1B679F' />
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective radius='0%' cap={{ radius: 0 }} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: '0px', fontSize: '14px' }}>Export Type</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent width={'100%'} id="etype" value="JPEG" ref={mode} dataSource={type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: '0px', fontSize: '14px' }}>File Name</div>
                                </td>
                                <td>
                                    <div className="e-float-input" style={{ 'marginTop': '0px' }}>
                                        <input type="text" defaultValue="Circular Gauge" id="fileName" style={{ "width": "100%", padding: '0px', paddingLeft: '5px' }} ref={fileNameObj} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '60px' }}>
                                <td align="right" style={{ paddingRight: '5%' }}>
                                    <ButtonComponent onClick={onClickExport.bind(this)} isPrimary={true}>Export</ButtonComponent>
                                </td>
                                <td align="left" style={{ paddingLeft: '5%' }}>
                                    <ButtonComponent onClick={onClickPrint.bind(this)} isPrimary={true}>Print</ButtonComponent>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the print and export functionalities of the circular gauge.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to print and export the rendered circular gauge. You can add print functionality by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#print">print</a> method when <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#allowprint">allowPrint</a> is set as <b>true</b>. Also, you can add export functionality by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#export">export</a> method when <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#allowimageexport">allowImageExport</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#allowpdfexport">allowPdfExport</a> are set as <b>true</b>. The circular gauge can be exported to JPEG, PNG, SVG, and PDF formats.
                </p>
                <p>
                    More information about print and export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-print-and-export/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Export;
